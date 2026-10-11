# Q1–Q2 2026 Access-Control and Authorisation-Gap Cohort — Sweat Foundation, Ekubo, Giddy, Aftermath Perps — Aggregate ~$7.3M

**OAK Techniques observed:** OAK-T9.004

**Attribution:** **unattributed** (aggregate cohort).
**Loss:** Sweat ~\$3.5M (Near; public `ft_resolve_transfer` callback missing `#[private]`; balances later restored, MEXC froze the attacker's account); Ekubo ~\$1.4M (EVM swap-router extensions; payment-callback flaw spending users' existing token approvals); Giddy ~\$1.3M (Ethereum; EIP-712 signature covered only `SwapInfo.data`, leaving aggregator/fromToken/toToken/amount unsigned); Aftermath Perps ~\$1.14M (Sui; negative builder-code fees inflating collateral). Aggregate ~$7.3M across four incidents, April–May 2026.

**Key teaching point:** Four access-control and authorisation-gap incidents spanning three ecosystems (Near, EVM, Sui) in a six-week window demonstrate that T9.004 (Access-Control Misconfiguration) is the most pervasive exploit class in DeFi — it manifests as a missing caller check on a callback (Sweat), a payment callback that spends a third party's approval without that party's authorisation (Ekubo), an incompletely scoped signature (Giddy), and unvalidated negative fee input (Aftermath Perps). The structural thread is **a function that should have been gated behind an authorisation check — and wasn't.**

**Corrected 2026-10-11:** Sweat's bug was a public `ft_resolve_transfer` callback missing `#[private]` (not `refund_first`/`refund_second`; balances restored, MEXC froze attacker); Ekubo was a payment-callback flaw spending users' existing approvals; Giddy's EIP-712 signature covered only `SwapInfo.data` (not a domainSeparator omission); Aftermath was negative builder-code fees inflating collateral.

## Summary

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2026-04-23 | Giddy: ~\$1.3M drained from GiddyVaultV3; the EIP-712 signature covered only `SwapInfo.data`, so the attacker reused a historical backend-signed `VaultAuth` with a malicious `aggregator` and the strategy's LP token as `fromToken` | **T9.004** (incompletely scoped signature) |
| 2026-04-29 (~13:36 UTC) | Sweat: `ft_resolve_transfer` (NEP-141 refund callback) lacks `#[private]`; attacker's no-op call makes the contract refund 'unused' tokens, draining ~13.71B SWEAT (~\$3.5M) from top holders; balances restored, MEXC froze attacker | **T9.004** (missing caller check on callback) |
| 2026-04-29 | Aftermath Perps: negative builder-code (integrator) fees were accepted, inflating collateral; ~\$1.14M USDC withdrawn over ~36 min in 11 transactions | **T9.004** (as filed; the flaw is missing input validation on fee sign — a validation/accounting flaw rather than access control) |
| 2026-05-05 | Ekubo: payment-callback flaw in v2 EVM router extensions accepted payer/token/amount from attacker payload without payer authorisation; ~\$1.4M (WBTC) drained from wallets with existing approvals | **T9.004** (unauthorised spend of existing approvals) |

## Sweat — Public `ft_resolve_transfer` Callback

On April 29, 2026 (~13:36 UTC), the SWEAT token contract on Near was exploited for ~\$3.5M (~13.71B SWEAT, ~65% of supply per Blockaid via The Block). `ft_resolve_transfer`, the NEP-141 callback that refunds unused tokens to a sender, was not gated with NEAR's `#[private]` macro (which restricts the caller to the contract itself). The attacker deployed a contract that made a no-op call returning empty bytes, then called a victim's `ft_resolve_transfer` directly; the token contract read the empty bytes as zero tokens consumed and refunded the victim's balance to the attacker (Fireblocks). Top holder accounts were emptied within ~30 seconds. The team paused the contract, MEXC froze the attacker's account, Rhea paused SWEAT trading, and all external account balances were restored. Earlier text naming `refund_first` / `refund_second` functions was unsupported and is removed.

**OAK mapping:** T9.004 (missing caller check on a callback).

## Ekubo — Payment-Callback Flaw Spending Existing Approvals

On May 5, 2026, attackers drained ~\$1.4M in WBTC (about 85 rapid transactions; one victim lost ~17 WBTC) through a payment-callback flaw in the v2 EVM extension contracts behind Ekubo's swap router. The contracts accepted payer, token and amount from attacker-supplied payload data without checking the payer had authorised the transaction, so wallets that had previously approved the affected router contracts were drained (Blockaid, via The Block). Ekubo's Starknet core was not affected. The incident is an unauthorised spend of existing approvals, not a misgated admin function.

**OAK mapping:** T9.004 (access control on payment callback).

## Giddy — Incompletely Scoped EIP-712 Signature

On April 23, 2026, GiddyVaultV3 on Ethereum lost ~\$1.3M. The EIP-712 signature hashed only the `data` field of each `SwapInfo`; `aggregator`, `fromToken`, `toToken` and `amount` were not signed. The attacker reused a historical backend-signed `VaultAuth` whose `data` was suitable, pointed `aggregator` at a malicious contract and `fromToken` at the strategy's LP token; a fake mint in the malicious contract satisfied the `returnAmount > 0` check, and a later `transferFrom` moved the vault's LP tokens to the attacker (BlockSec). This is not a `domainSeparator` omission as earlier described.

**OAK mapping:** T9.004 (signature scope too narrow: security-relevant fields unsigned).

## Aftermath Perps — Negative Builder-Code Fees

On April 29, 2026, Aftermath Finance's Perps product on Sui lost ~\$1.14M in USDC (initial CertiK estimate ~\$900K) over ~36 minutes in 11 transactions. The team's stated root cause was that negative builder-code fees could be set; DarkNavy describes fee validation allowing a negative integrator taker fee that inflated taker collateral and enabled USDC withdrawals. Only Perps was affected. This is an input-validation / collateral-accounting flaw; earlier text about integer-rounding or an ungated fee-adjustment function was speculation and is removed.

**OAK mapping:** T9.004 as filed in this cohort; a validation/accounting technique (e.g. T9.016) fits the mechanism better (technique-remap suggestion only). T9.011 is not supported.

## Public references

- `[theblocksweat2026]` — The Block, "SWEAT protocol thwarts multi-million dollar exploit, restores user balances" (2026-04-29): <https://www.theblock.co/post/399498/sweat-protocol-thwarts-multi-million-dollar-exploit-restores-user-balances> (Sweat Foundation)
- `[fireblockssweat2026]` — Fireblocks, "Hunting Zero-Days at Machine Speed: How We Protected 22 Million NEAR Users" (2026-06-16): <https://www.fireblocks.com/blog/near-zero-day-sweat-hot-token-exploit> (Sweat Foundation mechanism)
- `[theblockekubo2026]` — The Block, "Attackers drain \$1.4M in wrapped bitcoin from DeFi protocol Ekubo in approval-based exploit" (2026-05-06): <https://www.theblock.co/news/defi/2026-05-06-attackers-drain-1-4m-in-wrapped-bitcoin-from-defi-protocol-ekubo-in-approval-based-exploit-400189> (Ekubo)
- `[blocksecgiddy2026]` — BlockSec, "~\$7.04M Lost: GiddyDefi, Volo Vault & More | BlockSec Weekly" (2026-04-29): <https://blocksec.com/blog/weekly-web3-security-roundup-2026-04-26> (Giddy)
- `[livebitcoinaftermath2026]` — Live Bitcoin News, "Sui DeFi Hit Again as \$1.14M Is Drained in Perp Exploit" (2026-04-29): <https://www.livebitcoinnews.com/sui-defi-hit-again-as-1-14m-is-drained-in-perp-exploit/> (Aftermath Perps)
- `[darknavyaftermath2026]` — DarkNavy, "AftermathFi Perpetuals: Negative Integrator Fee Collateral Inflation" (undated): <https://www.darknavy.org/web3/exploits/aftermathfi-perpetuals-negative-integrator-fee-collateral-inflation/>
- `[cryptotimesaftermath2026]` — Crypto Times, "Aftermath Finance Perps on Sui Exploited for \$1.14M" (2026-04-29): <https://www.cryptotimes.io/2026/04/29/aftermath-finance-perps-on-sui-exploited-for-1-14m/>
- Cross-reference: T9.004 at `techniques/T9.004-access-control-misconfiguration.md`; T9.011 at `techniques/T9.011-precision-loss-rounding-attack.md`

## Discussion

The Q1–Q2 2026 access-control cohort demonstrates that **T9.004 is not one attack pattern but a family of related authorisation failures**, each of which can be eliminated by a specific, well-understood mitigation:

| Sub-pattern | Canonical case | Mitigation |
|---|---|---|
| Missing caller check on callback | Sweat (`ft_resolve_transfer`) | `#[private]` / verify the caller is the contract itself |
| Unauthorised spend of existing approvals | Ekubo (payment callback trusts payload payer) | Verify the payer authorised the call; never take payer from caller data |
| Incompletely scoped signature | Giddy (only `SwapInfo.data` signed) | Sign every security-relevant field |
| Unvalidated fee sign | Aftermath Perps (negative builder-code fee) | Validate fee bounds and sign |

The Giddy case is the most technically instructive: a signature that covers only part of an operation authorises anything the unsigned fields can be set to. The fix is to hash every field that affects the outcome.

The Sweat case is the simplest and most devastating: a public callback that trusted its input to say how many tokens were unused. The pattern echoes TrustedVolumes' `registerAllowedOrderSigner()` — a function that performs a privileged operation without a constraint on who may call it.
