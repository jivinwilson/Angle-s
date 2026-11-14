import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/server";
import { getContent } from "@/lib/content";
import { deleteEnquiry, saveEnquiry } from "@/app/admin/actions";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { card, danger, inp, lbl, primary, secondary, sources, statuses } from "@/components/admin/ui";

export default async function EnquiryPage({ params }: PageProps<"/admin/enquiries/[id]">) {
  const { id } = await params;
  const { sb } = await requireAdmin();
  const c = await getContent();
  const isNew = id === "new";
  const { data: e } = isNew ? { data: null } : await sb.from("enquiries").select("*").eq("id", id).maybeSingle();
  if (!isNew && !e) notFound();
  const { data: admins } = await sb.from("admins").select("user_id,name");
  const v = (k: string) => (e?.[k] ?? "") as string;
  const field = (name: string, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <label className="block">
      <span className={lbl}>{label}</span>
      <input name={name} defaultValue={v(name)} className={`${inp} mt-1.5`} {...props} />
    </label>
  );
  const digits = v("phone").replace(/\D/g, "");

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link href="/admin/enquiries" className="text-sm text-stone hover:text-burgundy">← Enquiries</Link>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-4xl text-burgundy">{isNew ? "Add enquiry" : v("name") || "Enquiry"}</h1>
        {digits && (
          <a href={`https://wa.me/${digits.length === 10 ? `91${digits}` : digits}`} target="_blank" rel="noopener" className={secondary}>Open WhatsApp chat ↗</a>
        )}
      </div>
      {e && (
        <p className="-mt-3 text-sm text-stone">
          Received {new Date(e.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
          {e.handled_by && ` · last updated by ${admins?.find((a) => a.user_id === e.handled_by)?.name ?? "team"}`}
        </p>
      )}

      <form action={saveEnquiry} className="space-y-6">
        {e && <input type="hidden" name="id" value={e.id} />}

        <section className={`${card} grid gap-4 sm:grid-cols-2`}>
          <h2 className="font-medium sm:col-span-2">Booking</h2>
          <label className="block">
            <span className={lbl}>Status</span>
            <select name="status" defaultValue={v("status") || "new"} className={`${inp} mt-1.5`}>
              {statuses.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </label>
          {field("amount", "Amount charged (₹)", { type: "number", min: 0, step: 1, inputMode: "numeric" })}
          <label className="block">
            <span className={lbl}>Service</span>
            <select name="service" defaultValue={v("service")} className={`${inp} mt-1.5`}>
              <option value="">Not specified</option>
              {c.services.map((s) => <option key={s.slug} value={s.slug}>{s.name.en}</option>)}
            </select>
          </label>
          {field("event_date", "Event date", { type: "date" })}
          <label className="block sm:col-span-2">
            <span className={lbl}>Notes (private)</span>
            <textarea name="notes" defaultValue={v("notes")} rows={3} className={`${inp} mt-1.5`} />
          </label>
        </section>

        <section className={`${card} grid gap-4 sm:grid-cols-2`}>
          <h2 className="font-medium sm:col-span-2">Customer</h2>
          {field("name", "Name")}
          {field("phone", "Phone / WhatsApp", { type: "tel" })}
          <label className="block">
            <span className={lbl}>Came from</span>
            <select name="source" defaultValue={v("source") || "whatsapp"} className={`${inp} mt-1.5`}>
              {sources.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </label>
          {field("occasion", "Occasion")}
          {field("place", "Place")}
          {field("people", "Number of people")}
          {field("mode", "Where (parlour / home)")}
          <label className="block sm:col-span-2">
            <span className={lbl}>Customer message</span>
            <textarea name="message" defaultValue={v("message")} rows={3} className={`${inp} mt-1.5`} />
          </label>
        </section>

        <div className="sticky bottom-0 -mx-4 flex flex-wrap items-center justify-between gap-3 border-t border-charcoal/10 bg-ivory/95 px-4 py-3 backdrop-blur">
          <button className={primary}>{isNew ? "Add enquiry" : "Save changes"}</button>
          {e && (
            <ConfirmButton formAction={deleteEnquiry} message="Delete this enquiry permanently?" className={danger}>
              Delete
            </ConfirmButton>
          )}
        </div>
      </form>
    </div>
  );
}
