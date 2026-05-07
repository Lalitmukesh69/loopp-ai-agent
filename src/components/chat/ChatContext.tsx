import React from 'react';
import { ArrowUp } from 'lucide-react';

const TimelinePill = ({ text, placeholder }) => (
  <div className="relative w-full max-w-[260px] mx-auto bg-white rounded-full py-2.5 px-5 flex items-center justify-between shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-gray-100 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 cursor-text z-10 group">
    <span className="text-[14px] font-medium text-gray-900 tracking-tight">{placeholder}</span>
    <button className="w-7 h-7 rounded-full bg-[#F0F4E3] text-[#4B5921] flex items-center justify-center transition-colors group-hover:bg-[#e4ebce] group-hover:scale-110 duration-300">
       <ArrowUp size={16} strokeWidth={2.5} />
    </button>
  </div>
);

const ChatItThroughApp = () => {
  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans selection:bg-[#BAC66E] selection:text-black pt-32 pb-24 flex flex-col items-center justify-center">
      
      <section className="w-full max-w-5xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-[44px] font-serif text-[#1A1A1A] mb-5 tracking-tight">Chat it through</h2>
          <p className="text-[#808080] text-[18px] max-w-2xl mx-auto leading-relaxed">
            Helpful throughout your workday — get prepared before,<br className="hidden md:block"/>
            ask questions during a meeting and make a plan for after
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative w-full mt-10">
          
          {/* Continuous Faint Connecting Line */}
          {/* Using calc to keep the line slightly inset from the absolute edges */}
          <div className="absolute top-[88px] left-[10%] right-[10%] h-[1px] bg-gray-200 z-0 hidden md:block"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4">
            
            {/* Column 1: Before */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="mb-6 cursor-default transition-transform hover:scale-105 duration-300">
                <span className="inline-block bg-[#F3E9AC] text-[#332C00] text-[13px] font-semibold px-4 py-1.5 rounded-full shadow-sm">
                  Before a meeting
                </span>
              </div>
              
              <div className="w-full relative bg-white py-1">
                <TimelinePill placeholder="Help me prep" />
              </div>
              
              <p className="mt-8 text-[13px] text-[#808080] leading-relaxed max-w-[200px]">
                Chat with Loop to make sure you're up to speed before you join a call
              </p>
            </div>

            {/* Column 2: During */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="mb-6 cursor-default transition-transform hover:scale-105 duration-300">
                <span className="inline-block bg-[#E2DBF2] text-[#2D244D] text-[13px] font-semibold px-4 py-1.5 rounded-full shadow-sm">
                  During a meeting
                </span>
              </div>
              
              <div className="w-full relative bg-white py-1">
                <TimelinePill placeholder="Make me sound smart" />
              </div>
              
              <p className="mt-8 text-[13px] text-[#808080] leading-relaxed max-w-[200px]">
                Use Loop in realtime to start asking better questions in every meeting
              </p>
            </div>

            {/* Column 3: After */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="mb-6 cursor-default transition-transform hover:scale-105 duration-300">
                <span className="inline-block bg-[#FCDAEC] text-[#4A1D36] text-[13px] font-semibold px-4 py-1.5 rounded-full shadow-sm">
                  After a meeting
                </span>
              </div>
              
              <div className="w-full relative bg-white py-1">
                <TimelinePill placeholder="What shall I do next?" />
              </div>
              
              <p className="mt-8 text-[13px] text-[#808080] leading-relaxed max-w-[200px]">
                When your meeting's over, get help with whatever comes afterwards
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default ChatItThroughApp;