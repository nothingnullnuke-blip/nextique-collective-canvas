import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { ARTICLES, CATEGORIES } from "@/lib/content";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().slice(0, 10);

        const staticEntries = [
          { path: "/", lastmod: today, changefreq: "daily", priority: "1.0" },
          { path: "/about", lastmod: today, changefreq: "monthly", priority: "0.6" },
          { path: "/newsletter", lastmod: today, changefreq: "monthly", priority: "0.6" },
        ];

        const topicEntries = Object.values(CATEGORIES).map((c) => ({
          path: `/topic/${c.slug}`,
          lastmod: today,
          changefreq: "weekly",
          priority: "0.7",
        }));

        const articleEntries = ARTICLES.map((a) => ({
          path: `/article/${a.slug}`,
          lastmod: a.publishedAtISO,
          changefreq: "monthly",
          priority: "0.8",
        }));

        const all = [...staticEntries, ...topicEntries, ...articleEntries];

        const urls = all
          .map(
            (e) =>
              `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
