# ERC-4337 Paymaster Griefing and DoS Attack Surface Cohort — 2023–2026

**OAK Techniques observed:** OAK-T13.001, OAK-T13.001.004

**Attribution:** **unattributed** (aggregate cohort).
**Loss:** Aggregate undocumented at class level (griefing attacks are cost-imposition rather than direct extraction; per-paymaster drawdown from sustained griefing campaigns is measured in ETH gas costs rather than stolen funds). The structural loss is in paymaster-operational continuity — a paymaster forced offline by griefing breaks the sponsorship path for legitimate users of the protocol the paymaster serves.

**Key teaching point:** Paymaster griefing (T13.001.004) is structurally unique among OAK Techniques because the attacker's goal is cost-imposition rather than value extraction. The attacker submits UserOps designed to drain the paymaster's deposited balance without producing useful protocol activity — the funds are burned as gas, not redirected to the attacker. The technique is the ERC-4337 counterpart to network-layer DoS: the paymaster is the resource, the UserOp is the packet, and the EntryPoint's gas accounting is the protocol the attacker exploits. From a defender's perspective, paymaster-griefing is a standing surface for any paymaster whose deposit balance is large enough to be worth disrupting and whose sponsorship criteria are loose enough to admit griefing UserOps.

## Summary

## Timeline

2023 (ERC-4337 EntryPoint v0.6 deployment — initial paymaster architecture) → 2023–2024 (EntryPoint v0.7 — unused-gas-penalty mechanism added specifically to address paymaster-DoS surface, but early implementation omitted the penalty from `postOp` value calculation) → 2025 (sustained griefing campaigns observed against production paymasters; Pimlico/Stackup/Alchemy bundler-reputation throttling events) → 2026 (EntryPoint v0.9 — temporary-revert griefing vector closed; `[projecteleven2026v09]` disclosure).

## T13.001.004 — Paymaster Griefing

Three worked sub-patterns documented in the EntryPoint specification and audit literature:

- **(i) Unused-gas-penalty abuse.** Artificially-high gas-limit submission triggers an unused-gas-penalty path the paymaster did not budget for. The v0.7 "unused gas penalty" mechanism was itself added to address paymaster-DoS surface, and an early implementation neglected to include the penalty in the value passed to `postOp`, causing the paymaster to charge users less than the gas it actually had to pay `[erc4337spec]`.
- **(ii) Temporary-revert griefing.** A temporary "must-revert" condition in a target contract forces a victim's correctly-signed UserOp to execute while the condition is active — the UserOp validates normally, but the inner call reverts and the paymaster still pays the gas. The EntryPoint v0.9 griefing-vector fix in 2026 addressed exactly this class `[projecteleven2026v09]`.
- **(iii) Bundle-level griefing.** A single malicious UserOp causes `validatePaymasterUserOp` to fail for the rest of the bundle, exhausting the paymaster's bundler-reputation budget and causing the bundler to throttle the paymaster `[ozaa4337audit]`.

Canonical incidents:

- **2025-04 — ERC-4337 paymaster exploitation incident.** See `examples/2025-04-erc4337-paymaster.md`.
- **2025-09 — EntryPoint v0.9 griefing-vector disclosure.** See `examples/2025-09-erc4337-entrypoint-v09-griefing-disclosure.md`.
- **2026-04 — Mass bundler-DoS via paymaster griefing.** See `examples/2026-04-erc4337-paymaster-griefing-mass-bundler-dos.md`.

Detection primitives: paymaster-fund-balance monitoring (drawdown rate exceeding expected sponsorship-throughput envelope); sponsored-UserOp gas-limit anomaly detection (spikes in `verificationGasLimit`/`callGasLimit`/`paymasterPostOpGasLimit`); bundler-reputation-score monitoring at major bundlers (Pimlico, Stackup, Alchemy, Biconomy).

The structural constraint on T13 coverage is ERC-4337 deployment youth: the EntryPoint was first deployed on Ethereum mainnet in 2023 (v0.6), and the paymaster ecosystem is substantially younger than the DeFi lending/AMM/oracle surfaces that dominate T9 coverage. The v0.7→v0.8→v0.9 EntryPoint evolution is the mechanism by which paymaster-griefing surfaces are being closed at the protocol layer — each version increment addresses a specific griefing vector, analogous to how ERC-20 wrapper standards (WETH, Permit2) addressed token-approval surfaces over multiple years.

## Public references

- `[erc4337spec]` — ERC-4337 EntryPoint specification (v0.6 through v0.9)
- `[projecteleven2026v09]` — Project Eleven EntryPoint v0.9 griefing-vector disclosure (2026)
- `[ozaa4337audit]` — OZ AA-4337 audit findings (paymaster-DoS surface characterisation)
- `[pimlico2025bundler]` — Pimlico bundler reputation-system documentation
- `[stackup2025bundler]` — Stackup bundler operations and reputation throttling
