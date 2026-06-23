import heroTech from "@/assets/article-tech-hero.jpg";
import inlineTech from "@/assets/article-tech-inline.jpg";
import authorElena from "@/assets/author-elena.jpg";
import relatedCulture from "@/assets/related-culture.jpg";
import relatedFinance from "@/assets/related-finance.jpg";
import relatedScience from "@/assets/related-science.jpg";
import wellnessHero from "@/assets/article-wellness-hero.jpg";
import styleHero from "@/assets/article-style-hero.jpg";
import societyHero from "@/assets/article-society-hero.jpg";

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
  accentVar: string;
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

export type Author = { name: string; bio: string; avatar: string };

export const AUTHORS = {
  elena: {
    name: "Elena Marchetti",
    bio: "Contributing editor, technology. Previously at Wired and The Information.",
    avatar: authorElena,
  },
  sasha: {
    name: "Sasha Lindgren",
    bio: "Senior writer covering culture and the institutions that shape it. Based in Copenhagen.",
    avatar: authorElena,
  },
  marcus: {
    name: "Marcus Hale",
    bio: "Markets columnist. Twenty years between Lazard, the FT, and an unfinished novel.",
    avatar: authorElena,
  },
  june: {
    name: "June Okafor",
    bio: "Staff writer covering science and the long arc of the climate decade.",
    avatar: authorElena,
  },
  noor: {
    name: "Noor Bakhash",
    bio: "Contributing writer on attention, longevity, and the evidence underneath both.",
    avatar: authorElena,
  },
  rhea: {
    name: "Rhea Caldwell",
    bio: "Style editor at large. Previously fashion features director at AnOther Magazine.",
    avatar: authorElena,
  },
  kenji: {
    name: "Kenji Aoki",
    bio: "Writer on the social fabric of the network. Author of 'The Unscrolled' (2025).",
    avatar: authorElena,
  },
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
  dek: string;
  category: CategorySlug;
  author: keyof typeof AUTHORS;
  publishedAt: string;
  publishedAtISO: string;
  readTime: number;
  cover: string;
  tags: string[];
  blocks: Block[];
};

const standardBody = (
  cat: string,
  p1: string,
  h1: string,
  p2: string,
  quote: { text: string; cite: string },
  h2: string,
  p3: string,
  p4: string,
): Block[] => [
  { type: "p", text: p1 },
  { type: "h2", id: cat + "-1", text: h1 },
  { type: "p", text: p2 },
  { type: "pullquote", text: quote.text, cite: quote.cite },
  { type: "h2", id: cat + "-2", text: h2 },
  { type: "p", text: p3 },
  { type: "p", text: p4 },
];

export const ARTICLES: Article[] = [
  {
    slug: "the-quiet-rewrite",
    title: "The Quiet Rewrite",
    dek: "Inside the small labs teaching software to forget what it knew — and why the next decade of computing will look nothing like the last.",
    category: "technology",
    author: "elena",
    publishedAt: "May 28, 2026",
    publishedAtISO: "2026-05-28",
    readTime: 11,
    cover: heroTech,
    blocks: [
      { type: "p", text: "The first time I walked into the lab in Zürich, the only sound was the soft mechanical breath of the cooling system. Two engineers were arguing about a benchmark in a tone usually reserved for arguments about wine. On a monitor behind them, a model was being patiently taught — not what to remember, but what to let go. They had spent six months on the problem. They told me, with the kind of pride only researchers allow themselves, that it was finally beginning to forget." },
      { type: "p", text: "For most of the last decade, the dominant story in artificial intelligence has been one of accumulation. Bigger models, bigger datasets, bigger claims. Scale, the founders kept telling us, was the only thing that mattered. And for a while, the scoreboard agreed. But somewhere between the third and the fourth generation of foundation models, a different question quietly displaced the first one. It is no longer interesting that a model can remember everything. The interesting question, now, is what it should choose to remember at all." },
      { type: "h2", id: "the-forgetting-problem", text: "The forgetting problem" },
      { type: "p", text: "Inside the field, the shift has a name: machine unlearning. The premise is almost embarrassingly simple. If a model has been trained on data it should not have seen — a copyrighted novel, a private medical record, a user's deleted post — can it be made to forget that data without retraining the entire system from scratch? Retraining a frontier model from scratch costs upward of a hundred million dollars and consumes the energy of a small city. Forgetting, in other words, has become an economic problem before it has become a philosophical one." },
      { type: "image", src: inlineTech, alt: "A pair of hands typing on a backlit keyboard in warm light.", caption: "At Anthropic's San Francisco office, engineers test forgetting protocols by hand before they ever run at scale." },
      { type: "pullquote", text: "We spent a decade teaching these systems to remember everything. The next decade is going to be about teaching them what it costs to know.", cite: "Mira Lange, ETH Zürich" },
      { type: "p", text: "The teams I visited — in Zürich, in San Francisco, in a small office above a bakery in Edinburgh — are unusually candid about the stakes. The European AI Act, the U.S. executive orders, the patchwork of state-level privacy laws now arriving each quarter: all of them, in different dialects, ask the same question. If a user invokes a right to be forgotten, can the model actually comply? For most production systems shipping today, the honest answer is no." },
      { type: "h2", id: "what-comes-next", text: "What comes next" },
      { type: "p", text: "What is emerging is a quieter, less photogenic kind of progress. The benchmarks no longer scale linearly with parameter count. The investor decks have started using a different vocabulary — auditable, governable, revocable — words that would have sounded suspiciously like compliance theater two years ago and now sound like infrastructure." },
    ],
  },

  {
    slug: "the-museum-as-a-startup",
    title: "The Museum as a Startup",
    dek: "A new generation of curators is borrowing the playbook of venture-backed software. The objects are older. The metrics are not.",
    category: "culture",
    author: "sasha",
    publishedAt: "May 26, 2026",
    publishedAtISO: "2026-05-26",
    readTime: 9,
    cover: relatedCulture,
    blocks: standardBody(
      "museum",
      "The new director of the Stedelijk does not call her job curation. She calls it product. Her morning standup, in a converted print room on the second floor of the museum, looks like any growth-stage Slack meeting in Amsterdam: a backlog, a sprint, a retention dashboard glowing on the far wall. The objects on the gallery floor below are five centuries old. The vocabulary upstairs is six years old, and it is winning.",
      "Inside the new operating model",
      "What is changing is not the art. What is changing is the institution around it. For the first time in a generation, museums are being run by people who treat the visitor not as a guest to be received but as a user to be retained. Membership programs are being rebuilt as subscription tiers. Late openings are being run as events with conversion funnels. The director shows me a chart of return visits per cohort and says, without irony, that it is the most important number in the building.",
      { text: "We are not turning the museum into a startup. We are admitting that the museum was always a product. We just used to be embarrassed about it.", cite: "Director, Stedelijk Museum" },
      "What the old guard misses",
      "The critics are not wrong that something is being lost. The deep, slow attention that a great gallery used to demand sits uneasily next to a notification-driven schedule. But the directors I spoke to, in Amsterdam and Antwerp and Athens, are unanimous on one point: the old model was not preserving that attention. It was losing it, one quiet Tuesday afternoon at a time.",
      "The question now is whether the new instruments — the dashboards, the cohorts, the conversion targets — can be put in service of the old mission. The early evidence is mixed and genuinely interesting. The Stedelijk's median visit length, after eighteen months of the new program, is up by nine minutes. That is not a small number. That is a generation of curators relearning how to hold a room.",
    ),
  },

  {
    slug: "private-credit-comes-of-age",
    title: "Private Credit Comes of Age",
    dek: "Three trillion dollars in non-bank lending have quietly reshaped how the global economy borrows. The next downturn will be the asset class's first real exam.",
    category: "finance",
    author: "marcus",
    publishedAt: "May 24, 2026",
    publishedAtISO: "2026-05-24",
    readTime: 12,
    cover: relatedFinance,
    blocks: standardBody(
      "credit",
      "For most of the last hundred years, the answer to who lends money was unromantic and reassuringly boring: a bank. The answer in 2026 is something else. Direct lending funds, business development companies, infrastructure debt vehicles, opportunistic credit sleeves at the largest alternative asset managers — together they now sit on more than three trillion dollars in dry powder and deployed capital. Private credit is no longer alternative. In several corners of the middle market, it is the market.",
      "How the plumbing changed",
      "What happened, in the simplest telling, is that banks left the room and asset managers walked in. Post-2008 regulation made it more expensive for balance sheets to hold leveraged loans. Pensions and sovereign wealth funds, starved for yield through a decade of zero rates, wanted income they could explain to their boards. The funds that intermediated the two became, almost accidentally, one of the most important institutions in global finance.",
      { text: "We used to underwrite credit. Now we underwrite the people running the credit. The fund manager is the new bank, and we are deciding which banks to capitalize.", cite: "CIO, Nordic pension fund" },
      "The stress test that hasn't come",
      "The honest critique of private credit is not that it is reckless. By and large, the underwriting in 2026 looks more conservative than the syndicated loan market it displaced. The honest critique is that the asset class has not yet been through a full default cycle at its current scale. The funds are marked quarterly, not daily. The exits, when they come, are negotiated rather than auctioned. Whether that produces stability or merely hides instability is the question every chief risk officer I spoke with is now asking, quietly, of themselves.",
      "The answer, when it comes, will not be theoretical. The first cohort of post-zero-rate vintages is rolling into refinancing windows now. The numbers will be in the next set of annual reports. So will the new vocabulary of the asset class — extension, amendment, support — and the slow rediscovery of what it actually means to lend money for a living.",
    ),
  },

  {
    slug: "the-sky-survey-everyone-missed",
    title: "The Sky Survey Everyone Missed",
    dek: "A modest telescope in the Atacama has spent five quiet years redrawing the southern sky. The catalog it produced is changing what astronomers thought they were looking at.",
    category: "science",
    author: "june",
    publishedAt: "May 22, 2026",
    publishedAtISO: "2026-05-22",
    readTime: 10,
    cover: relatedScience,
    blocks: standardBody(
      "sky",
      "The telescope sits at four thousand meters above sea level, on a ridge so dry that the engineers who built it had to import their own bottled humidity for the optics. It is not large. By the standards of the next-generation observatories now coming online in Chile, it is almost a museum piece. But for five years, while the press releases were going to the bigger machines down the road, this small survey instrument has been quietly photographing the same patches of sky, night after night, and producing what astronomers now believe is the most useful single dataset of the decade.",
      "What time-domain astronomy actually changed",
      "The breakthrough is not a discovery in the headline sense. There is no single new object, no press-conference photograph. The breakthrough is that the team has, for the first time, produced a continuous catalog — every transient, every brightening, every brief flare in a quarter of the southern sky — that can be queried like a database. Astronomers who used to wait years for a follow-up observation now write a SQL query against the night.",
      { text: "We thought we were doing photometry. It turns out we were building the infrastructure for a different field. People are using this data for questions we did not know existed.", cite: "Principal investigator, Atacama Time-Domain Survey" },
      "The unglamorous shape of progress",
      "The survey's first major use, almost as a side effect, has been the recalibration of distances to a class of variable stars that anchor most extragalactic measurements. The revisions are small. The implications are not. Several long-standing tensions in cosmology — disagreements between methods of measuring the expansion of the universe — get slightly easier to live with under the new numbers, and slightly harder under others.",
      "What the survey demonstrates, more than any individual result, is the quiet truth of modern observational science. The frontier is no longer a single large mirror pointed at a single bright object. The frontier is the long, patient accumulation of a clean, well-organized dataset, and the unromantic but consequential infrastructure required to share it.",
    ),
  },

  {
    slug: "after-the-optimism",
    title: "After the Optimism",
    dek: "The longevity field promised to cure aging. A more honest generation of researchers is now asking what it would mean to merely understand it.",
    category: "wellness",
    author: "noor",
    publishedAt: "May 20, 2026",
    publishedAtISO: "2026-05-20",
    readTime: 8,
    cover: wellnessHero,
    blocks: standardBody(
      "longevity",
      "Five years ago, the longevity conferences felt like a different industry. The talks were declarative. The slides used the word reverse. Investors who could not pronounce senescence were writing nine-figure checks against the premise that aging was about to be solved, and that the firm doing the solving would be the largest in the history of capitalism. The room was very full and the certainty was very loud.",
      "The new modesty",
      "The room in 2026 is quieter, smaller, and considerably more honest. The headline trials that were supposed to show clear extension of human healthspan have, with one or two ambiguous exceptions, not shown it. The mouse data did not translate. The biomarkers turned out to be downstream of the thing the field actually wanted to measure. Several well-funded companies have either pivoted or closed. The investors who remain are, in private, using the word slow more often than the word breakthrough.",
      { text: "The field grew up in public, in a way it would have preferred not to. The work is still good. The story we were telling about the work was not.", cite: "Senior researcher, Buck Institute" },
      "What real progress looks like",
      "The progress that has actually happened is unglamorous and easy to miss. The molecular epidemiology of aging is far better understood than it was five years ago. The variation between people of the same chronological age is now characterized in ways that point to actionable interventions, mostly in sleep, mostly in cardiovascular health, mostly in the same advice that geriatricians have been quietly giving for thirty years. The exotic stuff did not work. The boring stuff is now better-measured than ever.",
      "The longevity field, in other words, is becoming a science. That sounds like a small thing only if you forget that it was, for a while, something else. The next decade of work will be slower than the last, and more useful, and almost certainly less newsworthy. That is what it looks like when an industry grows up.",
    ),
  },

  {
    slug: "the-quiet-house",
    title: "The Quiet House",
    dek: "A small atelier in Antwerp has spent ten years building a wardrobe almost no one talks about. The people who own it tend to keep it for decades.",
    category: "style",
    author: "rhea",
    publishedAt: "May 18, 2026",
    publishedAtISO: "2026-05-18",
    readTime: 7,
    cover: styleHero,
    blocks: standardBody(
      "house",
      "The studio is on the second floor of a building that does not advertise itself. There is no shop downstairs. The website is a single page with an email address. The annual production is, by the founder's deliberate choice, under four hundred garments. And yet a quiet international subscription of architects, gallerists, and the kind of writer who owns three coats has, over the last decade, made this small Antwerp atelier one of the most discussed houses no one is allowed to discuss.",
      "What slowness actually costs",
      "The founder, who declined to be photographed, will talk at length about cloth. The wool comes from a single mill in the Scottish Borders. The linen is grown and spun in Normandy. The garments are cut by three people, all of whom have been in the studio for at least seven years. Each piece is made twice — once in muslin, to test the line, then again in the final cloth. The pattern is then archived, because customers come back for the same coat ten years later and the studio remembers it.",
      { text: "The whole industry is optimized for the first wear. We are optimized for the seventh year. It is a different business, with different math.", cite: "Founder, the Antwerp studio" },
      "Why the quiet houses are winning a quiet war",
      "There are, by my count, perhaps a dozen ateliers operating at this scale in the world now — in Antwerp, in Kyoto, in a converted bank building in Lisbon. They share almost nothing operationally. They share, almost completely, a thesis. The thesis is that the past two decades of fashion mistook attention for desire, and that the customers who actually wanted to spend serious money on clothing had quietly stopped showing up to the room where attention was being competed for.",
      "The numbers will not impress an MBA. The waiting lists are long, the prices are unreasonable by any consumer-goods standard, and the houses themselves are uninterested in scale. But the customers, when I asked them, were unusually clear about why they had chosen this particular kind of inconvenience. They wanted, they said, to stop thinking about it. The clothes were, finally, just clothes again.",
    ),
  },

  {
    slug: "the-end-of-the-feed",
    title: "The End of the Feed",
    dek: "Twenty years of infinite scroll trained a generation to mistake the algorithm for the world. The next architecture of social software is being built, quietly, in the opposite direction.",
    category: "digital-society",
    author: "kenji",
    publishedAt: "May 16, 2026",
    publishedAtISO: "2026-05-16",
    readTime: 11,
    cover: societyHero,
    blocks: standardBody(
      "feed",
      "The feed, as a design pattern, was a remarkable invention. A single chronological column, then a single ranked column, that you could fall into for as long as you were willing to keep your thumb on a glass. Two decades of growth charts were built on the discovery that almost everyone was willing to keep their thumb on the glass for a long, long time. The industry that grew up around it became, by any honest measure, the largest cultural institution in human history. And then, slowly, almost without anyone announcing it, the feed started to lose.",
      "What people actually started doing",
      "The numbers have been visible for a couple of years if you knew where to look. Engagement per active user is down across every public platform that still reports it. The growth in new accounts is happening in places that look nothing like a feed: group chats, small-server communities, paid newsletters, voice rooms, the strange new generation of vertical-video apps whose actual unit of consumption is the channel rather than the stream. The architectural shift is from broadcast to circle, from algorithm to roster, from public to merely visible.",
      { text: "We optimized a generation of products for time spent. The market is now telling us, very clearly, that time spent is not what people want to buy.", cite: "Former growth lead, a major social platform" },
      "What comes after the algorithm",
      "The new generation of social software does not pretend to be neutral. It is opinionated about who should be in the room. It charges, often, a small amount of money. It limits the size of the audience by design. It treats the recommendation algorithm not as the product but as a small, optional, often switchable component of the product. The companies building it are not, mostly, the companies that built the feed. The capital structure is different. The metrics are different. The vocabulary, even, has begun to shift.",
      "What this means for the public square is the question no one has answered yet. The feed, for all its harms, was the only thing the entire society read at the same time. The new architecture is more humane, more sustainable, and considerably more fragmented. Whether the culture downstream of it will be richer or merely smaller is the open question of the decade. The answer is being written, slowly, in a hundred small rooms.",
    ),
  },
];

export const RELATED = [
  { slug: "the-museum-as-a-startup", title: "The Museum as a Startup", category: "culture" as CategorySlug, author: "sasha" as const, readTime: 9, cover: relatedCulture },
  { slug: "private-credit-comes-of-age", title: "Private Credit Comes of Age", category: "finance" as CategorySlug, author: "marcus" as const, readTime: 12, cover: relatedFinance },
  { slug: "the-sky-survey-everyone-missed", title: "The Sky Survey Everyone Missed", category: "science" as CategorySlug, author: "june" as const, readTime: 10, cover: relatedScience },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function articlesByCategory(slug: CategorySlug) {
  return ARTICLES.filter((a) => a.category === slug);
}

export function allArticlesSorted() {
  return [...ARTICLES].sort((a, b) => (a.publishedAtISO < b.publishedAtISO ? 1 : -1));
}
