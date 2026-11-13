import { site } from "@content/site";

export const waUrl = (text: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
export const telUrl = `tel:${site.phone}`;

export function fill(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? "");
}

export function isCallOpen(now = new Date()) {
  const ist = new Date(now.getTime() + (now.getTimezoneOffset() + 330) * 60_000);
  const h = ist.getHours();
  return h >= site.callHours.from && h < site.callHours.to;
}
