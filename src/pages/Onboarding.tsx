
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
        <p className="text-gray-600 mt-2 text-center">Let's get your account set up in a few easy steps.</p>
        <Button className="mt-10 px-8 py-3 text-base" onClick={() => setStep(1)}>
          Get Started
        </Button>
      </div>
    );
  }

  // Step rendering functions will go here

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#E6F2FF] via-[#D3E5F7] to-[#5296ED]/20">
      {/* Header with logo and progress */}
      <header className="py-6 px-4 flex justify-center">
        <Logo className="h-10" />
      </header>
      
      {/* Main content area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-md mx-auto">
        {step === 0 && renderWelcome()}
        {/* Add other steps here */}
      </main>
      
      {/* Footer with progress indicator */}
      <footer className="py-4 px-4 border-t">
        <div className="flex justify-center gap-2">
          {/* Progress dots would go here */}
        </div>
      </footer>
    </div>
  );
};

export default Onboarding;
