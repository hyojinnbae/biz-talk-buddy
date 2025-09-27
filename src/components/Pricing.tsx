import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Gift, FileText, Users } from "lucide-react";
import { Link } from "react-router-dom";

export const Pricing = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              가격
            </h2>
            <p className="text-lg text-muted-foreground">
              합리적인 가격으로 무제한 영어 리허설을 경험하세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Regular Price */}
            <Card className="p-8 border-border relative">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">정기 구독</h3>
                  <div className="text-4xl font-bold text-primary">
                    월 19,000원
                  </div>
                  <p className="text-muted-foreground mt-2">
                    원하는 때에 20분 단위의 수업 무제한 가능
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm">무제한 AI 리허설 세션</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm">실시간 표현 리프레이즈</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm">대화 로그 및 복습 자료</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm">직무별 맞춤 시나리오</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Early Bird Special */}
            <Card className="p-8 border-primary/50 relative bg-gradient-to-br from-primary/5 to-accent/5">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                선착순 한정
              </Badge>
              
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">지금 시작하시면</h3>
                  <div className="text-4xl font-bold text-primary line-through opacity-50">
                    월 19,000원
                  </div>
                  <div className="text-5xl font-bold text-success">
                    무료
                  </div>
                  <p className="text-muted-foreground mt-2">
                    선착순 50명 대상 2개월 무료 구독
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Gift className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">2개월 무료 구독 제공</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm font-medium">직무별 실리콘밸리 실무 표현 100선 제공</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm font-medium">실무 영어 루틴 플래너 (Notion 템플릿) 제공</span>
                  </div>
                </div>
                
                <Button className="w-full" variant="default" size="lg" asChild>
                  <Link to="/auth">
                    <Users className="w-5 h-5 mr-2" />
                    무료 대기자 등록하기
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};