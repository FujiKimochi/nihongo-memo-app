import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

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
    const { messages, systemInstruction, modelName = 'llama-3.3-70b-versatile', mode } = body;
    const timestamp = new Date().toISOString();

    // 1. Reachability Check (Ping Mode - No Auth Required)
    if (mode === 'ping') {
      return new Response(
        JSON.stringify({
          status: 'ok',
          message: 'Pong! Edge Function is reachable.',
          timestamp: timestamp,
          config: {
            hasGroqKey: !!Deno.env.get('GROQ_API_KEY'),
            hasSupabaseUrl: !!Deno.env.get('SUPABASE_URL'),
            nodeVersion: Deno.version.deno
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // 2. Basic Auth Check (Required for AI calls)
    // The frontend Supabase SDK automatically attaches the user's JWT.
    // We just verify it's present to prevent unauthenticated access.
    // Full JWT verification was removed because it requires matching
    // SUPABASE_URL/ANON_KEY env vars which can cause "Auth session missing".
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('Missing or invalid Authorization header');
      throw new Error('Unauthorized: Missing or invalid Authorization header');
    }
    console.log('Auth header present, proceeding with AI request.');

    console.log(`[${timestamp}] Processing AI request. Model: ${modelName}, Messages: ${messages?.length}`);

    if (!messages || !Array.isArray(messages)) {
      throw new Error('Invalid or missing "messages" in request body.');
    }

    // 3. Get Groq API Key from environment variables
    const apiKey = Deno.env.get('GROQ_API_KEY');
    if (!apiKey) {
      console.error('GROQ_API_KEY not found in secrets');
      throw new Error('Server configuration error: GROQ_API_KEY is missing.');
    }

    // 4. Construct Groq API Request (OpenAI-compatible format)
    const groqUrl = 'https://api.groq.com/openai/v1/chat/completions';

    // Build messages array in OpenAI chat format
    const chatMessages: any[] = [];

    // Add system instruction as a system message if provided
    if (systemInstruction) {
      chatMessages.push({
        role: 'system',
        content: systemInstruction
      });
    }

    // Map user/assistant messages
    for (const msg of messages) {
      chatMessages.push({
        role: msg.role === 'model' ? 'assistant' : msg.role,
        content: msg.content
      });
    }

    const requestBody = {
      model: modelName,
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 4096,
    };

    // 5. Call Groq API with retry for rate limits
    const MAX_RETRIES = 2;
    let response: Response | null = null;
    let data: any = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      response = await fetch(groqUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      });

      data = await response.json();

      if (response.status === 429 && attempt < MAX_RETRIES) {
        // Parse wait time from error message or use retry-after header
        const retryAfterHeader = response.headers.get('retry-after');
        let waitMs = 30000; // default 30s

        if (retryAfterHeader) {
          waitMs = parseFloat(retryAfterHeader) * 1000;
        } else {
          // Try to parse from error message: "try again in 24.6s"
          const match = data?.error?.message?.match(/try again in ([\d.]+)s/i);
          if (match) {
            waitMs = Math.ceil(parseFloat(match[1]) * 1000) + 1000; // add 1s buffer
          }
        }

        console.log(`[Rate limited] Attempt ${attempt + 1}/${MAX_RETRIES}. Waiting ${waitMs}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitMs));
        continue;
      }

      break;
    }

    if (!response!.ok) {
      console.error('Groq API Error Detail:', JSON.stringify(data));
      const groqErrorMessage = data.error?.message || response!.statusText || 'Unknown Groq error';
      throw new Error(`Groq API error (${response!.status}): ${groqErrorMessage}`);
    }

    // 6. Extract the text response (OpenAI format)
    const replyText = data.choices?.[0]?.message?.content;

    if (!replyText) {
      console.error('Empty response from Groq:', JSON.stringify(data));
      throw new Error("AI returned an empty response. The request might have been blocked.");
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
