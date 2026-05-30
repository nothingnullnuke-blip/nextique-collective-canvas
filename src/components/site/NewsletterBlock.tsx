import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function NewsletterBlock() {
  return (
    <section className="relative mt-24 hairline-t hairline-b bg-background">
      <div className="container-editorial py-28 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-3xl"
        >
          <span className="eyebrow text-muted-foreground">The Weekly</span>
          <h2 className="display-1 mt-5 text-foreground" style={{ maxWidth: "14ch" }}>
            Think better. Read Nextique.
          </h2>
          <p className="mt-8 max-w-xl body-lg text-foreground/75">
            One long-form essay and three short pieces, in your inbox every
            Sunday morning. No tracking, no growth hacks, no list-building
            theatre. 14,200 quiet readers.
          </p>

          {/* Inert — matches the footer "Soon" treatment */}
          <div
            aria-label="Newsletter signup, coming soon"
            className="mt-12 flex max-w-xl items-center gap-3 hairline-b pb-3 opacity-70 select-none"
          >
            <span className="flex-1 text-[15px] text-text-subtle">your@email.com</span>
            <span className="eyebrow text-text-subtle">Soon →</span>
          </div>

          <p className="meta mt-6 text-text-subtle">
            Unsubscribe in one click. We will never share your address.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
