import React from "react";
import { ProductManager } from "./Equipment.jsx";
import { Vendors } from "./Vendors.jsx";
import { Plus, ExternalLink } from "lucide-react";
export function AdminPages({
  error,
  notice,
  user,
  admin,
  products,
  api,
  run,
  setAdmin,
  setNotice,
  refresh,
  busy,
  editOffer,
  setEditOffer,
  open,
}) {
  const items = admin?.items || [];
  const page = location.pathname.split("/")[2] || "overview";
  const pages = [
    ["overview", "Overview", true],
    ["products", "Products", user?.canProducts],
    ["offers", "Dealer offers", user?.canDeals],
    ["quotes", "Quotes", user?.canQuotes],
    ["vendors", "Vendors", user?.canVendors || user?.vendor],
    ["team", "Team access", user?.owner],
  ];
  if (!user)
    return (
      <section className="equipment-page">
        <h1>Store administration</h1>
        <button onClick={() => open("login")}>Sign in</button>
      </section>
    );
  if (!user.staff)
    return (
      <section className="equipment-page">
        <h1>Staff access required</h1>
      </section>
    );
  const allowed = pages.some(([id, , ok]) => id === page && ok);
  return (
    <section className="equipment-page admin-page">
      <h1>Store administration</h1>
      {error && <p role="alert">{error}</p>}
      {notice && <p role="status">{notice}</p>}
      <nav aria-label="Administration pages">
        {pages
          .filter((p) => p[2])
          .map(([id, label]) => (
            <a
              className="secondary"
              key={id}
              aria-current={page === id ? "page" : undefined}
              href={"/admin/" + id}
            >
              {label}
            </a>
          ))}
      </nav>
      {!allowed ? (
        <p role="alert">Your role does not have access to this page.</p>
      ) : !admin ? (
        <p>Loading administration…</p>
      ) : (
        <>
          {page === "overview" && (
            <>
              <h2>Your workspace</h2>
              <p>
                Role: {user.role.replaceAll("_", " ")}. Choose a page above to
                manage the tools assigned to you.
              </p>
              <p>
                Products includes pricing, images and CSV imports. Dealer offers
                manages private terms and recipients. Quotes contains customer
                requests. Vendors manages supplier onboarding. Owners delegate
                local roles through Team access.
              </p>
            </>
          )}
          <>
            <>
              {page === "products" && user.canProducts && (
                <>
                  {" "}
                  <ProductManager
                    items={admin.items || []}
                    collections={products}
                    api={api}
                    run={run}
                    refresh={async () => {
                      setAdmin(await api("admin"));
                      await refresh();
                    }}
                    notify={setNotice}
                    busy={busy}
                  />
                </>
              )}
              {page === "vendors" && (user.canVendors || user.vendor) && (
                <Vendors
                  {...{ user, admin, api, run, setAdmin, setNotice, busy }}
                />
              )}
              {page === "team" && user.owner && (
                <section className="roles">
                  <h3>Team access</h3>
                  <p>
                    Owner and administrator access follows Bittrees governance.
                    Assign a focused local role below. Removing a role takes
                    effect on the next request; governance access remains
                    managed in governance.
                  </p>
                  <form
                    className="inline-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const f = Object.fromEntries(new FormData(e.target));
                      run(async () => {
                        await api("admin/role", f);
                        e.target.reset();
                        setAdmin(await api("admin"));
                        setNotice("Role updated. No invitation was sent.");
                      });
                    }}
                  >
                    <input
                      name="identity"
                      placeholder="Email or 0x wallet address"
                      aria-label="Team member identity"
                      required
                    />
                    <select name="role" aria-label="Team member role">
                      <option value="support">Support</option>
                      <option value="dealer_manager">
                        Dealer manager — products and offers
                      </option>
                      <option value="catalog_manager">
                        Catalog manager — products only
                      </option>
                      <option value="offer_manager">
                        Offer manager — offers only
                      </option>
                      <option value="vendor_manager">
                        Vendor manager — integrations only
                      </option>
                      <option value="vendor">
                        Vendor — own integration only
                      </option>
                    </select>
                    <button className="secondary">Assign role</button>
                  </form>
                  {admin.roles.map((r) => (
                    <div className="grant" key={r.identity}>
                      <span>
                        {r.identity} · {r.role}
                      </span>
                      <button
                        onClick={() =>
                          run(async () => {
                            await api("admin/role", {
                              identity: r.identity,
                              role: "customer",
                            });
                            setAdmin(await api("admin"));
                          })
                        }
                      >
                        Remove role
                      </button>
                    </div>
                  ))}
                </section>
              )}
              {page === "offers" && user.canDeals && (
                <>
                  <h3>
                    {editOffer ? "Edit dealer offer" : "Add dealer offer"}
                  </h3>
                  <form
                    key={editOffer?.id || "new"}
                    className="admin-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const f = Object.fromEntries(new FormData(e.target));
                      run(async () => {
                        await api("admin/offer", {
                          ...f,
                          id: editOffer?.id,
                          private: f.visibility === "private",
                        });
                        e.target.reset();
                        setAdmin(await api("admin"));
                        await refresh();
                        setEditOffer(null);
                        setNotice("Dealer offer saved.");
                      });
                    }}
                  >
                    <label>
                      Collection
                      <select
                        name="product"
                        defaultValue={editOffer?.product_id}
                      >
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Specific product (optional)
                      <select
                        name="item_id"
                        defaultValue={editOffer?.item_id || ""}
                      >
                        <option value="">Entire collection</option>
                        {items.map((i) => (
                          <option key={i.id} value={i.id}>
                            {i.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Dealer name
                      <input
                        name="dealer"
                        defaultValue={editOffer?.dealer}
                        required
                        maxLength={100}
                      />
                    </label>
                    <label className="span2">
                      Dealer checkout / referral URL
                      <input
                        name="url"
                        defaultValue={editOffer?.url}
                        type="url"
                        placeholder="https://dealer.example/product?ref=…"
                        required
                      />
                    </label>
                    <label>
                      Price (optional)
                      <input
                        name="price"
                        defaultValue={editOffer?.price ?? ""}
                        type="number"
                        min="0"
                        step="0.01"
                      />
                    </label>
                    <label>
                      Currency
                      <select
                        name="currency"
                        defaultValue={editOffer?.currency || "USD"}
                      >
                        {["USD", "EUR", "GBP", "CAD", "AUD"].map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Visibility
                      <select
                        name="visibility"
                        defaultValue={
                          editOffer?.private === false ? "public" : "private"
                        }
                      >
                        <option value="private">
                          Private — invited accounts only
                        </option>
                        <option value="public">Public — everyone</option>
                      </select>
                    </label>
                    <label>
                      Expiry (optional)
                      <input
                        name="expires"
                        type="datetime-local"
                        defaultValue={
                          editOffer?.expires_at
                            ? new Date(
                                new Date(editOffer.expires_at).getTime() -
                                  new Date().getTimezoneOffset() * 60000,
                              )
                                .toISOString()
                                .slice(0, 16)
                            : ""
                        }
                      />
                    </label>
                    <label className="span2">
                      Internal deal terms / notes
                      <textarea
                        name="notes"
                        defaultValue={editOffer?.notes}
                        maxLength={3000}
                        placeholder="Commission, dealer contact and negotiated terms. Administrator only."
                      />
                    </label>
                    <button disabled={busy} className="primary">
                      Save offer <Plus size={18} />
                    </button>
                    {editOffer && (
                      <button
                        type="button"
                        className="secondary"
                        onClick={() => setEditOffer(null)}
                      >
                        Cancel edit
                      </button>
                    )}
                  </form>
                  <h3>Dealer offers</h3>
                  {admin.offers.length === 0 && (
                    <p>No dealer offers entered yet.</p>
                  )}
                  {admin.offers.map((o) => (
                    <div className="record" key={o.id}>
                      <strong>{o.dealer}</strong>
                      <span className="pill">
                        {o.private ? "Private" : "Public"} ·{" "}
                        {o.active ? "Active" : "Inactive"}
                      </span>
                      <p>
                        {o.product_id} ·{" "}
                        {o.price
                          ? `${o.currency} ${o.price}`
                          : "Price on request"}
                      </p>
                      <a href={o.url} target="_blank" rel="noreferrer">
                        Review dealer link <ExternalLink size={13} />
                      </a>
                      <p>{o.notes}</p>
                      <button
                        className="secondary"
                        onClick={() => {
                          setEditOffer(o);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Edit offer
                      </button>
                      <button
                        className="secondary"
                        onClick={() =>
                          run(async () => {
                            await api("admin/offer-state", {
                              id: o.id,
                              active: !o.active,
                            });
                            setAdmin(await api("admin"));
                            await refresh();
                          })
                        }
                      >
                        {o.active ? "Deactivate" : "Activate"}
                      </button>
                      {o.private && (
                        <>
                          <h4>Private access</h4>
                          {o.recipients.map((i) => (
                            <div className="grant" key={i}>
                              <span>{i}</span>
                              <button
                                onClick={() =>
                                  run(async () => {
                                    await api("admin/grant", {
                                      id: o.id,
                                      identity: i,
                                      remove: true,
                                    });
                                    setAdmin(await api("admin"));
                                    await refresh();
                                  })
                                }
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                          <form
                            className="inline-form"
                            onSubmit={(e) => {
                              e.preventDefault();
                              const identity = new FormData(e.target).get(
                                "identity",
                              );
                              run(async () => {
                                await api("admin/grant", {
                                  id: o.id,
                                  identity,
                                  remove: false,
                                });
                                e.target.reset();
                                setAdmin(await api("admin"));
                                setNotice(
                                  "Access granted. No invitation email was sent.",
                                );
                              });
                            }}
                          >
                            <input
                              name="identity"
                              aria-label="Recipient email or wallet"
                              placeholder="Recipient email or 0x wallet"
                              required
                            />
                            <button className="secondary">Grant access</button>
                          </form>
                        </>
                      )}
                    </div>
                  ))}
                </>
              )}
              {page === "quotes" && user.canQuotes && (
                <>
                  <h3>Quote requests</h3>
                  {admin.quotes.length === 0 && <p>No quote requests yet.</p>}
                  {admin.quotes.map((q) => (
                    <div className="record" key={q.id}>
                      <strong>
                        {q.item_name || q.name} × {q.quantity}
                      </strong>
                      <p className="identity">{q.identity}</p>
                      <p>{q.details}</p>
                      <small>
                        Referral: {q.referral || "Direct"} ·{" "}
                        {new Date(q.created_at).toLocaleString()}
                      </small>
                      <label>
                        Status
                        <select
                          value={q.status}
                          onChange={(e) =>
                            run(async () => {
                              await api("admin/quote", {
                                id: q.id,
                                status: e.target.value,
                              });
                              setAdmin(await api("admin"));
                            })
                          }
                        >
                          {["new", "reviewing", "quoted", "closed"].map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </label>
                    </div>
                  ))}
                </>
              )}
            </>
          </>
        </>
      )}
    </section>
  );
}
