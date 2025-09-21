import { Button } from "@/components/ui/button";
import { ArrowRight, Mic, Users, Target } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-20 bg-gradient-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">
              자신 있는 말 한마디가 기회를 만듭니다.
            </h2>
            <p className="text-lg opacity-90 leading-relaxed">
              설득하고 싶었던 순간,<br />
              표현이 막혀 기회를 놓친 적 있으셨나요?<br />
              이제는 실리콘밸리식 영어로 내 전문성을 정확히 전달하는 연습.<br />
              혼자서도, 매일 15분이면 충분합니다.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Button variant="accent" size="lg" className="group">
              <Mic className="w-5 h-5" />
              무료 대기자 등록하기
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform ml-2" />
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