# mySwap CL — a fake "EVIL" token abuses shared-vault concentrated-liquidity accounting to drain residual LP — Starknet — 2026-06-19

> **Status: developing / preliminary mapping (as of 2026-06).** The loss, date, asset breakdown and laundering path are multi-sourced, but the exact line-level bug is not yet public and mySwap had not published a full post-mortem at the time of writing. The technique mapping below is preliminary and should be revised once the precise defect is disclosed.

**Loss:** **~\$300K–\$305K realised.** On **2026-06-19** (~07:15 UTC) an attacker drained residual liquidity from **mySwap CL**, the concentrated-liquidity product of the Starknet DEX mySwap. The drained assets were about **137.96 ETH, 45,000 USDC, 19,900 USDT and 230,000 STRK**. The mySwap CL interface had been closed to new deposits for more than six months, so the drained funds were residual LP spread across 100,000+ positions; the attack emptied nearly all of it. mySwap confirmed the incident. The stolen assets were bridged off Starknet and routed through Railgun to obscure the trail; no attacker address was published.

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *preliminary mapping*. The confirmed shape is that the vault's accounting trusted an attacker-controlled token it should have rejected: the attacker introduced a fake token named "EVIL" that distorted the accounting path tied to the CL pools and their **shared vault**, so a malicious token interaction could pull real assets out of a vault holding liquidity across many pools. The load-bearing failure is a missing validation / authorization boundary on which tokens may influence balance and withdrawal accounting. The exact defect is not public; reported candidates include a missing token allow-list, a callback / reentrancy path, and LP-share inflation. Pending mySwap's post-mortem, OAK records this as a **token-admission / accounting-validation flaw** and flags a possible forward-candidate sub-technique (untrusted-token shared-vault accounting abuse) for TAXONOMY-GAPS. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). The laundering path (bridged off Starknet, then routed through Railgun) is OAK-T7.003 and OAK-T7.001.

**Attribution:** **pseudonymous.** No named actor and no attacker address disclosed in public sourcing. The incident was logged by SlowMist's hacked database (2026-06-19, Starknet, smart-contract vulnerability, Railgun) and detailed by Crypto Adventure and Phemex; mySwap confirmed it but had not published a full post-mortem at the time of writing.

**Key teaching point:** **A shared vault that pools liquidity across many concentrated-liquidity positions is only as safe as its weakest token-admission check, because one malicious token that its accounting trusts can reach all of the pooled assets.** The attack did not need to break any single pool; it introduced a token the shared vault's accounting would act on and used it to withdraw real assets that backed unrelated positions. The controls that apply are strict validation of which tokens may participate in vault accounting (allow-listing rather than accepting arbitrary tokens), isolating per-position or per-pool balances so a single token cannot reach the whole vault, and value-conservation invariants on withdrawals so a redemption cannot exceed what was genuinely deposited. The case also shows that a product closed to new deposits is not dormant for security purposes: residual LP across 100,000+ positions was still fully drainable, so wind-down and deprecation plans need to either withdraw residual funds or keep the contract monitored, not just close the front door.

## Summary

**mySwap** is a Starknet DEX; **mySwap CL** is its concentrated-liquidity product, whose positions were backed by a **shared vault** holding liquidity across many pools. The CL interface had been closed to new deposits for over six months, leaving residual LP spread across 100,000+ positions.

On **2026-06-19** (~07:15 UTC), an attacker introduced a fake token named **"EVIL"** and used it to distort the vault's accounting so that a malicious token interaction could withdraw real assets from the shared vault. About **\$300K–\$305K** (137.96 ETH, 45,000 USDC, 19,900 USDT, 230,000 STRK) was drained, emptying nearly all remaining liquidity. The attacker bridged the proceeds off Starknet and routed them through **Railgun**. mySwap confirmed the incident; the precise line-level defect had not been published at the time of writing.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-2026-06-19 | mySwap CL closed to new deposits for 6+ months; residual LP across 100,000+ positions remains in a shared vault | (standing surface) |
| 2026-06-19 ~07:15 | Attacker introduces a fake "EVIL" token and abuses the shared-vault CL accounting to withdraw ~\$300K–\$305K of residual LP | **T9.004 (preliminary)** |
| 2026-06-19 | Proceeds bridged off Starknet and routed through Railgun | **T7.003 + T7.001** |
| 2026-06-19/20 | mySwap confirms the incident; SlowMist logs it; no full post-mortem published | (operator response) |

## What defenders observed

- **Pre-event (token-admission boundary).** The confirmed root shape is that the vault's accounting acted on a token it should not have trusted. Allow-listing the tokens that may influence vault accounting, rather than accepting arbitrary tokens, is the pre-event control. The exact bug (missing allow-list vs callback/reentrancy vs share inflation) is unconfirmed.
- **At-event (shared vault as blast radius).** Because one vault backed liquidity across many pools, a single malicious-token interaction reached assets backing unrelated positions. Per-position or per-pool balance isolation limits how far one bad token can reach.
- **At-event (deprecated but not dormant).** The product was closed to deposits yet still held drainable residual LP. Deprecation without withdrawing residual funds or maintaining monitoring leaves a live target.
- **Post-event (fast obfuscation).** Proceeds were bridged off Starknet and routed through Railgun, foreclosing straightforward on-chain tracing.

## Public references

- `[cryptoadventuremyswap2026]` — Crypto Adventure, "mySwap loses \$305K on Starknet after fake EVIL token abuses CL pool accounting" (most detailed mechanism; EVIL-token / shared-vault CL accounting; asset breakdown): <https://cryptoadventure.com/myswap-loses-305k-on-starknet-after-fake-evil-token-abuses-cl-pool-accounting/>
- `[phemexmyswap2026]` — Phemex, "Starknet's mySwap protocol exploited, \$300,000 drained" (\$300K; Railgun laundering; mySwap confirmation): <https://phemex.com/news/article/starknets-myswap-protocol-exploited-300000-drained-90069>
- `[slowmistmyswap2026]` — SlowMist Hacked database — mySwap (2026-06-19, Starknet, smart-contract vulnerability, Railgun): <https://hacked.slowmist.io/>
- `[cryptotimesmyswap2026]` — Crypto Times, mySwap coverage (corroborates ~07:15 UTC and the asset list): <https://www.cryptotimes.io/2026/06/20/>

## Discussion

mySwap CL is a deliberately preliminary entry: the dollar figure is small, no attacker address is public, and the precise defect is undisclosed, so its near-term value is the mechanism class rather than a fully specified technique. The confirmed part, a fake token abusing a shared vault's concentrated-liquidity accounting to withdraw real assets, is a clean example of a token-admission and value-conservation failure, and it is worth recording as a Starknet data point for the class. The entry maps to T9.004 preliminarily on the basis of the missing validation boundary, and flags a candidate sub-technique for untrusted-token shared-vault accounting abuse; it should be revisited once mySwap or a security firm publishes the line-level bug, at which point it may firm up under a more specific T9 subclass. The secondary lesson is durable regardless of the exact defect: a product closed to new deposits still needs its residual funds withdrawn or its contracts monitored, because closing the deposit path does not make the pooled liquidity safe.
