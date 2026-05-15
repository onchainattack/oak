# Moolah / Alex Green (Ryan Kennedy) Exchange Fraud — 2014-10

**Loss:** ~$1.4M-$1.8M (~3,700 BTC at ~$400-$500 2014 BTC price) in direct customer-deposit theft; additional losses from the collapsed MintPal exchange (~$2.5M+ in customer funds). Total fraud magnitude across Moolah/Moopay/MintPal entities estimated at $4M+.
**OAK Techniques observed:** **OAK-T11.005.001** (Fake-CEX / Pig-Butchering Platform — the Moolah exchange and Moopay payment-processor presented as legitimate businesses while the operator diverted customer funds to personal accounts). **OAK-T5.005** (Treasury Management Exit — the operator's control over exchange treasury enabled systematic diversion before the platform's public collapse). **OAK-T6.001** (Source-Verification Mismatch — the operator operated under a fabricated identity "Alex Green"; the real identity "Ryan Kennedy" was uncovered by community investigation and later confirmed by UK law enforcement). **OAK-T8.005** (Operational-Security Procedural Failure — the operator's identity-fabrication trail and prior-fraud history were discoverable through community OSINT investigation).
**Attribution:** **confirmed** — Ryan Kennedy (operating under the pseudonym "Alex Green") was arrested by UK police in 2015, charged with fraud and money-laundering offences, and convicted. The Moolah case is one of the earliest identified-and-convicted operator-attribution outcomes in the crypto exchange-fraud class.
**Key teaching point:** **Moolah is the canonical early-crypto-era exchange-fraud case with a successful identified-to-convicted outcome. The operator's pseudonym ("Alex Green") was penetrated through community OSINT investigation (domain-registration records, past-forum-identity correlation, UK Companies House filings) — an early demonstration of the T8.005 attribution primitives that would later scale to professional blockchain-forensics firms. The case established that the pseudonymous-operator defence is penetrable through off-chain investigative work even in the pre-blockchain-forensics era.**

## Summary

Ryan Kennedy, a UK national operating under the pseudonym "Alex Green," created a constellation of crypto businesses in 2014: Moolah (a cryptocurrency exchange), Moopay (a payment processor marketed to merchants), and later acquired MintPal (a cryptocurrency exchange). All three entities were operated as personal fiefdoms with no segregation of customer funds, no independent oversight, and no verifiable corporate governance.

The operational pattern:

- **Fabricated identity:** "Alex Green" was presented as a successful tech entrepreneur with a backstory that included prior business exits and philanthropic interests. Community investigation — correlating domain-registration WHOIS records, past forum usernames, UK Companies House filings, and social-media footprints — connected "Alex Green" to Ryan Kennedy, who had a prior UK fraud conviction.
- **Fake liquidity and volume:** Moolah claimed exchange volumes that were not substantiated by observable on-chain flow. The platform's trading dashboard was a UI/database fiction.
- **Customer-fund diversion:** Kennedy diverted customer deposits from Moolah and Moopay to personal accounts. The diversion was detected when withdrawal requests began failing and the on-chain trail showed customer-deposit addresses sending to personal-exchange accounts rather than cold storage.
- **MintPal acquisition and collapse:** Moolah acquired the MintPal exchange in 2014. Under Kennedy's control, MintPal's customer funds were similarly diverted. MintPal collapsed in October 2014, triggering the broader Moolah/Moopay unraveling.

Community investigation — led by BitcoinTalk forum members and early crypto-journalists — documented the Kennedy/Green identity link and the diversion on-chain trail before UK law enforcement action. The community OSINT investigation is the canonical early example of the T8.005 attribution primitives that are now standard practice at Chainalysis, TRM Labs, and Elliptic.

UK police arrested Ryan Kennedy in 2015. He was charged with fraud (misrepresentation of business operations, diversion of customer funds) and money-laundering offences. The conviction was one of the earliest successful fraud prosecutions in the crypto exchange-fraud class.

The Moolah case is the structural bridge between the GBL-class fake-exchange frauds (2013, unsolved) and the modern T11.005.001 enforcement wave (2024-2025 DOJ/SEC actions). The key difference is the attribution outcome: GBL's operator was never identified; Moolah's operator was identified through community OSINT, arrested, and convicted.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-2014 | Ryan Kennedy adopts "Alex Green" pseudonym; builds online reputation as a crypto entrepreneur | **T8.005 identity fabrication** |
| 2014 | Moolah exchange and Moopay payment processor launch under "Alex Green" identity | **T11.005.001 platform creation** |
| 2014 | Moolah acquires MintPal exchange; customer funds co-mingled across Moolah/Moopay/MintPal entities | **T5.005 treasury consolidation** |
| 2014-10 | MintPal collapses; customer withdrawals fail; community investigation documents the Kennedy/Green identity link and customer-fund diversion on-chain trail | **T8.005 community OSINT attribution** |
| 2014-10 to 2015 | Moolah/Moopay unravel; total fraud magnitude estimated at $4M+ across all entities | **T5.001 extraction** |
| 2015 | Ryan Kennedy arrested by UK police; charged with fraud and money-laundering | **Attribution: identified-to-convicted** |
| 2015-2016 | Kennedy convicted; one of the earliest successful crypto exchange-fraud convictions | **Conviction milestone** |

## Realised extraction

~$1.4M-$1.8M in direct Moolah/Moopay deposit theft (~3,700 BTC); additional $2.5M+ in MintPal customer funds. Total fraud magnitude estimated at $4M+. No material customer recovery. The conviction was a criminal-justice outcome, not a financial-recovery outcome.

## Public references

- BitcoinTalk forum community investigation threads (October-November 2014) — the canonical early-community-OSINT attribution record.
- CoinDesk contemporaneous coverage of Moolah/MintPal collapse (October 2014).
- UK law-enforcement press releases — Ryan Kennedy arrest and charges (2015).
- Cross-reference: T11.005.001 (Fake-CEX / Pig-Butchering Platform) at `techniques/T11.005.001-fake-cex-pig-butchering-platform.md`.
- Cross-reference: T8.005 (Operational-Security Procedural Failure) at `techniques/T8.005-operational-security-procedural-failure.md`.
- [`examples/2013-12-gbl-bitcoin-exchange-scam.md`](../examples/2013-12-gbl-bitcoin-exchange-scam.md) — GBL Bitcoin exchange Ponzi, 2013 (the preceding unsolved fake-exchange case).
- [`examples/2023-09-jpex-hong-kong.md`](../examples/2023-09-jpex-hong-kong.md) — JPEX Hong Kong, 2023 (the modern successor to the GBL/Moolah template at 100x scale).
