
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/Logo';

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(0);

  function renderWelcome() {
    return (
      <div className="flex flex-col items-center">
        <Logo className="h-12 mb-6" />
        <h1 className="text-2xl font-bold text-[#1A1F2C] text-center">Welcome to CICO Timeclock!</h1>
        <p className="text-gray-600 mt-2 text-center">
          Let's get your account set up in a few easy steps.
        </p>
        <Button className="mt-10 px-8 py-3 text-base bg-[#008000] hover:bg-[#008000]/90" onClick={() => setStep(1)}>
          Get Started
        </Button>
      </div>
    );
  }

  function renderStep1() {
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-semibold text-center mb-3">Welcome!</h2>
        <p className="text-gray-600 text-center">
          You're on step 1 of onboarding.<br />More steps coming soon.
        </p>
        <Button className="mt-8 px-8 py-3 text-base bg-[#008000] hover:bg-[#008000]/90" onClick={() => setStep(0)}>
          Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="py-6 px-4 flex justify-center">
        <Logo className="h-10" />
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          {step === 0 && renderWelcome()}
          {step === 1 && renderStep1()}
        </div>
      </main>
      <footer className="py-4 px-4 border-t">
        <div className="flex justify-center gap-2">
          {/* Progress dots could be placed here */}
        </div>
      </footer>
    </div>
  );
};

export default Onboarding;
