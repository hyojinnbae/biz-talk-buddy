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
            <div className="mt-6 p-6 bg-secondary-foreground/10 rounded-lg text-sm space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>선착순 50명 – 2개월 무료 구독 제공</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>실리콘밸리 실무 표현 100선 공개</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>글로벌 실무자 네트워킹 초청</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" className="group">
              <Mic className="w-5 h-5" />
              무료 대기자 등록하기
              <span className="text-xs opacity-80 ml-2">더 많은 기회를 말로 만드는 연습</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/20">
              📄 직무별 표현 100선 PDF 받기
              <ArrowRight className="w-4 h-4 ml-2" />
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