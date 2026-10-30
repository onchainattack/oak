# FlashLoopAdapter — the Safe module asked the caller whether it was a Safe with the module enabled, and a fake Safe said yes — FlashLoopAdapter (Aave V3 loop Safe module) / Ethereum — 2026-10-01

**Loss:** **~114 ETH (~\$305K)** from **two Safe wallets** with leveraged Aave V3 positions. Aave V3 itself was unaffected (Stani Kulechov: "zero effect").

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary, confirmed*. `open()` and `close()` authorised callers by calling **`isModuleEnabled` on `msg.sender`** — a check the caller answers about itself. A **fake Safe contract returning `true`** passed it. Using a **Morpho flash loan**, the attacker repaid ~1,335 WETH of a victim Safe's Aave debt and withdrew ~1,306 weETH of collateral, keeping the difference. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). **OAK-T9.002** (Flash-Loan-Enabled Exploit — capital source). Same class as [SquidRouterModule](2026-05-squidroutermodule-safe-module-constant-string-authorization.md): a Safe module whose authorisation is satisfiable by anyone.

**Attribution:** **pseudonymous.**

**Key teaching point:** **Never ask the caller to vouch for itself.** Identity checks must be against state the module controls — a registry of Safes that enabled it, or a Safe factory/proxy code-hash check — not a view function on `msg.sender`.

## Summary

On 2026-10-01 an attacker deployed a contract that impersonated a Safe, called FlashLoopAdapter's `open()`/`close()` paths, and unwound two real Safes' leveraged Aave V3 positions with a Morpho flash loan, netting ~114 ETH. SlowMist flagged it.

## Timeline (UTC)

Read it as three stages. **Flaw**: the module trusts the caller's own answer. **Take**: a flash loan frees the collateral and the module is made to execute from the victim Safe. **After**: a short alert cycle. Times are from SlowMist and Defimon (via crypto.news); the Crypto Times page was not retrievable.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-01 (since when: undisclosed) | `FlashLoopAdapter` is a Safe module that opens and closes leveraged Aave V3 loops. Its `open()` / `close()` authorise callers only by calling `ISafe(msg.sender).isModuleEnabled(address(this))`, which a fake Safe can answer `true`. Its `_swap()` then makes a raw call to a caller-supplied router with caller-supplied calldata. Two real Safes had enabled the module. | **T9.004** |
| 2026-10-01 | The attacker deploys a fake Safe contract that always returns `true` and calls `open()` / `close()` from it. No preparation steps beyond this are published. | **T9.004** |
| 2026-10-01 (Defimon detected the attack at 15:08:57 UTC) | In one transaction ([`0x75328f916b1a0878724d364da5eb12b255160b894cb36c63ed5d718efc616fc4`](https://etherscan.io/tx/0x75328f916b1a0878724d364da5eb12b255160b894cb36c63ed5d718efc616fc4)) the attacker takes a **Morpho WETH flash loan**. | T9.002 |
| same tx | With the loan the attacker repays ~1,335 WETH of Aave debt for the Safe [`0xcfedf95a3653a128dfc2e4288758a1a1850d169f`](https://etherscan.io/address/0xcfedf95a3653a128dfc2e4288758a1a1850d169f), unlocking its collateral. | T9.002 |
| same tx | `_swap()` is given the victim Safe as the "router" and `execTransactionFromModule` as calldata. The Safe has already enabled the adapter, so it accepts the call and withdraws ~1,306 weETH to an attacker-controlled address. The second Safe, [`0xe3b23e47df7cd85876ac6cb05bdb9d7cd5b28520`](https://etherscan.io/address/0xe3b23e47df7cd85876ac6cb05bdb9d7cd5b28520), loses 6.4 weETH the same way. | **T9.004** |
| same tx | Part of the weETH is swapped to WETH to settle the flash loan. The attacker keeps **~114.09 ETH** (~\$305K). Movement after that is not published. | — |
| 2026-10-02 02:59:57 | SlowMist TI alert. Aave's Stani Kulechov says the contract is a third-party adapter with "zero effect on Aave v3". No statement, pause or compensation from the adapter's operator appears in the cited sources. | response |

Key addresses:

- Attacker EOA — [`0x42c2633438609881c8fBAb82414eb9A0c45F9353`](https://etherscan.io/address/0x42c2633438609881c8fBAb82414eb9A0c45F9353)
- Vulnerable contract (FlashLoopAdapter) — [`0x16bb8b912da187870c23ec6756bb3fad061283d8`](https://etherscan.io/address/0x16bb8b912da187870c23ec6756bb3fad061283d8)
- Victim Safe 1 — [`0xe3b23e47df7cd85876ac6cb05bdb9d7cd5b28520`](https://etherscan.io/address/0xe3b23e47df7cd85876ac6cb05bdb9d7cd5b28520)
- Victim Safe 2 — [`0xcfedf95a3653a128dfc2e4288758a1a1850d169f`](https://etherscan.io/address/0xcfedf95a3653a128dfc2e4288758a1a1850d169f)
- Exploit transaction — [`0x75328f916b1a0878724d364da5eb12b255160b894cb36c63ed5d718efc616fc4`](https://etherscan.io/tx/0x75328f916b1a0878724d364da5eb12b255160b894cb36c63ed5d718efc616fc4)
- Fake Safe contract and attacker-controlled weETH receiver — addresses not published in the cited sources

## Root-cause evidence

- **Technique:** OAK-T9.004
- **Source:** <https://x.com/SlowMist_Team/status/2105855276536725599>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist: open() and close() authorised callers via isModuleEnabled on msg.sender, so a fake Safe returning true passed. Press coverage relays SlowMist rather than independently confirming.

## Public references

- `[cryptonewsflashloop2026]` — crypto.news, "FlashLoopAdapter exploit drains \$305K from Aave linked Safe wallets" (2026-10-02): <https://crypto.news/flashloopadapter-exploit-drains-305k-from-aave-linked-safe-wallets/>
- `[cryptotimesflashloop2026]` — The Crypto Times, "FlashLoopAdapter Exploit Drains \$305K From Two Aave-Linked Safes" (2026-10-02): <https://www.cryptotimes.io/2026/10/02/flashloopadapter-exploit-drains-305k-from-two-aave-linked-safes/>
- `[slowmistflashloop2026]` — SlowMist on X, FlashLoopAdapter alert: <https://x.com/SlowMist_Team/status/2105855276536725599>
