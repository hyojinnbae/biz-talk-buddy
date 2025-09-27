import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { jobRole, englishLevel, industry } = await req.json();
    
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
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
      throw new Error(`OpenAI API error: ${await response.text()}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      const scenarios = JSON.parse(content);
      return new Response(JSON.stringify(scenarios), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('OpenAI response:', content);
      return new Response(JSON.stringify({ error: 'Failed to parse AI response' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in generate-scenarios function:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});