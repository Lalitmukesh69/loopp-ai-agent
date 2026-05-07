import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import CTASection from '@/components/common/CTASection';
import FAQSection from '@/components/common/FAQSection';

// Sales components
import SalesHero from '@/components/use-cases/sales/SalesHero';
import WhySalesSection from '@/components/use-cases/sales/WhySalesSection';
import SalesHowItWorks from '@/components/use-cases/sales/SalesHowItWorks';
import RoleCoverageSection from '@/components/use-cases/sales/RoleCoverageSection';

export default function SalesCase() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');
        
        .font-headline { font-family: 'Raleway', sans-serif; font-weight: 700; }
        .font-body { font-family: 'Raleway', sans-serif; }
        .text-balance { text-wrap: balance; }
        .newsreader-italic { font-family: 'Raleway', sans-serif; font-style: italic; }
      `}</style>

      <div className="bg-[#fcfcf9] text-[#1a1c1b] font-body selection:bg-[#4b6319]/20 overflow-x-hidden">
        <Navbar />

        <main>
          <SalesHero />
          <WhySalesSection />
          <SalesHowItWorks />
          <RoleCoverageSection />
          
          {/* Reusing existing FAQ component */}
          <FAQSection />
          
          <CTASection />
        </main>

        <Footer />
      </div>
    </>
  );
}
