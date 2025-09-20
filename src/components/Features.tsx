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
    title: "Role-Based Scenarios",
    description: "Practice with scenarios tailored to your role: BD, PM, Marketing. From deal negotiations to KPI reviews.",
    color: "text-primary"
  },
  {
    icon: Mic2,
    title: "AI Voice Conversations",
    description: "Engage in natural voice conversations with AI. Practice speaking, not just listening.",
    color: "text-accent"
  },
  {
    icon: MessageSquare,
    title: "Real-Time Rephrase",
    description: "Get instant suggestions to transform awkward expressions into Silicon Valley-level business language.",
    color: "text-success"
  },
  {
    icon: Clock,
    title: "20-Minute Sessions",
    description: "Perfect practice sessions that fit your busy schedule. Quality over quantity.",
    color: "text-primary"
  },
  {
    icon: BookOpen,
    title: "Review Cards",
    description: "Automatically generated flashcards with your improved expressions and practical tips.",
    color: "text-accent"
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "See your improvement over time with detailed analytics and personalized recommendations.",
    color: "text-success"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Why ProTalk AI Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlike generic conversation apps or expensive tutors, we focus specifically 
            on business communication that matters for your career.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-elegant transition-all duration-300 hover:scale-105 border-border"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
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