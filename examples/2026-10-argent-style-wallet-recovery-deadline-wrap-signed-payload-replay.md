# Argent-style smart wallets — a settable recovery period wrapped the deadline into the past, and a signed payload could be replayed in one transaction — unnamed smart-wallet system / Ethereum — 2026-10-19

**Loss:** **~\$59.8K** (SlowMist).

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting-State Invariant Flaw — *primary*. Two flaws per SlowMist. (1) The recovery module's unrestricted setter `0x254a2e49` accepted a recovery period that made the computed deadline **overflow to a past timestamp**, so a guardian-signed recovery finalised in the same transaction and changed the wallet owner. (2) The execution module did not reject reuse of an identical signed `0xaacaaf88` payload; it ran 19 times in one transaction and nine in the other, and the attacker traded the repeats around a thin MARK/WETH pool. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)).

**Attribution:** **pseudonymous** (`0xc106…2b02`).

**Key teaching point:** **Security delays and nonces are invariants, not parameters.** A recovery delay anyone can set, and a signature without single-use enforcement, each remove the one property the module exists for.

## Summary

SlowMist flagged two Ethereum transactions on 2026-10-19 against wallets `0xe545…8f66` and `0x5a79…5440`.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2112157232624476254>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist's trace analysis of the recovery and execution modules.

## Public references

- `[slowmistargentstyle2026]` — SlowMist TI alert (2026-10-19): <https://x.com/SlowMist_Team/status/2112157232624476254>
