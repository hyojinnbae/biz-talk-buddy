import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

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

// Contextual options based on job and industry
const getServiceOptions = (job: string, industry: string) => {
  if (industry.includes('IT & SaaS')) {
    return ['CRM platform', 'AI analytics dashboard', 'Cloud collaboration tool'];
  } else if (industry.includes('소비재')) {
    return ['Skincare brand', 'K-beauty retailer', 'Indie cosmetics label'];
  } else if (industry.includes('헬스케어')) {
    return ['Medical device platform', 'Healthcare data analytics', 'Telemedicine solution'];
  } else if (industry.includes('첨단 제조')) {
    return ['Smart home device', 'Wearable tech', 'Audio equipment'];
  } else if (industry.includes('컨설팅')) {
    return ['Strategy consulting firm', 'Digital transformation services', 'Management advisory'];
  }
  return ['Tech platform', 'Product solution', 'Service provider'];
};

const getProblemOptions = (industry: string) => {
  if (industry.includes('IT & SaaS')) {
    return ['Low adoption rate', 'High churn rate', 'Performance issues'];
  } else if (industry.includes('소비재')) {
    return ['Low brand awareness in new market', 'Declining online engagement'];
  } else if (industry.includes('헬스케어')) {
    return ['Regulatory compliance challenges', 'User adoption barriers'];
  } else if (industry.includes('첨단 제조')) {
    return ['Production delay', 'Supplier quality issue'];
  } else if (industry.includes('컨설팅')) {
    return ['Client retention challenges', 'Project scope creep'];
  }
  return ['Market challenges', 'Operational issues'];
};

const getAgendaOptions = (problem: string) => {
  if (problem.includes('Low adoption') || problem.includes('High churn')) {
    return ['Client onboarding improvement', 'Post-beta performance review'];
  } else if (problem.includes('Low brand awareness')) {
    return ['Online marketing strategy in new market', 'Collaboration with local influencers'];
  } else if (problem.includes('Declining engagement')) {
    return ['Social media content revamp', 'CRM campaign review'];
  } else if (problem.includes('Production delay') || problem.includes('Supplier')) {
    return ['Negotiation with supplier', 'Quality control review meeting'];
  } else if (problem.includes('Regulatory')) {
    return ['Compliance strategy meeting', 'Risk mitigation plan'];
  } else if (problem.includes('Performance')) {
    return ['Technical optimization review', 'Infrastructure upgrade discussion'];
  } else if (problem.includes('retention')) {
    return ['Service improvement plan', 'Value proposition review'];
  }
  return ['Strategy discussion', 'Action plan meeting'];
};

const getGoalOptions = (agenda: string) => {
  if (agenda.includes('improvement') || agenda.includes('review')) {
    return ['Get constructive feedback', 'Align on next steps'];
  } else if (agenda.includes('marketing') || agenda.includes('Collaboration')) {
    return ['Build brand trust', 'Align campaign direction'];
  } else if (agenda.includes('Negotiation') || agenda.includes('supplier')) {
    return ['Secure commitment', 'Adjust delivery schedule'];
  }
  return ['Build trust with partner', 'Close a deal or agreement', 'Gather feedback'];
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
  // If preselected scenario exists, start with target market/challenge questions
  const initialStep = preselectedScenario ? 'target' : 'service';
  const initialAnswers = preselectedScenario ? {
    service: preselectedScenario.service,
    problem: preselectedScenario.problem,
    agenda: preselectedScenario.agenda,
    title: preselectedScenario.title
  } : {};
  
  const [currentStep, setCurrentStep] = useState<'service' | 'problem' | 'agenda' | 'goal' | 'target' | 'challenge' | 'summary'>(initialStep);
  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers);
  
  const getInitialChatHistory = (): Array<{ role: 'ai' | 'user', text: string }> => {
    if (preselectedScenario) {
      return [
        { role: 'ai' as const, text: `Great, you've chosen "${preselectedScenario.title}".` },
        { role: 'ai' as const, text: getTargetMarketQuestion(preselectedScenario.title) }
      ];
    }
    return [
      { role: 'ai' as const, text: `${job} · ${industry} 분야에서 실무 영어 회화를 연습하시는군요! 몇 가지만 선택해주시면 맞춤 시나리오를 준비해드릴게요.` },
      { role: 'ai' as const, text: "What's your product or service?" }
    ];
  };
  
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'ai' | 'user', text: string }>>(getInitialChatHistory());

  const getCurrentOptions = () => {
    if (preselectedScenario) {
      // Simplified flow for preselected scenarios
      switch (currentStep) {
        case 'target':
          return getTargetMarketOptions(answers.title || '');
        case 'challenge':
          return getChallengeOptions(answers.title || '');
        case 'goal':
          return getGoalOptionsForPreselected(answers.challenge || '');
        default:
          return [];
      }
    }
    
    // Original flow for custom scenarios
    switch (currentStep) {
      case 'service':
        return getServiceOptions(job, industry);
      case 'problem':
        return getProblemOptions(industry);
      case 'agenda':
        return getAgendaOptions(answers.problem || '');
      case 'goal':
        return getGoalOptions(answers.agenda || '');
      default:
        return [];
    }
  };

  const getCurrentQuestion = () => {
    if (preselectedScenario) {
      switch (currentStep) {
        case 'target':
          return getTargetMarketQuestion(answers.title || '');
        case 'challenge':
          return getChallengeQuestion(answers.target || '');
        case 'goal':
          return getGoalQuestion();
        default:
          return '';
      }
    }
    
    switch (currentStep) {
      case 'service':
        return "What's your product or service?";
      case 'problem':
        return "What's your current challenge?";
      case 'agenda':
        return "What's today's meeting about?";
      case 'goal':
        return "What's your goal for today's meeting?";
      default:
        return '';
    }
  };

  const getNextStep = (current: string): 'service' | 'problem' | 'agenda' | 'goal' | 'target' | 'challenge' | 'summary' => {
    if (preselectedScenario) {
      const preselectedSteps: Array<'target' | 'challenge' | 'goal' | 'summary'> = ['target', 'challenge', 'goal', 'summary'];
      const currentIndex = preselectedSteps.indexOf(current as any);
      return preselectedSteps[currentIndex + 1];
    }
    
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
        let caseData: CaseData;
        let briefText: string;
        
        if (preselectedScenario) {
          // Use preselected scenario data + user answers
          caseData = {
            service: preselectedScenario.service,
            problem: `${newAnswers.challenge || preselectedScenario.problem}`,
            agenda: `${preselectedScenario.agenda} - ${newAnswers.target || 'target market'}`,
            goal: newAnswers.goal || '',
            job,
            industry
          };
          
          briefText = `Got it. You're a ${job} meeting ${preselectedScenario.partner.toLowerCase()} to discuss ${caseData.agenda.toLowerCase()}. Your challenge is ${caseData.problem.toLowerCase()}, and your goal is to ${caseData.goal.toLowerCase()}.`;
        } else {
          // Original custom scenario flow
          caseData = {
            service: newAnswers.service || '',
            problem: newAnswers.problem || '',
            agenda: newAnswers.agenda || '',
            goal: newAnswers.goal || '',
            job,
            industry
          };
          
          briefText = `Got it! You're a ${job} working on ${caseData.service}. You're facing ${caseData.problem.toLowerCase()}, and today's meeting is about ${caseData.agenda.toLowerCase()}. Your goal is to ${caseData.goal.toLowerCase()}. Let's prepare for this!`;
        }
        
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
    if (preselectedScenario) {
      switch (step) {
        case 'challenge':
          return getChallengeQuestion(currentAnswers.target || '');
        case 'goal':
          return getGoalQuestion();
        default:
          return '';
      }
    }
    
    switch (step) {
      case 'problem':
        return "What's your current challenge?";
      case 'agenda':
        return "What's today's meeting about?";
      case 'goal':
        return "What's your goal for today's meeting?";
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
          {preselectedScenario ? (
            ['target', 'challenge', 'goal'].map((step, idx) => {
              const stepOrder = ['target', 'challenge', 'goal'];
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
            })
          ) : (
            ['service', 'problem', 'agenda', 'goal'].map((step, idx) => {
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
            })
          )}
        </div>
      </Card>
    </div>
  );
};

export default SceneSetupChat;
