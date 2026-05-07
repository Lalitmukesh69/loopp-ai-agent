import React from 'react';
import { ArrowUp } from 'lucide-react';

// Reusable Action Pill with Bounce Hover Effect
const ActionPill = ({ text }) => (
  <button 
    className="flex items-center gap-3 bg-white pl-5 pr-2 py-2 rounded-full border border-gray-200 shadow-[0_2px_10px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgb(0,0,0,0.12)] hover:-translate-y-1.5 hover:scale-[1.03] group shrink-0 cursor-pointer"
    // Custom cubic-bezier for a springy "bounce" effect
    style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
  >
    <span className="text-[15px] text-gray-800 font-medium whitespace-nowrap">{text}</span>
    <div className="w-7 h-7 rounded-full bg-[#F0F4E3] text-[#4B5921] flex items-center justify-center transition-colors group-hover:bg-[#e4ebce]">
      <ArrowUp size={15} strokeWidth={2.5} />
    </div>
  </button>
);

// Block of items to be duplicated for the marquee
const ItemsBlock = ({ items }) => (
  <div className="flex gap-4 pr-4 w-max shrink-0 items-center py-4">
    {items.map((text, i) => <ActionPill key={i} text={text} />)}
  </div>
);

// Infinite Marquee Row
const MarqueeRow = ({ items, duration }) => {
  return (
    <div
      className="flex w-max"
      style={{ animation: `marqueeLeft ${duration}s linear infinite` }}
    >
      {/* We duplicate the block 4 times. 
        Moving it by -50% exactly shifts it by 2 blocks, creating a flawless infinite loop. 
      */}
      <ItemsBlock items={items} />
      <ItemsBlock items={items} />
      <ItemsBlock items={items} />
      <ItemsBlock items={items} />
    </div>
  );
};

export default function GetAnythingDoneApp() {
  // Data for the rows
  const row1Items = ["Write a case study", "Write a video script", "Create a proposal", "Write a Slack message", "Write a product brief", "Draft a welcome email", "Update the CRM"];
  const row2Items = ["Write a newsletter", "Write a product update", "Draft a presentation", "Create a marketing plan", "Summarize user feedback", "Write a blog post", "Plan next sprint"];
  const row3Items = ["Draft an article", "Write a guide", "Create a project plan", "Write a job description", "Create a memo", "Generate PRD", "Find key takeaways"];

  return (
    // Replaced min-h-screen with a smaller min-height and negative top margin to move it up ~30%
    <div className="min-h-[70vh] bg-white font-sans selection:bg-[#BAC66E] selection:text-black pt-12 pb-24 flex flex-col items-center justify-center overflow-hidden -mt-[15vh]">
      
      {/* Inject custom keyframes for the continuous marquee */}
      <style>
        {`
          @keyframes marqueeLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      {/* Header Area */}
      <div className="text-center mb-12 px-6" style={{ paddingTop: '75px' }}>
        <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4">Get anything done</h2>
        <p className="text-[#808080] text-lg max-w-lg mx-auto leading-relaxed">
          Loop helps you write documents, follow-up<br className="hidden md:block"/>
          emails or briefs — all inspired by your conversations
        </p>
      </div>

      {/* Marquee Container Area */}
      <div className="relative w-full max-w-[1400px] mx-auto overflow-hidden">
        
        {/* Left and Right Fading Overlays - Reduced width to make the animation more visible */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-[#F9F8F4] via-[#F9F8F4]/90 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-[#F9F8F4] via-[#F9F8F4]/90 to-transparent z-10 pointer-events-none"></div>

        {/* Staggered Grid of Animated Pills */}
        <div className="flex flex-col gap-2 w-full relative -ml-12 md:-ml-24">
          
          {/* Row 1 - Right to Left (Faster for higher visibility) */}
          <div className="w-full">
            <MarqueeRow items={row1Items} duration="35" />
          </div>

          {/* Row 2 - Right to Left */}
          <div className="w-full">
            <MarqueeRow items={row2Items} duration="28" />
          </div>

          {/* Row 3 - Right to Left */}
          <div className="w-full -ml-8">
            <MarqueeRow items={row3Items} duration="42" />
          </div>

        </div>
      </div>
      
    </div>
  );
}