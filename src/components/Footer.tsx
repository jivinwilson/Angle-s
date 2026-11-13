import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import { telUrl, waUrl } from "@/lib/contact";
import { site } from "@content/site";
import { copy } from "@content/copy";
import { visibleServices } from "@content/services";
import { Wordmark } from "./Wordmark";
import { InstagramIcon, PhoneIcon, WhatsAppIcon } from "./icons";

export function Footer({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const featured = visibleServices.filter((s) => ["bridal", "traditional", "beauty"].includes(s.group)).slice(0, 6);
  return (
    <footer className="bg-burgundy-deep pb-24 text-ivory/85 md:pb-0">
      <div className="gutter grid gap-14 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-4">
          <Link href={href(locale)} aria-label="Angel's — home" className="text-xl text-ivory">
            <Wordmark tagline="Bridal · Draping · Beauty" />
          </Link>
          <p className="display mt-10 max-w-xs text-2xl text-ivory/90">{site.tagline[locale]}</p>
        </div>

        <nav aria-label="Services" className="md:col-span-3">
          <p className="eyebrow text-gold">{t.nav.services}</p>
          <ul className="mt-6 space-y-3 text-[0.95rem]">
            {featured.map((s) => (
              <li key={s.slug}>
                <Link href={href(locale, `/services/${s.slug}`)} className="transition-colors hover:text-gold">{s.name[locale]}</Link>
              </li>
            ))}
            <li>
              <Link href={href(locale, "/services")} className="text-gold transition-colors hover:text-ivory">{t.cta.viewAll} →</Link>
            </li>
          </ul>
        </nav>

        <div className="space-y-6 text-[0.95rem] md:col-span-3">
          <div>
            <p className="eyebrow text-gold">{t.footer.hours}</p>
            <p className="mt-2">{t.footer.hoursValue}</p>
          </div>
          <div>
            <p className="eyebrow text-gold">{t.footer.calls}</p>
            <p className="mt-2">{t.footer.callsValue}</p>
          </div>
          <div>
            <p className="eyebrow text-gold">{t.footer.location}</p>
            <p className="mt-2">{t.footer.locationValue}</p>
            <p className="mt-1 text-ivory/60">{t.footer.serving}</p>
          </div>
        </div>

        <div className="space-y-4 md:col-span-2">
          <a href={waUrl(t.whatsapp.generic)} target="_blank" rel="noopener" data-track="whatsapp" className="flex items-center gap-3 transition-colors hover:text-gold">
            <WhatsAppIcon className="size-4" /> WhatsApp
          </a>
          <a href={telUrl} data-track="call" className="flex items-center gap-3 transition-colors hover:text-gold">
            <PhoneIcon className="size-4" /> {site.phoneDisplay}
          </a>
          <a href={site.instagram.url} target="_blank" rel="noopener" className="flex items-center gap-3 transition-colors hover:text-gold">
            <InstagramIcon className="size-4" /> @{site.instagram.handle}
          </a>
        </div>
      </div>

      <div className="gutter flex flex-col gap-2 border-t border-ivory/10 py-8 text-xs text-ivory/50 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} {site.legalName}. {t.footer.rights}</p>
        <p>{t.footer.imagery}</p>
      </div>
    </footer>
  );
}
