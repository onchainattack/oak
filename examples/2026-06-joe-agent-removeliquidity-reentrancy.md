# Joe Agent ($JOE) — `_removeLiquidityViaContract` single-function reentrancy — 2026-06

**Loss:** **~\$45K realised.** An attacker exploited a classic checks-effects-interactions violation in the **Joe Agent ($JOE)** project on **BNB Chain**, draining **~62.5 BNB and ~1,196,000 JOE** across roughly **25 reentrancy iterations** in a single transaction. The figure is small, but the case is a textbook single-function reentrancy anchor: the loss is bounded by the contract's BNB/JOE balance and the per-iteration withdrawal, not by any external liquidity constraint.
**OAK Techniques observed:** **OAK-T9.005** (Reentrancy — the canonical anchor. The `_removeLiquidityViaContract` function sent **BNB via a low-level call to the user *before* updating the user's internal accounting (`lpInfo[user].lpAmount`)**; the attacker's contract used the control-flow handed to it during that external call to re-enter `_removeLiquidityViaContract` against stale `lpAmount` state, repeating ~25 times to withdraw far more than the position entitled. This is the **single-function, checks-effects-interactions-order** sub-shape — the 2016 DAO pattern, not a cross-protocol or read-only variant. See [`techniques/T9.005-reentrancy.md`](../techniques/T9.005-reentrancy.md)). **OAK-T9** (Smart-Contract Exploit parent).
**Attribution:** **pseudonymous** attacker; on-chain transaction identified, no public attribution to a named individual or group. Reported amid the early-June 2026 BNB-Chain incident cluster (alongside the Gnosis Pay and TesseraDAO events of 2026-06-01).

**Key teaching point:** Joe Agent is the **2026 worked example that the 2016 DAO bug never went away.** The `_removeLiquidityViaContract` path violated checks-effects-interactions in the most literal way — **interaction (low-level BNB transfer) before effect (zeroing `lpInfo[user].lpAmount`)** — which is the exact ordering error that produced The DAO, Lendf.Me, and every subsequent single-function reentrancy. The defence is equally old and equally mechanical: **update internal state before any external call, and/or apply a `nonReentrant` guard** to the withdrawal path. A decade after The DAO, a BNB-Chain project shipped the original pattern unguarded; the instructional value is that the most preventable, most documented smart-contract bug in existence still reaches production on a low-cost chain where audit coverage is thin.

## Summary

**Joe Agent ($JOE)** is a project on **BNB Chain** whose liquidity-management contract exposed `_removeLiquidityViaContract`, a function that returns a user's pooled BNB when they withdraw their LP position. The function performed the BNB return as a **low-level call to the recipient before it decremented the user's recorded LP amount** (`lpInfo[user].lpAmount`).

In **early June 2026**, an attacker deployed a contract that called `_removeLiquidityViaContract` and, in the receiving fallback triggered by the BNB transfer, **re-entered the same function** while `lpInfo[user].lpAmount` still reflected the pre-withdrawal balance. Each re-entry passed the (stale) accounting check and released another tranche of BNB. Looping **~25 times** in a single transaction, the attacker extracted **~62.5 BNB and ~1,196,000 JOE** — approximately **\$45,000** — before the call stack unwound and the state was finally (and now incorrectly) updated.

The root cause is a **checks-effects-interactions ordering violation**: the contract interacted with an untrusted external party before finalising its own state. No flash loan, no oracle, no governance, and no key compromise were involved — the call-graph shape (one external transaction whose internal trace repeatedly re-enters the same selector before returning) is the complete diagnosis.

## Why this is structurally significant

T9.005 (Reentrancy) decomposes into single-function, cross-function, cross-protocol, read-only, and hook-based sub-shapes. Joe Agent is the **purest single-function** form — the same shape as The DAO (2016) and the simplest case in the class. Its presence in the 2026 corpus is significant precisely because it is *not* novel:

- The corpus's modern reentrancy anchors (Cream/Iron Bank cross-protocol, Sentinel read-only, Curve/Vyper compiler-level) exist because simple per-function `ReentrancyGuard` is no longer *sufficient* against advanced variants. Joe Agent is the reminder that the *basic* variant — which the guard fully prevents — still ships unguarded on low-cost chains.
- The realised loss (~\$45K) is small, which is itself a data point: single-function reentrancy on a small BNB-Chain project caps out at the contract's own balance. The class's large losses (DAO ~\$60M, Cream ~\$130M) come from *scale* and *cross-protocol leverage*, not from the mechanism being more sophisticated.

Joe Agent therefore earns its place as a **low-stakes, high-clarity teaching anchor**: the mechanism is unambiguous, the fix is one line of ordering or one modifier, and the lesson is about audit coverage on cheap chains rather than about a new attack primitive.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-2026-06 | Joe Agent's `_removeLiquidityViaContract` returns BNB via low-level call to the recipient before decrementing `lpInfo[user].lpAmount` (checks-effects-interactions violation; no reentrancy guard) | (standing T9.005 surface) |
| 2026-06 (early) | Attacker calls `_removeLiquidityViaContract`; during the BNB transfer the attacker contract re-enters the function against stale `lpAmount`, looping ~25 times in one transaction | **T9.005 execution** |
| 2026-06 (early) | Attacker extracts ~62.5 BNB and ~1,196,000 JOE (~\$45K); state finally updates after the call stack unwinds | T5 outflow |
| 2026-06 (early) | Incident reported amid the early-June BNB-Chain cluster | (third-party detection) |

## What defenders observed

- **Pre-event (code layer):** `_removeLiquidityViaContract` placed an **external low-level call before the state-update (`lpInfo[user].lpAmount`)** and carried **no `nonReentrant` guard**. This is mechanically detectable: static analysers (Slither's `reentrancy-eth` / `reentrancy-no-eth`) flag external-call-before-state-write on a balance-bearing path as a hard finding. Defender lesson: any function that sends native value before zeroing the corresponding internal balance is a reentrancy finding by inspection.
- **At-event (on-chain signal):** the exploitation signature is the **call trace** — a single transaction whose internal trace re-enters the same function selector ~25 times before the originating call returns. A mempool/trace monitor asserting "no function re-enters itself within one transaction on a withdrawal path" would have flagged it.
- **Fix:** apply checks-effects-interactions (decrement `lpInfo[user].lpAmount` *before* the BNB transfer) and add a `nonReentrant` modifier to the withdrawal path. Either change alone breaks the exploit; both is standard practice.

## What this example tells contributors writing future Technique pages

- **Keep a pure single-function anchor in the T9.005 set.** Modern reentrancy anchors emphasise cross-protocol and read-only variants because those defeat naive guards; Joe Agent preserves the *baseline* case where a single `nonReentrant` modifier (or correct ordering) is a complete fix. Contributors should record the sub-shape (single-function vs cross-function vs cross-protocol vs read-only vs hook) on every new reentrancy case.
- **Small realised losses are still canonical.** A ~\$45K single-function reentrancy is a better teaching artefact than a \$100M cross-protocol chain, because the mechanism is uncontaminated by flash loans, oracles, or composability. Record it as such.
- **Audit-coverage-on-cheap-chains is the recurring meta-lesson.** The 2026 appearance of a 2016-vintage bug on BNB Chain is a process finding, not a technical one: the tool that catches this (Slither) is free and the pattern is decade-documented. Note this in the defender section of low-cost-chain reentrancy cases.

## Public references

- `[bitgetjunehacks2026]` *(proposed)* — Bitget News, "Exploit hits Gnosis Pay, TesseraDAO loses \$2.5M as June hacks start to climb" — describes the Joe Agent ($JOE) `_removeLiquidityViaContract` reentrancy: BNB sent via low-level call before updating `lpInfo[user].lpAmount`, ~25 reentrancy loops, ~62.5 BNB + ~1.196M JOE (~\$45K). (Bitget mirror, original via Cryptopolitan): <https://www.cryptopolitan.com/exploit-hits-gnosis-pay-tesseradao-june/>
- Solidity documentation / Slither — checks-effects-interactions pattern; `reentrancy-eth` / `reentrancy-no-eth` detectors for external-call-before-state-write.
- Cross-reference: `examples/2016-06-the-dao.md` (the canonical single-function reentrancy original) and `examples/2020-04-lendf-me.md` (hook-based variant) in the T9.005 set.

## Discussion

Joe Agent is a deliberately low-stakes addition to OAK's reentrancy series — its value is clarity, not scale. Where Cream Finance (`examples/2021-10` cohort) anchors *cross-protocol* reentrancy and the reason simple guards are insufficient against advanced variants, Joe Agent anchors the *opposite* end: the original single-function shape that a guard fully prevents, still shipping unguarded on a low-cost chain in 2026. The pairing is the lesson — the reentrancy class spans from "one modifier fixes it" (Joe Agent) to "no single guard suffices" (Cream/read-only), and contributors should locate every new case on that spectrum. For Joe Agent specifically, the meta-finding is about **audit economics on cheap chains**: the bug is decade-old and free to detect, and its recurrence reflects thin audit coverage on low-cost-deployment ecosystems rather than any advance in attacker capability.
