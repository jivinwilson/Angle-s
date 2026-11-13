import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbLd } from "@/lib/seo";

export function PageIntro({ eyebrow, title, body, children }: { eyebrow: string; title: string; body?: string; children?: React.ReactNode }) {
  return (
    <header className="gutter pb-16 pt-36 md:pb-24 md:pt-48">
      {children}
      <p className="eyebrow text-gold-muted" data-reveal="fade">{eyebrow}</p>
      <h1 className="display mt-6 max-w-5xl text-[clamp(2.75rem,7vw,6.5rem)] text-burgundy" data-reveal="lines">{title}</h1>
      {body && <p className="mt-8 max-w-2xl text-lg text-charcoal/80" data-reveal="fade" data-delay="0.2">{body}</p>}
    </header>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-stone">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((it, i) => (
            <li key={it.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden className="text-gold">/</span>}
              {i < items.length - 1 ? (
                <Link href={it.path} className="hover:text-burgundy">{it.name}</Link>
              ) : (
                <span aria-current="page" className="text-charcoal">{it.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(items)} />
    </>
  );
}
