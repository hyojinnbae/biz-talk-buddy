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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Case Brief Section */}
        <Card className="border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Case Brief
            </CardTitle>
            <CardDescription className="text-base">
              Review the key information for your role-play scenario
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {caseItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-muted-foreground mb-1">
                      {item.label}
                    </p>
                    <p className="text-foreground">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Warm-up Expressions Section */}
        <Card className="border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Warm-up Expressions
            </CardTitle>
            <CardDescription className="text-base">
              Practice these key expressions before starting your role-play
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loadingExpressions ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
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

                <div className="pt-6 border-t">
                  <Button
                    onClick={onStartRoleplay}
                    size="lg"
                    className="w-full text-lg font-semibold"
                  >
                    Start Role-play ▶
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
