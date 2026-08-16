# Oraichain — an EVM cross-chain transfer path allowed ORAI to be minted without a backing deposit, and the team stopped the entire chain four hours in rather than let the supply keep moving — Oraichain (Cosmos SDK / OraichainEVM) — 2026-08-09

**Loss:** **not disclosed.** No public figure exists for the quantity of ORAI minted or its market value; **SlowMist logs the incident with the amount field empty**, classified as a cross-chain bridge exploit. What is on the record is the response cost: the **entire network halted at 04:00 UTC**, bridges, cross-chain routes and public interfaces restricted, and **MEXC suspending ORAI deposits and withdrawals at the project's request**. The team stated it would **burn the unauthorised minted balances and reconcile protocol state** to restore the canonical supply.

**OAK Techniques observed:** **OAK-T10.002** (Message-Verification Bypass — *primary, as disclosed by the operator, at the level of detail the operator gave*. Oraichain stated that **a vulnerability in an EVM cross-chain transfer path enabled unauthorised ORAI minting** — i.e. the destination side created tokens for a transfer whose source-side lock was never validly established. No further technical specificity has been published; OAK records the class from the operator's own description and does not reconstruct a mechanism the operator did not state. See [`techniques/T10.002-message-verification-bypass.md`](../techniques/T10.002-message-verification-bypass.md)). **No T5.x extraction Technique is recorded**, because it is not publicly established that the minted supply was ever sold — the halt landed early enough that the outcome is genuinely unknown.

**Attribution:** **unattributed.** No individual, group, address set, or on-chain identifier has been published. Oraichain has said it is working with partners and centralised exchanges to limit fund movement; nothing further is public.

**Key teaching point:** **Halting the whole chain is a real control, and this is the case that shows what it costs and what it buys.** Four hours after an unauthorised-mint path was found, Oraichain stopped block production, closed the bridges, and took public interfaces down — accepting total unavailability for every honest user in exchange for freezing the attacker's inventory in place. The counterfactual sits two days later in the same week: **Harmony** left its chain running through an unauthorised mint, and roughly **2.8 billion ONE reached exchanges with ~97% sold or staged to sell** before anything could be frozen. Once minted supply reaches a liquid venue, the remedy set collapses from *burn and reconcile* — an accounting operation the protocol can perform on its own state — to *ask exchanges to freeze proceeds*, which depends on other people's cooperation and rarely recovers much. The reusable rule for chains that can mint on message receipt: **decide the halt criteria before the incident, publish them, and make sure someone has the authority to pull the switch at 04:00 UTC without convening anybody.** The cost of a halt is measured in hours of downtime; the cost of not halting is measured in supply that becomes someone else's asset.

## Summary

**Oraichain** is an AI-focused Layer-1 built on the Cosmos SDK, with an EVM execution environment (**OraichainEVM**) and cross-chain transfer paths connecting it to other networks.

On **2026-08-09**, the team disclosed that **a vulnerability in an EVM cross-chain transfer path had enabled unauthorised minting of ORAI** — tokens created on the destination side without a correspondingly validated source-side deposit. At **04:00 UTC** the team **halted the network entirely** and restricted **bridges, cross-chain routes, and public interfaces**.

In a follow-up statement, Oraichain said the **exploit path had been identified and addressed**, that it was **coordinating with partners and centralised exchanges** to limit movement of funds, and that it was preparing to **burn the unauthorised minted balances and reconcile protocol state** so that the canonical ORAI supply could be restored. **MEXC suspended ORAI deposits and withdrawals** at the project's request.

No loss figure has been published. The quantity minted, the fraction that moved, and the identity of the operator all remain undisclosed, and SlowMist's registry entry carries an empty amount field — an accurate reflection of the public record rather than an omission.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| (standing) | An EVM cross-chain transfer path permits ORAI to be minted without a validated source-side deposit | (standing T10.002 surface) |
| 2026-08-09 (pre-halt) | Unauthorised ORAI minting occurs via that path; quantity never disclosed | **T10.002** |
| 2026-08-09 04:00 | Oraichain halts the entire network; bridges, cross-chain routes and public interfaces restricted | **M34** |
| 2026-08-09 | Team states the exploit path has been identified and addressed | (remediation) |
| 2026-08-09 | MEXC suspends ORAI deposits and withdrawals at the project's request; coordination with partners and exchanges to limit fund movement | **M41** |
| 2026-08-09 onward | Team prepares to burn unauthorised minted balances and reconcile protocol state to restore canonical supply | (supply remediation) |
| ongoing | No published quantity minted, no attacker identifiers, no post-mortem detailing the transfer-path defect | **(open)** |

## What defenders observed

- **Pre-event (mint-on-receipt is the surface that needs the most proof).** A destination chain that creates native supply when it believes a transfer arrived is trusting the verification path with the token's total supply. Whatever the specific defect, the invariant worth enforcing independently is **issued-equals-locked**, checked continuously against the source-side custody rather than only at transfer time (M36).
- **At-event (the halt decision was made fast, and speed is the whole value).** The gap between "we have an unauthorised-mint path" and "the chain is stopped" was measured in hours. Halting late is close to not halting: minted supply that reaches a liquid venue stops being a protocol accounting problem and becomes a freeze-request problem (M34).
- **At-event (burn-and-reconcile only stays available while the supply is still reachable).** Because the tokens had not demonstrably dispersed, Oraichain could contemplate deleting them and restoring the canonical supply — a remedy that is arithmetic on its own state. That option closes the moment the supply is inside exchange custody, held by third parties who did nothing wrong.
- **Response (exchange coordination worked as a supporting lever, not the primary one).** MEXC's suspension at the project's request is the co-operative half of containment. It is worth noting that it *supported* a halt rather than *substituting* for one — an important distinction, since exchange suspensions alone leave DEX liquidity fully open (M41).
- **Response (undisclosed magnitude is a durable gap).** Without a published mint quantity, neither ORAI holders nor downstream integrators can evaluate whether reconciliation actually restored the supply they believe they hold. OAK records the absence explicitly rather than inferring a figure; contributors should update this entry if the team later publishes one.

## Public references

- `[cryptotimesweek0816]` — The Crypto Times, "Crypto Whale Loses \$25.6M Again as Weekly Hacks Cross \$37M" (the weekly roundup entry: Oraichain, 2026-08-09, EVM cross-chain transfer vulnerability enabling unauthorised ORAI minting, amount undisclosed): <https://www.cryptotimes.io/2026/08/16/crypto-whale-loses-25-6m-again-as-weekly-hacks-cross-37m/>
- `[cryptorankoraichain2026]` — CryptoRank news feed, "Oraichain 跨链漏洞致未经授权 ORAI 被铸造，网络暂停" (the operator's own disclosure: the EVM cross-chain transfer path enabling unauthorised minting, the 04:00 UTC network halt, the restriction of bridges, cross-chain routes and public interfaces, and the follow-up statement on identifying the exploit path, coordinating with partners and exchanges, and preparing to burn unauthorised balances and reconcile protocol state): <https://cryptorank.io/news/feed/cad7c-2281967>
- `[mexcoraisuspension2026]` — MEXC announcement, "Suspension of ORAI Deposits and Withdrawals" (exchange-side confirmation that the suspension was made at the Oraichain team's request): <https://www.mexc.com/announcements/article/suspension-of-orai-deposits-and-withdrawals-17827791537401>
- `[slowmistzoneoraichain2026]` — SlowMist Hacked (zone entry, 2026-08-09, Oraichain, amount field empty, "Cross-Chain Bridge Exploit"): <https://hacked.slowmist.io/>

## Discussion

Oraichain earns an entry despite thin disclosure because it is the **control case** for the week's other unauthorised-mint incident. Same class of defect — a cross-chain path minting supply that nothing backed — and two opposite response postures three days apart. Oraichain stopped the chain at 04:00 UTC and kept burn-and-reconcile on the table. Harmony patched and kept producing blocks, and by the time the patch landed the minted supply was at exchanges and largely sold, leaving a rollback debate over blocks that users, bridges, and exchanges had already treated as final. Neither team's choice was cost-free, and OAK does not grade them — but the pairing makes the trade-off legible in a way that either case alone does not, and it is the reason both belong in the corpus.

The second reason to keep it is the discipline of recording an incident **at the level of detail that actually exists**. There is a real temptation, when a team says only "a vulnerability in an EVM cross-chain transfer path", to reconstruct a plausible mechanism — a missing proof check, an unbound nonce, a permissioned mint left open — and write it down as though it were reported. OAK's rule is that a mechanism is either sourced or absent. This entry therefore carries a Technique, a timeline, and an explicit list of what is unknown: the quantity minted, the fraction moved, the attacker, and the defect itself. Contributors with access to a published post-mortem should extend it; nobody should fill the gaps by inference.
