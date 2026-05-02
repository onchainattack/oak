# AnubisDAO (ANKH) — Ethereum — 2021-10-28 / 2021-10-29

**Attribution:** **pseudonymous** — no public actor attribution at OAK v0.1 cutoff.

**Total loss:** \~13,556 ETH (\~\$60M at the time of the event)
**OAK Techniques observed:** OAK-T5.001 (Hard LP Drain), OAK-T7.001 (Mixer-Routed Hop)
**Status:** funds laundered through Tornado Cash within \~24 hours of the drain; long-tail tracing remains a public open item.

## Summary

AnubisDAO launched as an unwebsited token sale on Ethereum on October 28, 2021, soliciting ETH in exchange for the project's ANKH token. Approximately 20 hours into the sale, on October 29 around 11:58 UTC, the entire pool — \~13,556 ETH — was moved from the project's liquidity pool to an attacker-controlled address. Within approximately 24 hours the funds were routed through Tornado Cash in four portions; an intermediary address subsequently passed an additional \~1,018 ETH through the same service. The case became a canonical T5 → T7 chain for defenders developing rug-pull and laundering-route detection methodologies.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021-10-28 \~16:00 | Token sale opens; LP funded over the next 20 hours via public bonding curve | T2 (setup) |
| 2021-10-29 \~11:58 | Single transaction drains \~13,556 ETH from the LP | **T5.001** |
| 2021-10-29 next \~24h | Drained ETH routed through Tornado Cash in four portions | **T7.001** |
| Long tail | Intermediary address passes \~1,018 ETH through Tornado Cash | T7.001 |

## What defenders observed

- **Pre-event:** the project had no website at sale-open time; nominal "founder" identities lacked public attribution; LP-control authority was concentrated in a small set of addresses without published multisig structure. (This is a T1/T2 risk profile; OAK-T2.002 Locked-LP Spoof is *not* claimed because no "locked" representation was made — the issue is concentration, not misrepresentation.)
- **At-event:** the drain was a single large outflow rather than a gradual reduction (canonical T5.001 signature, not T5.002).
- **Post-event:** counterparty graphs from the drainer address into Tornado Cash deposit contracts produced unambiguous T7.001 attribution; downstream withdrawal addresses were partially recoverable via timing/amount heuristics but full re-linkage remained probabilistic.

## What this example tells contributors writing future Technique pages

- **Honest scoping.** AnubisDAO was sometimes described in commentary as a "honeypot" or "scam token" generally — but as an OAK case study, the operative Techniques are specifically T5.001 (single-event LP drain) and T7.001 (mixer hop). Pre-event indicators were concentration risk, not honeypot semantics. Writers should resist the temptation to attach every Technique that sounds applicable.
- **Chained Techniques.** Many high-loss incidents are cleanly described as a chain of OAK Techniques (here: T5.001 → T7.001). Examples should make the chain explicit; per-Technique pages link back to the example for the reader who wants the end-to-end view.
- **Bound the tracing claim.** Counter-laundering attribution is probabilistic. Examples should say what is on-chain-verifiable vs what is inferred via timing/amount heuristics, and avoid presenting the latter with the certainty of the former.

## Public references

- `[decryptanubis2021]` — Decrypt write-up of the drain (loss size, timeline, attribution dispute).
- `[cointelegraphanubismixer2022]` — Cointelegraph write-up of the laundering route.
- `[chainalysis2021scams]` — Chainalysis 2021 retrospective placing this incident in aggregate context.

See `citations.bib` for full metadata.

## Discussion

The AnubisDAO incident is a useful base case for OAK because it pre-dates most modern detector tooling and is therefore unambiguous in its chain of Techniques. Newer incidents tend to layer T6 (Defense Evasion) patterns on top — fragmented timing, multi-actor coordination, cross-chain hops — which OAK addresses in OAK-T5.002 (Slow LP Trickle Removal) and the v0.2 roadmap for standalone T6 Techniques. Contributors writing post-2024 examples should expect more layering and more probabilistic attribution; this 2021 case is included partly as a reference for what an "uncomplicated" T5+T7 chain looks like.
