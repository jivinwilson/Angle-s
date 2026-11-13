import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import { asset } from "@/lib/assets";
import { fill } from "@/lib/contact";
import { copy } from "@content/copy";
import { site } from "@content/site";
import { getService, visibleServices } from "@content/services";
import { instagramTiles, testimonials } from "@content/lookbook";
import { Photo } from "./Photo";
import { SilkCanvas } from "./hero/SilkCanvas";
import { EnquiryForm } from "./EnquiryForm";
import { CallLink } from "./CallLink";
import { InstagramIcon } from "./icons";
import { SectionHead, TextLink, Thread, WhatsAppButton, btn } from "./ui";

type P = { locale: Locale };

function HeroImage({ locale }: P) {
  const d = asset("hero-desktop");
  const m = asset("hero-mobile");
  if (!d.src || !m.src) return <Photo id="hero-desktop" locale={locale} sizes="100vw" priority className="absolute inset-0" />;
  const common = { alt: d.alt[locale], quality: 85, fetchPriority: "high", fill: true } as const;
  const { props: { srcSet: desktop } } = getImageProps({ ...common, src: d.src, sizes: "60vw" });
  const { props: { srcSet: mobile, ...rest } } = getImageProps({ ...common, src: m.src, sizes: "100vw" });
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} sizes="60vw" />
      <source srcSet={mobile} sizes="100vw" />
      <img {...rest} alt={d.alt[locale]} className="absolute inset-0 size-full object-cover object-[70%_30%] md:object-[65%_center]" />
    </picture>
  );
}

export function Hero({ locale }: P) {
  const t = copy[locale];
  const poster = asset("hero-silk-poster");
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-burgundy-deep text-ivory md:flex-row">
      <div aria-hidden className="absolute inset-0 -z-10">
        {poster.src && <Image src={poster.src} alt="" fill sizes="100vw" quality={75} className="object-cover opacity-60" />}
        <SilkCanvas />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep via-burgundy-deep/30 to-transparent md:bg-gradient-to-r md:from-burgundy-deep/85 md:via-burgundy-deep/40" />
      </div>

      <div data-reveal="img" data-from="left" data-delay="0.2" className="relative order-1 h-[62svh] w-full overflow-hidden [mask-image:linear-gradient(to_top,transparent,black_35%)] md:absolute md:inset-y-0 md:right-0 md:order-2 md:h-auto md:w-[62%] md:[mask-image:linear-gradient(to_right,transparent,black_40%)]">
        <HeroImage locale={locale} />
      </div>

      <div data-hero-out className="gutter relative order-2 -mt-28 flex flex-col justify-end pb-14 md:order-1 md:mt-0 md:min-h-svh md:w-[58%] md:justify-center md:pb-0 md:pt-20">
        <p className="eyebrow text-gold" data-reveal="fade" data-delay="0.9">{t.hero.eyebrow}</p>
        <h1 className="display mt-6 text-[clamp(3rem,8.4vw,8.5rem)] ml:text-[clamp(2rem,5.6vw,5.25rem)]">
          <span className="block" data-reveal="lines" data-delay="1">{t.hero.title[0]}</span>
          <span className="block italic text-gold ml:not-italic" data-reveal="lines" data-delay="1.15">{t.hero.title[1]}</span>
        </h1>
        <p className="mt-7 max-w-md text-ivory/80" data-reveal="fade" data-delay="1.4">{t.hero.body}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row" data-reveal="fade" data-delay="1.6">
          <Link href={href(locale, "/services")} className={btn.light}>{t.cta.explore}</Link>
          <WhatsAppButton text={t.whatsapp.generic} label={t.cta.whatsapp} variant="ghostLight" />
        </div>
      </div>

      <div aria-hidden className="absolute bottom-8 left-1/2 hidden h-14 w-px -translate-x-1/2 overflow-hidden bg-ivory/20 md:block">
        <span className="block h-1/2 w-full animate-[scrollcue_2.4s_ease-in-out_infinite] bg-gold" />
      </div>
    </section>
  );
}

export function Intro({ locale }: P) {
  const t = copy[locale].intro;
  return (
    <section className="gutter grid gap-14 py-28 md:grid-cols-12 md:gap-10 md:py-40">
      <div className="md:col-span-7 md:pr-10">
        <SectionHead eyebrow={t.eyebrow} title={t.title} />
        <div className="mt-10 max-w-xl space-y-5 text-lg text-charcoal/85" data-reveal="stagger">
          {t.body.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
        <div className="mt-10" data-reveal="fade">
          <TextLink href={href(locale, "/about")}>{copy[locale].nav.about}</TextLink>
        </div>
      </div>
      <div className="relative md:col-span-5">
        <div data-reveal="img" className="relative aspect-[4/5] overflow-hidden">
          <Photo id="intro-pleats" locale={locale} sizes="(min-width:768px) 40vw, 100vw" className="absolute inset-0" />
        </div>
        <p className="display absolute -bottom-8 -left-4 text-[8rem] leading-none text-gold/70 md:-left-16 md:text-[11rem]" data-parallax="20" aria-hidden>
          {site.years}
        </p>
      </div>
    </section>
  );
}

export function Artistry({ locale }: P) {
  const t = copy[locale].artistry;
  const imgs = ["artistry-consult", "artistry-drape", "artistry-reveal"];
  return (
    <section data-pin="artistry" className="relative bg-beige lg:h-svh">
      <div className="gutter grid h-full gap-12 py-24 lg:grid-cols-2 lg:items-center lg:gap-20 lg:py-0">
        <div>
          <SectionHead eyebrow={t.eyebrow} title={t.title} />
          <ol className="mt-12 space-y-8 lg:mt-14">
            {t.steps.map((s, i) => (
              <li key={s.title} data-step className="grid grid-cols-[3rem_1fr] gap-4">
                <span className="display text-3xl text-gold-muted">0{i + 1}</span>
                <div>
                  <h3 className="display text-3xl text-burgundy">{s.title}</h3>
                  <p className="mt-2 max-w-md text-charcoal/80">{s.body}</p>
                </div>
                <div className="col-span-2 lg:hidden">
                  <Photo id={imgs[i]} locale={locale} sizes="100vw" className="mt-4 aspect-[4/5]" />
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative hidden aspect-[4/5] max-h-[78svh] justify-self-end overflow-hidden lg:block lg:w-full lg:max-w-[34rem]">
          {imgs.map((id) => (
            <div key={id} data-step-img className="absolute inset-0">
              <Photo id={id} locale={locale} sizes="40vw" className="absolute inset-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Bridal({ locale }: P) {
  const t = copy[locale];
  const links = ["christian-bridal-saree-draping", "hindu-bridal-draping", "muslim-bridal-draping", "kanjeevaram-bridal-draping", "bridal-makeup"].map((s) => getService(s)!);
  return (
    <section className="grid md:grid-cols-12">
      <div className="relative min-h-[80svh] md:col-span-7">
        <div data-reveal="img" className="absolute inset-0 overflow-hidden">
          <Photo id="bridal-feature" locale={locale} sizes="(min-width:768px) 58vw, 100vw" className="absolute inset-0" position="center 20%" />
        </div>
      </div>
      <div className="gutter flex flex-col justify-center py-20 md:col-span-5 md:py-28">
        <SectionHead eyebrow={t.bridal.eyebrow} title={t.bridal.title} />
        <p className="mt-8 max-w-md text-charcoal/80" data-reveal="fade">{t.bridal.body}</p>
        <ul className="mt-10 border-t border-gold/40" data-reveal="stagger">
          {links.map((s) => (
            <li key={s.slug} className="border-b border-gold/40">
              <Link href={href(locale, `/services/${s.slug}`)} className="group flex items-center justify-between py-4 text-lg transition-colors hover:text-burgundy">
                <span className="display text-2xl">{s.name[locale]}</span>
                <span className="text-gold-muted transition-transform duration-500 group-hover:translate-x-1">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function DrapingRail({ locale }: P) {
  const t = copy[locale];
  const list = visibleServices.filter((s) => ["traditional", "bridal", "preparation", "bespoke"].includes(s.group));
  return (
    <section data-rail className="overflow-hidden py-24 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-0">
      <div className="gutter flex items-end justify-between gap-6">
        <SectionHead eyebrow={t.draping.eyebrow} title={t.draping.title} />
        <div className="hidden shrink-0 md:block" data-reveal="fade">
          <TextLink href={href(locale, "/services")}>{t.cta.viewAll}</TextLink>
        </div>
      </div>
      <ul data-rail-track className="no-scrollbar gutter mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto lg:w-max lg:overflow-visible lg:snap-none">
        {list.map((s, i) => (
          <li key={s.slug} className="w-[78vw] shrink-0 snap-start sm:w-[22rem] lg:w-[24rem]">
            <Link href={href(locale, `/services/${s.slug}`)} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Photo id={s.image} locale={locale} sizes="(min-width:640px) 24rem, 78vw" className="absolute inset-0" imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-silk)] group-hover:scale-[1.05]" />
              </div>
              <div className="mt-5 flex gap-4">
                <span className="display text-xl text-gold-muted">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="display text-[1.75rem] leading-tight text-burgundy">{s.name[locale]}</h3>
                  <p className="mt-2 text-[0.95rem] text-charcoal/75">{s.short[locale]}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="gutter mt-10 md:hidden">
        <TextLink href={href(locale, "/services")}>{t.cta.viewAll}</TextLink>
      </div>
    </section>
  );
}

export function Occasions({ locale }: P) {
  const t = copy[locale];
  const list = visibleServices.filter((s) => s.group === "occasion");
  return (
    <section className="relative overflow-hidden bg-burgundy text-ivory">
      <div className="gutter grid gap-14 py-28 md:grid-cols-12 md:py-40">
        <div className="md:col-span-5">
          <div data-reveal="img" className="relative aspect-[4/5] overflow-hidden">
            <Photo id="occasions-feature" locale={locale} sizes="(min-width:768px) 40vw, 100vw" className="absolute inset-0" />
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7 md:self-center">
          <SectionHead eyebrow={t.occasions.eyebrow} title={t.occasions.title} light />
          <p className="mt-8 max-w-md text-ivory/75" data-reveal="fade">{t.occasions.body}</p>
          <ul className="mt-12" data-reveal="stagger">
            {list.map((s) => (
              <li key={s.slug} className="border-t border-ivory/15 last:border-b">
                <Link href={href(locale, `/services/${s.slug}`)} className="group flex items-baseline justify-between gap-6 py-5">
                  <span className="display text-[1.75rem] transition-colors group-hover:text-gold md:text-3xl">{s.name[locale]}</span>
                  <span className="text-gold transition-transform duration-500 group-hover:translate-x-1">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function LookbookPreview({ locale }: P) {
  const t = copy[locale];
  const ids = ["svc-kanjeevaram-bridal", "lookbook-02", "insta-05", "svc-bridal-package", "insta-02"];
  const layout = [
    "col-span-2 row-span-2 md:col-span-5 md:row-span-2",
    "md:col-span-4 md:row-span-1",
    "md:col-span-3 md:row-span-1",
    "md:col-span-3 md:row-span-1",
    "col-span-2 md:col-span-4 md:row-span-1",
  ];
  return (
    <section className="gutter py-28 md:py-40">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHead eyebrow={t.lookbookPreview.eyebrow} title={t.lookbookPreview.title} />
        <div data-reveal="fade">
          <TextLink href={href(locale, "/lookbook")}>{t.cta.viewLookbook}</TextLink>
        </div>
      </div>
      <div className="mt-14 grid auto-rows-[44vw] grid-cols-2 gap-3 md:auto-rows-[19vw] md:grid-cols-12 md:gap-5">
        {ids.map((id, i) => (
          <Link key={id} href={href(locale, "/lookbook")} data-reveal="img" data-delay={String(i * 0.08)} className={`group relative overflow-hidden ${layout[i]}`}>
            <Photo id={id} locale={locale} sizes="(min-width:768px) 40vw, 50vw" className="absolute inset-0" imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-silk)] group-hover:scale-[1.05]" />
          </Link>
        ))}
      </div>
      <p className="mt-6 text-sm text-stone">{t.lookbookPreview.note}</p>
    </section>
  );
}

export function Why({ locale }: P) {
  const t = copy[locale].why;
  return (
    <section className="bg-beige">
      <div className="gutter grid gap-16 py-28 md:grid-cols-12 md:py-40">
        <div className="md:col-span-5">
          <SectionHead eyebrow={t.eyebrow} title={t.title} />
          <div data-reveal="img" className="relative mt-12 hidden aspect-square overflow-hidden md:block">
            <Photo id="why-detail" locale={locale} sizes="40vw" className="absolute inset-0" />
          </div>
        </div>
        <ol className="md:col-span-6 md:col-start-7 md:self-end">
          {t.items.map((it, i) => (
            <li key={it.title} className="py-8 first:pt-0">
              <Thread />
              <div className="mt-8 grid grid-cols-[3.5rem_1fr] gap-4" data-reveal="fade">
                <span className="display text-4xl text-gold-muted">{i + 1}</span>
                <div>
                  <h3 className="display text-3xl text-burgundy">{it.title}</h3>
                  <p className="mt-3 text-charcoal/80">{it.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Testimonials({ locale }: P) {
  if (!testimonials.length) return null;
  return (
    <section className="gutter py-28 text-center">
      {testimonials.map((q) => (
        <figure key={q.name} className="mx-auto max-w-3xl">
          <blockquote className="display text-4xl text-burgundy">“{q.quote[locale]}”</blockquote>
          <figcaption className="eyebrow mt-6 text-gold-muted">{q.name} · {q.occasion[locale]}</figcaption>
        </figure>
      ))}
    </section>
  );
}

export function Instagram({ locale }: P) {
  const t = copy[locale].instagram;
  return (
    <section className="gutter pb-28 pt-4 md:pb-40">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHead eyebrow={t.eyebrow} title={t.title} />
        <a href={site.instagram.url} target="_blank" rel="noopener" className={btn.outline} data-reveal="fade">
          <InstagramIcon className="size-4" /> @{site.instagram.handle}
        </a>
      </div>
      <ul className="mt-12 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-4" data-reveal="stagger">
        {instagramTiles.map((id) => (
          <li key={id}>
            <a href={site.instagram.url} target="_blank" rel="noopener" aria-label={`${t.follow} — ${asset(id).alt[locale]}`} className="group relative block aspect-square overflow-hidden">
              <Photo id={id} locale={locale} sizes="(min-width:768px) 16vw, 33vw" className="absolute inset-0" imgClassName="transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 grid place-items-center bg-burgundy/0 text-ivory opacity-0 transition-all duration-500 group-hover:bg-burgundy/40 group-hover:opacity-100">
                <InstagramIcon className="size-6" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Enquiry({ locale, preset }: P & { preset?: string }) {
  const t = copy[locale];
  return (
    <section id="enquire" className="relative isolate overflow-hidden bg-burgundy-deep text-ivory">
      <div aria-hidden className="absolute inset-0 -z-10 opacity-25">
        <Photo id="enquiry-bg" locale={locale} sizes="100vw" className="absolute inset-0" />
      </div>
      <div className="gutter grid gap-14 py-28 md:grid-cols-12 md:py-36">
        <div className="md:col-span-5">
          <SectionHead eyebrow={t.enquiry.eyebrow} title={t.enquiry.title} light />
          <p className="mt-8 max-w-sm text-ivory/75" data-reveal="fade">{t.enquiry.body}</p>
          <div className="mt-10 space-y-2 text-sm text-ivory/70" data-reveal="fade">
            <CallLink label={`${t.cta.call} · ${site.phoneDisplay}`} closedLabel={t.cta.callClosed} className="inline-flex items-center gap-2 text-base text-ivory underline decoration-gold/50 underline-offset-4 hover:decoration-gold" />
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7" data-reveal="fade">
          <EnquiryForm
            t={t.enquiry}
            wa={t.whatsapp}
            occasions={t.occasionsList}
            services={visibleServices.map((s) => ({ slug: s.slug, name: s.name[locale] }))}
            preset={preset}
            light
          />
        </div>
      </div>
    </section>
  );
}

export const serviceWaText = (locale: Locale, name: string) => fill(copy[locale].whatsapp.service, { service: name });
