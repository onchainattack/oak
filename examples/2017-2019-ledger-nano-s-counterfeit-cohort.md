# Early Ledger Nano S Pre-Seeded Device Cohort — 2017–2019

**Loss:** Not centrally tabulated. The one individual loss documented in the sources cited here is about £25,000, sent to a Nano S bought from an eBay seller that arrived pre-seeded (reported January 2018). The pattern predated the 2025 ESP32-S3 radio-exfiltration variant.
**OAK Techniques observed:** **OAK-T11.007.001** (Counterfeit-Hardware Substitution — primary; here the closest sourced form is a retail-channel device that arrived pre-initialised with a seed or recovery sheet the seller already knew). **OAK-T8.002** (Cross-Chain Operator Continuity — retained from the earlier draft; no source cited here supports an organised multi-channel operator).
**Attribution:** **pseudonymous** at the individual-seller level (eBay / second-hand sellers). No central operator identified.
**Corrected 2026-10-11:** removed unsourced claims of tampered firmware, an AliExpress/Taobao/Telegram distribution wave, a Ledger Live genuineness-check rollout in this period and "four to six figure" loss ranges; the sourced pattern is pre-seeded or pre-initialised devices sold through eBay and second-hand channels.
**Key teaching point:** **The 2017–2019 pre-seeded Nano S reports are the earliest sourced form of the T11.007.001 purchase-channel problem: a hardware wallet that arrives with a seed or PIN already set is a deliberate seed-exfiltration device, whatever the box looks like.** The structural defence is the same one the 2025 ESP32-S3 cohort needs — buy only from the vendor's authorised channels and never use a seed, recovery sheet or PIN supplied by anyone else. The 2025 variant escalates the hardware capability but not the class.

## Summary

Ledger's own guidance, in a post dated 01/12/2018 (day/month order ambiguous on the page), describes a user who bought a second-hand Nano S from an individual seller on an online merchant site. The device was already initialised and the seller had supplied the 24 seed words, so the seller could take the funds; Ledger said the seller was not an official reseller and that the Nano S itself was not hacked. Ledger's guidance: a new device must be initialised by the user, who generates the PIN and writes down the 24 words, and no PIN or seed words should be supplied by anyone else.

A Coin Bureau report (original publication date not stated; page last updated 2023-03-29, image paths suggest January 2018) describes a buyer who purchased a Nano S from an eBay seller at about a 25% discount. It arrived in a sealed Ledger box already set up, with a recovery-seed card covered in foil. The buyer sent about £25,000 of coins to it and the funds were later gone, because the seller had created the seed in advance. Ledger's CEO offered on Reddit to connect the victim with its General Counsel for a criminal complaint. The report describes pre-seeding only, not firmware tampering.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| ~2018-01 | Pre-seeded Nano S bought via eBay; about £25,000 sent to it and lost; Ledger's CEO responds on Reddit | **T11.007.001 early pre-seeded case** |
| 2018 (day/month ambiguous: 01/12/2018) | Ledger publishes guidance on a second-hand device sold pre-initialised with seed words | (vendor response) |
| 2025 | Counterfeit Ledger Nano S Plus cohort with ESP32-S3 radio exfiltration — the hardware-capability escalation of the class | **T11.007.001 capability escalation** |

## Realised extraction

Not centrally tabulated for 2017–2019. One reported case of about £25,000. For the 2025 cohort see the sibling example below.

## Public references

- Cross-reference: T11.007.001 (Counterfeit-Hardware Substitution) at `techniques/T11.007.001-counterfeit-hardware-substitution.md`.
- [`examples/2025-01-counterfeit-ledger-nano-s-plus-cohort.md`](../examples/2025-01-counterfeit-ledger-nano-s-plus-cohort.md) — Counterfeit Ledger Nano S Plus cohort, 2025 (ESP32-S3 radio exfiltration variant).
- `[ledgersecondhand]` — Ledger, "Scam: second-hand Ledger device" (dated 01/12/2018 on the page): <https://ledger.com/scam-second-hand-ledger-device>
- `[coinbureauebay]` — Coin Bureau, "Are Fraudulent Ledger Hardware Wallets Being Sold on eBay?" (undated; last updated 2023-03-29): <https://coinbureau.com/news/fraudulent-ledger-hardware-wallets-sold-ebay>
