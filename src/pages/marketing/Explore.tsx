import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import CTASection from '@/components/common/CTASection';
import ExploreMoreSection from '@/components/explore/ExploreMoreSection';
import { motion } from 'framer-motion';

export default function Explore() {
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

        <main className="pt-24">
          {/* Explore More Section */}
          <ExploreMoreSection />

          <CTASection />
        </main>

        <Footer />
      </div>
    </>
  );
}
