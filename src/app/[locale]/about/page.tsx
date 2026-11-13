import type { Metadata } from "next";
import { href, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { copy } from "@content/copy";
import { Photo } from "@/components/Photo";
import { Breadcrumbs, PageIntro } from "@/components/page";
import { Enquiry } from "@/components/home";
import { Thread } from "@/components/ui";

const meta = {
  en: { title: "About — 25 Years of Bridal Styling in Nilambur", description: "Angel's grew from Angel's Beauty Parlour in Manimooly, Nilambur, founded by Merlin Sanoj — 25 years of bridal makeup and saree draping for weddings and church functions." },
  ml: { title: "ഞങ്ങളെക്കുറിച്ച് — നിലമ്പൂരിൽ 25 വർഷത്തെ ബ്രൈഡൽ സ്റ്റൈലിംഗ്", description: "മെർലിൻ സനോജ് സ്ഥാപിച്ച മണിമൂളിയിലെ ഏഞ്ചൽസ് ബ്യൂട്ടി പാർലറിൽ നിന്ന് — 25 വർഷത്തെ ബ്രൈഡൽ മേക്കപ്പും സാരി ഡ്രേപ്പിംഗും." },
};

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMeta(locale, "/about", meta[locale].title, meta[locale].description, "artistry-consult");
}

export default async function About({ params }: PageProps<"/[locale]/about">) {
  const locale = (await params).locale as Locale;
  const t = copy[locale];
  const a = t.about;

  return (
    <>
      <PageIntro eyebrow={a.eyebrow} title={a.title}>
        <Breadcrumbs items={[{ name: t.breadcrumbHome, path: href(locale) }, { name: t.nav.about, path: href(locale, "/about") }]} />
      </PageIntro>

      <section className="gutter grid gap-14 pb-28 md:grid-cols-12 md:pb-40">
        <div className="md:col-span-6">
          <div data-reveal="img" className="relative aspect-[4/5] overflow-hidden">
            <Photo id="artistry-consult" locale={locale} sizes="(min-width:768px) 50vw, 100vw" className="absolute inset-0" />
          </div>
        </div>
        <div className="md:col-span-5 md:col-start-8 md:self-center">
          <p className="display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-snug text-burgundy" data-reveal="lines">{a.intro}</p>
        </div>
      </section>

      <section className="bg-beige">
        <ol className="gutter grid gap-14 py-28 md:grid-cols-3 md:gap-10 md:py-36">
          {a.chapters.map((c, i) => (
            <li key={c.title} data-reveal="fade" data-delay={String(i * 0.1)}>
              <Thread />
              <p className="eyebrow mt-6 text-gold-muted">{c.label}</p>
              <h2 className="display mt-4 text-3xl text-burgundy">{c.title}</h2>
              <p className="mt-4 text-charcoal/80">{c.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="gutter py-28 md:py-40">
        <h2 className="display text-[clamp(2.25rem,5vw,4.5rem)] text-burgundy" data-reveal="lines">{a.peopleTitle}</h2>
        <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-20">
          {a.people.map((p) => (
            <article key={p.name} data-reveal="fade">
              <p className="display text-[clamp(2.5rem,5vw,4rem)] text-burgundy">{p.name}</p>
              <p className="eyebrow mt-3 text-gold-muted">{p.role}</p>
              <p className="mt-6 max-w-md text-charcoal/80">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-burgundy text-ivory">
        <div className="gutter py-28 md:py-36">
          <h2 className="display text-[clamp(2.25rem,5vw,4.5rem)]" data-reveal="lines">{a.valuesTitle}</h2>
          <ul className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4" data-reveal="stagger">
            {a.values.map((v) => (
              <li key={v.title}>
                <span aria-hidden className="block h-px w-10 bg-gold" />
                <h3 className="display mt-6 text-3xl">{v.title}</h3>
                <p className="mt-3 text-ivory/75">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Enquiry locale={locale} />
    </>
  );
}
