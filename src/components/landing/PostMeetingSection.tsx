import React from 'react';
import { POST_MEETING_TESTIMONIAL_AVATAR } from '@/data/marketingImages';

export default function PostMeetingSection() {
  return (
    <section className="py-32 bg-[#fafaf8] overflow-hidden">
      <div className="max-w-[1040px] mx-auto px-6 grid md:grid-cols-[1fr_500px] gap-12 items-center">
        
        {/* Left Side: Text and Testimonial */}
        <div className="space-y-8 pb-12 md:pb-0">
          <h2 className="loop-serif text-[42px] md:text-[46px] leading-[1.05] text-[#1a1c1b] tracking-tight">
            Put your<br/>meetings to work
          </h2>
          <p className="text-[19px] text-[#6d6d6d] leading-[1.4] max-w-[420px] font-body">
            Loop has the latest AI models built in, so it can help you do your post-meeting action items
          </p>
          
          <div className="pt-4 flex">
            <div className="w-[3px] bg-[#efb02e] rounded-full mr-6 shrink-0 mt-2 mb-2"></div>
            <div className="space-y-6">
              <p className="text-[20px] font-medium leading-[1.5] text-[#1a1c1b] max-w-[340px] loop-serif tracking-tight">
                "The addiction is real — at this point I can't imagine life without it. Effortlessly powerful"
              </p>
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                  <img 
                    alt="Adriana Vitagliano" 
                    className="w-full h-full object-cover" 
                    src={POST_MEETING_TESTIMONIAL_AVATAR}
                  />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-[#1a1c1b]">Adriana Vitagliano</div>
                  <div className="text-[13px] text-[#81807d]">VC, Firstminute</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Card Area */}
        <div className="relative w-full aspect-[1/1.15] max-w-[500px] rounded-[16px] bg-[#f8f8f6] border border-[#ebeaeb] mx-auto md:ml-auto md:mr-0 overflow-hidden shrink-0 group">
          
          <style>{`
            @keyframes scrollLeft {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes scrollRight {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .animate-scroll-left {
              animation: scrollLeft 25s linear infinite;
            }
            .animate-scroll-right {
              animation: scrollRight 25s linear infinite;
            }
            .pill-row:hover .animate-scroll-left,
            .pill-row:hover .animate-scroll-right {
              animation-play-state: paused;
            }
            .post-pill {
              background: #b5cb4e;
              color: #1a1c1b;
              padding: 10px 22px;
              border-radius: 9999px;
              font-weight: 500;
              font-size: 15px;
              white-space: nowrap;
              cursor: pointer;
              transition: transform 0.2s ease, box-shadow 0.2s ease;
              flex-shrink: 0;
            }
            .post-pill:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
          `}</style>

          {/* Background animated pill rows */}
          <div className="absolute inset-0 flex flex-col justify-end pb-5 gap-[14px] pointer-events-none overflow-hidden z-0">
            
            {/* Row 1 */}
            <div className="pill-row pointer-events-auto">
              <div className="flex w-[200%] animate-scroll-left items-center gap-[14px]">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-[14px]">
                    <div className="post-pill">Follow up email</div>
                    <div className="post-pill">List their budget</div>
                    <div className="post-pill">Their objections</div>
                    <div className="post-pill">Write a summary</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 */}
            <div className="pill-row pointer-events-auto">
              <div className="flex w-[200%] animate-scroll-right items-center gap-[14px] ml-[-80px]">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-[14px]">
                    <div className="post-pill">Write a summary</div>
                    <div className="post-pill">Key pain points?</div>
                    <div className="post-pill">What questions did they have?</div>
                    <div className="post-pill">The meeting summary</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 3 */}
            <div className="pill-row pointer-events-auto">
              <div className="flex w-[200%] animate-scroll-left items-center gap-[14px]">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-[14px]">
                    <div className="post-pill">How much have they raised?</div>
                    <div className="post-pill">What questions did they have?</div>
                    <div className="post-pill">What's next week's plan?</div>
                    <div className="post-pill">Decision criteria</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 4 */}
            <div className="pill-row pointer-events-auto">
              <div className="flex w-[200%] animate-scroll-right items-center gap-[14px] ml-[-40px]">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-[14px]">
                    <div className="post-pill">Write a summary</div>
                    <div className="post-pill">How much have they raised?</div>
                    <div className="post-pill">What questions did they have?</div>
                    <div className="post-pill">Objections</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Central Floating Card */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 bg-white rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.1)] border border-[#e5e5e5] w-[88%] flex flex-col transition-transform duration-500 group-hover:-translate-y-1" style={{ height: 'calc(100% - 140px)' }}>
            
            {/* Content area */}
            <div className="flex-1 overflow-hidden px-10 pt-8 pb-6">
              
              {/* Section 1 */}
              <div className="mb-5">
                <h4 className="loop-serif text-[18.5px] text-[#0a0a0a] font-bold tracking-tight mb-2">Their Requirements</h4>
                <ul className="list-disc pl-[20px] text-[14px] text-[#3a3a3a] space-y-[5px] font-body leading-[1.55]">
                  <li>Finding a better employee engagement tool.</li>
                  <li>Need secure information sharing capabilities</li>
                  <li>One-way or two-way data sharing required, contingent on internal approval</li>
                  <li>Must integrate with existing Slack and Notion workflows</li>
                </ul>
              </div>

              {/* Section 2 */}
              <div className="mb-5">
                <h4 className="loop-serif text-[18.5px] text-[#0a0a0a] font-bold tracking-tight mb-2">Budget & Timeline</h4>
                <ul className="list-disc pl-[20px] text-[14px] text-[#3a3a3a] space-y-[5px] font-body leading-[1.55]">
                  <li>Budget: $50–75 per employee per year</li>
                  <li>Looking to implement within Q2 2024</li>
                  <li>Prefer tools with good mobile support</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div>
                <h4 className="loop-serif text-[18.5px] text-[#0a0a0a] font-bold tracking-tight mb-2">Decision Criteria</h4>
                <ul className="list-disc pl-[20px] text-[14px] text-[#3a3a3a] space-y-[5px] font-body leading-[1.55]">
                  <li>Ease of use for non-technical staff</li>
                  <li>Integration with existing tools (Slack, Notion)</li>
                  <li>Strong security and compliance features</li>
                </ul>
              </div>

            </div>

            {/* Gradient to smooth bottom text before input */}
            <div className="absolute bottom-0 left-0 w-full h-[120px] bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none rounded-b-xl z-10"></div>
            
            {/* Input bar at bottom edge of card */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[88%] z-20">
              <div className="bg-white border border-[#e0e0e0] rounded-full pl-5 pr-2 py-2.5 flex items-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] focus-within:shadow-[0_8px_28px_rgba(0,0,0,0.12)] focus-within:border-[#c5c5c5] transition-all duration-300">
                <div className="w-[1.5px] h-[18px] bg-[#4b6319] animate-[pulse_1.2s_infinite] mr-1 rounded-full shrink-0"></div>
                <input 
                  type="text" 
                  placeholder="Ask Loop anything" 
                  className="flex-1 bg-transparent border-none outline-none text-[15px] font-body text-[#1a1c1b] placeholder:text-[#9a9a9a]"
                />
                <button className="w-[36px] h-[36px] rounded-full bg-[#4b6319] hover:bg-[#3d5014] text-white flex items-center justify-center shrink-0 transition-all duration-200 hover:scale-105 active:scale-95 ml-2 shadow-[0_2px_8px_rgba(75,99,25,0.3)]">
                  <span className="material-symbols-outlined text-[19px]">arrow_upward</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
