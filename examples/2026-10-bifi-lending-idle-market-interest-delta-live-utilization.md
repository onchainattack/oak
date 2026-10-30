# BiFi Lending — 36 days of idle interest were charged at whatever utilization the attacker set inside one block — BiFi / Ethereum — 2026-10-18

**Loss:** **~165.6K USDT** (~\$165.4K), swapped to WETH (Defimon).

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting-State Invariant Flaw — *primary*. BiFi's USDT market sat idle ~264K blocks. `TokenHandler._checkFirstAction` stores that gap as `inactiveActionDelta` and freezes `actionEXR` once per block; every later action in the same block re-runs `interestModel.getInterestAmount`, computing `globalEXR = actionEXR × (1 + rate × 264K)` with the rate from **live** deposit/borrow totals. So the attacker chose the utilization at which 36 days of interest were charged, repeatedly. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). Funded by a 40.5M USDT Morpho flash loan (OAK-T9.002).

**Attribution:** **pseudonymous.** The original attacker (`0x7c78…c4c6`) deployed an exploit contract; one block later the MEV operator c0ffeebabe.eth replayed it from its own contract and took the funds.

**Key teaching point:** **Accrual must use the rate that applied during the gap,** not the rate at the moment someone first touches the market. Idle markets in abandoned deployments are where this bites.

## Summary

Defimon reported the exploit on 2026-10-18 (blocks 26210255–26210256).

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/DefimonAlerts/status/2111725425554571750>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** Defimon's analysis names the functions, the stored idle delta and the live-rate recomputation.

## Public references

- `[defimonbifi2026]` — Defimon on X (2026-10-18): <https://x.com/DefimonAlerts/status/2111725425554571750>
- `[etherscanbifi2026]` — front-run exploit transaction: <https://etherscan.io/tx/0x756c68055af7a0630aa0b56891ba4de14c56c39cbebe99e47eeb4728f4d6ad14>
