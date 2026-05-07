import React, { useEffect, useState } from 'react';
import { TESTIMONIAL_AVATARS } from '@/data/marketingImages';

// --- Custom Pixel-Perfect Twitter/X SVGs ---

const VerifiedBadge = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-[#1D9BF0] fill-current inline-block ml-0.5">
    <g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.79-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.733 2.73 1.83 3.39-.12.44-.183.91-.183 1.38 0 2.21 1.71 4 3.918 4 .52 0 1.02-.1 1.48-.28 .56 1.34 1.91 2.28 3.45 2.28s2.89-.94 3.45-2.28c.46.18.96.28 1.48.28 2.21 0 3.918-1.79 3.918-4 0-.47-.063-.94-.183-1.38 1.097-.66 1.83-1.93 1.83-3.39zM11.38 15.655L8.14 12.42c-.294-.296-.294-.775 0-1.07l.955-.955c.294-.294.774-.294 1.07 0l2.217 2.215 4.864-4.862c.293-.293.774-.293 1.07 0l.953.953c.296.295.296.774 0 1.07l-6.818 6.818c-.293.295-.774.295-1.07 0z"></path></g>
  </svg>
);

const XLogo = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-[#0F1419] transition-transform hover:scale-110 cursor-pointer">
    <g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g>
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-[#F91880] transition-transform group-hover/heart:scale-110">
    <g><path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g>
  </svg>
);

const ReplyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-[#1D9BF0] transition-transform group-hover/reply:scale-110">
    <g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g>
  </svg>
);

const CopyLinkIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-[#536471] group-hover/copy:fill-[#1D9BF0] transition-all group-hover/copy:scale-110">
    <g><path d="M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.96 1.96 5.12 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z"></path></g>
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-[#536471] hover:fill-[#0F1419] transition-colors cursor-pointer">
    <g><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm1 6h-2v6h2v-6z"></path></g>
  </svg>
);

// --- Tweet Card Component ---

const TweetCard = ({ name, handle, avatar, time, likes, replies, textNode, hasVideo, delay }) => {
  return (
    <div 
      className="bg-white rounded-2xl border border-[#EFF3F4] p-4 flex flex-col hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-400 ease-out cursor-default break-inside-avoid mb-6 animate-[fadeUp_0.8s_ease-out_both]"
      style={{ animationDelay: delay }}
    >
      
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-2 items-center">
          <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
          <div className="flex flex-col leading-tight">
            <div className="flex items-center gap-1">
              <span className="font-bold text-[#0F1419] text-[15px] hover:underline cursor-pointer">{name}</span>
              <VerifiedBadge />
            </div>
            <div className="flex items-center text-[#536471] text-[15px]">
              <span>{handle}</span>
              <span className="mx-1">·</span>
              <span className="text-[#1D9BF0] font-bold hover:underline cursor-pointer">Follow</span>
            </div>
          </div>
        </div>
        <div className="mt-1">
          <XLogo />
        </div>
      </div>

      {/* Tweet Body */}
      <div className="text-[#0F1419] text-[15px] leading-[1.4] whitespace-pre-wrap mb-3 font-normal">
        {textNode}
      </div>

      {/* Video Mockup (Specifically for Guillermo Rauch's tweet) */}
      {hasVideo && (
        <div className="mb-3 rounded-2xl border border-[#EFF3F4] overflow-hidden relative cursor-pointer group/video bg-[#F7F9F9] h-[160px] flex items-center justify-center">
           {/* Fake Video UI */}
           <div className="absolute top-3 right-3 bg-[#0F1419]/80 backdrop-blur-sm text-white text-[12px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 z-10 hover:bg-[#0F1419] transition-colors">
              Watch on X
           </div>
           {/* Play Button */}
           <div className="w-[52px] h-[52px] bg-[#1D9BF0] rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover/video:scale-110 z-10">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
           </div>
           {/* Faint UI Mockup in background */}
           <div className="absolute inset-0 opacity-40 pointer-events-none flex">
              <div className="w-1/2 h-full border-r border-gray-200 p-4">
                 <div className="w-1/2 h-2 bg-gray-300 rounded mb-2"></div>
                 <div className="w-3/4 h-2 bg-gray-200 rounded mb-4"></div>
                 <div className="w-1/4 h-2 bg-gray-200 rounded"></div>
              </div>
              <div className="w-1/2 h-full p-4 bg-green-50/30">
                 <div className="w-1/2 h-2 bg-green-300 rounded mb-2"></div>
                 <div className="w-full h-2 bg-green-200 rounded mb-1"></div>
                 <div className="w-3/4 h-2 bg-green-200 rounded"></div>
              </div>
           </div>
        </div>
      )}

      {/* Date & Info */}
      <div className="flex justify-between items-center text-[#536471] text-[14px] mb-3">
        <span className="hover:underline cursor-pointer">{time}</span>
        <InfoIcon />
      </div>

      <div className="h-[1px] bg-[#EFF3F4] w-full mb-3"></div>

      {/* Engagement Buttons */}
      <div className="flex items-center gap-5 mb-4 text-[#536471] text-[14px] font-medium">
        <div className="flex items-center gap-1.5 group/heart cursor-pointer">
          <HeartIcon />
          <span className="text-[#F91880]">{likes}</span>
        </div>
        <div className="flex items-center gap-1.5 group/reply cursor-pointer">
          <ReplyIcon />
          <span className="text-[#1D9BF0]">Reply</span>
        </div>
        <div className="flex items-center gap-1.5 group/copy cursor-pointer">
          <CopyLinkIcon />
          <span className="group-hover/copy:text-[#1D9BF0] transition-colors">Copy link</span>
        </div>
      </div>

      {/* Read Replies Button */}
      <button className="w-full py-2 rounded-full border border-[#EFF3F4] text-[#1D9BF0] font-bold text-[14.5px] hover:bg-[#1D9BF0]/10 transition-colors">
        Read {replies} replies
      </button>

    </div>
  );
};

// --- Main Section Component ---

export default function SocialProofSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const tweets = [
    {
      id: 1,
      name: "Nat Friedman", handle: "@natfriedman", avatar: TESTIMONIAL_AVATARS.natFriedman, 
      time: "1:55 PM · Jun 20, 2024", likes: "558", replies: "25",
      textNode: (
        <>
          Been using <span className="text-[#1D9BF0] hover:underline cursor-pointer">loop.so</span> a bit lately; it generates the best meeting notes of anything I've tried so far. Not sure how they did that.
        </>
      )
    },
    {
      id: 2,
      name: "Chris Pedregal", handle: "@cjpedregal", avatar: TESTIMONIAL_AVATARS.chrisPedregal, 
      time: "2:19 PM · Jun 13, 2024", likes: "53", replies: "5",
      textNode: (
        <>
          Time magazine selected <span className="text-[#1D9BF0] hover:underline cursor-pointer">@meetloop</span> as one of the best AI tools for note-taking!<br/><br/>
          <span className="text-[#1D9BF0] hover:underline cursor-pointer">time.com/charter/698752...</span>
        </>
      )
    },
    {
      id: 3,
      name: "Dan Shipper", handle: "@danshipper", avatar: TESTIMONIAL_AVATARS.danShipper, 
      time: "9:03 PM · Jun 3, 2024", likes: "36", replies: "4",
      textNode: (
        <>
          If you aren't using <span className="text-[#1D9BF0] hover:underline cursor-pointer">@meetloop</span> for your meetings you are seriously missing out.<br/><br/>Incredible product.
        </>
      )
    },
    {
      id: 4,
      name: "Soleio", handle: "@soleio", avatar: TESTIMONIAL_AVATARS.soleio, 
      time: "1:36 PM · Aug 8, 2024", likes: "43", replies: "2",
      textNode: (
        <>
          I get uncharacteristically excited about group Zoom meetings now<br/><br/>Why? Because the payoff is seeing <span className="text-[#1D9BF0] hover:underline cursor-pointer">@meetloop</span> really work its magic and generate incredible meeting notes seconds after we adjourn
        </>
      )
    },
    {
      id: 5,
      name: "Guillermo Rauch", handle: "@rauchg", avatar: TESTIMONIAL_AVATARS.guillermoRauch, 
      time: "7:42 PM · May 22, 2024", likes: "310", replies: "11",
      hasVideo: true,
      textNode: (
        <>
          Write bare notes → ai enhances them<br/>
          Very clever ai-native ux: <span className="text-[#1D9BF0] hover:underline cursor-pointer">loop.so</span>
        </>
      )
    },
    {
      id: 6,
      name: "MDS", handle: "@mds", avatar: TESTIMONIAL_AVATARS.mds, 
      time: "5:34 PM · Sep 19, 2024", likes: "23", replies: "7",
      textNode: (
        <>
          I love Loop (the AI note taking app)
        </>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans selection:bg-[#BAC66E] selection:text-black py-24 px-6 flex flex-col items-center">
      
      {/* Header */}
      <div 
        className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h2 className="text-[36px] md:text-[42px] font-serif text-[#1A1A1A] leading-[1.1] tracking-tight">
          What people are saying about Loop
        </h2>
      </div>

      {/* Masonry Grid (Matches image structure perfectly) */}
      <div className="w-full max-w-[1100px] mx-auto columns-1 md:columns-2 lg:columns-3 gap-6">
        {tweets.map((tweet, index) => (
          <TweetCard 
            key={tweet.id} 
            {...tweet} 
            delay={`${(index * 0.15) + 0.2}s`} 
          />
        ))}
      </div>

      {/* Global Embedded Animations */}
      <style>
        {`
          @keyframes fadeUp {
            from { 
              opacity: 0; 
              transform: translateY(40px); 
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