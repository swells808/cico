
import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/custom-button";
import { Check } from "lucide-react";

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16">
        <section className="bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple & Transparent Pricing<br />Start Your 30-Day Free Trial Today!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              No credit card required. Cancel anytime.
            </p>
            <Button variant="primary">Start Free Trial</Button>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Personal Plan */}
              <div className="border border-gray-200 rounded-xl p-8 bg-white shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Personal Plan</h3>
                <p className="text-gray-600 mb-4">For Solopreneurs</p>
                <div className="text-4xl font-bold mb-6">
                  $2<span className="text-lg text-gray-500">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="text-[#008000] mr-2 h-5 w-5" />
                    <span>Basic reporting</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-[#008000] mr-2 h-5 w-5" />
                    <span>Photo verification</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-[#008000] mr-2 h-5 w-5" />
                    <span>Location tracking</span>
                  </li>
                </ul>
                <Button variant="secondary" className="w-full bg-[#4BA0F4] text-white hover:bg-[#4BA0F4]/90">
                  Start Free Trial
                </Button>
              </div>

              {/* Pro Plan */}
              <div className="border-2 border-[#4BA0F4] rounded-xl p-8 bg-white shadow-md hover:shadow-lg transition-shadow relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#4BA0F4] text-white px-4 py-1 rounded-full text-sm">
                  Most Popular
                </div>
                <h3 className="text-xl font-semibold mb-2">Pro Plan</h3>
                <p className="text-gray-600 mb-4">For Growing Businesses</p>
                <div className="text-4xl font-bold mb-6">
                  $5<span className="text-lg text-gray-500">/month per user</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="text-[#008000] mr-2 h-5 w-5" />
                    <span>Everything included in Personal</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-[#008000] mr-2 h-5 w-5" />
                    <span>Unlimited employees</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-[#008000] mr-2 h-5 w-5" />
                    <span>Advanced reporting</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-[#008000] mr-2 h-5 w-5" />
                    <span>Advanced external software integrations</span>
                  </li>
                </ul>
                <Button variant="primary" className="w-full bg-[#008000] hover:bg-[#008000]/90">
                  Start Free Trial
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
