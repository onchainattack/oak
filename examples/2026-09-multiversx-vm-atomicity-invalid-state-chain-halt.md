# MultiversX — a VM that did not roll back cleanly let invalid state reach the ledger, and the chain stopped — MultiversX mainnet — 2026-09-19

**Loss:** **not quantified.** MultiversX says the attempt **caused invalid state changes**, that funds are safe, and that the **attacker's accounts were identified and frozen** in coordination with major exchanges. Network progression was **paused**; a recovery hard fork used a checkpoint at **round 33384826 (2026-09-19 06:37 UTC)**. **Upbit** flagged EGLD for trading caution and suspended deposits and withdrawals; **Kraken** set EGLD pairs to cancel-only.

**OAK Techniques observed:** **OAK-T9.014** (Protocol-Client Consensus Bug — *primary, class provisional*. MultiversX confirms *"an actor attempted to exploit a VM-level atomicity issue"* that let **invalid state changes settle on the ledger** before block production was stopped. A defect in the protocol's own execution layer that validators accepted as valid is T9.014's subject, and this sits next to the **Liquid Network** anchor from earlier the same month. See [`techniques/T9.014-protocol-client-consensus-bug.md`](../techniques/T9.014-protocol-client-consensus-bug.md)). **The specific atomicity failure is undisclosed** — whether async-call callbacks, partial reverts, or cross-shard execution — and a technical report has been promised.

**Attribution:** **pseudonymous;** accounts frozen, identity not disclosed.

**Key teaching point:** **Atomicity is a promise the VM makes to every contract on the chain, and when the VM breaks it, every contract's invariants break at once.** Contract authors reason about "this call either fully happens or fully reverts"; a VM-level atomicity bug invalidates that reasoning everywhere simultaneously, which is why the only available response was chain-wide: halt, fork, and repair state. The recovery — a targeted state repair plus exchange-side freezes — worked here because the chain could be stopped and the attacker's exits ran through centralised venues. Neither is a property to design around.

## Summary

On 2026-09-19 an actor exploited an atomicity flaw in MultiversX's virtual machine, and invalid state changes reached the ledger. The network paused block production, froze the attacker's accounts through exchanges, validated a fix on a shadow fork and recovered via a hard fork from a checkpoint at 06:37 UTC that day. Exchanges suspended EGLD transfers in the interim. No loss figure has been published.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2026-09-19 ~06:37 | Exploit attempt produces invalid state changes; recovery checkpoint later set here | **T9.014 (provisional)** |
| 2026-09-19 | Network progression paused; fix prepared for shadow-fork validation | (response) |
| 2026-09-19 → 20 | Attacker accounts frozen with exchanges; Upbit caution flag; Kraken cancel-only | (response) |
| following days | Recovery hard fork from round 33384826 | (recovery) |

## Public references

- `[multiversxstatement2026]` — MultiversX on X, confirmation of VM-level atomicity issue: <https://x.com/MultiversX/status/2101341591277391953>
- `[cryptonewsmultiversx2026]` — crypto.news, "MultiversX hit by Upbit warning after mainnet exploit": <https://crypto.news/multiversx-hit-by-upbit-warning-after-mainnet-exploit/>
- `[coindoomultiversx2026]` — Coindoo, "MultiversX Halts Mainnet to Repair Invalid State": <https://coindoo.com/multiversx-halts-mainnet-to-repair-invalid-state/>
- `[ethnewsmultiversx2026]` — ETHNews, "MultiversX Says Funds Safe, Attacker Accounts Frozen After Exploit": <https://ethnews.com/multiversx-says-funds-safe-attacker-accounts-frozen-after-exploit/>

Revision trigger: MultiversX's technical report.
