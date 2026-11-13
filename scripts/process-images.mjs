import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const manifestPath = path.join(root, "content/assets.json");
const incoming = path.join(root, "public/images/incoming");
const out = path.join(root, "public/images");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const byId = new Map(manifest.map((a) => [a.id, a]));

for (const file of fs.readdirSync(incoming)) {
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp", ".avif"].includes(ext)) continue;
  const id = path.basename(file, ext);
  const asset = byId.get(id);
  if (!asset) {
    console.warn(`skip ${file}: no asset "${id}" in content/assets.json`);
    continue;
  }
  const src = path.join(incoming, file);
  const img = sharp(src).rotate().resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true });
  const info = await img.jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(out, `${id}.jpg`));
  const blur = await sharp(src).rotate().resize(16).webp({ quality: 40 }).toBuffer();
  Object.assign(asset, {
    src: `/images/${id}.jpg`,
    width: info.width,
    height: info.height,
    blur: `data:image/webp;base64,${blur.toString("base64")}`,
    lowRes: info.width < 1200,
  });
  console.log(`${id}: ${info.width}x${info.height}${info.width < 1200 ? "  (LOW RES — replace with original)" : ""}`);
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
const missing = manifest.filter((a) => !a.src).map((a) => a.id);
if (missing.length) console.log(`\nmissing images: ${missing.join(", ")}`);
