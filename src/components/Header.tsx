import { Button } from "@/components/ui/button";
import { Mic, Users, Target } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Mic className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">protalk</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
          <a href="#scenarios" className="text-foreground hover:text-primary transition-colors">Scenarios</a>
          <a href="#pricing" className="text-foreground hover:text-primary transition-colors">Pricing</a>
        </nav>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">Sign In</Button>
          <Button variant="hero" size="sm">Get Started</Button>
        </div>
      </div>
    </header>
  );
};