import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { RealtimeChat } from '@/utils/RealtimeAudio';
import { useAuth } from '@/hooks/useAuth';
import { Mic, MicOff, MessageSquare, Phone, PhoneOff, Volume2 } from 'lucide-react';
import { VideoCallInterface } from './VideoCallInterface';
import SessionResult from './SessionResult';

interface VoiceInterfaceProps {
  scenario: {
    id: string;
    title: string;
    description: string;
    role_target: string;
    prompt: string;
    counterpart?: string;
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
  const [aiTranscript, setAiTranscript] = useState('');
  const [aiTranscripts, setAiTranscripts] = useState<string[]>([]); // 여러 문장 누적
  const [conversationLog, setConversationLog] = useState<Array<{role: string, content: string}>>([]);
  const [rephrasedExpressions, setRephrasedExpressions] = useState<Array<{original: string, rephrased: string}>>([]);
  const [showSessionResult, setShowSessionResult] = useState(false);
  const chatRef = useRef<RealtimeChat | null>(null);
  const { user } = useAuth();
  const [showVideoCall, setShowVideoCall] = useState(false);

  const handleMessage = (event: any) => {
    console.log('Event received:', event.type, event);

    if (event.type === 'response.audio_transcript.delta') {
      setTranscript(prev => prev + event.delta);
      setAiTranscript(prev => prev + event.delta);
    } else if (event.type === 'response.audio_transcript.done') {
      const fullTranscript = event.transcript || transcript;
      if (fullTranscript) {
        setMessages(prev => [...prev, { role: 'assistant', content: fullTranscript }]);
        setConversationLog(prev => [...prev, { role: 'assistant', content: fullTranscript }]);
        setAiTranscripts(prev => [...prev, fullTranscript]);
        setTranscript('');
      }
    } else if (event.type === 'conversation.item.input_audio_transcription.completed') {
      const userText = event.transcript;
      if (userText) {
        setConversationLog(prev => [...prev, { role: 'user', content: userText }]);
      }
    } else if (event.type === 'input_audio_buffer.speech_started') {
      setIsUserSpeaking(true);
    } else if (event.type === 'input_audio_buffer.speech_stopped') {
      setIsUserSpeaking(false);
    } else if (event.type === 'response.audio.delta') {
      setIsSpeaking(true);
    } else if (event.type === 'response.audio.done') {
      setIsSpeaking(false);
    } else if (event.type === 'response.done') {
      // AI 응답 완료 시 자막 유지 (바로 클리어하지 않음)
    } else if (event.type === 'response.function_call_arguments.done') {
      // Rephrase 표현 추출 (함수 호출로 rephrase가 온다면)
      try {
        const args = JSON.parse(event.arguments || '{}');
        if (args.original && args.rephrased) {
          setRephrasedExpressions(prev => [...prev, { original: args.original, rephrased: args.rephrased }]);
        }
      } catch (e) {
        console.error('Error parsing rephrase:', e);
      }
    }
  };

  const startConversation = async () => {
    try {
      setIsConnecting(true);
      chatRef.current = new RealtimeChat(handleMessage, setIsSpeaking);
      
      // Resume AudioContext on user gesture to avoid autoplay blocking
      await chatRef.current.resumeAudioContext();
      
      await chatRef.current.init();
      
      setIsConnected(true);
      setIsConnecting(false);
      setShowVideoCall(true);
      
      toast({
        title: "연결 완료",
        description: "음성 대화를 시작하세요!",
      });
    } catch (error) {
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
    setShowVideoCall(false);
    setShowSessionResult(true);
  };

  const handleCloseResult = () => {
    setShowSessionResult(false);
    setConversationLog([]);
    setRephrasedExpressions([]);
    setAiTranscripts([]);
    onSessionEnd();
  };

  useEffect(() => {
    return () => {
      chatRef.current?.disconnect();
    };
  }, [scenario?.title]);

  // Auto-start conversation when component mounts
  useEffect(() => {
    startConversation();
  }, []);

  // Show session result or video call interface
  if (showSessionResult) {
    return (
      <SessionResult 
        conversationLog={conversationLog}
        rephrasedExpressions={rephrasedExpressions}
        onClose={handleCloseResult}
      />
    );
  }

  return (
    <VideoCallInterface 
      scenario={{
        id: scenario.id,
        title: scenario.title,
        description: scenario.description,
        counterpart: scenario.role_target
      }} 
      onEndCall={endConversation}
      isConnected={isConnected}
      isConnecting={isConnecting}
      isSpeaking={isSpeaking}
      isUserSpeaking={isUserSpeaking}
      aiTranscripts={aiTranscripts}
    />
  );

};

export default VoiceInterface;