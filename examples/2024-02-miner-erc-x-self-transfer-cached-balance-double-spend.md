# MINER — the transfer function checked that neither address was null but not that they were different, so sending tokens to yourself doubled your balance — MINER (ERC-X) / Ethereum — 2024-02

**Loss:** **168.8 ETH (~\$460,000–\$470,000)**, drained as the entire WETH side of the project's Uniswap V3 pool. The MINER token collapsed roughly **88%**. **ERC-X** is a combined ERC-20 / ERC-721 / ERC-1155 / ERC-404 implementation backing a collection of **100,000 avatars**; the exploited code was its `_update` function.

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary*, in the **contract-correctness** shape this corpus uses for Lien Finance and Dream Health Chain rather than the permissions shape. `_update` validated that `from` and `to` were not the zero address and **never checked that `from != to`**; on a self-transfer it then wrote the recipient balance from a **cached `toBalance`** captured before the sender side was debited, so `_balances[to]` was restored to its pre-debit value **plus** the transferred amount. Sending tokens to yourself minted them. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). **OAK-T9.005** (Reentrancy — the *delivery* mechanism: the attacker opened a **Uniswap V3 swap of roughly 1,000 MINER for WETH** and performed the self-transfers **inside the swap callback**, inflating the balance during the window the pool had handed them control, then completed the swap against the inflated position and took the pool's WETH).

**Explicitly not OAK-T12.008** (Hybrid Fungible / Non-Fungible Accounting Divergence), and this entry exists largely to record that determination. See Discussion.

**Attribution:** **pseudonymous.** On-chain identifiers only; no named individual, group, or link to a tracked OAK actor.

**Key teaching point:** **`from != to` is the check nobody writes, because self-transfer is the case nobody pictures.** A transfer to yourself is economically pointless, which is exactly why it survives review: the reviewer models two parties and the code models two storage reads. The defect is the **read-modify-write ordering** — cache the recipient balance, debit the sender, then write the cached recipient value back — which is correct for distinct addresses and a mint for identical ones. Two reusable rules. **Every balance-mutating function needs an explicit self-transfer test**, and it belongs in the property suite, not the review checklist: *for any address `a` and amount `x`, `transfer(a, a, x)` must leave `balanceOf(a)` unchanged.* And **any callback a protocol hands to a caller — a Uniswap V3 swap callback included — is a re-entry window into your own accounting**, whether or not you think of your contract as reentrant.

## Summary

**MINER** was a 100,000-avatar collection whose token used **ERC-X**, an implementation combining **ERC-20, ERC-721, ERC-1155 and ERC-404** semantics in one contract. ERC-404 itself is experimental and was never adopted as an Ethereum standard; ERC-X layered further on top of it.

The contract's **`_update`** function — the shared path all balance mutations run through — verified that the `from` and `to` arguments were not the zero address. It did not verify that they were **different addresses**. It also captured the recipient's balance into a local (`toBalance`) before mutating the sender's, and wrote the recipient's new balance from that stale local.

For two distinct parties this is harmless. For `from == to`, the debit to the sender was overwritten by the cached pre-debit value plus the credit: **the balance grew by the transferred amount with nothing paid**.

In **February 2024** an attacker used it. They initiated a **Uniswap V3 swap of about 1,000 MINER for WETH** and, **inside the swap callback**, repeatedly transferred MINER to their own address, multiplying their balance. They then settled the swap against the inflated holding and **drained the pool's entire WETH side — 168.8 ETH, roughly \$460–470K**. MINER fell about **88%**.

## Timeline (2024-02)

| When | Event | OAK ref |
|---|---|---|
| (standing) | `_update` checks `from`/`to` against the zero address but **not against each other**; recipient balance written from a **cached pre-debit value** | (latent T9.004 defect) |
| T+0 | Attacker initiates a **Uniswap V3 swap**, ~1,000 MINER for WETH | (control-flow entry) |
| inside the swap callback | **Repeated self-transfers** inflate the attacker's MINER balance | **T9.004 exploitation via T9.005 window** |
| same transaction | Swap settles against the inflated balance; **entire WETH side of the pool taken — 168.8 ETH (~\$460–470K)** | (extraction) |
| after | MINER trades down approximately **88%** | (market impact) |

## What defenders observed

- **The vulnerable line was in the shared mutation path, which is the best and worst place for a bug.** `_update` is where every transfer, mint and burn converges, so one missing comparison applied to all of them at once. It is also the function most likely to be read closely — and it still shipped, because the failing case looks like a no-op.
- **The callback made a non-atomic-looking attack atomic.** Nothing here needed a flash loan or multiple blocks. The Uniswap V3 swap callback gave the attacker execution in the middle of the pool's own settlement, and the self-transfers happened there. **Protocols integrating with callback-based AMMs inherit a re-entry surface into whatever their token does during those calls.**
- **Experimental standards concentrate this class.** ERC-404 was never ratified, ERC-X layered ERC-20, ERC-721, ERC-1155 and ERC-404 semantics into a single contract, and the result was a mutation path with far more responsibilities than any of the source standards' reference implementations. **Complexity in the shared write path is the cost of combining standards**, and it is paid in exactly this kind of defect.
- **The detection signal is a unit test, not a monitor.** No runtime alarm would have distinguished the self-transfers from ordinary traffic in the milliseconds available. The invariant `transfer(a, a, x)` leaves `balanceOf(a)` unchanged costs one line in a property suite and closes the class permanently.

## Public references

- `[verichainsminer2024]` — Verichains, "Miner Project Attacked by Vulnerabilities in ERC-X Token Standard" (the `_update` flaw: `_balances[to]` written from the stale `toBalance` on self-transfer; the Uniswap V3 swap and repeated in-callback self-transfers; the WETH pool drain): <https://blog.verichains.io/p/miner-project-attacked-by-vulnerabilities>
- `[coingapeminer2024]` — CoinGape, "Will the ERC-X Token Miner Value Recover After Plummeting 88%?" (loss figure and market impact): <https://coingape.com/will-the-erc-x-token-miner-value-recover-after-plummeting-88/>
- `[cryptonstudiominer2024]` — Crypton Studio, "ERC-X Miner Contract Exploit on ERC-404 Standard: our Expert Analysis" (ERC-X as a combination of ERC-20/721/1155/404; the missing `from != to` check; 168.8 ETH; the 100,000-avatar collection): <https://dev.to/cryptonstudio/erc-x-miner-contract-exploit-on-erc-404-standard-our-expert-analysis-46k2>

## Discussion

This entry was researched as a **candidate second anchor for OAK-T12.008** (Hybrid Fungible / Non-Fungible Accounting Divergence), whose promotion out of `observed` has been an open item of the **2026 Q3 NFT-fi focus quarter**. It does not qualify, and recording why is more useful than the anchor would have been.

T12.008's scope is explicit: the vulnerable surface is **the seam between two representations of one asset** — the code keeping `Σ fungible supply` consistent with escrowed NFT count, and deciding which `tokenId` a fungible position corresponds to. Its stated fragility properties are **packed storage producing aliased identifiers** and **bidirectional mint/burn on transfer**. The technique page draws the boundary itself: the class sits under T12 rather than T9 *"because the seam exists only because the asset is non-fungible. A pure ERC-20 has one representation and no correspondence to maintain."*

MINER fails that test cleanly. The defect is a **self-transfer read-modify-write ordering error on the fungible ledger**. No identifier was aliased, no ownership predicate was bypassed, the NFT side is not implicated in the published analysis, and **the identical code in a plain ERC-20 would carry the identical bug** — which is the precise disqualifier the technique page names. MINER is a hybrid-standard contract that had a bug; it is not a hybrid-standard bug.

So the Q3 item stands open with the search narrowed rather than closed: **T12.008 still has one anchor**, Flooring Protocol V2 / BitmapPunks (2026-06-08), and the plausible-looking second candidate has now been evaluated and rejected. A contributor picking this up should not re-run the ERC-X lead. What would qualify is an incident where the **correspondence itself** broke — fungible supply diverging from escrowed count, a redemption paying out an NFT the position did not entitle, or an identifier resolving differently in an authorisation check than in accounting.

The boundary is worth defending precisely because it is tempting to cross. T12.008 is `observed` with one anchor and an obvious promotion path, and MINER is a real exploit in an ERC-404-family contract. Mapping it to T12.008 would have promoted the technique on a case that shares its setting and not its mechanism, and the definition would have quietly widened to "bugs in hybrid tokens" — which is a filing convention, not a Technique.
