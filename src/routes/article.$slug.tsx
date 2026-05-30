import { createFileRoute, notFound, Link } from "@tanstack/react-router";
const DOMAIN = "https://id-preview--01700b05-4d29-4cbf-91ab-acec504e8727.lovable.app";
import { getArticle, AUTHORS, CATEGORIES } from "@/lib/content";
import { ArticleHero } from "@/components/site/ArticleHero";
import { ArticleBody } from "@/components/site/ArticleBody";
import { ReadingProgress } from "@/components/site/ReadingProgress";
import { FloatingTOC } from "@/components/site/FloatingTOC";
import { AuthorCard } from "@/components/site/AuthorCard";
import { RelatedArticles } from "@/components/site/RelatedArticles";

export const Route = createFileRoute("/article/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData, params }) => {
    const a = loaderData?.article;
    if (!a) return { meta: [{ title: "Article — Nextique" }] };
    const author = AUTHORS[a.author];
    return {
      meta: [
        { title: `${a.title} — Nextique` },
        { name: "description", content: a.dek },
        { name: "author", content: author.name },
        { property: "article:published_time", content: a.publishedAtISO },
        { property: "article:author", content: author.name },
        { property: "article:section", content: CATEGORIES[a.category].name },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.dek },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/article/${params?.slug ?? a.slug}` },
        { property: "og:image", content: `${DOMAIN}${a.cover}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: `${DOMAIN}${a.cover}` },
      ],
      links: [{ rel: "canonical", href: `/article/${params?.slug ?? a.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            description: a.dek,
            image: [`${DOMAIN}${a.cover}`],
            datePublished: a.publishedAtISO,
            author: { "@type": "Person", name: author.name },
            publisher: {
              "@type": "Organization",
              name: "Nextique",
            },
            articleSection: CATEGORIES[a.category].name,
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-editorial py-40 text-center">
      <p className="eyebrow text-text-subtle">404</p>
      <h1 className="display-2 mt-4">Story not found</h1>
      <Link to="/" className="eyebrow mt-8 inline-block text-accent">
        ← Return home
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container-editorial py-40 text-center">
      <p className="eyebrow text-text-subtle">Error</p>
      <h1 className="display-2 mt-4">Couldn't load this story</h1>
      <p className="meta mt-3">{error.message}</p>
    </div>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData() as { article: NonNullable<ReturnType<typeof getArticle>> };
  const cat = CATEGORIES[article.category];
  const author = AUTHORS[article.author];

  const toc = article.blocks
    .filter((b) => b.type === "h2")
    .map((b) => ({ id: (b as { id: string }).id, text: (b as { text: string }).text }));

  return (
    <article className="pt-0">
      <ReadingProgress accentVar={cat.accentVar} />
      <FloatingTOC items={toc} accentVar={cat.accentVar} />
      <ArticleHero article={article} />
      <ArticleBody blocks={article.blocks} accentVar={cat.accentVar} />
      <AuthorCard author={author} />
      <RelatedArticles />
    </article>
  );
}
