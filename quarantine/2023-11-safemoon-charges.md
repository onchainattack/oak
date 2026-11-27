> **MERGED 2026-11-27 into `examples/2021-03-safemoon.md`** — a duplicate entry for the same case (the 2021 launch and liquidity-lock claims; the 2023 file was dated by the charges). Not part of the OAK corpus; kept for the record.

**Merged into:** 2021-03-safemoon

# SafeMoon (SFM) — liquidity claimed as locked that was not locked, and liquidity withdrawn for personal use — BNB Chain — 2023-11-01 charges

**Loss:** Crypto assets worth more than \$200M allegedly withdrawn from the project and misappropriated, per the [SEC press release 2023-229](https://www.sec.gov/newsroom/press-releases/2023-229). The [EDNY indictment notice](https://www.irs.gov/node/127736) says only "millions of dollars" were diverted from the liquidity pools. These are allegations; no opened page reports a judgment.

**OAK Techniques observed:** **OAK-T2.002** (Locked-Liquidity Spoof — *primary*; the SEC alleges Nagy assured investors the pool was safely locked while large portions of the pool were never locked ([SEC](https://www.sec.gov/newsroom/press-releases/2023-229))). **OAK-T5.005** (Treasury-Management Exit — withdrawal of more than \$200M for personal spending such as cars, travel and homes, per the SEC). **OAK-T3.002** (Wash-Trade Volume Inflation — the SEC alleges Karony used a trading-platform account to buy and sell SafeMoon to create the impression of market activity). See [`T2.002`](../techniques/T2.002-locked-liquidity-spoof.md), [`T5.005`](../techniques/T5.005-treasury-management-exit.md), [`T3.002`](../techniques/T3.002-wash-trade-volume-inflation.md).

**Attribution:** **confirmed as charged, not adjudicated.** On 2023-11-01 the SEC charged SafeMoon LLC, SafeMoon US LLC, creator Kyle Nagy, CEO Braden John Karony and CTO Thomas Glenn Smith ([SEC litigation release 25888](http://www.sec.gov/litigation/litreleases/lr-25888)). The [EDNY indictment](https://www.irs.gov/node/127736) charges Karony, Nagy and Smith with conspiracy to commit securities fraud, conspiracy to commit wire fraud and money laundering conspiracy; Karony and Smith were arrested, Nagy was at large. Defendants are presumed innocent.

**Key teaching point:** **Verify a locked-liquidity claim against the chain before trusting it: which locker contract holds the LP tokens, what share of total LP supply it covers, and who can release it.** The SEC says the pool was not locked as claimed and the public learned that on 2021-04-20, when the price fell nearly 50%.

## Summary

SafeMoon (SFM) was issued by SafeMoon LLC in March 2021; every transaction carried a 10% tax, split into two 5% tranches, one reflected to holders and one deposited into liquidity pools ([EDNY](https://www.irs.gov/node/127736)). The SEC says the price rose more than 55,000% from 2021-03-12 to 2021-04-20, with market capitalization above \$5.7B, while the [EDNY notice](https://www.irs.gov/node/127736) says it reportedly grew to more than \$8B; sources differ. The SEC alleges the defendants misrepresented the lock, withdrew more than \$200M and spent it personally, and that Karony and Smith later used misappropriated assets to buy SafeMoon and prop up its price ([SEC](https://www.sec.gov/newsroom/press-releases/2023-229)). Prosecutors say the defendants moved funds through private un-hosted wallets and pseudonymous exchange accounts ([EDNY](https://www.irs.gov/node/127736)). The EDNY notice also alleges Smith sent 2,900 BNB (about \$860,000) to a third party for a custom Porsche 911 and an NFT. Addresses, transaction hashes and the withdrawal dates are not in any opened page.

## Timeline (UTC)

Stages: **Entry** (lock claim) → **Take** → **Money** → **Response**. Only dates are public; no times.

| When | What happened | OAK |
|---|---|---|
| 2021-03 | SFM issued; 10% tax split into reflections and liquidity pools ([EDNY](https://www.irs.gov/node/127736)) | — |
| 2021-03-12 to 2021-04-20 | Price up more than 55,000%; Nagy allegedly tells investors pool funds are safely locked ([SEC](https://www.sec.gov/newsroom/press-releases/2023-229)) | **T2.002** |
| Undisclosed (2021 onward) | Defendants allegedly keep access to the pools and withdraw more than \$200M, spending on cars, travel and homes ([SEC](https://www.sec.gov/newsroom/press-releases/2023-229)); wash trading by Karony alleged | **T5.005**, **T3.002** |
| 2021-04-20 | Public learns the pool was not locked as claimed; price falls nearly 50% ([SEC](https://www.sec.gov/newsroom/press-releases/2023-229)) | — |
| After 2021-04-20 (undisclosed) | Karony and Smith allegedly use misappropriated assets to buy SFM and prop up the price; funds routed via unhosted wallets and pseudonymous exchange accounts ([SEC](https://www.sec.gov/newsroom/press-releases/2023-229), [EDNY](https://www.irs.gov/node/127736)) | — |
| 2023-11-01 | SEC complaint (case 1:23-cv-08138) and EDNY indictment unsealed; Karony arrested in Provo, Utah, Smith in Bethlehem, New Hampshire ([SEC](http://www.sec.gov/litigation/litreleases/lr-25888), [EDNY](https://www.irs.gov/node/127736)) | response |

Key addresses: undisclosed in any opened page.

## Root-cause evidence

- **Technique:** OAK-T2.002
- **Source:** <https://www.sec.gov/newsroom/press-releases/2023-229>; <https://www.irs.gov/node/127736>; <http://www.sec.gov/litigation/litreleases/lr-25888>
- **Source type:** government
- **Confidence:** reported
- **Evidence:** Government charging documents allege the lock claim was false and funds were withdrawn. They are allegations, not findings, and no opened page reports a verdict, plea or settlement. Open: which wallets, amounts per withdrawal, and outcome.

## Public references

- SEC, press release 2023-229 (2023-11-01): <https://www.sec.gov/newsroom/press-releases/2023-229>
- SEC, litigation release 25888 (2023-11-01): <http://www.sec.gov/litigation/litreleases/lr-25888>
- IRS-CI mirror of the EDNY press release on the indictment (2023-11-01): <https://www.irs.gov/node/127736>
