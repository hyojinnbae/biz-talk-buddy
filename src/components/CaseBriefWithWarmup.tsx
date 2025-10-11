import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Briefcase, Target, AlertCircle, CheckCircle, Volume2, Play, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CaseData {
  service: string;
  problem: string;
  context: string;
  goal: string;
  job: string;
  industry: string;
}

interface CaseBriefWithWarmupProps {
  caseData: CaseData;
  scenarioTitle: string;
  onNext: () => void;
}

interface Expression {
  text: string;
  isPlaying: boolean;
}

const CaseBriefWithWarmup = ({ caseData, scenarioTitle, onNext }: CaseBriefWithWarmupProps) => {
  const [expressions, setExpressions] = useState<Expression[]>([]);
  const [isGenerating, setIsGenerating] = useState(true);
  const [isPlayingAll, setIsPlayingAll] = useState(false);

  useEffect(() => {
    generateExpressions();
  }, [caseData]);

  const generateExpressions = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-scenarios', {
        body: {
          type: 'warmup-expressions',
          caseData,
          count: 5
        }
      });

      if (error) throw error;

      const generatedExpressions = data.expressions.map((text: string) => ({
        text,
        isPlaying: false
      }));

      setExpressions(generatedExpressions);
    } catch (error) {
      console.error('Error generating expressions:', error);
      toast.error('Failed to generate warm-up expressions');
      // Fallback expressions
      setExpressions([
        { text: `We're preparing to discuss ${caseData.problem.toLowerCase()}.`, isPlaying: false },
        { text: `The situation is: ${caseData.context.toLowerCase()}.`, isPlaying: false },
        { text: `Our goal is to ${caseData.goal.toLowerCase()}.`, isPlaying: false },
        { text: "I'd like to share our perspective on this matter.", isPlaying: false },
        { text: "Let's work together to find the best solution.", isPlaying: false }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const playExpression = async (index: number) => {
    const expression = expressions[index];
    if (!expression || expression.isPlaying) return;

    setExpressions(prev => prev.map((exp, i) => 
      i === index ? { ...exp, isPlaying: true } : exp
    ));

    try {
      const utterance = new SpeechSynthesisUtterance(expression.text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onend = () => {
        setExpressions(prev => prev.map((exp, i) => 
          i === index ? { ...exp, isPlaying: false } : exp
        ));
      };

      utterance.onerror = () => {
        setExpressions(prev => prev.map((exp, i) => 
          i === index ? { ...exp, isPlaying: false } : exp
        ));
        toast.error('Failed to play audio');
      };

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error playing expression:', error);
      setExpressions(prev => prev.map((exp, i) => 
        i === index ? { ...exp, isPlaying: false } : exp
      ));
      toast.error('Failed to play audio');
    }
  };

  const playAll = async () => {
    setIsPlayingAll(true);
    
    for (let i = 0; i < expressions.length; i++) {
      await new Promise<void>((resolve) => {
        const expression = expressions[i];
        const utterance = new SpeechSynthesisUtterance(expression.text);
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        setExpressions(prev => prev.map((exp, idx) => 
          idx === i ? { ...exp, isPlaying: true } : exp
        ));

        utterance.onend = () => {
          setExpressions(prev => prev.map((exp, idx) => 
            idx === i ? { ...exp, isPlaying: false } : exp
          ));
          setTimeout(resolve, 800);
        };

        utterance.onerror = () => {
          setExpressions(prev => prev.map((exp, idx) => 
            idx === i ? { ...exp, isPlaying: false } : exp
          ));
          resolve();
        };

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      });
    }
    
    setIsPlayingAll(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Briefcase className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Case Brief | {scenarioTitle}</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {caseData.job}
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Case Brief Section */}
          <div className="space-y-4">
            {/* Service */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-muted-foreground mb-1">Service</p>
                <p className="text-base">{caseData.service}</p>
              </div>
            </div>

            {/* Problem */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-muted-foreground mb-1">Problem</p>
                <p className="text-base">{caseData.problem}</p>
              </div>
            </div>

            {/* Context */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-muted-foreground mb-1">Context</p>
                <p className="text-base">{caseData.context}</p>
              </div>
            </div>

            {/* Goal */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-muted-foreground mb-1">Goal</p>
                <p className="text-base">{caseData.goal}</p>
              </div>
            </div>
          </div>

          {/* Warm-up Expressions Section */}
          <div className="pt-6 border-t">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Warm-up Expressions</h3>
              {expressions.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={playAll}
                  disabled={isPlayingAll || isGenerating}
                >
                  {isPlayingAll ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Playing...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Play All
                    </>
                  )}
                </Button>
              )}
            </div>

            {isGenerating ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Generating expressions...</span>
              </div>
            ) : (
              <div className="space-y-3">
                {expressions.map((expression, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <span className="text-sm font-semibold text-muted-foreground mt-0.5">
                      {index + 1}.
                    </span>
                    <p className="flex-1 text-sm leading-relaxed">{expression.text}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => playExpression(index)}
                      disabled={expression.isPlaying}
                      className="flex-shrink-0"
                    >
                      {expression.isPlaying ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Call to action */}
          <div className="pt-6 text-center">
            <Button 
              onClick={onNext} 
              size="lg" 
              className="w-full md:w-auto"
              disabled={isGenerating}
            >
              🎙️ Start Role-play
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseBriefWithWarmup;
