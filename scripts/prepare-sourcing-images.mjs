// Download original supplier photos without touching catalog/admin data.
import fs from "node:fs";
import { itemInput } from "../lib/catalog.mjs";
const path = "data/sourcing-expansion.json";
const items = JSON.parse(fs.readFileSync(path));
for (let i = 0; i < items.length; i += 4)
  await Promise.all(
    items.slice(i, i + 4).map(async (p) => {
      const existing = fs
        .readdirSync("public/products")
        .find((n) => n.startsWith(p.id + "."));
      if (existing) p.image_url = "/products/" + existing;
      if (!p.image_url || !fs.existsSync("public" + p.image_url)) {
        let r = await fetch(p.remote_image, {
          signal: AbortSignal.timeout(30000),
        });
        const mime = r.headers.get("content-type") || "";
        if (!r.ok || !/^image\/(png|jpeg|webp)/.test(mime))
          throw Error("Invalid supplier photo: " + p.id);
        const bytes = Buffer.from(await r.arrayBuffer());
        if (bytes.length < 100 || bytes.length > 10000000)
          throw Error("Unexpected image size " + p.id);
        const ext = mime.includes("png")
          ? "png"
          : mime.includes("webp")
            ? "webp"
            : "jpg";
        p.image_url = "/products/" + p.id + "." + ext;
        fs.writeFileSync("public" + p.image_url, bytes);
      }
      itemInput(p);
    }),
  );
fs.writeFileSync(path, JSON.stringify(items, null, 2) + "\n");
console.log("Validated prices, metadata and original photos:", items.length);
