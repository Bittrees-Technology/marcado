import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowRight,
  Copy,
  Upload,
  Plus,
} from "lucide-react";
export const equipmentLink = (id, ref = "", item = "") =>
  "/equipment/" +
  id +
  (item ? "/" + item : "") +
  (ref ? "?ref=" + encodeURIComponent(ref) : "");
export function ProductImage({ item }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className="photo-missing">Image unavailable</div>
  ) : (
    <img
      src={item.image_url}
      alt={item.name}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}
export function Price({ item }) {
  return (
    <div className="item-price">
      <strong>
        {new Intl.NumberFormat("en", {
          style: "currency",
          currency: item.currency,
          currencyDisplay: "code",
        }).format(item.price)}
      </strong>
      <span>
        {item.price_kind === "asking"
          ? "Listed price"
          : "Supplier reference price"}
      </span>
    </div>
  );
}
function Source({ item }) {
  return (
    <div className="item-source">
      {item.source_url && (
        <a href={item.source_url} target="_blank" rel="noopener noreferrer">
          {item.source_name || "Supplier"} source <ArrowUpRight size={12} />
        </a>
      )}
      <span>Checked {String(item.price_checked).slice(0, 10)}</span>
      {item.supplier_status === "OutOfStock" && (
        <span>Source reported out of stock</span>
      )}
    </div>
  );
}
export function EquipmentPage({
  collections,
  items,
  loading,
  referral,
  onQuote,
  onShare,
  offers,
  renderOffer,
}) {
  const parts = location.pathname.split("/").filter(Boolean);
  const domain = collections.find((p) => p.id === parts[1]),
    selected = parts[2]
      ? items.find((p) => p.id === parts[2] && p.product_id === domain?.id)
      : null;
  if (loading)
    return (
      <section className="equipment-page">
        <p>Loading products…</p>
      </section>
    );
  if (
    parts[0] !== "equipment" ||
    !domain ||
    (parts[2] && !selected) ||
    parts.length > 3
  )
    return (
      <section className="equipment-page">
        <h1>Collection not found.</h1>
        <a className="primary" href="/">
          Browse equipment
        </a>
      </section>
    );
  const list = items.filter((i) => i.product_id === domain.id);
  return (
    <section className="equipment-page">
      <div className="breadcrumbs">
        <a
          href={"/" + (referral ? "?ref=" + encodeURIComponent(referral) : "")}
        >
          <ArrowLeft size={14} /> All equipment
        </a>
        {selected && (
          <>
            <span>/</span>
            <a href={equipmentLink(domain.id, referral)}>{domain.name}</a>
          </>
        )}
      </div>
      <div className="collection-heading">
        <div>
          <div className="eyebrow">
            {selected ? "PRODUCT DETAILS" : "EXPLORE THE COLLECTION"}
          </div>
          <h1>{selected ? selected.name : domain.name}</h1>
          <p>{selected ? selected.description : domain.description}</p>
        </div>
        <span className="pill">
          {selected ? selected.currency : list.length + " products"}
        </span>
      </div>
      {!selected && (
        <nav className="collection-nav">
          {collections.map((c) => (
            <a
              key={c.id}
              className={c.id === domain.id ? "active" : ""}
              href={equipmentLink(c.id, referral)}
            >
              {c.name}
            </a>
          ))}
        </nav>
      )}
      <p className="price-note">
        Prices are a starting point for your quote. Final availability, shipping
        and taxes are confirmed before ordering. No payment is taken here.
      </p>
      {selected ? (
        <div className="item-detail">
          <div className="real-photo">
            <ProductImage key={selected.image_url} item={selected} />
            <small>{selected.image_credit}</small>
          </div>
          <div>
            <Price item={selected} />
            <Source item={selected} />
            <h3>About this configuration</h3>
            <p>{selected.specifications}</p>
            <button
              className="primary"
              onClick={() => onQuote(domain, selected)}
            >
              Request this product <ArrowUpRight size={17} />
            </button>
            <button
              className="secondary"
              onClick={() => onShare(domain.id, selected.id)}
            >
              <Copy size={15} /> Share product
            </button>
          </div>
        </div>
      ) : (
        <div className="product-grid real-products">
          {list.map((item) => (
            <article key={item.id} className="real-product">
              <a
                className="real-photo"
                href={equipmentLink(domain.id, referral, item.id)}
              >
                <ProductImage key={item.image_url} item={item} />
                <span className="art-arrow">
                  <ArrowUpRight size={19} />
                </span>
              </a>
              <div className="product-title">
                <a href={equipmentLink(domain.id, referral, item.id)}>
                  <h3>{item.name}</h3>
                </a>
                <button
                  className="icon"
                  aria-label={"Share " + item.name}
                  onClick={() => onShare(domain.id, item.id)}
                >
                  <Copy size={15} />
                </button>
              </div>
              <p>{item.description}</p>
              <Price item={item} />
              <Source item={item} />
              <small className="image-credit">
                Photo: {item.image_credit || item.source_name}
              </small>
              <a
                className="text-link"
                href={equipmentLink(domain.id, referral, item.id)}
              >
                View product <ArrowRight size={14} />
              </a>
            </article>
          ))}
        </div>
      )}
      {!selected && !list.length && (
        <p className="empty">
          Products are being added to this collection. You can request a quote
          below.
        </p>
      )}
      {offers.some(
        (o) =>
          o.product_id === domain.id &&
          (!o.item_id || o.item_id === selected?.id),
      ) && (
        <section className="collection-offers">
          <h2>Dealer offers</h2>
          {offers
            .filter(
              (o) =>
                o.product_id === domain.id &&
                (!o.item_id || o.item_id === selected?.id),
            )
            .map(renderOffer)}
        </section>
      )}
      <section className="category-quote" id="request-a-quote">
        <div>
          <div className="eyebrow">LET’S BUILD YOUR SETUP</div>
          <h2>Request a quote.</h2>
          <p>
            {selected
              ? "Get a quote for " + selected.name + "."
              : "Tell us which " +
                domain.name.toLowerCase() +
                " you need, your quantity and delivery country."}
          </p>
        </div>
        <button className="primary" onClick={() => onQuote(domain, selected)}>
          Request a quote <ArrowUpRight size={18} />
        </button>
      </section>
    </section>
  );
}
export function ProductManager({
  items,
  collections,
  api,
  run,
  refresh,
  notify,
  busy,
}) {
  const [edit, setEdit] = useState(null),
    [image, setImage] = useState(""),
    [filter, setFilter] = useState("");
  function choose(p) {
    setEdit(p);
    setImage(p?.image_url || "");
  }
  const fresh = {
    id: "",
    product_id: collections[0]?.id || "",
    name: "",
    price: "",
    currency: "USD",
    price_kind: "asking",
    price_checked: new Date().toISOString().slice(0, 10),
    active: true,
  };
  const p = edit || fresh;
  return (
    <section className="product-manager">
      <h3>Products, pricing & photos</h3>
      <p>
        Products appear inside their equipment collection. Photos are public.
        Upload JPEG, PNG or WebP up to 1 MB, or use an HTTPS image URL.
      </p>
      <label>
        Find an existing product
        <select
          value={edit?.id || ""}
          onChange={(e) =>
            choose(items.find((i) => i.id === e.target.value) || null)
          }
        >
          <option value="">Add a new product</option>
          {items.map((i) => (
            <option key={i.id} value={i.id}>
              {i.name}
              {!i.active ? " — hidden" : ""}
            </option>
          ))}
        </select>
      </label>
      <form
        className="admin-form"
        key={edit?.id || "new-product"}
        onSubmit={(e) => {
          e.preventDefault();
          const data = Object.fromEntries(new FormData(e.target));
          run(async () => {
            await api("admin/item", {
              ...data,
              image_url: image,
              active: data.visibility === "active",
            });
            await refresh();
            notify(
              "Product saved. Pricing and images are updated on the site.",
            );
          });
        }}
      >
        <label>
          Product ID
          <input
            name="id"
            defaultValue={p.id}
            required
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            readOnly={Boolean(edit)}
            placeholder="bitaxe-gamma-601"
          />
        </label>
        <label>
          Collection
          <select name="product_id" defaultValue={p.product_id}>
            {collections.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="span2">
          Product name
          <input name="name" defaultValue={p.name} required maxLength={160} />
        </label>
        <label className="span2">
          Description
          <textarea
            name="description"
            defaultValue={p.description}
            required
            maxLength={1500}
          />
        </label>
        <label>
          Price
          <input
            name="price"
            type="number"
            min="0"
            max="99999999.99"
            step="0.01"
            defaultValue={p.price}
            required
          />
        </label>
        <label>
          Currency
          <select name="currency" defaultValue={p.currency}>
            {["USD", "EUR", "GBP", "CAD", "AUD"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Price type
          <select name="price_kind" defaultValue={p.price_kind}>
            <option value="asking">Listed price</option>
            <option value="reference">Supplier reference price</option>
          </select>
        </label>
        <label>
          Price checked
          <input
            name="price_checked"
            type="date"
            defaultValue={String(p.price_checked).slice(0, 10)}
            max={new Date().toISOString().slice(0, 10)}
            required
          />
        </label>
        <label>
          Source name
          <input
            name="source_name"
            defaultValue={p.source_name}
            maxLength={100}
          />
        </label>
        <label>
          Source product URL
          <input name="source_url" type="url" defaultValue={p.source_url} />
        </label>
        <label className="span2">
          Image URL
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            placeholder="https://… or upload below"
          />
        </label>
        <label className="span2 upload-label">
          <Upload size={18} /> Upload a replacement photo
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            disabled={busy}
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              run(async () => {
                if (file.size > 1048576)
                  throw Error("Choose an image no larger than 1 MB");
                const data = await new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.onload = () => resolve(reader.result);
                  reader.onerror = reject;
                  reader.readAsDataURL(file);
                });
                const r = await api("admin/image", { image: data });
                setImage(r.url);
                notify("Image uploaded. Save the product to apply it.");
              });
            }}
          />
        </label>
        {image && (
          <div className="admin-image-preview span2">
            <ProductImage
              key={image}
              item={{
                image_url: image,
                name: p.name || "Product image preview",
              }}
            />
          </div>
        )}
        <label className="span2">
          Image credit / owner
          <input
            name="image_credit"
            defaultValue={p.image_credit}
            maxLength={200}
          />
        </label>
        <label className="span2">
          Specifications
          <textarea
            name="specifications"
            defaultValue={p.specifications}
            maxLength={2000}
          />
        </label>
        <label>
          Visibility
          <select
            name="visibility"
            defaultValue={p.active ? "active" : "hidden"}
          >
            <option value="active">Published</option>
            <option value="hidden">Hidden</option>
          </select>
        </label>
        <div className="span2">
          <button className="primary" disabled={busy}>
            Save product <Plus size={16} />
          </button>
          {edit && (
            <button
              className="secondary"
              type="button"
              onClick={() => choose(null)}
            >
              Add another product
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
