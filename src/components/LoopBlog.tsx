import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import CTASection from './common/CTASection';

const MOCK_AVATARS = {
  sam: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
  rachel: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
  alex: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
};

const CATEGORIES = {
  Product: { color: 'bg-[#ec6a5e]' },
  Company: { color: 'bg-[#61c554]' },
  Guide: { color: 'bg-[#3b82f6]' },
  Community: { color: 'bg-[#f4bf4f]' },
};

const ARTICLES = [
  {
    id: 1,
    category: 'Product',
    title: "The notepad: Why we're rethinking the AI meeting tool",
    date: "Oct 22, 2024",
    authorName: "Sam",
    authorAvatar: MOCK_AVATARS.sam,
  },
  {
    id: 2,
    category: 'Company',
    title: "Announcing Loop Enterprise",
    date: "Oct 1, 2024",
    authorName: "Rachel",
    authorAvatar: MOCK_AVATARS.rachel,
  },
  {
    id: 3,
    category: 'Guide',
    title: "Meeting anxiety: Why it happens and how to overcome it",
    date: "Sep 18, 2024",
    authorName: "Sam",
    authorAvatar: MOCK_AVATARS.sam,
  },
  {
    id: 4,
    category: 'Product',
    title: "Loop vs. Fireflies: Why context is everything",
    date: "Aug 30, 2024",
    authorName: "Alex",
    authorAvatar: MOCK_AVATARS.alex,
  },
  {
    id: 5,
    category: 'Guide',
    title: "The Loop Guide to Better 1:1s",
    date: "Aug 15, 2024",
    authorName: "Rachel",
    authorAvatar: MOCK_AVATARS.rachel,
  },
  {
    id: 6,
    category: 'Community',
    title: "How to use Loop for user research",
    date: "Jul 28, 2024",
    authorName: "Sam",
    authorAvatar: MOCK_AVATARS.sam,
  },
  {
    id: 7,
    category: 'Product',
    title: "Loop vs. Otter.ai: Which is right for you?",
    date: "Jul 12, 2024",
    authorName: "Alex",
    authorAvatar: MOCK_AVATARS.alex,
  },
  {
    id: 8,
    category: 'Guide',
    title: "The Loop Guide to Better Discovery Calls",
    date: "Jun 24, 2024",
    authorName: "Rachel",
    authorAvatar: MOCK_AVATARS.rachel,
  },
  {
    id: 9,
    category: 'Guide',
    title: "How to run the perfect product review",
    date: "Jun 10, 2024",
    authorName: "Sam",
    authorAvatar: MOCK_AVATARS.sam,
  },
  {
    id: 10,
    category: 'Guide',
    title: "The Loop Guide to Better Hiring",
    date: "May 22, 2024",
    authorName: "Rachel",
    authorAvatar: MOCK_AVATARS.rachel,
  },
  {
    id: 11,
    category: 'Product',
    title: "Loop is now available on Windows",
    date: "May 8, 2024",
    authorName: "Alex",
    authorAvatar: MOCK_AVATARS.alex,
  },
  {
    id: 12,
    category: 'Guide',
    title: "The Loop Guide to Better Standups",
    date: "Apr 15, 2024",
    authorName: "Sam",
    authorAvatar: MOCK_AVATARS.sam,
  },
  {
    id: 13,
    category: 'Product',
    title: "Loop vs. Fathom: A deep dive",
    date: "Mar 30, 2024",
    authorName: "Rachel",
    authorAvatar: MOCK_AVATARS.rachel,
  },
  {
    id: 14,
    category: 'Guide',
    title: "The Loop Guide to Better Retrospectives",
    date: "Mar 12, 2024",
    authorName: "Alex",
    authorAvatar: MOCK_AVATARS.alex,
  },
  {
    id: 15,
    category: 'Product',
    title: "Introducing Loop's new sharing features",
    date: "Feb 28, 2024",
    authorName: "Sam",
    authorAvatar: MOCK_AVATARS.sam,
  }
];

export default function LoopBlog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const megaMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFeaturesEnter = () => {
    if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
    setMegaMenuOpen(true);
  };
  const handleFeaturesLeave = () => {
    megaMenuTimeout.current = setTimeout(() => setMegaMenuOpen(false), 250);
  };
  const handleMenuEnter = () => {
    if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
  };
  const handleMenuLeave = () => {
    megaMenuTimeout.current = setTimeout(() => setMegaMenuOpen(false), 250);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .text-balance { text-wrap: balance; }
        .bg-dots { background-image: radial-gradient(#4b6319 0.5px, transparent 0.5px); background-size: 14px 14px; }
        .newsreader-italic { font-family: 'Raleway', sans-serif; font-style: italic; }
        .loop-watermark {
            font-family: 'Raleway', sans-serif;
            font-weight: 800;
            font-size: 20rem;
            color: #f1f1ef;
            letter-spacing: -0.05em;
            pointer-events: none;
        }
        .loop-serif {
            font-family: 'Raleway', sans-serif;
            letter-spacing: -0.01em;
        }
      `}</style>
      <div className="bg-[#fcfcfc] text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
        <Navbar />
        <main className="max-w-[1000px] mx-auto w-full pt-44 pb-32 px-6">
          {/* Header */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <h1 className="loop-serif text-5xl md:text-[4.5rem] font-medium tracking-tight text-[#1a1c1b] leading-[1.05] mb-5">
              Blog
            </h1>
            <p className="font-body text-[19px] text-[#81807d] font-medium">Thoughts, stories and ideas from the team at Loop.</p>
          </motion.section>

          {/* Filters */}
          <section className="mb-4">
            <div className="flex items-center gap-7 overflow-x-auto no-scrollbar border-b border-[#e5e5e5] pb-[13px] md:pb-[15px]">
              {['All', 'Product', 'Guide', 'Company', 'Community'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCategory(tab)}
                  className={`text-[14.5px] relative whitespace-nowrap transition-colors ${
                    activeCategory === tab ? 'font-semibold text-[#1a1c1b]' : 'font-medium text-[#81807d] hover:text-[#1a1c1b]'
                  }`}
                >
                  {tab}
                  {activeCategory === tab && (
                    <motion.div layoutId="activeTab" className="absolute -bottom-[14px] md:-bottom-[16px] left-0 right-0 h-[2px] bg-[#1a1c1b]" />
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* List Layout */}
          <section className="mb-32">
            <div>
              {(activeCategory === 'All' ? ARTICLES : ARTICLES.filter(a => a.category === activeCategory)).map((article, idx) => (
                <motion.a
                  href="#"
                  key={article.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.4, delay: (idx % 5) * 0.05 }}
                  className="group flex flex-col md:flex-row items-start md:items-center py-7 md:py-8 border-b border-[#e5e5e5] transition-colors cursor-pointer block"
                >
                  {/* Category */}
                  <div className="w-full md:w-[180px] shrink-0 flex items-center gap-3 mb-3 md:mb-0">
                    <div className={`w-2 h-2 rounded-full ${(CATEGORIES as any)[article.category]?.color || 'bg-gray-400'}`} />
                    <span className="text-[14px] font-medium text-[#81807d] group-hover:text-[#1a1c1b] transition-colors">
                      {article.category}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="flex-1 pr-4 md:pr-12 mb-5 md:mb-0">
                    <h2 className="loop-serif text-[24px] md:text-[27px] font-medium leading-[1.2] text-[#1a1c1b] group-hover:text-[#4b6319] transition-colors">
                      {article.title}
                    </h2>
                  </div>

                  {/* Author & Date */}
                  <div className="w-full md:w-[220px] shrink-0 flex items-center justify-between md:justify-end md:gap-6 mt-1 md:mt-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-[#e5e5e5] bg-gray-100 hidden md:block group-hover:border-[#d0d0d0] transition-colors">
                        <img src={article.authorAvatar} alt={article.authorName} className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-300" />
                      </div>
                      <span className="text-[13px] font-semibold text-[#1a1c1b]">{article.authorName}</span>
                    </div>
                    <div className="text-[13px] text-[#81807d] font-medium whitespace-nowrap">
                      {article.date}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </section>

          <CTASection />
        </main>

        <Footer />
      </div>
    </>
  );
}
