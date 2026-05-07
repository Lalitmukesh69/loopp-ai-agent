import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  ChevronLeft, Home, Minus, Square, X, 
  Link2, Users, ChevronDown, Paperclip, Mic, 
  LayoutGrid 
} from 'lucide-react';

// --- Custom Brand Swirl Logo ---
const LoopSwirlLogo = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={className}>
    <path d="M12 12c0-1.5-1-2-2-2s-2 .5-2 2 1 3 3 3 4-1 4-4-2-5-5-5-6 2-6 6 3 8 8 8 9-4 9-10" />
  </svg>
);

// --- Custom Slash Icon for inline recipes ---
const InlineSlashIcon = () => (
  <div className="w-[18px] h-[18px] rounded-[4px] border border-[#E5E5E5] flex items-center justify-center bg-white shadow-sm shrink-0 group-hover:border-[#D1D1D1] transition-colors">
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#A3A3A3] group-hover:text-[#666666] transition-colors">
      <line x1="18" y1="6" x2="6" y2="18"></line>
    </svg>
  </div>
);

// --- Reusable Inline Recipe Button ---
const InlineRecipe = ({ text }) => (
  <button className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-[#F5F5F5] transition-colors active:scale-95 group outline-none">
    <InlineSlashIcon />
    <span className="text-[13px] font-medium text-[#737373] group-hover:text-[#1A1A1A] transition-colors tracking-tight">
      {text}
    </span>
  </button>
);

// --- Custom Overlapping Documents Icon (Empty State) ---
const EmptyStateIcon = () => (
  <div className="relative w-[80px] h-[90px] mb-5 animate-[float_6s_ease-in-out_infinite] cursor-default group opacity-80">
    {/* Back Note */}
    <div className="absolute top-0 left-0 w-[54px] h-[72px] bg-white border-2 border-[#E5E5E5] rounded-[6px] -rotate-6 transition-transform duration-500 group-hover:-rotate-12 group-hover:-translate-x-2">
      <div className="absolute top-2.5 left-2 w-6 h-[2.5px] bg-[#F0F0F0] rounded-full"></div>
      <div className="absolute top-5 left-2 w-8 h-[2.5px] bg-[#F0F0F0] rounded-full"></div>
      <div className="absolute top-7.5 left-2 w-5 h-[2.5px] bg-[#F0F0F0] rounded-full"></div>
    </div>
    {/* Front Note */}
    <div className="absolute top-3 left-4 w-[58px] h-[76px] bg-white border-2 border-[#E5E5E5] shadow-[0_4px_12px_rgba(0,0,0,0.04)] rounded-[6px] rotate-3 transition-transform duration-500 group-hover:rotate-6 group-hover:translate-x-2 group-hover:-translate-y-1">
      <div className="absolute top-3 left-2.5 w-8 h-[3px] bg-[#F0F0F0] rounded-full"></div>
      <div className="absolute top-6.5 left-2.5 w-6 h-[3px] bg-[#F0F0F0] rounded-full"></div>
      <div className="absolute top-10 left-2.5 w-9 h-[3px] bg-[#F0F0F0] rounded-full"></div>
      {/* Brand Swirl on the note */}
      <div className="absolute bottom-1.5 right-1.5 text-[#D4D4D4]">
        <LoopSwirlLogo className="w-3.5 h-3.5" />
      </div>
    </div>
  </div>
);

export default function TeamWorkspaceDashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [userName, setUserName] = useState('User');
  const [avatarUrl, setAvatarUrl] = useState('');

  // Trigger entrance animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const user = session.user;
        const meta = user.user_metadata;
        setUserName(meta?.full_name || user.email?.split('@')[0] || 'User');
        setAvatarUrl(meta?.avatar_url || `https://api.dicebear.com/7.x/notionists/svg?seed=${meta?.full_name || 'User'}&backgroundColor=e5e7eb`);
      }
    });

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F8F4] font-sans selection:bg-[#BAC66E] selection:text-black relative flex flex-col items-center overflow-hidden pt-24 pb-12">
      
      {/* --- Top Absolute Navigation & Controls --- */}
      <div className="absolute top-0 w-full px-5 pt-5 flex items-center justify-between z-20">
        
        {/* Left: Back/Home & Avatar Label */}
        <div className="flex items-center gap-4">
          <button 
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E5E5E5] bg-transparent text-[#666666] hover:text-[#1A1A1A] hover:bg-white hover:shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:border-[#D1D1D1] transition-all duration-300 active:scale-95 outline-none transform ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
          >
            <ChevronLeft size={16} strokeWidth={2.5} className="mr-[-2px]" />
            <Home size={15} strokeWidth={2} />
          </button>

          <div 
            className={`flex items-center gap-2.5 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
            style={{ transitionDelay: '0.1s' }}
          >
            <img src={avatarUrl} alt={`${userName} HQ`} className="w-6 h-6 rounded-md object-cover border border-[#E5E5E5] shadow-sm" />
            <span className="text-[14px] font-semibold text-[#1A1A1A]">{userName} HQ</span>
          </div>
        </div>

        {/* Right: Actions & Window Controls */}
        <div 
          className={`flex items-center gap-6 transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
        >
          {/* Invite & Link Group */}
          <div className="flex items-center gap-2">
            <button className="bg-[#242424] hover:bg-[#000000] text-white px-4 py-1.5 rounded-full text-[13px] font-bold transition-all duration-300 shadow-sm hover:shadow-md active:scale-95">
              Invite
            </button>
            <button className="bg-[#242424] hover:bg-[#000000] text-white w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md active:scale-95">
              <Link2 size={14} strokeWidth={2.5} />
            </button>
          </div>

          {/* Window Controls */}
          <div className="flex items-center gap-5 text-[#808080] ml-2">
            <button className="hover:text-black transition-colors cursor-pointer active:scale-95"><Minus size={16} strokeWidth={1.5} /></button>
            <button className="hover:text-black transition-colors cursor-pointer active:scale-95"><Square size={13} strokeWidth={1.5} /></button>
            <button className="hover:text-black transition-colors cursor-pointer active:scale-95"><X size={18} strokeWidth={1.5} /></button>
          </div>
        </div>
      </div>

      {/* --- Main Content Wrapper --- */}
      <div className="w-full max-w-[680px] flex flex-col z-10 px-4 mt-4">
        
        {/* 1. Header Area */}
        <div 
          className={`flex flex-col items-center text-center mb-8 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0.1s' }}
        >
          <div className="w-[38px] h-[38px] rounded-[10px] border border-[#E5E5E5] bg-white flex items-center justify-center mb-4 shadow-sm p-0.5">
            <img src={avatarUrl} alt={`${userName} HQ`} className="w-full h-full rounded-[6px] object-cover" />
          </div>
          <h1 className="text-[32px] md:text-[38px] font-serif text-[#1A1A1A] tracking-tight mb-2">
            {userName} HQ
          </h1>
          <div className="flex items-center justify-center text-[13px] font-medium text-[#808080] gap-1.5">
            <Users size={14} strokeWidth={2} /> 
            <span>Your team workspace</span> 
          </div>
        </div>

        {/* 2. Informational Banner */}
        <div 
          className={`mb-8 overflow-hidden transition-all duration-500 ease-out transform ${isVisible && showBanner ? 'opacity-100 translate-y-0 max-h-[120px]' : 'opacity-0 -translate-y-4 max-h-0'}`}
          style={{ transitionDelay: '0.2s' }}
        >
          <div className="bg-[#F2F5E8] border border-[#E5EAD0] rounded-[12px] p-4.5 flex justify-between items-start shadow-sm relative pr-10">
            <div className="flex flex-col">
              <span className="text-[13.5px] font-bold text-[#1A1A1A] mb-1">Your team space</span>
              <span className="text-[13px] text-[#555555] leading-[1.5]">Share meeting notes with your team. Add user interviews, sales calls and team meetings so everyone stays in the loop.</span>
            </div>
            <button 
              className="absolute top-4 right-4 text-[#84963C] hover:text-[#1A1A1A] transition-colors p-1 rounded-md hover:bg-[#E4EAC0]/50 active:scale-95"
              onClick={() => setShowBanner(false)}
            >
              <X size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* 3. Integrated Chat Dock */}
        <div 
          className={`bg-white rounded-[24px] p-3 flex flex-col gap-3 transition-all duration-500 ease-out transform mb-4 border ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } ${
            isInputFocused 
              ? 'border-[#C2C2C2] shadow-[0_8px_30px_rgba(0,0,0,0.08)]' 
              : 'border-[#E5E5E5] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.05)] hover:border-[#D1D1D1]'
          }`}
          style={{ transitionDelay: '0.3s' }}
          onClick={() => setIsInputFocused(true)}
          onMouseLeave={() => setIsInputFocused(false)}
        >
          <div className="flex items-center gap-2 px-2.5 py-1.5 border border-[#E5E5E5] rounded-full w-max shadow-sm cursor-pointer hover:bg-[#FAFAFA] transition-colors group">
            <img src={avatarUrl} alt={`${userName} HQ`} className="w-[18px] h-[18px] rounded-[4px] object-cover border border-[#E5E5E5]" />
            <span className="text-[12.5px] font-medium text-[#404040] group-hover:text-[#1A1A1A] transition-colors">{userName} HQ</span>
          </div>

          {/* Input Row */}
          <div className="flex items-center justify-between px-2 pb-1">
            <div className="flex-1 flex items-center">
              <input 
                type="text" 
                placeholder="Transcribe a meeting to start asking questions" 
                className={`w-full bg-transparent outline-none text-[15px] placeholder-[#A3A3A3] transition-colors ${isInputFocused ? 'text-[#1A1A1A]' : 'text-[#404040]'}`}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              />
            </div>
            
            {/* Right Controls */}
            <div className="flex items-center gap-2.5 shrink-0 pl-2">
              <div className="flex items-center gap-1 text-[12.5px] font-medium text-[#A3A3A3] hover:text-[#666666] cursor-pointer transition-colors px-2 py-1 rounded-md hover:bg-[#F5F5F5]">
                Sonnet 4.6 <ChevronDown size={14} strokeWidth={2.5} />
              </div>
              <button className="text-[#A3A3A3] hover:text-[#666666] transition-colors p-1.5 rounded-full hover:bg-[#F5F5F5]">
                <Paperclip size={16} strokeWidth={2} />
              </button>
              <button className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#A3A3A3] hover:text-[#666666] hover:bg-[#EBEBEB] transition-colors active:scale-95 ml-0.5">
                <Mic size={15} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        {/* 4. Inline Recipes & All Recipes Button */}
        <div 
          className={`flex items-center justify-between mb-8 px-1 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '0.4s' }}
        >
          <div className="flex items-center gap-1 flex-wrap">
            <InlineRecipe text="Catch me up" />
            <InlineRecipe text="List key decisions" />
            <InlineRecipe text="Show in flight projects" />
          </div>
          
          <button className="flex items-center gap-1.5 text-[13px] font-medium text-[#808080] hover:text-[#1A1A1A] transition-colors group shrink-0 ml-4">
            <LayoutGrid size={14} strokeWidth={2} className="group-hover:text-[#1A1A1A] transition-colors" /> 
            All recipes
          </button>
        </div>

        {/* Subtle Divider */}
        <div 
          className={`w-full h-[1px] bg-[#E5E5E5] mb-12 transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '0.5s' }}
        ></div>

        {/* 5. Empty State Area */}
        <div 
          className={`flex-1 flex flex-col items-center justify-center transition-all duration-1000 ease-out transform pb-10 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}
          style={{ transitionDelay: '0.6s' }}
        >
          <EmptyStateIcon />
          
          <h2 className="text-[15px] font-semibold text-[#404040]">
            No notes here yet
          </h2>
        </div>

      </div>

      {/* Global Animation Styles */}
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
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
        `}
      </style>
    </div>
  );
}