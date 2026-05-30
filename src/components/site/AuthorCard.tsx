import type { Author } from "@/lib/content";

export function AuthorCard({ author }: { author: Author }) {
  return (
    <aside className="container-editorial py-14">
      <div className="reading-column flex items-center gap-5 hairline-t hairline-b py-8">
        <img
          src={author.avatar}
          alt=""
          width={64}
          height={64}
          loading="lazy"
          className="h-14 w-14 rounded-full object-cover grayscale"
        />
        <div className="flex-1 min-w-0">
          <div className="eyebrow text-text-subtle mb-1">Written by</div>
          <div className="font-serif text-[22px] leading-tight text-foreground">
            {author.name}
          </div>
          <p className="meta mt-1">{author.bio}</p>
        </div>
      </div>
    </aside>
  );
}
