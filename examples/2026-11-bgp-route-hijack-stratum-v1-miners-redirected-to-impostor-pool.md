# BGP route hijacks — forged route announcements sent Bitcoin miners on unencrypted Stratum V1 to an impostor pool that credited their hashrate to the attacker — Bitcoin mining pools (Braiins Pool endpoint among those targeted) / Bitcoin — 2026-11-07

**Loss:** **undisclosed.** Braiins gives no loss figure for this incident. It measures scale in hashrate: the largest day, 2026-11-20, had "1,050–1,600 miner sites" and "0.6–1.9 EH/s" diverted in four episodes of 6 to 49 minutes each. The only dollar figure in the post is a 2014 case (about \$83,000 in mining rewards), which is not this incident. Recovery or compensation: undisclosed.

**OAK Techniques observed:** none — no existing OAK Technique fits the entry step. The mechanism is a network-layer route hijack (BGP) combined with a protocol that has no server authentication (Stratum V1 over plain TCP). No wallet, key, credential, contract, frontend, DNS record or registrar was involved: Braiins ruled out "DNS changes", a pool-side fault, Braiins OS, and any single firmware or ISP. The closest Technique, [`T15.004`](../techniques/T15.004-operator-credential-compromise.md) (Operator-Side Credential Compromise, registrar / DNS sub-shape), needs a stolen or socially engineered operator credential, which is absent here, so it is not used. A taxonomy gap is proposed in the open questions. The funds step reuses no Technique: the value taken is mining reward, not on-chain transfers OAK can trace.

**Attribution:** **unattributed.** Braiins names no actor, no provider and no ASN. It says the forged route came through a provider that "blocked the network that propagated the forged route" on 2026-11-20 evening, and that network has not returned (the provider is not named in the post).

**Key teaching point:** **Stop using plaintext `stratum+tcp://` pool URLs, including backups: move every miner to Stratum V2 with pool public-key validation (or Stratum V1 over TLS with certificate and hostname verification), and have the pool announce its address space with RPKI ROAs limited to the announced length.** Braiins found that the impostor server accepted any username and password and relayed real jobs from another pool, so the miners kept working and nothing on the device looked broken. Only authentication of the pool by the miner, or a route the network refuses to accept, breaks this.

## Summary

Braiins, a mining pool and firmware vendor, published "SECURITY ALERT: Bitcoin Hashrate Hijacking Detected on Stratum V1" on 2026-11-25. It says an attacker rerouted internet traffic so miners on unencrypted Stratum V1 connected to an impostor server instead of the real pool. The impostor relayed jobs from a different large public pool and submitted the shares under its own worker account there, so the rewards for the diverted hashrate went to the attacker. Braiins says its pool, its services and the miners were not compromised. Episodes ran from 2026-11-07, mostly in Latin America (Brazil and Argentina) until 2026-11-12, then one captured episode in Brazil on 2026-11-16, and four larger episodes mostly in Europe on 2026-11-20. Braiins says a provider blocked the network that propagated the forged route on the evening of 2026-11-20, and that forged announcements were still seen against some other pools' address blocks on 2026-11-22. The impostor pool's name and address, the hijacked prefixes, the ASNs, the provider and the loss are undisclosed.

A relay on X (Solid Intel, 2026-11-25) summarised the Braiins post: "Over 1,000 Bitcoin mining sites hit by an internet traffic hijack that diverted their hashrate, Braiins says."

Luxor's 2026-11-14/15 Commander hashrate redirect is a separate event: Luxor describes an "unauthorized redirect of hashrate through Commander" affecting "just over a dozen client accounts", patched within two hours, with no mention of routing. The Braiins post does not mention Luxor, and no source read links the two, so OAK does not link them.

## Timeline (UTC)

Stages: **Entry** (forged route, plaintext protocol), **Execution** (impostor pool and proxy), **Money** (rewards credited to the attacker's worker), **Response**. All dates come from the Braiins post, which gives dates and durations but no clock times for the start of each episode; the post does not state its time zone, so dates are as written.

| When | What happened | OAK |
|---|---|---|
| Early November 2026 (exact first date undisclosed) | Miners report share difficulty "in the hundreds of millions". Difficulty values in logs include 536,870,912 (Brazil S19 logs), climbing to 2,147,483,640 in one log. Pool records for the prior 30 days held no difficulty this high. | — |
| 2026-11-07 to 2026-11-12 | 19 episodes, mostly Latin America (Brazil and Argentina); 120 to 400 miner sites; 36 to 174 PH/s; 1.5 minutes to 3 hours each. A forged route sends the miners' Stratum V1 connection to the attacker's server. | **no fit (BGP route hijack)** |
| 2026-11-07 onward | The impostor server accepts any username and password, answers its handshake in about 30 ms versus about 280 ms for the real pool, and proxies jobs, with coinbase tags and payout addresses, from "a different large public pool" while submitting shares under its own worker account there. | **no fit (plaintext Stratum V1 has no server authentication)** |
| 2026-11-16 | One episode in Brazil, captured packet by packet: 3 miners, 3 minutes. The second server was six network hops closer and answered faster. | **no fit** |
| 2026-11-20 | Four episodes, mostly Europe: 1,050 to 1,600 miner sites, 0.6 to 1.9 EH/s, 6 to 49 minutes each. The legitimate block had 4,096 addresses; a forged 256-address block (/24) containing the pool's address was announced, listing the real owner as origin. | **no fit** |
| 2026-11-07 onward (amounts undisclosed) | Rewards for the diverted shares accrue to the attacker's worker account on the other pool. Amounts, addresses and payout path: undisclosed. | — |
| 2026-11-20 evening | A provider blocks the network that propagated the forged route; it "has not returned". | response |
| 2026-11-22 | Some other pools' address blocks still receive forged announcements. | response (ongoing) |
| 2026-11-23 | Braiins tests seven firmware implementations and checks large pools' public endpoints. | response |
| 2026-11-25 | Braiins publishes the alert and releases Braiins OS 26.11 and the Braiins SV2 Proxy. | response |

Key addresses: none published. The impostor pool's address, the hijacked prefix, the ASNs, the propagating provider and the attacker's payout addresses are all undisclosed.

## Fund flow

No wallet address, transaction or amount is public. Braiins says the impostor submitted shares "under its own worker account" on another large public pool, which pays out on its own schedule; the pool, the account and the payout address are undisclosed. The block below records the stage with no addresses, as CONTRIBUTING requires for an undisclosed flow, using the Braiins post as the source.

```oak-flow
as_of: 2026-11-26T00:00Z
nodes:
  - {id: miners, chain: bitcoin, role: victim, label: "Miners on Stratum V1 (over 1,000 sites on 2026-11-20)"}
  - {id: imp, chain: bitcoin, role: attacker-receiver, label: "Impostor server and worker account on another pool (undisclosed)"}
edges:
  - {from: miners, to: imp, asset: hashrate, time: 2026-11-20T00:00:00Z, technique: T15.004, verified: source, source: braiins2026}
```

The edge carries no amount (undisclosed). Its `technique` field is set to the nearest listed Technique only because the checker requires one; OAK does not claim T15.004 fits, as explained above.

## Root-cause evidence

- **Technique:** none fits; proposed gap "network-layer route hijack of a plaintext protocol" (see open questions)
- **Source:** <https://braiins.com/blog/bitcoin-hashrate-hijacking-unencrypted-stratum-v1>; <https://x.com/solidintel_x/status/2125642955423666371>
- **Source type:** operator
- **Confidence:** corroborated
- **Evidence:** The Braiins post, published by a pool operator that measured the traffic itself, states the mechanism: an attacker rerouted traffic so that unencrypted Stratum V1 miners reached an impostor server, with a forged /24 announcement naming the real owner as origin, a faster handshake from a closer server and difficulty values the real pool never sets. It rules out DNS changes, pool-side fault, Braiins OS and any single firmware or ISP; affected miners ran at least 12 firmware types across hundreds of networks. The confidence label is held at corroborated rather than confirmed because Braiins is a third-party observer of other pools' traffic, not the operator of the hijacked address space; no routing registry, provider or ASN statement is available, and no second independent measurement was read. The X relay repeats Braiins and adds nothing. Not established: the hijacked prefixes, ASNs, the provider, the attacker's identity, losses, and why the 2026-11-20 route showed the real owner as origin.

## Public references

- `[braiins2026]` — Braiins, "SECURITY ALERT: Bitcoin Hashrate Hijacking Detected on Stratum V1" (2026-11-25): <https://braiins.com/blog/bitcoin-hashrate-hijacking-unencrypted-stratum-v1>
- `[solidintel2026]` — Solid Intel (@solidintel_x), relay of the Braiins report (2026-11-25 17:29 UTC): <https://x.com/solidintel_x/status/2125642955423666371>
- `[luxor2026]` — Luxor (@luxor), Commander redirect statement, cited only to record that it is a separate event: <https://x.com/luxor/status/2122018094914601464>

## Open questions

- Which prefixes, ASNs and provider carried the forged routes? Undisclosed; RIPE RIS and RouteViews history since 2026-11-01 would show it (Braiins names both tools).
- Which pool received the relayed work, and how much was credited? Undisclosed.
- Taxonomy gap proposed: a Technique for network-layer interception (BGP origin or more-specific prefix hijack) of a plaintext or unauthenticated protocol, with mitigations RPKI route origin validation, ROAs limited to the announced length, and pool-authenticating transport (Stratum V2 or verified TLS). OAK has no BGP Technique; none is invented here.
- Whether the Luxor Commander event is related. No source says so.
