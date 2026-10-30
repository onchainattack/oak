# Slice — FundsModule released pooled funds against amounts that caller-chosen contracts claimed to have sent — Slice / Base — 2026-10-21

**Loss:** **~\$41K** (SlowMist).

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting-State Invariant Flaw — *primary*. FundsModule's `0x9d2edfac` trusted release amounts returned by **caller-selected** source contracts without checking that the ETH or USDC arrived. Two attacker contracts returned non-zero amounts and sent nothing; with `flag=true` the function paid those amounts from pooled reserves to the caller. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)).

**Attribution:** **pseudonymous** ([`0xc34572ebb26b9a4c54854aae8d2347108e8c892f`](https://basescan.org/address/0xc34572ebb26b9a4c54854aae8d2347108e8c892f)).

**Key teaching point:** **Measure balances, do not ask for them.** A return value from a contract the caller picked is the caller's claim.

## Summary

SlowMist flagged the exploit on 2026-10-21.

## Timeline (UTC)

Only the SlowMist alert time is public.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-21 (undisclosed) | FundsModule (proxy [`0x61bcd1ed11fc03c958a847a6687b1875f5eacaaf`](https://basescan.org/address/0x61bcd1ed11fc03c958a847a6687b1875f5eacaaf), implementation [`0x8db3b6f51b594dc87b87a3a3b844de9c0d8d60b5`](https://basescan.org/address/0x8db3b6f51b594dc87b87a3a3b844de9c0d8d60b5)) has function `0x9d2edfac`, which trusts release amounts returned by caller-selected source contracts without checking the ETH or USDC arrived. Since when is not stated. | **T9.016** |
| 2026-10-21 (time undisclosed) | The attacker ([`0xc34572ebb26b9a4c54854aae8d2347108e8c892f`](https://basescan.org/address/0xc34572ebb26b9a4c54854aae8d2347108e8c892f)) selects two contracts that return non-zero amounts and transfer nothing. With `flag=true` the function pays those amounts from pooled reserves to the sender ([`0x02b039a6345348d984e4a0b70dd233127772206e61ce82c390c4709c0b8d790a`](https://basescan.org/tx/0x02b039a6345348d984e4a0b70dd233127772206e61ce82c390c4709c0b8d790a)). Preparation is not published. | **T9.016** |
| after the exploit | Where the ~\$41K went is not stated (undisclosed). | — |
| 2026-10-21 03:24 | SlowMist publishes its alert. No Slice statement, pause or refund appears in the cited sources. | response |

Key addresses:

- Attacker — [`0xc34572ebb26b9a4c54854aae8d2347108e8c892f`](https://basescan.org/address/0xc34572ebb26b9a4c54854aae8d2347108e8c892f)
- Victim, FundsModule proxy — [`0x61bcd1ed11fc03c958a847a6687b1875f5eacaaf`](https://basescan.org/address/0x61bcd1ed11fc03c958a847a6687b1875f5eacaaf)
- Vulnerable implementation — [`0x8db3b6f51b594dc87b87a3a3b844de9c0d8d60b5`](https://basescan.org/address/0x8db3b6f51b594dc87b87a3a3b844de9c0d8d60b5)

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2112746806585274454>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist's trace analysis of the release call.

## Public references

- `[slowmistslice2026]` — SlowMist TI alert (2026-10-21): <https://x.com/SlowMist_Team/status/2112746806585274454>
- `[basescanslice2026]` — exploit transaction: <https://basescan.org/tx/0x02b039a6345348d984e4a0b70dd233127772206e61ce82c390c4709c0b8d790a>
