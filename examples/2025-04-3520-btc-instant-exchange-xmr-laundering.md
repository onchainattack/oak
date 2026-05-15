# 3520 BTC — Instant Exchange → Monero Laundering — 2025-04

**Loss:** 3520 BTC (~$330.7M) from a potential victim. Funds laundered through 6+ instant exchanges to Monero (XMR), causing XMR price spike.
**OAK Techniques observed:** OAK-T5 (Asset Drain) — large unauthorized BTC transfer; OAK-T7 (Laundering) — instant exchange chain to privacy coin (XMR).
**Attribution:** **pseudonymous** — theft address `bc1qcrypchnrdx87jnal5e5m849fw460t4gk7vz55g` identified on-chain. Attacker identity unknown.

**Key teaching point:** The 3520 BTC theft demonstrates the **instant-exchange-to-privacy-coin laundering pattern**: the attacker bypassed centralized exchanges (which can freeze funds) entirely, using 6+ instant exchanges (eXch, ChangeNow, etc.) to swap BTC for XMR in rapid succession. The Monero conversion destroys on-chain traceability. The XMR price spiked during the laundering — making the laundering event itself observable via market data even when individual transactions are opaque. Detection approach: monitor XMR/BTC premium on instant exchanges for abnormal spikes indicating large-scale laundering in progress.

## Summary

On April 28, 2025, a suspicious transfer of 3520 BTC (~$330.7M) was detected from address `bc1qcrypchnrdx87jnal5e5m849fw460t4gk7vz55g`. Within hours, the funds were routed through 6+ instant exchanges — platforms that perform crypto-to-crypto swaps without KYC or custody — and converted to Monero (XMR).

The massive XMR buy pressure caused a visible spike in the Monero price, creating an observable market signal that large-scale laundering was occurring even though individual transactions on Monero are opaque.

This pattern — instant exchange chain → privacy coin — is a post-Tornado Cash sanctions laundering evolution. Instant exchanges fill the gap left by sanctioned mixers: they require no KYC, execute swaps in minutes, and leave no on-chain trail after the XMR hop.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2025-04-28 ~04:05 UTC | 3520 BTC suspiciously transferred from victim address | **T5 asset drain** |
| 2025-04-28 (within hours) | BTC routed through 6+ instant exchanges | **T7 laundering** |
| 2025-04-28 (within hours) | BTC swapped for XMR. XMR price spikes | **T7 privacy coin conversion** |
| 2025-04-28 ~11:30 UTC | ZachXBT alerts community. Theft address published | (public alert) |

## What defenders observed

- **No CEX usage at all:** The attacker did not touch a single centralized exchange. All swaps were through instant exchanges (non-custodial, no-KYC swap services). This avoids the freeze/blacklist risk entirely.
- **XMR price spike as a laundering signal:** The Monero price spiked during the laundering window because 6+ instant exchanges were routing buy pressure into the same relatively illiquid XMR market. The laundering was visible through market data even though on-chain tracing was broken.
- **6+ instant exchanges suggest automation:** Routing through 6+ exchanges in rapid succession is consistent with automated laundering software that splits orders across venues to minimize slippage and avoid any single exchange's volume thresholds.
- **BTC→XMR bypasses blockchain tracing entirely:** Once funds are in Monero, all on-chain tracing ends. The laundering window — from BTC transfer to XMR conversion — is measured in hours, giving investigators an extremely narrow window for intervention.

## What this example tells contributors

- **Instant exchange monitoring is a detection data source.** Unlike CEXs, instant exchanges have limited compliance requirements and often lack real-time AML monitoring. OAK detection specs should include instant exchange flow monitoring — specifically large BTC→XMR or ETH→XMR swaps across multiple instant exchanges within a short time window.
- **XMR price premium is a market-data laundering detection signal.** An abnormal XMR/BTC premium on instant exchanges indicates buy-side pressure from laundering activity. This is a detection primitive that requires no on-chain access to Monero — it's observable in public market data.
- **The post-mixer era is instant-exchange-to-privacy-coin.** Tornado Cash's decline created a gap that instant exchanges + Monero filled. T7 laundering techniques should treat the instant-exchange-to-XMR path as the current dominant laundering primitive.

## Public references

- [ZachXBT — 3520 BTC Suspicious Transfer Alert (X/Twitter)](https://x.com/zachxbt/status/1916756932763046273)
- Theft address: `bc1qcrypchnrdx87jnal5e5m849fw460t4gk7vz55g`
- Instant exchanges used: 6+ (specific platforms not disclosed in public alert).
- XMR price spike documented in trading data during April 28, 2025 laundering window.
