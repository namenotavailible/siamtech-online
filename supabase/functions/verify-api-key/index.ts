
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

  try {
    // Validate request
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Parse request body
    const { apiKey, requiredPermissions = [] } = await req.json() as VerifyRequest;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API Key is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
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
      
      return new Response(
        JSON.stringify({ valid: false, error: 'Invalid API key' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Check if the key has expired
    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ valid: false, error: 'API key has expired' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Check permissions if required
    const hasRequiredPermissions = requiredPermissions.length === 0 || 
      requiredPermissions.every(perm => data.permissions.includes(perm));

    if (!hasRequiredPermissions) {
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: 'API key does not have the required permissions',
          requiredPermissions,
          availablePermissions: data.permissions
        }),
        { status: 403, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Update last_used timestamp
    await supabase
      .from('api_keys')
      .update({ last_used: new Date().toISOString() })
      .eq('id', data.id);

    // Log this API key verification attempt
    await supabase.rpc('log_security_event', {
      _event_type: 'api_key_used',
      _details: {
        key_id: data.id,
        user_id: data.user_id,
        resource: new URL(req.url).pathname
      }
    });

    // Return success with user ID
    return new Response(
      JSON.stringify({ 
        valid: true, 
        userId: data.user_id,
        permissions: data.permissions
      }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    
    return new Response(
      JSON.stringify({ 
        valid: false, 
        error: 'An unexpected error occurred',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
});
