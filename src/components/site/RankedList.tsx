import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { allArticlesSorted, CATEGORIES } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

export function RankedList() {
  const stories = allArticlesSorted();

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
        <span className="hidden md:inline meta">Issue 001 · 30 May 2026</span>
      </motion.div>

      <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
        {stories.map((s, i) => {
          const cat = CATEGORIES[s.category];
          const accent = `var(${cat.accentVar})`;
          const isLast = i === stories.length - 1;
          return (
            <motion.li
              key={s.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.05, ease: EASE }}
              className="bg-background"
            >
              <Link
                to="/article/$slug"
                params={{ slug: s.slug }}
                className={`group grid grid-cols-[auto_1fr] gap-x-8 py-8 transition-colors ${isLast ? "pb-16" : ""}`}
              >
                <span className="font-serif text-[40px] leading-none tabular-nums text-text-subtle group-hover:text-foreground/60 transition-colors duration-500 pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <span className="eyebrow inline-block" style={{ color: accent }}>
                    {cat.name}
                  </span>
                  <h3 className="font-serif text-[24px] md:text-[26px] leading-[1.18] tracking-tight mt-3 text-foreground transition-colors group-hover:text-foreground/90">
                    {s.title}
                  </h3>
                  <p className="meta mt-3">{s.readTime} min read</p>
                </div>
              </Link>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
