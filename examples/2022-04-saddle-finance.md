# Saddle Finance virtual-price manipulation — Ethereum — 2022-04-30

**Loss:** approximately \$10M across Saddle's `saddleSUSDMetaPoolUpdated`, `saddleUSDPoolV2`, `saddleTBTCMetaPoolV3`, and `saddleWCUSDMetaPool` stableswap pools (sUSD, USDC, USDT, DAI, alongside related wrapped balances). Approximately \$3.8M was subsequently returned to Saddle Finance under negotiation; the remainder was retained.
**OAK Techniques observed:** **OAK-T9.001** (Oracle Price Manipulation — virtual-price-feed subclass) as the extraction mechanism; **OAK-T9.002** (Flash-Loan-Enabled Exploit) as the precondition that scaled the extraction.
**Attribution:** **pseudonymous** attacker; not publicly named. Partial recovery via on-chain negotiation.
**Key teaching point:** AMM pools that expose a `getVirtualPrice()` style helper as if it were an oracle inherit every assumption that helper makes about the *internal* invariant of the pool — and those assumptions break under flash-loan-scale single-block imbalance. T9.001 is not just "the off-chain oracle was thin"; it also covers "the on-chain pool's own price helper was treated as ground truth."

## Summary

Saddle Finance is an Ethereum stableswap protocol whose pool implementation was a fork of the Curve `StableSwap` invariant. Saddle's metapool variants supported nested LP-token compositions: a "base" pool LP token (e.g., the Saddle USD pool LP) could itself be one side of a metapool, with the other side being a single asset such as sUSD. The metapool's swap math depended on the base-pool LP's *virtual price* — the stableswap invariant's notion of "fair value per LP token" — to translate between the two sides of the metapool.

On 2022-04-30, an attacker took a flash loan as working capital, used it to deposit and withdraw single-sidedly into the base pool in a way that transiently inflated the base-pool LP's virtual price, then traded across the metapool to harvest the inflation, and unwound the position before the flash-loan repayment. The same pattern was applied across Saddle's metapool family. Net extraction was approximately \$10M. Saddle paused the affected pools the same day, published an incident page, and entered an on-chain negotiation that returned approximately \$3.8M.

The case is OAK's reference example for the **virtual-price** subclass of T9.001 because the manipulated price input was not an off-chain feed at all — it was an on-chain helper function that the metapool implementation read as if its output were trustworthy across an arbitrary single-block state. Forensic write-ups by BlockSec, PeckShield, and Halborn converged on the same root-cause framing.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Days before | Attacker contract deployed; deployment funded via mixer-routed gas | (off-OAK pre-event observation) |
| 2022-04-30 ~13:33 | Flash loan taken as working capital | **T9.002 precondition** |
| same transaction | Single-sided deposit into Saddle base pool transiently inflates the base-pool LP virtual price | T9.001 setup |
| same transaction | Cross-pool trade through the affected metapool harvests the virtual-price gap | **T9.001 execution / extraction** |
| same transaction | Position unwound; flash loan repaid | T9.002 closure |
| same transaction (repeated) | Pattern applied across the sUSD, USDv2, tBTCv3, and wCUSD metapools | T9.001 repeat |
| 2022-04-30 (within hours) | Saddle pauses affected pools; incident page published | (defender response) |
| Subsequent days | On-chain negotiation; \~\$3.8M returned | (recovery) |

## What defenders observed

- **Pre-event (pool-implementation layer):** the Saddle metapool implementation read the base-pool LP's virtual price via the standard `getVirtualPrice()` helper inherited from the Curve-style StableSwap fork. The helper computes a value derived from the pool's current reserves and the StableSwap invariant; under normal market conditions it is reasonably stable, but it is not flash-loan-resistant — by construction, depositing or withdrawing single-sidedly within a single transaction *changes* the helper's output for the duration of that transaction. This was a standing T9.001 surface from the day the metapool implementation was deployed, identical in shape to the surface that had been documented in the broader Curve-fork audit literature throughout 2021.
- **At-event:** the attack signature is the canonical T9.001 + T9.002 pattern — a single contract opens a flash loan, manipulates the on-chain invariant-derived price reading inside the same block, harvests the gap, unwinds, and repays. Each pool drain is structurally identical. There is no off-chain feed, no oracle vendor, no Chainlink integration involved; the manipulated "oracle" is the pool's own helper function.
- **Cross-protocol blast radius:** Saddle's pool LP tokens were used as collateral and as building blocks in adjacent protocols. The pause-and-relaunch propagation exposed integrating protocols to mark-to-market disruptions as well, although the headline loss number reflects only Saddle's own pool drains.
- **Post-event:** Saddle's pause-and-recover response is the standard mitigation chain for a T9.001 incident at the affected-protocol layer. The on-chain negotiation that returned \~\$3.8M is a recovery footnote, not a modifier of the Technique classification — the base rate for T9.001 incidents is total loss.

## What this example tells contributors writing future Technique pages

- **T9.001 covers virtual-price as well as off-chain feeds.** The "oracle" in T9.001 is whichever input a protocol *treats as ground truth for pricing*. For Mango Markets that input was a thin set of off-chain venues; for Saddle that input was the protocol's own internal pool helper. Contributors writing T9.001 pages should be explicit that the Technique is defined by the trust placed in the input, not by where the input was hosted.
- **Curve-fork inheritance is a v0.x cohort observation.** Saddle is one of several Curve-fork stableswap implementations that inherited the same `getVirtualPrice` semantics. T9.001 contributors should treat Curve-fork virtual-price treatment as a cohort-level surface, not an isolated Saddle issue, and cross-reference the earlier 2021-2022 cohort write-ups when documenting it.
- **The flash-loan precondition deserves explicit naming.** Single-block manipulation of an on-chain invariant-derived helper is only nine-figure-scale because flash loans removed the working-capital constraint. Without the flash-loan precondition the same exploit would have netted thousands of dollars. The Beanstalk worked example at `/examples/2022-04-beanstalk.md` and the Euler worked example at `/examples/2023-03-euler-finance.md` make the same precondition-vs-extraction distinction; Saddle is the canonical T9.001 + T9.002 case in the same family.
- **Mitigation lives at pool-design.** Protocols can prevent virtual-price-class T9.001 by requiring multi-block TWAP windows on virtual-price reads, by gating metapool composition on whitelisted base pools whose virtual-price was bounded by external invariants, or by removing virtual-price as a pricing input to nested constructions entirely. The Mitigations section of T9.001 should reflect this.

## Public references

- [Saddle Finance — Incident report](https://medium.com/saddle-finance/incident-report-april-30-2022-c91d8a4d70f6) — protocol-side post-mortem with affected-pool list and recovery summary.
- [PeckShield — Saddle Finance Hack Analysis](https://twitter.com/peckshield/status/1520370083830374400) — on-chain trace and root-cause summary published the day of the incident.
- [BlockSec — Root-cause analysis of Saddle Finance metapool exploit](https://blocksec.com/blog/saddle-finance-metapool-attack) — function-level walkthrough.
- [Halborn — Explained: The Saddle Finance Hack (April 2022)](https://www.halborn.com/blog/post/explained-the-saddle-finance-hack-april-2022) — defender-oriented technical post-mortem.
- [The Block — Saddle Finance loses around \$10 million in metapool exploit](https://www.theblock.co/post/144572/saddle-finance-loses-around-10-million-in-metapool-exploit) — contemporaneous coverage.
- `[zhou2023sok]` — academic taxonomy classifying this as a flash-loan-enabled oracle-manipulation chain against an on-chain invariant-derived price helper.


## Discussion

Saddle is OAK's canonical T9.001 case for the **virtual-price subclass** because the manipulated price input was an on-chain helper function rather than an off-chain feed. This is the part of T9.001's surface that defenders most often miss when they hear "oracle manipulation" — the framing of "an external feed was thin" trains attention on Chainlink-style integrations and away from the protocol's own internal price helpers. The mitigation guidance for the two subclasses is similar in spirit (TWAP windows, deviation circuit-breakers, multi-input quorum) but lands on different code paths — for off-chain feeds it lands on the oracle-integration adapter; for virtual-price it lands on the pool-composition layer.

The pairing with Beanstalk in the same April 2022 window is a useful cross-reference for OAK contributors. Beanstalk and Saddle were both flash-loan-enabled, both attacked DeFi protocols on Ethereum, and both occurred within the same two-week window — but the OAK Techniques classifications are different (T9.003 vs T9.001) and the mitigation surfaces are different (governance-design vs pool-design). The April 2022 cluster is a useful illustration that "DeFi exploit" is not a coherent OAK category; the Technique classification is what carries the analytical content.
