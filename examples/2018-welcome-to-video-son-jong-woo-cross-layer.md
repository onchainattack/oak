# Welcome to Video Son Jong-woo cross-layer de-anonymization — 2018

**Loss:** **Attribution event, not financial loss.** Son Jong-woo, a South Korean national, was identified as the operator of Welcome to Video — the largest CSAM darknet marketplace by user count (1.28M registered accounts) — through cross-layer operational-security failures linking his darknet server infrastructure to his clearweb identity. The IRS-CI and international law enforcement taskforce Operation Wish granted the attribution.
**OAK Techniques observed:** **OAK-T8.005** (Operational Security Procedural Failure) — canonical anchor. Son registered the Welcome to Video server using a South Korean hosting provider under his real name and used a personal email address for server billing, linking the darknet marketplace infrastructure to his verified identity. **OAK-T7.002** (CEX Deposit-Address Layering) — Bitcoin proceeds from Welcome to Video were traced through exchange deposit addresses to Son's personal accounts.
**Attribution:** **confirmed** — Son Jong-woo was arrested (2018, South Korea), convicted (2019, South Korea; 2021, U.S. federal court in D.C.), and sentenced (18 months in South Korea; additional U.S. sentence). The IRS-CI investigation traced Bitcoin payments from the Welcome to Video server wallet to exchange accounts registered under Son's identity.

**Key teaching point:** Welcome to Video demonstrates the cross-layer de-anonymization chain at industrial scale: the attacker's darknet infrastructure (server, domain registration, hosting billing) retained a clearweb identity trace (real-name hosting registration), and the cryptocurrency payment rail provided the financial-tracing evidence that confirmed the identity-to-server linkage.

## Summary

Welcome to Video was a Tor-hidden-service darknet marketplace distributing CSAM content, operating from approximately 2015 to 2018. At its peak, the site had 1.28 million registered accounts and processed Bitcoin payments for content access. It was the largest CSAM marketplace by user count identified by law enforcement at the time of takedown.

The IRS Criminal Investigation division (IRS-CI) traced Bitcoin payments from the Welcome to Video server wallet through multiple hops to exchange deposit addresses. The exchange accounts receiving the payments were registered under the verified identity of Son Jong-woo, a South Korean national. Separately, the server's hosting registration was traced to a South Korean hosting provider where the server had been registered under Son's real name with a personal email address for billing. The two attribution paths — server-registration identity and exchange-account identity — converged on the same individual, producing a high-confidence attribution.

Operation Wish, the multinational law enforcement taskforce led by IRS-CI, arrested Son in South Korea in 2018. The takedown included server seizure, domain seizure, and the arrest of 337 site users in 38 countries (identified through the server's user database). The Bitcoin tracing methodology used in the investigation — following the payment flow from the darknet server wallet to exchange-registered addresses — became a template for subsequent darknet-marketplace attribution operations.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| ~2015 | Welcome to Video darknet marketplace launched; server hosted with South Korean provider registered under Son's real name | T8.005 (server-registration identity trace) |
| 2015–2018 | Marketplace operates; 1.28M registered accounts; Bitcoin payments processed through exchange-deposit rail | T7.002 (CEX deposit layering) |
| 2018 | IRS-CI traces Bitcoin payments to exchange accounts registered under Son's identity; server-hosting registration confirms identity | T8.005 (cross-layer attribution) |
| 2018-03 | Son Jong-woo arrested in South Korea; server seized | (arrest) |
| 2019 | Son convicted in South Korea (18 months); subsequently extradited to U.S. | (conviction) |
| 2021 | U.S. federal conviction (D.C. District Court); additional sentence imposed | (U.S. conviction) |

## Public references

- U.S. Department of Justice press release: Welcome to Video takedown and Son Jong-woo indictment (2018–2019).
- IRS-CI Operation Wish documentation and methodology.
- U.S. v. Son Jong-woo, D.C. District Court docket.
- Chainalysis: Bitcoin tracing methodology used in the investigation.
