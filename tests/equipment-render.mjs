import { createServer } from "vite";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
const server = await createServer({
  server: { middlewareMode: true },
  optimizeDeps: { noDiscovery: true, include: [] },
  appType: "custom",
});
try {
  const { EquipmentPage, ProductManager } =
    await server.ssrLoadModule("/src/Equipment.jsx");
  const items = JSON.parse(await readFile("data/catalog-seed.json", "utf8"));
  const collections = [...new Set(items.map((i) => i.product_id))].map(
    (id) => ({ id, name: id, description: "Collection" }),
  );
  for (const c of collections) {
    globalThis.location = { pathname: "/equipment/" + c.id };
    const html = renderToStaticMarkup(
      React.createElement(EquipmentPage, {
        collections,
        items,
        loading: false,
        referral: "abc123",
        onQuote() {},
        onShare() {},
        offers: [],
      }),
    );
    assert.equal(
      (html.match(/class="real-product"/g) || []).length,
      items.filter((p) => p.product_id === c.id).length,
    );
    assert.ok(html.includes('id="request-a-quote"'));
    assert.ok(
      html.lastIndexOf('id="request-a-quote"') >
        html.lastIndexOf('class="real-product"'),
    );
    for (const i of items.filter((p) => p.product_id === c.id)) {
      assert.ok(html.includes(i.image_url));
      assert.ok(
        html.includes("/equipment/" + c.id + "/" + i.id + "?ref=abc123"),
      );
    }
  }
  for (const item of items) {
    globalThis.location = {
      pathname: "/equipment/" + item.product_id + "/" + item.id,
    };
    const html = renderToStaticMarkup(
      React.createElement(EquipmentPage, {
        collections,
        items,
        loading: false,
        offers: [],
      }),
    );
    assert.ok(html.includes(item.image_url));
    assert.ok(html.includes("Request this product"));
    assert.ok(html.includes(item.currency));
  }
  const admin = renderToStaticMarkup(
    React.createElement(ProductManager, { items, collections }),
  );
  assert.ok(admin.includes("Upload a replacement photo"));
  assert.ok(admin.includes('name="price"'));
  console.log(
    "PASS: six collection pages, 13 product pages, referral URLs, product photos/prices and bottom quote requests render correctly.",
  );
} finally {
  await server.close();
}
