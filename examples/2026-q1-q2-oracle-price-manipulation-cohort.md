# Q1–Q2 2026 Oracle and Price-Manipulation Cohort — Blend Pools V2, Makina, Moonwell, BSC TMM/USDT — Aggregate ~$18.6M

**OAK Techniques observed:** OAK-T9.001, OAK-T9.002

**Attribution:** **unattributed** (aggregate cohort).
**Loss:** Blend Pools V2 ~$10.97M (oracle manipulation on Stellar); Makina ~$4.13M (flash-loan-enabled spot-price oracle manipulation, MEV bots front-ran original attacker); Moonwell ~$1.78M (cbETH oracle misconfiguration — missing ETH/USD conversion multiplier, liquidation bots seized 1,096 cbETH in 4 minutes); BSC TMM/USDT ~$1.65M (reserve manipulation attack on BSC). Aggregate ~$18.6M across four incidents, January–April 2026.

**Key teaching point:** Four oracle and price-manipulation incidents in Q1–Q2 2026 demonstrate that the oracle surface is the highest-leverage single point of failure in DeFi lending and AMM architecture — and that the failure modes span the full spectrum from audit-scope gaps (Makina: attack vector explicitly listed as out-of-scope) to AI-assisted coding errors (Moonwell: Claude Opus 4.6 co-authored the broken commit) to cross-chain oracle immaturity (Blend Pools V2 on Stellar) to reserve-ratio manipulation (BSC TMM/USDT). The common thread is **a price signal that the protocol trusted without a sanity-check boundary.**

## Summary

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2026-01-19 | Makina Finance: flash-loan-enabled spot-price oracle manipulation drains $4.13M across DUSD Curve pools; MEV bots front-run the original attacker | **T9.001** (spot-price oracle manipulation), **T9.002** (flash-loan capital) |
| 2026-01-19 | Makina postmortem reveals Cantina audit explicitly listed oracle-manipulation losses as out-of-scope; 6 audits conducted, $100M TVL, zero protection against the vector that killed it | **T6.004** (audit-scope gap — excluded attack vector materialised) |
| 2026-02-15 | Moonwell: Chainlink OEV wrapper configuration error on Base; cbETH/USD oracle missing the cbETH/ETH → ETH/USD conversion multiplier; cbETH priced at ~$1.12 instead of ~$2,200 | **T9.001** (oracle misconfiguration — missing price-feed conversion) |
| 2026-02-15 (4 min window) | Liquidation bots seize 1,096 cbETH at the mispriced valuation; borrowers lose collateral; $1.78M bad debt; Moonwell risk manager slashes borrow cap — but 4 minutes was enough | (protocol response — too slow for MEV-era liquidation bots) |
| 2026-02-22 | Blend Pools V2: oracle price manipulation on Stellar; ~$10.97M extracted | **T9.001** (price oracle manipulation on non-EVM chain) |
| 2026-04-04 | BSC TMM/USDT: reserve manipulation attack drains ~$1.65M; attacker manipulates the pool's reserve ratio to distort the pricing mechanism | **T9.001** (reserve-ratio manipulation) |

## Makina Finance — Audit-Scope Oracle Manipulation

On January 19, 2026, Makina Finance lost $4.13M through a textbook oracle manipulation: flash loan → manipulated spot price → atomic extraction. The protocol had six audits and $100M in TVL. The Cantina audit's scope document explicitly listed "losses caused by oracle price/liquidity pool manipulation, where an unchecked synchronous deposit is used" as out-of-scope. Dialectic, Makina's first Operator, deployed DUSD tokens into Curve pools with a share-price mechanism that trusted spot prices without a TWAP or time-delay guard.

MEV bots front-ran the original attacker and captured most of the $4.13M haul, splitting it across two addresses. The incident is the canonical 2026 illustration of the **audit-scope-gap oracle pattern**: the attack vector is documented, classified as out-of-scope, and then materialises exactly as described. The Cantina scope document effectively wrote the exploit narrative before the attacker did.

**OAK mapping:** T9.001 (spot-price oracle manipulation) + T9.002 (flash-loan capital acquisition) + T6.004 (audit-scope exclusion of the materialised attack vector).

## Moonwell — AI-Assisted Oracle Misconfiguration

On February 15, 2026, Moonwell deployed a Chainlink OEV wrapper configuration upgrade across its core markets on Base and Optimism. The GitHub commit — co-authored by Claude Opus 4.6 — contained a single missing multiplication: the cbETH/USD price feed was configured as `cbETH/ETH` without the `ETH/USD` conversion multiplier. The result: cbETH, an asset worth ~$2,200 (1 cbETH ≈ 1.12 ETH), was priced at ~$1.12.

Liquidation bots seized 1,096 cbETH in a four-minute window before Moonwell's risk manager slashed the borrow cap. Borrowers lost collateral valued at ~$2,200 per token, liquidated for roughly the price of a parking ticket. The protocol was left with $1.78M in bad debt.

The Moonwell incident is the **third oracle failure at the same protocol in four months**, accumulating ~$7.8M in total bad debt. The pattern is consistent: trust the price feed, skip the sanity check, watch the bots feed. The AI-co-authored commit adds a novel dimension — the error was not in the oracle infrastructure but in the **deployment-configuration layer**, where a human-AI pair omitted a conversion multiplier that any manual review of the oracle output against a secondary price source would have caught within seconds.

**OAK mapping:** T9.001 (oracle misconfiguration — missing price-feed conversion multiplier). The incident is structurally similar to the Aave V3 wstETH oracle misconfiguration of March 2026 but distinct in its root cause: Moonwell's error was in the deployment configuration, not in the oracle contract itself.

## Blend Pools V2 — Stellar Oracle Manipulation

On February 22, 2026, Blend Pools V2 on Stellar suffered an oracle price manipulation attack resulting in ~$10.97M extracted. The incident is notable as one of the largest DeFi exploits on the Stellar network and demonstrates that T9.001 (Oracle Price Manipulation) is chain-agnostic — the attack primitive (distort a price feed, extract against the mispriced asset) is independent of the execution environment. Limited public postmortem detail is available; classification based on DeFiLlama "Price Oracle Manipulation" designation.

**OAK mapping:** T9.001 (price oracle manipulation on a non-EVM chain — Stellar's asset-pricing infrastructure).

## BSC TMM/USDT — Reserve-Ratio Manipulation

On April 4, 2026, a BSC-based TMM/USDT pool was exploited for ~$1.65M via reserve manipulation. The attacker manipulated the pool's reserve ratio to distort the internal pricing mechanism, a variant of T9.001 where the "oracle" is the pool's own reserve-based spot price rather than an external feed. This sub-pattern — reserve-ratio manipulation in AMM pools — is one of the oldest T9.001 variants, dating to the earliest AMM deployments, and its persistence in 2026 reflects the structural difficulty of defending spot-price mechanisms against flash-loan-capitalised manipulation.

**OAK mapping:** T9.001 (reserve-ratio-based price manipulation), T9.002 (flash-loan capital acquisition for reserve distortion).

## Public references

- [Makina — Rekt](https://rekt.news/makina-rekt/) — primary forensic narrative: 6 audits, $100M TVL, attack vector listed as out-of-scope
- [Moonwell — Rekt](https://rekt.news/moonwell-rekt/) — primary forensic narrative: Claude Opus 4.6 co-authored commit, missing ETH/USD conversion, 4-minute liquidation window
- Cantina audit scope document — oracle manipulation explicitly excluded from Makina audit scope
- PeckShield, CertiK, TenArmor, SlowMist — Makina first responders
- Blend Pools V2: DeFiLlama classification as "Price Oracle Manipulation" on Stellar
- BSC TMM/USDT: DeFiLlama classification as "Reserve Manipulation Attack" on BSC
- Cross-reference: T9.001 at `techniques/T9.001-oracle-price-manipulation.md`; T9.002 at `techniques/T9.002-flash-loan-enabled-exploit.md`

## Discussion

The Q1–Q2 2026 oracle-manipulation cohort demonstrates that **T9.001 is the highest-frequency smart-contract exploit class after T9.004 (Access-Control Misconfiguration), and the two classes overlap substantially** — an oracle misconfiguration (T9.001) is typically enabled by an access-control or parameter-validation gap (T9.004) in the oracle-configuration update path.

The Makina case is the canonical illustration of a structural defender problem: **audit scope documents are not read by users, and out-of-scope exclusions are not surfaced in any user-facing UI.** A user depositing into a Makina pool saw "6 audits" and had no way to know that the attack vector that killed the protocol was explicitly listed as not covered. This is a verification-infrastructure gap structurally identical to the T6.002/T6.004 audit-claim gap — the audit count is visible; the audit scope is not.

The Moonwell case introduces a novel dimension to oracle risk: **AI-assisted deployment configuration as an oracle failure vector.** The error — a missing conversion multiplier — would be caught by any oracle-output sanity check (compare the feed price to a secondary source; flag deviations >1%). The fact that three oracle failures accumulated at the same protocol in four months suggests that the post-incident remediation after the first and second failures did not include the systematic sanity-check layer that would have caught the third. The defender lesson is that **oracle-output sanity checking must be automated and independent of the deployment-configuration path** — if a human-AI pair can break the price with a single missing multiplication, the safety net is insufficient.

Blend Pools V2 on Stellar and BSC TMM/USDT on BSC demonstrate that T9.001 is chain-agnostic and pool-size-agnostic — the attack primitive works on Stellar's asset model as effectively as on EVM AMMs, and the $1.65M BSC reserve-manipulation case shows that mid-size pools without TWAP protection remain exploitable well into 2026.
