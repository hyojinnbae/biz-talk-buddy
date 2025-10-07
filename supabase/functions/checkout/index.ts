import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    });

    // Get user from authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      console.error('❌ Missing authorization header');
      throw new Error('Missing authorization header');
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user) {
      console.error('❌ Unauthorized:', userError);
      throw new Error('Unauthorized');
    }

    console.log('✅ User authenticated:', user.id);

    const { planId } = await req.json();
    console.log('📌 Checkout request for planId:', planId);

    // Get plan details
    const { data: plan, error: planError } = await supabase
      .from('plans')
      .select('*')
      .eq('id', planId)
      .single();

    if (planError || !plan) {
      console.error('❌ Plan not found:', planError);
      throw new Error('Plan not found');
    }

    console.log('✅ Plan found:', plan.name, plan.amount);

    // Get user profile for email
    const { data: profile } = await supabase
      .from('profiles')
      .select('email, name')
      .eq('id', user.id)
      .single();

    // Create order
    const orderId = crypto.randomUUID();
    console.log('📝 Creating order:', orderId);
    
    const { error: orderError } = await supabase
      .from('orders')
      .insert({
        id: orderId,
        user_id: user.id,
        plan_id: planId,
        status: 'pending'
      });

    if (orderError) {
      console.error('❌ Order creation failed:', orderError);
      throw new Error('Failed to create order');
    }

    console.log('✅ Order created successfully');

    return new Response(
      JSON.stringify({
        orderId,
        amount: plan.amount,
        planName: plan.name,
        customerEmail: profile?.email || user.email,
        customerName: profile?.name || '사용자'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Checkout error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});