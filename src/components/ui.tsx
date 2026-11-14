import Link from "next/link";
import type { ReactNode } from "react";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-3 px-7 text-[0.8125rem] font-medium tracking-[0.18em] uppercase transition-colors duration-300 ease-[var(--ease-silk)] ml:tracking-normal ml:text-sm";

export const btn = {
  primary: `${base} bg-burgundy text-ivory hover:bg-burgundy-deep`,
  outline: `${base} border border-charcoal/30 text-charcoal hover:border-burgundy hover:text-burgundy`,
  light: `${base} bg-ivory text-burgundy hover:bg-beige`,
  ghostLight: `${base} border border-ivory/40 text-ivory hover:border-gold hover:text-gold`,
};

export function SectionHead({ eyebrow, title, light, className = "", as: H = "h2" }: { eyebrow: string; title: string; light?: boolean; className?: string; as?: "h1" | "h2" }) {
  return (
    <div className={className}>
      <p className={`eyebrow ${light ? "text-gold" : "text-gold-muted"}`} data-reveal="fade">
        {eyebrow}
      </p>
      <H className={`display mt-5 text-[clamp(2.25rem,5vw,4.5rem)] ${light ? "text-ivory" : "text-burgundy"}`} data-reveal="lines">
        {title}
      </H>
    </div>
  );
}

export function TextLink({ href, children, light }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-3 eyebrow ${light ? "text-ivory" : "text-burgundy"}`}>
      <span className="relative after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 group-hover:after:scale-x-100">
        {children}
      </span>
      <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
    </Link>
  );
}

export function Thread({ light }: { light?: boolean }) {
  return <div aria-hidden data-reveal="thread" className={`h-px w-full origin-left ${light ? "bg-gold/40" : "bg-gold/60"}`} />;
}
