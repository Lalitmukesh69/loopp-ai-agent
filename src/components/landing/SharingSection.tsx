import React from 'react';

export default function SharingSection() {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-[1080px] mx-auto px-6 grid md:grid-cols-[1.1fr_1fr] gap-16 items-center">
        
        {/* Left Side: Animated Interactive Visual */}
        <div className="order-2 md:order-1 relative w-full h-[620px] max-w-[560px] rounded-[24px] border border-[#e5e5e5] mx-auto md:ml-0 md:mr-auto overflow-hidden flex shadow-sm bg-[#fcfcfb]">
          
          {/* Left part: white note card */}
          <div className="w-[58%] h-full bg-white border-r border-[#e5e5e5] flex flex-col z-10">
            {/* Top Bar */}
            <div className="h-[76px] flex items-center justify-end px-6 shrink-0 relative">
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#e5e5e5] to-[#e5e5e5]"></div>
              <div className="flex bg-[#fdfdfc] border border-[#e5e5e5] rounded-full overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <button className="px-5 py-2 text-[14px] font-medium text-[#1a1c1b] hover:bg-gray-50 border-r border-[#e5e5e5] transition-colors">
                  Share
                </button>
                <button className="px-3.5 py-2 flex items-center justify-center text-[#555] hover:text-[#1a1c1b] hover:bg-gray-50 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">link</span>
                </button>
              </div>
            </div>
            {/* Note Content */}
            <div className="px-8 pt-8 pb-4 space-y-7 overflow-hidden flex-1 relative">
              <div className="absolute bottom-0 left-0 w-full h-[180px] bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none z-10"></div>
              <div>
                <h4 className="loop-serif-bold text-[19px] text-[#1a1c1b] mb-3">Overview</h4>
                <div className="space-y-1.5 text-[13.5px] text-[#6d6d6d] font-body leading-[1.6]">
                  <p>100 employees, adding 20 more next quarter</p>
                  <p>Office in San Francisco and Austin</p>
                </div>
              </div>
              <div>
                <h4 className="loop-serif-bold text-[19px] text-[#1a1c1b] mb-3">Current Provider (Tuesday.ai)</h4>
                <div className="space-y-1.5 text-[13.5px] text-[#6d6d6d] font-body leading-[1.6]">
                  <p>Data input is too manual</p>
                  <p>Too complex for non-technical team members</p>
                  <p>$180 per employee per year ("too expensive")</p>
                </div>
              </div>
              <div>
                <h4 className="loop-serif-bold text-[19px] text-[#1a1c1b] mb-3">Their Requirements</h4>
                <div className="space-y-1.5 text-[13.5px] text-[#6d6d6d] font-body leading-[1.6]">
                  <p>Finding a better employee engagement tool.</p>
                  <p>Need secure information sharing capabilities</p>
                </div>
              </div>
              <div>
                <h4 className="loop-serif-bold text-[19px] text-[#1a1c1b] mb-3">Budget & Timeline</h4>
                <div className="space-y-1.5 text-[13.5px] text-[#6d6d6d] font-body leading-[1.6]">
                  <p>Budget: $50-75 per employee per year</p>
                  <p>Looking to implement within Q2 2024</p>
                  <p>Prefer tools with good mobile support</p>
                </div>
              </div>
              <div>
                <h4 className="loop-serif-bold text-[19px] text-[#1a1c1b] mb-3">Decision Criteria</h4>
                <div className="space-y-1.5 text-[13.5px] text-[#6d6d6d] font-body leading-[1.6]">
                  <p>Ease of use for non-technical staff</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right part: infinite scrolling list */}
          <div className="flex-1 h-full relative overflow-hidden flex flex-col items-center">
            <style>{`
              @keyframes scrollVerticalPills {
                0% { transform: translateY(0); }
                100% { transform: translateY(-50%); }
              }
              .animate-scroll-pills {
                animation: scrollVerticalPills 25s linear infinite;
              }
              .animate-scroll-pills:hover {
                animation-play-state: paused;
              }
              .pill-shadow {
                box-shadow: 0 2px 8px rgba(0,0,0,0.03);
              }
            `}</style>
            
            {/* Gradient Masks */}
            <div className="absolute top-0 right-0 w-full h-12 bg-gradient-to-b from-[#fcfcfb] to-transparent z-20 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-full h-12 bg-gradient-to-t from-[#fcfcfb] to-transparent z-20 pointer-events-none"></div>

            {/* Scrolling Container */}
            <div className="flex flex-col gap-3.5 animate-scroll-pills min-h-[200%] w-full items-center py-4">
              
              {/* Items Group */}
              <div className="flex flex-col gap-3.5 items-center w-full px-5">
                {[1, 2].map((groupIndex) => (
                  <React.Fragment key={groupIndex}>
                    <div className="bg-white border border-[#e5e5e5] rounded-[10px] px-4 py-3.5 flex items-center gap-3 w-full max-w-[240px] pill-shadow transition-transform hover:-translate-y-0.5 cursor-pointer">
                      <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#111"/><path d="M16 16.5l-5.5-6v6H8.5v-9h2.5l5.5 6v-6H18.5v9h-2.5z" fill="#fff"/></svg>
                      </div>
                      <span className="text-[14px] font-semibold text-[#1a1c1b] truncate">Project updates</span>
                    </div>

                    <div className="bg-white border border-[#e5e5e5] rounded-[10px] px-4 py-3.5 flex items-center gap-3 w-full max-w-[240px] pill-shadow transition-transform hover:-translate-y-0.5 cursor-pointer">
                      <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px] text-[#A3D031]" style={{fontVariationSettings: "'FILL' 0, 'wght' 300"}}>folder_open</span>
                      </div>
                      <span className="text-[14px] font-semibold text-[#1a1c1b] truncate">ATS / Candidate notes</span>
                    </div>

                    <div className="bg-white border border-[#e5e5e5] rounded-[10px] px-4 py-3.5 flex items-center gap-3 w-full max-w-[240px] pill-shadow transition-transform hover:-translate-y-0.5 cursor-pointer">
                      <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#111"/><path d="M16 16.5l-5.5-6v6H8.5v-9h2.5l5.5 6v-6H18.5v9h-2.5z" fill="#fff"/></svg>
                      </div>
                      <span className="text-[14px] font-semibold text-[#1a1c1b] truncate">1 on 1 notes</span>
                    </div>

                    <div className="bg-white border border-[#e5e5e5] rounded-[10px] px-4 py-3.5 flex items-center gap-3 w-full max-w-[240px] pill-shadow transition-transform hover:-translate-y-0.5 cursor-pointer">
                      <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px] text-[#1a1c1b]">tag</span>
                      </div>
                      <span className="text-[14px] font-semibold text-[#1a1c1b] truncate">#meeting-notes</span>
                    </div>

                    <div className="bg-white border border-[#e5e5e5] rounded-[10px] px-4 py-3.5 flex items-center gap-3 w-full max-w-[240px] pill-shadow transition-transform hover:-translate-y-0.5 cursor-pointer">
                      <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[19px] text-[#555]" style={{transform: 'rotate(-45deg)'}}>link</span>
                      </div>
                      <span className="text-[14px] font-semibold text-[#1a1c1b] truncate">Public link</span>
                    </div>

                    <div className="bg-white border border-[#e5e5e5] rounded-[10px] px-4 py-3.5 flex items-center gap-3 w-full max-w-[240px] pill-shadow transition-transform hover:-translate-y-0.5 cursor-pointer">
                      <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px] text-[#1a1c1b]">tag</span>
                      </div>
                      <span className="text-[14px] font-semibold text-[#1a1c1b] truncate">#user-feedback</span>
                    </div>
                    
                    <div className="bg-white border border-[#e5e5e5] rounded-[10px] px-4 py-3.5 flex items-center gap-3 w-full max-w-[240px] pill-shadow transition-transform hover:-translate-y-0.5 cursor-pointer">
                      <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.634 5.455 11.73v9.272H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/><path d="M16.909 21.002v-9.272L12 16.634l-8.182-6.136L0 7.82l12 9.006 12-9.006-3.818 2.678v10.504z" fill="#C5221F"/></svg>
                      </div>
                      <span className="text-[14px] font-semibold text-[#1a1c1b] truncate">Email / All participants</span>
                    </div>

                    <div className="bg-white border border-[#e5e5e5] rounded-[10px] px-4 py-3.5 flex items-center gap-3 w-full max-w-[240px] pill-shadow transition-transform hover:-translate-y-0.5 cursor-pointer">
                      <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="7" cy="7" r="4.5" fill="#4B90ED" fillOpacity="0.85"/><circle cx="17" cy="7" r="4.5" fill="#4B90ED" fillOpacity="0.85"/><circle cx="7" cy="17" r="4.5" fill="#4B90ED" fillOpacity="0.85"/><circle cx="17" cy="17" r="4.5" fill="#4B90ED" fillOpacity="0.85"/></svg>
                      </div>
                      <span className="text-[14px] font-semibold text-[#1a1c1b] truncate">CRM</span>
                    </div>

                  </React.Fragment>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Right Side: Text Area */}
        <div className="order-1 md:order-2 space-y-6 md:pl-4 pb-12 md:pb-0">
          <h2 className="loop-serif-display text-[54px] leading-[1.05] text-[#1a1c1b] tracking-tight">
            Share your notes<br/>with one click
          </h2>
          <p className="text-[22px] text-[#7a7a7a] leading-[1.4] max-w-[420px] font-body">
            Loop makes it easy to share notes on the platforms you already use
          </p>
        </div>
      </div>
    </section>
  );
}
