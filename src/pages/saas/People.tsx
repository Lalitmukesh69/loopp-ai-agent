import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  ChevronLeft, SquarePen, Minus, Square, X, 
  Search, ArrowDown, Users 
} from 'lucide-react';

// --- Window Controls ---
const WindowControls = () => (
  <div className="flex items-center gap-5 text-[#808080]">
    <button className="hover:text-black transition-colors cursor-pointer active:scale-95"><Minus size={16} strokeWidth={1.5} /></button>
    <button className="hover:text-black transition-colors cursor-pointer active:scale-95"><Square size={13} strokeWidth={1.5} /></button>
    <button className="hover:text-black transition-colors cursor-pointer active:scale-95"><X size={18} strokeWidth={1.5} /></button>
  </div>
);

// --- Table Row Component ---
const PersonRow = ({ name, email, lastNote, notesCount, initial, initialBg, initialColor }) => (
  <div className="flex items-center py-3 border-b border-[#E5E5E5] hover:bg-[#F2F1EC] transition-colors cursor-pointer group px-2 -mx-2 rounded-lg">
    
    {/* Person Column */}
    <div className="flex-1 flex items-center gap-4">
      {/* Avatar */}
      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-serif text-[17px] shadow-sm transform transition-transform group-hover:scale-105 ${initialBg} ${initialColor}`}>
        {initial}
      </div>
      {/* Name & Email */}
      <div className="flex flex-col leading-tight">
        <span className="text-[14px] font-semibold text-[#1A1A1A] group-hover:text-black transition-colors">{name}</span>
        <span className="text-[13px] text-[#808080]">{email}</span>
      </div>
    </div>

    {/* Last Note Column */}
    <div className="w-[120px] md:w-[150px] shrink-0 text-[13.5px] text-[#404040] font-medium">
      {lastNote}
    </div>

    {/* Notes Count Column */}
    <div className="w-[60px] shrink-0 text-right text-[13.5px] text-[#404040] font-medium pr-2 md:pr-4">
      {notesCount}
    </div>
    
  </div>
);

export default function PeopleDashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Everyone');
  const [userName, setUserName] = useState('User');
  const [userEmail, setUserEmail] = useState('');

  // Trigger entrance animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const user = session.user;
        setUserEmail(user.email || '');
        setUserName(user.user_metadata?.full_name || user.email?.split('@')[0] || 'User');
      }
    });

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F8F4] font-sans selection:bg-[#BAC66E] selection:text-black flex flex-col relative overflow-hidden pt-5 px-4 md:px-8">
      
      {/* --- Top Navigation & Window Controls --- */}
      <div className="w-full flex items-start justify-between z-20 mb-8">
        {/* Left: Back & Edit Button */}
        <button 
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E5E5E5] bg-transparent text-[#666666] hover:text-[#1A1A1A] hover:bg-white hover:shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:border-[#D1D1D1] transition-all duration-300 active:scale-95 outline-none transform ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
        >
          <ChevronLeft size={16} strokeWidth={2.5} className="mr-[-4px]" />
          <SquarePen size={14} strokeWidth={2} />
        </button>

        {/* Right: Window Controls */}
        <div 
          className={`pt-1.5 transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
        >
          <WindowControls />
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="w-full max-w-[1200px] mx-auto flex flex-col flex-1">
        
        {/* Header: Title & Filters */}
        <div 
          className={`flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0.1s' }}
        >
          <h1 className="text-[20px] md:text-[24px] font-bold text-[#1A1A1A] tracking-tight">
            People
          </h1>
          
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button className="w-[34px] h-[34px] rounded-full border border-[#E5E5E5] bg-transparent text-[#808080] flex items-center justify-center hover:text-[#1A1A1A] hover:bg-white hover:shadow-sm hover:border-[#D1D1D1] transition-all duration-300 active:scale-95">
              <Search size={15} strokeWidth={2.5} />
            </button>
            
            {/* Tabs */}
            <div className="flex items-center gap-1 bg-transparent">
              <button 
                onClick={() => setActiveTab('Everyone')}
                className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 active:scale-95 ${activeTab === 'Everyone' ? 'bg-[#EAE8DF] text-[#1A1A1A] shadow-sm' : 'text-[#808080] hover:text-[#1A1A1A] hover:bg-[#EAE8DF]/50'}`}
              >
                Everyone
              </button>
              <button 
                onClick={() => setActiveTab('People I met')}
                className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 active:scale-95 ${activeTab === 'People I met' ? 'bg-[#EAE8DF] text-[#1A1A1A] shadow-sm' : 'text-[#808080] hover:text-[#1A1A1A] hover:bg-[#EAE8DF]/50'}`}
              >
                People I met
              </button>
            </div>
          </div>
        </div>

        {/* --- Data Table --- */}
        <div className="flex flex-col flex-1 relative">
          
          {/* Table Header */}
          <div 
            className={`flex items-center pb-2 border-b border-[#E5E5E5] text-[13px] font-semibold text-[#808080] transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '0.2s' }}
          >
            <div className="flex-1 pl-2">Person</div>
            <div className="w-[120px] md:w-[150px] flex items-center gap-1 shrink-0 cursor-pointer hover:text-[#404040] transition-colors">
              Last note <ArrowDown size={12} strokeWidth={3} className="mt-[1px]" />
            </div>
            <div className="w-[60px] text-right shrink-0 pr-2 md:pr-4">Notes</div>
          </div>

          {/* Table Body / Rows */}
          <div 
            className={`flex flex-col transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '0.3s' }}
          >
            <PersonRow 
              initial={userName ? userName[0].toUpperCase() : 'U'}
              initialBg="bg-[#EAE4F2]"
              initialColor="text-[#644B8C]"
              name={`${userName} (me)`}
              email={userEmail}
              lastNote="Today"
              notesCount="1"
            />
          </div>

          {/* Empty State Overlay Area */}
          <div 
            className={`absolute top-[40%] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}
            style={{ transitionDelay: '0.5s' }}
          >
            <div className="w-16 h-16 flex items-center justify-center mb-3 animate-[float_6s_ease-in-out_infinite]">
              <Users size={32} className="text-[#C2C2C2]" strokeWidth={1.5} />
            </div>
            <p className="text-[13.5px] font-medium text-[#A3A3A3] text-center tracking-tight">
              People you meet in Loop will appear here
            </p>
          </div>

        </div>

      </div>

      {/* Global Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
        `}
      </style>
    </div>
  );
}