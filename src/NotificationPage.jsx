import React, { useEffect, useState } from "react";
const titles = {
  referral_activity: "New referral activity",
  private_offer: "A private offer is available",
  quote_update: "Your quote has an update",
};
export function NotificationPage({ user, api, open }) {
  const [rows, setRows] = useState(null),
    [error, setError] = useState("");
  const id = location.pathname.split("/")[3];
  useEffect(() => {
    let current = true;
    setRows(null);
    setError("");
    if (user)
      api("notifications" + (id ? "?id=" + encodeURIComponent(id) : ""))
        .then((r) => {
          if (current) setRows(r.notifications);
        })
        .catch((e) => {
          if (current) setError(e.message);
        });
    return () => {
      current = false;
    };
  }, [user?.identity, id]);
  return (
    <section className="equipment-page">
      <h1>Account notifications</h1>
      {!user ? (
        <>
          <p>Sign in with the account this update was shared with.</p>
          <button className="primary" onClick={() => open("login")}>
            Sign in
          </button>
        </>
      ) : (
        <>
          <p className="identity">{user.identity}</p>
          {error && <p role="alert">{error}</p>}
          {!rows && !error && <p role="status">Loading updates…</p>}
          {rows?.length === 0 && <p>No updates for this account yet.</p>}
          {rows?.map((n) => (
            <article className="record" key={n.id}>
              <h2>{titles[n.type]}</h2>
              <p>
                {n.type === "referral_activity"
                  ? "A quote was attributed to your referral. This is not a completed sale or earned commission. Customer details stay private."
                  : "Sign in and review current details in Mercado. Availability and permissions may change."}
              </p>
              <small>{new Date(n.created_at).toLocaleString()}</small>
              <p>
                {n.type !== "referral_activity" && (
                  <button
                    className="secondary"
                    onClick={() =>
                      open(n.type === "private_offer" ? "deals" : "account")
                    }
                  >
                    {n.type === "private_offer"
                      ? "Review my offers"
                      : "Review my quotes"}
                  </button>
                )}
              </p>
              <a href={"/account/notifications/" + n.id}>Link to this update</a>
            </article>
          ))}
        </>
      )}
    </section>
  );
}
