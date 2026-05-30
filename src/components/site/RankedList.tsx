import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const STORIES = [
  {
    title: "The compiler in your pocket: on-device models come of age",
    category: "Technology",
    accent: "var(--cat-technology)",
    read: "12 min",
  },
  {
    title: "What Berlin's quiet club revival tells us about late-night economies",
    category: "Culture",
    accent: "var(--cat-culture)",
    read: "9 min",
  },
  {
    title: "The middle class is buying volatility — and may not know it",
    category: "Finance",
    accent: "var(--cat-finance)",
    read: "14 min",
  },
  {
    title: "A new map of the deep sea, written by listening",
    category: "Science",
    accent: "var(--cat-science)",
    read: "16 min",
  },
  {
    title: "The slow craft revival no one is calling a revival",
    category: "Style",
    accent: "var(--cat-style)",
    read: "8 min",
  },
  {
    title: "Why algorithmic ranking is the new town planning",
    category: "Digital Society",
    accent: "var(--cat-society)",
    read: "11 min",
  },
];

export function RankedList() {
  return (
    <section className="container-editorial pt-24 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex items-end justify-between mb-10 hairline-b pb-6"
      >
        <div>
          <span className="eyebrow text-muted-foreground">Latest Stories</span>
          <h2 className="display-3 mt-3 text-foreground">This week's index</h2>
        </div>
        <span className="hidden md:inline meta">Updated Saturday, 30 May</span>
      </motion.div>

      <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-px bg-border">
        {STORIES.map((s, i) => (
          <motion.li
            key={s.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.05, ease: EASE }}
            className="bg-background"
          >
            <a
              href="#"
              className="group grid grid-cols-[auto_1fr] gap-x-8 py-8 transition-colors"
            >
              <span
                className="font-serif text-[40px] leading-none tabular-nums text-text-subtle group-hover:text-foreground/60 transition-colors duration-500 pt-1"
                style={{ ["--rank-accent" as string]: s.accent }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <span
                  className="eyebrow inline-block opacity-0 -translate-x-2 transition-all duration-400 group-hover:opacity-100 group-hover:translate-x-0"
                  style={{ color: s.accent }}
                >
                  {s.category}
                </span>
                <h3 className="font-serif text-[24px] md:text-[26px] leading-[1.18] tracking-tight mt-3 text-foreground transition-colors group-hover:text-foreground/90">
                  {s.title}
                </h3>
                <p className="meta mt-3">{s.read} read</p>
              </div>
            </a>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
