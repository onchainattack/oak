# Ronin Bridge — Ethereum ↔ Ronin sidechain — 2022-03-23

**Loss:** \~\$625M (\~173,600 ETH and \~25.5M USDC at the time of the event).
**OAK Techniques observed:** OAK-T10.001 (Validator / Signer Key Compromise) — primary; OAK-T7.001 (Mixer-Routed Hop) — downstream laundering; OAK-T8.001 (Common-Funder Cluster Reuse) — operator continuity.
**OAK-Gnn:** [OAK-G01 Lazarus Group / DPRK-attributed](../actors/OAK-G01-lazarus.md). **Confirmed** attribution: FBI public statement (April 2022), U.S. Treasury OFAC update of Lazarus Group sanctions list with the attacker wallet address.

## Summary

On March 23, 2022, attackers obtained the private cryptographic keys to five of the nine validator nodes that authorised asset movements out of the Ronin Bridge. Once threshold authority was held, a single transaction (technically two transactions) drained \~173,600 ETH and \~25.5M USDC from the bridge — approximately \$625M at the time. The hack remained undetected for six days, becoming public only on March 29 when a user reported being unable to withdraw 5,000 ETH and the operator (Sky Mavis) investigated.

The entry vector was social engineering against a Sky Mavis engineer: a fake job offer delivered via LinkedIn, followed by a malware-laden PDF "interview package" that compromised the targeted employee's workstation and ultimately Sky Mavis's IT infrastructure. The attacker then escalated to validator key access. The proceeds were extensively laundered through Tornado Cash; per public reporting, more than \$468M of the funds passed through Tornado Cash before downstream cross-chain laundering took over.

The FBI publicly attributed the attack to Lazarus Group / APT38 (DPRK-affiliated cyber actors) in April 2022 — one of the earliest public bridge-incident attributions to the DPRK and a foundational data point for the OAK-G01 attribution profile.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-event (months prior) | LinkedIn-delivered fake-job-offer phishing of Sky Mavis engineer; malware payload via PDF | (off-chain entry vector — out of OAK on-chain Tactic scope; documented under OAK-G01) |
| Pre-event | Lateral movement inside Sky Mavis infrastructure leading to validator key access | (off-chain) |
| 2022-03-23 | Two on-chain transactions drain \~173,600 ETH and \~25.5M USDC from Ronin Bridge | **T10.001 extraction** |
| 2022-03-23 to ~03-29 | Hack undetected; user reports inability to withdraw 5,000 ETH, triggering investigation | (visibility gap — operational lesson) |
| 2022-03-29 | Sky Mavis publicly discloses the incident | — |
| 2022-04-14 | FBI public statement attributing to Lazarus Group / APT38; U.S. Treasury updates OFAC Lazarus designation with attacker address | **G01 confirmed attribution** |
| Ongoing | Stolen USDC swapped to ETH on DEXes (avoid CEX KYC); ETH laundered through Tornado Cash | **T7.001** |

## What defenders observed

- **Pre-event (off-chain):** the LinkedIn vector targeting engineering personnel at exchanges, bridges, and DeFi infrastructure had been the dominant Lazarus entry vector since approximately 2020. Defender intelligence on the campaign existed in isolated reports but was not yet consolidated as the operational pattern it now is.
- **Pre-event (on-chain):** Ronin Bridge used a 5-of-9 validator threshold. With 5 of 9 keys compromised, the threshold-signing event for the extraction transaction was indistinguishable from a legitimate operator-authorised transfer. The pre-event signal was off-chain (compromise indicators), not on-chain.
- **At-event:** the extraction transaction was a single bridge-authorisation event of unusually large magnitude; per published reporting Ronin's monitoring did not flag it in real time.
- **Post-event:** the six-day visibility gap is one of the most-cited operational lessons from the incident — bridge operators now broadly publish per-transaction monitoring postures that would surface a six-day-undetected outflow.

## What this example tells contributors writing future Technique pages

- **T10.001 detection lives off-chain.** The on-chain manifestation of a compromised-validator-set event is indistinguishable from a legitimate authorised transfer. The defender's signal is in the off-chain telemetry (phishing campaign indicators, supply-chain compromise detection at validator-operator personnel) and in the post-event monitoring posture that catches "this transaction is large but legitimate-looking and went undetected for too long".
- **OAK-G01 attribution is a force multiplier.** Attributing Ronin to Lazarus / G01 is what makes the LinkedIn-vector preventable for the next bridge — the entry vector is now an industry-known indicator. Examples should make the off-chain-vector → G01-attribution chain explicit so defenders can apply the lesson.
- **Six-day-undetected is an operational tell.** Future T10.001 examples should call out detection latency — it is one of the most actionable operational lessons.

## Public references

- `[ellipticronin2022]` — Elliptic primary forensic write-up (loss size, validator-key vector, Tornado Cash laundering).
- [Coindesk — US Officials Tie North Korea's 'Lazarus' Hackers to \$625M Hack](https://www.coindesk.com/policy/2022/04/14/us-officials-tie-north-korean-hacker-group-to-axies-ronin-exploit) — FBI / Treasury attribution announcement.
- `[chainalysis2024dprk]` — broader DPRK-attributed scale context.

## Discussion

Ronin is OAK's canonical T10.001 example because the social-engineering entry vector, the on-chain extraction shape, the laundering route, and the regulatory attribution are all on the public record at high confidence. The case became the basis on which subsequent DPRK bridge-targeting incidents (Harmony Horizon June 2022, and arguably Bybit Feb 2025 in its supply-chain-compromise structure) were attributed within days rather than months — once a defender community has a stable Group profile, the marginal attribution latency drops sharply.

Contributors writing future bridge cases should:

- Preserve the distinction between off-chain entry vector (catalogued under OAK-G01) and on-chain manifestation (catalogued under T10.001).
- Include detection-latency as a reportable metric: how long from extraction to public disclosure?
- Note operator-side monitoring posture changes (or lack thereof) as a defensive-baseline signal for the next incident.
