# Slice — FundsModule released pooled funds against amounts that caller-chosen contracts claimed to have sent — Slice / Base — 2026-10-21

**Loss:** **~\$41K** (SlowMist).

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting-State Invariant Flaw — *primary*. FundsModule's `0x9d2edfac` trusted release amounts returned by **caller-selected** source contracts without checking that the ETH or USDC arrived. Two attacker contracts returned non-zero amounts and sent nothing; with `flag=true` the function paid those amounts from pooled reserves to the caller. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)).

**Attribution:** **pseudonymous** (`0xc345…892f`).

**Key teaching point:** **Measure balances, do not ask for them.** A return value from a contract the caller picked is the caller's claim.

## Summary

SlowMist flagged the exploit on 2026-10-21.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2112746806585274454>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist's trace analysis of the release call.

## Public references

- `[slowmistslice2026]` — SlowMist TI alert (2026-10-21): <https://x.com/SlowMist_Team/status/2112746806585274454>
- `[basescanslice2026]` — exploit transaction: <https://basescan.org/tx/0x02b039a6345348d984e4a0b70dd233127772206e61ce82c390c4709c0b8d790a>
