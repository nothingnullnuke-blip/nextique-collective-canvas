/**
 * Payload CMS REST client.
 *
 * Talks to a self-hosted Payload instance (e.g. https://cms.nextique.pro/api).
 * Base URL is read from PAYLOAD_API_URL (server) or VITE_PAYLOAD_API_URL (client/SSR-safe).
 */

export type CategorySlug =
  | "technology"
  | "culture"
  | "finance"
  | "science"
  | "wellness"
  | "style"
  | "digital-society";

export type CmsAuthor = {
  id?: string;
  name: string;
  bio?: string;
  avatar?: { url: string } | string | null;
};

export type CmsBlock =
  | { blockType: "paragraph"; text: string }
  | { blockType: "heading"; level: 2 | 3; id?: string; text: string }
  | { blockType: "image"; src: string; alt: string; caption?: string }
  | { blockType: "pullquote"; text: string; cite?: string };

export type Post = {
  id: string;
  slug: string;
  title: string;
  dek: string;
  category: CategorySlug;
  featured?: boolean;
  author: CmsAuthor;
  publishedAt: string; // ISO
  readTime: number;
  cover: { url: string } | string;
  blocks: CmsBlock[];
};

type PaginatedResponse<T> = {
  docs: T[];
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

function getBaseUrl(): string {
  // process.env available in server fns / SSR; import.meta.env for client bundles.
  const serverUrl =
    typeof process !== "undefined" ? process.env?.PAYLOAD_API_URL : undefined;
  const clientUrl =
    typeof import.meta !== "undefined"
      ? (import.meta as ImportMeta & { env?: Record<string, string> }).env
          ?.VITE_PAYLOAD_API_URL
      : undefined;
  const url = serverUrl || clientUrl;
  if (!url) {
    throw new Error(
      "PAYLOAD_API_URL is not set. Add it to .env (server) and VITE_PAYLOAD_API_URL (client).",
    );
  }
  return url.replace(/\/$/, "");
}

async function cmsFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${getBaseUrl()}${path}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Payload CMS request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

export async function getAllPosts(): Promise<Post[]> {
  const data = await cmsFetch<PaginatedResponse<Post>>(
    "/posts?sort=-publishedAt&limit=20",
  );
  return data.docs;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const data = await cmsFetch<PaginatedResponse<Post>>(
    `/posts?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`,
  );
  return data.docs[0] ?? null;
}

export async function getPostsByCategory(
  category: CategorySlug,
): Promise<Post[]> {
  const data = await cmsFetch<PaginatedResponse<Post>>(
    `/posts?where[category][equals]=${encodeURIComponent(category)}`,
  );
  return data.docs;
}

export async function getFeaturedPost(): Promise<Post | null> {
  const data = await cmsFetch<PaginatedResponse<Post>>(
    "/posts?where[featured][equals]=true&limit=1",
  );
  return data.docs[0] ?? null;
}

export async function getRelatedPosts(
  category: CategorySlug,
  excludeSlug: string,
): Promise<Post[]> {
  const data = await cmsFetch<PaginatedResponse<Post>>(
    `/posts?where[category][equals]=${encodeURIComponent(category)}&where[slug][not_equals]=${encodeURIComponent(excludeSlug)}&limit=3`,
  );
  return data.docs;
}
