import { Lightbulb, MessageSquare, FileText } from "lucide-react";
export const Solution = () => {
  return <section className="py-20 bg-background" aria-label="AI 영어 회화 솔루션">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success-subtle text-success text-sm font-medium">
              <Lightbulb className="w-4 h-4" />
              우리의 제안
            </div>
            <h2 className="text-3xl font-bold leading-tight lg:text-3xl">하루 10분, 꾸준히 말해야 실력이 됩니다</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 space-y-6 text-left">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <MessageSquare className="w-8 h-8" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">내 실무 상황 선택</h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  직무·대화 상대·주제·상황 선택 또는<br />
                  자유 프롬프트 입력 가능<br />
                  내 미래 커리어에 필요한 Case Study를<br />
                  가장 효과적으로 연습합니다.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 space-y-6 text-left">
              <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <MessageSquare className="w-8 h-8" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">AI가 대화를 리드</h3>
                <p className="text-muted-foreground leading-relaxed">자연스러운 Role-play로 별도 준비 불필요<br />AI 코치가 음성 대화하며 더 나은 표현을<br />자연스럽게 제안합니다.</p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-success/5 to-success/10 border border-success/20 space-y-6 text-left">
              <div className="w-16 h-16 rounded-xl bg-success/10 flex items-center justify-center text-success">
                <FileText className="w-8 h-8" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">다 끝나면 복습 자료 완성</h3>
                <p className="text-muted-foreground leading-relaxed">대화 로그와 표현 카드가 자동 정리되어<br />필요할 때 꺼내보고 원하는 문장 위주로<br />복습 가능합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};