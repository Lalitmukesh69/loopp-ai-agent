import React, { useState, useEffect } from 'react';
import ChatNavbar from './chat/ChatNavbar';
import ChatHero from './chat/ChatHero';
import AskAwaySection from './chat/Ask Away Section';
import ChatFeatures from './chat/ChatFeatures';
import ChatContext from './chat/ChatContext';
import ChatLogos from './chat/ChatLogos';
import ChatDialogues from './chat/ChatDialogues';
import ChatTestimonials from './chat/ChatTestimonials';
import CTASection from './common/CTASection';
import Footer from './common/Footer';

export default function LoopChat() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
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
        .loop-serif { font-family: 'Raleway', sans-serif; letter-spacing: -0.01em; }
        .loop-watermark {
            font-family: 'Raleway', sans-serif;
            font-weight: 800;
            font-size: 20rem;
            color: #f1f1ef;
            letter-spacing: -0.05em;
            pointer-events: none;
        }

        /* Testimonials extracted styles */
        .tweet-card {
            background-color: #ffffff;
            border: 1px solid #ebeaeb;
            border-radius: 16px;
            padding: 22px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
            display: flex;
            flex-direction: column;
            gap: 16px;
            break-inside: avoid;
            margin-bottom: 24px;
            transition: all 0.3s ease;
        }
        .tweet-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
            border-color: #d8d8d2;
        }
        .tweet-avatar {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            overflow: hidden;
            background-color: #f5f5f5;
            flex-shrink: 0;
            cursor: pointer;
        }
        .tweet-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .tweet-name {
            font-size: 15px;
            font-weight: 700;
            color: #1a1c1b;
            display: flex;
            align-items: center;
            gap: 4px;
            line-height: 1.2;
            cursor: pointer;
        }
        .tweet-name:hover {
            text-decoration: underline;
        }
        .tweet-handle {
            font-size: 14px;
            color: #6d6d6d;
            margin-top: 2px;
        }
        .tweet-handle .follow-link {
            font-weight: 600;
            color: #1a1c1b;
            cursor: pointer;
            transition: color 0.2s;
        }
        .tweet-handle .follow-link:hover {
            color: #4b6319;
            text-decoration: underline;
        }
        .tweet-verified {
            width: 18px;
            height: 18px;
        }
        .tweet-body {
            font-size: 15px;
            color: #1a1c1b;
            line-height: 1.5;
            word-wrap: break-word;
        }
        .tweet-body .mention {
            color: #2b74b9;
            text-decoration: none;
            cursor: pointer;
        }
        .tweet-body .mention:hover {
            text-decoration: underline;
        }
        .tweet-timestamp {
            font-size: 14px;
            color: #6d6d6d;
            margin-top: 4px;
            cursor: pointer;
        }
        .tweet-timestamp:hover {
            text-decoration: underline;
        }
        .tweet-actions {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-top: 8px;
            padding-top: 16px;
            border-top: 1px solid #f0f0ea;
        }
        .tweet-action {
            display: flex;
            align-items: center;
            gap: 6px;
            color: #6d6d6d;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: color 0.2s;
        }
        .tweet-action:hover {
            color: #1a1c1b;
        }
        .tweet-action.heart:hover {
            color: #e0245e;
        }
        .tweet-action svg {
            width: 18px;
            height: 18px;
        }
        .tweet-close {
            color: #a0a09a;
            cursor: pointer;
            padding: 4px;
            border-radius: 50%;
            transition: background-color 0.2s, color 0.2s;
        }
        .tweet-close:hover {
            background-color: #f0f0ea;
            color: #1a1c1b;
        }
        .tweet-replies-link {
            color: #2b74b9;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            margin-top: -8px;
        }
        .tweet-replies-link:hover {
            text-decoration: underline;
        }
        .tweet-repost-label {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            color: #6d6d6d;
            font-weight: 600;
        }
        .tweet-embedded-img {
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid #e8e8e5;
            margin-top: 8px;
            cursor: pointer;
        }
        .read-more-x {
            background-color: #f5f5f0;
            color: #1a1c1b;
            font-weight: 600;
            font-size: 14px;
            text-align: center;
            padding: 10px;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }
        .read-more-x:hover {
            background-color: #ebebe5;
        }
      `}</style>

      <div className="bg-white text-[#1a1c1b] font-body selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden">
        <ChatNavbar scrolled={scrolled} />
        
        <main>
          <ChatHero />
          <AskAwaySection />
          <ChatFeatures />
          <ChatContext />
          <ChatLogos />
          <ChatDialogues />
          <ChatTestimonials />
          <CTASection />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
