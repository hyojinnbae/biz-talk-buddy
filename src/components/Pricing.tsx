import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Plan {
  id: string;
  name: string;
  amount: number;
  duration_months: number;
  monthly_limit: number;
}

export const Pricing = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const { data } = await supabase
        .from('plans')
        .select('*')
        .order('amount');
      
      if (data) setPlans(data);
    };
    fetchPlans();
  }, []);

  const handleSelectPlan = async (planId: string, amount: number) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/auth');
      return;
    }

    if (amount === 0) {
      // Free trial - directly activate
      navigate('/practice');
    } else {
      // Paid plan - go to payment
      navigate(`/payment?planId=${planId}`);
    }
  };

  const freePlan = plans.find(p => p.amount === 0);
  const oneMonthPlan = plans.find(p => p.duration_months === 1);
  const threeMonthPlan = plans.find(p => p.duration_months === 3);

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">가격</h2>
            <p className="text-lg text-muted-foreground">
              합리적인 가격으로 무제한 영어 리허설을 경험하세요
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Free Trial */}
            {freePlan && (
              <Card className="p-6 border-border">
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">{freePlan.name}</h3>
                    <div className="text-3xl font-bold text-primary">무료</div>
                    <p className="text-sm text-muted-foreground mt-2">
                      최대 {freePlan.monthly_limit}회 체험
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-sm">무료 체험 {freePlan.monthly_limit}회</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-sm">기본 시나리오</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => handleSelectPlan(freePlan.id, freePlan.amount)}
                  >
                    무료 체험 시작
                  </Button>
                </div>
              </Card>
            )}

            {/* 1 Month Plan */}
            {oneMonthPlan && (
              <Card className="p-6 border-primary/50 relative">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                  인기
                </Badge>
                
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">{oneMonthPlan.name}</h3>
                    <div className="text-3xl font-bold text-primary">
                      {oneMonthPlan.amount.toLocaleString()}원
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      월 {oneMonthPlan.monthly_limit}회 이용
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-sm">월 {oneMonthPlan.monthly_limit}회 세션</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-sm">전체 시나리오 이용</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-sm">대화 로그 저장</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full"
                    onClick={() => handleSelectPlan(oneMonthPlan.id, oneMonthPlan.amount)}
                  >
                    구매하기
                  </Button>
                </div>
              </Card>
            )}

            {/* 3 Month Plan */}
            {threeMonthPlan && (
              <Card className="p-6 border-accent/50 relative bg-gradient-to-br from-accent/5 to-primary/5">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent">
                  <Gift className="w-3 h-3 mr-1" />
                  최고 할인
                </Badge>
                
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">{threeMonthPlan.name}</h3>
                    <div className="text-3xl font-bold text-primary">
                      {threeMonthPlan.amount.toLocaleString()}원
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      월 {threeMonthPlan.monthly_limit}회 × 3개월
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-sm font-medium">3개월 이용권</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-sm">월 {threeMonthPlan.monthly_limit}회 세션</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-sm">전체 시나리오 이용</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-sm">대화 로그 저장</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full"
                    onClick={() => handleSelectPlan(threeMonthPlan.id, threeMonthPlan.amount)}
                  >
                    구매하기
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};