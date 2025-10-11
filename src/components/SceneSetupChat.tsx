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

interface SceneSetupChatProps {
  job: string;
  industry: string;
  onComplete: (caseData: CaseData) => void;
}

const SceneSetupChat = ({ job, industry, onComplete }: SceneSetupChatProps) => {
  const [currentTurn, setCurrentTurn] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'ai' | 'user', text: string }>>([
    { role: 'ai', text: `${job} · ${industry} 분야에서 실무 영어 회화를 연습하시는군요! 몇 가지만 선택해주시면 맞춤 시나리오를 준비해드릴게요.` }
  ]);

  const questions = [
    {
      id: 'service',
      question: "What's your company or product?",
      options: [
        'AI design SaaS platform',
        'Beauty & skincare brand',
        'Healthcare data analytics',
        'Manufacturing tech solution'
      ]
    },
    {
      id: 'problem',
      question: "What challenge are you facing?",
      options: [
        'Low brand awareness',
        'High customer churn rate',
        'Product quality issues',
        'Delayed project timeline'
      ]
    },
    {
      id: 'agenda',
      question: "What's today's meeting about?",
      options: [
        'Marketing strategy in new market',
        'Partnership renewal discussion',
        'Product improvement plan',
        'Budget and resource allocation'
      ]
    },
    {
      id: 'goal',
      question: "What's your goal today?",
      options: [
        'Build trust with partner',
        'Close a deal or agreement',
        'Get constructive feedback',
        'Align on next steps'
      ]
    }
  ];

  const handleAnswer = (questionId: string, answer: string) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    // Add to chat history
    setChatHistory(prev => [
      ...prev,
      { role: 'user', text: answer },
    ]);

    if (currentTurn < questions.length) {
      // Show next question
      setTimeout(() => {
        setChatHistory(prev => [
          ...prev,
          { role: 'ai', text: questions[currentTurn].question }
        ]);
        setCurrentTurn(currentTurn + 1);
      }, 500);
    } else {
      // Generate case brief and complete
      setTimeout(() => {
        const caseData: CaseData = {
          service: newAnswers.service || 'AI design SaaS platform',
          problem: newAnswers.problem || 'Low brand awareness',
          agenda: newAnswers.agenda || 'Marketing strategy in new market',
          goal: newAnswers.goal || 'Build trust with partner',
          job,
          industry
        };

        setChatHistory(prev => [
          ...prev,
          { 
            role: 'ai', 
            text: `Got it! You're a ${job} working on ${caseData.service}. You're facing ${caseData.problem.toLowerCase()}, and today's meeting is about ${caseData.agenda.toLowerCase()}. Your goal is to ${caseData.goal.toLowerCase()}. Let's prepare for this!` 
          }
        ]);

        setTimeout(() => {
          onComplete(caseData);
        }, 2000);
      }, 500);
    }
  };

  const currentQuestion = currentTurn <= questions.length ? questions[currentTurn - 1] : null;

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
        {currentQuestion && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">
              {currentQuestion.question}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentQuestion.options.map((option, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="h-auto py-4 px-6 text-left justify-start hover:bg-primary hover:text-primary-foreground transition-all"
                  onClick={() => handleAnswer(currentQuestion.id, option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Progress indicator */}
        <div className="mt-8 flex justify-center gap-2">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 w-12 rounded-full transition-colors ${
                idx < currentTurn ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SceneSetupChat;
