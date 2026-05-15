# Cross-chain locked-liquidity spoof cohort — multi-chain — 2022–2025 (cohort)

**Loss:** unquantified in aggregate; the cross-chain locked-liquidity spoof pattern appears as a contributing misrepresentation primitive across the multi-chain rug-pull cohort (TM-RugPull dataset: ~1,028 multi-chain projects spanning 2016–2025; SolRPDS: ~62,895 suspicious Solana liquidity pools spanning 2021–2024) rather than as a separately-named incident class with individuated dollar-loss attribution. The pattern's extraction mechanism is downstream of the lock-claim misrepresentation: the attacker deploys the tradable LP on a chain where defender tooling and locker-registry coverage are weaker while publishing a lock receipt on a better-monitored chain where no corresponding LP exists, exploiting the gap between per-chain locker registries that are not unified and the user-side assumption that "locked on chain A" implies "pool on chain A is safe."

**OAK Techniques observed:** **OAK-T2.003** (Cross-Chain Locked-Liquidity Spoof — primary; the lock receipt references a token/locker contract on chain A while the tradable LP pool exists on chain B, and the cross-chain binding that the marketing claim implicitly asserts has no on-chain verification surface). **OAK-T2.002** (Locked-Liquidity Spoof — the single-chain lock-misrepresentation surface that T2.003 extends to the cross-chain case). **OAK-T6.001** (Source-Verification Mismatch — frequently co-occurs when the deployer registers a counterfeit "locker contract" on chain B with the same address as a legitimate locker on chain A but with different bytecode). **OAK-T5.001** (Hard LP Drain — the downstream extraction event that the lock-misrepresentation enables).

**Attribution:** **pseudonymous** Individual deployers of cross-chain lock-spoof projects operate under pseudonymous addresses. The class-level characterisation emerges from the TM-RugPull dataset, the SolRPDS dataset, and industry retrospectives (Chainalysis, SlowMist) that document lock-misrepresentation as a recurring rug-pull enabler at multi-chain launch venues.

**Key teaching point:** **A lock receipt on chain A has zero semantic relationship to an LP pool on chain B unless a verifiable on-chain binding between them exists.** The defender-side workflow for verifying a "locked LP" claim must resolve the lock receipt's referenced LP token to its chain-of-origin and require a hard match against the chain on which the project's tradable pool is deployed. Any mismatch is the spoof — regardless of whether the chain-A receipt is otherwise well-formed.

## Summary

The cross-chain locked-liquidity spoof pattern is a structural extension of the single-chain lock-misrepresentation surface (T2.002) to deployments where the lock receipt and the liquidity pool are deployed on different chains. The deployer publishes a marketing claim of "LP locked on Ethereum" (or another well-monitored chain), pointing to a transaction or locker-contract entry on chain A, while the actual tradable LP token is held on chain B (BSC, Polygon, Solana, Base, or any chain where defender tooling and locker-registry coverage are weaker).

The defender-side gap that enables T2.003 is the absence of unified, cross-chain locker-contract registries:

- **Per-chain locker registries are not unified.** Unicrypt/UNCX, Team Finance, PinkLock, and Mudra publish per-chain deployments, but no canonical machine-readable cross-chain registry with per-chain bytecode hashes exists at v0.1. A defender verifying a lock receipt on chain A cannot automatically determine whether a locker contract at the same address on chain B is a legitimate deployment of the same locker or a deployer-controlled lookalike.
- **Per-chain address spaces overlap.** EVM chains share the same 160-bit address space. A legitimate locker contract deployed at address `0x...` on Ethereum can be counterfeited by deploying a different contract at the same address on BSC — the address is structurally identical but the bytecode is attacker-controlled. Users who see a "known" locker address on an unfamiliar chain may assume legitimacy without verifying bytecode.
- **Per-chain explorer surfacing differs.** Etherscan's token-locker tab surfaces lock entries prominently for Ethereum deployments; the equivalent surfacing on BscScan, Polygonscan, or Solscan is weaker or absent. A lock receipt hosted on a well-surfaced explorer creates an asymmetric information environment favouring the deployer: users who check the receipt on Etherscan see a well-formed lock entry; users who attempt to verify the binding to the tradable pool must manually cross-chain-reference, which most retail buyers do not do.

Three sub-patterns recur across the cohort:

1. **Wrong-chain lock receipt.** The deployer publishes a lock receipt on chain A that references a freshly-minted token on chain A with the same name/symbol as the project, while the tradable pool is on chain B with a *different* token contract. The lock receipt is "real" in that a token is locked on chain A — but that token has no economic relationship to the pool on chain B that traders buy into.

2. **Address-overlap counterfeit locker.** The deployer deploys a contract at the same address as a legitimate locker (Unicrypt, Team Finance, PinkLock) but on a different chain and with different bytecode — the contract at that address on chain B is a deployer-controlled lookalike, not a deployment of the legitimate locker. Users who recognise the address as a "known locker" may assume legitimacy without verifying the bytecode or the per-chain deployment registry.

3. **Single-lock-claim-for-multi-chain-LP.** The deployer operates pools on multiple chains but publishes only one lock receipt (typically on the most well-monitored chain). The lock receipt covers the LP on that chain (if any) but the deployer's pools on other chains have no corresponding lock. Users who see "LP locked" without checking per-chain coverage assume all pools are locked-equivalent.

The TM-RugPull dataset (~1,028 multi-chain projects) and the SolRPDS dataset (~62,895 suspicious Solana liquidity pools) are the primary forensic references establishing the pattern at cohort scale. Industry retrospectives (Chainalysis annual crypto-crime reporting, SlowMist annual blockchain security reports) describe lock-misrepresentation as a recurring rug-pull enabler at multi-chain launch venues.

## Timeline (cohort-scale)

| When | Event | OAK ref |
|---|---|---|
| 2020–2021 | Multi-chain DEX deployment becomes standard (Uniswap on Ethereum, PancakeSwap on BSC, QuickSwap on Polygon, Raydium on Solana); locker services deploy per-chain but do not unify cross-chain registries | (standing T2.003 surface — un-unified per-chain locker registries) |
| 2021–2022 | First cross-chain lock-spoof projects appear; deployers exploit the gap between well-monitored chain lock receipts and weakly-monitored chain pools | **T2.003 (cross-chain lock-spoof)** |
| 2022–2025 | Pattern recurs at cohort scale across the multi-chain rug-pull wave; TM-RugPull dataset and SolRPDS dataset document the cross-chain lock-claim mismatch sub-cohort | (forensic characterisation) |
| 2023–2025 | Per-chain locker registries remain un-unified; no canonical cross-chain locker registry with per-chain bytecode hashes standardises | (defender-side gap persists) |
| 2025 (v0.1 cutoff) | T2.003 characterised at cohort scale; no single named incident with clean dollar-loss attribution to the cross-chain lock-spoof pattern specifically | (OAK characterisation) |

## What defenders observed

- **Per-chain locker-registry fragmentation is the structural enabler.** As long as locker-contract registries are per-chain and not unified, a defender verifying a lock-receipt claim must manually cross-reference the receipt's chain-of-origin against the pool's chain-of-deployment — a multi-step process that no commodity wallet or DEX aggregator performs automatically at v0.1.
- **The address-overlap counterfeit-locker sub-pattern exploits a genuine security UX convention.** Users are trained to recognise legitimate contract addresses (the Etherscan "verified" checkmark, the "known locker" heuristic) and extend that recognition across chains where the same address carries a different semantic. The mitigation is bytecode verification at the address-on-this-chain level, not address-recognition across chains.
- **The single-lock-for-multi-chain-LP sub-pattern is detectable via per-chain pool enumeration.** For any project claiming "LP locked," enumerate every chain on which the project operates a pool; require a separate, chain-local lock receipt for each. A single receipt is insufficient for multi-chain coverage under current locker-service models.

## What this example tells contributors writing future Technique pages

- **T2.003 is the cross-chain extension of T2.002 and inherits T2.002's detection methodology plus a chain-binding verification step.** The T2.002 mitigations (parse lock receipts, verify covered fraction/duration/authority) remain necessary; T2.003 adds a chain-binding check: resolve the lock receipt's referenced LP token to its chain-of-origin and require a hard match against the pool's chain.
- **The structural mitigation is a unified cross-chain locker registry with per-chain bytecode hashes.** Until locker services publish a signed, machine-readable, multi-chain manifest of legitimate locker-contract addresses with per-chain deployment-bytecode hashes, the cross-chain lock-spoof surface persists as a defender-side manual-verification burden.

## Public references

- TM-RugPull Dataset. *Multi-chain rug-pull project corpus, 2016–2025.* ~1,028 projects — the primary cross-chain forensic reference — `[tmrugpull2026]`.
- SolRPDS. *Solana Rug-Pull Detection Dataset, 2021–2024.* ~62,895 suspicious Solana liquidity pools — the Solana-side counterpart for cross-chain lock-spoof analysis — `[solrpds]`.
- Chainalysis. *Annual Crypto-Crime Reporting.* 2022–2025 — industry retrospective describing lock-misrepresentation as a recurring rug-pull enabler at multi-chain launch venues — `[chainalysis2025rug]`.
- SlowMist. *Annual/Mid-year Blockchain Security Reports.* 2022–2025 — forensic-provider retrospective with per-chain locker-registry coverage gaps — `[slowmist2024report]`.
- Cross-reference: T2.002 (Locked-Liquidity Spoof) at `techniques/T2.002-locked-liquidity-spoof.md` — the single-chain lock-misrepresentation surface that T2.003 extends to the cross-chain case.

### Proposed new BibTeX entries

```bibtex
@misc{tmrugpull2026,
  author = {{Temporal Mapping Research Group}},
  title = {TM-RugPull Dataset — Multi-Chain Rug-Pull Project Corpus, 2016–2025},
  year = {2025},
  note = {~1,028 multi-chain projects; primary cross-chain liquidity-rug-pull forensic reference.},
}

@misc{solrpds,
  author = {{Solana Rug-Pull Detection Project}},
  title = {SolRPDS — Solana Rug-Pull Detection Dataset, 2021–2024},
  year = {2024},
  note = {~62,895 suspicious Solana liquidity pools; Solana-side counterpart for cross-chain lock-claim analysis.},
}
```
