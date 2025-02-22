
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
    // Handle GET request for initialization
    if (req.method === 'GET') {
      const publishableKey = Deno.env.get('STRIPE_PUBLISHABLE_KEY');
      if (!publishableKey) {
        throw new Error('Stripe publishable key not configured');
      }

      return new Response(
        JSON.stringify({ publishableKey }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Handle POST request for checkout session creation
    if (req.method === 'POST') {
      const { planType, userCount = 1 } = await req.json();
      console.log('Creating checkout session for:', { planType, userCount });

      // Create or retrieve product
      const productName = planType === 'personal' ? 'Personal Plan' : 'Pro Plan';
      let product = await stripe.products.create({
        name: productName,
        description: planType === 'personal' 
          ? 'Personal subscription plan' 
          : `Pro subscription plan for ${userCount} users`,
      });

      // Create price based on plan type
      const unitAmount = planType === 'personal' ? 200 : 500 * userCount; // $2 for personal, $5 per user for pro
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: unitAmount, // Amount in cents
        currency: 'usd',
        recurring: { interval: 'month' },
      });

      // Create checkout session
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price: price.id,
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
