# Ripple — Private Key Compromise — 2024-01-31

**Loss:** ~213M XRP ($112.5M at time of theft).
**OAK Techniques observed:** OAK-T6 (Authorization / Key Compromise) — private key compromise of Ripple-controlled hot wallet; OAK-T7 (Laundering) — rapid multi-CEX laundering.
**Attribution:** **Pseudonymous** — funds laundered through MEXC, Gate, Binance, Kraken, and other exchanges. No arrests reported.

**Key teaching point:** The Ripple hack demonstrates the **enterprise hot wallet compromise** pattern: even well-resourced organizations with dedicated security teams can lose control of hot wallet keys. The laundering speed is the distinguishing signal — $112.5M moved through 5+ exchanges within hours. Detection approach: monitor known enterprise-controlled addresses for outbound transfers that fan out to multiple CEX deposit addresses within a compressed time window.

## Summary

On January 31, 2024, approximately 213M XRP ($112.5M) was stolen from a Ripple-controlled wallet (`rJNLz3A1qPKfWCtJLPhmMZAfBkutC2Qojm`). The attacker gained access to the wallet's private key and initiated a transfer of the entire balance.

Funds were immediately laundered through a multi-CEX fan-out pattern: MEXC, Gate, Binance, Kraken, and others received deposits from the theft address within hours. The laundering used the standard rapid-exchange approach — splitting the stolen amount across exchanges faster than manual freeze requests could be processed.

The incident demonstrates that enterprise key management is a standing T6 attack surface regardless of organization size. Ripple had dedicated security personnel; the hot wallet was still compromised.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-incident | Ripple hot wallet `rJNLz3A1qPKfWCtJLPhmMZAfBkutC2Qojm` holds ~213M XRP | (precursor) |
| 2024-01-31 | Private key compromised. 213M XRP transferred to attacker-controlled address | **T6 key compromise** |
| 2024-01-31 (within hours) | Funds laundered through MEXC, Gate, Binance, Kraken + other exchanges. XRP → other assets to break traceability | **T7 multi-CEX laundering** |

## What defenders observed

- **Hot wallet as attack surface:** The compromised wallet was a hot wallet (keys stored in an online-accessible system). Enterprise hot wallets are the standing T6 target.
- **Full-drain transfer:** The entire balance was moved in a single transaction — the attacker had full key access, not partial signing capability.
- **Multi-CEX fan-out within hours:** The laundering used 5+ centralized exchanges in parallel. This tempo is the distinguishing signal from legitimate treasury movements (which are typically single-exchange, pre-announced, and not simultaneous).
- **Laundering through KYC exchanges:** The attacker chose KYC exchanges (Binance, Kraken) rather than mixers, suggesting either confidence in fake KYC or intent to withdraw via mule accounts before freezes took effect.

## What this example tells contributors

- **Enterprise hot wallet compromise is a T6 sub-type distinct from individual wallet compromise.** The key management infrastructure is more complex (multi-sig, HSMs, access controls) but still has a human element that can fail. T6 should distinguish between enterprise and individual key compromise.
- **Full-drain + multi-CEX fan-out within hours is the laundering signature.** For enterprise wallets, this pattern is never legitimate. An alerting rule: known enterprise address → outbound transfer → N CEX deposits within T hours, where N > 3 and T < 6.
- **Known enterprise addresses are a monitoring dataset.** Ripple's wallets, foundation treasuries, protocol-controlled addresses — these are publicly known and should be monitored for unauthorized outflows. This is a low-effort, high-value detection primitive.

## Public references

- [ZachXBT — Ripple Hack Investigation (X/Twitter)](https://twitter.com/zachxbt/status/1752774972927037937)
- Source address: `rJNLz3A1qPKfWCtJLPhmMZAfBkutC2Qojm`
- Laundering exchanges: MEXC, Gate, Binance, Kraken (documented in investigation).
