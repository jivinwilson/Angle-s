"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { href, swapLocale, type Locale } from "@/lib/i18n";
import type { Copy } from "@content/copy";
import { Wordmark } from "./Wordmark";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { CallLink, useSite } from "./CallLink";
import { btn } from "./ui";

type Banner = { text: string; link: string; linkLabel: string } | null;
type Props = { locale: Locale; t: Pick<Copy, "nav" | "cta" | "language"> & { waText: string }; instagram: { handle: string; url: string }; banner: Banner };

export function Header({ locale, t, instagram, banner }: Props) {
  const { wa } = useSite();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/" || pathname === "/ml";
  const light = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { href: href(locale, "/services"), label: t.nav.services },
    { href: href(locale, "/lookbook"), label: t.nav.lookbook },
    { href: href(locale, "/about"), label: t.nav.about },
    { href: href(locale, "/contact"), label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-500 ${
        open ? "bg-burgundy text-ivory" : light ? "text-ivory" : "bg-ivory/90 text-burgundy shadow-[0_1px_0_rgb(198_166_107/0.35)] backdrop-blur-md"
      }`}
    >
      {banner && (
        <div className="gutter flex min-h-9 items-center justify-center gap-3 bg-gold py-1.5 text-center text-[0.8125rem] text-burgundy-deep">
          <p>{banner.text}</p>
          {banner.link && (
            <Link href={banner.link} className="shrink-0 font-medium underline underline-offset-4">{banner.linkLabel || "→"}</Link>
          )}
        </div>
      )}
      <div className="gutter flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
        <Link href={href(locale)} aria-label="Angel's — home" className="text-[0.95rem] md:text-[1.05rem]">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined} className="eyebrow relative py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 hover:after:scale-x-100 aria-[current=page]:after:scale-x-100">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-6">
          <Link href={swapLocale(pathname, locale === "en" ? "ml" : "en")} lang={locale === "en" ? "ml" : "en"} hrefLang={locale === "en" ? "ml" : "en"} className="text-sm opacity-80 transition-opacity hover:opacity-100">
            {t.language}
          </Link>
          <a href={instagram.url} target="_blank" rel="noopener" aria-label="Instagram" className="hidden opacity-80 transition-opacity hover:opacity-100 sm:block">
            <InstagramIcon />
          </a>
          <div className="hidden lg:block">
            <a href={wa(t.waText)} target="_blank" rel="noopener" data-track="whatsapp" className={`${light ? btn.ghostLight : btn.primary} !min-h-11`}>
              <WhatsAppIcon className="size-4" />
              {t.nav.enquire}
            </a>
          </div>
          <button
            type="button"
            className="relative -mr-2 grid size-11 place-items-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((o) => !o)}
          >
            <span className={`absolute h-px w-6 bg-current transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
            <span className={`absolute h-px w-6 bg-current transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="gutter absolute inset-x-0 top-full flex h-[calc(100svh-100%)] flex-col justify-between overflow-y-auto bg-burgundy pb-10 pt-8 text-ivory lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="space-y-1">
            <li>
              <Link href={href(locale)} className="display block py-2 text-5xl">{t.nav.home}</Link>
            </li>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="display block py-2 text-5xl">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-10 grid gap-3">
          <a href={wa(t.waText)} target="_blank" rel="noopener" data-track="whatsapp" className={btn.light}>
            <WhatsAppIcon className="size-4" />
            {t.cta.whatsapp}
          </a>
          <CallLink label={t.cta.call} closedLabel={t.cta.callClosed} className={`${btn.ghostLight} text-center`} />
          <a href={instagram.url} target="_blank" rel="noopener" className="mt-4 inline-flex items-center gap-2 text-sm opacity-80">
            <InstagramIcon className="size-4" /> @{instagram.handle}
          </a>
        </div>
      </div>
    </header>
  );
}
