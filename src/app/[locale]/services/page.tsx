import type { Metadata } from "next";
import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { copy } from "@content/copy";
import { groups, visibleServices, type ServiceGroup } from "@content/services";
import { Photo } from "@/components/Photo";
import { Breadcrumbs, PageIntro } from "@/components/page";
import { Enquiry } from "@/components/home";

const meta = {
  en: { title: "Bridal Saree Draping, Makeup & Styling Services", description: "Bridal saree draping, Kanjeevaram and Kerala kasavu draping, reception and occasion styling, pre-pleating, bridal makeup and hair — Angel's, Nilambur, Kerala." },
  ml: { title: "ബ്രൈഡൽ സാരി ഡ്രേപ്പിംഗ്, മേക്കപ്പ്, സ്റ്റൈലിംഗ് സേവനങ്ങൾ", description: "ബ്രൈഡൽ സാരി ഡ്രേപ്പിംഗ്, കാഞ്ചീപുരം, കേരള കസവ്, റിസപ്ഷൻ സ്റ്റൈലിംഗ്, പ്രീ-പ്ലീറ്റിംഗ്, ബ്രൈഡൽ മേക്കപ്പ്, ഹെയർ — Angel's, നിലമ്പൂർ." },
};

export async function generateMetadata({ params }: PageProps<"/[locale]/services">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMeta(locale, "/services", meta[locale].title, meta[locale].description, "bridal-feature");
}

export default async function Services({ params }: PageProps<"/[locale]/services">) {
  const locale = (await params).locale as Locale;
  const t = copy[locale];
  const grouped = (Object.keys(groups) as ServiceGroup[]).map((g) => ({ g, list: visibleServices.filter((s) => s.group === g) })).filter((x) => x.list.length);

  return (
    <>
      <PageIntro eyebrow={t.services.eyebrow} title={t.services.title} body={t.services.body}>
        <Breadcrumbs items={[{ name: t.breadcrumbHome, path: href(locale) }, { name: t.nav.services, path: href(locale, "/services") }]} />
      </PageIntro>

      <div className="gutter space-y-24 pb-28 md:space-y-32 md:pb-40">
        {grouped.map(({ g, list }) => (
          <section key={g} aria-labelledby={`g-${g}`}>
            <div className="flex items-center gap-6">
              <h2 id={`g-${g}`} className="eyebrow shrink-0 text-gold-muted">{groups[g][locale]}</h2>
              <span aria-hidden data-reveal="thread" className="h-px flex-1 origin-left bg-gold/50" />
            </div>
            <ul className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((s) => (
                <li key={s.slug} data-reveal="fade">
                  <Link href={href(locale, `/services/${s.slug}`)} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Photo id={s.image} locale={locale} sizes="(min-width:1024px) 31vw, (min-width:640px) 48vw, 100vw" className="absolute inset-0" imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-silk)] group-hover:scale-[1.05]" />
                    </div>
                    <h3 className="display mt-6 text-[2rem] leading-tight text-burgundy">{s.name[locale]}</h3>
                    <p className="mt-2 text-charcoal/75">{s.short[locale]}</p>
                    <span className="eyebrow mt-4 inline-block text-gold-muted transition-colors group-hover:text-burgundy">{t.cta.learnMore} →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <Enquiry locale={locale} />
    </>
  );
}
