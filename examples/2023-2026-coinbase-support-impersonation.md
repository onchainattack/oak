# Coinbase Support Impersonation — Multi-Victim Social Engineering — 2023–2026

**Loss:** $300M+ annually across Coinbase users (per FOIA data); individual cases range from $275K to $6.5M.
**OAK Techniques observed:** OAK-T4.007 (Native App Social Phishing) — primary. The attack pattern is consistent across multiple identified threat actors.
**Attribution:** **Multiple identified** — Ronald Spektor ("Ron", $6.5M, arrested Dec 2025), Christian Nieves ("Daytwo/PawsOnHips", $4M+), Haby/Havard ($2M+, Canadian), Indian call scammer ring (elderly victim, $275K recovered).

**Key teaching point:** Coinbase support impersonation is the highest-volume social engineering pattern in crypto. The MO is consistent across threat actors: (1) obtain victim's personal information from data brokers/leaks, (2) spoof Coinbase support phone number, (3) create urgency ("your account is being drained"), (4) trick victim into providing credentials, (5) drain account to theft addresses, (6) launder through instant exchanges. The detection approach is pre-incident: Coinbase's aggressive risk models (account restrictions, $300M+ in prevented losses) are the primary defense. On-chain detection is post-hoc (unauthorized transfers from previously normal accounts).

## Summary

Coinbase support impersonation is a sustained, multi-actor social engineering campaign targeting Coinbase users. Threat actors obtain victims' personal information from data brokers, then call victims spoofing Coinbase's official phone number. The scammer creates panic ("your account is under attack, we need to secure it"), gains trust through the personal information they already possess, and convinces the victim to share credentials, move funds to a "secure wallet," or approve transactions.

ZachXBT has documented and assisted in the investigation of multiple threat actors in this category:

- **Ronald Spektor ($6.5M, Nov 2024):** Single victim. Arrested in New York, Dec 2025.
- **Christian Nieves / Daytwo ($4M+, Jun 2025):** New York based. Impersonated Coinbase support. Stole from multiple victims. Arrested.
- **Haby / Havard ($2M+, Dec 2025):** Canadian threat actor. Blew funds on rare social media usernames and luxury goods.
- **Indian call scammer ring ($275K, Apr 2024):** Targeted elderly US victim. Stole "large portion of their life savings." ZachXBT assisted in recovering funds.

Coinbase's internal risk models prevented an estimated $300M+ in additional losses through aggressive account restrictions, though these restrictions generated significant user complaints in early 2025.

## Timeline (synthesized across cases)

| When | Event | OAK ref |
|---|---|---|
| Pre-attack | Threat actor purchases victim's personal information from data brokers (name, phone, email, associated accounts) | (targeting) |
| T+0 | Call spoofing Coinbase support number. Caller ID shows "Coinbase" | **T4.007 impersonation** |
| T+5min | Scammer creates urgency: "Your account is being attacked." Uses personal info to gain trust | **T4.007 social engineering** |
| T+15min | Victim tricked into sharing credentials, moving funds to "secure" address, or approving malicious transactions | **T4.007 credential theft** |
| T+1h | Funds drained to scammer's theft address | **T5 drain** |
| T+1-24h | Laundering through instant exchanges (eXch, ChangeNOW, etc.) or DEX aggregators. Funds converted to BTC/ETH/XMR | **T7 laundering** |

## What defenders observed

- **Pre-incident:** Victims' personal information was available via data brokers. The information asymmetry (scammer knows victim's name, phone, recent transactions, account balance) is what makes the impersonation convincing.
- **During incident:** The call creates urgency ("your account is being drained RIGHT NOW"). This prevents the victim from verifying through official channels. Legitimate Coinbase support will NEVER call users unprompted.
- **Post-incident:** Fast movement to instant exchanges (non-KYC) is the laundering signature. Funds move from Coinbase custody → theft address → instant exchange within hours.
- **Platform-level:** Coinbase's risk models flagged anomalous withdrawal patterns and restricted accounts preventively, saving $300M+ but generating false positives that affected legitimate users.

## What this example tells contributors

- **Support impersonation is a distinct T4 sub-technique.** It differs from software phishing (T4.001-T4.006) and digital platform phishing (T4.007-T4.010) — the attack surface is the customer support phone call. A T4.0xx "Support Impersonation Social Engineering" sub-technique may be warranted.
- **Multiple threat actors, identical MO.** Ronald Spektor, Christian Nieves, Haby, and the Indian scammer ring all used the same playbook. This is a templable attack pattern — the MO is replicable, not actor-specific. T4 technique pages should distinguish between actor-specific and templable social engineering patterns.
- **Data broker ecosystem is the enabler.** Without access to victims' personal information, the impersonation fails. The data broker → scammer pipeline is part of the T4 kill chain and should be modelled as a data source for detection.
- **Exchange risk models are a detection data source.** Coinbase's internal models prevented $300M+ in losses. For OAK detection specs, exchange risk model outputs (anomaly scores, account restriction events) are a data source — though typically proprietary.

## Public references

- [ZachXBT — Ronald Spektor Investigation (X/Twitter)](https://twitter.com/zachxbt/status/2000540219427135893)
- [ZachXBT — Christian Nieves/Daytwo Investigation (X/Twitter)](https://twitter.com/zachxbt/status/1937276928911388930)
- [ZachXBT — Haby/Havard Investigation (X/Twitter)](https://twitter.com/zachxbt/status/2006005604562006022)
- [ZachXBT — Coinbase Account Restrictions / FOIA Data (X/Twitter)](https://twitter.com/zachxbt/status/1886832334160408582)
- [ZachXBT — Indian Call Scammer / Elderly Victim (X/Twitter)](https://twitter.com/zachxbt/status/1843461243804983298)
