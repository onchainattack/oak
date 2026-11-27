# Fortress Protocol — FTS bought to pass a collateral proposal, then a publicly callable price feed set its price — Fortress / BNB Smart Chain — 2022-05-08

**Loss:** about **\$3 million**: 1,048.1 ETH (about \$2,575,799) and 400,000 DAI (about \$400,205), about \$2,976,004 in total, per [CertiK](https://www.certik.com/blog/fortress-loans-exploit). [The Record](https://therecord.media/defi-protocol-fortress-announces-3-million-hack/) reports the same ETH and DAI amounts. The protocol paused supply and borrow ([The Record](https://therecord.media/defi-protocol-fortress-announces-3-million-hack/)); [Rekt](https://rekt.news/fortress-rekt/) reports the contracts stayed live with the UI paused. No recovery is reported in the opened pages.

**OAK Techniques observed:** **OAK-T9.001** (Oracle Price Manipulation — *primary*). Per [Rekt](https://rekt.news/fortress-rekt/) the oracle's price `submit()` function was publicly callable; per [CertiK](https://www.certik.com/blog/fortress-loans-exploit) the required-signatures and power checks in that function were disabled, so anyone could set prices. See [`techniques/T9.001-oracle-price-manipulation.md`](../techniques/T9.001-oracle-price-manipulation.md). **OAK-T16.002** (Hostile-Vote Treasury Drain — *secondary, partial fit*). The attacker bought FTS on the market to reach the 400,000 FTS voting minimum and passed proposal 11, which listed FTS as collateral; the payload did not pay the treasury out directly but made the borrow-out possible ([CertiK](https://www.certik.com/blog/fortress-loans-exploit), [Rekt](https://rekt.news/fortress-rekt/)). See [`techniques/T16.002-hostile-vote-treasury-drain.md`](../techniques/T16.002-hostile-vote-treasury-drain.md). **OAK-T7.001** (Mixer-Routed Hop — the stolen ETH and DAI went to Tornado Cash, per [Rekt](https://rekt.news/fortress-rekt/) and [CertiK](https://www.certik.com/blog/fortress-loans-exploit)). A flash-loan vote takeover and a flash-loan-enabled exploit are not declared: none of the opened pages describes a flash loan, and the voting power was bought and held across a multi-day proposal.

**Attribution:** **pseudonymous** — attacker EOA [`0xa6af2872176320015f8ddb2ba013b38cb35d22ad`](https://bscscan.com/address/0xa6af2872176320015f8ddb2ba013b38cb35d22ad) per [Rekt](https://rekt.news/fortress-rekt/) and [CertiK](https://www.certik.com/blog/fortress-loans-exploit). No source opened names an operator.

**Key teaching point:** **Do not let governance list a new collateral asset, or an oracle accept price updates, without a check the attacker cannot buy or call their way past.** [CertiK](https://www.certik.com/blog/fortress-loans-exploit) found the critical oracle verification missing, and that a low FTS price let about 11 ETH buy the 400,000 FTS needed to vote. [Rekt](https://rekt.news/fortress-rekt/) notes the suspicious proposal was active for three days.

## Summary

Fortress, a lending protocol on BNB Smart Chain built by Jetfuel Finance, announced on 2022-05-09 that it had been hit by what it believed was an oracle manipulation attack draining all funds ([The Record](https://therecord.media/defi-protocol-fortress-announces-3-million-hack/)). Rekt and CertiK describe two linked weaknesses ([Rekt](https://rekt.news/fortress-rekt/), [CertiK](https://www.certik.com/blog/fortress-loans-exploit)).

First, governance: the attacker funded an address with ETH that [Rekt](https://rekt.news/fortress-rekt/) traces to Tornado Cash on Ethereum, swapped it for FTS, and used the FTS to reach quorum on proposal 11, which added FTS as collateral with a collateral factor of 700000000000000000. CertiK gives the minimum to vote as 400,000 FTS, about 11 ETH at the depressed FTS price; BlockSec, relayed by The Record, says about \$8,000 bought 296,193 FTS to vote. Rekt says the proposal was active for 3 days.

Second, the oracle: the price `submit()` function could be called by anyone, so the attacker set the FTS price high, posted 100 FTS as collateral, and borrowed the protocol's other assets ([Rekt](https://rekt.news/fortress-rekt/), [CertiK](https://www.certik.com/blog/fortress-loans-exploit)). The borrowed assets were swapped to ETH and DAI and deposited into Tornado Cash ([Rekt](https://rekt.news/fortress-rekt/)). FTS fell more than 45% per Coinbase data in [The Record](https://therecord.media/defi-protocol-fortress-announces-3-million-hack/).

Which oracle was involved differs by source: [The Record](https://therecord.media/defi-protocol-fortress-announces-3-million-hack/) quotes Umbrella Network saying the exploits may have stemmed from an Umbrella Network price feed error and that it deployed a hotfix; CertiK describes a `submit()` function on a chain contract. The two are not reconciled in the opened pages.

## Timeline (UTC)

Stages: **Entry** (governance and oracle weaknesses), **Preparation** (funding, FTS purchase, proposal), **Execution** (price set, borrow), **Money** (Tornado Cash), **Response**. Times are from CertiK unless noted.

| When | What happened | OAK |
|---|---|---|
| Before 2022-05-08 (undisclosed) | Oracle `submit()` could be called by anyone, and governance accepted a proposal backed by 400,000 FTS ([CertiK](https://www.certik.com/blog/fortress-loans-exploit), [Rekt](https://rekt.news/fortress-rekt/)) | **T9.001** |
| 2022-04-19 17:41:59 | First recorded attacker interaction with Fortress; CertiK calls it possible reconnaissance ([CertiK](https://www.certik.com/blog/fortress-loans-exploit)) | — |
| Before the vote (date undisclosed) | Attacker EOA funded with ETH traced by Rekt to Tornado Cash, swapped for FTS ([Rekt](https://rekt.news/fortress-rekt/)) | T7.001 |
| Multi-day, ending before the exploit (exact dates undisclosed) | Proposal 11 submitted and voted; it set FTS collateral factor to 700000000000000000 and was active for 3 days ([Rekt](https://rekt.news/fortress-rekt/), [CertiK](https://www.certik.com/blog/fortress-loans-exploit)) | **T16.002** |
| 2022-05-08 20:31:03 | Attacker deploys the contract used in the exploit ([CertiK](https://www.certik.com/blog/fortress-loans-exploit)) | — |
| 2022-05-08 20:34:42, [tx](https://bscscan.com/tx/0x13d19809b19ac512da6d110764caee75e2157ea62cb70937c8d9471afcb061bf) | Oracle `submit()` called to set the FTS price; 100 FTS posted as collateral and the other assets borrowed via the attack contract; time confirmed by OAK on-chain lookup | **T9.001** |
| After 2022-05-08 | Borrowed assets swapped to ETH and DAI; 1,048 ETH and 400k DAI deposited into Tornado Cash ([Rekt](https://rekt.news/fortress-rekt/)); CertiK adds a route over cBridge and Multichain from BSC to Ethereum before Tornado Cash ([CertiK](https://www.certik.com/blog/fortress-loans-exploit)). Individual hashes not verified by OAK | T7.001 |
| 2022-05-08 evening to 2022-05-09 | Fortress announces the attack and asks users not to supply assets; supply and borrow disabled; Umbrella Network deploys a hotfix; proposal 12 launched to repair the damage ([The Record](https://therecord.media/defi-protocol-fortress-announces-3-million-hack/), [Rekt](https://rekt.news/fortress-rekt/)) | response |

Key addresses (as printed by [CertiK](https://www.certik.com/blog/fortress-loans-exploit) and [Rekt](https://rekt.news/fortress-rekt/)):

- Attacker EOA — [`0xa6af2872176320015f8ddb2ba013b38cb35d22ad`](https://bscscan.com/address/0xa6af2872176320015f8ddb2ba013b38cb35d22ad)
- Attack contract (CertiK: "highly likely") — [`0xcd337b920678cf35143322ab31ab8977c3463a45`](https://bscscan.com/address/0xcd337b920678cf35143322ab31ab8977c3463a45)
- Proposer EOA — [`0x0db3b68c482b04c49cd64728ad5d6d9a7b8e43e6`](https://bscscan.com/address/0x0db3b68c482b04c49cd64728ad5d6d9a7b8e43e6)
- Governor Alpha contract — [`0xe79ecdb7fedd413e697f083982bac29e93d86b2e`](https://bscscan.com/address/0xe79ecdb7fedd413e697f083982bac29e93d86b2e)
- FortressPriceOracle — [`0x00fcf33bfa9e3ff791b2b819ab2446861a318285`](https://bscscan.com/address/0x00fcf33bfa9e3ff791b2b819ab2446861a318285)
- Chain (price submit) contract — [`0xc11b687cd6061a6516e23769e4657b6efa25d78e`](https://bscscan.com/address/0xc11b687cd6061a6516e23769e4657b6efa25d78e)

## Root-cause evidence

- **Technique:** OAK-T9.001
- **Source:** <https://www.certik.com/blog/fortress-loans-exploit>; <https://rekt.news/fortress-rekt/>; <https://therecord.media/defi-protocol-fortress-announces-3-million-hack/>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** CertiK and Rekt independently describe a publicly callable price `submit()` and a market-bought FTS vote passing proposal 11. Fortress itself only said it believed the cause was oracle manipulation and was investigating. Open: which oracle provider's contract was involved (Umbrella Network per The Record), and whether the voting step was necessary to the borrow.

## Public references

- [CertiK, "Fortress Loans Incident Analysis"](https://www.certik.com/blog/fortress-loans-exploit) (2022-05).
- [Rekt, "Fortress Protocol"](https://rekt.news/fortress-rekt/) (2022-05-09).
- [The Record, "DeFi protocol Fortress announces \$3 million hack"](https://therecord.media/defi-protocol-fortress-announces-3-million-hack/) (2022-05-09).
