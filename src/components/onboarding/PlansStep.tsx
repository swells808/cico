
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';
import { useToast } from '@/components/ui/use-toast';
import { CompanyDetailsData } from '@/pages/Onboarding';

interface PlansStepProps {
  onNext: () => void;
  onBack: () => void;
  companyDetails?: CompanyDetailsData | null;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  stripe_price_id: string;
}

const PlansStep: React.FC<PlansStepProps> = ({ onNext, onBack, companyDetails }) => {
  const [selectedPlan, setSelectedPlan] = useState('personal');
  const [promoCode, setPromoCode] = useState('');
  const [plans, setPlans] = useState<SubscriptionPlan[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('id, name, price, features, stripe_price_id');
      if (!error && data) {
        const typedPlans = data.map(plan => ({
          ...plan,
          features: Array.isArray(plan.features)
            ? plan.features.map(feature => String(feature))
            : []
        }));
        setPlans(typedPlans);
      }
      setIsLoading(false);
    })();
  }, []);

  const personal = plans?.find(plan => plan.name.toLowerCase().includes('personal'));
  const pro = plans?.find(plan => plan.name.toLowerCase().includes('pro'));

  const getTotal = () => {
    if (isLoading || !personal || !pro) return '--';
    if (selectedPlan === 'personal') {
      return `$${personal.price}/month`;
    }
    return `$${pro.price}/month`;
  };

  // When submitting, create the company in supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that companyDetails is present and required fields exist
    if (!companyDetails) {
      toast({
        title: "Company information is missing",
        variant: "destructive",
      });
      console.error("Company details missing in PlansStep", companyDetails);
      return;
    }

    console.log("Starting company creation with details:", companyDetails);
    setIsSubmitting(true);

    // Prepare data for insert
    const {
      companyName,
      industry,
      streetAddress,
      city,
      stateProvince,
      postalCode,
      country,
      phone,
      website,
      departments,
    } = companyDetails;

    try {
      console.log("Starting Supabase company insertion");
      
      // Explicitly format the data for insertion according to Supabase schema
      const companyData = {
        company_name: companyName,
        industry: industry || null,
        street_address: streetAddress,
        city,
        state_province: stateProvince,
        postal_code: postalCode,
        country,
        phone,
        website: website || null,
        departments: departments || [],  // Ensure it's an array even if empty
      };
      
      console.log("Formatted data for insertion:", companyData);
      
      // Test the Supabase connection first
      const connectionTest = await supabase.from('companies').select().limit(1);
      console.log("Supabase connection test:", connectionTest);
      
      if (connectionTest.error) {
        throw new Error(`Supabase connection error: ${connectionTest.error.message}`);
      }
      
      // Use .select() to return the inserted data for confirmation
      const { error, data } = await supabase
        .from('companies')
        .insert(companyData)
        .select();
      
      console.log("Supabase insert response:", { error, data });
      
      if (error) {
        console.error("Supabase insertion error:", error);
        throw error;
      }
      
      console.log("Company created successfully:", data);

      toast({
        title: "Company created successfully.",
        description: "Your company profile was saved.",
        variant: "default",
      });

      onNext();
    } catch (err: any) {
      console.error("Error creating company:", err);
      
      // More detailed error logging
      if (err.message) console.error("Error message:", err.message);
      if (err.details) console.error("Error details:", err.details);
      if (err.hint) console.error("Error hint:", err.hint);
      if (err.code) console.error("Error code:", err.code);
      
      toast({
        title: "Error creating company",
        description: err?.message || "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-center">Choose Your Plan</h2>
      <RadioGroup
        value={selectedPlan}
        onValueChange={setSelectedPlan}
        className="flex flex-col space-y-4"
      >
        <Card className={`border-2 ${selectedPlan === 'personal' ? 'border-[#008000]' : 'border-gray-200'}`}>
          <CardContent className="p-4">
            <div className="flex items-start">
              <RadioGroupItem value="personal" id="personal" className="mt-1" />
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <Label htmlFor="personal" className="text-lg font-medium">Personal</Label>
                  {selectedPlan === 'personal' && <CheckCircle className="h-5 w-5 text-[#008000]" />}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Perfect for individuals or small teams
                </p>
                <div className="mt-2">
                  <span className="text-xl font-bold">{isLoading ? '...' : personal ? `$${personal.price}` : '--'}</span>
                  <span className="text-gray-500"> / month</span>
                </div>
                <ul className="mt-3 space-y-1 text-sm">
                  <li>• Up to 5 users</li>
                  <li>• Basic time tracking</li>
                  <li>• Limited reporting</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={`border-2 ${selectedPlan === 'pro' ? 'border-[#008000]' : 'border-gray-200'}`}>
          <CardContent className="p-4">
            <div className="flex items-start">
              <RadioGroupItem value="pro" id="pro" className="mt-1" />
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <Label htmlFor="pro" className="text-lg font-medium">Pro</Label>
                  {selectedPlan === 'pro' && <CheckCircle className="h-5 w-5 text-[#008000]" />}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  For businesses that need advanced features
                </p>
                <div className="mt-2">
                  <span className="text-xl font-bold">
                    {isLoading ? '...' : pro ? `$${pro.price}` : '--'}
                  </span>
                  <span className="text-gray-500"> / month</span>
                </div>
                <ul className="mt-3 space-y-1 text-sm">
                  <li>• Unlimited users</li>
                  <li>• Advanced reporting</li>
                  <li>• All premium features</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </RadioGroup>
      <div className="pt-2">
        <Label htmlFor="promoCode">Promo Code</Label>
        <Input
          id="promoCode"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Enter promo code if you have one"
          className="mt-1"
        />
      </div>
      <div className="pt-4 flex justify-between">
        <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
          Back
        </Button>
        <Button 
          type="submit" 
          className="bg-[#008000] hover:bg-[#008000]/90" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Continue to Free Trial'}
        </Button>
      </div>
    </form>
  );
};

export default PlansStep;
