import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import CTASection from '@/components/common/CTASection';
import StartupsHeroSection from '@/components/startups/StartupsHeroSection';
import AINotepadSection from '@/components/startups/AINotepadSection';
import HowItWorksSection from '@/components/use-cases/product/HowItWorksSection';
import FreeYearSection from '@/components/startups/FreeYearSection';
import StartupsFAQSection from '@/components/startups/StartupsFAQSection';

export default function Startups() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');
        
        .font-headline { font-family: 'Raleway', sans-serif; font-weight: 700; }
        .font-body { font-family: 'Raleway', sans-serif; }
        .text-balance { text-wrap: balance; }
      `}</style>

      <div className="bg-[#fcfcf9] text-[#1a1c1b] font-body selection:bg-[#4b6319]/20 overflow-x-hidden">
        <Navbar />

        <main className="pt-24">
          {/* Hero Section */}
          <StartupsHeroSection />

          {/* Loop is the AI Notepad Section */}
          <AINotepadSection />

          {/* How It Works Section (reused from Product use-case) */}
          <HowItWorksSection />

          {/* Apply for 1 Free Year of Loop Business Section */}
          <FreeYearSection />

          {/* FAQ Section (startup-specific content) */}
          <StartupsFAQSection />

          {/* CTA Section (reused from common) */}
          <CTASection />
        </main>

        <Footer />
      </div>
    </>
  );
}
