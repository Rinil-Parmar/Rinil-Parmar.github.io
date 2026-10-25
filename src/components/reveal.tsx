"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// SSR-safe: markup is identical on server and client (both start at the same
// `initial`). Reduced-motion only collapses the animation duration, so the
// rendered DOM never diverges and hydration stays intact.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: reduce ? 0 : 0.5,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
