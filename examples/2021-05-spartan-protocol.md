# Spartan Protocol AMM-LP-pricing exploit — BNB Smart Chain — 2021-05-02

**Loss:** approximately $30M from Spartan Protocol's SPARTA-WBNB AMM pool.
**OAK Techniques observed:** **OAK-T9.001** (Oracle Price Manipulation — LP-share-pricing virtual-price subclass) + **OAK-T9.002** (Flash-Loan-Enabled Exploit — flash-loan precondition acquired via PancakeSwap).
**Attribution:** **pseudonymous-unattributed**; no recovery; the protocol continued operating in a substantially-reduced-capital state and was not subsequently re-launched at scale.
**Key teaching point:** **AMM LP-share pricing computed from real-time pool reserves is a flash-loan-vulnerable pricing input** — the same underlying class as the canonical Saddle Finance April 2022 (`examples/2022-04-saddle-finance.md`) and the Curve-fork virtual-price family. Spartan Protocol is the foundational early-2021 BSC DeFi worked example for the LP-share-virtual-price-as-implicit-oracle subclass and is canonical for the proposition that **early-DeFi forks of Uniswap-style AMM mathematics did not bind LP-share pricing against flash-loan-driven imbalance** by default.

## Summary

Spartan Protocol is a BNB Smart Chain AMM that issued LP shares (SPARTA-WBNB liquidity-position tokens) whose redemption value was computed from the real-time SPARTA and WBNB reserve balances of the pool. On May 2, 2021, an attacker used a PancakeSwap flash loan to manipulate the SPARTA-WBNB pool reserves into a transient imbalance, redeemed LP-share tokens at the inflated computed-value, and extracted approximately $30M before the price impact reverted on closing the flash loan.

The exploit's defining technical feature is that the LP-share-redemption pricing function used the **post-trade pool reserves** (rather than a TWAP or a deviation-bounded snapshot), so a flash-loan-funded large trade temporarily inflated the per-LP-share computed-value, which the attacker captured by redeeming an LP position acquired pre-trade at the lower computed-value. The same mathematical structure recurs at Saddle Finance in April 2022 and at Inverse Finance June 2022 (`examples/2022-04-inverse-finance.md`); Spartan Protocol is the foundational canonical case for the LP-share-virtual-price-as-implicit-oracle subclass of T9.001.

For OAK's purposes the case is the canonical early-2021 BSC DeFi worked example for the LP-share-virtual-price subclass and a useful pairing with Pancake Bunny May 2021 (yield-aggregator-mint-pricing subclass) and EasyFi April 2021 (admin-key-compromise + mint-and-dump) to give the May-2021 BSC DeFi exploit cohort a three-incident structural articulation.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021-05-02 ~04:30 UTC | Attacker acquires flash loan on PancakeSwap (~$60M+ BNB) | T9.002 (precondition) |
| 2021-05-02 ~04:31 UTC | Attacker drives a large SPARTA-WBNB swap, transiently inflating per-LP-share computed-value | T9.001 (manipulation) |
| 2021-05-02 ~04:31 UTC | Attacker redeems pre-acquired LP shares at inflated computed-value; extracts ~$30M | T9.001 (extraction) |
| 2021-05-02 ~04:31 UTC | Attacker closes flash loan; pool reserves revert; net extraction realised | T9.002 (close) |
| 2021-05-02 ~05:00 UTC onwards | Industry forensic posts (PeckShield, BlockSec, SlowMist) publish on-chain trace and root-cause analysis | (forensic record) |
| 2021-05-02 to 2021-05-03 | Spartan Protocol operator team disclosure and post-incident statement | (operator response) |
| 2021-05 onward | Spartan Protocol continues operating in substantially-reduced-capital state; no recovery; no major re-launch | (long-term outcome) |

## What defenders observed

- **Pre-event (no LP-share-pricing-monitor).** No public-record indication of pre-event monitoring of LP-share-pricing manipulation; defenders monitoring BSC DeFi protocols in early 2021 did not have widely-deployed flash-loan-detection-and-LP-share-pricing-anomaly tooling.
- **At-event (rapid forensic identification).** PeckShield + BlockSec + SlowMist published function-level on-chain traces within hours of the event; the LP-share-virtual-price-as-implicit-oracle subclass was identifiable from the on-chain trace alone within the same-day window.
- **Post-event (no recovery).** Spartan Protocol did not produce a recovery-via-negotiation outcome of the type that became more common in the later-2022-onward period (Euler 2023, Tapioca 2024, Curio 2024). The May 2021 BSC DeFi cohort precedes the on-chain-message-channel-negotiation operating norm.

## What this example tells contributors writing future Technique pages

- **AMM LP-share pricing is itself a flash-loan-vulnerable pricing input.** Future T9.001 contributions should explicitly enumerate LP-share-virtual-price as a sub-class alongside thin-input price-feed manipulation, single-input-feed manipulation, and PMM-curve manipulation. The AMM-substrate-as-implicit-oracle framing is the load-bearing structural observation.
- **Early-2021 BSC DeFi was a canonical fork-substrate-vulnerability cohort.** The May-2021 BSC DeFi exploit cohort (Spartan May 2, Pancake Bunny May 19, EasyFi April 19) was a high-frequency cohort of structurally-similar fork-substrate vulnerabilities exploited on a relatively-new chain that lacked the watcher-network and cohort-graph-monitoring infrastructure that became common on Ethereum mainnet by 2022. Future Technique contributions should treat early-stage-chain-rollout as a recurring high-vulnerability cohort context.
- **The on-chain-message-channel-negotiation operating norm is post-2021.** Spartan Protocol did not produce a negotiation outcome; the convention only emerges with Euler Finance March 2023 and the subsequent Tapioca / Cetus / Thala / Resupply cases. Future T9.x contributions should distinguish pre-2022 cases (no negotiation norm) from post-2022 cases (negotiation norm operates).

## Public references

- Spartan Protocol operator post-incident statement — `[spartanpostmortem2021]`.
- PeckShield on-chain trace — `[peckshieldspartan2021]`.
- BlockSec function-level walkthrough — `[blocksecspartan2021]`.
- SlowMist incident analysis — `[slowmistspartan2021]`.
- Halborn defender-oriented post-mortem — `[halbornspartan2021]`.
- Rekt News public-facing summary — `[rektspartan2021]`.

## Citations

- `[spartanpostmortem2021]` — Spartan Protocol operator-side post-incident statement; primary source for the LP-share-virtual-price root cause.
- `[peckshieldspartan2021]` — PeckShield on-chain trace.
- `[blocksecspartan2021]` — BlockSec function-level walkthrough.
- `[slowmistspartan2021]` — SlowMist incident analysis.
- `[halbornspartan2021]` — Halborn defender-oriented post-mortem.
- `[rektspartan2021]` — Rekt News public-facing summary.
- `[zhou2023sok]` — academic taxonomy classifying this as a flash-loan-enabled oracle-manipulation chain against an AMM-substrate-implicit-oracle.

## Discussion

Spartan Protocol is the foundational BSC DeFi worked example for the **LP-share-virtual-price-as-implicit-oracle** subclass of T9.001 and a canonical anchor for the May-2021 BSC DeFi exploit cohort. The case pairs structurally with Saddle Finance April 2022 (pool-composition-virtual-price subclass) and Inverse Finance June 2022 (LP-token-Yearn-Curve-derived-price subclass) to give T9.001 a three-case AMM-substrate-implicit-oracle subclass-set spanning approximately one year of incident evolution.

The May-2021 BSC DeFi cohort framing (Spartan May 2 + Pancake Bunny May 19 + EasyFi April 19) is a high-density cohort of structurally-distinct vulnerabilities all exploited within ~30 days on a relatively-new chain rollout. Defenders writing operator-cohort-attribution for early-stage-chain rollouts should treat the cohort as a recurring framework-level pattern: a new chain attracts AMM and lending-protocol forks ported with minimal fork-substrate-vulnerability audit, and produces a high-frequency exploit cohort within the first ~12 months of substantial TVL.

The lack of a recovery-via-negotiation outcome is itself a useful pre-2022 framework-level observation; the on-chain-message-channel-negotiation operating norm post-Euler-2023 is a substantial structural change in operator-vs-attacker dynamics that did not exist in the May-2021 BSC DeFi cohort. Future contributions should treat this temporal evolution as a load-bearing variable when comparing recovery outcomes across pre-2022 vs post-2022 worked examples.
