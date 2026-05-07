import React, { useEffect, useState } from 'react';
import { ShieldCheck, Cpu, Database, Eye, Server, MessageSquareHeart } from 'lucide-react';

// --- Custom Pixel-Perfect SVGs for Cards ---

const EUStarsIcon = () => (
  <div className="w-12 h-12 bg-[#1A56D6] rounded-full flex items-center justify-center shrink-0 shadow-sm transition-transform duration-500 group-hover:rotate-180">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      {/* Approximating the 12 stars in a circle */}
      {[...Array(12)].map((_, i) => (
        <g key={i} transform={`rotate(${i * 30} 12 12)`}>
          <polygon points="12,2 12.5,3.5 14,3.5 12.8,4.5 13.2,6 12,5 10.8,6 11.2,4.5 10,3.5 11.5,3.5" />
        </g>
      ))}
    </svg>
  </div>
);

const GlobeIcon = () => (
  <div className="w-12 h-12 bg-[#1A56D6] rounded-full flex items-center justify-center shrink-0 shadow-sm transition-transform duration-500 group-hover:scale-110">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  </div>
);

// --- Reusable Sub-components ---

const BulletPoint = ({ children }) => (
  <div className="flex items-start gap-3 mb-4 group/bullet transition-all duration-300">
    <div className="w-1.5 h-1.5 rounded-full bg-[#A3A3A3] shrink-0 mt-2 transition-colors duration-300 group-hover/bullet:bg-[#4B5921]"></div>
    <div className="text-[15px] text-[#666666] leading-[1.65] transition-colors duration-300 group-hover/bullet:text-[#1A1A1A]">
      {children}
    </div>
  </div>
);

const SectionHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-2.5 mb-5 group/header">
    <Icon size={20} className="text-[#A2B64F] transition-transform duration-300 group-hover/header:scale-110 group-hover/header:rotate-6" />
    <h2 className="text-[22px] font-serif font-bold text-[#1A1A1A] tracking-tight">
      {title}
    </h2>
  </div>
);

const ComplianceCard = ({ icon: Icon, title, description, linkText }) => (
  <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 flex flex-col gap-4 transition-all duration-400 ease-out hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-[#D1D1D1] group cursor-pointer">
    <div className="flex gap-4 items-start">
      <Icon />
      <div className="pt-1">
        <h3 className="text-[15px] font-bold text-[#1A1A1A] mb-2">{title}</h3>
        <p className="text-[13px] text-[#666666] leading-[1.6] mb-4">
          {description}
        </p>
        <a href="#" className="text-[13px] font-medium text-[#1A1A1A] underline decoration-[#E5E5E5] underline-offset-4 hover:decoration-[#1A1A1A] transition-colors duration-300">
          {linkText}
        </a>
      </div>
    </div>
  </div>
);

// --- Main Layout Component ---

export default function SecurityDetailsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans selection:bg-[#BAC66E] selection:text-black py-20 px-6 md:px-12 lg:px-24 overflow-hidden">
      
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row gap-16 lg:gap-24 relative">
        
        {/* LEFT COLUMN: Detailed Text Sections */}
        <div className="flex-1 flex flex-col gap-12">
          
          {/* Section 1: The basics */}
          <div className={`animate-[fadeUp_0.8s_ease-out_both] group/section`} style={{ animationDelay: '0.1s' }}>
            <SectionHeader title="The basics" icon={ShieldCheck} />
            <BulletPoint>
              Loop is an app for Desktop and iPhone, a lot like Apple Notes or Notion. It works with Google Workspace or Microsoft login and integrates with your calendar.
            </BulletPoint>
            <BulletPoint>
              You have to manually start Loop for a meeting (it won't auto-join or auto-record anything). Loop then accesses your microphone audio, and your meeting audio on your computer, and transcribes it. It does not add a bot to your video call.
            </BulletPoint>
            <BulletPoint>
              Loop for Desktop works with any meeting platform. Zoom, Meet, Teams, you name it. Loop for iPhone is built for in-person meetings.
            </BulletPoint>
            <BulletPoint>
              Loop uses best-in-class transcription providers (like Deepgram and Assembly) and AI providers (like OpenAI and Anthropic) to summarize your meeting.
            </BulletPoint>
          </div>

          {/* Section 2: Model training */}
          <div className={`animate-[fadeUp_0.8s_ease-out_both]`} style={{ animationDelay: '0.2s' }}>
            <SectionHeader title="Model training" icon={Cpu} />
            <BulletPoint>
              We do not allow third parties (like OpenAI or Anthropic) to use your data to train their AI models.
            </BulletPoint>
            <BulletPoint>
              Loop trains on your anonymized data so we can keep making Loop better. You can opt out of this in your Settings.
            </BulletPoint>
            <BulletPoint>
              Enterprise users have model training turned off by default.
            </BulletPoint>
          </div>

          {/* Section 3: No stored recordings */}
          <div className={`animate-[fadeUp_0.8s_ease-out_both]`} style={{ animationDelay: '0.3s' }}>
            <SectionHeader title="No stored recordings" icon={Database} />
            <BulletPoint>
              Loop doesn't store the audio from meetings - it transcribes in real time on macOS/Windows, or after your meeting using temporarily cached audio on iOS. It only stores the transcript and any notes you provide from a call.
            </BulletPoint>
          </div>

          {/* Section 4: You control who sees your notes */}
          <div className={`animate-[fadeUp_0.8s_ease-out_both]`} style={{ animationDelay: '0.4s' }}>
            <SectionHeader title="You control who sees your notes" icon={Eye} />
            <BulletPoint>
              As a user, you control who sees your notes. Notes are private by default, until you choose to share them with others.
            </BulletPoint>
            <BulletPoint>
              You can delete individual notes, or request deletion of all your data at any time.
            </BulletPoint>
          </div>

          {/* Section 5: Encrypted infrastructure */}
          <div className={`animate-[fadeUp_0.8s_ease-out_both]`} style={{ animationDelay: '0.5s' }}>
            <SectionHeader title="Everything stored in industry standard, encrypted infrastructure" icon={Server} />
            <BulletPoint>
              Notes are stored in our US-hosted AWS Virtual Private Cloud. They are encrypted at rest and in transit. They are backed up daily.
            </BulletPoint>
            <BulletPoint>
              Loop is built and maintained by our top-tier engineering team, who've built scalable infrastructure for companies like Apple, Amazon, Google, and Meta.
            </BulletPoint>
          </div>

          {/* Section 6: Contact */}
          <div className={`animate-[fadeUp_0.8s_ease-out_both]`} style={{ animationDelay: '0.6s' }}>
            <SectionHeader title="We're here if you need us" icon={MessageSquareHeart} />
            <BulletPoint>
              If you have more questions, please <a href="#" className="text-[#666666] underline decoration-[#C2C2C2] hover:text-[#1A1A1A] hover:decoration-[#1A1A1A] underline-offset-4 transition-colors font-medium">reach out to our team.</a>
            </BulletPoint>
          </div>

        </div>

        {/* RIGHT COLUMN: Sticky Compliance Cards */}
        <div className="w-full md:w-[350px] lg:w-[400px] shrink-0">
          <div className="sticky top-32 flex flex-col gap-6 animate-[fadeUp_1s_ease-out_both]" style={{ animationDelay: '0.5s' }}>
            
            <ComplianceCard 
              icon={EUStarsIcon}
              title="SOC 2"
              description="We've shown independent auditors that our security practices meet SOC 2 Type 2 standards"
              linkText="See our Trust page"
            />

            <ComplianceCard 
              icon={GlobeIcon}
              title="GDPR"
              description="We're committed to GDPR compliance and have a Data Processing Agreement available upon request"
              linkText="Read our Privacy Policy"
            />

          </div>
        </div>

      </div>

      {/* Global Animation Styles */}
      <style>
        {`
          @keyframes fadeUp {
            from { 
              opacity: 0; 
              transform: translateY(30px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
        `}
      </style>
    </div>
  );
}