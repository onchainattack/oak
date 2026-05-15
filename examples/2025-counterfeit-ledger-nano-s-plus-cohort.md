# Counterfeit Ledger Nano S Plus hardware-wallet supply-chain cohort — 2025

**Loss:** **Per-victim loss, not a single-incident total.** Counterfeit Ledger Nano S Plus devices sold through informal retail channels (AliExpress, Telegram resellers, second-hand marketplaces without original packaging) were found to contain ESP32-S3 microcontrollers with Wi-Fi and Bluetooth Low Energy (BLE) radio modules — hardware not present in genuine Ledger devices. The modified devices intercepted the user's BIP39 seed phrase during wallet setup and exfiltrated it via the embedded wireless radio.
**OAK Techniques observed:** **OAK-T11.007** (Hardware Wallet Supply-Chain / Physical-Access Compromise) — canonical T11.007.001 counterfeit-hardware substitution anchor. The device itself is counterfeit: the legitimate STM32 secure-element architecture is replaced with an ESP32-S3 that includes wireless exfiltration capability and conducts seed-phrase interception.
**Attribution:** **unattributed** — the counterfeit supply chain has not been publicly attributed to a specific actor at v0.1 cutoff.

**Key teaching point:** The counterfeit Ledger Nano S Plus cohort is the canonical T11.007.001 anchor: the device substitution occurred at the retail-distribution layer — not at the vendor's factory or authorised-reseller channel. The counterfeit devices are physically indistinguishable from genuine units to a non-expert user, and the presence of Wi-Fi/BLE radio hardware in a "hardware wallet" is a structural anomaly that contradicts the air-gapped security model.

## Summary

In 2025, cybersecurity researchers and Ledger's security team identified a cohort of counterfeit Ledger Nano S Plus devices circulating through informal retail channels. The counterfeit devices were typically sold at prices 20-40% below the manufacturer's suggested retail price, often without original packaging, through AliExpress, Telegram-based reseller groups, and second-hand marketplaces.

Physical teardown of the counterfeit devices revealed an ESP32-S3 system-on-chip — a microcontroller with integrated Wi-Fi 802.11 b/g/n and Bluetooth 5.0 LE radio — replacing the genuine Ledger STM32 secure-element + STM32 MCU dual-chip architecture. The counterfeit firmware, loaded onto the ESP32-S3, emulates the Ledger Live onboarding flow but intercepts the BIP39 seed phrase during the "write down your recovery phrase" step and exfiltrates it via the wireless radio to an attacker-controlled server.

Ledger's genuine devices incorporate a cryptographic genuineness check (Ledger Genuine Check) that the Ledger Live companion app verifies during device connection. Counterfeit devices fail this check, providing a detection signal — but only if the user runs Ledger's official companion app and performs the genuineness verification.

## Public references

- Ledger security advisories: counterfeit device detection guidance.
- Cybersecurity researcher teardown reports (Kaspersky, Cyble, 2025).
- Ledger Genuine Check technical documentation.
