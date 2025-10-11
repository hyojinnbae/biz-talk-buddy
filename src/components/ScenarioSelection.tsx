import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, ArrowLeft, RefreshCw, PenLine } from 'lucide-react';
interface ScenarioData {
  title: string;
  description: string;
  partner: string;
  service: string;
  problem: string;
  agenda: string;
  goal: string;
}
interface ScenarioSelectionProps {
  job: string;
  industry: string;
  onScenarioSelect: (scenario: ScenarioData) => void;
  onCustomInput: () => void;
  onBack: () => void;
}

// Contextual scenario data based on job and industry
const getScenarios = (job: string, industry: string): ScenarioData[] => {
  const scenarioMap: Record<string, Record<string, ScenarioData[]>> = {
    "CEO": {
      "IT & SaaS": [{
        title: "Funding Round Planning",
        description: "Let's discuss the funding timeline and key investor meetings.",
        partner: "CFO",
        service: "AI analytics platform",
        problem: "Need Series B funding",
        agenda: "Funding strategy and investor roadmap",
        goal: "Secure investment commitment"
      }, {
        title: "Strategic Partnership Review",
        description: "Evaluate potential partnerships for market expansion.",
        partner: "VP of Business Development",
        service: "Cloud collaboration tool",
        problem: "Market penetration challenges",
        agenda: "Partnership opportunities discussion",
        goal: "Build strategic alliance"
      }, {
        title: "Board Meeting Prep",
        description: "Prepare quarterly performance review for board members.",
        partner: "Board Member",
        service: "SaaS platform",
        problem: "Q4 performance review",
        agenda: "Quarterly results and future roadmap",
        goal: "Get board approval for next phase"
      }],
      "소비재 브랜드": [{
        title: "Market Entry Strategy",
        description: "What's our approach for the Japanese market?",
        partner: "Regional Director",
        service: "K-beauty skincare brand",
        problem: "Low brand awareness in Japan",
        agenda: "Japan market entry strategy",
        goal: "Build brand trust and partnerships"
      }, {
        title: "Innovation Lab Review",
        description: "Let's discuss the R&D roadmap for next year.",
        partner: "CTO",
        service: "Beauty innovation lab",
        problem: "Product development timeline",
        agenda: "R&D roadmap and new product launch",
        goal: "Align on innovation priorities"
      }, {
        title: "Retail Partnership Negotiation",
        description: "Discuss distribution strategy with major retailer.",
        partner: "Retail Chain Director",
        service: "Cosmetics brand",
        problem: "Distribution gap in key markets",
        agenda: "Retail partnership terms",
        goal: "Close distribution deal"
      }]
    },
    "BD/Sales": {
      "IT & SaaS": [{
        title: "Client Onboarding Review",
        description: "Let's improve our onboarding process based on client feedback.",
        partner: "Key Client",
        service: "CRM platform",
        problem: "Low adoption rate during beta",
        agenda: "Onboarding improvement discussion",
        goal: "Get constructive feedback"
      }, {
        title: "Renewal Discussion",
        description: "Review contract renewal and expansion opportunities.",
        partner: "Enterprise Client",
        service: "AI analytics dashboard",
        problem: "High churn rate",
        agenda: "Contract renewal and upsell",
        goal: "Secure renewal and expansion"
      }, {
        title: "Partnership Pitch",
        description: "Present our solution to potential technology partner.",
        partner: "Partner VP",
        service: "Cloud collaboration tool",
        problem: "Need strategic partnerships",
        agenda: "Partnership proposal presentation",
        goal: "Build trust and close partnership"
      }],
      "소비재 브랜드": [{
        title: "Distributor Meeting",
        description: "Discuss brand positioning and promotional strategy.",
        partner: "Distributor Manager",
        service: "Skincare brand",
        problem: "Low brand awareness in new market",
        agenda: "Distribution and marketing alignment",
        goal: "Build brand trust"
      }, {
        title: "Retail Expansion Plan",
        description: "Plan store expansion and marketing campaigns.",
        partner: "Retail Partner",
        service: "K-beauty retailer",
        problem: "Declining online engagement",
        agenda: "Retail expansion strategy",
        goal: "Align campaign direction"
      }, {
        title: "Influencer Collaboration",
        description: "Discuss influencer marketing strategy for new launch.",
        partner: "Agency Director",
        service: "Indie cosmetics label",
        problem: "Need market visibility",
        agenda: "Influencer campaign planning",
        goal: "Build trust with agency"
      }]
    },
    "PM/PO": {
      "IT & SaaS": [{
        title: "Product Roadmap Review",
        description: "Review Q1 product roadmap and prioritization.",
        partner: "Engineering Lead",
        service: "CRM platform",
        problem: "Feature prioritization challenges",
        agenda: "Product roadmap and sprint planning",
        goal: "Align on next quarter priorities"
      }, {
        title: "User Feedback Session",
        description: "Discuss user feedback and improvement opportunities.",
        partner: "Key Customer",
        service: "AI analytics dashboard",
        problem: "Performance issues reported",
        agenda: "User feedback and performance review",
        goal: "Gather feedback and build trust"
      }, {
        title: "Sprint Retrospective",
        description: "Review sprint results and process improvements.",
        partner: "Development Team",
        service: "Cloud collaboration tool",
        problem: "Sprint velocity concerns",
        agenda: "Retrospective and process improvement",
        goal: "Improve team efficiency"
      }],
      "첨단 제조 (반도체, 자동차, 화학 등)": [{
        title: "Supplier Quality Review",
        description: "Discuss quality issues and improvement plan.",
        partner: "Supplier Manager",
        service: "Wearable tech",
        problem: "Supplier quality issue",
        agenda: "Quality control review meeting",
        goal: "Secure commitment to quality standards"
      }, {
        title: "Production Timeline",
        description: "Review production schedule and delivery commitments.",
        partner: "Operations Lead",
        service: "Smart home device",
        problem: "Production delay",
        agenda: "Production timeline adjustment",
        goal: "Adjust delivery schedule"
      }, {
        title: "Tech Spec Review",
        description: "Discuss technical specifications for new component.",
        partner: "Engineering Partner",
        service: "Audio equipment",
        problem: "Component specification alignment",
        agenda: "Technical requirements review",
        goal: "Align on specifications"
      }]
    },
    "마케터": {
      "소비재 브랜드": [{
        title: "Japan Marketing Strategy",
        description: "Plan online marketing campaign for Japanese market.",
        partner: "Agency Director",
        service: "Skincare brand",
        problem: "Low brand awareness in Japan",
        agenda: "Online marketing strategy in Japan",
        goal: "Build trust with local agency"
      }, {
        title: "Social Media Campaign",
        description: "Review social media performance and next steps.",
        partner: "Content Manager",
        service: "K-beauty retailer",
        problem: "Declining online engagement",
        agenda: "Social media content revamp",
        goal: "Align campaign direction"
      }, {
        title: "Influencer Strategy",
        description: "Discuss influencer collaboration for brand launch.",
        partner: "Influencer Agency",
        service: "Indie cosmetics label",
        problem: "Need market visibility",
        agenda: "Collaboration with local influencers",
        goal: "Build brand trust"
      }],
      "IT & SaaS": [{
        title: "Content Marketing Review",
        description: "Evaluate content performance and strategy.",
        partner: "Content Lead",
        service: "CRM platform",
        problem: "Low content engagement",
        agenda: "Content marketing strategy review",
        goal: "Improve engagement metrics"
      }, {
        title: "Campaign Performance",
        description: "Review recent campaign results and ROI.",
        partner: "Marketing Manager",
        service: "AI analytics dashboard",
        problem: "Campaign ROI concerns",
        agenda: "CRM campaign review",
        goal: "Optimize campaign performance"
      }, {
        title: "Brand Positioning",
        description: "Discuss brand messaging and market positioning.",
        partner: "Brand Strategist",
        service: "Cloud collaboration tool",
        problem: "Brand differentiation challenges",
        agenda: "Brand positioning workshop",
        goal: "Align on brand message"
      }]
    }
  };

  // Get scenarios for the specific job/industry combination
  const scenarios = scenarioMap[job]?.[industry] || [{
    title: "Strategic Initiative Review",
    description: "Let's evaluate our strategic initiatives' progress.",
    partner: "Strategy Manager",
    service: "Business platform",
    problem: "Strategic alignment challenges",
    agenda: "Strategic review meeting",
    goal: "Align on next steps"
  }, {
    title: "Stakeholder Alignment Meeting",
    description: "I want to ensure all stakeholders are aligned.",
    partner: "Department Head",
    service: "Business solution",
    problem: "Cross-functional alignment issues",
    agenda: "Stakeholder alignment discussion",
    goal: "Build consensus"
  }, {
    title: "Risk And Mitigation Plan",
    description: "I want to review key risks and our mitigation plan.",
    partner: "Operations Lead",
    service: "Enterprise platform",
    problem: "Risk management concerns",
    agenda: "Risk assessment and mitigation",
    goal: "Develop action plan"
  }];
  return scenarios;
};
const ScenarioSelection = ({
  job,
  industry,
  onScenarioSelect,
  onCustomInput,
  onBack
}: ScenarioSelectionProps) => {
  const [scenarios, setScenarios] = useState<ScenarioData[]>(getScenarios(job, industry));
  const handleRefresh = () => {
    // In a real app, this would fetch different scenarios from backend
    // For now, we'll shuffle the existing scenarios
    const newScenarios = [...scenarios].sort(() => Math.random() - 0.5);
    setScenarios(newScenarios);
  };
  return <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              정보 수정하기
            </Button>
          </div>
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              추천 시나리오 선택
            </h1>
            <p className="text-lg text-muted-foreground">
              {job} · {industry} 분야에 맞는 시나리오입니다
            </p>
          </div>

          {/* Scenario Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {scenarios.map((scenario, index) => <Card key={index} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-sm text-muted-foreground mb-2">
                    실무 상황
                  </div>
                  <CardTitle className="text-xl mb-2">
                    {scenario.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    "{scenario.description}"
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">👥 대화 상대:</span>
                    <span>{scenario.partner}</span>
                  </div>
                  <Button onClick={() => onScenarioSelect(scenario)} size="lg" className="w-full gap-2 bg-[#529aff]/[0.81]">
                    <Mic className="w-4 h-4" />
                    선택
                  </Button>
                </CardContent>
              </Card>)}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={handleRefresh} className="gap-2" size="lg">
              <RefreshCw className="w-4 h-4" />
              다른 시나리오 보기
            </Button>
            <Button variant="outline" onClick={onCustomInput} className="gap-2" size="lg">
              <PenLine className="w-4 h-4" />
              직접 입력하기
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default ScenarioSelection;