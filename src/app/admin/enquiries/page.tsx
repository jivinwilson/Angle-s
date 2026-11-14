import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/server";
import { getContent } from "@/lib/content";
import { inp, primary, rupees, sources, statuses } from "@/components/admin/ui";

export default async function Enquiries({ searchParams }: PageProps<"/admin/enquiries">) {
  const sp = await searchParams;
  const status = String(sp.status ?? "");
  const q = String(sp.q ?? "").trim();
  const { sb } = await requireAdmin();
  const c = await getContent();

  const { data } = await sb.from("enquiries").select("id,created_at,source,name,phone,service,status,amount,event_date").order("created_at", { ascending: false }).limit(500);
  const all = data ?? [];
  const counts = Object.fromEntries(statuses.map((s) => [s.value, all.filter((r) => r.status === s.value).length]));
  const needle = q.toLowerCase();
  const rows = all.filter((r) => (!status || r.status === status) && (!q || `${r.name ?? ""} ${r.phone ?? ""}`.toLowerCase().includes(needle)));
  const serviceName = (slug: string | null) => (slug && c.services.find((s) => s.slug === slug)?.name.en) || slug || "—";
  const tab = (value: string, label: string, n: number) => (
    <Link
      key={value}
      href={`/admin/enquiries${value ? `?status=${value}` : ""}`}
      className={`shrink-0 rounded-full px-3 py-1.5 text-sm ${status === value ? "bg-burgundy text-ivory" : "bg-white text-stone ring-1 ring-charcoal/10 hover:text-burgundy"}`}
    >
      {label} <span className="tabular-nums opacity-70">{n}</span>
    </Link>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-4xl text-burgundy">Enquiries</h1>
        <Link href="/admin/enquiries/new" className={primary}>+ Add enquiry</Link>
      </div>
      <p className="-mt-3 text-sm text-stone">Website form enquiries appear here automatically. Add WhatsApp, phone and walk-in enquiries yourself, then update the status and amount when a booking is confirmed.</p>

      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {tab("", "All", all.length)}
        {statuses.map((s) => tab(s.value, s.label, counts[s.value]))}
      </div>

      <form className="flex gap-2">
        {status && <input type="hidden" name="status" value={status} />}
        <input name="q" defaultValue={q} placeholder="Search name or phone" className={`${inp} max-w-xs`} />
      </form>

      {rows.length ? (
        <ul className="divide-y divide-charcoal/10 overflow-hidden rounded-xl bg-white ring-1 ring-charcoal/10">
          {rows.map((r) => {
            const st = statuses.find((s) => s.value === r.status)!;
            return (
              <li key={r.id}>
                <Link href={`/admin/enquiries/${r.id}`} className="grid gap-1 px-4 py-3 hover:bg-ivory md:grid-cols-[1.5fr_1.5fr_1fr_1fr_auto] md:items-center md:gap-4">
                  <span>
                    <span className="font-medium">{r.name || "Unnamed"}</span>
                    {r.phone && <span className="ml-2 text-sm text-stone">{r.phone}</span>}
                  </span>
                  <span className="text-sm">{serviceName(r.service)}</span>
                  <span className="text-sm text-stone">
                    {new Date(r.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} · {sources.find((s) => s.value === r.source)?.label}
                  </span>
                  <span className="text-sm tabular-nums">{r.amount != null ? rupees(Number(r.amount)) : ""}</span>
                  <span className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${st.tone}`}>{st.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="rounded-xl bg-white p-8 text-center text-stone ring-1 ring-charcoal/10">No enquiries here yet.</p>
      )}
    </div>
  );
}
