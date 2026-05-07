import React, { useEffect, useState } from 'react';

// --- Custom SVGs and Icons ---
const WindowsIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.801"/>
  </svg>
);

const CheckIcon = () => (
  <div className="w-[18px] h-[18px] rounded-full bg-[#F0F4E3] flex items-center justify-center shrink-0 mt-[2px] transition-transform duration-300 group-hover/feature:scale-110 group-hover/feature:bg-[#E4EAC0]">
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 6.5L4.5 8.5L9.5 3.5" stroke="#7A8B37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

const PlusIcon = () => (
  <div className="w-[18px] h-[18px] rounded-full bg-[#666666] flex items-center justify-center shrink-0 mt-[2px] transition-colors duration-300 group-hover/feature:bg-[#4B5921]">
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 3V9M3 6H9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

const InfoIcon = () => (
  <div className="w-[14px] h-[14px] rounded-full bg-[#E5E5E5] flex items-center justify-center shrink-0 ml-1.5 cursor-help transition-all duration-300 hover:bg-[#D4D4D4] hover:scale-110">
    <span className="text-[9px] font-bold text-[#666666] font-serif italic relative top-[0.5px]">i</span>
  </div>
);

// --- Reusable Feature List Item ---
const FeatureItem = ({ text, isPlus = false, hasInfo = false, badge = null }) => (
  <div className="flex items-start gap-3 group/feature">
    {isPlus ? <PlusIcon /> : <CheckIcon />}
    <div className="flex flex-wrap items-center text-[13.5px] text-[#404040] leading-[1.4] transition-colors duration-300 group-hover/feature:text-[#1A1A1A]">
      {text}
      {hasInfo && <InfoIcon />}
      {badge && (
        <span className="ml-2 px-1.5 py-[2px] rounded-[3px] bg-[#F0F4E3] text-[#7A8B37] text-[9px] font-bold uppercase tracking-wider border border-[#E4EAC0]">
          {badge}
        </span>
      )}
    </div>
  </div>
);

// --- Main Pricing Component ---
export default function PricingSection() {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans selection:bg-[#BAC66E] selection:text-black py-24 px-6 flex flex-col items-center overflow-hidden">
      
      {/* --- Section Header --- */}
      <div 
        className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h2 className="text-[40px] md:text-[46px] font-serif text-[#1A1A1A] leading-[1.1] tracking-tight mb-4">
          Loop how you wanna
        </h2>
        <p className="text-[17px] md:text-[18px] text-[#737373] leading-[1.5]">
          Get the Loop plan that's right for you and your<br className="hidden md:block"/>
          team, so everyone can be on the same page.
        </p>
      </div>

      {/* --- Pricing Cards Grid --- */}
      <div className="w-full max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
        
        {/* Card 1: Basic */}
        <div 
          className={`bg-white rounded-[12px] border border-[#E5E5E5] p-7 md:p-8 flex flex-col transition-all duration-500 ease-out hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:border-gray-300 animate-[fadeUp_0.8s_ease-out_both]`}
          style={{ animationDelay: '0.1s' }}
        >
          <div className="border-b border-[#F0F0F0] pb-6 mb-6">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-1">Basic</h3>
            <p className="text-[13px] text-[#737373]">Great for a free taste of Loop</p>
          </div>
          
          <div className="flex items-baseline gap-1.5 mb-6">
            <span className="text-[42px] font-serif text-[#1A1A1A] leading-none tracking-tight">$0</span>
            <span className="text-[12px] text-[#999999] font-medium">per user per month</span>
          </div>

          <button className="w-full relative group overflow-hidden bg-[#4B5921] hover:bg-[#3D491A] text-white py-3 rounded-full text-[14px] font-bold transition-all duration-300 flex items-center justify-center gap-2 mb-8 shadow-[0_4px_12px_rgba(75,89,33,0.2)] hover:shadow-[0_6px_16px_rgba(75,89,33,0.3)] active:scale-[0.98]">
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
            <WindowsIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
            Try it for free
          </button>

          <div className="flex flex-col gap-3.5">
            <FeatureItem text="AI meeting notes" />
            <FeatureItem text="See limited meeting history" hasInfo={true} />
            <FeatureItem text="AI chat within and across meetings" />
            <FeatureItem text="Shared folders for collaboration" />
            <FeatureItem text="Customized note templates" />
            <FeatureItem text="Multi-language support" />
            <FeatureItem text="Opt out of model training any time" />
          </div>
        </div>

        {/* Card 2: Business */}
        <div 
          className={`bg-white rounded-[12px] border border-[#E5E5E5] p-7 md:p-8 flex flex-col transition-all duration-500 ease-out hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:border-gray-300 animate-[fadeUp_0.8s_ease-out_both]`}
          style={{ animationDelay: '0.25s' }}
        >
          <div className="border-b border-[#F0F0F0] pb-6 mb-6">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-1">Pro</h3>
            <p className="text-[13px] text-[#737373]">Great for individuals or small teams</p>
          </div>
          
          <div className="flex items-baseline gap-1.5 mb-6">
            <span className="text-[42px] font-serif text-[#1A1A1A] leading-none tracking-tight">$49</span>
            <span className="text-[12px] text-[#999999] font-medium">total per month</span>
          </div>

          <button className="w-full relative group overflow-hidden bg-[#4B5921] hover:bg-[#3D491A] text-white py-3 rounded-full text-[14px] font-bold transition-all duration-300 flex items-center justify-center gap-2 mb-8 shadow-[0_4px_12px_rgba(75,89,33,0.2)] hover:shadow-[0_6px_16px_rgba(75,89,33,0.3)] active:scale-[0.98]">
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
            <WindowsIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
            Try it for free
          </button>

          <div className="flex flex-col gap-3.5">
            <FeatureItem text="Everything in Basic, plus" isPlus={true} />
            <FeatureItem text="Unlimited meeting notes and history" />
            <FeatureItem text="Access to advanced AI thinking models" />
            <FeatureItem text="Advanced integrations with Attio, Notion, Slack, Hubspot, Affinity, and Zapier" />
            <FeatureItem text="Centralized billing & user management" />
            <FeatureItem text="MCP integration in all your apps" hasInfo={true} />
            <FeatureItem text="Personal API access" />
          </div>
        </div>

        {/* Card 3: Enterprise */}
        <div 
          className={`bg-white rounded-[12px] border border-[#E5E5E5] p-7 md:p-8 flex flex-col transition-all duration-500 ease-out hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:border-gray-300 animate-[fadeUp_0.8s_ease-out_both]`}
          style={{ animationDelay: '0.4s' }}
        >
          <div className="border-b border-[#F0F0F0] pb-6 mb-6">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-1">Enterprise</h3>
            <p className="text-[13px] text-[#737373]">Great for larger companies</p>
          </div>
          
          <div className="flex items-baseline gap-1.5 mb-6">
            <span className="text-[42px] font-serif text-[#1A1A1A] leading-none tracking-tight">Custom</span>
          </div>

          <div className="flex flex-col gap-2.5 mb-8">
            <button className="w-full relative group overflow-hidden bg-[#4B5921] hover:bg-[#3D491A] text-white py-3 rounded-full text-[14px] font-bold transition-all duration-300 shadow-[0_4px_12px_rgba(75,89,33,0.2)] hover:shadow-[0_6px_16px_rgba(75,89,33,0.3)] active:scale-[0.98]">
              Sign-up in app
            </button>
            <button className="w-full bg-[#F0F4E3] hover:bg-[#E4EAC0] text-[#1A1A1A] py-3 rounded-full text-[14px] font-bold transition-all duration-300 border border-transparent hover:border-[#D8E0B0] active:scale-[0.98]">
              Learn more
            </button>
          </div>

          <div className="flex flex-col gap-3.5">
            <FeatureItem text="Everything included in Pro" isPlus={true} />
            <FeatureItem text="Enterprise-grade security & admin controls" />
            <FeatureItem text="Single sign-on (SSO)" hasInfo={true} />
            <FeatureItem text="Priority support and usage analytics" />
            <FeatureItem text="Enterprise API access" />
            <FeatureItem text="Org-wide auto-deletion periods" />
            <FeatureItem text="Admin controls for sharing & API access" />
            <FeatureItem text="Opt out of model training for everyone in your team" hasInfo={true} />
            <FeatureItem text="Org-wide notification that Loop is being used" badge="PILOT" />
          </div>
        </div>

      </div>

      {/* --- Footer Note --- */}
      <div 
        className={`text-center animate-[fadeUp_1s_ease-out_both]`}
        style={{ animationDelay: '0.6s' }}
      >
        <p className="text-[13px] text-[#808080]">
          Loop contributes 1.5% of your subscription to remove CO₂ from the atmosphere through{' '}
          <a href="#" className="underline decoration-gray-300 hover:text-[#1A1A1A] hover:decoration-gray-500 transition-all underline-offset-2">
            Stripe Climate
          </a>.
        </p>
      </div>

      {/* --- Global Embedded Animations --- */}
      <style>
        {`
          @keyframes fadeUp {
            from { 
              opacity: 0; 
              transform: translateY(30px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
}