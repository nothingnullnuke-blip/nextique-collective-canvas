import { motion } from "motion/react";
import type { Article } from "@/lib/content";
import { AUTHORS, CATEGORIES } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ArticleHero({ article }: { article: Article }) {
  const cat = CATEGORIES[article.category];
  const author = AUTHORS[article.author];
  const accent = `var(${cat.accentVar})`;

  return (
    <header className="relative isolate w-full overflow-hidden bg-background">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <motion.img
          src={article.cover}
          alt=""
          initial={{ clipPath: "inset(0 100% 0 0)", scale: 1.06 }}
          animate={{ clipPath: "inset(0 0% 0 0)", scale: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="h-full w-full object-cover"
          width={1920}
          height={1080}
          loading="eager"
          fetchPriority="high"
        />
        {/* Dark gradient overlay bottom */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"
        />
        <div aria-hidden className="absolute inset-0 grain pointer-events-none" />
      </div>

      <div className="container-editorial relative -mt-[18vw] sm:-mt-[16vw] md:-mt-[14vw] pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
          className="max-w-4xl"
        >
          <span
            className="eyebrow inline-block"
            style={{ color: accent }}
          >
            {cat.name}
          </span>
          <h1 className="display-1 mt-5 text-foreground">
            {article.title}
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[22px] md:text-[24px] italic leading-snug text-foreground/80">
            {article.dek}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 meta">
            <span className="text-foreground/85">By {author.name}</span>
            <span className="text-text-subtle">·</span>
            <span>{article.publishedAt}</span>
            <span className="text-text-subtle">·</span>
            <span>{article.readTime} min read</span>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
