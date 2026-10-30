# WAX Multi-Chain Bridge — a negative max_fee cancelled the debit while the full withdrawal was still paid out on Solana and Ethereum — WAX / Solana / Ethereum — 2026-10-22

**Loss:** **~\$90.5K** (SlowMist).

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting-State Invariant Flaw — *primary*. `eth.token::withdraw` on WAX did not enforce `max_fee ≥ 0` before debiting `quantity + max_fee`. With `max_fee = -quantity` the debit was zero while the withdrawal amount stayed whole; the configured fee was zero, so the fee check was skipped. The bridge emitted withdrawal logs and paid out on Solana and Ethereum. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). The cross-chain messaging itself worked; the source-side burn was wrong.

**Attribution:** **pseudonymous** (WAX `fasdfas.al`).

**Key teaching point:** **Sign-check every amount that is added to a debit.** A fee field is an amount.

## Summary

SlowMist flagged the exploit on 2026-10-22.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2113290086808990182>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist's analysis of the withdraw action and the resulting payouts.

## Public references

- `[slowmistwax2026]` — SlowMist TI alert (2026-10-22): <https://x.com/SlowMist_Team/status/2113290086808990182>
