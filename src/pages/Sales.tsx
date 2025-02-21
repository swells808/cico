
import React, { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { Shield, CreditCard, Info } from "lucide-react";

const Sales = () => {
  const [selectedPlan, setSelectedPlan] = useState<"personal" | "pro" | null>(null);
  const [userCount, setUserCount] = useState(1);
  const [promoCode, setPromoCode] = useState("");
  const { toast } = useToast();

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
      description: "This feature will be implemented with Stripe integration",
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Proceeding to checkout...",
      description: "This feature will be implemented with Stripe integration",
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
            selectedPlan === "personal" ? "border-[#008000]" : "border-transparent"
          }`}>
            <h2 className="text-xl font-semibold mb-2">Personal Plan</h2>
            <p className="text-gray-600 mb-4">Best for individuals</p>
            <div className="text-3xl font-bold mb-6">${personalPrice}/month</div>
            <Button 
              onClick={() => setSelectedPlan("personal")}
              variant={selectedPlan === "personal" ? "default" : "outline"}
              className="w-full"
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
              <Select 
                value={String(userCount)}
                onValueChange={(value) => setUserCount(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select number of users" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 10, 15, 20].map((num) => (
                    <SelectItem key={num} value={String(num)}>
                      {num} {num === 1 ? "user" : "users"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-3xl font-bold mb-6">
              ${proPricePerUser * userCount}/month
            </div>
            <Button 
              onClick={() => setSelectedPlan("pro")}
              variant={selectedPlan === "pro" ? "default" : "outline"}
              className="w-full"
            >
              Select Pro Plan
            </Button>
          </div>
        </div>

        {selectedPlan && (
          <>
            {/* Promo Code Section */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
              <h3 className="text-lg font-semibold mb-4">Promotion Code</h3>
              <div className="flex gap-4">
                <Input
                  placeholder="Enter promo code (Optional)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handlePromoCode} variant="outline">
                  Apply Code
                </Button>
              </div>
            </div>

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

            {/* Checkout Button */}
            <Button onClick={handleCheckout} className="w-full h-12 text-lg mb-8">
              <CreditCard className="w-5 h-5 mr-2" />
              Start Free Trial & Subscribe
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
