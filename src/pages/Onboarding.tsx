
import React, { useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import ProgressBar from '@/components/onboarding/ProgressBar';
import CompanyDetailsStep from '@/components/onboarding/CompanyDetailsStep';
import TeamMembersStep from '@/components/onboarding/TeamMembersStep';
import WorkHoursStep from '@/components/onboarding/WorkHoursStep';
import FeaturesStep from '@/components/onboarding/FeaturesStep';
import PlansStep from '@/components/onboarding/PlansStep';
import CompletionStep from '@/components/onboarding/CompletionStep';

// Types for accumulating onboarding form data
export interface CompanyDetailsData {
  companyName: string;
  industry?: string;
  streetAddress: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  phone: string;
  website?: string;
  departments?: string[];
  companyLogoUrl?: string; // store URL here after logo upload (future)
}

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(0);
  const totalSteps = 6;

  // NEW: aggregate all onboarding state here
  const [companyDetails, setCompanyDetails] = useState<CompanyDetailsData | null>(null);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [workHours, setWorkHours] = useState<any>(null);
  const [features, setFeatures] = useState<any>(null);
  
  console.log("Current step:", step);
  console.log("Company details in state:", companyDetails);

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps - 1));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));

  const handleCompanyDetailsComplete = (fields: CompanyDetailsData) => {
    console.log("Company details completed:", fields);
    setCompanyDetails(fields);
    nextStep();
  };

  function renderStep() {
    switch (step) {
      case 0:
        return (
          <CompanyDetailsStep
            onNext={nextStep}
            onComplete={handleCompanyDetailsComplete}
            initialData={companyDetails}
          />
        );
      case 1:
        return (
          <TeamMembersStep
            onNext={nextStep}
            onBack={prevStep}
            departments={companyDetails?.departments || []}
            // Add team member data collection in future
          />
        );
      case 2:
        return <WorkHoursStep onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <FeaturesStep onNext={nextStep} onBack={prevStep} />;
      case 4:
        return (
          <PlansStep
            onNext={nextStep}
            onBack={prevStep}
            companyDetails={companyDetails}
          />
        );
      case 5:
        return <CompletionStep onBack={prevStep} />;
      default:
        return (
          <CompanyDetailsStep
            onNext={nextStep}
            onComplete={handleCompanyDetailsComplete}
            initialData={companyDetails}
          />
        );
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="py-8 px-4 flex justify-center">
        <Logo className="h-9" />
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md md:max-w-2xl">
          <ProgressBar 
            currentStep={step + 1} 
            totalSteps={totalSteps}
            className="mb-8" 
          />
          <div className="bg-white rounded-2xl shadow-lg px-5 py-8 md:p-10">
            {renderStep()}
          </div>
        </div>
      </main>
      <footer className="py-4 px-4 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} CICO Timeclock. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Onboarding;
