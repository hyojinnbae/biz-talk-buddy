import { Button } from "@/components/ui/button";
import { Play, Mic, ArrowRight } from "lucide-react";
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
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                이메일, 문서는 되는데…
                <span className="block bg-gradient-hero bg-clip-text text-transparent">
                  왜 회의만 하면
                </span>
                입이 막히나요?
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                실무는 결국 말로 설득하고, 말로 조율합니다.<br />
                PM·BD·마케터를 위한 실리콘밸리식 영어 리허설.<br />
                이제 실제 업무 상황을 AI와 말하며 연습하세요.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                <Play className="w-5 h-5" />
                무료로 리허설 시작하기
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                데모 보기
              </Button>
            </div>
            
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                혼자서도 실전처럼
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                심리적 부담 없이
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                직무별 맞춤 시나리오
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