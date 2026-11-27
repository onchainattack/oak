# Bittensor — 2024 TAO theft: ZachXBT traces proceeds through Railgun and anime-NFT trades to wallets linked to a former employee — Bittensor / TAO — 2025-10-15

**Loss:** **\$28M** per [ZachXBT's thread](https://x.com/zachxbt/status/1978465677578301723) and [Protos](https://protos.com/zachxbt-deanonymizes-withdrawals-from-crypto-mixer-railgun). The sibling file [`2024-07-bittensor-pypi-package-coldkey-theft.md`](2024-07-bittensor-pypi-package-coldkey-theft.md), gives about 32,000 TAO and about \$8M for the 2024-07-02 incident (its own sources; OAK did not open The Block page, which returned 403). The two figures are not reconciled by any opened page. [Protos](https://protos.com/zachxbt-deanonymizes-withdrawals-from-crypto-mixer-railgun) says the \$28M was taken from 32 holders of TAO; no opened page gives the TAO quantity behind \$28M. Recovery: none reported. [ZachXBT](https://x.com/zachxbt/status/1978465677578301723) says he earned a whitehat bounty for the investigation; the bounty's source and size are undisclosed.

**OAK Techniques observed:** **OAK-T8.003** (On-Chain Transaction Graph De-Anonymization — *primary*; the investigator linked wallets by timing and amount of Railgun deposits and withdrawals, per [Protos](https://protos.com/zachxbt-deanonymizes-withdrawals-from-crypto-mixer-railgun) and [Coinpaper](https://coinpaper.com/11724/zach-xbt-traces-28-million-bittensor-hack-to-nft-purchases)). See [`techniques/T8.003-on-chain-transaction-graph-de-anonymization.md`](../techniques/T8.003-on-chain-transaction-graph-de-anonymization.md). **OAK-T7.004** (NFT Wash-Laundering — *secondary*): Protos says the funds were used to buy anime-themed NFTs and were laundered through overpriced sales and transfers. See [`techniques/T7.004-nft-wash-laundering.md`](../techniques/T7.004-nft-wash-laundering.md). **OAK-T15.002** (Supply-Chain / Vendor-Pipeline Compromise — *the original theft*): Protos calls it a supply chain attack and does not describe the mechanism; the sibling file documents the malicious PyPI package. The previously listed cluster-reuse Technique is removed because no opened page establishes a common-funder cluster beyond one laundering address funded from a single wallet.

**Attribution:** **inferred-weak.** [ZachXBT](https://x.com/zachxbt/status/1978465677578301723) says the wash trades were linked to a former employee and that he identified one of the suspects. [Protos](https://protos.com/zachxbt-deanonymizes-withdrawals-from-crypto-mixer-railgun) describes the lead as a Bittensor user, not specifically a former employee, so the sources differ on the role. The analytics attribution is the investigator's own; no opened page reports a charge or an arrest. Per OAK policy the individual is not named. Protos reports that a person gave a statement in a lawsuit denying involvement in the theft while admitting to owning the wallets ZachXBT identified, and that the lawsuit is against suspects in the hack; no opened page shows this person charged or sued.

**Key teaching point:** **When a theft's laundering trail goes cold, trace the wallets the thief spends from, not only the wallets the thief steals into.** In this case the proceeds were split into three wallets that bought and resold NFTs ([Coinpaper](https://coinpaper.com/11724/zach-xbt-traces-28-million-bittensor-hack-to-nft-purchases)), and those trades became the link to a real-world person.

## Summary

The sibling file covers the 2024 theft itself: a malicious `bittensor` package on PyPI that sent users' coldkeys to an attacker's server, per [Rekt](https://rekt.news/bittensor-rekt). This file covers a later investigation. On 2025-10-15 ZachXBT posted a thread on how he identified one of the suspects in the 2024 Bittensor theft through anime NFT wash trades ([X](https://x.com/zachxbt/status/1978465677578301723)). [Protos](https://protos.com/zachxbt-deanonymizes-withdrawals-from-crypto-mixer-railgun) reports that part of the funds went through instant exchanges into Monero and almost \$5M into Railgun, that ZachXBT matched Railgun withdrawals by timing and amount to three addresses (printed only in truncated form), and that one laundering address was funded from the wallet of a Bittensor user. [Coinpaper](https://coinpaper.com/11724/zach-xbt-traces-28-million-bittensor-hack-to-nft-purchases) gives the same Railgun and three-wallet account.

This is not a separate incident. It is the attribution and money-trail follow-up to the incident in the sibling file, and the two should be merged (see the report).

## Timeline (UTC)

**Entry**: the 2024 theft (see sibling). **Money**: instant exchanges and Monero, Railgun, NFT purchases. **Response**: the 2025-10 investigation. Dates inside 2024 are undisclosed on the pages opened here.

| When | What happened | OAK |
|---|---|---|
| 2024 (see sibling for 2024-07-02) | Supply chain attack on Bittensor users; Protos reports \$28M taken ([Protos](https://protos.com/zachxbt-deanonymizes-withdrawals-from-crypto-mixer-railgun)) | **T15.002** |
| 2024 (dates undisclosed) | Part of the funds is withdrawn through instant exchanges and swapped to Monero ([Protos](https://protos.com/zachxbt-deanonymizes-withdrawals-from-crypto-mixer-railgun)) | — |
| 2024 (dates undisclosed) | Almost \$5M is sent to Railgun; after the withdrawals the funds are split across three wallets ([Protos](https://protos.com/zachxbt-deanonymizes-withdrawals-from-crypto-mixer-railgun), [Coinpaper](https://coinpaper.com/11724/zach-xbt-traces-28-million-bittensor-hack-to-nft-purchases)). Full addresses: undisclosed | **T7.004** |
| 2024 (dates undisclosed) | The wallets buy anime-themed NFTs (the Killer GF series per Protos) and move them through overpriced sales and transfers ([Protos](https://protos.com/zachxbt-deanonymizes-withdrawals-from-crypto-mixer-railgun)) | **T7.004** |
| 2025-10-15 14:19 | ZachXBT posts his investigation thread and says he earned a whitehat bounty ([X](https://x.com/zachxbt/status/1978465677578301723)) | **T8.003** |

Key addresses: none printed in full on an opened page. Protos shows only truncated forms (0x1d7, 0x87d8, 0x1fbc), which OAK does not reproduce as addresses.

## Root-cause evidence

- **Technique:** OAK-T8.003
- **Source:** <https://x.com/zachxbt/status/1978465677578301723>; <https://protos.com/zachxbt-deanonymizes-withdrawals-from-crypto-mixer-railgun>; <https://coinpaper.com/11724/zach-xbt-traces-28-million-bittensor-hack-to-nft-purchases>
- **Source type:** independent-researcher
- **Confidence:** reported
- **Evidence:** The first post of the thread is the investigator's own claim; the later posts were not opened. Protos and Coinpaper relay the Railgun, three-wallet and NFT account, and agree with each other, but both are news summaries of the same thread. The 2024 theft mechanism is established in the sibling file, not here.

## Public references

- ZachXBT on X, first post of the investigation thread (2025-10-15): <https://x.com/zachxbt/status/1978465677578301723>
- Protos, "ZachXBT cracks Railgun privacy to expose Bittensor hacker": <https://protos.com/zachxbt-deanonymizes-withdrawals-from-crypto-mixer-railgun>
- Coinpaper, "This \$28M Crypto Hack Was Nearly Perfect — Until ZachXBT Stepped In": <https://coinpaper.com/11724/zach-xbt-traces-28-million-bittensor-hack-to-nft-purchases>
