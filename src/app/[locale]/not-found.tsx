import Link from "next/link";
import { btn } from "@/components/ui";
import { copy } from "@content/copy";

export default function NotFound() {
  const t = copy.en.notFound;
  return (
    <section className="gutter flex min-h-[80svh] flex-col items-start justify-center pt-24">
      <p className="eyebrow text-gold-muted">404</p>
      <h1 className="display mt-5 text-[clamp(2.5rem,6vw,5rem)] text-burgundy">{t.title}</h1>
      <p className="mt-6 text-charcoal/80">{t.body}</p>
      <Link href="/" className={`${btn.primary} mt-10`}>{t.back}</Link>
    </section>
  );
}
