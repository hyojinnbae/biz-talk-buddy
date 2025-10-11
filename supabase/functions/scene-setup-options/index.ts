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
    const { step, job, industry, scenario, service, problem, context } = await req.json();

    let prompt = '';
    
    if (step === 'service') {
      prompt = `You are helping a ${job} professional in the ${industry} industry prepare for a "${scenario}" meeting.

Generate exactly 2 concise, realistic product or service options that are highly relevant to this industry and scenario context.

Requirements:
- Each option should be 3-8 words maximum
- Options must be specific to the ${industry} industry
- Options should be realistic examples, not generic terms
- Make them distinct from each other

Return ONLY the 2 options, one per line, with no numbering, bullets, or extra text.`;
    } else if (step === 'problem') {
      prompt = `You are helping a ${job} professional in the ${industry} industry prepare for a "${scenario}" meeting about "${service}".

Generate exactly 2 realistic business problems or challenges that would be discussed in this meeting context.

Requirements:
- Each option should be 5-12 words maximum
- Make them sound like real meeting topics (not generic problems)
- Options should be directly related to the service: ${service}
- Make them distinct from each other

Return ONLY the 2 options, one per line, with no numbering, bullets, or extra text.`;
    } else if (step === 'context') {
      prompt = `You are helping a ${job} professional in the ${industry} industry prepare for a "${scenario}" meeting about "${service}".
The main problem being discussed is: "${problem}"

Generate exactly 2 concrete context examples that make this situation specific and realistic.

Requirements:
- Each option should include realistic numbers, percentages, ratios, or specific conditions
- Options should be 5-15 words maximum
- Make them sound like real business situations with measurable data
- Options should directly relate to the problem: ${problem}
- Make them distinct from each other

Examples of good context:
- "ROI dropped to 1.3x in Q3"
- "Partner proposed 70:30 revenue share"
- "User adoption is 30% below target"

Return ONLY the 2 options, one per line, with no numbering, bullets, or extra text.`;
    } else if (step === 'goal') {
      prompt = `You are helping a ${job} professional in the ${industry} industry prepare for a "${scenario}" meeting.
- Service/Product: ${service}
- Problem: ${problem}
- Context: ${context}

Generate exactly 2 specific goals the user might want to achieve in this meeting.

Requirements:
- Each option should be 5-12 words maximum
- Make them actionable and realistic meeting objectives
- Options should logically follow from the problem and context
- Make them distinct from each other

Return ONLY the 2 options, one per line, with no numbering, bullets, or extra text.`;
    }

    console.log('Generating options for step:', step);
    console.log('Prompt:', prompt);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'user', content: prompt }
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
    
    // Split by newline and clean up
    const options = generatedText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .slice(0, 2); // Ensure only 2 options

    console.log('Generated options:', options);

    return new Response(JSON.stringify({ options }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in scene-setup-options function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
