# Yfdexf.Finance liquidity-mining exit scam — Ethereum — 2020-09-08 to 2020-09-09

**Loss:** reported as about \$20 million "locked" or taken from investors, a figure that traces to a ZyCrypto report and a CryptoWhale tweet dated 2020-09-09 and was not independently verified `[forklog1]`. Diario Bitcoin said more than \$20M was locked into the protocol within a few hours `[diariobtc1]`. The project ran a pre-sale and liquidity-mining campaign, then its website, Medium page, Twitter and Telegram disappeared `[forklog1]``[diariobtc1]`.

**OAK Techniques observed:** **OAK-T11.005** (Operator-Side Fake Platform Fraud — the YfdexF.Finance project was a wholly fabricated DeFi protocol; the website, Twitter, Telegram, and Medium presence were deception infrastructure deleted simultaneously at the exit moment, confirming the platform had no genuine operational intent). **OAK-T2.001** (Single-Sided Liquidity Plant — the YfdexF liquidity-mining pools were structurally single-sided deposit traps from genesis; the operator seeded the pools with the YFDEX token as the dominant side, and user deposits of ETH and stablecoins into the paired side constituted the extraction target; the pools had no genuine liquidity-provision function and existed solely to collect user deposits for the exit) + **OAK-T5.001** (Hard LP Drain — primary; the operator team controlled the deposit-collection mechanism and withdrew user-deposited funds from the protocol's pools, converting the yield-farming deposit flow into a single-operator exit) + **OAK-T6.001** (Source-Verification Mismatch — the project presented as a legitimate DeFi protocol with a Twitter presence, Telegram community, Medium articles, and a professional website; the operator deleted all of these surfaces simultaneously at the exit moment, confirming they were deception infrastructure rather than genuine community surfaces) + **OAK-T1.003** (onlyOwner / Proxy Rug — the YFDEX token was created as the extraction substrate; the pre-sale and liquidity-mining token distribution was the access-acquisition channel through which user deposits were collected, and the deployer retained full control over the deposit-collection mechanism).

**Attribution:** **pseudonymous** — no named individuals or entities are linked to the operation in the cited sources.

**Key teaching point:** Yfdexf.Finance is an example of the **short-window liquidity-mining exit scam** sub-pattern: a yield-farming protocol promoted aggressively during the 2020 DeFi hype window, with a four-hour pre-sale "until the hard cap is reached", followed by disappearance of the project's website and social accounts within about a day `[forklog1]``[diariobtc1]`. The structural lesson is that **launch-window deposit concentration + anonymous operator + no timelock or multisig on the fund-collection contract = exposed by construction.**

**Corrected 2026-10-11:** Dates corrected (pre-sale announced 2020-09-08, project gone by 2020-09-09, not 2020-09-10); removed the unsourced token price trajectory (peak 0.1 ETH / ~\$36), the "~200 Uniswap transactions", "49 addresses" and final-trade specifics, and the comparisons with Harvest, Compounder and UniCats; the \$20M figure is now marked as an unverified reported figure.

## Summary

Yfdexf.Finance presented itself as a DeFi liquidity-mining platform with a native token, YFDEX. The project announced its token pre-sale on 2020-09-08, with a stated four-hour window "until the hard cap is reached", unsold tokens to be burned, and a conversion rate of 12 YFDEX per ETH `[diariobtc1]`. It ran a two-day promotional campaign on Twitter and Telegram, offering prize draws for retweets and hashtags `[forklog1]`.

By 2020-09-09 the project had disappeared; CryptoWhale's tweet calling it an exit scam is dated the same day, and ForkLog reported on 2020-09-10 that the website was offline and the accounts used to attract investors had been deleted; the project also did not pay for the promotion it had commissioned `[forklog1]``[diariobtc1]`. The \$20M figure is reported as the amount investors locked or lost, and none of the cited sources verifies it independently or reports any recovery `[forklog1]``[diariobtc1]`.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2020-09-08 | Pre-sale announced (four-hour window, hard cap); promotion on Twitter and Telegram | (launch) |
| 2020-09-09 | Website, Medium, Twitter and Telegram disappear; CryptoWhale tweets an exit-scam warning | **exit** |
| 2020-09-10 | ForkLog reports ~\$20M claimed lost | (reporting) |

## What this example tells contributors writing future Technique pages

- **Treat the \$20M as a reported, unverified figure** and record the deposit-window duration (here, hours to about a day) as a structural feature of the sub-pattern.
- **Unilateral operator control of the deposit contract with no timelock or multisig is the standing structural defect;** the simultaneous disappearance of all operator surfaces is a post-hoc signal.

## Public references

- `[forklog1]` — ForkLog, "Organisers of DeFi project vanish with \$20M of users' funds" (2020-09-10): <https://forklog.com/en/organisers-of-defi-project-vanish-with-20m-of-users-funds/>
- `[diariobtc1]` — Diario Bitcoin, "Yfdex Finance desaparece" (2020-09-11): <https://www.diariobitcoin.com/estafas/yfdex-finance-desaparece/>
