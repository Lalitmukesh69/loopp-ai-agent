import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import CTASection from '@/components/common/CTASection';

/* ═══ FAQ Data ═══ */
const faqItems = [
  { q: 'How quickly can I expect a response?', a: 'We typically respond within 4 business hours for general inquiries. Enterprise and sales requests are prioritized and usually get a response within 1-2 hours during business hours.' },
  { q: 'Do you offer product demos?', a: 'Absolutely! We offer personalized demos for teams of all sizes. Book a time through our sales form above and we\'ll walk you through everything Loop can do for your team.' },
  { q: 'I\'m having a technical issue — where should I go?', a: 'For technical support, select "Technical Support" in the contact form above. If you\'re an Enterprise customer, you have access to our priority support channel for faster resolution.' },
  { q: 'Can I talk to someone about Enterprise plans?', a: 'Yes! Select "Sales" as the topic in our contact form, or email us directly at enterprise@loop.io. Our team will set up a call to discuss your organization\'s specific needs.' },
  { q: 'Where are your offices located?', a: 'We\'re headquartered in San Francisco with a growing team across Bareilly, London, and remote locations worldwide. We love meeting customers in person when possible!' },
];

/* ═══ Topic Options ═══ */
const TOPICS = [
  { value: 'general', label: 'General Inquiry', icon: 'chat_bubble' },
  { value: 'sales', label: 'Sales', icon: 'trending_up' },
  { value: 'support', label: 'Technical Support', icon: 'build' },
  { value: 'enterprise', label: 'Enterprise', icon: 'apartment' },
  { value: 'press', label: 'Press & Media', icon: 'newspaper' },
  { value: 'partnerships', label: 'Partnerships', icon: 'handshake' },
];

/* ═══ Sub-Components ═══ */
function ChevronDown({ open }: { open: boolean }) {
  return (
    <motion.svg animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#888]">
      <path d="M6 9l6 6 6-6"/>
    </motion.svg>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e8e8e6]">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-6 text-left group">
        <span className="loop-serif text-[17px] md:text-[19px] text-[#1a1c1b] pr-8 group-hover:text-[#4b6319] transition-colors font-medium">{question}</span>
        <ChevronDown open={open} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
            <p className="text-[15px] text-[#6d6d6d] leading-[1.65] pb-6 max-w-[640px]">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══ Animated floating shapes for hero background ═══ */
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-[#4b6319]/[0.04]"
        style={{ top: '10%', right: '-5%' }}
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full bg-[#4b6319]/[0.03]"
        style={{ bottom: '5%', left: '-3%' }}
        animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute w-[150px] h-[150px] rounded-full bg-[#9aaa4a]/[0.05]"
        style={{ top: '40%', left: '15%' }}
        animate={{ y: [0, -12, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  );
}

/* ═══ Interactive Topic Card ═══ */
function TopicCard({ topic, selected, onClick }: { topic: typeof TOPICS[0]; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2, borderColor: '#c5d085' }}
      whileTap={{ scale: 0.97 }}
      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all text-left w-full ${
        selected
          ? 'bg-[#f0f4e8] border-[#4b6319]/30 shadow-sm'
          : 'bg-white border-[#e5e5e5] hover:bg-[#fafaf7]'
      }`}
    >
      <span className={`material-symbols-outlined text-[20px] ${selected ? 'text-[#4b6319]' : 'text-[#999]'}`}>
        {topic.icon}
      </span>
      <span className={`text-[14px] font-medium ${selected ? 'text-[#4b6319]' : 'text-[#555]'}`}>
        {topic.label}
      </span>
    </motion.button>
  );
}

/* ═══════════════════════════════ MAIN PAGE ═══════════════════════════════ */
export default function Contact() {
  const [selectedTopic, setSelectedTopic] = useState('general');
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset after 4s
    setTimeout(() => { setSubmitted(false); setFormData({ name: '', email: '', company: '', message: '' }); }, 4000);
  };

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
        .text-balance { text-wrap: balance; }
      `}</style>

      <div className="bg-[#fcfcf9] text-[#1a1c1b] font-body selection:bg-[#4b6319]/20 overflow-x-hidden min-h-screen">
        <Navbar />

        <main>
          {/* ═══ HERO SECTION ═══ */}
          <motion.section
            className="relative pt-36 md:pt-44 pb-16 md:pb-24 px-6 overflow-hidden"
            initial="hidden" animate="visible" variants={stagger}
          >
            <FloatingShapes />
            
            <div className="relative z-10 max-w-[1100px] mx-auto">
              {/* Hero text */}
              <motion.div variants={fadeUp} className="text-center mb-16">
                <div className="flex justify-center mb-5">
                  <div className="bg-[#f0f4e8] text-[#4b6319] px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-[#4b6319]/10">
                    <span className="material-symbols-outlined text-[14px]">mail</span>
                    Get in touch
                  </div>
                </div>
                <h1 className="loop-serif text-4xl md:text-[4.5rem] font-normal tracking-tight text-[#1a1c1b] max-w-3xl mx-auto leading-[1.05] mb-5 text-balance">
                  We'd love to <span className="newsreader-italic">hear</span> from you
                </h1>
                <p className="font-body text-lg md:text-[20px] text-[#6d6d6d] max-w-xl mx-auto font-light">
                  Whether you're curious about features, pricing, or anything else — our team is ready to answer your questions.
                </p>
              </motion.div>

              {/* ═══ INTERACTIVE FORM AREA ═══ */}
              <motion.div variants={fadeUp} ref={formRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                
                {/* Left: Topic Selector */}
                <div className="lg:col-span-4">
                  <h3 className="text-[13px] font-bold text-[#999] uppercase tracking-widest mb-4">What can we help with?</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                    {TOPICS.map((topic) => (
                      <TopicCard
                        key={topic.value}
                        topic={topic}
                        selected={selectedTopic === topic.value}
                        onClick={() => setSelectedTopic(topic.value)}
                      />
                    ))}
                  </div>

                  {/* Quick contact cards */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-[13.5px] text-[#777]">
                      <span className="material-symbols-outlined text-[18px] text-[#4b6319]">mail</span>
                      hello@loop.io
                    </div>
                    <div className="flex items-center gap-3 text-[13.5px] text-[#777]">
                      <span className="material-symbols-outlined text-[18px] text-[#4b6319]">schedule</span>
                      We respond within 4 hours
                    </div>
                  </div>
                </div>

                {/* Right: Contact Form */}
                <div className="lg:col-span-8">
                  <AnimatePresence mode="wait">
                    {!submitted ? (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleSubmit}
                        className="bg-white rounded-2xl border border-[#e5e5e5] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 md:p-8 space-y-5"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="material-symbols-outlined text-[18px] text-[#4b6319]">
                            {TOPICS.find(t => t.value === selectedTopic)?.icon}
                          </span>
                          <span className="text-[14px] font-semibold text-[#4b6319]">
                            {TOPICS.find(t => t.value === selectedTopic)?.label}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[12px] font-bold text-[#999] uppercase tracking-wider mb-1.5">Name</label>
                            <input
                              type="text" required
                              value={formData.name}
                              onChange={e => setFormData({...formData, name: e.target.value})}
                              className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#fafaf9] text-[14px] text-[#1a1c1b] focus:outline-none focus:border-[#4b6319]/40 focus:ring-2 focus:ring-[#4b6319]/10 transition-all placeholder:text-[#bbb]"
                              placeholder="Your name"
                            />
                          </div>
                          <div>
                            <label className="block text-[12px] font-bold text-[#999] uppercase tracking-wider mb-1.5">Email</label>
                            <input
                              type="email" required
                              value={formData.email}
                              onChange={e => setFormData({...formData, email: e.target.value})}
                              className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#fafaf9] text-[14px] text-[#1a1c1b] focus:outline-none focus:border-[#4b6319]/40 focus:ring-2 focus:ring-[#4b6319]/10 transition-all placeholder:text-[#bbb]"
                              placeholder="you@company.com"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[12px] font-bold text-[#999] uppercase tracking-wider mb-1.5">Company <span className="text-[#ccc] font-normal normal-case">(optional)</span></label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={e => setFormData({...formData, company: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#fafaf9] text-[14px] text-[#1a1c1b] focus:outline-none focus:border-[#4b6319]/40 focus:ring-2 focus:ring-[#4b6319]/10 transition-all placeholder:text-[#bbb]"
                            placeholder="Your company"
                          />
                        </div>

                        <div>
                          <label className="block text-[12px] font-bold text-[#999] uppercase tracking-wider mb-1.5">Message</label>
                          <textarea
                            required rows={5}
                            value={formData.message}
                            onChange={e => setFormData({...formData, message: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#fafaf9] text-[14px] text-[#1a1c1b] focus:outline-none focus:border-[#4b6319]/40 focus:ring-2 focus:ring-[#4b6319]/10 transition-all placeholder:text-[#bbb] resize-none"
                            placeholder="Tell us how we can help..."
                          />
                        </div>

                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full md:w-auto bg-[#4b6319] text-white px-8 py-3.5 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2.5 transition-all hover:bg-[#3d5014] shadow-sm"
                        >
                          Send Message
                          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </motion.button>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-white rounded-2xl border border-[#e5e5e5] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-10 md:p-16 text-center flex flex-col items-center justify-center min-h-[400px]"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                          className="w-16 h-16 rounded-full bg-[#f0f4e8] flex items-center justify-center mb-6"
                        >
                          <span className="material-symbols-outlined text-[32px] text-[#4b6319]">check_circle</span>
                        </motion.div>
                        <h3 className="loop-serif text-[28px] text-[#1a1c1b] mb-3">Message sent!</h3>
                        <p className="text-[15px] text-[#6d6d6d] max-w-sm">
                          Thanks for reaching out. We'll get back to you within 4 business hours.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.section>



          {/* ═══ FAQ ═══ */}
          <motion.section
            className="py-20 px-6 bg-[#fcfcf9]"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <div className="max-w-[700px] mx-auto">
              <h2 className="loop-serif text-[36px] md:text-[46px] text-center text-[#1a1c1b] mb-14 font-normal">
                Common Questions
              </h2>
              <div className="border-t border-[#e8e8e6]">
                {faqItems.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
              </div>
            </div>
          </motion.section>

          {/* ═══ CTA ═══ */}
          <CTASection />
        </main>

        <Footer />
      </div>
    </>
  );
}
