import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { href, locales, type Locale } from "@/lib/i18n";
import { pageMeta, serviceLd } from "@/lib/seo";
import { fill } from "@/lib/contact";
import { formatPrice, getContent } from "@/lib/content";
import { Photo } from "@/components/Photo";
import { Breadcrumbs } from "@/components/page";
import { JsonLd } from "@/components/JsonLd";
import { CallLink, WhatsAppButton } from "@/components/CallLink";
import { Enquiry, serviceWaText } from "@/components/home";
import { btn, Thread } from "@/components/ui";

export const dynamicParams = true;
export async function generateStaticParams() {
  const { visibleServices } = await getContent();
  return locales.flatMap((locale) => visibleServices.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/services/[slug]">): Promise<Metadata> {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  const c = await getContent();
  const s = c.service(slug);
  if (!s) return {};
  const where = locale === "en" ? " — Nilambur, Kerala" : " — നിലമ്പൂർ, കേരളം";
  const title = s.seo.title[locale] || `${s.name[locale]}${where}`;
  const description = s.seo.description[locale] || `${s.short[locale]} ${c.t(locale).services.whereValue}`.slice(0, 158);
  return pageMeta(locale, `/services/${slug}`, title, description, s.image);
}

export default async function ServicePage({ params }: PageProps<"/[locale]/services/[slug]">) {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  const c = await getContent();
  const s = c.service(slug);
  if (!s) notFound();
  const t = c.t(locale);
  const related = c.visibleServices.filter((x) => x.slug !== s.slug && (x.group === s.group || x.group === "beauty")).slice(0, 3);

  return (
    <>
      <section className="grid pt-[4.5rem] md:min-h-svh md:grid-cols-2 md:pt-0">
        <div className="relative aspect-[4/5] md:aspect-auto">
          <div data-reveal="img" className="absolute inset-0 overflow-hidden">
            <Photo id={s.image} locale={locale} sizes="(min-width:768px) 50vw, 100vw" priority className="absolute inset-0" />
          </div>
        </div>
        <div className="gutter flex flex-col justify-center py-16 md:pt-32">
          <Breadcrumbs
            items={[
              { name: t.breadcrumbHome, path: href(locale) },
              { name: t.nav.services, path: href(locale, "/services") },
              { name: s.name[locale], path: href(locale, `/services/${s.slug}`) },
            ]}
          />
          <h1 className="display text-[clamp(2.5rem,5vw,4.75rem)] text-burgundy" data-reveal="lines">{s.name[locale]}</h1>
          <p className="display mt-6 text-2xl italic text-gold-muted ml:not-italic" data-reveal="fade">{s.short[locale]}</p>
          {s.showPrice && s.priceFrom > 0 && (
            <p className="eyebrow mt-6 text-burgundy" data-reveal="fade">{fill(t.services.priceFrom, { price: formatPrice(s.priceFrom) })}</p>
          )}
          <p className="mt-8 max-w-lg text-charcoal/85" data-reveal="fade" data-delay="0.1">{s.intro[locale]}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" data-reveal="fade" data-delay="0.2">
            <WhatsAppButton text={await serviceWaText(locale, s.name[locale])} label={t.cta.enquireService} />
            <CallLink label={t.cta.call} closedLabel={t.cta.callClosed} className={btn.outline} />
          </div>
        </div>
      </section>

      <section className="gutter grid gap-12 py-24 md:grid-cols-3 md:gap-10 md:py-32">
        <div data-reveal="fade">
          <Thread />
          <h2 className="eyebrow mt-6 text-gold-muted">{t.services.included}</h2>
          <ul className="mt-5 space-y-3">
            {s.includes[locale].map((i) => (
              <li key={i} className="flex gap-3"><span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-gold" />{i}</li>
            ))}
          </ul>
        </div>
        <div data-reveal="fade" data-delay="0.1">
          <Thread />
          <h2 className="eyebrow mt-6 text-gold-muted">{t.services.where}</h2>
          <p className="mt-5">{t.services.whereValue}</p>
        </div>
        <div data-reveal="fade" data-delay="0.2">
          <Thread />
          <h2 className="eyebrow mt-6 text-gold-muted">{t.services.goodToKnow}</h2>
          <p className="mt-5">{t.services.goodToKnowValue}</p>
        </div>
      </section>

      <section className="gutter pb-28 md:pb-36">
        <h2 className="display text-[clamp(2rem,4vw,3.5rem)] text-burgundy" data-reveal="lines">{t.services.related}</h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug} data-reveal="fade">
              <Link href={href(locale, `/services/${r.slug}`)} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Photo id={r.image} locale={locale} sizes="(min-width:640px) 31vw, 100vw" className="absolute inset-0" imgClassName="transition-transform duration-[1.4s] group-hover:scale-[1.05]" />
                </div>
                <h3 className="display mt-5 text-2xl text-burgundy">{r.name[locale]}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Enquiry locale={locale} preset={s.slug} />
      <JsonLd data={serviceLd(s, locale)} />
    </>
  );
}
