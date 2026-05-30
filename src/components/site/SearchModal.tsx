import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useNavigate } from "@tanstack/react-router";
import { Search, CornerDownLeft } from "lucide-react";
import { ARTICLES, CATEGORIES } from "@/lib/content";

type Result =
  | { kind: "article"; slug: string; title: string; category: string; readTime: number }
  | { kind: "category"; slug: string; name: string; accentVar: string };

export function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo<Result[]>(() => {
    const term = q.trim().toLowerCase();
    if (!term) {
      return ARTICLES.slice(0, 6).map((a) => ({
        kind: "article" as const,
        slug: a.slug,
        title: a.title,
        category: a.category,
        readTime: a.readTime,
      }));
    }
    const articleHits = ARTICLES.filter((a) =>
      a.title.toLowerCase().includes(term)
    ).map((a) => ({
      kind: "article" as const,
      slug: a.slug,
      title: a.title,
      category: a.category,
      readTime: a.readTime,
    }));
    const catHits = Object.values(CATEGORIES)
      .filter((c) => c.name.toLowerCase().includes(term))
      .map((c) => ({
        kind: "category" as const,
        slug: c.slug,
        name: c.name,
        accentVar: c.accentVar,
      }));
    return [...articleHits, ...catHits];
  }, [q]);

  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [open]);

  const go = (r: Result) => {
    if (r.kind === "article") {
      navigate({ to: "/article/$slug", params: { slug: r.slug } });
    } else {
      navigate({ to: "/topic/$slug", params: { slug: r.slug } });
    }
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, Math.max(results.length - 1, 0)));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const r = results[active];
        if (r) go(r);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, results, active]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[14vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-background/70"
            style={{ backdropFilter: reduce ? undefined : "blur(8px)" }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search Nextique"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl bg-surface-raised border border-border-strong shadow-2xl"
          >
            <div className="flex items-center gap-3 px-5 py-4 hairline-b">
              <Search className="size-4 text-text-muted" strokeWidth={1.5} />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search Nextique..."
                className="flex-1 bg-transparent outline-none text-[15px] text-foreground placeholder:text-text-muted"
                aria-label="Search query"
              />
              <kbd className="meta text-text-subtle">ESC</kbd>
            </div>

            <ul ref={listRef} className="max-h-[55vh] overflow-y-auto">
              {results.length === 0 && (
                <li className="px-6 py-12 font-serif italic text-[18px] text-text-muted">
                  No results for “{q}”
                </li>
              )}
              {results.map((r, i) => {
                const isActive = i === active;
                if (r.kind === "article") {
                  const cat = CATEGORIES[r.category as keyof typeof CATEGORIES];
                  return (
                    <li key={`a-${r.slug}-${i}`}>
                      <button
                        type="button"
                        onMouseEnter={() => setActive(i)}
                        onClick={() => go(r)}
                        className={
                          "group w-full text-left px-5 py-4 flex items-center gap-4 transition-colors duration-200 " +
                          (isActive ? "bg-background" : "hover:bg-background/60")
                        }
                      >
                        <span
                          className="eyebrow w-[110px] shrink-0"
                          style={{ color: `var(${cat.accentVar})` }}
                        >
                          {cat.name}
                        </span>
                        <span className="flex-1 font-serif text-[18px] leading-snug text-foreground">
                          {r.title}
                        </span>
                        <span className="meta text-text-subtle shrink-0">
                          {r.readTime} min
                        </span>
                        {isActive && (
                          <CornerDownLeft
                            className="size-3.5 text-text-muted ml-2"
                            strokeWidth={1.5}
                          />
                        )}
                      </button>
                    </li>
                  );
                }
                return (
                  <li key={`c-${r.slug}-${i}`}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(r)}
                      className={
                        "group w-full text-left px-5 py-4 flex items-center gap-4 transition-colors duration-200 " +
                        (isActive ? "bg-background" : "hover:bg-background/60")
                      }
                    >
                      <span className="eyebrow w-[110px] shrink-0 text-text-subtle">
                        Section
                      </span>
                      <span
                        className="flex-1 font-serif text-[18px] leading-snug"
                        style={{ color: `var(${r.accentVar})` }}
                      >
                        {r.name}
                      </span>
                      {isActive && (
                        <CornerDownLeft
                          className="size-3.5 text-text-muted ml-2"
                          strokeWidth={1.5}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="hairline-t px-5 py-3 flex items-center justify-between meta text-text-subtle">
              <span>↑ ↓ to navigate · ↵ to open</span>
              <span>esc to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
