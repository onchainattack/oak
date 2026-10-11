# Embedded-Wallet and Trader-Tooling Supply-Chain Compromise Cohort — 2024–2026

**OAK Techniques observed:** OAK-T11.008, OAK-T11.009

**Attribution:** **unattributed** (aggregate cohort). SafeDep does not attribute the 2026 npm packages to DPRK or any other actor; the earlier BeaverTail/InvisibleFerret and `dev-protocol` claims are unconfirmed and removed.
**Loss:** no consolidated figure. T11.008: Polymarket users logging in with Google were reportedly drained in 2024 (Cointelegraph; Polymarket and Magic Labs had not given a root cause), and in December 2025 Polymarket said a "small number of users" were affected by a vulnerability in a third-party authentication provider, with the total undisclosed (The Crypto Times, 2025-12-24). A November 2025 comment-section phishing episode is reported by The Crypto Times as causing losses over \$500,000; this is not independently verified here. T11.009: aggregate undocumented.

**Corrected 2026-10-11:** Removed the literal "\$XXX million" placeholder and the unsourced claims (Magic-Labs-compromised-in-September-2024 as a confirmed fact, a magic-link comment-phishing mechanism, DPRK/BeaverTail overlap, `dev-protocol` GitHub hijack); moved the polymarket-* npm cluster from 2025-12/2026-01 to 2026-05-20/21 with the package names SafeDep actually lists; December 2025 third-party-auth flaw added.

**Key teaching point:** Both Techniques target the **developer/trader tooling ecosystem** rather than end-user wallets. T11.008's victims are end-users of embedded-wallet platforms (Magic Labs, Privy, Web3Auth) whose wallet access is mediated through a third-party auth provider; T11.009's victims are bot builders and quant developers who keep plaintext private keys in `.env` files for automated signing. In both cases, the user's mental model of non-custodial control collapses at a third-party service layer: the auth provider for T11.008, the package registry for T11.009.

## Summary

Two separate Polymarket-adjacent patterns are grouped here. First, embedded-wallet login drains: in late September 2024 Cointelegraph reported users whose wallets were drained after logging in via Google (not users of MetaMask-style extension wallets); Polymarket's login used Magic's SDK, and the support team said investigations with magic.link were ongoing. In December 2025 Polymarket stated the cause of a further set of account drains was "a vulnerability introduced by a third-party authentication provider"; the affected users mainly signed up through Magic Labs, though Polymarket's statement did not name the provider. Second, malicious npm packages impersonating Polymarket trading tools stole private keys from developers in May 2026.

## Timeline

T11.008: reports from 2024-09 (Google-login drains; cause not publicly established), 2025-12-24 (third-party auth provider vulnerability). T11.009: 2026-05-20/21 (SafeDep).

## T11.008 — Embedded-Wallet Identity-Provider Compromise

Compromise of the identity-provider layer of an embedded wallet, where key derivation runs through a third-party authentication service (email magic-link, OAuth federation, MPC-backed social login). The on-chain wallet appears non-custodial; the effective custody surface is the **auth provider's security posture**.

Vendor cohort: Magic Labs, Privy, Web3Auth, Dynamic, Particle Network and similar embedded-wallet-as-a-service offerings.

Cases: **Polymarket Google-login drains, September 2024** (provider only investigating; no published root cause) and **Polymarket third-party-auth vulnerability, December 2025** (fixed per Polymarket; losses undisclosed). Users of embedded-wallet platforms typically have no seed phrase, so there is no self-custody fallback when the auth provider is at fault.

## T11.009 — Trader-Tooling Supply-Chain Compromise Targeting `.env` Private Keys

Malicious packages in trader-tooling distribution channels (npm here) that exfiltrate plaintext private keys from developer environments.

Case: **polymarket-* npm packages, published 2026-05-20.** SafeDep reports nine packages (`polymarket-trading-cli`, `polymarket-terminal`, `polymarket-trade`, `polymarket-auto-trade`, `polymarket-copy-trading`, `polymarket-bot`, `polymarket-claude-code`, `polymarket-ai-agent`, `polymarket-trader`) that collect `PRIVATE_KEY` from the environment or a `.env` file, or via a `postinstall` prompt falsely claiming the key stays encrypted, and send it in plaintext to a Cloudflare Worker endpoint. A linked GitHub repository had likely purchased stars (69 stars, 22 forks). SafeDep makes no actor attribution.

## Public references

- `[cryptotimespolymagic2025]` — The Crypto Times, "Polymarket Reports Third-Party Vulnerability Behind Recent Hack" (2025-12-24): <https://www.cryptotimes.io/2025/12/24/polymarket-reports-third-party-vulnerability-behind-recent-hack/> (third-party auth flaw; users mainly Magic Labs sign-ups; also recounts the September 2024 Google-login drains and a November 2025 comment-phishing loss over \$500,000)
- `[cointelegraphpolygoogle2024]` — Cointelegraph, "Polymarket users complain of mysterious Google login wallet attacks" (2024-09): <https://cointelegraph.com/news/polymarket-google-login-wallet-hack>
- `[safedeppolynpm2026]` — SafeDep, "Polymarket npm Packages Steal Crypto Wallet Keys" (2026-05-21): <https://safedep.io/malicious-polymarket-npm-crypto-wallet-drainer/> (nine malicious polymarket-* packages stealing wallet keys)
