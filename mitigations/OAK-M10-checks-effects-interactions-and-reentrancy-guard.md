# OAK-M10 — Checks-Effects-Interactions and ReentrancyGuard

**Class:** architecture
**Audience:** protocol, designer

**Maps to Techniques:** OAK-T9.005, OAK-T9.002

## Description

The Checks-Effects-Interactions (CEI) ordering discipline and the OpenZeppelin `ReentrancyGuard` (`nonReentrant` modifier) are the two compounding architectural mitigations against the reentrancy attack class. CEI is a *static-discipline* mitigation: every state-modifying function is structured so that input *checks* run first, internal state *effects* are written next, and only then are external *interactions* (calls into other contracts, including ERC-20 / ERC-721 / ERC-1155 / ERC-777 transfers and hooks) performed. ReentrancyGuard is a *runtime-lock* mitigation: a per-contract or per-state-surface mutex denies any reentrant call into the protected functions until the original call has returned.

The two are intentionally complementary. CEI alone is brittle in the presence of token hooks (ERC-777 callbacks, ERC-721 / ERC-1155 `onReceived` hooks, ERC-1363 callbacks), upgradeable proxies whose external-call surface drifts over time, and cross-contract state-coupling where the "state" being protected is not local to the function being audited. ReentrancyGuard alone permits re-entry into *unguarded* sibling functions that share state with the guarded one — the standard "lock-the-set, not-the-function" failure mode and the canonical *cross-function reentrancy* class. Pair them: CEI as the design-time invariant, ReentrancyGuard as the runtime backstop, and *apply the lock across the set of functions that share state, not per-function*.

The mitigation surface extends to a third, often-overlooked subclass: *read-only reentrancy*. View functions that report balances, prices, or LP-share values are read by third-party protocols (lending markets reading a Curve LP price, an aggregator reading a vault share-price); if those view functions are read mid-transaction, before the *originating* protocol's state has finalised, the third-party consumer sees a transient state that the originating protocol's CEI-and-Guard discipline did not protect. The mitigation is to extend the guard surface to view functions consumed by third protocols, or to ensure view-function reads return a state-finalised value.

For OAK this is the canonical T9.005 mitigation and a partial component of the T9.002 mitigation surface (flash-loan-enabled reentrancy variants).

## How it applies

- **OAK-T9.005 (Reentrancy):** the canonical mitigation. Apply CEI ordering as a structural design invariant in every state-modifying function; apply ReentrancyGuard across the *set* of functions that share state; treat ERC-777 / ERC-721 / ERC-1155 hook surfaces as implicit external calls and audit them as such; extend guards to view functions read by third protocols (read-only reentrancy).
- **OAK-T9.002 (Flash-Loan-Enabled Exploit):** flash-loan-enabled exploits frequently *include* a reentrancy primitive (Cream Finance Oct 2021, the Curve Vyper-compiler reentrancy class of 2023). OAK-M10 denies that primitive at the contract layer. Pair with OAK-M09 (TWAP + multi-venue oracle) and end-of-transaction solvency checks for the broader T9.002 surface; OAK-M10 alone is necessary-but-not-sufficient.

## Limitations

CEI discipline depends on auditor and developer recognition of *implicit* external calls — token hooks are the recurring blind spot, and the audit-firm convention of treating any external call (including value transfers and hook-bearing token operations) as the "interactions" leg is not universally applied. The Curve Vyper 2023 incident demonstrated that the discipline can be silently broken by *compiler bugs* that violate the CEI ordering the source code declares, regardless of how carefully the source code is written; this is a defence-in-depth argument for ReentrancyGuard as a runtime backstop rather than a substitute.

ReentrancyGuard incurs a small gas cost per protected call and requires correct application across the *state-sharing set* of functions; many production deployments apply the modifier per-function and miss the cross-function reentrancy variant. Read-only reentrancy mitigation is less standardised and requires explicit per-protocol design (or consumer-side mid-transaction-read avoidance).

Neither primitive mitigates *re-entry from a different transaction* (see governance-rate-limit territory, which is OAK-M11), nor logic bugs in the post-CEI state machine. Cross-protocol reentrancy where the attacking protocol does not invoke the victim directly (but instead consumes a victim-derived value mid-transaction) is the read-only-reentrancy variant; it is partially mitigated here but more cleanly addressed at the *consumer* protocol's design layer.

## Reference implementations

- **OpenZeppelin Contracts** — `ReentrancyGuard` and `ReentrancyGuardUpgradeable`; the de-facto industry-standard runtime lock.
- **Solady / solmate** — gas-optimised variants of the same primitive.
- **Foundry / Hardhat invariant-test suites** — property-based tests that fuzz reentrancy via mock external callers; the recommended developer-side validation surface.
- **Slither / Mythril / Aderyn** — static analysers that flag CEI-violating call sequences and missing-guard patterns; suitable for CI-time enforcement.
- **Audit firms (Trail of Bits, OpenZeppelin, ConsenSys Diligence, Halborn, Sigma Prime, Spearbit, Code4rena audit reports)** — recurring CEI / reentrancy review-checklist coverage; the operational reference for "what review depth is sufficient."

## Citations

- `[zhou2023sok]` — academic taxonomy; classifies reentrancy and flash-loan-enabled-reentrancy as recurring meta-classes that OAK-M10 mitigates at the architecture layer.
- `[owaspscstop10]` — Reentrancy category in OWASP SC Top 10; complementary contract-vulnerability framing.
- `[daoreentrancy2016retrospective]` — canonical DAO 2016 retrospective; the founding worked example of the reentrancy class that motivated the CEI-and-Guard pattern.
- `[vyperpostmortem2023]` — Curve Vyper-compiler reentrancy class of 2023; canonical example of CEI discipline broken at the compiler layer, motivating ReentrancyGuard as a defence-in-depth backstop.
- `[halborncream2021oct]`, `[muditgupta2021cream]`, `[creamfinance2021postmortem]` — Cream Finance Oct 2021 incident; canonical T9.005 + T9.002 worked example.
