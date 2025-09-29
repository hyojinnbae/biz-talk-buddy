import { Button } from "@/components/ui/button";
import { Play, Mic, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-business-meeting.jpg";

export const Hero = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-subtle text-primary text-sm font-medium">
                <Mic className="w-4 h-4" />
                실무 영어 리허설 AI 코치
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight bg-gradient-hero bg-clip-text text-transparent">
                현장에서 바로 통하는 실무 영어 시뮬레이션
              </h1>
               <div className="space-y-3 text-muted-foreground">
                 <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-primary"></div>
                   <span>실전과 같은 환경에서 실시간 회화</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-primary"></div>
                   <span>내 직무·레벨에 맞춘 시나리오</span>
                 </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span>Fortune 500 미팅 수준 대화</span>
                  </div>
              </div>
               <p className="text-lg text-muted-foreground leading-relaxed">
                 매일 내 상황 맞춤 시나리오 연습으로<br />
                 자신감과 전문성을 함께 성장시키세요.
               </p>
            </div>
            
            <div className="flex justify-start">
              <Button variant="hero" size="lg" className="group" asChild>
                <Link to="/practice">
                  <Mic className="w-5 h-5" />
                  지금 연습하기
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                가격 협상
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                프로젝트 조율
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                발표 리허설
              </div>
            </div>
          </div>
          
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl blur-2xl"></div>
            <img 
              src={heroImage} 
              alt="Professional business meeting"
              className="relative rounded-2xl shadow-elegant w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};