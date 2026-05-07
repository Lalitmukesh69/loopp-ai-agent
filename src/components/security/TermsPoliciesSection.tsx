import React, { useEffect, useState } from 'react';
import { 
  Globe, 
  User, 
  Monitor, 
  FileText, 
  Lock, 
  AlertTriangle,
  Building2
} from 'lucide-react';

// --- Reusable Policy Card Component ---
const PolicyCard = ({ icon: Icon, iconColorClass, title, description, delay }) => {
  return (
    <a 
      href="#"
      className="bg-white border border-[#E5E5E5] rounded-[8px] p-5 flex flex-col group transition-all duration-400 ease-out hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-[#D1D1D1] outline-none animate-[fadeUp_0.8s_ease-out_both]"
      style={{ animationDelay: delay }}
    >
      {/* Icon with Hover Animation */}
      <div className={`mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 origin-bottom-left ${iconColorClass}`}>
        <Icon size={18} strokeWidth={2} />
      </div>
      
      {/* Typography */}
      <h3 className="text-[16px] font-serif font-bold text-[#1A1A1A] mb-1.5 leading-tight group-hover:text-[#4B5921] transition-colors">
        {title}
      </h3>
      <p className="text-[13px] text-[#737373] leading-[1.5]">
        {description}
      </p>
    </a>
  );
};

// --- Reusable Category Section Component ---
const PolicyCategory = ({ title, children, isFirst }) => (
  <div className={`flex flex-col md:flex-row gap-6 md:gap-12 py-10 ${!isFirst ? 'border-t border-[#E5E5E5]' : ''}`}>
    {/* Left Column: Category Title */}
    <div className="w-full md:w-[200px] shrink-0">
      <h2 className="text-[18px] md:text-[20px] font-serif font-bold text-[#1A1A1A] tracking-tight">
        {title}
      </h2>
    </div>
    
    {/* Right Column: Cards Grid */}
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

// --- Main Section Component ---
export default function TermsAndPoliciesSection() {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans selection:bg-[#BAC66E] selection:text-black py-24 px-6 md:px-12 flex flex-col items-center">
      
      {/* Page Header */}
      <div 
        className={`text-center mb-16 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h1 className="text-[40px] md:text-[48px] font-serif text-[#1A1A1A] leading-[1.1] tracking-tight">
          Terms & Policies
        </h1>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-[1000px] mx-auto border-t border-[#E5E5E5]">
        
        {/* --- TERMS SECTION --- */}
        <PolicyCategory title="Terms" isFirst={true}>
          <PolicyCard 
            icon={Globe}
            iconColorClass="text-[#A2B64F]" // Greenish
            title="Platform Terms"
            description="The terms you agree to when using Loop"
            delay="0.1s"
          />
          <PolicyCard 
            icon={User}
            iconColorClass="text-[#9D83C6]" // Purple
            title="User Terms"
            description="Your terms as an individual in a Loop workspace"
            delay="0.2s"
          />
          <PolicyCard 
            icon={Monitor}
            iconColorClass="text-[#82A0C8]" // Blue
            title="Application Terms"
            description="Your terms as a user of Loop's mobile app"
            delay="0.3s"
          />
          <PolicyCard 
            icon={FileText}
            iconColorClass="text-[#E58066]" // Orange/Red
            title="Copyright Dispute Policy"
            description="How we handle copyright disputes"
            delay="0.4s"
          />
        </PolicyCategory>

        {/* --- PRIVACY SECTION --- */}
        <PolicyCategory title="Privacy">
          <PolicyCard 
            icon={Lock}
            iconColorClass="text-[#A2B64F]" // Greenish
            title="Privacy Policy"
            description="How we protect your privacy and data"
            delay="0.2s"
          />
          <PolicyCard 
            icon={Lock}
            iconColorClass="text-[#A2B64F]" // Greenish
            title="Data Processing Agreement"
            description="How we handle customer data"
            delay="0.3s"
          />
        </PolicyCategory>

        {/* --- REPORTS SECTION --- */}
        <PolicyCategory title="Reports">
          <PolicyCard 
            icon={AlertTriangle}
            iconColorClass="text-[#E58066]" // Orange/Red
            title="Google Workspace Session Logout Vulnerability"
            description="A post-mortem of a resolved vulnerability with Google Workspace session handling"
            delay="0.2s"
          />
          <PolicyCard 
            icon={AlertTriangle}
            iconColorClass="text-[#E58066]" // Orange/Red
            title="Legacy Unmanaged Google Accounts Workspace Auto-Join"
            description="A post-mortem of a resolved vulnerability with unmanaged Google Workspace accounts"
            delay="0.3s"
          />
          <PolicyCard 
            icon={AlertTriangle}
            iconColorClass="text-[#E58066]" // Orange/Red
            title="Vulnerability TRA-2025-07"
            description="A post-mortem of a resolved vulnerability in our iOS beta app"
            delay="0.4s"
          />
        </PolicyCategory>

        {/* --- BOTTOM ENTERPRISE CTA --- */}
        <div 
          className={`mt-12 w-full md:w-[75%] lg:w-[60%] mx-auto bg-[#FAFAFA] border border-[#E5E5E5] rounded-[8px] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-700 ease-out transform hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-[#D1D1D1] animate-[fadeUp_0.8s_ease-out_both]`}
          style={{ animationDelay: '0.6s' }}
        >
          <div className="flex items-center gap-3 text-[#666666]">
            <Building2 size={18} strokeWidth={1.5} className="text-[#A3A3A3]" />
            <span className="text-[14px] font-medium">Need more company-wide controls?</span>
          </div>
          
          <button className="group relative bg-[#1A1A1A] hover:bg-[#000000] text-white px-5 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 overflow-hidden w-full sm:w-auto text-center">
            {/* Subtle shine effect on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>
            <span className="relative z-10">Talk to us about Enterprise</span>
          </button>
        </div>

      </div>

      {/* Global Embedded Animations */}
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
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>
    </div>
  );
}