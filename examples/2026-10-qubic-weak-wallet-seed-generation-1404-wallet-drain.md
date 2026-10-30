# Qubic — wallet seeds generated with weak randomness on some browsers and iOS builds were derived, and 1,404 wallets emptied in under two hours — Qubic — 2026-10-17

**Loss:** **~2.94 trillion QU (~\$1.3–1.4M)** from 1,404 wallets between 23:42 UTC on 2026-10-17 and 01:26 UTC on 2026-10-18. ~87.1% never left Qubic and is immobilised on-chain; the rest reached MEXC, which froze the receiving account. Network consensus approved returning the funds.

**OAK Techniques observed:** **OAK-T11.004** (Insufficient-Entropy Key Generation — *primary, operator-stated*. Qubic traced the drain to **weak, predictable seeds** produced by its wallet software on certain browsers (Safari), legacy Apple devices and an older Qubic iOS app; the protocol itself was not at fault. Client 4.26.4 fixed seed generation. See [`techniques/T11.004-insufficient-entropy-key-generation.md`](../techniques/T11.004-insufficient-entropy-key-generation.md)).

**Attribution:** **unattributed.**

**Key teaching point:** **Seed generation must fail closed on platforms without good randomness.** Every wallet the weak path ever created is a standing liability until its owner moves funds.

## Summary

Qubic halted the chain at tick 85,371,949, published an update on 2026-10-18 and restarted around 2026-10-20 with a claims process.

## Timeline (UTC)

Read it as three stages. **Flaw**: some wallet software generated predictable seeds. **Take**: 1,404 wallets are emptied in 104 minutes. **Contain**: the chain is halted, most of the QU is stuck on-chain, an exchange freezes the rest. Sources give no addresses or transaction hashes.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-17 (undisclosed; Qubic puts the earliest affected wallets at legacy Apple devices and early iOS app builds) | Qubic's wallet software on certain browsers (Safari), legacy Apple devices and early iOS app builds generates weak, predictable seeds. Wallets created that way can be re-derived by anyone. The protocol itself is not at fault. | **T11.004** |
| Before 2026-10-17 23:42 (undisclosed) | How the attacker found and enumerated the weak seed space is not published. | **T11.004** |
| 2026-10-17 23:42 to 2026-10-18 01:26 | An attacker drains 1,404 wallets, about 2.94 trillion QU (about \$1.3M), in about 1 hour 44 minutes. | **T11.004** |
| 2026-10-18 (after 01:26) | Validators stop the chain at tick 85,371,949, which locks the ledger. About 87.1% of the drained QU never left the network and is immobilised on-chain. | response |
| 2026-10-18 (within 1 hour of arrival) | The other 12.9% reaches MEXC. MEXC freezes the receiving account within an hour on suspicion that it is linked to the attack. Bitget separately suspends QUBIC deposits and withdrawals. | response |
| 2026-10-18 | Qubic ships client 4.26.4 to fix seed generation and says it secured further funds exposed to the same flaw before they could be taken. QEARN staking is unaffected. | response |
| 2026-10-18 12:29 | Qubic publishes its security incident update. Whether victims are compensated is left to a vote of the Computor cluster; Crypto Briefing says affected users are advised to file police reports. Later restart and return steps are not covered by the sources fetched here. | response |

## Root-cause evidence

- **Technique:** OAK-T11.004
- **Source:** <https://x.com/_Qubic_/status/2111796725677715474>; <https://cryptobriefing.com/qubic-halts-mainnet-wallet-drain/>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** Qubic's incident update attributes the drain to weak seed generation in its wallet software; press summaries give the affected platforms and the fix version.

## Public references

- `[qubicupdate2026]` — Qubic on X, security incident update (2026-10-18): <https://x.com/_Qubic_/status/2111796725677715474>
- `[cryptobriefingqubic2026]` — Crypto Briefing, "Qubic halts mainnet after wallet drain empties 1,404 accounts": <https://cryptobriefing.com/qubic-halts-mainnet-wallet-drain/>
