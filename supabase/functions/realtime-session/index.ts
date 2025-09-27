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

  const { headers } = req;
  const upgradeHeader = headers.get("upgrade") || "";

  if (upgradeHeader.toLowerCase() !== "websocket") {
    return new Response("Expected WebSocket connection", { status: 400 });
  }

  try {
    const { socket, response } = Deno.upgradeWebSocket(req);
    
    console.log("🚀 WebSocket 연결 시작");
    
    let openAISocket: WebSocket | null = null;
    let sessionCreated = false;

    socket.onopen = () => {
      console.log("✅ 클라이언트 WebSocket 연결됨");
      
      // OpenAI Realtime API WebSocket 연결
      openAISocket = new WebSocket("wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17", {
        headers: {
          "Authorization": `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
          "OpenAI-Beta": "realtime=v1"
        }
      });

      openAISocket.onopen = () => {
        console.log("✅ OpenAI WebSocket 연결됨");
      };

      openAISocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("📨 OpenAI에서 받은 메시지:", data.type);

          // session.created 이벤트를 받으면 세션 설정 업데이트
          if (data.type === 'session.created' && !sessionCreated) {
            sessionCreated = true;
            console.log("🎯 세션 생성됨, 설정 업데이트 중...");
            
            const sessionUpdate = {
              type: "session.update",
              session: {
                modalities: ["text", "audio"],
                instructions: "You are a helpful English conversation partner for business scenarios. Speak naturally and encourage the user to practice their English. Respond in English only and keep conversations professional yet friendly.",
                voice: "alloy",
                input_audio_format: "pcm16",
                output_audio_format: "pcm16",
                input_audio_transcription: {
                  model: "whisper-1"
                },
                turn_detection: {
                  type: "server_vad",
                  threshold: 0.5,
                  prefix_padding_ms: 300,
                  silence_duration_ms: 1000
                },
                temperature: 0.8,
                max_response_output_tokens: "inf"
              }
            };
            
            if (openAISocket) {
              openAISocket.send(JSON.stringify(sessionUpdate));
            }
          }

          // 클라이언트에게 메시지 전달
          socket.send(event.data);
        } catch (error) {
          console.error("❌ OpenAI 메시지 처리 오류:", error);
        }
      };

      openAISocket.onerror = (error) => {
        console.error("❌ OpenAI WebSocket 오류:", error);
        socket.send(JSON.stringify({ type: 'error', message: 'OpenAI connection error' }));
      };

      openAISocket.onclose = () => {
        console.log("🔌 OpenAI WebSocket 연결 종료");
        socket.close();
      };
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📤 클라이언트에서 받은 메시지:", data.type);
        
        if (openAISocket && openAISocket.readyState === WebSocket.OPEN) {
          openAISocket.send(event.data);
        }
      } catch (error) {
        console.error("❌ 클라이언트 메시지 처리 오류:", error);
      }
    };

    socket.onclose = () => {
      console.log("🔌 클라이언트 WebSocket 연결 종료");
      if (openAISocket) {
        openAISocket.close();
      }
    };

    socket.onerror = (error) => {
      console.error("❌ 클라이언트 WebSocket 오류:", error);
      if (openAISocket) {
        openAISocket.close();
      }
    };

    return response;
  } catch (error) {
    console.error("❌ WebSocket 업그레이드 오류:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});