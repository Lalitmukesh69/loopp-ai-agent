import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { templateData } from './landingData';

export default function TemplatesSection() {
  const [activeTemplate, setActiveTemplate] = useState('user_interview');
  const activeTabData = templateData[activeTemplate];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-[1100px] mx-auto px-6 grid md:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
        {/* Left Side: Interactive Card */}
        <div className="order-2 md:order-1 relative h-[480px] w-full max-w-[500px] mx-auto md:ml-auto md:mr-0">
          <div className="bg-[#fcfdfa] rounded-[8px] border border-[#e2e1dc] shadow-sm flex overflow-hidden w-full h-full">
            {/* Sidebar */}
            <div className="w-[160px] shrink-0 border-r border-[#e2e1dc] p-5 flex flex-col gap-2.5">
              {[ 
                { id: 'customer_discovery', label: 'Customer discovery' },
                { id: '1on1', label: '1 on 1' },
                { id: 'user_interview', label: 'User Interview' },
                { id: 'pitch', label: 'Pitch' },
                { id: 'standup', label: 'Standup' }
              ].map(tab => {
                const isActive = activeTemplate === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTemplate(tab.id)}
                    className={`w-full text-left px-3.5 py-1.5 text-[12.5px] font-medium rounded-[4px] border transition-all ${
                      isActive 
                        ? 'bg-[#4b6319] text-white border-[#4b6319] shadow-sm' 
                        : 'bg-white text-[#1a1c1b] border-[#e2e1dc] hover:border-[#d0cfcb] shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
            
            {/* Content Area */}
            <div className="flex-1 px-10 py-8 bg-[#fdfdfc] overflow-y-auto">
              <motion.div
                key={activeTemplate}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Title and date */}
                <div className="mb-6">
                  <h3 className="loop-serif text-[22px] text-[#1a1c1b] mb-1.5">{activeTabData.title}</h3>
                  <div className="flex items-center gap-1.5 text-[12.5px] font-medium text-[#7a7a7a]">
                    <span className="material-symbols-outlined text-[15px]">calendar_month</span>
                    {activeTabData.dateStr} {activeTabData.participants && <span className="text-[#1a1c1b] font-semibold">{activeTabData.participants}</span>}
                  </div>
                </div>

                {/* Content sections */}
                <div className="space-y-6">
                  {activeTabData.sections.map((section, idx) => (
                    <div key={idx}>
                      <h4 className="font-bold text-[13.5px] text-[#1a1c1b] mb-2">{section.title}</h4>
                      <div className="space-y-2">
                        {section.lines.map((widthCls, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-[4px] h-[4px] rounded-full bg-[#d0d0cc] shrink-0"></div>
                            <div className={`h-[8px] bg-[#eaeaeb] rounded-full ${widthCls}`}></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Side: Text */}
        <div className="order-1 md:order-2 space-y-6 md:pl-6">
          <h2 className="loop-serif text-[42px] md:text-[46px] leading-[1.05] text-[#1a1c1b] tracking-tight">
            Get notes in the format<br/>your team needs
          </h2>
          <p className="text-[19px] text-[#6d6d6d] leading-[1.4] max-w-[420px] font-body">
            Make use of our customizable templates for your most common meeting types like customer discovery calls, user interviews or 1 on 1s.
          </p>
        </div>
      </div>
    </section>
  );
}
