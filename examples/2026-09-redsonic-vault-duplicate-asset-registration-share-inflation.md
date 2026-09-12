# RedSonic Vault — anyone could register the same collateral a second time, so one pool of stETH backed two share classes and both of them were redeemed — RedSonic / Ethereum — 2026-09-05

**Loss:** **9.25 ETH (~\$23,000)** — net profit from a **single self-contained transaction** funded entirely by a flash loan, with **zero attacker capital**. The exploit contract **self-destructed in the same transaction that created it**, which is still permitted post-Cancun under EIP-6780 and removed the bytecode from the current state; the reconstruction below comes from **ExVulSec**'s trace analysis. The loss is small because the vault was small — nothing in the mechanism bounded it.

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary structural defect*. The vault's **`registerErc20`** function **carried no access restriction**, so the attacker registered **stETH a second time** as a new share class (`rsvstETH`) over collateral the vault was **already counting** behind `rsvETH`. The vault then owed two independent claims on one pool of assets. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). **OAK-T9.001** (Oracle Price Manipulation — in the **book-value / donation** sub-pattern. `getTotalAssetBalance` priced shares from the vault's **raw stETH balance**, so a **direct 9.34 stETH transfer that minted no shares** lifted the share price for everyone holding shares — and the attacker held ~99% of them. See [`techniques/T9.001-oracle-price-manipulation.md`](../techniques/T9.001-oracle-price-manipulation.md)). **OAK-T9.002** (Flash-Loan-Enabled Exploit — **1,139 WETH** borrowed from **Balancer** supplied the whole position and was repaid in the same transaction).

**Attribution:** **pseudonymous.** On-chain identifiers only; the exploit contract no longer exists in current state. Analysis published by **ExVulSec**.

**Key teaching point:** **A vault that prices its shares from `balanceOf(address(this))` has an oracle, and it is the cheapest oracle in DeFi to move — anyone can move it with a transfer.** That half is well known; the half this case adds is the second one. **Asset registration is an economic privilege, not a metadata operation.** Permitting a second share class over the same underlying does not create a bookkeeping inconsistency that correct share math can absorb downstream — it creates **two valid claims on one asset**, and every redemption path will honour both until the pool is empty. The two controls are independent and both are cheap: track deposits in an **internal accounting variable** that only changes when shares change, and put **asset registration behind governance or a timelock with a uniqueness check on the underlying token address.** Either one alone breaks this attack; the vault had neither.

## Summary

**RedSonic Vault** issued **rsvETH** shares against **stETH** collateral. Share price came from **`getTotalAssetBalance`**, which read the vault's **raw stETH balance** directly. A separate function, **`registerErc20`**, added new asset/share classes and was **permissionless**.

On **2026-09-05**, in one atomic transaction on Ethereum, an attacker:

1. **Flash-loaned 1,139 WETH** from Balancer.
2. **Deposited 1,130 ETH**, taking roughly **99% of outstanding rsvETH shares** — so that any subsequent increase in vault value would accrue almost entirely to them.
3. Called **`registerErc20`** to register **stETH as a second asset class** (`rsvstETH`) over the collateral already backing rsvETH.
4. **Transferred 9.34 stETH directly into the vault**, minting no shares. Because pricing read the raw balance, the rsvETH share price rose on a deposit that created no corresponding claim.
5. **Redeemed rsvETH for 1,139.5 ETH**, capturing the inflated valuation.
6. **Redeemed rsvstETH for stETH** — out of the same underlying pool that had just paid the first redemption.
7. Swapped the recovered stETH to ETH on **Curve** and **repaid the flash loan**, netting **9.25 ETH**.

The exploit contract self-destructed within the same transaction.

## Timeline (single transaction, 2026-09-05)

| Step | Event | OAK ref |
|---|---|---|
| (standing) | `getTotalAssetBalance` prices rsvETH from the vault's **raw stETH balance** | (latent T9.001 surface) |
| (standing) | **`registerErc20` is permissionless** — no owner, role, or timelock | (latent T9.004 defect) |
| 1 | **1,139 WETH** flash-loaned from **Balancer**; attacker starts with no capital | **T9.002 — funding** |
| 2 | **1,130 ETH** deposited → attacker holds **~99% of rsvETH** | (position established in-block) |
| 3 | **stETH registered a second time** as `rsvstETH` over already-counted collateral | **T9.004 exploitation** |
| 4 | **9.34 stETH transferred in directly**, no shares minted → share price inflates | **T9.001 — donation/book-value** |
| 5–6 | **rsvETH redeemed for 1,139.5 ETH**; **rsvstETH redeemed for stETH** from the same pool | (double claim honoured) |
| 7 | stETH swapped to ETH on **Curve**; flash loan repaid; **9.25 ETH** net; exploit contract self-destructs | (extraction + trace removal) |

## What defenders observed

- **Two defects were required, and each is individually survivable.** Raw-balance pricing alone lets an attacker donate to inflate a share price they mostly own — which mostly means donating money to themselves. Duplicate registration alone creates a double claim with no cheap way to realise it. Chained, the donation inflates the first claim while the second claim recovers the donation. **Compositional bugs are why single-function audit findings under-price vault risk.**
- **99% share ownership acquired within one block is a standalone detection signal.** It requires no understanding of the vault's economics and no price feed: a single address crossing a dominant ownership threshold in one transaction is anomalous in every legitimate usage pattern a vault has. So is **a collateral-balance increase with no matching share mint** — the donation signature, observable as a `Transfer` into the vault with no `Deposit` event beside it.
- **`registerErc20` had no access control, and the reason that is not a subtle miss is that it has no plausible caller.** Permissionless registration serves no user; every legitimate invocation would come from the operator. A function whose entire realistic caller set is one address, left open to everyone, is a review finding at the interface level.
- **Self-destruct in the creating transaction still works, and post-incident analysis must not assume bytecode will be there.** EIP-6780 restricted `SELFDESTRUCT` but preserved exactly this case — a contract created and destroyed within one transaction. Teams that reconstruct incidents from deployed code rather than from traces will find nothing here. The corpus's record of this case exists because a security firm captured the execution trace, not the account.
- **The size of the loss carries no information about the size of the flaw.** \$23,000 reflects RedSonic's total assets, not any limit the attack ran into. The same two defects in a vault with a hundred times the deposits produce a hundred times the loss with an identical transaction shape.

## Public references

- `[blockonomiredsonic2026]` — Blockonomi, "RedSonic Vault Exploit Drains 9.25 ETH in Ethereum Flash Loan Attack" (2026-09-05; `getTotalAssetBalance` reads raw stETH balance; permissionless `registerErc20`; 1,139 WETH Balancer flash loan; 1,130 ETH deposit for ~99% of shares; 9.34 stETH donation; redemptions and Curve swap; self-destructing contract; ExVulSec analysis): <https://blockonomi.com/redsonic-vault-exploit-drains-9-25-eth-in-ethereum-flash-loan-attack>
- `[cointurkredsonic2026]` — Coin-Turk, "RedSonic Vault exploited for 9.25 ETH with flash loan, ExVulSec reveals root flaw" (second share class over the same underlying; double-counted collateral): <https://en.coin-turk.com/redsonic-vault-exploited-for-9-25-eth-with-flash-loan-exvulsec-reveals-root-flaw/>
- `[cryptotimessept2026]` — The Crypto Times, "Crypto Hacks Reached \$322M in September's First Week" (2026-09-07; RedSonic listed at ~\$23K, Ethereum, flash-loan share-class registration enabling collateral double-counting): <https://www.cryptotimes.io/2026/09/07/crypto-hacks-cross-322m-in-septembers-first-week-as-liquid-network-alone-loses-320m/>

## Discussion

The donation half of this attack is one of T9.001's oldest sub-patterns — the corpus anchors it in the **Cream** (2021-10) and **Rari/Fuse** (2022-04) cohort, and the first-depositor variant has been in every vault-security checklist for four years. Its continued appearance in 2026 in a vault that reads `balanceOf` for pricing is unremarkable on its own and would not merit an entry at this loss size.

What earns the file is the **duplicate asset registration**, which the corpus has not documented before. It is adjacent to **OAK-T10.009** (Cross-Chain Token Configuration-Role Capture), where control of token configuration on one chain is used to mint or re-map an asset — but T10.009 is about **capturing a privileged role**, and here **there was no role to capture**: the registration function was open to everyone by construction. It is also adjacent to the accounting-divergence shape in **T12.008**, where one asset is made to behave as two. Neither is a clean fit.

Recorded here rather than in `TAXONOMY-GAPS.md` at a single data point, the candidate class is **unbounded asset-class registration** — a vault or market permitting registration of a collateral asset it is already counting, producing multiple simultaneous claims on one reserve. Its detection signal is a **uniqueness violation on the underlying token address across registered markets**, checkable statically against any deployed vault, with no price data required. A second anchor would justify promoting it; contributors documenting vault incidents should record **who may register assets and whether uniqueness of the underlying is enforced**, two fields that are almost never in the write-ups.
