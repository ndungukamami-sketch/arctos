import type { MetadataRoute } from "next";
import { getAllBriefs } from "@/lib/briefs";

const SITE = "https://arctos.africa";

export default function sitemap(): MetadataRoute.Sitemap {
  const briefs = getAllBriefs().map((b) => ({
    url: `${SITE}/briefs/${b.slug}`,
    lastModified: /^\d{4}-\d{2}$/.test(b.date)
      ? new Date(`${b.date}-01T00:00:00Z`)
      : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...briefs,
  ];
}
