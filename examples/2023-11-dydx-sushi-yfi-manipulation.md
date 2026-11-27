# dYdX V3 — spot-price pumps on SUSHI and YFI let one operator withdraw unrealized profit, then YFI's crash drained the insurance fund — dYdX V3 / Ethereum — 2023-10-29 to 2023-11-18

**Loss:** about **\$9 million** drained from dYdX V3's insurance fund; dYdX says no user funds were compromised ([dYdX post-mortem](https://dydx.exchange/blog/sushi-yfi-incident)). [The Block](https://www.theblock.co/post/270275/dydx-publishes-post-mortem-9-million-november-attack) puts this at roughly 40% of the fund. dYdX states the attacker withdrew about \$27M after depositing about \$16M, and about \$5M of SUSHI-phase profit left without touching the insurance fund ([dYdX post-mortem](https://dydx.exchange/blog/sushi-yfi-incident); [The Block](https://www.theblock.co/post/270275/dydx-publishes-post-mortem-9-million-november-attack)).

**OAK Techniques observed:** **OAK-T9.001** (Oracle Price Manipulation — *primary*; dYdX itself calls it "an oracle manipulation attack": the attacker bought spot SUSHI and YFI to move the price dYdX V3 used, then withdrew the resulting unrealized profit. See [`techniques/T9.001-oracle-price-manipulation.md`](../techniques/T9.001-oracle-price-manipulation.md)). **OAK-T8.001** (Cluster Reuse — dYdX tied 132 addresses connected to V3 to one funding address. See [`techniques/T8.001-cluster-reuse.md`](../techniques/T8.001-cluster-reuse.md)).

**Attribution:** **pseudonymous** — dYdX says its investigation identified the attacker and that it is in contact with them, and does not name them ([dYdX post-mortem](https://dydx.exchange/blog/sushi-yfi-incident); [The Block](https://www.theblock.co/post/270275/dydx-publishes-post-mortem-9-million-november-attack)). On-chain funding source: [`0xccb6f95b350ca6f9d3285d61a60ea54715a4bc27`](https://etherscan.io/address/0xccb6f95b350ca6f9d3285d61a60ea54715a4bc27).

**Key teaching point:** **Do not let unrealized profit on a leveraged position in a thin market be withdrawn as equity while its price reference can be moved on other venues.** dYdX V3 counted unrealized profit in account equity (collateral plus unrealized profit) and allowed withdrawal up to equity minus initial margin fraction times position size ([dYdX post-mortem](https://dydx.exchange/blog/sushi-yfi-incident)). dYdX's fix for V3 makes the initial margin fraction adjust automatically during abnormal activity (same source).

## Summary

Per the [dYdX post-mortem](https://dydx.exchange/blog/sushi-yfi-incident) (published 2024-01-03 per [The Block](https://www.theblock.co/post/270275/dydx-publishes-post-mortem-9-million-november-attack)), the attacker connected more than 100 wallets to dYdX V3 and in the SUSHI phase (2023-10-29 to 2023-11-03) deposited about \$5.3M and opened mostly 5x leveraged SUSHI-USD longs. SUSHI rose about 180% (about \$0.67 to \$1.20) between 10/31 and 11/3. dYdX raised SUSHI-USD initial margin to 100% on 11/1 and lowered it to 25% on 11/3; the attacker later withdrew about \$5M of profit.

In the YFI phase (2023-11-01 to 2023-11-17) the attacker used about \$10M, including SUSHI profits, to open 5x YFI-USD longs. Open interest rose from about \$0.8M to \$67M and YFI rose about 215% (about \$6,500 on 11/9 to over \$14,000 on 11/17). On 11/17 dYdX raised YFI-USD initial margin and cut base and incremental position sizes. At about 05:00 UTC on 11/18 YFI fell nearly 30% in an hour; the attacker closed only a small share, liquidity was lacking, most positions were liquidated only after the oracle price fell below bankruptcy price, accounts went negative and the insurance fund covered the loss. dYdX says the attacker likely did not profit from the crash itself. The attacker repeatedly withdrew gains and redeposited from new wallets to expand longs (same source).

dYdX says it is assisting law enforcement and exploring legal remedies ([dYdX post-mortem](https://dydx.exchange/blog/sushi-yfi-incident)); [The Block](https://www.theblock.co/post/270275/dydx-publishes-post-mortem-9-million-november-attack) does not mention law enforcement.

## Timeline (UTC)

Stages: **Setup**, **SUSHI phase**, **YFI phase**, **Crash**, **Response**. Dates are from the [dYdX post-mortem](https://dydx.exchange/blog/sushi-yfi-incident); transaction hashes are undisclosed.

| When | What happened | OAK |
|---|---|---|
| Before 2023-10-29 | A funding address sends ETH to wallets that connect to dYdX V3; one example deposited 22,000 USDC. 132 addresses are tied to the funding source | **T8.001** |
| 2023-10-29 to 2023-11-03 | About \$5.3M deposited; 5x SUSHI-USD longs opened; SUSHI rises about 180% from 10/31 | **T9.001** |
| 2023-11-01 | dYdX raises SUSHI-USD initial margin to 100% | response |
| 2023-11-03 | Margin lowered to 25%; attacker later withdraws about \$5M | **T9.001** |
| 2023-11-01 to 2023-11-17 | About \$10M used for 5x YFI-USD longs; OI rises from about \$0.8M to \$67M; YFI up about 215% | **T9.001** |
| 2023-11-17 | dYdX raises YFI-USD initial margin, cuts base and incremental position sizes | response |
| 2023-11-18 ~05:00 | YFI falls nearly 30% in an hour; negative equity; insurance fund covers about \$9M | **T9.001** |
| 2024-01-03 | dYdX publishes the post-mortem ([The Block](https://www.theblock.co/post/270275/dydx-publishes-post-mortem-9-million-november-attack)) | response |

Key addresses:

- Funding source — [`0xccb6f95b350ca6f9d3285d61a60ea54715a4bc27`](https://etherscan.io/address/0xccb6f95b350ca6f9d3285d61a60ea54715a4bc27)
- Example wallet funded with ETH from it, deposited 22,000 USDC — [`0x4277af66d04cb6a71c83947e2bef6bb4365c190c`](https://etherscan.io/address/0x4277af66d04cb6a71c83947e2bef6bb4365c190c)

## Root-cause evidence

- **Technique:** OAK-T9.001
- **Source:** <https://dydx.exchange/blog/sushi-yfi-incident>; <https://www.theblock.co/post/270275/dydx-publishes-post-mortem-9-million-november-attack>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** The operator's post-mortem describes the mechanism (unrealized profit counted as withdrawable equity, spot buying on other venues, wallet cycling) and the figures. The attacker's identity and the venues used for spot buying are undisclosed.

## Public references

- dYdX, "Post Mortem on SUSHI and YFI Incident" (2024-01): <https://dydx.exchange/blog/sushi-yfi-incident>
- The Block, "DeFi exchange dYdX publishes post-mortem on \$9 million November attack" (2024-01-03): <https://www.theblock.co/post/270275/dydx-publishes-post-mortem-9-million-november-attack>
