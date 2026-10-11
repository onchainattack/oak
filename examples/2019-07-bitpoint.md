# Bitpoint exchange hack — Multi-asset (BTC, ETH, XRP, LTC, BCH) — 2019-07-11

**Loss:** approximately \$32M (~3.5 billion Japanese yen) from Japanese exchange Bitpoint, of which about 2.5 billion yen was customer funds. Reports disagree on whether cold wallets were touched; the access path was not described in the contemporaneous coverage cited here.
**OAK Techniques observed:** **OAK-T11.001** (Third-Party Signing-Vendor UI / Signing-Flow Compromise — broadly construed; the exchange's signing infrastructure was compromised). **OAK-T8.001** (Common-Funder Cluster Reuse — laundering-phase pattern; not independently sourced in the references below).
**Attribution:** **confirmed** Japanese authorities investigated but did not publicly attribute the breach to a specific threat actor.
**Key teaching point:** **Exchange hot-wallet signing paths are a single point of failure: Bitpoint lost customer and house funds across five assets at once, and the mechanism was never described in public detail.** Whether cold-wallet funds were also reachable is disputed between early and later reports, so the "cold storage is not cold when signing authority is reachable from the hot surface" lesson should be read as a hypothesis, not an established finding of this case.

**Corrected 2026-10-11:** Yen figure corrected from ~2.3B to ~3.5B (about 3.02B net of recovered funds); the claimed cold-wallet segmentation mechanism, 2019 FSA order and remediation steps are unsupported by sources and were removed or marked unverified.

## Summary

Bitpoint, a Japanese cryptocurrency exchange operated by Remixpoint, Inc. (a Tokyo Stock Exchange-listed company), lost roughly 3.5 billion yen (~\$32M) in a theft on 2019-07-11/12 `[cointelegraph1]``[decrypt1]`. Funds were taken in Bitcoin, Ethereum, XRP, Litecoin and Bitcoin Cash `[decrypt1]`. About 2.5 billion yen belonged to customers and about 1 billion yen to the exchange `[cointelegraph1]`.

Early company statements said the funds came from hot wallets and that cold wallets were not affected `[cointelegraph1]`; a later Remixpoint document was reported as saying both hot and cold wallets were hit. This file does not resolve that conflict, and no source cited here describes how the attacker obtained signing access.

Bitpoint suspended services and Remixpoint's shares fell 19% to the daily limit `[cointelegraph1]`. Bitpoint later reported finding over 250 million yen in stolen crypto on overseas exchanges using a Bitpoint-provided trading system, reducing the net loss to about 3.02 billion yen `[cointelegraph1]`.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2019-07-11/12 | Theft of ~3.5B yen across BTC, ETH, XRP, LTC, BCH (sources give 11 or 12 July) | T11.001 (signing-flow compromise, mechanism unverified) |
| 2019-07-12 | Bitpoint discloses; suspends services; Remixpoint shares fall 19% | (defender / listed-parent disclosure) |
| 2019-07-14 | Over 250M yen found on overseas exchanges; net loss ~3.02B yen | (partial recovery) |

## Realised extraction

About 3.5B yen (~\$32M), reduced to ~3.02B yen (~\$28M) after the partial recovery above `[cointelegraph1]`.

## Cold-wallet segmentation (unverified)

The original draft of this file presented Bitpoint as the reference anti-pattern for OAK-M19 (Air-Gap Cold-Wallet Signing), on the claim that cold-wallet signing authority was reachable from hot-wallet infrastructure. The cited coverage does not establish that; treat the cold-wallet segmentation lesson as a general design principle rather than a documented finding of this case.

## Public references

- `[cointelegraph1]` — Cointelegraph, "Hacked Bitpoint Exchange Finds \$2.3M in Stolen Crypto" (2019-07-14): <https://cointelegraph.com/news/hacked-bitpoint-exchange-finds-23m-in-stolen-crypto>
- `[decrypt1]` — Decrypt, "Japan's Bitpoint Crypto Exchange Hacked for \$32 Million" (2019-07-12): <https://decrypt.co/7850/japans-bitpoint-crypto-exchange-hacked-for-32-million>
