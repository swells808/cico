
import React from "react";
import { SignupForm } from "@/components/auth/SignupForm";
import { Logo } from "@/components/ui/Logo";
import { Link } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";

const PromoSection = () => (
  <div className="w-full rounded-xl bg-[#F5F2FE] border border-[#E5DEFF] py-3 mt-10 mb-4 text-center shadow-sm text-[#403b5c] font-medium">
    <span>
      <span className="font-semibold text-[#7E69AB]">Try all features free for 30 days.</span>{" "}
      Upgrade or cancel anytime—no credit card required!
    </span>
  </div>
);

const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E5DEFF] via-[#D6BCFA] to-[#9b87f5] flex flex-col">
      {/* Header */}
      <header className="flex flex-col items-center justify-between py-5 px-4 bg-transparent">
        <div className="w-full flex flex-col items-center">
          <Logo className="h-12 mx-auto" />
        </div>
        <div className="mt-2">
          <Link to="/" className="text-[#7E69AB] hover:underline text-sm">
            &larr; Back to Home
          </Link>
        </div>
      </header>
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-2 max-w-full">
        <section className="w-full max-w-md bg-white border border-[#D6BCFA] shadow-xl rounded-2xl p-8 flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#1A1F2C]">Create Your Account</h1>
            <p className="text-[#7E69AB] mt-1 text-base">
              Sign up to start your 30-day free trial. No credit card required.
            </p>
          </div>
          <SignupForm />
        </section>
        {/* Highlight section */}
        <PromoSection />
      </main>
      {/* Minimal Footer */}
      <footer className="bg-transparent pb-7 mt-auto">
        <div className="text-center text-xs text-[#8E9196] mb-2">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
        <div className="flex gap-4 justify-center text-xs text-[#8E9196]">
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <span>|</span>
          <Link to="/terms" className="hover:underline">
            Terms
          </Link>
          <span>|</span>
          <Link to="/contact" className="hover:underline">
            Support
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Signup;
