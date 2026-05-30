import { Link } from "@tanstack/react-router";
import { NewsletterForm } from "./NewsletterForm";

const COLUMNS = [
  {
    title: "Sections",
    links: [
      { label: "Technology", to: "/topic/$slug", slug: "technology" },
      { label: "Culture", to: "/topic/$slug", slug: "culture" },
      { label: "Finance", to: "/topic/$slug", slug: "finance" },
      { label: "Science", to: "/topic/$slug", slug: "science" },
      { label: "Wellness", to: "/topic/$slug", slug: "wellness" },
      { label: "Style", to: "/topic/$slug", slug: "style" },
      { label: "Digital Society", to: "/topic/$slug", slug: "digital-society" },
    ],
  },
  {
    title: "Nextique",
    links: [
      { label: "About", to: "/about" as const },
      { label: "Newsletter", to: "/newsletter" as const },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-32 hairline-t bg-background">
      <div className="container-editorial py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Link to="/" className="font-serif text-3xl tracking-tight">
              Nextique
            </Link>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              An editorial brand for people who take culture, technology, and
              taste seriously. Three considered stories a week.
            </p>

            <NewsletterForm source="footer" variant="footer" />
          </div>

          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="eyebrow text-muted-foreground mb-5">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((l) =>
                    "slug" in l ? (
                      <li key={l.label}>
                        <Link
                          to={l.to}
                          params={{ slug: l.slug }}
                          className="text-[14px] text-foreground/85 transition-colors duration-200 hover:text-accent"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ) : (
                      <li key={l.label}>
                        <Link
                          to={l.to}
                          className="text-[14px] text-foreground/85 transition-colors duration-200 hover:text-accent"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
            <div className="hidden md:block">
              <h4 className="eyebrow text-muted-foreground mb-5">Follow</h4>
              <ul className="space-y-3 text-[14px] text-foreground/85">
                <li>RSS</li>
                <li>Are.na</li>
                <li>LinkedIn</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 hairline-t flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="meta">© {new Date().getFullYear()} Nextique Media. All rights reserved.</p>
          <p className="meta">Issue 001 · Printed in pixels.</p>
        </div>
      </div>
    </footer>
  );
}
