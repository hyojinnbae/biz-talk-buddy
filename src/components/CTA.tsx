import { Button } from "@/components/ui/button";
import { ArrowRight, Mic, Users, Target } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-20 bg-gradient-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Transform Your Business Communication?
            </h2>
            <p className="text-lg opacity-90 leading-relaxed">
              Join thousands of professionals who've boosted their confidence and career prospects 
              with AI-powered business English practice. Start your first rehearsal today.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" className="group">
              <Mic className="w-5 h-5" />
              Start Free Trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/20">
              Schedule Demo
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              5,000+ professionals
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              90% confidence boost
            </div>
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4" />
              Free 7-day trial
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};