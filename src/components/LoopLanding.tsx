import React from 'react';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import CTASection from './common/CTASection';
import { LandingStyles } from './landing/LandingStyles';
import HeroSection from './landing/HeroSection';
import SocialProofSection from './landing/SocialProofSection';
import HowItWorksSection from './landing/HowItWorksSection';
import PlatformSection from './landing/PlatformSection';
import TemplatesSection from './landing/TemplatesSection';
import PostMeetingSection from './landing/PostMeetingSection';
import SharingSection from './landing/SharingSection';
import TestimonialsSection from './landing/TestimonialsSection';

export default function LoopLanding() {
  return (
    <>
      <LandingStyles />
      <div className="bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden">
        <Navbar />
        
        <main>
          <HeroSection />
          <SocialProofSection />
          <HowItWorksSection />
          <PlatformSection />
          <TemplatesSection />
          <PostMeetingSection />
          <SharingSection />
          <TestimonialsSection />
          <CTASection />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
