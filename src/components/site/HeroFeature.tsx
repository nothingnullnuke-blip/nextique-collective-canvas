import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import heroImage from "@/assets/hero-technology.jpg";

const HEADLINE = ["The quiet", "consolidation", "of intelligence."];
const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroFeature() {
  return (
    <section className="relative isolate min-h-[100svh] w-full overflow-hidden bg-background">
      {/* Background image */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
        className="absolute inset-0 -z-10"
      >
        <img
          src={heroImage}
          alt=""
          width={1920}
          height={1280}
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </motion.div>

      <div className="grain absolute inset-0 -z-10" aria-hidden />

      {/* Top-of-section meta strip */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
        className="absolute inset-x-0 top-16 z-10"
      >
        <div className="container-editorial pt-6 flex items-center justify-between">
          <span className="eyebrow text-foreground/70">
            Issue 001 · Saturday, 30 May 2026
          </span>
          <span className="hidden md:inline eyebrow text-foreground/50">
            The Cover Story
          </span>
        </div>
      </motion.div>

      {/* Hero content — anchored to bottom-left so the image breathes above */}
      <div className="container-editorial relative z-10 flex min-h-[100svh] flex-col pb-16 md:pb-20">
        <div className="mt-auto max-w-4xl pt-32">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-px w-10" style={{ background: "var(--cat-technology)" }} />
            <span className="eyebrow" style={{ color: "var(--cat-technology)" }}>
              Technology
            </span>
            <span className="eyebrow text-foreground/40">·</span>
            <span className="eyebrow text-foreground/60">The Long Read</span>
          </motion.div>

          <h1 className="display-1 text-foreground max-w-[18ch]">
            {HEADLINE.map((line, li) => (
              <span key={li} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.45 + li * 0.12, duration: 0.9, ease: EASE }}
                  className="inline-block will-change-transform"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7, ease: EASE }}
            className="mt-8 max-w-xl body-lg text-foreground/75"
          >
            Four labs now train the models the rest of the world rents.
            Inside the slow, expensive race to own the substrate of every
            future product — and the founders quietly building above it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.7, ease: EASE }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5"
          >
            <a href="#" className="group inline-flex items-center gap-3 text-foreground">
              <span className="eyebrow">Read the story</span>
              <span className="relative inline-flex size-10 items-center justify-center rounded-full border border-border-strong transition-colors duration-300 group-hover:border-foreground">
                <ArrowUpRight
                  className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </span>
            </a>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 meta">
              <span className="text-foreground/85">Words by Eliot Mercer</span>
              <span className="text-text-subtle">·</span>
              <span>Photography by Ren Aoki</span>
              <span className="text-text-subtle">·</span>
              <span>22 min read</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-8 right-6 md:right-10 hidden sm:flex flex-col items-center gap-3 text-foreground/50"
          aria-hidden
        >
          <span className="eyebrow [writing-mode:vertical-rl] rotate-180">Scroll</span>
          <motion.span
            animate={{ scaleY: [0.3, 1, 0.3] }}
            style={{ transformOrigin: "top" }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="block h-10 w-px bg-foreground/40"
          />
        </motion.div>
      </div>
    </section>
  );
}
