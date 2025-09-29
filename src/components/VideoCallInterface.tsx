import { Button } from "@/components/ui/button";
import { Mic, MicOff, Phone, User } from "lucide-react";
import { useState } from "react";

interface VideoCallInterfaceProps {
  scenario: {
    id: string;
    title: string;
    description: string;
  } | null;
  onEndCall: () => void;
}

export const VideoCallInterface = ({ scenario, onEndCall }: VideoCallInterfaceProps) => {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Conversation Status Banner */}
      <div className="bg-green-600 text-white text-center py-2 px-4 font-medium text-sm">
        🔴 대화 중 - 실무 영어 시뮬레이션 진행 중입니다
      </div>
      
      {/* Main Video Call Area */}
      <div className="flex-1 flex">
        {/* Left side - User */}
        <div className="flex-1 flex items-center justify-center bg-gray-800 relative">
          <div className="text-center">
            <div className="w-32 h-32 rounded-full border-4 border-white/20 flex items-center justify-center mb-4 mx-auto">
              <User className="w-16 h-16 text-white/60" />
            </div>
            <h3 className="text-white text-xl font-medium">YOU</h3>
          </div>
          
          {/* Scenario info overlay */}
          <div className="absolute top-4 left-4 bg-black/50 rounded-lg p-3 max-w-xs">
            <h4 className="text-white text-sm font-medium mb-1">{scenario?.title}</h4>
            <p className="text-white/80 text-xs">{scenario?.description}</p>
          </div>
        </div>

        {/* Right side - AI Partner */}
        <div className="flex-1 relative">
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden">
            {/* Professional office background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50"></div>
            
            {/* AI Partner placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto">
                    <User className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-gray-700 text-lg font-medium">AI 파트너</h3>
                  <p className="text-gray-600 text-sm mt-1">대화할 준비가 되었습니다</p>
                </div>
              </div>
            </div>

            {/* Connection indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-500/20 rounded-full px-3 py-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-green-700 text-xs font-medium">연결됨</span>
            </div>

            {/* Small preview window */}
            <div className="absolute bottom-4 right-4 w-32 h-20 bg-gray-800 rounded-lg border-2 border-white/30 flex items-center justify-center">
              <User className="w-6 h-6 text-white/60" />
            </div>
          </div>
        </div>
      </div>

      {/* Control bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-900/95 p-4">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant={isMuted ? "destructive" : "secondary"}
            size="lg"
            className="rounded-full w-12 h-12 p-0"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </Button>
          
          <Button
            variant="destructive"
            size="lg"
            className="rounded-full w-12 h-12 p-0"
            onClick={onEndCall}
          >
            <Phone className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="text-center mt-2">
          <p className="text-white/60 text-sm">
            {isMuted ? "마이크가 음소거되었습니다" : "대화 중..."}
          </p>
        </div>
      </div>
    </div>
  );
};