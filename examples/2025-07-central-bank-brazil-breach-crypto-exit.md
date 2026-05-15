# Central Bank of Brazil — Service Provider Breach → Crypto Conversion — 2025-07

**Loss:** Fiat funds stolen from reserve accounts of six Brazilian financial institutions after a cyberattack on the Central Bank of Brazil's service provider C&M. Attackers converted stolen fiat to cryptocurrency.
**OAK Techniques observed:** OAK-T9 (Smart Contract / Protocol Exploit) — extended to traditional financial infrastructure compromise with crypto off-ramp; OAK-T7 (Laundering) — fiat-to-crypto conversion as the laundering bridge from traditional finance.
**Attribution:** **unattributed** — cyberattack on C&M (Central Bank service provider). Attacker identity not publicly confirmed.

**Key teaching point:** The Central Bank of Brazil breach demonstrates the **traditional-finance-breach-to-crypto-conversion** pattern: the attacker compromised NOT a crypto exchange or protocol, but a traditional financial infrastructure provider (C&M, a Central Bank service provider), then used crypto as the EXIT VEHICLE to convert stolen fiat. The crypto ecosystem is not the target — it's the laundering layer. Detection approach: when a traditional financial institution breach is detected, monitor crypto exchanges for large fiat-to-crypto purchases originating from the breached institution's jurisdictions in the hours following the breach; the conversion from stolen fiat to crypto is the detection surface.

## Summary

In July 2025, a cyberattack on C&M — a service provider to the Central Bank of Brazil — resulted in a breach of reserve accounts belonging to six Brazilian financial institutions. The attackers converted stolen fiat to cryptocurrency.

This is the inverse of most OAK-documented attacks: the predicate crime is a traditional financial system breach (bank reserve accounts), and cryptocurrency is used as the exit vehicle. The attack surface was a Central Bank service provider — not a crypto protocol, bridge, or exchange.

The crypto conversion serves multiple purposes for the attacker:

1. **Speed:** Fiat transfers between banks take days; crypto conversion takes minutes.
2. **Irreversibility:** Once fiat becomes crypto, the transaction cannot be reversed by the sending bank.
3. **Jurisdictional exit:** Crypto assets exist outside the Brazilian banking system's jurisdictional reach.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2025-07-14 | Cyberattack on C&M (Central Bank of Brazil service provider). Reserve accounts of 6 financial institutions breached | **T9 financial infrastructure exploit** |
| 2025-07-14 | Stolen fiat converted to cryptocurrency | **T7 fiat-to-crypto laundering** |

## What defenders observed

- **Financial infrastructure service provider as the attack surface.** C&M was the target, not the Central Bank directly. Service providers to financial infrastructure are a softer target than the infrastructure itself, with downstream access to multiple institutions (6 financial institutions breached through one provider).
- **Crypto as the exit vehicle, not the target.** No crypto protocol was exploited. Crypto was used for its speed, irreversibility, and jurisdictional portability — the same properties that make crypto useful for legitimate cross-border transfers make it useful for laundering stolen fiat.
- **Reserve accounts breached = central bank-level impact.** Reserve accounts held at the Central Bank are not retail deposits — they're the reserves that financial institutions use for interbank settlement. A breach at this level affects the core payment infrastructure of the country.

## What this example tells contributors

- **Traditional-finance-breach-to-crypto-conversion is a cross-domain attack pattern.** The attack spans traditional finance (breach) and crypto (exit). Detection requires monitoring the boundary between them — specifically, anomalous fiat-to-crypto purchases following a known traditional finance breach.
- **Central bank service providers are a T11 supply chain attack surface.** C&M is a third-party provider to the Central Bank. Compromising the provider granted access to 6 downstream financial institutions. This is classic supply chain attack structure applied to financial infrastructure.
- **Crypto exchanges are the detection surface for traditional finance breaches.** When a bank is breached, the stolen fiat's most likely destination is a crypto exchange (for conversion to untraceable crypto). Exchange KYC teams should be alerted to monitor for large deposits from breached-institution jurisdictions within hours of a known breach.

## Public references

- [ZachXBT — Central Bank of Brazil Breach / Crypto Conversion (X/Twitter)](https://x.com/zachxbt/status/1945339943500054766)
- C&M: service provider to Central Bank of Brazil.
- 6 financial institutions' reserve accounts breached.
- Stolen fiat converted to cryptocurrency.
