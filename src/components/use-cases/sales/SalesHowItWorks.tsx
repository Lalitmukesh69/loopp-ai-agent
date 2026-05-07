import React, { useEffect, useState } from 'react';
import { 
  Sparkles, Bot, Share, Link as LinkIcon, Folder, ArrowUp, Pen, CheckCircle2, Users 
} from 'lucide-react';
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

const AbstractBlueLogo = () => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="16" fill="#3B82F6"/>
    <circle cx="24" cy="24" r="8" stroke="white" strokeWidth="4" fill="none" opacity="0.9"/>
    <circle cx="40" cy="24" r="8" stroke="white" strokeWidth="4" fill="none" opacity="0.9"/>
    <circle cx="24" cy="40" r="8" stroke="white" strokeWidth="4" fill="none" opacity="0.9"/>
    <circle cx="40" cy="40" r="8" stroke="white" strokeWidth="4" fill="none" opacity="0.9"/>
  </svg>
);

const ZapierLogo = () => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="16" fill="#FF4A00"/>
    <text x="32" y="38" fill="white" fontSize="16" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">zapier</text>
  </svg>
);

// --- Visual Mockup Components for Top Half of Cards ---

const EnhanceVisual = () => (
  <div className="w-full h-[220px] bg-[#FAFAFA] relative overflow-hidden flex items-center justify-center p-4">
    {/* Background Raw Notes */}
    <div className="absolute left-4 top-8 w-3/4 opacity-40 blur-[0.5px] transition-all duration-500 group-hover:opacity-20 group-hover:blur-[2px] group-hover:-translate-x-2">
      <h4 className="font-serif text-[18px] text-[#1A1A1A] mb-3">Luna Logic intro call</h4>
      <div className="text-[10px] text-[#737373] space-y-1.5 leading-relaxed">
        <p>100, growingg<br/>use tuesday.ai, v manual,<br/>180</p>
        <p>"a priority for q2"</p>
      </div>
    </div>

    {/* Foreground Enhanced Notes */}
    <div className="absolute right-4 top-10 w-[70%] bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-[#E5E5E5] p-4 transform translate-y-6 opacity-80 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-[1.02]">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={14} className="text-[#A2B64F] fill-[#A2B64F]/20" />
        <h4 className="font-serif text-[15px] text-[#1A1A1A] tracking-tight">Luna Logic intro call</h4>
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-[9px] font-bold text-[#1A1A1A] mb-1">AllFound Overview</p>
          <ul className="text-[9px] text-[#404040] space-y-0.5 list-disc pl-3">
            <li>100 employees, adding 20 more next quarter</li>
            <li className="text-[#A3A3A3]">Office in San Francisco and Austin</li>
          </ul>
        </div>
        <div>
          <p className="text-[9px] font-bold text-[#A3A3A3] mb-1">Current Provider (Tuesday.ai)</p>
          <ul className="text-[9px] text-[#A3A3A3] space-y-0.5 list-disc pl-3">
            <li>Data input is too manual</li>
            <li>Too complex for non-technical team members</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const BotsVisual = () => (
  <div className="w-full h-[220px] bg-[#FAFAFA] relative overflow-hidden flex items-center justify-center">
    <div className="relative w-full h-full transform scale-[0.8] origin-center transition-transform duration-500 group-hover:scale-[0.85]">
      
      {/* Pink */}
      <div className="absolute top-[20%] left-[20%] w-[220px] bg-white rounded-lg border border-[#E5E5E5] shadow-sm p-1.5 flex gap-2 items-center rotate-[-4deg] animate-[float_4s_ease-in-out_infinite] transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:-translate-x-2 group-hover:-translate-y-2">
        <div className="w-6 h-6 rounded bg-pink-100 flex items-center justify-center text-pink-500"><Bot size={12}/></div>
        <p className="text-[8px] leading-tight text-gray-800"><b>Sam's AI notetaker</b> is requesting<br/>permission to record this meeting</p>
      </div>

      {/* Green */}
      <div className="absolute top-[40%] right-[10%] w-[220px] bg-white rounded-lg border border-[#E5E5E5] shadow-sm p-1.5 flex gap-2 items-center rotate-[6deg] animate-[float_5s_ease-in-out_infinite_1s] transition-transform duration-500 group-hover:rotate-[10deg] group-hover:translate-x-2">
        <div className="w-6 h-6 rounded bg-lime-100 flex items-center justify-center text-lime-600"><Bot size={12}/></div>
        <p className="text-[8px] leading-tight text-gray-800"><b>Jonathan's AI notetaker</b> is requesting<br/>permission to record this meeting</p>
      </div>

      {/* Blue w/ Deny */}
      <div className="absolute top-[50%] left-[10%] w-[200px] bg-white rounded-lg border border-[#E5E5E5] shadow-sm p-1.5 flex gap-2 items-center rotate-[-12deg] animate-[float_4.5s_ease-in-out_infinite_0.5s] transition-transform duration-500 group-hover:rotate-[-16deg] group-hover:-translate-x-4">
        <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center text-blue-500"><Bot size={12}/></div>
        <p className="text-[8px] leading-tight text-gray-800 flex-1"><b>AI notetaker</b> is asking to<br/>join this meeting</p>
        <button className="bg-blue-500 text-white text-[8px] px-2 py-1 rounded">Deny</button>
      </div>

      {/* Red w/ Deny */}
      <div className="absolute top-[65%] right-[15%] w-[200px] bg-white rounded-lg border border-[#E5E5E5] shadow-lg p-1.5 flex gap-2 items-center rotate-[12deg] z-10 transition-transform duration-500 group-hover:rotate-[16deg] group-hover:translate-y-2 group-hover:translate-x-2">
        <div className="w-6 h-6 rounded bg-red-100 flex items-center justify-center text-red-500"><Bot size={12}/></div>
        <p className="text-[8px] leading-tight text-gray-800 flex-1"><b>AI notetaker</b> wants to<br/>record this meeting</p>
      </div>

      {/* Yellow */}
      <div className="absolute bottom-[5%] left-[30%] w-[220px] bg-white rounded-lg border border-[#E5E5E5] shadow-sm p-1.5 flex gap-2 items-center rotate-[-2deg] transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-[0deg]">
        <div className="w-6 h-6 rounded bg-yellow-100 flex items-center justify-center text-yellow-600"><Bot size={12}/></div>
        <p className="text-[8px] leading-tight text-gray-800"><b>Jack's AI notetaker</b> is requesting<br/>permission to record this meeting</p>
      </div>
    </div>
  </div>
);

const CollaborateVisual = () => (
  <div className="w-full h-[220px] bg-[#FAFAFA] relative overflow-hidden flex">
    {/* Left Area */}
    <div className="pt-10 pl-6 w-[60%] transition-transform duration-500 group-hover:-translate-x-4">
      <div className="flex items-center gap-2 mb-4">
        <h4 className="font-serif text-[18px] text-[#1A1A1A]">My Meeting</h4>
      </div>
      <div className="flex gap-2">
        <div className="bg-[#546522] text-white text-[10px] font-medium px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          Share
        </div>
        <div className="bg-[#546522] text-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
          <LinkIcon size={10} />
        </div>
      </div>
      <div className="mt-8 space-y-2">
        <div className="w-[80%] h-2 bg-gray-200 rounded"></div>
        <div className="w-[60%] h-2 bg-gray-200 rounded"></div>
        <div className="w-[70%] h-2 bg-gray-200 rounded"></div>
      </div>
    </div>

    {/* Right Sidebar Sliding In */}
    <div className="absolute right-[-40px] top-6 bottom-6 w-[180px] bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-[#E5E5E5] p-4 transition-transform duration-500 transform group-hover:-translate-x-12">
      <div className="flex gap-1.5 mb-4">
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-[#27C93F]"></div>
      </div>
      <div className="flex items-center gap-2 mb-4 px-2 py-1.5 bg-[#F4F4F4] rounded-md text-[11px] font-semibold text-[#1A1A1A]">
        <Users size={12} className="text-[#A2B64F]" /> Shared with me
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <img src={pravatarUrl("11")} alt="Avatar" className="w-6 h-6 rounded-full" />
          <div>
            <p className="text-[10px] font-bold text-[#1A1A1A] leading-tight">Product strategy...</p>
            <p className="text-[8px] text-[#737373]">Shared by Jack</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img src={pravatarUrl("32")} alt="Avatar" className="w-6 h-6 rounded-full" />
          <div>
            <p className="text-[10px] font-bold text-[#1A1A1A] leading-tight">Website sync</p>
            <p className="text-[8px] text-[#737373]">Shared by Vicky</p>
          </div>
        </div>
        <div className="flex items-center gap-2 opacity-30">
          <div className="w-6 h-6 rounded-full bg-gray-200"></div>
          <div>
            <div className="w-20 h-2 bg-gray-200 rounded mb-1"></div>
            <div className="w-12 h-1.5 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CRMVisual = () => (
  <div className="w-full h-[220px] bg-[#FAFAFA] flex items-center justify-center relative overflow-hidden">
    <div className="grid grid-cols-2 gap-3 z-10">
      <div className="w-14 h-14 transition-transform duration-300 transform hover:scale-110 group-hover:-translate-y-1"><HubspotLogo /></div>
      <div className="w-14 h-14 transition-transform duration-300 transform hover:scale-110 group-hover:-translate-y-1 delay-75"><LinearLogo /></div>
      <div className="w-14 h-14 transition-transform duration-300 transform hover:scale-110 group-hover:-translate-y-1 delay-100"><AbstractBlueLogo /></div>
      <div className="w-14 h-14 transition-transform duration-300 transform hover:scale-110 group-hover:-translate-y-1 delay-150"><ZapierLogo /></div>
    </div>
    {/* Decorative background circle */}
    <div className="absolute w-[150px] h-[150px] bg-[#F0F0F0] rounded-full scale-0 transition-transform duration-700 ease-out group-hover:scale-100"></div>
  </div>
);

const SpotVisual = () => (
  <div className="w-full h-[220px] bg-[#FAFAFA] relative overflow-hidden pt-6 px-6">
    <div className="w-full bg-white rounded-full py-2 px-3 flex items-center justify-between shadow-sm border border-[#E5E5E5] z-20 relative transform group-hover:-translate-y-1 transition-transform duration-300">
      <div className="text-[10px] font-medium text-[#1A1A1A] flex items-center w-[85%] overflow-hidden whitespace-nowrap">
        <div className="animate-[typing_4s_steps(35,end)_infinite] overflow-hidden whitespace-nowrap border-r border-black pr-1">
          What are our top feature requests?
        </div>
      </div>
      <button className="w-5 h-5 rounded-full bg-[#F4F5EE] text-[#A2B64F] flex items-center justify-center">
         <ArrowUp size={10} strokeWidth={2.5} />
      </button>
    </div>

    <div className="mt-4 bg-white rounded-t-xl border border-[#E5E5E5] border-b-0 shadow-[0_4px_15px_rgba(0,0,0,0.03)] p-4 h-[150px] transform group-hover:translate-y-1 transition-transform duration-500">
      <div className="flex gap-1 mb-4">
        <div className="w-1 h-1 rounded-full bg-[#FF5F56]"></div>
        <div className="w-1 h-1 rounded-full bg-[#FFBD2E]"></div>
        <div className="w-1 h-1 rounded-full bg-[#27C93F]"></div>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-[#FDF0F6] flex items-center justify-center text-[#E55986]">
          <Folder size={14} fill="currentColor" className="opacity-90" />
        </div>
        <div>
          <h3 className="font-serif text-[14px] text-[#1A1A1A] leading-tight">Sales calls</h3>
          <p className="text-[8px] text-[#999999]">Calls with potential customers</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <img src={pravatarUrl("47")} alt="Avatar" className="w-6 h-6 rounded-full" />
        <div>
          <p className="text-[9px] font-bold text-[#1A1A1A] leading-tight">AllFound &lt;&gt; Pineapple</p>
          <p className="text-[8px] text-[#737373]">Caroline, Jon</p>
        </div>
      </div>
    </div>
  </div>
);

const EditVisual = () => (
  <div className="w-full h-[220px] bg-[#FAFAFA] relative overflow-hidden pt-6 px-6">
    <div className="w-full bg-white rounded-full py-2 px-3 flex items-center justify-between shadow-sm border border-[#E5E5E5] z-20 relative transform group-hover:-translate-y-1 transition-transform duration-300">
      <div className="text-[10px] font-medium text-[#1A1A1A] flex items-center w-[85%] overflow-hidden whitespace-nowrap">
        <div className="animate-[typing_4s_steps(35,end)_infinite_1s] overflow-hidden whitespace-nowrap border-r border-transparent pr-1">
          Can you make this more concise?
        </div>
      </div>
      <button className="w-5 h-5 rounded-full bg-[#F4F5EE] text-[#A2B64F] flex items-center justify-center">
         <ArrowUp size={10} strokeWidth={2.5} />
      </button>
    </div>

    <div className="mt-4 text-left space-y-2 relative z-0 transition-opacity duration-300 group-hover:opacity-40">
      <h4 className="text-[11px] font-bold text-gray-400">Contract Discussion</h4>
      <ul className="text-[9px] text-gray-300 space-y-1.5 pl-3 list-disc">
        <li>Scope Definition: Initial implementation, monthly feature updates...</li>
        <li>Flexibility Clause: Minor adjustments permitted...</li>
      </ul>
    </div>

    <div className="absolute top-[80px] left-8 right-[-10px] bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-[#E5E5E5] overflow-hidden z-20 transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
      <div className="bg-[#F0F4E3] border-b border-[#E2E8C1] px-3 py-1.5 flex items-center gap-1.5">
         <Pen size={10} className="text-[#546522]" />
         <span className="text-[10px] font-semibold text-[#546522]">Editing note...</span>
      </div>
      <div className="p-3 space-y-1.5 text-left">
        <h4 className="text-[10px] font-bold text-gray-800">Contract Discussion</h4>
        <ul className="text-[8px] text-gray-600 space-y-1 pl-3 list-disc font-medium">
          <li>Scope: Implementation + monthly updates</li>
          <li>Flexibility: Minor adjustments with mutual consent</li>
          <li>Pricing: $5K/mo (5% annual discount)</li>
        </ul>
      </div>
    </div>
  </div>
);

// --- Card Container Component ---

const HowItWorksCard = ({ visual: Visual, title, description, delay }) => (
  <div 
    className="bg-white rounded-[16px] border border-[#E5E5E5] overflow-hidden flex flex-col group cursor-pointer hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-500 ease-out animate-[fadeUp_0.8s_ease-out_both]"
    style={{ animationDelay: delay }}
  >
    <Visual />
    <div className="p-6 md:p-8 flex flex-col bg-white z-10 border-t border-[#E5E5E5]/50">
      <h3 className="text-[18px] md:text-[20px] font-serif text-[#1A1A1A] font-semibold mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-[14px] text-[#737373] leading-[1.6]">
        {description}
      </p>
    </div>
  </div>
);

// --- Main Section Component ---

export default function HowItWorksSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const cardsData = [
    {
      visual: EnhanceVisual,
      title: "Automatically enhances notes",
      description: "After your meeting, Loop enhances your notes in seconds, so you can use them right away."
    },
    {
      visual: BotsVisual,
      title: "No invasive bots",
      description: "Loop doesn't join your meetings. Instead, it uses your computer audio to transcribe your calls."
    },
    {
      visual: CollaborateVisual,
      title: "Collaborate with your team",
      description: "Share calls, notes, and action items instantly."
    },
    {
      visual: CRMVisual,
      title: "Send call notes to your CRM",
      description: "Automatically make or update records in HubSpot, Attio, Affinity or send to Zapier."
    },
    {
      visual: SpotVisual,
      title: "Spot opportunities",
      description: "Search across all calls to find trends, objections, or decision-maker insights."
    },
    {
      visual: EditVisual,
      title: "Edit instantly",
      description: "Make direct edits or ask Loop for changes like \"make this more concise\"."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans selection:bg-[#BAC66E] selection:text-black py-24 px-6 flex flex-col items-center">
      
      {/* Section Header */}
      <div 
        className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h2 className="text-[40px] md:text-[48px] font-serif text-[#1A1A1A] leading-[1.1] tracking-tight mb-4">
          How it works
        </h2>
        <p className="text-[18px] md:text-[20px] text-[#737373] leading-[1.5]">
          Many AI note takers stop at a transcript.<br className="hidden md:block"/>
          That's where Loop's different.
        </p>
      </div>

      {/* 3x2 Grid */}
      <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardsData.map((card, index) => (
          <HowItWorksCard 
            key={index}
            visual={card.visual}
            title={card.title}
            description={card.description}
            delay={`${(index * 0.15) + 0.1}s`}
          />
        ))}
      </div>

      {/* Global Embedded Animations */}
      <style>
        {`
          @keyframes fadeUp {
            from { 
              opacity: 0; 
              transform: translateY(40px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          @keyframes typing {
            0%, 100% { width: 0; border-right-color: transparent; }
            5%, 50% { border-right-color: black; }
            40%, 60% { width: 100%; border-right-color: transparent; }
          }
        `}
      </style>
    </div>
  );
}