"use client";

import { useState } from "react";
import type { Asset } from "@/lib/content";
import { slugify } from "@/lib/bilingual";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { inp, lbl, primary, secondary } from "./ui";

type Save = (v: Asset[]) => Promise<{ ok: boolean; error?: string }>;

async function prepare(file: File) {
  const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, 2400 / Math.max(bmp.width, bmp.height));
  const width = Math.round(bmp.width * scale);
  const height = Math.round(bmp.height * scale);
  const full = document.createElement("canvas");
  full.width = width;
  full.height = height;
  full.getContext("2d")!.drawImage(bmp, 0, 0, width, height);
  const blob = await new Promise<Blob>((r) => full.toBlob((b) => r(b!), "image/jpeg", 0.86));
  const tiny = document.createElement("canvas");
  tiny.width = 16;
  tiny.height = Math.max(1, Math.round((16 * height) / width));
  tiny.getContext("2d")!.drawImage(bmp, 0, 0, tiny.width, tiny.height);
  return { blob, width, height, blur: tiny.toDataURL("image/jpeg", 0.6) };
}

export function MediaManager({ initial, fixed, save }: { initial: Asset[]; fixed: string[]; save: Save }) {
  const [list, setList] = useState(initial);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ text: string; error?: boolean } | null>(null);
  const [filter, setFilter] = useState("");

  const update = (id: string, patch: Partial<Asset>) => setList((l) => l.map((a) => (a.id === id ? { ...a, ...patch } : a)));

  async function persist(next: Asset[]) {
    const r = await save(next);
    setMsg(r.ok ? { text: "Saved. The website updates within a minute." } : { text: r.error ?? "Could not save.", error: true });
  }

  async function upload(id: string, file: File) {
    setBusy(id);
    setMsg(null);
    try {
      const { blob, width, height, blur } = await prepare(file);
      const sb = supabaseBrowser();
      const path = `${id}-${Date.now()}.jpg`;
      const { error } = await sb.storage.from("media").upload(path, blob, { contentType: "image/jpeg", cacheControl: "31536000" });
      if (error) throw error;
      const src = sb.storage.from("media").getPublicUrl(path).data.publicUrl;
      const next = list.map((a) => (a.id === id ? { ...a, src, width, height, blur } : a));
      setList(next);
      await persist(next);
    } catch (e) {
      setMsg({ text: `Upload failed: ${e instanceof Error ? e.message : "unknown error"}. Try a JPG or PNG photo.`, error: true });
    }
    setBusy(null);
  }

  function add() {
    const name = prompt("Short name for the new photo (e.g. bride-anju-2026)");
    const id = name ? slugify(name) : "";
    if (!id) return;
    if (list.some((a) => a.id === id)) return alert("That name is already used.");
    setList([{ id, purpose: "Added in admin", alt: { en: "", ml: "" } }, ...list]);
  }

  const shown = list.filter((a) => !filter || `${a.id} ${a.purpose}`.toLowerCase().includes(filter.toLowerCase()));

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-3">
        <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search photos" className={`${inp} max-w-xs`} />
        <button type="button" onClick={add} className={secondary}>+ New photo</button>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((a) => (
          <li key={a.id} className="overflow-hidden rounded-xl border border-charcoal/10 bg-white">
            <div className="relative aspect-[4/3] bg-beige">
              {a.src ? <img src={a.src} alt={a.alt.en} className="size-full object-cover" /> : <p className="grid size-full place-items-center text-sm text-stone">No photo yet</p>}
              {busy === a.id && <p className="absolute inset-0 grid place-items-center bg-white/80 text-sm">Uploading…</p>}
            </div>
            <div className="space-y-3 p-4">
              <div>
                <p className="font-medium">{a.id}</p>
                <p className="text-xs text-stone">{a.purpose}</p>
              </div>
              <label className={`${secondary} w-full cursor-pointer`}>
                {a.src ? "Replace photo" : "Upload photo"}
                <input type="file" accept="image/*" className="sr-only" disabled={!!busy} onChange={(e) => e.target.files?.[0] && upload(a.id, e.target.files[0])} />
              </label>
              <label className="block">
                <span className={lbl}>Description (English)</span>
                <input value={a.alt.en} onChange={(e) => update(a.id, { alt: { ...a.alt, en: e.target.value } })} className={`${inp} mt-1`} />
              </label>
              <label className="block" lang="ml">
                <span className={lbl}>Description (മലയാളം)</span>
                <input value={a.alt.ml} onChange={(e) => update(a.id, { alt: { ...a.alt, ml: e.target.value } })} className={`${inp} mt-1`} />
              </label>
              {!fixed.includes(a.id) && (
                <button type="button" onClick={() => confirm(`Remove ${a.id}? Remove it from the Lookbook first if it is used there.`) && setList(list.filter((x) => x.id !== a.id))} className="text-sm text-red-700">
                  Remove photo
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="sticky bottom-0 z-30 -mx-4 mt-8 flex flex-wrap items-center gap-4 border-t border-charcoal/10 bg-ivory/95 px-4 py-3 backdrop-blur md:-mx-8 md:px-8">
        <button type="button" onClick={() => persist(list)} disabled={!!busy} className={primary}>Save descriptions</button>
        {msg && <p role="status" className={`text-sm ${msg.error ? "text-red-700" : "text-stone"}`}>{msg.text}</p>}
      </div>
    </>
  );
}
