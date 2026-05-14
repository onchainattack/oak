# OAK-S16 — Profanity

**Type:** tool / vanity-gen (open-source Ethereum vanity-address generator)
**Aliases:** Profanity (johguse/profanity)
**Active:** sunset / deprecated (2022-09; upstream archived and explicitly marked unsafe following the 1inch disclosure; some forks persist but are not treated as safe by the defender community)
**First observed:** 2017 (initial release as a GPU-accelerated Ethereum vanity-address generator)
**Used by Groups:** inferred-weak — pseudonymous attackers; press-side Lazarus speculation around the Wintermute incident is **not confirmed** and OAK records affected cases as `pseudonymous / unattributed`
**Host platforms:** Linux / Windows / macOS (GPU-accelerated, OpenCL)
**Observed Techniques:** OAK-T11.004 (Insufficient Entropy / Key Generation — Profanity-generated vanity addresses with weak entropy are the canonical T11.004 surface; see `examples/2022-09-wintermute.md` and `examples/2022-09-wintermute-profanity-cohort.md`)

## Description

Profanity is an open-source, GPU-accelerated Ethereum vanity-address generator originally published on GitHub by user `johguse` in 2017. It became widely adopted because it could brute-force "leading-zeros" Ethereum addresses far faster than CPU-only tools — a meaningful operational benefit during the 2018–2022 period when Ethereum charged less gas for calldata containing leading zero bytes, making leading-zeros addresses materially cheaper for high-volume operators (market-makers, MEV searchers, contract deployers).

The tool's cryptographic flaw, publicly disclosed by **1inch on 2022-09-15**, was that its CPRNG was seeded with a 32-bit unsigned integer rather than a full-entropy seed. This reduced the effective seed-space for generated keypairs to roughly 2^32 (~4.3 billion) values — a key-space tractable to brute-force private-key recovery on commodity GPU hardware. Any address that Profanity had ever produced was, in retrospect, trivially recoverable to anyone with the public address and modest compute. 1inch's disclosure included a proof-of-concept private-key recovery and explicit guidance: rotate every Profanity-generated key to a freshly-generated address as soon as possible.

Profanity is the canonical case study in the OAK corpus for **insufficient-entropy key generation as a custody-surface vulnerability class** and for the **known-vulnerability-not-rotated** operational failure mode (see Discussion). Its inclusion in the Software axis is structurally important because Profanity is not malware — it is a developer tool that operators voluntarily ran, whose output became a custody-surface compromise once the entropy weakness became public.

## Observed examples

- **Wintermute, 2022-09-20 (~$160M)** — canonical case; see `examples/2022-09-wintermute.md`. Wintermute had used Profanity to generate a leading-zeros admin address for a DeFi operations vault. After the 1inch disclosure on 2022-09-15, the firm partially responded by moving ETH out of the directly-exposed Profanity hot wallet but did not revoke the vanity-address's admin authority over the DeFi vault. Five days later an attacker recovered the private key and drained ~$160M.
- **Cohort exploitation, 2022-09-15 to 2022-09-20 (~$3.3M)** — multiple smaller Profanity-generated wallets across the ecosystem were drained during the public-disclosure window before the headline Wintermute event, providing a cohort-level signal that exploitation was active.
- **Continuing long-tail risk** — any Profanity-generated address that holds residual authority on any contract remains in scope for opportunistic recovery by anyone who notices it on-chain. Defender best-practice is treating any vanity-address with the Profanity provenance shape as a known-bad custody artefact regardless of incident date.

## Detection / attribution signals

- **Provenance audits:** identifying Profanity-generated addresses requires either (a) knowing operational history (the team admits Profanity use) or (b) inferring from address-pattern heuristics (long leading-zero prefixes / suffixes consistent with Profanity output ranges). Neither is fully diagnostic — leading-zeros addresses also arise from other generators — but combined with an operator that was known to be price-sensitive about gas in 2018–2022, the prior is high.
- **Cohort-window monitoring:** the dominant signal in 2022-09 was cohort-level — once 1inch's disclosure was public, defenders observed exploitation activity against Profanity-shaped addresses across the ecosystem within hours. Future analogous disclosures of key-generation tooling weaknesses should be assumed to produce similar cohort dynamics.
- **Authority-graph audits:** the load-bearing operational artefact for Profanity-affected operators is the destination-of-authority audit — for every key the team has generated, every contract / vault / multisig where that key holds admin, signer, or authority privilege. Wintermute's incomplete remediation is the canonical instance of why this is the load-bearing audit and not a balance-of-funds audit.

## Citations

- `[1inchprofanity2022]` — primary 2022-09-15 disclosure of the 32-bit-seed CPRNG vulnerability with PoC private-key recovery and explicit rotation guidance.
- `[halbornwintermute2022]` — function-level walkthrough of the Wintermute DeFi-vault drain via Profanity-generated admin-address private-key recovery.

## Discussion

Profanity is the lead motivator in the OAK corpus for a **v0.x candidate sub-Technique OAK-T11.004 — Insufficient-Entropy Key Generation**, scoping any custody-surface compromise where the entry vector is a key produced by a key-generation procedure with effective entropy below the cryptographic floor for the curve and key size in question. Profanity is the canonical example; the class also covers brain-wallet derivations, time-seeded RNGs in operational scripts, and tooling that treats a 32-bit seed as if it were 256-bit. See the Wintermute worked example for the full discussion.

Attribution caveats: contemporaneous press around the Wintermute incident speculated about Lazarus involvement on the basis of laundering-route similarities. This was **not confirmed** by any authoritative source then or since, and OAK records Wintermute and other Profanity-related incidents as `pseudonymous / unattributed`. Promoting press speculation to inferred-strong attribution would be a category error — the load-bearing fact is the cryptographic weakness in the tool, not the identity of any specific operator who exploited it.

Ecosystem position: Profanity is also the cleanest example in OAK of a **dual-use developer tool whose security posture matters at the same level as a custody product's**. The 2018–2022 gas-pricing incentive that drove vanity-address use is a structural property of Ethereum's pricing model at the time, not an operational mistake; Profanity's adoption was rational given that incentive. The mistake was the entropy floor in the tool's implementation, and the operational mistake was failing to rotate after disclosure. Both are recurring shapes; future contributors should expect to see analogous tool-weakness disclosures recur and should write Detection sections that name the cohort-window pattern explicitly.
