import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Building2, Link as LinkIcon, 
  Users, ArrowRight, CheckSquare, Square
} from 'lucide-react';

// --- Reusable Input Component ---
const FormInput = ({ label, type = "text", placeholder, icon: Icon, required, delay }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div 
      className="flex flex-col mb-6 animate-[fadeUp_0.6s_ease-out_both]"
      style={{ animationDelay: delay }}
    >
      <label className="text-[13px] font-bold text-[#1A1A1A] mb-2 flex items-center">
        {label} {required && <span className="text-gray-400 ml-1">*</span>}
      </label>
      <div 
        className={`relative flex items-center bg-white border rounded-[8px] overflow-hidden transition-all duration-300 ${
          isFocused ? 'border-[#A2B64F] shadow-[0_0_0_3px_rgba(162,182,79,0.15)]' : 'border-[#E5E5E5] hover:border-gray-300'
        }`}
      >
        {Icon && (
          <div className={`pl-3.5 pr-2 transition-colors duration-300 ${isFocused ? 'text-[#A2B64F]' : 'text-gray-400'}`}>
            <Icon size={16} strokeWidth={2.5} />
          </div>
        )}
        <input 
          type={type} 
          placeholder={placeholder}
          className="w-full py-2.5 px-3 text-[14px] text-gray-800 placeholder-gray-400 outline-none bg-transparent"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
};

// --- Custom Interactive Radio Option ---
const RadioOption = ({ label, selected, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-[6px] border transition-all duration-300 cursor-pointer group select-none w-fit mb-2 ${
        selected 
          ? 'border-[#1A1A1A] bg-[#FAFAFA]' 
          : 'border-[#E5E5E5] hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      {/* Custom Square Icon matching the image style */}
      <div className={`flex items-center justify-center transition-colors duration-300 ${selected ? 'text-[#1A1A1A]' : 'text-gray-400 group-hover:text-gray-600'}`}>
        {selected ? <CheckSquare size={16} strokeWidth={2.5} /> : <Square size={16} strokeWidth={2.5} />}
      </div>
      <span className={`text-[13px] font-medium transition-colors duration-300 ${selected ? 'text-[#1A1A1A]' : 'text-[#666666] group-hover:text-[#1A1A1A]'}`}>
        {label}
      </span>
    </div>
  );
};

// --- Main Form Section Component ---
export default function StartupFormSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Form State
  const [fundingStatus, setFundingStatus] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Trigger entrance animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const fundingOptions = [
    "No funding / bootstrapped",
    "Pre-seed",
    "Seed",
    "Series A",
    "Series B",
    "Series C+"
  ];

  const employeeOptions = [
    "1-5",
    "6-10",
    "11-20",
    "21-30",
    "31-50",
    "50+"
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-[#BAC66E] selection:text-black py-24 px-6 flex flex-col items-center">
      
      {/* Header Area */}
      <div 
        className={`text-center max-w-2xl mx-auto mb-10 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h2 className="text-[36px] md:text-[44px] font-serif text-[#1A1A1A] leading-[1.1] tracking-tight mb-4">
          Apply for 1 free year<br />
          of Loop Business
        </h2>
        <p className="text-[15px] md:text-[16px] text-[#737373] leading-[1.5] max-w-md mx-auto">
          Available to startups with fewer than 30 employees who have raised a pre-seed or seed.
        </p>
      </div>

      {/* Main Form Card */}
      <div 
        className={`w-full max-w-[600px] bg-white border border-[#E5E5E5] rounded-[12px] p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        style={{ transitionDelay: '0.2s' }}
      >
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col">
          
          <FormInput label="Name" icon={User} required delay="0.3s" />
          <FormInput label="Work email" type="email" icon={Mail} required delay="0.4s" />
          <FormInput label="Company name" icon={Building2} required delay="0.5s" />
          <FormInput label="Company LinkedIn or Website" icon={LinkIcon} required delay="0.6s" />

          {/* Funding Status Radio Group */}
          <div className="mb-8 animate-[fadeUp_0.6s_ease-out_both]" style={{ animationDelay: '0.7s' }}>
            <label className="text-[13px] font-bold text-[#1A1A1A] mb-3 flex items-center">
              What's your funding status? <span className="text-gray-400 ml-1">*</span>
            </label>
            <div className="flex flex-col">
              {fundingOptions.map((option) => (
                <RadioOption 
                  key={option} 
                  label={option} 
                  selected={fundingStatus === option} 
                  onClick={() => setFundingStatus(option)} 
                />
              ))}
            </div>
          </div>

          {/* Employee Count Radio Group */}
          <div className="mb-8 animate-[fadeUp_0.6s_ease-out_both]" style={{ animationDelay: '0.8s' }}>
            <label className="text-[13px] font-bold text-[#1A1A1A] mb-3 flex items-center">
              How many employees does your company have? <span className="text-gray-400 ml-1">*</span>
            </label>
            <div className="flex flex-col">
              {employeeOptions.map((option) => (
                <RadioOption 
                  key={option} 
                  label={option} 
                  selected={employeeCount === option} 
                  onClick={() => setEmployeeCount(option)} 
                />
              ))}
            </div>
          </div>

          <FormInput label="Investor Names" icon={Users} required delay="0.9s" />

          {/* Requirements Checkbox */}
          <div className="mb-10 animate-[fadeUp_0.6s_ease-out_both]" style={{ animationDelay: '1.0s' }}>
            <label className="text-[13px] font-bold text-[#1A1A1A] mb-3 flex items-center">
              Requirements <span className="text-gray-400 ml-1">*</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5">
                <input 
                  type="checkbox" 
                  className="peer sr-only"
                  checked={agreedToTerms}
                  onChange={() => setAgreedToTerms(!agreedToTerms)}
                />
                <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all duration-300 ${agreedToTerms ? 'bg-[#1A1A1A] border-[#1A1A1A]' : 'bg-white border-[#E5E5E5] group-hover:border-gray-400'}`}>
                  <svg className={`w-3 h-3 text-white transition-transform duration-300 ${agreedToTerms ? 'scale-100' : 'scale-0'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
              <span className="text-[13px] text-[#666666] leading-[1.4] select-none group-hover:text-[#1A1A1A] transition-colors">
                My startup has not paid for Loop or used a previous Loop coupon
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="animate-[fadeUp_0.6s_ease-out_both]" style={{ animationDelay: '1.1s' }}>
            <button 
              type="submit"
              className="group relative bg-[#1A1A1A] hover:bg-[#000000] text-white px-6 py-2.5 rounded-[8px] text-[14px] font-bold transition-all duration-300 flex items-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
            >
              Apply
              <ArrowRight size={16} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

        </form>
      </div>

      {/* Global Embedded Animations */}
      <style>
        {`
          @keyframes fadeUp {
            from { 
              opacity: 0; 
              transform: translateY(20px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
        `}
      </style>
    </div>
  );
}