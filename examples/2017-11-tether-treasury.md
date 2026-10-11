# Tether treasury hack — Bitcoin (Omni Layer) — 2017-11-19

**Loss:** approximately \$31M USDT (30,950,010 USDT tokens, per Tether) removed from Tether's Omni Layer Treasury wallet and sent to an unauthorized Bitcoin address. Tether did not explain how the wallet was compromised.
**OAK Techniques observed:** **OAK-T11.001** (Third-Party Signing Vendor Compromise — broadly construed; Tether's own Treasury wallet was the compromised custody surface, but the method was never publicly disclosed, so the mapping is by shape only). **OAK-T1.002** (Token-2022 Permanent Delegate — cross-standard ancestor; a single authority over the Treasury wallet). **OAK-T7.001** (Mixer-Routed Hop) + **OAK-T7.008** (Stablecoin-Issuer Coordination Laundering) — retained as the issuer-side freeze response; no laundering path is documented in the cited sources.
**Attribution:** **pseudonymous**. Tether described the event as a hack by an external party; no individual or group was publicly identified and the method was not disclosed.
**Corrected 2026-10-11:** removed unsourced claims (named exchanges Poloniex/Bittrex, an Omni Core "v0.2.99", an old-for-new token swap, and a causal link to the later Ethereum migration); the sourced response was a temporary Omni Layer hard fork freezing the attacker's tokens.
**Key teaching point:** **The Tether treasury hack is a 2017 worked example of a centralized stablecoin issuer as a single point of failure, and of issuer-side freeze as a defensive tool.** Tether stated it would not redeem the stolen tokens and shipped a temporary Omni Layer hard fork that froze them in place — an intervention only an issuer-controlled token can perform, and the reference case in debates about stablecoin censorship versus theft prevention.

## Summary

Tether (USDT) was originally issued on Bitcoin via the Omni Layer protocol. On 2017-11-19, per Tether's own statement as reported by Bitcoin Magazine and BleepingComputer, 30,950,010 USDT were removed from the Tether Treasury wallet and sent to an unauthorized Bitcoin address. Bitcoin Magazine reports the funds left the Treasury in three transfers. Neither report describes how the wallet was compromised.

Tether's response, as reported at the time:

1. It said it would not redeem any of the stolen tokens, and that the Tether reserve remained in surplus of 1:1 backing.
2. It released new Omni Core software implementing a temporary hard fork of the Omni Layer so that tokens at the attacker's addresses were frozen in place; BleepingComputer describes the aim as returning the stolen funds to the Treasury wallet.
3. Exchanges had to upgrade to the new software; Kraken temporarily stopped USDT trading while it did so.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| pre-2017-11-19 | USDT issued on the Bitcoin Omni Layer; Treasury wallet with no on-chain freeze capability other than a protocol-level change | (standing T11.001 surface) |
| 2017-11-19 | 30,950,010 USDT removed from the Treasury wallet to an unauthorized Bitcoin address | T11.001 (by shape; method undisclosed) |
| 2017-11-20 to 2017-11-21 | Tether announces the theft, states it will not redeem the stolen tokens, and publishes Omni Core software with a temporary hard fork freezing the attacker's tokens; Kraken pauses USDT trading to upgrade | (defender response) |

## Realised extraction

Approximately \$31M in USDT was removed; per Tether and contemporaneous reporting the tokens were frozen in place by the hard fork and not redeemed, so realised value to the attacker is reported as effectively nil. No independent on-chain accounting is cited here.

## T1.002 cross-standard classification

The Treasury wallet's single issuing authority is the analogue of the "permanent delegate" authority that OAK-T1.002 addresses in the Solana Token-2022 context. The mapping is by structural shape only: how the Treasury wallet was compromised was never disclosed, so "signing key compromise" is an inference, not a documented fact.

## Public references

- `[btcmag2017]` — Bitcoin Magazine, "Hacker Allegedly Siphons $31 Million Out of Tether, Driving Further Speculations About Cryptocurrency" (2017-11-21): <https://bitcoinmagazine.com/business/hacker-allegedly-siphons-31-million-out-tether-driving-further-speculations-about-cryptocurrency>
- `[bleep2017]` — BleepingComputer, "Cryptocurrency Startup Claims Hackers Stole \$30.95 Million" (2017-11-21): <https://www.bleepingcomputer.com/news/security/cryptocurrency-startup-claims-hackers-stole-30-95-million>
