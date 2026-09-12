# Solana PermanentDelegate burn-on-buy, 2026 continuation — the operators started revoking every authority the checkers look at and keeping the one they don't — Solana / Token-2022 — 2026 Q1

**Loss:** **not established at cohort scale.** One threat-research analysis estimates **\$50M+ across Q1 2026** from Token-2022 extension abuse and reports **RugCheck flagging over 40% of new Solana tokens as PermanentDelegate-bearing**; both figures come from a **single author's post** and OAK records them as **that source's estimate, not as an established total**. Per-victim losses stay in the same small band as the 2024 cohort — the economics are unchanged, the deception is not. This entry exists for the **mechanism shift**, not the number.

**OAK Techniques observed:** **OAK-T1.002** (Token-2022 Permanent Delegate Authority — the unchanged primitive: the extension grants unconditional authority to **transfer or burn any holder's tokens without their signature**, and the on-chain artefact is a `BurnChecked` CPI in which the **permanent delegate is the sole signer and no victim signature appears anywhere**). **OAK-T1.003** (Renounced-but-Not-Really — *the new element, and the reason this is a separate entry from the 2024 cohort*. Operators now **revoke mint authority and freeze authority, and lock LP** — every signal a standard token checker reads — while the PermanentDelegate remains live. The token presents as renounced and is fully ruggable. See [`techniques/T1.003-renounced-but-not-really.md`](../techniques/T1.003-renounced-but-not-really.md)). **OAK-T3.002** (Wash-Trade Volume Inflation — **10–50 coordinated wallets** manufacture the volume that puts the mint in front of aggregator users). **OAK-T5.001** (Hard LP Drain — the closing step: remaining tokens sold into the pool once holders' balances have been burned).

**Attribution:** **pseudonymous**, and at cohort scale **plural**. Deployer and delegate addresses are observable per mint; no operator group has been publicly named. As with the 2024 cohort, the templated redeployment pattern is consistent with **multiple independent operators reusing one primitive** rather than a single actor scaling — which is what a commoditised technique looks like.

**Key teaching point:** **The scam evolved to defeat the checklist, not the chain.** In 2024 the binding constraint was UX: the detection signal was a single unambiguous RPC call and wallets simply were not blocking on it. The 2026 shape assumes the checkers are there and routes around them — **revoke mint authority (checked), revoke freeze authority (checked), lock liquidity (checked), retain PermanentDelegate (not checked)** — so a token can pass every green tick a retail surface displays and still burn the buyer's balance within a minute of purchase. The lesson generalises past Solana: **a safety indicator that enumerates specific authorities becomes a specification for what an attacker must give up**, and the authority nobody enumerates is the one that survives. The control is to invert the check — **allow-list the extensions a token may carry** rather than deny-listing the authorities it must not — and to treat *extension TLV parsing* (`getAccountInfo` on the mint, extension type 12) as mandatory pre-trade, not advisory.

## Summary

The **Token-2022** `PermanentDelegate` extension gives a designated authority the unconditional power to **transfer or burn any holder's tokens without that holder's signature**. It exists for regulatory use cases — freezing or clawing back from sanctioned addresses — and underpins compliant stablecoins such as PYUSD, USDG and EURC. It is not a defect, and its presence is not by itself evidence of fraud.

OAK documented the **2024-09 burn-on-buy cohort** that weaponised it: buy, receive, balance burned, operator keeps the SOL. The **2026 continuation** runs the same extraction with an added deception layer aimed squarely at the tooling that grew up in between.

The reported 2026 cycle: deploy a Token-2022 mint with **PermanentDelegate set to the deployer**; create a Raydium or Orca pool against SOL; **revoke mint authority and freeze authority, and lock the LP** so the token reads clean to safety checkers; manufacture volume with **10–50 wash-trading wallets**; let buyers arrive through DEX aggregators; **burn their balances 1–60 seconds after purchase**; sell the remainder into the pool; and redeploy under a new mint address. The full cycle is described as taking **under five minutes**.

The distinguishing claim, and the one that matters for detection, is explicit: **a token can have mint authority revoked, freeze authority revoked and LP locked, and still rug through PermanentDelegate.** Those three are what most checkers score.

## Timeline (pattern, 2026 Q1)

| Step | Event | OAK ref |
|---|---|---|
| 1 | Token-2022 mint deployed with **PermanentDelegate = deployer wallet** | **T1.002 — genesis-time authority** |
| 2 | Liquidity pool created on **Raydium / Orca** against SOL | (market established) |
| 3 | **Mint authority and freeze authority revoked; LP locked** — every checker-visible signal turns green | **T1.003 — renouncement theatre** |
| 4 | **10–50 coordinated wallets** wash-trade to manufacture volume and aggregator visibility | **T3.002** |
| 5 | Buyers purchase through DEX aggregators; the token appears in their wallets | (victim entry) |
| 6 | **Within 1–60 seconds**, the delegate calls `BurnChecked` against the buyer's token account — **no victim signature is required or present** | **T1.002 exploitation** |
| 7 | Operator sells remaining supply into the pool | **T5.001** |
| 8 | New mint address; cycle repeats — reported at **under five minutes end to end** | (industrialisation) |

## What defenders observed

- **The three green ticks are now an attacker's checklist, not a buyer's assurance.** Mint authority revoked, freeze authority revoked, LP locked — each was a hard-won retail heuristic, and each is cheap for this operator to satisfy because none of them touches the authority being used. **Any published safety heuristic is also a published list of what to give up**, and the shorter the list, the cheaper compliance is.
- **The detection signal is still deterministic and still one call.** `getAccountInfo` on the mint, parse the extension TLV, look for extension type **12 (PermanentDelegate)**. That has not changed since 2024. What changed is that the surrounding signals now actively argue against acting on it — a token with everything else clean reads as safer than one without.
- **PermanentDelegate presence alone is not fraud, which is exactly why this persists.** Compliant stablecoins need it. A blunt block on PD-bearing mints breaks PYUSD, USDG and EURC. The workable rule is **contextual**: PD present **and** delegate clustered with the deployer **and** no institutional issuer identity → refuse to route, which is a join across three cheap facts rather than a single flag.
- **Burn is not freeze, and that distinction defeats a whole class of tooling.** Checkers built around freeze authority watch for accounts being immobilised. Here the balance is destroyed, the account stays live, and the wallet shows zero with a purchase in its history — a state most "can I sell?" simulators are not modelling at all.
- **Sub-five-minute redeployment means per-mint reputation is useless.** No blocklist, no report queue and no human review operates on that cycle. The only interventions that can bind are **pre-trade and automatic**, at the aggregator, wallet or bot layer.

## Public references

- `[ohmygodpermanentdelegate2026]` — "Solana's Permanent Delegate Burn Scam: How Token-2022 Extensions Power 2026's Largest Automated Rug Pull Factory — And a Detection Pipeline to Stop It", DEV Community, 2026-03-27. **Single-author threat-research post** (one instalment of a 220-part series), cited via its Wayback snapshot because the live URL now returns 404. Source of the 2026 attack-flow description, the `BurnChecked` / sole-signer on-chain signature, the revoke-mint-and-freeze-but-keep-PD composition, the 10–50 wash-trading wallets, the 1–60 second burn window and the sub-five-minute cycle, plus the **\$50M+ Q1 2026** and **40%-of-new-tokens** estimates that OAK attributes to it rather than adopting: <https://web.archive.org/web/20260328083738/https://dev.to/ohmygod/solanas-permanent-delegate-burn-scam-how-token-2022-extensions-power-2026s-largest-automated-rug-4579>
- `[yellowsolanaburn]` — Yellow, "Solana Takes a Hit: Scammers Found a Way to Burn Tokens From Inside Wallets" — independent coverage of the same primitive in the wild: <https://yellow.com/news/solana-takes-a-hit-scammers-found-a-way-to-burn-tokens-from-inside-wallets>
- `[coinpapersolanaburn]` — Coinpaper, "Scammers Exploit Solana Token Feature to Burn Users' Crypto" — independent coverage of the burn-on-buy mechanic: <https://coinpaper.com/5295/scammers-exploit-solana-token-feature-to-burn-users-crypto>
- Companion entry: [`examples/2024-09-solana-permanent-delegate-burn-on-buy-cohort.md`](./2024-09-solana-permanent-delegate-burn-on-buy-cohort.md) — the 2024 cohort this continues, where the binding constraint was UX-side blocking rather than checker evasion.

## Discussion

OAK's convention for a recurring pattern is a **continuation entry** rather than an edit to the original — the CrimeEnjoyor 2025 cohort and its 2026 continuation set the precedent — and the test for whether a continuation earns a file is whether **something about the mechanism changed**. Here it did, and the change is a direct response to defence.

The 2024 entry's conclusion was that detection tooling existed and **UX-side blocking was the binding constraint**. Two years on, blocking is more common, and the operators' answer was not to find a new primitive but to **make the token pass the blocks**. That is a defender-legible signal in itself: when a scam's contract gets *cleaner* over time, it usually means the checks became real, and the remaining authority is whatever the checks omit.

The honest limitation of this entry is its sourcing, and OAK states it rather than smoothing it over. The **mechanism** is verifiable against Solana's documented Token-2022 semantics and matches independent coverage of the same primitive; the **scale** rests on one author's estimates, published in a high-volume content series, which is a weaker provenance class than the SlowMist, RugCheck or Chainalysis reporting the corpus prefers. A contributor who can replace the \$50M+ and 40% figures with primary telemetry — RugCheck's own published statistics, Jupiter pre-trade data, or a measurement paper on the 2026 window comparable to the Sun Yat-sen study of H1 2025 — should do so, and this entry should be updated rather than supplemented.
