# BonqDAO — permissionless Tellor price reports used instantly, WALBT price pushed up then down — Polygon — 2023-02-01

**Loss:** **~\$120M nominal**, as headline figure from [Immunefi](https://immunefi.com/blog/bug-fix-reviews/hack-analysis-bonqdao-february-2023/), [Halborn](https://www.halborn.com/blog/post/explained-the-bonqdao-hack-february-2023), [BlockSec](https://blocksec.com/blog/bonq-dao-exploited-on-polygon-120-m-stolen-due-to-flawed-logic) and [PeckShield via BankInfoSecurity](https://www.bankinfosecurity.com/how-much-did-bonqdao-lose-in-smart-contracts-hack-a-21098) (\$108M BEUR plus \$11M wrapped ALBT). The realised amount was far lower. BlockSec reports about 98.6M BEUR and 113M WALBT taken, with 98.1M BEUR still on Polygon, and BankInfoSecurity relays CertiK saying thin liquidity let the attacker take out only about \$1M, and that the attacker's wallet held about \$5M with about \$42,000 sold. Immunefi counts roughly 113M WALBT seized.

**OAK Techniques observed:** **OAK-T9.001** (Oracle Price Manipulation — *primary*). BonqDAO read its WALBT price from TellorFlex and used the latest reported value at once. Anyone staking the minimum 10 TRB could submit a value ([Halborn](https://www.halborn.com/blog/post/explained-the-bonqdao-hack-february-2023), [BlockSec](https://blocksec.com/blog/bonq-dao-exploited-on-polygon-120-m-stolen-due-to-flawed-logic)). See [`techniques/T9.001-oracle-price-manipulation.md`](../techniques/T9.001-oracle-price-manipulation.md). **OAK-T7.001** (Mixer-Routed Hop — BlockSec reports 1,105 ETH laundered through Tornado Cash on 2023-02-03). Flash loans are not used: none of Immunefi, Halborn or BlockSec mentions one, so T9.002 from the earlier version of this file is removed.

**Attribution:** **unattributed.** BlockSec lists one account, [`0xcacf2d28b2a5309e099f0c6e8c60ec3ddf656642`](https://polygonscan.com/address/0xcacf2d28b2a5309e099f0c6e8c60ec3ddf656642). No opened source names a person.

**Key teaching point:** **Do not read a price from an oracle in the same block it was reported; require a delay (or a TWAP) long enough for a bad report to be disputed.** The two attack transactions below each used a freshly reported WALBT price. [Halborn](https://www.halborn.com/blog/post/explained-the-bonqdao-hack-february-2023) says BonqDAO used instantaneous price updates, and [BlockSec](https://blocksec.com/blog/bonq-dao-exploited-on-polygon-120-m-stolen-due-to-flawed-logic) says the collateral needed to change the TellorFlex quote was too low. Immunefi's recommended fix is a time-weighted average or a decentralized feed.

## Summary

On 2023-02-01 an attacker staked the minimum 10 TRB in TellorFlex and submitted a high WALBT price. They opened a trove with 0.1 WALBT and borrowed about 100M BEUR. Roughly two minutes later a second report set the price very low, which made 30 or more other troves liquidatable. The attacker liquidated them for about 113M WALBT ([Immunefi](https://immunefi.com/blog/bug-fix-reviews/hack-analysis-bonqdao-february-2023/), [Halborn](https://www.halborn.com/blog/post/explained-the-bonqdao-hack-february-2023), [BlockSec](https://blocksec.com/blog/bonq-dao-exploited-on-polygon-120-m-stolen-due-to-flawed-logic)). BonqDAO paused its platform. AllianceBlock, the ALBT issuer, said it would remove liquidity from BonqDAO, halt trading and mint new ALBT to compensate holders ([BankInfoSecurity](https://www.bankinfosecurity.com/how-much-did-bonqdao-lose-in-smart-contracts-hack-a-21098)). Immunefi reports BonqDAO responded with an airdrop to compensate users.

## Timeline (UTC)

Stages: **Flaw** (instant use of Tellor reports), **Take** (two transactions), **Money**, **Response**. No opened source gives block times.

| When | What happened | OAK |
|---|---|---|
| Before 2023-02-01 | BonqDAO's price feed reads WALBT from [TellorFlex `0x8f55D884CAD66B79e1a131f6bCB0e66f4fD84d5B`](https://polygonscan.com/address/0x8f55D884CAD66B79e1a131f6bCB0e66f4fD84d5B) and uses the latest reported value; reporters need 10 TRB ([Immunefi](https://immunefi.com/blog/bug-fix-reviews/hack-analysis-bonqdao-february-2023/), [BlockSec](https://blocksec.com/blog/bonq-dao-exploited-on-polygon-120-m-stolen-due-to-flawed-logic)) | **T9.001** |
| 2023-02-01 | The attacker stakes 10 TRB and reports a high WALBT price. No hash for the staking step is published in the opened sources | **T9.001** |
| 2023-02-01 | Tx 1: deposits 0.1 WALBT and borrows about 100M BEUR, [`0x31957ecc43774d19f54d9968e95c69c882468b46860f921668f2c55fadd51b19`](https://polygonscan.com/tx/0x31957ecc43774d19f54d9968e95c69c882468b46860f921668f2c55fadd51b19) | **T9.001** |
| 2023-02-01 (about two minutes later, per Immunefi) | Tx 2: price set very low, 30 or more troves liquidated for about 113M WALBT, [`0xa02d0c3d16d6ee0e0b6a42c3cc91997c2b40c87d777136dedebe8ee0f47f32b1`](https://polygonscan.com/tx/0xa02d0c3d16d6ee0e0b6a42c3cc91997c2b40c87d777136dedebe8ee0f47f32b1) | **T9.001** |
| 2023-02-01 onward | About 0.5M BEUR is swapped to 534,535 USDC and then ETH; 113M WALBT is burned to unlock 113M ALBT on Ethereum ([BlockSec](https://blocksec.com/blog/bonq-dao-exploited-on-polygon-120-m-stolen-due-to-flawed-logic)). The Ethereum account held 711 ETH, 534,481 DAI and 89M ALBT at BlockSec's writing; the Ethereum address is not given separately | — |
| 2023-02-03 | 1,105 ETH is laundered through Tornado Cash (BlockSec) | T7.001 |
| 2023-02-01 onward | BonqDAO pauses the platform; TVL fell from \$13M to \$44,000 (BlockSec); compensation airdrop planned (Immunefi) | response |

Key addresses:

- Attacker account — [`0xcacf2d28b2a5309e099f0c6e8c60ec3ddf656642`](https://polygonscan.com/address/0xcacf2d28b2a5309e099f0c6e8c60ec3ddf656642) (BlockSec labels it both Polygon and Ethereum)
- TellorFlex — [`0x8f55D884CAD66B79e1a131f6bCB0e66f4fD84d5B`](https://polygonscan.com/address/0x8f55D884CAD66B79e1a131f6bCB0e66f4fD84d5B)
- TRB — [`0xE3322702BEdaaEd36CdDAb233360B939775ae5f1`](https://polygonscan.com/address/0xE3322702BEdaaEd36CdDAb233360B939775ae5f1)
- Trove factory — [`0x3bB7fFD08f46620beA3a9Ae7F096cF2b213768B3`](https://polygonscan.com/address/0x3bB7fFD08f46620beA3a9Ae7F096cF2b213768B3)
- WALBT — [`0x35b2ECE5B1eD6a7a99b83508F8ceEAB8661E0632`](https://polygonscan.com/address/0x35b2ECE5B1eD6a7a99b83508F8ceEAB8661E0632)
- BEUR — [`0x338Eb4d394a4327E5dB80d08628fa56EA2FD4B81`](https://polygonscan.com/address/0x338Eb4d394a4327E5dB80d08628fa56EA2FD4B81)

## Root-cause evidence

- **Technique:** OAK-T9.001
- **Source:** <https://immunefi.com/blog/bug-fix-reviews/hack-analysis-bonqdao-february-2023/>; <https://www.halborn.com/blog/post/explained-the-bonqdao-hack-february-2023>; <https://blocksec.com/blog/bonq-dao-exploited-on-polygon-120-m-stolen-due-to-flawed-logic>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** Three security firms describe the same sequence: a 10 TRB stake, a reported price used at once, a 100M BEUR borrow against 0.1 WALBT, then a low price and liquidations. BonqDAO's own report (a Mirror post) and Omniscia's post-mortem returned HTTP 403 and were not read, so the operator's statement is not part of this evidence. Sources differ on the amount BonqDAO lost versus what the attacker could realise (see Loss).

## Public references

- Immunefi, "Hack Analysis: BonqDAO, February 2023": <https://immunefi.com/blog/bug-fix-reviews/hack-analysis-bonqdao-february-2023/>
- Halborn, "Explained: The BonqDAO Hack (February 2023)": <https://www.halborn.com/blog/post/explained-the-bonqdao-hack-february-2023>
- BlockSec, "Bonq DAO exploited on Polygon, \$120M stolen due to flawed logic": <https://blocksec.com/blog/bonq-dao-exploited-on-polygon-120-m-stolen-due-to-flawed-logic>
- BankInfoSecurity, "How Much Did BonqDAO Lose in Smart Contracts Hack?": <https://www.bankinfosecurity.com/how-much-did-bonqdao-lose-in-smart-contracts-hack-a-21098>
