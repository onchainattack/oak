# CoinsPaid $37M Lazarus Group Attack — Payment Processor Exploit — 2024-01

**Loss:** $37M+ stolen from CoinsPaid, a crypto payment processor. Attributed to Lazarus Group (OAK-G01).
**OAK Techniques observed:** OAK-T15.001/OAK-T15.003 (Social Engineering / Operator Endpoint Compromise) — Lazarus operators used fake-job-offer social engineering to compromise CoinsPaid employee workstations over ~6 months; OAK-T11.001 (Third-Party Signing Vendor Compromise) — access to CoinsPaid's hot-wallet signing infrastructure via compromised employee endpoints; OAK-T7.003 (Cross-Chain Bridge Laundering) — Lazarus laundered proceeds through cross-chain bridges.
**OAK-Gnn:** [OAK-G01 Lazarus Group / DPRK-attributed](../actors/OAK-G01-lazarus.md).
**Attribution:** **confirmed** — FBI attributed the attack to Lazarus Group (TraderTraitor cluster / OAK-G01) in a January 2024 statement. The attack shared TTPs with the broader Lazarus fake-job-offer campaign documented in CISA AA22-108A.

**Key teaching point:** The CoinsPaid attack demonstrates the **multi-month operator-endpoint compromise → hot-wallet drain** pattern executed by Lazarus Group: the attacker infiltrated CoinsPaid over approximately 6 months, using fake-job-offer social engineering (LinkedIn lures posing as recruiters, targeting engineering and finance staff with trojanized interview-screening applications) to compromise internal workstations. From those endpoints, the attacker pivoted to CoinsPaid's hot-wallet signing infrastructure and drained $37M. The pre-extraction dwell time (6 months) is the critical detection gap: the attacker was inside the network for half a year before the extraction event. Detection approach: operator-side endpoint monitoring for fake-recruiter LinkedIn contacts + trojanized application execution; hot-wallet signing anomaly detection (volume, destination, timing deviations from operational baseline).

## Summary

In January 2024, CoinsPaid — an Estonia-based cryptocurrency payment processor processing ~$7B annually — was exploited for $37M+. The FBI attributed the attack to Lazarus Group's TraderTraitor cluster (OAK-G01).

The attack followed the canonical Lazarus T15 pattern:

1. **Initial access (~mid-2023):** Lazarus operators contacted CoinsPaid employees via LinkedIn under fake-recruiter personas, offering job opportunities. The social-engineering pretext was a developer-position interview process that required downloading and running a screening application.
2. **Endpoint compromise (Jul-Dec 2023):** Employees who downloaded and ran the trojanized screening application had their workstations compromised. The malware (consistent with the TraderTraitor family documented in CISA AA22-108A) established persistent access.
3. **Lateral movement (Jul 2023-Jan 2024):** From compromised endpoints, the attacker pivoted to internal systems with access to CoinsPaid's hot-wallet signing infrastructure.
4. **Extraction (Jan 2024):** The attacker initiated unauthorized transactions from CoinsPaid's hot wallets, draining ~$37M in crypto assets.
5. **Laundering (Jan 2024 onward):** Proceeds routed through cross-chain bridges and instant exchanges — the post-Tornado-Cash Lazarus laundering rail.

This was the second major attack on CoinsPaid: a previous attempt in July 2023 (~$3M+) was also attributed to Lazarus Group, making CoinsPaid one of the few entities targeted twice by the same threat actor cluster within a 6-month window.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| ~2023-07 | First Lazarus attack on CoinsPaid (~$3M+) | **T15 initial attempt** |
| 2023-07 - 2024-01 | ~6 months dwell time: operator endpoint compromise via fake-recruiter social engineering | **T15.001/T15.003** |
| 2024-01 | $37M drained from CoinsPaid hot wallets | **T11.001 extraction** |
| 2024-01-24 | FBI attributes attack to Lazarus Group (TraderTraitor) | (public attribution) |
| 2024-01 onward | Proceeds laundered through cross-chain bridges | **T7.003 laundering** |

## What defenders observed

- **Six-month dwell time before extraction.** The attacker prioritized stealth over speed — compromising endpoints, mapping internal systems, and waiting for an extraction opportunity. A six-month dwell time is consistent with Lazarus operational discipline: the extraction is the final step after a sustained internal reconnaissance-and-positioning phase.
- **Second attack on same target within 6 months.** The July 2023 (~$3M) and January 2024 ($37M) attacks on CoinsPaid suggest the attacker maintained access between incidents or re-compromised the target after the first remediation. Same-target re-attack is a Lazarus signature observed across the KuCoin (2020), CoinsPaid (2023-2024), and DMM Bitcoin (2024) cases.
- **Fake-recruiter social-engineering as the canonical G01 entry vector.** The CISA AA22-108A advisory (April 2022) documented the fake-recruiter-on-LinkedIn TTP for the TraderTraitor cluster. CoinsPaid confirmed that this was the entry vector for the January 2024 attack, validating the multi-year persistence of the same T15 entry surface across the Lazarus operational timeline.
- **Payment processor as attack surface.** Payment processors hold hot-wallet keys with high transaction throughput — the extraction can blend into legitimate payment volume. CoinsPaid's $7B annual processing volume creates a higher entropy baseline against which anomalous withdrawals must be detected compared to a cold-wallet custodian.

## What this example tells contributors

- **T15 operator-endpoint compromise is the canonical Lazarus entry vector.** The CoinsPaid case validates the CISA AA22-108A TTP catalog at production scale 2 years after the advisory. The fake-recruiter-on-LinkedIn → trojanized application → endpoint compromise chain is stable Lazarus tradecraft that defenders should treat as a durable (not ephemeral) TTP.
- **Payment processors are a T11.001 sub-surface distinct from exchange hot wallets.** Payment processors have higher transaction throughput, broader counterparty sets, and different operational cadences than exchange hot wallets. The anomalous-withdrawal detection baseline must be calibrated differently.
- **Same-target re-attack is a G01 cluster signature.** Defenders should treat a Lazarus-attributed extraction event as a signal that the entity's endpoint population may retain residual compromise — the post-incident remediation scope must include comprehensive endpoint re-imaging across the engineering and finance populations, not just hot-wallet key rotation.

## Public references

- [FBI Attribution Statement — Lazarus Group / TraderTraitor (January 2024)](https://www.fbi.gov/)
- [CISA AA22-108A — TraderTraitor Advisory (April 2022)](https://www.cisa.gov/news-events/cybersecurity-advisories/aa22-108a)
- CoinsPaid processed ~$7B in annual crypto payment volume at the time of the attack.
- First Lazarus attack on CoinsPaid: July 2023 (~$3M). Second attack: January 2024 ($37M).
