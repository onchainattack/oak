# Euler Finance lending exploit — Ethereum — 2023-03-13

**Loss:** \~\$197M total at time of exploit (\~\$136M stETH, \~\$34M USDC, \~\$19M WBTC, \~\$8.7M DAI).
**Recovery:** full return. The attacker (self-identified in on-chain encrypted messages as "Jacob") returned 3,000 ETH on 2023-03-18, 51,000 ETH on 2023-03-25, and an additional \~7,000 ETH plus \~\$10M DAI in subsequent stages. Net loss to the protocol after recovery: effectively zero in principal, with residual price-impact and downstream-protocol exposure absorbed by Euler and integrating protocols separately.
**OAK Techniques observed:** OAK-T9.004 (Access-Control Misconfiguration — missing solvency check on `donateToReserves`) as the extraction mechanism; OAK-T9.002 (Flash-Loan-Enabled Exploit) as the precondition that scaled the extraction to nine figures.
**Attribution:** pseudonymous attacker; self-identified as "Jacob" in on-chain messages during the recovery negotiation. No public named-individual attribution beyond that self-claim. Pre-event funding for gas was routed through Tornado Cash, observable on-chain but not the primary OAK framing for this incident.

## Summary

Euler Finance was an Ethereum-based permissionless lending protocol whose accounting maintained two paired tokens per market: an interest-bearing deposit receipt (eDAI for the DAI market) and a debt token (dDAI). On 2023-03-13, an attacker exploited a missing solvency check in Euler's `donateToReserves` function — a function intended to allow users to voluntarily donate accrued interest to the protocol's reserve, but which did not call the standard `checkLiquidity` post-condition that all other balance-affecting Euler entry points called. Using a flash-loaned principal of \~\$30M DAI from Aave as working capital, the attacker repeatedly cycled deposits, leveraged borrows, partial repayments, and donations to engineer a state in which a controlled "violator" account held a debt position substantially larger than its collateral position. The attacker then `liquidate()`'d the violator from a second controlled account, harvesting the discounted collateral. The cycle was repeated across the stETH, USDC, WBTC, and DAI markets, draining \~\$197M before the flash loan was repaid. Euler paused the affected contracts the same day. Over the following two weeks, the attacker negotiated via on-chain messages and returned the full principal in stages. Industry forensic write-ups were published by Chainalysis, Halborn, Elliptic, and BlockSec; all four converged on the same root-cause description.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Days before | Attacker contract deployed; deployment gas funded via Tornado Cash withdrawal | (off-OAK pre-event observation) |
| 2023-03-13 ~08:50 | Aave flash loan of \~\$30M DAI taken as working capital | **T9.002 precondition** |
| 2023-03-13 (single attack tx, multiple iterations) | \~\$20M deposited to Euler DAI market, receiving \~\$20M eDAI | T9.004 setup |
| same iteration | 10x leveraged borrow via Euler's `mint` — minting eDAI and dDAI in a paired ratio | T9.004 setup |
| same iteration | Remaining \~\$10M DAI used to repay part of the dDAI debt | T9.004 setup |
| same iteration | `mint` called again to re-leverage | T9.004 setup |
| same iteration | `donateToReserves` called with \~10x of the repaid amount — burning eDAI without burning the paired dDAI, and **without a solvency check** | **T9.004 execution** |
| same iteration | Account now insolvent by construction (eDAI \< dDAI); a second attacker-controlled account calls `liquidate()` against the "violator", receiving discounted collateral | **T9.004 extraction** |
| 2023-03-13 (continued) | Cycle repeated across stETH, USDC, WBTC, DAI markets | T9.004 repeat |
| 2023-03-13 | Aave flash loan repaid; net \~\$197M retained across markets | T9.002 closure |
| 2023-03-13 | Euler pauses affected contracts | (defender response) |
| 2023-03-18 | 3,000 ETH returned by attacker via on-chain transaction with encrypted message | (recovery) |
| 2023-03-25 | 51,000 ETH returned | (recovery) |
| Subsequent | \~7,000 ETH and \~\$10M DAI returned in further stages | (recovery) |

## What defenders observed

- **Pre-event (code-review layer):** every other Euler entry point that mutated user balances (`deposit`, `withdraw`, `borrow`, `repay`, `mint`, `burn`, `transfer`) called `checkLiquidity` as a post-condition. `donateToReserves` did not. The function was added in EIP-14, a later upgrade, and the missing call is visible in the pre-exploit deployed bytecode. A standing T9.004 surface from the day EIP-14 was deployed.
- **At-event:** the attack signature is the canonical T9.004 pattern atop T9.002 working capital — a single contract iterates through `deposit → mint → repay → mint → donateToReserves → liquidate` calls, with a flash loan opening and closing the iteration window. Each market drain looks structurally identical to the previous one.
- **Post-event (recovery channel):** on-chain encrypted messages between Euler and the attacker became the recovery channel. Recovery via attacker-initiated return is rare in T9-class incidents (Euler, Poly Network 2021, Mango Markets 2022 are the principal v0.1 reference cases) and should not be assumed in mitigation planning. The base-rate expectation for a successful T9.004 extraction is total loss.
- **Cross-protocol blast radius:** Euler's stETH market drain forced unwinds in protocols that had treated eDAI/eWBTC/eUSDC/estETH as composable building blocks. Defenders observed secondary mark-to-market losses at integrating protocols even before Euler's pause propagated.

## What this example tells contributors writing future Technique pages

- **T9.004 (access-control misconfiguration) is rarely the *only* OAK Technique in a real incident.** The missing solvency check on `donateToReserves` was the *extraction mechanism*, but \~\$30M of working capital from Aave was the *precondition* without which the extraction would have netted thousands of dollars, not nine figures. Worked examples should distinguish the precondition Technique (here: T9.002) from the extraction Technique (here: T9.004) and resist the temptation to label the incident with only the most visible one. The Beanstalk worked example at `/examples/2022-04-beanstalk.md` makes the same point for T9.002 + T9.003.
- **"One missing modifier" is a real failure mode and deserves explicit T9.004 vocabulary.** Euler's exploit was not a logic bug in the sense of "the math was wrong"; the math was right, but the invariant-restoring check that *every other path* called was absent on one path. T9.004 contributors should make the audit-checklist framing explicit: enumerate every state-mutating entry point and verify each one calls the same post-condition. Diff-based audits that focus only on the upgrade's new code (here, EIP-14) miss this if the omitted call is a sin of omission rather than a line of new code.
- **Recovery is not mitigation.** Euler recovered the principal; this does not retire the T9.004 surface. Worked examples should report recovery as a factual outcome but should not let recovery soften the Technique's standing severity rating. The base rate for T9.004 incidents is total loss.
- **Pre-event Tornado Cash funding for gas is a defender-side observation, not a separate Technique.** OAK-T7.001 covers mixer-routed laundering of *proceeds*. Pre-event mixer use to fund a deployment wallet is a known indicator-of-preparation but does not retroactively make the incident a T7.001 case. Contributors should keep the framing tight to the extraction path.

## Public references

- [Euler Labs — Official statement on the exploit](https://www.eulerfinance.com/blog/euler-finance-march-13-2023) — protocol-side post-mortem and recovery summary.
- [Halborn — Explained: The Euler Finance Hack (March 2023)](https://www.halborn.com/blog/post/explained-the-euler-finance-hack-march-2023) — detailed function-level walkthrough.
- [Chainalysis — The Euler Finance Hack: Funds Recovered](https://www.chainalysis.com/blog/euler-finance-hack-funds-recovered/) — recovery and tracing analysis.
- [BlockSec — Behind the scenes: the cause of the Euler Finance attack](https://blocksec.com/blog/behind-the-scenes-the-cause-of-the-euler-finance-attack) — root-cause analysis on the missing solvency check.
- [Elliptic — Euler Finance hacker returns nearly all of stolen \$200 million](https://www.elliptic.co/blog/euler-finance-hacker-returns-nearly-all-of-stolen-200-million) — laundering and recovery tracing.
- `[zhou2023sok]` — academic taxonomy classifying this as a flash-loan-enabled access-control-misconfiguration chain.
- `[chainalysiseuler2023]`, `[halborneuler2023]`, `[blocksec2023euler]`, `[elliptipeuler2023]` — Euler-specific forensic write-ups (proposed citation keys; see `citations.bib`).

## Discussion

Euler is OAK's canonical T9.004 case because the failure mode is unusually clean. The vulnerability is one missing function call in one function on one upgrade; the public root-cause analyses from four independent firms (Chainalysis, Halborn, Elliptic, BlockSec) agree on every material detail; the dollar loss is large enough to be unambiguously meaningful; and the cross-protocol blast radius into integrating DeFi positions makes the case useful for discussions of composability risk. The full-recovery outcome, while genuinely unusual, is a footnote to the Technique classification rather than a modifier of it: the same exploit, executed by an attacker who immediately laundered through cross-chain bridges, would have been a permanent \~\$197M loss, and the standing T9.004 mitigation guidance (enumerate every state-mutating entry point; verify each one calls the same post-condition; treat post-condition uniformity as an audit-pass criterion) is the same in either world. As of 2024-2025, post-Euler audit checklists at top-tier DeFi protocols routinely include a "post-condition uniformity" step explicitly because of this incident — the attack surface contracted as the standard audit pattern improved.
