"use client";

import { useState, type FormEvent } from "react";
import { waUrl } from "@/lib/contact";
import type { Copy } from "@content/copy";
import { btn } from "./ui";
import { WhatsAppIcon } from "./icons";

type Props = {
  t: Copy["enquiry"];
  wa: Copy["whatsapp"];
  occasions: string[];
  services: { slug: string; name: string }[];
  preset?: string;
  light?: boolean;
};

export function EnquiryForm({ t, wa, occasions, services, preset = "", light }: Props) {
  const [mode, setMode] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const service = services.find((s) => s.slug === v("service"))?.name ?? "";
    const date = v("date") ? new Date(v("date")).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }) : "";
    const lines = [
      wa.builderIntro,
      "",
      [t.name, v("name")],
      [t.service, service],
      [t.occasion, v("occasion")],
      [t.date, date],
      [t.place, v("place")],
      [t.people, v("people")],
      [t.mode, mode],
      [t.note, v("note")],
      "",
      wa.builderOutro,
    ]
      .filter((l) => typeof l === "string" || l[1])
      .map((l) => (typeof l === "string" ? l : `${l[0]}: ${l[1]}`));
    window.open(waUrl(lines.join("\n")), "_blank", "noopener");
  }

  const field = `peer w-full border-0 border-b bg-transparent px-0 pb-2 pt-6 text-base outline-none transition-colors placeholder:text-transparent focus:ring-0 ${
    light ? "border-ivory/30 text-ivory focus:border-gold" : "border-charcoal/25 text-charcoal focus:border-burgundy"
  }`;
  const label = `pointer-events-none absolute left-0 top-0 text-xs tracking-wide ${light ? "text-ivory/70" : "text-stone"}`;

  return (
    <form onSubmit={submit} className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
      <label className="relative block">
        <span className={label}>{t.name}</span>
        <input name="name" autoComplete="given-name" className={field} placeholder={t.name} />
      </label>
      <label className="relative block">
        <span className={label}>{t.service}</span>
        <select name="service" defaultValue={preset} className={`${field} appearance-none`}>
          <option value="">{t.servicePlaceholder}</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>{s.name}</option>
          ))}
        </select>
      </label>
      <label className="relative block">
        <span className={label}>{t.occasion}</span>
        <select name="occasion" defaultValue="" className={`${field} appearance-none`}>
          <option value="">—</option>
          {occasions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label className="relative block">
        <span className={label}>{t.date}</span>
        <input type="date" name="date" className={field} />
      </label>
      <label className="relative block">
        <span className={label}>{t.place}</span>
        <input name="place" autoComplete="address-level2" className={field} placeholder={t.place} />
      </label>
      <label className="relative block">
        <span className={label}>{t.people}</span>
        <input type="number" name="people" min={1} max={50} inputMode="numeric" className={field} placeholder={t.people} />
      </label>

      <fieldset className="sm:col-span-2">
        <legend className={`text-xs tracking-wide ${light ? "text-ivory/70" : "text-stone"}`}>{t.mode}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {[t.modeParlour, t.modeHome, t.modeUnsure].map((m) => (
            <label key={m} className={`cursor-pointer border px-4 py-2 text-sm transition-colors has-[:checked]:border-gold has-[:checked]:bg-gold/15 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold-muted ${light ? "border-ivory/30" : "border-charcoal/20"}`}>
              <input type="radio" name="mode" value={m} className="sr-only" checked={mode === m} onChange={() => setMode(m)} />
              {m}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="relative block sm:col-span-2">
        <span className={label}>{t.note}</span>
        <textarea name="note" rows={2} className={`${field} resize-none`} placeholder={t.note} />
      </label>

      <div className="sm:col-span-2">
        <button type="submit" className={`${light ? btn.light : btn.primary} w-full sm:w-auto`} data-track="whatsapp-form">
          <WhatsAppIcon className="size-[1.1rem]" />
          {t.submit}
        </button>
        <p className={`mt-3 text-sm ${light ? "text-ivory/60" : "text-stone"}`}>{t.hint}</p>
      </div>
    </form>
  );
}
