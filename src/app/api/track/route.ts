import { clip, insertPublic } from "@/lib/rest";

const types = ["whatsapp", "whatsapp-look", "whatsapp-form", "call"];

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  if (!types.includes(body.type)) return new Response(null, { status: 400 });
  return insertPublic("events", { type: body.type, path: clip(body.path, 200) });
}
