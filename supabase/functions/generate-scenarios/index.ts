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
    const { job, level, customSituation, customPartner } = await req.json();
    
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const prompt = `
[USER INPUT]
- 직무: ${job}
- 영어 레벨: ${level}
- 직접 입력한 상황: ${customSituation || '없음'}
- 직접 입력한 상대: ${customPartner || '없음'}

[GOAL]
아래 정보를 기반으로, 이 사용자를 위한 영어 회화 연습 상황을 추천해줘.

[RESPONSE FORMAT]
JSON 형태로만 응답해줘:
{
  "scenarios": [
    {
      "title": "4~5단어 시나리오 제목",
      "description": "상황 설명",
      "partner": "상대방 직책"
    },
    {
      "title": "4~5단어 시나리오 제목",
      "description": "상황 설명", 
      "partner": "상대방 직책"
    }
  ],
  "greeting": "AI가 먼저 할 인사말 (영어)"
}

직무별 참고:
- CEO/Biz Lead: 투자자 미팅, 글로벌 전략 리뷰 → VC 파트너, 본사 대표
- BD/Partnerships: 제휴 조건 협상, 계약 갱신 회의 → 파트너사 팀장, 전략 담당자
- PM/PO: 버그 이슈 공유, 기능 요청 정렬 → 개발 리드, 현지 PO
- Marketing: 캠페인 성과 보고, HQ KPI 리뷰 → HQ 마케팅 디렉터, 고객사 마케터
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: '당신은 영어 회화 연습을 위한 시나리오를 추천하는 전문가입니다. 사용자의 직무와 레벨에 맞는 실무 상황을 제안해주세요.' },
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