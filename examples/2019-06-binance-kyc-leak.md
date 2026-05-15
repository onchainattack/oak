# Binance KYC data leak — Binance (CEX) via third-party KYC vendor — 2019-06 (breach date) / 2019-08-06 (public disclosure)

**Loss:** approximately 60,000 customer KYC records exfiltrated — including passport photos, national-ID scans, driver's-licence images, and "selfie-with-ID" verification photographs — belonging to Binance customers who completed identity verification during the 2017-2018 early-operations window. No on-chain funds were lost. The attacker demanded 300 BTC (\~\$3.5M at the time) as ransom to withhold further publication. Binance did not pay the ransom.
**OAK Techniques observed:** **OAK-T15.003** (Operator-Endpoint Compromise — the third-party KYC vendor's document-processing system was the compromised endpoint; the vendor held KYC data exfiltrated from that system). **OAK-T11.001** (Third-Party Signing-Vendor Compromise — broadly construed beyond the "signing" surface; the structural shape is the same: a service-provider with privileged access to operator-customer data is compromised, and the downstream loss is borne by the operator's customer base even though the operator's own infrastructure was not the breach point). **OAK-T8.004** (Exchange Account Farming / Sybil Account Creation — the exfiltrated KYC documents — passport scans, national-ID images, driver's-licence photographs, and selfie-with-ID pictures — are the raw material for synthetic-identity creation; a breached KYC dataset is a standing input for account-farming operations that create exchange accounts using stolen identity documents).
**Attribution:** **pseudonymous** The attacker self-identified with the Telegram handle "Bnatov Platon" and communicated with media outlets and Binance via Telegram. No named individual or group was publicly identified by law enforcement. The attacker claimed to hold KYC data from multiple exchanges beyond Binance, suggesting a systematic targeting of exchange-side KYC-processing vendors.
**Key teaching point:** **The Binance 2019 KYC leak is the canonical early-exchange worked example of the vendor-as-attack-surface model for operator-side data compromise.** The breach did not occur at Binance's own infrastructure — it occurred at a third-party KYC processor that Binance had engaged during an earlier, more operationally-compressed period of rapid customer onboarding. The incident drove the structural lesson that an operator's KYC-data security is governed by its *weakest* processing-vendor link, not by the operator's own perimeter, and that KYC-data-retention policies at third-party vendors must be contractually constrained and audited.

## Summary

During Binance's rapid global-expansion period in 2017-2018, the exchange contracted a third-party company to process KYC (Know Your Customer) identity-verification documents — including passport scans, national-ID images, driver's-licence photographs, and selfie-with-ID pictures — from new customers. The vendor stored these documents on a processing system that was compromised in or around June 2019. The attacker exfiltrated approximately 60,000 KYC records belonging to Binance customers.

On 2019-08-06, the attacker began publishing batches of exfiltrated KYC images on a Telegram channel, demanding a 300 BTC ransom (~$3.5M at the time) from Binance to cease publication and delete the dataset. The attacker claimed to hold KYC data from multiple cryptocurrency exchanges processed by the same vendor, suggesting a more widespread vendor-side breach. Binance confirmed the breach on 2019-08-07, stating that the data was from the 2017-2018 early-operations period and that the breach originated at a third-party KYC vendor, not from Binance's own systems. Binance declined to pay the ransom and offered affected customers a lifetime VIP membership (including preferential trading-fee tiers and enhanced customer-support access) as identity-restoration assistance.

The incident was significant for two structural reasons: (1) it established the "vendor-held data" attack surface in the exchange-security discourse, predating the 2022 LastPass vault compromise and the 2023-2024 social-media-based KYC-extortion campaigns, and (2) it demonstrated that even the largest, best-resourced exchange was subject to the weakest-link principle in its vendor supply chain for compliance operations — a surface that exchange-security teams at the time had largely not considered on their threat model.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2017-2018 | Binance onboards millions of customers during rapid expansion; third-party vendor processes KYC documents | (standing T11.001 surface) |
| 2019-06 (estimated) | Third-party KYC vendor's processing system compromised; ~60K Binance KYC records exfiltrated | T15.003 (vendor-endpoint compromise) |
| 2019-08-06 | Attacker ("Bnatov Platon") begins publishing KYC images on Telegram; demands 300 BTC ransom | T11.001 (downstream operator impact) |
| 2019-08-07 | Binance publicly confirms breach origin at third-party vendor; offers lifetime VIP membership to affected users | (defender response) |
| 2019-08 to 2019-09 | Attacker publishes additional batches of KYC records; Binance declines to pay ransom; publication subsides | (standoff) |

## Realised extraction

Zero on-chain loss. The value of the exfiltrated KYC records is in the off-chain data — identity-theft material that could be resold on dark-web marketplaces or used for targeted phishing, social-engineering, and KYC-bypass (identity-impersonation) on other platforms. The attacker's monetisation attempt (300 BTC ransom) was unsuccessful.

## T11.001 cross-classification (data-compromise extension)

T11.001 is scoped at v0.1 to "Third-Party Signing-Vendor Compromise" — the signing-flow / custody-systems surface. The Binance 2019 KYC case extends T11.001's structural shape to the **data-processing vendor** sub-surface: the third-party KYC vendor occupied the same structural position as a signing-infrastructure vendor (privileged access to operator-side assets, in this case identity data rather than signing-material), and the compromise propagated downstream to the operator's customer base through the vendor relationship. The OAK position at v0.1 is that data-compromise cases originating at a third-party vendor that holds operator-customer data structurally align with T11.001 (the vendor is the breach point; the operator is the downstream victim of the compromise propagation) and are tagged as a **cross-classification extension** of T11.001 beyond the strict "signing" scope. This classification is subject to revision in v0.2 as the T11 sub-Techniques are stabilised.

## Public references

- Binance, "Security Incident Update — KYC Data," blog.binance.com, August 7, 2019
- CZ (Changpeng Zhao), Twitter thread (@cz_binance), August 7, 2019 — confirmation of third-party vendor breach
- Coindesk, "Binance Investigating Alleged KYC Data Leak," August 6, 2019
- Telegram channel documentation (now defunct) — "Bnatov Platon" ransom demand and KYC-image publication
