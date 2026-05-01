# Polymarket trader-tooling supply-chain compromise — npm + GitHub — 2026-01

**Loss:** ~0.014 ETH (~$44) confirmed in one publicly-tracked victim wallet from the npm package campaign; aggregate cohort loss undisclosed. The economic ceiling is not the operative concern — the **substrate compromise of the Polymarket-trader tooling ecosystem** is.
**OAK Techniques observed:** No clean v0.1 Technique. **Proposed v0.x candidate**: T11.x sub-class for *trader-tooling supply-chain compromise targeting `.env` private keys / wallet-key files*. Adjacent to T11.002 (Wallet-Software Distribution Compromise) but distinct in target cohort: this attack class targets *bot-builder / quant developer* environments rather than end-user wallets. See `TAXONOMY-GAPS.md`.
**Attribution:** **inferred-strong** at operator-cohort level. The hijacked `dev-protocol` GitHub organisation (a real Japanese DeFi project whose org credentials were compromised) was used by a threat actor publishing under the handle "Trust412" to distribute malicious "polymarket-copytrading-bot" repositories. The npm campaign overlapped infrastructure with Vidar Stealer C2 endpoints (per Cyb3rhawk / ADHD reporting). The package distribution pattern is consistent with DPRK-attributed npm-supply-chain operations (BeaverTail / InvisibleFerret cohort — see `actors/OAK-G01-lazarus.md`) but specific attribution to OAK-G01 has not been publicly confirmed.
**OAK-Gnn:** unattributed at v0.1; consistent with OAK-G01-cohort patterns but not confirmed.

## Summary

Through December 2025 - February 2026, attackers compromised the Polymarket trader-tooling ecosystem on two fronts:

**npm package distribution (Dec 2025 - Jan 2026):**

- Malicious package `polymarket-clob` v1.3.1 (~189 downloads before takedown) plus sibling packages `sha256-validation` (~7,600 downloads), `sha256-validator-pro` (~1,000 downloads), `solana-utils-sdk`, and `synced-plus-agent`.
- Each package contained code that read `wallet.txt`, `wallets.json`, and `keys/*.json` from the developer's filesystem and exfiltrated their contents to an attacker-controlled IP.
- One confirmed victim lost ~0.014 ETH on Polygon when the attacker used the exfiltrated key to sign a transfer.
- Packages were pulled from npm on January 6, 2026 after public disclosure.

**GitHub organisation hijack (Feb-Apr 2026):**

- The threat actor "Trust412" obtained credentials to the `dev-protocol` GitHub organisation (a legitimate Japanese DeFi project) and published 20+ repositories under names like `polymarket-copytrading-bot-*`.
- Repository READMEs were polished and well-written; star counts were artificially inflated; the repositories appeared on first inspection to be genuine open-source bot projects.
- The repositories' dependency files included trojan packages that exfiltrated the cloning developer's `.env` (typically containing exchange API keys and wallet private keys for the bot to operate on Polygon).
- Per StepSecurity reporting, the trojans also opened port 22 SSH backdoors on developer machines and fingerprinted IP addresses.

The combined effect: two parallel supply-chain campaigns targeting the Polymarket-trader cohort — retail bot-builders and quant developers writing automated trading strategies for Polymarket markets.

## Why this is structurally significant

OAK-T11.002 (Wallet-Software Distribution Compromise) covers compromise of the wallet *binary* — Atomic Wallet (June 2023), the Ledger Connect Kit npm incident (December 2023). The target is the end-user's wallet, the entry vector is the wallet vendor's distribution channel.

The Polymarket trader-tooling campaign targets a **different cohort with a different on-disk asset**: the developer's `.env` / `wallet.txt` / private-key file. The attack does not need a wallet binary to be compromised; it directly reads the developer's plaintext key storage and signs transactions on the developer's own infrastructure.

This is the substrate-compromise pattern that has been documented in DPRK-attributed npm operations (BeaverTail, InvisibleFerret) but explicitly targeted at the Polymarket trader-bot-builder cohort. The combination of:

1. A platform with active retail bot-building activity (Polymarket Polygon CLOB)
2. A cohort that stores L1 private keys in `.env` for unattended bot operation
3. An npm/GitHub package ecosystem with low publishing friction

creates a high-yield attack surface that OAK should explicitly catalogue rather than fold into either T11.002 (wallet-binary) or generic supply-chain advisory.

## What defenders observed

- **Pre-event:** npm typo-squat detection on `polymarket-*` package names had been raised in security communities through 2025 but no canonical-allowlist process existed for Polymarket-related dependencies. GitHub-org-name credibility ranking had no widely-deployed defense against legitimate-org credential compromise.
- **At-event:** the trojan packages were detected by SafeDep / StepSecurity / Cyb3rhawk through behavioural analysis of post-install scripts. The npm packages were pulled within ~6 weeks of first publication; the GitHub repos were taken down within hours of public disclosure.
- **Post-event:** the StepSecurity / Panther / SafeDep / Cyb3rhawk write-ups documented the infrastructure pivot from initial-stage exfiltration to Vidar Stealer C2 reuse. The DPRK-cohort fingerprint (similarity to BeaverTail / InvisibleFerret typosquat patterns) was raised in industry analysis but not officially attributed by FBI / Mandiant at v0.1.

## What this example tells contributors

Contributors writing v0.x T11.x candidate Techniques should consider:

1. **T11.x — Trader-tooling supply-chain compromise targeting `.env` private keys.** Scope: malicious npm / PyPI / cargo / GitHub-distributed packages targeting developer environments holding L1 private keys for bot operation. Distinct from T11.002 because the target is the developer's plaintext key storage, not a compiled wallet binary.

2. **Detection signals are off-chain at the package-registry level.** Defender capabilities: SafeDep / StepSecurity / Snyk / Socket-class behavioural analysis on package install scripts; reproducible-build verification for high-trust packages; mandatory two-person-rule on package publication for high-impact namespaces.

3. **GitHub-org credential compromise as an upstream vector** (the `dev-protocol` case) is its own sub-class. Detection requires GitHub-organisation security telemetry (audit log monitoring, member-add anomalies, repo-visibility changes) that most independent developers do not actively monitor.

4. **The `.env` / `wallet.txt` / `keys/*.json` exfiltration target** generalises beyond Polymarket. Any platform with active retail bot-building creates a similar substrate; the Polymarket case is the canonical first.

## Why this incident belongs in OAK

The bot-builder cohort is small in absolute count compared to Polymarket's retail user base, but they are infrastructure participants — they often operate on behalf of multiple end-user wallets (copy-trading services, market-making bots, arbitrage automation). A single compromised bot-builder can downstream-affect dozens or hundreds of end-users.

OAK's existing T11.002 framing covers wallet-vendor compromise (vendor's many users affected by one supply-chain attack). The bot-builder analogue is structurally similar but operationally different. Documenting it explicitly creates a defensive surface that platform operators (Polymarket, in this case) can respond to via authoritative-package-allowlist publication and via communication to their bot-builder cohort.

## Public references

- [StepSecurity — Malicious Polymarket Bot Hides in Hijacked dev-protocol GitHub Org and Steals Wallet Keys](https://www.stepsecurity.io/blog/malicious-polymarket-bot-hides-in-hijacked-dev-protocol-github-org-and-steals-wallet-keys)
- [Cyb3rhawk / ADHD on Medium — Infrastructure Pivoting: Malicious Polymarket npm, Wallet Drainer, Vidar Stealer](https://medium.com/adhd-attack-detect-hunt-defend/infrastructure-pivoting-malicious-polymarket-npm-wallet-drainer-and-vidar-stealer-0b222f0e1a53)
- [SafeDep — `redeem-onchain-sdk` malicious package writeup](https://safedep.io/) — sibling package analysis.
- [Panther Labs blog — DPRK npm Polymarket trader writeup](https://panther.com/) — DPRK-cohort fingerprint analysis.
- [Bitrue blog — Polymarket bot malware on GitHub](https://www.bitrue.com/blog/) — secondary corroboration.
