import type { Metadata } from "next";
import { href, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { waUrl } from "@/lib/contact";
import { copy } from "@content/copy";
import { site } from "@content/site";
import { visibleServices } from "@content/services";
import { Breadcrumbs, PageIntro } from "@/components/page";
import { EnquiryForm } from "@/components/EnquiryForm";
import { CallLink } from "@/components/CallLink";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { btn } from "@/components/ui";

const meta = {
  en: { title: "Contact — WhatsApp, Call or Visit in Nilambur", description: "Enquire about bridal saree draping and makeup on WhatsApp +91 94461 29996. Angel's Beauty Parlour, Manimooly, Nilambur, Malappuram — serving all of Kerala." },
  ml: { title: "ബന്ധപ്പെടുക — വാട്സ്ആപ്പ്, ഫോൺ, നിലമ്പൂർ", description: "ബ്രൈഡൽ സാരി ഡ്രേപ്പിംഗിനും മേക്കപ്പിനും വാട്സ്ആപ്പ് +91 94461 29996. ഏഞ്ചൽസ് ബ്യൂട്ടി പാർലർ, മണിമൂളി, നിലമ്പൂർ — കേരളമെമ്പാടും." },
};

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMeta(locale, "/contact", meta[locale].title, meta[locale].description, "enquiry-bg");
}

export default async function Contact({ params }: PageProps<"/[locale]/contact">) {
  const locale = (await params).locale as Locale;
  const t = copy[locale];
  const c = t.contact;
  const card = "border-t border-gold/50 pt-6";

  return (
    <>
      <PageIntro eyebrow={c.eyebrow} title={c.title} body={c.body}>
        <Breadcrumbs items={[{ name: t.breadcrumbHome, path: href(locale) }, { name: t.nav.contact, path: href(locale, "/contact") }]} />
      </PageIntro>

      <section className="gutter grid gap-16 pb-28 md:grid-cols-12 md:pb-40">
        <div className="grid content-start gap-10 sm:grid-cols-2 md:col-span-5 md:grid-cols-1" data-reveal="stagger">
          <div className={card}>
            <h2 className="display text-3xl text-burgundy">{c.whatsappTitle}</h2>
            <p className="mt-2 text-charcoal/80">{c.whatsappBody}</p>
            <a href={waUrl(t.whatsapp.generic)} target="_blank" rel="noopener" data-track="whatsapp" className={`${btn.primary} mt-5`}>
              <WhatsAppIcon className="size-4" /> {site.phoneDisplay}
            </a>
          </div>
          <div className={card}>
            <h2 className="display text-3xl text-burgundy">{c.callTitle}</h2>
            <p className="mt-2 text-charcoal/80">{c.callBody}</p>
            <CallLink label={site.phoneDisplay} closedLabel={t.cta.callClosed} className={`${btn.outline} mt-5`} />
          </div>
          <div className={card}>
            <h2 className="display text-3xl text-burgundy">{c.visitTitle}</h2>
            <p className="mt-2 text-charcoal/80">{c.visitBody}</p>
          </div>
          <div className={card}>
            <h2 className="display text-3xl text-burgundy">{c.areaTitle}</h2>
            <p className="mt-2 text-charcoal/80">{c.areaBody}</p>
          </div>
          <div className={card}>
            <h2 className="display text-3xl text-burgundy">{c.instagramTitle}</h2>
            <a href={site.instagram.url} target="_blank" rel="noopener" className="mt-3 inline-flex items-center gap-2 text-burgundy underline decoration-gold underline-offset-4">
              <InstagramIcon className="size-4" /> @{site.instagram.handle}
            </a>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7" data-reveal="fade">
          <h2 className="display text-[clamp(2rem,4vw,3.5rem)] text-burgundy">{t.enquiry.title}</h2>
          <p className="mb-10 mt-4 text-charcoal/80">{t.enquiry.body}</p>
          <EnquiryForm t={t.enquiry} wa={t.whatsapp} occasions={t.occasionsList} services={visibleServices.map((s) => ({ slug: s.slug, name: s.name[locale] }))} />
        </div>
      </section>
    </>
  );
}
