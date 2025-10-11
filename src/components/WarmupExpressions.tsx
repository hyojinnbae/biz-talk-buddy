import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Volume2, Play, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CaseData {
  service: string;
  problem: string;
  agenda: string;
  goal: string;
  job: string;
  industry: string;
}

interface WarmupExpressionsProps {
  caseData: CaseData;
  onNext: () => void;
}

const WarmupExpressions = ({ caseData, onNext }: WarmupExpressionsProps) => {
  const { toast } = useToast();
  const [expressions, setExpressions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(true);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [audioElements, setAudioElements] = useState<Record<number, HTMLAudioElement>>({});

  useEffect(() => {
    generateExpressions();
  }, []);

  const generateExpressions = async () => {
    try {
      // Generate key expressions based on case data
      const generatedExpressions = [
        `Our ${caseData.service.toLowerCase()} is facing ${caseData.problem.toLowerCase()}.`,
        `We need to discuss ${caseData.agenda.toLowerCase()}.`,
        `Our goal is to ${caseData.goal.toLowerCase()}.`,
        `Let me share our current situation with you.`,
        `What's your perspective on this challenge?`,
        `How can we move forward together?`
      ];
      
      setExpressions(generatedExpressions);
      setIsGenerating(false);
    } catch (error) {
      console.error('Error generating expressions:', error);
      toast({
        title: "오류",
        description: "표현 생성에 실패했습니다.",
        variant: "destructive",
      });
      setIsGenerating(false);
    }
  };

  const playExpression = async (text: string, index: number) => {
    if (playingIndex !== null) {
      // Stop currently playing audio
      audioElements[playingIndex]?.pause();
    }

    setPlayingIndex(index);

    try {
      // Use browser's built-in speech synthesis
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      
      utterance.onend = () => {
        setPlayingIndex(null);
      };

      utterance.onerror = () => {
        setPlayingIndex(null);
        toast({
          title: "재생 오류",
          description: "음성 재생에 실패했습니다.",
          variant: "destructive",
        });
      };

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error playing audio:', error);
      setPlayingIndex(null);
      toast({
        title: "재생 오류",
        description: "음성 재생에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const playAll = async () => {
    for (let i = 0; i < expressions.length; i++) {
      await new Promise(resolve => {
        setPlayingIndex(i);
        const utterance = new SpeechSynthesisUtterance(expressions[i]);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        utterance.onend = () => {
          resolve(true);
        };
        window.speechSynthesis.speak(utterance);
      });
      
      // Pause between expressions
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    setPlayingIndex(null);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Volume2 className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Warm-up Expressions</h2>
          </div>
          <p className="text-muted-foreground">
            회화 전 핵심 문장을 듣고 따라 말하며 준비하세요
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {isGenerating ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">표현 생성 중...</span>
            </div>
          ) : (
            <>
              {/* Expression list */}
              <div className="space-y-3">
                {expressions.map((expr, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                      playingIndex === idx
                        ? 'bg-primary/10 border-primary'
                        : 'bg-card hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <Button
                        size="icon"
                        variant={playingIndex === idx ? "default" : "outline"}
                        onClick={() => playExpression(expr, idx)}
                        disabled={playingIndex !== null && playingIndex !== idx}
                      >
                        {playingIndex === idx ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <p className="flex-1 text-base leading-relaxed">{expr}</p>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <Button
                  onClick={playAll}
                  variant="outline"
                  className="flex-1"
                  disabled={playingIndex !== null}
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  Play All (~1.5분)
                </Button>
                <Button onClick={onNext} className="flex-1">
                  Start Role-play ▶
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WarmupExpressions;
