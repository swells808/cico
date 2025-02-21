
import Stripe from 'stripe';
import { serve } from 'https://deno.fresh.dev/server.ts';
import { corsHeaders } from '../_shared/cors.ts';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

interface CreateCheckoutSessionBody {
  priceId: string;
  planType: 'personal' | 'pro';
  userCount?: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const path = new URL(req.url).pathname;
    console.log(`Processing ${req.method} request to ${path}`);

    if (req.method === 'POST' && path === '/create-checkout-session') {
      const { priceId, planType, userCount = 1 }: CreateCheckoutSessionBody = await req.json();
      console.log('Creating checkout session for:', { priceId, planType, userCount });

      // Create or update the Stripe price based on the plan type and user count
      let finalPriceId = priceId;
      if (planType === 'pro') {
        const price = await stripe.prices.create({
          unit_amount: 500 * userCount, // $5 per user
          currency: 'usd',
          recurring: { interval: 'month' },
          product_data: {
            name: `Pro Plan (${userCount} users)`,
          },
        });
        finalPriceId = price.id;
      }

      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price: finalPriceId,
            quantity: 1,
          },
        ],
        success_url: `${req.headers.get('Origin')}/dashboard?success=true`,
        cancel_url: `${req.headers.get('Origin')}/sales?canceled=true`,
        subscription_data: {
          trial_period_days: 30,
        },
        metadata: {
          planType,
          userCount: userCount.toString(),
        },
      });

      return new Response(JSON.stringify({ sessionId: session.id }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response('Not Found', { status: 404 });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
