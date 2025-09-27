import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import VoiceInterface from '@/components/VoiceInterface';
import { ArrowLeft, Clock, Users, Target } from 'lucide-react';

const Practice = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [scenarios, setScenarios] = useState<any[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    fetchScenarios();
  }, [user, navigate]);

  const fetchScenarios = async () => {
    try {
      const { data, error } = await supabase
        .from('scenarios')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setScenarios(data || []);
    } catch (error) {
      console.error('Error fetching scenarios:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSessionEnd = (sessionData: any) => {
    // Navigate to results or back to scenario selection
    setSelectedScenario(null);
  };

  if (!user) return null;

  if (selectedScenario) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedScenario(null)}
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              연습 시나리오 선택
            </h1>
            <p className="text-lg text-muted-foreground">
              실무 상황에 맞는 시나리오를 선택하고 AI 코치와 영어 대화를 연습하세요
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground">시나리오를 불러오는 중...</div>
            </div>
          ) : scenarios.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground">아직 사용 가능한 시나리오가 없습니다.</div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scenarios.map((scenario) => (
                <Card key={scenario.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setSelectedScenario(scenario)}>
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <Badge variant="outline">{scenario.difficulty_level}</Badge>
                      {scenario.estimated_duration && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {scenario.estimated_duration}분
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{scenario.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {scenario.description}
                      </p>
                    </div>
                    
                    {scenario.role_target && (
                      <div className="pt-2 border-t border-border">
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4" />
                          <span className="font-medium">역할:</span>
                          <span className="text-muted-foreground">{scenario.role_target}</span>
                        </div>
                      </div>
                    )}
                    
                    {scenario.tags && scenario.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {scenario.tags.slice(0, 3).map((tag: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <Button className="w-full" variant="outline">
                      <Target className="w-4 h-4 mr-2" />
                      이 시나리오로 연습하기
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Practice;