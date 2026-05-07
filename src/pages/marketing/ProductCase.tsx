import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import CTASection from '@/components/common/CTASection';
import FAQSection from '@/components/common/FAQSection';
import ProductHero from '@/components/use-cases/product/ProductHero';
import WhyProductSection from '@/components/use-cases/product/WhyProductSection';
import ProductHowItWorks from '@/components/use-cases/product/HowItWorksSection';
import RoleCoverageSection from '@/components/use-cases/product/RoleCoverageSection';

const ProductCase: React.FC = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-[#BAC66E] selection:text-black">
      <Navbar />
      
      <main>
        <ProductHero />
        <WhyProductSection />
        <ProductHowItWorks />
        <RoleCoverageSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default ProductCase;
