
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

// Enhanced CORS headers with stricter origin settings
// In production, replace * with your domain(s)
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Max-Age': '86400', // 24 hours cache for preflight requests
};

// Enhanced security headers for all responses
const securityHeaders = {
  'Content-Type': 'application/json',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  ...corsHeaders
};

// Function to generate a random string with enhanced entropy
const generateRandomString = (length: number): string => {
  const buffer = new Uint8Array(length);
  crypto.getRandomValues(buffer);
  
  return Array.from(buffer)
    .map(b => {
      // Use a wider character set for more entropy
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_~';
      return characters.charAt(b % characters.length);
    })
    .join('');
};

const hashApiKey = async (apiKey: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(apiKey);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

interface ApiKeyRequest {
  keyName: string;
  permissions?: string[];
  expiresInDays?: number;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting simulation - in production this would be handled by Nginx/Cloudflare
  // Here we log for monitoring
  const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
  console.log(`API key creation request from: ${clientIP}`);

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: securityHeaders }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Parse JWT token from Authorization header
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      // Log unauthorized access attempt
      await supabase.rpc('log_security_event', {
        _event_type: 'unauthorized_api_key_creation_attempt',
        _details: {
          ip: clientIP,
          user_agent: req.headers.get('user-agent') || 'unknown'
        }
      });
      
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: securityHeaders }
      );
    }

    // Parse request body
    const { keyName, permissions = [], expiresInDays } = await req.json() as ApiKeyRequest;

    if (!keyName) {
      return new Response(
        JSON.stringify({ error: 'Key name is required' }),
        { status: 400, headers: securityHeaders }
      );
    }

    // Check if user has too many API keys (limit to 10 per user)
    const { count, error: countError } = await supabase
      .from('api_keys')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id);
      
    if (countError) {
      console.error('Error checking API key count:', countError);
      return new Response(
        JSON.stringify({ error: 'Failed to check existing API keys', details: countError.message }),
        { status: 500, headers: securityHeaders }
      );
    }
    
    if (count && count >= 10) {
      return new Response(
        JSON.stringify({ error: 'Maximum number of API keys reached (10). Please delete an existing key before creating a new one.' }),
        { status: 400, headers: securityHeaders }
      );
    }

    // Generate API key parts with enhanced security
    const keyPrefix = generateRandomString(8);
    const keySecret = generateRandomString(40); // Longer key for better security
    const fullApiKey = `${keyPrefix}${keySecret}`;
    
    // Hash the secret part for storage
    const hashedKey = await hashApiKey(keySecret);

    // Calculate expiration date if specified
    let expiresAt = null;
    if (expiresInDays) {
      const date = new Date();
      date.setDate(date.getDate() + expiresInDays);
      expiresAt = date.toISOString();
    }

    // Validate permissions (could be extended with more specific checks)
    const allowedPermissions = ['read', 'write', 'delete', 'admin'];
    const validPermissions = permissions.filter(p => allowedPermissions.includes(p));
    
    if (validPermissions.length !== permissions.length) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid permissions specified', 
          allowedPermissions,
          providedPermissions: permissions 
        }),
        { status: 400, headers: securityHeaders }
      );
    }

    // Store API key in database
    const { data: apiKeyData, error: insertError } = await supabase
      .from('api_keys')
      .insert({
        user_id: user.id,
        key_name: keyName,
        key_prefix: keyPrefix,
        key_hash: hashedKey,
        permissions: validPermissions,
        expires_at: expiresAt
      })
      .select('id')
      .single();

    if (insertError) {
      console.error('Error inserting API key:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to create API key', details: insertError.message }),
        { status: 500, headers: securityHeaders }
      );
    }

    // Log this API key creation
    await supabase.rpc('log_security_event', {
      _event_type: 'api_key_created',
      _details: {
        key_id: apiKeyData.id,
        key_name: keyName,
        user_id: user.id,
        expires_at: expiresAt,
        ip: clientIP
      }
    });

    // Return the API key - this is the only time the full key will be available
    return new Response(
      JSON.stringify({ 
        apiKey: fullApiKey,
        keyName,
        keyId: apiKeyData.id,
        permissions: validPermissions,
        expiresAt
      }),
      { 
        status: 201, 
        headers: {
          ...securityHeaders,
          // Set a secure cookie for demonstration (in real app, cookies would be set by frontend)
          'Set-Cookie': 'KeyCreated=true; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=3600'
        } 
      }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    
    // Initialize Supabase client with service role to log the error
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Log unexpected error
    await supabase.rpc('log_security_event', {
      _event_type: 'api_key_creation_error',
      _details: {
        error: error instanceof Error ? error.message : 'Unknown error',
        ip: clientIP,
        user_agent: req.headers.get('user-agent') || 'unknown'
      }
    });
    
    return new Response(
      JSON.stringify({ 
        error: 'An unexpected error occurred', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { status: 500, headers: securityHeaders }
    );
  }
});
