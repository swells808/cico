
import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/custom-button";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16">
        <section className="relative h-[600px] flex items-center">
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/71f33e02d5-3b4ee9b4f6ff3271ca82.png"
              alt="modern office space with people working, bright and airy, minimalist style"
            />
            <div className="absolute inset-0 bg-white/80"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Empowering Businesses with Simple & Efficient Time Tracking
              </h1>
              <p className="text-xl text-gray-600">
                CICO Timeclock was built to help small and medium-sized businesses track work hours with ease and accuracy.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-gray-600 mb-6">
                  Founded in 2018, CICO Timeclock emerged from a simple observation: small businesses needed a better way to track employee time. Our founders experienced firsthand the challenges of manual time tracking and decided to create a solution that would make it effortless.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <svg className="w-5 h-5 text-[#4BA0F4] mt-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-600">
                      Our mission is to simplify workforce management while ensuring accuracy and compliance.
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <svg className="w-5 h-5 text-[#4BA0F4] mt-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-600">
                      We value transparency, reliability, and user-centered design in everything we do.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <svg className="w-12 h-12 text-[#008000] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h3 className="text-lg font-semibold mb-2">Secure Clock-Ins</h3>
                  <p className="text-gray-600">Photo verification and geolocation tracking for accurate attendance.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <svg className="w-12 h-12 text-[#008000] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="text-lg font-semibold mb-2">Smart Reporting</h3>
                  <p className="text-gray-600">Comprehensive insights for better workforce management.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <svg className="w-12 h-12 text-[#008000] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                  <h3 className="text-lg font-semibold mb-2">Easy Integration</h3>
                  <p className="text-gray-600">Seamless connection with your existing tools.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <svg className="w-12 h-12 text-[#008000] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-lg font-semibold mb-2">Multi-Platform</h3>
                  <p className="text-gray-600">Works on any device, anywhere, anytime.</p>
                </div>
              </div>
            </div>

            <div className="mt-20 text-center">
              <h2 className="text-3xl font-bold mb-8">
                Join Thousands of Businesses Tracking Time the Smart Way!
              </h2>
              <Button variant="primary">Start Free Trial</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
