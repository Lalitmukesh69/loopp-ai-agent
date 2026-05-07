import React from 'react';
import {
  PLATFORM_TESTIMONIAL_AVATAR,
  PLATFORM_SLACK_LOGO,
  PLATFORM_MEET_LOGO,
  PLATFORM_TEAMS_LOGO,
  PLATFORM_WEBEX_LOGO,
} from '@/data/marketingImages';

export default function PlatformSection() {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-[1040px] mx-auto px-6 grid md:grid-cols-[1fr_500px] gap-12 items-center">
        
        {/* Left Side: Text and Testimonial */}
        <div className="space-y-8 pb-12 md:pb-0">
          <h2 className="loop-serif text-[42px] leading-[1.05] text-[#1a1c1b] font-medium tracking-tight">
            Works on all platforms,<br />no meeting bots
          </h2>
          <p className="text-[19px] text-[#6d6d6d] leading-[1.4] max-w-[380px] font-body">
            Loop transcribes your computer's audio directly, with no meeting bots joining your call
          </p>
          
          <div className="pt-4 flex">
            <div className="w-[3px] bg-[#efb02e] rounded-full mr-5 shrink-0 mt-2 mb-2"></div>
            <div className="space-y-6">
              <p className="text-[20px] font-medium leading-[1.5] text-[#1a1c1b] max-w-[340px] loop-serif tracking-tight">
                "Loop has become indispensable — feels like I'm living in the future."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                  <img 
                    src={PLATFORM_TESTIMONIAL_AVATAR} 
                    alt="John Borthwick" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-[#1a1c1b]">John Borthwick</div>
                  <div className="text-[13px] text-[#81807d]">Investor, Betaworks</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Floating Cards */}
        <div className="relative w-full aspect-square max-w-[500px] bg-[#f8f8f6] rounded-[16px] border border-[#ebeaeb] mx-auto md:ml-auto md:mr-0 flex-shrink-0">
          
          {/* Slack Card */}
          <div className="absolute top-[18%] left-[66%] w-[24%] h-[24%] bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-[#ebeaeb] flex items-center justify-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] cursor-pointer group">
            <img alt="Slack" className="h-[45%] w-[45%] object-contain transition-transform duration-300 group-hover:scale-110" src={PLATFORM_SLACK_LOGO}/>
          </div>

          {/* Meet Card */}
          <div className="absolute top-[30%] left-[38%] w-[24%] h-[24%] bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-[#ebeaeb] flex items-center justify-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] cursor-pointer group z-10">
            <img alt="Meet" className="h-[45%] w-[45%] object-contain transition-transform duration-300 group-hover:scale-110" src={PLATFORM_MEET_LOGO}/>
          </div>

          {/* Zoom Card */}
          <div className="absolute top-[42%] left-[10%] w-[24%] h-[24%] bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-[#ebeaeb] flex items-center justify-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] cursor-pointer group z-10">
            <div className="w-[50%] h-[50%] bg-[#2D8CFF] rounded-[30%] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 10.5V7C17 6.44772 16.5523 6 16 6H4C3.44772 6 3 6.44772 3 7V17C3 17.5523 3.44772 18 4 18H16C16.5523 18 17 17.5523 17 17V13.5L21 17.5V6.5L17 10.5Z" fill="white"/>
              </svg>
            </div>
          </div>

          {/* Teams Card */}
          <div className="absolute top-[46%] left-[66%] w-[24%] h-[24%] bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-[#ebeaeb] flex items-center justify-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] cursor-pointer group">
            <img alt="Teams" className="h-[45%] w-[45%] object-contain transition-transform duration-300 group-hover:scale-110" src={PLATFORM_TEAMS_LOGO}/>
          </div>

          {/* Webex Card */}
          <div className="absolute top-[58%] left-[38%] w-[24%] h-[24%] bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-[#ebeaeb] flex items-center justify-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] cursor-pointer group">
            <img alt="Webex" className="h-[45%] w-[45%] object-contain transition-transform duration-300 group-hover:scale-110" src={PLATFORM_WEBEX_LOGO} onError={(e) => { (e.currentTarget.parentElement as HTMLElement).innerHTML = '<div class="w-[50%] h-[50%] bg-[#005073] rounded-full flex items-center justify-center text-white transition-transform duration-300"><span class="material-symbols-outlined text-[1.2rem]">network_node</span></div>' }}/>
          </div>

        </div>
      </div>
    </section>
  );
}
