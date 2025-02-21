
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "npm:stripe@13.10.0";
import { corsHeaders } from '../_shared/cors.ts';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Handle GET request for initialization
    if (req.method === 'GET') {
      return new Response(
        JSON.stringify({ initialized: true }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Handle POST request for checkout session creation
    if (req.method === 'POST') {
      const { priceId, planType, userCount = 1 } = await req.json();
      console.log('Creating checkout session for:', { priceId, planType, userCount });

      let finalPriceId = priceId;
      if (planType === 'pro') {
        const price = await stripe.prices.create({
          unit_amount: 500 * userCount,
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

      return new Response(
        JSON.stringify({ sessionId: session.id }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response('Method not allowed', { 
      status: 405,
      headers: corsHeaders,
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
