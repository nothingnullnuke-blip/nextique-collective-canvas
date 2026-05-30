import { ArrowUpRight } from "lucide-react";
import leadImage from "@/assets/bento-lead-culture.jpg";
import counterImage from "@/assets/bento-counter-finance.jpg";
import { Link } from "@tanstack/react-router";
import { Reveal, MagneticCard, ClipReveal } from "./motion-primitives";

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

function ArrowHover() {
  return (
    <span className="ml-3 inline-flex size-8 items-center justify-center rounded-full border border-border-strong transition-colors duration-300 group-hover:border-foreground group-hover:bg-foreground">
      <ArrowUpRight
        className="size-3.5 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-background"
        strokeWidth={1.5}
      />
    </span>
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
          <Link
            to="/topic/$slug"
            params={{ slug: "technology" }}
            className="group hidden md:inline-flex items-center eyebrow text-foreground"
          >
            All stories
            <ArrowHover />
          </Link>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-12">
        {/* Lead — 4 cols */}
        <Reveal delay={0.05} className="md:col-span-4">
          <MagneticCard>
            <article className="group transition-transform duration-300 will-change-transform hover:scale-[1.005]">
              <Link
                to="/article/$slug"
                params={{ slug: "the-quiet-rewrite" }}
                className="block"
              >
                <ClipReveal className="relative overflow-hidden bg-surface aspect-[16/10]">
                  <img
                    src={leadImage}
                    alt="Designer's hand on architectural drawings beneath a brass lamp"
                    width={1600}
                    height={1000}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </ClipReveal>
                <div className="mt-7">
                  <div className="flex items-center gap-4">
                    <CategoryTag accent="var(--cat-culture)" label="Culture" />
                    <span className="eyebrow text-foreground/45">The Studio Visit</span>
                  </div>
                  <h3 className="display-2 mt-5 text-foreground max-w-[18ch] transition-colors duration-300 group-hover:text-foreground/85">
                    How a generation of designers learned to build
                  </h3>
                  <p className="mt-5 max-w-2xl body-lg text-foreground/75">
                    Six founders on the slow, expensive work of turning a point
                    of view into a company.
                  </p>
                  <p className="meta mt-5">Words by Sasha Lindgren · 18 min read</p>
                </div>
              </Link>
            </article>
          </MagneticCard>
        </Reveal>

        {/* Right column */}
        <Reveal delay={0.1} className="md:col-span-2">
          <div className="flex flex-col gap-10 h-full">
            <MagneticCard>
              <article className="group transition-transform duration-300 will-change-transform hover:scale-[1.01]">
                <Link
                  to="/article/$slug"
                  params={{ slug: "the-quiet-rewrite" }}
                  className="block"
                >
                  <ClipReveal className="relative overflow-hidden bg-surface aspect-[4/3]">
                    <img
                      src={counterImage}
                      alt="Brass and dark marble surfaces meeting at a diagonal"
                      width={1200}
                      height={900}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                    />
                  </ClipReveal>
                  <div className="mt-5">
                    <CategoryTag accent="var(--cat-finance)" label="Finance" />
                    <h3 className="font-serif text-[26px] leading-[1.18] tracking-tight mt-3 text-foreground transition-colors group-hover:text-foreground/85">
                      The new physics of capital allocation
                    </h3>
                    <p className="meta mt-3">Marcus Hale · 11 min read</p>
                  </div>
                </Link>
              </article>
            </MagneticCard>

            <article className="group hairline-t pt-6">
              <Link
                to="/article/$slug"
                params={{ slug: "the-quiet-rewrite" }}
                className="block transition-opacity hover:opacity-85"
              >
                <CategoryTag accent="var(--cat-wellness)" label="Wellness" />
                <h3 className="font-serif text-[22px] leading-[1.2] tracking-tight mt-3 text-foreground">
                  After the optimism: rebuilding the longevity thesis
                </h3>
                <p className="meta mt-3">Field Notes · 9 min read</p>
              </Link>
            </article>

            <article className="group hairline-t pt-6">
              <Link
                to="/article/$slug"
                params={{ slug: "the-quiet-rewrite" }}
                className="block transition-opacity hover:opacity-85"
              >
                <CategoryTag accent="var(--cat-style)" label="Style" />
                <h3 className="font-serif text-[22px] leading-[1.2] tracking-tight mt-3 text-foreground">
                  Inside the studio rewriting the rules of typography
                </h3>
                <p className="meta mt-3">Atelier · 7 min read</p>
              </Link>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
