import type { Metadata } from "next";
import { href, type Locale } from "@/lib/i18n";
import { pageSeo } from "@/lib/seo";
import { getContent } from "@/lib/content";
import { lookCategories, type LookCategory } from "@content/lookbook";
import { Breadcrumbs, PageIntro } from "@/components/page";
import { LookbookGrid } from "@/components/LookbookGrid";
import { Enquiry } from "@/components/home";

export async function generateMetadata({ params }: PageProps<"/[locale]/lookbook">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageSeo(locale, "lookbook", "/lookbook");
}

export default async function Lookbook({ params }: PageProps<"/[locale]/lookbook">) {
  const locale = (await params).locale as Locale;
  const c = await getContent();
  const t = c.t(locale);
  const looks = c.lookbook.items.map(({ image: id, category }) => {
    const a = c.asset(id);
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
