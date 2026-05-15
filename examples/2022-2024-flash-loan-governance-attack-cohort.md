# Flash-Loan Governance Attack Cohort — 2022–2024 — Aggregate $200M+ Nominal, ~$190M+ Realised

**Loss:** Aggregate nominal loss spans approximately $200M+ across the flash-loan governance attack sub-cohort (Beanstalk: ~$182M in April 2022; Fortress Protocol: ~$3M in May 2022; Elephant Money: ~$11M in April 2022; smaller flash-loan governance attacks through 2023–2024). Realised extraction is approximately $190M+ — the Beanstalk attacker extracted the full ~$182M of protocol-controlled assets; Fortress and Elephant Money extraction was near-complete. The cohort is the highest-dollar flash-loan-as-governance-vote sub-class in the OAK corpus.

**OAK Techniques observed:** **OAK-T12.005** (Flash-Loan Governance Vote Manipulation — the attacker acquires governance voting power via uncollateralized flash-loan borrowing rather than through market purchase, delegation, or long-term accumulation. The attacker borrows a controlling quantity of governance tokens from DEX liquidity pools, uses the temporary voting power to create, vote on, and execute a malicious governance proposal, and repays the flash loan within the same transaction.) **OAK-T12.004** (Timelock-Free Protocol Upgrade Execution — the governance design anti-pattern in which the protocol's upgrade authority can execute a protocol upgrade without a mandatory timelock delay between governance approval and on-chain execution. The absence of a timelock eliminates the user-exit window and converts a governance-compromise event into an immediate full-protocol extraction.) **OAK-T9.002** (Flash-Loan-Enabled Exploit — the parent-class Technique for any exploit whose capital base is provided by a flash loan. The T9.002 surface is the capital-availability precondition; the T12.005 surface is the governance-design vulnerability that makes that capital politically consequential.)

**Attribution:** **unattributed** — Beanstalk attacker operated independently; Fortress Protocol and Elephant Money attackers operated independently. No cross-protocol pattern-of-conduct linking the three major cases has been established in the public forensic record. The smaller 2023–2024 flash-loan governance attacks are typically unattributed or attributed to opportunistic single-actor operations.

**Key teaching point:** **The flash-loan governance attack is the canonical illustration of why governance-voting-power measurement design is a security-critical decision, not a governance-process convenience.** A governance contract that measures voting power at the block height of proposal execution (or proposal creation, but at the same block height at which tokens can be flash-loaned) is structurally vulnerable to T12.005 regardless of any other governance security property — regardless of quorum thresholds, proposal-review processes, or multisig hardening. The fix is a single design decision: measure voting power at a prior snapshot block that precedes the proposal-creation block by a window longer than the flash-loan duration. The fix is simple but load-bearing — and the six-week window in April–May 2022 during which Beanstalk, Fortress Protocol, and Elephant Money were all exploited via flash-loan governance attacks demonstrates that the vulnerability class was both well-understood and systematically unmitigated across the DeFi governance ecosystem at that time.

## Summary

The flash-loan governance attack cohort of 2022 is the textbook case of a vulnerability class emerging, being demonstrated at catastrophic scale, and driving a systematic mitigation response across the DeFi governance ecosystem within a single year.

### The Primitive: Flash-Loan-Acquired Voting Power

The attack primitive exploits two properties of DeFi governance design:

1. **Governance tokens are liquid.** They trade on DEXs with deep liquidity pools. A flash loan can borrow a controlling quantity of governance tokens from those pools in a single transaction.
2. **Voting power is measured at the current block.** Many governance contracts compute voting power as `balanceOf(tokenHolder)` at the block of proposal execution, rather than at a prior snapshot block. If governance tokens can be acquired at block N and voting power is measured at block N, flash-loan-acquired tokens confer legitimate voting power.

The attacker's transaction is atomically structured:

- Borrow governance tokens from DEX liquidity pools via flash loan
- Create and vote on a malicious governance proposal using the borrowed tokens as voting power
- Execute the proposal (treasury drain, mint-authority grant, or contract upgrade)
- Repay the flash loan with a small fee
- Exit with the extracted value

The entire sequence executes within a single transaction or across a tightly-clustered set of transactions within the same block. The governance contract sees legitimate voting power from a token holder who held the tokens at the block of proposal execution — the contract has no mechanism to distinguish flash-loan-acquired voting power from long-term-holder voting power.

### The Three Canonical Cases (April–May 2022)

**Beanstalk Farms — Ethereum — April 17, 2022 — ~$182M.** The canonical T12.005 anchor and the largest flash-loan governance attack in the OAK corpus. The attacker borrowed approximately $1B worth of assets via flash loan (including ~350M BEAN, ~182M USDC, ~148M USDT, and large quantities of BEAN/ETH and BEAN/3CRV LP tokens), used the borrowed BEAN and LP tokens to acquire controlling voting power in Beanstalk's governance, submitted and passed BIP-18 (a malicious proposal granting the attacker the ability to drain the Beanstalk treasury), executed the drain, repaid the flash loans, and exited with approximately $182M in protocol-controlled assets. The governance contract had no snapshot mechanism and no minimum holding period — voting power was measured at the block of proposal execution. Flash-loan fees were approximately $30K in ETH gas; the extraction-to-cost ratio exceeded 6,000:1. The attacker donated 250K USDC to Ukraine Crypto Donation as a signalling gesture.

**Elephant Money — BSC — April 12, 2022 — ~$11M.** The attacker flash-loaned a controlling quantity of ELEPHANT governance tokens, created and passed a malicious proposal granting themselves mint authority over the TRUNK stablecoin, minted approximately $11M worth of TRUNK, and exited via PancakeSwap swap paths. The governance contract measured voting power at the block of proposal execution. The case is the BSC-side counterpart to Beanstalk on Ethereum, demonstrating that the vulnerability class was chain-portable within the same month.

**Fortress Protocol — BSC — May 8, 2022 — ~$3M.** The attacker flash-loaned a controlling quantity of FTS governance tokens, created and passed a malicious proposal draining the Fortress treasury, and exited. The Fortress case closed the six-week window (April 2–May 8, 2022) during which three major flash-loan governance attacks exploited the same vulnerability class across Ethereum and BSC, establishing T12.005 as a de-facto-recognised attack class by mid-May 2022.

### T12.004: The Timelock-Free Amplification Surface

The absence of a mandatory timelock between governance approval and execution (T12.004) is the load-bearing amplification surface for T12.005. A flash-loan governance attack on a timelock-protected protocol queues a malicious proposal that executes after the timelock delay — giving users an exit window and governance participants a review window. A flash-loan governance attack on a timelock-free protocol executes instantly — no user exit window, no governance review window, and the extraction is atomic within the attack transaction.

All three canonical cases (Beanstalk, Elephant Money, Fortress Protocol) exploited protocols without mandatory timelocks between proposal approval and execution. The attacker did not need to hold the flash-loaned governance tokens beyond the single block of the attack — the absence of a timelock meant that proposal creation, voting, and execution could all occur within the same transaction. A mandatory 24-hour timelock would have forced the attacker to hold the borrowed governance tokens across blocks, making the flash-loan primitive structurally infeasible (the flash loan must be repaid within the same transaction).

### The Post-2022 Mitigation Response

The six-week window of April–May 2022 drove a systematic governance-design response across the DeFi ecosystem:

- **Snapshot-based voting power:** governance contracts migrated from current-block `balanceOf` to prior-block `getPriorVotes` (or equivalent snapshot mechanisms), measuring voting power at a block that precedes the proposal-creation block.
- **Minimum holding periods:** some protocols enforced a minimum governance-token holding period (N blocks) before tokens confer voting power — a stronger guarantee than snapshot-block alone.
- **Timelock-gated execution:** mandatory timelocks between proposal approval and execution became standard, eliminating same-block flash-loan-vote-and-execute atomicity.

By mid-2023, the T12.005 vulnerability class was substantially mitigated at the governance-contract-design layer for major DeFi protocols. Smaller protocols and fork-substrate DAOs that inherit governance contracts from pre-2022 reference implementations without the post-2022 snapshot/timelock mitigations remain vulnerable — the class is "mitigated at the top, standing at the tail."

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-04-12 | Elephant Money: flash-loan governance attack; ~$11M extracted via mint-authority grant on BSC | T12.005 |
| 2022-04-17 | Beanstalk Farms: flash-loan governance attack; ~$182M extracted via treasury drain on Ethereum — largest T12.005 case in corpus | T12.005 + T12.004 (canonical anchor) |
| 2022-05-08 | Fortress Protocol: flash-loan governance attack; ~$3M extracted on BSC | T12.005 |
| 2022 mid–late | Systematic governance-design migration: snapshot-based voting power, minimum holding periods, timelock-gated execution adopted across major DeFi DAOs | T12.005 + T12.004 (mitigation response) |
| 2023–2024 | Smaller-DAO flash-loan governance attacks continue at fork-substrate protocols inheriting pre-2022 governance contracts without snapshot/timelock mitigations | T12.005 + T12.004 (ongoing at tail) |

## Public references

- Beanstalk Farms BIP-18 post-mortem and on-chain forensic analysis (April 2022)
- Elephant Money flash-loan governance attack post-mortem (April 2022)
- Fortress Protocol treasury-drain post-mortem (May 2022)
- `[zhou2023sok]` — academic taxonomy documenting flash-loan governance attacks as a recurring sub-class
- See `techniques/T12.005-flash-loan-governance-vote-manipulation.md` and `techniques/T12.004-timelock-free-protocol-upgrade-execution.md` for Technique definitions
- Cross-reference: `techniques/T9.002-flash-loan-enabled-exploit.md` (parent class — flash-loan-as-capital-base precondition)

## Discussion

The flash-loan governance attack cohort is the canonical illustration of a **design-level governance vulnerability** — the attacker does not exploit a smart-contract bug (no reentrancy, no integer overflow, no access-control miss) but rather exploits a governance-design decision (voting power measured at current block, no mandatory timelock) that is technically within the governance contract's specification but economically inconsistent with the protocol's intended governance-security model. The attack's sophistication is not in the exploit primitive (which is straightforward: borrow, vote, drain, repay) but in the governance-design conditions that make the primitive possible.

The concentration of three major attacks within a six-week window (April–May 2022) suggests that the vulnerability class was either being independently discovered by multiple attackers within a short period, or that the Beanstalk case (April 17, publicly visible at catastrophic scale) inspired copycat attacks on Elephant Money (April 12 — actually preceding Beanstalk by 5 days, suggesting independent discovery) and Fortress Protocol (May 8 — 21 days after Beanstalk, consistent with copycat timing). The temporal clustering is itself a forensic signal: a vulnerability class that produces three catastrophic incidents within six weeks is a class whose time-to-exploitation is near-zero once discovered — the governance-design conditions that enable it are widespread, the attack is mechanically simple, and the extraction-to-cost ratio is extreme.
