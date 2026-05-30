import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { SearchModal } from "./SearchModal";
import { MobileMenu } from "./MobileMenu";
import { CATEGORIES } from "@/lib/content";

const NAV = [
  { label: "Technology", slug: "technology" as const },
  { label: "Culture", slug: "culture" as const },
  { label: "Finance", slug: "finance" as const },
  { label: "Science", slug: "science" as const },
  { label: "Style", slug: "style" as const },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Sanity check so the categories import is used (silences unused-warnings)
  void CATEGORIES;

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={[
            "transition-[background-color,backdrop-filter,border-color] duration-500",
            scrolled
              ? "bg-background/75 backdrop-blur-xl border-b border-border"
              : "bg-transparent border-b border-transparent",
          ].join(" ")}
        >
          <div className="container-editorial flex h-16 items-center justify-between">
            <Link to="/" className="flex items-baseline gap-2 transition-opacity duration-200 hover:opacity-80">
              <span className="font-serif text-2xl tracking-tight text-foreground">
                Nextique
              </span>
              <span
                aria-hidden
                className="h-1 w-1 rounded-full"
                style={{ background: "var(--accent-gold)" }}
              />
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {NAV.map((item) => (
                <Link
                  key={item.slug}
                  to="/topic/$slug"
                  params={{ slug: item.slug }}
                  className="eyebrow text-foreground/65 hover:text-foreground transition-opacity duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Open search"
                onClick={() => setSearchOpen(true)}
                className="hidden md:inline-flex items-center gap-2 rounded-sm border border-border px-3 py-1.5 meta text-foreground/70 hover:text-foreground hover:border-border-strong transition"
              >
                <Search className="size-3.5" strokeWidth={1.5} />
                <span>Search</span>
                <kbd className="ml-2 text-[10px] text-text-subtle tracking-widest">⌘K</kbd>
              </button>
              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
                className="md:hidden inline-flex items-center justify-center h-10 px-2 eyebrow text-foreground/85 hover:text-foreground"
              >
                Menu
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
