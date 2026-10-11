# MakerDAO legacy auction keeper — four lots won with zero bids on Black Thursday sat unsettled for six and a half years behind a function that never checked its caller — third-party keeper on MakerDAO / Ethereum — 2026-10-06

**Loss:** **200 ETH (~\$543K per CertiK; ~\$538K per Defimon)** — the collateral from **ETH-A Flipper auctions #1457–#1460** (50 ETH each), won by this keeper with **zero bids in March 2020** and never `deal()`-settled. MakerDAO's core contracts behaved as designed.

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary, confirmed*. Function selector **`0x8804d1de`** in the keeper implementation **lacked the `ds-auth` check** its other privileged functions had, **accepted any address as an "adapter,"** called **`Vat.hope`** on it and then its **`join()`**. The attacker's module ran with Vat delegation over the keeper's account, called **`deal()`** on the retired Flipper, **`flux()`**-moved 200 ETH to itself, and exited through ETH-A GemJoin as WETH. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). **OAK-T11.013** (Legacy-Version Maintenance Attack Surface — the keeper was dormant since 2020 and held claimable value nobody was watching).

**Attribution:** **pseudonymous.** Attacker EOA `0x01EB957E5C7DcDDD60F3C875956cCc6fb9BdA5FA`, funded by a single 0.1 ETH Tornado Cash withdrawal 16 minutes before the exploit; proceeds returned to Tornado Cash in 10 ETH deposits.

**Key teaching point:** **Unclaimed value does not expire; it waits for the first caller.** The collateral was the keeper's from the 2020 [Black Thursday](2020-03-makerdao-black-thursday.md) zero-bid auctions; the only thing standing between it and anyone was one unauthenticated function. Settling or sweeping what a retired contract is owed is part of retiring it.

## Summary

On 2026-10-06 at 06:13 UTC an attacker passed a self-deployed module to an unauthenticated function of a 2020 MakerDAO liquidation keeper (proxy `0x9c05a05893Ada984FC20D0DA0c046De5Cc0e8273`). The keeper granted the module Vat delegation and called into it; the module settled four never-dealt Black Thursday auctions, moved their 200 ETH collateral out of the keeper's Vat balance, and exited it as WETH.

## Root-cause evidence

- **Technique:** OAK-T9.004
- **Source:** <https://www.certik.com/blog/makerdao-legacy-auction-keeper-incident-analysis>; <https://x.com/DefimonAlerts/status/2107391959853600812>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** CertiK's transaction-level analysis: keeper function 0x8804d1de lacked the ds-auth check, accepted any adapter, granted it Vat delegation and called it; the module settled four 2020 Flipper lots and exited 200 ETH. Defimon independently flagged the missing access check.

## Public references

- `[certikmakerkeeper2026]` — CertiK, "MakerDAO Legacy Auction Keeper Incident Analysis": <https://www.certik.com/blog/makerdao-legacy-auction-keeper-incident-analysis>
- `[cryptotimesmakerkeeper2026]` — The Crypto Times, "Dormant MakerDAO Keeper Drained of \$538K, Core Remains Intact" (2026-10-06): <https://www.cryptotimes.io/2026/10/06/dormant-makerdao-keeper-drained-of-538k-core-remains-intact/>
- `[defimonmakerkeeper2026]` — Defimon Alerts on X (2026-10-06): <https://x.com/DefimonAlerts/status/2107391959853600812>
