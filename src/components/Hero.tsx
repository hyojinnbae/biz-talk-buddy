import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/ai-partner-professional.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-background overflow-hidden" aria-label="메인 히어로 섹션">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 opacity-20">
        <div className="flex flex-col gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/30 rotate-45"></div>
          <div className="w-8 h-8 rounded-lg bg-primary/20 rotate-45"></div>
          <div className="w-8 h-8 rounded-lg bg-primary/10 rotate-45"></div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in max-w-2xl">
            {/* Eyebrow text */}
            <div className="inline-block">
              <p className="text-primary font-medium text-lg font-en">
                Optimize Your Business English
              </p>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-foreground">
              현장에서 바로 통하는
              <br />
              중고급 실무영어
            </h1>

            {/* Description */}
            <div className="space-y-4">
              <ul className="space-y-3 text-lg text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>실전과 같은 환경에서 시뮬레이션</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>내 직무에 맞춘 시나리오 제공</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>실전 Case Study 기반 대화</span>
                </li>
              </ul>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg pt-2">
                매일 내 상황에 맞춘 Case Study로<br />
                자신감과 전문성을 동시에 성장시키세요.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                size="lg" 
                className="bg-gradient-primary text-primary-foreground hover:opacity-90 font-semibold px-8 h-12 rounded-lg shadow-lg text-lg"
                asChild
              >
                <Link to="/practice">
                  지금 시작하기
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Image & Stats */}
          <div className="relative animate-scale-in">
            {/* Stats Card */}
            <div className="absolute top-8 -left-12 z-10 bg-background rounded-2xl shadow-elegant p-6 border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">1,000+</div>
                  <div className="text-sm text-muted-foreground">실전 연습 완료</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-3xl blur-3xl"></div>
              <img 
                src={heroImage} 
                alt="AI 실무 영어 회화 연습 - 전문적인 비즈니스 환경에서 영어 대화 스킬 향상" 
                className="relative rounded-3xl w-full h-auto object-cover shadow-2xl" 
                loading="eager" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};