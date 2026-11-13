import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Cormorant_Garamond, Jost, Noto_Serif_Malayalam, Manjari } from "next/font/google";
import { isLocale, localeParams } from "@/lib/i18n";
import { businessLd } from "@/lib/seo";
import { site } from "@content/site";
import { copy } from "@content/copy";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactBar } from "@/components/ContactBar";
import { Motion } from "@/components/Motion";
import { JsonLd } from "@/components/JsonLd";
import "../globals.css";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-jost", display: "swap" });
const mlSerif = Noto_Serif_Malayalam({ subsets: ["malayalam"], weight: ["400", "500", "600"], variable: "--font-ml-serif", display: "swap", preload: false });
const mlSans = Manjari({ subsets: ["malayalam"], weight: ["400", "700"], variable: "--font-ml-sans", display: "swap", preload: false });

export const dynamicParams = false;
export const generateStaticParams = localeParams;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Angel's — Bridal Saree Draping & Makeup, Nilambur, Kerala", template: "%s · Angel's" },
  applicationName: site.name,
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = { themeColor: "#541b2b" };

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = copy[locale];

  return (
    <html lang={locale} className={`${cormorant.variable} ${jost.variable} ${mlSerif.variable} ${mlSans.variable}`} suppressHydrationWarning>
      <body>
        <Script id="motion-flag" strategy="beforeInteractive">{`if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')`}</Script>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ivory focus:px-4 focus:py-2">
          {t.skip}
        </a>
        <Header locale={locale} t={{ nav: t.nav, cta: t.cta, language: t.language, waText: t.whatsapp.generic }} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
        <ContactBar waText={t.whatsapp.generic} whatsapp={t.cta.whatsappShort} call={t.cta.callShort} />
        <Motion />
        <JsonLd data={businessLd(locale)} />
      </body>
    </html>
  );
}
