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
      return text.replace(/Let’s|Let's/gi, "Let's").replace(/I'd like to/gi, 'I want to');
    case 3:
      return text;
    case 4:
      return text + ' I will keep it concise.';
    case 5:
      return text + ' I’d also like your perspective on potential risks.';
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
      {
        title: 'Investor Update Briefing',
        counterpart: 'VC Partner',
        base: "Thanks for joining. I'd like to walk you through our {industry} performance and runway.",
      },
      {
        title: 'Board Strategy Review',
        counterpart: 'Board Member',
        base: "I'd like to review our {industry} strategy and key risks.",
      },
      {
        title: 'Global Expansion Sync',
        counterpart: 'Head of Global Sales',
        base: "Can we align on our {industry} expansion priorities this quarter?",
      },
    ];
  } else if (role === 'BD') {
    templates = [
      {
        title: 'Partnership Terms Negotiation',
        counterpart: 'Partner VP',
        base: "I'd like to review the partnership terms and close gaps today.",
      },
      {
        title: 'Renewal Contract Discussion',
        counterpart: 'Contracts Manager',
        base: 'Can we go over the renewal scope, pricing, and timeline?',
      },
      {
        title: 'Co-marketing Opportunity Call',
        counterpart: 'Business Lead',
        base: 'Let\'s explore a co-marketing plan that benefits both teams.',
      },
    ];
  } else if (role === 'PM/PO') {
    templates = [
      {
        title: 'Feature Launch Briefing',
        counterpart: 'Product Director',
        base: "Let's review the {industry} feature launch scope and timeline.",
      },
      {
        title: 'Sprint Planning Review',
        counterpart: 'Engineering Lead',
        base: "I'd like to align on this sprint's priorities and dependencies.",
      },
      {
        title: 'Postmortem Discussion',
        counterpart: 'CTO',
        base: "Let's walk through what went wrong and what we can improve.",
      },
    ];
  } else if (role === '마케터') {
    templates = [
      {
        title: 'Campaign Performance Review',
        counterpart: 'Marketing Director',
        base: 'I\'d like to review campaign performance and next steps.',
      },
      {
        title: 'Brand Messaging Alignment',
        counterpart: 'Brand Manager',
        base: 'Can we align on the messaging for our {industry} audience?',
      },
      {
        title: 'Agency Brief Kickoff',
        counterpart: 'Agency Account Lead',
        base: "Thanks for joining. I'd like to kick off the creative brief.",
      },
    ];
  } else {
    templates = [
      {
        title: 'Client Onboarding Call',
        counterpart: 'Client Manager',
        base: "Thanks for joining. I'd like to confirm the onboarding plan.",
      },
      {
        title: 'Weekly Project Sync',
        counterpart: 'Project Lead',
        base: "Let's align on this week's priorities and blockers.",
      },
      {
        title: 'Risk And Mitigation Plan',
        counterpart: 'Operations Lead',
        base: 'I want to review key risks and our mitigation plan.',
      },
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
  try {
    const body = await req.json();
    jobRole = body?.jobRole ?? body?.job ?? '';
    englishLevel = Number(body?.englishLevel ?? body?.level ?? 3);
    industry = body?.industry ?? '';
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

    const prompt = `
[USER INPUT]
- 직무: ${jobRole}
- 영어 레벨: ${englishLevel}
- 업계: ${industry}

[GOAL]
이 사용자를 위한 영어 회화 연습 상황 3개를 추천해줘. 직무와 업계를 연결해서 실무적이고 현실적인 시나리오를 만들어줘.

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
CEO: 투자자 미팅, 전략 검토, 보드 미팅 → VC 파트너, 이사회 멤버, 글로벌 팀장
BD: 파트너십 협상, 계약 논의, 제휴 미팅 → 파트너사 VP, 비즈니스 리더, 계약 담당자
PM/PO: 제품 리뷰, 기능 논의, 개발 협의 → 개발 리드, 디자인 팀장, 제품 디렉터
마케터: 캠페인 보고, 성과 분석, 브랜드 논의 → 마케팅 디렉터, 브랜드 매니저, 광고 대행사

각 시나리오는 선택한 업계(${industry})에 맞게 구체적으로 만들어줘.
영어 레벨 ${englishLevel}에 맞는 적절한 난이도로 openingLine을 작성해줘.
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
        temperature: 0.7,
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