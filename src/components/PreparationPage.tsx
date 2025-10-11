import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Volume2 } from 'lucide-react';
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

interface PreparationPageProps {
  caseData: CaseData;
  onNext: () => void;
}

const PreparationPage = ({ caseData, onNext }: PreparationPageProps) => {
  const { toast } = useToast();
  const [sentences, setSentences] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(true);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  useEffect(() => {
    generateWarmupSentences();
  }, []);

  const generateWarmupSentences = async () => {
    try {
      setIsGenerating(true);
      const { data, error } = await supabase.functions.invoke('generate-warmup', {
        body: {
          service: caseData.service,
          problem: caseData.problem,
          agenda: caseData.agenda,
          goal: caseData.goal
        }
      });

      if (error) throw error;

      if (data?.sentences && Array.isArray(data.sentences)) {
        setSentences(data.sentences);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error generating warmup sentences:', error);
      toast({
        title: "문장 생성 실패",
        description: "Warm-up 문장을 생성할 수 없습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const playSentence = async (sentence: string, index: number) => {
    if (playingIndex !== null) {
      window.speechSynthesis.cancel();
    }

    setPlayingIndex(index);

    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    
    utterance.onend = () => {
      setPlayingIndex(null);
    };

    utterance.onerror = () => {
      setPlayingIndex(null);
      toast({
        title: "재생 실패",
        description: "음성을 재생할 수 없습니다.",
        variant: "destructive",
      });
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Case Brief - 상단 20% */}
          <Card className="bg-card/50 backdrop-blur">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-primary">📋 Case Brief</h2>
              <div className="text-sm space-y-2">
                <p><span className="font-medium">Service/Product:</span> {caseData.service}</p>
                <p><span className="font-medium">Problem:</span> {caseData.problem}</p>
                <p><span className="font-medium">Agenda:</span> {caseData.agenda}</p>
                <p><span className="font-medium">Goal:</span> {caseData.goal}</p>
              </div>
            </CardContent>
          </Card>

          {/* Warm-up Expressions - 하단 80% */}
          <Card className="bg-card backdrop-blur">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6 text-primary flex items-center gap-2">
                <Volume2 className="w-6 h-6" />
                Warm-up Expressions
              </h2>

              {isGenerating ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">AI가 맞춤 문장을 생성하고 있습니다...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sentences.map((sentence, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => playSentence(sentence, index)}
                        disabled={playingIndex === index}
                        className="shrink-0"
                      >
                        <Play className={`w-5 h-5 ${playingIndex === index ? 'animate-pulse' : ''}`} />
                      </Button>
                      <p className="text-lg flex-1">{sentence}</p>
                    </div>
                  ))}
                </div>
              )}

              {!isGenerating && sentences.length > 0 && (
                <div className="mt-8 pt-6 border-t">
                  <Button
                    onClick={onNext}
                    size="lg"
                    className="w-full gap-2"
                  >
                    Start Role-play <Play className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PreparationPage;
