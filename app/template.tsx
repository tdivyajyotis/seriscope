'use client';

import { motion, useReducedMotion } from 'motion/react';

export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .42, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
