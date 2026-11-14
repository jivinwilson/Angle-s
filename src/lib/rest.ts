import { supabaseEnv } from "./content";

export async function insertPublic(table: "enquiries" | "events", row: Record<string, unknown>) {
  const env = supabaseEnv();
  if (!env) return new Response(null, { status: 204 });
  const res = await fetch(`${env.url}/rest/v1/${table}`, {
    method: "POST",
    headers: { apikey: env.key, "content-type": "application/json", prefer: "return=minimal" },
    body: JSON.stringify(row),
  });
  return new Response(null, { status: res.ok ? 204 : 400 });
}

export const clip = (v: unknown, max: number) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null);
