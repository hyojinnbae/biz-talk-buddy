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
    title: "프롬프트 기반 대화 시나리오 생성",
    description: "직무 / 레벨 / 대화 상대 / 주제 선택 또는 자유 프롬프트 입력도 가능 → 실제 업무 미팅처럼 연습 가능",
    color: "text-primary",
    badge: "MVP"
  },
  {
    icon: Mic2,
    title: "실시간 음성 대화 + 리프레이즈",
    description: "AI가 상대 역할, 내가 말한 문장을 더 자연스럽게 바꿔줌 → 실수에서 배우는 영어 루틴",
    color: "text-accent",
    badge: "MVP"
  },
  {
    icon: BookOpen,
    title: "대화 후 복습 자료 자동 생성",
    description: "스크립트 저장 + 표현 카드 생성, 자주 틀리는 문장 위주로 복습 가능 → 업무에 바로 쓰는 회화 노트 완성",
    color: "text-success",
    badge: "MVP"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-3xl font-bold text-gray-900">
            핵심 기능
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            글로벌 비즈니스를 책임지는 실무자·관리자가 실제로 필요한 핵심 기능에만 집중했습니다
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-base text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};