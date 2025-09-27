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
    const openaiUrl = "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17";
    openaiWs = new WebSocket(openaiUrl, {
      headers: {
        "Authorization": `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        "OpenAI-Beta": "realtime=v1"
      }
    });

    openaiWs.onopen = () => {
      console.log("Connected to OpenAI Realtime API");
    };

    openaiWs.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("OpenAI -> Client:", data.type);
      
      // Configure session after connection
      if (data.type === 'session.created') {
        const sessionConfig = {
          type: 'session.update',
          session: {
            modalities: ['text', 'audio'],
            instructions: `You are a professional English conversation partner for business practice. 
            - Always lead the conversation naturally and professionally
            - Use authentic Silicon Valley, Big Tech, and global enterprise expressions
            - Maintain the roleplay scenario context throughout
            - Keep responses concise but engaging
            - Ask follow-up questions to continue the conversation
            - Use industry-specific terminology appropriately`,
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
              silence_duration_ms: 1000
            },
            temperature: 0.8,
            max_response_output_tokens: 4096
          }
        };
        
        openaiWs?.send(JSON.stringify(sessionConfig));
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
      console.log("Client -> OpenAI:", JSON.parse(event.data).type);
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