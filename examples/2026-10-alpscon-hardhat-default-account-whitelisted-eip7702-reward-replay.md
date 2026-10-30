# AlpsCon AI Trade Hub — a Hardhat test account with a public key sat on the KYC whitelist, and a fresh stake through it collected the whole reward history — AlpsCon / BNB Chain — 2026-10-18

**Loss:** **~152,809 USDC** from AI Trade Hub V9 (ExVul); ~\$355K of rewards paid out against a flash-loaned stake, \$152K net after unwinding.

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary*. Only KYC-whitelisted wallets could stake and claim. The whitelist included **Hardhat/Anvil default account #0** ([`0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266`](https://bscscan.com/address/0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266)), whose private key is public; it was added in a bulk import on 2025-08-24 and stayed ~14 months. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). **OAK-T13.004** (EIP-7702 Delegation Abuse — the attacker used the public key to sign a 7702 delegation and ran exploit code as that whitelisted account. See [`techniques/T13.004-eip7702-delegation-abuse.md`](../techniques/T13.004-eip7702-delegation-abuse.md)). **OAK-T9.016** (Contract Accounting-State Invariant Flaw — V7–V9 import balances from the previous version and multiply them by each version's accumulated `profitPerShare` while the new account's `entryProfitPerShare` stays zero, so a fresh deposit in an older hub claimed distributions made before it existed. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). Funded by a ~1.03M USDC Aave flash loan (OAK-T9.002).

**Attribution:** **pseudonymous** ([`0x3d9df7d20d8296286383ffe475aa7b9e548946b2`](https://bscscan.com/address/0x3d9df7d20d8296286383ffe475aa7b9e548946b2)).

**Key teaching point:** **Test fixtures in production allowlists are public credentials.** EIP-7702 turned a known key into a programmable caller; the reward bug turned that caller into money.

## Summary

The attack ran early on 2026-10-18; the deployer removed the Hardhat address at 11:40 UTC, about five hours later.

## Timeline (UTC)

Times are from Defimon and ExVul. The attack hour is not given directly; it is inferred only as about 5 hours before the 11:40 UTC removal.

| When | What happened | OAK |
|---|---|---|
| 2025-08-24 (time undisclosed) | The deployer adds Hardhat/Anvil default account #0 ([`0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266`](https://bscscan.com/address/0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266)), whose private key is public, to the KYC whitelist in a bulk import ([`0x29d790bfa04f3b989291f4e9b713cd9544735db5c6f2206166851fef5db11608`](https://bscscan.com/tx/0x29d790bfa04f3b989291f4e9b713cd9544735db5c6f2206166851fef5db11608)). Only whitelisted wallets can stake and claim. | **T9.004** |
| 2025-08 to 2026-10 | The address stays on the whitelist for about 14 months. Separately, hub versions V7 to V9 import balances from the previous version and multiply them by accumulated `profitPerShare` while the new account's `entryProfitPerShare` stays zero (ExVul); since when is not stated. | **T9.016** |
| 2026-10-18 (before 06:40, time undisclosed) | Preparation is not published beyond the attacker address ([`0x3d9df7d20d8296286383ffe475aa7b9e548946b2`](https://bscscan.com/address/0x3d9df7d20d8296286383ffe475aa7b9e548946b2)). The attacker uses the public key to sign an EIP-7702 delegation, so exploit code runs as the whitelisted account. | **T13.004** |
| 2026-10-18 (early, ~5 h before 11:40) | In one transaction ([`0x824b83f94bdc2e69b81f1cb2dfdf9d4aeed066114e3de29e3af59bd2d9355fc2`](https://bscscan.com/tx/0x824b83f94bdc2e69b81f1cb2dfdf9d4aeed066114e3de29e3af59bd2d9355fc2)) the attacker takes a 1,027,990 USDC Aave flash loan, buys ALPS and stakes it in an older hub that still takes deposits. The newer reward contracts treat the fresh stake as if it had always been there and pay the whole reward history, about \$355K USDC, emptying the main reward pool ([`0x9b210da482217afc24074e57f6f8337fe07f0124`](https://bscscan.com/address/0x9b210da482217afc24074e57f6f8337fe07f0124)). | **T9.002**, **T9.016** |
| same transaction | The attacker unstakes, sells the ALPS back and repays the loan. The hub lost 152,809.3575 USDC; the attacker received 152,295.3625 USDC before gas. Onward movement is not published. | — |
| 2026-10-18 11:40 | The deployer removes the Hardhat address from the whitelist ([`0x6b0148ee33d63877b9c018e9f920152e1f3423539e61e7a08e45c6b4fd7e9178`](https://bscscan.com/tx/0x6b0148ee33d63877b9c018e9f920152e1f3423539e61e7a08e45c6b4fd7e9178)), about 5 hours after the attack. No refund or statement appears in the cited sources. | response |

Key addresses:

- Hardhat default account #0 (whitelisted, delegated) — [`0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266`](https://bscscan.com/address/0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266)
- Attacker — [`0x3d9df7d20d8296286383ffe475aa7b9e548946b2`](https://bscscan.com/address/0x3d9df7d20d8296286383ffe475aa7b9e548946b2)
- Victim, AI Trade Hub V9 — [`0x9b210da482217afc24074e57f6f8337fe07f0124`](https://bscscan.com/address/0x9b210da482217afc24074e57f6f8337fe07f0124)
- Decompiled contract (ExVul) — [`0xbe5d79b429308f6be75898dd31c5f3c0bd4ed13d`](https://bscscan.com/address/0xbe5d79b429308f6be75898dd31c5f3c0bd4ed13d)

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
