export const localRoles = [
  "dealer_manager",
  "catalog_manager",
  "offer_manager",
  "support",
  "vendor_manager",
  "vendor",
];
export function permissions(role) {
  const admin = ["owner", "admin"].includes(role);
  return {
    canProducts: admin || ["dealer_manager", "catalog_manager"].includes(role),
    canDeals: admin || ["dealer_manager", "offer_manager"].includes(role),
    canQuotes: admin || role === "support",
    canVendors: admin || role === "vendor_manager",
    vendor: role === "vendor",
  };
}
