import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Handshake, 
  Presentation, 
  Users, 
  Target, 
  MessageSquare, 
  Briefcase
} from "lucide-react";

const scenarios = [
  {
    icon: Briefcase,
    title: "BD - 미국 파트너와 가격 협상",
    example: "Can we revisit the pricing structure for Q4?",
    role: "BD Manager",
    level: "Intermediate",
    description: "글로벌 파트너사와의 딜 협상 상황을 실전처럼 연습",
    participants: "You + US VP",
    duration: "15 min",
    color: "bg-primary/10 text-primary"
  },
  {
    icon: Users,
    title: "PM - 인도 개발자와 일정 조율",
    example: "Let's make sure we're aligned on the timeline.",
    role: "Product Manager",
    level: "Advanced",
    description: "글로벌 개발팀과의 프로젝트 일정 및 우선순위 조율",
    participants: "You + India Dev Team",
    duration: "20 min",
    color: "bg-accent/10 text-accent"
  },
  {
    icon: Presentation,
    title: "마케터 - 글로벌 캠페인 결과 공유",
    example: "Here's how we performed against the KPIs.",
    role: "Marketing Manager",
    level: "Intermediate",
    description: "캠페인 성과 분석 및 최적화 전략 제안",
    participants: "You + Global Marketing Director",
    duration: "18 min",
    color: "bg-success/10 text-success"
  },
  {
    icon: Target,
    title: "CEO - 해외 투자자 대상 피칭 리허설",
    example: "We're currently raising a pre-Series A round.",
    role: "Founder/CEO",
    level: "Expert",
    description: "시리즈 A 투자 유치를 위한 피칭 연습",
    participants: "You + VC Partner",
    duration: "30 min",
    color: "bg-primary/10 text-primary"
  },
  {
    icon: MessageSquare,
    title: "CS - 유럽 고객 컴플레인 응대",
    example: "We truly apologize for the inconvenience caused.",
    role: "Customer Success",
    level: "Intermediate",
    description: "글로벌 고객의 불만사항 해결 및 관계 회복",
    participants: "You + European Client",
    duration: "12 min",
    color: "bg-accent/10 text-accent"
  }
];

export const Scenarios = () => {
  return (
    <section id="scenarios" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            시나리오 갤러리
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            실제 업무에서 마주하는 상황, 미리 연습하세요
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] border-border bg-gradient-to-br from-background via-background to-muted/20"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl ${scenario.color} flex items-center justify-center`}>
                    <scenario.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className="text-xs bg-background/80 backdrop-blur-sm">
                    {scenario.level}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-bold mb-1">{scenario.title}</h3>
                    <p className="text-sm text-primary font-medium">{scenario.role}</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-primary/10 border-l-4 border-primary backdrop-blur-sm">
                    <p className="text-sm font-medium text-primary">"{scenario.example}"</p>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {scenario.description}
                  </p>
                  
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>참가자:</span>
                      <span className="font-medium">{scenario.participants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>시간:</span>
                      <span className="font-medium">{scenario.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};