import { ARTICLES, type Article } from "@/lib/content";
import { rankRelated } from "@/lib/related";
import { CompactCard } from "./CompactCard";

export function RelatedArticles({ current }: { current?: Article }) {
  const picks = current ? rankRelated(current, ARTICLES, 3) : [];

  if (picks.length === 0) return null;

  return (
    <section className="container-editorial pb-24">
      <div className="hairline-t pt-10 mb-10 flex items-baseline justify-between">
        <h2 className="font-serif text-[28px] md:text-[32px] text-foreground">
          Keep reading
        </h2>
        <span className="eyebrow text-text-subtle">
          {picks.length === 1 ? "One more" : picks.length === 2 ? "Two more" : "Three more"}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {picks.map((r) => (
          <CompactCard
            key={r.slug}
            slug={r.slug}
            title={r.title}
            category={r.category}
            readTime={r.readTime}
            cover={r.cover}
          />
        ))}
      </div>
    </section>
  );
}
