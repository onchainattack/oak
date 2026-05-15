# Fake browser-extension phishing cohort — cross-chain — 2022–2025

**Loss:** **Unquantified aggregate** across multiple campaigns. Individual campaigns: fake MetaMask extensions exfiltrated seed phrases from hundreds of users (2022–2023); fake Ledger Live extensions prompted recovery-phrase entry for "hardware wallet sync" (2022–2024); fake Rabby/Phantom extensions injected malicious transaction-parameter overrides at sign time (2023–2025). No single headline loss figure comparable to the MS Drainer cohort ($59M) anchors the extension class; the per-victim loss shape is bifurcated between seed-phrase exfiltration (total wallet drain across all chains/accounts) and transaction-parameter injection (per-transaction drain of the connected wallet's assets). The absence of a single cohort-calibrated loss figure is a structural feature of the extension-phishing class — the extension persists across sessions and its extraction cadence is continuous rather than per-campaign.
**OAK Techniques observed:** **OAK-T4.010** (Fake Security-Tool / Browser-Extension Phishing) — canonical anchor case. Distinct from T4.008 (Fake-DEX Clone-Frontend Phishing) at the *substrate* level: T4.008's phishing surface is a web page (per-session); T4.010's phishing surface is a persistent browser extension (survives tab closure, browser restart). The extraction leg chains into **OAK-T4.001** (Permit2 Authority Misuse), **OAK-T4.004** (Allowance/Approve Drainer), **OAK-T4.005** (setApprovalForAll NFT Drainer) for the transaction-injection arm, and **OAK-T11.007.003** (Brand-Trust-Leveraged Active Phishing for Seed-Phrase Exfiltration) for the seed-phrase-capture arm.
**Attribution:** **pseudonymous** Individual campaigns are attributed to extension-store publisher accounts (typically typosquatted or newly created developer accounts with sparse history); the underlying operators are not publicly identified. The extension-store takedown is the primary enforcement action — Google Chrome Web Store and Firefox Add-ons remove the counterfeit listing — but the publisher account behind the takedown is rarely attributed to a named individual or group.
**Key teaching point:** The fake browser-extension class exploits the user's trust in the **browser extension store as a distribution surface** — the user believes they are installing a security tool from a vetted store, but the store's review process does not reliably catch typosquatted publisher names and counterfeit extension listings. The extension's **persistence** — it survives browser restart, observes all tabs, and can modify transactions in-flight — gives the attacker a standing-access surface that a one-time phishing web page cannot provide. The dual-extraction surface (seed phrase + transaction injection) makes T4.010 structurally broader in realised-loss shape than a single-mechanism phishing page.

## Summary

Fake browser-extension phishing campaigns target users of popular wallet and security-tool browser extensions — MetaMask, Ledger Live, Rabby, Phantom, Trust Wallet — by publishing counterfeit extension listings on the Chrome Web Store and Firefox Add-ons marketplace. The fake extension's name, icon, and description impersonate the legitimate vendor; the publisher name is a typosquat or near-miss of the legitimate vendor's publisher account. Users searching the extension store for the legitimate wallet name encounter the fake listing, install it believing it to be the legitimate tool or a complementary security add-on, and grant the extension broad permissions (read/write to all sites, clipboard access, tab access).

The extension's extraction mechanism operates along two parallel arms:

1. **Seed-phrase exfiltration (T11.007.003 chain):** the extension injects a fake "import wallet," "verify seed phrase," or "sync hardware wallet" prompt into the legitimate wallet's UI flow. The user enters their 12- or 24-word recovery phrase, which is exfiltrated to an attacker-controlled server. This arm captures **all** wallets derived from the phrase across all chains and all accounts — the maximum-extraction-loss shape.
2. **Transaction-parameter injection (T4.001/T4.004/T4.005 chain):** the extension hooks the browser's wallet-provider object (`window.ethereum`, `window.solana`) and modifies transaction parameters at sign time — replacing the user's intended recipient address with an attacker-controlled address while the wallet's confirmation UI displays the legitimate destination. The extraction is per-transaction and limited to the assets in the currently-connected wallet.

The campaigns operate across Chrome (dominant), Firefox, and Brave (Chromium-based, shares the Chrome Web Store). The counterfeit extension typically remains live on the store for days to weeks before community reporting triggers a takedown; the publisher account is often abandoned and replaced with a fresh account for the next campaign.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022 | First wave of fake MetaMask Chrome extensions published under typosquatted publisher names; seed-phrase exfiltration via injected "verify wallet" prompts | T4.010 (extension-phishing surface) |
| 2022–2024 | Fake Ledger Live Chrome extensions prompt recovery-phrase entry for "hardware wallet sync"; Ledger publishes recurring warnings that no legitimate Ledger Live browser extension exists | T4.010 + T11.007.003 (seed-phrase capture) |
| 2023–2025 | Fake Rabby Wallet (EVM) and Phantom Wallet (Solana) extensions inject transaction-parameter overrides at sign time; the confirmation UI displays the legitimate recipient while the signed transaction routes funds to the attacker | T4.010 + T4.001/T4.004 (transaction injection) |
| 2024–2025 | Community-curated extension-ID blocklists emerge; ScamSniffer and Web3 Antivirus begin tracking phishing-extension domains and extension IDs; wallet vendors (MetaMask, Rabby, Phantom) deploy extension-origin verification and injected-script detection | (defender-side maturation) |
| Continuing | The class persists into 2025 with typosquatted publisher accounts cycling faster than extension-store takedown processes; wallet-side extension-origin verification is the emerging defensive layer | (ongoing surface) |

## Realised extraction

**Unquantified aggregate** across multiple campaigns. Per-victim extraction shape: seed-phrase exfiltration results in total wallet drain (all chains, all accounts derived from the phrase); transaction-parameter injection results in per-transaction drain (assets in the currently-connected wallet). The seed-phrase-capture arm is the higher-severity extraction path because it compromises the key-material root rather than a single session's transaction. No centralised cohort-level loss figure comparable to the MS Drainer $59M anchor exists for the extension-phishing class as of v0.1.

## Public references

See citations in corresponding technique file.

## What this example tells contributors writing future Technique pages

- **The browser extension is a persistence surface, not a session surface.** Future T4.010 worked examples should record the extension's installed lifetime as a separate dimension from the per-campaign deployment window — the extension persists until the user manually uninstalls it, and the extraction cadence is continuous over the installed duration.
- **The dual-extraction surface is structurally informative.** Contributors should separate the seed-phrase-capture arm (T11 chain) from the transaction-injection arm (T4 chain) in future worked examples; the mitigation and detection surfaces diverge across the two arms.
- **Extension-store publisher verification is the load-bearing intervention.** Future T4.010 mitigation work should focus on extension-store-side publisher verification (verified-publisher badges, keyword-typosquat detection at listing-submission time) and wallet-side extension-origin verification (extension-ID allowlisting, injected-content-script detection at sign time).

## References

- MetaMask official security advisories (fake-extension warnings, 2022–2023)
- Ledger official warnings: "Ledger Live does not have a browser extension" (2022–2024)
- Rabby Wallet / Phantom Wallet security advisories (fake-extension campaigns, 2023–2025)
- ScamSniffer / Web3 Antivirus phishing-extension domain and ID tracking
- Community reporting: r/CryptoCurrency, r/MetaMask, r/ledgerwallet (2022–2025)
