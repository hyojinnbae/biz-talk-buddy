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
    title: "프롬프트 기반 시나리오 생성",
    description: "직무, 레벨, 회의 상대, 주제 선택 또는 직접 입력해서 내 상황 입력 가능 → 실제 업무 미팅처럼 연습 가능",
    color: "text-primary",
    badge: "MVP"
  },
  {
    icon: Mic2,
    title: "실시간 음성 대화 + 리프레이즈",
    description: "AI가 상대 역할로 대화하고, 내가 말한 문장을 즉시 더 자연스럽게 고쳐줌 → 실수에서 배우는 영어 루틴",
    color: "text-accent",
    badge: "MVP"
  },
  {
    icon: BookOpen,
    title: "대화 후 복습 자료 자동 생성",
    description: "대화 스크립트 저장, 핵심 표현 카드 제공 (자주 쓰는 말 + 고쳐야 할 말) → 업무에 바로 쓰는 회화 노트 완성",
    color: "text-success",
    badge: "MVP"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            주요 기능 (MVP 중심 3가지)
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            실무자가 실제로 필요한 핵심 기능에만 집중했습니다.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-8 hover:shadow-elegant transition-all duration-300 hover:scale-105 border-border relative"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className={`w-16 h-16 rounded-xl bg-muted flex items-center justify-center ${feature.color}`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    ✅ {feature.badge}
                  </span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};