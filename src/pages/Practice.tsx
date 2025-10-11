import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import VoiceInterface from '@/components/VoiceInterface';
import SceneSetupChat from '@/components/SceneSetupChat';
import PreparationPage from '@/components/PreparationPage';
import ProgressBar from '@/components/ProgressBar';
import ScenarioSelection from '@/components/ScenarioSelection';
import { Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Step = 'userInfo' | 'scenarioSelection' | 'sceneSetup' | 'preparation' | 'roleplay';

interface ScenarioData {
  title: string;
  description: string;
  partner: string;
  service: string;
  problem: string;
  agenda: string;
  goal: string;
}

interface UserInfo {
  job: string;
  industry: string;
}

interface CaseData {
  service: string;
  problem: string;
  agenda: string;
  goal: string;
  job: string;
  industry: string;
}

const Practice = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<Step>('userInfo');
  const [userInfo, setUserInfo] = useState<UserInfo>({ job: '', industry: '' });
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<any>(null);
  const [preselectedScenario, setPreselectedScenario] = useState<ScenarioData | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
  }, [user, navigate]);

  const handleStartScenarioSelection = () => {
    if (!userInfo.job || !userInfo.industry) {
      toast({
        title: "정보 누락",
        description: "직무와 업계를 선택해주세요.",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep('scenarioSelection');
  };

  const handleScenarioSelect = (scenario: ScenarioData) => {
    setPreselectedScenario(scenario);
    setCurrentStep('sceneSetup');
  };

  const handleCustomInput = () => {
    setPreselectedScenario(null);
    setCurrentStep('sceneSetup');
  };

  const handleBackToUserInfo = () => {
    setCurrentStep('userInfo');
    setPreselectedScenario(null);
  };

  const handleSceneSetupComplete = (data: CaseData) => {
    setCaseData(data);
    setCurrentStep('preparation');
  };

  const handlePreparationComplete = () => {
    if (caseData) {
      const scenario = {
        id: Date.now().toString(),
        title: caseData.agenda,
        description: `${caseData.service} - ${caseData.problem}`,
        role_target: 'Business Partner',
        prompt: `You are a business partner. The user is a ${caseData.job} working on ${caseData.service}. They are facing ${caseData.problem}. Today's meeting is about ${caseData.agenda}. The goal is to ${caseData.goal}. Conduct a natural, professional business conversation in English. Start with: "Good morning. Thanks for joining. Let's discuss ${caseData.agenda}."`,
      };
      setSelectedScenario(scenario);
      setCurrentStep('roleplay');
    }
  };

  const handleSessionEnd = () => {
    setSelectedScenario(null);
    setCaseData(null);
    setUserInfo({ job: '', industry: '' });
    setPreselectedScenario(null);
    setCurrentStep('userInfo');
  };

  const getCurrentStepNumber = (): number => {
    switch (currentStep) {
      case 'scenarioSelection': return 0;
      case 'sceneSetup': return 1;
      case 'preparation': return 2;
      case 'roleplay': return 3;
      default: return 0;
    }
  };

  if (!user) return null;

  // Show progress bar for steps 1-4
  const showProgressBar = currentStep !== 'userInfo' && currentStep !== 'scenarioSelection';

  // Step 0: Scenario Selection
  if (currentStep === 'scenarioSelection') {
    return (
      <ScenarioSelection
        job={userInfo.job}
        industry={userInfo.industry}
        onScenarioSelect={handleScenarioSelect}
        onCustomInput={handleCustomInput}
        onBack={handleBackToUserInfo}
      />
    );
  }

  // Step 1: Scene Setup Chat
  if (currentStep === 'sceneSetup') {
    return (
      <div className="min-h-screen bg-background">
        {showProgressBar && <ProgressBar currentStep={getCurrentStepNumber()} />}
        <SceneSetupChat
          job={userInfo.job}
          industry={userInfo.industry}
          preselectedScenario={preselectedScenario}
          onComplete={handleSceneSetupComplete}
        />
      </div>
    );
  }

  // Step 2: Preparation (Case Brief + Warm-up)
  if (currentStep === 'preparation' && caseData) {
    return (
      <div className="min-h-screen bg-background">
        {showProgressBar && <ProgressBar currentStep={getCurrentStepNumber()} />}
        <PreparationPage caseData={caseData} onNext={handlePreparationComplete} />
      </div>
    );
  }

  // Step 3: Realtime Role-play
  if (currentStep === 'roleplay' && selectedScenario) {
    return (
      <div className="min-h-screen bg-background">
        {showProgressBar && <ProgressBar currentStep={getCurrentStepNumber()} />}
        <VoiceInterface 
          scenario={selectedScenario} 
          caseData={caseData}
          onSessionEnd={handleSessionEnd} 
        />
      </div>
    );
  }

  // Step 0: User Info Input
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              홈으로 돌아가기
            </Button>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              맞춤 영어 회화 연습
            </h1>
            <p className="text-lg text-muted-foreground">
              4단계 몰입형 Role-play로 실무 영어를 연습하세요
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>기본 정보 입력</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 직무 선택 */}
              <div className="space-y-2">
                <Label htmlFor="job">직무</Label>
                <Select value={userInfo.job} onValueChange={(value) => setUserInfo(prev => ({ ...prev, job: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="직무를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CEO">CEO</SelectItem>
                    <SelectItem value="BD/Sales">BD/Sales</SelectItem>
                    <SelectItem value="PM/PO">PM/PO</SelectItem>
                    <SelectItem value="마케터">마케터</SelectItem>
                    <SelectItem value="기타">기타(직접 입력)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 업계 선택 */}
              <div className="space-y-2">
                <Label htmlFor="industry">업계</Label>
                <Select value={userInfo.industry} onValueChange={(value) => setUserInfo(prev => ({ ...prev, industry: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="업계를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IT & SaaS">IT & SaaS</SelectItem>
                    <SelectItem value="소비재 브랜드">소비재 브랜드</SelectItem>
                    <SelectItem value="헬스케어">헬스케어</SelectItem>
                    <SelectItem value="첨단 제조 (반도체, 자동차, 화학 등)">첨단 제조 (반도체, 자동차, 화학 등)</SelectItem>
                    <SelectItem value="컨설팅 & 전문서비스">컨설팅 & 전문서비스</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleStartScenarioSelection}
                disabled={!userInfo.job || !userInfo.industry}
                className="w-full"
                size="lg"
              >
                맞춤 시나리오 생성하기
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Practice;