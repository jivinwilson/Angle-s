import { cache } from "react";
import { copy, type CopyDoc } from "@content/copy";
import { site } from "@content/site";
import { services, blankService, type Service } from "@content/services";
import { lookbook, instagramTiles, testimonials, type LookCategory } from "@content/lookbook";
import { seo, banner } from "@content/seo";
import media from "@content/assets.json";
import type { L, Locale } from "./i18n";

export type Asset = { id: string; purpose: string; alt: L; src?: string; width?: number; height?: number; blur?: string };
export type Testimonial = { quote: L; name: string; occasion: L };

export const defaults = {
  copy: copy as CopyDoc,
  site,
  services: services.map((s) => ({ ...blankService, ...s })) as Service[],
  media: media as Asset[],
  lookbook: {
    items: lookbook as { image: string; category: LookCategory }[],
    instagram: instagramTiles,
    testimonials: testimonials as Testimonial[],
  },
  seo,
  banner,
};

export type ContentDoc = typeof defaults;
export type ContentKey = keyof ContentDoc;
export const contentKeys = Object.keys(defaults) as ContentKey[];

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);

export function merge<T>(base: T, over: unknown): T {
  if (over === undefined || over === null) return base;
  if (isObj(base) && isObj(over)) {
    const out: Record<string, unknown> = { ...base };
    for (const k of Object.keys(over)) out[k] = k in base ? merge(base[k], over[k]) : over[k];
    return out as T;
  }
  return Array.isArray(base) === Array.isArray(over) && typeof over === typeof base ? (over as T) : base;
}

export function resolve(db: Partial<Record<ContentKey, unknown>>): ContentDoc {
  const saved = Array.isArray(db.media) ? (db.media as Asset[]) : [];
  const ids = new Set(saved.map((m) => m.id));
  return {
    copy: merge(defaults.copy, db.copy),
    site: merge(defaults.site, db.site),
    services: Array.isArray(db.services) ? db.services.map((s) => merge(blankService, s)) : defaults.services,
    media: [...saved, ...defaults.media.filter((m) => !ids.has(m.id))],
    lookbook: merge(defaults.lookbook, db.lookbook),
    seo: merge(defaults.seo, db.seo),
    banner: merge(defaults.banner, db.banner),
  };
}

export const supabaseEnv = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  return url && key ? { url, key } : null;
};

async function load(): Promise<Partial<Record<ContentKey, unknown>>> {
  const env = supabaseEnv();
  if (!env) return {};
  const res = await fetch(`${env.url}/rest/v1/content?select=key,value`, {
    headers: { apikey: env.key },
    cache: "force-cache",
    next: { tags: ["content"] },
  });
  if (!res.ok) throw new Error(`Content fetch failed: ${res.status}`);
  const rows: { key: ContentKey; value: unknown }[] = await res.json();
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export const getContent = cache(async () => {
  const c = resolve(await load());
  const byId = new Map(c.media.map((a) => [a.id, a]));
  const visibleServices = c.services.filter((s) => s.visible && s.slug);
  return {
    ...c,
    visibleServices,
    t: (locale: Locale) => c.copy[locale],
    asset: (id: string): Asset => byId.get(id) ?? { id, purpose: "", alt: { en: "", ml: "" } },
    service: (slug: string) => visibleServices.find((s) => s.slug === slug),
  };
});

export type Content = Awaited<ReturnType<typeof getContent>>;

export const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;
