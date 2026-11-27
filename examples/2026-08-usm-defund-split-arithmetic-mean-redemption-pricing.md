# USM — redeeming the same FUM in 64 small calls paid more than one large redemption, because the redemption price was an arithmetic mean that lacked split invariance — USM (Ethereum) — 2026-08-10

**Loss:** **~70.83 ETH** ([SlowMist](https://x.com/SlowMist_Team/status/2086644725143183639)). USD value differs by source: about \$136K in a weekly roundup relayed by OAK's earlier version of this file (that page could not be opened), about \$250,000 in [Edgex's report](https://pro.edgex.exchange/en-US/news/article/usm-defi-pricing-logic-exploit). USM had announced no plans on upgrades, compensation or pricing changes at the time of [Coinfomania's report](https://coinfomania.com/usm-suffers-70-83-eth-loss-due-to-pricing-logic-flaw/).

**OAK Techniques observed:** **OAK-T9.011** (Precision-Loss / Rounding Attack, *closest existing class, an imperfect fit*. [SlowMist](https://x.com/SlowMist_Team/status/2086644725143183639) attributes the profit to a pricing function lacking split invariance, combined with per-redemption state contraction and integer rounding. The value accrues across many small calls, as in T9.011, but the primary defect is path-dependent pricing, not rounding direction. See [`techniques/T9.011-precision-loss-rounding-attack.md`](../techniques/T9.011-precision-loss-rounding-attack.md) and the split-invariance candidate in [`TAXONOMY-GAPS.md`](../TAXONOMY-GAPS.md)). No oracle was named in any opened page, so the oracle-manipulation Technique is not declared. Whether a flash loan was used is not stated on any opened page.

**Attribution:** **pseudonymous.** SlowMist lists an attacker EOA, an attacker contract and a profit receiver (below); no named individual or group is reported.

**Key teaching point:** **A redemption function must pay the same total whether called once or many times.** [SlowMist](https://x.com/SlowMist_Team/status/2086644725143183639) says `defund()` priced a single redemption with the arithmetic mean of the current and estimated final FUM sell prices, so 64 small calls returned more ETH than one large call for the same FUM amount. The invariant is testable: for any split of a position, the parts must not out-pay the whole, net of fees. A protocol with no pause or upgrade path needs such properties proven before deployment; whether USM has such levers is not stated on an opened page.

## Summary

On 2026-08-10, [SlowMist](https://x.com/SlowMist_Team/status/2086644725143183639) (post at 02:44 UTC) reported a loss of about 70.83 ETH at USM. It named the cause as a pricing logic flaw in `ethFromDefund()`, used by `defund()`: single redemptions are priced at the arithmetic mean of the current and estimated final FUM sell prices, with no split invariance. Combined with per-redemption state contraction (`adjShrinkFactor`) and integer rounding, 64 small `defund()` calls returned more ETH than one large call for the same FUM amount. [Coinfomania](https://coinfomania.com/usm-suffers-70-83-eth-loss-due-to-pricing-logic-flaw/) and [Edgex](https://pro.edgex.exchange/en-US/news/article/usm-defi-pricing-logic-exploit) relay the same mechanism and report no USM statement. No post-mortem from USM was found.

## Timeline (UTC)

Entry: none needed, the function was callable by anyone. Preparation, exact times and fund movement after the extraction are undisclosed in the opened pages.

| When | What happened | OAK |
|---|---|---|
| Before 2026-08-10 (standing) | `defund()` prices a single redemption at the arithmetic mean of current and estimated final FUM sell prices, without split invariance ([SlowMist](https://x.com/SlowMist_Team/status/2086644725143183639)). | **T9.011** |
| 2026-08-10 (time undisclosed) | The attacker contract calls `defund()` 64 times for the same FUM amount, returning more ETH than one large call; exploit transaction [`0xfae5e751b8ce01457cbb6b529839f24a0cff50faaabcbd0fd02ca0cf559b050e`](https://etherscan.io/tx/0xfae5e751b8ce01457cbb6b529839f24a0cff50faaabcbd0fd02ca0cf559b050e) ([SlowMist](https://x.com/SlowMist_Team/status/2086644725143183639)). | **T9.011** |
| 2026-08-10 | About 70.83 ETH is the loss; SlowMist lists a profit receiver address. Onward movement is undisclosed. | — |
| 2026-08-10 02:44 | [SlowMist publishes its alert](https://x.com/SlowMist_Team/status/2086644725143183639). | response |
| after 2026-08-10 | No statement, pause, compensation or fix from USM appears in the opened pages ([Coinfomania](https://coinfomania.com/usm-suffers-70-83-eth-loss-due-to-pricing-logic-flaw/)). | response |

Key addresses (all from [SlowMist](https://x.com/SlowMist_Team/status/2086644725143183639)):

- Attacker EOA — [`0xb92b2e47680c89da8f951b8963ef469f461a50fc`](https://etherscan.io/address/0xb92b2e47680c89da8f951b8963ef469f461a50fc)
- Attacker contract — [`0x5a5e29ba89663a3558273354e990426f3cac7de7`](https://etherscan.io/address/0x5a5e29ba89663a3558273354e990426f3cac7de7)
- Victim contract (USM) — [`0x2a7fff44c19f39468064ab5e5c304de01d591675`](https://etherscan.io/address/0x2a7fff44c19f39468064ab5e5c304de01d591675)
- Profit receiver — [`0xe3c6346b6f282029312d2caf4677ef39beabbf99`](https://etherscan.io/address/0xe3c6346b6f282029312d2caf4677ef39beabbf99)

## What defenders can take from it

- A fuzz property that executing a position in n parts must not out-earn executing it in one applies to any size-dependent pricing path ([SlowMist's](https://x.com/SlowMist_Team/status/2086644725143183639) root cause is exactly its violation).
- Repeated calls to one redemption entrypoint in one transaction (64 here) are a cheap alert shape.

## Root-cause evidence

- **Technique:** OAK-T9.011
- **Source:** <https://x.com/SlowMist_Team/status/2086644725143183639>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist's same-day alert names the function, the arithmetic-mean pricing, `adjShrinkFactor`, rounding and the 64-call count; Coinfomania and Edgex relay it. No operator statement or post-mortem exists in the opened pages.

## Public references

- SlowMist on X (2026-08-10): <https://x.com/SlowMist_Team/status/2086644725143183639>
- Coinfomania, "USM suffers 70.83 ETH loss due to pricing logic flaw": <https://coinfomania.com/usm-suffers-70-83-eth-loss-due-to-pricing-logic-flaw/>
- Edgex news, "USM Loses 70.83 ETH to Pricing Logic Flaw in Defund Function": <https://pro.edgex.exchange/en-US/news/article/usm-defi-pricing-logic-exploit>
