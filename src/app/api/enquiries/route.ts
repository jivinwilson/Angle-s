import { clip, insertPublic } from "@/lib/rest";

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const date = typeof b.event_date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(b.event_date) ? b.event_date : null;
  return insertPublic("enquiries", {
    source: "website",
    name: clip(b.name, 120),
    service: clip(b.service, 80),
    occasion: clip(b.occasion, 80),
    event_date: date,
    place: clip(b.place, 120),
    people: clip(b.people, 10),
    mode: clip(b.mode, 60),
    message: clip(b.message, 2000),
  });
}
