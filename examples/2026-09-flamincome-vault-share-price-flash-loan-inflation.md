# Flamincome — an \$18M flash loan moved a vault's share price for one transaction, and redemption trusted it — Flamincome / EVM (chain not named in reporting; Morpho, Curve and aUSDT legs indicate Ethereum) — 2026-09-16

**Loss:** **~\$345,900 USDT.**

**OAK Techniques observed:** **OAK-T9.002** (Flash-Loan-Enabled Exploit — *primary*. The attacker borrowed **~\$18M USDT via Morpho**, staked **Curve USDP LP tokens** to inflate the share price of **VaultYUSDT**, and redeemed into **aUSDT** at the inflated rate, all inside one transaction. See [`techniques/T9.002-flash-loan-enabled-exploit.md`](../techniques/T9.002-flash-loan-enabled-exploit.md)). **OAK-T9.001** (Oracle Price Manipulation — the vault's **own share price** was the manipulated reference; it is an internal oracle and failed as one).

**Attribution:** **pseudonymous.**

**Key teaching point:** **A vault share price computed from current holdings is a spot price, and every lesson about spot prices applies to it.** If a deposit can move the share price and a redemption in the same transaction reads it, the vault is an oracle with no TWAP and no deviation bound.

## Summary

On 2026-09-16 an attacker flash-borrowed ~\$18M USDT from Morpho, used it to stake Curve USDP LP tokens into Flamincome's VaultYUSDT and inflate its share price, redeemed into aUSDT at the inflated rate, and repaid the loan, netting ~\$345,900.

## Public references

- `[slowmistflamincome2026]` — SlowMist on X, Flamincome alert (2026-09-16): <https://x.com/SlowMist_Team/status/2100256590716907706>
- `[cryptotimesweek382026]` — The Crypto Times, "Crypto Hacks Drain \$20M This Week: rsETH Safe, Nostra Fall" (2026-09-21; \$18M Morpho flash loan; VaultYUSDT share price inflated via Curve USDP LP staking; aUSDT redemption): <https://www.cryptotimes.io/2026/09/21/crypto-hacks-drain-20m-this-week-rseth-safe-nostra-fall/>
