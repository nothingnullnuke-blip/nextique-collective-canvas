import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { MagneticCard } from "./motion-primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

const TOPICS = [
  {
    name: "Technology",
    slug: "technology",
    accent: "var(--cat-technology)",
    blurb: "AI, frontier labs, the new tools of work.",
    count: 142,
  },
  {
    name: "Culture",
    slug: "culture",
    accent: "var(--cat-culture)",
    blurb: "Film, music, books, the slow currents of taste.",
    count: 98,
  },
  {
    name: "Finance",
    slug: "finance",
    accent: "var(--cat-finance)",
    blurb: "Capital, markets, and what private money is actually doing.",
    count: 76,
  },
  {
    name: "Science",
    slug: "science",
    accent: "var(--cat-science)",
    blurb: "Space, climate, the experiments that matter.",
    count: 54,
  },
  {
    name: "Wellness",
    slug: "wellness",
    accent: "var(--cat-wellness)",
    blurb: "Longevity and the evidence behind it.",
    count: 41,
  },
  {
    name: "Style",
    slug: "style",
    accent: "var(--cat-style)",
    blurb: "Architecture, fashion, design as authorship.",
    count: 63,
  },
  {
    name: "Digital Society",
    slug: "digital-society",
    accent: "var(--cat-society)",
    blurb: "The creator economy, AI ethics, and the social fabric.",
    count: 89,
  },
];

export function TopicShowcase() {
  return (
    <section className="container-editorial pt-24 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex items-end justify-between mb-12 hairline-b pb-6"
      >
        <div>
          <span className="eyebrow text-muted-foreground">Explore Topics</span>
          <h2 className="display-3 mt-3 text-foreground">Seven sections, one editorial voice</h2>
        </div>
      </motion.div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-border">
        {TOPICS.map((t, i) => (
          <motion.li
            key={t.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.04, ease: EASE }}
            className="bg-background"
          >
            <Link
              to="/topic/$slug"
              params={{ slug: t.slug }}
              className="group relative flex h-full flex-col justify-between p-8 transition-colors duration-300 hover:bg-surface"
              style={{ borderLeft: `2px solid ${t.accent}` } as React.CSSProperties}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="eyebrow" style={{ color: t.accent }}>
                    {t.name}
                  </span>
                  <span className="meta tabular-nums text-text-subtle">
                    {String(t.count).padStart(3, "0")}
                  </span>
                </div>
                <p className="mt-6 font-serif text-[20px] leading-snug text-foreground/90">
                  {t.blurb}
                </p>
              </div>
              <div className="mt-10 flex items-center justify-between">
                <span className="eyebrow text-foreground/60 group-hover:text-foreground transition-colors">
                  Enter section
                </span>
                <ArrowUpRight
                  className="size-4 text-foreground/40 transition-all duration-500 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </div>
            </Link>
          </motion.li>
        ))}

        {/* Eighth tile balances the 4-col grid — quiet CTA, not an orphan */}
        <motion.li
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: TOPICS.length * 0.04, ease: EASE }}
          className="bg-background hidden xl:block"
        >
          <a
            href="#"
            className="group relative flex h-full flex-col justify-between p-8 transition-colors duration-300 hover:bg-surface"
          >
            <div>
              <span className="eyebrow text-foreground/60">The Archive</span>
              <p className="mt-6 font-serif text-[20px] leading-snug text-foreground/85">
                Every Nextique story, indexed by year, issue, and section.
              </p>
            </div>
            <div className="mt-10 flex items-center justify-between">
              <span className="eyebrow text-foreground/60 group-hover:text-foreground transition-colors">
                Browse archive
              </span>
              <ArrowUpRight
                className="size-4 text-foreground/40 transition-all duration-500 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </div>
          </a>
        </motion.li>
      </ul>
    </section>
  );
}
