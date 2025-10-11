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

type StepType = 'service' | 'problem' | 'context' | 'goal' | 'summary';


const SceneSetupChat = ({ job, industry, preselectedScenario, onComplete }: SceneSetupChatProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<StepType>('service');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  
  // Extract meeting purpose from scenario
  const scenario = preselectedScenario?.title || '';
  const meetingPurpose = preselectedScenario?.agenda || '';
  
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'ai' | 'user', text: string }>>([
    { role: 'ai', text: `Great, you've chosen "${scenario}". Let's make this situation more concrete.` },
    { role: 'ai', text: "Which product or service are we talking about?" }
  ]);

  // Fetch options from OpenAI API
  const fetchOptions = async (step: StepType) => {
    setIsLoadingOptions(true);
    try {
      const { data, error } = await supabase.functions.invoke('scene-setup-options', {
        body: { 
          step, 
          job, 
          industry, 
          scenario,
          meetingPurpose,
          service: answers.service || '',
          problem: answers.problem || '',
          context: answers.context || ''
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
      console.error('Error:', error);
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

  // Load initial options
  useEffect(() => {
    const loadInitialOptions = async () => {
      const options = await fetchOptions('service');
      setCurrentOptions(options);
    };
    loadInitialOptions();
  }, []);

  const getCurrentQuestion = (): string => {
    switch (currentStep) {
      case 'service':
        return "Which product or service are we talking about?";
      case 'problem':
        return "What issue are you focusing on in this meeting?";
      case 'context':
        return "Which situation fits better?";
      case 'goal':
        return "What's your main goal for today's meeting?";
      default:
        return '';
    }
  };

  const getNextStep = (current: StepType): StepType => {
    const steps: StepType[] = ['service', 'problem', 'context', 'goal', 'summary'];
    const currentIndex = steps.indexOf(current);
    return steps[currentIndex + 1] || 'summary';
  };

  const handleAnswer = async (answer: string) => {
    const newAnswers = { ...answers, [currentStep]: answer };
    setAnswers(newAnswers);

    // Add to chat history
    setChatHistory(prev => [
      ...prev,
      { role: 'user', text: answer },
    ]);

    if (currentStep !== 'goal') {
      // Load next step's options
      const nextStep = getNextStep(currentStep);
      setCurrentStep(nextStep);
      
      if (nextStep !== 'summary') {
        setChatHistory(prev => [
          ...prev,
          { role: 'ai', text: getCurrentQuestion() }
        ]);
        
        // Fetch options for next step
        const options = await fetchOptions(nextStep);
        setCurrentOptions(options);
      }
    } else {
      // Generate case brief and complete
      setTimeout(() => {
        const caseData: CaseData = {
          service: newAnswers.service || '',
          problem: newAnswers.problem || '',
          agenda: newAnswers.context || '',
          goal: newAnswers.goal || '',
          job,
          industry
        };
        
        const briefText = `Got it. You're a ${job} preparing for a ${scenario} meeting about ${caseData.service}. The challenge is ${caseData.problem.toLowerCase()}, with context: ${caseData.agenda.toLowerCase()}. Your goal is to ${caseData.goal.toLowerCase()}.`;
        
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
              <div className="flex items-center justify-center gap-2 py-8">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-muted-foreground">Generating options...</span>
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
          {(['service', 'problem', 'context', 'goal'] as const).map((step, idx) => {
            const stepOrder: StepType[] = ['service', 'problem', 'context', 'goal'];
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
