# Solana / multi-chain npm trader-tooling supply-chain key exfiltration cohort — Solana / EVM — 2024–2026

**Loss:** aggregate losses forming across the cohort at v0.1; individual victim losses range from low-five-figure to mid-six-figure USD-equivalent. The campaign targeted trader-bot developers and copy-trading-bot users who maintain plaintext private keys in `.env` files, `wallet.json`, or `~/.config/solana/id.json` to enable automated trading. Malicious npm packages exfiltrated these keys to attacker-controlled C2 infrastructure; downstream extraction occurred across Solana, Ethereum, Base, Arbitrum, BNB Chain, and Polygon.
**OAK Techniques observed:** **OAK-T11.009** (Trader-Tooling Supply-Chain Compromise targeting `.env` Private Keys) — primary; the canonical second anchor for T11.009 alongside the Polymarket `polymarket-clob` npm campaign. The Solana cohort demonstrates the technique's cross-chain generalizability: the same npm-package exfiltration pattern targeted Solana developer keyfiles (`~/.config/solana/id.json`) in addition to EVM `.env` files. **OAK-T15.002** (Software Supply-Chain / Build-Pipeline Compromise — broadly construed; the npm package registry is the distribution surface for the malicious code).
**Attribution:** **inferred-strong** The C2 infrastructure overlaps with the BeaverTail / InvisibleFerret npm-supply-chain campaigns attributed to DPRK cyber-operations by CrowdStrike, Mandiant, and SentinelOne. The package-publisher infrastructure and exfiltration patterns are structurally consistent with the broader DPRK-attributed npm campaign cohort (2023–2026). No named individuals publicly identified.
**Key teaching point:** **The Solana npm trader-tooling supply-chain cohort demonstrates that T11.009 generalizes cross-chain: the target is not a specific blockchain but the developer-environment keyfile pattern.** Any chain where bot-builders maintain plaintext keys for automated signing is a T11.009 surface — Solana's `~/.config/solana/id.json` is structurally equivalent to an EVM `.env` file.

## Summary

Between 2024 and 2026, multiple npm packages targeting Solana and multi-chain trader-tooling developers were published to the npm registry. The packages presented as legitimate trading-bot utilities — Solana transaction builders, cross-chain arbitrage bots, copy-trading agents, and market-making SDKs — but contained code that exfiltrated plaintext private-key material from the developer's environment at install or first-run time.

The exfiltration targets included:

1. `.env` files containing EVM private keys (ETHEREUM_PRIVATE_KEY, BSC_PRIVATE_KEY, etc.)
2. `wallet.json` and `wallets.json` files used by Solana trading bots
3. `~/.config/solana/id.json` — the default Solana CLI keyfile
4. `keys/*.json` pattern files used by multi-chain bot frameworks
5. `~/.aws/credentials` — AWS credentials for cloud-deployed bot infrastructure

The malicious packages used several publisher identities to avoid takedown clustering, with download-count manipulation (artificially inflated weekly downloads) to provide social-proof signal. Package names were typosquats of legitimate trading-tool packages or plausible-seeming "utility" names: `solana-utils-sdk`, `synced-plus-agent`, `sha256-validation`, `sha256-validator-pro`, and variants.

The C2 infrastructure overlapped with known DPRK-attributed infostealer campaigns — exfiltration HTTPS POST endpoints reused Vidar Stealer C2 IPs previously identified in BeaverTail / InvisibleFerret npm campaigns. This infrastructure overlap is the primary attribution signal at v0.1.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023–2024 | DPRK-attributed npm supply-chain campaigns (BeaverTail / InvisibleFerret) establish the package-registry exfiltration pattern | T15.002 (npm as distribution surface) |
| 2024–2025 | Solana-specific trader-tooling npm packages appear; `solana-utils-sdk`, `synced-plus-agent`, and sibling packages published with key-exfiltration backdoors | T11.009 (trader-key exfiltration) |
| 2025-12 | Polymarket `polymarket-clob` npm supply-chain compromise and `dev-protocol` GitHub-org hijack — structurally identical T11.009 pattern targeting Polymarket bot developers | T11.009 (second cohort anchor) |
| 2026 | Security researchers (Socket.dev, Phylum, Snyk) publish analyses of npm trader-tooling supply-chain campaigns; cross-campaign C2 infrastructure overlap with DPRK campaigns identified | (forensic consolidation) |

## Realised extraction

Aggregate losses forming at v0.1; per-victim individual extraction in the low-five-figure to mid-six-figure USD-equivalent range. The extraction is distributed across Solana, Ethereum, Base, Arbitrum, BNB Chain, and Polygon.

## Public references

- Socket.dev / Phylum / Snyk — npm supply-chain campaign analyses (2024–2026)
- CrowdStrike / Mandiant / SentinelOne — DPRK-attributed npm campaign reporting (BeaverTail / InvisibleFerret)
- Polymarket `polymarket-clob` npm supply-chain compromise (December 2025–January 2026)
- See `techniques/T11.009-trader-tooling-supply-chain-env-key-compromise.md`
