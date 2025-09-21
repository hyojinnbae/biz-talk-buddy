import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { Features } from "@/components/Features";
import { Comparison } from "@/components/Comparison";
import { Scenarios } from "@/components/Scenarios";
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
        <Comparison />
        <Scenarios />
        <FAQ />
        <CTA />
      </main>
    </div>
  );
};

export default Index;
