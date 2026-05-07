import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import CTASection from '@/components/common/CTASection';
import SecurityHeroSection from '@/components/security/SecurityHeroSection';
import BasicsSection from '@/components/security/BasicsSection';
import DataSecuritySection from '@/components/security/DataSecuritySection';
import DataStorageSection from '@/components/security/DataStorageSection';
import TermsPoliciesSection from '@/components/security/TermsPoliciesSection';

export default function Security() {
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
          <SecurityHeroSection />

          {/* The Basics Section */}
          <BasicsSection />

          {/* Data Security Section */}
          <DataSecuritySection />

          {/* Data Storage & Processing Section */}
          <DataStorageSection />

          {/* Terms & Policies Section */}
          <TermsPoliciesSection />

          {/* CTA Section (reused from common) */}
          <CTASection />
        </main>

        <Footer />
      </div>
    </>
  );
}
