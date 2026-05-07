import React from 'react';
import { motion } from 'framer-motion';
import { PRICING_TESTIMONIAL_AVATAR } from '@/data/marketingImages';

export default function TestimonialQuote() {
  return (
    <motion.section
      className="py-20 px-6"
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
    >
      <div className="max-w-[760px] mx-auto text-center">
        <p className="loop-serif text-[22px] md:text-[26px] leading-[1.5] text-[#1a1c1b] font-medium italic mb-10">
          "As we rebuild IRM into an AI-native company, we need tools that move fast without ever compromising accuracy. Loop earned our trust by delivering precise, reliable summaries, and it's become an indispensable part of our workflow."
        </p>
        <div className="flex items-center justify-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
            <img src={PRICING_TESTIMONIAL_AVATAR} alt="Lalit Mukesh" className="w-full h-full object-cover" />
          </div>
          <div className="text-left">
            <div className="font-bold text-[15px] text-[#1a1c1b]">Lalit Mukesh</div>
            <div className="text-[13px] text-[#81807d]">Founder and CEO, IRM</div>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-[#e8efd0] text-[#1a1c1b] px-6 py-3 rounded-full font-semibold text-[14px] hover:bg-[#dde6c0] border border-[#d5debb] transition-all"
        >
          Read the case study
        </motion.button>
      </div>
    </motion.section>
  );
}
