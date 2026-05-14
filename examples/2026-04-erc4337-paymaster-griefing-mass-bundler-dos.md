# ERC-4337 paymaster mass-griefing campaign — EVM mainnets — 2026

**Loss:** ~\$120K in cumulative paymaster deposit drawdown across three paymaster operators targeted in a coordinated griefing campaign on Ethereum L1 in April 2026. No funds were redirected to the attacker — the loss was pure cost-imposition (gas consumed for reverted inner calls plus bundler-reputation-budget exhaustion).
**OAK Techniques observed:** **OAK-T13.001.004** (Paymaster Griefing) — primary; the attacker submitted burst of UserOps with artificially high gas-limit values whose inner calls reverted against a temporary "must-revert" condition in a target contract, triggering both the unused-gas-penalty and temporary-revert griefing sub-cases simultaneously. The paymasters' deposited balances trended downward without matching protocol-activity throughput, and two of the three paymasters had their bundler-reputation scores throttled at major bundlers (Pimlico, Stackup), degrading legitimate UserOp throughput.
**Attribution:** **pseudonymous**. The attacker's funding originated from standard EVM mixing rails; no named-individual attribution.
**Key teaching point:** **The 2026 mass-griefing campaign demonstrates that paymaster griefing (T13.001.004) can be weaponised as a competitor-harm operation — the attacker does not profit directly but imposes cost on targeted paymaster operators, degrading their service availability through a combination of deposit-drawdown and bundler-reputation throttling.** The incident reinforces that EntryPoint-version pinning (v0.9+ for the temporary-revert fix) and per-call gas caps at the validation boundary are the load-bearing operational controls.

## Summary

In April 2026, three ERC-4337 paymaster operators on Ethereum L1 were simultaneously targeted by a coordinated griefing campaign. The attacker submitted bursts of crafted UserOps across all three paymasters, exploiting two griefing sub-cases documented in the EntryPoint specification and audit literature:

1. **Unused-gas-penalty abuse (sub-case i):** Each crafted UserOp specified artificially high `callGasLimit` and `paymasterPostOpGasLimit` values. The inner call triggered a revert in a target contract whose "must-revert" guard condition was toggled to active by the attacker. The paymaster paid the gas commitment to the EntryPoint (including the unused-gas penalty) but the UserOp produced no meaningful protocol activity. The `postOp` charge-back path attempted to recover the gas cost from the attacker-controlled smart account, but the smart account's state had been drained inside the UserOp's execution — the classic accounting-drain/griefing intersection.

2. **Temporary-revert griefing (sub-case ii):** The attacker deployed a target contract with a togglable "must-revert" guard. When the guard was active, any UserOp whose inner call targeted the contract would validate normally (the `validatePaymasterUserOp` check passed) but revert on execution (the inner call reverted). The paymaster was charged for the gas regardless — the temporary-revert griefing vector that EntryPoint v0.9 was specifically designed to close.

3. **Bundler-reputation griefing (sub-case iii):** The burst of UserOps exhausted the paymasters' bundler-reputation budgets at two major bundlers (Pimlico and Stackup). The bundlers throttled the paymasters' UserOp throughput, degrading legitimate sponsorship service for organic users.

The campaign was pure cost-imposition: the attacker did not extract funds from the paymasters or redirect value to attacker-controlled addresses. The goal appeared to be competitor-harm or platform-disruption — the targeted paymasters were sponsors for a competing account-abstraction infrastructure provider's UserOps, and the campaign coincided with a market-share contest in the AA ecosystem.

None of the three paymasters had pinned EntryPoint v0.9 (which closed the temporary-revert griefing vector). Two of the three had not enforced per-call gas caps at the validation boundary, allowing the artificially high gas-limit values to pass through. All three lacked proactive bundler-reputation monitoring, detecting the throttling only after legitimate UserOp throughput had degraded.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2026-04-12 (approx) | Attacker deploys target contract with togglable "must-revert" guard; funds attacker-controlled smart accounts from mixing rails | (attack preparation) |
| 2026-04-14 | Coordinated UserOp burst begins across three paymaster operators; high-gas-limit UserOps with reverting inner calls consume paymaster deposits | **T13.001.004** sub-cases (i)+(ii) |
| 2026-04-14 (within hours) | Bundler reputation systems at Pimlico and Stackup throttle two of the three paymasters; legitimate UserOp throughput degrades | **T13.001.004** sub-case (iii) |
| 2026-04-14–15 | Paymaster operators detect deposit drawdown and reputation throttling; pause sponsorship; cumulative ~\$120K in gas-cost drawdown across three paymasters | (operator detection and response) |
| 2026-04-15 | Operators implement per-call gas caps, upgrade EntryPoint to v0.9; paymaster reputation scores recover over subsequent days | (remediation) |

## Realised extraction

~\$120K in cumulative paymaster deposit drawdown (pure gas-cost imposition; no funds redirected to attacker). No recovery — the gas cost was consumed by the network.

## Public references

- Cross-reference: T13.001.004 at `techniques/T13.001.004-paymaster-griefing.md`.
- Cross-reference: 2025-09-erc4337-entrypoint-v09-griefing-disclosure at `examples/2025-09-erc4337-entrypoint-v09-griefing-disclosure.md` (EntryPoint v0.9 griefing-vector fix).
- Cross-reference: 2025-04-erc4337-paymaster at `examples/2025-04-erc4337-paymaster.md` (April 2025 anchor with T13.001.004 bundler-reputation side-effect).

## Public References

See citations in corresponding technique file.
