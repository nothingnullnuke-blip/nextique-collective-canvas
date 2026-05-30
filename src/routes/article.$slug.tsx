import { createFileRoute, notFound, Link } from "@tanstack/react-router";
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
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) return { meta: [{ title: "Article — Nextique" }] };
    return {
      meta: [
        { title: `${a.title} — Nextique` },
        { name: "description", content: a.dek },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.dek },
        { property: "og:type", content: "article" },
        { property: "og:image", content: a.cover },
        { name: "twitter:image", content: a.cover },
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
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const cat = CATEGORIES[article.category];
  const author = AUTHORS[article.author];

  const toc = article.blocks
    .filter((b): b is Extract<typeof b, { type: "h2" }> => b.type === "h2")
    .map((b) => ({ id: b.id, text: b.text }));

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
