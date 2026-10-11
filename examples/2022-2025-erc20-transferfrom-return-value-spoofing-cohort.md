# ERC-20 transferFrom return-value spoofing cohort — EVM — 2022–2025

**Loss:** not tabulated. The original's "seven figures aggregate" and per-protocol loss ranges had no source and were removed; the cited sources are audit findings, not realised-loss incident reports.
**OAK Techniques observed:** **OAK-T2.005** (Token Metadata Spoofing — primary; the token's interface-level behaviour diverges from what integrators expect of an ERC-20); **OAK-T9.004** (Access Control Misconfiguration — co-occurring; the integration treats an unverified transfer as having succeeded).
**Attribution:** **unattributed** The surface is a property of the ERC-20 return-value convention and of integrating contracts that do not validate it. No attacker, campaign or named incident is identified in this file.
**Key teaching point:** **ERC-20 tokens differ in how they signal transfer failure, and integrators that assume one convention break on the others.** Some tokens (USDT is the commonly cited example) return no value from `transfer`/`transferFrom`, so a call through an interface declaring a `bool` return reverts; others return `false` instead of reverting, so a caller that ignores the return value records a transfer that never happened. The standard remedy is a safe-transfer wrapper such as OpenZeppelin's SafeERC20.

**Corrected 2026-10-11:** removed unsourced loss figures, the Solidity 0.4.22 and "SafeERC20 introduced 2020" dating, and the Uniswap V1 and "post-2022 false-returning token" timeline claims; the file now rests on public audit findings and states that no realised incident is documented here.

## Summary

The ERC-20 interface declares `transfer` and `transferFrom` as returning `bool`. Public audit findings document two integration failure modes:

1. **Non-returning tokens.** Per a Code4rena Juicebox finding, because the `IERC20` interface requires a boolean return, attempting to transfer tokens with missing return values (it names USDT and BNB) reverts, so a terminal using the plain interface cannot support them; the recommended fix is a safe-transfer library such as OpenZeppelin SafeERC20. A Sherlock finding makes the related point that unchecked USDT-style transfers can fail without reverting and leave protocol state wrong.
2. **False-returning tokens.** Code4rena and Sherlock findings (including ENS and Aave v3 contest reports) note that some tokens return `false` instead of reverting, so a caller that does not check the return value may update its accounting as if tokens moved. In a lending or vault context this lets an attacker be credited for a deposit or repayment that never arrived. SafeERC20 handles both cases.

The USDT mainnet contract is at `0xdAC17F958D2ee523a2206206994597C13D831ec7` (address as given in the original file; the cited audit findings name USDT as non-returning, but this file did not independently re-verify the contract code).

This file documents a bug class that audits routinely flag. Whether specific real-world losses from it occurred in 2022-2025 is not established by the cited sources.

## Timeline (UTC)

The original dated timeline (2017 USDT deployment, 2018-2019 integration issues, 2020 SafeERC20 release, 2022-2025 false-returning tokens) was not supported by the cited sources and is removed. The audit findings cited below span 2021-2025.

## Public references

- `[c4juicebox242]` — Code4rena, 2022-07 Juicebox findings, "Use a safe transfer helper library for ERC20 transfers" (issue 242): <https://github.com/code-423n4/2022-07-juicebox-findings/issues/242>
- `[c4ens313]` — Code4rena, 2023-10 ENS findings, "Not checking return value in ERC20 transferFrom can funds being stolen" (issue 313): <https://github.com/code-423n4/2023-10-ens-findings/issues/313>
- `[sherlockaave79]` — Sherlock, 2025-01 Aave v3.3 judging, "Unchecked Return Value of IERC20.safeTransferFrom" (issue 79): <https://github.com/sherlock-audit/2025-01-aave-v3-3-judging/issues/79>
- `[sherlocklend579]` — Sherlock, 2025-05 Lend audit contest judging, "Silent Failure Due to Unchecked ERC20 transfer Return Values" (issue 579): <https://github.com/sherlock-audit/2025-05-lend-audit-contest-judging/issues/579>
- `[eip20standard]` — ERC-20 specification reference (EIP-20).
- `[openzeppelinsafeerc20]` — OpenZeppelin SafeERC20 documentation.
- `[usdtnonconforming]` — USDT ERC-20 non-compliance documentation.
