import React from 'react';

// --- Custom SVGs for pixel-perfect Twitter/X UI ---
const VerifiedBadge = () => (
  <svg viewBox="0 0 24 24" aria-label="Verified account" className="w-[18px] h-[18px] text-[#1D9BF0] fill-current inline-block ml-0.5" data-testid="icon-verified">
    <g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.79-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.733 2.73 1.83 3.39-.12.44-.183.91-.183 1.38 0 2.21 1.71 4 3.918 4 .52 0 1.02-.1 1.48-.28 .56 1.34 1.91 2.28 3.45 2.28s2.89-.94 3.45-2.28c.46.18.96.28 1.48.28 2.21 0 3.918-1.79 3.918-4 0-.47-.063-.94-.183-1.38 1.097-.66 1.83-1.93 1.83-3.39zM11.38 15.655L8.14 12.42c-.294-.296-.294-.775 0-1.07l.955-.955c.294-.294.774-.294 1.07 0l2.217 2.215 4.864-4.862c.293-.293.774-.293 1.07 0l.953.953c.296.295.296.774 0 1.07l-6.818 6.818c-.293.295-.774.295-1.07 0z"></path></g>
  </svg>
);

const XLogo = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[18px] h-[18px] fill-[#0F1419]">
    <g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g>
  </svg>
);

const HeartIcon = ({ liked }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={`w-4 h-4 ${liked ? 'fill-[#F91880]' : 'fill-[#536471] group-hover/action:fill-[#F91880] transition-colors'}`}>
    <g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g>
  </svg>
);

const HeartIconFilled = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-[#F91880]">
    <g><path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g>
  </svg>
);

const ReplyIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-[#536471] group-hover/action:fill-[#1D9BF0] transition-colors">
    <g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g>
  </svg>
);

const CopyLinkIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-[#536471] group-hover/action:fill-[#1D9BF0] transition-colors">
    <g><path d="M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.96 1.96 5.12 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z"></path></g>
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[18px] h-[18px] fill-[#536471]">
    <g><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm1 6h-2v6h2v-6z"></path></g>
  </svg>
);

// --- Individual Tweet Component ---
const TweetCard = ({ name, handle, avatar, verified, textNode, time, likes, replies, hasImage }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#EFF3F4] p-4 flex flex-col hover:bg-[#F7F9F9] transition-colors cursor-pointer break-inside-avoid mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-3 items-center">
          <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
          <div className="flex flex-col leading-tight">
            <div className="flex items-center">
              <span className="font-bold text-[#0F1419] text-[15px] hover:underline cursor-pointer">{name}</span>
              {verified && <VerifiedBadge />}
            </div>
            <div className="flex items-center text-[#536471] text-[15px]">
              <span>{handle}</span>
              <span className="mx-1">·</span>
              <span className="text-[#1D9BF0] font-semibold hover:underline cursor-pointer">Follow</span>
            </div>
          </div>
        </div>
        <div className="mt-1">
          <XLogo />
        </div>
      </div>

      {/* Body */}
      <div className="text-[#0F1419] text-[15px] leading-[1.45] whitespace-pre-wrap mb-3">
        {textNode}
      </div>

      {/* Optional Image Attachment Mockup */}
      {hasImage && (
        <div className="mb-3 rounded-2xl border border-[#EFF3F4] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=300&fit=crop&q=80" alt="App Mockup" className="w-full h-auto" />
        </div>
      )}

      {/* Date / Info */}
      <div className="flex justify-between items-center text-[#536471] text-[15px] mb-3">
        <span className="hover:underline cursor-pointer">{time}</span>
        <div className="cursor-pointer hover:bg-gray-100 p-1 rounded-full transition-colors"><InfoIcon /></div>
      </div>

      <div className="h-[1px] bg-[#EFF3F4] w-full mb-3"></div>

      {/* Action Buttons */}
      <div className="flex items-center gap-6 mb-3 text-[#536471] text-[14px] font-medium">
        <div className="flex items-center gap-2 group/action cursor-pointer">
          <div className="p-1.5 rounded-full group-hover/action:bg-[#F91880]/10 transition-colors">
            <HeartIcon liked={true} />
          </div>
          <span className="text-[#F91880]">{likes}</span>
        </div>
        <div className="flex items-center gap-2 group/action cursor-pointer">
          <div className="p-1.5 rounded-full group-hover/action:bg-[#1D9BF0]/10 transition-colors">
            <ReplyIcon />
          </div>
          <span className="group-hover/action:text-[#1D9BF0] transition-colors">Reply</span>
        </div>
        <div className="flex items-center gap-2 group/action cursor-pointer">
          <div className="p-1.5 rounded-full group-hover/action:bg-[#1D9BF0]/10 transition-colors">
            <CopyLinkIcon />
          </div>
          <span className="group-hover/action:text-[#1D9BF0] transition-colors">Copy link</span>
        </div>
      </div>

      {/* Footer Pill */}
      <button className="w-full py-2.5 rounded-full border border-[#EFF3F4] text-[#1D9BF0] font-bold text-[15px] hover:bg-[#1D9BF0]/10 transition-colors">
        Read {replies} replies
      </button>

    </div>
  );
};

export default function TestimonialsApp() {
  
  // Custom text nodes to handle the blue links perfectly without complex string parsing
  const tweets = [
    {
      id: 1,
      column: 1,
      name: "Nat Friedman", handle: "@natfriedman", avatar: "https://i.pravatar.cc/150?img=11", verified: true,
      time: "1:55 PM · Jan 20, 2024", likes: "558", replies: "25",
      textNode: (
        <>
          Been using <span className="text-[#1D9BF0] hover:underline cursor-pointer">Loop.so</span> a bit lately; it generates the best meeting notes of anything I've tried so far. Not sure how they did that.
        </>
      )
    },
    {
      id: 2,
      column: 1,
      name: "Ryan Hoover", handle: "@rrhoover", avatar: "https://i.pravatar.cc/150?img=33", verified: true,
      time: "8:49 PM · Mar 31, 2025", likes: "320", replies: "42",
      textNode: (
        <>
          Loop is so good.<br/><br/>I hope they introduce a marketplace of one-click integrations. I got use cases! :)
        </>
      )
    },
    {
      id: 3,
      column: 1,
      name: "Soleio", handle: "@soleio", avatar: "https://i.pravatar.cc/150?img=68", verified: true,
      time: "1:16 PM · Aug 8, 2024", likes: "43", replies: "2",
      textNode: (
        <>
          I get uncharacteristically excited about group Zoom meetings now<br/><br/>Why? Because the payoff is seeing <span className="text-[#1D9BF0] hover:underline cursor-pointer">@meetLoop</span> really work its magic and generate incredible meeting notes seconds after we adjourn
        </>
      )
    },
    {
      id: 4,
      column: 1,
      name: "Dan Shipper", handle: "@danshipper", avatar: "https://i.pravatar.cc/150?img=59", verified: true,
      time: "9:03 PM · Jan 3, 2024", likes: "26", replies: "4",
      textNode: (
        <>
          If you aren't using <span className="text-[#1D9BF0] hover:underline cursor-pointer">@meetLoop</span> for your meetings you are seriously missing out.<br/><br/>Incredible product.
        </>
      )
    },
    {
      id: 5,
      column: 2,
      name: "Guillermo Rauch", handle: "@rauchg", avatar: "https://i.pravatar.cc/150?img=15", verified: true,
      time: "9:14 PM · Jan 8, 2025", likes: "1.6K", replies: "67",
      textNode: (
        <>
          It's actually unbelievable how good <span className="text-[#1D9BF0] hover:underline cursor-pointer">Loop.ai</span> is.<br/><br/>It replaces writing documents. It's the killer user research tool. The ability to "chat with the transcript" to come back to a point that was made is pure gold. There's no going back to pre Loop days.
        </>
      )
    },
    {
      id: 6,
      column: 2,
      name: "Alex Cohen", handle: "@anothercohen", avatar: "https://i.pravatar.cc/150?img=60", verified: true,
      time: "1:09 AM · Mar 22, 2025", likes: "630", replies: "32",
      textNode: (
        <>
          The two AI tools I use most often right now:<br/>- <span className="text-[#1D9BF0] hover:underline cursor-pointer">Loop.ai</span><br/>- <span className="text-[#1D9BF0] hover:underline cursor-pointer">Howie.com</span><br/><br/>Both are 10/10.<br/><br/>Loop has solved meeting notes for me and Howie has saved me dozens of hours of scheduling headaches
        </>
      )
    },
    {
      id: 7,
      column: 2,
      name: "MDS", handle: "@mds", avatar: "https://i.pravatar.cc/150?img=51", verified: true,
      time: "5:34 PM · Sep 19, 2024", likes: "22", replies: "7",
      textNode: (
        <>
          I love Loop (the AI note taking app)
        </>
      )
    },
    {
      id: 8,
      column: 2,
      name: "Steven Tey", handle: "@steventey", avatar: "https://i.pravatar.cc/150?img=12", verified: true,
      time: "4:55 AM · Sep 16, 2024", likes: "4", replies: "Read more on X",
      textNode: (
        <>
          Bullish on <span className="text-[#1D9BF0] hover:underline cursor-pointer">@meetLoop</span> — no more "AI notetaker" needed <span className="text-[#1D9BF0] hover:underline cursor-pointer">Loop.so</span>
        </>
      )
    },
    {
      id: 9,
      column: 3,
      name: "Des Traynor", handle: "@destraynor", avatar: "https://i.pravatar.cc/150?img=3", verified: true,
      time: "9:34 PM · Apr 3, 2025", likes: "363", replies: "15",
      textNode: (
        <>
          I don't think I've ever gotten more thanks from people recommending an app than I have for <span className="text-[#1D9BF0] hover:underline cursor-pointer">@meetLoop</span>.<br/><br/>Everyone thinks they have a good meeting notes app, but it's only once they use Loop they realise what they've been missing.
        </>
      )
    },
    {
      id: 10,
      column: 3,
      name: "Nichole Wischoff", handle: "@NWischoff", avatar: "https://i.pravatar.cc/150?img=47", verified: true,
      time: "6:41 PM · Nov 12, 2024", likes: "308", replies: "41",
      textNode: (
        <>
          Just used Loop AI for the first time to take notes for me. Totally insane product. Highly recommend. Not an investor sadly.
        </>
      )
    },
    {
      id: 11,
      column: 3,
      name: "Deedy", handle: "@deedy", avatar: "https://i.pravatar.cc/150?img=53", verified: true,
      time: "5:00 PM · Dec 15, 2024", likes: "992", replies: "37",
      hasImage: true,
      textNode: (
        <>
          Loop is one of the best made "AI" apps that I've used this year.<br/><br/>If you are in a lot of meetings, this is a gamechanger. It takes notes in all those meetings for you, so you only need to add what's in your head.<br/><br/>It's minimal, fast, with no setup. It. just. works.
        </>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9F8F4] font-sans selection:bg-[#BAC66E] selection:text-black py-24 px-6">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-[56px] font-serif text-[#1A1A1A] leading-[1.1] font-medium tracking-tight">
          Built for people with<br/>back-to-back meetings
        </h2>
      </div>

      {/* Masonry Grid Layout */}
      <div className="max-w-[1100px] mx-auto columns-1 md:columns-2 lg:columns-3 gap-6">
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} {...tweet} />
        ))}
      </div>

    </div>
  );
}