# Fortress Protocol flash-loan governance attack — BNB Chain — 2022-05-08

**Loss:** approximately **$3 million** in FTS tokens and BNB drained from the Fortress Protocol treasury. The attacker flash-loaned FTS governance tokens, created and passed a malicious governance proposal granting themselves mint authority, minted a large quantity of FTS tokens, and drained the protocol's liquidity pools.
**OAK Techniques observed:** **OAK-T12.005** (Flash-Loan Governance Vote Manipulation — primary; the attacker flash-loaned FTS governance tokens to acquire temporary voting power sufficient to pass a malicious proposal). **OAK-T9.002** (Flash-Loan-Enabled Exploit — structurally co-occurring; the flash loan provided the capital base for the governance-token acquisition). **OAK-T9.003** (Governance Attack — the governance-capture outcome; the malicious proposal granted the attacker mint authority over the protocol's token).
**Attribution:** **pseudonymous** attacker; no public named-individual attribution.
**Key teaching point:** **Fortress Protocol is the canonical BNB Chain T12.005 case: a governance contract that measured voting power at the proposal-execution block height without a snapshot mechanism or minimum holding period, enabling an attacker to flash-loan governance tokens from PancakeSwap liquidity pools, pass a malicious proposal within the same transaction, and drain the protocol treasury. The case demonstrates that flash-loan governance attacks are preventable by any one of three independent mitigations: (1) measure voting power at a snapshot block prior to proposal creation, (2) enforce a minimum governance-token holding period before tokens confer voting power, or (3) set the governance quorum threshold above the DEX liquidity depth of the governance token. Fortress Protocol had none of these mitigations — the governance contract used a current-balance voting-power function, there was no minimum holding period, and the quorum threshold was below the PancakeSwap FTS liquidity depth.**

## Summary

Fortress Protocol was a DeFi lending and yield-optimization protocol deployed on BNB Chain (formerly Binance Smart Chain). The protocol was governed by FTS token holders through an on-chain governance contract that allowed token holders to create and vote on proposals for protocol parameter changes, treasury allocations, and contract upgrades. The governance contract measured voting power using the current FTS token balance of each voter (`balanceOf`), with no snapshot mechanism to measure voting power at a prior block height and no minimum holding period for governance tokens before they conferred voting power.

On May 8, 2022, an attacker identified the governance contract's flash-loan-votable design and executed a single-transaction governance attack:

1. **Flash-loan governance tokens.** The attacker took out a flash loan of FTS governance tokens from PancakeSwap's FTS/BNB liquidity pool — the largest source of FTS liquidity on BNB Chain. The borrowed quantity was sufficient to exceed the protocol's governance quorum threshold.

2. **Proposal creation and voting.** Within the same transaction, the attacker used the flash-loaned FTS tokens to create a governance proposal granting a new address (controlled by the attacker) mint authority over the FTS token contract. Because the governance contract measured voting power at the current block (`balanceOf`), the flash-loaned tokens conferred legitimate voting power. The attacker voted in favor of their own proposal with the flash-loaned voting weight, meeting quorum and passing the proposal.

3. **Proposal execution.** The governance contract's proposal-execution function was callable immediately after proposal passage — there was no mandatory timelock delay between proposal approval and execution. The attacker executed the proposal in the same transaction, granting the attacker-controlled address mint authority over the FTS token.

4. **Mint and drain.** With mint authority granted, the attacker minted a large quantity of new FTS tokens to the attacker-controlled address and used the newly minted tokens to drain liquidity from the FTS/BNB and FTS-stablecoin PancakeSwap pools, extracting BNB and stablecoins.

5. **Flash-loan repayment.** The attacker returned the flash-loaned FTS tokens to PancakeSwap, repaying the flash loan with a small fee, and retained the extracted BNB and stablecoins as profit (~$3M).

The entire attack — flash-loan borrow, proposal creation, proposal voting, proposal execution, mint-authority grant, token mint, liquidity-pool drain, and flash-loan repayment — executed within a single transaction. This is the canonical T12.005 on-chain signature: same-block flash-loan + governance-execution event correlation.

Fortress Protocol's governance contract had three standing vulnerabilities that together enabled the attack: (1) voting power was measured at the current block rather than a prior snapshot block, (2) there was no minimum holding period for governance tokens to confer voting power, and (3) the governance quorum threshold was below the PancakeSwap FTS liquidity depth. Any one of these three mitigations would have prevented the attack — the attacker needed all three vulnerabilities to be absent.

The Fortress Protocol case, occurring less than three weeks after the Beanstalk Farms governance attack (April 17, 2022, Ethereum, ~$182M), and within days of the Elephant Money governance attack (April 12, 2022, BNB Chain, ~$11M), established April–May 2022 as the flash-loan governance attack season — a concentrated window in which three independent protocols on two chains were exploited via structurally identical T12.005 primitives. The Fortress case is the purest T12.005 example of the three: unlike Beanstalk (which used flash-loaned stablecoins to purchase LP tokens in a two-hop acquisition) or Elephant Money (which used flash-loaned BNB to purchase governance tokens), Fortress involved a direct flash loan of the governance token itself from a DEX liquidity pool — the simplest and most direct instantiation of the T12.005 primitive.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-2022-05-08 | Fortress Protocol governance contract deployed on BNB Chain; voting power measured via `balanceOf` at current block; no snapshot mechanism; no minimum holding period; no timelock on proposal execution | **T12.005 surface created** |
| 2022-05-08 (single transaction) | Attacker flash-loans FTS governance tokens from PancakeSwap FTS/BNB pool | **T9.002 precondition** |
| same transaction | Attacker creates governance proposal granting mint authority to attacker-controlled address; votes with flash-loaned FTS tokens; quorum met via flash-loaned voting weight | **T12.005 execution** |
| same transaction | Proposal passes; attacker executes proposal immediately (no timelock); mint authority granted to attacker-controlled address | **T9.003 execution** |
| same transaction | Attacker mints large quantity of new FTS tokens; drains PancakeSwap FTS/BNB and FTS-stablecoin liquidity pools | T9.003 extraction |
| same transaction | Flash-loaned FTS tokens returned to PancakeSwap; attacker retains ~$3M in BNB and stablecoins | **T9.002 closure** |
| Post-2022-05-08 | Fortress Protocol team publicly discloses the attack; protocol paused; governance contract migration announced | (incident response) |

## What defenders observed

- **Pre-event (governance-design layer):** Fortress Protocol's governance contract used a current-balance voting-power function (`balanceOf`) with no snapshot mechanism, no minimum holding period for governance tokens, and no timelock on proposal execution. These were standing T12.005 surfaces from the day the governance contract was deployed.
- **At-event:** the entire attack — flash-loan borrow, proposal creation, proposal voting, proposal execution, mint-authority grant, token mint, liquidity-pool drain, and flash-loan repayment — fit within a single transaction. This is the canonical T12.005 + T9.002 single-transaction signature: a flash-loan borrow event, a governance `ProposalCreated` event, a governance `ProposalExecuted` event, and a token-mint event all firing in the same block from the same attacker address.
- **Post-event:** the Fortress Protocol team's pause-and-migrate response is the standard mitigation chain for a T12.005-class incident: the vulnerable governance contract is deprecated, and a new governance contract with snapshot-based voting power and a timelock is deployed. The economic value extracted by the attacker is unrecoverable absent a voluntary return or law-enforcement seizure.

## What this example tells contributors writing future Technique pages

- **T12.005 is the governance-specific operationalization of T9.002.** The flash loan provides the capital base (T9.002), but the governance contract's design decision to measure voting power at the current block (T12.005) is what makes that capital politically consequential. Contributors tagging incidents with T12.005 should also tag T9.002 (the flash-loan precondition) and T9.003 (the governance-capture outcome) where applicable, but should reserve T12.005 as the primary Technique tag because the governance-design vulnerability is the load-bearing enabler — without it, the flash loan is a capital-availability curiosity, not a governance-attack primitive.
- **The three-mitigation ladder is the key teaching structure for T12.005.** Any one of (1) snapshot-based voting power, (2) minimum governance-token holding period, or (3) quorum threshold above DEX liquidity depth would have independently prevented the Fortress attack. This independence is the structural property that makes T12.005 preventable with defense-in-depth: a protocol can survive a misconfiguration in one mitigation layer if the other two are correctly implemented. Contributors writing T12.005 incident pages should explicitly enumerate which mitigations were absent in each case.
- **The April–May 2022 flash-loan governance attack cluster (Beanstalk, Elephant Money, Fortress Protocol) is a copycat-dynamics case study.** Three independent protocols on two chains exploited via structurally identical T12.005 primitives within six weeks suggests the standard MEV-searcher / exploit-bot operator dynamic: once the Beanstalk attack demonstrated the T12.005 primitive at scale, operators scanned other chains for governance contracts with the same vulnerability signature (`balanceOf`-based voting power, no snapshot, no minimum holding period) and replicated the attack. Contributors writing about cross-chain attack propagation should reference this cluster as a canonical copycat-dynamics example.

## Realised extraction

Approximately $3 million in BNB and stablecoins extracted from Fortress Protocol's PancakeSwap liquidity pools. No material on-chain recovery; no law-enforcement seizure at the OAK v0.1 cutoff.

## Public references

- Fortress Protocol official post-incident disclosure (May 2022) — protocol-side acknowledgment of the governance-contract vulnerability and the flash-loan attack vector.
- BNB Chain / BscScan on-chain trace of the attack transaction — single-transaction flash-loan borrow, proposal creation, proposal execution, token mint, and liquidity-pool drain; the canonical T12.005 on-chain signature.
- Cross-reference: T12.005 (Flash-Loan Governance Vote Manipulation) at `techniques/T12.005-flash-loan-governance-vote-manipulation.md`.
- Cross-reference: T9.002 (Flash-Loan-Enabled Exploit) at `techniques/T9.002-flash-loan-enabled-exploit.md`.
- Cross-reference: T9.003 (Governance Attack) at `techniques/T9.003-governance-attack.md`.
- [`examples/2022-04-beanstalk.md`](../examples/2022-04-beanstalk.md) — Beanstalk Farms governance attack (Ethereum, 2022-04-17, ~$182M) — the largest T12.005 incident and the trigger event for the April–May 2022 flash-loan governance attack cluster.
- `[zhou2023sok]` — academic SoK classifying flash-loan-enabled governance attacks; Fortress Protocol referenced as a T12.005 case.
- `[certik2022fortress]` — CertiK post-incident analysis of the Fortress Protocol flash-loan governance attack (proposed bib key; see below).

### Proposed new BibTeX entries

```bibtex
@misc{certik2022fortress,
  author = {{CertiK}},
  title = {Fortress Protocol Flash Loan Governance Attack — Post-Incident Analysis},
  year = {2022},
  month = may,
  note = {Post-incident analysis of the ~$3M Fortress Protocol flash-loan governance attack on BNB Chain; canonical T12.005 case with single-transaction flash-loan borrow + proposal creation + proposal execution on-chain signature.},
}
```
