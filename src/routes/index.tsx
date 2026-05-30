import { createFileRoute } from "@tanstack/react-router";
import { HeroFeature } from "@/components/site/HeroFeature";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nextique — Modern editorial for technology, culture, and taste" },
      {
        name: "description",
        content:
          "An editorial brand for people who take culture, technology, and taste seriously. Three considered stories a week.",
      },
      { property: "og:title", content: "Nextique" },
      {
        property: "og:description",
        content:
          "An editorial brand for people who take culture, technology, and taste seriously.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HeroFeature />
      {/* Phase 2 reserves this vertical space for the editorial bento grid */}
      <section aria-hidden className="h-[40vh]" />
    </>
  );
}
