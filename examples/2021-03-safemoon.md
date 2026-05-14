# SafeMoon (SFM) token-launch mechanics — BNB Chain — 2021-03

**Loss:** cumulative — SafeMoon's modifiable-tax and liquidity-lock-claim token mechanics were the structural template for the 2021 BSC memecoin wave; the token's transfer-tax design and the operator-controlled "locked" liquidity claims established the pattern that subsequent 2021 BSC token launches replicated. The SEC's November 2023 complaint (`examples/2023-11-safemoon-charges.md`) alleges ~$200M in cumulative misappropriation from the purportedly-locked liquidity across the project's operational window (2021-2023). The 2021 launch mechanics are documented here as the T1-layer structural substrate; the 2023 federal complaint documents the legal aftermath.
**OAK Techniques observed:** **OAK-T1.001** (Modifiable Tax / Anti-sell — the SFM token contract imposed a 10% transfer tax on sellers, with a portion redistributed to existing holders and a portion routed to a team-controlled liquidity wallet; the tax rate was modifiable by the contract owner, and the redistribution mechanic created a structural incentive against selling). **OAK-T2.002** (Locked-Liquidity Spoof — the team publicly claimed liquidity was "locked" while retaining the ability to withdraw from the LP; the canonical T2.002 case, as documented in the SEC's 2023 complaint). **OAK-T17.001** (Cross-Venue Arbitrage-Driven Price-Discovery Distortion — the modifiable transfer-tax mechanism constituted a market-manipulation primitive at the token-contract layer: the 10% seller tax, redistribution-to-holders mechanic, and operator-controlled tax-rate modification distorted natural price discovery by structurally penalising sell-side liquidity while incentivising hold-side demand; the SEC's 2023 complaint characterises the resulting market behaviour as a manipulative scheme, and the T17 tactic page's pump-and-dump cross-reference captures the tokenomics-driven price-distortion surface that SafeMoon's contract mechanics instantiated).
**Attribution:** **pseudonymous** (launch phase). The 2023 federal charges (SEC + DOJ) named CEO John Karony, CTO Thomas Smith, and promoter Kyle Nagy.
**Key teaching point:** **SafeMoon's token-contract mechanics were the structural template for the 2021 BSC memecoin wave.** The combination of modifiable transfer tax (T1.001) and liquidity-lock misrepresentation (T2.002) became the standard playbook replicated by thousands of BSC token launches through 2021-2022.

## Summary

SafeMoon launched in March 2021 on BNB Chain as a memecoin with distinctive tokenomics: a 10% transfer tax that redistributed a portion to existing holders and routed a portion to a team-controlled LP wallet. The team publicly claimed the LP was "locked" while retaining withdrawal authority. The token's market cap briefly exceeded $5B at peak. The SEC and DOJ filed charges in November 2023 alleging the LP claims were fraudulent and the team misappropriated ~$200M. The 2021 launch mechanics (this example) and the 2023 federal complaint (`examples/2023-11-safemoon-charges.md`) together document the full incident lifecycle.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021-03 | SafeMoon token deployed on BNB Chain with modifiable 10% transfer tax and team-controlled LP wallet | **T1.001** (launch) |
| 2021-03 to 2021-04 | Team publicly claims liquidity is "locked"; token market cap surges to >$5B | **T2.002** (misrepresentation) |
| 2021-2023 | Team allegedly misappropriates ~$200M from the LP over operational window | T5 (cumulative extraction) |
| 2023-11 | SEC and DOJ file charges; see `examples/2023-11-safemoon-charges.md` | (legal aftermath) |

## Public references

- `[secsafemoon2023]` — SEC complaint (2023-11-01) detailing the SafeMoon token mechanics and LP misappropriation.
- `[dojsafemoon2023]` — DOJ indictment of SafeMoon executives (2023-11-01).

## Discussion

SafeMoon March 2021 is the canonical T1.001 (Modifiable Tax/Anti-sell) worked example for the 2021 BSC memecoin wave, paired with T2.002 (Locked-Liquidity Spoof) as the structural template. The token's 10% transfer-tax design, holder-redistribution mechanic, and operator-controlled "locked" LP became the most-replicated token-launch template of the 2021 cycle. The case is documented across two OAK examples: this file for the 2021 launch mechanics, and `examples/2023-11-safemoon-charges.md` for the 2023 federal legal action. This example closes the T1×2021 contribution toward the per-tactic minimum threshold at v0.1.
