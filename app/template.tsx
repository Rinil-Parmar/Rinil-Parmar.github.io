"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Wraps every route; remounts on navigation for a subtle cross-page fade.
// Markup is identical on server and client (fixed `initial`); reduced motion
// only collapses the duration, so hydration stays intact.
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.28, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
