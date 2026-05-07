import React, { useEffect, useState } from 'react';
import { 
  ArrowUp, Folder, Home, Users, Search, 
  CircleDollarSign, PenTool, TrendingUp, Code 
} from 'lucide-react';
import { SALES_HERO_CALLER_1, SALES_HERO_CALLER_2, pravatarUrl } from '@/data/marketingImages';

// --- Custom SVGs ---
const WindowsIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.801"/>
  </svg>
);

const MacDots = () => (
  <div className="flex gap-1.5 mb-5 px-1">
    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
  </div>
);

// --- Logos for Marquee ---
const LinearLogo = () => (
  <div className="flex items-center gap-2 font-sans font-bold text-[20px] tracking-tight">
    <div className="w-5 h-5 rounded-full border-[2.5px] border-current flex items-center justify-center relative opacity-80">
      <div className="w-[2.5px] h-3 bg-current rotate-45 rounded-full"></div>
    </div>
    Linear
  </div>
);

const IndexVenturesLogo = () => (
  <div className="flex items-center gap-2 font-serif text-[16px] tracking-tight">
    <div className="flex flex-col gap-[3px] opacity-70 mt-0.5">
       <div className="w-4 h-[2px] bg-current"></div>
       <div className="w-6 h-[2px] bg-current -ml-2"></div>
       <div className="w-5 h-[2px] bg-current"></div>
    </div>
    Index Ventures
  </div>
);

const BrexLogo = () => (
  <div className="flex items-center gap-1.5 font-sans font-bold text-[22px] tracking-tight">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" opacity="0.8">
      <path d="M4 12V6h10l4 6-4 6H4v-6zm2-4v8h7.5l2.5-4-2.5-4H6z"/>
    </svg>
    Brex
  </div>
);

const ReplitLogo = () => (
  <div className="flex items-center gap-1.5 font-sans font-bold text-[22px] tracking-tight">
    <div className="grid grid-cols-2 gap-[2px] w-5 h-5 opacity-80">
      <div className="bg-current rounded-sm w-2 h-2"></div>
      <div className="bg-current rounded-sm w-2 h-2 opacity-0"></div>
      <div className="bg-current rounded-sm w-2 h-2"></div>
      <div className="bg-current rounded-sm w-2 h-2"></div>
    </div>
    replit
  </div>
);

const VercelLogo = () => (
  <div className="flex items-center gap-1.5 font-sans font-bold text-[22px] tracking-tighter">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1L24 22H0L12 1Z" />
    </svg>
    Vercel
  </div>
);

const PostHogLogo = () => (
  <div className="flex items-center gap-1.5 font-sans font-extrabold text-[20px] tracking-tight">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" opacity="0.8">
      <path d="M2 18h20v-2l-2-2v-2l-2-2v-2L12 4 2 14v4zm10-12l6 6v4H6v-4l6-6z"/>
    </svg>
    PostHog
  </div>
);

const LogoCard = ({ children }) => (
  <div className="w-[170px] h-[72px] flex items-center justify-center bg-white border border-[#EBEBEB] rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.015)] transition-all duration-300 ease-out hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 cursor-pointer group shrink-0 mx-2">
    <div className="text-[#1A1A1A] opacity-40 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-[1.03]">
      {children}
    </div>
  </div>
);

const LogoBlock = () => (
  <div className="flex items-center shrink-0 py-6">
    <LogoCard><LinearLogo /></LogoCard>
    <LogoCard><IndexVenturesLogo /></LogoCard>
    <LogoCard><BrexLogo /></LogoCard>
    <LogoCard><ReplitLogo /></LogoCard>
    <LogoCard><VercelLogo /></LogoCard>
    <LogoCard><PostHogLogo /></LogoCard>
  </div>
);

// --- Mockup Components ---

const VideoCallMockup = () => (
  <div className="absolute left-[2%] md:left-[5%] top-[10%] w-[260px] h-[100px] bg-black rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.15)] overflow-hidden flex z-10 animate-[slideUp_1s_ease-out_0.6s_both] group cursor-pointer hover:z-50 transition-transform hover:scale-105 duration-300">
    <img src={SALES_HERO_CALLER_1} alt="Caller 1" className="w-1/2 h-full object-cover" />
    <img src={SALES_HERO_CALLER_2} alt="Caller 2" className="w-1/2 h-full object-cover border-l border-gray-800" />
  </div>
);

const NotesMockup = () => {
  const [showTranscription, setShowTranscription] = useState(false);

  return (
    <div className="absolute left-[0%] md:left-[2%] top-[30%] w-[320px] h-[360px] bg-white rounded-[16px] border border-[#E5E5E5] shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-6 z-20 flex flex-col animate-[slideUp_1s_ease-out_0.8s_both] group hover:z-50 hover:-translate-y-2 transition-all duration-300">
      <MacDots />
      
      <h3 className="text-[22px] font-serif text-[#1A1A1A] mb-5 tracking-tight">
        Luna Logic user call
      </h3>
      
      <div className="space-y-4 text-[14px] text-[#404040] leading-relaxed flex-1 relative">
        <p>100, growingg<br/>use tuesday.ai, v manual,<br/>180</p>
        <p>"a priority for q2"</p>
      </div>

      {/* Transcription Popover */}
      <div className={`absolute bottom-[80px] left-1/2 -translate-x-1/2 w-[300px] bg-white rounded-xl shadow-[0_15px_50px_rgba(0,0,0,0.15)] border border-gray-200 z-50 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom ${showTranscription ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}`}>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-gray-200 transform rotate-45"></div>
        
        <div className="flex items-center gap-2 p-3 border-b border-gray-100 bg-white rounded-t-xl relative z-10">
          <div className="w-2.5 h-2.5 rounded-full bg-[#C4D92E]"></div>
          <span className="text-[13px] font-semibold text-gray-500">Transcription</span>
        </div>
        
        <div className="p-4 space-y-3 text-[14px] max-h-[220px] overflow-y-auto relative z-10 bg-white rounded-b-xl scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          <div className="flex justify-end">
            <div className="bg-[#E4E8D1] text-[#333] px-3.5 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%] leading-[1.4]">We're targeting mid-April.</div>
          </div>
          <div className="flex justify-end">
            <div className="bg-[#E4E8D1] text-[#333] px-3.5 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%] leading-[1.4]">But there are a few dependencies first.</div>
          </div>
          <div className="flex justify-start">
            <div className="bg-[#F5F5F5] text-[#333] px-3.5 py-2.5 rounded-2xl rounded-tl-sm max-w-[85%] leading-[1.4]">What kind of dependencies?</div>
          </div>
          <div className="flex justify-end">
            <div className="bg-[#E4E8D1] text-[#333] px-3.5 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%] leading-[1.4]">Mainly the payment provider API integration.</div>
          </div>
        </div>
      </div>

      {/* Recording Pill */}
      <div 
        className="self-center mt-auto bg-white border border-[#E5E5E5] rounded-full py-2 px-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-center gap-3 transform hover:scale-105 transition-all duration-300 cursor-pointer hover:border-gray-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)] relative z-40"
        onClick={() => setShowTranscription(!showTranscription)}
      >
        <div className="flex items-end gap-[3px] h-4">
          <div className="w-[2.5px] bg-[#A2B64F] rounded-full h-[60%] animate-[pulseHeight_1s_ease-in-out_infinite]"></div>
          <div className="w-[2.5px] bg-[#A2B64F] rounded-full h-[100%] animate-[pulseHeight_1s_ease-in-out_infinite_0.2s]"></div>
          <div className="w-[2.5px] bg-[#A2B64F] rounded-full h-[40%] animate-[pulseHeight_1s_ease-in-out_infinite_0.4s]"></div>
          <div className="w-[2.5px] bg-[#A2B64F] rounded-full h-[80%] animate-[pulseHeight_1s_ease-in-out_infinite_0.6s]"></div>
        </div>
        <div className="w-1.5 h-4 border-l border-gray-200"></div>
        <div className="w-3 h-3 bg-gray-600 rounded-[2px] hover:bg-red-500 transition-colors"></div>
      </div>
    </div>
  );
};

const MainAppMockup = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "What are our top reasons for churn?";

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setTypedText(fullText.substring(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(typing);
    }, 60);
    return () => clearInterval(typing);
  }, []);

  return (
    <div className="absolute right-[0%] md:right-[5%] top-[5%] w-[580px] h-[450px] bg-white rounded-[16px] border border-[#E5E5E5] shadow-[0_25px_50px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden z-30 animate-[slideUp_1s_ease-out_1s_both] group hover:-translate-y-2 transition-transform duration-500">
      
      <div className="p-4 pb-0 bg-white z-10">
        <MacDots />
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Sidebar */}
        <div className="w-[180px] border-r border-[#E5E5E5] bg-[#FAFAFA] flex flex-col py-2 px-3">
          <div className="space-y-1 mb-6">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold text-[#1A1A1A] hover:bg-gray-100 cursor-pointer transition-colors">
              <Home size={16} className="text-gray-500" /> My notes
            </div>
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold text-[#1A1A1A] hover:bg-gray-100 cursor-pointer transition-colors">
              <Users size={16} className="text-gray-500" /> Shared with me
            </div>
          </div>

          <div className="px-3 mb-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Teams</div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-medium text-[#404040] hover:bg-gray-100 cursor-pointer transition-colors">
              <Users size={14} className="text-blue-500" /> Product
            </div>
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-medium text-[#1A1A1A] bg-white shadow-sm border border-gray-200 cursor-pointer transition-colors">
              <CircleDollarSign size={14} className="text-yellow-500" /> Sales
            </div>
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-medium text-[#404040] hover:bg-gray-100 cursor-pointer transition-colors">
              <PenTool size={14} className="text-blue-400" /> Design
            </div>
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-medium text-[#404040] hover:bg-gray-100 cursor-pointer transition-colors">
              <TrendingUp size={14} className="text-green-500" /> Marketing
            </div>
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-medium text-[#404040] hover:bg-gray-100 cursor-pointer transition-colors">
              <Code size={14} className="text-pink-500" /> Engineering
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white p-6 relative flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#F0F4F8] flex items-center justify-center text-[#859ECB]">
              <Folder size={20} fill="currentColor" className="opacity-90" />
            </div>
            <div>
              <h3 className="font-serif text-[20px] text-[#1A1A1A] leading-tight">Sales calls</h3>
              <p className="text-[12px] text-[#999999]">Sales conversations with prospective customers</p>
            </div>
          </div>

          <div className="space-y-4 overflow-hidden">
            {[
              { img: "32", company: "AllFound <> Pineapple", names: "Caroline, Jon" },
              { img: "11", company: "AllFound <> Luna Logic", names: "Shreman, Ben, Vicky" },
              { img: "68", company: "AllFound <> Elemental", names: "Shreman, Vincent" },
              { img: "47", company: "AllFound <> TrustedSources", names: "Caroline, Arthur" },
              { img: "12", company: "AllFound <> Freshworks", names: "Jon, Shreman" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 hover:bg-[#FAFAFA] p-1.5 -ml-1.5 rounded-lg transition-colors cursor-pointer group/item">
                <img src={pravatarUrl(item.img)} alt="Avatar" className="w-9 h-9 rounded-full border border-gray-100 object-cover shadow-sm group-hover/item:scale-105 transition-transform" />
                <div className="truncate">
                  <p className="text-[13px] font-bold text-[#1A1A1A] leading-tight truncate">{item.company}</p>
                  <p className="text-[12px] text-[#737373] truncate">{item.names}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Fading Mask */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10"></div>
          
          {/* Search Input Bar inside Mockup */}
          <div className="absolute bottom-6 left-6 right-6 bg-white rounded-full py-2.5 px-4 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#E5E5E5] z-20 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)] cursor-text">
            <span className="text-[13px] font-medium text-[#1A1A1A] tracking-tight flex items-center min-h-[20px]">
              {typedText}
              <span className="inline-block w-[1.5px] h-3.5 bg-black ml-0.5 animate-[blink_1s_step-end_infinite]"></span>
            </span>
            <button className="w-6 h-6 rounded-full bg-[#F4F5EE] text-[#A2B64F] flex items-center justify-center hover:bg-[#e6eac8] transition-colors cursor-pointer shrink-0">
               <ArrowUp size={14} strokeWidth={2.5} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Main Layout ---
export default function SalesHeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans selection:bg-[#BAC66E] selection:text-black overflow-hidden flex flex-col">
      
      {/* --- Text Content Area --- */}
      <div className={`pt-32 pb-16 px-6 text-center max-w-4xl mx-auto flex flex-col items-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-[44px] md:text-[64px] font-serif text-[#1A1A1A] leading-[1.1] font-medium tracking-tight mb-5">
          The AI notepad for Sales teams
        </h1>
        <p className="text-[18px] md:text-[20px] text-[#737373] max-w-2xl leading-[1.6] mb-10">
          Capture and use every customer conversation. Loop is an AI notepad<br className="hidden md:block"/>
          for Sales teams – from call notes to CRM updates, all in one place.
        </p>
        
        <button className="group relative bg-[#546522] hover:bg-[#43521b] text-white px-8 py-4 rounded-full text-[15px] font-bold transition-all duration-300 flex items-center gap-2.5 shadow-[0_4px_15px_rgba(84,101,34,0.25)] hover:shadow-[0_8px_25px_rgba(84,101,34,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]">
          <WindowsIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span>Try it for free</span>
        </button>
      </div>

      {/* --- Visual Mockups Area --- */}
      <div className="relative w-full max-w-[1000px] mx-auto h-[550px] mt-4 mb-10 perspective-[1000px]">
        <VideoCallMockup />
        <NotesMockup />
        <MainAppMockup />
      </div>

      {/* --- Logo Marquee (Brand Carousel) --- */}
      <div className={`w-full py-10 transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative w-full max-w-[1400px] mx-auto group/marquee">
          <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

          <div className="flex w-max animate-[scrollLogos_35s_linear_infinite] group-hover/marquee:[animation-play-state:paused]">
            <LogoBlock />
            <LogoBlock />
            <LogoBlock />
            <LogoBlock />
          </div>
        </div>
      </div>

      {/* --- Global Animations --- */}
      <style>
        {`
          @keyframes slideUp {
            from { 
              opacity: 0; 
              transform: translateY(60px) scale(0.95); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0) scale(1); 
            }
          }
          @keyframes scrollLogos {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); } 
          }
          @keyframes pulseHeight {
            0%, 100% { height: 40%; }
            50% { height: 100%; }
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