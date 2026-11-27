# 4064 BTC taken from a Genesis creditor, then spread across swap services, bridges and exchanges — Bitcoin — 2024-08-19

**Loss:** 4064 BTC. [ZachXBT's alert](https://x.com/zachxbt/status/1825499490956231021) puts it at \$238M; [The Block](https://www.theblock.co/news/regulation/2024-09-19-blockchain-sleuth-zachxbt-alleges-three-perps-involved-in-243-million-theft-of-single-genesis-creditor-317349) and [CryptoSlate](https://cryptoslate.com/zachxbt-helps-secure-arrests-in-243m-social-engineering-attack-on-one-person/) report \$243M for the whole theft. The gap is a valuation basis the pages do not explain. Court and DOJ documents give different figures again (4123.71908099 BTC, over 4,100 BTC, and \$230M, \$245M and \$263M at different dates); they and the recovery reports are in the sibling file.

**OAK Techniques observed:** OAK-T7.003 (Cross-Chain Bridge Laundering). The alert lists ThorChain and Avalanche Bridge among the destinations ([alert](https://x.com/zachxbt/status/1825499490956231021)). OAK-T7.005 (Privacy-Chain Hops). [CryptoSlate](https://cryptoslate.com/zachxbt-helps-secure-arrests-in-243m-social-engineering-attack-on-one-person/) reports the funds were converted among Bitcoin, Litecoin, Ethereum and Monero. The extraction was a social-engineering theft by spoofed support calls, and no OAK Technique is declared for it (none — impersonation of support staff over the phone has no matching Technique page). A Travel Rule evasion Technique is rejected: no opened page mentions the Travel Rule, thresholds or VASP data sharing, and the alert names Kucoin and ChangeNow as destinations without saying how they were used.

**Attribution:** **confirmed** at the level of charges: defendants were charged and arrested, per DOJ; ZachXBT's three-attacker claim is an allegation. The sibling file records the prosecution: the [2024-09-19 DOJ release](https://www.irs.gov/node/138796) charges Malone Lam and Jeandiel Serrano and says both were arrested the night before (2024-09-18). On the laundering leg itself, [The Block](https://www.theblock.co/news/regulation/2024-09-19-blockchain-sleuth-zachxbt-alleges-three-perps-involved-in-243-million-theft-of-single-genesis-creditor-317349) says ZachXBT alleges three attackers and that The Block did not independently verify his claims. The charges, pleas and official loss figures are in [`2024-08-genesis-creditor-social-engineering.md`](2024-08-genesis-creditor-social-engineering.md).

**Key teaching point:** **The laundering began within hours, so the useful window for a freeze request was short.** [ZachXBT's alert](https://x.com/zachxbt/status/1825499490956231021) was posted seven hours after the transfer and already listed six destinations. An exchange or swap service that receives a deposit from a flagged transaction hash has to act on an alert that quickly, before the next swap.

## Summary

On 2024-08-19 at 4:05 UTC, 4064 BTC left the victim's wallet in the transaction [`4b277ba298830ea538086114803b9487558bb093b5083e383e94db687fbe9090`](https://mempool.space/tx/4b277ba298830ea538086114803b9487558bb093b5083e383e94db687fbe9090) ([ZachXBT, 2024-09-19](https://x.com/zachxbt/status/1836753185718865979)). The victim was a creditor of the bankrupt lender Genesis ([The Block](https://www.theblock.co/news/regulation/2024-09-19-blockchain-sleuth-zachxbt-alleges-three-perps-involved-in-243-million-theft-of-single-genesis-creditor-317349)).

Per [CryptoSlate](https://cryptoslate.com/zachxbt-helps-secure-arrests-in-243m-social-engineering-attack-on-one-person/), the attackers spoofed Google Support, then Gemini support, got the victim to reset two-factor authentication, and had the victim install AnyDesk, which gave them screen access and the private keys. The Block says they allegedly gained access to his private keys (relayed; The Block returns 403 to the quote checker).

On 2024-08-19 at 11:46 UTC ZachXBT posted that the funds "were quickly transferred to ThorChain, eXch, Kucoin, ChangeNow, Railgun, Avalanche Bridge" ([alert](https://x.com/zachxbt/status/1825499490956231021)). The alert gives the venues but no order, amounts or deposit addresses. The Block and CryptoSlate describe the next stage differently: the funds were peeled off to more than 15 exchanges and swapped among Bitcoin, Litecoin, Ethereum and Monero. The pages do not reconcile the 6 venues in the alert with the 15+ exchanges in the follow-up.

On 2024-09-19 ZachXBT posted a private video recording showing "the live reaction by multiple of the threat actors to receiving \$238M" ([post](https://x.com/zachxbt/status/1836753185718865979)).

## Timeline (UTC)

Entry: social engineering of the victim. Preparation: undisclosed. Execution: the transfer. Funds: peeling, swaps and bridges. Response: the alert and the later investigation.

| When | What happened | OAK |
|---|---|---|
| Before 2024-08-19 | Attackers pose as Google Support, then Gemini support; victim resets two-factor authentication ([CryptoSlate](https://cryptoslate.com/zachxbt-helps-secure-arrests-in-243m-social-engineering-attack-on-one-person/)) | none — phone impersonation of support staff, no matching Technique |
| Before 2024-08-19 | Victim installs AnyDesk; attackers extract private keys from Bitcoin Core ([CryptoSlate](https://cryptoslate.com/zachxbt-helps-secure-arrests-in-243m-social-engineering-attack-on-one-person/)) | none — remote-access key theft, no matching Technique |
| 2024-08-19 04:05 | 4064 BTC transferred in [`4b277ba2…e9090`](https://mempool.space/tx/4b277ba298830ea538086114803b9487558bb093b5083e383e94db687fbe9090) ([ZachXBT](https://x.com/zachxbt/status/1836753185718865979)) | none — extraction by stolen keys, no matching Technique |
| 2024-08-19, after the transfer | Funds go to ThorChain, eXch, Kucoin, ChangeNow, Railgun and Avalanche Bridge ([alert](https://x.com/zachxbt/status/1825499490956231021)); order, amounts and addresses undisclosed | **T7.003** |
| 2024-08-19, after the transfer | Funds spread over 15+ exchanges and converted among BTC, LTC, ETH and XMR ([CryptoSlate](https://cryptoslate.com/zachxbt-helps-secure-arrests-in-243m-social-engineering-attack-on-one-person/), [The Block](https://www.theblock.co/news/regulation/2024-09-19-blockchain-sleuth-zachxbt-alleges-three-perps-involved-in-243-million-theft-of-single-genesis-creditor-317349)) | **T7.005** |
| 2024-08-19 11:46 | ZachXBT posts the alert with the transaction hash ([alert](https://x.com/zachxbt/status/1825499490956231021)) | response |
| 2024-09-19 | ZachXBT posts his investigation and the reaction video ([post](https://x.com/zachxbt/status/1836753185718865979)); The Block reports an FBI raid and arrests on a Wednesday evening that week but could not find arrest records. The DOJ release of the same day says Lam and Serrano were arrested the night before (see the sibling file) | response |

Key addresses:

- Theft transaction (Bitcoin) — [`4b277ba298830ea538086114803b9487558bb093b5083e383e94db687fbe9090`](https://mempool.space/tx/4b277ba298830ea538086114803b9487558bb093b5083e383e94db687fbe9090), per [ZachXBT](https://x.com/zachxbt/status/1825499490956231021)
- Deposit and wallet addresses of the laundering: undisclosed on any opened page.

## Root-cause evidence

- **Technique:** none for extraction (social engineering by spoofed support calls); OAK-T7.003 and OAK-T7.005 for the laundering leg
- **Source:** <https://x.com/zachxbt/status/1825499490956231021>; <https://x.com/zachxbt/status/1836753185718865979>; <https://www.theblock.co/news/regulation/2024-09-19-blockchain-sleuth-zachxbt-alleges-three-perps-involved-in-243-million-theft-of-single-genesis-creditor-317349>; <https://cryptoslate.com/zachxbt-helps-secure-arrests-in-243m-social-engineering-attack-on-one-person/>
- **Source type:** independent-researcher
- **Confidence:** reported
- **Evidence:** An independent investigator's alert and thread, relayed by two news outlets. The Block states it did not independently verify the claims. The social-engineering mechanism rests on the investigator's account as reported by CryptoSlate. The laundering path is a list of venues, with no order or addresses.

## Public references

- ZachXBT, X post (2024-08-19): <https://x.com/zachxbt/status/1825499490956231021>
- ZachXBT, X post in thread (2024-09-19): <https://x.com/zachxbt/status/1836753185718865979>
- The Block, "Blockchain sleuth ZachXBT alleges three attackers involved in \$243 million theft of single Genesis creditor" (2024-09-19): <https://www.theblock.co/news/regulation/2024-09-19-blockchain-sleuth-zachxbt-alleges-three-perps-involved-in-243-million-theft-of-single-genesis-creditor-317349>
- CryptoSlate, "ZachXBT helps secure arrests in \$243 million social engineering attack on one person" (2024-09-19): <https://cryptoslate.com/zachxbt-helps-secure-arrests-in-243m-social-engineering-attack-on-one-person/>
