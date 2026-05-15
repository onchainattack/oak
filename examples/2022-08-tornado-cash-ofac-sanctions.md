# Tornado Cash OFAC sanctions — trust-substrate shift via regulatory action — Ethereum — 2022-08-08

**Loss:** non-financial at the individual-user level; the loss was a **trust-substrate revocation** — the structural assumption that a decentralized, immutable smart-contract protocol could not be sanctioned or blacklisted by a sovereign regulator was invalidated by the OFAC action. Downstream effects included: removal of Tornado Cash from DeFi frontend integrations (Uniswap Labs blocked TRON-associated wallet addresses in its frontend; Aave, dYdX, and other DeFi frontends followed); GitHub repository takedown; domain seizure; and the arrest of Tornado Cash developer Alexey Pertsev in the Netherlands (August 2022). The OFAC designation established the precedent that smart-contract addresses can be sanctioned entities under U.S. law — a trust-substrate shift with cohort-level consequences for every DeFi protocol whose users relied on the "code is law / immutable smart contract cannot be censored" assumption.
**OAK Techniques observed:** OAK-T7.009 (Sanctioned-Entity and Illicit-Purpose Financing) — the canonical T7.009 regulatory-designation action: the U.S. Treasury OFAC SDN designation of Tornado Cash smart-contract addresses established the precedent that cryptocurrency mixer addresses can be designated entities under U.S. sanctions law, creating the compliance-screening obligation that underlies T7.009 detection at the CEX/VASP layer. **OAK-T6.007** (Trust-substrate Shift / Vendor-side Promise Revocation — broadly construed at the regulatory-action level; the U.S. Treasury OFAC designation revoked the load-bearing trust-substrate claim that "decentralized protocol cannot be sanctioned," structurally identical to a vendor-policy revocation of a trust claim). **OAK-T14.005** (Builder Censorship MEV Extraction — downstream effect; post-OFAC, a material share of Ethereum block builders censored Tornado Cash transactions in compliance with OFAC, creating the builder-censorship surface documented at T14.005).
**Attribution:** **unattributed** Tornado Cash and associated Ethereum addresses were added to the SDN (Specially Designated Nationals) list on 2022-08-08. OFAC alleged that Tornado Cash had been used to launder ~$7B+ in cryptocurrency since 2019, including ~$455M by DPRK's Lazarus Group. The designation was challenged in court (Van Loon v. Department of Treasury); a Fifth Circuit ruling in November 2024 found that OFAC exceeded its authority in sanctioning immutable smart contracts, but the trust-substrate shift had already been operational for two years.
**Key teaching point:** **The Tornado Cash OFAC designation is the canonical T6.007 regulatory-action anchor: a sovereign regulator's enforcement action revoked the load-bearing trust-substrate claim that "decentralized smart-contract protocols are beyond the reach of sanctions enforcement."** The structural lesson is that T6.007 defense-evasion-by-policy-change extends beyond vendor-policy decisions to include regulatory, legal-process, and infrastructure-policy events that reshape user threat models without an attacker present.

## Summary

On 2022-08-08, the U.S. Department of the Treasury's Office of Foreign Assets Control (OFAC) added Tornado Cash — a set of open-source, non-custodial Ethereum smart contracts for private transactions — to the SDN list. The designation included 44 Ethereum addresses associated with the Tornado Cash protocol, including the smart-contract addresses for the 0.1 ETH, 1 ETH, 10 ETH, and 100 ETH mixer pools.

The OFAC action triggered immediate trust-substrate consequences across the DeFi ecosystem:

1. **Frontend-level compliance:** Uniswap Labs, Aave, dYdX, Balancer, and other DeFi frontends blocked wallet addresses that had interacted with Tornado Cash contracts, even for non-illicit use (e.g., privacy-seeking individuals).
2. **Infrastructure-level compliance:** GitHub removed the Tornado Cash repository and suspended the accounts of Tornado Cash contributors. The Tornado Cash website (`tornado.cash`) was seized. Circle (USDC issuer) froze USDC held in Tornado Cash-associated addresses per OFAC compliance.
3. **Validator/builder-level compliance:** Post-Merge Ethereum (September 2022), a material share of MEV-Boost relay operators and block builders excluded Tornado Cash transactions from their blocks to avoid potential OFAC liability — the builder-censorship surface documented at T14.005.
4. **Developer arrest:** Alexey Pertsev, a Tornado Cash developer, was arrested in the Netherlands on 2022-08-10 on money-laundering charges. He was convicted in May 2024 and sentenced to 64 months in prison.

The trust-substrate shift was structural and persistent: even after the Fifth Circuit's November 2024 ruling that OFAC exceeded its authority in sanctioning immutable smart contracts, the operational precedent — that a regulator could, and did, sanction smart-contract addresses, triggering frontend, infrastructure, and builder-level compliance — had been established for two years and was fully internalised by the DeFi compliance ecosystem.

The case established T6.007's regulatory-action variant: the "vendor" is the sovereign state; the "promise revocation" is the sanctions designation; the "trust-substrate shift" is the operational precedent that decentralized protocols are not beyond regulatory reach.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2019–2022 | Tornado Cash operates as a non-custodial Ethereum privacy protocol; trust substrate: "decentralized smart contracts cannot be sanctioned" | (standing trust-substrate claim) |
| 2022-08-08 | OFAC adds Tornado Cash and 44 associated addresses to SDN list; alleges ~$7B+ laundered since 2019 | T6.007 (regulatory trust-substrate revocation) |
| 2022-08-10 | Alexey Pertsev arrested in the Netherlands on money-laundering charges | (developer criminal liability) |
| 2022-08–2023 | DeFi frontends (Uniswap, Aave, dYdX) block TRON-associated addresses; GitHub removes repos; Circle freezes USDC; MEV-Boost relays censor TC transactions | T14.005 (downstream builder censorship) |
| 2024-05 | Pertsev convicted; sentenced to 64 months in Dutch prison | (criminal disposition) |
| 2024-11 | Fifth Circuit rules OFAC exceeded authority in sanctioning immutable smart contracts (Van Loon v. Treasury) | (legal challenge — partial relief, trust-substrate already shifted) |

## Realised extraction

Non-financial at the individual-user level. The structural loss was the trust-substrate revocation — the operational precedent that smart-contract addresses can be sanctioned, and that frontend, infrastructure, and builder-level compliance follows within hours — which is now priced into the threat model of every DeFi privacy tool.

## Public references

- U.S. Department of the Treasury / OFAC, SDN List Designation, August 8, 2022
- Van Loon v. Department of Treasury, Fifth Circuit Court of Appeals, November 2024
- Alexey Pertsev criminal proceedings, Dutch Public Prosecution Service, May 2024
- MEV-Boost relay operator OFAC-compliance disclosures (August–November 2022)
- See `techniques/T6.007-trust-substrate-shift-vendor-promise-revocation.md`, `techniques/T14.005-builder-censorship-mev-extraction.md`
