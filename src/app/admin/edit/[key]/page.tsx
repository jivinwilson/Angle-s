import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/server";
import { resolve, type ContentKey } from "@/lib/content";
import { zip } from "@/lib/bilingual";
import { saveContent } from "@/app/admin/actions";
import { JsonEditor } from "@/components/admin/JsonEditor";
import { blankService, groups } from "@content/services";
import { lookCategories } from "@content/lookbook";

const sections: Partial<Record<ContentKey, { title: string; intro: string; templates?: Record<string, unknown> }>> = {
  services: {
    title: "Services & prices",
    intro: "Add, edit, hide or reorder services. Set a starting price to show “Starting from ₹…” on the website; 0 keeps the price hidden.",
    templates: { services: blankService },
  },
  copy: {
    title: "Page text",
    intro: "Every heading and paragraph on the website, in English and Malayalam. Keep words in {curly brackets} exactly as they are — they are filled in automatically.",
  },
  banner: {
    title: "Banner",
    intro: "A thin announcement strip at the top of every page — offers, holiday closures or booking news. Tick “Show the banner” and save.",
  },
  lookbook: {
    title: "Lookbook & Instagram",
    intro: "Choose which photos appear in the Lookbook and the Instagram strip, and add client testimonials. Upload new photos in Photos first.",
    templates: {
      items: { image: "", category: "bridal" },
      testimonials: { quote: { en: "", ml: "" }, name: "", occasion: { en: "", ml: "" } },
    },
  },
  seo: {
    title: "SEO",
    intro: "What Google shows for each page. Titles work best under 60 characters and descriptions under 155. Paste Google Search Console or Bing verification codes under Verification.",
  },
  site: {
    title: "Business details",
    intro: "Phone, WhatsApp, Instagram, address and hours used across the website.",
  },
};

export default async function Edit({ params }: PageProps<"/admin/edit/[key]">) {
  const key = (await params).key as ContentKey;
  const section = sections[key];
  if (!section) notFound();
  const { sb } = await requireAdmin();
  const { data } = await sb.from("content").select("key,value");
  const doc = resolve(Object.fromEntries((data ?? []).map((r) => [r.key, r.value])));
  const initial = key === "copy" ? zip(doc.copy.en, doc.copy.ml) : doc[key];
  const enums = {
    group: Object.entries(groups).map(([value, l]) => ({ value, label: l.en })),
    category: Object.entries(lookCategories).map(([value, l]) => ({ value, label: l.en })),
  };

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-4xl text-burgundy">{section.title}</h1>
      <p className="mb-8 mt-2 max-w-2xl text-sm text-stone">{section.intro}</p>
      <JsonEditor
        key={key}
        rootKey={key}
        initial={JSON.parse(JSON.stringify(initial))}
        media={doc.media.map(({ id, src, purpose }) => ({ id, src, purpose }))}
        enums={enums}
        templates={section.templates ?? {}}
        save={saveContent.bind(null, key)}
      />
    </div>
  );
}
