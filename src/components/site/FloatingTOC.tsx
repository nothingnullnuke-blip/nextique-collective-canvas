import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type TocItem = { id: string; text: string };

export function FloatingTOC({
  items,
  accentVar,
}: {
  items: TocItem[];
  accentVar: string;
}) {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visibleEntry) setActiveId(visibleEntry.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="hidden [@media(min-width:1600px)]:block fixed left-10 top-1/2 -translate-y-1/2 z-40 w-[200px]"
          aria-label="Table of contents"
        >
          <div className="eyebrow mb-5 text-text-subtle">In this story</div>
          <ul className="space-y-3">
            {items.map((it) => {
              const isActive = it.id === activeId;
              return (
                <li key={it.id}>
                  <a
                    href={`#${it.id}`}
                    className="group flex items-start gap-3 transition-colors duration-300"
                    style={{
                      color: isActive ? `var(${accentVar})` : "var(--text-muted)",
                    }}
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-px flex-shrink-0 transition-all duration-500"
                      style={{
                        width: isActive ? "20px" : "10px",
                        background: isActive
                          ? `var(${accentVar})`
                          : "var(--border-strong)",
                      }}
                    />
                    <span className="text-[13px] leading-snug">{it.text}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
