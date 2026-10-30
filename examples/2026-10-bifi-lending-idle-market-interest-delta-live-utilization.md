# BiFi Lending — 36 days of idle interest were charged at whatever utilization the attacker set inside one block — BiFi / Ethereum — 2026-10-18

**Loss:** **~165.6K USDT** (~\$165.4K), swapped to WETH (Defimon).

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting-State Invariant Flaw — *primary*. BiFi's USDT market sat idle ~264K blocks. `TokenHandler._checkFirstAction` stores that gap as `inactiveActionDelta` and freezes `actionEXR` once per block; every later action in the same block re-runs `interestModel.getInterestAmount`, computing `globalEXR = actionEXR × (1 + rate × 264K)` with the rate from **live** deposit/borrow totals. So the attacker chose the utilization at which 36 days of interest were charged, repeatedly. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). Funded by a 40.5M USDT Morpho flash loan (OAK-T9.002).

**Attribution:** **pseudonymous.** The original attacker ([`0x7c78a049fff71609990017b58a959e926e6ec4c6`](https://etherscan.io/address/0x7c78a049fff71609990017b58a959e926e6ec4c6)) deployed an exploit contract; one block later the MEV operator c0ffeebabe.eth replayed it from its own contract and took the funds.

**Key teaching point:** **Accrual must use the rate that applied during the gap,** not the rate at the moment someone first touches the market. Idle markets in abandoned deployments are where this bites.

## Summary

Defimon reported the exploit on 2026-10-18 (blocks 26210255–26210256).

## Timeline (UTC)

Read it as three stages. **Get in**: a market left idle for 36 days. **Prepare**: an exploit contract. **Take**: a front-run replay with a flash loan. Times are from Defimon.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-18 | BiFi's USDT market sits idle for about 264K blocks (about 36 days). `TokenHandler._checkFirstAction` stores that gap as `inactiveActionDelta` and freezes `actionEXR` once per block, and each later action in the same block recomputes interest from live deposit and borrow totals. | **T9.016** |
| 2026-10-18, block 26210255 | The original attacker [`0x7c78a049fff71609990017b58a959e926e6ec4c6`](https://etherscan.io/address/0x7c78a049fff71609990017b58a959e926e6ec4c6) deploys an exploit contract: [`0x15b47e2c0daf723dec64c75b435079d3a1f8a6058b21b9a64dda4844e877a034`](https://etherscan.io/tx/0x15b47e2c0daf723dec64c75b435079d3a1f8a6058b21b9a64dda4844e877a034). | — |
| 2026-10-18, block 26210256 | c0ffeebabe.eth ([`0xc0ffeebabe5d496b2dde509f9fa189c25cf29671`](https://etherscan.io/address/0xc0ffeebabe5d496b2dde509f9fa189c25cf29671)) front-runs it and replays the attack from its own contract: [`0x756c68055af7a0630aa0b56891ba4de14c56c39cbebe99e47eeb4728f4d6ad14`](https://etherscan.io/tx/0x756c68055af7a0630aa0b56891ba4de14c56c39cbebe99e47eeb4728f4d6ad14). It flash-borrows 40.5M USDT from Morpho. | **T9.002** |
| same transaction | The attacker deposits the loan in growing tranches, then borrows 30M to push utilization up. Every call charges the 36-day interest at the utilization it just set. | **T9.016** |
| same transaction | A repay/withdraw loop cashes out the inflated deposit interest. The cycle runs twice and takes 165.6K USDT. | **T9.016** |
| same transaction | The USDT is swapped to WETH. Where the WETH goes next is not published. | — |
| 2026-10-18 07:45:50 | Defimon publishes its detection (about \$165.4K lost). | response |
| after 2026-10-18 (undisclosed) | No BiFi statement, pause or recovery appears in the cited sources. | response |

Key addresses:

- Original attacker — [`0x7c78a049fff71609990017b58a959e926e6ec4c6`](https://etherscan.io/address/0x7c78a049fff71609990017b58a959e926e6ec4c6)
- c0ffeebabe.eth MEV bot — [`0xc0ffeebabe5d496b2dde509f9fa189c25cf29671`](https://etherscan.io/address/0xc0ffeebabe5d496b2dde509f9fa189c25cf29671)
- Victim — [`0x808c3ba97268dbf9695b1ec10729e09c7e67a9e3`](https://etherscan.io/address/0x808c3ba97268dbf9695b1ec10729e09c7e67a9e3)
- Exploit deployment — [`0x15b47e2c0daf723dec64c75b435079d3a1f8a6058b21b9a64dda4844e877a034`](https://etherscan.io/tx/0x15b47e2c0daf723dec64c75b435079d3a1f8a6058b21b9a64dda4844e877a034)
- Front-run replay — [`0x756c68055af7a0630aa0b56891ba4de14c56c39cbebe99e47eeb4728f4d6ad14`](https://etherscan.io/tx/0x756c68055af7a0630aa0b56891ba4de14c56c39cbebe99e47eeb4728f4d6ad14)

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/DefimonAlerts/status/2111725425554571750>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** Defimon's analysis names the functions, the stored idle delta and the live-rate recomputation.

## Public references

- `[defimonbifi2026]` — Defimon on X (2026-10-18): <https://x.com/DefimonAlerts/status/2111725425554571750>
- `[etherscanbifi2026]` — front-run exploit transaction: <https://etherscan.io/tx/0x756c68055af7a0630aa0b56891ba4de14c56c39cbebe99e47eeb4728f4d6ad14>
