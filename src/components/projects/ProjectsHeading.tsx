'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export default function ProjectsHeading() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReduced = useReducedMotion();

  return (
    <div ref={ref} className="px-4 pb-8 md:px-12 md:pb-12 lg:px-24 lg:pb-16 max-w-7xl mx-auto">
      <motion.p
        className="text-sm uppercase tracking-widest text-white/40 mb-3"
        initial={prefersReduced ? false : { opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
      >
        Selected work
      </motion.p>
      <motion.h2
        className="font-dharma text-7xl md:text-9xl lg:text-[10rem] leading-[0.85] italic text-white"
        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.08 }}
      >
        Projects
      </motion.h2>
    </div>
  );
}
