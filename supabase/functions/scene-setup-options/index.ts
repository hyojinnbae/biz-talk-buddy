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

    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    let prompt = '';

    switch (step) {
      case 'service':
        prompt = `You are helping a ${job} in ${industry} prepare for a "${scenario}" meeting.

Task: Generate EXACTLY 2 concise examples of strategic projects or initiatives that this person would realistically present or review in this meeting.

Requirements:
- Focus on strategic, executive-level projects (not low-level tasks)
- Each option should be 3-7 words maximum
- Make them sound like real business initiatives
- Reflect the specific industry context

Example format:
- "Global brand expansion initiative"
- "AI-driven marketing analytics platform rollout"

Return only the 2 options, one per line, no numbering or bullets.`;
        break;

      case 'problem':
        prompt = `You are helping a ${job} in ${industry} prepare for a "${scenario}" meeting about "${service}".

Task: Generate EXACTLY 2 realistic strategic challenges or decision points this person might discuss.

Requirements:
- Focus on strategic business problems requiring executive decision-making
- Avoid superficial metrics (like "low ROI" or "satisfaction")
- Each option should be 5-10 words maximum
- Make them sound like real boardroom-level concerns
- Directly related to the service/project: "${service}"

Example format:
- "Declining profitability in overseas markets despite sales growth"
- "Channel conflict between regional partners"

Return only the 2 options, one per line, no numbering or bullets.`;
        break;

      case 'context':
        prompt = `You are helping a ${job} in ${industry} prepare for a "${scenario}" meeting.

Current situation:
- Service/Project: "${service}"
- Problem: "${problem}"

Task: Generate EXACTLY 2 short context examples with numeric or factual detail.

Requirements:
- Include specific numbers, percentages, KPIs, or geographic details
- Each option should be 6-12 words maximum
- Make them sound like real business metrics or situations
- Provide concrete data points that make the problem tangible

Example format:
- "Operating margin dropped from 18% to 12% in the last quarter"
- "Distributor sales in Japan fell by 25% YoY"

Return only the 2 options, one per line, no numbering or bullets.`;
        break;

      case 'goal':
        prompt = `You are helping a ${job} in ${industry} prepare for a "${scenario}" meeting.

Current situation:
- Service/Project: "${service}"
- Problem: "${problem}"
- Context: "${context}"

Task: Generate EXACTLY 2 specific goals that reflect executive intent for this meeting.

Requirements:
- Focus on strategic outcomes and decision-making
- Each option should be 4-8 words maximum
- Make them sound like real executive objectives
- Align with the role of a ${job}

Example format:
- "Secure board approval for budget reallocation"
- "Define regional growth strategy for next quarter"

Return only the 2 options, one per line, no numbering or bullets.`;
        break;

      default:
        throw new Error('Invalid step');
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
          { 
            role: 'system', 
            content: 'You are an expert business scenario generator. Generate exactly 2 realistic, industry-specific options. Be concise and professional. Never add numbering, bullets, or extra formatting.' 
          },
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
    
    // Split by newline and filter out empty lines
    const options = generatedText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      // Remove any leading numbering or bullets
      .map(line => line.replace(/^[-•*\d.)\]]\s*/, '').trim())
      .slice(0, 2); // Ensure we only take 2 options

    console.log('Generated options for step', step, ':', options);

    return new Response(JSON.stringify({ options }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in scene-setup-options function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
