# Emergence of blockchain transaction-graph forensics — Bitcoin — 2013–2015

**Loss:** n/a (defender tooling). The emergence of on-chain transaction graph de-anonymization as a forensic discipline — Chainalysis (founded 2014), Elliptic (founded October 2013), and CipherTrace (founded 2015) (`[wikichainalysis]`, `[ellipticwiki]`, `[ellipticcipher]`) are among the firms that built commercial blockchain-tracing tooling. Chainalysis was formed to act as the investigator of the Mt. Gox hack (`[wikichainalysis]`); its Silk Road assistance is dated 2020 there. The technique (UTXO clustering, co-spend heuristics, change-address detection, exchange-deposit address clustering) transitioned from academic research to operational law-enforcement tooling during this period.
**OAK Techniques observed:** **OAK-T8.003** (On-Chain Transaction Graph De-Anonymization) — primary; the canonical anchor for the technique as a forensic discipline. The academic foundations (Meiklejohn et al. 2013 "A Fistful of Bitcoins"; Ron and Shamir 2013) provided the clustering heuristics; the Chainalysis/Elliptic/CipherTrace founding era operationalised them. **OAK-T7.001** (Mixer-Routed Hop — broadly construed at the forensic-tracing layer; the transaction-graph de-anonymization technique is the primary defender countermeasure against T7.001 mixer-routed laundering).
**Attribution:** **unattributed** Academic attribution to Meiklejohn et al. (UC San Diego, 2013), Ron and Shamir (Weizmann Institute, 2013). Commercial attribution to Chainalysis (co-founded 2014 by Michael Gronager, Jan Møller and Jonathan Levin, `[wikichainalysis]`), Elliptic (founded 2013; Wikipedia lists Adam Joyce, Tom Robinson and James Smith, `[ellipticwiki]`), CipherTrace (founded 2015; sources differ on founders, `[ellipticcipher]`).
**Corrected 2026-10-11:** Chainalysis was formed around the Mt. Gox investigation, not Silk Road tracing; its Silk Road work is dated 2020; Elliptic founded October 2013; claims about first engagements and product names removed as unsourced; the Ron and Shamir description is unverified.
**Key teaching point:** **On-chain transaction graph de-anonymization is the structural defender countermeasure to T11.001 / T7.001 / T8.001-class operational security failures.** Every Bitcoin address that transacts leaves a permanent, public, graph-traceable record. The clustering heuristics published in 2013-2015 remain load-bearing forensic primitives in every major exchange-hack and darknet-market investigation.

## Summary

Before 2013, the operational assumption among many Bitcoin users was that Bitcoin was "anonymous" — addresses were pseudonymous strings with no inherent link to real-world identity. This assumption was demolished by two academic papers published in 2013:

1. **Ron and Shamir (2013):** "Quantitative Analysis of the Full Bitcoin Transaction Graph" (cited from memory; not verified against a source in this pass) demonstrated that Bitcoin's public transaction graph could be analyzed to identify large holders, exchange cold wallets, and transaction patterns at scale.

2. **Meiklejohn et al. (2013):** "A Fistful of Bitcoins: Characterizing Payments Among Men with No Names" (IMC 2013) used two clustering heuristics: the multi-input (co-spend) heuristic, because the sender must hold the keys for every input, and a change-address heuristic for the output that returns coins to the sender (`[acolyerforensics]`). Earlier drafts also listed exchange-deposit clustering as a heuristic of the paper; the cited summary does not support that.

Chainalysis was co-founded in 2014 and was formed to act as the official investigator of the Mt. Gox hack; at the time Gronager was COO of Kraken, which the Mt. Gox bankruptcy trustee had hired to investigate the breach (`[wikichainalysis]`). Earlier drafts said it was founded to trace Silk Road flows and that its first major engagement was Silk Road; the cited source instead dates its Silk Road assistance to 2020 and its Welcome to Video work to October 2019, and those claims are removed. The FBI reported seizing about 144,000 BTC in connection with Silk Road in October 2013 (`[wikisrforensics]`).

Elliptic was founded in October 2013 and, per its own account, built its first compliance tools based on blockchain analytics in 2015 (`[ellipticcipher]`). The product names and the claim that the industry was "operational by 2015" are not sourced here.

The technique has since been extended across chains (Ethereum account graph, Solana account graph) and enriched with off-chain data integration (exchange KYC data, public address labels, forum/social-media disclosures). The core clustering heuristics from the 2013 academic literature remain load-bearing, making T8.003 one of the few OAK techniques whose foundational primitives have been essentially stable for a decade.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2013 | Ron and Shamir publish "Quantitative Analysis of the Full Bitcoin Transaction Graph" | T8.003 (academic foundation) |
| 2013 | Meiklejohn et al. publish "A Fistful of Bitcoins" introducing the multi-input and change-address heuristics (`[acolyerforensics]`) | T8.003 (clustering heuristics) |
| 2013-10 | FBI seizes Silk Road (~144,000 BTC); law enforcement requires forensic tracing of DPR's wallet structure | (law-enforcement demand signal) |
| 2014 | Chainalysis co-founded; formed to investigate the Mt. Gox hack (`[wikichainalysis]`) | T8.003 (operational tooling) |
| 2013-10 / 2015 | Elliptic (October 2013) and CipherTrace (2015) founded (`[ellipticcipher]`) | T8.003 (industry emergence) |

## Realised extraction

n/a (defender tooling). The technique is the primary on-chain forensic countermeasure against T11.001 / T7.001 / T8.001-class operational security failures.

## Public references

- Meiklejohn et al., "A Fistful of Bitcoins: Characterizing Payments Among Men with No Names" (ACM IMC 2013)
- Ron and Shamir, "Quantitative Analysis of the Full Bitcoin Transaction Graph" (FC 2013)
- Ron and Shamir's paper is cited from memory and was not verified against a source in this pass.
- See `techniques/T8.003-on-chain-transaction-graph-de-anonymization.md` for full technique characterisation
- `[wikichainalysis]` — Wikipedia, "Chainalysis": <https://en.wikipedia.org/wiki/Chainalysis>
- `[ellipticwiki]` — Wikipedia, "Elliptic (company)": <https://en.wikipedia.org/wiki/Elliptic_(company)>
- `[ellipticcipher]` — Elliptic, "10-year anniversary: how we pioneered blockchain analytics": <https://www.elliptic.co/blog/analysis/elliptic-10-year-anniversary-how-we-pioneered-blockchain-analytics>
- `[wikisrforensics]` — Wikipedia, "Silk Road (marketplace)": <https://en.wikipedia.org/wiki/Silk_Road_(marketplace)>
- `[acolyerforensics]` — The Morning Paper, "A fistful of bitcoins" (2017-02-20): <https://blog.acolyer.org/2017/02/20/a-fistful-of-bitcoins-characterizing-payments-among-men-with-no-names/>
