// Download primary supplier photos, verify formats, and reuse byte-identical catalog assets.
import fs from "node:fs";
import { createHash } from "node:crypto";
import { itemInput } from "../lib/catalog.mjs";
const path = process.argv[2];
if (!path) throw Error("Pass a reviewed catalog JSON path");
const items = JSON.parse(fs.readFileSync(path));
const hashes = new Map();
for (const name of fs.readdirSync("public/products")) {
  const b = fs.readFileSync("public/products/" + name);
  hashes.set(createHash("sha256").update(b).digest("hex"), "/products/" + name);
}
const failures = [];
for (let i = 0; i < items.length; i += 4) {
  await Promise.all(
    items.slice(i, i + 4).map(async (p) => {
      try {
        if (!p.image_url || !fs.existsSync("public" + p.image_url)) {
          let found = false;
          for (const url of p.remote_images || [p.remote_image]) {
            if (!url) continue;
            try {
              const r = await fetch(url, {
                signal: AbortSignal.timeout(30000),
              });
              const mime = r.headers.get("content-type") || "";
              if (!r.ok || !/^image\/(png|jpeg|webp)/.test(mime)) continue;
              const b = Buffer.from(await r.arrayBuffer());
              if (b.length < 100 || b.length > 15000000) continue;
              if (!(
                (b[0] === 255 && b[1] === 216) ||
                b.toString("ascii", 1, 4) === "PNG" ||
                b.toString("ascii", 8, 12) === "WEBP"
              ))
                continue;
              const digest = createHash("sha256").update(b).digest("hex");
              const ext = mime.includes("png")
                ? "png"
                : mime.includes("webp")
                  ? "webp"
                  : "jpg";
              p.image_url =
                hashes.get(digest) || "/products/" + p.id + "." + ext;
              if (!hashes.has(digest)) {
                fs.writeFileSync("public" + p.image_url, b);
                hashes.set(digest, p.image_url);
              }
              p.remote_image = url;
              p.image_sha256 = digest;
              found = true;
              break;
            } catch {}
          }
          if (!found) throw Error("No verified supplier photo");
        }
        itemInput(p);
        const photo = fs.readFileSync("public" + p.image_url);
        const validSignature =
          photo
            .subarray(0, 8)
            .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) ||
          (photo[0] === 255 && photo[1] === 216 && photo[2] === 255) ||
          (photo.toString("ascii", 0, 4) === "RIFF" &&
            photo.toString("ascii", 8, 12) === "WEBP");
        if (!validSignature) throw Error("Invalid stored photo signature");
        const digest = createHash("sha256").update(photo).digest("hex");
        if (p.image_sha256 && p.image_sha256 !== digest)
          throw Error("Stored photo hash mismatch");
        p.image_sha256 = digest;
      } catch (e) {
        failures.push({ id: p.id, error: e.message });
      }
    }),
  );
  fs.writeFileSync(path, JSON.stringify(items, null, 2) + "\n");
  console.log("Photo review", Math.min(i + 4, items.length), "/", items.length);
}
if (failures.length) {
  console.log(failures);
  process.exitCode = 1;
} else
  console.log(
    "Validated catalog records and source photo signatures:",
    items.length,
  );
