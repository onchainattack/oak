# Argent-style smart wallets — a settable recovery period wrapped the deadline into the past, and a signed payload could be replayed in one transaction — unnamed smart-wallet system / Ethereum — 2026-10-19

**Loss:** **~\$59.8K** (SlowMist).

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting-State Invariant Flaw — *primary*. Two flaws per SlowMist. (1) The recovery module's unrestricted setter `0x254a2e49` accepted a recovery period that made the computed deadline **overflow to a past timestamp**, so a guardian-signed recovery finalised in the same transaction and changed the wallet owner. (2) The execution module did not reject reuse of an identical signed `0xaacaaf88` payload; it ran 19 times in one transaction and nine in the other, and the attacker traded the repeats around a thin MARK/WETH pool. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)).

**Attribution:** **pseudonymous** ([`0xc10609ce5c032db92e562e463b1234aab0872b02`](https://etherscan.io/address/0xc10609ce5c032db92e562e463b1234aab0872b02)).

**Key teaching point:** **Security delays and nonces are invariants, not parameters.** A recovery delay anyone can set, and a signature without single-use enforcement, each remove the one property the module exists for.

## Summary

SlowMist flagged two Ethereum transactions on 2026-10-19 against wallets [`0xe545b9a69bff1bf0ed2e922551dda4afc8ee8f66`](https://etherscan.io/address/0xe545b9a69bff1bf0ed2e922551dda4afc8ee8f66) and [`0x5a79e5772493cf4329682d202aa2d28f85a85440`](https://etherscan.io/address/0x5a79e5772493cf4329682d202aa2d28f85a85440).

## Timeline (UTC)

Read it as three stages. **Get in**: two missing invariants in the wallet modules. **Prepare**: not published. **Take**: two Ethereum transactions. Times are from SlowMist's alert.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-19 (undisclosed) | The recovery module's setter `0x254a2e49` has no access restriction, and a crafted recovery period makes the computed deadline wrap to a timestamp in the past. Separately, the execution module does not reject reuse of an identical signed `0xaacaaf88` payload. Since when is not published. | **T9.016** |
| 2026-10-19 (preparation undisclosed) | Funding of the attacker address and any rehearsal are not published. | — |
| 2026-10-19 (time undisclosed) | A guardian-signed recovery is finalised in the same transaction it is started, because the deadline is already in the past, and the wallet owner is changed. | **T9.016** |
| 2026-10-19 (time undisclosed) | The identical signed payload is executed 19 times in one transaction and nine times in the other. The repeats are used to trade around a low-liquidity MARK/WETH pool. Transactions: [`0xbfed8d33561ed5f9cbd0f4e62a5bbd20187a64f3e22180148dcb58ed6ebaa795`](https://etherscan.io/tx/0xbfed8d33561ed5f9cbd0f4e62a5bbd20187a64f3e22180148dcb58ed6ebaa795) and [`0xa0ee8f914205a948c79eca039b7d8265537eb220472c9be1455d3321f1bd571b`](https://etherscan.io/tx/0xa0ee8f914205a948c79eca039b7d8265537eb220472c9be1455d3321f1bd571b). SlowMist does not say which transaction did which. | **T9.016** |
| after the transactions (undisclosed) | Total loss about \$59.8K. Where it went is not published. | — |
| 2026-10-19 12:21:40 | SlowMist publishes its alert. | response |
| after 2026-10-19 (undisclosed) | No operator or wallet-vendor statement appears in the cited sources. The affected system is not named. | response |

Key addresses:

- Attacker — [`0xc10609ce5c032db92e562e463b1234aab0872b02`](https://etherscan.io/address/0xc10609ce5c032db92e562e463b1234aab0872b02)
- Victim wallet — [`0xe545b9a69bff1bf0ed2e922551dda4afc8ee8f66`](https://etherscan.io/address/0xe545b9a69bff1bf0ed2e922551dda4afc8ee8f66)
- Victim wallet — [`0x5a79e5772493cf4329682d202aa2d28f85a85440`](https://etherscan.io/address/0x5a79e5772493cf4329682d202aa2d28f85a85440)
- Vulnerable contract — [`0xf490557d67d934440677a4f16793d5ef319b8ef5`](https://etherscan.io/address/0xf490557d67d934440677a4f16793d5ef319b8ef5)
- Vulnerable contract — [`0x4e50adfc953551286bbd7fee2b2b846d1d227394`](https://etherscan.io/address/0x4e50adfc953551286bbd7fee2b2b846d1d227394)
- Transactions — [`0xbfed8d33561ed5f9cbd0f4e62a5bbd20187a64f3e22180148dcb58ed6ebaa795`](https://etherscan.io/tx/0xbfed8d33561ed5f9cbd0f4e62a5bbd20187a64f3e22180148dcb58ed6ebaa795); [`0xa0ee8f914205a948c79eca039b7d8265537eb220472c9be1455d3321f1bd571b`](https://etherscan.io/tx/0xa0ee8f914205a948c79eca039b7d8265537eb220472c9be1455d3321f1bd571b)

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2112157232624476254>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist's trace analysis of the recovery and execution modules.

## Public references

- `[slowmistargentstyle2026]` — SlowMist TI alert (2026-10-19): <https://x.com/SlowMist_Team/status/2112157232624476254>
