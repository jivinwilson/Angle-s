import { supabaseEnv } from "@/lib/content";

export async function GET() {
  const env = supabaseEnv();
  if (env) await fetch(`${env.url}/rest/v1/content?select=key&limit=1`, { headers: { apikey: env.key }, cache: "no-store" });
  return Response.json({ ok: true });
}
