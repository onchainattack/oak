# Qubic — wallet seeds generated with weak randomness on some browsers and iOS builds were derived, and 1,404 wallets emptied in under two hours — Qubic — 2026-10-17

**Loss:** **~2.94 trillion QU (~\$1.3–1.4M)** from 1,404 wallets between 23:42 UTC on 2026-10-17 and 01:26 UTC on 2026-10-18. ~87.1% never left Qubic and is immobilised on-chain; the rest reached MEXC, which froze the receiving account. Network consensus approved returning the funds.

**OAK Techniques observed:** **OAK-T11.004** (Insufficient-Entropy Key Generation — *primary, operator-stated*. Qubic traced the drain to **weak, predictable seeds** produced by its wallet software on certain browsers (Safari), legacy Apple devices and an older Qubic iOS app; the protocol itself was not at fault. Client 4.26.4 fixed seed generation. See [`techniques/T11.004-insufficient-entropy-key-generation.md`](../techniques/T11.004-insufficient-entropy-key-generation.md)).

**Attribution:** **unattributed.**

**Key teaching point:** **Seed generation must fail closed on platforms without good randomness.** Every wallet the weak path ever created is a standing liability until its owner moves funds.

## Summary

Qubic halted the chain at tick 85,371,949, published an update on 2026-10-18 and restarted around 2026-10-20 with a claims process.

## Root-cause evidence

- **Technique:** OAK-T11.004
- **Source:** <https://x.com/_Qubic_/status/2111796725677715474>; <https://cryptobriefing.com/qubic-halts-mainnet-wallet-drain/>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** Qubic's incident update attributes the drain to weak seed generation in its wallet software; press summaries give the affected platforms and the fix version.

## Public references

- `[qubicupdate2026]` — Qubic on X, security incident update (2026-10-18): <https://x.com/_Qubic_/status/2111796725677715474>
- `[cryptobriefingqubic2026]` — Crypto Briefing, "Qubic halts mainnet after wallet drain empties 1,404 accounts": <https://cryptobriefing.com/qubic-halts-mainnet-wallet-drain/>
