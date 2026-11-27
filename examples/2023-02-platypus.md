# Platypus Finance — emergencyWithdraw checked solvency but not debt, collateral pulled while USP debt stayed — Avalanche — 2023-02-16

**Loss:** **~\$8.5M** per Platypus and "nearly \$9 million" per CertiK ([The Record](https://therecord.media/defi-platform-platypus-says-nearly-9-million-in-crypto-stolen-in-flash-loan-attack); [CertiK](https://www.certik.com/blog/platypus-finance-incident-analysis) also gives about \$8.5M), \$9.05M per [BlockSec](https://blocksec.com/blog/5-platypus-finance-surviving-three-attacks-with-a-stroke-of-luck), about \$9.1M per [The Block](https://www.theblock.co/news/ecosystems/2023-02-25-platypus-finance-says-french-police-took-suspected-hackers-into-custody-215206). **Recovered:** about \$2.4M USDC, pulled out of the attacker's contract by BlockSec, and about \$1.5M USDT frozen with the issuer's help (The Block). Platypus announced a plan to return about 63% of main-pool funds within six months, up to about 78% if an Aave proposal passes and Tether reminted the frozen USDT ([Cointelegraph](https://cointelegraph.com/news/french-police-arrest-2-people-in-connection-to-platypus-attack)).

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary*). In `MasterPlatypusV4`, `emergencyWithdraw()` checked only the boolean from `platypusTreasure.isSolvent()` and ignored the debt amount, so a user with USP debt under the borrow limit could withdraw all collateral ([CertiK](https://www.certik.com/blog/platypus-finance-incident-analysis)). See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md). **OAK-T9.002** (Flash-Loan-Enabled Exploit — 44M USDC borrowed from Aave to fund the collateral, per [BlockSec](https://blocksec.com/blog/5-platypus-finance-surviving-three-attacks-with-a-stroke-of-luck)).

**Attribution:** **unattributed.** French police announced the arrest of two people and the seizure of 210,000 euros of crypto, and did not name them or announce charges ([Cointelegraph](https://cointelegraph.com/news/french-police-arrest-2-people-in-connection-to-platypus-attack)). Platypus said it traced the attackers to a KYC-verified Binance account they used to try to cash out ([The Block](https://www.theblock.co/news/ecosystems/2023-02-25-platypus-finance-says-french-police-took-suspected-hackers-into-custody-215206)). No opened source gives the attacker's addresses in full, links the arrests to the on-chain addresses, or reports a conviction.

**Key teaching point:** **Give every emergency or rescue withdrawal the same debt check as the normal withdrawal, and test the state where collateral is withdrawn while debt is open.** [Immunefi](https://immunefi.com/blog/industry-trends/platypus-finance-hack-analysis/) notes that "solvent" only means collateral covers debt, so a check on it alone let a borrower leave with the collateral and keep the debt.

## Summary

On 2023-02-16 an attacker flash-loaned 44M USDC from Aave, deposited it into Platypus's USDC pool for LP tokens, staked them in `MasterPlatypusV4`, borrowed about 41.79M USP, called `emergencyWithdraw()` to take back the LP collateral while the debt stayed open, withdrew the USDC, repaid Aave and swapped the USP for other stablecoins ([CertiK](https://www.certik.com/blog/platypus-finance-incident-analysis), [Immunefi](https://immunefi.com/blog/industry-trends/platypus-finance-hack-analysis/), [BlockSec](https://blocksec.com/blog/5-platypus-finance-surviving-three-attacks-with-a-stroke-of-luck)). The profit first sat in an attack contract without withdrawal logic, and BlockSec took about \$2.4M USDC out of it through the contract's unprotected flash-loan callback. USP fell to \$0.33 ([CertiK](https://www.certik.com/blog/platypus-finance-incident-analysis)). Platypus said it tried to negotiate a bounty with the attacker, worked with Binance, Tether and Circle on freezes, and later thanked Binance and ZachXBT after French police arrested two people ([The Record](https://therecord.media/defi-platform-platypus-says-nearly-9-million-in-crypto-stolen-in-flash-loan-attack), [Cointelegraph](https://cointelegraph.com/news/french-police-arrest-2-people-in-connection-to-platypus-attack)).

## Timeline (UTC)

Stages: **Flaw**, **Take**, **Money**, **Response**. CertiK gives 2023-02-16 19:16:54 UTC for the attack; BlockSec dates "Attack I" to 2023-02-17. The date in the title follows CertiK, The Block and Immunefi.

| When | What happened | OAK |
|---|---|---|
| Before 2023-02-16 | `emergencyWithdraw()` in `MasterPlatypusV4` checks only that the user is solvent, not their debt | **T9.016** |
| 2023-02-16 19:16:54 (per CertiK) | The attacker flash-loans 44M USDC from Aave, deposits it for 44M LP-USDC and stakes it ([CertiK](https://www.certik.com/blog/platypus-finance-incident-analysis), [BlockSec](https://blocksec.com/blog/5-platypus-finance-surviving-three-attacks-with-a-stroke-of-luck)) | T9.002 |
| 2023-02-16 19:16:54 (per CertiK) | `borrow()` mints about 41.79M USP against a 95% limit, then `emergencyWithdraw()` returns the 44M LP-USDC; first attack tx per BlockSec: [`0x1266a937c2ccd970e5d7929021eed3ec593a95c68a99b4920c2efa226679b430`](https://snowtrace.io/tx/0x1266a937c2ccd970e5d7929021eed3ec593a95c68a99b4920c2efa226679b430) | **T9.016** |
| 2023-02-16 | The USDC repays Aave; USP is swapped in the Platypus pools for USDC, USDC.e, USDT, USDT.e, BUSD and DAI.e (CertiK lists the amounts, about \$8.5M). Profit sits in the attack contract; no attacker or contract address is printed in full in the opened sources | — |
| 2023-02-17 | Platypus tells users the protocol was hacked, says it has contacted the attacker about a bounty and is working with Binance, Tether and Circle; USDT is frozen ([The Record](https://therecord.media/defi-platform-platypus-says-nearly-9-million-in-crypto-stolen-in-flash-loan-attack)). Platypus announces the recovery of 2.4M USDC with BlockSec ([CertiK](https://www.certik.com/blog/platypus-finance-incident-analysis) puts the announcement at 16:50). BlockSec's rescue tx: [`0x5e3eb070c772631d599367521b886793e13cf0bc150bd588357c589395d2d5c3`](https://snowtrace.io/tx/0x5e3eb070c772631d599367521b886793e13cf0bc150bd588357c589395d2d5c3) | response |
| 2023-02-18 to 2023-02-21 | Platypus pauses liquidations, says it is pursuing law enforcement, and posts a recovery proposal to the Aave governance forum on 2023-02-21 ([CertiK](https://www.certik.com/blog/platypus-finance-incident-analysis)) | response |
| 2023-02-24 | French police announce two arrests and a 210,000 euro seizure ([Cointelegraph](https://cointelegraph.com/news/french-police-arrest-2-people-in-connection-to-platypus-attack)); Platypus reports it on 2023-02-25 and credits Binance and ZachXBT ([The Block](https://www.theblock.co/news/ecosystems/2023-02-25-platypus-finance-says-french-police-took-suspected-hackers-into-custody-215206)) | response |

Key addresses:

- Attack contract and attacker EOA — undisclosed (not printed in full in the opened sources)
- `MasterPlatypusV4` — address not printed in full in the opened sources

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://www.certik.com/blog/platypus-finance-incident-analysis>; <https://immunefi.com/blog/industry-trends/platypus-finance-hack-analysis/>; <https://blocksec.com/blog/5-platypus-finance-surviving-three-attacks-with-a-stroke-of-luck>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** CertiK (which summarises Platypus's post-mortem), Immunefi and BlockSec describe the same flaw and sequence. Platypus's own post-mortem was not opened directly. Immunefi's Medium copy returned HTTP 403 and was not read; the immunefi.com copy was read.

## Public references

- CertiK, "Platypus Finance Incident Analysis": <https://www.certik.com/blog/platypus-finance-incident-analysis>
- The Record, "DeFi platform Platypus says nearly \$9 million in crypto stolen in flash loan attack" (2023-02-17): <https://therecord.media/defi-platform-platypus-says-nearly-9-million-in-crypto-stolen-in-flash-loan-attack>
- Immunefi, "Hack Analysis: Platypus Finance, February 2023": <https://immunefi.com/blog/industry-trends/platypus-finance-hack-analysis/>
- BlockSec, "Platypus Finance: surviving three attacks with a stroke of luck": <https://blocksec.com/blog/5-platypus-finance-surviving-three-attacks-with-a-stroke-of-luck>
- The Block, "Platypus Finance says French police took suspected hackers into custody" (2023-02-25): <https://www.theblock.co/news/ecosystems/2023-02-25-platypus-finance-says-french-police-took-suspected-hackers-into-custody-215206>
- Cointelegraph, "French police arrest 2 people in connection to Platypus attack": <https://cointelegraph.com/news/french-police-arrest-2-people-in-connection-to-platypus-attack>
