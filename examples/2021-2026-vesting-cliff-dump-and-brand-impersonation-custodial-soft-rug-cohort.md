# Vesting-Cliff Dump and Brand-Impersonation Custodial Soft-Rug Cohort — 2021–2026

**Tags:** OAK-T5.006, OAK-T5.007

**Loss:** T5.006 aggregate in the billions (DFINITY/ICP ~95% decline from $630 peak across first cliff year alone; broader vesting-cliff extraction across the 2021–2025 token-unlock cycle); T5.007 ~$230K+ confirmed (Polycule, 2026) with the class structurally under-reported because victims self-select into off-platform services.

**Key teaching point:** Both T5.006 and T5.007 are T5 (Value Extraction) patterns where no smart contract is violated — the extraction occurs through structural features of the token-design and brand-trust landscape that defenders must monitor at the economic-design and off-platform-service layers, not at the contract-correctness layer.

## Timeline

T5.006 class spans 2021–2026 across every token-unlock cycle; DFINITY/ICP May 2021 is the canonical anchor. T5.007 class documented from 2026-01 (Polycule / Polymarket-branded trading bot, ~$230K, exit-via-"hack" announcement + communication blackout); earlier analogues exist but were characterised as generic soft-rugs rather than brand-impersonation custodial soft-rugs.

## T5.006 — Vesting Cliff Dump

The structural feature is the **cliff-unlock concentration**: team, investor, advisor, and KOL allocations become liquid at a scheduled vesting cliff, and recipients coordinate large sales into the public market in a short window. The contractual basis is fully legitimate — the smart contract behaves exactly as designed. The defensive question is whether the outflow profile is consistent with publicly-stated disposal intent (gradual, OTC, market-making) or coordinated front-of-window dumping.

Canonical cases:
- **DFINITY / ICP Genesis vesting-cliff cohort — May 2021.** ICP price declined ~95% from the May 2021 listing peak (~$630 → ~$30) across the first vesting-cliff year. Multi-recipient-cohort cliff unlock structure (seed, strategic, team allocations) with monthly cliff-unlock windows. See `examples/2021-05-dfinity-icp-vesting-cliff-dump.md`.
- **Broader 2021–2025 token-unlock cycle.** TokenUnlocks / Tokenomist data documents thousands of cliff events across the 2021–2025 cycle; the per-cliff outflow-concentration metric (share of unlocked supply reaching exchange-deposit or DEX-swap destinations within N days) is the load-bearing defensive signal.
- **Pre-cliff OTC placement pattern.** "Selling-while-vesting" — recipients route allocations through OTC desks before the cliff via assignable claims, structured forwards, or off-chain agreements settling on cliff. Visible on-chain only as unusual recipient-cluster outflow shapes.

## T5.007 — Third-Party Brand-Impersonation Custodial Soft-Rug

The structural feature is **brand-as-asset**: the operator exploits a legitimate platform's brand-trust without contractual basis, accumulates deposits in operator-controlled custody, and exits citing an unverifiable "hack."

Canonical case:
- **Polycule — Polymarket-branded trading bot — Polygon — 2026-01.** ~$230K. An off-platform service branded itself as a Polymarket-affiliated trading bot, accumulated user deposits in operator-controlled custody, and exited citing a "hack." The operator announced the compromise on Telegram, then went silent — no follow-up, no forensic disclosure, no observable recovery effort. The on-chain outflow pattern showed a single coordinated transfer (consistent with operator exit) rather than the dispersion pattern of external attacker exfiltration. The service had no official Polymarket partnership; users assumed an affiliation that did not exist. KuCoin and Cryptorank coverage characterised the case as fitting the soft-rug pattern.

The **exit-as-hack** pattern is the canonical T5.007 exit primitive: the operator announces an external compromise which is structurally indistinguishable from an exit-scam without independent forensic verification.

## References

- `[dfinityicp2021]` — DFINITY/ICP Genesis vesting schedule and price action
- `[tokenunlocks2025]` — TokenUnlocks / Tokenomist cliff-calendar data
- `[polycule2026]` — Polycule trading-bot exit, KuCoin and Cryptorank coverage
