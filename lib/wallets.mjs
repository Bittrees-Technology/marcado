// EIP-6963 discovery with legacy EIP-1193 fallback. Never render wallet-supplied HTML/icons.
export function discoverWallets(target, publish) {
  const entries = [];
  const add = (provider, info = {}) => {
    if (
      typeof provider?.request !== "function" ||
      entries.some((e) => e.provider === provider)
    )
      return;
    entries.push({
      provider,
      id: String(info.uuid || `legacy-${entries.length}`),
      name: String(info.name || "Browser wallet").slice(0, 60),
    });
    publish([...entries]);
  };
  const announced = (e) => add(e.detail?.provider, e.detail?.info);
  target.addEventListener("eip6963:announceProvider", announced);
  target.dispatchEvent(new Event("eip6963:requestProvider"));
  const legacy = () => {
    for (const p of target.ethereum?.providers || [target.ethereum])
      add(p, {
        name: p?.isRabby
          ? "Rabby"
          : p?.isCoinbaseWallet
            ? "Coinbase Wallet"
            : p?.isBraveWallet
              ? "Brave Wallet"
              : p?.isMetaMask
                ? "MetaMask"
                : "Browser wallet",
      });
  };
  const timer = setTimeout(legacy, 250);
  target.addEventListener("ethereum#initialized", legacy);
  return () => {
    clearTimeout(timer);
    target.removeEventListener("eip6963:announceProvider", announced);
    target.removeEventListener("ethereum#initialized", legacy);
  };
}
export function walletError(error) {
  const code = Number(error?.code ?? error?.cause?.code);
  if (code === 4001)
    return "Request declined in your wallet. You can try again or sign in by email.";
  if (code === -32002)
    return "A wallet request is already open. Open your wallet and finish or cancel it before trying again.";
  if (code === 4100)
    return "This wallet has not authorized Mercado. Reconnect and choose an account.";
  if (code === 4900 || code === 4901)
    return "Your wallet is disconnected. Reopen it and try again.";
  return error?.message || "Wallet sign-in failed. Try again or use email.";
}
export async function signWalletMessage(provider, address, message) {
  const encoded =
    "0x" +
    Array.from(new TextEncoder().encode(message), (b) =>
      b.toString(16).padStart(2, "0"),
    ).join("");
  const signature = await provider.request({
    method: "personal_sign",
    params: [encoded, address],
  });
  const accounts = await provider.request({ method: "eth_accounts" });
  if (!accounts?.some((a) => a.toLowerCase() === address.toLowerCase()))
    throw Error(
      "Wallet account changed while signing. Please sign in again with the intended account.",
    );
  return signature;
}
