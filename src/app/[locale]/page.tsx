import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { Artistry, Bridal, Makeup, DrapingRail, Enquiry, Hero, Instagram, Intro, LookbookPreview, Occasions, Testimonials, Why } from "@/components/home";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const m = await pageSeo(locale, "home", "/");
  return { ...m, title: { absolute: (await getContent()).seo.pages.home.title[locale] } };
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const locale = (await params).locale as Locale;
  return (
    <>
      <Hero locale={locale} />
      <Intro locale={locale} />
      <Artistry locale={locale} />
      <Bridal locale={locale} />
      <Makeup locale={locale} />
      <DrapingRail locale={locale} />
      <Occasions locale={locale} />
      <LookbookPreview locale={locale} />
      <Why locale={locale} />
      <Testimonials locale={locale} />
      <Instagram locale={locale} />
      <Enquiry locale={locale} />
    </>
  );
}
