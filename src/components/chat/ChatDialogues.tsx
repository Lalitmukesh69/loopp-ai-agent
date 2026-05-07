import React from 'react';
import { ArrowUp } from 'lucide-react';

// Custom Verified Badge (Greenish-yellow as seen in image)
const VerifiedBadge = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block ml-1 relative -top-[1px]">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" fill="#C4D92E"/>
    <path d="M9.86 18L4 12.14l1.86-1.86 4 4 10.28-10.28L22 6 9.86 18z" fill="#1A1A1A"/>
  </svg>
);

// Custom Windows Icon
const WindowsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.801"/>
  </svg>
);

// Reusable Recipe Tag (Slash + Label)
const RecipeTag = ({ text, colorClass, bgClass }) => (
  <div className="inline-flex items-center gap-2 border border-gray-200 rounded-md px-2 py-1 bg-white shadow-sm font-medium text-[13px] text-gray-800">
    <div className={`w-4 h-4 rounded-[4px] flex items-center justify-center text-[10px] font-bold ${bgClass} ${colorClass}`}>
      /
    </div>
    {text}
  </div>
);

// Author Block Component
const AuthorBlock = ({ name, role, avatar }) => (
  <div className="flex items-center gap-3 mt-6">
    <img src={avatar} alt={name} className="w-10 h-10 rounded-full border border-gray-100 shadow-sm" />
    <div>
      <p className="text-[13px] font-bold text-gray-900 leading-tight">
        {name} <VerifiedBadge />
      </p>
      <p className="text-[12px] text-gray-500 mt-0.5 leading-tight">{role}</p>
    </div>
  </div>
);

// Mockup Command Item
const CommandItem = ({ text, desc, colorClass, bgClass }) => (
  <div className="flex flex-col gap-1 py-2">
    <div className="flex items-center gap-2 font-medium text-[13px] text-gray-800">
      <div className={`w-4 h-4 rounded-[4px] flex items-center justify-center text-[10px] font-bold ${bgClass} ${colorClass}`}>
        /
      </div>
      {text}
    </div>
    <p className="text-[12px] text-gray-400 pl-6">{desc}</p>
  </div>
);

export default function StopPromptingApp() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans selection:bg-[#BAC66E] selection:text-black py-24 flex flex-col items-center">
      
      {/* Header */}
      <div className="text-center mb-16 px-6">
        <h2 className="text-4xl md:text-[44px] font-serif text-[#1A1A1A] mb-5 tracking-tight">Stop prompting, start cooking</h2>
        <p className="text-[#808080] text-[16px] max-w-xl mx-auto leading-relaxed">
          Recipes are simple shortcuts for complex<br className="hidden md:block"/>
          questions or your most-used prompts. Share your<br className="hidden md:block"/>
          Recipes with others or borrow one from an expert.
        </p>
      </div>

      {/* Grid Container */}
      <div className="w-full max-w-[1000px] mx-auto px-6 flex flex-col gap-6">
        
        {/* ROW 1: Quote & Coach Me */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Quote Block */}
          <div className="md:col-span-5 bg-[#FAFAFA] rounded-2xl p-8 md:p-10 border border-gray-100 flex items-center justify-center transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-default group">
            <h3 className="text-2xl md:text-[26px] font-serif text-[#1A1A1A] leading-[1.3] font-medium tracking-tight group-hover:text-[#4B5921] transition-colors">
              "You absolutely nailed the Coach Me recipe after a call. This is the best feature I've never asked for."
            </h3>
          </div>

          {/* Coach Me Card */}
          <div className="md:col-span-7 bg-white rounded-2xl p-8 md:p-10 border border-gray-200 shadow-[0_2px_15px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 cursor-pointer">
            <RecipeTag text="Coach me" bgClass="bg-pink-100" colorClass="text-pink-600" />
            <p className="mt-5 text-[14px] text-gray-600 leading-relaxed max-w-[90%]">
              Delivers leadership coaching advice based on the Mochary Method. Get concrete feedback on how to be a better leader with suggestions and examples based on your meeting transcript.
            </p>
            <AuthorBlock 
              name="Matt Mochary" 
              role="CEO coach and author" 
              avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces&q=80" 
            />
          </div>

        </div>

        {/* ROW 2: Mockups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Create and Share Mockup */}
          <div className="bg-[#F7F7F5] rounded-2xl p-6 md:p-8 border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden relative">
            <h4 className="text-[13px] font-bold text-gray-700 mb-6">Create and share Recipes or browse our library</h4>
            
            {/* Mockup Window */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 relative z-10">
              <div className="mb-5">
                <label className="block text-[12px] font-bold text-gray-800 mb-2">Recipe</label>
                <div className="flex items-center">
                  <RecipeTag text="PRD" bgClass="bg-orange-100" colorClass="text-orange-600" />
                  <span className="ml-1 w-1 h-4 bg-gray-400 animate-pulse"></span> {/* Blinking Cursor */}
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-gray-800 mb-2">Prompt</label>
                <div className="bg-gray-50/50 rounded-lg p-3 text-[12px] text-gray-500 leading-[1.6] font-mono border border-gray-100/50">
                  You are an excellent staff engineer who attended this meeting and is helping me draft a professional email. Your email should include:<br/>
                  - A concise summary of what was discussed.<br/>
                  - Key product requirements identified.<br/>
                  - Areas that need focus or follow-up.<br/>
                  - Potential problems, risks, or blockers mentioned.<br/>
                  <span className="opacity-50">Action items, owners and dates. Ensure they are clear from the notes...</span>
                </div>
              </div>
            </div>

            {/* Fading bottom edge */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#F7F7F5] to-transparent z-20 pointer-events-none"></div>
          </div>

          {/* Command Menu Mockup */}
          <div className="bg-[#F7F7F5] rounded-2xl p-6 md:p-8 border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden relative flex flex-col">
            <h4 className="text-[13px] font-bold text-gray-700 mb-6">Hit / in chat for quick access to all your Recipes</h4>
            
            <div className="flex-1 relative mb-12">
               {/* Faded List Mask */}
               <div className="absolute inset-0 z-10 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 70%, black 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 70%, black 100%)' }}>
                 <div className="space-y-1 animate-[slideUp_10s_linear_infinite]">
                    <CommandItem text="List my todos" desc="Extracts and displays your outstanding todos" bgClass="bg-lime-100" colorClass="text-lime-600" />
                    <CommandItem text="Who owes me what" desc="Generates a list of actions assigned to others" bgClass="bg-yellow-100" colorClass="text-yellow-600" />
                    <CommandItem text="Streamline my calendar" desc="Suggests 3 things to improve your week" bgClass="bg-pink-100" colorClass="text-pink-600" />
                    <CommandItem text="Write weekly recap" desc="Generates a weekly recap of accomplishments" bgClass="bg-purple-100" colorClass="text-purple-600" />
                 </div>
               </div>
            </div>

            {/* Input Bar */}
            <div className="absolute bottom-6 left-6 right-6 bg-white rounded-full py-2.5 px-4 flex items-center justify-between shadow-[0_4px_20px_rgb(0,0,0,0.08)] border border-gray-200 z-20 group">
              <span className="text-[14px] font-medium text-gray-800 tracking-tight">/</span>
              <button className="w-7 h-7 rounded-full bg-[#F0F4E3] text-[#4B5921] flex items-center justify-center transition-colors group-hover:bg-[#e4ebce]">
                 <ArrowUp size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>

        </div>

        {/* ROW 3: Bottom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-[0_2px_10px_rgb(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_8px_25px_rgb(0,0,0,0.08)] hover:-translate-y-1 cursor-pointer flex flex-col justify-between h-[220px]">
            <div>
              <RecipeTag text="Write PRD" bgClass="bg-purple-100" colorClass="text-purple-600" />
              <p className="mt-4 text-[13px] text-gray-600 leading-relaxed">
                Fills out Lenny Rachitsky's PRD template for a feature of your choice
              </p>
            </div>
            <AuthorBlock 
              name="Lenny Rachitsky" 
              role="Lenny's Newsletter" 
              avatar="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces&q=80" 
            />
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-[0_2px_10px_rgb(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_8px_25px_rgb(0,0,0,0.08)] hover:-translate-y-1 cursor-pointer flex flex-col justify-between h-[220px]">
            <div>
              <RecipeTag text="Streamline my calendar" bgClass="bg-orange-100" colorClass="text-orange-600" />
              <p className="mt-4 text-[13px] text-gray-600 leading-relaxed">
                Suggests three things to improve your week
              </p>
            </div>
            <AuthorBlock 
              name="Peter Yang" 
              role="Product leader & founder" 
              avatar="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces&q=80" 
            />
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-[0_2px_10px_rgb(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_8px_25px_rgb(0,0,0,0.08)] hover:-translate-y-1 cursor-pointer flex flex-col justify-between h-[220px]">
            <div>
              <RecipeTag text="Gather product feedback" bgClass="bg-yellow-100" colorClass="text-yellow-600" />
              <p className="mt-4 text-[13px] text-gray-600 leading-relaxed">
                Analyzes customer calls to extract product-related feedback and group it into clear, actionable themes
              </p>
            </div>
            <AuthorBlock 
              name="Ridd" 
              role="Designer" 
              avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces&q=80" 
            />
          </div>

        </div>

        {/* Footer CTA */}
        <div className="text-center mt-12 mb-8">
          <p className="text-[14px] text-gray-500 mb-6">
            Get Loop to see our full range of recipes, or create and share your own
          </p>
          <button className="bg-[#4B5921] hover:bg-[#3d481b] text-white px-6 py-3 rounded-full text-[14px] font-bold transition-all duration-300 flex items-center gap-2 mx-auto shadow-[0_4px_15px_rgb(75,89,33,0.3)] hover:shadow-[0_6px_20px_rgb(75,89,33,0.4)] hover:-translate-y-0.5">
            <WindowsIcon />
            Try it for free
          </button>
        </div>

      </div>

      {/* Global Styles for specific animations */}
      <style>
        {`
          @keyframes slideUp {
            0% { transform: translateY(10%); opacity: 0.8; }
            50% { transform: translateY(-10%); opacity: 1; }
            100% { transform: translateY(10%); opacity: 0.8; }
          }
        `}
      </style>

    </div>
  );
}