import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import leadImage from "@/assets/bento-lead-culture.jpg";
import counterImage from "@/assets/bento-counter-finance.jpg";

const EASE = [0.22, 1, 0.36, 1] as const;

type Card = {
  category: "Culture" | "Finance" | "Wellness" | "Style";
  accent: string;
  kicker: string;
  title: string;
  dek?: string;
  meta: string;
  image?: string;
  imageAlt?: string;
};

const LEAD: Card = {
  category: "Culture",
  accent: "var(--cat-culture)",
  kicker: "The Studio Visit",
  title: "How a generation of designers learned to build",
  dek: "Six founders on the slow, expensive work of turning a point of view into a company.",
  meta: "18 min read",
  image: leadImage,
  imageAlt: "Designer's hand on architectural drawings beneath a brass lamp",
};

const COUNTER: Card = {
  category: "Finance",
  accent: "var(--cat-finance)",
  kicker: "The Brief",
  title: "The new physics of capital allocation",
  dek: "Why the funds that mattered in 2015 will not be the funds that matter in 2030.",
  meta: "11 min read",
  image: counterImage,
  imageAlt: "Brass and dark marble surfaces meeting at a diagonal",
};

const MINORS: Card[] = [
  {
    category: "Wellness",
    accent: "var(--cat-wellness)",
    kicker: "Field Notes",
    title: "After the optimism: rebuilding the longevity thesis",
    meta: "9 min read",
  },
  {
    category: "Style",
    accent: "var(--cat-style)",
    kicker: "Atelier",
    title: "Inside the studio rewriting the rules of typography",
    meta: "7 min read",
  },
];

function ArrowHover() {
  return (
    <span className="ml-3 inline-flex size-8 items-center justify-center rounded-full border border-border-strong transition-colors duration-300 group-hover:border-foreground">
      <ArrowUpRight
        className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={1.5}
      />
    </span>
  );
}

function CategoryTag({ accent, label }: { accent: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-px w-6" style={{ background: accent }} />
      <span className="eyebrow" style={{ color: accent }}>
        {label}
      </span>
    </span>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function EditorialBentoGrid() {
  return (
    <section className="container-editorial pt-32 pb-24">
      <Reveal>
        <div className="flex items-end justify-between mb-12 hairline-b pb-6">
          <div>
            <span className="eyebrow text-muted-foreground">The Front Page</span>
            <h2 className="display-3 mt-3 text-foreground">Now reading</h2>
          </div>
          <a href="#" className="group hidden md:inline-flex items-center eyebrow text-foreground">
            All stories
            <ArrowHover />
          </a>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-10">
        {/* Lead — 4 columns, tall, full-bleed image */}
        <Reveal delay={0.05}>
          <article className="md:col-span-4 group">
            <a href="#" className="block">
              <div className="relative overflow-hidden bg-surface aspect-[16/11]">
                <img
                  src={LEAD.image}
                  alt={LEAD.imageAlt}
                  width={1600}
                  height={1280}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
              <div className="mt-7">
                <div className="flex items-center gap-4">
                  <CategoryTag accent={LEAD.accent} label={LEAD.category} />
                  <span className="eyebrow text-foreground/45">{LEAD.kicker}</span>
                </div>
                <h3 className="display-2 mt-5 text-foreground max-w-3xl">
                  {LEAD.title}
                </h3>
                {LEAD.dek && (
                  <p className="mt-5 max-w-2xl body-lg text-foreground/75">{LEAD.dek}</p>
                )}
                <p className="meta mt-5">Words by Sasha Lindgren · {LEAD.meta}</p>
              </div>
            </a>
          </article>
        </Reveal>

        {/* Right column — counterweight + two minors */}
        <div className="md:col-span-2 flex flex-col gap-10">
          {/* Counterweight with smaller image */}
          <Reveal delay={0.1}>
            <article className="group">
              <a href="#" className="block">
                <div className="relative overflow-hidden bg-surface aspect-[4/3]">
                  <img
                    src={COUNTER.image}
                    alt={COUNTER.imageAlt}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-5">
                  <CategoryTag accent={COUNTER.accent} label={COUNTER.category} />
                  <h3 className="display-3 mt-3 text-foreground">{COUNTER.title}</h3>
                  <p className="meta mt-3">Marcus Hale · {COUNTER.meta}</p>
                </div>
              </a>
            </article>
          </Reveal>

          {/* Two minors stacked, text-only with hairline separators */}
          {MINORS.map((m, i) => (
            <Reveal key={m.title} delay={0.15 + i * 0.05}>
              <article className="group hairline-t pt-6">
                <a href="#" className="block">
                  <CategoryTag accent={m.accent} label={m.category} />
                  <h3 className="font-serif text-[22px] leading-[1.2] tracking-tight mt-3 text-foreground">
                    {m.title}
                  </h3>
                  <p className="meta mt-3">{m.kicker} · {m.meta}</p>
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
