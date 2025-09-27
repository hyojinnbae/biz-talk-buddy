import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { RealtimeChat } from '@/utils/RealtimeAudio';
import { Mic, MicOff, Phone, PhoneOff, Volume2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface VoiceInterfaceProps {
  scenario?: any;
  onSessionEnd?: (sessionData: any) => void;
}

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ scenario, onSessionEnd }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [conversation, setConversation] = useState<any[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const chatRef = useRef<RealtimeChat | null>(null);

  const handleMessage = (event: any) => {
    console.log('Received message:', event);
    
    // Handle different event types
    if (event.type === 'response.audio.delta') {
      setIsSpeaking(true);
    } else if (event.type === 'response.audio.done') {
      setIsSpeaking(false);
    } else if (event.type === 'response.audio_transcript.delta') {
      // Handle AI transcript
      setConversation(prev => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage && lastMessage.role === 'assistant' && !lastMessage.completed) {
          return [
            ...prev.slice(0, -1),
            { ...lastMessage, content: (lastMessage.content || '') + event.delta }
          ];
        } else {
          return [...prev, { role: 'assistant', content: event.delta, completed: false }];
        }
      });
    } else if (event.type === 'response.audio_transcript.done') {
      // Mark AI message as complete
      setConversation(prev => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage && lastMessage.role === 'assistant') {
          return [
            ...prev.slice(0, -1),
            { ...lastMessage, completed: true }
          ];
        }
        return prev;
      });
    } else if (event.type === 'input_audio_buffer.speech_started') {
      setIsUserSpeaking(true);
    } else if (event.type === 'input_audio_buffer.speech_stopped') {
      setIsUserSpeaking(false);
    }
  };

  const startConversation = async () => {
    try {
      // Create session in database
      const { data: session, error } = await supabase
        .from('sessions')
        .insert([{
          user_id: user?.id,
          scenario_id: scenario?.id,
          status: '진행중'
        }])
        .select()
        .single();

      if (error) throw error;
      setSessionId(session.id);

      chatRef.current = new RealtimeChat(handleMessage);
      await chatRef.current.init(scenario);
      setIsConnected(true);
      
      toast({
        title: "연결됨",
        description: "음성 대화가 시작되었습니다",
      });
    } catch (error) {
      console.error('Error starting conversation:', error);
      toast({
        title: "오류",
        description: error instanceof Error ? error.message : '대화를 시작할 수 없습니다',
        variant: "destructive",
      });
    }
  };

  const endConversation = async () => {
    try {
      if (sessionId) {
        // Update session in database
        await supabase
          .from('sessions')
          .update({
            status: '완료',
            end_time: new Date().toISOString(),
            transcript: conversation
          })
          .eq('id', sessionId);
      }

      chatRef.current?.disconnect();
      setIsConnected(false);
      setIsSpeaking(false);
      setIsUserSpeaking(false);
      
      onSessionEnd?.({ sessionId, conversation });
    } catch (error) {
      console.error('Error ending conversation:', error);
    }
  };

  useEffect(() => {
    return () => {
      chatRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {scenario && (
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <Badge variant="outline">{scenario.difficulty_level}</Badge>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{scenario.title}</h3>
              <p className="text-muted-foreground mb-3">{scenario.description}</p>
              {scenario.role_target && (
                <p className="text-sm">
                  <span className="font-medium">역할:</span> {scenario.role_target}
                </p>
              )}
            </div>
          </div>
        </Card>
      )}

      <Card className="p-6">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
              isSpeaking ? 'bg-primary text-primary-foreground animate-pulse' : 'bg-muted'
            }`}>
              <Volume2 className="w-8 h-8" />
            </div>
            
            <div className="text-2xl font-bold">
              {!isConnected ? '준비됨' : isSpeaking ? 'AI 말하는 중...' : '듣고 있어요'}
            </div>
            
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
              isUserSpeaking ? 'bg-accent text-accent-foreground animate-pulse' : 'bg-muted'
            }`}>
              {isUserSpeaking ? <Mic className="w-8 h-8" /> : <MicOff className="w-8 h-8" />}
            </div>
          </div>

          <div className="space-y-4">
            {!isConnected ? (
              <Button onClick={startConversation} size="lg" className="gap-2">
                <Phone className="w-5 h-5" />
                대화 시작하기
              </Button>
            ) : (
              <Button onClick={endConversation} variant="destructive" size="lg" className="gap-2">
                <PhoneOff className="w-5 h-5" />
                대화 종료하기
              </Button>
            )}
          </div>
        </div>
      </Card>

      {conversation.length > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4">대화 내용</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground ml-8'
                    : 'bg-muted mr-8'
                }`}
              >
                <div className="text-sm font-medium mb-1">
                  {message.role === 'user' ? '나' : 'AI 코치'}
                </div>
                <div>{message.content}</div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default VoiceInterface;