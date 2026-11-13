import type { Metadata } from "next";
import { href, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { asset } from "@/lib/assets";
import { copy } from "@content/copy";
import { lookbook, lookCategories, type LookCategory } from "@content/lookbook";
import { Breadcrumbs, PageIntro } from "@/components/page";
import { LookbookGrid } from "@/components/LookbookGrid";
import { Enquiry } from "@/components/home";

const meta = {
  en: { title: "Lookbook — Bridal Saree & Kerala Styling Inspiration", description: "Styling inspiration for Kanjeevaram bridal sarees, Kerala kasavu, reception looks, bridal makeup and hair. Share a look with Angel's on WhatsApp." },
  ml: { title: "ലുക്ക്ബുക്ക് — ബ്രൈഡൽ സാരി, കേരള സ്റ്റൈലിംഗ് പ്രചോദനം", description: "കാഞ്ചീപുരം ബ്രൈഡൽ സാരി, കേരള കസവ്, റിസപ്ഷൻ ലുക്കുകൾ, ബ്രൈഡൽ മേക്കപ്പ്, ഹെയർ — സ്റ്റൈലിംഗ് പ്രചോദനം." },
};

export async function generateMetadata({ params }: PageProps<"/[locale]/lookbook">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMeta(locale, "/lookbook", meta[locale].title, meta[locale].description, "svc-kanjeevaram-bridal");
}

export default async function Lookbook({ params }: PageProps<"/[locale]/lookbook">) {
  const locale = (await params).locale as Locale;
  const t = copy[locale];
  const looks = lookbook.map(({ id, category }) => {
    const a = asset(id);
    return { id, category, src: a.src, width: a.width, height: a.height, blur: a.blur, alt: a.alt[locale] };
  });
  const categories = (Object.keys(lookCategories) as LookCategory[])
    .filter((c) => looks.filter((l) => l.category === c).length >= 4)
    .map((c) => ({ key: c, label: lookCategories[c][locale] }));

  return (
    <>
      <PageIntro eyebrow={t.lookbook.eyebrow} title={t.lookbook.title} body={t.lookbook.body}>
        <Breadcrumbs items={[{ name: t.breadcrumbHome, path: href(locale) }, { name: t.nav.lookbook, path: href(locale, "/lookbook") }]} />
      </PageIntro>
      <section className="gutter pb-28 md:pb-40">
        <LookbookGrid
          looks={looks}
          categories={categories}
          t={{ all: t.lookbook.all, close: t.lookbook.close, prev: t.lookbook.prev, next: t.lookbook.next, enquire: t.cta.enquireLook, waTemplate: t.whatsapp.look }}
        />
      </section>
      <Enquiry locale={locale} />
    </>
  );
}
