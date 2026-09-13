const community = "https://gov.bittrees.org/api/community";
const snapshot = "https://hub.snapshot.org/graphql";
async function bounded(response) {
  if (!response.ok) throw Error("Governance unavailable");
  const reader = response.body.getReader();
  let size = 0,
    chunks = [];
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 524288) throw Error("Governance response too large");
      chunks.push(value);
    }
  } finally {
    await reader.cancel().catch(() => {});
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}
export function governanceRole(wallet, registry, space) {
  if (
    !/^0x[a-f0-9]{40}$/.test(wallet) ||
    !registry ||
    typeof registry !== "object" ||
    Array.isArray(registry) ||
    space?.id !== "gov.bittrees.eth" ||
    !Array.isArray(space.admins) ||
    space.admins.some((a) => !/^0x[a-fA-F0-9]{40}$/.test(a))
  )
    throw Error("Invalid governance data");
  const roles = Object.hasOwn(registry, wallet) ? registry[wallet] : [];
  if (
    !Array.isArray(roles) ||
    roles.length > 100 ||
    roles.some((r) => !r || typeof r.label !== "string" || r.label.length > 64)
  )
    throw Error("Invalid roles");
  const labels = roles.map((r) => r.label.trim().toLowerCase());
  if (labels.includes("partner")) return "owner";
  if (
    labels.includes("admin") ||
    space.admins.some((a) => a.toLowerCase() === wallet)
  )
    return "admin";
  return null;
}
export async function resolveGovernance(wallet, { fetcher = fetch } = {}) {
  if (!wallet) return { role: null, status: "not_linked" };
  try {
    const signal = AbortSignal.timeout(2500);
    const [registry, result] = await Promise.all([
      fetcher(community, { cache: "no-store", signal }).then(bounded),
      fetcher(snapshot, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        signal,
        body: JSON.stringify({
          query: 'query { space(id: "gov.bittrees.eth") { id admins } }',
        }),
      }).then(bounded),
    ]);
    if (result.errors || !registry.roles)
      throw Error("Invalid governance source");
    return {
      role: governanceRole(wallet, registry.roles, result.data?.space),
      status: "current",
    };
  } catch {
    return { role: null, status: "unavailable" };
  }
}
