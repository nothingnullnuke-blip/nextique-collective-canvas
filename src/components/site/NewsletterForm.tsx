import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

type Source = "homepage" | "footer" | "newsletter-page";
type Status = "idle" | "loading" | "success" | "duplicate" | "error";

const emailSchema = z.string().trim().email().max(255);

const SESSION_KEY = "nextique:newsletter:submitted";

function alreadySubmitted(email: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    return JSON.parse(raw).includes(email.toLowerCase());
  } catch {
    return false;
  }
}

function markSubmitted(email: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    list.push(email.toLowerCase());
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

type Variant = "footer" | "block";

export function NewsletterForm({
  source,
  variant = "block",
  placeholder = "your@email.com",
  ctaLabel = "Subscribe",
}: {
  source: Source;
  variant?: Variant;
  placeholder?: string;
  ctaLabel?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [clientError, setClientError] = useState<string | null>(null);

  const compact = variant === "footer";

  if (status === "success" || status === "duplicate") {
    const message =
      status === "success" ? "You're on the list." : "Already subscribed.";
    return (
      <p
        className={
          compact
            ? "mt-8 max-w-sm font-serif italic text-[15px] text-foreground/70 hairline-b pb-2"
            : "mt-12 max-w-xl font-serif italic text-[20px] text-foreground/80 hairline-b pb-3"
        }
        role="status"
      >
        {message}
      </p>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setClientError(null);

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setClientError("Please enter a valid email.");
      return;
    }

    if (alreadySubmitted(parsed.data)) {
      setStatus("duplicate");
      return;
    }

    setStatus("loading");

    const { error } = await supabase
      .from("subscribers")
      .insert({ email: parsed.data, source });

    if (!error) {
      markSubmitted(parsed.data);
      setStatus("success");
      return;
    }

    // 23505 = unique_violation
    if (error.code === "23505") {
      markSubmitted(parsed.data);
      setStatus("duplicate");
      return;
    }

    setStatus("error");
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={
        compact
          ? "mt-8 max-w-sm"
          : "mt-12 max-w-xl"
      }
    >
      <div
        className={
          compact
            ? "flex items-center gap-3 hairline-b pb-2"
            : "flex items-center gap-3 hairline-b pb-3"
        }
      >
        <input
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          maxLength={255}
          aria-label="Email address"
          placeholder={placeholder}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
            if (clientError) setClientError(null);
          }}
          className={
            (compact
              ? "flex-1 bg-transparent text-[14px] "
              : "flex-1 bg-transparent text-[16px] ") +
            "text-foreground placeholder:text-text-subtle outline-none focus:outline-none caret-accent-gold"
          }
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={
            "eyebrow transition-colors duration-200 " +
            (status === "loading"
              ? "text-text-subtle"
              : "text-foreground hover:text-accent-gold")
          }
        >
          {status === "loading" ? "Sending…" : compact ? "Join →" : ctaLabel + " →"}
        </button>
      </div>

      {clientError ? (
        <p className="meta mt-3 text-foreground/70">{clientError}</p>
      ) : status === "error" ? (
        <p className="meta mt-3 text-foreground/70">
          Something went wrong. Try again.
        </p>
      ) : (
        <p className="meta mt-3 text-text-subtle">
          Unsubscribe in one click. We will never share your address.
        </p>
      )}
    </form>
  );
}
