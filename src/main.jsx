import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  User,
  Plus,
  Minus,
  X,
  Copy,
  Check,
  ShieldCheck,
  Wallet,
  Cpu,
  Server,
  Zap,
  SlidersHorizontal,
  LogOut,
  Lock,
  ExternalLink,
  Package,
  Mail,
} from "lucide-react";
import { createSiweMessage } from "viem/siwe";
import "./style.css";
async function api(path, body) {
  const r = await fetch(
    "/api/" + path,
    body
      ? {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      : {},
  );
  const d = await r.json();
  if (!r.ok) throw Error(d.error || "Please try again");
  return d;
}
const categories = [
  "All equipment",
  "Mining",
  "AI & compute",
  "Servers",
  "Accessories",
];
const icons = {
  Mining: Cpu,
  "AI & compute": Zap,
  Servers: Server,
  Accessories: Package,
};
function Hardware({ kind = "bitaxe", large = false }) {
  return (
    <div
      aria-hidden="true"
      className={"hardware " + kind + (large ? " large" : "")}
    >
      <div className="board">
        {kind === "bitaxe" || kind === "asic" ? (
          <>
            <div className="pins" />
            <div className="fan">
              <i />
              <i />
              <i />
              <i />
              <i />
              <span />
            </div>
            <div className="screen">
              <b>₿</b>
              <small>BITAXE</small>
            </div>
            <div className="chips">
              <i />
              <i />
              <i />
            </div>
          </>
        ) : kind === "servers" ? (
          <>
            {[1, 2, 3].map((i) => (
              <div className="rack" key={i}>
                <b />
                <b />
                <span />
                <i />
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="chip">
              <Cpu size={large ? 100 : 65} strokeWidth={1} />
            </div>
            <div className="pins" />
          </>
        )}
      </div>
    </div>
  );
}
function App() {
  const [products, setProducts] = useState([]),
    [offers, setOffers] = useState([]),
    [user, setUser] = useState(null),
    [quotes, setQuotes] = useState([]),
    [category, setCategory] = useState("All equipment"),
    [search, setSearch] = useState(""),
    [modal, setModal] = useState(null),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [loading, setLoading] = useState(true),
    [admin, setAdmin] = useState(null),
    [editOffer, setEditOffer] = useState(null),
    [busy, setBusy] = useState(false),
    [email, setEmail] = useState(""),
    [challenge, setChallenge] = useState("");
  const initial = new URL(location.href);
  const [referral] = useState(initial.searchParams.get("ref") || "");
  const [selected, setSelected] = useState(
    initial.searchParams.get("product") || "",
  );
  async function refresh() {
    const c = await api("catalog");
    setProducts(c.products);
    setOffers(c.offers);
    try {
      const m = await api("me");
      setUser(m.user);
      setQuotes(m.quotes);
    } catch {
      setUser(null);
    }
    setLoading(false);
  }
  useEffect(() => {
    if (!modal) return;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function key(e) {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        const nodes = [
          ...document.querySelectorAll(
            ".modal button,.modal a,.modal input,.modal textarea,.modal select",
          ),
        ].filter((n) => !n.disabled && n.offsetParent !== null);
        const first = nodes[0],
          last = nodes.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, [modal]);
  useEffect(() => {
    refresh().catch((e) => {
      setError(e.message);
      setLoading(false);
    });
  }, []);
  async function run(fn) {
    setError("");
    setBusy(true);
    try {
      await fn();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  async function openAdmin() {
    await run(async () => {
      setAdmin(await api("admin"));
      setModal("admin");
    });
  }
  function close() {
    setModal(null);
    setError("");
    setNotice("");
  }
  function open(value) {
    setModal(value);
    setError("");
    setNotice("");
  }
  async function share(product = "") {
    await run(async () => {
      if (!user) {
        open("login");
        setNotice("Sign in to create your referral links.");
        return;
      }
      const url = new URL("https://marcada.bittrees.org");
      url.searchParams.set("ref", user.referral);
      if (product) url.searchParams.set("product", product);
      await navigator.clipboard.writeText(url.href);
      setNotice("Referral link copied.");
    });
  }
  async function wallet() {
    await run(async () => {
      if (!window.ethereum)
        throw Error(
          "Open this site in your Ethereum wallet browser, or install a browser wallet.",
        );
      const [address] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const n = await api("auth/nonce", {});
      const message = createSiweMessage({
        address,
        chainId: 1,
        domain: n.domain,
        uri: n.uri,
        version: "1",
        nonce: n.nonce,
        statement: "Sign in to Marcada by Bittrees.",
        issuedAt: new Date(),
      });
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [
          "0x" +
            Array.from(new TextEncoder().encode(message), (b) =>
              b.toString(16).padStart(2, "0"),
            ).join(""),
          address,
        ],
      });
      await api("auth/wallet", { message, signature });
      await refresh();
      close();
    });
  }
  const featured = products.find((p) => p.id === "bitaxe");
  const shown = products.filter(
    (p) =>
      (category === "All equipment" || p.category === category) &&
      (p.name + " " + p.description)
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <>
      <div className="topline">
        <span>A BITTREES TECHNOLOGY MARKETPLACE</span>
        <a href="#catalog">
          Start small. Build something bigger. <ArrowUpRight size={13} />
        </a>
      </div>
      <header>
        <a className="brand" href="/" aria-label="Marcada home">
          <span className="brandmark">m</span>marcada
          <span className="branddot">®</span>
        </a>
        <nav>
          <a href="#catalog">Equipment</a>
          <button onClick={() => open("referrals")}>Referrals</button>
          <button onClick={() => open("deals")}>
            Private deals <Lock size={12} />
          </button>
        </nav>
        <button
          className="account"
          onClick={() => open(user ? "account" : "login")}
        >
          <User size={17} />
          <span>{user ? "My account" : "Sign in"}</span>
        </button>
      </header>
      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <i /> HARDWARE FOR THE INDEPENDENT
            </div>
            <h1>
              Your next
              <br />
              big thing.
              <br />
              <em>Starts here.</em>
            </h1>
            <p>
              From your first Bitaxe to your next compute stack. Find the
              equipment to mine, build and run it yourself.
            </p>
            <a className="primary" href="#catalog">
              Explore equipment <ArrowUpRight size={18} />
            </a>
            <div className="hero-caption">
              <span>01 / MINING & COMPUTE</span>
              <span>BY BITTREES ↗</span>
            </div>
          </div>
          <div className="hero-art">
            <div className="art-top">
              <span>
                SMALL MACHINE.
                <br />
                BIG POSSIBILITIES.
              </span>
              <span className="pill">BITAXE COLLECTION</span>
            </div>
            <Hardware large />
            <div className="art-bottom">
              <div>
                <span className="tiny">OPEN-SOURCE MINING</span>
                <h2>Meet Bitaxe.</h2>
                <p>Your own piece of the Bitcoin network.</p>
              </div>
              <button
                className="circle"
                aria-label="Explore Bitaxe"
                onClick={() => {
                  setSelected("bitaxe");
                  document
                    .querySelector("#catalog")
                    .scrollIntoView({ behavior: "smooth" });
                }}
              >
                <ArrowUpRight />
              </button>
            </div>
            <span className="illustration-note">
              Hardware illustration · model varies by offer
            </span>
          </div>
        </section>
        <div className="value-strip">
          <span>
            <Cpu size={17} /> Mining to AI compute
          </span>
          <span>
            <ShieldCheck size={17} /> Dealer offers, clearly disclosed
          </span>
          <span>
            <Lock size={17} /> Private deals by invitation
          </span>
          <button onClick={() => open("referrals")}>
            <ArrowUpRight size={17} /> Share what you find
          </button>
        </div>
        <section id="catalog" className="catalog">
          <div className="section-top">
            <div>
              <div className="eyebrow">THE EQUIPMENT EDIT</div>
              <h2>Build your setup.</h2>
            </div>
            <label className="search">
              <Search size={18} />
              <input
                aria-label="Search equipment"
                placeholder="Find your next upgrade"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>
          <div className="category-row">
            <div className="categories">
              {categories.map((c) => (
                <button
                  key={c}
                  className={category === c ? "active" : ""}
                  onClick={() => {
                    setCategory(c);
                    setSelected("");
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
            <span className="count">{shown.length} collections</span>
          </div>
          {error && !modal && (
            <p role="alert" className="error">
              {error} <button onClick={() => run(refresh)}>Retry</button>
            </p>
          )}
          {notice && !modal && (
            <p role="status" className="notice">
              {notice}
            </p>
          )}
          {loading ? (
            <p>Loading equipment…</p>
          ) : shown.length === 0 ? (
            <div className="empty">
              No matching equipment. Try another search.
            </div>
          ) : (
            <div className="product-grid">
              {shown.map((p, i) => {
                const Icon = icons[p.category];
                const matching = offers.filter((o) => o.product_id === p.id);
                return (
                  <article
                    key={p.id}
                    className={
                      "product " + (selected === p.id ? "selected" : "")
                    }
                  >
                    <button
                      className={"product-art tint-" + i}
                      onClick={() => {
                        setSelected(p.id);
                        open({ type: "product", product: p });
                      }}
                      aria-label={"View " + p.name}
                    >
                      <span className="product-tag">
                        {p.id === "bitaxe"
                          ? "START HERE"
                          : p.category.toUpperCase()}
                      </span>
                      <Hardware kind={p.id} />
                      <span className="art-arrow">
                        <ArrowUpRight size={20} />
                      </span>
                    </button>
                    <div className="product-info">
                      <div className="product-title">
                        <h3>{p.name}</h3>
                        <button
                          className="icon"
                          title="Copy product referral link"
                          aria-label={"Share " + p.name}
                          onClick={() => share(p.id)}
                        >
                          <Copy size={16} />
                        </button>
                      </div>
                      <p>{p.description}</p>
                      <div className="product-bottom">
                        <span>
                          {matching.length
                            ? `${matching.length} dealer offer${matching.length > 1 ? "s" : ""}`
                            : "Price on request"}
                        </span>
                        <button
                          onClick={() => open({ type: "product", product: p })}
                        >
                          {matching.length ? "View offers" : "Explore"}{" "}
                          <ArrowRight size={15} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
        <section className="referral-banner">
          <div className="referral-art">↗</div>
          <div>
            <div className="eyebrow">GOOD FINDS TRAVEL</div>
            <h2>
              Found your next upgrade?
              <br />
              Pass it on.
            </h2>
            <p>
              Share a product or the whole store with your own referral link.
            </p>
          </div>
          <button className="primary light" onClick={() => open("referrals")}>
            Create your link <ArrowUpRight size={18} />
          </button>
        </section>
        <section className="sourcing">
          <div>
            <span className="eyebrow">SOMETHING SPECIFIC IN MIND?</span>
            <h2>Let’s find your hardware.</h2>
          </div>
          <p>
            A particular miner, a GPU workstation or a rack of servers. Tell us
            what you need and we’ll review your request.
          </p>
          <button
            className="text-link"
            onClick={() => {
              if (!user) {
                open("login");
                setNotice("Sign in to request and track an equipment quote.");
              } else open({ type: "quote", product: featured || products[0] });
            }}
          >
            Request a quote <ArrowUpRight size={19} />
          </button>
        </section>
      </main>
      <footer>
        <a className="brand" href="/">
          marcada<span className="branddot">®</span>
        </a>
        <span>Equipment for what comes next.</span>
        <div>
          <a href="https://bittrees.org">Bittrees ↗</a>
          <button onClick={() => open("privacy")}>Privacy & terms</button>
          {user?.staff && <button onClick={openAdmin}>Manage store</button>}
        </div>
        <small>
          © {new Date().getFullYear()} Bittrees Technology. Dealer links may
          earn us a commission.
        </small>
      </footer>
      {modal && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <section
            className={"modal " + (modal === "admin" ? "wide" : "")}
            role="dialog"
            aria-modal="true"
            aria-label="Marcada account and equipment"
            onKeyDown={(e) => {
              if (e.key === "Escape") close();
            }}
          >
            <button
              autoFocus
              className="close icon"
              onClick={close}
              aria-label="Close"
            >
              <X />
            </button>
            {error && (
              <p role="alert" className="error">
                {error}
              </p>
            )}
            {notice && (
              <p role="status" className="notice">
                {notice}
              </p>
            )}
            {modal === "login" && (
              <>
                <div className="eyebrow">WELCOME TO MARCADA</div>
                <h2>Your next build starts here.</h2>
                <p>
                  Sign in to request quotes, create referral links and access
                  deals shared with you.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    run(async () => {
                      if (challenge) {
                        await api("auth/verify-email", {
                          challenge,
                          code: new FormData(e.target).get("code"),
                        });
                        await refresh();
                        close();
                      } else {
                        const r = await api("auth/email", { email });
                        setChallenge(r.challenge);
                        setNotice(r.message);
                      }
                    });
                  }}
                >
                  <label>
                    Email address
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setChallenge("");
                      }}
                      autoComplete="email"
                    />
                  </label>
                  {challenge && (
                    <label>
                      8-digit verification code
                      <input
                        name="code"
                        pattern="[0-9]{8}"
                        maxLength={8}
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        required
                      />
                    </label>
                  )}
                  <button disabled={busy} className="primary">
                    {busy
                      ? "Please wait…"
                      : challenge
                        ? "Verify & sign in"
                        : "Email me a code"}{" "}
                    <Mail size={17} />
                  </button>
                </form>
                <div className="divider">or use your wallet</div>
                <button
                  className="secondary full"
                  disabled={busy}
                  onClick={wallet}
                >
                  <Wallet size={18} /> Sign in with Ethereum
                </button>
                <small>
                  Signing a message does not send a transaction or grant
                  spending permission.
                </small>
              </>
            )}
            {modal === "account" && (
              <>
                <h2>Your account</h2>
                <p className="identity">{user?.identity}</p>
                <button className="secondary" onClick={() => open("referrals")}>
                  Your referral links <ArrowUpRight size={16} />
                </button>
                {user?.staff && (
                  <button className="primary" onClick={openAdmin}>
                    Manage store
                  </button>
                )}
                <h3>Quote requests</h3>
                {quotes.length ? (
                  quotes.map((q) => (
                    <div className="record" key={q.id}>
                      <strong>
                        {q.name} × {q.quantity}
                      </strong>
                      <span className="pill">{q.status}</span>
                      <p>{q.details}</p>
                      <small>
                        {new Date(q.created_at).toLocaleDateString()}
                      </small>
                    </div>
                  ))
                ) : (
                  <p>No quote requests yet.</p>
                )}
                <button
                  className="text-link"
                  onClick={() =>
                    run(async () => {
                      await api("auth/logout", {});
                      setUser(null);
                      await refresh();
                      close();
                    })
                  }
                >
                  <LogOut size={16} /> Sign out
                </button>
              </>
            )}
            {modal === "referrals" && (
              <>
                <div className="eyebrow">PASS IT ON</div>
                <h2>Your finds. Your link.</h2>
                <p>
                  Share Marcada or a specific collection. Quote requests
                  submitted from your link are attributed to your referral code.
                </p>
                {user ? (
                  <>
                    <label>
                      Your store referral link
                      <input
                        readOnly
                        value={
                          "https://marcada.bittrees.org/?ref=" + user.referral
                        }
                      />
                    </label>
                    <button className="primary" onClick={() => share()}>
                      Copy store link <Copy size={16} />
                    </button>
                    <label>
                      Product collection
                      <select id="ref-product">
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button
                      className="secondary"
                      onClick={() =>
                        share(document.querySelector("#ref-product").value)
                      }
                    >
                      Copy product link <Copy size={16} />
                    </button>
                  </>
                ) : (
                  <button className="primary" onClick={() => open("login")}>
                    Sign in to create a link <ArrowRight size={18} />
                  </button>
                )}
                <small>
                  Referral links track quote attribution. Commission
                  eligibility, sale confirmation and payouts depend on a
                  separate dealer agreement; sharing alone does not guarantee
                  earnings.
                </small>
              </>
            )}
            {modal === "deals" && (
              <>
                <div className="eyebrow">BY INVITATION</div>
                <h2>Your private offers.</h2>
                <p>
                  Sign in with the email or wallet your dealer offer was shared
                  with.
                </p>
                {!user ? (
                  <button className="primary" onClick={() => open("login")}>
                    Sign in <ArrowRight size={18} />
                  </button>
                ) : offers.filter((o) => o.private).length ? (
                  offers
                    .filter((o) => o.private)
                    .map((o) => <Offer key={o.id} offer={o} />)
                ) : (
                  <div className="empty">
                    <Lock size={26} />
                    <p>
                      No private offers have been shared with this account yet.
                    </p>
                  </div>
                )}
              </>
            )}
            {modal.type === "product" && (
              <>
                <div className="eyebrow">{modal.product.category}</div>
                <h2>{modal.product.name}</h2>
                <p>{modal.product.description}</p>
                {offers
                  .filter((o) => o.product_id === modal.product.id)
                  .map((o) => (
                    <Offer key={o.id} offer={o} />
                  ))}
                {!offers.some((o) => o.product_id === modal.product.id) && (
                  <div className="empty">
                    We’re sourcing this collection. Request a quote for current
                    pricing and availability.
                  </div>
                )}
                <button
                  className="primary"
                  onClick={() => {
                    if (!user) {
                      open("login");
                      setNotice(
                        "Sign in, then open this collection to request your quote.",
                      );
                    } else open({ type: "quote", product: modal.product });
                  }}
                >
                  Request a quote <ArrowUpRight size={18} />
                </button>
                <button
                  className="secondary"
                  onClick={() => share(modal.product.id)}
                >
                  Share collection <Copy size={16} />
                </button>
                {modal.product.category === "Mining" && (
                  <small>
                    Mining results vary. Hardware specifications, electricity
                    costs and network conditions affect outcomes. No mining
                    income is guaranteed.
                  </small>
                )}
              </>
            )}
            {modal.type === "quote" && (
              <>
                <h2>Tell us what you need.</h2>
                <p>
                  Your request will be available in your account. No payment is
                  taken.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const f = Object.fromEntries(new FormData(e.target));
                    run(async () => {
                      await api("quotes", { ...f, referral });
                      await refresh();
                      open("account");
                      setNotice(
                        "Quote request received. You can track its status here.",
                      );
                    });
                  }}
                >
                  <label>
                    Equipment
                    <select name="product" defaultValue={modal.product.id}>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Quantity
                    <input
                      name="quantity"
                      type="number"
                      min="1"
                      max="10000"
                      defaultValue="1"
                      required
                    />
                  </label>
                  <label>
                    Requirements
                    <textarea
                      name="details"
                      required
                      maxLength={3000}
                      placeholder="Model, budget, delivery country and any compatibility requirements. If signing in with a wallet, include a contact method if you want a reply outside your account."
                    />
                  </label>
                  <button disabled={busy} className="primary">
                    Submit quote request <ArrowUpRight size={18} />
                  </button>
                </form>
              </>
            )}
            {modal === "privacy" && (
              <>
                <h2>Privacy & store terms</h2>
                <h3>Accounts and requests</h3>
                <p>
                  Marcada stores your email or wallet identity, account
                  sessions, referral code and quote requests to provide the
                  service. Dealers’ private terms are restricted to authorized
                  accounts. Contact Bittrees through bittrees.org for access or
                  deletion requests.
                </p>
                <h3>Analytics and referrals</h3>
                <p>
                  Bittrees Insights analytics runs after consent and respects
                  browser privacy signals. Referral codes in shared URLs
                  attribute quote requests; we do not store an additional
                  marketing cookie for this. Do not enter sensitive information
                  in quote requirements.
                </p>
                <h3>Buying equipment</h3>
                <p>
                  Quotes are requests, not accepted orders. Dealer checkout
                  links take you to the named dealer, whose price, stock,
                  delivery, warranty and returns terms apply. Marcada may
                  receive commission from dealer links. Confirm the final
                  product and terms with the dealer before payment.
                </p>
                <h3>Mining</h3>
                <p>
                  Mining carries equipment and operating costs. Rewards are
                  variable and are never guaranteed.
                </p>
              </>
            )}
            {modal === "admin" && admin && (
              <>
                <div className="eyebrow">STORE OPERATIONS</div>
                <h2>Dealer desk</h2>
                <p>
                  Enter verified dealer offers. Private offers are visible only
                  to you and identities you explicitly grant access.
                </p>
                <>
                  {user.owner && (
                    <section className="roles">
                      <h3>Team roles</h3>
                      <p>
                        Owner access is protected. Administrators manage offers
                        and quotes. Dealer managers manage offers and private
                        access. Support manages quote requests.
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
                          <option value="dealer_manager">Dealer manager</option>
                          <option value="admin">Administrator</option>
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
                  {user.canDeals && (
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
                              editOffer?.private === false
                                ? "public"
                                : "private"
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
                              document
                                .querySelector(".modal")
                                .scrollIntoView({ behavior: "smooth" });
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
                                <button className="secondary">
                                  Grant access
                                </button>
                              </form>
                            </>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                  {user.canQuotes && (
                    <>
                      <h3>Quote requests</h3>
                      {admin.quotes.length === 0 && (
                        <p>No quote requests yet.</p>
                      )}
                      {admin.quotes.map((q) => (
                        <div className="record" key={q.id}>
                          <strong>
                            {q.name} × {q.quantity}
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
                              {["new", "reviewing", "quoted", "closed"].map(
                                (s) => (
                                  <option key={s}>{s}</option>
                                ),
                              )}
                            </select>
                          </label>
                        </div>
                      ))}
                    </>
                  )}
                </>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
}
function Offer({ offer: o }) {
  return (
    <div className="record">
      <strong>{o.dealer}</strong>
      {o.private && (
        <span className="pill">
          <Lock size={12} /> Private offer
        </span>
      )}
      <p>
        {o.price !== null
          ? new Intl.NumberFormat("en", {
              style: "currency",
              currency: o.currency,
            }).format(o.price)
          : "Confirm price with dealer"}
      </p>
      {o.expires_at && (
        <small>
          Offer expires {new Date(o.expires_at).toLocaleDateString()}
        </small>
      )}
      <a
        className="primary"
        data-insights="dealer_checkout"
        href={"/api/go?id=" + o.id}
        target="_blank"
        rel="sponsored noopener noreferrer"
      >
        Visit dealer <ArrowUpRight size={17} />
      </a>
      <small>
        We may earn a commission. Price, availability and purchase terms are
        confirmed by the dealer.
      </small>
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
