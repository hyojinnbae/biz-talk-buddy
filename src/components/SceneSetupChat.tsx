import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

interface CaseData {
  service: string;
  problem: string;
  context: string;
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

// Service options (2 choices only)
const getServiceOptions = (scenarioTitle: string) => {
  if (scenarioTitle.includes('Market Entry') || scenarioTitle.includes('Marketing')) {
    return ['Skincare brand for Japanese market', 'K-beauty online retail platform'];
  } else if (scenarioTitle.includes('Partnership') || scenarioTitle.includes('Collaboration')) {
    return ['AI dashboard for enterprise clients', 'Cloud-based analytics platform'];
  } else if (scenarioTitle.includes('Review') || scenarioTitle.includes('Performance')) {
    return ['B2B SaaS CRM platform', 'AI-powered marketing automation tool'];
  } else if (scenarioTitle.includes('Negotiation') || scenarioTitle.includes('Quality')) {
    return ['Smart wearable device', 'IoT home automation system'];
  }
  return ['B2B SaaS platform', 'Consumer tech product'];
};

// Problem options (2 choices only)
const getProblemOptions = (scenarioTitle: string) => {
  if (scenarioTitle.includes('Market Entry') || scenarioTitle.includes('Marketing')) {
    return ['Low brand awareness in new market', 'Distribution channel gap'];
  } else if (scenarioTitle.includes('Partnership') || scenarioTitle.includes('Collaboration')) {
    return ['Partnership term discussion', 'Partnership onboarding and KPI alignment'];
  } else if (scenarioTitle.includes('Review') || scenarioTitle.includes('Performance')) {
    return ['Below-target user adoption rate', 'High customer churn rate'];
  } else if (scenarioTitle.includes('Negotiation') || scenarioTitle.includes('Quality')) {
    return ['Quality control standards dispute', 'Delivery timeline concerns'];
  }
  return ['Client retention challenges', 'Product-market fit issues'];
};

// Context options (2 choices only) - replaces agenda
const getContextOptions = (scenarioTitle: string, problem: string) => {
  if (scenarioTitle.includes('Partnership') || scenarioTitle.includes('Collaboration')) {
    return ['Partner proposed 70:30 revenue share', 'Your team prefers 50:50 split for fairness'];
  } else if (scenarioTitle.includes('Market Entry') || scenarioTitle.includes('Marketing')) {
    return ['Local competitor has 45% market share', 'Your brand awareness is only 12% in target market'];
  } else if (scenarioTitle.includes('Review') || scenarioTitle.includes('Performance')) {
    return ['Q1 metrics show 30% below target', 'User feedback indicates onboarding friction'];
  } else if (scenarioTitle.includes('Negotiation') || scenarioTitle.includes('Quality')) {
    return ['Supplier wants to increase price by 15%', 'Your budget allows max 5% increase'];
  }
  return ['Current approach not meeting expectations', 'Need to align on new strategy'];
};

// Goal options (2 choices only)
const getGoalOptions = (scenarioTitle: string) => {
  if (scenarioTitle.includes('Partnership') || scenarioTitle.includes('Collaboration')) {
    return ['Negotiate fairer terms and build trust', 'Secure commitment for long-term partnership'];
  } else if (scenarioTitle.includes('Market Entry') || scenarioTitle.includes('Marketing')) {
    return ['Build brand trust with local partners', 'Present compelling market entry plan'];
  } else if (scenarioTitle.includes('Review') || scenarioTitle.includes('Performance')) {
    return ['Gather actionable feedback for improvement', 'Align on new KPIs and action plan'];
  } else if (scenarioTitle.includes('Negotiation') || scenarioTitle.includes('Quality')) {
    return ['Negotiate better terms within budget', 'Find win-win solution maintaining quality'];
  }
  return ['Build trust and alignment', 'Secure agreement on next steps'];
};

// Questions for preselected scenarios
const getTargetMarketQuestion = (scenarioTitle: string) => {
  if (scenarioTitle.includes('Market Entry') || scenarioTitle.includes('Marketing')) {
    return "What's your target market?";
  } else if (scenarioTitle.includes('Partnership') || scenarioTitle.includes('Collaboration')) {
    return "What type of partnership are you looking for?";
  } else if (scenarioTitle.includes('Review') || scenarioTitle.includes('Performance')) {
    return "What's the main focus of this review?";
  } else if (scenarioTitle.includes('Negotiation') || scenarioTitle.includes('Quality')) {
    return "What's the main issue to address?";
  }
  return "What's the context for this meeting?";
};

const getTargetMarketOptions = (scenarioTitle: string) => {
  if (scenarioTitle.includes('Market Entry') || scenarioTitle.includes('Marketing')) {
    return ['Japan', 'Southeast Asia', 'US'];
  } else if (scenarioTitle.includes('Partnership') || scenarioTitle.includes('Collaboration')) {
    return ['Strategic alliance', 'Distribution partnership', 'Technology partnership'];
  } else if (scenarioTitle.includes('Review') || scenarioTitle.includes('Performance')) {
    return ['Q1 performance metrics', 'User feedback analysis', 'Process improvement'];
  } else if (scenarioTitle.includes('Negotiation') || scenarioTitle.includes('Quality')) {
    return ['Quality standards', 'Delivery timeline', 'Cost optimization'];
  }
  return ['Expansion', 'Optimization', 'Innovation'];
};

const getChallengeQuestion = (target: string) => {
  return "What's your current challenge?";
};

const getChallengeOptions = (scenarioTitle: string) => {
  if (scenarioTitle.includes('Market Entry') || scenarioTitle.includes('Marketing')) {
    return ['Low brand awareness', 'Distribution gap', 'Competitive pricing'];
  } else if (scenarioTitle.includes('Partnership')) {
    return ['Finding right partners', 'Alignment on goals', 'Trust building'];
  } else if (scenarioTitle.includes('Performance') || scenarioTitle.includes('Review')) {
    return ['Below target metrics', 'User adoption issues', 'Process inefficiency'];
  } else if (scenarioTitle.includes('Quality') || scenarioTitle.includes('Supplier')) {
    return ['Quality inconsistency', 'Delivery delays', 'Cost concerns'];
  }
  return ['Resource constraints', 'Market challenges', 'Operational issues'];
};

const getGoalQuestion = () => {
  return "What's your goal for today's meeting?";
};

const getGoalOptionsForPreselected = (challenge: string) => {
  if (challenge.includes('awareness') || challenge.includes('gap')) {
    return ['Build trust', 'Find new partners', 'Present action plan'];
  } else if (challenge.includes('adoption') || challenge.includes('metrics')) {
    return ['Gather feedback', 'Align on improvements', 'Set new targets'];
  } else if (challenge.includes('Quality') || challenge.includes('delay')) {
    return ['Secure commitment', 'Adjust timeline', 'Improve standards'];
  }
  return ['Build trust', 'Close agreement', 'Gather feedback'];
};

const SceneSetupChat = ({ job, industry, preselectedScenario, onComplete }: SceneSetupChatProps) => {
  // Always start with service question (4-step flow: service → problem → context → goal)
  const [currentStep, setCurrentStep] = useState<'service' | 'problem' | 'context' | 'goal' | 'summary'>('service');
  const [answers, setAnswers] = useState<Record<string, string>>({
    title: preselectedScenario?.title || ''
  });
  
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'ai' | 'user', text: string }>>([
    { role: 'ai', text: `Great, you've chosen "${preselectedScenario?.title || 'a scenario'}".` },
    { role: 'ai', text: "Let's make this situation more concrete. We'll set the scene for your meeting." },
    { role: 'ai', text: "Which product or service are we talking about?" }
  ]);

  const getCurrentOptions = () => {
    const scenarioTitle = answers.title || '';
    
    switch (currentStep) {
      case 'service':
        return getServiceOptions(scenarioTitle);
      case 'problem':
        return getProblemOptions(scenarioTitle);
      case 'context':
        return getContextOptions(scenarioTitle, answers.problem || '');
      case 'goal':
        return getGoalOptions(scenarioTitle);
      default:
        return [];
    }
  };

  const getCurrentQuestion = () => {
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

  const getNextStep = (current: string): 'service' | 'problem' | 'context' | 'goal' | 'summary' => {
    const steps: Array<'service' | 'problem' | 'context' | 'goal' | 'summary'> = ['service', 'problem', 'context', 'goal', 'summary'];
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
          context: newAnswers.context || '',
          goal: newAnswers.goal || '',
          job,
          industry
        };
        
        const briefText = `Got it. You're meeting to discuss ${answers.title}. Your situation: ${caseData.context}. Your goal is to ${caseData.goal.toLowerCase()}.`;
        
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

  const getCurrentQuestionForStep = (step: string, currentAnswers: Record<string, string>) => {
    switch (step) {
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

  const currentOptions = getCurrentOptions();
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
          </div>
        )}

        {/* Progress indicator */}
        <div className="mt-8 flex justify-center gap-2">
          {['service', 'problem', 'context', 'goal'].map((step, idx) => {
            const stepOrder = ['service', 'problem', 'context', 'goal'];
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
