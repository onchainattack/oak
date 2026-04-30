# OAK-T1 — Token Genesis

**Phase:** Pre-launch / launch
**Adjacent tactics:** T2 (Liquidity Establishment), T6 (Defense Evasion)

## Scope

Token Genesis covers the deployment phase, where adversarial properties are introduced into a token's on-chain configuration before any holders or liquidity exist. From a defender's perspective, this is the earliest window in which adversarial tokens can be flagged — the contract is observable on-chain the moment it is deployed, and many adversarial properties are statically analyzable without waiting for trading activity.

## What defenders observe

- New contract bytecode published to a chain, with metadata patterns (compiler version, optimizer flags, verified-source status) that correlate with known adversarial templates.
- Constructor parameters, owner/admin role assignments, and privileged-role mappings that grant disproportionate control to deployer-controlled addresses.
- Use of token standards or extensions that confer post-launch authority over holder balances or transfer logic (e.g., upgradeable proxies, fee-modifier roles, reserved authority extensions on newer token standards).

## Relationship to other tactics

T1 supplies the substrate; T2 (Liquidity Establishment) and T3 (Holder Capture) typically follow within minutes. Detection coverage at T1 is therefore the highest-leverage point in the kill chain — every Technique caught here prevents the downstream extraction tactics (T5, T7) from being relevant to victims.

## Techniques in this Tactic (v0.1)

- OAK-T1.001 — Modifiable Tax Function
- OAK-T1.002 — Token-2022 Permanent Delegate Authority
- OAK-T1.003 — Renounced-But-Not-Really (Proxy-Upgrade Backdoor)
- OAK-T1.004 — Blacklist / Pausable Transfer Weaponization
- OAK-T1.005 — Hidden Fee-on-Transfer

## Maintainer notes

T1 is the most densely populated Tactic in v0.1 because pre-launch detection is where vendor tooling has the most coverage and where MG's static analysis pipeline is strongest.
