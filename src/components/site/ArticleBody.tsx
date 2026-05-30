import type { Block } from "@/lib/content";
import { PullQuote } from "./PullQuote";

export function ArticleBody({
  blocks,
  accentVar,
}: {
  blocks: Block[];
  accentVar: string;
}) {
  let firstParagraphSeen = false;

  return (
    <div className="reading-column px-5 py-16 md:py-20">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p": {
            const isFirst = !firstParagraphSeen;
            if (isFirst) firstParagraphSeen = true;
            return (
              <p
                key={i}
                className={
                  "text-[17px] leading-[1.75] text-foreground/90 mb-7 " +
                  (isFirst ? "article-dropcap" : "")
                }
              >
                {block.text}
              </p>
            );
          }
          case "h2":
            return (
              <h2
                key={i}
                id={block.id}
                className="font-serif text-[34px] md:text-[40px] leading-[1.1] tracking-tight text-foreground mt-14 mb-6 scroll-mt-28"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="font-serif text-[24px] md:text-[28px] leading-snug text-foreground mt-10 mb-4"
              >
                {block.text}
              </h3>
            );
          case "image":
            return (
              <figure key={i} className="my-12">
                <img
                  src={block.src}
                  alt={block.alt}
                  loading="lazy"
                  className="w-full h-auto"
                />
                <figcaption className="mt-3 text-[13px] italic text-text-muted leading-snug">
                  {block.caption}
                </figcaption>
              </figure>
            );
          case "pullquote":
            return (
              <PullQuote
                key={i}
                text={block.text}
                cite={block.cite}
                accentVar={accentVar}
              />
            );
        }
      })}
    </div>
  );
}
