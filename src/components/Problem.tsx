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
              영어로 회의할 일 꼭 있으시죠?<br />
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

          <div className="space-y-8">
            <div className="p-6 rounded-xl bg-muted/50 border border-border">
              <h3 className="text-lg font-bold mb-4 text-center">📊 실무자 2,500명 설문조사 결과</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">77%</div>
                  <p className="text-muted-foreground">커리어 발전을 위해 영어가 중요하며, 이로 인한 장벽을 느낀 적 있다</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">74%</div>
                  <p className="text-muted-foreground">영어 중요성의 이유는 승진 등 커리어 발전 및 해외 파트너와의 원활한 소통</p>
                </div>
              </div>
              <div className="mt-4 p-6 rounded-lg bg-background border-l-4 border-primary space-y-4">
                <h4 className="font-semibold text-foreground mb-3">외국인 동료 앞에서 얼어붙고, 퇴근 길에 기가 죽던 과거의 나에게......</h4>
                
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>저도 그랬습니다.</p>
                  
                  <p>영어를 듣고 읽을 수 있다고 생각했습니다. 막상 회의를 하니 입이 움직이지 않고, 머리가 하얘졌어요.</p>
                  
                  <p><span className="font-semibold">'이 말은 틀린 문법이 아닐까?' '내가 지금 무슨 말을 하고 있는 거지?'</span> 자책만 남았죠.</p>
                  
                  <p>전화 영어, 튜터링도 해봤습니다. 무려 7년간.</p>
                  
                  <p>그런데 외국인 튜터와 나눈 대화는, 제가 실제로 써야 할 <span className="font-semibold text-primary">회의, 협상, 설득, 조율</span> 표현과는 거리가 멀었습니다.</p>
                  
                  <p>그런데 지금 저는 영어로 토론이 많기로 유명한 해외 학업 과정을 무사히 마쳤고,</p>
                  
                  <p><span className="font-semibold text-primary">글로벌 BD로서 해외 시장 진출과 파트너십 체결 업무를 맡고 있습니다.</span></p>
                  
                  <p>돌파구는 '무작정하는 영어 공부'가 아니었어요.<br />
                  <span className="font-semibold text-primary">바로 내 업무 상황에 딱 맞는 표현을 익히고, 실제로 연습하는 것이었습니다.</span></p>
                  
                  <p>그래서, 저도 여러분이 일반 회화 앱이 아닌</p>
                  
                  <p><span className="font-semibold text-primary">'실무 영어 리허설 툴'을 가질 수 있도록 'Protalk AI'를 만들었습니다.</span></p>
                  
                  <p>여러분도 훈련에서 오는 <span className="font-semibold text-primary">자신감</span>, 그리고 영어로 자유롭게 말할 수 있는 능력에서 오는 <span className="font-semibold text-primary">더 넓은 세상</span>을 경험하게 될 것입니다.</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-primary text-primary-foreground text-center">
              <h3 className="text-2xl font-bold mb-4">영어 실력이 부족한 게 아닙니다.</h3>
              <p className="text-lg opacity-90">
                효과적인 방법으로 연습할 기회가 없었을 뿐이에요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};