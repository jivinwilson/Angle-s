"use client";

import { useEffect, useState } from "react";
import { waUrl, telUrl } from "@/lib/contact";
import { PhoneIcon, WhatsAppIcon } from "./icons";
import { useCallOpen } from "./CallLink";

type Props = { waText: string; whatsapp: string; call: string };

export function ContactBar({ waText, whatsapp, call }: Props) {
  const [shown, setShown] = useState(false);
  const callOpen = useCallOpen();

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed inset-x-0 bottom-0 z-40 grid border-t border-gold/40 bg-ivory/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md transition-transform duration-500 ease-[var(--ease-silk)] md:hidden ${callOpen ? "grid-cols-2" : "grid-cols-1"} ${shown ? "translate-y-0" : "translate-y-full"}`}
        aria-hidden={!shown}
      >
        <a href={waUrl(waText)} target="_blank" rel="noopener" tabIndex={shown ? 0 : -1} data-track="whatsapp" className="flex h-14 items-center justify-center gap-2 bg-burgundy text-sm font-medium tracking-wide text-ivory">
          <WhatsAppIcon className="size-5" /> {whatsapp}
        </a>
        {callOpen && (
          <a href={telUrl} tabIndex={shown ? 0 : -1} data-track="call" className="flex h-14 items-center justify-center gap-2 text-sm font-medium tracking-wide text-burgundy">
            <PhoneIcon className="size-5" /> {call}
          </a>
        )}
      </div>

      <a
        href={waUrl(waText)}
        target="_blank"
        rel="noopener"
        aria-label={whatsapp}
        data-track="whatsapp"
        className={`fixed bottom-8 right-8 z-40 hidden size-14 place-items-center rounded-full bg-burgundy text-ivory shadow-[0_10px_30px_-10px_rgb(84_27_43/0.6)] ring-1 ring-gold/50 transition-[transform,opacity] duration-500 hover:scale-105 md:grid ${shown ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      >
        <WhatsAppIcon className="size-6" />
      </a>
    </>
  );
}
