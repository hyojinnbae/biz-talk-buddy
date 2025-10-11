import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Target, ClipboardList, Trophy, Volume2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface CaseData {
  service: string;
  problem: string;
  agenda: string;
  goal: string;
  job: string;
  industry: string;
}

interface PreparationPageProps {
  caseData: CaseData;
  onStartRoleplay: () => void;
}

export const PreparationPage = ({ caseData, onStartRoleplay }: PreparationPageProps) => {
  const [expressions, setExpressions] = useState<string[]>([]);
  const [loadingExpressions, setLoadingExpressions] = useState(true);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    generateExpressions();
  }, [caseData]);

  const generateExpressions = async () => {
    setLoadingExpressions(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-scenarios", {
        body: {
          action: "warmup_expressions",
          caseData,
        },
      });

      if (error) throw error;
      
      if (data?.expressions && Array.isArray(data.expressions)) {
        setExpressions(data.expressions);
      }
    } catch (error) {
      console.error("Error generating expressions:", error);
      toast({
        title: "Error",
        description: "Failed to generate warm-up expressions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingExpressions(false);
    }
  };

  const playExpression = (expression: string, index: number) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(expression);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      
      setPlayingIndex(index);
      
      utterance.onend = () => {
        setPlayingIndex(null);
      };
      
      utterance.onerror = () => {
        setPlayingIndex(null);
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Not supported",
        description: "Your browser doesn't support text-to-speech.",
        variant: "destructive",
      });
    }
  };

  const caseItems = [
    { icon: Briefcase, label: "Service/Product", value: caseData.service },
    { icon: Target, label: "Problem", value: caseData.problem },
    { icon: ClipboardList, label: "Agenda", value: caseData.agenda },
    { icon: Trophy, label: "Goal", value: caseData.goal },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      {/* Case Brief Section - 20% */}
      <div className="h-[20vh] border-b border-primary/20 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex flex-col justify-center">
          <h2 className="text-lg md:text-xl font-bold text-primary mb-3">Case Brief</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary shrink-0" />
              <span className="font-semibold text-muted-foreground">Service/Product:</span>
              <span className="text-foreground">{caseData.service}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary shrink-0" />
              <span className="font-semibold text-muted-foreground">Problem:</span>
              <span className="text-foreground">{caseData.problem}</span>
            </div>
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-primary shrink-0" />
              <span className="font-semibold text-muted-foreground">Agenda:</span>
              <span className="text-foreground">{caseData.agenda}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-primary shrink-0" />
              <span className="font-semibold text-muted-foreground">Goal:</span>
              <span className="text-foreground">{caseData.goal}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Warm-up Expressions Section - 80% */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2">
              <Volume2 className="w-6 h-6 text-primary" />
              Warm-up Expressions
            </h2>
            <p className="text-base text-muted-foreground">
              회화 전 핵심 문장을 듣고 따라 말하며 준비하세요
            </p>
          </div>

          {loadingExpressions ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-3">
                {expressions.map((expression, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                  >
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => playExpression(expression, index)}
                      disabled={playingIndex === index}
                      className="shrink-0 h-10 w-10"
                    >
                      {playingIndex === index ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </Button>
                    <p className="flex-1 text-foreground">{expression}</p>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Button
                  onClick={onStartRoleplay}
                  size="lg"
                  className="w-full text-lg font-semibold"
                >
                  Start Role-play ▶
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
