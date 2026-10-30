# AlpsCon AI Trade Hub — a Hardhat test account with a public key sat on the KYC whitelist, and a fresh stake through it collected the whole reward history — AlpsCon / BNB Chain — 2026-10-18

**Loss:** **~152,809 USDC** from AI Trade Hub V9 (ExVul); ~\$355K of rewards paid out against a flash-loaned stake, \$152K net after unwinding.

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary*. Only KYC-whitelisted wallets could stake and claim. The whitelist included **Hardhat/Anvil default account #0** (`0xf39f…2266`), whose private key is public; it was added in a bulk import on 2025-08-24 and stayed ~14 months. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). **OAK-T13.004** (EIP-7702 Delegation Abuse — the attacker used the public key to sign a 7702 delegation and ran exploit code as that whitelisted account. See [`techniques/T13.004-eip7702-delegation-abuse.md`](../techniques/T13.004-eip7702-delegation-abuse.md)). **OAK-T9.016** (Contract Accounting-State Invariant Flaw — V7–V9 import balances from the previous version and multiply them by each version's accumulated `profitPerShare` while the new account's `entryProfitPerShare` stays zero, so a fresh deposit in an older hub claimed distributions made before it existed. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). Funded by a ~1.03M USDC Aave flash loan (OAK-T9.002).

**Attribution:** **pseudonymous** (`0x3d9d…46b2`).

**Key teaching point:** **Test fixtures in production allowlists are public credentials.** EIP-7702 turned a known key into a programmable caller; the reward bug turned that caller into money.

## Summary

The attack ran early on 2026-10-18; the deployer removed the Hardhat address at 11:40 UTC, about five hours later.

## Root-cause evidence

- **Technique:** OAK-T9.004
- **Source:** <https://x.com/DefimonAlerts/status/2112102178026308045>; <https://x.com/exvulsec/status/2112118384464892127>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** Defimon and ExVul independently identify the whitelisted Hardhat account, the 7702 delegation and the reward-import flaw, with the whitelisting and removal transactions.

## Public references

- `[defimonalpscon2026]` — Defimon on X (2026-10-19): <https://x.com/DefimonAlerts/status/2112102178026308045>
- `[exvulalpscon2026]` — ExVul on X (2026-10-19): <https://x.com/exvulsec/status/2112118384464892127>
- `[bscscanalpscon2026]` — exploit transaction: <https://bscscan.com/tx/0x824b83f94bdc2e69b81f1cb2dfdf9d4aeed066114e3de29e3af59bd2d9355fc2>
