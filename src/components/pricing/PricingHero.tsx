import React from 'react';
import { motion } from 'framer-motion';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } } };

export default function PricingHero() {
  return (
    <motion.section
      className="pt-36 pb-16 text-center px-6"
      initial="hidden" animate="visible" variants={stagger}
    >
      <motion.h1 variants={fadeUp} className="loop-serif text-4xl md:text-[4.5rem] font-normal tracking-tight text-[#1a1c1b] max-w-4xl mx-auto leading-[1.05] mb-6">
        Loop how you wanna
      </motion.h1>
      <motion.p variants={fadeUp} className="font-body text-lg md:text-xl text-[#1a1c1b]/50 max-w-2xl mx-auto">
        Get the Loop plan that's right for you and your team, so everyone can be on the same page.
      </motion.p>
    </motion.section>
  );
}
