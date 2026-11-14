"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin, supabaseServer } from "@/lib/supabase/server";
import { contentKeys, type ContentKey } from "@/lib/content";
import { slugify, unzip } from "@/lib/bilingual";

type Result = { ok: true } | { ok: false; error: string };

export async function saveContent(key: ContentKey, value: unknown): Promise<Result> {
  const { sb, userId } = await requireAdmin();
  if (!contentKeys.includes(key)) return { ok: false, error: "Unknown section" };
  if (key === "copy") value = { en: unzip(value, "en"), ml: unzip(value, "ml") };
  if (key === "services") {
    const list = value as { slug: string; name: { en: string } }[];
    const seen = new Set<string>();
    for (const s of list) {
      s.slug = slugify(s.slug || s.name.en);
      if (!s.slug) return { ok: false, error: "Every service needs an English name." };
      if (seen.has(s.slug)) return { ok: false, error: `Two services use the web address "${s.slug}".` };
      seen.add(s.slug);
    }
  }
  const { error } = await sb.from("content").upsert({ key, value, updated_at: new Date().toISOString(), updated_by: userId });
  if (error) return { ok: false, error: error.message };
  updateTag("content");
  return { ok: true };
}

const text = (f: FormData, k: string) => {
  const v = String(f.get(k) ?? "").trim();
  return v || null;
};

export async function saveEnquiry(form: FormData) {
  const { sb, userId } = await requireAdmin();
  const id = text(form, "id");
  const amount = text(form, "amount");
  const row = {
    source: text(form, "source") ?? "other",
    name: text(form, "name"),
    phone: text(form, "phone"),
    service: text(form, "service"),
    occasion: text(form, "occasion"),
    event_date: text(form, "event_date"),
    place: text(form, "place"),
    people: text(form, "people"),
    mode: text(form, "mode"),
    message: text(form, "message"),
    status: text(form, "status") ?? "new",
    amount: amount ? Number(amount) : null,
    notes: text(form, "notes"),
    handled_by: userId,
    updated_at: new Date().toISOString(),
  };
  const { error } = id ? await sb.from("enquiries").update(row).eq("id", id) : await sb.from("enquiries").insert(row);
  if (error) throw new Error(error.message);
  redirect("/admin/enquiries");
}

export async function deleteEnquiry(form: FormData) {
  const { sb } = await requireAdmin();
  const { error } = await sb.from("enquiries").delete().eq("id", String(form.get("id")));
  if (error) throw new Error(error.message);
  redirect("/admin/enquiries");
}

export async function signOut() {
  await (await supabaseServer()).auth.signOut();
  redirect("/admin/login");
}
