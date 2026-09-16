# SpiralCom — the collateral was priced at whatever the pool said in that block, and the attacker owned that block — SpiralCom / Uniswap V4 / Ethereum — 2026-09-14

**Loss:** **10.7 ETH (~\$26,800)**, taken in a **single Ethereum block** on **2026-09-14**. The attacker used **multiple externally-owned accounts** to stage the operation so that price distortion, borrowing and exit all settled atomically within that block. No protocol-wide insolvency was reported and no other integration was named.

**OAK Techniques observed:** **OAK-T9.001** (Oracle Price Manipulation — *primary, confirmed mechanism*. SpiralCom's Uniswap V4 integration valued collateral from the **pool's live spot price**, with **no time-weighted or external reference** and **no deviation bound constraining how far spot could move before being trusted**. The attacker moved the spot price, borrowed against the inflated valuation, and exited. See [`techniques/T9.001-oracle-price-manipulation.md`](../techniques/T9.001-oracle-price-manipulation.md)).

**Explicitly not OAK-T9.002** (Flash-Loan-Enabled Exploit) on the present record. Reporting describes **multiple EOAs inside one block**, not borrowed capital, and no flash-loan leg has been published. The single-block framing is what the two classes share; the capital source is what separates them, and here it appears to have been the attacker's own. If a post-mortem establishes a flash-loan leg, the mapping should gain T9.002.

**Attribution:** **pseudonymous.** On-chain identifiers only; no actor named and no attribution claimed.

**Key teaching point:** **A spot price is not a price, it is the state of one pool at one instant — and in DeFi the attacker chooses the instant.** Reading `slot0` gives an answer that is always current and never independent: it reflects only the trades in that pool, including the ones the reader's counterparty just made. Uniswap V4 changes nothing about this; its hooks and singleton accounting change *how* pools are built, not whether their instantaneous price is manipulable, and a V4 integration that reads spot inherits exactly the failure mode a V2 integration would. The control has been settled practice since 2020 and is three independent parts: **a time-weighted or external reference** rather than instantaneous state, **a deviation bound** that refuses to act when spot and reference disagree beyond a threshold, and **a prohibition on price-dependent state changes completing within the block that moved the price**. This integration had none of the three. The cost of the lesson was small; the reason it was small is the pool's size, not the design.

## Summary

**SpiralCom** valued collateral through a **Uniswap V4** pool. The integration took the **pool's live spot price** directly as the collateral reference, rather than deriving a time-weighted average or cross-checking an external feed. Nothing in the path constrained how far that spot price could move before the protocol was willing to trust it.

On **2026-09-14**, an attacker operating **several externally-owned accounts** distorted the pool's spot price, **borrowed against the inflated collateral valuation**, and exited — **all inside a single Ethereum block**, which is the standard shape for this class because atomicity denies arbitrageurs and automated defences any opportunity to correct the price before the position is realised.

The realised loss was **10.7 ETH**, about **\$26,800**.

## Timeline (2026-09-14)

| When | Event | OAK ref |
|---|---|---|
| (standing) | SpiralCom prices collateral from the **Uniswap V4 pool's live spot price**; no TWAP, no external reference, **no deviation bound** | (latent T9.001 defect) |
| single block | Attacker, across **multiple EOAs**, moves the pool's spot price | **T9.001 — oracle-side distortion** |
| same block | Borrows against the **inflated collateral valuation** | **T9.001 — protocol-side realisation** |
| same block | Exits; price returns; **10.7 ETH (~\$26,800)** realised | (extraction) |

## What defenders observed

- **The thing that made it cheap is the thing that made it possible.** Moving a thin pool's spot price costs little, which is why the attack was worth doing at this scale and why the loss is small. **Pool depth is the price of the exploit and the ceiling on the profit simultaneously** — which means listing a thinly-traded asset against a spot reference is not a small risk that grows with size, it is the same risk at every size.
- **Multiple EOAs in one block is a deliberate shape, not incidental.** Splitting the legs across addresses defeats per-address heuristics that look for one account both moving a price and acting on it. The signal that survives is **per-block, not per-address**: within one block, the same pool was moved and then read as an oracle.
- **Uniswap V4 keeps arriving in incidents as the venue rather than the defect.** This month V4 also appears in the [Safe strategy-executor drain](2026-09-safe-strategy-executor-multicall-self-target-delegatecall-drain.md) as the extraction vehicle, and in the [ether.fi AtomicQueue exploit](2026-09-etherfi-legacy-atomicqueue-solver-access-control-approval-drain.md) as the sale venue. In none of the three is a V4 defect the cause. The recurring fact is that **new liquidity primitives are integrated faster than the integration patterns around them are reviewed**, and a permissionless pool standard makes "which pool" an attacker-chosen parameter in more places than integrators model.
- **Detection is available on the oracle side without any protocol cooperation.** A spot move in one pool that no deeper-liquidity venue reflects is observable from outside the protocol in real time, and it is the first of the two complementary T9.001 signals. Nothing was watching it here.

## Public references

- `[coinfomaniaspiral2026]` — Coinfomania, "SpiralCom Faces 10.7 ETH Loss Due to Uniswap V4 Exploit" (2026-09-14; 10.7 ETH; collateral valued from the pool's live spot price rather than an external or time-weighted reference; multiple EOAs, single block): <https://coinfomania.com/spiralcom-faces-10-7-eth-loss-due-to-uniswap-v4-exploit/>
- `[cryptonomistspiral2026]` — The Cryptonomist, "Uniswap V4 Exploit Exposes Key SpiralCom ETH Loss" (no price limits constraining how far spot could move before being trusted for collateral calculations): <https://en.cryptonomist.ch/2026/09/14/uniswap-v4-exploit-spiralcom/>

## Discussion

Nothing about the mechanism is new, and that is the entire interest of the case. T9.001 has been `stable` in OAK since the corpus began, its canonical anchors date to 2020, and its mitigation — **OAK-M09**, oracle resilience through TWAP windows, multi-venue feeds and deviation circuit breakers — has been settled advice for six years. SpiralCom's integration implemented none of it against the newest available liquidity primitive.

The pattern this belongs to is visible in the corpus: **Moonwell** (2026-08-27) lost money to its price feed for the second time in six months by listing a token thin enough to move by hand, and the **Q1–Q2 2026 oracle and price-manipulation cohort** (Blend Pools V2, Makina, Moonwell, BSC TMM/USDT, ~\$18.6M aggregate) records the same failure repeated across unrelated teams. SpiralCom adds a small, clean instance of it on **V4**, which is worth having precisely because the substrate is new and the bug is not.

The corpus-level reading is unflattering and worth stating plainly: **oracle design is a solved problem that keeps being re-opened at every new integration surface.** Each new AMM version resets the integrator population, and the new population re-derives the same lesson at its own expense. Classifying these incidents as a taxonomy question wastes the observation — the finding is not that a class is missing but that a **known mitigation has a distribution problem**, and the corpus is now a reasonably strong evidence base for saying so.
