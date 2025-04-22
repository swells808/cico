
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CompletionStepProps {
  onBack: () => void;
}

const CompletionStep: React.FC<CompletionStepProps> = ({ onBack }) => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-[#008000]/10 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-10 w-10 text-[#008000]" />
        </div>
        <h2 className="text-2xl font-bold">You're All Set!</h2>
        <p className="text-gray-600 mt-2">Your CICO Timeclock account has been configured successfully.</p>
      </div>
      
      <Card className="text-left">
        <CardContent className="p-6">
          <h3 className="font-medium text-lg mb-3">Account Summary</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-1">
              <span className="text-gray-500">Company:</span>
              <span>Acme Inc.</span>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <span className="text-gray-500">Team Members:</span>
              <span>3 invited</span>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <span className="text-gray-500">Work Hours:</span>
              <span>9:00 AM - 5:00 PM</span>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <span className="text-gray-500">Plan:</span>
              <span>Pro - 14-day free trial</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="pt-4 flex flex-col gap-3">
        <Button onClick={goToDashboard} className="bg-[#008000] hover:bg-[#008000]/90 w-full">
          Go to Dashboard
        </Button>
        <Button type="button" variant="outline" onClick={onBack}>
          Back to Settings
        </Button>
      </div>
    </div>
  );
};

export default CompletionStep;
