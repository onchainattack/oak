# PancakeBunny yield-aggregator mint-pricing exploit — BNB Smart Chain — 2021-05-19

**Loss:** approximately $45M (~697,000 BUNNY tokens minted-and-dumped).
**OAK Techniques observed:** **OAK-T9.001** (Oracle Price Manipulation — yield-aggregator-mint-pricing subclass) + **OAK-T9.002** (Flash-Loan-Enabled Exploit) + **OAK-T5.001** (Hard LP Drain — downstream BUNNY-to-WBNB liquidity dump).
**Attribution:** **pseudonymous-unattributed**; no recovery; the BUNNY token never recovered to pre-event pricing.
**Key teaching point:** **Yield-aggregator mint-reward pricing computed from real-time pool reserves is a flash-loan-vulnerable pricing surface** — the user-incentive function (BUNNY-mint-rate proportional to user-deposit-value-in-pool) becomes an extraction surface when the value-in-pool computation uses post-trade reserves rather than TWAP. PancakeBunny is the canonical foundational worked example for the yield-aggregator-mint-pricing subclass and pairs with Spartan Protocol May 2, 2021 (LP-share-virtual-price subclass) to give the May-2021 BSC DeFi cohort articulated subclass coverage.

## Summary

PancakeBunny is a BNB Smart Chain yield-aggregator that auto-compounded PancakeSwap LP positions and rewarded depositors with BUNNY tokens proportional to their deposit-value-in-pool. The mint-rate pricing function used the **post-trade USDT-WBNB and BUNNY-WBNB pool reserves** to compute the deposit-value, so a flash-loan-funded large trade against the pool transiently inflated the computed deposit-value and generated a transiently-large BUNNY mint reward to the attacker.

On May 19, 2021 an attacker used a series of PancakeSwap flash loans to manipulate the USDT-BNB and BUNNY-BNB pool reserves, deposited and withdrew from PancakeBunny vaults at the manipulated computed-value, claimed approximately 697,000 BUNNY tokens of mint-reward (a ~$45M nominal value pre-dump), and dumped the BUNNY into the BUNNY-WBNB liquidity pool, crashing the BUNNY price by approximately 95% in a single block.

The realised economic loss is debated between the $45M nominal mint figure and a substantially-smaller realised-extracted-value figure post-dump-price-impact, with industry forensic posts converging on approximately $13.7M in realised extracted value after price-impact and approximately $30M+ in cumulative-protocol-and-holder economic damage. PancakeBunny did not produce a recovery-via-negotiation outcome and the protocol substantially-permanently-reduced-capital after the event.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021-05-19 ~16:00 UTC | Attacker initiates a series of PancakeSwap flash loans against USDT-WBNB and BUNNY-WBNB pools | T9.002 (precondition) |
| 2021-05-19 ~16:00 UTC | Attacker deposits-and-withdraws against PancakeBunny vaults at manipulated computed-deposit-value; receives ~697,000 BUNNY mint-reward | T9.001 (manipulation + extraction) |
| 2021-05-19 ~16:00 UTC | Attacker dumps minted BUNNY into BUNNY-WBNB pool; price drops ~95% in a single block | T5.001 (downstream dump) |
| 2021-05-19 ~16:00 UTC | Attacker closes flash loans; net extraction realised | T9.002 (close) |
| 2021-05-19 to 2021-05-20 | Industry forensic posts publish on-chain trace and root-cause analysis | (forensic record) |
| 2021-05-20 onward | PancakeBunny operator team disclosure; subsequent recovery-token issuance via "pBUNNY" but no return to pre-event pricing | (operator response; no real recovery) |

## What defenders observed

- **Pre-event (no mint-reward-pricing-monitor).** No public-record indication of pre-event monitoring of yield-aggregator mint-reward pricing manipulation; the yield-aggregator-mint-pricing subclass had not been the subject of a major precedent case before PancakeBunny, so defender attention was elsewhere.
- **At-event (rapid forensic identification).** PeckShield, BlockSec, SlowMist, and Halborn published function-level on-chain traces within hours of the event; the yield-aggregator-mint-pricing subclass was identifiable from the on-chain trace alone within the same-day window.
- **Post-event (no recovery).** PancakeBunny issued a recovery "pBUNNY" token via airdrop to pre-event holders but the operator did not produce a meaningful recovery-via-negotiation; the protocol did not return to pre-event TVL.

## What this example tells contributors writing future Technique pages

- **Yield-aggregator mint-reward pricing is a discrete attack surface within T9.001.** Future T9.001 contributions should explicitly enumerate yield-aggregator-mint-pricing alongside LP-share-virtual-price (Spartan / Saddle / Inverse), thin-input price-feed manipulation (BonqDAO / Mango), single-input-feed manipulation (Mango / KiloEx), and PMM-curve manipulation (WOOFi).
- **The user-incentive function as an extraction surface is a structural class.** Defenders auditing yield-aggregators and similar incentivised-deposit protocols should treat the user-incentive function (mint-rate, reward-multiplier, etc.) as a discrete attack surface composing with the underlying pricing-function attack surface.
- **The pre-2022 no-negotiation-norm operating context applies (cf Spartan Protocol May 2021).** PancakeBunny did not produce a negotiation outcome; the on-chain-message-channel-negotiation norm post-Euler-2023 is a structural improvement that did not exist for May-2021 cases.

## Public references

- PancakeBunny operator-side post-incident statement — `[bunnypostmortem2021]`.
- PeckShield on-chain trace — `[peckshieldbunny2021]`.
- BlockSec function-level walkthrough — `[blocksecbunny2021]`.
- SlowMist incident analysis — `[slowmistbunny2021]`.
- Halborn defender-oriented post-mortem — `[halbornbunny2021]`.
- Rekt News public-facing summary — `[rektbunny2021]`.

## Citations

- `[bunnypostmortem2021]` — PancakeBunny operator-side post-incident statement; primary source for the yield-aggregator-mint-pricing root cause.
- `[peckshieldbunny2021]` — PeckShield on-chain trace.
- `[blocksecbunny2021]` — BlockSec function-level walkthrough.
- `[slowmistbunny2021]` — SlowMist incident analysis.
- `[halbornbunny2021]` — Halborn defender-oriented post-mortem.
- `[rektbunny2021]` — Rekt News public-facing summary.
- `[zhou2023sok]` — academic taxonomy classifying this as a flash-loan-enabled oracle-manipulation chain against a yield-aggregator-mint-pricing subclass.

## Discussion

PancakeBunny is the canonical foundational worked example for the **yield-aggregator-mint-pricing** subclass of T9.001 and a canonical anchor for the May-2021 BSC DeFi exploit cohort. The yield-aggregator-mint-pricing subclass recurs at multiple later cases (Cream Finance October 2021 incident in `examples/2021-10-cream-finance.md` has a related but distinct mechanism, and several smaller mid-2021 BSC yield-aggregator cases share the structural pattern); PancakeBunny is the foundational reference.

The cohort pairing with Spartan Protocol May 2 and EasyFi April 19 gives the May-2021 BSC DeFi exploit cohort a three-case structural articulation across three distinct subclasses (LP-share-virtual-price + yield-aggregator-mint-pricing + admin-key-compromise + mint-and-dump). Future contributions documenting BSC-2021 incidents should treat this cohort as a high-density attack-surface enumeration period.

The user-incentive-function-as-extraction-surface framing generalises beyond PancakeBunny to a broader class of incentivised-deposit protocol designs where the reward-rate computation uses real-time pool state. Defenders auditing such designs should explicitly include the reward-rate-pricing function in the flash-loan-vulnerability audit pass and require TWAP-or-deviation-bounded snapshots for any pricing input that flash-loan extraction can transiently manipulate.
