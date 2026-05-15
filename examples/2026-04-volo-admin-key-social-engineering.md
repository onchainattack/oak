# Volo Admin-Key Social-Engineering Compromise — Sui — 2026-04-21

**OAK Techniques observed:** OAK-T11.001, OAK-T9.004

**Attribution:** **unattributed** (aggregate cohort).
**Loss:** ~$3.5M drained across three vaults (WBTC, XAUm, USDC); ~$3.44M recovered via rapid ecosystem coordination (WBTC intercept on LayerZero bridge, XAUm return via Sui Foundation, 90% of stolen funds recovered in ETH and converted back to stablecoins); **net loss ~$60K**, covered from Volo's treasury with zero passed to users.

**Key teaching point:** Volo is the canonical 2026 case for **admin-key compromise in a protocol where the key was the entire security model** — three audits, a bug bounty program, and two and a half years of clean operation were all bypassed because a single admin key was the sole authorisation predicate, and that key was social-engineered out of the team's custody. The incident demonstrates that key-management hygiene is not an operational footnote — it is the load-bearing security control. Volo's response (self-disclosure before any third party detected the breach, ecosystem coordination within hours, and 98% recovery) is the benchmark for incident response in the admin-key-compromise class.

## Summary

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2026-04-21 | Attacker uses compromised admin key to drain three Volo vaults on Sui: WBTC, XAUm (tokenised gold), USDC — ~$3.5M total | T11.001 (key compromise), T9.004 (single admin key, no multisig/timelock) |
| 2026-04-21 (within hours) | Volo self-discloses the breach on X before any security researcher or alert bot flags it; freezes remaining vaults; notifies Sui Foundation | (incident response) |
| 2026-04-21 (within 30 min of disclosure) | $500K in stolen assets frozen through ecosystem partner coordination | (recovery phase 1) |
| 2026-04-21 (within hours) | Attacker moves ~$1.55M USDC off Sui to Ethereum via Circle CCTP; 19.6 WBTC (~$2.1M) intercepted on LayerZero bridge — blocked and no longer under attacker control | (exit attempt + intercept) |
| 2026-04-22 onward | NAVI Protocol pauses contracts and activates security procedures (unaffected, reopened within 6.5 hours); Matrixdock confirms physical gold backing XAUm intact and freezes remaining XAUm in attacker's address; SuiLend confirms normal operations | (ecosystem containment) |
| 2026-04-23 | QuillAudits publishes first independent researcher-level analysis | (forensic confirmation) |
| 2026-04-25 | Volo Recovery Update #4: 90% of stolen funds recovered in ETH, converted to stablecoins, bridged back to Sui; perpetrator identified | (recovery near-complete) |
| 2026-04-28 | Volo Recovery Update #5: remaining ~64.9 ETH recovered; net loss ~$60K; all vaults except XAUm ready to come back online; remaining 115 XAUm the attacker sold to be reminted via Matrixdock | (recovery final) |

## Realised extraction

~$3.5M drained; ~$3.44M recovered; net loss ~$60K (absorbed by Volo treasury). The attacker's EVM wallet was flagged across major CEXes, swappers, and KYT compliance tools before the exit window closed. The WBTC intercept on the LayerZero bridge was the single largest recovery action.

## Public references

- [Volo self-disclosure on X — April 21, 2026](https://x.com/volo_sui) — first-party disclosure before any third-party detection.
- [rekt.news — Volo — Rekt](https://rekt.news/volo-rekt) — primary forensic narrative: admin private key compromised, likely via social engineering.
- [QuillAudits analysis](https://x.com/QuillAudits) — independent researcher-level confirmation.
- [GoPlus Security, ExVul, Bitslab](https://x.com/GoPlusSecurity) — independent on-chain analyses confirming smart contracts were not touched.
- SlowMist classification: Private Key Leakage.
- Chainalysis context: private key compromises accounted for the largest share of stolen crypto in 2024 and drove 88% of losses in Q1 2025.

## Discussion

Volo is the 2026 canonical case for **admin-key social-engineering compromise on a non-EVM chain** (Sui). The protocol had undergone three audits and maintained a bug bounty program for over two years — none of which mattered because the security model reduced to a single admin key, and that key was obtained via social engineering of a team member. The incident reinforces the T11.001 / T9.004 intersection: a third-party-signing-vendor-like compromise (T11.001) where the "vendor" is the team member whose key was targeted, and an access-control misconfiguration (T9.004) where the absence of multisig or timelock made a single key the entire security model.

Volo's incident response — self-disclosure before detection, ecosystem coordination within hours, 98% recovery — is the benchmark for the admin-key-compromise class. The contrast with incidents where operators go silent or delay disclosure (see Zondacrypto 2026-04, Drift 2026-04) is instructive.
