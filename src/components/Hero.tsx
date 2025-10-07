import { Button } from "@/components/ui/button";
import { Play, Mic, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-business-meeting.jpg";

export const Hero = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-subtle" aria-label="메인 히어로 섹션">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-subtle text-primary text-sm font-medium">
                <Mic className="w-4 h-4" />
                실무 영어 리허설 AI 코치
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight text-gray-900">
                현장에서 바로 통하는<br />실무 영어 시뮬레이션
              </h1>
               <p className="text-lg text-gray-600 leading-relaxed mt-6">
                 실전과 같은 환경에서 실시간 회화 연습<br />
                 내 직무·레벨에 맞춘 시나리오로<br />
                 자신감과 전문성을 함께 성장시키세요
               </p>
            </div>
            
            <div className="flex justify-start">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md group" 
                asChild
              >
                <Link to="/practice">
                  지금 시작하기 →
                </Link>
              </Button>
            </div>
            
          </div>
          
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl blur-2xl"></div>
            <img 
              src={heroImage} 
              alt="AI 실무 영어 회화 연습 - 전문적인 비즈니스 미팅 환경에서 영어 대화 스킬 향상"
              className="relative rounded-2xl shadow-elegant w-full h-auto"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};