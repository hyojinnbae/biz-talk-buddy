import { Button } from "@/components/ui/button";
import { Mic, MicOff, Phone, User } from "lucide-react";
import { useState } from "react";
import aiPartnerImage from "@/assets/ai-partner-professional.jpg";

interface VideoCallInterfaceProps {
  scenario: {
    id: string;
    title: string;
    description: string;
    counterpart?: string;
  } | null;
  onEndCall: () => void;
  isConnected?: boolean;
  isConnecting?: boolean;
  isSpeaking?: boolean;
  isUserSpeaking?: boolean;
  aiTranscript?: string;
}

export const VideoCallInterface = ({ 
  scenario, 
  onEndCall, 
  isConnected = false, 
  isConnecting = false, 
  isSpeaking = false, 
  isUserSpeaking = false,
  aiTranscript = ''
}: VideoCallInterfaceProps) => {
  const [isMuted, setIsMuted] = useState(false);

  const connectionStatus = isConnected ? '대화 중' : isConnecting ? '회의실 준비 중...' : '연결 대기';

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Top Meeting Info Bar */}
      <div className="bg-gray-800 text-white px-6 py-3 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : isConnecting ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
              <span className="text-sm font-medium">{connectionStatus}</span>
            </div>
            <div className="text-sm text-gray-300">|</div>
            <div className="text-sm">
              <span className="font-medium">{scenario?.title}</span>
              {scenario?.counterpart && (
                <span className="text-gray-300 ml-2">| {scenario.counterpart}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Video Call Area */}
      <div className="flex-1 flex">
        {/* Left side - User */}
        <div className="flex-1 flex items-center justify-center bg-gray-800 relative">
          <div className="text-center">
            <div className={`w-40 h-40 rounded-full border-4 ${isUserSpeaking ? 'border-blue-400 animate-pulse' : 'border-white/20'} flex items-center justify-center mb-4 mx-auto bg-gray-700`}>
              <User className="w-20 h-20 text-white/60" />
            </div>
            <h3 className="text-white text-xl font-medium">YOU</h3>
            {isUserSpeaking && (
              <p className="text-blue-400 text-sm mt-2 animate-pulse">말하는 중...</p>
            )}
          </div>
        </div>

        {/* Right side - AI Partner */}
        <div className="flex-1 relative bg-gradient-to-br from-blue-50 to-gray-100">
          {/* AI Partner Image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`relative w-80 h-80 rounded-2xl overflow-hidden border-4 ${isSpeaking ? 'border-green-400 animate-pulse' : 'border-white/30'} bg-white shadow-2xl`}>
              <img 
                src={aiPartnerImage} 
                alt="AI Partner" 
                className="w-full h-full object-cover"
              />
              {isSpeaking && (
                <div className="absolute bottom-4 left-4 right-4 bg-green-500/90 text-white text-center py-2 rounded-lg">
                  <p className="text-sm font-medium animate-pulse">말하는 중...</p>
                </div>
              )}
              {!isConnected && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-sm">연결 중...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI Partner Name */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="bg-black/70 text-white px-4 py-2 rounded-lg">
              <h3 className="text-lg font-medium">
                {scenario?.counterpart || "AI 파트너"}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Subtitle Area - Show when AI is speaking or when there's transcript */}
      {aiTranscript && (
        <div className="bg-black/80 text-white px-6 py-4 border-t border-gray-700">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-center leading-relaxed">{aiTranscript}</p>
          </div>
        </div>
      )}

      {/* Control bar - Zoom style */}
      <div className="bg-gray-900 border-t border-gray-700 p-6">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant={isMuted ? "destructive" : "secondary"}
            size="lg"
            className="rounded-full w-14 h-14 p-0 hover:scale-105 transition-transform"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>
          
          <Button
            variant="destructive"
            size="lg"
            className="rounded-full w-14 h-14 p-0 hover:scale-105 transition-transform bg-red-600 hover:bg-red-700"
            onClick={onEndCall}
          >
            <Phone className="w-6 h-6" />
          </Button>
        </div>
        
        <div className="text-center mt-3">
          <p className="text-white/70 text-sm">
            {isMuted ? "마이크가 음소거되었습니다" : isConnected ? "음성 연결됨" : "연결 중..."}
          </p>
        </div>
      </div>
    </div>
  );
};