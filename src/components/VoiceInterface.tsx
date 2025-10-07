import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { RealtimeChat } from '@/utils/RealtimeAudio';
import { useAuth } from '@/hooks/useAuth';
import { Mic, MicOff, MessageSquare, Phone, PhoneOff, Volume2 } from 'lucide-react';
import { VideoCallInterface } from './VideoCallInterface';
import { SessionResult } from './SessionResult';

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
  const [conversationLog, setConversationLog] = useState<Array<{role: string, text: string, timestamp: Date}>>([]);
  const [rephrasedExpressions, setRephrasedExpressions] = useState<Array<{original: string, rephrased: string}>>([]);
  const chatRef = useRef<RealtimeChat | null>(null);
  const { user } = useAuth();
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleMessage = (event: any) => {
    if (event.type === 'response.audio_transcript.delta') {
      setTranscript(prev => prev + event.delta);
      setAiTranscript(prev => prev + event.delta);
    } else if (event.type === 'response.audio_transcript.done') {
      if (transcript) {
        setMessages(prev => [...prev, { role: 'assistant', content: transcript }]);
        setConversationLog(prev => [...prev, { role: 'assistant', text: transcript, timestamp: new Date() }]);
        setTranscript('');
      }
    } else if (event.type === 'conversation.item.input_audio_transcription.completed') {
      if (event.transcript) {
        setConversationLog(prev => [...prev, { role: 'user', text: event.transcript, timestamp: new Date() }]);
      }
    } else if (event.type === 'input_audio_buffer.speech_started') {
      setIsUserSpeaking(true);
    } else if (event.type === 'input_audio_buffer.speech_stopped') {
      setIsUserSpeaking(false);
    } else if (event.type === 'response.audio.delta') {
      setIsSpeaking(true);
    } else if (event.type === 'response.done') {
      setIsSpeaking(false);
      setTimeout(() => {
        setAiTranscript('');
      }, 2000);
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
    setShowResult(true);
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

  if (showResult) {
    return (
      <SessionResult 
        conversationLog={conversationLog}
        rephrasedExpressions={rephrasedExpressions}
        onClose={onSessionEnd}
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
      aiTranscript={aiTranscript}
    />
  );

};

export default VoiceInterface;