import { Link } from "@tanstack/react-router";

const COLUMNS = [
  {
    title: "Sections",
    links: ["Technology", "Culture", "Finance", "Science", "Style", "Digital Society"],
  },
  {
    title: "Nextique",
    links: ["About", "Masthead", "Newsletter", "Ethics", "Contact"],
  },
  {
    title: "Follow",
    links: ["RSS", "Twitter", "Are.na", "LinkedIn"],
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

            {/* Visually inert in Phase 1 — clearly labeled "Soon" so it doesn't read as broken */}
            <div
              aria-label="Newsletter signup, coming soon"
              className="mt-8 flex max-w-sm items-center gap-3 hairline-b pb-2 opacity-60 select-none"
            >
              <span className="flex-1 meta text-text-subtle">your@email.com</span>
              <span className="eyebrow text-text-subtle">Soon</span>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-3 gap-8">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="eyebrow text-muted-foreground mb-5">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link
                        to="/"
                        className="text-[14px] text-foreground/85 hover:text-foreground transition-colors"
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
