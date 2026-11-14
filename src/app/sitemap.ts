import type { MetadataRoute } from "next";
import { href, locales } from "@/lib/i18n";
import { abs } from "@/lib/seo";
import { getContent } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { visibleServices } = await getContent();
  const paths = ["/", "/services", "/lookbook", "/about", "/contact", ...visibleServices.map((s) => `/services/${s.slug}`)];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: abs(href(locale, path)),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : path.startsWith("/services/") ? 0.8 : 0.6,
      alternates: { languages: { "en-IN": abs(href("en", path)), "ml-IN": abs(href("ml", path)), "x-default": abs(href("en", path)) } },
    })),
  );
}
