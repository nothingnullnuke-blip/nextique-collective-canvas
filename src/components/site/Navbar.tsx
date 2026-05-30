import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ChevronDown } from "lucide-react";
import { SearchModal } from "./SearchModal";
import { MobileMenu } from "./MobileMenu";
import { CATEGORIES, type CategorySlug } from "@/lib/content";

const TOPICS: { label: string; slug: CategorySlug }[] = [
  { label: "Technology", slug: "technology" },
  { label: "Culture", slug: "culture" },
  { label: "Finance", slug: "finance" },
  { label: "Science", slug: "science" },
  { label: "Wellness", slug: "wellness" },
  { label: "Style", slug: "style" },
  { label: "Digital Society", slug: "digital-society" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [topicsOpen, setTopicsOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const openTopics = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setTopicsOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setTopicsOpen(false), 140);
  };

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
              <div
                className="relative"
                onMouseEnter={openTopics}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={topicsOpen}
                  onClick={() => setTopicsOpen((v) => !v)}
                  className="eyebrow text-foreground/70 hover:text-foreground transition-opacity duration-200 inline-flex items-center gap-1.5"
                >
                  Topics
                  <ChevronDown
                    className={
                      "size-3 transition-transform duration-300 " +
                      (topicsOpen ? "rotate-180" : "")
                    }
                    strokeWidth={1.5}
                  />
                </button>
                <AnimatePresence>
                  {topicsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      onMouseEnter={openTopics}
                      onMouseLeave={scheduleClose}
                      role="menu"
                      className="absolute left-0 top-full pt-3 w-[240px]"
                    >
                      <div className="rounded-sm bg-background/95 backdrop-blur-xl border border-border shadow-2xl py-2">
                        {TOPICS.map((t) => {
                          const accent = `var(${CATEGORIES[t.slug].accentVar})`;
                          return (
                            <Link
                              key={t.slug}
                              to="/topic/$slug"
                              params={{ slug: t.slug }}
                              onClick={() => setTopicsOpen(false)}
                              role="menuitem"
                              className="group flex items-center gap-3 px-4 py-2.5 text-foreground/75 hover:text-foreground transition-colors"
                            >
                              <span
                                aria-hidden
                                className="h-1.5 w-1.5 rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-150"
                                style={{ background: accent }}
                              />
                              <span className="font-serif text-[15px] tracking-tight">
                                {t.label}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link
                to="/newsletter"
                className="eyebrow text-foreground/70 hover:text-foreground transition-opacity duration-200"
              >
                Newsletter
              </Link>
              <Link
                to="/about"
                className="eyebrow text-foreground/70 hover:text-foreground transition-opacity duration-200"
              >
                About
              </Link>
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
