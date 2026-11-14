import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Cormorant_Garamond, Jost, Noto_Serif_Malayalam, Manjari } from "next/font/google";
import { isLocale, localeParams } from "@/lib/i18n";
import { businessLd } from "@/lib/seo";
import { siteUrl } from "@content/site";
import { getContent } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactBar } from "@/components/ContactBar";
import { SiteProvider } from "@/components/CallLink";
import { Motion } from "@/components/Motion";
import { JsonLd } from "@/components/JsonLd";
import "../globals.css";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-jost", display: "swap" });
const mlSerif = Noto_Serif_Malayalam({ subsets: ["malayalam"], weight: ["400", "500", "600"], variable: "--font-ml-serif", display: "swap", preload: false });
const mlSans = Manjari({ subsets: ["malayalam"], weight: ["400", "700"], variable: "--font-ml-sans", display: "swap", preload: false });

export const dynamicParams = false;
export const generateStaticParams = localeParams;

export async function generateMetadata(): Promise<Metadata> {
  const { seo, site } = await getContent();
  const google = seo.verification.google || process.env.NEXT_PUBLIC_GSC_VERIFICATION;
  const bing = seo.verification.bing || process.env.NEXT_PUBLIC_BING_VERIFICATION;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: seo.defaultTitle, template: `%s · ${site.name}` },
    applicationName: site.name,
    verification: { google, other: bing ? { "msvalidate.01": bing } : undefined },
  };
}

export const viewport: Viewport = { themeColor: "#541b2b" };

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = await getContent();
  const t = c.t(locale);
  const b = c.banner;

  return (
    <html lang={locale} className={`${cormorant.variable} ${jost.variable} ${mlSerif.variable} ${mlSans.variable}`} suppressHydrationWarning>
      <body>
        <Script id="motion-flag" strategy="beforeInteractive">{`if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')`}</Script>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ivory focus:px-4 focus:py-2">
          {t.skip}
        </a>
        <SiteProvider value={{ whatsapp: c.site.whatsapp, phone: c.site.phone, callHours: c.site.callHours }}>
          <Header
            locale={locale}
            t={{ nav: t.nav, cta: t.cta, language: t.language, waText: t.whatsapp.generic }}
            instagram={c.site.instagram}
            banner={b.show && b.text[locale] ? { text: b.text[locale], link: b.link, linkLabel: b.linkLabel[locale] } : null}
          />
          <main id="main">{children}</main>
          <Footer locale={locale} />
          <ContactBar waText={t.whatsapp.generic} whatsapp={t.cta.whatsappShort} call={t.cta.callShort} />
        </SiteProvider>
        <Motion />
        <JsonLd data={businessLd(c, locale)} />
      </body>
    </html>
  );
}
