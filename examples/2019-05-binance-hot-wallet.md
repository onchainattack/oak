# Binance hot-wallet compromise — Bitcoin — 2019-05-07

**Loss:** approximately \$40M (7,074 BTC at the BTC/USD rate of the time) extracted from Binance's Bitcoin hot wallet via a coordinated multi-technique attack combining phishing, credential harvesting, and 2FA bypass to gain access to Binance's hot-wallet signing infrastructure.
**OAK Techniques observed:** **OAK-T11.001** (Third-Party Signing Vendor Compromise — the attack compromised Binance's internal hot-wallet signing infrastructure via phishing and credential theft; Binance was the custodian, and the custodian's operational security was the failure surface). **OAK-T15.003** (Operator Endpoint / Infrastructure Compromise — the entry vector involved phishing Binance employees for credentials and API keys, plus a 2FA bypass that allowed transaction authorization from the compromised accounts). **OAK-T7.001** (Mixer-Routed Hop — the attacker split the stolen BTC across multiple wallets and began routing through mixers; on-chain clustering identified the primary outflow addresses but recovery was minimal).
**Attribution:** **inferred-strong (DPRK — Lazarus Group per UN Panel of Experts and US Treasury).** The attack methodology (phishing + credential harvesting + 2FA bypass + exchange hot-wallet target), the laundering pattern (multi-hop BTC splitting into coinjoin services), and the timing overlapped with the broader 2017-2020 DPRK exchange-vendor compromise campaign (TraderTraitor cohort). The UN Panel of Experts on DPRK sanctions subsequently attributed the Binance 2019 hack to DPRK cyber-operations in their 2020 annual report. No named individuals were charged.
**Key teaching point:** **The Binance 2019 hack is the canonical pre-Bybit exchange-sized hot-wallet compromise that established the DPRK exchange-vendor compromise pattern: phishing → credential harvesting → 2FA bypass → API-key / signing-key extraction → hot-wallet drain.** The entire campaign class (Binance 2019 → KuCoin 2020 → Liquid 2021 → Crypto.com 2022 → Poloniex 2023 → DMM Bitcoin 2024 → WazirX 2024 → BingX 2024 → Phemex 2025 → Bybit 2025) follows the same structural template, with the 2019 Binance case as the early scaled precedent. Binance absorbed the loss through its SAFU (Secure Asset Fund for Users) insurance fund — the first large-scale invocation of an exchange-operated user-protection fund — setting the operational precedent for subsequent exchange-loss-absorption mechanisms.

## Summary

Binance was (and remains) the world's largest cryptocurrency exchange by reported volume. In May 2019, Binance maintained a Bitcoin hot wallet containing a material portion of exchange reserves for withdrawal processing. The hot wallet was secured by Binance's internal operational security infrastructure, including multi-signature signing, withdrawal limits, and API-key-based authentication.

On 2019-05-07, attackers gained access to Binance's hot-wallet signing infrastructure through a coordinated attack sequence:

1. **Phishing campaign:** Binance employees were targeted with spear-phishing emails harvesting credentials for internal systems.
2. **Credential harvesting:** The attackers obtained API keys, two-factor authentication tokens, and internal-system credentials from multiple Binance employees.
3. **2FA bypass:** The attackers bypassed Binance's 2FA implementation (likely via real-time phishing relay or SIM-swap on employee accounts — the exact 2FA-bypass mechanism was not publicly detailed).
4. **Hot-wallet drain:** Using the compromised credentials and API keys, the attackers authorized a single transaction transferring 7,074 BTC from Binance's Bitcoin hot wallet to addresses under attacker control.
5. **Laundering:** The stolen BTC was split across multiple wallets and routed through coinjoin and mixer services.

Binance detected the unauthorized withdrawal within minutes, suspended all deposits and withdrawals for approximately one week (May 7-14), and initiated an internal investigation. CEO Changpeng Zhao publicly disclosed the incident on May 7 via Twitter and a Binance blog post. Binance announced that the loss would be covered by SAFU, the exchange's insurance fund (funded by 10% of trading fee revenue), and that no users would lose funds.

The UN Panel of Experts on DPRK sanctions subsequently attributed the attack to DPRK cyber-operations in their 2020 annual report, citing the methodology overlap with the broader DPRK exchange-compromise campaign.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| pre-2019-05-07 | Binance operates Bitcoin hot wallet; employees targeted with spear-phishing campaign harvesting credentials, API keys, and 2FA tokens | T15.003 (phishing + credential harvesting) |
| 2019-05-07 \~08:00 | Attackers use compromised credentials + 2FA bypass to access Binance's hot-wallet signing infrastructure; authorize single withdrawal of 7,074 BTC | T11.001 (signing-infrastructure compromise) |
| 2019-05-07 T+minutes | Binance detects unauthorized withdrawal; suspends all deposits and withdrawals; CZ publicly discloses via Twitter | (incident response) |
| 2019-05-07 T+hours | Stolen BTC split across multiple wallets; routing through coinjoin / mixer services begins | T7.001 (mixer-routed laundering) |
| 2019-05-07 to 2019-05-14 | Binance conducts internal security review; withdrawals remain suspended; SAFU coverage announced | (remediation) |
| 2019-05-14 | Withdrawals resume; Binance completes post-incident security upgrades | (recovery) |
| 2020 | UN Panel of Experts on DPRK sanctions attributes Binance 2019 hack to DPRK cyber-operations | (attribution record) |
| 2019-2025 | The Binance-2019 pattern repeats across the DPRK exchange-compromise campaign: KuCoin 2020, Liquid 2021, Crypto.com 2022, Poloniex 2023, DMM Bitcoin 2024, WazirX 2024, BingX 2024, Phemex 2025, Bybit 2025 | (campaign continuity — T8.001 / G01) |

## Realised extraction

Approximately \$40M (7,074 BTC). Binance covered the full loss through SAFU. Recovery was minimal; the stolen BTC was laundered through mixer services and never recovered.

## References

- Binance, "Binance Security Breach Update," May 7, 2019 (official blog post)
- Changpeng Zhao (@cz_binance), Twitter thread, May 7, 2019
- UN Panel of Experts on DPRK Sanctions, 2020 Annual Report (attribution section)
- Chainalysis / Elliptic / CipherTrace incident reports (May 2019)
- US Treasury / OFAC subsequent DPRK exchange-compromise designations
