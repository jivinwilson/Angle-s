const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);

export function zip(en: unknown, ml: unknown): unknown {
  if (typeof en === "string" || (Array.isArray(en) && en.every((x) => typeof x === "string"))) return { en, ml };
  if (Array.isArray(en)) return en.map((x, i) => zip(x, Array.isArray(ml) ? ml[i] : undefined));
  if (isObj(en)) return Object.fromEntries(Object.keys(en).map((k) => [k, zip(en[k], isObj(ml) ? ml[k] : undefined)]));
  return { en, ml };
}

export function unzip(v: unknown, lang: "en" | "ml"): unknown {
  if (isObj(v) && "en" in v && "ml" in v && Object.keys(v).length === 2) return v[lang];
  if (Array.isArray(v)) return v.map((x) => unzip(x, lang));
  if (isObj(v)) return Object.fromEntries(Object.keys(v).map((k) => [k, unzip(v[k], lang)]));
  return v;
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
