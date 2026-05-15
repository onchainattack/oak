# BTC-e exchange account farming and sybil infrastructure — 2011–2017

**Loss:** **Infrastructure case, not a per-victim loss.** BTC-e was a cryptocurrency exchange operating from 2011 to 2017 that functioned as a primary laundering rail for ransomware operators, darknet marketplaces, and cybercriminal groups. The exchange was estimated to have processed over $4B in cumulative transaction volume, much of it illicit. The U.S. DOJ indicted BTC-e and its operator Alexander Vinnik in 2017.
**OAK Techniques observed:** **OAK-T8.004** (Exchange Account Farming / Sybil Accounts) — canonical anchor. BTC-e operated with minimal KYC/AML compliance, enabling criminal actors to maintain multiple exchange accounts under fabricated or stolen identities — the exchange as account-farming infrastructure. **OAK-T7.002** (CEX Deposit-Address Layering) — BTC-e deposit addresses were the primary destination for illicit proceeds from ransomware, darknet markets, and cybercrime.
**Attribution:** **confirmed** — Alexander Vinnik (BTC-e operator) was arrested (2017, Greece), extradited to France (2020), convicted (2020, France), and subsequently extradited to the United States (2022). Vinnik pleaded guilty to money-laundering conspiracy charges in U.S. federal court (2024).

**Key teaching point:** BTC-e is the canonical T8.004 anchor: an exchange that did not enforce meaningful identity verification served as a de facto account-farming platform for the entire cybercriminal ecosystem. The absence of KYC/AML controls at the exchange level enabled an unlimited number of exchange accounts under fabricated identities — the exchange itself was the sybil infrastructure.

## Summary

BTC-e was a cryptocurrency exchange launched in 2011, operating from servers in Russia and Eastern Europe. The exchange was notable for its minimal identity-verification requirements — users could open accounts with minimal or no KYC documentation, enabling criminal actors to operate multiple accounts under fabricated identity sets.

BTC-e became the primary laundering rail for multiple major cybercriminal operations: (1) ransomware payments (Locky, CryptXXX, and others) were routed through BTC-e deposit addresses; (2) darknet marketplace proceeds (Silk Road, AlphaBay, Hydra) were laundered through BTC-e; (3) the Mt. Gox hack proceeds (2014) were partially traced through BTC-e deposit addresses.

The U.S. DOJ indicted BTC-e and its alleged operator Alexander Vinnik in 2017 on money-laundering and unlicensed-money-transmission charges. Vinnik was arrested in Greece (2017), extradited to France (2020), convicted in France (2020), extradited to the United States (2022), and pleaded guilty to money-laundering conspiracy charges (2024). The exchange was seized and taken offline by U.S. law enforcement in 2017.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2011 | BTC-e exchange launched; minimal KYC/AML requirements from inception | T8.004 (account farming) |
| 2011–2017 | BTC-e operates as primary illicit-finance laundering rail; ~$4B+ cumulative volume | T7.002 / T8.004 |
| 2017-07 | U.S. DOJ indicts BTC-e and Alexander Vinnik; exchange seized and taken offline | (law enforcement) |
| 2017–2024 | Vinnik extradition and prosecution sequence (Greece → France → U.S.) | (prosecution) |

## Public references

- U.S. DOJ indictment: United States v. BTC-e and Alexander Vinnik (2017).
- FinCEN: civil monetary penalty against BTC-e for AML violations.
- Chainalysis: BTC-e transaction-flow tracing and illicit-finance routing analysis.
