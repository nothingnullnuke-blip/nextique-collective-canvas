import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { NewsletterForm } from "@/components/site/NewsletterForm";

const EASE = [0.22, 1, 0.36, 1] as const;

export const Route = createFileRoute("/newsletter")({
  head: () => ({
    meta: [
      { title: "The Weekly — Nextique" },
      {
        name: "description",
        content:
          "One long-form essay and three short pieces, in your inbox every Sunday. 14,200 quiet readers.",
      },
      { property: "og:title", content: "The Weekly — Nextique" },
      {
        property: "og:description",
        content:
          "One long-form essay and three short pieces, every Sunday morning.",
      },
      { property: "og:url", content: "/newsletter" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/newsletter" }],
  }),
  component: NewsletterPage,
});

function NewsletterPage() {
  return (
    <main className="container-editorial pt-40 pb-32 min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="max-w-3xl"
      >
        <span className="eyebrow text-muted-foreground">The Weekly</span>
        <h1 className="display-1 mt-5">The Sunday letter, from Nextique.</h1>
        <p className="mt-8 max-w-xl font-serif italic text-[22px] leading-snug text-foreground/80">
          One long-form essay. Three considered pieces. A short note from
          the editor. No promotions, no tracking, no list-building theatre.
        </p>
        <p className="mt-8 max-w-xl body-lg text-foreground/75">
          14,200 readers in 64 countries. We open the inbox at 7am on Sunday,
          local time. Unsubscribe in one click; we hold no grudges.
        </p>

        <NewsletterForm source="newsletter-page" variant="block" ctaLabel="Subscribe" />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 hairline-t pt-10">
          <div>
            <h3 className="eyebrow text-muted-foreground">No tracking</h3>
            <p className="mt-3 text-[15px] text-foreground/80">
              We do not use open pixels or click-through trackers. We will
              not know if you read it.
            </p>
          </div>
          <div>
            <h3 className="eyebrow text-muted-foreground">No promotions</h3>
            <p className="mt-3 text-[15px] text-foreground/80">
              The letter has never carried a sponsored placement, and it
              will not.
            </p>
          </div>
          <div>
            <h3 className="eyebrow text-muted-foreground">No theatre</h3>
            <p className="mt-3 text-[15px] text-foreground/80">
              One email a week. If a week is quiet, we send nothing.
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
