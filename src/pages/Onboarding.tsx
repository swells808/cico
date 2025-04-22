
  function renderWelcome() {
    return (
      <div className="flex flex-col items-center">
        <Logo className="h-12 mb-6" />
        <h1 className="text-2xl font-bold text-[#1A1F2C] text-center">Welcome to CICO Timeclock!</h1>
        <p className="text-gray-600 mt-2 text-center">Let's get your account set up in a few easy steps.</p>
        <Button className="mt-10 px-8 py-3 text-base" onClick={() => setStep(1)}>
          Get Started
        </Button>
        {/* Image removed */}
      </div>
    );
  }
