import React, { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { Shield, CreditCard, Plus, Minus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Sales = () => {
  const [selectedPlan, setSelectedPlan] = useState<"personal" | "pro" | null>(null);
  const [userCount, setUserCount] = useState(2);
  const [promoCode, setPromoCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const personalPrice = 2;
  const proPricePerUser = 5;

  const calculateTotal = () => {
    if (selectedPlan === "personal") return personalPrice;
    if (selectedPlan === "pro") return proPricePerUser * userCount;
    return 0;
  };

  const handlePromoCode = () => {
    toast({
      title: "Validating promo code...",
      description: "This feature will be implemented later",
    });
  };

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to continue with your purchase",
          variant: "destructive",
        });
        navigate("/login?redirect=/sales");
        return;
      }

      const priceId = selectedPlan === 'personal' ? 'price_personal' : 'price_pro';
      
      const { data, error } = await supabase.functions.invoke('stripe', {
        body: {
          priceId,
          planType: selectedPlan,
          userCount: selectedPlan === 'pro' ? userCount : 1,
        },
      });

      if (error) throw error;

      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (result.error) throw result.error;

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Checkout Error",
        description: error.message || "Failed to initiate checkout",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const adjustUserCount = (increment: boolean) => {
    setUserCount(prev => {
      const newValue = increment ? prev + 1 : prev - 1;
      return Math.min(Math.max(1, newValue), 999);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Minimal Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Logo />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Plan & Get Started!
          </h1>
          <p className="text-lg text-gray-600">
            Enjoy your first 30 days free—no commitment, cancel anytime.
          </p>
        </div>

        {/* Plan Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Personal Plan */}
          <div className={`bg-white p-6 rounded-xl shadow-md border-2 ${
            selectedPlan === "personal" ? "border-[#4BA0F4]" : "border-transparent"
          }`}>
            <h2 className="text-xl font-semibold mb-2">Personal Plan</h2>
            <p className="text-gray-600 mb-4">Best for individuals</p>
            <div className="text-3xl font-bold mb-6">${personalPrice}/month</div>
            <Button 
              onClick={() => setSelectedPlan("personal")}
              className="w-full bg-[#4BA0F4] hover:bg-[#4BA0F4]/90"
            >
              Select Personal Plan
            </Button>
          </div>

          {/* Pro Plan */}
          <div className={`bg-white p-6 rounded-xl shadow-md border-2 ${
            selectedPlan === "pro" ? "border-[#008000]" : "border-transparent"
          }`}>
            <h2 className="text-xl font-semibold mb-2">Pro Plan</h2>
            <p className="text-gray-600 mb-4">Best for teams</p>
            <div className="mb-4">
              <Label htmlFor="userCount">Number of Users</Label>
              <div className="flex items-center gap-3 mt-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => adjustUserCount(false)}
                  disabled={userCount <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="userCount"
                  type="number"
                  value={userCount}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value >= 1 && value <= 999) {
                      setUserCount(value);
                    }
                  }}
                  min="1"
                  max="999"
                  className="text-center w-24 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => adjustUserCount(true)}
                  disabled={userCount >= 999}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-3xl font-bold mb-6">
              ${proPricePerUser * userCount}/month
            </div>
            <Button 
              onClick={() => setSelectedPlan("pro")}
              className="w-full bg-[#008000] hover:bg-[#008000]/90"
            >
              Select Pro Plan
            </Button>
          </div>
        </div>

        {/* Promo Code Section */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h3 className="text-lg font-semibold mb-4">Promotion Code</h3>
          <div className="flex gap-4">
            <Input
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handlePromoCode} variant="outline">
              Apply Code
            </Button>
          </div>
        </div>

        {selectedPlan && (
          <>
            {/* Plan Summary */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
              <h3 className="text-lg font-semibold mb-4">Plan Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Selected Plan</span>
                  <span className="font-semibold">
                    {selectedPlan === "personal" ? "Personal" : "Pro"}
                  </span>
                </div>
                {selectedPlan === "pro" && (
                  <div className="flex justify-between">
                    <span>Number of Users</span>
                    <span className="font-semibold">{userCount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Monthly Total</span>
                  <span className="font-semibold">${calculateTotal()}</span>
                </div>
                <Separator />
                <p className="text-sm text-gray-600">
                  Your first charge will be after the 30-day free trial.
                </p>
                <p className="text-sm text-gray-600">
                  Your subscription renews automatically unless canceled.
                </p>
              </div>
            </div>

            {/* Update Checkout Button */}
            <Button 
              onClick={handleCheckout} 
              className="w-full h-12 text-lg mb-8"
              disabled={isLoading}
            >
              <CreditCard className="w-5 h-5 mr-2" />
              {isLoading ? "Processing..." : "Start Free Trial & Subscribe"}
            </Button>

            {/* Legal Section */}
            <div className="text-center text-sm text-gray-600 space-y-4">
              <p>
                By subscribing, you agree to our{" "}
                <Link to="/terms" className="text-[#4BA0F4] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-[#4BA0F4] hover:underline">
                  Privacy Policy
                </Link>
              </p>
              <p>
                Need help?{" "}
                <Link to="/contact" className="text-[#4BA0F4] hover:underline">
                  Contact our support team
                </Link>
              </p>
            </div>
          </>
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="w-4 h-4" />
              Secure Checkout by Stripe
            </div>
            <div className="flex gap-6 text-sm">
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">
                Support
              </Link>
              <Link to="/privacy" className="text-gray-600 hover:text-gray-900">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-gray-900">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Sales;
