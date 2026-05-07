import React, { useState, useEffect } from 'react';
import { ArrowUp, Pen, Folder } from 'lucide-react';
import { pravatarUrl } from '@/data/marketingImages';

// --- Custom SVGs for App Integrations ---
const HubspotLogo = () => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="16" fill="#FF7A59"/>
    <circle cx="32" cy="32" r="8" stroke="white" strokeWidth="4"/>
    <circle cx="20" cy="20" r="4" fill="white"/>
    <circle cx="44" cy="20" r="4" fill="white"/>
    <circle cx="44" cy="44" r="4" fill="white"/>
    <path d="M22 22L28 28M42 22L36 28M42 42L36 36" stroke="white" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

const LinearLogo = () => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="16" fill="#1A1A24"/>
    <path d="M18 46L32 24L46 46H18Z" stroke="white" strokeWidth="5" strokeLinejoin="round"/>
    <path d="M24 46L32 34L40 46" stroke="#1A1A24" strokeWidth="6" strokeLinejoin="round"/>
  </svg>
);

const NotionLogo = () => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="62" height="62" x="1" y="1" rx="15" fill="white" stroke="#E5E5E5" strokeWidth="2"/>
    <path d="M22 20V44L42 24V44M22 20H28M22 44H28M36 24H42M36 44H42" stroke="black" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter"/>
    <path d="M22 20L42 44" stroke="black" strokeWidth="4"/>
  </svg>
);

const SlackLogo = () => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="62" height="62" x="1" y="1" rx="15" fill="white" stroke="#E5E5E5" strokeWidth="2"/>
    <path d="M24 20C24 17.7909 25.7909 16 28 16C30.2091 16 32 17.7909 32 20V28H28C25.7909 28 24 26.2091 24 24V20Z" fill="#E01E5A"/>
    <path d="M28 32C30.2091 32 32 30.2091 32 28C32 25.7909 30.2091 24 28 24H20C17.7909 24 16 25.7909 16 28C16 30.2091 17.7909 32 20 32H28Z" fill="#E01E5A"/>
    <path d="M44 24C46.2091 24 48 25.7909 48 28C48 30.2091 46.2091 32 44 32V24H44Z" fill="#36C5F0"/>
    <path d="M36 28C36 25.7909 37.7909 24 40 24C42.2091 24 44 25.7909 44 28V36C44 38.2091 42.2091 40 40 40C37.7909 40 36 38.2091 36 36V28Z" fill="#36C5F0"/>
    <path d="M40 44C40 46.2091 38.2091 48 36 48C33.7909 48 32 46.2091 32 44V36H36C38.2091 36 40 37.7909 40 40V44Z" fill="#2EB67D"/>
    <path d="M36 32C33.7909 32 32 33.7909 32 36C32 38.2091 33.7909 40 36 40H44C46.2091 40 48 38.2091 48 36C48 33.7909 46.2091 32 44 32H36Z" fill="#2EB67D"/>
    <path d="M20 40C17.7909 40 16 38.2091 16 36C16 33.7909 17.7909 32 20 32V40H20Z" fill="#ECB22E"/>
    <path d="M28 36C28 38.2091 26.2091 40 24 40C21.7909 40 20 38.2091 20 36V28C20 25.7909 21.7909 24 24 24C26.2091 24 28 25.7909 28 28V36Z" fill="#ECB22E"/>
  </svg>
);

const AppIconPurple = () => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="16" fill="#5851DB"/>
    <circle cx="26" cy="26" r="10" stroke="white" strokeWidth="5" fill="none"/>
    <circle cx="38" cy="26" r="10" stroke="white" strokeWidth="5" fill="none"/>
    <circle cx="26" cy="38" r="10" stroke="white" strokeWidth="5" fill="none"/>
    <circle cx="38" cy="38" r="10" stroke="white" strokeWidth="5" fill="none"/>
  </svg>
);

const ZapierLogo = () => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="16" fill="#FF4A00"/>
    <text x="32" y="36" fill="white" fontSize="15" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">zapier</text>
  </svg>
);

const MacDots = () => (
  <div className="flex gap-1.5 mb-4 px-1">
    <div className="w-2 h-2 rounded-full bg-[#FF5F56]"></div>
    <div className="w-2 h-2 rounded-full bg-[#FFBD2E]"></div>
    <div className="w-2 h-2 rounded-full bg-[#27C93F]"></div>
  </div>
);

// --- Individual Card Components ---

const EditNotesCard = () => (
  <div className="flex flex-col h-[420px] bg-white rounded-2xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden group hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all duration-500">
    <div className="flex-1 bg-[#FAFAFA] p-6 relative overflow-hidden flex flex-col items-center">
      
      {/* Search Pill */}
      <div className="w-full bg-white rounded-full py-2.5 px-4 flex items-center justify-between shadow-sm border border-gray-100 z-10 mb-6 group-hover:-translate-y-1 transition-transform duration-500">
        <span className="text-[13px] font-medium text-gray-800 tracking-tight">Can you make this more concise?</span>
        <button className="w-6 h-6 rounded-full bg-[#F0F4E3] text-[#4B5921] flex items-center justify-center">
           <ArrowUp size={14} strokeWidth={2.5} />
        </button>
      </div>

      {/* Background Document */}
      <div className="w-full text-left space-y-2.5 relative z-0">
        <h4 className="text-[14px] font-bold text-gray-400">Contract Discussion</h4>
        <ul className="text-[12px] text-gray-300 space-y-2.5 pl-3 list-disc">
          <li>Scope Definition: Initial implementation, monthly feature updates... strategy reviews with 2 day non-renewal notice</li>
          <li>Flexibility Clause: Minor adjustments permitted with mutual agreement</li>
          <li>Pricing Structure: $5,000/mo with 5% discount for annual...</li>
          <li>Payment Terms: Net 30, with 1.5% monthly late payment penalty</li>
        </ul>
      </div>

      {/* Floating Edit Popover */}
      <div className="absolute top-[85px] left-6 right-[-20px] bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden z-20 transition-all duration-700 ease-out transform group-hover:-translate-y-3 group-hover:scale-[1.02]">
        <div className="bg-[#F0F4E3] border-b border-[#E2E8C1] px-3 py-2 flex items-center gap-2">
           <Pen size={12} className="text-[#546522]" />
           <span className="text-[12px] font-semibold text-[#546522]">Editing note...</span>
        </div>
        <div className="p-4 space-y-2 text-left">
          <h4 className="text-[13px] font-bold text-gray-800">Contract Discussion</h4>
          <ul className="text-[11px] text-gray-600 space-y-1.5 pl-3 list-disc font-medium leading-[1.4]">
            <li>Scope: Implementation + monthly updates</li>
            <li>Flexibility: Minor adjustments with mutual consent</li>
            <li>Pricing: $5K/mo (5% annual discount)</li>
            <li>Payment: Net-30, 1.5% monthly late fee</li>
          </ul>
        </div>
      </div>

    </div>
    
    <div className="p-6 bg-white shrink-0">
      <p className="text-[15px] text-[#1A1A1A] font-medium tracking-tight">Edit or tidy your notes straight away</p>
    </div>
  </div>
);


const SearchMeetingsCard = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "What are our top feature requests?";

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setTypedText(fullText.substring(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(typing);
    }, 60); // Typing speed
    return () => clearInterval(typing);
  }, []);

  return (
    <div className="flex flex-col h-[420px] bg-white rounded-2xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden group hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all duration-500">
      <div className="flex-1 bg-[#FAFAFA] p-6 relative overflow-hidden flex flex-col items-center">
        
        {/* Search Pill with Typing Anim */}
        <div className="w-full bg-white rounded-full py-2.5 px-4 flex items-center justify-between shadow-sm border border-gray-100 z-10 mb-6 group-hover:-translate-y-1 transition-transform duration-500">
          <span className="text-[13px] font-medium text-gray-800 tracking-tight flex items-center min-h-[20px]">
            {typedText}
            <span className="inline-block w-[1.5px] h-3.5 bg-black ml-0.5 animate-[blink_1s_step-end_infinite]"></span>
          </span>
          <button className="w-6 h-6 rounded-full bg-[#F0F4E3] text-[#4B5921] flex items-center justify-center shrink-0">
             <ArrowUp size={14} strokeWidth={2.5} />
          </button>
        </div>

        {/* Mac Window Mockup */}
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col transform group-hover:-translate-y-2 transition-transform duration-700 ease-out relative">
          <MacDots />
          
          <div className="flex items-center gap-3 mb-6 mt-2">
            <div className="w-10 h-10 rounded-xl bg-[#FDF0F6] flex items-center justify-center text-[#E55986]">
              <Folder size={20} fill="currentColor" className="opacity-90" />
            </div>
            <div>
              <h3 className="font-serif text-[18px] text-gray-900 leading-tight">Sales calls</h3>
              <p className="text-[11px] text-[#999999] mt-0.5">Calls with potential customers</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={pravatarUrl("32")} alt="Avatar" className="w-8 h-8 rounded-full border border-gray-100 shadow-sm" />
              <div>
                <p className="text-[13px] font-bold text-gray-800 leading-tight">AllFound &lt;&gt; Pineapple</p>
                <p className="text-[11px] text-[#999999]">Caroline, Jon</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <img src={pravatarUrl("11")} alt="Avatar" className="w-8 h-8 rounded-full border border-gray-100 shadow-sm" />
              <div>
                <p className="text-[13px] font-bold text-gray-800 leading-tight">AllFound &lt;&gt; Luna Logic</p>
                <p className="text-[11px] text-[#999999]">Shreman, Ben, Vicky</p>
              </div>
            </div>
            <div className="flex items-center gap-3 opacity-40">
              <img src={pravatarUrl("68")} alt="Avatar" className="w-8 h-8 rounded-full border border-gray-100 shadow-sm" />
              <div>
                <p className="text-[13px] font-bold text-gray-800 leading-tight">AllFound &lt;&gt; Elemental</p>
                <p className="text-[11px] text-[#999999]">Shreman Vincent</p>
              </div>
            </div>
          </div>
          
          {/* Bottom Fade Mask */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent rounded-b-xl pointer-events-none"></div>
        </div>

      </div>
      
      <div className="p-6 bg-white shrink-0">
        <p className="text-[15px] text-[#1A1A1A] font-medium tracking-tight">Search and ask questions across all your meetings</p>
      </div>
    </div>
  );
};


const IntegrationsCard = () => (
  <div className="flex flex-col h-[420px] bg-white rounded-2xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden group hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all duration-500">
    <div className="flex-1 p-8 relative flex items-center justify-center">
      
      <div className="grid grid-cols-3 gap-4 w-full px-2">
        {[
          <HubspotLogo />, <LinearLogo />, <NotionLogo />,
          <SlackLogo />, <AppIconPurple />, <ZapierLogo />
        ].map((Logo, index) => (
          <div 
            key={index} 
            className="aspect-square w-full rounded-[18px] flex items-center justify-center transform transition-transform duration-300 hover:scale-110 hover:shadow-lg hover:z-10 cursor-pointer"
          >
             {Logo}
          </div>
        ))}
      </div>

    </div>
    
    <div className="p-6 bg-white shrink-0 border-t border-transparent">
      <p className="text-[15px] text-[#1A1A1A] font-medium tracking-tight">Send key points into the tools you already use</p>
    </div>
  </div>
);

// --- Main Layout Component ---
export default function MeetingsJustTheStartSection() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans selection:bg-[#BAC66E] selection:text-black py-24 px-6 flex flex-col items-center">
      
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-16 animate-[fadeUp_0.8s_ease-out_both]">
        <h2 className="text-[40px] md:text-[48px] font-serif text-[#1A1A1A] leading-[1.1] mb-6">
          With Loop, meetings<br />are just the start
        </h2>
        <p className="text-[18px] md:text-[20px] text-[#737373] leading-[1.5] max-w-2xl mx-auto">
          An AI notepad works alongside you, not instead of you.<br className="hidden md:block"/>
          It captures the conversation, then gives you ways to...
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1050px] mx-auto animate-[fadeUp_1s_ease-out_0.2s_both]">
        <EditNotesCard />
        <SearchMeetingsCard />
        <IntegrationsCard />
      </div>

      {/* Global Animations */}
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
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}