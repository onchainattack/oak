# SafeMoon — "locked" liquidity that the team could withdraw through its own LP tokens — SFM / BNB Chain — 2021-03

**Loss:** **More than \$200M** in crypto assets withdrawn from the SafeMoon liquidity pool by the defendants, as alleged by the SEC in its [press release 2023-229](https://www.sec.gov/newsroom/press-releases/2023-229) (2023-11-01). The complaint lists redemptions made between 2021-03-05 and 2022-05-11 ([SEC complaint, 1:23-cv-08138](https://www.sec.gov/files/litigation/complaints/2023/comp-pr2023-229.pdf)). These are allegations in a complaint, not findings. The same press release says the price fell by almost half after it became public on 2021-04-20 that the pool was not locked as claimed.

**OAK Techniques observed:** **OAK-T2.002** (Locked-Liquidity Spoof, *primary*, per the [SEC complaint](https://www.sec.gov/files/litigation/complaints/2023/comp-pr2023-229.pdf)). The team told the public that the 5% of each trade deposited into the PancakeSwap liquidity pool was locked for at least four years. The complaint says each deposit gave the defendants liquidity-provider (LP) tokens, which let them withdraw assets from the pool at will, and that they did so. See [`techniques/T2.002-locked-liquidity-spoof.md`](../techniques/T2.002-locked-liquidity-spoof.md). No other Technique is declared: the complaint does not say the owner raised the transfer tax against holders, and it describes no single-event pool drain or hidden mint.

**Attribution:** **confirmed** as to who is charged, not as to guilt: three individual defendants and two companies were charged. The [SEC](https://www.sec.gov/newsroom/press-releases/2023-229) charged SafeMoon LLC, SafeMoon US LLC, its creator Kyle Nagy, CEO John Karony and CTO Thomas Smith; the same press release says the U.S. Attorney's Office for the Eastern District of New York filed a parallel criminal action. The [complaint](https://www.sec.gov/files/litigation/complaints/2023/comp-pr2023-229.pdf) says Nagy controlled the token contract's owner address from March 2021 until April 2021 and shared control of it with Karony and Smith after about 2021-03-12.

**Key teaching point:** **Check who holds the LP tokens, not what the website says about a lock.** If the deployer or team receives LP tokens as the pool grows, a lock claim is meaningless unless those tokens sit in a locker contract the team cannot reach. The auditor cited in the [complaint](https://www.sec.gov/files/litigation/complaints/2023/comp-pr2023-229.pdf) found no restriction on the tokens generated from the tax.

## Summary

Per the [SEC complaint](https://www.sec.gov/files/litigation/complaints/2023/comp-pr2023-229.pdf), Nagy launched the SafeMoon token on BNB Smart Chain on 2021-03-01. Each transaction carried a 10% tax: 5% went back to holders as a reflection and 5% was deposited into the SafeMoon / wBNB pool on PancakeSwap. Marketing materials, the whitepaper and the website said the pool assets would be locked for at least four years, and the contract source code posted on GitHub said "no rug is possible". The complaint says every deposit from the tax earned the defendants LP tokens, so the assets were never locked, and that they redeemed those LP tokens for tokens and BNB from the pool. On 2021-04-20 a post disclosed that the pool was not locked as described, and the price fell almost 50% the next day. The SEC filed its complaint on 2023-11-01 ([press release](https://www.sec.gov/newsroom/press-releases/2023-229)). This file covers the 2021 launch and lock claim; the 2023 filing is the same case (see `examples/2021-03-safemoon.md`).

## Timeline (UTC)

Stages: **Claim** (launch and lock statements), **Take** (LP-token redemptions), **Exposure** (April 2021), **Response** (legal action). The complaint gives dates, not times.

| When | What happened | OAK |
|---|---|---|
| 2021-03-01 | Nagy launches the SafeMoon token from a smart contract he controlled on BNB Smart Chain; one quadrillion tokens minted, 223 trillion burned, the rest sent to another contract ([complaint](https://www.sec.gov/files/litigation/complaints/2023/comp-pr2023-229.pdf), para. 27) | none — launch |
| Early March 2021 | Whitepaper and marketing say 5% of each trade is "auto-locked" in the pool; website launched 2021-03-06 lists "LP Locked … for 4 years" ([complaint](https://www.sec.gov/files/litigation/complaints/2023/comp-pr2023-229.pdf), paras. 53-57) | **T2.002** |
| 2021-03-05 to 2022-05-11 | Period in which the complaint lists LP-token redemptions by Nagy, Smith and Karony ([complaint](https://www.sec.gov/files/litigation/complaints/2023/comp-pr2023-229.pdf)); the SEC puts the total above \$200M ([press release](https://www.sec.gov/newsroom/press-releases/2023-229)). Per-transaction hashes: undisclosed | **T2.002** |
| 2021-03-12 to 2021-04-20 | Price rises more than 55,000% and market value passes \$5.7B ([SEC press release](https://www.sec.gov/newsroom/press-releases/2023-229)) | none — price rise |
| 2021-04-20 | A post discloses that the pool is not locked as described; Nagy writes privately to Karony that "2.5% is not ever locked" ([complaint](https://www.sec.gov/files/litigation/complaints/2023/comp-pr2023-229.pdf), para. 63) | **T2.002** |
| 2021-04-21 | Price falls almost 50%; Karony tweets that the lock was not automatic but discretionary; the project commissions a third-party audit that finds no lock on tax-generated tokens ([complaint](https://www.sec.gov/files/litigation/complaints/2023/comp-pr2023-229.pdf), paras. 64-69) | response |
| 2023-11-01 | SEC complaint filed in the Eastern District of New York; parallel criminal action by the U.S. Attorney's Office ([SEC press release](https://www.sec.gov/newsroom/press-releases/2023-229)) | response |
| 2023-11-01 | Indictment unsealed in the Eastern District of New York charging Karony, Nagy and Smith with conspiracy to commit securities fraud, wire fraud conspiracy and money laundering conspiracy; Karony arrested in Provo, Utah, and Smith in Bethlehem, New Hampshire; Nagy at large. The notice says 2,900 BNB (about \$860K) from the pool was sent on for a Porsche and an NFT ([EDNY notice, IRS-CI mirror](https://www.irs.gov/node/127736)). These are allegations. | response |

Key addresses: none printed in full on the opened pages (the owner address and the pool address are referred to by name only). Undisclosed.

## Root-cause evidence

- **Technique:** OAK-T2.002
- **Source:** <https://www.sec.gov/files/litigation/complaints/2023/comp-pr2023-229.pdf>; <https://www.sec.gov/newsroom/press-releases/2023-229>
- **Source type:** government
- **Confidence:** reported
- **Evidence:** The SEC complaint states that deposits from the 5% tax gave the defendants LP tokens that let them withdraw pool assets, and that the claimed lock did not exist. The complaint was filed 2023-11-01 and its contents are allegations, so the mechanism is not adjudicated here. The on-chain redemption transactions are not listed on the opened pages.

## Public references

- SEC, ["SEC Charges Crypto Company SafeMoon and its Executive Team for Fraud and Unregistered Offering of Crypto Securities"](https://www.sec.gov/newsroom/press-releases/2023-229) (2023-11-01), press release 2023-229.
- SEC, [Complaint, *SEC v. SafeMoon LLC et al.*, No. 1:23-cv-08138 (E.D.N.Y.)](https://www.sec.gov/files/litigation/complaints/2023/comp-pr2023-229.pdf), filed 2023-11-01.
- IRS-CI mirror of the EDNY press release on the indictment (2023-11-01): <https://www.irs.gov/node/127736>
