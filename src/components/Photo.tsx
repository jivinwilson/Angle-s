import Image from "next/image";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { Monogram } from "./Wordmark";

type Props = {
  id: string;
  locale: Locale;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  position?: string;
};

export async function Photo({ id, locale, sizes, className = "", imgClassName = "", priority, position }: Props) {
  const a = (await getContent()).asset(id);
  return (
    <div className={`${className.includes("absolute") ? "" : "relative"} overflow-hidden bg-beige ${className}`}>
      {a.src ? (
        <Image
          src={a.src}
          alt={a.alt[locale]}
          fill
          sizes={sizes}
          preload={priority}
          placeholder={a.blur ? "blur" : "empty"}
          blurDataURL={a.blur}
          quality={85}
          className={`object-cover ${imgClassName}`}
          style={position ? { objectPosition: position } : undefined}
        />
      ) : (
        <div role="img" aria-label={a.alt[locale]} className="absolute inset-0 grid place-items-center bg-[radial-gradient(120%_80%_at_30%_20%,#f8f3ea_0%,#e9dfd0_55%,#d9c9b2_100%)]">
          <Monogram className="w-12 text-gold/50" />
        </div>
      )}
    </div>
  );
}
