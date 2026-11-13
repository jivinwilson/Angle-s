import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const key = process.env.GOOGLE_API_KEY;
if (!key) throw new Error("Set GOOGLE_API_KEY in .env.local and run: node --env-file=.env.local scripts/generate-images.mjs");

const model = process.env.IMAGE_MODEL ?? "gemini-3-pro-image";
const { style, reference, images } = JSON.parse(fs.readFileSync(path.join(root, "assets-src/image-prompts.json"), "utf8"));
const previews = path.join(root, "assets-src/previews");
const out = path.join(root, "public/images/incoming");

const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((a) => !a.startsWith("--"));
const ids = (only.length ? only : Object.keys(images)).filter((id) => force || !fs.existsSync(path.join(out, `${id}.png`)));

function previewPart(id) {
  const file = fs.readdirSync(previews).find((f) => path.parse(f).name === id);
  if (!file) return [];
  const mime = file.endsWith(".png") ? "image/png" : "image/jpeg";
  return [{ inlineData: { mimeType: mime, data: fs.readFileSync(path.join(previews, file)).toString("base64") } }];
}

async function generate(id) {
  const [aspectRatio, description] = images[id];
  const ref = previewPart(id);
  const text = [description, style, ref.length ? reference : ""].join("\n\n");
  const body = {
    contents: [{ role: "user", parts: [...ref, { text }] }],
    generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio, imageSize: "2K" } },
  };
  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "x-goog-api-key": key, "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    const img = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData)?.inlineData;
    if (res.ok && img) {
      fs.writeFileSync(path.join(out, `${id}.png`), Buffer.from(img.data, "base64"));
      console.log(`✓ ${id}`);
      return;
    }
    const reason = json.error?.message ?? json.candidates?.[0]?.finishReason ?? res.status;
    if (attempt === 4 || (res.status < 500 && res.status !== 429 && res.ok === false)) {
      console.error(`✗ ${id}: ${String(reason).slice(0, 200)}`);
      return;
    }
    await new Promise((r) => setTimeout(r, attempt * 8000));
  }
}

const queue = [...ids];
await Promise.all(
  Array.from({ length: 3 }, async () => {
    while (queue.length) await generate(queue.shift());
  }),
);
console.log(`done: ${ids.length} requested`);
