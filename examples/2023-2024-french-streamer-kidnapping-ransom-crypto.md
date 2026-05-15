# TeufeurS Kidnapping — $2M Crypto Ransom / $800K Frozen — 2023

**Loss:** $2M crypto ransom paid after family member kidnapped in France. $800K frozen with Binance Security team assistance. Six suspects tied to the crime.
**OAK Techniques observed:** OAK-T5 (Asset Drain — Ransom) — physical extortion via kidnapping with crypto ransom demand; OAK-T7 (Laundering) — ransom payment tracing and exchange freeze.
**Attribution:** **confirmed** — six suspects tied to the kidnapping. ZachXBT led tracing efforts resulting in $800K freeze with Binance Security.

**Key teaching point:** The TeufeurS case demonstrates the **physical-extortion-to-crypto-ransom** pattern: a kidnapping in physical space (France) generates a crypto ransom payment on-chain. The crypto trail is the detection surface — even when the predicate crime is physical (kidnapping), the ransom payment exists on-chain and can be traced, frozen, and used to identify suspects. Detection approach: when a kidnapping involves crypto ransom, every exchange that receives ransom funds is a freeze point; rapid reporting to exchange security teams within hours of payment is the critical time window — before the funds are withdrawn or converted to privacy coins.

## Summary

In late 2023, French streamer TeufeurS was extorted for a crypto ransom after a family member was kidnapped in France. A $2M ransom was paid in cryptocurrency.

ZachXBT led tracing efforts on the ransom payment, working with the Binance Security team. $800K of the $2M was successfully frozen. Six suspects tied to the kidnapping were identified.

The case bridges physical crime and crypto tracing: the threat actors operated in physical space (kidnapping in France), but the ransom was demanded and paid in cryptocurrency, creating an on-chain trail. The exchange freeze (Binance) was the interception point.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2023 (late) | Family member of French streamer TeufeurS kidnapped in France. $2M crypto ransom demanded | **T5 extortion / ransom** |
| 2023 (late) | $2M ransom paid in crypto | **T5 ransom payment** |
| 2023-2024 | ZachXBT traces ransom funds. $800K frozen with Binance Security | **T7 tracing + freeze** |
| 2024-2026 | Six suspects tied to the kidnapping identified | (attribution) |
| 2026-04-22 | ZachXBT publicly discloses case after investigation concludes | (public disclosure) |

## What defenders observed

- **Physical crime → crypto ransom → on-chain trail.** The kidnapping itself left no crypto trail, but the ransom payment did. The attackers had to provide a crypto address to receive payment — that address became the entire tracing surface.
- **Exchange freeze within the critical window.** $800K (40% of ransom) was frozen because tracing happened fast enough that funds were still at Binance. The freeze window between ransom payment and fund withdrawal/laundering is measured in hours.
- **Suspect identification through exchange KYC.** Six suspects were tied to the crime through the exchange accounts that received the ransom. Exchange KYC (identity verification) was the attribution bridge from on-chain addresses to physical identities.

## What this example tells contributors

- **Physical extortion with crypto ransom is a T5 sub-type.** Unlike purely digital extortion (ransomware), kidnapping involves physical violence or threat of violence. OAK T5 should distinguish "physical extortion ransom" from "digital extortion ransom" — the reporting channels and response urgency are different (immediate physical danger vs. data/system lockout).
- **Rapid exchange reporting is the critical success factor for ransom freezes.** The 40% freeze rate ($800K/$2M) was achieved because Binance Security was engaged while funds were still on the exchange. The detection-to-reporting latency determines the freeze percentage.
- **Kidnapping + crypto = dual-jurisdiction investigation.** The kidnapping is prosecuted in France (physical jurisdiction), while the crypto tracing involves exchanges in multiple jurisdictions. Cross-jurisdictional coordination is inherent to these cases.

## Public references

- [ZachXBT — TeufeurS Kidnapping / $800K Frozen (X/Twitter)](https://x.com/zachxbt/status/2046911569532231725)
- Victim: TeufeurS (French streamer). $2M ransom paid.
- $800K frozen with Binance Security. Six suspects identified.
