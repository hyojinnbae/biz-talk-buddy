import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { Features } from "@/components/Features";
import { Scenarios } from "@/components/Scenarios";
import { Comparison } from "@/components/Comparison";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Features />
        <Scenarios />
        <Comparison />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
    </div>
  );
};

export default Index;
