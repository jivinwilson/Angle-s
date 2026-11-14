import { requireAdmin } from "@/lib/supabase/server";
import { defaults, resolve } from "@/lib/content";
import { saveContent } from "@/app/admin/actions";
import { MediaManager } from "@/components/admin/MediaManager";

export default async function Media() {
  const { sb } = await requireAdmin();
  const { data } = await sb.from("content").select("value").eq("key", "media").maybeSingle();
  const media = resolve({ media: data?.value }).media.map(({ id, purpose, alt, src, width, height, blur }) => ({ id, purpose, alt, src, width, height, blur }));

  return (
    <div>
      <h1 className="font-display text-4xl text-burgundy">Photos</h1>
      <p className="mb-8 mt-2 max-w-2xl text-sm text-stone">
        Replace any photo on the website. Each photo is named after where it appears (hero, services, lookbook…). Photos are resized automatically — upload the best quality you have. Descriptions help Google and people using screen readers.
      </p>
      <MediaManager initial={media} fixed={defaults.media.map((m) => m.id)} save={saveContent.bind(null, "media")} />
    </div>
  );
}
