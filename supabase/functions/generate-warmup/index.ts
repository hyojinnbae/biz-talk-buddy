import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { service, problem, agenda, goal } = await req.json();

    console.log('Generating warmup sentences for:', { service, problem, agenda, goal });

    const systemPrompt = `You are a business English coach. Generate 5-7 short, natural business English sentences (under 10 words each) based on the given case information.

Follow this flow:
1. Problem statement
2. Discussion point
3. Goal statement
4. Sharing context
5. Asking for perspective
6. Collaboration proposal

Rules:
- Keep each sentence under 10 words
- Use simple, natural business English
- No quotes, colons, or special formatting
- Return ONLY the sentences as a JSON array
- Example format: ["sentence 1", "sentence 2", ...]`;

    const userPrompt = `Generate 5-7 warm-up sentences for this business scenario:
- Service/Product: ${service}
- Problem: ${problem}
- Meeting Agenda: ${agenda}
- Goal: ${goal}

Return format: {"sentences": ["...", "...", ...]}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    const parsed = JSON.parse(content);
    
    console.log('Generated sentences:', parsed.sentences);

    return new Response(JSON.stringify({ sentences: parsed.sentences }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-warmup function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
