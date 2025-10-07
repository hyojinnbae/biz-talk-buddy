import { AlertTriangle, Clock, Users } from "lucide-react";
export const Problem = () => {
  return <section className="py-20 bg-muted/30" aria-label="실무자 영어 회화 문제점">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-medium">
              <AlertTriangle className="w-4 h-4" />
              실무자의 현실
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight py-[3px]">
              실무 영어 회화의 현실적 어려움<br />
              <span className="text-muted-foreground">비즈니스 영어는 계속 사용해야 실력이 유지됩니다</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4 p-6 rounded-xl bg-background border border-border">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">이메일과 문서는 잘 되는데</h3>
              <p className="text-muted-foreground">텍스트로는 완벽한데 말로 하면 
괜히 긴장되고 표현이 어색한지 
불안합니다.</p>
            </div>

            <div className="space-y-4 p-6 rounded-xl bg-background border border-border">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">미팅이나 전화만 하면 
머릿속이 긴장되고</h3>
              <p className="text-muted-foreground">"이 표현이 맞나?" 싶어서 
결국 말을 줄이게 되고, 
준비했던 말도 잊어버립니다.</p>
            </div>

            <div className="space-y-4 p-6 rounded-xl bg-background border border-border">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">결국 기회가 조용히 지나갑니다</h3>
              <p className="text-muted-foreground">말하고 싶었던 아이디어, 
제안하려던 솔루션이 
기회를 놓치고 맙니다.</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="p-6 rounded-xl bg-muted/50 border border-border">
              <h3 className="text-lg font-bold mb-4 text-center">📊 실무자 2,500명 설문조사 결과</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">커리어 발전을 위해 영어가 중요하며,  
이로 인한 장벽을 느낀 적 있다</div>
                  <p className="text-muted-foreground text-left">커리어 발전을 위해 영어가 중요하며, 
이로 인한 장벽을 느낀 적 있다</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">74%</div>
                  <p className="text-muted-foreground text-left">영어 중요성의 이유는 승진 등  
커리어 발전 및 해외 파트너와의 원활한 소통</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-primary text-primary-foreground text-center">
              <h3 className="text-2xl font-bold mb-4">영어 실력이 부족한 게 아닙니다.</h3>
              <p className="text-lg opacity-90 mb-4">
                효과적인 방법으로 연습할 기회가 없었을 뿐이에요.
              </p>
              <p className="text-lg opacity-90 font-semibold">
                Protalk는 이를 해결하는 직무 맞춤형 AI 영어 시뮬레이션입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};