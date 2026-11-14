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

export const lookbook: { image: string; category: LookCategory }[] = [
  { image: "bridal-feature", category: "bridal" },
  { image: "svc-kerala-kasavu", category: "kerala" },
  { image: "artistry-drape", category: "details" },
  { image: "svc-kanjeevaram-bridal", category: "kanjeevaram" },
  { image: "occasions-feature", category: "occasion" },
  { image: "svc-bridal-package", category: "bridal" },
  { image: "insta-03", category: "kerala" },
  { image: "svc-bridal-makeup", category: "beauty" },
  { image: "lookbook-03", category: "kanjeevaram" },
  { image: "artistry-reveal", category: "bridal" },
  { image: "lookbook-02", category: "kerala" },
  { image: "svc-accessories", category: "details" },
  { image: "lookbook-04", category: "occasion" },
  { image: "insta-05", category: "kanjeevaram" },
  { image: "svc-hair-styling", category: "beauty" },
  { image: "svc-bridal-saree-draping", category: "bridal" },
  { image: "why-detail", category: "kerala" },
  { image: "insta-02", category: "details" },
  { image: "svc-saree-styling", category: "occasion" },
  { image: "lookbook-01", category: "kanjeevaram" },
  { image: "insta-04", category: "details" },
  { image: "insta-01", category: "beauty" },
  { image: "intro-pleats", category: "details" },
];

export const instagramTiles = ["insta-01", "insta-02", "insta-03", "insta-04", "insta-05", "insta-06"];

export const testimonials: { quote: L; name: string; occasion: L }[] = [];
