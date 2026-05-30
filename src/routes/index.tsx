import { createFileRoute } from "@tanstack/react-router";
import { HeroFeature } from "@/components/site/HeroFeature";
import { EditorialBentoGrid } from "@/components/site/EditorialBentoGrid";
import { TopicShowcase } from "@/components/site/TopicShowcase";
import { RankedList } from "@/components/site/RankedList";
import { NewsletterBlock } from "@/components/site/NewsletterBlock";

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
      <EditorialBentoGrid />
      <TopicShowcase />
      <RankedList />
      <NewsletterBlock />
    </>
  );
}
