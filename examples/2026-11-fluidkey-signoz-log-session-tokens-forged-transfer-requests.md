# Fluidkey — a self-hosted logging tool exploited, session tokens read from its logs, and transfer requests forged and approved for 52 accounts — Fluidkey / Ethereum, Base, BNB Chain, Polygon, Optimism, Arbitrum — 2026-11-19

**Loss:** **~\$1.6M** from 52 accounts across Ethereum, Base, BNB Chain, Polygon, Optimism and Arbitrum, per Fluidkey's post-mortem. Recovery and reimbursement: undisclosed. SlowMist's tracker gives the same \$1,600,000.

**OAK Techniques observed:** **OAK-T15.004** (Operator-Side Credential Compromise, *nearest existing fit, partial: primary*, operator-stated). Fluidkey says the attacker "exploited two vulnerabilities in SigNoz, a third-party open-source logging tool", read internal logs, and found that "Some of our services had written users' session tokens to those logs." With those tokens the attacker created and approved transfer requests and raised two-factor spending limits on Fluidkey's servers. T15.004 names operator-controlled "cookie-store / OAuth-token surfaces", which is the nearest match, but here the stolen credentials are *users'* session tokens held in the operator's observability stack, not operator staff credentials; no Technique covers "secrets leaked into logs and read through an unpatched internal tool". See [`techniques/T15.004-operator-credential-compromise.md`](../techniques/T15.004-operator-credential-compromise.md). **OAK-T7.001** (mixer-routed hop) for the ~887 ETH Fluidkey says was deposited into a mixing service.

**Attribution:** **unattributed** (no actor, address or transaction is published; Fluidkey engaged zeroShadow to trace the funds and reported to the FBI's IC3 and the Swiss NCSC).

**Key teaching point:** **A server-side "approved" flag on a transfer request must not be enough to get it signed.** Fluidkey's fix is that its servers "now only accept a transfer request that is authorised with the user's own key" and that two-factor limit changes are verified on the servers. Keep session tokens out of logs, and keep the log tool's query interface off the public internet.

## Summary

Between 17:28 and 18:05 UTC on 2026-11-19 an attacker made unauthorized transfers from 52 Fluidkey accounts. Fluidkey's post-mortem says the attacker had exploited two vulnerabilities in a self-hosted SigNoz instance (v0.121.1), read its internal logs from 12 to 19 November after probing its endpoints from 5 November, and found session tokens that some Fluidkey services had written to those logs. With the tokens the attacker created transfer requests on Fluidkey's servers, marked them approved, and raised two-factor spending limits. The transfers completed when each user next opened and unlocked the app, because the app signed the prepared transfer. The private keys stayed on users' devices. Most of the proceeds were swapped to ETH on Ethereum; about 887 ETH went to a mixing service that evening. Transaction processing was taken offline at 18:05 UTC and service returned on 20 November at 15:27 UTC. SlowMist's hacked-incident tracker listed the case on 2026-11-19; Fluidkey's post-mortem post is dated 2026-11-22 01:48 UTC.

## Timeline (UTC)

**Flaw** (unpatched self-hosted SigNoz; tokens written to logs) → **Take** (log read, forged requests, user-triggered signing) → **Money** (swap to ETH, mixing service) → **Response** (shutdown, session reset, fixes). Times are from Fluidkey's post-mortem; chain data for the theft is not public.

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-05 (undisclosed) | Fluidkey runs SigNoz v0.121.1, self-hosted, with its query interface reachable from the public internet; some Fluidkey services write users' session tokens, and for some recently registered accounts viewing keys, to its logs. Fixed in v0.141.1 and v0.142.1. Advisories: GHSA-v549-7j2x-qjm5 (CVE-2026-92729, missing authentication on trace-funnel analytics endpoints, published 2026-09-14) and GHSA-w5pf-xwjh-vr5v (CVE-2026-93292, authenticated ClickHouse SQL injection, published 2026-09-17). Which advisory maps to which Fluidkey "two vulnerabilities" is the OAK reading of the post-mortem's links, not a stated mapping | **T15.004** |
| 2026-11-05 onward | Attacker probes the SigNoz endpoints | **T15.004** |
| 2026-11-12 to 2026-11-19 | Attacker reads internal logs, collecting session tokens and the viewing keys of 54 newly registered accounts (viewing keys cannot move funds, per Fluidkey) | **T15.004** |
| 2026-11-19, before 17:28 (undisclosed) | Using the tokens, attacker creates transfer requests on Fluidkey's servers, marks them approved, and raises two-factor spending limits; small payments trigger notifications to users | **T15.004** |
| 2026-11-19 17:28 | First unauthorized transfer: the app signs the prepared transfer when the user opens and unlocks it. Transfers run to 18:05 | **T15.004** |
| 2026-11-19, evening | Most funds swapped to ETH on Ethereum; ~887 ETH deposited into a mixing service. Service name, addresses and transactions undisclosed | T7.001 |
| 2026-11-19 17:43 | First user report reaches support | — |
| 2026-11-19 17:46 / 17:54 | Support alerts engineering; engineering confirms the transfers and begins shutdown | response |
| 2026-11-19 18:05 | Transaction processing fully offline | response |
| 2026-11-19 18:12 | Emergency ticket opened with SEAL 911 | response |
| 2026-11-20 15:27 | Service back online with app version 1.79.22; all existing sessions ended; SigNoz updated, credentials rotated, query interface removed from the public internet | response |
| 2026-11-22 01:48 | Post-mortem announced on X; "The investigation is ongoing, and we will update this report as our findings develop." | response |

Key addresses: none published. Fluidkey's post-mortem gives no attacker address, victim address or transaction hash, and OAK has none to check. Undisclosed.

## Fund flow

No address or transaction is public, so OAK could not trace the money. The only relayed hop is Fluidkey's statement that about 887 ETH went to a mixing service on the evening of 19 November; it is drawn as a pooled endpoint with no address, relayed from the post-mortem (not verified by OAK). The swap-to-ETH step and the stolen amounts per chain are undisclosed.

```oak-flow
as_of: 2026-11-26T12:00Z
nodes:
  - {id: vic, chain: ethereum, role: victim, label: "52 Fluidkey user accounts (addresses undisclosed)"}
  - {id: mix, chain: ethereum, role: mixer, label: "Mixing service (name undisclosed)"}
edges:
  - {from: vic, to: mix, asset: ETH, amount: 887, technique: T7.001, verified: source, source: fluidkeypostmortem2026}
```

## Root-cause evidence

- **Technique:** OAK-T15.004 (nearest fit; see Techniques above)
- **Source:** <https://docs.fluidkey.com/security/incident-2026-11-19/>; <https://x.com/fluidkey/status/2124318988566208871>; <https://hacked.slowmist.io/>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** Fluidkey's post-mortem says "The attacker exploited two vulnerabilities in SigNoz, a third-party open-source logging tool", "Some of our services had written users' session tokens to those logs", "With these tokens the attacker created transfer requests on our servers and marked them as approved", "The attacker also used the tokens to raise the two-factor spending limits", and "When a user then opened and unlocked the app, the app signed the prepared transfer". It also says "The private keys that control user funds are stored on each user's device and are never sent to our servers". SlowMist's tracker (a same-day relay of the operator's account) says the same. The operator is the source, so the mechanism is confirmed as far as the operator states it; the investigation is "ongoing" and the report may be updated. Not stated: the exact vulnerability types as used (the page links two GitHub advisories but does not map them), the attacker's addresses, the per-chain loss, and any recovery.

## Mitigations

- **Transfer authorization bound to the user's key, not to a server flag** (enforced in the app and signing path, not in the backend a token thief can write to): Fluidkey says its servers "now only accept a transfer request that is authorised with the user's own key". This breaks the step in which forged, server-approved requests were signed on unlock. Operator-stated; whether the app also shows the destination and amount before signing is undisclosed.
- **Two-factor limit changes verified on the servers**: Fluidkey says this is done, which stops a session token alone from raising spending limits.
- **No session tokens or sensitive data in logs; log-tool query interface off the public internet; credential rotation; patching of third-party tools**: all stated by Fluidkey as done or in progress. OAK's own reading: a patched SigNoz at v0.141.1 or later would have closed the entry route for the first advisory, and token-free logs would have left nothing to steal.

## Open questions

- The post-mortem also lists the data read from the logs: 38 email addresses, 37 names, 17 IBANs, 24 postal addresses, 4 dates of birth and 2 phone numbers across 70 accounts, and the viewing keys of 54 newly registered accounts. Whether the attacker has used that data is undisclosed. (OAK read the page directly on 2026-11-26 and checked the quotes in this file against it.)
- No Technique covers "secrets written to logs and read through an exploited observability tool"; T15.004 is a partial fit. Consider a gap entry in `TAXONOMY-GAPS.md`.
- Which of the two advisories each maps to Fluidkey's incident, which vulnerability gave the log access, and the loss per chain are undisclosed.
- Counts of exposed personal data (38 email addresses, 37 names, 17 IBANs, 24 postal addresses, 4 dates of birth, 2 phone numbers, across 70 accounts) are Fluidkey's; they are not repeated in the timeline.
- Recovery, reimbursement, zeroShadow findings and attribution are undisclosed.

## Public references

- `[fluidkeypostmortem2026]` — Fluidkey, "Incident Report: 19 November 2026" (undated page; announced 2026-11-22): <https://docs.fluidkey.com/security/incident-2026-11-19/>
- `[fluidkeyannounce2026]` — Fluidkey (@fluidkey), post-mortem announcement (2026-11-22): <https://x.com/fluidkey/status/2124318988566208871>
- `[slowmist2026]` — SlowMist, Blockchain Hacked incident tracker, Fluidkey entry (2026-11-19): <https://hacked.slowmist.io/>
- `[signozghsa1]` — SigNoz, GHSA-v549-7j2x-qjm5 / CVE-2026-92729 (2026-09-14): <https://github.com/SigNoz/signoz/security/advisories/GHSA-v549-7j2x-qjm5>
- `[signozghsa2]` — SigNoz, GHSA-w5pf-xwjh-vr5v / CVE-2026-93292 (2026-09-17): <https://github.com/SigNoz/signoz/security/advisories/GHSA-w5pf-xwjh-vr5v>
