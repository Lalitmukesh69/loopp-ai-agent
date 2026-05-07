import React, { useEffect, useState } from 'react';
import { 
  Sparkles, Bot, Share, Link as LinkIcon, Folder, ArrowUp, Pen, CheckCircle2, Users, Search 
} from 'lucide-react';

// --- Custom SVGs for App Integrations ---
const LinearLogo = () => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="16" fill="#1A1A24"/>
    <path d="M18 46L32 24L46 46H18Z" stroke="white" strokeWidth="5" strokeLinejoin="round"/>
    <path d="M24 46L32 34L40 46" stroke="#1A1A24" strokeWidth="6" strokeLinejoin="round"/>
  </svg>
);

const JiraLogo = () => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="16" fill="#0052CC"/>
    <path d="M32 16L48 32L32 48L16 32L32 16Z" fill="white" />
  </svg>
);

const NotionLogo = () => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="16" fill="white" stroke="#E5E5E5" strokeWidth="2"/>
    <text x="32" y="38" fill="black" fontSize="24" fontWeight="bold" fontFamily="serif" textAnchor="middle">N</text>
  </svg>
);

const ZapierLogo = () => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="16" fill="#FF4A00"/>
    <text x="32" y="38" fill="white" fontSize="16" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">zapier</text>
  </svg>
);

// --- Visual Mockup Components ---

const EnhanceVisual = () => (
  <div className="w-full h-[220px] bg-[#FAFAFA] relative overflow-hidden flex items-center justify-center p-4">
    <div className="absolute left-4 top-8 w-3/4 opacity-40 blur-[0.5px] transition-all duration-500 group-hover:opacity-20 group-hover:blur-[2px] group-hover:-translate-x-2">
      <h4 className="font-serif text-[18px] text-[#1A1A1A] mb-3">Luna Logic interview</h4>
      <div className="text-[10px] text-[#737373] space-y-1.5 leading-relaxed">
        <p>latency issues dashboard<br/>needs dark mode v soon<br/>API slow ams</p>
        <p>"blocker for q2 launch"</p>
      </div>
    </div>

    <div className="absolute right-4 top-10 w-[70%] bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-[#E5E5E5] p-4 transform translate-y-6 opacity-80 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-[1.02]">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={14} className="text-[#A2B64F] fill-[#A2B64F]/20" />
        <h4 className="font-serif text-[15px] text-[#1A1A1A] tracking-tight">Product Insights</h4>
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-[9px] font-bold text-[#1A1A1A] mb-1">Top Friction Points</p>
          <ul className="text-[9px] text-[#404040] space-y-0.5 list-disc pl-3">
            <li>Dashboard latency during peak hours</li>
            <li>Lack of advanced filtering in reports</li>
          </ul>
        </div>
        <div>
          <p className="text-[9px] font-bold text-[#A3A3A3] mb-1">Feature Requests</p>
          <ul className="text-[9px] text-[#A3A3A3] space-y-0.5 list-disc pl-3">
            <li>Dark mode interface</li>
            <li>Custom export templates</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const BotsVisual = () => (
  <div className="w-full h-[220px] bg-[#FAFAFA] relative overflow-hidden flex items-center justify-center">
    <div className="relative w-full h-full transform scale-[0.8] origin-center transition-transform duration-500 group-hover:scale-[0.85]">
      {/* Visual representation of non-invasive recording */}
      <div className="absolute top-[20%] left-[20%] w-[220px] bg-white rounded-lg border border-[#E5E5E5] shadow-sm p-1.5 flex gap-2 items-center rotate-[-4deg] animate-[float_4s_ease-in-out_infinite]">
        <div className="w-6 h-6 rounded bg-pink-100 flex items-center justify-center text-pink-500"><Bot size={12}/></div>
        <p className="text-[8px] leading-tight text-gray-800"><b>No bots in your call</b>. Loop stays<br/>behind the scenes.</p>
      </div>
      {/* ... (similarly adapted blocks) */}
    </div>
  </div>
);

const CollaborateVisual = () => (
  <div className="w-full h-[220px] bg-[#FAFAFA] relative overflow-hidden flex">
    <div className="pt-10 pl-6 w-[60%] transition-transform duration-500 group-hover:-translate-x-4">
      <div className="flex items-center gap-2 mb-4">
        <h4 className="font-serif text-[18px] text-[#1A1A1A]">Product Strategy</h4>
      </div>
      <div className="flex gap-2">
        <div className="bg-[#546522] text-white text-[10px] font-medium px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">Share</div>
      </div>
    </div>
    <div className="absolute right-[-40px] top-6 bottom-6 w-[180px] bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-[#E5E5E5] p-4 transition-transform duration-500 transform group-hover:-translate-x-12">
      <div className="flex items-center gap-2 mb-4 px-2 py-1.5 bg-[#F4F4F4] rounded-md text-[11px] font-semibold text-[#1A1A1A]">
        <Users size={12} className="text-[#A2B64F]" /> Shared insights
      </div>
    </div>
  </div>
);

const RoadmapVisual = () => (
  <div className="w-full h-[220px] bg-[#FAFAFA] flex items-center justify-center relative overflow-hidden">
    <div className="grid grid-cols-2 gap-3 z-10">
      <div className="w-14 h-14 transition-transform duration-300 transform hover:scale-110 group-hover:-translate-y-1"><LinearLogo /></div>
      <div className="w-14 h-14 transition-transform duration-300 transform hover:scale-110 group-hover:-translate-y-1 delay-75"><JiraLogo /></div>
      <div className="w-14 h-14 transition-transform duration-300 transform hover:scale-110 group-hover:-translate-y-1 delay-100"><NotionLogo /></div>
      <div className="w-14 h-14 transition-transform duration-300 transform hover:scale-110 group-hover:-translate-y-1 delay-150"><ZapierLogo /></div>
    </div>
  </div>
);

const OpportunityVisual = () => (
  <div className="w-full h-[220px] bg-[#FAFAFA] relative overflow-hidden pt-6 px-6">
    <div className="w-full bg-white rounded-full py-2 px-3 flex items-center justify-between shadow-sm border border-[#E5E5E5] z-20 relative transform group-hover:-translate-y-1 transition-transform duration-300">
      <div className="text-[10px] font-medium text-[#1A1A1A] flex items-center w-[85%] overflow-hidden whitespace-nowrap">
        <div className="animate-[typing_4s_steps(35,end)_infinite] overflow-hidden whitespace-nowrap border-r border-black pr-1">
          Common user requests this month?
        </div>
      </div>
      <button className="w-5 h-5 rounded-full bg-[#F4F5EE] text-[#A2B64F] flex items-center justify-center">
         <ArrowUp size={10} strokeWidth={2.5} />
      </button>
    </div>
  </div>
);

const EditVisual = () => (
  <div className="w-full h-[220px] bg-[#FAFAFA] relative overflow-hidden pt-6 px-6">
    <div className="w-full bg-white rounded-full py-2 px-3 flex items-center justify-between shadow-sm border border-[#E5E5E5] z-20 relative transform group-hover:-translate-y-1 transition-transform duration-300">
      <div className="text-[10px] font-medium text-[#1A1A1A] flex items-center w-[85%] overflow-hidden whitespace-nowrap">
        <div className="animate-[typing_4s_steps(35,end)_infinite_1s] overflow-hidden whitespace-nowrap border-r border-transparent pr-1">
          Turn this into a PRD draft
        </div>
      </div>
      <button className="w-5 h-5 rounded-full bg-[#F4F5EE] text-[#A2B64F] flex items-center justify-center">
         <ArrowUp size={10} strokeWidth={2.5} />
      </button>
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

export default function ProductHowItWorksSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const cardsData = [
    {
      visual: EnhanceVisual,
      title: "Automatically extracts insights",
      description: "After your user interview, Loop identifies friction points and feature requests in seconds."
    },
    {
      visual: BotsVisual,
      title: "Non-invasive research",
      description: "No awkward bots in your research sessions. Loop transcribes from your system audio."
    },
    {
      visual: CollaborateVisual,
      title: "Shared Product Intelligence",
      description: "Share research insights across engineering and design teams instantly."
    },
    {
      visual: RoadmapVisual,
      title: "From insight to roadmap",
      description: "Automatically send feature requests to Linear, Jira, or Notion as draft issues."
    },
    {
      visual: OpportunityVisual,
      title: "Identify patterns",
      description: "Search across all user calls to discover recurring pain points and opportunities."
    },
    {
      visual: EditVisual,
      title: "PRD Drafts instantly",
      description: "Ask Loop to draft a PRD, user story, or bug report based on your call notes."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans selection:bg-[#BAC66E] selection:text-black py-24 px-6 flex flex-col items-center">
      <div 
        className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h2 className="text-[40px] md:text-[48px] font-serif text-[#1A1A1A] leading-[1.1] tracking-tight mb-4">
          How it works
        </h2>
        <p className="text-[18px] md:text-[20px] text-[#737373] leading-[1.5]">
          Build the right things, faster.<br className="hidden md:block"/>
          That's where Loop's different.
        </p>
      </div>

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

      <style>
        {`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
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
