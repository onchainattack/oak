# Hardware Wallet Social Engineering — LTC/BTC — 2026-01-10

**Loss:** 2.05M LTC + 1,459 BTC — approximately \$282M — from a single holder. Largest individual crypto theft of 2026 to date.
**OAK Techniques observed:** **OAK-T7.005** (Privacy-Chain Hops) — the laundering leg, and the only leg the record establishes: converted to Monero via multiple instant exchanges, no CEX hop, terminal obfuscation at the privacy chain. **OAK-T7.003** (Cross-Chain Bridge Laundering) — a portion of the BTC bridged to Ethereum, Ripple and Litecoin via Thorchain. **Compromise leg: not mapped.** The prior field claimed T4.007 (Native-app Social Phishing on Engagement-Weighted Platforms) — that Technique's scope is a paid or engagement-weighted *in-platform mechanic* the attacker manipulates to occupy visibility (comment-pinning, reply-ranking), which reaches nothing here: there is no platform, no mechanic, and no established channel. No Technique covers impersonation of a custodial relationship the holder already has; see `TAXONOMY-GAPS.md` § T4.
**Attribution:** **pseudonymous**. ZachXBT records no indication of DPRK involvement. The impersonation channel is not established in the public record — see Summary.

**Key teaching point:** This is the second-largest known social-engineering theft against a single holder (after the $243M Genesis Creditor case) — **and almost nothing about its mechanism is established.** That is the finding. The public record fixes the amount (2.05M LTC + 1,459 BTC), the date, and the laundering route, and fixes nothing else: no source establishes whether the victim disclosed recovery material or was walked through signing the transfers themselves; no source establishes the impersonation channel (voice, email, chat); no source establishes whether the holder was an individual or a company. A theft of this size with a mechanism this unresolved is the cleanest available illustration of the corpus's limit — the ledger renders the *movement* of money in total detail and says nothing about the room where it was decided.

## Summary

On January 10, 2026, at approximately 23:00 UTC, a holder lost 2.05 million LTC and 1,459 BTC — roughly \$282M — in what ZachXBT characterised as a hardware-wallet social-engineering scam. It is the largest individual crypto theft of 2026 to date and surpasses the previous single-holder record, the \$243M Genesis Creditor case of August 2024.

**What is established:** the amounts; the date and approximate time; that the loss followed social engineering rather than a firmware, software, or protocol compromise; the laundering route (converted to Monero via multiple instant exchanges, with a portion of the BTC bridged to Ethereum, Ripple and Litecoin via Thorchain); and ZachXBT's assessment that there is no indication of DPRK involvement.

**What is not established, and should not be asserted:** the mechanism. Contemporaneous reporting (CoinDesk, The Defiant) explicitly declines to say whether the victim revealed a seed or recovery phrase or was persuaded to approve transfers that appeared legitimate — the two mechanisms have different mitigations, and the difference is not resolvable from the public record. The impersonation channel is likewise unestablished. CoinDesk records that "it remains unclear whether the victim was a sole crypto holder or a company."

The laundering is the one leg the record renders in full, and it is legible because of the size: converting a sum this large into Monero through instant exchanges moved XMR roughly 70% over the four days following the theft. The market for the exit liquidity spiked hard enough to be visible from outside — a theft large enough to be inferred from the price of an unrelated asset.

**Prior versions of this file asserted that the attacker "impersonated hardware wallet support, tricking the victim into revealing recovery information."** No public source supports that specificity. It has been corrected to what the record carries.

What the case does establish is the boundary of hardware as a control: no firmware was compromised and no protocol failed. Whatever happened, happened at the human layer, and a device that is secure against remote software attack offers nothing there. That much holds without needing to resolve the mechanism.

The incident surfaced when ZachXBT detected the on-chain movements — not from a victim report.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| Pre-incident | Attacker identifies high-net-worth target with known hardware wallet usage | (targeting) |
| 2026-01-10 ~23:00 UTC | Social-engineering compromise. **Mechanism and channel not established** — the record does not distinguish disclosed recovery material from holder-signed transfers | (unmapped — see TAXONOMY-GAPS) |
| 2026-01-10 ~23:00+ | 2.05M LTC + 1,459 BTC transferred to attacker-controlled addresses | (extraction) |
| 2026-01-10 onward | Converted to XMR via multiple instant exchanges; portion of BTC bridged to ETH / XRP / LTC via Thorchain | **T7.005** (Privacy-Chain Hops), **T7.003** (Cross-Chain Bridge Laundering) |
| 2026-01-10 — 2026-01-14 | XMR rises ~70% over four days as the market absorbs the conversion flow | (scale artefact) |

## What defenders observed

- **Pre-incident:** The victim held large balances in addresses that had been dormant — a high-net-worth target signature. Dormant large-balance addresses are identifiable on-chain, making their owners potential targets.
- **During incident:** no smart-contract vulnerability, no protocol exploit, no firmware compromise. Every system in the chain worked as specified. Beyond that the record is silent: whether the compromise ran through disclosed recovery material or through transfers the holder was walked into signing is **not established**, and the two carry different mitigations.
- **Post-incident:** Unauthorized transfers from long-dormant addresses are a retrospective detection signal. Large transfers from addresses dormant for months/years are statistically anomalous.

## What this example tells contributors

- **Report the mechanism you can source, not the one the shape suggests.** This file previously asserted seed-disclosure as fact; no public source establishes it. The pull toward a specific mechanism is strong precisely when the incident is large and the record is thin, and that is when it should be resisted. Where a mechanism is unresolved, the honest entry says so and remains useful — the amount, the date, the laundering route and the absence of any technical compromise are all real findings.
- **Where the ledger stops.** The laundering leg is documented in full and the decision leg is a blank. That asymmetry is structural, not a gap in effort: the chain records the movement of value and nothing about the room where a person was persuaded. Any claim about that room needs a source outside the chain, and here there is none.
- **Dormant large-balance addresses are a target selection signal.** Attackers can identify high-net-worth individuals by scanning the UTXO set for large dormant balances. The transparency of the ledger is a targeting tool.
- **Detection is primarily pre-incident**, and on-chain monitoring is post-hoc by construction. Which pre-incident control would have applied here cannot be stated, because the mechanism is unresolved: [`OAK-M44`](../mitigations/OAK-M44-seed-phrase-disclosure-refusal.md) reaches a disclosure case and [`OAK-M45`](../mitigations/OAK-M45-inbound-contact-refusal.md) reaches an inbound-channel case, and the record does not say which this was.

## Public references

- [ZachXBT — original disclosure (X)](https://x.com/zachxbt/status/2012212936735912351) — amounts, date, the XMR conversion via instant exchanges, the Thorchain bridging.
- [CoinDesk — "Hacker steals \$282 million crypto from a victim in social-engineering attack" (2026-01-16)](https://www.coindesk.com/business/2026/01/16/hacker-steals-usd282-milion-in-hardware-wallet-social-engineering-attack) — 2.05M LTC / 1,459 BTC; XMR +70% over four days; **explicitly records that it is unclear whether the victim was a sole holder or a company**; no DPRK indication.
- [The Defiant — "ZachXBT Highlights \$282M Theft of Bitcoin and Litecoin in Hardware Wallet Scam"](https://thedefiant.io/news/defi/zachxbt-highlights-usd282m-theft-of-bitcoin-and-litecoin-in-hardware-wallet-scam) — corroborates amounts and route; likewise does not establish the mechanism.
- Cross-reference: [`examples/2024-08-genesis-creditor-social-engineering.md`](2024-08-genesis-creditor-social-engineering.md) — the prior single-holder record (\$243M) and, unlike this case, an incident whose mechanism, channel and principals are all established.
