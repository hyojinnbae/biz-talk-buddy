import { AlertTriangle, Clock, Users } from "lucide-react";

export const Problem = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-medium">
              <AlertTriangle className="w-4 h-4" />
              실무자의 현실
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
              하루에도 몇 번씩 영어로 회의하죠.<br />
              <span className="text-muted-foreground">그런데 왜 말할 때마다 긴장되시나요?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4 p-6 rounded-xl bg-background border border-border">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">이메일과 문서는 어떻게든 되는데</h3>
              <p className="text-muted-foreground">
                텍스트로는 완벽한데 말로 하면 버벅거리고 표현이 어색해집니다.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-xl bg-background border border-border">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">미팅이나 전화만 하면 머릿속이 하얘지고</h3>
              <p className="text-muted-foreground">
                "이 표현이 맞나?" 싶어서 결국 말을 줄이게 되고, 준비했던 말도 잊어버립니다.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-xl bg-background border border-border">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">결국 기회가 조용히 지나갑니다</h3>
              <p className="text-muted-foreground">
                말하고 싶었던 아이디어, 제안하려던 솔루션이 기회를 놓치고 맙니다.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-primary text-primary-foreground">
            <h3 className="text-2xl font-bold mb-4">영어 실력이 부족한 게 아닙니다.</h3>
            <p className="text-lg opacity-90">
              그냥 연습할 기회가 없었을 뿐이에요.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};