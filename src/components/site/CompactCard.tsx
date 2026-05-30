import { Link } from "@tanstack/react-router";
import { CATEGORIES, type CategorySlug } from "@/lib/content";
import { ClipReveal } from "./motion-primitives";

export function CompactCard({
  slug,
  title,
  category,
  readTime,
  cover,
}: {
  slug: string;
  title: string;
  category: CategorySlug;
  readTime: number;
  cover: string;
}) {
  const cat = CATEGORIES[category];
  return (
    <Link
      to="/article/$slug"
      params={{ slug }}
      className="group flex flex-col gap-4 transition-transform duration-300 will-change-transform hover:scale-[1.015]"
    >
      <ClipReveal className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
        <img
          src={cover}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
        />
      </ClipReveal>
      <div>
        <span className="eyebrow" style={{ color: `var(${cat.accentVar})` }}>
          {cat.name}
        </span>
        <h3 className="mt-2 font-serif text-[22px] leading-snug text-foreground transition-colors duration-300 group-hover:text-foreground/85">
          {title}
        </h3>
        <div className="mt-2 meta">{readTime} min read</div>
      </div>
    </Link>
  );
}
