# DMM Bitcoin exchange hack — Bitcoin — 2024-05-31

**Loss:** approximately \$305M (4,502.9 BTC) from Japanese exchange DMM Bitcoin — the second-largest exchange theft of 2024 by dollar value at the time (behind only the WazirX July 2024 incident, and subsequently behind the Bybit February 2025 \$1.46B event). Single-block Bitcoin extraction from DMM Bitcoin's hot wallet.
**OAK Techniques observed:** **OAK-T11.001** (Third-Party Signing-Vendor UI / Signing-Flow Compromise — broadly construed; the exchange's hot-wallet signing infrastructure was compromised, enabling the single-transaction 4,502.9 BTC drain). **OAK-T7.001** (Mixer-Routed Laundering — the extracted Bitcoin was subsequently routed through laundering infrastructure, with blockchain analytics firms tracing flow patterns characteristic of organised laundering operations).
**Attribution:** **pseudonymous (DPRK Lazarus Group suspected per Chainalysis, not formally confirmed at v0.1).** Chainalysis and other blockchain analytics firms linked the extraction wallets and laundering infrastructure to patterns consistent with OAK-G01 tradecraft, but no formal government attribution (FBI, NPA, or UN Panel of Experts) had been publicly issued at the time of OAK v0.1 classification. The case is classified as "suspected G01" pending formal attribution.
**Key teaching point:** **DMM Bitcoin is the canonical 2024 Japanese-exchange "Ginco-wallet-as-signing-vendor" case: DMM Bitcoin used the Ginco wallet platform for custody operations, and the compromise surface was the wallet vendor's infrastructure rather than DMM Bitcoin's own internal systems — making this the structural Japanese precursor to the Safe{Wallet} / Bybit 2025 T11.001 UI-substitution pattern, in which the signing-vendor (not the exchange) was the proximate compromise surface.** The DMM Bitcoin parent company committed to reimbursing users, raising approximately \$320M (55 billion yen) through a capital increase to cover the loss — a model consistent with the Japanese "parent-company-as-backstop" remediation pattern established by Fisco (Zaif) and Remixpoint (Bitpoint).

## Summary

DMM Bitcoin, a Japanese cryptocurrency exchange operated by DMM Group (a major Japanese e-commerce and entertainment conglomerate), suffered a hot-wallet compromise on 2024-05-31. The attacker drained 4,502.9 BTC (~\$305M at then-current prices) from DMM Bitcoin's hot wallet in a single Bitcoin transaction.

The structural significance of the DMM Bitcoin case is the signing-vendor surface: DMM Bitcoin used the Ginco wallet platform for its custody operations, and the compromise surface was Ginco's wallet infrastructure rather than DMM Bitcoin's own internal systems. The attacker compromised the third-party wallet vendor that held signing authority over DMM Bitcoin's hot-wallet funds — structurally the same pattern as the Safe{Wallet} / Bybit February 2025 incident, in which the signing-vendor's UI build pipeline was compromised to alter the destination address of Bybit's cold-to-warm transfer.

DMM Group, the publicly listed parent company, disclosed the loss and committed to reimbursing all affected users. DMM Bitcoin raised approximately 55 billion yen (~\$320M) through a capital increase to cover the loss and maintain exchange solvency. The Japan FSA conducted an investigation and issued administrative guidance. DMM Bitcoin subsequently announced it would cease operations and transfer customer accounts to SBI VC Trade by early 2025, effectively winding down the exchange brand.

Blockchain analytics firms (Chainalysis, Elliptic) traced the extracted Bitcoin through laundering infrastructure consistent with OAK-G01 tradecraft, but formal government attribution had not been issued at v0.1.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-05-31 | Attacker compromises Ginco wallet platform (DMM Bitcoin's custody vendor) signing infrastructure; 4,502.9 BTC (~$305M) drained in a single Bitcoin transaction | T11.001 (signing-vendor UI/signing-flow compromise at wallet-vendor layer) |
| 2024-05-31 T+hours | DMM Bitcoin discloses breach; DMM Group commits to full user reimbursement | (defender / parent-company response) |
| 2024-06 | DMM Group raises ~55B yen (~$320M) via capital increase to cover loss; FSA investigation begins | (financial remediation + regulatory response) |
| 2024-06 to 2024-12 | Extracted BTC routed through laundering infrastructure; blockchain analytics firms link to suspected OAK-G01 tradecraft | T7.001 (laundering tracking) |
| 2024-12 | DMM Bitcoin announces wind-down; customer accounts to be transferred to SBI VC Trade by early 2025 | (structural remediation — exchange wind-down) |

## Realised extraction

4,502.9 BTC (~\$305M at extraction date; ~\$435M at 2024-12 BTC prices). Suspected OAK-G01 attribution; not formally confirmed at v0.1. DMM Group covered the loss via capital increase; users reimbursed.

## Signing-vendor surface: Ginco / DMM Bitcoin as Bybit precursor

The DMM Bitcoin case is the structural Japanese precursor to the Safe{Wallet} / Bybit February 2025 incident:

- **Ginco (2024-05):** third-party wallet vendor's signing infrastructure compromised → exchange hot-wallet drain. The vendor was the proximate compromise surface.
- **Safe{Wallet} (2025-02):** third-party multisig signing platform's UI build pipeline compromised → exchange cold-to-warm transfer redirected. The vendor was the proximate compromise surface.

Both cases share the T11.001 shape: the customer organisation (exchange) was not the proximate victim of the entry vector; the signing vendor was. The customer's signing-set and threshold remained intact; the vendor's signing-flow infrastructure was manipulated between what the customer approved and what was submitted on-chain. The DMM Bitcoin case is classified at T11.001 (signing-vendor compromise) with an OAK-G01-suspected attribution caveat pending formal government confirmation.

## References

- DMM Bitcoin official breach disclosure and user-reimbursement announcement, May 2024
- DMM Group capital-increase announcement (~55B yen), June 2024
- DMM Bitcoin wind-down and SBI VC Trade account-transfer announcement, December 2024
- Japan Financial Services Agency (FSA) administrative guidance, 2024
- Chainalysis and Elliptic blockchain analytics reports on DMM Bitcoin extraction and laundering, 2024
- Ginco wallet-platform security architecture and vendor-custody model documentation
