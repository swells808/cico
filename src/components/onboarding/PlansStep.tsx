
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle } from 'lucide-react';

interface PlansStepProps {
  onNext: () => void;
  onBack: () => void;
}

const PlansStep: React.FC<PlansStepProps> = ({ onNext, onBack }) => {
  const [selectedPlan, setSelectedPlan] = useState('personal');
  const [userCount, setUserCount] = useState('1');
  const [promoCode, setPromoCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would save the data before proceeding
    onNext();
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
                  <span className="text-xl font-bold">$0</span>
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
                  <span className="text-xl font-bold">$12</span>
                  <span className="text-gray-500"> / user / month</span>
                </div>
                <ul className="mt-3 space-y-1 text-sm">
                  <li>• Unlimited users</li>
                  <li>• Advanced reporting</li>
                  <li>• All premium features</li>
                </ul>
                
                {selectedPlan === 'pro' && (
                  <div className="mt-4">
                    <Label htmlFor="userCount">Number of Users</Label>
                    <Input
                      id="userCount"
                      type="number"
                      min="1"
                      value={userCount}
                      onChange={(e) => setUserCount(e.target.value)}
                      className="w-full mt-1"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Total: ${parseInt(userCount) * 12}/month
                    </p>
                  </div>
                )}
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
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" className="bg-[#008000] hover:bg-[#008000]/90">
          Continue to Free Trial
        </Button>
      </div>
    </form>
  );
};

export default PlansStep;
