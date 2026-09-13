import { createServer } from "vite";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import assert from "node:assert/strict";
import { permissions } from "../lib/permissions.mjs";
const server = await createServer({
  server: { middlewareMode: true },
  optimizeDeps: { noDiscovery: true, include: [] },
  appType: "custom",
});
try {
  const { AdminPages } = await server.ssrLoadModule("/src/AdminPages.jsx");
  const admin = { items: [], offers: [], quotes: [], roles: [], vendors: [] };
  const base = {
    admin,
    products: [{ id: "bitaxe", name: "Bitaxe" }],
    user: {
      identity: "fixture@example.com",
      staff: true,
      owner: true,
      role: "owner",
      ...permissions("owner"),
    },
  };
  for (const [page, text] of [
    ["products", "Import products from CSV"],
    ["offers", "Add dealer offer"],
    ["quotes", "Quote requests"],
    ["vendors", "Vendor integrations"],
    ["team", "Team access"],
    ["notifications", "Referral email notifications"],
  ]) {
    globalThis.location = { pathname: "/admin/" + page };
    const h = renderToStaticMarkup(React.createElement(AdminPages, base));
    assert.ok(h.includes(text));
    if (page !== "products") assert.ok(!h.includes("Import products from CSV"));
  }
  globalThis.location = { pathname: "/admin/products" };
  const denied = renderToStaticMarkup(
    React.createElement(AdminPages, {
      ...base,
      user: {
        identity: "fixture@example.com",
        staff: true,
        role: "vendor",
        ...permissions("vendor"),
      },
    }),
  );
  assert.ok(denied.includes("does not have access"));
  assert.ok(!denied.includes("Import products from CSV"));
  console.log(
    "PASS: dedicated admin pages and restricted vendor navigation render correctly.",
  );
} finally {
  await server.close();
}
