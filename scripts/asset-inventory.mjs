import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "content/assets.json"), "utf8"));
const esc = (s) => String(s ?? "").replaceAll("|", "\|");

const rows = manifest.map((a) =>
  `| \`${a.id}\` | ${a.src ? `\`public${a.src}\`` : "—"} | ${a.width ? `${a.width}×${a.height}${a.lowRes ? " ⚠️ low-res" : ""}` : "missing"} | ${esc(a.purpose)} | ${a.type} | ${esc(a.source)} | ${esc(a.licence)} | ${esc(a.replace)} |`,
);

const md = `# Asset Inventory

Generated from \`content/assets.json\` by \`npm run inventory\`. Do not edit by hand.

All \`illustrative\` images are AI-generated campaign imagery and must never be presented as real Angel's client work. To replace one with a real photo, drop the file into \`public/images/incoming/<id>.jpg\`, run \`npm run images\`, and set its \`type\` to \`portfolio\`.

| ID | File | Size | Purpose | Type | Source | Licence | Recommended replacement |
|---|---|---|---|---|---|---|---|
${rows.join("\n")}
`;

fs.writeFileSync(path.join(root, "docs/asset-inventory.md"), md);
console.log(`wrote docs/asset-inventory.md (${manifest.length} assets)`);
