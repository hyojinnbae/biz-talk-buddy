import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Fallback generator used when OpenAI is unavailable (e.g., quota exceeded)
function makeOpening(base: string, industry: string, level: number) {
  const text = base.replace('{industry}', industry || 'our market');
  switch (Number(level) || 3) {
    case 1:
      return `Hello. Let's talk about ${industry || 'the topic'} today.`;
    case 2:
      return text.replace(/Let's|Let's/gi, "Let's").replace(/I'd like to/gi, 'I want to');
    case 3:
      return text;
    case 4:
      return text + ' I will keep it concise.';
    case 5:
      return text + " I'd also like your perspective on potential risks.";
    default:
      return text;
  }
}

function buildFallbackScenarios(jobRole: string, industry: string, englishLevel: number) {
  const role = jobRole || '기타';
  const ind = industry || 'SaaS';

  let templates: { title: string; counterpart: string; base: string }[] = [];

  if (role === 'CEO') {
    templates = [
      { title: 'Investor Update Briefing', counterpart: 'VC Partner', base: "Thanks for joining. I'd like to walk you through our {industry} performance and runway." },
      { title: 'Board Strategy Review', counterpart: 'Board Member', base: "I'd like to review our {industry} strategy and key risks." },
      { title: 'Global Expansion Sync', counterpart: 'Head of Global Sales', base: "Can we align on our {industry} expansion priorities this quarter?" },
      { title: 'Funding Round Planning', counterpart: 'CFO', base: "Let's discuss the funding timeline and key investor meetings." },
      { title: 'Strategic Partnership Review', counterpart: 'Partner CEO', base: "I'd like to explore how our {industry} solutions can complement each other." },
      { title: 'Crisis Management Call', counterpart: 'PR Director', base: "We need to address this situation quickly and transparently." },
      { title: 'Acquisition Target Discussion', counterpart: 'Target Company CEO', base: "I'd like to explore potential synergies between our companies." },
      { title: 'Board Compensation Review', counterpart: 'Compensation Committee', base: "Let's review the executive compensation framework." },
      { title: 'IPO Readiness Meeting', counterpart: 'Investment Banker', base: "I want to understand our path to going public." },
      { title: 'Quarterly Results Call', counterpart: 'Analyst', base: "Thank you for joining our Q3 earnings call." },
      { title: 'Vision Alignment Session', counterpart: 'Co-founder', base: "Let's make sure we're aligned on our long-term vision." },
      { title: 'Regulatory Compliance Review', counterpart: 'Legal Counsel', base: "I need to understand our compliance requirements in {industry}." },
      { title: 'Key Account Escalation', counterpart: 'Enterprise Client CEO', base: "I wanted to personally address your concerns." },
      { title: 'Innovation Lab Review', counterpart: 'CTO', base: "Let's discuss the R&D roadmap for next year." },
      { title: 'Culture Transformation Meeting', counterpart: 'Chief People Officer', base: "How do we maintain our culture as we scale?" },
      { title: 'Exit Strategy Discussion', counterpart: 'Board Chair', base: "I'd like to explore our strategic options." },
      { title: 'Market Entry Strategy', counterpart: 'Regional Director', base: "What's our approach for the {industry} market in Asia?" },
      { title: 'Talent Acquisition Summit', counterpart: 'Head of Talent', base: "How do we attract top-tier talent in this competitive market?" },
      { title: 'ESG Initiative Planning', counterpart: 'Sustainability Director', base: "Let's discuss our environmental and social impact goals." },
      { title: 'Technology Roadmap Review', counterpart: 'Chief Innovation Officer', base: "I want to ensure our tech stack supports our growth plans." }
    ];
  } else if (role === 'BD') {
    templates = [
      { title: 'Partnership Terms Negotiation', counterpart: 'Partner VP', base: "I'd like to review the partnership terms and close gaps today." },
      { title: 'Renewal Contract Discussion', counterpart: 'Contracts Manager', base: 'Can we go over the renewal scope, pricing, and timeline?' },
      { title: 'Co-marketing Opportunity Call', counterpart: 'Business Lead', base: 'Let\'s explore a co-marketing plan that benefits both teams.' },
      { title: 'Channel Partner Onboarding', counterpart: 'Channel Manager', base: "Welcome to our partner program. Let's discuss the enablement process." },
      { title: 'Revenue Share Negotiation', counterpart: 'Finance Director', base: "I'd like to finalize the revenue sharing model." },
      { title: 'Integration Roadmap Planning', counterpart: 'Technical Lead', base: "Let's align on the technical integration timeline." },
      { title: 'Go-to-Market Strategy', counterpart: 'Marketing VP', base: "How do we position this partnership in the market?" },
      { title: 'Performance Review Meeting', counterpart: 'Partner Success Manager', base: "Let's review our partnership KPIs and next steps." },
      { title: 'Competitive Response Strategy', counterpart: 'Product Manager', base: "How do we respond to the competitive threat in {industry}?" },
      { title: 'Territory Planning Session', counterpart: 'Sales Director', base: "Let's define the territory boundaries and coverage." },
      { title: 'Deal Structure Workshop', counterpart: 'Legal Counsel', base: "I need to understand the legal implications of this deal structure." },
      { title: 'Customer Success Alignment', counterpart: 'Customer Success Director', base: "How do we ensure smooth customer handoffs?" },
      { title: 'Pricing Strategy Discussion', counterpart: 'Pricing Manager', base: "What's our pricing approach for this new market segment?" },
      { title: 'Alliance Management Review', counterpart: 'Alliance Director', base: "Let's evaluate our current partner portfolio." },
      { title: 'Enterprise Deal Structuring', counterpart: 'Enterprise Sales VP', base: "How do we structure this multi-million dollar deal?" },
      { title: 'International Expansion Planning', counterpart: 'Global VP', base: "What's our strategy for entering the European market?" },
      { title: 'Technology Partnership Evaluation', counterpart: 'Engineering VP', base: "Let's assess the technical feasibility of this integration." },
      { title: 'Vendor Management Review', counterpart: 'Procurement Director', base: "I'd like to optimize our vendor relationships." },
      { title: 'Market Research Discussion', counterpart: 'Research Analyst', base: "What does the data tell us about this market opportunity?" },
      { title: 'Compliance Requirements Meeting', counterpart: 'Compliance Officer', base: "What are the regulatory requirements for this partnership?" }
    ];
  } else if (role === 'PM/PO') {
    templates = [
      { title: 'Feature Launch Briefing', counterpart: 'Product Director', base: "Let's review the {industry} feature launch scope and timeline." },
      { title: 'Sprint Planning Review', counterpart: 'Engineering Lead', base: "I'd like to align on this sprint's priorities and dependencies." },
      { title: 'Postmortem Discussion', counterpart: 'CTO', base: "Let's walk through what went wrong and what we can improve." },
      { title: 'User Research Synthesis', counterpart: 'UX Researcher', base: "What are the key insights from our latest user interviews?" },
      { title: 'Roadmap Prioritization Meeting', counterpart: 'VP of Product', base: "Let's align on our Q4 product priorities." },
      { title: 'Technical Debt Review', counterpart: 'Engineering Manager', base: "How do we balance new features with technical debt?" },
      { title: 'Customer Feedback Analysis', counterpart: 'Customer Success Manager', base: "What are customers saying about the new feature?" },
      { title: 'Competitive Analysis Discussion', counterpart: 'Market Research Manager', base: "How does our product compare to the competition?" },
      { title: 'API Strategy Planning', counterpart: 'Platform Engineer', base: "Let's discuss our API roadmap and developer experience." },
      { title: 'Performance Optimization Review', counterpart: 'Performance Engineer', base: "What are our current bottlenecks and how do we address them?" },
      { title: 'A/B Test Results Review', counterpart: 'Data Analyst', base: "Let's analyze the results of our latest experiments." },
      { title: 'Security Requirements Planning', counterpart: 'Security Engineer', base: "What security considerations do we need for this feature?" },
      { title: 'Mobile Strategy Discussion', counterpart: 'Mobile Lead', base: "How do we optimize the mobile experience?" },
      { title: 'Data Analytics Planning', counterpart: 'Analytics Manager', base: "What metrics should we track for this new feature?" },
      { title: 'Integration Planning Meeting', counterpart: 'Integration Engineer', base: "Let's discuss the third-party integration requirements." },
      { title: 'Accessibility Review Session', counterpart: 'Accessibility Expert', base: "How do we ensure our product is accessible to all users?" },
      { title: 'Design System Discussion', counterpart: 'Design System Lead', base: "Let's align on the design components for this feature." },
      { title: 'Localization Planning Meeting', counterpart: 'Localization Manager', base: "What's our approach for international markets?" },
      { title: 'Beta Testing Strategy', counterpart: 'QA Manager', base: "How do we structure our beta testing program?" },
      { title: 'Product Analytics Deep Dive', counterpart: 'Senior Data Scientist', base: "Let's analyze user behavior patterns in our {industry} segment." }
    ];
  } else if (role === '마케터') {
    templates = [
      { title: 'Campaign Performance Review', counterpart: 'Marketing Director', base: 'I\'d like to review campaign performance and next steps.' },
      { title: 'Brand Messaging Alignment', counterpart: 'Brand Manager', base: 'Can we align on the messaging for our {industry} audience?' },
      { title: 'Agency Brief Kickoff', counterpart: 'Agency Account Lead', base: "Thanks for joining. I'd like to kick off the creative brief." },
      { title: 'Content Strategy Planning', counterpart: 'Content Manager', base: "Let's develop our content calendar for Q4." },
      { title: 'Social Media Strategy Review', counterpart: 'Social Media Manager', base: "How do we improve our social media engagement?" },
      { title: 'Event Marketing Planning', counterpart: 'Events Manager', base: "Let's plan our presence at the upcoming {industry} conference." },
      { title: 'Email Marketing Optimization', counterpart: 'Email Marketing Specialist', base: "How can we improve our email open and click rates?" },
      { title: 'SEO Strategy Discussion', counterpart: 'SEO Manager', base: "What's our approach for improving organic search rankings?" },
      { title: 'Influencer Partnership Review', counterpart: 'Influencer Manager', base: "Let's evaluate our current influencer partnerships." },
      { title: 'Marketing Automation Setup', counterpart: 'Marketing Operations Manager', base: "How do we optimize our lead nurturing workflows?" },
      { title: 'Customer Journey Mapping', counterpart: 'CX Manager', base: "Let's map out the customer experience touchpoints." },
      { title: 'Competitive Messaging Review', counterpart: 'Competitive Intelligence Analyst', base: "How do we differentiate our messaging from competitors?" },
      { title: 'PR Strategy Planning', counterpart: 'PR Manager', base: "What's our media relations strategy for the product launch?" },
      { title: 'Marketing Budget Review', counterpart: 'Finance Manager', base: "Let's review our marketing spend allocation and ROI." },
      { title: 'Lead Generation Strategy', counterpart: 'Demand Generation Manager', base: "How do we increase qualified leads from {industry}?" },
      { title: 'Partnership Marketing Planning', counterpart: 'Partner Marketing Manager', base: "Let's develop co-marketing campaigns with our partners." },
      { title: 'Video Marketing Strategy', counterpart: 'Video Producer', base: "What's our video content strategy for the next quarter?" },
      { title: 'Conversion Rate Optimization', counterpart: 'CRO Specialist', base: "How can we improve our landing page conversion rates?" },
      { title: 'Market Segmentation Analysis', counterpart: 'Market Research Analyst', base: "Let's analyze our target market segments in {industry}." },
      { title: 'Brand Partnership Negotiation', counterpart: 'Brand Partnership Manager', base: "I'd like to discuss the co-branding opportunity." }
    ];
  } else {
    templates = [
      { title: 'Client Onboarding Call', counterpart: 'Client Manager', base: "Thanks for joining. I'd like to confirm the onboarding plan." },
      { title: 'Weekly Project Sync', counterpart: 'Project Lead', base: "Let's align on this week's priorities and blockers." },
      { title: 'Risk And Mitigation Plan', counterpart: 'Operations Lead', base: 'I want to review key risks and our mitigation plan.' },
      { title: 'Process Improvement Meeting', counterpart: 'Operations Manager', base: "How can we streamline our current workflows?" },
      { title: 'Quality Assurance Review', counterpart: 'QA Lead', base: "Let's discuss our quality standards and testing procedures." },
      { title: 'Vendor Selection Meeting', counterpart: 'Procurement Manager', base: "I'd like to evaluate our vendor options for this project." },
      { title: 'Training Program Planning', counterpart: 'Training Manager', base: "What training do our team members need?" },
      { title: 'Budget Planning Session', counterpart: 'Finance Manager', base: "Let's plan our departmental budget for next year." },
      { title: 'Team Performance Review', counterpart: 'HR Manager', base: "I'd like to discuss our team's performance metrics." },
      { title: 'Technology Implementation', counterpart: 'IT Manager', base: "Let's discuss the new system implementation timeline." },
      { title: 'Customer Support Strategy', counterpart: 'Support Manager', base: "How do we improve our customer satisfaction scores?" },
      { title: 'Compliance Audit Preparation', counterpart: 'Compliance Officer', base: "Let's prepare for the upcoming audit." },
      { title: 'Change Management Planning', counterpart: 'Change Manager', base: "How do we manage the organizational changes?" },
      { title: 'Performance Metrics Review', counterpart: 'Analytics Manager', base: "Let's review our KPIs and performance indicators." },
      { title: 'Stakeholder Alignment Meeting', counterpart: 'Department Head', base: "I want to ensure all stakeholders are aligned." },
      { title: 'Resource Allocation Planning', counterpart: 'Resource Manager', base: "How do we optimally allocate our resources?" },
      { title: 'Crisis Response Planning', counterpart: 'Risk Manager', base: "Let's develop our crisis response procedures." },
      { title: 'Innovation Workshop', counterpart: 'Innovation Lead', base: "How can we foster more innovation in our processes?" },
      { title: 'Cross-functional Collaboration', counterpart: 'Team Lead', base: "Let's improve collaboration between our departments." },
      { title: 'Strategic Initiative Review', counterpart: 'Strategy Manager', base: "Let's evaluate our strategic initiatives' progress." }
    ];
  }

  const shuffled = [...templates].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).map(t => ({
    title: t.title,
    counterpart: t.counterpart,
    openingLine: makeOpening(t.base, ind, englishLevel),
  }));
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Parse body first so we can always return a sensible fallback
  let jobRole = '' as string;
  let englishLevel = 3 as number;
  let industry = '' as string;
  let customSituation = '' as string;
  try {
    const body = await req.json();
    jobRole = body?.jobRole ?? body?.job ?? '';
    englishLevel = Number(body?.englishLevel ?? body?.level ?? 3);
    industry = body?.industry ?? '';
    customSituation = body?.customSituation ?? '';
  } catch (_) {
    // ignore body parse errors; we'll use defaults
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      // No key configured -> fallback
      const fb = buildFallbackScenarios(jobRole, industry, englishLevel);
      return new Response(JSON.stringify(fb), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Add randomness to prompt to get different scenarios each time
    const randomSeed = Math.floor(Math.random() * 10000);
    const scenarioTypes = [
      "긴급 상황 대응", "성과 검토", "전략 수립", "문제 해결", "협상", 
      "보고", "브레인스토밍", "갈등 조정", "의사결정", "계획 수립"
    ];
    const randomType = scenarioTypes[Math.floor(Math.random() * scenarioTypes.length)];
    
    // Handle custom situation
    const actualJobRole = jobRole === '기타(직접 입력)' ? customSituation || '일반 직무' : jobRole;
    
    const prompt = `
[USER INPUT]
- 직무: ${actualJobRole}
- 영어 레벨: ${englishLevel}
- 업계: ${industry}
- 랜덤 시드: ${randomSeed}
- 상황 유형 힌트: ${randomType}

[GOAL]
이 사용자를 위한 새로운 영어 회화 연습 상황 3개를 추천해줘. 직무와 업계를 연결해서 실무적이고 현실적인 시나리오를 만들어줘.
매번 다른 시나리오를 제공하기 위해 다양한 상황(${randomType} 등)을 고려해줘.

[RESPONSE FORMAT]
JSON 배열 형태로만 응답해줘:
[
  {
    "title": "4~5단어 시나리오 제목",
    "counterpart": "상대방 직책",
    "openingLine": "AI가 먼저 할 인사말 (영어)"
  },
  {
    "title": "4~5단어 시나리오 제목",
    "counterpart": "상대방 직책",
    "openingLine": "AI가 먼저 할 인사말 (영어)"
  },
  {
    "title": "4~5단어 시나리오 제목",
    "counterpart": "상대방 직책",
    "openingLine": "AI가 먼저 할 인사말 (영어)"
  }
]

[직무별 시나리오 가이드]
CEO: 투자자 미팅, 전략 검토, 보드 미팅, 위기 관리, M&A 논의 → VC 파트너, 이사회 멤버, 글로벌 팀장, 인수 대상 CEO
BD: 파트너십 협상, 계약 논의, 제휴 미팅, 신규 파트너 발굴, 갱신 협상 → 파트너사 VP, 비즈니스 리더, 계약 담당자, 채널 파트너
PM/PO: 제품 리뷰, 기능 논의, 개발 협의, 로드맵 계획, 고객 피드백 → 개발 리드, 디자인 팀장, 제품 디렉터, 고객 성공 매니저
마케터: 캠페인 보고, 성과 분석, 브랜드 논의, 예산 검토, 채널 확장 → 마케팅 디렉터, 브랜드 매니저, 광고 대행사, 인플루언서

각 시나리오는 선택한 업계(${industry})에 맞게 구체적으로 만들어줘.
영어 레벨 ${englishLevel}에 맞는 적절한 난이도로 openingLine을 작성해줘.
매번 새로운 시나리오를 제공하여 사용자가 다양한 상황을 연습할 수 있도록 해줘.
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: '당신은 영어 회화 연습을 위한 시나리오를 추천하는 전문가입니다. 사용자의 직무와 레벨에 맞는 실무 상황을 제안하고, JSON 배열만 응답해주세요.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.9,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('OpenAI API non-200:', errText);
      const fb = buildFallbackScenarios(jobRole, industry, englishLevel);
      return new Response(JSON.stringify(fb), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? '';

    try {
      const scenarios = JSON.parse(content);
      if (Array.isArray(scenarios)) {
        return new Response(JSON.stringify(scenarios), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      // If content is not an array, fallback
      const fb = buildFallbackScenarios(jobRole, industry, englishLevel);
      return new Response(JSON.stringify(fb), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('OpenAI response:', content);
      const fb = buildFallbackScenarios(jobRole, industry, englishLevel);
      return new Response(JSON.stringify(fb), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error in generate-scenarios function:', error);
    const fb = buildFallbackScenarios(jobRole, industry, englishLevel);
    return new Response(JSON.stringify(fb), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});