import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CTASection from './common/CTASection';
import Footer from './common/Footer';

/* ───── Data ───── */
const enterpriseFeatures = [
  { text: 'Enterprise-grade security & admin controls', info: false },
  { text: 'Single sign-on (SSO)', info: true, tooltip: 'SAML 2.0 and OpenID Connect support.' },
  { text: 'Priority support and usage analytics', info: false },
  { text: 'Enterprise API access', info: false },
  { text: 'Org-wide auto-deletion periods', info: false },
  { text: 'Admin controls for sharing & API access', info: false },
  { text: 'Opt out of model training for everyone in your team', info: true, tooltip: 'All users are opted out by default.' },
  { text: 'Org-wide notification that Loop is being used', info: false, badge: 'PILOT' },
];

const faqData = [
  { q: "What's included in Enterprise?", a: "Enterprise includes everything in Business plus advanced security features like SSO, org-wide admin controls, priority support, enterprise API access, and the ability to enforce data policies across your entire organization." },
  { q: "How does Enterprise pricing work?", a: "Enterprise is priced per user per month. We offer custom agreements and volume discounts based on the scale and specific needs of your organization. Speak to our sales team for details." },
  { q: "Do you train on my data?", a: "No, we do not train models on your data by default. Enterprise customers can enforce this opt-out across their entire organization, ensuring no team member's data is ever used for training." },
  { q: "Do you have SOC2 certification?", a: "Yes, Loop is SOC 2 Type II compliant and we maintain rigorous security standards to protect your organization's data at every level." },
  { q: "What authentication methods do you support?", a: "We support standard email/password authentication as well as Single Sign-On (SSO) exclusively on our Enterprise plan." },
  { q: "How do I set up SSO?", a: "SSO setup is simple. Once on the Enterprise plan, an admin can configure the SAML integration from the workspace settings by providing your Identity Provider metadata." },
  { q: "What SSO providers do you support?", a: "We support SAML 2.0 and OpenID Connect, which means compatibility with Okta, Azure Active Directory, Google Workspace, OneLogin, PingFederate, and most other enterprise identity providers." },
  { q: "How do you notify other participants that Loop is being used?", a: "Enterprise customers on the Pilot program can enable an org-wide notification that informs meeting participants when Loop is active. This ensures transparency and builds trust." },
];

const tweetsData = [
  { name: 'Nat Friedman', handle: '@natfriedman', avatar: 'https://avatars.githubusercontent.com/nat', verified: true, date: '1:15 PM · Jun 20, 2024', text: 'Been using <span class="mention">loop.io</span> a bit lately: it generates the best meeting notes of anything I\'ve tried so far. Not sure how they did that.', likes: 558, replies: 25 },
  { name: 'Soleio', handle: '@soleio', avatar: 'https://avatars.githubusercontent.com/soleio', verified: false, date: '1:36 PM · Aug 8, 2024', text: 'I get uncharacteristically excited about group Zoom meetings now<br/><br/>Why? Because the payoff is seeing <span class="mention">@meetloop</span> really work its magic and generate incredible meeting notes seconds after we adjourn', likes: 43, replies: 2 },
  { name: 'Des Traynor', handle: '@destraynor', avatar: 'https://avatars.githubusercontent.com/destraynor', verified: true, date: '9:10 PM · Apr 3, 2025', text: 'I don\'t think I\'ve ever gotten more thanks from people recommending an app than I have for <span class="mention">@meetloop</span>.<br/><br/>Everyone thinks they have a good meeting notes app, but it\'s only once they use Loop they realise what they\'ve been missing.', likes: 364, replies: 14 },
  { name: 'Amjad Masad', handle: '@amasad', avatar: 'https://avatars.githubusercontent.com/amasad', verified: true, date: '11:02 AM · Feb 14, 2025', text: 'The Loop team fundamentally understands how to build AI tools that feel like magical extensions of your brain rather than clunky co-pilots.', likes: '1,024', replies: 89 },
  { name: 'Linus Lee', handle: '@thesephist', avatar: 'https://avatars.githubusercontent.com/thesephist', verified: false, date: '2:45 PM · Oct 12, 2024', text: 'Loop is one of those rare tools that immediately became invisible infrastructure for my work.', likes: 215, replies: 9 },
  { name: 'Siqi Chen', handle: '@blader', avatar: 'https://avatars.githubusercontent.com/blader', verified: true, date: '6:30 PM · Jan 5, 2025', text: 'Every time I think I don\'t need Loop because I can just transcribe in Zoom and ask ChatGPT... I use Loop again and it\'s 100x better. It\'s not just a transcription wrapper.', likes: 892, replies: 41 },
];

/* ───── sub-components ───── */
function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17l-5-5" stroke="#7e9e30" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function InfoTooltip({ text }: { text?: string }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-flex ml-1 shrink-0" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="#a3a3a3" className="cursor-help transition-colors hover:fill-[#8f8f8f]">
        <circle cx="12" cy="12" r="12" fill="currentColor"/>
        <path d="M12 16.5v-4.5M12 8.5h.01" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
      </svg>
      <AnimatePresence>
        {show && text && (
          <motion.div
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[260px] bg-[#1a1c1b] text-white text-[12.5px] leading-[1.5] px-3.5 py-2.5 rounded-lg shadow-lg z-50 pointer-events-none"
          >
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-[#1a1c1b]"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <motion.svg animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#888]">
      <path d="M6 9l6 6 6-6"/>
    </motion.svg>
  );
}

function WindowsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.801"/>
    </svg>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e8e8e6]">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-6 text-left group">
        <span className="loop-serif text-[18px] md:text-[20px] text-[#1a1c1b] pr-8 group-hover:text-[#4b6319] transition-colors font-medium">{question}</span>
        <ChevronDown open={open} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
            <p className="text-[16px] text-[#6d6d6d] leading-[1.65] pb-6 max-w-[680px]">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════ MAIN ═══════════════════════════════════════ */
export default function LoopEnterprise() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const megaMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFeaturesEnter = () => { if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current); setMegaMenuOpen(true); };
  const handleFeaturesLeave = () => { megaMenuTimeout.current = setTimeout(() => setMegaMenuOpen(false), 250); };
  const handleMenuEnter = () => { if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current); };
  const handleMenuLeave = () => { megaMenuTimeout.current = setTimeout(() => setMegaMenuOpen(false), 250); };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current); };
  }, []);

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } } };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .newsreader-italic { font-family: 'Raleway', sans-serif; font-style: italic; }
        .loop-serif { font-family: 'Raleway', sans-serif; letter-spacing: -0.01em; }
        .loop-watermark { font-family: 'Raleway', sans-serif; font-weight: 800; font-size: 20rem; color: #f1f1ef; letter-spacing: -0.05em; pointer-events: none; }
        .tweets-masonry { columns: 3; column-gap: 16px; }
        @media (max-width: 900px) { .tweets-masonry { columns: 2; } }
        @media (max-width: 600px) { .tweets-masonry { columns: 1; } }
        .tweet-card { break-inside: avoid; margin-bottom: 16px; background: #fff; border: 1px solid #e5e5e5; border-radius: 16px; padding: 20px; transition: box-shadow 0.2s ease, border-color 0.2s ease; cursor: default; }
        .tweet-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.06); border-color: #d0d0d0; }
        .tweet-avatar { width: 44px; height: 44px; border-radius: 50%; background: #e8e8e8; flex-shrink: 0; overflow: hidden; }
        .tweet-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .tweet-name { font-weight: 700; font-size: 15px; color: #0f1419; display: flex; align-items: center; gap: 3px; line-height: 1.2; }
        .tweet-verified { width: 18px; height: 18px; flex-shrink: 0; }
        .tweet-handle { font-size: 13px; color: #536471; line-height: 1.2; }
        .tweet-handle .follow-link { color: #1d9bf0; cursor: pointer; font-weight: 500; }
        .tweet-handle .follow-link:hover { text-decoration: underline; }
        .tweet-body { font-size: 15px; color: #0f1419; line-height: 1.45; margin-top: 12px; word-break: break-word; }
        .tweet-body .mention { color: #1d9bf0; cursor: pointer; }
        .tweet-body .mention:hover { text-decoration: underline; }
        .tweet-timestamp { font-size: 13px; color: #536471; margin-top: 12px; }
        .tweet-actions { display: flex; align-items: center; gap: 0; margin-top: 12px; border-top: 1px solid #eff3f4; padding-top: 12px; }
        .tweet-action { display: flex; align-items: center; gap: 5px; font-size: 13px; color: #536471; cursor: pointer; padding: 4px 12px 4px 0; border-radius: 9999px; transition: color 0.15s; white-space: nowrap; }
        .tweet-action:hover { color: #1d9bf0; }
        .tweet-action.heart:hover { color: #f91880; }
        .tweet-action svg { width: 18px; height: 18px; flex-shrink: 0; }
        .tweet-replies-link { display: inline-block; font-size: 13px; color: #1d9bf0; cursor: pointer; margin-top: 8px; font-weight: 400; }
        .tweet-replies-link:hover { text-decoration: underline; }
      `}</style>

      <div className="bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden min-h-screen">
        {/* ═══ NAVBAR ═══ */}
        <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4 pointer-events-none">
          <motion.nav initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }} className="pointer-events-auto relative bg-white border border-[#e5e5e5] shadow-sm rounded-full p-1.5 pl-5 flex items-center justify-between w-full max-w-[700px]" onMouseLeave={handleFeaturesLeave}>
            <a href="/" className="flex items-center gap-2 shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1a1c1b]"><path d="M12 2A10 10 0 1 0 22 12"></path><path d="M12 6A6 6 0 1 0 18 12"></path><circle cx="12" cy="12" r="2" fill="currentColor"></circle></svg>
              <div className="text-[21px] font-bold tracking-tight text-[#1a1c1b]">loop</div>
            </a>
            <div className="hidden md:flex items-center gap-7">
              <div className="relative" onMouseEnter={handleFeaturesEnter}>
                <a className={`text-[15px] font-medium transition-all duration-200 cursor-pointer select-none inline-block px-3.5 py-1 rounded-full ${megaMenuOpen ? 'text-[#1a1c1b] bg-[#f3f3f1]' : 'text-[#1a1c1b]/60 hover:text-[#1a1c1b] bg-transparent'}`} href="/">Features</a>
              </div>
              <a className="text-[15px] font-semibold text-[#1a1c1b] transition-colors" href="/pricing">Pricing</a>
              <a className="text-[15px] font-medium text-[#1a1c1b]/60 hover:text-[#1a1c1b] transition-colors" href="/blog">Blog</a>
              <a className="text-[15px] font-medium text-[#1a1c1b]/60 hover:text-[#1a1c1b] transition-colors" href="#">Careers</a>
            </div>
            <motion.button onClick={() => window.location.href = '/auth'} animate={{ backgroundColor: scrolled ? '#4b6319' : '#ffffff', color: scrolled ? '#ffffff' : '#1a1c1b', borderColor: scrolled ? '#4b6319' : '#e5e5e5' }} transition={{ duration: 0.35, ease: 'easeInOut' }} className="border px-4 py-2 rounded-full font-medium text-[15px] flex items-center gap-2.5 shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:opacity-90 active:scale-[0.97] transition-[opacity,transform]">
              Try Loop
            </motion.button>
            <AnimatePresence>
              {megaMenuOpen && (
                <motion.div initial={{ opacity: 0, y: -8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.98 }} transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-2xl border border-[#e8e8e6] shadow-[0_16px_48px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.03)] z-50 overflow-hidden" onMouseEnter={handleMenuEnter} onMouseLeave={handleMenuLeave}>
                  <div className="flex">
                    <div className="flex-1 py-4 px-3">
                      <motion.a href="/" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03, duration: 0.28, ease: [0.16, 1, 0.3, 1] }} className="group flex items-start gap-3.5 px-3.5 py-3 rounded-xl transition-all duration-200 hover:bg-[#f7f7f5]">
                        <div className="w-[46px] h-[38px] rounded-lg bg-[#f0efe8] flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-105 overflow-hidden"><svg width="30" height="22" viewBox="0 0 30 22" fill="none"><rect x="1" y="1" width="28" height="20" rx="3" fill="#e8e5d0" /><rect x="1" y="1" width="28" height="7" rx="3" fill="#c8c88c" /><line x1="5" y1="12" x2="20" y2="12" stroke="#a0a060" strokeWidth="1.2" strokeLinecap="round"/><line x1="5" y1="15" x2="16" y2="15" stroke="#a0a060" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/></svg></div>
                        <div className="min-w-0 pt-0.5"><div className="text-[15px] font-semibold text-[#1a1c1b] mb-0.5 group-hover:text-[#4b6319] transition-colors leading-none">Notepad</div><div className="text-[13.5px] text-[#6d6d6d] leading-[1.35] font-normal">The AI notepad for people<br/>in back-to-back meetings</div></div>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        </div>

        <main>
          {/* ═══ HERO ═══ */}
          <motion.section className="pt-40 pb-20 text-center px-6" initial="hidden" animate="visible" variants={stagger}>
            <motion.h1 variants={fadeUp} className="loop-serif text-5xl md:text-[5.5rem] font-normal tracking-tight text-[#1a1c1b] max-w-4xl mx-auto leading-[1.05] mb-5">
              Loop Enterprise
            </motion.h1>
            <motion.p variants={fadeUp} className="font-body text-lg md:text-[21px] text-[#6d6d6d] max-w-2xl mx-auto font-light mb-16">
              Advanced controls for companies with higher compliance requirements
            </motion.p>

            <motion.div variants={fadeUp} className="max-w-[1020px] mx-auto bg-white border border-[#e5e5e5] rounded-[14px] p-8 md:p-[50px] md:px-[60px] text-left flex flex-col md:flex-row gap-8 md:gap-16 mt-12 mb-10">
              <div className="md:w-[45%] flex flex-col items-start pt-2">
                <h3 className="loop-serif text-[32px] md:text-[34px] text-[#1a1c1b] mb-5 font-normal">Enterprise</h3>
                <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1 mb-7">
                  <span className="loop-serif text-[36px] md:text-[38px] text-[#1a1c1b] tracking-tight font-normal whitespace-nowrap">Custom pricing</span>
                </div>
                <button className="bg-[#587109] text-white px-7 py-3 rounded-full font-bold text-[15px] transition-all hover:bg-[#4a5c07] hover:scale-105 active:scale-95 text-center min-w-[140px]">
                  Talk to us
                </button>
              </div>
              <div className="md:w-[55%] pt-6 md:pt-0 flex flex-col justify-center">
                <div className="space-y-[15px]">
                  {enterpriseFeatures.map((f, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 + 0.3, duration: 0.3 }} className="flex items-center gap-4">
                      <div className="shrink-0 bg-[#eff2e5] rounded-full p-1.5 flex items-center justify-center"><CheckIcon /></div>
                      <span className="font-body text-[16px] text-[#3a3a3a] leading-none inline-flex items-center flex-wrap">
                        {f.text}
                        {f.info && <InfoTooltip text={f.tooltip} />}
                        {f.badge && <span className="ml-2 inline-block text-[10px] font-bold uppercase tracking-widest bg-[#e8eee1] text-[#687352] px-2 py-0.5 rounded leading-none align-middle" style={{ marginTop: '-2px' }}>{f.badge}</span>}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* ═══ TESTIMONIAL 1 ═══ */}
          <motion.section className="py-20 px-6 bg-white" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="max-w-[800px] mx-auto text-center">
              <p className="loop-serif text-[26px] md:text-[32px] leading-[1.35] text-[#1a1c1b] mb-12 italic">
                "It's actually unbelievable how good Loop is. It replaces writing documents and is a killer user research tool. Being able to 'chat' with a transcript and come back to a point that was made is pure gold. There's no going back to pre-Loop days."
              </p>
              <div className="flex flex-col items-center justify-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 shrink-0">
                  <img src="https://avatars.githubusercontent.com/rauchg" alt="Guillermo Rauch" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-bold text-[16px] text-[#1a1c1b]">Guillermo Rauch</div>
                  <div className="text-[14px] text-[#6d6d6d]">Founder and CEO, Vercel</div>
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="bg-[#e8efd0] text-[#3d5014] px-7 py-3 rounded-full font-bold text-[14px] hover:bg-[#dde6c0] border border-[#d5debb] transition-all">
                Read the case study
              </motion.button>
            </div>
          </motion.section>

          {/* ═══ RESOURCES ═══ */}
          <motion.section className="py-20 px-6 bg-white" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <div className="max-w-[1000px] mx-auto">
              <motion.h2 variants={fadeUp} className="loop-serif text-[38px] md:text-[48px] text-center text-[#1a1c1b] mb-12 font-normal">Resources</motion.h2>
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  { 
                    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="#a4b445"><path d="M17 10h-1V7A5 5 0 007 7v3H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V12a2 2 0 00-2-2zM9 7a3 3 0 016 0v3H9V7z"/></svg>, 
                    title: 'Security', desc: 'How we secure your data & privacy' 
                  },
                  { 
                    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="#84addd"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5z"/></svg>, 
                    title: 'Policies', desc: 'Everything you need to know our terms' 
                  },
                  { 
                    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="#a390d4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>, 
                    title: 'Other FAQs', desc: 'All other questions you may have' 
                  },
                ].map((r, i) => (
                  <motion.a key={i} href="#" variants={fadeUp} whileHover={{ y: -4, borderColor: '#d0d0d0', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }} className="block bg-white border border-[#e5e5e5] rounded-xl px-7 py-7 transition-all">
                    <div className="mb-4 flex items-center">{r.icon}</div>
                    <h3 className="loop-serif text-[21px] font-normal text-[#1a1c1b] mb-1.5">{r.title}</h3>
                    <p className="font-body text-[14px] text-[#1a1c1b]/90 font-medium">{r.desc}</p>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ═══ FAQ ═══ */}
          <motion.section className="py-20 px-6 bg-white" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="max-w-[760px] mx-auto">
              <h2 className="loop-serif text-[42px] md:text-[52px] text-center text-[#1a1c1b] mb-16 font-normal">Frequently Asked Questions</h2>
              <div className="border-t border-[#e8e8e6]">
                {faqData.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
              </div>
            </div>
          </motion.section>

          {/* ═══ TWITTER PORTION ═══ */}
          <section className="pt-24 pb-32 bg-white px-6">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="loop-serif text-[42px] md:text-[52px] font-normal text-center mb-16">
              What people are saying about Loop
            </motion.h2>
            <div className="max-w-[1100px] mx-auto">
              <div className="tweets-masonry">
                {tweetsData.map((t, i) => (
                  <motion.div key={i} variants={fadeUp} className="tweet-card">
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <div className="tweet-avatar"><img src={t.avatar} alt={t.name} /></div>
                        <div>
                          <div className="tweet-name">{t.name} {t.verified && <svg className="tweet-verified" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="11" fill="#1d9bf0"/><path d="M9.5 14.25l-3.5-3.5 1.41-1.41L9.5 11.42l5.09-5.09L16 7.75l-6.5 6.5z" fill="#fff"/></svg>}</div>
                          <div className="tweet-handle">{t.handle} · <span className="follow-link">Follow</span></div>
                        </div>
                      </div>
                    </div>
                    <div className="tweet-body" dangerouslySetInnerHTML={{ __html: t.text }}></div>
                    <div className="tweet-timestamp">{t.date}</div>
                    <div className="tweet-actions">
                      <div className="tweet-action heart"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>{t.likes}</div>
                    </div>
                    <div className="tweet-replies-link">Read {t.replies} replies</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ TESTIMONIAL 2 ═══ */}
          <motion.section className="py-20 px-6 bg-white" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="max-w-[800px] mx-auto text-center">
              <p className="loop-serif text-[26px] md:text-[32px] leading-[1.35] text-[#1a1c1b] mb-12 italic">
                "As we rebuild Brex into an AI-native company, we need tools that move fast without ever compromising accuracy. Loop earned our trust by delivering precise, reliable summaries, and helped strengthen our written culture."
              </p>
              <div className="flex flex-col items-center justify-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 shrink-0">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150" alt="Pedro Franceschi" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-bold text-[16px] text-[#1a1c1b]">Pedro Franceschi</div>
                  <div className="text-[14px] text-[#6d6d6d]">Founder and CEO, Brex</div>
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="bg-[#e8efd0] text-[#3d5014] px-7 py-3 rounded-full font-bold text-[14px] hover:bg-[#dde6c0] border border-[#d5debb] transition-all">
                Read the case study
              </motion.button>
            </div>
          </motion.section>

          <CTASection />
        </main>

        <Footer />
      </div>
    </>
  );
}
