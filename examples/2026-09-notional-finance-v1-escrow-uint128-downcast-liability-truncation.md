# Notional Finance — a deprecated V1 escrow nobody had swept was drained through a debt of −2^128 that an unsafe cast rounded to zero — Notional Finance / Ethereum — 2026-09-04

**Loss:** **~\$1.73M** — **69,257 DAI** and **1,658,524 USDC**, swapped into roughly **689 ETH** and routed through **Tornado Cash** in laddered deposits (100 / 10 / 1 / 0.1 ETH) beginning **00:15:59 UTC** and continuing past 00:30:11. The contract drained was **Notional V1**, the protocol's superseded version, which had remained **live and funded** after V2 shipped. About **\$60,600** was still sitting in the V1 escrow afterwards. Notional's current version was not affected.

**OAK Techniques observed:** **OAK-T11.013** (Legacy-Version Maintenance Attack Surface — *primary*. The exploitable condition was not the arithmetic defect on its own but the standing decision to leave **V1 deployed, funded and reachable** after migrating users to V2, without decommissioning it or auditing it against V2's fixes. See [`techniques/T11.013-legacy-version-maintenance-attack-surface.md`](../techniques/T11.013-legacy-version-maintenance-attack-surface.md)). The vulnerability class carried inside it is an **unsafe integer downcast in collateral valuation**: two `mintfCashPair()` calls constructed a **−2^128** fCash liability, and an **unchecked `uint128()` cast in the free-collateral calculation truncated it to 0**, so the account read as fully solvent while owing more than the contract could represent. **OAK-T7.001** (Mixer-Routed Hop — proceeds consolidated to ETH and laddered into Tornado Cash within roughly fifteen minutes of the drain).

**Attribution:** **pseudonymous.** On-chain identifiers only; no named individual, group, or link to a tracked OAK actor. The Tornado Cash routing pattern — descending denominations, executed immediately — is standard and carries no attributive weight on its own.

**Key teaching point:** **Deprecation is a documentation event; decommissioning is a security control, and only the second one removes the contract from the attack surface.** Notional V1 had been superseded, was not where users or TVL lived, and was almost certainly absent from the monitoring and audit scope that covered V2 — but it was still deployed, still held funds, and still accepted calls from anyone. Every hour of that state was an unpriced option written to the first person who read the old code carefully. The reusable rule for multi-version protocols is that a legacy version must reach one of exactly two terminal states: **funds swept and entry points disabled**, or **maintained under the same audit, monitoring, and patch scope as the live version.** "Deprecated but reachable" is not a third option; it is the first one left unfinished.

## Summary

**Notional Finance** is an Ethereum fixed-rate lending protocol. Its **V1** contracts were superseded by V2 but were never decommissioned — the escrow stayed deployed, retained deposits, and continued to accept transactions.

V1's collateral accounting used **fCash** to represent fixed-rate positions, with **`mintfCashPair()`** minting matched asset/liability legs. The free-collateral valuation — the function that decides whether an account is solvent enough to withdraw — passed a signed quantity through an **unchecked `uint128()` downcast**.

On **2026-09-04**, an attacker made **two `mintfCashPair()` calls** sized to produce a liability of **−2^128**. At that exact magnitude, the downcast **truncated the debt to zero**. The account therefore evaluated as carrying no obligation at all, and the escrow permitted withdrawal of its backing assets: **69,257 DAI** and **1,658,524 USDC**, about **\$1.73M**. The attacker consolidated into roughly **689 ETH** and began Tornado Cash deposits at **00:15:59 UTC**, stepping down through 100, 10, 1, and 0.1 ETH denominations past 00:30:11.

The V1 escrow retained about **\$60,600** afterwards. No V2 contract was involved.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| (standing) | Notional **V1 remains deployed and funded** after V2 supersedes it; contracts reachable, funds unswept | **standing T11.013 condition** |
| (standing) | V1's free-collateral valuation passes a signed quantity through an **unchecked `uint128()` downcast** | (latent arithmetic defect) |
| 2026-09-03 ~23:58 → 2026-09-04 ~00:01 | Two **`mintfCashPair()`** calls construct a **−2^128** fCash liability; the downcast **truncates it to 0**; the account reads as solvent | **T11.013 exploitation** |
| within the same window | **69,257 DAI** and **1,658,524 USDC** (~\$1.73M) withdrawn from the V1 escrow | (extraction) |
| 2026-09-04 00:15:59 | Proceeds consolidated to ~**689 ETH**; **Tornado Cash** deposits begin — 100 ETH, then 10, 1, 0.1 | **T7.001** |
| 2026-09-04 00:30:11+ | Laddered mixer deposits continue | **T7.001** |
| after | **~\$60,600** remains in the V1 escrow; V2 unaffected | (residual exposure) |

## What defenders observed

- **The bug was old, reachable, and out of everyone's scope.** V1's code did not change; the protocol's attention did. Audit engagements, monitoring rules, bug-bounty scope, and incident runbooks all follow the live version, so a deprecated contract becomes the one place where a defect can sit indefinitely with nobody assigned to find it.
- **−2^128 is a boundary value, and boundary values are what fuzzers are for.** The exploit did not require an insight about Notional's economics; it required trying the number at which a `uint128` cast changes meaning. A property test asserting *free collateral is never computed from a value that changed sign or magnitude in a cast* would have caught this without any knowledge of the protocol.
- **Unchecked casts survive Solidity's overflow protection.** Solidity 0.8 added automatic revert on arithmetic overflow, which is widely treated as having closed this class. It did not: **an explicit `uint128(x)` conversion still truncates silently**, and it is exactly the construct that appears when older code is adapted forward. Codebases written before 0.8 and carried into it are the concentrated risk.
- **Sweeping V1 would have cost \$1.73M less than not sweeping it.** The remaining balance in the escrow — about \$60,600 — is a fair measure of what the migration left behind for a legitimate reason. The \$1.73M taken measures what "we'll get to it" cost.
- **The offramp was pre-planned and immediate.** Roughly fifteen minutes separated the drain from the first mixer deposit, with denominations laddered in a standard descending pattern. There was no holding period and no negotiation posture; the disposition was decided before the exploit ran.

## Public references

- `[coinotagnotional2026]` — COINOTAG, "Notional Finance Loses \$1.73M in Ethereum (ETH) via Integer Overflow Exploit" (unsafe `uint128` downcast in legacy V1 escrow, two `mintfCashPair()` calls creating a −2^128 liability truncated to 0; 69,257 DAI + 1,658,524 USDC; ~689 ETH into Tornado Cash from 00:15:59 UTC): <https://en.coinotag.com/notional-finance-1-73m-ethereum-integer-overflow-exploit>
- `[beincryptonotional2026]` — BeInCrypto, "Notional Finance Hit by \$1.7 Million Exploit From Integer Overflow Bug": <https://beincrypto.com/notional-finance-exploit-integer-overflow-bug/>
- `[cryptotimesnotional2026]` — The Crypto Times, "Notional Finance Escrow Contract Faces Reported \$1.7M Exploit" (2026-09-04; escrow contract targeted, V1 contracts live and funded, ~\$60,600 residual): <https://www.cryptotimes.io/2026/09/04/notional-finance-escrow-contract-faces-reported-1-7m-exploit/>
- `[cryptoeconomynotional2026]` — Crypto Economy, "Notional Finance Suffers \$1.7M Drain After Critical Integer Overflow Exploit": <https://crypto-economy.com/notional-finance-suffers-1-7m-drain-after-critical-integer-overflow-exploit/>
- `[cryptotimessept2026]` — The Crypto Times, "Crypto Hacks Reached \$322M in September's First Week" (2026-09-07; incident window 2026-09-03 23:58 → 09-04 00:01 UTC, ~\$1.73M, unsafe signed-to-unsigned downcast in free-collateral valuation): <https://www.cryptotimes.io/2026/09/07/crypto-hacks-cross-322m-in-septembers-first-week-as-liquid-network-alone-loses-320m/>

## Discussion

T11.013's existing anchors — **Yearn V1** (2023-02) and **GMX V1** (2025-07) — established the class as a decision, not a bug: an operator ships a new version, keeps the old one running because migration is friction and decommissioning is work, and accepts the residual surface. Notional fits that shape cleanly and sharpens one edge of it. In the GMX case the legacy version was still doing meaningful business. Here, the V1 escrow held roughly **\$60,600** after the attack — it was not serving users in any material sense. **The contract was left up because taking it down was a task with no owner, not because anyone was weighing a trade-off.** That is the more common version of this class and the one least likely to appear in a risk register, since nobody wrote down a decision to review.

The arithmetic half is worth a separate note for the taxonomy. OAK's T9 sub-Techniques cover rounding and precision loss (**T9.011**), reentrancy, access control, and oracle defects, but there is **no dedicated entry for silent truncation through an explicit cast** — a defect that Solidity 0.8's overflow checks do not address and that appears specifically where pre-0.8 code is carried forward. That is precisely the population of contracts a legacy-version surface consists of, which makes the two halves of this incident mutually reinforcing: **the old code is where unsafe casts live, and the old code is what nobody is watching.** A sub-class under T9.011 or a peer entry is a reasonable candidate once a second anchor is documented; recorded here rather than in `TAXONOMY-GAPS.md` at a single data point.

For contributors: when documenting a multi-version protocol incident, record **what the legacy version still held and what it still exposed** as two separate figures. The first tells you what the operator thought was at stake. The second tells you what actually was.
