import { createFileRoute } from "@tanstack/react-router";
import { HeroFeature } from "@/components/site/HeroFeature";
import { EditorialBentoGrid } from "@/components/site/EditorialBentoGrid";
import { TopicShowcase } from "@/components/site/TopicShowcase";
import { RankedList } from "@/components/site/RankedList";
import { NewsletterBlock } from "@/components/site/NewsletterBlock";
import heroImage from "@/assets/hero-technology.jpg";

const DOMAIN = "https://id-preview--01700b05-4d29-4cbf-91ab-acec504e8727.lovable.app";

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
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: `${DOMAIN}${heroImage}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${DOMAIN}${heroImage}` },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Nextique",
          url: "/",
          description:
            "Modern editorial for technology, culture, finance, science, wellness, style and digital society.",
        }),
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
