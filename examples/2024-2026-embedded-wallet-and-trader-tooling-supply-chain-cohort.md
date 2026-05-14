# Embedded-Wallet and Trader-Tooling Supply-Chain Compromise Cohort — 2024–2026

**Tags:** OAK-T11.008, OAK-T11.009

**Loss:** T11.008 ~$XXX million (Polymarket Magic-Labs takeover, September 2024, exact extraction undocumented at class level; Polymarket comment-section phishing campaign exploiting Magic Labs auth path, November 2025); T11.009 aggregate undocumented at class level (multiple npm/PyPI supply-chain campaigns targeting Polymarket bot builders, 2025-12 to 2026-01; overlap with DPRK-attributed BeaverTail/InvisibleFerret npm campaigns).

**Key teaching point:** Both Techniques target the **developer/trader tooling ecosystem** rather than end-user wallets. T11.008's victims are end-users of embedded-wallet platforms (Magic Labs, Privy, Web3Auth) whose wallet access is mediated through a third-party auth provider; T11.009's victims are bot builders and quant developers who maintain plaintext private keys in `.env` files for automated signing. In both cases, the user's mental model of non-custodial control collapses at a third-party service layer — the auth provider for T11.008, the package registry for T11.009.

## Timeline

T11.008 from 2024-09 (Polymarket Magic-Labs takeover); T11.009 from 2025-12 to 2026-01 (Polymarket trader-tooling npm supply-chain compromise).

## T11.008 — Embedded-Wallet Identity-Provider Compromise

Compromise of the identity-provider layer of an embedded wallet — a wallet whose key derivation runs through a third-party authentication service (email magic-link, OAuth federation, MPC-backed social login). The on-chain wallet appears non-custodial; the effective custody surface is the **auth provider's security posture**.

Vendor cohort: Magic Labs, Privy, Web3Auth (tKey/Auth/Torus), Dynamic, Particle Network, and adjacent embedded-wallet-as-a-service offerings.

Canonical case: **Polymarket Magic-Labs takeover — September 2024.** The embedded-wallet auth provider (Magic Labs) was compromised; user wallets whose access path ran through Magic Labs were exposed. The structural feature is the widespread "non-custodial" claim collapsing to "as custodial as the auth provider's security posture."

Adjacent: **Polymarket comment-section phishing campaign — November 2025.** Phishing operators captured email-magic-link credentials via fake comment-section links, exploiting the Magic Labs auth path to drain embedded wallets. The phishing itself is T4; T11.008 is the custody surface the phishing chains into. See `examples/2025-11-polymarket-comment-section-phishing.md`.

Users of embedded-wallet platforms typically have no seed phrase — key derivation runs through the auth provider's hosted infrastructure — so there is no self-custody fallback when the auth provider is compromised.

## T11.009 — Trader-Tooling Supply-Chain Compromise Targeting `.env` Private Keys

Compromise of trader-tooling distribution channels (npm, PyPI, GitHub repositories) to ship code that exfiltrates plaintext private-key material from developer environments. The target cohort is bot builders, quant developers, and copy-trading-bot users who maintain plaintext keys in `.env` files, `wallet.json`, or `keys/*.json` to enable automated signing.

Canonical case: **Polymarket trader-tooling npm supply-chain compromise — 2025-12 to 2026-01.** Trojanised npm packages (`polymarket-clob`, `polymarket-copytrading-bot-*`, `sha256-validation`, `sha256-validator-pro`, `solana-utils-sdk`, `synced-plus-agent`) exfiltrated `.env` files and private-key material to attacker-controlled infrastructure. The `dev-protocol` GitHub organisation was hijacked to host polished but trojanised repositories with artificially-inflated star counts. C2 endpoint overlap with DPRK-attributed Vidar Stealer / BeaverTail / InvisibleFerret campaigns.

Infrastructure fingerprints:
- Package names targeting a specific platform's tooling ecosystem with download-count manipulation for social proof
- GitHub organisations under hijacked credentials with polished READMEs and inflated star counts
- Code reading `.env`, `wallet.txt`, `wallets.json`, `keys/*.json`, `~/.config/solana/id.json`, `~/.aws/credentials` at install/build/first-run time
- Exfiltration via HTTPS POST to attacker-controlled IP/domain
- Secondary backdoor capabilities (port-22 SSH backdoors, IP fingerprinting, reverse shells)

## References

- `[magiclabs2024takeover]` — Polymarket Magic Labs takeover (September 2024)
- `[polymarketphishing2025]` — Polymarket comment-section phishing campaign (November 2025)
- `[npm2025polymarket]` — npm package registry Polymarket-targeting supply-chain campaign (2025-12 to 2026-01)
- `[dpkt2025beavertail]` — DPRK BeaverTail / InvisibleFerret npm campaign analysis
- `[devprotocol2025hijack]` — dev-protocol GitHub organisation hijack
