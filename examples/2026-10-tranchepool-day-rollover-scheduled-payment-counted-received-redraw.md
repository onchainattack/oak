# TranchePool — at the UTC day rollover a scheduled principal payment was booked as received, which reopened the borrower's draw limit — Fence Finance / Valinor Digital / Oatfi TranchePool / Avalanche — 2026-10-28

**Loss:** **~1.013M USDC** (SlowMist), drawn a second time with identical calldata.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting-State Invariant Flaw — *primary*. Per SlowMist, settlement at the UTC day rollover treated a **scheduled** principal payment as **received** and subtracted it from recorded outstanding principal although no USDC was repaid. The draw function (`0x8e27c105`) checks requests against *funded − outstanding*, so 1.013M USDC of draw capacity reappeared and the same draw went through twice. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)).

**Attribution:** **pseudonymous** (`0x6ff1…1246`). The pool is "reportedly associated with" Valinor Digital, Oatfi and Fence Finance per SlowMist; no operator statement yet.

**Key teaching point:** **A schedule is not a payment.** Credit limits must be computed from money that arrived, not from money that was due.

## Summary

Two Avalanche transactions on 2026-10-28 drew 1.013M USDC each against vulnerable contract `0xe25c…621a`.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2115281126516490514>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist's trace analysis of the two draws and the rollover settlement.

## Public references

- `[slowmisttranche2026]` — SlowMist TI alert (2026-10-28): <https://x.com/SlowMist_Team/status/2115281126516490514>
- `[snowscantranche2026]` — second draw: <https://snowscan.xyz/tx/0x3f6b23292a2e9c2956c7ac56d0b1f79b0271b49edec2156d2675ddf1de058c77>
