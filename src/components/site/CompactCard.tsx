import { Link } from "@tanstack/react-router";
import { CATEGORIES, type CategorySlug } from "@/lib/content";

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
      className="group flex flex-col gap-4"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
        <img
          src={cover}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div>
        <span className="eyebrow" style={{ color: `var(${cat.accentVar})` }}>
          {cat.name}
        </span>
        <h3 className="mt-2 font-serif text-[22px] leading-snug text-foreground transition-colors group-hover:text-foreground/85">
          {title}
        </h3>
        <div className="mt-2 meta">{readTime} min read</div>
      </div>
    </Link>
  );
}
