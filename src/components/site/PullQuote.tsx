export function PullQuote({
  text,
  cite,
  accentVar = "--accent-gold",
}: {
  text: string;
  cite?: string;
  accentVar?: string;
}) {
  return (
    <figure
      className="my-14 pl-6 md:pl-8"
      style={{ borderLeft: `1px solid var(${accentVar})` }}
    >
      <span
        aria-hidden
        className="block font-serif text-[88px] leading-none"
        style={{ color: "var(--accent-gold)" }}
      >
        “
      </span>
      <blockquote className="mt-[-12px] font-serif italic text-[26px] md:text-[28px] leading-snug text-foreground">
        {text}
      </blockquote>
      {cite && (
        <figcaption className="mt-5 eyebrow text-text-muted">— {cite}</figcaption>
      )}
    </figure>
  );
}
