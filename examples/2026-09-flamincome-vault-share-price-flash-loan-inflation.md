# Flamincome — an \$18M flash loan moved a vault's share price for one transaction, and redemption trusted it — Flamincome / EVM (chain not named in reporting; Morpho, Curve and aUSDT legs indicate Ethereum) — 2026-09-16

**Loss:** **~\$345,900 USDT.**

**OAK Techniques observed:** **OAK-T9.002** (Flash-Loan-Enabled Exploit — *primary*. The attacker borrowed **~\$18M USDT via Morpho**, staked **Curve USDP LP tokens** to inflate the share price of **VaultYUSDT**, and redeemed into **aUSDT** at the inflated rate, all inside one transaction. See [`techniques/T9.002-flash-loan-enabled-exploit.md`](../techniques/T9.002-flash-loan-enabled-exploit.md)). **OAK-T9.001** (Oracle Price Manipulation — the vault's **own share price** was the manipulated reference; it is an internal oracle and failed as one).

**Attribution:** **pseudonymous.**

**Key teaching point:** **A vault share price computed from current holdings is a spot price, and every lesson about spot prices applies to it.** If a deposit can move the share price and a redemption in the same transaction reads it, the vault is an oracle with no TWAP and no deviation bound.

## Summary

On 2026-09-16 an attacker flash-borrowed ~\$18M USDT from Morpho, used it to stake Curve USDP LP tokens into Flamincome's VaultYUSDT and inflate its share price, redeemed into aUSDT at the inflated rate, and repaid the loan, netting ~\$345,900.

## Timeline (UTC)

Read it as three stages. **Get in**: a strategy that valued assets anyone could inject. **Prepare**: not published. **Take**: one flash-loan transaction. Times are from SlowMist's alert unless marked.

| When | What happened | OAK |
|---|---|---|
| Before 2026-09-16 (undisclosed) | The strategy treats a Convex `BaseRewardPool` balance that anyone can inject as its own assets, and values injected USDP/3CRV LP tokens with Curve `get_virtual_price()`, which badly overstates their worth in a depegged pool. How long this was exploitable is not published. | **T9.001** |
| 2026-09-16 (preparation undisclosed) | How the attacker's address was funded and whether the exploit was rehearsed are not published. | — |
| 2026-09-16 (time undisclosed) | The attacker flash-borrows about \$18M USDT from Morpho (The Crypto Times). | **T9.002** |
| same transaction | LP tokens are injected so the vault's share price (VaultYUSDT) jumps. This is the manipulated reference. | **T9.001** |
| same transaction | Shares are redeemed at the inflated price against real Aave aUSDT liquidity, and the loan is repaid. Net gain about \$345,900 USDT. Transaction: [`0x5ff8150482f5473bff16b4a142a98a7f72b159df5e9dd38afd90470551640d37`](https://etherscan.io/tx/0x5ff8150482f5473bff16b4a142a98a7f72b159df5e9dd38afd90470551640d37). | **T9.002** |
| after the exploit (undisclosed) | Where the proceeds went is not published as of the alert. | — |
| 2026-09-16 16:12:46 | SlowMist publishes its alert with the root cause and the attacker, victim and implementation addresses. | response |
| after 2026-09-16 (undisclosed) | No operator statement, pause or fix appears in the cited sources. | response |

Key addresses:

- Attacker — [`0x83381e7f7232775735169d72d237b858ffc36871`](https://etherscan.io/address/0x83381e7f7232775735169d72d237b858ffc36871)
- Victim strategy — [`0xb8d6471cA573C92c7096Ab8600347F6a9Fe268a5`](https://etherscan.io/address/0xb8d6471cA573C92c7096Ab8600347F6a9Fe268a5)
- Flawed implementation contract — [`0xff20De3F3F4C7E9518035a968B4A3CEE500a2AFB`](https://etherscan.io/address/0xff20De3F3F4C7E9518035a968B4A3CEE500a2AFB)
- Exploit transaction — [`0x5ff8150482f5473bff16b4a142a98a7f72b159df5e9dd38afd90470551640d37`](https://etherscan.io/tx/0x5ff8150482f5473bff16b4a142a98a7f72b159df5e9dd38afd90470551640d37)

## Public references

- `[slowmistflamincome2026]` — SlowMist on X, Flamincome alert (2026-09-16): <https://x.com/SlowMist_Team/status/2100256590716907706>
- `[cryptotimesweek382026]` — The Crypto Times, "Crypto Hacks Drain \$20M This Week: rsETH Safe, Nostra Fall" (2026-09-21; \$18M Morpho flash loan; VaultYUSDT share price inflated via Curve USDP LP staking; aUSDT redemption): <https://www.cryptotimes.io/2026/09/21/crypto-hacks-drain-20m-this-week-rseth-safe-nostra-fall/>
