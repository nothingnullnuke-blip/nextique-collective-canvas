import type { Article } from "@/lib/content";

const STOPWORDS = new Set([
  "the","a","an","and","or","but","of","to","in","on","for","with","by","as","at","from",
  "is","are","was","were","be","been","being","it","its","this","that","these","those",
  "we","you","they","i","he","she","them","our","their","your","his","her","not","no",
  "do","does","did","done","has","have","had","will","would","could","should","can","may",
  "about","into","over","under","than","then","there","here","what","which","who","whom",
  "how","why","when","where","new","now","one","two","three","more","most","very","just",
  "also","still","yet","other","another","some","any","all","each","every","own","same",
]);

function tokenize(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .filter((t) => t.length > 2 && !STOPWORDS.has(t)),
  );
}

function articleCorpus(a: Article): string {
  const headings = a.blocks
    .filter((b) => b.type === "h2" || b.type === "h3")
    .map((b) => (b as { text: string }).text)
    .join(" ");
  return `${a.title} ${a.dek} ${headings}`;
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

export type RankedArticle = Article & { score: number };

/**
 * Rank candidates against a current article.
 * Score = shared tags (×3) + category bonus (×2) + lexical similarity (×8).
 * The current article is always excluded.
 */
export function rankRelated(
  current: Article,
  pool: Article[],
  limit = 3,
): RankedArticle[] {
  const currentTags = new Set(current.tags);
  const currentTokens = tokenize(articleCorpus(current));

  const scored = pool
    .filter((a) => a.slug !== current.slug)
    .map<RankedArticle>((a) => {
      const sharedTags = a.tags.filter((t) => currentTags.has(t)).length;
      const categoryBonus = a.category === current.category ? 1 : 0;
      const lexical = jaccard(currentTokens, tokenize(articleCorpus(a)));
      const score = sharedTags * 3 + categoryBonus * 2 + lexical * 8;
      return { ...a, score };
    })
    .sort((x, y) => {
      if (y.score !== x.score) return y.score - x.score;
      // Tiebreak: newer first
      return x.publishedAtISO < y.publishedAtISO ? 1 : -1;
    });

  return scored.slice(0, limit);
}
