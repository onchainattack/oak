# Vesting-Cliff Dump and Brand-Impersonation Custodial Soft-Rug Cohort — 2021–2026

**OAK Techniques observed:** OAK-T5.006, OAK-T5.007

**Attribution:** **unattributed** (aggregate cohort).
**Corrected 2026-10-11:** The ICP peak price is disputed (DFINITY's Dominic Williams says just over \$450; Arkham's report says \$730) and the "vesting-cliff dump" characterisation is an allegation Williams denies; the Polycule case is reported as a hack announced by the team and later called a rug pull by competitors, with no independent verification. The "aggregate in the billions" figure was unsourced and is removed.

**Loss:** T5.006: no sourced aggregate. DFINITY/ICP is the anchor case; sources disagree on the peak price (Williams: just over \$450 on day one; Arkham: \$730) `[cryptoslateicp]` `[arkhamicp]`. T5.007: Polycule, about \$230,000 in user funds reported affected in January 2026 `[cryptopolitanpoly]` `[mexcpoly]`; the class is not sourced beyond this case.

**Key teaching point:** Both T5.006 and T5.007 are T5 (Value Extraction) patterns where no smart contract is violated — the extraction occurs through structural features of the token-design and brand-trust landscape that defenders must monitor at the economic-design and off-platform-service layers, not at the contract-correctness layer.

## Summary

## Timeline

T5.006 class spans 2021–2026 across every token-unlock cycle; DFINITY/ICP May 2021 is the canonical anchor. T5.007 class documented from 2026-01 (Polycule / Polymarket-based trading bot, ~\$230K, hack announcement followed by communication blackout; rug-pull status unverified); earlier analogues exist but were characterised as generic soft-rugs rather than brand-impersonation custodial soft-rugs.

## T5.006 — Vesting Cliff Dump

The structural feature is the **cliff-unlock concentration**: team, investor, advisor, and KOL allocations become liquid at a scheduled vesting cliff, and recipients coordinate large sales into the public market in a short window. The contractual basis is fully legitimate — the smart contract behaves exactly as designed. The defensive question is whether the outflow profile is consistent with publicly-stated disposal intent (gradual, OTC, market-making) or coordinated front-of-window dumping.

Canonical cases:

- **DFINITY / ICP Genesis — May 2021 (allegation, disputed).** Arkham's June 2021 report alleges insiders connected to DFINITY deposited about 18.9M ICP to exchanges and reports a fall from \$730 to \$30 `[arkhamicp]`. DFINITY founder Dominic Williams denies any rug pull, says the highest real price was just over \$450 for a few hours on the first day, that the Foundation sold no ICP for the first five weeks, and that later sales covered tax liabilities on staff vesting `[cryptoslateicp]`. The earlier "~95% decline from \$630" and "monthly cliff-unlock windows" figures are not stated in these sources. See `examples/2021-05-dfinity-icp-vesting-cliff-dump.md`.
- **Broader 2021–2025 token-unlock cycle.** TokenUnlocks / Tokenomist data documents thousands of cliff events across the 2021–2025 cycle; the per-cliff outflow-concentration metric (share of unlocked supply reaching exchange-deposit or DEX-swap destinations within N days) is the load-bearing defensive signal.
- **Pre-cliff OTC placement pattern.** "Selling-while-vesting" — recipients route allocations through OTC desks before the cliff via assignable claims, structured forwards, or off-chain agreements settling on cliff. Visible on-chain only as unusual recipient-cluster outflow shapes.

## T5.007 — Third-Party Brand-Impersonation Custodial Soft-Rug

The structural feature is **brand-as-asset**: the operator exploits a legitimate platform's brand-trust without contractual basis, accumulates deposits in operator-controlled custody, and exits citing an unverifiable "hack." (Polycule is the only cited case and is not verified as such.)

Canonical case:

- **Polycule — Polymarket-branded trading bot — Polygon — 2026-01.** ~$230K. Polycule (operated by PMX) is a trading bot built on Polymarket. On about 2026-01-08 the team said a vulnerability let hackers drain about \$230,000 of user funds, that a patch and audit would follow, and that affected Polygon users would be compensated from a vault `[mexcpoly]`. By 2026-01-12 the team had gone quiet and competitors, led by Insiders.bot's founder, labelled it a rug pull, a claim not independently verified `[cryptopolitanpoly]`. Whether it was an external hack or an operator exit is therefore unresolved in the sources consulted. The earlier assertions here (single coordinated outflow transfer, no official Polymarket partnership, KuCoin/Cryptorank coverage) are unverified and are removed.

The **exit-as-hack** pattern is the canonical T5.007 exit primitive: the operator announces an external compromise which is structurally indistinguishable from an exit-scam without independent forensic verification.

## Public references

- `[cryptoslateicp]` — CryptoSlate, "Exclusive: DFINITY founder shoots down all rugpull allegations around Internet Computer (ICP) tokens" (2021-09-25): <https://cryptoslate.com/exclusive-dfinity-founder-shoots-down-all-rugpull-allegations-around-internet-computer-icp-tokens/>
- `[arkhamicp]` — Arkham, ICP report (2021-06-28): <https://info.arkm.com/research/reports/icp-report>
- `[cryptopolitanpoly]` — Cryptopolitan, "Polycule Polymarket bot goes offline" (2026-01): <https://www.cryptopolitan.com/polycule-polymarket-bot-goes-offline/>
- `[mexcpoly]` — MEXC News, Polycule hack report (2026-01): <https://www.mexc.com/news/457737>
- `[tokenunlocks2025]` — TokenUnlocks / Tokenomist cliff-calendar data (no URL; unverified)
