import { Card } from "@/components/ui/card";
import { 
  MessageSquare, 
  Target, 
  Clock, 
  BookOpen, 
  Mic2, 
  TrendingUp 
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Case Study 기반 시나리오 생성",
    description: "직무·대화 상대·주제 선택 또는 자유 프롬프트 입력 가능 → 실제 업무 미팅처럼 연습",
    color: "text-primary",
    badge: "MVP"
  },
  {
    icon: Mic2,
    title: "실시간 음성 Role-play + 표현 개선",
    description: "AI가 상대 역할로 대화하며, 더 자연스러운 표현을 즉시 제안 → 실수에서 배우는 영어 루틴",
    color: "text-accent",
    badge: "MVP"
  },
  {
    icon: BookOpen,
    title: "대화 후 복습 자료 자동 생성",
    description: "스크립트 저장과 표현 카드 자동 생성, 자주 틀리는 문장 위주 복습 → 실무용 회화 노트 완성",
    color: "text-success",
    badge: "MVP"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            핵심 기능
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            실무자·관리자에게 필요한 핵심 기능에만 집중했습니다.
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(var(--primary),0.15)] group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative space-y-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-lg ${feature.color}`}>
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};