import type { Metadata } from "next";
import { siteUrl } from "@content/site";
import type { Service } from "@content/services";
import { getContent, type Content } from "./content";
import { href, type Locale } from "./i18n";

export const abs = (path: string) => new URL(path, siteUrl).toString();

type Page = keyof Content["seo"]["pages"];

export async function pageMeta(locale: Locale, path: string, title: string, description: string, imageId = "hero-desktop"): Promise<Metadata> {
  const c = await getContent();
  const img = c.asset(imageId);
  const url = href(locale, path);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { "en-IN": href("en", path), "ml-IN": href("ml", path), "x-default": href("en", path) },
    },
    openGraph: {
      type: "website",
      siteName: c.site.name,
      locale: locale === "en" ? "en_IN" : "ml_IN",
      url,
      title,
      description,
      images: img.src ? [{ url: img.src, width: img.width, height: img.height, alt: img.alt[locale] }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export async function pageSeo(locale: Locale, page: Page, path: string) {
  const p = (await getContent()).seo.pages[page];
  return pageMeta(locale, path, p.title[locale], p.description[locale], p.image);
}

export function businessLd(c: Content, locale: Locale) {
  const img = c.asset("hero-desktop");
  const { site } = c;
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": abs("/#business"),
    name: site.name,
    alternateName: site.legalName,
    url: abs(href(locale)),
    telephone: site.phone,
    image: img.src ? abs(img.src) : undefined,
    description: site.tagline[locale],
    founder: { "@type": "Person", name: site.founder },
    address: {
      "@type": "PostalAddress",
      addressLocality: `${site.location.locality}, ${site.location.town}`,
      addressRegion: `${site.location.district}, ${site.location.region}`,
      addressCountry: site.location.country,
    },
    areaServed: { "@type": "State", name: "Kerala" },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: site.hours.open,
      closes: site.hours.close,
    },
    sameAs: [site.instagram.url],
    knowsLanguage: ["en", "ml"],
  };
}

export function serviceLd(s: Service, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name[locale],
    description: s.short[locale],
    serviceType: s.name.en,
    url: abs(href(locale, `/services/${s.slug}`)),
    provider: { "@id": abs("/#business") },
    areaServed: { "@type": "State", name: "Kerala" },
    offers:
      s.showPrice && s.priceFrom > 0
        ? { "@type": "Offer", priceCurrency: "INR", priceSpecification: { "@type": "PriceSpecification", minPrice: s.priceFrom, priceCurrency: "INR" } }
        : undefined,
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}
