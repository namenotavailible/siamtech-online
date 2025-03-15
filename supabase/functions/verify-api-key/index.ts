
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
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

const hashApiKey = async (apiKey: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(apiKey);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

interface VerifyRequest {
  apiKey: string;
  requiredPermissions?: string[];
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting simulation - in production this would be handled by Nginx/Cloudflare
  // Here we log for monitoring
  const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
  console.log(`API verification request from: ${clientIP}`);

  try {
    // Validate request
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: securityHeaders }
      );
    }

    // Parse request body
    const { apiKey, requiredPermissions = [] } = await req.json() as VerifyRequest;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API Key is required' }),
        { status: 400, headers: securityHeaders }
      );
    }

    // Extract key prefix (first 8 characters) and the rest (which should be hashed)
    const keyPrefix = apiKey.substring(0, 8);
    const keyToHash = apiKey.substring(8);
    const hashedKey = await hashApiKey(keyToHash);

    // Initialize Supabase client with service role to bypass RLS
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Look up the API key in the database
    const { data, error } = await supabase
      .from('api_keys')
      .select('id, user_id, permissions, expires_at')
      .eq('key_prefix', keyPrefix)
      .eq('key_hash', hashedKey)
      .single();

    if (error || !data) {
      console.error('Error or no data found:', error);
      
      // Log failed authentication attempt for security monitoring
      await supabase.rpc('log_security_event', {
        _event_type: 'api_key_invalid_attempt',
        _details: {
          key_prefix: keyPrefix,
          ip: clientIP,
          user_agent: req.headers.get('user-agent') || 'unknown'
        }
      });
      
      return new Response(
        JSON.stringify({ valid: false, error: 'Invalid API key' }),
        { status: 401, headers: securityHeaders }
      );
    }

    // Check if the key has expired
    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      // Log expired key usage attempt
      await supabase.rpc('log_security_event', {
        _event_type: 'api_key_expired_used',
        _details: {
          key_id: data.id,
          user_id: data.user_id,
          ip: clientIP
        }
      });
      
      return new Response(
        JSON.stringify({ valid: false, error: 'API key has expired' }),
        { status: 401, headers: securityHeaders }
      );
    }

    // Check permissions if required
    const hasRequiredPermissions = requiredPermissions.length === 0 || 
      requiredPermissions.every(perm => data.permissions.includes(perm));

    if (!hasRequiredPermissions) {
      // Log insufficient permissions attempt
      await supabase.rpc('log_security_event', {
        _event_type: 'api_key_insufficient_permissions',
        _details: {
          key_id: data.id,
          user_id: data.user_id,
          requiredPermissions,
          availablePermissions: data.permissions,
          ip: clientIP
        }
      });
      
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: 'API key does not have the required permissions',
          requiredPermissions,
          availablePermissions: data.permissions
        }),
        { status: 403, headers: securityHeaders }
      );
    }

    // Update last_used timestamp
    await supabase
      .from('api_keys')
      .update({ last_used: new Date().toISOString() })
      .eq('id', data.id);

    // Log this successful API key verification
    await supabase.rpc('log_security_event', {
      _event_type: 'api_key_used',
      _details: {
        key_id: data.id,
        user_id: data.user_id,
        resource: new URL(req.url).pathname,
        ip: clientIP
      }
    });

    // Return success with user ID
    return new Response(
      JSON.stringify({ 
        valid: true, 
        userId: data.user_id,
        permissions: data.permissions
      }),
      { status: 200, headers: securityHeaders }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    
    // Initialize Supabase client with service role to log the error
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Log unexpected error
    await supabase.rpc('log_security_event', {
      _event_type: 'api_key_verification_error',
      _details: {
        error: error instanceof Error ? error.message : 'Unknown error',
        ip: clientIP,
        user_agent: req.headers.get('user-agent') || 'unknown'
      }
    });
    
    return new Response(
      JSON.stringify({ 
        valid: false, 
        error: 'An unexpected error occurred',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: securityHeaders }
    );
  }
});
