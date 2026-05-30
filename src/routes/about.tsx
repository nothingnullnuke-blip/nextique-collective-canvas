import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Nextique" },
      {
        name: "description",
        content:
          "Nextique is an independent editorial brand covering technology, culture, finance and the slow currents of taste.",
      },
      { property: "og:title", content: "About Nextique" },
      {
        property: "og:description",
        content:
          "An independent editorial brand for people who take culture, technology, and taste seriously.",
      },
      { property: "og:url", content: "/about" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Nextique",
          description:
            "An independent editorial brand covering technology, culture, finance and the slow currents of taste.",
          publisher: { "@type": "Organization", name: "Nextique" },
        }),
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="container-editorial pt-40 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="max-w-3xl"
      >
        <span className="eyebrow text-muted-foreground">Masthead</span>
        <h1 className="display-1 mt-5">An editorial brand, not a feed.</h1>
        <p className="mt-8 max-w-2xl font-serif italic text-[22px] leading-snug text-foreground/80">
          Nextique publishes three considered stories a week — on technology,
          culture, finance, science, wellness, style, and the social fabric
          online. We were founded in 2024 and remain independently owned.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 hairline-t pt-12">
          <div>
            <h2 className="display-3">What we publish</h2>
            <p className="mt-5 body-lg text-foreground/80">
              Long-form reporting, essays, and the occasional interview. Each
              piece is commissioned, fact-checked, and copy-edited by a
              human. We do not run sponsored content. We do not run wire
              stories. We do not optimise for time-on-page.
            </p>
          </div>
          <div>
            <h2 className="display-3">Who we are</h2>
            <p className="mt-5 body-lg text-foreground/80">
              A small distributed team — editors in New York, London,
              Copenhagen, and Tokyo, with a network of contributing writers
              in roughly thirty cities. Our masthead lists every byline.
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
