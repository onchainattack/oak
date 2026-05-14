# Elephant Money flash-loan governance attack — BNB Chain — 2022-04-12

**Loss:** approximately $11 million in ELEPHANT tokens and BNB drained from the Elephant Money treasury. The attacker flash-loaned BNB, used it to acquire ELEPHANT governance tokens from PancakeSwap liquidity pools, created and passed a malicious governance proposal granting mint authority, and drained the protocol's treasury — all within a single transaction.

**OAK Techniques observed:** **OAK-T12.005** (Flash-Loan Governance Vote Manipulation — primary; the attacker flash-loaned BNB to acquire a controlling quantity of ELEPHANT governance tokens, created and passed a malicious governance proposal within the same transaction, and drained the treasury). **OAK-T9.002** (Flash-Loan-Enabled Exploit — structurally co-occurring; the flash-loaned BNB was the capital base for the governance-token acquisition). **OAK-T9.003** (Governance Attack — the governance-capture outcome; the malicious proposal granted the attacker treasury-drain authority).

**Attribution:** **pseudonymous** attacker; no public named-individual attribution at v0.1. The attacker's on-chain address and the contract that executed the malicious proposal are publicly identifiable on BNB Chain, but the address has not been linked to a named individual or a known operator-cluster.

**Key teaching point:** **Elephant Money is the second BNB Chain T12.005 incident in the April–May 2022 flash-loan governance attack season (preceding Fortress Protocol by 26 days) and demonstrates the copycat dynamic: the Beanstalk attack on Ethereum (April 17, 2022) occurred five days after Elephant Money, meaning the BNB Chain flash-loan governance attack class matured independently and in parallel with Ethereum — not as a copycat of Beanstalk.** The Elephant Money case uses a two-hop acquisition primitive (flash-loaned BNB used to purchase governance tokens from DEX pools) rather than a direct flash loan of the governance token itself, making it structurally intermediate between Beanstalk's multi-hop LP-token acquisition and Fortress's direct governance-token flash loan. The case demonstrates that flash-loan governance attacks are feasible on any chain where: (a) a DEX has sufficient governance-token liquidity relative to the quorum threshold, (b) the governance contract measures voting power at the current block, and (c) there is no minimum holding period or snapshot mechanism.

## Summary

Elephant Money was a DeFi protocol on BNB Chain (formerly Binance Smart Chain) that issued ELEPHANT, a token with a treasury-backed value-accrual mechanism. Governance of the protocol was controlled by ELEPHANT token holders through an on-chain governance contract that allowed token holders to create and vote on proposals for protocol parameter changes, treasury allocations, and contract upgrades. The governance contract measured voting power using the current ELEPHANT token balance of each voter — the canonical T12.005 `balanceOf`-based voting-power computation with no snapshot mechanism and no minimum holding period.

On April 12, 2022, an attacker identified the governance contract's flash-loan-votable design and executed a single-transaction governance attack:

1. **Flash-loan BNB.** The attacker took out a flash loan of BNB from PancakeSwap's BNB liquidity pools — the largest source of BNB liquidity on BNB Chain. The borrowed BNB quantity was calibrated to acquire sufficient ELEPHANT governance tokens to exceed the protocol's quorum threshold.

2. **Acquire governance tokens (two-hop).** Within the same transaction, the attacker used the flash-loaned BNB to purchase ELEPHANT tokens from PancakeSwap's ELEPHANT/BNB liquidity pool. Unlike Fortress Protocol (where the attacker flash-loaned the governance token itself), Elephant Money required a two-hop acquisition: flash-loan BNB, swap BNB to ELEPHANT on PancakeSwap.

3. **Proposal creation and voting.** With the acquired ELEPHANT tokens, the attacker created a governance proposal granting a new address (controlled by the attacker) mint authority over the ELEPHANT token contract or treasury-drain authority. Because the governance contract measured voting power at the current block using `balanceOf`, the just-acquired ELEPHANT tokens conferred legitimate voting power. The attacker voted in favour of their own proposal, meeting quorum and passing the proposal.

4. **Proposal execution and drain.** The governance contract's proposal-execution function was callable immediately after proposal passage — no mandatory timelock delay existed (structurally parallel to T12.004 timelock-free execution). The attacker executed the proposal in the same transaction and drained the protocol's treasury of approximately $11M in ELEPHANT tokens and BNB.

5. **Flash-loan repayment.** The attacker sold the acquired ELEPHANT tokens back to PancakeSwap to recover BNB, repaid the flash loan, and retained the extracted treasury assets as profit (~$11M).

The entire attack — flash-loan BNB, swap-to-ELEPHANT, proposal creation, proposal voting, proposal execution, treasury drain, ELEPHANT-to-BNB swap-back, and flash-loan repayment — executed within a single transaction. This is the canonical two-hop T12.005 on-chain signature: same-block flash-loan (BNB) + governance-token acquisition (ELEPHANT swap) + governance-execution event correlation.

The Elephant Money case, occurring on April 12, 2022, preceded the Beanstalk Farms attack (April 17, 2022, Ethereum, ~$182M) by five days and the Fortress Protocol attack (May 8, 2022, BNB Chain, ~$3M) by 26 days. The Elephant Money and Beanstalk incidents occurred within the same week on different chains, suggesting the flash-loan governance attack primitive was being independently identified and exploited across chains rather than propagating as a single-chain copycat dynamic. The Fortress incident followed as the third T12.005 case, using the direct-governance-token flash-loan variant and completing the April–May 2022 flash-loan governance attack season.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-2022-04-12 | Elephant Money governance contract deployed on BNB Chain; voting power measured via `balanceOf` at current block; no snapshot mechanism; no minimum holding period; no timelock on proposal execution | **T12.005 surface created** |
| 2022-04-12 (single transaction) | Attacker originates flash loan of BNB from PancakeSwap BNB liquidity pools | **T9.002 precondition** |
| same transaction | Attacker swaps flash-loaned BNB for ELEPHANT governance tokens on PancakeSwap ELEPHANT/BNB pool; acquires controlling voting weight | **T12.005 execution (two-hop acquisition)** |
| same transaction | Attacker creates governance proposal granting treasury-drain authority to attacker-controlled address; votes with acquired ELEPHANT tokens; quorum met via flash-loan-funded voting weight | **T12.005 + T9.003 execution** |
| same transaction | Proposal passes; attacker executes proposal immediately (no timelock); treasury drained of ~$11M in ELEPHANT and BNB | T9.003 extraction |
| same transaction | Attacker swaps remaining ELEPHANT back to BNB; repays flash loan; retains ~$11M profit | **T9.002 closure** |
| 2022-04-12 onward | Elephant Money team publicly discloses the attack; protocol paused; governance contract migration announced | (incident response) |
| 2022-04-17 | Beanstalk Farms flash-loan governance attack on Ethereum (~$182M) — five days after Elephant Money, confirming the cross-chain T12.005 class maturity in April 2022 | **T12.005 class recurrence (Ethereum)** |
| 2022-05-08 | Fortress Protocol flash-loan governance attack on BNB Chain (~$3M) — 26 days after Elephant Money, confirming the BNB Chain T12.005 class maturity | **T12.005 class recurrence (BNB Chain)** |

## Realised extraction

~$11M in ELEPHANT tokens and BNB drained from the Elephant Money treasury. Recovery status: no material recovery disclosed as of v0.1.

## Public references

- Elephant Money official post-mortem and governance contract migration announcement (April 2022).
- Peckshield / BlockSec on-chain transaction analysis and tracing reports for the Elephant Money exploit.
- Cross-reference: T12.005 at `techniques/T12.005-flash-loan-governance-vote-manipulation.md`.
- Cross-reference: [`examples/2022-04-beanstalk.md`](2022-04-beanstalk.md) — Beanstalk Farms flash-loan governance attack (Ethereum, ~$182M, 2022-04-17).
- Cross-reference: [`examples/2022-05-fortress-protocol-flash-loan-governance-attack.md`](2022-05-fortress-protocol-flash-loan-governance-attack.md) — Fortress Protocol flash-loan governance attack (BNB Chain, ~$3M, 2022-05-08).

## Discussion

Elephant Money is the first BNB Chain T12.005 incident in the April–May 2022 flash-loan governance attack season, preceding Fortress Protocol by 26 days and occurring within the same week as the Beanstalk Farms attack on Ethereum. The temporal clustering — Elephant Money (April 12, BNB Chain), Beanstalk (April 17, Ethereum), Fortress Protocol (May 8, BNB Chain) — across two chains and three independent protocols within six weeks establishes T12.005 as a cross-chain class with independent discovery and exploitation.

Three structural observations:

- **The two-hop acquisition primitive is structurally intermediate between direct flash-loan governance-token acquisition (Fortress) and multi-hop LP-token acquisition (Beanstalk).** Elephant Money's attacker flash-loaned BNB and swapped to ELEPHANT on a DEX — a two-hop primitive that requires the governance token to have sufficient DEX liquidity relative to quorum. Fortress's attacker flash-loaned the governance token directly — the simplest and most direct T12.005 instantiation. Beanstalk's attacker flash-loaned stablecoins, deposited into a Curve pool to mint LP tokens, and used those LP tokens for governance — a three-hop primitive that required deep stablecoin liquidity and a governance token with LP-token-based voting weight. The three cases together span the acquisition-primitive complexity spectrum for T12.005.

- **The April–May 2022 flash-loan governance attack season demonstrates independent cross-chain discovery of the T12.005 primitive.** Elephant Money (BNB Chain, April 12) and Beanstalk (Ethereum, April 17) occurred five days apart on different chains. The temporal proximity suggests the T12.005 primitive was being independently identified and exploited by different operators across chains, rather than propagating as a single-chain copycat dynamic from a single canonical incident. The Fortress incident (BNB Chain, May 8) may have been copycat behaviour following the publicity of Beanstalk, but the Elephant Money case predates Beanstalk — the primitive was live on BNB Chain before the Ethereum flagship incident.

- **The three cases converge on the same governance-design vulnerabilities.** Elephant Money, Beanstalk, and Fortress all had: (a) voting power measured at the current block via `balanceOf` (no snapshot mechanism), (b) no minimum governance-token holding period, and (c) insufficient DEX liquidity depth relative to quorum. The convergence on this vulnerability triad across three independent protocols on two chains confirms that these are the load-bearing governance-design preconditions for T12.005 — and that any governance contract exhibiting all three preconditions is structurally vulnerable regardless of chain.
