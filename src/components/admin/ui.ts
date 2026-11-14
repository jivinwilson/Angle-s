export const inp =
  "w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 text-[0.95rem] text-charcoal outline-none transition-colors focus:border-burgundy";
export const lbl = "block text-xs font-medium uppercase tracking-wider text-stone";
export const card = "rounded-xl border border-charcoal/10 bg-white p-5";
export const button = "inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors";
export const primary = `${button} bg-burgundy text-ivory hover:bg-burgundy-deep disabled:opacity-50`;
export const secondary = `${button} border border-charcoal/20 bg-white text-charcoal hover:border-burgundy hover:text-burgundy`;
export const danger = `${button} border border-red-700/30 bg-white text-red-700 hover:bg-red-50`;

export const statuses = [
  { value: "new", label: "New", tone: "bg-sky-100 text-sky-900" },
  { value: "contacted", label: "Contacted", tone: "bg-amber-100 text-amber-900" },
  { value: "booked", label: "Booked", tone: "bg-emerald-100 text-emerald-900" },
  { value: "completed", label: "Completed", tone: "bg-emerald-200 text-emerald-950" },
  { value: "lost", label: "Lost", tone: "bg-stone-200 text-stone-700" },
] as const;

export const sources = [
  { value: "website", label: "Website form" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "call", label: "Phone call" },
  { value: "walk-in", label: "Walk-in" },
  { value: "instagram", label: "Instagram" },
  { value: "other", label: "Other" },
] as const;

export const converted = (s: string) => s === "booked" || s === "completed";
export const rupees = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
