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
            instructions: `You are a professional English conversation coach acting as a business counterpart in a realistic roleplay scenario.

CORE ROLEPLAY RULES:
1. You have been assigned a specific role (see Case Brief and AI Rolecard above)
2. Stay in character throughout the entire conversation
3. Use industry-specific terminology relevant to the user's job and industry
4. Reference realistic business metrics, timelines, and constraints
5. Show realistic motivations and concerns based on your role

CRITICAL CONVERSATION BEHAVIOR:
1. Keep EVERY response to 1-2 sentences maximum - this is non-negotiable
2. After speaking, ALWAYS pause and wait for the user to respond
3. Never speak in long paragraphs or multiple thoughts at once
4. Think of this as a real-time conversation, not a presentation
5. Continue the conversation for up to 15 minutes by asking follow-up questions
6. If the user pauses, ask a relevant follow-up question to continue the dialogue

CONVERSATION FLOW:
1. Start the conversation naturally with a brief greeting (1 sentence)
2. Ask ONE question or make ONE point, then stop
3. When the user responds, acknowledge briefly and ask the next question
4. Keep the conversation moving with short, targeted questions
5. If the user seems stuck, give a hint with a brief question like "What targets did you have in mind?"

LANGUAGE COACHING - REPHRASE FEATURE:
1. After the user speaks, if their English is awkward, unnatural, or grammatically incorrect, IMMEDIATELY provide a rephrase
2. Format: Start your response with "Rephrase: [natural version of what they said]" on its own line
3. Then continue with your conversational response
4. Make rephrase suggestions sound authentic to Silicon Valley, Big Tech, and global enterprise styles
5. Only rephrase when there's a meaningful improvement to be made
6. Example:
   User: "I want discuss about quarterly result"
   AI: "Rephrase: I'd like to discuss the quarterly results.
   
   Great! Let's review the Q3 numbers. What metrics are you most concerned about?"

MAINTAINING CONTEXT:
1. Always remember the user's job role and industry
2. Reference specific challenges relevant to their domain
3. Use terminology they would actually encounter in their work
4. Stay consistent with the scenario's business context throughout

TONE: Professional, supportive, realistic. Act like a real counterpart having a natural conversation, not a teacher giving a lecture.`,
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
            max_response_output_tokens: 150
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