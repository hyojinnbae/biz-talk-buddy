import { Lightbulb, MessageSquare, FileText } from "lucide-react";

export const Solution = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success-subtle text-success text-sm font-medium">
              <Lightbulb className="w-4 h-4" />
              우리의 제안
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                실제 업무 미팅을 그대로 재현해 연습하세요
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 space-y-6 text-left">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <MessageSquare className="w-8 h-8" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">나의 실무 상황을 선택</h3>
                <p className="text-muted-foreground leading-relaxed">
                  직무 / 레벨 / 대화 상대 / 주제 / 상황 선택<br />
                  자유 프롬프트 입력 가능해,<br />
                  내가 미래 커리어에서 원하는, 또는 곧 사용해야 할 중요한 일정을 위한 가장 효과적인 영어 회화 환경을 조성합니다.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 space-y-6 text-left">
              <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <MessageSquare className="w-8 h-8" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">AI가 회의 시나리오를 만들어주고</h3>
                <p className="text-muted-foreground leading-relaxed">
                  자연스러운 롤플레이로, 내가 어떤 준비도 하지 않아도 돼요. AI 롤플레이 코치가 음성으로 말하고, 내 업무 표현 중 개선이 필요한 부분을 자연스럽게 리프레이즈 해줘요.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-success/5 to-success/10 border border-success/20 space-y-6 text-left">
              <div className="w-16 h-16 rounded-xl bg-success/10 flex items-center justify-center text-success">
                <FileText className="w-8 h-8" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">다 끝나면?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  대화 로그 + 표현 카드가 자동으로 정리되어, 필요한 때에 꺼내볼 수 있어요. 또 암기하고자 하는 문장위주로 복습 가능합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};