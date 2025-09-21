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
              말을 미뤄왔던 그 순간,<br />
              지금 AI와 연습해보세요.
            </p>
            <div className="mt-6 p-6 bg-secondary-foreground/10 rounded-lg text-sm space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>최초 50명에게 2개월 무료 구독권 제공</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>"실리콘밸리 매니저의 표현을 내 것으로" – 한정 공개 표현팩</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>글로벌 BD/PM/마케터 비공개 네트워킹 모임 초청</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" className="group">
              <Mic className="w-5 h-5" />
              무료 대기자 등록하기
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/20">
              직무별 실전 표현 100선 PDF 받기
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