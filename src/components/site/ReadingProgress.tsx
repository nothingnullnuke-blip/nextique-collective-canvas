import { motion, useScroll, useSpring } from "motion/react";

export function ReadingProgress({ accentVar = "--accent-gold" }: { accentVar?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left"
      style={{ scaleX, background: `var(${accentVar})` }}
    />
  );
}
