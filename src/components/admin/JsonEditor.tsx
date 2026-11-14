"use client";

import { createContext, use, useState } from "react";
import { inp, lbl, primary, secondary } from "./ui";

type Media = { id: string; src?: string; purpose: string };
type Option = { value: string; label: string };
type Ctx = { media: Media[]; enums: Record<string, Option[]>; templates: Record<string, unknown> };
type Json = string | number | boolean | null | Json[] | { [k: string]: Json };
type Change = (v: Json) => void;

const EditorCtx = createContext<Ctx>({ media: [], enums: {}, templates: {} });
const isObj = (v: unknown): v is Record<string, Json> => !!v && typeof v === "object" && !Array.isArray(v);
const isStrList = (v: unknown): v is string[] => Array.isArray(v) && v.every((x) => typeof x === "string");
const isL = (v: unknown): v is { en: Json; ml: Json } =>
  isObj(v) && Object.keys(v).length === 2 && "en" in v && "ml" in v && (typeof v.en === "string" || isStrList(v.en));

const hints: Record<string, string> = {
  slug: "Web address, e.g. bridal-makeup. Leave empty to create it from the name.",
  priceFrom: "Starting price in ₹. Set 0 to hide the price.",
  showPrice: "Show “Starting from” price on the website",
  visible: "Show on the website",
  show: "Show the banner",
  link: "Optional, e.g. /contact or /services/bridal-makeup",
  whatsapp: "Country code + number, no spaces or +",
  phone: "With +91",
  callHours: "Calls allowed between these hours (24-hour clock)",
  keywords: "One per line",
  includes: "One per line",
  instagram: "Photos shown in the Instagram strip",
};

const labels: Record<string, string> = { priceFrom: "Starting price (₹)", showPrice: "Show price", ml: "മലയാളം", en: "English", seo: "Google search (optional)" };
const human = (k: string) => labels[k] ?? k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

function blank(v: Json): Json {
  if (typeof v === "string") return "";
  if (typeof v === "number") return 0;
  if (typeof v === "boolean") return true;
  if (Array.isArray(v)) return [];
  if (isObj(v)) return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blank(x)]));
  return null;
}

function itemTitle(v: Json, i: number) {
  if (!isObj(v)) return `Item ${i + 1}`;
  const pick = (x: Json | undefined) => (isL(x) ? (x.en as string) : typeof x === "string" ? x : "");
  return pick(v.name) || pick(v.title) || pick(v.label) || pick(v.quote)?.slice(0, 60) || pick(v.image) || pick(v.slug) || `Item ${i + 1}`;
}

function Text({ k, value, onChange }: { k: string; value: string; onChange: Change }) {
  const { media, enums } = use(EditorCtx);
  if (k === "image") return <MediaPick value={value} onChange={onChange} media={media} />;
  if (enums[k])
    return (
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inp}>
        {enums[k].map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    );
  const long = value.length > 70 || ["body", "intro", "description", "quote", "message"].includes(k);
  return long ? (
    <textarea value={value} rows={Math.min(8, Math.ceil(value.length / 70) + 1)} onChange={(e) => onChange(e.target.value)} className={inp} />
  ) : (
    <input value={value} onChange={(e) => onChange(e.target.value)} className={inp} />
  );
}

function Lines({ value, onChange }: { value: string[]; onChange: Change }) {
  return <textarea value={value.join("\n")} rows={Math.max(3, value.length + 1)} onChange={(e) => onChange(e.target.value.split("\n"))} onBlur={() => onChange(value.map((s) => s.trim()).filter(Boolean))} className={inp} />;
}

function MediaPick({ value, onChange, media }: { value: string; onChange: Change; media: Media[] }) {
  const m = media.find((x) => x.id === value);
  return (
    <div className="flex items-center gap-3">
      <div className="size-14 shrink-0 overflow-hidden rounded-md bg-beige">
        {m?.src && <img src={m.src} alt="" className="size-full object-cover" />}
      </div>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inp}>
        {!m && <option value={value}>{value || "Choose a photo"}</option>}
        {media.map((x) => <option key={x.id} value={x.id}>{x.id}{x.purpose ? ` — ${x.purpose}` : ""}</option>)}
      </select>
    </div>
  );
}

function Leaf({ k, value, onChange }: { k: string; value: Json; onChange: Change }) {
  const { media } = use(EditorCtx);
  if (typeof value === "string") return <Text k={k} value={value} onChange={onChange} />;
  if (typeof value === "number") return <input type="number" value={value} min={0} onChange={(e) => onChange(Number(e.target.value) || 0)} className={`${inp} max-w-48`} />;
  if (typeof value === "boolean")
    return (
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="size-4 accent-burgundy" />
        {hints[k] ?? "Yes"}
      </label>
    );
  if (isStrList(value) && k === "instagram")
    return (
      <div className="space-y-2">
        {value.map((id, i) => (
          <div key={i} className="flex gap-2">
            <div className="flex-1"><MediaPick value={id} media={media} onChange={(v) => onChange(value.map((x, j) => (j === i ? (v as string) : x)))} /></div>
            <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className={secondary} aria-label="Remove">✕</button>
          </div>
        ))}
        <button type="button" onClick={() => onChange([...value, media[0]?.id ?? ""])} className={secondary}>+ Add photo</button>
      </div>
    );
  if (isStrList(value) && (value.length === 0 || k !== "items")) return <Lines value={value} onChange={onChange} />;
  return null;
}

function Bilingual({ k, value, onChange }: { k: string; value: { en: Json; ml: Json }; onChange: Change }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {(["en", "ml"] as const).map((lang) => (
        <div key={lang} lang={lang}>
          <span className="mb-1 block text-[0.7rem] text-stone">{lang === "en" ? "English" : "മലയാളം"}</span>
          {isStrList(value[lang]) || (lang === "ml" && isStrList(value.en)) ? (
            <Lines value={(value[lang] as string[]) ?? []} onChange={(v) => onChange({ ...value, [lang]: v })} />
          ) : (
            <Text k={k} value={(value[lang] as string) ?? ""} onChange={(v) => onChange({ ...value, [lang]: v })} />
          )}
        </div>
      ))}
    </div>
  );
}

function ObjectList({ k, value, onChange }: { k: string; value: Json[]; onChange: Change }) {
  const { templates } = use(EditorCtx);
  const move = (i: number, d: number) => {
    const next = [...value];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };
  const add = () => onChange([...value, structuredClone((templates[k] as Json) ?? blank(value[0]))]);
  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <details key={i} className="group rounded-lg border border-charcoal/10 bg-white open:shadow-sm">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3">
            <span className="font-medium">
              {itemTitle(item, i)}
              {isObj(item) && item.visible === false && <span className="ml-2 rounded bg-stone-200 px-1.5 py-0.5 text-xs text-stone-700">Hidden</span>}
            </span>
            <span className="text-stone transition-transform group-open:rotate-180">⌄</span>
          </summary>
          <div className="space-y-4 border-t border-charcoal/10 px-4 py-4">
            <Field k={k} value={item} onChange={(v) => onChange(value.map((x, j) => (j === i ? v : x)))} depth={2} bare />
            <div className="flex flex-wrap gap-2 border-t border-charcoal/10 pt-4">
              <button type="button" disabled={i === 0} onClick={() => move(i, -1)} className={secondary}>↑ Move up</button>
              <button type="button" disabled={i === value.length - 1} onClick={() => move(i, 1)} className={secondary}>↓ Move down</button>
              <button type="button" onClick={() => confirm("Remove this item?") && onChange(value.filter((_, j) => j !== i))} className={`${secondary} text-red-700`}>Remove</button>
            </div>
          </div>
        </details>
      ))}
      {(templates[k] !== undefined || value.length > 0) && (
        <button type="button" onClick={add} className={secondary}>+ Add {human(k).replace(/s$/, "").toLowerCase()}</button>
      )}
    </div>
  );
}

function Field({ k, value, onChange, depth, bare }: { k: string; value: Json; onChange: Change; depth: number; bare?: boolean }) {
  const hint = typeof value !== "boolean" && hints[k];
  const head = !bare && (
    <div className="mb-1.5">
      <span className={lbl}>{human(k)}</span>
      {hint && <span className="mt-0.5 block text-xs text-stone">{hint}</span>}
    </div>
  );

  if (isL(value)) return <div>{head}<Bilingual k={k} value={value} onChange={onChange} /></div>;
  if (Array.isArray(value) && !isStrList(value)) return <div>{head}<ObjectList k={k} value={value} onChange={onChange} /></div>;
  if (Array.isArray(value) && value.length === 0 && use(EditorCtx).templates[k] !== undefined) return <div>{head}<ObjectList k={k} value={value} onChange={onChange} /></div>;

  if (isObj(value)) {
    const children = Object.entries(value).map(([ck, cv]) => (
      <Field key={ck} k={ck} value={cv} depth={depth + 1} onChange={(v) => onChange({ ...value, [ck]: v })} />
    ));
    if (depth === 1)
      return (
        <details className="group rounded-xl border border-charcoal/10 bg-white">
          <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-lg font-medium">
            {human(k)}
            <span className="text-stone transition-transform group-open:rotate-180">⌄</span>
          </summary>
          <div className="space-y-5 border-t border-charcoal/10 p-5">{children}</div>
        </details>
      );
    return (
      <fieldset className={bare || depth === 0 ? "space-y-5" : "space-y-4 rounded-lg border border-charcoal/10 p-4"}>
        {!bare && depth > 0 && <legend className={`${lbl} px-1`}>{human(k)}</legend>}
        {children}
      </fieldset>
    );
  }
  return <div>{head}<Leaf k={k} value={value} onChange={onChange} /></div>;
}

export function JsonEditor({ rootKey, initial, save, ...ctx }: Ctx & { rootKey: string; initial: Json; save: (v: Json) => Promise<{ ok: boolean; error?: string }> }) {
  const [value, setValue] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<{ busy?: boolean; msg?: string; error?: boolean }>({});

  async function submit() {
    setStatus({ busy: true });
    const r = await save(value);
    setStatus(r.ok ? { msg: "Saved. The website updates within a minute." } : { msg: r.error, error: true });
    if (r.ok) setDirty(false);
  }

  return (
    <EditorCtx value={ctx}>
      <div className="space-y-4">
        <Field k={rootKey} value={value} depth={0} bare onChange={(v) => { setValue(v); setDirty(true); setStatus({}); }} />
      </div>
      <div className="sticky bottom-0 z-30 -mx-4 mt-8 flex flex-wrap items-center gap-4 border-t border-charcoal/10 bg-ivory/95 px-4 py-3 backdrop-blur md:-mx-8 md:px-8">
        <button type="button" onClick={submit} disabled={status.busy || !dirty} className={primary}>
          {status.busy ? "Saving…" : "Save changes"}
        </button>
        <p role="status" className={`text-sm ${status.error ? "text-red-700" : "text-stone"}`}>
          {status.msg ?? (dirty ? "You have unsaved changes." : "")}
        </p>
      </div>
    </EditorCtx>
  );
}
