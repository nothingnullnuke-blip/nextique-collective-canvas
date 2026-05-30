import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CATEGORIES, type CategorySlug, articlesByCategory, RELATED } from "@/lib/content";
import { CompactCard } from "@/components/site/CompactCard";

export const Route = createFileRoute("/topic/$slug")({
  loader: ({ params }) => {
    const cat = (CATEGORIES as Record<string, (typeof CATEGORIES)[CategorySlug]>)[params.slug];
    if (!cat) throw notFound();
    return { category: cat };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.category;
    if (!c) return { meta: [{ title: "Topic — Nextique" }] };
    return {
      meta: [
        { title: `${c.name} — Nextique` },
        { name: "description", content: c.description },
        { property: "og:title", content: `${c.name} — Nextique` },
        { property: "og:description", content: c.description },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-editorial py-40 text-center">
      <p className="eyebrow text-text-subtle">404</p>
      <h1 className="display-2 mt-4">Topic not found</h1>
      <Link to="/" className="eyebrow mt-8 inline-block text-accent">
        ← Return home
      </Link>
    </div>
  ),
  component: TopicPage,
});

function TopicPage() {
  const { category } = Route.useLoaderData();
  const accent = `var(${category.accentVar})`;
  const real = articlesByCategory(category.slug);

  // Build a staggered grid by mixing real articles with related placeholders,
  // remapped under this category so the page never reads empty.
  const items = [
    ...real.map((a) => ({
      slug: a.slug,
      title: a.title,
      category: a.category,
      readTime: a.readTime,
      cover: a.cover,
    })),
    ...RELATED.map((r, i) => ({
      ...r,
      category: category.slug,
      slug: real[0]?.slug ?? r.slug,
      title:
        i === 0
          ? `The Long Bet on ${category.name}`
          : i === 1
          ? `Notes from a ${category.name} Bureau`
          : `A Field Guide to ${category.name}`,
    })),
  ];

  return (
    <main>
      {/* Header with subtle accent tint */}
      <section
        className="relative overflow-hidden hairline-b"
        style={{
          background: `color-mix(in oklab, ${accent} 8%, var(--background))`,
        }}
      >
        <div className="container-editorial pt-40 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow" style={{ color: accent }}>
              Section
            </span>
            <h1 className="display-1 mt-4 text-foreground">{category.name}</h1>
            <p className="mt-6 max-w-2xl font-serif italic text-[22px] leading-snug text-foreground/80">
              {category.description}
            </p>
          </motion.div>
        </div>
        <div aria-hidden className="absolute inset-0 grain pointer-events-none" />
      </section>

      {/* Staggered 2-column editorial grid */}
      <section className="container-editorial py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {items.map((item, i) => (
            <motion.div
              key={`${item.slug}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              // Intentional vertical offset on every other tile
              className={i % 2 === 1 ? "md:mt-24" : ""}
            >
              <CompactCard {...item} />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
