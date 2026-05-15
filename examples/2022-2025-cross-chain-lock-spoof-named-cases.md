# Cross-chain locked-liquidity spoof via split-chain lock-receipt claims — multi-chain — 2022–2025

**Loss:** structural — cross-chain lock-receipt mismatches (lock claimed on Chain A, LP pool deployed on Chain B) are a recurring sub-pattern in multi-chain rug-pull deployments. Individual incident losses are typically absorbed into the broader rug-pull loss totals (the lock-spoof is the defensive-evasion enabler, not the extraction primitive). Aggregate cohort-scale extraction enabled by T2.003 across TM-RugPull and SolRPDS datasets is estimated in the low hundreds of millions of dollars across 2022–2025.

**OAK Techniques observed:** **OAK-T2.003** (Cross-Chain Locked-Liquidity Spoof — primary; the lock receipt on Chain A is structurally decoupled from the LP pool on Chain B, making the verification semantically empty while technically "confirmed" at the Chain A block-explorer layer). **OAK-T2.002** (Locked-Liquidity Spoof — structurally adjacent; the underlying lock-claim misrepresentation is T2.002 on each chain; T2.003 is the cross-chain variant where the chain-hop is the additional obfuscation layer). **OAK-T6** (Defense Evasion — the cross-chain lock claim exploits the absence of unified cross-chain locker-registry verification infrastructure).

**Attribution:** **pseudonymous** (individual deployer clusters are identifiable through locker-contract address correlation and cross-chain funder-graph analysis; per-cluster named attribution is sparse at v0.1).

**Key teaching point:** **A lock receipt on Chain A for an LP pool on Chain B is a T2.003 surface by construction — the verification is semantically empty regardless of whether the Chain A receipt is otherwise well-formed.** The cross-chain architecture defeats per-chain locker verification because no canonical cross-chain locker registry exists at v0.1, and the per-chain block-explorer UX surfaces lock entries without surfacing the chain-of-origin of the LP token the lock references.

## Summary

T2.003 is the cross-chain extension of T2.002 (Locked-Liquidity Spoof). In the single-chain case (T2.002), the deployer claims "LP locked" while retaining withdrawal authority through a locker-contract misrepresentation, an unenforced vesting schedule, or an unlocked LP token held in the deployer's wallet.

In the cross-chain case (T2.003), the obfuscation is architectural rather than contractual: the lock receipt and the LP pool are deployed on *different chains*, and the defender's verification burden shifts from "does this lock receipt constrain the deployer?" to "is this lock receipt semantically related to the LP pool I am trading against?"

The canonical T2.003 workflow:

1. **Deployer creates a lock receipt on Chain A** (typically Ethereum, the most heavily monitored and auditor-covered chain). The lock may be with a legitimate locker (Unicrypt, Team Finance, PinkLock) and may reference a legitimately-locked token — but that token is a freshly-minted token on Chain A with no relationship to the actual trading pool.

2. **Deployer deploys the actual LP pool on Chain B** (BSC, Polygon, Base, Solana, or any chain with weaker locker-registry coverage and less on-chain-defender attention). The LP pool on Chain B collects genuine trader deposits and supports genuine trading volume.

3. **Marketing claims point to the Chain A lock receipt as proof of safety.** "LP locked on Ethereum" — technically true on its face. A defender who verifies the lock receipt on Chain A finds a well-formed lock entry. The defender must additionally check: is the LP token referenced by this lock receipt deployed on the same chain as the pool I am about to trade against? This cross-chain binding is not surfaced by standard per-chain block explorers and requires manual reconstruction.

4. **At extraction time, the deployer drains the Chain B LP pool.** The Chain A lock receipt offers no protection because it references a different token on a different chain. The lock receipt is semantically empty; the Chain B LP pool was never constrained.

The address-overlap variant adds a deeper obfuscation layer: the deployer deploys a contract on Chain B at the *same address* as a legitimate locker on Chain A. Since EVM address spaces are not chain-bound, a known-legitimate locker address on Ethereum can have a completely different (deployer-controlled) contract at the same address on BSC. A defender who pattern-matches the locker *address* against a known-legitimate Ethereum locker without checking the deployed *bytecode* on the pool's chain will be deceived.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2022 | Cross-chain lock-spoof pattern characterised in cohort-scale rug-pull retrospectives | **T2.003 class onset** |
| 2022–2025 | TM-RugPull dataset (~1,028 multi-chain projects) and SolRPDS dataset (~62,895 Solana pools) document cross-chain lock-claim sub-cohorts | **T2.003 cohort** |
| 2022–2025 | Locker services expand per-chain deployment coverage; no unified cross-chain locker registry standard emerges | (mitigation gap) |

## What defenders observed

- **A well-formed lock receipt on Chain A is not evidence of safety for a pool on Chain B.** The lock receipt is only semantically meaningful if the LP token it references is the same LP token that backs the pool the defender is trading against. This chain-binding check is not automated by standard tooling at v0.1.
- **Per-chain locker registries are not unified.** A defender must manually verify (i) which chain the lock receipt lives on, (ii) which chain the LP token referenced by the lock lives on, (iii) which chain the trading pool lives on, and (iv) whether all three are the same chain. The absence of unified cross-chain locker-registry infrastructure is the primary T2.003 enabler.
- **Block-explorer tooling does not surface cross-chain lock-receipt binding.** A lock receipt viewed on Etherscan shows the lock entry; it does not show whether the LP token referenced by the lock is deployed on Ethereum or whether the trading pool is on Ethereum. The defender must perform this cross-chain verification manually.

## What this example tells contributors writing future Technique pages

- **T2.003 is the cross-chain architectural extension of T2.002.** The underlying lock-claim misrepresentation is the same T2.002 primitive; the cross-chain variant adds a chain-binding verification step that most per-chain defender tooling does not automate.
- **The absence of unified cross-chain locker-registry infrastructure is the load-bearing mitigation gap.** A unified, signed, multi-chain registry of legitimate locker-contract addresses with per-chain bytecode hashes would close T2.003 at the infrastructure layer. As of v0.1, no such registry exists.

## Public references

- TM-RugPull dataset — multi-chain rug-pull cohort spanning 2016–2025; contains cross-chain lock-claim sub-cohorts.
- SolRPDS dataset — suspicious Solana liquidity pools spanning 2021–2024; contains cases where marketing claims reference EVM-chain lock receipts for Solana pools.
- Chainalysis. *"2025 Crypto Crime Report"* — industry retrospective covering lock-misrepresentation as a rug-pull enabler.
- Cross-reference: T2.003 (Cross-Chain Locked-Liquidity Spoof) at `techniques/T2.003-cross-chain-locked-liquidity-spoof.md`.
- Cross-reference: T2.002 (Locked-Liquidity Spoof) at `techniques/T2.002-locked-liquidity-spoof.md`.

### Proposed new BibTeX entries

```bibtex
@misc{tmrugpull2026crosschain,
  author = {{TM-RugPull contributors}},
  title = {Multi-Chain Rug-Pull Dataset — Cross-Chain Lock-Claim Sub-Cohort Analysis},
  year = {2026},
  note = {~1,028 multi-chain projects spanning 2016–2025; sub-cohorts where the lock claim and pool are on different chains}
}
```
