
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Function to generate a random string
const generateRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
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

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Parse JWT token from Authorization header
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Parse request body
    const { keyName, permissions = [], expiresInDays } = await req.json() as ApiKeyRequest;

    if (!keyName) {
      return new Response(
        JSON.stringify({ error: 'Key name is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Generate API key parts
    const keyPrefix = generateRandomString(8);
    const keySecret = generateRandomString(32);
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

    // Store API key in database
    const { data: apiKeyData, error: insertError } = await supabase
      .from('api_keys')
      .insert({
        user_id: user.id,
        key_name: keyName,
        key_prefix: keyPrefix,
        key_hash: hashedKey,
        permissions,
        expires_at: expiresAt
      })
      .select('id')
      .single();

    if (insertError) {
      console.error('Error inserting API key:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to create API key', details: insertError.message }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Log this API key creation
    await supabase.rpc('log_security_event', {
      _event_type: 'api_key_created',
      _details: {
        key_id: apiKeyData.id,
        key_name: keyName,
        user_id: user.id,
        expires_at: expiresAt
      }
    });

    // Return the API key - this is the only time the full key will be available
    return new Response(
      JSON.stringify({ 
        apiKey: fullApiKey,
        keyName,
        keyId: apiKeyData.id,
        permissions,
        expiresAt
      }),
      { status: 201, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred', details: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
});
