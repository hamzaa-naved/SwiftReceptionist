import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { niches } from "@/content/niches";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, priority: 1 },
    { url: `${site.url}/demo`, priority: 0.9 },
    { url: `${site.url}/pricing`, priority: 0.9 },
    { url: `${site.url}/industries`, priority: 0.8 },
    { url: `${site.url}/how-it-works`, priority: 0.8 },
    { url: `${site.url}/contact`, priority: 0.8 },
    { url: `${site.url}/results`, priority: 0.6 },
    { url: `${site.url}/about`, priority: 0.5 },
    { url: `${site.url}/blog`, priority: 0.6 },
    { url: `${site.url}/privacy`, priority: 0.2 },
    { url: `${site.url}/terms`, priority: 0.2 },
  ];

  const nicheRoutes: MetadataRoute.Sitemap = niches.map((n) => ({
    url: `${site.url}/industries/${n.slug}`,
    priority: 0.9,
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(p.date + "T00:00:00"),
    priority: 0.5,
  }));

  return [...staticRoutes, ...nicheRoutes, ...postRoutes];
}
