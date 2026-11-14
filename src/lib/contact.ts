export const waUrl = (number: string, text: string) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
export const telUrl = (phone: string) => `tel:${phone}`;

export function fill(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? "");
}

export function isCallOpen(hours: { from: number; to: number }, now = new Date()) {
  const ist = new Date(now.getTime() + (now.getTimezoneOffset() + 330) * 60_000);
  const h = ist.getHours();
  return h >= hours.from && h < hours.to;
}
