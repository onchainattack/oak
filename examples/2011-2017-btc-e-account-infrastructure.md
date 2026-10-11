# BTC-e exchange account farming and sybil infrastructure — 2011–2017

**Loss:** **Infrastructure case, not a per-victim loss.** BTC-e was a cryptocurrency exchange operating from 2011 to 2017 that functioned as a primary laundering rail for ransomware operators, darknet marketplaces, and cybercriminal groups. The 2017 U.S. indictment alleged BTC-e received more than \$4 billion worth of bitcoin over its operation `[btcedoj2017]`; the 2024 DOJ plea release says it processed over \$9 billion in transactions for over one million users and that at least \$121 million of criminal proceeds were laundered `[btcedoj2024]`. The U.S. DOJ indicted BTC-e and its operator Alexander Vinnik in 2017 (21-count indictment) `[btcedoj2017]`.
**OAK Techniques observed:** **OAK-T8.004** (Exchange Account Farming / Sybil Accounts) — canonical anchor. BTC-e operated with minimal KYC/AML compliance, enabling criminal actors to maintain multiple exchange accounts under fabricated or stolen identities — the exchange as account-farming infrastructure. **OAK-T7.002** (CEX Deposit-Address Layering) — BTC-e deposit addresses were the primary destination for illicit proceeds from ransomware, darknet markets, and cybercrime.
**Attribution:** **confirmed** — Alexander Vinnik (BTC-e operator) was arrested in Greece (2017), convicted of money laundering in France and sentenced to five years `[btceoccrp]`, and later pleaded guilty to conspiracy to commit money laundering in a U.S. court (announced 2024-05-03) `[btcedoj2024]`. Extradition dates are not established in the cited sources.

**Key teaching point:** BTC-e is the canonical T8.004 anchor: an exchange that did not enforce meaningful identity verification served as a de facto account-farming platform for the entire cybercriminal ecosystem. The absence of KYC/AML controls at the exchange level enabled an unlimited number of exchange accounts under fabricated identities — the exchange itself was the sybil infrastructure.
**Corrected 2026-10-11:** Volume figures now follow the DOJ releases (\$4B received per the 2017 indictment; \$9B+ processed per 2024); removed unsourced ransomware/darknet attributions beyond Mt. Gox and Locky (Locky not a French conviction) and the unverified extradition years.

## Summary

BTC-e was a cryptocurrency exchange launched in 2011, operating 2011-2017. The exchange was notable for its minimal identity-verification requirements — users could open accounts with minimal or no KYC documentation, enabling criminal actors to operate multiple accounts under fabricated identity sets.

BTC-e became the primary laundering rail for multiple major cybercriminal operations: the DOJ indictment alleges Vinnik received funds from the Mt. Gox hack and laundered them through BTC-e and the now-defunct Tradehill exchange `[btcedoj2017]`; French prosecutors accused him of contributing to the Locky ransomware, but the French court did not convict on that charge per Engadget `[btceengadget]`. Claims in earlier text that CryptXXX, Silk Road, AlphaBay and Hydra proceeds flowed through BTC-e are not supported by the sources cited here.

The U.S. DOJ indicted BTC-e and its alleged operator Alexander Vinnik in 2017 on money-laundering and unlicensed-money-service-business charges `[btcedoj2017]`. Vinnik was arrested in Greece (2017), convicted in France, and pleaded guilty in the U.S. (2024) `[btceoccrp]``[btcedoj2024]`. The exchange was taken offline in July 2017 `[btcecnbc]`.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2011 | BTC-e exchange launched; minimal KYC/AML requirements (per OAK's characterisation; not independently sourced here) | T8.004 (account farming) |
| 2011–2017 | BTC-e operates; indictment alleges it received more than \$4B in bitcoin `[btcedoj2017]` | T7.002 / T8.004 |
| 2017-07 | U.S. DOJ announces 21-count indictment of Vinnik and BTC-e `[btcedoj2017]`; exchange taken offline `[btcecnbc]` | (law enforcement) |
| 2017–2024 | Vinnik prosecuted in France (five-year sentence) `[btceoccrp]`; pleads guilty in the U.S. (2024-05) `[btcedoj2024]` | (prosecution) |

## Public references

- U.S. DOJ indictment: United States v. BTC-e and Alexander Vinnik (2017).
- FinCEN: civil monetary penalty against BTC-e for AML violations.
- Chainalysis: BTC-e transaction-flow tracing and illicit-finance routing analysis.
- `[btcedoj2017]` — U.S. DOJ (N.D. Cal.), "Russian National And Bitcoin Exchange Charged In 21-Count Indictment For Operating Alleged International Money Laundering Scheme" (2017-07): <https://www.justice.gov/usao-ndca/pr/russian-national-and-bitcoin-exchange-charged-21-count-indictment-operating-alleged>
- `[btcedoj2024]` — U.S. DOJ, "BTC-e Operator Pleads Guilty to Money Laundering Conspiracy" (2024-05-03): <https://www.justice.gov/usao-ndca/pr/btc-e-operator-pleads-guilty-money-laundering-conspiracy>
- `[btceoccrp]` — OCCRP, "France Sentences Russian Crypto-Launderer to Five Years Jail": <https://www.occrp.org/en/daily/13495-france-russian-crypto-five-jail>
- `[btcecnbc]` — CNBC, "Why the feds took down one of bitcoin's largest exchanges" (2017-07-29): <https://www.cnbc.com/2017/07/29/why-the-feds-took-down-one-of-bitcoins-largest-exchanges.html>
- `[btceengadget]` — Engadget, "Bitcoin exchange founder sentenced to prison for money laundering": <https://www.engadget.com/bitcoin-alexander-vinnick-prison-money-laundering-083053555.html>
