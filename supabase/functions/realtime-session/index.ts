import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Handle WebSocket upgrade
  if (req.headers.get("upgrade") !== "websocket") {
    return new Response("Expected websocket", { status: 400 });
  }

  const { socket, response } = Deno.upgradeWebSocket(req);
  let openaiWs: WebSocket | null = null;

  socket.onopen = () => {
    console.log("Client WebSocket connected");
    
    // Connect to OpenAI Realtime API
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    console.log("OPENAI_KEY_PREFIX:", apiKey ? apiKey.slice(0, 8) : 'undefined');

    const openaiUrl = "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01";
    console.log("OpenAI WS URL:", openaiUrl);

    openaiWs = new WebSocket(openaiUrl, [
      "realtime",
      `openai-insecure-api-key.${apiKey ?? ''}`,
      "openai-beta.realtime-v1"
    ]);

    openaiWs.onopen = () => {
      console.log("Connected to OpenAI WS");
    };

    openaiWs.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("OpenAI -> Client:", data.type);

      if (data.type === 'response.output_text.delta') {
        try {
          const preview = typeof data.delta === 'string' ? data.delta.slice(0, 100) : '';
          console.log('OpenAI -> Client: response.output_text.delta', preview);
        } catch (_) {}
      }
      if (data.type === 'response.audio.delta' || data.type === 'response.output_audio.delta') {
        try {
          const len = typeof data.delta === 'string' ? data.delta.length : 0;
          console.log('OpenAI -> Client: response.audio.delta (base64 length)', len);
        } catch (_) {}
      }
      
      // Configure session after connection
      if (data.type === 'session.created') {
        const sessionConfig = {
          type: 'session.update',
          session: {
            modalities: ['text', 'audio'],
            instructions: `You are a business role-play partner in a professional English conversation practice.

Goal:
- Keep the interaction natural, concise, and context-relevant.
- Each of your responses must be maximum 3 sentences.
- Do not explain grammar or vocabulary unless the user asks.
- Ask one focused question per turn to keep the conversation flowing.
- Encourage the user to speak in 2–3 sentences per turn, not short yes/no answers.
- Avoid long monologues, summaries, or lectures.
- Maintain a polite, professional tone (Manager–Director level meeting style).

Style examples:
"That's an interesting point. How do you plan to handle the distributor margin issue?"
"I see. So your main goal is to build trust before discussing pricing, right?"

Response format: plain text (no Markdown, no bullet points).`,
            voice: 'alloy',
            input_audio_format: 'pcm16',
            output_audio_format: 'pcm16',
            input_audio_transcription: {
              model: 'whisper-1'
            },
            turn_detection: {
              type: 'server_vad',
              threshold: 0.5,
              prefix_padding_ms: 300,
              silence_duration_ms: 45000
            },
            temperature: 0.8,
            max_response_output_tokens: 'inf'
          }
        };
        
        console.log("Sending session.update to OpenAI");
        openaiWs?.send(JSON.stringify(sessionConfig));
        
        // Send session update confirmation to client
        socket.send(JSON.stringify({
          type: 'session.ready',
          message: 'Session configured, ready for response.create'
        }));
      }
      
      // Forward all events to client
      socket.send(event.data);
    };

    openaiWs.onerror = (error) => {
      console.error("OpenAI WebSocket error:", error);
      socket.send(JSON.stringify({
        type: 'error',
        message: 'OpenAI connection failed'
      }));
    };

    openaiWs.onclose = () => {
      console.log("OpenAI WebSocket closed");
      socket.close();
    };
  };

  socket.onmessage = (event) => {
    if (openaiWs && openaiWs.readyState === WebSocket.OPEN) {
      const parsed = JSON.parse(event.data);
      console.log("Client -> OpenAI:", parsed.type);
      if (parsed.type === 'response.create') {
        try {
          console.log('Forwarding response.create to OpenAI');
          console.log('response.create payload (truncated):', JSON.stringify(parsed.response).slice(0, 300));
        } catch (_) {}
      }
      openaiWs.send(event.data);
    }
  };

  socket.onerror = (error) => {
    console.error("Client WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("Client WebSocket closed");
    openaiWs?.close();
  };

  return response;
});