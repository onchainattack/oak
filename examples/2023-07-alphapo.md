# Alphapo payment-processor hot-wallet compromise — Multi-chain (BTC, ETH, TRON) — 2023-07-22/23

**Loss:** about \$60M — revised up from an initial ~\$23M from Ethereum hot wallets after ZachXBT identified a further \$37M in Tron and Bitcoin (the total also includes losses at Coinspaid, an associated entity) `[decryptalphapo]` `[blockalphapo]`. Alphapo, a cryptocurrency payment processor associated with gambling sites (HypeDrop, Bovada, Ignition) `[blockalphapo]`, had hot-wallet funds drained; how the attackers gained access was not stated in the cited reporting.

**Corrected 2026-10-11:** the loss is an initial ~\$23M revised to ~\$60M (not a single \$60M+ figure); the attack date is reported as 2023-07-22 or 23; attribution is on-chain pattern analysis by ZachXBT, not a Chainalysis/Elliptic/TRM finding; the internal-infrastructure compromise mechanism is unverified.
**OAK Techniques observed:** **OAK-T11.001** (Third-Party Signing-Vendor UI / Signing-Flow Compromise — broadly construed; hot wallets holding payment-processor funds were drained across BTC, ETH, and TRON; the access vector is not established in the cited sources). **OAK-T15.003** (Operator-Endpoint Compromise — the access vector is unverified, so this mapping is provisional; the payment-processor-as-target surface is structurally distinct from the exchange-as-target surface, as the operator holds continuous signing authority over customer-fund flows rather than exchange-account balances).
**OAK-Gnn:** [OAK-G01 Lazarus Group / DPRK-attributed](../actors/OAK-G01-lazarus.md).
**Attribution:** **inferred-weak** (lowered from inferred-strong 2026-10-11: one analyst's on-chain pattern reading plus PeckShield's "purportedly", no government attribution). On-chain analyst ZachXBT said the hack "appears to likely have been done by Lazarus" because of its distinct on-chain fingerprint `[blockalphapo]`; Decrypt reports PeckShield also described it as purportedly Lazarus, without stating a basis `[decryptalphapo]`. No government attribution is cited here.
**Key teaching point:** **Alphapo is the canonical payment-processor-as-target case: unlike an exchange, where customer funds sit in on-exchange accounts with per-user accounting, a payment processor holds continuous signing authority over pooled customer-deposit and merchant-settlement flows — the signing surface is both larger (aggregated across all merchant clients) and more continuously active (deposits and withdrawals 24/7), making the T11.001 surface harder to segment than an exchange hot wallet.** The continuous payment-flow requirements of the gambling vertical plausibly make cold-storage batching or withdrawal-delay controls harder (an analytic inference, not stated in the cited sources).

## Summary

Alphapo was a cryptocurrency payment processor serving gambling, casino, and gaming platforms including HypeDrop, Ignition, Bovada, and several other high-volume consumer-facing services. As a payment processor, Alphapo managed pooled hot wallets that continuously received customer deposits and processed merchant withdrawals — a structurally different custody surface from an exchange hot wallet, which holds exchange-customer balances with per-account reconciliation.

Around 2023-07-22/23 (The Block and Decrypt say July 22; other outlets say July 23), attackers drained Alphapo hot wallets. Decrypt reports a first drain of over \$23M across Ethereum, Bitcoin and Tron assets, followed by a second drain of about \$37M in Bitcoin and Tron, for about \$60M in total `[decryptalphapo]`. The Block notes the total also includes losses at Coinspaid `[blockalphapo]`. The cited reporting does not say how access was gained.

ZachXBT linked the activity to Lazarus on the basis of on-chain patterns; the link is presented as likely, not confirmed `[blockalphapo]` `[decryptalphapo]`. Funds were reportedly swapped on Ethereum for ETH and moved to Avalanche, Tron and Bitcoin, with Bitcoin deposited into the Sinbad mixer `[blockalphapo]`.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-07-22/23 | Hot wallets drained; initial estimate over \$23M `[decryptalphapo]` | T15.003 / T11.001 (provisional; access vector unverified) |
| 2023-07-25 | ZachXBT identifies a further \$37M in Tron and Bitcoin; total about \$60M `[blockalphapo]` | (loss revision) |
| 2023-07 | Proceeds swapped, moved to Avalanche, Tron and Bitcoin; Bitcoin deposited to Sinbad `[blockalphapo]` | (laundering) |

## Realised extraction

About \$60M across ETH, BTC, and TRON assets (including Coinspaid losses) `[blockalphapo]`; analyst-attributed to OAK-G01. Recovery status not confirmed at v0.1.

## Payment-processor-as-target surface

The payment-processor surface is structurally distinct from the exchange surface and merits separate treatment in incident taxonomies:

- **Exchange hot wallet (e.g., CoinEx, Bithumb):** holds exchange-customer balances; per-account reconciliation provides a natural audit trail; cold-storage batching is feasible because exchange customers tolerate withdrawal delays of minutes to hours.
- **Payment-processor hot wallet (Alphapo):** continuously processes pooled customer deposits and merchant withdrawals; the signing surface is larger (aggregated across all merchant clients) and more continuously active (24/7 deposit/withdrawal flows); cold-storage batching would break the merchant SLA that requires near-real-time withdrawal processing. The signing-infrastructure compromise surface is therefore structurally larger and harder to segment for payment processors than for exchanges.

These are analytic observations; the cited sources do not establish why Alphapo was targeted.

## Public references

- `[decryptalphapo]` — Decrypt, "North Korean Hacker Cell Lazarus Allegedly Behind \$60M Alphapo Hack" (2023-07-27): <https://decrypt.co/150282/north-korean-hacker-cell-lazarus-allegedly-behind-60m-alphapo-hack>
- `[blockalphapo]` — The Block, "Alphapo's hack now estimated at \$60 million: ZachXBT" (2023-07-25): <https://www.theblock.co/post/241266/alphapos-hack-now-estimated-at-60-million-zachxbt>
