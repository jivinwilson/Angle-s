"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { fill } from "@/lib/contact";
import { useSite } from "./CallLink";
import { btn } from "./ui";
import { WhatsAppIcon } from "./icons";

export type Look = { id: string; category: string; src?: string; width?: number; height?: number; blur?: string; alt: string };

type Props = {
  looks: Look[];
  categories: { key: string; label: string }[];
  t: { all: string; close: string; prev: string; next: string; enquire: string; waTemplate: string };
};

export function LookbookGrid({ looks, categories, t }: Props) {
  const [filter, setFilter] = useState("all");
  const { wa } = useSite();
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const shown = filter === "all" ? looks : looks.filter((l) => l.category === filter);
  const current = index === null ? null : shown[index];

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((i) => (i === null ? i : (i + 1) % shown.length));
      if (e.key === "ArrowLeft") setIndex((i) => (i === null ? i : (i - 1 + shown.length) % shown.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, shown.length]);

  const touchX = useRef(0);

  return (
    <>
      {categories.length > 0 && (
        <div role="group" aria-label="Filter" className="no-scrollbar -mx-5 mb-10 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
          {[{ key: "all", label: t.all }, ...categories].map((c) => (
            <button
              key={c.key}
              type="button"
              aria-pressed={filter === c.key}
              onClick={() => setFilter(c.key)}
              className="shrink-0 border border-charcoal/20 px-5 py-2.5 text-sm transition-colors hover:border-burgundy aria-pressed:border-burgundy aria-pressed:bg-burgundy aria-pressed:text-ivory"
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      <ul className="columns-2 gap-3 md:columns-3 md:gap-5 xl:columns-4">
        {shown.map((l, i) => (
          <li key={l.id} className="mb-3 break-inside-avoid md:mb-5">
            <button type="button" onClick={() => setIndex(i)} className="group relative block w-full overflow-hidden bg-beige" aria-label={l.alt}>
              {l.src && l.width && l.height ? (
                <Image
                  src={l.src}
                  alt={l.alt}
                  width={l.width}
                  height={l.height}
                  sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, 50vw"
                  placeholder={l.blur ? "blur" : "empty"}
                  blurDataURL={l.blur}
                  quality={85}
                  className="h-auto w-full transition-transform duration-[1.4s] ease-[var(--ease-silk)] group-hover:scale-[1.04]"
                />
              ) : (
                <div className="aspect-[4/5]" />
              )}
              <span className="absolute inset-0 bg-burgundy/0 transition-colors duration-500 group-hover:bg-burgundy/15" />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === e.currentTarget && setIndex(null)}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-ivory"
        aria-label={current?.alt}
      >
        {current && (
          <div
            className="flex h-full flex-col"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) setIndex((i) => (i === null ? i : (i + (dx < 0 ? 1 : -1) + shown.length) % shown.length));
            }}
          >
            <div className="flex items-center justify-between px-5 py-4 text-sm">
              <span className="opacity-70">{index! + 1} / {shown.length}</span>
              <button type="button" onClick={() => setIndex(null)} className="eyebrow min-h-11 px-2" autoFocus>
                {t.close} ✕
              </button>
            </div>
            <div className="relative flex-1" onClick={(e) => e.target === e.currentTarget && setIndex(null)}>
              {current.src && (
                <Image key={current.id} src={current.src} alt={current.alt} fill sizes="100vw" quality={85} className="animate-[fadeIn_.5s_ease] object-contain p-2 md:p-8" />
              )}
              <button type="button" aria-label={t.prev} onClick={() => setIndex((index! - 1 + shown.length) % shown.length)} className="absolute left-2 top-1/2 hidden size-12 -translate-y-1/2 place-items-center text-3xl opacity-70 hover:opacity-100 md:grid">‹</button>
              <button type="button" aria-label={t.next} onClick={() => setIndex((index! + 1) % shown.length)} className="absolute right-2 top-1/2 hidden size-12 -translate-y-1/2 place-items-center text-3xl opacity-70 hover:opacity-100 md:grid">›</button>
            </div>
            <div className="flex flex-col items-center gap-3 px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 text-center">
              <p className="max-w-xl text-sm opacity-80">{current.alt}</p>
              <a href={wa(fill(t.waTemplate, { look: current.alt }))} target="_blank" rel="noopener" data-track="whatsapp-look" className={btn.light}>
                <WhatsAppIcon className="size-4" />
                {t.enquire}
              </a>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
