# BonfireSwap — the router's transfer function never asked who was calling it, so 41 holders' standing approvals were spent for them — Bonfire / BNB Chain — 2026-09-16

**Loss:** **~\$50,000**, across **41 token holders** who had previously approved the router. The vulnerable contract is the **BonfireSwap router** at `0x17e801e17cefc6334059189c178d4783830e03d3` on **BNB Chain**; the token is **BONFIRE** (BEP-20, `0x5e90253fbae4dab78aa351f4e6fed08a64ab5590`). Losses are **bounded by the approval set**, not by the treasury: the router held nothing, and every affected wallet was exposed only to the extent it had granted an allowance. The mechanism was published by **SlowMist** on **2026-09-16**.

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary, confirmed mechanism*. The router's **`transfer` function did not verify that the caller was the `from` address**, and did not verify that the caller held any authorisation over the `from` address's assets. An attacker could therefore name **any wallet that had previously approved the router** as `from`, name **themselves** as `to`, and move the victim's tokens — then sell them through the same pool in the same path. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). **OAK-T9.004.001** (Standing-Authorisation Residue in Periphery Contracts — *candidate*, proposed in [`TAXONOMY-GAPS.md`](../TAXONOMY-GAPS.md). A periphery router that spends standing user approvals and **fails to derive authority from `msg.sender`**, making the exposed population exactly its un-revoked allowance set).

**Explicitly not OAK-T4.004** (Allowance / Approve Drainer). No approval was phished or solicited under false pretences. All 41 were granted knowingly, to the project's own router, for its documented purpose of swapping BONFIRE. The distinction matters operationally: T4.004 is caught by watching **what users are asked to sign**, and nothing here would have tripped it.

**Attribution:** **pseudonymous.** On-chain identifiers only. No actor named; disclosure came from SlowMist rather than from an attacker claim or a project post-mortem.

**Key teaching point:** **A router is a contract that spends other people's tokens for a living, which makes `msg.sender` the only thing standing between it and everyone who ever used it.** The defect is the most-taught access-control mistake in Solidity — a transfer helper taking `from` as a parameter and never checking that the caller is entitled to it — and it survived in a live router because a router's whole purpose is to move tokens on behalf of users, so a function that does exactly that reads as correct. The control is to **re-derive authority from the caller on every path that spends an allowance**, and — because that is a code fix that arrives after the incident — to treat **the router's allowance set as the real risk register**: it is public, enumerable from `Approval` logs, and it tells the project precisely how many wallets a bug in this contract would cost, before there is a bug. Forty-one was knowable in advance.

## Summary

**BonfireSwap** is the swap router for the **BONFIRE** BEP-20 token on **BNB Chain**. Like any router, it operates on user tokens through **ERC-20 allowances**: a holder approves the router once, and the router moves tokens on their behalf thereafter.

Its **`transfer` function performed neither of the two checks that make that arrangement safe**. It did not confirm that the caller *was* the `from` address, and it did not confirm that the caller held any delegated authority over the `from` address's balance.

Exploitation required no capital, no flash loan and no privileged position. An attacker called the function with **`from` set to a wallet holding a standing approval to the router** and **`to` set to an address they controlled**, moved the victim's BONFIRE, and **swapped it out through the same token pool**.

**41 holders** who had previously approved the router were affected, for a total of about **\$50,000**. **SlowMist** disclosed the mechanism and the contract address on **2026-09-16**.

## Timeline (2026-09-16 unless noted)

| When | Event | OAK ref |
|---|---|---|
| (standing) | Holders grant **ERC-20 approvals** to the BonfireSwap router so it can swap BONFIRE on their behalf | (normal operation) |
| (standing) | Router's **`transfer` checks neither `caller == from` nor the caller's authority over `from`** | (latent T9.004 defect) |
| (exploitation) | Attacker calls `transfer` with **`from` = an approving wallet, `to` = themselves**; tokens move and are sold through the same pool | **T9.004 exploitation** |
| (exploitation) | Repeated across the approval set — **41 holders**, **~\$50,000** total | **T9.004.001 — residue-bounded blast radius** |
| 2026-09-16 | **SlowMist** publishes the mechanism and names the contract `0x17e801e1…03d3` | (external forensics) |

## What defenders observed

- **The loss ceiling was set by the approval set and was public the whole time.** 41 wallets were reachable because 41 wallets had live allowances. That number was derivable from `Approval` event logs at any moment, by the project and by anyone else. **A router's un-revoked allowance set is its true balance sheet for the purposes of an access-control bug**, and it is almost never treated as a monitored quantity.
- **Small absolute loss, complete class demonstration.** ~\$50,000 is a rounding error next to this month's other incidents, and the defect is identical in kind to failures that have cost millions. The size of the loss measured **how much BONFIRE 41 people were holding**, not how bad the bug was. Filtering an incident feed by dollar value systematically under-weights this class, because the approval set of a small token is small by construction.
- **Selling through the same pool in the same path is what makes it self-contained.** The attacker did not need an external venue, a bridge, or a second transaction to realise value — the router that moved the tokens also swapped them. Any detection built around *tokens leaving for an unfamiliar address* has a narrow window here, because the tokens never sit anywhere.
- **Disclosure came from a security vendor, not the project.** The public record of this incident is a SlowMist bulletin. There is no project post-mortem, no confirmed remediation and no statement on whether affected holders will be made whole — which leaves the practical advice to holders unimproved by anyone with authority over the contract: **revoke the router's allowance.**

## Public references

- `[slowmistbonfire2026]` — SlowMist, via PANews, "BonfireSwap Router Access Control Flaw Leads to ~\$50K Loss, 41 Users Affected" (2026-09-16; `transfer` verified neither that the caller was `from` nor the caller's authority over `from`'s assets; attacker sets an approving user as `from` and themselves as `to`, then swaps through the same pool; contract `0x17e801e17cefc6334059189c178d4783830e03d3`): <https://panews.io/articles/01a0a931-ae81-7226-b65f-179fd3b16281>
- `[kucoinbonfire2026]` — KuCoin News, "BonfireSwap Router Vulnerability Results in \$50K Loss, Affecting 41 Users" (loss total and affected-user count): <https://www.kucoin.com/news/flash/bonfireswap-router-vulnerability-leads-to-50k-loss-41-users-affected>
- `[phemexbonfire2026]` — Phemex News, "BonfireSwap Router Access-Control Flaw Causes About \$50,000 Loss" (independent confirmation of the SlowMist finding): <https://phemex.com/news/article/bonfireswap-router-accesscontrol-flaw-causes-about-50000-loss-96823>

## Discussion

This is the **fourth anchor** for the forward candidate **OAK-T9.004.001** (Standing-Authorisation Residue in Periphery Contracts), after **Exactly Protocol** (2023-08-18, ~\$7.3M), **Gondi** (2026-03-09, ~\$230K) and **ether.fi / Veda AtomicQueue** (2026-09-11, 15.45 ETH) — and the second inside a single week.

It is useful to the candidate specifically because it **removes the last incidental feature the other anchors shared**. ether.fi's contract was **deprecated**; Gondi's had **just shipped**; Exactly's was a **leverage helper** with a permit in the signature. BonfireSwap's router was **none of those** — a live, in-use, unremarkable swap router in ordinary operation, with no migration story and no novelty. What remains once those differences are stripped out is the class itself: **a contract that spends standing approvals and does not derive authority from its caller**, with a blast radius equal to its allowance set.

That also sharpens the scope question the candidate is parked on. T9.004.001 was proposed with a framing that leaned on *"a user who has stopped transacting"* — true of ether.fi and Gondi, where the victims' business with the contract was finished. It is **not** true here: these 41 were current users of a current router. The class does not require abandonment, only **standing authority plus a missing caller check**, and the scope paragraph should say so when the candidate is promoted. Four anchors across three years, two chains, and both live and retired contracts is a strong promotion case; the open question remains whether it sits under T9.004 or beside T4.004 as an authorisation-lifecycle class.
