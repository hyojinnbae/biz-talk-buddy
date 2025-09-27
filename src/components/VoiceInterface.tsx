import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { RealtimeChat } from '@/utils/RealtimeAudio';
import { useAuth } from '@/hooks/useAuth';
import { Mic, MicOff, MessageSquare, Phone, PhoneOff, Volume2 } from 'lucide-react';

interface VoiceInterfaceProps {
  scenario: {
    id: string;
    title: string;
    description: string;
    role_target: string;
    prompt: string;
  };
  onSessionEnd: () => void;
}

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ scenario, onSessionEnd }) => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [transcript, setTranscript] = useState('');
  const chatRef = useRef<RealtimeChat | null>(null);
  const { user } = useAuth();

  const handleMessage = (event: any) => {
    console.log('받은 이벤트:', event);
    
    if (event.type === 'response.audio_transcript.delta') {
      setTranscript(prev => prev + event.delta);
    } else if (event.type === 'response.audio_transcript.done') {
      if (transcript) {
        setMessages(prev => [...prev, { role: 'assistant', content: transcript }]);
        setTranscript('');
      }
    } else if (event.type === 'input_audio_buffer.speech_started') {
      setIsUserSpeaking(true);
    } else if (event.type === 'input_audio_buffer.speech_stopped') {
      setIsUserSpeaking(false);
    } else if (event.type === 'response.audio.delta') {
      setIsSpeaking(true);
    } else if (event.type === 'response.audio.done') {
      setIsSpeaking(false);
    }
  };

  const startConversation = async () => {
    // Debug: entry and state snapshot
    console.log('startConversation called', { selectedScenario: scenario, userProfile: user });
    console.log('[VoiceInterface] startConversation clicked');
    if (!scenario) {
      console.warn('[VoiceInterface] selectedScenario is null/undefined');
    }
    if (!user) {
      console.warn('[VoiceInterface] userProfile is null/undefined');
    }
    try {
      setIsConnecting(true);
      console.log('[VoiceInterface] Initializing RealtimeChat...');
      chatRef.current = new RealtimeChat(handleMessage, setIsSpeaking);
      await chatRef.current.init();
      console.log('[VoiceInterface] RealtimeChat initialized, sending kickoff...');
      
      // Build scenario kickoff message and trigger first response
      const industry = scenario.description.includes('업계:') ? 
        scenario.description.split('업계:')[1].split(',')[0].trim() : 'business';

      const kickoff = `Title: ${scenario.title}\nUser Role: Business Development\nPartner Role: ${scenario.role_target} in ${industry}\n\nAlways start the conversation and lead it naturally. Keep replies short (2–3 sentences) and professional, like a Silicon Valley exec. After each user message, add a line starting with \"Rephrase:\" if their English sounds awkward.\n\nStart now by saying: \"${scenario.prompt}\"`;

      await chatRef.current?.sendMessage(kickoff);
      
      setIsConnected(true);
      setIsConnecting(false);
      
      toast({
        title: "연결 완료",
        description: "음성 대화를 시작하세요!",
      });
    } catch (error) {
      console.error('연결 오류:', error);
      setIsConnecting(false);
      toast({
        title: "연결 실패",
        description: error instanceof Error ? error.message : '연결에 실패했습니다',
        variant: "destructive",
      });
    }
  };

  const endConversation = () => {
    chatRef.current?.disconnect();
    setIsConnected(false);
    setIsSpeaking(false);
    setIsUserSpeaking(false);
    onSessionEnd();
  };

  useEffect(() => {
    console.log('[VoiceInterface] mounted', { title: scenario?.title });
    return () => {
      console.log('[VoiceInterface] unmount');
      chatRef.current?.disconnect();
    };
  }, [scenario?.title]);

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
      {/* 헤더 */}
      <div className="bg-background/80 backdrop-blur-sm border-b p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">{scenario.title}</h1>
            <p className="text-sm text-muted-foreground">{scenario.role_target}</p>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={endConversation}
            className="flex items-center gap-2"
          >
            <PhoneOff className="w-4 h-4" />
            종료
          </Button>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI 아바타 영역 */}
          <Card className="h-80 flex items-center justify-center bg-gradient-primary/10">
            <CardContent className="text-center">
              <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center ${
                isSpeaking ? 'bg-gradient-primary animate-pulse' : 'bg-muted'
              }`}>
                <Volume2 className={`w-12 h-12 ${
                  isSpeaking ? 'text-primary-foreground' : 'text-muted-foreground'
                }`} />
              </div>
              <h3 className="font-semibold mb-2">AI 대화 상대</h3>
              <p className="text-sm text-muted-foreground">
                {isSpeaking ? '말하는 중...' : '듣고 있습니다'}
              </p>
            </CardContent>
          </Card>

          {/* 사용자 영역 */}
          <Card className="h-80 flex items-center justify-center">
            <CardContent className="text-center">
              <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center ${
                isUserSpeaking ? 'bg-green-500 animate-pulse' : 'bg-muted'
              }`}>
                {isUserSpeaking ? (
                  <Mic className="w-12 h-12 text-white" />
                ) : (
                  <MicOff className="w-12 h-12 text-muted-foreground" />
                )}
              </div>
              <h3 className="font-semibold mb-2">나</h3>
              <p className="text-sm text-muted-foreground">
                {isUserSpeaking ? '말하는 중...' : '말해보세요'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 대화 상태 및 제어 */}
      <div className="bg-background/80 backdrop-blur-sm border-t p-6">
        <div className="max-w-6xl mx-auto">
          {/* 실시간 텍스트 */}
          {transcript && (
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Volume2 className="w-5 h-5 text-primary mt-0.5" />
                  <p className="text-sm">{transcript}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 연결 상태 */}
          <div className="text-center">
            {!isConnected ? (
              <Button 
                onClick={() => { console.log('[VoiceInterface] Start button clicked'); startConversation(); }}
                disabled={isConnecting}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white"
              >
                {isConnecting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    연결 중...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    대화 시작
                  </div>
                )}
              </Button>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  연결됨
                </div>
                <p className="text-sm text-muted-foreground">
                  마이크를 통해 자유롭게 대화해보세요
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceInterface;