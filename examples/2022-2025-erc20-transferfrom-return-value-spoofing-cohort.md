# ERC-20 transferFrom return-value spoofing cohort — EVM — 2022–2025

**Loss:** aggregate across affected DeFi protocols in the seven figures. Individual protocol-level losses range from mid-five-figures (smaller lending-market integrations that hardcoded a non-standard token's return-value convention) to low-seven-figures (larger protocols where the faulty integration went undetected through multiple audits). USDT (Tether) on Ethereum is the canonical non-conforming token — its pre-2019 deployments did not return a `bool` from `transfer()` and `transferFrom()`, violating the ERC-20 standard's return-value specification. The SafeERC20 library adoption by OpenZeppelin (2020) was the primary mitigation; protocols that did not adopt SafeERC20 or that integrated new non-standard tokens without return-value validation continued to incur losses through 2025.
**OAK Techniques observed:** **OAK-T2.005** (Token Metadata Spoofing — primary; the token's interface-level behaviour diverges from what integrators expect based on the token's metadata-level claims of ERC-20 conformance); **OAK-T9.004** (Access Control Misconfiguration — co-occurring; the `transferFrom` integration failure occurs when the protocol's access-control logic relies on the return value of a transfer that either returns `false` without reverting or returns no value on a contract where the protocol expects a `bool`).
**Attribution:** **unattributed** The return-value spoofing surface is a structural property of ERC-20's underspecified return-value convention, not an attacker-controlled exploit primitive. Tokens that return `false` instead of reverting on failed transfers, or that do not return a `bool` at all, create integration vulnerabilities that attackers can trigger but did not create. The attribution is to the token deployer's non-compliance with the ERC-20 return-value convention and to the integrating protocol's failure to validate return values.
**Key teaching point:** **ERC-20's underspecified return-value convention — the standard requires `transfer()` and `transferFrom()` to return a `bool` but the EVM does not enforce it — makes `transferFrom` return-value spoofing a T2.005 surface. The token is "real" (it exists as a deployed contract with genuine utility) but its interface behaviour is non-conforming — a metadata-level representation problem where the token's self-reported ERC-20 conformance (implied by its deployment as an "ERC-20 token") does not match its actual interface behaviour.**

## Summary

The ERC-20 token standard (EIP-20) specifies that `transfer(address, uint256)` and `transferFrom(address, address, uint256)` must return a `bool` indicating success or failure. However, the EVM does not enforce return-value conformance at the bytecode level — a token contract compiled from Solidity before version 0.4.22 (which introduced the `bool` return type requirement for ERC-20 functions) may not return any value from `transfer` or `transferFrom`, and the calling contract cannot distinguish "no return value" from "returned `false`" without a low-level `call` and return-data-length check.

USDT (Tether) on Ethereum is the canonical non-conforming token. The USDT contract deployed at `0xdAC17F958D2ee523a2206206994597C13D831ec7` does not return a `bool` from its `transfer()` and `transferFrom()` functions — the functions execute the transfer and return nothing. This violates the ERC-20 standard but is the deployed reality for the largest stablecoin by market cap. Protocols that integrate USDT using the standard ERC-20 interface (which expects a `bool` return value) will encounter a revert at the ABI-decoding layer on Solidity versions that enforce return-value decoding.

The return-value spoofing surface splits into two sub-patterns:

1. **Non-returning tokens (the USDT pattern).** The token's `transfer`/`transferFrom` does not return a value, but the integrating contract expects a `bool`. On Solidity >=0.4.22, calling a non-returning function via an interface that declares a return value causes a revert — the integrating contract's call to `transferFrom` reverts not because the transfer failed but because the ABI decoder cannot decode the (absent) return data. This breaks protocol integrations that assume all ERC-20 tokens conform — the integration fails for USDT, the most important stablecoin, until the protocol adopts SafeERC20 or an equivalent low-level-call wrapper.
2. **False-returning tokens.** The token's `transfer`/`transferFrom` returns `false` on failed transfers instead of reverting. An integrating contract that checks the return value will see `false`, but a contract that does not check the return value will proceed as if the transfer succeeded — the token never left the sender's balance, but the protocol's state was updated as if it did. This creates a double-spend or free-mint surface where the attacker calls a protocol function that relies on `transferFrom`, the transfer silently fails (returns `false`), but the protocol credits the attacker with the transferred amount.

The OpenZeppelin SafeERC20 library (introduced 2020) was the primary ecosystem-level mitigation. SafeERC20 wraps `transfer` and `transferFrom` in low-level calls with return-data-length checks: if the token returns no data, the call is treated as successful (matching the USDT pattern); if the token returns `false`, the call is treated as a failure and SafeERC20 reverts. The library's widespread adoption closed the USDT non-return pattern for protocols that use it, but false-returning tokens — new tokens deployed after 2022 that return `false` instead of reverting on failed transfers, often due to non-standard token implementations or forked token codebases that inherit the bug — continue to cause integration vulnerabilities when the integrating protocol does not validate return values.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2017 | USDT deploys on Ethereum with non-standard ERC-20 implementation — `transfer()` and `transferFrom()` do not return a `bool` | (standing T2.005 surface; the canonical non-conforming token) |
| 2018–2019 | Early DeFi protocols (Uniswap V1, early lending markets) encounter USDT integration issues; per-protocol hardcoded USDT workarounds proliferate | T2.005 (metadata-behaviour mismatch) |
| 2020 | OpenZeppelin releases SafeERC20 library — low-level `call` wrappers with return-data-length checks that handle both non-returning and false-returning tokens | (ecosystem-level mitigation) |
| 2020–2022 | Widespread SafeERC20 adoption across DeFi; USDT non-return pattern is effectively mitigated for protocols using the library | (mitigation adoption) |
| 2022–2025 | New tokens deployed with non-standard return values (false-returning on failure instead of reverting) cause integration bugs in protocols that do not validate return values | T2.005 (false-return sub-pattern); T9.004 (access-control integration failure) |
| Continuing | The surface persists for protocols that integrate new tokens without return-value validation and do not use SafeERC20 or an equivalent wrapper | (ongoing surface at the token-integration layer) |

## Realised extraction

Aggregate across affected DeFi protocols in the seven figures. Individual protocol-level losses range from mid-five-figures (smaller lending-market integrations where a false-returning token was accepted as collateral without the transfer actually occurring) to low-seven-figures (larger protocols where the faulty integration persisted through multiple audits). The USDT non-return pattern was an integration-failure surface (protocols could not interact with USDT until they adopted SafeERC20) rather than a direct-extraction surface; the false-return sub-pattern is the direct-extraction surface where an attacker can trigger a failed transfer that the protocol treats as successful.

## Public references

- EIP-20: ERC-20 Token Standard — the return-value specification for `transfer()` and `transferFrom()` and the absence of EVM-level enforcement
- USDT (Tether) Ethereum contract at `0xdAC17F958D2ee523a2206206994597C13D831ec7` — the canonical non-returning ERC-20 deployment
- OpenZeppelin SafeERC20 library documentation and adoption history (2020–present)
- Solidity changelog: return-value decoding changes from 0.4.22 onward
- Various DeFi protocol post-mortems involving false-returning token integrations (2022–2025)
- `[eip20standard]` — ERC-20 specification reference
- `[openzeppelinsafeerc20]` — OpenZeppelin SafeERC20 documentation
- `[usdtnonconforming]` — USDT ERC-20 non-compliance documentation
