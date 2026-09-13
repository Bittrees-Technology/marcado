import React, { useEffect, useState } from "react";
import { discoverWallets } from "../lib/wallets.mjs";
export function WalletPicker({ busy, onChoose, link = false }) {
  const [wallets, setWallets] = useState([]);
  useEffect(() => discoverWallets(window, setWallets), []);
  return (
    <div className="wallet-picker" aria-label="Choose an Ethereum wallet">
      <p>
        {link
          ? "Choose the wallet to link to this email account."
          : "Choose a wallet to sign in."}
      </p>
      {wallets.map((w, i) => (
        <button
          type="button"
          className="secondary full"
          key={w.id + ":" + i}
          disabled={busy}
          onClick={() => onChoose(w.provider)}
        >
          {busy
            ? "Check your wallet…"
            : `${link ? "Link" : "Continue with"} ${w.name}`}
        </button>
      ))}
      {!wallets.length && (
        <p>
          No browser wallet detected. On a phone, open this page inside your
          wallet’s browser. You can also sign in by email here.
        </p>
      )}
      <small>
        Signing proves account ownership. It does not send a transaction or
        approve spending. Wallet accounts and email accounts keep their own
        access grants.
      </small>
    </div>
  );
}
