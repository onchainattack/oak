# Q1–Q2 2026 Flash-Loan, Approval and Slippage Exploit Cohort — Matcha, Cyrus Finance, YO Protocol, Aperture LM — Aggregate ~$24.4M

**OAK Techniques observed:** OAK-T9.002, OAK-T9.004

**Attribution:** **unattributed** (aggregate cohort).
**Loss:** Matcha ~$13.43M (unlimited-approval exploit across Base and Ethereum — attacker leveraged pre-existing unlimited ERC-20 approvals to drain approved tokens); Cyrus Finance ~$5M (flash-loan pool-shares exploit on BSC); YO Protocol ~$3.73M (slippage exploit on Ethereum — missing or misconfigured slippage guard enabled value extraction); Aperture LM ~$3.2M (unclassified protocol-logic exploit across Ethereum, Base, and BSC). Aggregate ~$24.4M across four incidents, January–March 2026.

**Key teaching point:** Four incidents in Q1–Q2 2026 exploit structural gaps in the DeFi transaction-authorisation pipeline: unlimited approvals that outlive their intended use (Matcha), flash-loan-capitalised share-price manipulation (Cyrus Finance), missing slippage bounds that turn every trade into a value-extraction opportunity (YO Protocol), and multi-chain deployment surfaces where a logic gap on one chain propagates across the deployment footprint (Aperture LM). The common thread is **a value-transfer path that the protocol authorised once and never re-validated — or never constrained in the first place.**

## Summary

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2026-01-13 | YO Protocol: slippage exploit on Ethereum drains ~$3.73M; missing or misconfigured `minAmountOut` parameter enables the attacker to extract value from every swap | **T9.004** (missing slippage guard — a parameter-validation access-control gap) |
| 2026-01-25 | Matcha: unlimited-approval exploit across Base and Ethereum; ~$13.43M extracted from users who had granted infinite ERC-20 approvals to Matcha's contract; attacker exploits the standing-approval surface | **T9.004** (unlimited-approval anti-pattern — standing token approval without revocation mechanism) |
| 2026-01-25 | Aperture LM: unclassified protocol-logic exploit across Ethereum, Base, and BSC; ~$3.2M extracted; multi-chain deployment surface amplifies the loss | **T9.004** (protocol-logic access-control gap) |
| 2026-03-22 | Cyrus Finance: flash-loan pool-shares exploit on BSC drains ~$5M; attacker uses flash-loan capital to manipulate pool-share accounting, then extracts against the distorted share price | **T9.002** (flash-loan capital acquisition), **T9.011** (pool-share accounting manipulation) |

## Matcha — Unlimited-Approval Standing Surface

On January 25, 2026, Matcha — a DEX aggregator operating on Base and Ethereum — was exploited for ~$13.43M via an unlimited-approval exploit. Users who had granted infinite (or excessively high) ERC-20 token approvals to Matcha's smart contracts had their approved tokens drained. The attacker did not exploit a smart-contract bug in the traditional sense; they exploited the **standing-approval surface** — the aggregate of all unlimited ERC-20 approvals that users had granted to Matcha's contracts over months or years of normal usage.

The incident is structurally identical to the TrustedVolumes pre-existing-approval drain (May 2026, T9.004) but at DEX-aggregator scale: the protocol's contracts held transfer authority over user tokens via the ERC-20 approval mechanism, and an attacker who gained control of the contract (or exploited a path that invoked `transferFrom` with attacker-controlled parameters) could drain every approved token in a single transaction.

The defender lesson is that **the ERC-20 approval model is a standing-access-control surface**: every `approve(spender, type(uint256).max)` call creates a permanent value-transfer path from the user's wallet to the spender contract. The approval is not use-limited, time-limited, or context-limited — it is a blanket authorisation that persists until explicitly revoked.

**OAK mapping:** T9.004 (unlimited-approval anti-pattern — standing ERC-20 approval surface without time-bound, use-bound, or revocable constraints).

## Cyrus Finance — Flash-Loan Pool-Shares Exploit

On March 22, 2026, Cyrus Finance on BSC was exploited for ~$5M via a flash-loan-enabled pool-shares exploit. The attacker acquired flash-loan capital, used it to manipulate the pool's share-price accounting, and extracted value against the distorted share price in a single atomic transaction. The exploit combines T9.002 (flash loan for capital acquisition) with a share-price manipulation primitive structurally similar to T9.011 — the pool's share-accounting formula was distorted by the sudden capital injection, and the distortion favoured the attacker.

**OAK mapping:** T9.002 (flash-loan-enabled capital acquisition) + T9.011 (pool-share accounting manipulation via sudden capital injection).

## YO Protocol — Missing Slippage Guard

On January 13, 2026, YO Protocol on Ethereum was exploited for ~$3.73M via a slippage exploit. The protocol's swap path lacked a `minAmountOut` constraint (or the constraint was misconfigured to allow unbounded slippage), enabling the attacker to extract value from every trade by setting the output amount to the attacker's favour. A missing slippage guard is a T9.004 sub-pattern: the `minAmountOut` parameter is an access-control boundary on the acceptable extraction per trade, and omitting it is a parameter-validation access-control gap.

**OAK mapping:** T9.004 (missing slippage guard — parameter-validation access-control gap on `minAmountOut`).

## Aperture LM — Multi-Chain Protocol-Logic Exploit

On January 25, 2026, Aperture LM — deployed across Ethereum, Base, and BSC — was exploited for ~$3.2M. The DeFiLlama classification lists no specific technique, suggesting a protocol-logic access-control gap rather than an oracle, flash-loan, or reentrancy exploit. The multi-chain deployment surface (three chains) amplified the loss: a logic gap in the shared contract codebase was exploitable on every chain where the contract was deployed.

**OAK mapping:** T9.004 (protocol-logic access-control gap, multi-chain propagation).

## Public references

- Matcha: DeFiLlama classification as "Unlimited Approval Exploit" on Base/Ethereum
- Cyrus Finance: DeFiLlama classification as "Flashloan Pool Shares Exploit" on BSC
- YO Protocol: DeFiLlama classification as "Slippage Exploit" on Ethereum
- Aperture LM: DeFiLlama classification as unclassified protocol-logic exploit across Ethereum, Base, BSC
- Cross-reference: T9.002 at `techniques/T9.002-flash-loan-enabled-exploit.md`; T9.004 at `techniques/T9.004-access-control-misconfiguration.md`; T9.011 at `techniques/T9.011-precision-loss-rounding-attack.md`

## Discussion

The Q1–Q2 2026 flash-loan, approval, and slippage cohort illustrates three distinct but related DeFi authorisation failures:

**Matcha's unlimited-approval drain is the highest-loss incident in the cohort ($13.43M) and the most structurally difficult to defend against** because the vulnerability is not in the protocol's code but in the ERC-20 approval model itself. Every DEX aggregator, lending protocol, and yield vault accumulates a standing-approval surface over time — the sum of all user-granted `approve(max)` calls. This surface is invisible to the user (wallets display it as "approved" with no dollar value), grows with every new user, and cannot be revoked at scale without per-token, per-spender transactions. ERC-20 Permit (EIP-2612) and transient approvals are partial mitigations but require protocol adoption; the standing-approval surface of existing deployments will persist until the approval model is deprecated at the standard layer.

**Cyrus Finance is the canonical 2026 T9.002 + T9.011 combination**: flash-loan capital acquisition (T9.002) enables the pool-share accounting manipulation (T9.011). The two Techniques are operationally coupled — the flash loan provides the capital to distort the share price; the accounting manipulation converts the distortion into extractable value. The Cyrus case is structurally similar to the Venus Protocol supply-cap donation attack (March 2026) but targets pool-share accounting rather than lending-market exchange rates.

**YO Protocol's missing slippage guard is the simplest fix with the highest leverage**: adding a `minAmountOut` parameter to the swap path would have closed the exploit entirely. The fact that a slippage-guard omission caused a $3.73M loss in January 2026 — nearly six years after the first AMM slippage exploits — suggests that the DEX-deployment checklist (slippage guard, deadline, recipient validation) is not systematically enforced at the audit or deployment-review layer.

**Aperture LM's multi-chain surface** reinforces a pattern seen across the 2026 cohort: protocols that deploy the same contract codebase to multiple chains multiply their exploit surface. A logic gap that is exploitable on one chain is exploitable on all of them, and the attacker can drain all chains in parallel or in sequence before detection propagates across chains.
