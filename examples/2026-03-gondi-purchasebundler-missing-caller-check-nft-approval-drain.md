# Gondi — a bundler released three weeks earlier never checked who was calling it, and 78 NFTs left wallets whose loans had already closed — Gondi V3 / Ethereum — 2026-03-09

**Loss:** **78 NFTs, ~\$230,000** — SuperRare, Art Blocks, Doodles and Beeple pieces, taken across roughly **40 transactions** beginning **2026-03-09 at about 08:12 UTC**. Every victim had **approved Gondi's contract** for a past loan and **had no active loan at the time**: the attacker specifically avoided NFTs held as live collateral. Gondi told users to **revoke approvals** and pause repayments, confirmed containment on **2026-03-10**, resumed most operations, and began compensation after review by **Blockaid** and independent reviewers.

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary*, in the **missing caller verification** shape. The **PurchaseBundler** component of Gondi's **Sell & Repay** contract did not verify that the caller initiating the transaction was **the borrower or the owner of the NFT**, so anyone could direct it to move collateral belonging to someone else. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)).

**Explicitly not OAK-T4.005** (`setApprovalForAll` NFT Drainer). The approvals were granted knowingly, to Gondi's own contract, to use a product feature. No signature was solicited and no interface lied to anyone. T4.005 is detected by watching what users are asked to approve; this class is detected by watching **what an approved contract can be made to do on someone else's behalf**.

**Attribution:** **pseudonymous.** On-chain identifiers only; no named individual, group, or link to a tracked OAK actor.

**Key teaching point:** **The exposure was created by users who had finished: their loans were closed, their business with the protocol was over, and their approval was still live.** That is the sharpest version of a pattern the corpus now holds three times. The attacker did not need a price, a flash loan, a governance vote or a key — only a contract that would act on an NFT when told to by the wrong person. Two rules follow, and both are cheap. For protocols: **a bundler or router that spends user approvals must re-derive authority from `msg.sender`, never from its arguments**, and the review that matters is *"whose assets can this contract move, at whose instruction?"* For the incident-response side: **the population at risk is the approval set, which is public** — enumerable from `Approval` and `ApprovalForAll` logs — so a protocol can know exactly who is exposed before an attacker does, and can retire approvals as part of shipping a new version rather than as advice after one.

## Summary

**Gondi** is an NFT lending protocol on Ethereum. Its **Sell & Repay** flow lets a borrower sell a collateralised NFT and settle the loan in one transaction, composed through a **PurchaseBundler** helper. To do that, the contract holds **ERC-721 approvals** from users who have used the feature.

A **new version of the Sell & Repay contract shipped on 2026-02-20** introduced logic in the PurchaseBundler that **did not verify the caller's relationship to the NFT** — it did not check that the address initiating the bundle was the borrower or the owner of the collateral.

On **2026-03-09, from about 08:12 UTC**, an attacker used that gap in roughly **40 transactions**, moving **78 NFTs** out of wallets that had granted approvals. The selection is the notable part: the attacker **skipped NFTs securing active loans** and took those where the approval remained but the loan had already been repaid or never existed. Total value was around **\$230,000**, with pieces from SuperRare, Art Blocks, Doodles and Beeple.

Gondi published guidance to **revoke approvals** (naming Revoke.cash) and to hold off on repayments, confirmed on **2026-03-10** that the exploit was contained, resumed most activity, and began a compensation process after audits by **Blockaid** and independent reviewers.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| (standing) | Users grant ERC-721 approvals to Gondi's Sell & Repay contract to use the bundled sell-and-settle flow | (normal operation) |
| 2026-02-20 | A **new Sell & Repay version** ships with PurchaseBundler logic that **does not verify the caller is the borrower or NFT owner** | (defect introduced, 17 days before use) |
| 2026-03-09 ~08:12 | Attacker begins calling the bundler against **other users' approvals** | **T9.004 exploitation** |
| through ~40 transactions | **78 NFTs** moved out — SuperRare, Art Blocks, Doodles, Beeple — **~\$230K**; NFTs securing **active loans are deliberately skipped** | (extraction, approval-set bounded) |
| 2026-03-09 | Gondi warns users to **revoke approvals** and pause repayments | (operator response, same day) |
| 2026-03-10 | Exploit confirmed contained; most operations resume; compensation process begins after **Blockaid** and independent review | (containment and remediation) |

## What defenders observed

- **A seventeen-day-old deploy is the whole story.** The defect did not age into the protocol; it was introduced by a routine feature release on 2026-02-20 and exploited on 2026-03-09. **The highest-risk window for a contract that holds approvals is the weeks after it changes**, and that is precisely when monitoring is usually tuned to the previous version's behaviour.
- **The attacker's target selection is a detection signal in itself.** Skipping active-loan collateral and taking only dormant approvals is what an attacker does when they understand that the *live* positions are watched and the *finished* ones are not. Any protocol can compute the same set — approvals with no corresponding open position — and it is a better exposure metric than TVL.
- **Same-day revoke guidance is the right response and an admission of the gap.** Telling users to revoke is the only lever a protocol has once approvals are the attack surface, and it works only for the users who see the message. The lever that does not depend on user attention is **not accumulating standing approvals in the first place** — per-transaction approvals, or `permit`-style scoped authorisation, cost gas and remove the class.
- **Audit after the fact, by two parties, for a \$230K loss.** Gondi's remediation (Blockaid plus independent reviewers, compensation) is more thorough than the loss size would justify on its own, which is the correct reading: the loss was bounded by *who happened to still have approvals*, not by anything the protocol controlled.

## Public references

- `[darknavygondi2026]` — DARKNAVY, "Gondi PurchaseBundler Drain" (the missing caller verification in the Sell & Repay PurchaseBundler and the approval-spending path): <https://www.darknavy.org/web3/exploits/gondi-purchasebundler-drain/>
- `[cryipgondi2026]` — Cryip, "Gondi NFT Lending Platform Hack: A Detailed Report" (2026-03-09 ~08:12 UTC start, ~40 transactions, 78 NFTs, the 2026-02-20 contract release that introduced the logic, and the 2026-03-10 containment): <https://dev.to/cryip/gondi-nft-lending-platform-hack-a-detailed-report-489c>
- `[cryptoadventuregondi2026]` — Crypto Adventure, "Gondi Exploit Puts NFT Loan Approvals and Asset Recovery in Focus" (revoke guidance, Blockaid review, compensation): <https://cryptoadventure.com/gondi-exploit-puts-nft-loan-approvals-and-asset-recovery-in-focus/>
- `[revokecashexploits]` — Revoke.cash, "Approval Hacks & Exploits" — running index of incidents whose blast radius was a standing-approval set: <https://revoke.cash/exploits>

## Discussion

This is the **third** case in the corpus with the same shape, and with three anchors the class is worth naming. **Exactly Protocol** (2023-08-18, ~\$7.3M): `DebtManager`, a periphery contract holding approvals, took a market address as an argument and validated neither it nor the permit. **Gondi** (2026-03-09, ~\$230K): a bundler holding approvals did not check the caller against the NFT. **ether.fi / Veda AtomicQueue** (2026-09-11, ~\$38K): a deprecated settlement contract holding approvals let the caller name someone else as solver. Different protocols, different assets, three years apart, and the same sentence describes all three: **a helper contract that spends standing user approvals failed to derive authority from the caller.**

The corpus files these under T9.004, which is correct at the mechanism layer and loses what they have in common, because T9.004's other anchors are permission defects in core protocol logic where the victim is the protocol. Here the victim is **a user who is no longer transacting**, the exposure is **an approval set**, and the detection surface is **grants rather than holdings**. `TAXONOMY-GAPS.md` now carries this as the forward candidate **OAK-T9.004.001** (*standing-authorisation residue in periphery contracts*), with these three as its anchors.

Gondi also earns a slot under the **2026 Q3 NFT-fi focus** for a reason worth recording separately: the quarter's premise is that the live NFT attack surface has moved from marketplace mechanics into **protocols that make non-fungible assets behave like collateral**. Gondi is that surface failing in the most ordinary way available — not through NFT-specific valuation games (T12.006), but through a missing `require` in a convenience wrapper. **NFT-fi inherits DeFi's bugs before it invents its own**, and contributors documenting this quarter should expect more of the corpus's NFT-fi entries to look like lending bugs than like NFT bugs.
