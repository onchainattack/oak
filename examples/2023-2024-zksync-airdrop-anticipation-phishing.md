# zkSync airdrop-anticipation phishing campaign — 2023–2024

**Loss:** **Per-victim loss, not a single-incident total.** A phishing campaign exploited the structural information gap between zkSync's public signalling of a future token and the absence of an on-chain token deployment (pre-June 2024). Attackers registered typosquat domains combining "zksync" with airdrop/claim/token/launch keywords, deployed fake "ZK token claim" UIs, and directed users to approve token allowances or connect wallets to drainer contracts.
**OAK Techniques observed:** **OAK-T4.009** (Pre-Token Brand Anticipation Phishing) — canonical anchor. The attacker exploited the multi-year gap between zkSync's public documentation references to a future token (2022–2023) and the actual ZK token deployment (June 2024). During this pre-token window, any domain claiming to offer a "ZK airdrop claim" was necessarily fraudulent — the token did not exist on-chain.
**Attribution:** **unattributed** — the phishing infrastructure has not been publicly attributed to a specific actor at v0.1 cutoff.

**Key teaching point:** zkSync's pre-token window is the canonical T4.009 anchor: a major L2 platform with a publicly signalled but not-yet-deployed token created a multi-year information gap that attackers exploited via typosquat-domain "airdrop claim" UIs. The structural invariant — no on-chain token deployment at the claimed contract address — provides a definitive pre-trade simulation signal that no legitimate claim page could satisfy.

## Summary

zkSync — a ZK-rollup L2 scaling solution for Ethereum developed by Matter Labs — publicly referenced a future ZK token in documentation and community communications as early as 2022, but the token was not deployed on-chain until June 2024. During this ~2-year pre-token window, attackers registered dozens of domains combining "zksync" with anticipation keywords (airdrop, claim, token, launch, rewards, allocation) and deployed fake "ZK token claim" UIs.

The phishing UIs typically prompted users to: (1) connect their wallet; (2) view a fabricated "airdrop allocation" based on their wallet activity; (3) approve a token allowance or sign a transaction to "claim" the allocation — which instead drained the wallet or approved a drainer contract. Some variants included a fake "ZK token" interface with fabricated price charts and allocation calculators.

The detection signal is structural: during the pre-token window, the claimed ZK token contract address either does not exist or is not deployed by Matter Labs — a definitive on-chain falsification of the phishing domain's claim.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022–2023 | zkSync publicly signals future ZK token in documentation and community communications | (pre-token signal) |
| 2023–2024 | Attackers register typosquat domains, deploy fake "ZK airdrop claim" UIs | T4.009 (pre-token anticipation phishing) |
| 2024-06 | zkSync ZK token deployed on-chain; legitimate airdrop claim goes live | (token launch) |
| Post-launch | Phishing domains pivot to impersonating the legitimate claim portal | T4.002 (compromised front-end impersonation) |

## Public references

- Matter Labs / zkSync official documentation: tokenomics and airdrop announcements.
- Domain registration data for typosquat domains targeting `zksync.io` (Certificate Transparency logs).
- Web3 security firms: pre-token phishing campaign tracking (SlowMist, CertiK, 2023-2024).
