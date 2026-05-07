import React from 'react';

export default function HowItWorksSection() {
  return (
    <section className="pt-16 pb-28 bg-white">
      <div className="max-w-[1100px] mx-auto px-6">
        <h2 className="font-headline text-4xl md:text-[3rem] font-medium text-center mb-10 tracking-[-0.02em]">How it works</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-[#f9f9f7] rounded-[10px] border border-[#ebeaeb] p-10 pb-8 relative z-0">
            <h3 className="font-headline text-[1.65rem] md:text-[1.85rem] font-medium mb-8 leading-[1.2] tracking-[-0.01em] text-[#1a1c1b]">
              Loop is like Apple Notes, but it also <span className="bg-[#d2e0ab] px-2 py-0.5 rounded-md inline-flex items-center gap-1.5 text-[#1a1c1b]"><span className="material-symbols-outlined text-[18px]">graphic_eq</span>transcribes</span> your meeting
            </h3>
            <div className="bg-white rounded-[10px] border border-[#e8e8e8] flex flex-col relative z-10 aspect-[4/3] shadow-sm">
              {/* Top bar Windows style */}
              <div className="w-full h-11 flex justify-end items-center px-4 gap-4 text-gray-400">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 6h8"/></svg>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1.5" y="1.5" width="9" height="9"/></svg>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 2l8 8M10 2l-8 8"/></svg>
              </div>
              {/* Inner content */}
              <div className="px-10 py-2 flex-1 text-left">
                <h4 className="font-headline text-[17px] font-bold text-[#1a1c1b] mb-5">Intro call: AllFound</h4>
                <div className="space-y-4 text-[13px] text-[#3c3c3c] font-body leading-[1.7]">
                  <p>100, growing</p>
                  <p>use tuesday.ai, v manual</p>
                  <p>180</p>
                  <p className="flex items-center">"a priority for q2"<span className="w-[1.5px] h-[14px] bg-[#1a1c1b] ml-[1px] inline-block animate-[pulse_1s_infinite]"></span></p>
                </div>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-[#f9f9f7] rounded-[10px] border border-[#ebeaeb] p-10 pb-8 relative z-0">
            <h3 className="font-headline text-[1.65rem] md:text-[1.85rem] font-medium mb-8 leading-[1.2] tracking-[-0.01em] text-[#1a1c1b]">
              When the meeting ends, Loop <span className="bg-[#d2e0ab] px-2 py-0.5 rounded-md inline-flex items-center gap-1.5 text-[#1a1c1b]"><span className="material-symbols-outlined text-[18px]">auto_awesome</span>enhances</span> the notes you've written
            </h3>
            <div className="bg-white rounded-[10px] border border-[#e8e8e8] flex flex-col relative z-10 aspect-[4/3] shadow-sm">
              {/* Top bar Windows style */}
              <div className="w-full h-11 flex justify-end items-center px-4 gap-4 text-gray-400">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 6h8"/></svg>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1.5" y="1.5" width="9" height="9"/></svg>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 2l8 8M10 2l-8 8"/></svg>
              </div>
              {/* Enhanced note content */}
              <div className="px-10 py-2 flex-1 text-left overflow-hidden">
                <h4 className="font-headline text-[17px] font-bold text-[#1a1c1b] mb-4">Intro call: AllFound</h4>
                <div className="space-y-4 font-body">
                  <div>
                    <h5 className="font-semibold text-[13px] text-[#2d2d2d] mb-1">AllFound Overview</h5>
                    <div className="text-[12px] leading-[1.6]">
                      <p className="text-[#3c3c3c]">100 employees, adding 20 more next quarter</p>
                      <p className="text-[#9a9a80]">Office in San Francisco and Austin</p>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[13px] text-[#2d2d2d] mb-1">Current Provider (Tuesday.ai)</h5>
                    <div className="text-[12px] leading-[1.6]">
                      <p className="text-[#3c3c3c]">Data input is too manual</p>
                      <p className="text-[#9a9a80]">Too complex for non-technical team members</p>
                      <p className="text-[#3c3c3c]">$180 per employee per year ("too expensive")</p>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[13px] text-[#2d2d2d] mb-1">Their Requirements</h5>
                    <div className="text-[12px] leading-[1.6]">
                      <p className="text-[#3c3c3c]">Finding a better tool is "a priority for Q2"</p>
                      <p className="text-[#9a9a80]">Need secure information sharing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
