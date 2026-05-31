import { createServerFn } from "@tanstack/react-start";
import { getRequest, getRequestHeader } from "@tanstack/react-start/server";
import { createHash } from "crypto";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const N8N_WEBHOOK_URL = "https://meran8n.dpdns.org/webhook/nextique-subscriber";
const MAX_ATTEMPTS_PER_HOUR = 3;

const inputSchema = z.object({
  email: z.string().trim().email().max(255),
  source: z.enum(["homepage", "footer", "newsletter-page"]),
  // honeypot — must be empty
  website: z.string().max(0).optional().default(""),
});

export type SubscribeResult =
  | { status: "success" }
  | { status: "duplicate" }
  | { status: "rate_limited" }
  | { status: "error" };

function getClientIp(): string {
  try {
    const req = getRequest();
    const fwd =
      getRequestHeader("cf-connecting-ip") ||
      getRequestHeader("x-real-ip") ||
      getRequestHeader("x-forwarded-for");
    if (fwd) return fwd.split(",")[0]!.trim();
    // Fallback to a stable bucket if no IP can be derived
    return new URL(req.url).hostname || "unknown";
  } catch {
    return "unknown";
  }
}

function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? "nextique-default-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

async function fireWebhook(payload: {
  email: string;
  source: string;
  subscribed_at: string;
}) {
  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error(
        `[subscribe] n8n webhook returned ${res.status} ${res.statusText}`,
      );
    }
  } catch (err) {
    console.error("[subscribe] n8n webhook failed:", err);
  }
}

export const subscribe = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    const parsed = inputSchema.safeParse(data);
    if (!parsed.success) {
      // Treat invalid input as a soft error so we don't leak validator details.
      return { email: "", source: "homepage" as const, website: "invalid" };
    }
    return parsed.data;
  })
  .handler(async ({ data }): Promise<SubscribeResult> => {
    // Honeypot — pretend success, never touch the DB.
    if (data.website && data.website.length > 0) {
      return { status: "success" };
    }
    if (!data.email) {
      return { status: "error" };
    }

    const ip = getClientIp();
    const ip_hash = hashIp(ip);
    const user_agent = (getRequestHeader("user-agent") ?? "").slice(0, 512);

    // Rate limit: count recent inserts from this IP hash.
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count, error: countError } = await supabaseAdmin
      .from("subscribers")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ip_hash)
      .gte("created_at", oneHourAgo);

    if (countError) {
      console.error("[subscribe] rate-limit count failed:", countError);
      return { status: "error" };
    }
    if ((count ?? 0) >= MAX_ATTEMPTS_PER_HOUR) {
      return { status: "rate_limited" };
    }

    const email = data.email.toLowerCase();
    const subscribed_at = new Date().toISOString();

    const { error } = await supabaseAdmin
      .from("subscribers")
      .insert({
        email,
        source: data.source,
        ip_hash,
        user_agent,
        confirmed: false,
      });

    if (error) {
      // 23505 = unique_violation -> duplicate email
      if ((error as { code?: string }).code === "23505") {
        return { status: "duplicate" };
      }
      console.error("[subscribe] insert failed:", error);
      return { status: "error" };
    }

    // Fire-and-forget n8n webhook; never fail the subscription on its account.
    await fireWebhook({ email, source: data.source, subscribed_at });

    return { status: "success" };
  });
