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
              이젠 내 업무 상황 그대로 리허설하세요.
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
                  직무, 레벨, 회의 상대, 주제를 선택하거나 자유롭게 입력해서 
                  실제 업무 상황과 동일한 시나리오를 만듭니다.
                </p>
              </div>
            </div>

            <div className="space-y-6 text-left">
              <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <MessageSquare className="w-8 h-8" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">AI가 실제 미팅처럼 시나리오를 만들고</h3>
                <p className="text-muted-foreground leading-relaxed">
                  음성 대화로 연습하며, 내가 말한 문장을 
                  즉시 더 자연스럽고 설득력 있는 표현으로 제안합니다.
                </p>
              </div>
            </div>

            <div className="space-y-6 text-left">
              <div className="w-16 h-16 rounded-xl bg-success/10 flex items-center justify-center text-success">
                <FileText className="w-8 h-8" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">더 나은 표현을 알려줍니다</h3>
                <p className="text-muted-foreground leading-relaxed">
                  대화 후엔 말한 내용과 표현 카드가 자동으로 정리돼요. 
                  다음 회의에서 바로 쓸 수 있도록요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};