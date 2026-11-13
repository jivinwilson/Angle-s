import type { L } from "@/lib/i18n";

export type LookCategory = "bridal" | "kerala" | "kanjeevaram" | "occasion" | "details" | "beauty";

export const lookCategories: Record<LookCategory, L> = {
  bridal: { en: "Bridal", ml: "ബ്രൈഡൽ" },
  kerala: { en: "Kerala Kasavu", ml: "കേരള കസവ്" },
  kanjeevaram: { en: "Kanjeevaram", ml: "കാഞ്ചീപുരം" },
  occasion: { en: "Occasions", ml: "ആഘോഷങ്ങൾ" },
  details: { en: "Details", ml: "വിശദാംശങ്ങൾ" },
  beauty: { en: "Makeup & Hair", ml: "മേക്കപ്പ് & ഹെയർ" },
};

export const lookbook: { id: string; category: LookCategory }[] = [
  { id: "bridal-feature", category: "bridal" },
  { id: "svc-kerala-kasavu", category: "kerala" },
  { id: "artistry-drape", category: "details" },
  { id: "svc-kanjeevaram-bridal", category: "kanjeevaram" },
  { id: "occasions-feature", category: "occasion" },
  { id: "svc-bridal-package", category: "bridal" },
  { id: "insta-03", category: "kerala" },
  { id: "svc-bridal-makeup", category: "beauty" },
  { id: "lookbook-03", category: "kanjeevaram" },
  { id: "artistry-reveal", category: "bridal" },
  { id: "lookbook-02", category: "kerala" },
  { id: "svc-accessories", category: "details" },
  { id: "lookbook-04", category: "occasion" },
  { id: "insta-05", category: "kanjeevaram" },
  { id: "svc-hair-styling", category: "beauty" },
  { id: "svc-bridal-saree-draping", category: "bridal" },
  { id: "why-detail", category: "kerala" },
  { id: "insta-02", category: "details" },
  { id: "svc-saree-styling", category: "occasion" },
  { id: "lookbook-01", category: "kanjeevaram" },
  { id: "insta-04", category: "details" },
  { id: "insta-01", category: "beauty" },
  { id: "intro-pleats", category: "details" },
];

export const instagramTiles = ["insta-01", "insta-02", "insta-03", "insta-04", "insta-05", "insta-06"];

export const testimonials: { quote: L; name: string; occasion: L }[] = [];
