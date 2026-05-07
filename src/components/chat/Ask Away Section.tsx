import React from 'react';
import { ArrowUp, Folder, File } from 'lucide-react';

// Reusable MacOS Window dots
const MacDots = () => (
  <div className="flex gap-1.5 mb-6">
    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
  </div>
);

// Reusable Input Pill
const ChatInputPill = ({ placeholder }) => (
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] bg-white rounded-full py-2 px-4 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-0.5 cursor-text z-20 group">
    <span className="text-[13px] font-medium text-gray-800 tracking-tight">{placeholder}</span>
    <button className="w-7 h-7 rounded-full bg-[#F0F4E3] text-[#4B5921] flex items-center justify-center transition-colors group-hover:bg-[#e4ebce]">
       <ArrowUp size={16} strokeWidth={2.5} />
    </button>
  </div>
);

const AskAwaySection = () => {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4">Ask away</h2>
        <p className="text-[#666666] text-lg max-w-lg mx-auto leading-relaxed">
          Answer questions about progress you're making,<br />
          decisions you've made and pull user insights in a flash
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: During a meeting */}
        <div className="relative bg-white rounded-2xl border border-gray-200 h-[400px] overflow-hidden shadow-sm group">
          {/* Badge */}
          <div className="absolute top-6 left-6 bg-white px-4 py-1.5 rounded-full text-[13px] font-semibold text-gray-800 shadow-[0_2px_10px_rgb(0,0,0,0.05)] border border-gray-100 z-10 transition-transform group-hover:scale-105 cursor-default">
            During a meeting
          </div>

          {/* Inner Content Area */}
          <div className="absolute top-20 left-6 right-0 bottom-0 flex gap-4">
            {/* Videos Stack */}
            <div className="w-[100px] flex-shrink-0 flex flex-col gap-2">
              <div className="h-[75px] w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm relative group/video cursor-pointer">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Video 1" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/video:opacity-100 transition-opacity"></div>
              </div>
              <div className="h-[75px] w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm relative group/video cursor-pointer">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Video 2" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/video:opacity-100 transition-opacity"></div>
              </div>
            </div>

            {/* Note Window */}
            <div className="flex-1 bg-white rounded-tl-xl border-l border-t border-gray-200 shadow-sm p-5 pr-8 transition-transform group-hover:translate-x-1 duration-500">
              <MacDots />
              <h3 className="font-serif text-xl text-gray-900 mb-6 truncate">Website redesig</h3>
              
              <div className="space-y-6 text-[13px] text-[#666666] leading-relaxed">
                <p className="hover:text-gray-900 transition-colors cursor-default">On track for sept launch budget?</p>
                <p className="hover:text-gray-900 transition-colors cursor-default">1 x new landing page nav changes</p>
              </div>
            </div>
          </div>

          {/* Fading bottom edge inside card (beneath input) */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>
          
          <ChatInputPill placeholder="What's been discussed so far?" />
        </div>

        {/* Card 2: In a folder */}
        <div className="relative bg-white rounded-2xl border border-gray-200 h-[400px] overflow-hidden shadow-sm group">
          {/* Badge */}
          <div className="absolute top-6 left-6 bg-white px-4 py-1.5 rounded-full text-[13px] font-semibold text-gray-800 shadow-[0_2px_10px_rgb(0,0,0,0.05)] border border-gray-100 z-10 transition-transform group-hover:scale-105 cursor-default">
            In a folder
          </div>

          {/* Inner Content Area */}
          <div className="absolute top-20 left-6 right-[-2px] bottom-[-2px] bg-white rounded-tl-xl border-l border-t border-gray-200 shadow-sm p-5 transition-transform group-hover:-translate-y-1 duration-500">
              <MacDots />
              
              {/* Folder Header */}
              <div className="flex items-center gap-3 mb-6 group/header cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-[#FDF0F6] flex items-center justify-center text-[#E55986] group-hover/header:scale-105 transition-transform">
                  <Folder size={20} fill="currentColor" className="opacity-90" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-gray-900 leading-tight">Sales calls</h3>
                  <p className="text-[11px] text-[#999999] mt-0.5">Calls with potential customers</p>
                </div>
              </div>

              {/* List Items */}
              <div className="space-y-4">
                {[
                  { img: "32", company: "AllFound <> Pineapple", names: "Caroline, Jon" },
                  { img: "11", company: "AllFound <> Luna Logic", names: "Shreman, Ben, Vicky" },
                  { img: "68", company: "AllFound <> Elemental", names: "Shreman Vincent" },
                  { img: "47", company: "AllFound <> TrustedSources", names: "Caroline, Jon" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 hover:bg-gray-50/80 p-1 -ml-1 rounded-lg transition-colors cursor-pointer">
                    <img src={`https://i.pravatar.cc/150?img=${item.img}`} alt="Avatar" className="w-7 h-7 rounded-full bg-gray-200 border border-gray-100" />
                    <div>
                      <p className="text-[12px] font-semibold text-gray-900 leading-tight">{item.company}</p>
                      <p className="text-[11px] text-[#999999]">{item.names}</p>
                    </div>
                  </div>
                ))}
              </div>
          </div>

          {/* Fading gradient specifically for Card 2 to match image */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10 rounded-b-2xl"></div>

          <ChatInputPill placeholder="What are our top feature requests?" />
        </div>

        {/* Card 3: Across all meetings */}
        <div className="relative bg-white rounded-2xl border border-gray-200 h-[400px] overflow-hidden shadow-sm group">
          {/* Badge */}
          <div className="absolute top-6 left-6 bg-white px-4 py-1.5 rounded-full text-[13px] font-semibold text-gray-800 shadow-[0_2px_10px_rgb(0,0,0,0.05)] border border-gray-100 z-10 transition-transform group-hover:scale-105 cursor-default">
            Across all meetings
          </div>

          {/* Inner Content Area */}
          <div className="absolute top-20 left-6 right-[-2px] bottom-[-2px] bg-white rounded-tl-xl border-l border-t border-gray-200 shadow-sm p-5 transition-transform group-hover:-translate-y-1 duration-500">
              <MacDots />
              
              <h3 className="font-serif text-xl text-gray-900 mb-6 cursor-pointer hover:text-[#4B5921] transition-colors w-fit">My notes</h3>

              {/* List Items */}
              <div className="space-y-4">
                {[
                  { title: "Product strategy meeting", names: "Jack Cully" },
                  { title: "Website sync", names: "Tom & Luke" },
                  { title: "Product card design feedback", names: "Tikhon & Jonathan" },
                  { title: "Vicky / Caroline 1:1", names: "Vicky, Caroline" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 hover:bg-gray-50/80 p-1 -ml-1 rounded-lg transition-colors cursor-pointer">
                    <div className="w-7 h-7 rounded-lg bg-[#F0F4E3] flex items-center justify-center text-[#7F8C4F] flex-shrink-0">
                       <File size={14} fill="currentColor" strokeWidth={0} />
                    </div>
                    <div className="truncate">
                      <p className="text-[12px] font-semibold text-gray-900 leading-tight truncate">{item.title}</p>
                      <p className="text-[11px] text-[#999999] truncate">{item.names}</p>
                    </div>
                  </div>
                ))}
              </div>
          </div>

          {/* Fading gradient for Card 3 */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10 rounded-b-2xl"></div>

          <ChatInputPill placeholder="Help me contribute more in meetings" />
        </div>

      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#F9F8F4] font-sans selection:bg-[#BAC66E] selection:text-black pt-12">
      <AskAwaySection />
    </div>
  );
}