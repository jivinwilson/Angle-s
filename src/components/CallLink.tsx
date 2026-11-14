"use client";

import { createContext, use, useEffect, useState, type ReactNode } from "react";
import { isCallOpen, telUrl, waUrl } from "@/lib/contact";
import { PhoneIcon, WhatsAppIcon } from "./icons";
import { btn } from "./ui";

type SiteInfo = { whatsapp: string; phone: string; callHours: { from: number; to: number } };

const SiteCtx = createContext<SiteInfo | null>(null);

export function SiteProvider({ value, children }: { value: SiteInfo; children: ReactNode }) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-track]");
      if (el) navigator.sendBeacon("/api/track", JSON.stringify({ type: el.getAttribute("data-track"), path: location.pathname }));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return <SiteCtx value={value}>{children}</SiteCtx>;
}

export function useSite() {
  const s = use(SiteCtx)!;
  return { ...s, wa: (text: string) => waUrl(s.whatsapp, text), tel: telUrl(s.phone) };
}

export function useCallOpen() {
  const { callHours } = useSite();
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const tick = () => setOpen(isCallOpen(callHours));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [callHours]);
  return open;
}

export function CallLink({ label, closedLabel, className = "" }: { label: string; closedLabel: string; className?: string }) {
  const open = useCallOpen();
  const { tel } = useSite();
  if (!open) return <p className="self-center text-sm opacity-75">{closedLabel}</p>;
  return (
    <a href={tel} className={className} data-track="call">
      <PhoneIcon className="size-[1.1rem]" />
      {label}
    </a>
  );
}

export function WhatsAppButton({ text, label, variant = "primary", className = "" }: { text: string; label: string; variant?: keyof typeof btn; className?: string }) {
  const { wa } = useSite();
  return (
    <a href={wa(text)} target="_blank" rel="noopener" className={`${btn[variant]} ${className}`} data-track="whatsapp">
      <WhatsAppIcon className="size-[1.1rem]" />
      {label}
    </a>
  );
}
