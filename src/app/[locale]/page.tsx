import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import { Artistry, Bridal, DrapingRail, Enquiry, Hero, Instagram, Intro, LookbookPreview, Occasions, Testimonials, Why } from "@/components/home";

const meta = {
  en: {
    title: "Angel's — Bridal Saree Draping & Makeup in Nilambur, Kerala",
    description: "Bridal saree draping, Kanjeevaram and Kerala kasavu styling, bridal makeup and hair by Angel's Beauty Parlour, Nilambur — 25 years of experience. Enquire on WhatsApp.",
  },
  ml: {
    title: "Angel's — ബ്രൈഡൽ സാരി ഡ്രേപ്പിംഗ് & മേക്കപ്പ്, നിലമ്പൂർ",
    description: "ബ്രൈഡൽ സാരി ഡ്രേപ്പിംഗ്, കാഞ്ചീപുരം, കേരള കസവ് സ്റ്റൈലിംഗ്, ബ്രൈഡൽ മേക്കപ്പ് — 25 വർഷത്തെ അനുഭവവുമായി ഏഞ്ചൽസ് ബ്യൂട്ടി പാർലർ, നിലമ്പൂർ. വാട്സ്ആപ്പിൽ അന്വേഷിക്കൂ.",
  },
};

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return { ...pageMeta(locale, "/", meta[locale].title, meta[locale].description), title: { absolute: meta[locale].title } };
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const locale = (await params).locale as Locale;
  return (
    <>
      <Hero locale={locale} />
      <Intro locale={locale} />
      <Artistry locale={locale} />
      <Bridal locale={locale} />
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
