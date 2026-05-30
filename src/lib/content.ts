import heroTech from "@/assets/article-tech-hero.jpg";
import inlineTech from "@/assets/article-tech-inline.jpg";
import authorElena from "@/assets/author-elena.jpg";
import relatedCulture from "@/assets/related-culture.jpg";
import relatedFinance from "@/assets/related-finance.jpg";
import relatedScience from "@/assets/related-science.jpg";

export type CategorySlug =
  | "technology"
  | "culture"
  | "finance"
  | "science"
  | "wellness"
  | "style"
  | "digital-society";

export type Category = {
  slug: CategorySlug;
  name: string;
  accentVar: string; // CSS variable name (without var())
  description: string;
};

export const CATEGORIES: Record<CategorySlug, Category> = {
  technology: {
    slug: "technology",
    name: "Technology",
    accentVar: "--cat-technology",
    description:
      "Frontier labs, the new tools of work, and the people quietly remaking software.",
  },
  culture: {
    slug: "culture",
    name: "Culture",
    accentVar: "--cat-culture",
    description: "Film, music, books, and the slow currents of taste.",
  },
  finance: {
    slug: "finance",
    name: "Finance",
    accentVar: "--cat-finance",
    description: "Capital, markets, and what private money is actually doing.",
  },
  science: {
    slug: "science",
    name: "Science",
    accentVar: "--cat-science",
    description: "Space, climate, and the experiments that matter.",
  },
  wellness: {
    slug: "wellness",
    name: "Wellness",
    accentVar: "--cat-wellness",
    description: "Longevity, attention, and the evidence behind both.",
  },
  style: {
    slug: "style",
    name: "Style",
    accentVar: "--cat-style",
    description: "Architecture, fashion, and design as authorship.",
  },
  "digital-society": {
    slug: "digital-society",
    name: "Digital Society",
    accentVar: "--cat-society",
    description: "The creator economy, AI ethics, and the social fabric online.",
  },
};

export type Author = {
  name: string;
  bio: string;
  avatar: string;
};

export const AUTHORS = {
  elena: {
    name: "Elena Marchetti",
    bio: "Contributing editor, technology. Previously at Wired and The Information.",
    avatar: authorElena,
  },
  // lightweight placeholders for related cards
  reid: { name: "Reid Halloway", bio: "Senior writer.", avatar: authorElena },
  june: { name: "June Okafor", bio: "Staff writer.", avatar: authorElena },
} satisfies Record<string, Author>;

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "image"; src: string; alt: string; caption: string }
  | { type: "pullquote"; text: string; cite?: string };

export type Article = {
  slug: string;
  title: string;
  dek: string; // standfirst
  category: CategorySlug;
  author: keyof typeof AUTHORS;
  publishedAt: string;
  readTime: number;
  cover: string;
  blocks: Block[];
};

export const ARTICLES: Article[] = [
  {
    slug: "the-quiet-rewrite",
    title: "The Quiet Rewrite",
    dek: "Inside the small labs teaching software to forget what it knew — and why the next decade of computing will look nothing like the last.",
    category: "technology",
    author: "elena",
    publishedAt: "May 28, 2026",
    readTime: 11,
    cover: heroTech,
    blocks: [
      {
        type: "p",
        text: "The first time I walked into the lab in Zürich, the only sound was the soft mechanical breath of the cooling system. Two engineers were arguing about a benchmark in a tone usually reserved for arguments about wine. On a monitor behind them, a model was being patiently taught — not what to remember, but what to let go. They had spent six months on the problem. They told me, with the kind of pride only researchers allow themselves, that it was finally beginning to forget.",
      },
      {
        type: "p",
        text: "For most of the last decade, the dominant story in artificial intelligence has been one of accumulation. Bigger models, bigger datasets, bigger claims. Scale, the founders kept telling us, was the only thing that mattered. And for a while, the scoreboard agreed. But somewhere between the third and the fourth generation of foundation models, a different question quietly displaced the first one. It is no longer interesting that a model can remember everything. The interesting question, now, is what it should choose to remember at all.",
      },
      {
        type: "h2",
        id: "the-forgetting-problem",
        text: "The forgetting problem",
      },
      {
        type: "p",
        text: "Inside the field, the shift has a name: machine unlearning. The premise is almost embarrassingly simple. If a model has been trained on data it should not have seen — a copyrighted novel, a private medical record, a user's deleted post — can it be made to forget that data without retraining the entire system from scratch? Retraining a frontier model from scratch costs upward of a hundred million dollars and consumes the energy of a small city. Forgetting, in other words, has become an economic problem before it has become a philosophical one.",
      },
      {
        type: "image",
        src: inlineTech,
        alt: "A pair of hands typing on a backlit keyboard in warm light.",
        caption:
          "At Anthropic's San Francisco office, engineers test forgetting protocols by hand before they ever run at scale.",
      },
      {
        type: "pullquote",
        text: "We spent a decade teaching these systems to remember everything. The next decade is going to be about teaching them what it costs to know.",
        cite: "Mira Lange, ETH Zürich",
      },
      {
        type: "p",
        text: "The teams I visited — in Zürich, in San Francisco, in a small office above a bakery in Edinburgh — are unusually candid about the stakes. The European AI Act, the U.S. executive orders, the patchwork of state-level privacy laws now arriving each quarter: all of them, in different dialects, ask the same question. If a user invokes a right to be forgotten, can the model actually comply? For most production systems shipping today, the honest answer is no. The data was absorbed. The weights are entangled. The memory is, in a literal mathematical sense, irrecoverable.",
      },
      {
        type: "h2",
        id: "what-comes-next",
        text: "What comes next",
      },
      {
        type: "p",
        text: "What is emerging is a quieter, less photogenic kind of progress. The benchmarks no longer scale linearly with parameter count. The investor decks have started using a different vocabulary — auditable, governable, revocable — words that would have sounded suspiciously like compliance theater two years ago and now sound like infrastructure. The frontier, in 2026, looks less like a rocket launch and more like a careful renovation of a building people are still living in. The lights stay on. The walls move, one at a time. And somewhere in Zürich, a model is learning, for the first time, how to leave a thought behind.",
      },
    ],
  },
];

export const RELATED = [
  {
    slug: "the-museum-as-a-startup",
    title: "The Museum as a Startup",
    category: "culture" as CategorySlug,
    author: "reid",
    readTime: 8,
    cover: relatedCulture,
  },
  {
    slug: "private-credit-comes-of-age",
    title: "Private Credit Comes of Age",
    category: "finance" as CategorySlug,
    author: "june",
    readTime: 12,
    cover: relatedFinance,
  },
  {
    slug: "the-sky-survey-everyone-missed",
    title: "The Sky Survey Everyone Missed",
    category: "science" as CategorySlug,
    author: "elena",
    readTime: 9,
    cover: relatedScience,
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function articlesByCategory(slug: CategorySlug) {
  // For Phase 3 we only have one real article; pad with related references
  // remapped to the requested category so each topic page renders something.
  const real = ARTICLES.filter((a) => a.category === slug);
  return real;
}
