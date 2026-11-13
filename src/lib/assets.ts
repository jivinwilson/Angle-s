import manifest from "@content/assets.json";
import type { Locale } from "./i18n";

export type Asset = {
  id: string;
  purpose: string;
  type: "illustrative" | "portfolio";
  alt: Record<Locale, string>;
  src?: string;
  width?: number;
  height?: number;
  blur?: string;
};

const byId = new Map((manifest as Asset[]).map((a) => [a.id, a]));

export function asset(id: string) {
  const a = byId.get(id);
  if (!a) throw new Error(`Unknown asset "${id}" — add it to content/assets.json`);
  return a;
}
