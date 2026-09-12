# Dream Health Chain — awards were recorded without locking the funds to pay them, and a claimed award could be reset and claimed again — Dream Health Chain / BNB Chain — 2026-09-05

**Loss:** **~\$71,800**, drawn from a **shared proxy balance** — the pooled contract funds that every participant's rewards were paid out of, rather than from any individual position. Reported by **SlowMist**. The project has not published an incident report, so the loss figure and the mechanism both come from third-party analysis, and the affected token is not named in public reporting.

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary*, recorded in its **contract-correctness / state-machine** shape rather than its permissions shape, following the precedent set by the Lien Finance entry. **No privilege was bypassed and no caller held a role they should not have.** The award system simply permitted a state transition it should have forbidden: per SlowMist's analysis of the three functions involved, the **creation path recorded a reward without locking collateral to pay it**, and the **participation/claim path did not prevent an already-claimed award from being reset to claimable and claimed again**. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)).

**Attribution:** **pseudonymous.** On-chain identifiers only; no named individual, group, or link to a tracked OAK actor.

**Key teaching point:** **An obligation recorded without locking the funds to settle it is an IOU written against everyone else's money, and a claim flag that can be reset is an IOU that reprints itself.** Each defect is survivable in isolation. Unlocked awards alone mean claims are paid out of a shared pot — sloppy, and solvent as long as promises stay roughly proportional to the pot. A resettable claimed-flag alone, in a system where each award is individually funded, drains one award. **Together they compose into unlimited withdrawal**: one cheaply created award can be claimed repeatedly, and each claim reaches the pooled balance belonging to every other participant. The two rules that close it are ordinary and independent — **fund the obligation at creation, from the creator's own deposit**, and make claim state **monotonic**, so that no code path returns a claimed award to claimable.

## Summary

**Dream Health Chain** operated a business-award system on **BNB Chain**: awards could be created, participated in, and claimed, with payouts drawn from a **shared proxy balance** held by the contract.

Per SlowMist's analysis, three functions carried the defect between them. The **award-creation** path recorded a reward **without locking collateral** to cover it, so the promise existed on-chain with nothing reserved behind it. The **participation** path **did not enforce that an award was still unclaimed**, which allowed an award that had already paid out to be **reset and claimed again**. The **claim** path then paid each repeat claim from the pooled balance.

On **2026-09-05**, an attacker used that combination to withdraw approximately **\$71,800** from the shared balance. Public reporting does not record a protocol response, a recovery attempt, or a post-incident disclosure from the project.

## Timeline (2026-09-05)

| When | Event | OAK ref |
|---|---|---|
| (standing) | Award creation **records a reward without locking collateral**; payouts drawn from a **shared proxy balance** | (latent T9.004 defect — unfunded obligation) |
| (standing) | Participation path **does not require an award to be unclaimed**; claimed state is **resettable** | (latent T9.004 defect — non-monotonic claim state) |
| 2026-09-05 | Attacker creates and repeatedly re-claims award(s), draining **~\$71.8K** from the pooled balance | **T9.004 exploitation** |
| after | **SlowMist** reports the incident and the defective functions; no project post-mortem published | (external forensics only) |

## What defenders observed

- **The pooled balance is what turned a small logic bug into everyone's loss.** If each award had been funded at creation by its creator, a repeat-claim bug would have drained one award and stopped. The shared proxy balance is the coupling that let a defect in one participant's award reach every other participant's funds — and pooled payout balances are the default design in reward, staking-rewards, and referral contracts across the long tail.
- **Non-monotonic claim state is mechanically detectable without understanding the business logic.** The property to check is that no reachable code path writes `claimed = false`, or decrements a claim counter, after a payout. That is a grep-level review question and a straightforward invariant for a property test: *for every award, total paid never exceeds the amount reserved at creation.*
- **"Reward", "award", and "bonus" systems are the least-reviewed contracts in a protocol and hold real balances.** They are scoped as marketing surface and funded like financial logic — reviewed as the former, holding the balances of the latter. The Hemi Genesis Drop case four days later reaches the same observation from the opposite direction: there the neglected contract distributed tokens, here it distributed rewards, and in both cases the money was real and the review was not.
- **No disclosure means no verifiable record.** The loss figure, the mechanism, and the function names all rest on a single security firm's analysis. OAK records the incident at that confidence and names the source; a project statement would upgrade it. Small-cap projects going silent after a loss is the normal case, not the exception, which is why third-party trackers are load-bearing for the long tail of this corpus.

## Public references

- `[coinfomaniadreamhealth2026]` — Coinfomania, "Dream Health Chain Suffers \$71.8K Exploit from Logic Error" (2026-09-05; award creation recorded rewards without collateral locks; participation path failed to enforce unclaimed status; shared proxy balance; reported by SlowMist): <https://coinfomania.com/dream-health-chain-suffers-71-8k-exploit-from-logic-error/>
- `[cryptotimessept2026]` — The Crypto Times, "Crypto Hacks Reached \$322M in September's First Week" (2026-09-07; Dream Health Chain listed at ~\$72K on BNB Chain, business-logic flaw allowing repeated claims without collateral locks): <https://www.cryptotimes.io/2026/09/07/crypto-hacks-cross-322m-in-septembers-first-week-as-liquid-network-alone-loses-320m/>

## Discussion

At \$71.8K this is one of the smallest entries in the 2026 corpus, and it is here for the shape rather than the sum. OAK's T9.004 anchors cluster at two extremes: **genuine permission defects** (a function missing an `onlyOwner`, a role granted to the wrong address) and **valuation-predicate defects** (Lien Finance's bond-rate calculation mispricing attacker-crafted inputs). This case sits in a third place — **a state machine that permits an illegal transition** — and it is the most common defect class in the long tail of small protocols, where the contract is not a fork of anything audited and the business logic was written once, by one person, against a product spec.

The composition is the transferable part. Neither defect here would headline an audit report. An auditor noting "awards are paid from a shared balance" and an auditor noting "claimed status can be reset" are both making medium-severity observations in isolation, and the combination is critical. **Severity is not additive across findings that touch the same balance**, and review processes that score findings independently will systematically under-rate cases like this one.

For contributors documenting long-tail incidents where the project never speaks: record **which security firm reported it and what they observed directly**, keep the mechanism at the confidence the source supports, and do not reconstruct function-level behaviour beyond what was published. An entry that says less and is correct is worth more to this corpus than a complete-looking narrative built on inference.
