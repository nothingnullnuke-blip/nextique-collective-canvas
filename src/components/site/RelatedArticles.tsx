import { RELATED } from "@/lib/content";
import { CompactCard } from "./CompactCard";

export function RelatedArticles() {
  return (
    <section className="container-editorial pb-24">
      <div className="hairline-t pt-10 mb-10 flex items-baseline justify-between">
        <h2 className="font-serif text-[28px] md:text-[32px] text-foreground">
          Keep reading
        </h2>
        <span className="eyebrow text-text-subtle">Three more</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {RELATED.map((r) => (
          <CompactCard key={r.slug} {...r} />
        ))}
      </div>
    </section>
  );
}
