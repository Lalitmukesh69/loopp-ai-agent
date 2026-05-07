import React from 'react';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import CTASection from './common/CTASection';

/* ───── Pricing Section Components ───── */
import PricingStyles from './pricing/PricingStyles';
import PricingCards from './pricing/PricingCards';
import TestimonialQuote from './pricing/TestimonialQuote';
import FAQSection from './pricing/FAQSection';
import ResourcesSection from './pricing/ResourcesSection';
import TwitterTestimonials from './pricing/TwitterTestimonials';
import SocialProof from './pricing/SocialProof';

export default function LoopPricing() {
  return (
    <>
      <PricingStyles />

      <div className="bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden">
        <Navbar />

        <main>
          <PricingCards />
          <TestimonialQuote />
          <FAQSection />
          <ResourcesSection />
          <TwitterTestimonials />
          <SocialProof />
          <CTASection />
        </main>

        <Footer />
      </div>
    </>
  );
}
