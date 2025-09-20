import { Button } from "@/components/ui/button";
import { Play, Mic, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-business-meeting.jpg";

export const Hero = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-subtle text-primary text-sm font-medium">
                <Mic className="w-4 h-4" />
                AI Business Communication Coach
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Practice Real
                <span className="block bg-gradient-hero bg-clip-text text-transparent">
                  Business English
                </span>
                with AI
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Rehearse meetings, negotiations, and presentations with AI. 
                Get real-time feedback and Silicon Valley-level expressions to speak confidently in any business situation.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                <Play className="w-5 h-5" />
                Start Free Rehearsal
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                20-minute sessions
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                No human judgment
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                Real scenarios
              </div>
            </div>
          </div>
          
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl blur-2xl"></div>
            <img 
              src={heroImage} 
              alt="Professional business meeting"
              className="relative rounded-2xl shadow-elegant w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};