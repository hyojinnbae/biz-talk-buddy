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
              실리콘밸리에서 실제 사용하는 영어 표현들로,<br />
              내가 할 미팅을 미리 말해보는 연습.
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="space-y-6 text-left">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <MessageSquare className="w-8 h-8" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">상황을 선택하거나 직접 입력하면</h3>
                <p className="text-muted-foreground leading-relaxed">
                  직무 / 레벨 / 대화 상대 / 주제 선택<br />
                  또는 자유 프롬프트 입력도 가능합니다.
                </p>
              </div>
            </div>

            <div className="space-y-6 text-left">
              <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <MessageSquare className="w-8 h-8" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">AI가 회의 시나리오를 만들어주고</h3>
                <p className="text-muted-foreground leading-relaxed">
                  음성으로 말하고, 자연스럽게 리프레이즈를 받아요.<br />
                  AI가 상대 역할, 내가 말한 문장을 더 자연스럽게 바꿔줍니다.
                </p>
              </div>
            </div>

            <div className="space-y-6 text-left">
              <div className="w-16 h-16 rounded-xl bg-success/10 flex items-center justify-center text-success">
                <FileText className="w-8 h-8" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">다 끝나면?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  대화 로그 + 표현 카드가 자동으로 정리돼요.<br />
                  자주 틀리는 문장 위주로 복습 가능합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};