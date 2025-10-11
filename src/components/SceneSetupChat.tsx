import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageSquare, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CaseData {
  service: string;
  problem: string;
  agenda: string;
  goal: string;
  job: string;
  industry: string;
}

interface ScenarioData {
  title: string;
  description: string;
  partner: string;
  service: string;
  problem: string;
  agenda: string;
  goal: string;
}

interface SceneSetupChatProps {
  job: string;
  industry: string;
  preselectedScenario?: ScenarioData | null;
  onComplete: (caseData: CaseData) => void;
}

const getMeetingPurpose = (scenario: ScenarioData | null): string => {
  if (!scenario) return 'Strategic discussion';
  
  const title = scenario.title.toLowerCase();
  if (title.includes('board meeting')) return 'Strategic review & decision-making';
  if (title.includes('market entry')) return 'Market expansion planning';
  if (title.includes('partnership')) return 'Partnership negotiation';
  if (title.includes('review')) return 'Performance review & feedback';
  if (title.includes('quality')) return 'Quality assurance discussion';
  
  return 'Strategic discussion';
};

const SceneSetupChat = ({ job, industry, preselectedScenario, onComplete }: SceneSetupChatProps) => {
  const { toast } = useToast();
  const initialStep = 'service';
  const initialAnswers = preselectedScenario ? {
    service: preselectedScenario.service,
    problem: preselectedScenario.problem,
    agenda: preselectedScenario.agenda,
    title: preselectedScenario.title
  } : {};
  
  const getCurrentQuestionForStep = (step: string, currentAnswers: Record<string, string>) => {
    switch (step) {
      case 'service':
        return "What's your product or service?";
      case 'problem':
        return "What's your current challenge?";
      case 'agenda':
        return "What's the specific context?";
      case 'goal':
        return "What's your goal for today's meeting?";
      default:
        return '';
    }
  };
  
  const getInitialChatHistory = (): Array<{ role: 'ai' | 'user', text: string }> => {
    if (preselectedScenario) {
      return [
        { role: 'ai' as const, text: `Great, you've chosen "${preselectedScenario.title}".` },
        { role: 'ai' as const, text: getCurrentQuestionForStep('service', {}) }
      ];
    }
    return [
      { role: 'ai' as const, text: `${job} · ${industry} 분야에서 실무 영어 회화를 연습하시는군요! 몇 가지만 선택해주시면 맞춤 시나리오를 준비해드릴게요.` },
      { role: 'ai' as const, text: "What's your product or service?" }
    ];
  };
  
  const [currentStep, setCurrentStep] = useState<'service' | 'problem' | 'agenda' | 'goal' | 'summary'>(initialStep);
  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'ai' | 'user', text: string }>>(getInitialChatHistory());

  const fetchOptions = async (step: string, previousAnswers: Record<string, string>) => {
    setIsLoadingOptions(true);
    try {
      const meetingPurpose = getMeetingPurpose(preselectedScenario);
      const scenarioTitle = preselectedScenario?.title || 'Custom scenario';
      
      const { data, error } = await supabase.functions.invoke('scene-setup-options', {
        body: {
          job,
          industry,
          scenario: scenarioTitle,
          step,
          previousAnswers,
          meetingPurpose
        }
      });

      if (error) {
        console.error('Error fetching options:', error);
        toast({
          title: "Error",
          description: "Failed to generate options. Please try again.",
          variant: "destructive"
        });
        return [];
      }

      return data.options || [];
    } catch (error) {
      console.error('Error in fetchOptions:', error);
      toast({
        title: "Error",
        description: "Failed to generate options. Please try again.",
        variant: "destructive"
      });
      return [];
    } finally {
      setIsLoadingOptions(false);
    }
  };

  useEffect(() => {
    if (currentStep !== 'summary') {
      fetchOptions(currentStep, answers).then(setCurrentOptions);
    }
  }, [currentStep]);

  const getCurrentQuestion = () => {
    switch (currentStep) {
      case 'service':
        return "What's your product or service?";
      case 'problem':
        return "What's your current challenge?";
      case 'agenda':
        return "What's the specific context?";
      case 'goal':
        return "What's your goal for today's meeting?";
      default:
        return '';
    }
  };

  const getNextStep = (current: string): 'service' | 'problem' | 'agenda' | 'goal' | 'summary' => {
    const steps: Array<'service' | 'problem' | 'agenda' | 'goal' | 'summary'> = ['service', 'problem', 'agenda', 'goal', 'summary'];
    const currentIndex = steps.indexOf(current as any);
    return steps[currentIndex + 1];
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [currentStep]: answer };
    setAnswers(newAnswers);

    // Add to chat history
    setChatHistory(prev => [
      ...prev,
      { role: 'user', text: answer },
    ]);

    if (currentStep !== 'goal') {
      // Show next question
      const nextStep = getNextStep(currentStep);
      setTimeout(() => {
        setCurrentStep(nextStep);
        if (nextStep !== 'summary') {
          setChatHistory(prev => [
            ...prev,
            { role: 'ai', text: getCurrentQuestionForStep(nextStep, newAnswers) }
          ]);
        }
      }, 500);
    } else {
      // Generate case brief and complete
      setTimeout(() => {
        const caseData: CaseData = {
          service: newAnswers.service || '',
          problem: newAnswers.problem || '',
          agenda: newAnswers.agenda || '',
          goal: newAnswers.goal || '',
          job,
          industry
        };
        
        const briefText = `Got it! You're a ${job} working on ${caseData.service}. You're facing ${caseData.problem.toLowerCase()}, and the context is ${caseData.agenda.toLowerCase()}. Your goal is to ${caseData.goal.toLowerCase()}. Let's prepare for this!`;
        
        setChatHistory(prev => [
          ...prev,
          { 
            role: 'ai', 
            text: briefText
          }
        ]);

        setTimeout(() => {
          onComplete(caseData);
        }, 2000);
      }, 500);
    }
  };

  const showOptions = currentStep !== 'summary';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <MessageSquare className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Scene Setup</h2>
        </div>

        {/* Chat messages */}
        <div className="space-y-4 mb-8 max-h-96 overflow-y-auto">
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Current question options */}
        {showOptions && (
          <div className="space-y-3">
            {isLoadingOptions ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentOptions.map((option, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="h-auto py-4 px-6 text-left justify-start hover:bg-primary hover:text-primary-foreground transition-all"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Progress indicator */}
        <div className="mt-8 flex justify-center gap-2">
          {['service', 'problem', 'agenda', 'goal'].map((step, idx) => {
            const stepOrder = ['service', 'problem', 'agenda', 'goal'];
            const currentIndex = stepOrder.indexOf(currentStep);
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            
            return (
              <div
                key={step}
                className={`h-2 w-12 rounded-full transition-colors ${
                  isCompleted || isCurrent ? 'bg-primary' : 'bg-muted'
                }`}
              />
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default SceneSetupChat;
