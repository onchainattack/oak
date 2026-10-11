# Meerkat Finance deployer-drain exit scam — BSC — 2021-03-04

**Loss:** approximately \$31M (13.96M BUSD + 73,635 BNB drained from the two Meerkat vaults one day after launch `[rektmeerkat]`). Rekt judged recovery unlikely `[rektmeerkat]`. Meerkat first called it a hack and then took its Twitter and website offline `[decryptmeerkat]`.
**OAK Techniques observed:** **OAK-T5.005** (Treasury-Management Exit — the project deployer retained an admin-key-controlled function that allowed the vault's entire deposited balance to be transferred to an address under the deployer's control; the drain was executed through an upgrade the deployer made). **OAK-T5.001** (Hard LP Drain — the vault's deposited BUSD and BNB liquidity-provider funds were drained in a single, large transaction from the vault to the deployer's exit address, constituting the "hard" (single-transaction, total-drain) LP-extraction pattern).
**Attribution:** **pseudonymous** The Meerkat Finance team was anonymous. After the drain, the project's Telegram group, Twitter account, and website were deleted. No named individual was publicly identified, and no law-enforcement action was publicly reported. Rekt reports funds split across several addresses and sent toward the Binance bridge, which was suspended `[rektmeerkat]`.
**Corrected 2026-10-11:** Mechanism fixed (the deployer upgraded both vaults to new implementations containing an unprotected `init(owner)`, which was then called to take ownership and withdraw); removed the unsourced fund-laundering claim, the PeckShield/CertiK/SlowMist/RugDoc confirmations, the "extreme APY" and 24h-inflow framing, and the list of later rug-pulls; Rekt allows a small chance of deployer key compromise.
**Key teaching point:** **Meerkat Finance is the canonical BSC early-era exit-scam worked example: the project launched, took about \$31M in deposits within roughly a day, after which the deployer-upgraded vaults were emptied via a backdoor `init` function, with the team claiming a hack before going dark.** Rekt called it an intentional rug pull while noting a small chance of private-key compromise; the distinction between an upgrade-backdoor exit and an external exploit is the lesson.

## Summary

Meerkat Finance was a yield-vault protocol on Binance Smart Chain that had been live for about one day when it was drained on 2021-03-04 (the exact launch date is not stated in the sources consulted) `[rektmeerkat]`. Its BUSD and WBNB vaults used OpenZeppelin's Transparent Proxy pattern. Per Rekt, the deployer upgraded the WBNB vault and then the BUSD vault to new implementations that added an `init(address owner)` function with no permission check; the attacker called it to become vault owner and then called a withdrawal function that, in the upgraded code, only removes funds to the owner. The drain took place at about 08:53-08:54 UTC and totalled 13,968,039 BUSD and 73,635 WBNB, roughly \$31M `[rektmeerkat]`.

Meerkat first claimed that hackers had stolen the funds, then took its Twitter and website offline, and its founders were unreachable `[decryptmeerkat]`. Community members called it a rug pull, and Wu Blockchain wrote that it "may be the largest fraud project on the Binance Smart Blockchain"; Binance said it was investigating `[decryptmeerkat]`. Rekt notes a small chance the deployer key was compromised, so insider exit versus external hack is not conclusively resolved.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| ~2021-03-03 | Meerkat vaults live on BSC (Rekt: "just one day" before the exploit) | (standing T5.005 surface: upgradeable vault proxies) |
| 2021-03-04 | Deployer upgrades the WBNB then BUSD vaults to implementations with an unprotected `init` `[rektmeerkat]` | T5.005 |
| 2021-03-04 08:53-08:54 | Attacker calls `init` to take ownership and withdraws ~13.97M BUSD and ~73.6K WBNB `[rektmeerkat]` | T5.001 |
| 2021-03-04 | Meerkat claims a hack, then goes offline; Binance suspends its bridge `[rektmeerkat]` `[decryptmeerkat]` | (team exit; exchange response) |

## Realised extraction

Approximately \$31M: 13,968,039 BUSD + 73,635 WBNB. Rekt reports the funds were split and sent toward the Binance bridge, and that a rollback was unlikely `[rektmeerkat]`.

## T5.005 classification

Meerkat Finance is a canonical OAK-T5.005 (Treasury-Management Exit) worked example, specifically in the **deployer-admin-key-drain** sub-shape. The deployer held upgrade authority over the vault proxies and used it to install an implementation with an unprotected `init(owner)`, which was then called to take ownership and withdraw `[rektmeerkat]`. Rekt judged this an intentional rug pull but allowed a small chance of deployer key compromise, so the insider-exit classification is the best-supported reading rather than a proven fact.

The T5.005 classification at v0.1 extends to any case where a protocol's treasury or vault is drained by a party with legitimate, privileged access authority — including deployer exits (Meerkat), CEO / founder misappropriation (FTX), and multisig-signer insider action (Cypher Protocol May 2024, the hoak insider-redemption case). The unifying pattern is that the drain is executed with the contract's own permission structure, not in violation of it.

## T5.001 classification

The single-transaction vault drain — transferring the entire deposited balance (not a gradual trickle, not a series of smaller withdrawals) — matches the OAK-T5.001 (Hard LP Drain) pattern: a single, large outflow that extracts effectively the entire LP or vault balance in one action. The T5.001 classification is the extraction-velocity dimension; T5.005 is the authority dimension (who drained it). The two are complementary: a T5.005 exit can exhibit either a hard-drain (T5.001, single-transaction, as at Meerkat) or a slow-drain (T5.002, multi-transaction over time, as at QuadrigaCX or a prolonged operator-compromise).

## Public references

- `[rektmeerkat]` — Rekt, "Meerkat Finance - BSC - REKT" (2021-03-04): <https://rekt.news/meerkat-finance-bsc-rekt>
- `[decryptmeerkat]` — Decrypt, "Binance Chain DeFi Meerkat Finance hack rug pull" (2021-03-04): <https://decrypt.co/60242/binance-chain-defi-meerkat-finance-hack-rug-pull>
