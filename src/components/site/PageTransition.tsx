import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduce = useReducedMotion();
  return (
    <main>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0 }}
          transition={{
            duration: reduce ? 0.2 : 0.42,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
