# DeFiTuna — concentrated liquidity, lending, and 5x leverage in one protocol, and the attack landed on the seams between them rather than inside any of them — DeFiTuna (Solana) — 2026-07-16

**Loss:** **~\$580K**, realised as a **deficit on the lending pool's USDC ledger** — that is, the pool's accounting shows an obligation it cannot cover, rather than a single identifiable outbound theft transaction. As of reporting, the team had **not committed to a treasury backstop, a socialised loss, or a specific reimbursement plan**, leaving the deficit unallocated.

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary, inferred-strong, mechanism not fully disclosed*. Reporting describes a smart-contract vulnerability exploited at the **interfaces between the protocol's components** rather than within any single one, draining the lending pool and leaving a USDC deficit. **No function-level root cause has been published**, so OAK records the class of failure and explicitly not a specific predicate; the assignment should be revised if a root-cause analysis appears. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). **OAK-T9.002** (Flash-Loan-Enabled Exploit — *not* recorded: no flash-loan involvement has been reported, and OAK does not infer one from the shape of the loss).

**Attribution:** **pseudonymous.** No named individual or group, and no public link to a tracked OAK actor. No laundering path has been publicly detailed.

**Key teaching point:** **Composability inside a single protocol creates the same seams as composability between protocols, but nobody owns reviewing them.** DeFiTuna combines **Uniswap v3-style concentrated liquidity**, **on-chain lending**, and **leveraged positions of up to 5x** in one system. Each component is a well-understood primitive with a mature body of audit practice behind it, and the attacker did not need to defeat any of them — the exploitable surface was where they **hand state to one another**: how a leveraged position is valued by the lending side, what the lending side assumes about the liquidity side's accounting, and which invariants are supposed to hold across a call that touches all three. Cross-protocol integration risk at least has an owner, because integrating someone else's contract is visibly a decision. Intra-protocol seams have no such prompt; the components ship together, are reviewed together, and the *relationships between them* end up reviewed by nobody in particular. The practical control is to enumerate the invariants that must hold **across** components — solvency, collateralisation, and share-accounting identities — and assert them at the boundary of every call that crosses one, rather than trusting that three individually-correct modules compose into a correct system.

## Summary

**DeFiTuna** is a Solana protocol combining three primitives in one system: **Uniswap v3-style concentrated liquidity**, **on-chain lending**, and **leveraged positions of up to 5x**.

On **2026-07-16**, an attacker exploited a vulnerability at the **interfaces between these components** — targeting how the products interact rather than any individual system — and drained the **lending pool**, creating a deficit of approximately **\$580K on the USDC ledger**.

No function-level root-cause analysis has been published. As of reporting, the team had **not committed to a treasury backstop, a socialised loss, or a specific reimbursement plan**, meaning the deficit's allocation between the protocol and its lenders remained unresolved.

The incident fell in the same week as the Ostium oracle-signer compromise, the Cascade CLS vault drain, and the Across Solana relayer attack, a cohort that The Crypto Times characterised as sharing a common property: each traced to infrastructure and integration boundaries rather than to a flaw in a single contract's core logic.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| (standing) | DeFiTuna runs concentrated liquidity, lending, and up-to-5x leverage as one integrated system; invariants spanning the three components are not enforced at their call boundaries | (standing T9.004 surface) |
| 2026-07-16 | Attacker exploits the interfaces between components, draining the lending pool | **T9.004 exploitation** |
| 2026-07-16 | Lending pool left with a ~\$580K deficit on its USDC ledger | (realised loss) |
| after | No treasury backstop, socialised loss, or reimbursement plan committed; deficit allocation unresolved | (operator response) |

## What defenders observed

- **Pre-event (the seams are the surface).** Three primitives that are individually well-audited do not compose into an audited system. The reviewable artefact is the set of **cross-component invariants**: is a leveraged position valued consistently by the lending module and the liquidity module? Does the lending side's collateral accounting survive a concentrated-liquidity position moving out of range? Each such question is answerable statically and is not answered by auditing the modules in isolation (M23, M35).
- **Pre-event (leverage multiplies whatever the seam gets wrong).** At up to 5x, a valuation discrepancy at a component boundary is amplified by the leverage factor before it reaches the lending pool. Protocols offering leverage over internally-composed primitives should treat boundary-crossing valuation as the highest-severity review area, because the leverage multiplier applies to the error as much as to the position.
- **At-event (a ledger deficit is the detection signal, and it is continuously computable).** The loss manifested as the lending pool's USDC ledger showing an obligation it could not cover. That is a **solvency identity** — total claims against total assets — and it can be evaluated every block. Continuous solvency assertion, with an automatic pause when the identity breaks, is the direct control for this class and detects the exploit without requiring anyone to have anticipated the specific seam (M04, M05).
- **Response (an unallocated deficit is itself an exposure).** Without a stated backstop or socialisation plan, lenders do not know whether they hold a full claim or a haircut. Beyond the fairness question, an unresolved deficit invites a withdrawal race in which early exiters are made whole out of the assets remaining for later ones — converting a \$580K contract loss into a larger run-shaped one. Prompt, explicit loss allocation is a security control, not merely a communications step.

## Public references

- `[cryptotimesweek0719]` — The Crypto Times, "Crypto Loses Over \$20M in a Week as Ostium, Across, Cascade Get Hacked" (2026-07-16 dating, Solana scope, the ~\$580K lending-pool deficit on the USDC ledger, the description of DeFiTuna as combining Uniswap v3-style concentrated liquidity with on-chain lending and up-to-5x leveraged positions, the finding that the attacker exploited vulnerabilities at component interfaces rather than individual systems, and the absence of any committed treasury backstop, socialised loss, or reimbursement plan): <https://www.cryptotimes.io/2026/07/19/crypto-loses-over-20m-in-a-week-as-ostium-across-cascade-get-hacked/>

## Discussion

DeFiTuna is the thinnest-sourced entry in OAK's July 2026 cohort and is recorded conservatively for that reason: the technique assignment names the class of control that failed and explicitly declines to assert a function-level cause that nobody has published. It earns its place in the corpus on the strength of the mechanism *shape* rather than its detail, because the shape is becoming common and the corpus has few clean instances of it.

The pattern worth naming is what might be called the **all-in-one DeFi protocol**: a single system bundling an AMM, a money market, and leverage, marketed on the capital efficiency that comes from letting the same collateral serve several roles. That efficiency is real, and it is produced precisely by the tight coupling that creates the seams. When lending collateral *is* a concentrated-liquidity position and that position is also the basis for leverage, the three modules must agree continuously about what it is worth and who has a claim on it — and every point of that agreement is a place where two components' assumptions can differ. The industry has developed strong review practice for each primitive individually and comparatively little for the joints, which is where this attacker went.

There is a useful contrast with [`examples/2026-06-myswap-cl-starknet-fake-token-shared-vault-accounting-drain.md`](2026-06-myswap-cl-starknet-fake-token-shared-vault-accounting-drain.md), where a shared vault's accounting was subverted through a fake token — also an accounting-boundary failure, also on a concentrated-liquidity system, and also realised as a ledger discrepancy rather than a visible theft. Contributors should watch for further cases in this class and, when they appear, record **which specific pair of components disagreed and about what quantity**. That is the field that would let OAK promote the seam-failure shape from a descriptive observation to an anchored sub-Technique; at present the corpus has the pattern but not yet the resolution to define it precisely.
