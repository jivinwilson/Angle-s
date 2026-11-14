import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/server";
import { getContent } from "@/lib/content";
import { card, converted, rupees, sources, statuses } from "@/components/admin/ui";

const ranges = [
  { key: "month", label: "This month" },
  { key: "30", label: "Last 30 days" },
  { key: "year", label: "This year" },
  { key: "all", label: "All time" },
];

function rangeStart(key: string) {
  const now = new Date();
  if (key === "30") return new Date(now.getTime() - 30 * 864e5);
  if (key === "year") return new Date(now.getFullYear(), 0, 1);
  if (key === "all") return new Date(2000, 0, 1);
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

type Row = { id: number; created_at: string; source: string; name: string | null; service: string | null; status: string; amount: number | null; handled_by: string | null; event_date: string | null };

function group(rows: Row[], key: (r: Row) => string) {
  const m = new Map<string, { total: number; won: number; earned: number }>();
  for (const r of rows) {
    const k = key(r);
    const g = m.get(k) ?? { total: 0, won: 0, earned: 0 };
    g.total++;
    if (converted(r.status)) {
      g.won++;
      g.earned += Number(r.amount ?? 0);
    }
    m.set(k, g);
  }
  return [...m.entries()].sort((a, b) => b[1].earned - a[1].earned || b[1].total - a[1].total);
}

export default async function Dashboard({ searchParams }: PageProps<"/admin">) {
  const range = String((await searchParams).range ?? "month");
  const since = rangeStart(range).toISOString();
  const { sb } = await requireAdmin();
  const c = await getContent();

  const [{ data: all }, { data: admins }, wa, calls, forms] = await Promise.all([
    sb.from("enquiries").select("id,created_at,source,name,service,status,amount,handled_by,event_date").order("created_at", { ascending: false }),
    sb.from("admins").select("user_id,name"),
    sb.from("events").select("*", { count: "exact", head: true }).gte("created_at", since).in("type", ["whatsapp", "whatsapp-look"]),
    sb.from("events").select("*", { count: "exact", head: true }).gte("created_at", since).eq("type", "call"),
    sb.from("events").select("*", { count: "exact", head: true }).gte("created_at", since).eq("type", "whatsapp-form"),
  ]);

  const rows = (all ?? []) as Row[];
  const inRange = rows.filter((r) => r.created_at >= since);
  const won = inRange.filter((r) => converted(r.status));
  const earned = won.reduce((s, r) => s + Number(r.amount ?? 0), 0);
  const rate = inRange.length ? Math.round((won.length / inRange.length) * 100) : 0;
  const waiting = rows.filter((r) => r.status === "new").length;
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = rows
    .filter((r) => r.status === "booked" && r.event_date && r.event_date >= today)
    .sort((a, b) => a.event_date!.localeCompare(b.event_date!))
    .slice(0, 6);

  const serviceName = (slug: string | null) => (slug && c.services.find((s) => s.slug === slug)?.name.en) || slug || "Not specified";
  const staffName = (id: string | null) => admins?.find((a) => a.user_id === id)?.name ?? "Not handled yet";
  const sourceName = (v: string) => sources.find((s) => s.value === v)?.label ?? v;

  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - (5 - i));
    return d.toISOString().slice(0, 7);
  });
  const monthly = months.map((m) => {
    const list = rows.filter((r) => r.created_at.slice(0, 7) === m);
    const w = list.filter((r) => converted(r.status));
    return { m, total: list.length, won: w.length, earned: w.reduce((s, r) => s + Number(r.amount ?? 0), 0) };
  });
  const maxEarned = Math.max(1, ...monthly.map((x) => x.earned));

  const kpis = [
    { label: "Enquiries", value: String(inRange.length) },
    { label: "Converted", value: String(won.length), note: `${rate}% conversion` },
    { label: "Earned", value: rupees(earned), note: won.length ? `${rupees(earned / won.length)} per booking` : undefined },
    { label: "WhatsApp taps", value: String(wa.count ?? 0), note: `${forms.count ?? 0} enquiry forms sent` },
    { label: "Call taps", value: String(calls.count ?? 0) },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-burgundy">Dashboard</h1>
          {waiting > 0 && (
            <Link href="/admin/enquiries?status=new" className="mt-1 inline-block text-sm text-burgundy underline underline-offset-4">
              {waiting} new {waiting === 1 ? "enquiry needs" : "enquiries need"} a reply
            </Link>
          )}
        </div>
        <nav className="flex flex-wrap gap-1 rounded-lg bg-white p-1 text-sm ring-1 ring-charcoal/10">
          {ranges.map((r) => (
            <Link key={r.key} href={`/admin?range=${r.key}`} className={`rounded-md px-3 py-1.5 ${r.key === range ? "bg-burgundy text-ivory" : "text-stone hover:text-burgundy"}`}>
              {r.label}
            </Link>
          ))}
        </nav>
      </div>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {kpis.map((k) => (
          <div key={k.label} className={card}>
            <p className="text-xs uppercase tracking-wider text-stone">{k.label}</p>
            <p className="mt-2 text-2xl font-medium tabular-nums text-charcoal">{k.value}</p>
            {k.note && <p className="mt-1 text-xs text-stone">{k.note}</p>}
          </div>
        ))}
      </section>

      <section className={card}>
        <h2 className="font-medium">Last 6 months</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[30rem] text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-stone">
              <tr>
                <th className="py-2 font-medium">Month</th>
                <th className="py-2 text-right font-medium">Enquiries</th>
                <th className="py-2 text-right font-medium">Converted</th>
                <th className="w-2/5 py-2 pl-6 font-medium">Earned</th>
              </tr>
            </thead>
            <tbody>
              {monthly.map((x) => (
                <tr key={x.m} className="border-t border-charcoal/10">
                  <td className="py-2.5">{new Date(`${x.m}-01`).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</td>
                  <td className="py-2.5 text-right tabular-nums">{x.total}</td>
                  <td className="py-2.5 text-right tabular-nums">{x.won}</td>
                  <td className="py-2.5 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="h-2 flex-1 rounded-full bg-beige/60">
                        <div className="h-2 rounded-full bg-burgundy" style={{ width: `${(x.earned / maxEarned) * 100}%` }} />
                      </div>
                      <span className="w-24 text-right tabular-nums">{rupees(x.earned)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Breakdown title="By service" rows={group(inRange, (r) => serviceName(r.service))} />
        <Breakdown title="By source" rows={group(inRange, (r) => sourceName(r.source))} />
        <Breakdown title="By team member" rows={group(inRange, (r) => staffName(r.handled_by))} />
        <section className={card}>
          <h2 className="font-medium">Upcoming bookings</h2>
          {upcoming.length ? (
            <ul className="mt-3 divide-y divide-charcoal/10">
              {upcoming.map((r) => (
                <li key={r.id}>
                  <Link href={`/admin/enquiries/${r.id}`} className="flex justify-between gap-4 py-2.5 hover:text-burgundy">
                    <span>{r.name || "Unnamed"} · <span className="text-stone">{serviceName(r.service)}</span></span>
                    <span className="shrink-0 tabular-nums">{new Date(r.event_date!).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-stone">No upcoming bookings. Mark an enquiry as Booked and add its event date to see it here.</p>
          )}
        </section>
      </div>

      <p className="text-xs text-stone">
        Converted means status {statuses.filter((s) => converted(s.value)).map((s) => s.label).join(" or ")}. Earned adds up the amount charged on converted enquiries.
      </p>
    </div>
  );
}

function Breakdown({ title, rows }: { title: string; rows: [string, { total: number; won: number; earned: number }][] }) {
  return (
    <section className={card}>
      <h2 className="font-medium">{title}</h2>
      {rows.length ? (
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-stone">
            <tr>
              <th className="py-2 font-medium" />
              <th className="py-2 text-right font-medium">Enquiries</th>
              <th className="py-2 text-right font-medium">Converted</th>
              <th className="py-2 text-right font-medium">Earned</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([k, g]) => (
              <tr key={k} className="border-t border-charcoal/10">
                <td className="py-2.5 pr-3">{k}</td>
                <td className="py-2.5 text-right tabular-nums">{g.total}</td>
                <td className="py-2.5 text-right tabular-nums">{g.won}</td>
                <td className="py-2.5 text-right tabular-nums">{rupees(g.earned)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-3 text-sm text-stone">Nothing in this period yet.</p>
      )}
    </section>
  );
}
