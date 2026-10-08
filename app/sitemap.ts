import type { MetadataRoute } from "next";
import { articles } from "@/lib/content";
import { nav, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", ...nav.map((n) => n.href), "/aetherion"].map((path) => ({ url: `${site.url}${path}`, lastModified: new Date() }));
  const posts = articles.map((a) => ({ url: `${site.url}/journal/${a.slug}`, lastModified: new Date(a.date) }));
  return [...pages, ...posts];
}
