# DMM Bitcoin exchange hack — Bitcoin — 2024-05-31

**Corrected 2026-10-11:** formal attribution added (FBI + DC3 + Japan NPA named TraderTraitor, a Lazarus subgroup, on 2024-12-24) replacing "suspected / no formal attribution"; analytics credit corrected from Chainalysis to ZachXBT and Elliptic; entry path (Ginco recruiter lure) added.

**Loss:** approximately \$305M (4,502.9 BTC) from Japanese exchange DMM Bitcoin — the second-largest exchange theft of 2024 by dollar value at the time (behind only the WazirX July 2024 incident, and subsequently behind the Bybit February 2025 \$1.46B event). Single-block Bitcoin extraction from DMM Bitcoin's hot wallet.
**OAK Techniques observed:** **OAK-T11.001** (Third-Party Signing-Vendor UI / Signing-Flow Compromise — broadly construed; the exchange's hot-wallet signing infrastructure was compromised, enabling the single-transaction 4,502.9 BTC drain). **OAK-T7.001** (Mixer-Routed Laundering — the extracted Bitcoin was subsequently routed through laundering infrastructure, with blockchain analytics firms tracing flow patterns characteristic of organised laundering operations).
**OAK-Gnn:** [OAK-G01 Lazarus Group / DPRK-attributed](../actors/OAK-G01-lazarus.md) (formally attributed by the FBI, DC3 and Japan's NPA on 2024-12-24 to TraderTraitor, a DPRK/Lazarus-linked subgroup).
**Attribution:** **confirmed** On-chain analysts (ZachXBT, Elliptic) linked the extraction and laundering to Lazarus-pattern activity in mid-2024, and on 2024-12-24 the FBI, DoD Cyber Crime Center (DC3) and Japan's National Police Agency jointly attributed the theft (about \$308M) to TraderTraitor, a Lazarus subgroup. Per the FBI, the intrusion began in late March 2024 when a purported LinkedIn recruiter approached a Ginco employee with a malicious GitHub-hosted pre-employment test; in late May the actors used that access to manipulate a legitimate DMM transaction request.
**Key teaching point:** **DMM Bitcoin is the canonical 2024 Japanese-exchange "Ginco-wallet-as-signing-vendor" case: DMM Bitcoin used the Ginco wallet platform for custody operations, and the compromise surface was the wallet vendor's infrastructure rather than DMM Bitcoin's own internal systems — making this a structural Japanese precursor to the Safe{Wallet} / Bybit 2025 T11.001 UI-substitution pattern, in which the signing-vendor (not the exchange) was the proximate compromise surface.** The DMM Bitcoin parent company committed to reimbursing users, raising approximately \$320M (55 billion yen) through a capital increase to cover the loss — a model consistent with the Japanese "parent-company-as-backstop" remediation pattern established by Fisco (Zaif) and Remixpoint (Bitpoint).

## Summary

DMM Bitcoin, a Japanese cryptocurrency exchange operated by DMM Group (a major Japanese e-commerce and entertainment conglomerate), suffered a hot-wallet compromise on 2024-05-31. The attacker drained 4,502.9 BTC (~\$305M at then-current prices) from DMM Bitcoin's hot wallet in a single Bitcoin transaction.

The structural significance of the DMM Bitcoin case is the signing-vendor surface: DMM Bitcoin used the Ginco wallet platform for its custody operations, and the compromise surface was Ginco's wallet infrastructure rather than DMM Bitcoin's own internal systems. The attacker compromised the third-party wallet vendor that held signing authority over DMM Bitcoin's hot-wallet funds — structurally the same pattern as the Safe{Wallet} / Bybit February 2025 incident, in which the signing-vendor's UI build pipeline was compromised to alter the destination address of Bybit's cold-to-warm transfer.

DMM Group, the publicly listed parent company, disclosed the loss and committed to reimbursing all affected users. DMM Bitcoin raised approximately 55 billion yen (~\$320M) through a capital increase to cover the loss and maintain exchange solvency. The Japan FSA conducted an investigation and issued administrative guidance. DMM Bitcoin subsequently announced it would cease operations and transfer customer accounts to SBI VC Trade by early 2025, effectively winding down the exchange brand.

Blockchain analysts (ZachXBT, Elliptic) traced the extracted Bitcoin through laundering infrastructure consistent with OAK-G01 tradecraft, and the FBI, DC3 and Japan's NPA formally attributed the theft to TraderTraitor on 2024-12-24.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-03 (late) | Per the FBI, a fake LinkedIn recruiter lures a Ginco employee into running a malicious GitHub test, giving the actors a foothold | (initial access) |
| 2024-05-31 | Actors manipulate a legitimate DMM transaction request via the Ginco-side access; 4,502.9 BTC (~$305M) drained in a single Bitcoin transaction | T11.001 (signing-vendor UI/signing-flow compromise at wallet-vendor layer) |
| 2024-05-31 T+hours | DMM Bitcoin discloses breach; DMM Group commits to full user reimbursement | (defender / parent-company response) |
| 2024-06 | DMM Group raises ~55B yen (~$320M) via capital increase to cover loss; FSA investigation begins | (financial remediation + regulatory response) |
| 2024-06 to 2024-12 | Extracted BTC routed through laundering infrastructure; analysts (ZachXBT, Elliptic) link flows to Lazarus-pattern laundering | T7.001 (laundering tracking) |
| 2024-12-24 | FBI, DC3 and Japan NPA formally attribute the theft to TraderTraitor (Lazarus subgroup) | (formal government attribution) |
| 2024-12 | DMM Bitcoin announces wind-down; customer accounts to be transferred to SBI VC Trade by early 2025 | (structural remediation — exchange wind-down) |

## Realised extraction

4,502.9 BTC (~\$305M at extraction date; ~\$435M at 2024-12 BTC prices). OAK-G01 attribution formally confirmed by FBI / DC3 / NPA (TraderTraitor) on 2024-12-24. DMM Group covered the loss via capital increase; users reimbursed.

## Signing-vendor surface: Ginco / DMM Bitcoin as Bybit precursor

The DMM Bitcoin case is the structural Japanese precursor to the Safe{Wallet} / Bybit February 2025 incident:

- **Ginco (2024-05):** third-party wallet vendor's signing infrastructure compromised → exchange hot-wallet drain. The vendor was the proximate compromise surface.
- **Safe{Wallet} (2025-02):** third-party multisig signing platform's UI build pipeline compromised → exchange cold-to-warm transfer redirected. The vendor was the proximate compromise surface.

Both cases share the T11.001 shape: the customer organisation (exchange) was not the proximate victim of the entry vector; the signing vendor was. The customer's signing-set and threshold remained intact; the vendor's signing-flow infrastructure was manipulated between what the customer approved and what was submitted on-chain. The DMM Bitcoin case is classified at T11.001 (signing-vendor compromise) with formally confirmed OAK-G01 (TraderTraitor) attribution.

## Public references

- `[coindeskdmm2024]` — CoinDesk, "Crypto Exchange DMM Bitcoin to Raise \$320M to Pay Back Hack Victims" (2024-06-05): <https://coindesk.com/business/2024/06/05/crypto-exchange-dmm-bitcoin-to-raise-320m-to-pay-back-hack-victims>
- `[ctdmmlazarus2024]` — Cointelegraph, "Lazarus is moving millions from \$305M DMM Bitcoin hack — ZachXBT" (2024-07-15): <https://cointelegraph.com/news/lazarus-group-suspected-moving-stolen-funds-dmm-bitcoin-hack>
- `[itmediadmm2024]` — ITmedia, "約482億円の暗号資産を窃取 北朝鮮の脅威グループTraderTraitorの巧みな手口" (2024-12-25): <https://www.itmedia.co.jp/enterprise/articles/2412/25/news089.html>
- `[fsadmm2024]` — Japan FSA, notice of 2024-12-24 NPA attribution: <https://www.fsa.go.jp/news/r6/sonota/20241224/tyuuikanki.pdf>
- `[bleepdmmfbi2024]` — BleepingComputer, "FBI links North Korean hackers to \$308 million crypto heist" (2024-12-24): <https://www.bleepingcomputer.com/news/security/fbi-links-north-korean-hackers-to-308-million-crypto-heist> (FBI/NPA attribution to TraderTraitor; Ginco recruiter-lure intrusion path)
