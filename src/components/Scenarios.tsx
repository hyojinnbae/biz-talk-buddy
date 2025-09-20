import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Handshake, 
  Presentation, 
  Users, 
  Target, 
  MessageSquare, 
  Briefcase,
  Play
} from "lucide-react";

const scenarios = [
  {
    icon: Handshake,
    title: "Deal Negotiation",
    role: "BD / Sales",
    level: "Advanced",
    description: "Practice negotiating terms with US partners, handling objections, and closing deals confidently.",
    participants: "You vs. Partner VP",
    duration: "20 min",
    color: "bg-primary-subtle text-primary"
  },
  {
    icon: Presentation,
    title: "KPI Review Meeting",
    role: "PM / Marketing",
    level: "Intermediate",
    description: "Present quarterly results, explain variances, and discuss action plans with stakeholders.",
    participants: "You vs. Global Team",
    duration: "15 min",
    color: "bg-accent-subtle text-accent"
  },
  {
    icon: Users,
    title: "Cross-Team Coordination",
    role: "PM / Operations",
    level: "Intermediate",
    description: "Align different teams on project priorities, resolve conflicts, and set clear expectations.",
    participants: "You vs. Dev Team Lead",
    duration: "20 min",
    color: "bg-success-subtle text-success"
  },
  {
    icon: Target,
    title: "Strategic Planning",
    role: "All Roles",
    level: "Advanced",
    description: "Discuss market opportunities, resource allocation, and long-term goals with leadership.",
    participants: "You vs. C-Level",
    duration: "25 min",
    color: "bg-secondary text-secondary-foreground"
  },
  {
    icon: MessageSquare,
    title: "Client Feedback Session",
    role: "Marketing / CS",
    level: "Beginner",
    description: "Handle difficult client feedback, propose solutions, and maintain professional relationships.",
    participants: "You vs. Unhappy Client",
    duration: "15 min",
    color: "bg-primary-subtle text-primary"
  },
  {
    icon: Briefcase,
    title: "Partnership Proposal",
    role: "BD / Strategy",
    level: "Advanced",
    description: "Pitch partnership opportunities, discuss mutual benefits, and handle complex questions.",
    participants: "You vs. Potential Partner",
    duration: "20 min",
    color: "bg-accent-subtle text-accent"
  }
];

export const Scenarios = () => {
  return (
    <section id="scenarios" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Practice Real Business Scenarios
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from professionally crafted scenarios designed by Silicon Valley experts. 
            Each session is tailored to your role and experience level.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-elegant transition-all duration-300 hover:scale-105 border-border group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl ${scenario.color} flex items-center justify-center`}>
                    <scenario.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {scenario.level}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{scenario.title}</h3>
                    <p className="text-sm text-primary font-medium">{scenario.role}</p>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {scenario.description}
                  </p>
                  
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Participants:</span>
                      <span className="font-medium">{scenario.participants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{scenario.duration}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                >
                  <Play className="w-4 h-4" />
                  Start Rehearsal
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            View All Scenarios
          </Button>
        </div>
      </div>
    </section>
  );
};