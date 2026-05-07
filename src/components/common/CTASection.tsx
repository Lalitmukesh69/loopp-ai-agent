import React from 'react';

export default function BottomCTASection() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-20">
      <div className="bg-[#9aaa4a] rounded-[2.5rem] p-3 md:p-4 relative overflow-hidden">
        {/* White Inner Card */}
        <div className="bg-white rounded-[2rem] px-10 md:px-16 pt-10 pb-14 md:pt-14 md:pb-20 relative">
          {/* Window Dots - Top Left */}
          <div className="flex gap-1.5 mb-12 md:mb-16">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ec6a5e]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#f4bf4f]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#61c554]"></div>
          </div>

          {/* Left-aligned Content */}
          <h2 className="font-headline text-4xl md:text-[4.2rem] font-medium mb-6 leading-[1.1] max-w-2xl text-[#1a1c1b]">
            Ready for <span className="newsreader-italic">calmer</span>, more productive meetings?
          </h2>
          <p className="text-[#1a1c1b]/50 text-[17px] mb-10 max-w-xl">Try Loop for a few meetings today. It's free to get started.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => window.location.href = '/auth'} className="bg-[#4b6319] text-white px-7 py-3.5 rounded-full font-semibold text-[15px] flex items-center justify-center gap-2.5 transition-all hover:bg-[#3d5014] active:scale-[0.98] shadow-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.801"/>
              </svg>
              Try it for free
            </button>
            <button className="bg-[#e8e8e0] text-[#1a1c1b] px-7 py-3.5 rounded-full font-semibold text-[15px] flex items-center justify-center gap-2.5 transition-all hover:bg-[#deded6] active:scale-[0.98] border border-[#d5d5cd]">
              <svg width="13" height="16" viewBox="0 0 384 512" fill="currentColor" opacity="0.7">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
              Download for iPhone
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}