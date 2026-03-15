import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

// Setup CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Only accept POST requests
    if (req.method !== 'POST') {
      throw new Error('Method not allowed. Only POST requests are accepted.');
    }

    // Parse Request Body early
    const body = await req.json();
    const { messages, systemInstruction, modelName = 'gemini-1.5-flash', mode } = body;
    const timestamp = new Date().toISOString();

    // 1. Reachability Check (Ping Mode - No Auth Required)
    if (mode === 'ping') {
      return new Response(
        JSON.stringify({
          status: 'ok',
          message: 'Pong! Edge Function is reachable.',
          timestamp: timestamp,
          config: {
            hasGeminiKey: !!Deno.env.get('GEMINI_API_KEY'),
            hasSupabaseUrl: !!Deno.env.get('SUPABASE_URL'),
            nodeVersion: Deno.version.deno
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // 2. Verify Authentication (Required for AI calls)
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('Missing Authorization header');
      throw new Error('Unauthorized: Missing Authorization header');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      console.error('Auth Error:', authError);
      throw new Error(`Unauthorized: ${authError?.message || 'Invalid user'}`);
    }

    console.log(`[${timestamp}] Processing AI request. Model: ${modelName}, Messages: ${messages?.length}`);

    if (!messages || !Array.isArray(messages)) {
      throw new Error('Invalid or missing "messages" in request body.');
    }

    // 3. Get Google Gemini API Key from environment variables
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      console.error('GEMINI_API_KEY not found in secrets');
      throw new Error('Server configuration error: GEMINI_API_KEY is missing.');
    }

    // 4. Construct Gemini API Request
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const contents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const requestBody: any = {
      contents: contents
    };

    if (systemInstruction) {
      // Use camelCase 'systemInstruction' for Gemini v1 API
      requestBody.systemInstruction = {
        parts: [{ text: systemInstruction }]
      }
    }

    // 5. Call Gemini API
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API Error Detail:', JSON.stringify(data));
      const geminiErrorMessage = data.error?.message || response.statusText || 'Unknown Gemini error';
      throw new Error(`Gemini API error (${response.status}): ${geminiErrorMessage}`);
    }

    // 6. Extract the text response
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!replyText) {
      console.error('Empty response from Gemini:', JSON.stringify(data));
      throw new Error("AI returned an empty response. It might have been blocked due to safety filters.");
    }

    // 7. Return to App
    return new Response(
      JSON.stringify({ response: replyText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );

  } catch (error: any) {
    console.error('System Error:', error.message);
    return new Response(
      JSON.stringify({
        error: error.message,
        details: error.stack // Optional: remove if too verbose, but helpful for debugging now
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error.message.includes('Unauthorized') ? 401 : 400,
      },
    );
  }
});
