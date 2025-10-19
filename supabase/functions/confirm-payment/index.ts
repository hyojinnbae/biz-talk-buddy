import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const TOSS_SECRET_KEY = Deno.env.get('TOSS_SECRET_KEY');
    if (!TOSS_SECRET_KEY) {
      throw new Error('TOSS_SECRET_KEY not configured');
    }

    // Validate input with Zod
    const PaymentSchema = z.object({
      paymentKey: z.string().min(1).max(200),
      orderId: z.string().uuid(),
      amount: z.number().int().positive().max(10000000)
    });

    const body = await req.json();
    const { paymentKey, orderId, amount } = PaymentSchema.parse(body);

    // Get authenticated user
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      throw new Error('Unauthorized: No authorization header');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Unauthorized: Invalid token');
    }

    // Verify order exists and amount matches
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*, plans(*)')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      throw new Error('Order not found');
    }

    // Verify order belongs to authenticated user
    if (order.user_id !== user.id) {
      throw new Error('Unauthorized: Order does not belong to user');
    }

    if (order.plans.amount !== amount) {
      throw new Error('Amount mismatch');
    }

    if (order.status === 'paid') {
      throw new Error('Order already paid');
    }

    // Confirm payment with Toss
    const tossResponse = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(TOSS_SECRET_KEY + ':')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount
      })
    });

    const tossData = await tossResponse.json();

    if (!tossResponse.ok) {
      console.error('Toss payment error:', tossData);
      throw new Error(tossData.message || 'Payment confirmation failed');
    }

    // Calculate expiration date
    let expiresAt = null;
    if (order.plans.duration_months > 0) {
      const now = new Date();
      expiresAt = new Date(now.setMonth(now.getMonth() + order.plans.duration_months));
    }

    // Update order status
    await supabase
      .from('orders')
      .update({
        status: 'paid',
        payment_key: paymentKey,
        raw_response: tossData
      })
      .eq('id', orderId);

    // Update or create user plan
    const { data: existingPlan } = await supabase
      .from('user_plans')
      .select('*')
      .eq('user_id', order.user_id)
      .single();

    if (existingPlan) {
      await supabase
        .from('user_plans')
        .update({
          plan_id: order.plan_id,
          expires_at: expiresAt,
          monthly_limit: order.plans.monthly_limit,
          used_count_this_month: 0,
          trial_limit: order.plans.amount === 0 ? 3 : null
        })
        .eq('user_id', order.user_id);
    } else {
      await supabase
        .from('user_plans')
        .insert({
          user_id: order.user_id,
          plan_id: order.plan_id,
          expires_at: expiresAt,
          monthly_limit: order.plans.monthly_limit,
          used_count_this_month: 0,
          trial_limit: order.plans.amount === 0 ? 3 : null
        });
    }

    return new Response(
      JSON.stringify({
        ok: true,
        planId: order.plan_id,
        expiresAt
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Confirm payment error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});