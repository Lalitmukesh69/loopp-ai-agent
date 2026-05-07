import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import CTASection from '@/components/common/CTASection';

// AI Note Taker Components
import AIHero from '@/components/ai-note-taker/AIHero';
import LookingForSection from '@/components/ai-note-taker/LookingForSection';
import WhatIsSection from '@/components/ai-note-taker/WhatIsSection';
import LoopMeetingsSection from '@/components/ai-note-taker/LoopMeetingsSection';
import ComparisonTable from '@/components/ai-note-taker/ComparisonTable';
import WhyDifferentSection from '@/components/ai-note-taker/WhyDifferentSection';
import FAQSection from '@/components/common/FAQSection';

export default function AINoteTaker() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');
        
        .font-headline { font-family: 'Raleway', sans-serif; font-weight: 700; }
        .font-body { font-family: 'Raleway', sans-serif; }
        .bg-surface { background-color: #fafafa; }
        .text-balance { text-wrap: balance; }
        .newsreader-italic { font-family: 'Raleway', sans-serif; font-style: italic; }
      `}</style>

      <div className="bg-[#fcfcf9] text-[#1a1c1b] font-body selection:bg-[#4b6319]/20 overflow-x-hidden">
        <Navbar />

        <main>
          <AIHero />
          <LookingForSection />
          <WhatIsSection />
          <LoopMeetingsSection />
          <ComparisonTable />
          <WhyDifferentSection />
          <FAQSection />
          <CTASection />
        </main>

        <Footer />
      </div>
    </>
  );
}
