import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import VoiceInterface from '@/components/VoiceInterface';
import { ArrowLeft, Target, Users, Mic, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Step = 'userInfo' | 'scenarios' | 'conversation';

interface UserInfo {
  job: string;
  industry: string;
  customSituation?: string;
  customPartner?: string;
  customIndustry?: string;
}

interface GeneratedScenario {
  title: string;
  counterpart: string;
  openingLine: string;
  caseBrief?: string;
}

const Practice = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<Step>('userInfo');
  const [userInfo, setUserInfo] = useState<UserInfo>({ job: '', industry: '' });
  const [generatedScenarios, setGeneratedScenarios] = useState<GeneratedScenario[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customScenario, setCustomScenario] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
  }, [user, navigate]);

  const generateScenarios = async () => {
    if (!userInfo.job || !userInfo.industry) {
      toast({
        title: "정보 누락",
        description: "모든 정보를 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-scenarios', {
        body: {
          jobRole: userInfo.job,
          industry: userInfo.industry,
          customSituation: userInfo.customSituation,
        }
      });

      if (error) throw error;

      if (Array.isArray(data)) {
        setGeneratedScenarios(data);
        setCurrentStep('scenarios');
        
        toast({
          title: "시나리오 생성 완료",
          description: "맞춤 시나리오가 준비되었습니다!",
        });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      toast({
        title: "오류",
        description: "시나리오 생성에 실패했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleScenarioSelect = (scenario: GeneratedScenario) => {
    const fullScenario = {
      id: Date.now().toString(),
      title: scenario.title,
      description: `${scenario.title} - ${scenario.counterpart}와의 실무 대화`,
      role_target: scenario.counterpart,
      greeting: scenario.openingLine,
      caseBrief: scenario.caseBrief || `Your company is working on ${scenario.title.toLowerCase()}. As a ${userInfo.job} in the ${userInfo.industry} industry, you're facing a critical decision point that requires alignment with stakeholders.\n\nThis conversation will focus on addressing key concerns, negotiating terms or priorities, and finding a mutually beneficial path forward. Be prepared to discuss specific metrics, timelines, and trade-offs.`,
      prompt: `당신은 ${scenario.counterpart}의 역할을 맡아 영어로 대화해주세요. 상황: ${scenario.title}. 업계는 ${userInfo.industry}입니다. 첫 인사말: "${scenario.openingLine}" 자연스럽고 실무적인 대화를 이끌어주세요.`
    };
    setSelectedScenario(fullScenario);
    setCurrentStep('conversation');
  };

  const handleSessionEnd = () => {
    setSelectedScenario(null);
    setCurrentStep('userInfo');
  };

  const handleCustomScenarioSubmit = () => {
    if (customScenario.trim()) {
      const customScenarioObj = {
        id: 'custom',
        title: '직접 입력한 시나리오',
        description: customScenario,
        role_target: '맞춤 상대방',
        prompt: `당신은 다음 상황에서 대화 상대방 역할을 맡아 영어로 대화해주세요. 상황: ${customScenario}. 자연스럽고 실무적인 대화를 이끌어주세요.`
      };
      setSelectedScenario(customScenarioObj);
      setCurrentStep('conversation');
    }
  };

  const goBack = () => {
    if (currentStep === 'scenarios') {
      setCurrentStep('userInfo');
    } else if (currentStep === 'conversation') {
      setCurrentStep('scenarios');
    }
  };

  if (!user) return null;

  // 음성 회화 중일 때
  if (currentStep === 'conversation' && selectedScenario) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={goBack}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              시나리오 선택으로 돌아가기
            </Button>
          </div>
          
          <VoiceInterface 
            scenario={selectedScenario} 
            onSessionEnd={handleSessionEnd}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Step 1: 유저 정보 입력 */}
          {currentStep === 'userInfo' && (
            <>
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
                  직무에 맞는 실무 상황을 추천해드립니다
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    기본 정보 입력
                  </CardTitle>
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
                        <SelectItem value="BD">BD</SelectItem>
                        <SelectItem value="PM/PO">PM/PO</SelectItem>
                        <SelectItem value="개발자">개발자</SelectItem>
                        <SelectItem value="마케터">마케터</SelectItem>
                        <SelectItem value="기타(직접 입력)">기타(직접 입력)</SelectItem>
                      </SelectContent>
                    </Select>
                    {userInfo.job === '기타(직접 입력)' && (
                      <Textarea
                        placeholder="예: 해외 인플루언서와 첫 마케팅 미팅"
                        value={userInfo.customSituation || ''}
                        onChange={(e) => setUserInfo(prev => ({ ...prev, customSituation: e.target.value }))}
                      />
                    )}
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
                        <SelectItem value="제조">제조</SelectItem>
                        <SelectItem value="헬스케어">헬스케어</SelectItem>
                        <SelectItem value="금융">금융</SelectItem>
                        <SelectItem value="무역 & 물류">무역 & 물류</SelectItem>
                        <SelectItem value="소비재">소비재</SelectItem>
                        <SelectItem value="교육">교육</SelectItem>
                        <SelectItem value="컨설팅 & 전문서비스">컨설팅 & 전문서비스</SelectItem>
                        <SelectItem value="기타(직접 입력)">기타(직접 입력)</SelectItem>
                      </SelectContent>
                    </Select>
                    {userInfo.industry === '기타(직접 입력)' && (
                      <Textarea
                        placeholder="예: 미디어 & 엔터테인먼트, 바이오테크, 항공우주, 스포츠 마케팅"
                        value={userInfo.customIndustry || ''}
                        onChange={(e) => setUserInfo(prev => ({ ...prev, customIndustry: e.target.value }))}
                      />
                    )}
                  </div>

                  <Button 
                    onClick={generateScenarios}
                    disabled={!userInfo.job || !userInfo.industry || isLoading}
                    className="w-full"
                    size="lg"
                  >
                    {isLoading ? "시나리오 생성 중..." : "맞춤 시나리오 생성하기"}
                  </Button>
                </CardContent>
              </Card>
            </>
          )}

          {/* Step 2: AI 추천 시나리오 선택 */}
          {currentStep === 'scenarios' && (
            <>
              <div className="mb-6 flex items-center gap-4">
                <Button variant="ghost" onClick={goBack} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  정보 수정하기
                </Button>
              </div>
              
              <div className="text-center mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                  추천 시나리오 선택
                </h1>
                <p className="text-lg text-muted-foreground">
                  {userInfo.job} · {userInfo.industry}에 맞는 시나리오입니다
                </p>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {generatedScenarios.map((scenario, index) => (
                    <Card 
                      key={index} 
                      className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                      onClick={() => handleScenarioSelect(scenario)}
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <Badge variant="outline">실무 상황</Badge>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                            {scenario.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                            "{scenario.openingLine}"
                          </p>
                        </div>
                        
                        <div className="pt-2 border-t border-border">
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4" />
                            <span className="font-medium">대화 상대:</span>
                            <span className="text-muted-foreground">{scenario.counterpart}</span>
                          </div>
                        </div>
                        
                          <Button className="w-full" variant="outline">
                            <Mic className="w-4 h-4 mr-2" />
                            지금 연습하기
                          </Button>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <div className="flex justify-center gap-4">
                  <Button 
                    onClick={generateScenarios}
                    disabled={isLoading}
                    variant="outline"
                    className="gap-2"
                  >
                    <Target className="w-4 h-4" />
                    {isLoading ? "새 시나리오 생성 중..." : "다른 시나리오 보기"}
                  </Button>
                  <Button 
                    onClick={() => setShowCustomInput(!showCustomInput)}
                    variant="outline"
                    className="gap-2"
                  >
                    직접 입력하기
                  </Button>
                </div>

                {showCustomInput && (
                  <div className="mt-8">
                    <Card className="p-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">직접 시나리오 입력</h3>
                        <p className="text-sm text-muted-foreground">
                          예: 미국 인플루언서와 홍보 캠페인 조건 논의
                        </p>
                        <Textarea
                          value={customScenario}
                          onChange={(e) => setCustomScenario(e.target.value)}
                          placeholder="연습하고 싶은 상황을 자세히 설명해주세요..."
                          className="resize-none h-24"
                        />
                        <Button 
                          onClick={handleCustomScenarioSubmit}
                          disabled={!customScenario.trim()}
                          className="w-full"
                          size="lg"
                        >
                          <Mic className="w-4 h-4 mr-2" />
                          지금 연습하기
                        </Button>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Practice;