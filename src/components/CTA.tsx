import { Button } from "@/components/ui/button";
import { ArrowRight, Mic, Users, Target } from "lucide-react";
import { Link } from "react-router-dom";

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
              대화를 주도하고 싶었던 순간,<br />
              내 표현이 더 프로페셔널했다면.. 하는 생각<br />
              해보신 적 있으셨나요?<br /><br />
              내 전문성을 업그레이드하는 연습.<br /><br />
              실제 글로벌 미팅 대화로 매일 15분,<br />
              회의 주도력과 설득력을 훈련하세요.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Button variant="accent" size="lg" className="group" asChild>
              <Link to="/practice">
                <Mic className="w-5 h-5" />
                지금 연습하기
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform ml-2" />
              </Link>
            </Button>
          </div>
          
        </div>
      </div>
    </section>
  );
};