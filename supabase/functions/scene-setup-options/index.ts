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
    const { job, industry, scenario, step, previousAnswers, meetingPurpose } = await req.json();

    console.log('Generating options for:', { job, industry, scenario, step, previousAnswers, meetingPurpose });

    let systemPrompt = `You are an expert business scenario designer. Generate exactly 2 realistic, concise business options in English.
Each option should be a short phrase (3-8 words), not a full sentence.
Focus on real-world business situations that match the given context.
Avoid generic terms like "ROI", "satisfaction", "engagement" - be specific and strategic.`;

    let userPrompt = '';

    switch (step) {
      case 'service':
        userPrompt = `Given:
- Job role: ${job}
- Industry: ${industry}
- Scenario: ${scenario}
- Meeting purpose: ${meetingPurpose || 'Strategic discussion'}

Generate 2 concise examples of products, services, or strategic initiatives that this person would realistically present or discuss in this meeting.
Focus on strategic projects or major initiatives (not minor features).
Tone: Strategic and executive-level.

Examples for context:
- "Global brand expansion initiative"
- "AI-driven marketing analytics platform"
- "Regional distribution partnership program"

Return only 2 options, one per line, no numbering or bullets.`;
        break;

      case 'problem':
        userPrompt = `Given:
- Job role: ${job}
- Industry: ${industry}
- Scenario: ${scenario}
- Product/Service: ${previousAnswers.service}
- Meeting purpose: ${meetingPurpose || 'Strategic discussion'}

Generate 2 realistic strategic challenges or decision points that require executive attention or cross-functional alignment.
Avoid superficial metrics. Focus on business-critical issues.

Examples for context:
- "Declining profitability in overseas markets despite sales growth"
- "Channel conflict between regional partners"
- "Product-market fit uncertainty in new segments"

Return only 2 options, one per line, no numbering or bullets.`;
        break;

      case 'agenda':
        userPrompt = `Given:
- Job role: ${job}
- Industry: ${industry}
- Scenario: ${scenario}
- Problem: ${previousAnswers.problem}

Generate 2 short context examples with numeric or factual detail that make the situation concrete.
Include specific metrics, percentages, costs, timeframes, or regional data.

Examples for context:
- "Operating margin dropped from 18% to 12% in Q3"
- "Distributor sales in Japan fell by 25% YoY"
- "Customer acquisition cost increased by 40% this quarter"

Return only 2 options, one per line, no numbering or bullets.`;
        break;

      case 'goal':
        userPrompt = `Given:
- Job role: ${job}
- Industry: ${industry}
- Scenario: ${scenario}
- Problem: ${previousAnswers.problem}
- Context: ${previousAnswers.agenda}
- Meeting purpose: ${meetingPurpose || 'Strategic discussion'}

Generate 2 specific strategic goals that reflect executive intent and desired meeting outcomes.
Focus on actionable decisions or approvals needed.

Examples for context:
- "Secure board approval for budget reallocation"
- "Define regional growth strategy for next quarter"
- "Finalize partnership terms with key distributor"

Return only 2 options, one per line, no numbering or bullets.`;
        break;

      default:
        throw new Error(`Unknown step: ${step}`);
    }

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
        temperature: 0.8,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content.trim();
    
    // Split by newlines and filter empty lines
    const options = generatedText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => {
        // Remove numbering, bullets, or dashes at the start
        return line.replace(/^[\d\-\*\.]+\s*/, '').trim();
      })
      .slice(0, 2); // Take only first 2 options

    console.log('Generated options:', options);

    return new Response(JSON.stringify({ options }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in scene-setup-options function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      options: [] 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
