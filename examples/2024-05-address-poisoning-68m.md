# Address Poisoning — Ethereum — 2024-05-03 (\$68M WBTC, returned)

**Loss:** \~\$68M in WBTC.
**Outcome:** the attacker returned the \~\$68M to the victim approximately six days later, following a public bounty negotiation.
**Operator-campaign net (per Chainalysis):** \~\$1.49M across the broader 66-day campaign, representing a 1,147% ROI on campaign cost.
**OAK Techniques observed:** OAK-T4.003 (Address Poisoning) — primary; **OAK-T6** (Defense Evasion) — modifier: the lookalike-address technique exploits the truncated-display attack surface in wallet UIs, defensively evading the standard "verify-the-address-before-signing" trust workflow that careful holders use as a load-bearing transfer-time control. T4.003 lists OAK-T6 as a secondary parent tactic for exactly this structural reason — the on-chain transfer is authorised by the user; the defense-evasion lives at the wallet-UX layer where the user verification surface is the load-bearing baseline.
**Attribution:** **pseudonymous** — pseudonymous attacker (campaign cluster identifiable via OAK-T8.001 funder-graph methods); no public named-individual attribution.

**Key teaching point:** This case is OAK's modern canonical T4.003 example because the forensic record is complete, the campaign-level metrics are published, and the wallet-UX-layer mitigation is unambiguously the responsible defensive control. Contributors writing other T4.003 examples should preserve the **headline-event vs campaign-context** distinction — \$68M is the single-event loss but \$1.49M is what the operator actually retained, and that gap is the analytical insight defenders need to operationalise wallet-vendor and risk-team T4.003 tooling.

## Summary

On May 3, 2024, a high-balance Ethereum wallet (0x1E227…) initiated a legitimate transfer to a counterparty address (0xd9A1b…) at 09:14 UTC. Later in the day the same victim wallet sent approximately \$68M in WBTC to a poisoned lookalike address (0xd9A1c…) — visually similar to the legitimate counterparty if only the first six characters are checked. Chainalysis's forensic write-up `[chainalysis2024poisoning]` reconstructs the campaign as having been active for approximately 66 days prior to the headline event, during which the operator earned approximately \$1.49M from smaller successful poisonings — a 1,147% ROI on campaign infrastructure cost. Following the headline event, the victim sent a series of on-chain message transactions to the attacker address negotiating return; the attacker returned the full \$68M six days later (May 9, 2024), retaining only the prior-campaign earnings.

For OAK's purposes, this is the canonical T4.003 case because (a) the headline single-victim loss is the largest publicly-documented address-poisoning event, (b) Chainalysis's forensic write-up is published and complete, and (c) the campaign-level ROI metric is a textbook illustration of why operators run sustained poisoning campaigns rather than one-off attacks.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-02-28 | Operator campaign begins (per Chainalysis reconstruction) | T4.003 campaign setup |
| 2024-05-03 ~09:14 | Victim wallet 0x1E227 sends a legitimate transfer to counterparty 0xd9A1b | (legitimate counterparty interaction) |
| 2024-05-03 (later) | Operator front-runs / poisons the victim's wallet history with a lookalike address 0xd9A1c that visually matches 0xd9A1b in the truncated-display attack surface | **T4.003 setup (poisoned history entry)** |
| 2024-05-03 (later) | Victim copies the poisoned address from wallet history and sends \~\$68M in WBTC to 0xd9A1c | **T4.003 extraction** |
| 2024-05-03 onward | Victim sends on-chain message transactions to attacker negotiating return | (recovery) |
| 2024-05-09 | Attacker returns \~\$68M to victim, retains the prior-campaign \~\$1.49M | (resolution) |

## What defenders observed

- **Pre-event (campaign-level):** the operator had been active for approximately 66 days, earning small per-victim amounts via the same lookalike-address pattern. A wallet-vendor or risk-team poisoning-campaign watchlist that had been tracking the operator's spender address would have flagged any inbound transfer from the operator into the headline victim's wallet history weeks before the extraction event.
- **At-event (wallet-UX layer):** the failure mode was the victim copy-pasting an address from wallet history without verifying the *full* address. The truncated-display surface (most wallet UIs show only the first 6 and last 4 characters by default) was the vulnerability that the attacker engineered against. A wallet-UX intervention requiring full-address verification for sends above a threshold would have prevented this single event.
- **Post-event:** the victim's negotiation-via-on-chain-messages and the attacker's return are the recovery layer — unusual for T4.003 cohort overall but observed for headline-magnitude single events where the attacker faces disproportionate legal exposure relative to the prior-campaign earnings.

## What this example tells contributors writing future Technique pages

- **T4.003 detection lives at the wallet UX, not on-chain.** No on-chain authority was granted to the attacker; the victim authorised the transfer themselves. Defender intervention must happen at the wallet UI before the user signs. Contributors writing future T4.003 examples should make the on-chain-vs-UX-layer distinction explicit.
- **Campaign-level ROI is the operator's metric, not single-event loss.** Operators run T4.003 campaigns over weeks-to-months, accruing many small wins; the headline event is the upper tail of the distribution. Risk teams and wallet vendors evaluating T4.003 detection should target the campaign-cluster level rather than the per-event level.
- **Negotiation-via-on-chain-messages is rare but real.** Most T4.003 events do not produce recovery; the headline events occasionally do. Contributors should not characterise post-event recovery as the norm.

## Public references

- `[chainalysis2024poisoning]` — Chainalysis primary forensic write-up (loss size, campaign-level metrics, ROI).
- [The Block — Crypto trader loses \$50 million in address poisoning attack, offers \$1 million bounty for return](https://www.theblock.co/post/383423/crypto-trader-loses-50-million-in-address-poisoning-attack-offers-1-million-bounty-for-return) — companion 2024 case (\~\$50M USDT) demonstrating that the headline-magnitude T4.003 event class is recurring.

## Discussion

This case is OAK's modern canonical T4.003 example because the forensic record is complete, the campaign-level metrics are published, and the wallet-UX-layer mitigation is unambiguously the responsible defensive control. Contributors writing other T4.003 examples should preserve the **headline-event vs campaign-context** distinction — \$68M is the single-event loss but \$1.49M is what the operator actually retained, and that gap is the analytical insight defenders need to operationalise wallet-vendor and risk-team T4.003 tooling.

The Tsuchiya et al. 2025 USENIX Security cohort (`[tsuchiya2025poisoning]`) provides the academic baseline for class scale (\~17.3M poisoning transfers since April 2023). The Chainalysis case study above and the academic cohort are complementary references: contributors writing T4.003 work should cite both for class-scale-and-individual-event grounding.
