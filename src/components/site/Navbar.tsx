import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Search, Menu } from "lucide-react";

const NAV = [
  { label: "Technology" },
  { label: "Culture" },
  { label: "Finance" },
  { label: "Science" },
  { label: "Style" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
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
          <Link to="/" className="flex items-baseline gap-2">
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
                key={item.label}
                to="/"
                className="eyebrow text-foreground/70 hover:text-foreground transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Search"
              className="hidden md:inline-flex items-center gap-2 rounded-sm border border-border px-3 py-1.5 meta text-foreground/70 hover:text-foreground hover:border-border-strong transition"
            >
              <Search className="size-3.5" strokeWidth={1.5} />
              <span>Search</span>
              <kbd className="ml-2 text-[10px] text-text-subtle tracking-widest">⌘K</kbd>
            </button>
            <button
              type="button"
              aria-label="Open menu"
              className="md:hidden inline-flex items-center justify-center size-10 text-foreground/80"
            >
              <Menu className="size-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
