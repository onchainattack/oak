# Uplift DAO malicious proxy-upgrade treasury drain — Ethereum — 2024-06-18

**Loss:** approximately **$1.8 million** in ETH and stablecoins drained from the Uplift DAO treasury following a malicious proxy implementation upgrade. The single-EOA deployer key — held by a pseudonymous team member — was used to execute a `upgradeTo` call on the Uplift DAO's treasury proxy, replacing the audited implementation with a malicious extraction contract that drained treasury assets to an attacker-controlled address. The upgrade event occurred without a governance proposal, without a timelock delay, and without community notification.

**OAK Techniques observed:** **OAK-T6.005** (Proxy-Upgrade Malicious Switching — primary, operator-key-compromise sub-class; the upgrade authority was reached via the single-EOA deployer key, which either was held by a malicious insider or was compromised through off-chain means; the `upgradeTo` transaction replaced the legitimate treasury implementation with an extraction contract) + **OAK-T5.001** (Hard LP Drain — the extraction primitive chained from T6.005; the malicious implementation exposed a `drainTreasury()` function that transferred all assets to the attacker EOA) + **OAK-T6.001** (Source-Verification Mismatch — boundary; Etherscan displayed the audited implementation code up to the moment of the upgrade; post-upgrade, the verified-source surface diverged from the running implementation).

**Attribution:** **inferred-strong** at the operator-cluster level. The deployer EOA that executed the upgrade was traceable to the team's known deployer address. The team's remaining members claimed the deployer key had been compromised; forensic analysis by Peckshield noted that the upgrade-and-drain occurred in a single transaction bundle consistent with a coordinated operator action rather than external-attacker behaviour (no funder-graph break, no mixer routing of fees, no MEV-bundle complexity). No named individual has been publicly attributed at v0.1.

**Key teaching point:** Uplift DAO is the 2024 canonical anchor for the **single-EOA-upgrade-authority sub-pattern** within T6.005's operator-key-compromise sub-class. The structural failure mode is the concentration of upgrade authority in a single EOA — a standing T6.005 surface from the moment of deployment that persists regardless of audit quality, governance processes, or treasury-multisig configuration. The case demonstrates that an audited treasury contract protected by a multisig is irrelevant to security if the proxy's upgrade authority is held by a single EOA: the upgrade replaces the entire implementation, bypassing all access-control logic in the audited code.

## Summary

Uplift DAO was an Ethereum-based DAO treasury management protocol that launched in late 2023. The protocol used a standard UUPS proxy pattern for its treasury contract, with a single-EOA deployer key holding the `UPGRADER_ROLE`. The treasury implementation contract (the logic contract behind the proxy) had been audited by a recognised firm in October 2023 and included standard access-control protections (multisig requirement for treasury withdrawals, timelock on large transfers, role-based permission scheme).

The audited treasury implementation, however, was deployed behind a proxy whose upgrade authority was a single EOA — the deployer key held by a pseudonymous team member. The structural T6.005 vulnerability was that a single-EOA `upgradeTo()` call could replace the entire audited implementation with any bytecode the deployer chose, regardless of how carefully the audited implementation's access-control logic had been designed. The treasury held approximately $2.4M in ETH and stablecoins at the time of the incident.

On June 18, 2024, the deployer EOA executed a `upgradeTo()` transaction on the treasury proxy, pointing to a new implementation contract that had been deployed minutes earlier. The new implementation contained a single `drainTreasury()` function — no access-control modifiers, no multisig requirement, no timelock — that transferred all treasury assets to an externally-controlled address. The upgrade and the drain occurred in the same block.

The Uplift DAO team's remaining members (those who were not the key holder) claimed in Discord that the deployer key had been compromised, but provided no forensic evidence of how the compromise occurred. Peckshield's post-incident analysis noted structural features inconsistent with an external-attacker scenario:

- The upgrade transaction used the exact gas parameters and nonce expected from the deployer's typical transaction pattern.
- The drain transaction in the same block used a fresh EOA with no prior transaction history, inconsistent with a key-compromise scenario (an external attacker extracting a compromised key would typically drain to an address with existing infrastructure).
- The deployer EOA did not interact with any known phishing or compromise surfaces in the preceding 30 days.

The DAO's remaining assets (approximately $600,000 held in a separate multisig treasury not behind the proxy) were preserved. The community was not compensated for the $1.8M loss. The case was reported by The Block and Decrypt, with Peckshield's forensic analysis as the primary public-record technical source.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-10 | Uplift DAO treasury implementation audited; audit published; treasury deployed behind UUPS proxy with single-EOA upgrade authority | T6.005 standing surface (single-EOA upgrade authority) |
| 2023-10 to 2024-06-17 | Treasury operates legitimately; ~$2.4M TVL accumulated; no governance proposal for upgrade-authority restructuring | (operational window — T6.005 surface persists) |
| 2024-06-18 | Deployer EOA deploys malicious extraction contract; executes `upgradeTo()` on treasury proxy; `drainTreasury()` transfers ~$1.8M to fresh EOA — all in single block | **T6.005 execution → T5.001 extraction** |
| 2024-06-18 (hours later) | Remaining team members claim deployer-key compromise on Discord; Peckshield publishes preliminary on-chain analysis flagging upgrade-and-drain pattern | (defender-side detection) |
| 2024-06-19 to 2024-06-20 | Peckshield publishes full forensic analysis; The Block and Decrypt cover the incident; community identifies single-EOA upgrade authority as root cause | (forensic publication) |
| 2024-06 onward | Drawn funds transferred through Tornado Cash; no recovery; no legal action against operator | (post-incident — no recovery) |

## Realised extraction

Approximately $1.8 million in ETH and stablecoins (USDC, DAI) from the treasury proxy. The remaining $600,000 in the non-proxy multisig treasury was preserved. Funds were subsequently routed through Tornado Cash. No recovery was achieved.

## Public references

- Cross-reference: T6.005 at `techniques/T6.005-proxy-upgrade-malicious-switching.md`.
- Cross-reference: T5.001 at `techniques/T5.001-hard-lp-drain.md`.
- Cross-reference: `examples/2025-12-uspd-cpimp-clandestine-proxy.md` — CPIMP sub-class of T6.005 (deploy-init frontrun, 2025).
- Cross-reference: `examples/2026-04-hyperbridge-merkle-proof-counterfeit-mint.md` — on-chain-message-forgery sub-class of T6.005 (2026).
- `[peckshielduplift2024]` — Peckshield, "Uplift DAO — Malicious Proxy Upgrade and Treasury Drain Analysis" (2024-06).
- `[theblockuplift2024]` — The Block, "Uplift DAO Treasury Drained via Single-EOA Proxy Upgrade" (2024-06).

## Public References

See citations in corresponding technique file.
