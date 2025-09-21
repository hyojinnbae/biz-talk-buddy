import { Button } from "@/components/ui/button";
import { ArrowRight, Mic, Users, Target } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-20 bg-gradient-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">
              실무 영어, 이제 혼자서도 리허설처럼.
            </h2>
            <p className="text-lg opacity-90 leading-relaxed">
              말 못 해서 놓쳤던 그 순간들.<br />
              오늘부터는 AI와 함께 준비하세요.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" className="group">
              <Mic className="w-5 h-5" />
              무료로 리허설 시작하기
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/20">
              데모 예약하기
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              1000+ 실무자들이 매일 연습 중
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              15분 평균 리허설 시간
            </div>
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4" />
              7일 무료 체험 기간
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};