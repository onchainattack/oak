# LastPass — stolen encrypted vaults cracked offline, seed phrases stored in Secure Notes drained — multi-chain — 2022-12 (vault theft disclosed) / 2023-2025 (drains)

**Loss:** no single total is documented. [Krebs on Security](https://krebsonsecurity.com/2023/09/experts-fear-crooks-are-cracking-keys-stolen-in-lastpass-breach/) (2023-09-05) reports more than 150 people who lost over $35 million since late 2022, per researchers' tracking. [TRM Labs](https://www.trmlabs.com/resources/blog/trm-traces-stolen-crypto-from-2022-lastpass-breach-on-chain-indicators-suggest-russian-cybercriminal-involvement) (2025-12-24) separately reports more than $28 million laundered through Wasabi in late 2024 and early 2025 and about $7 million in September 2025, over $35 million traced in total, "likely only a fraction." The two $35 million figures are different measurements of different periods and are not added. The Ripple co-founder theft is documented in [`2024-01-xrp-cofounder-personal-accounts-drain.md`](2024-01-xrp-cofounder-personal-accounts-drain.md); [Krebs (2025-03)](https://krebsonsecurity.com/2025/03/feds-link-150m-cyberheist-to-2022-lastpass-hacks/) gives $150 million, which that file records as 213M XRP, about $112.5M, or 283M XRP per other reports; the figures are not reconciled.

**Recovery:** the March 2025 forfeiture complaint concerns about $24 million of cryptocurrency clawed back after the Larsen-file theft ([Krebs](https://krebsonsecurity.com/2025/03/feds-link-150m-cyberheist-to-2022-lastpass-hacks/)); [BleepingComputer](https://www.bleepingcomputer.com/news/security/cryptocurrency-theft-attacks-traced-to-2022-lastpass-breach/) says the Secret Service seized more than $23 million in 2025. Recovery for other victims: undisclosed. One 2023 victim recovered about $1.5 million of about $3.4 million through Flashbots ([Krebs 2023](https://krebsonsecurity.com/2023/09/experts-fear-crooks-are-cracking-keys-stolen-in-lastpass-breach/)).

**OAK Techniques observed:** **OAK-T11.006.001** (User-Initiated Plaintext-Equivalent Seed Storage — *primary*, researcher-inferred). The vendor says attackers copied backups of customer vault data, with passwords and secure notes encrypted under a key derived from each user's master password ([LastPass, 2022-12-22](https://blog.lastpass.com/posts/2022/12/notice-of-recent-security-incident)). Victims had stored seed phrases in Secure Notes ([Krebs 2023](https://krebsonsecurity.com/2023/09/experts-fear-crooks-are-cracking-keys-stolen-in-lastpass-breach/)). See [`techniques/T11.006.001-user-initiated-plaintext-seed-storage.md`](../techniques/T11.006.001-user-initiated-plaintext-seed-storage.md). **OAK-T7.001** (Mixer-Routed Hop — Wasabi CoinJoin and Cryptomixer.io per [TRM](https://www.trmlabs.com/resources/blog/trm-traces-stolen-crypto-from-2022-lastpass-breach-on-chain-indicators-suggest-russian-cybercriminal-involvement)) and **OAK-T7.002** (CEX Deposit-Address Layering — Cryptex and a Russian exchange named "Audia6" by TRM, "Audi6" by [BleepingComputer](https://www.bleepingcomputer.com/news/security/cryptocurrency-theft-attacks-traced-to-2022-lastpass-breach/)).

**Attribution:** **inferred-weak** for the drains. TRM "assesses that the activity is consistent with involvement by Russian cybercriminal actors" and says "definitive attribution of the original intrusion cannot yet be confirmed" ([TRM](https://www.trmlabs.com/resources/blog/trm-traces-stolen-crypto-from-2022-lastpass-breach-on-chain-indicators-suggest-russian-cybercriminal-involvement)). No opened page names an individual. The link from the vault theft to the thefts is disputed: LastPass says its law enforcement partners "have not made us aware of any conclusive evidence that connects any crypto thefts to our incident" ([Krebs 2025](https://krebsonsecurity.com/2025/03/feds-link-150m-cyberheist-to-2022-lastpass-hacks/)), while the forfeiture complaint says there was probable cause that the same attackers used a stolen password from the victim's password manager account (same page).

**Key teaching point:** **Never keep a seed phrase in a password manager; if one ever was, treat it as compromised and move the funds to a new wallet.** Stolen vaults can be cracked offline for years, and older accounts had weaker settings: the default iteration count rose from 1–500 in early years to 100,100 in 2018 and 600,000 later, and existing users were not forced up ([Krebs 2023](https://krebsonsecurity.com/2023/09/experts-fear-crooks-are-cracking-keys-stolen-in-lastpass-breach/)).

## Summary

LastPass disclosed on 2022-08-25 that an intruder took source code through a compromised developer account, and on 2022-09-15 said no customer data or vaults were accessed. On 2022-11-30 and 2022-12-22 it said an attacker, using information from the August incident, copied backups including customer vault data; website URLs were unencrypted, usernames, passwords and secure notes encrypted, and "the master password is never known to LastPass" ([LastPass notice](https://blog.lastpass.com/posts/2022/12/notice-of-recent-security-incident)). The 2023-03-01 update says the second incident targeted a senior DevOps engineer through vulnerable third-party software and reached cloud backups ([LastPass update](https://blog.lastpass.com/posts/2023/03/security-incident-update-recommended-actions)); the last attacker activity was seen on 2022-10-26.

From March 2023 researcher Taylor Monahan tracked thefts and on 2023-08-28 concluded nearly every victim had stored a seed phrase in LastPass; Nick Bax reached the same conclusion; victims showed no email, phone or SIM-swap compromise; the researchers could not prove every theft was linked ([Krebs 2023](https://krebsonsecurity.com/2023/09/experts-fear-crooks-are-cracking-keys-stolen-in-lastpass-breach/)). Krebs reports roughly two to five high-dollar thefts per month since December 2022. A forfeiture complaint filed 2025-03-06 in northern California concerns a $150 million theft of 2024-01-30 ([Krebs 2025](https://krebsonsecurity.com/2025/03/feds-link-150m-cyberheist-to-2022-lastpass-hacks/)); ZachXBT and SEAL 911 reported more thefts as late as December 2024 (same page). TRM published laundering analysis on 2025-12-24.

Not carried over from the earlier version because no opened page supports them: a link to Scattered Spider, an 18-month versus 16-month lag claim, the 2023-10-25 $4.4M day and the November 2023 $5.36M figure (both rest on a page that could not be read), and any cohort median.

## Timeline (UTC)

**Entry** (August 2022 developer-account compromise) → **Take** (vault backups, 2022-10 and earlier) → **Preparation** (offline cracking, undisclosed) → **Drains** (2023-2025) → **Money** (BTC, Wasabi, Russian exchanges) → **Response**.

| When | What happened | OAK |
|---|---|---|
| 2022-08 (disclosed 08-25) | Intruder reaches LastPass's development environment through a compromised developer account and takes source code ([LastPass](https://blog.lastpass.com/posts/notice-of-recent-security-incident)) | none — vendor intrusion, outside OAK's user-side Techniques |
| by 2022-10-26 | Last attacker activity observed; DevOps secrets used to reach cloud backups including vault data ([LastPass 2023-03-01](https://blog.lastpass.com/posts/2023/03/security-incident-update-recommended-actions)) | none — vendor-side |
| 2022-11-30 and 2022-12-22 | LastPass discloses the backups were copied ([notice](https://blog.lastpass.com/posts/2022/12/notice-of-recent-security-incident)) | disclosure |
| 2023-03 onward | Monahan begins tracking thefts ([Krebs 2023](https://krebsonsecurity.com/2023/09/experts-fear-crooks-are-cracking-keys-stolen-in-lastpass-breach/)) | **T11.006.001** |
| 2023-08-27 | A victim loses about $3.4 million; Flashbots helps recover about $1.5 million ([Krebs 2023](https://krebsonsecurity.com/2023/09/experts-fear-crooks-are-cracking-keys-stolen-in-lastpass-breach/)) | **T11.006.001** |
| 2023-09-05 | Krebs reports more than 150 victims and over $35 million | detection |
| 2023-10-25 | About \$4.4M drained from more than 25 victims in one day, per the investigator ZachXBT ([post, 2023-10-27](https://x.com/zachxbt/status/1717901088521687330)) | **T11.006.001** |
| 2024-01-30 | $150 million theft later tied by the complaint to a password-manager account; see [`2024-01-xrp-cofounder-personal-accounts-drain.md`](2024-01-xrp-cofounder-personal-accounts-drain.md) | **T11.006.001** |
| late 2024 to early 2025 | More than $28 million converted to BTC and laundered through Wasabi; Cryptomixer.io and Cryptex used in the first phase ([TRM](https://www.trmlabs.com/resources/blog/trm-traces-stolen-crypto-from-2022-lastpass-breach-on-chain-indicators-suggest-russian-cybercriminal-involvement)) | **T7.001**, **T7.002** |
| 2025-03-06 | Forfeiture complaint filed; about $24 million seized ([Krebs 2025](https://krebsonsecurity.com/2025/03/feds-link-150m-cyberheist-to-2022-lastpass-hacks/)) | response |
| 2025-09 | About $7 million laundered through Wasabi, then to a Russian exchange ([TRM](https://www.trmlabs.com/resources/blog/trm-traces-stolen-crypto-from-2022-lastpass-breach-on-chain-indicators-suggest-russian-cybercriminal-involvement)) | **T7.001**, **T7.002** |
| 2025-12-24 | TRM publishes its analysis | — |

Key addresses: none printed in full on an opened page.

## Root-cause evidence

- **Technique:** OAK-T11.006.001
- **Source:** <https://krebsonsecurity.com/2023/09/experts-fear-crooks-are-cracking-keys-stolen-in-lastpass-breach/>; <https://krebsonsecurity.com/2025/03/feds-link-150m-cyberheist-to-2022-lastpass-hacks/>; <https://www.trmlabs.com/resources/blog/trm-traces-stolen-crypto-from-2022-lastpass-breach-on-chain-indicators-suggest-russian-cybercriminal-involvement>; <https://blog.lastpass.com/posts/2022/12/notice-of-recent-security-incident>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** The vault theft is operator-confirmed. The link to the crypto drains rests on researchers' victim-profile analysis, a government complaint described by Krebs (not read directly), and TRM's on-chain correlation, which TRM says is "not based on direct attribution to individual LastPass accounts" ([BleepingComputer](https://www.bleepingcomputer.com/news/security/cryptocurrency-theft-attacks-traced-to-2022-lastpass-breach/)). LastPass disputes a proven link.

## Public references

- Krebs on Security (2023-09-05): <https://krebsonsecurity.com/2023/09/experts-fear-crooks-are-cracking-keys-stolen-in-lastpass-breach/>
- Krebs on Security (2025-03): <https://krebsonsecurity.com/2025/03/feds-link-150m-cyberheist-to-2022-lastpass-hacks/>
- TRM Labs (2025-12-24): <https://www.trmlabs.com/resources/blog/trm-traces-stolen-crypto-from-2022-lastpass-breach-on-chain-indicators-suggest-russian-cybercriminal-involvement>
- BleepingComputer (2026-01-02): <https://www.bleepingcomputer.com/news/security/cryptocurrency-theft-attacks-traced-to-2022-lastpass-breach/>
- LastPass notice (2022-12-22): <https://blog.lastpass.com/posts/2022/12/notice-of-recent-security-incident>
- LastPass update (2023-03-01): <https://blog.lastpass.com/posts/2023/03/security-incident-update-recommended-actions>
- LastPass notice (2022-08-25 / 09-15 / 11-30 updates): <https://blog.lastpass.com/posts/notice-of-recent-security-incident>
- ZachXBT, post on the 2023-10-25 thefts (2023-10-27): <https://x.com/zachxbt/status/1717901088521687330>
