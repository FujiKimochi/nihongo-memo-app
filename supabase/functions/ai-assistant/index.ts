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
    const { messages, systemInstruction, modelName = 'gemini-2.5-flash', mode } = body;
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
            hasGeminiKey: !!Deno.env.get('GEMINI_API_KEY'),
            hasSupabaseUrl: !!Deno.env.get('SUPABASE_URL'),
            nodeVersion: Deno.version.deno
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // 2. Basic Auth Check
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Unauthorized: Missing or invalid Authorization header');
    }

    console.log(`[${timestamp}] Model: ${modelName}, Messages: ${messages?.length}`);

    if (!messages || !Array.isArray(messages)) {
      throw new Error('Invalid or missing "messages" in request body.');
    }

    // 3. Select Provider Logic
    const isGemini = modelName.includes('gemini');
    let replyText = '';

    if (isGemini) {
      // --- Google Gemini Implementation ---
      const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
      if (!geminiApiKey) throw new Error('GEMINI_API_KEY is missing in secrets.');

      // Use v1beta for better compatibility with newest preview models
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiApiKey}`;

      console.log(`Calling Gemini API: ${geminiUrl}`);

      // Map to Gemini Format
      const contents = messages.map(msg => {
        const role = msg.role === 'assistant' || msg.role === 'model' ? 'model' : 'user';
        if (msg.parts && Array.isArray(msg.parts)) {
          return { role, parts: msg.parts };
        }
        return { role, parts: [{ text: msg.content || '' }] };
      });

      const geminiBody: any = { contents };
      if (systemInstruction) {
        geminiBody.systemInstruction = { parts: [{ text: systemInstruction }] };
      }

      // Retry logic for 429
      let response: Response;
      let data: any;
      const MAX_RETRIES = 3;
      
      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        response = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(geminiBody),
        });

        data = await response.json();
        
        if (response.status === 429 && attempt < MAX_RETRIES) {
          const waitMs = 2000 * (attempt + 1); // Incremental wait
          console.log(`[Rate Limited] Attempt ${attempt + 1} failed. Retrying in ${waitMs}ms...`);
          await new Promise(r => setTimeout(r, waitMs));
          continue;
        }
        break;
      }

      if (!response!.ok) {
        throw new Error(`Gemini API error (${response!.status}): ${data.error?.message || 'Unknown'}`);
      }
      replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    } else {
      // --- Groq Implementation (Legacy/Fallback) ---
      const groqApiKey = Deno.env.get('GROQ_API_KEY');
      if (!groqApiKey) throw new Error('GROQ_API_KEY is missing.');

      const groqUrl = 'https://api.groq.com/openai/v1/chat/completions';
      const chatMessages = [];
      if (systemInstruction) chatMessages.push({ role: 'system', content: systemInstruction });
      for (const msg of messages) {
        chatMessages.push({ role: msg.role === 'model' ? 'assistant' : msg.role, content: msg.content });
      }

      const response = await fetch(groqUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqApiKey}`,
        },
        body: JSON.stringify({ model: modelName, messages: chatMessages, temperature: 0.7 }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Groq API error (${response.status}): ${data.error?.message || 'Unknown'}`);
      }
      replyText = data.choices?.[0]?.message?.content || '';
    }

    if (!replyText) throw new Error("AI returned an empty response.");

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
