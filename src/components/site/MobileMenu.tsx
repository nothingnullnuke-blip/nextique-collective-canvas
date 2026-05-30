import { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const categories = Object.values(CATEGORIES);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={reduce ? { opacity: 0 } : { y: "-100%" }}
          animate={reduce ? { opacity: 1 } : { y: 0 }}
          exit={reduce ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: reduce ? 0.2 : 0.55, ease: EASE }}
          className="fixed inset-0 z-[90] bg-background flex flex-col md:hidden"
          style={{ backgroundColor: "#0A0A0A" }}
        >
          <div className="flex items-center justify-between h-16 px-5 hairline-b">
            <Link
              to="/"
              onClick={onClose}
              className="font-serif text-2xl tracking-tight text-foreground"
            >
              Nextique
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="eyebrow text-foreground/85 hover:text-foreground inline-flex items-center gap-2"
            >
              <span aria-hidden className="text-lg leading-none">×</span>
              <span>Close</span>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-10">
            <ul className="space-y-5">
              {categories.map((c, i) => (
                <motion.li
                  key={c.slug}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={{
                    duration: reduce ? 0.2 : 0.5,
                    delay: 0.15 + i * 0.04,
                    ease: EASE,
                  }}
                >
                  <Link
                    to="/topic/$slug"
                    params={{ slug: c.slug }}
                    onClick={onClose}
                    className="group flex items-baseline justify-between hairline-b py-3"
                  >
                    <span
                      className="font-serif text-[32px] leading-none text-foreground transition-colors"
                      style={{ ["--hover" as string]: `var(${c.accentVar})` }}
                    >
                      {c.name}
                    </span>
                    <span
                      className="eyebrow opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                      style={{ color: `var(${c.accentVar})` }}
                    >
                      Enter →
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="px-5 py-8 hairline-t flex flex-col gap-1">
            <p className="font-serif italic text-[15px] text-foreground/70">
              Think better. Read Nextique.
            </p>
            <p className="meta text-text-subtle">Issue 001 · Saturday, 30 May 2026</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
