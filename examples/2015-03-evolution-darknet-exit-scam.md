# Evolution Darknet Market Exit Scam — 2015-03

**Loss:** ~$12M (~42,000 BTC at ~$285/BTC in March 2015). Evolution was the second-largest darknet marketplace after Silk Road 3.0; its operators executed an exit scam in March 2015, freezing all user withdrawals and sweeping escrow-held BTC to operator-controlled wallets.
**OAK Techniques observed:** **OAK-T5.005** (Treasury Management Exit — the operators, as the marketplace's central escrow custodians, controlled all user funds held in Evolution's escrow system and swept them in a coordinated exit event). **OAK-T8.005** (Operational-Security Procedural Failure — the operators disappeared without being publicly identified at the time; their operational security during the platform's operation was sufficient to evade identification, but the exit-scam event itself was a catastrophic OPSEC failure in the attacker-jurisdiction sense — the operators demonstrated that the escrow model was a standing custodial-extraction surface). **OAK-T6.001** (Source-Verification Mismatch — the marketplace's escrow claims and "secure" transaction promises were not independently verifiable; the escrow was a single-operator-controlled hot-wallet pool).
**Attribution:** **unattributed** — the Evolution operators (alleged handles "Verto" and "Kimble") disappeared with the escrow funds and were not publicly identified at the time. Later investigation suggested connections to the Carding Forum / Russian-language darknet ecosystem. The incident remains one of the largest unsolved darknet-market exit scams by BTC volume.
**Key teaching point:** **Evolution is the canonical darknet-market exit scam — the structural demonstration that centralized marketplace escrow is a standing T5.005 surface. The incident is the darknet-market equivalent of the GBL exchange exit scam (2013, T11.005.001): a centralized platform whose operator-controlled escrow pool holds customer funds, with no independent custody verification, where the operator can freeze withdrawals and sweep the escrow at any time. The Evolution case validated the Silk Road precedent: decentralized custody (buyer-seller direct with on-chain escrow contracts) is structurally safer than centralized marketplace escrow — but darknet markets after Evolution continued to favour centralized escrow because it simplified the buyer-seller trust model.**

## Summary

Evolution launched in January 2014, shortly after the FBI seizure of Silk Road (October 2013) and the subsequent takedown of Silk Road 2.0 (November 2014). Evolution rapidly became the second-largest darknet marketplace by volume, benefiting from the vacuum left by Silk Road's takedown. The marketplace operated a centralized escrow system: buyers deposited BTC into Evolution-controlled escrow addresses; upon buyer confirmation of delivery, the escrow was released to the vendor.

In mid-March 2015, Evolution's operators ("Verto" and "Kimble") disabled withdrawals across the platform. Over a period of approximately 48 hours, the escrow-held BTC was systematically swept from Evolution-controlled addresses to operator-controlled wallets. The operators then took Evolution's servers offline and ceased all communication.

The exit-scam mechanics:

- **Escrow freezing:** The operators disabled the withdrawal function across all user accounts, preventing both buyers and vendors from withdrawing funds.
- **Coordinated sweep:** Over ~48 hours, escrow-held BTC was moved from Evolution's known escrow addresses to operator-controlled wallets. The sweep was detected by forum and Reddit community monitoring of Evolution-related addresses.
- **Server shutdown:** After the escrow sweep, Evolution's servers were taken offline, and the operators' previously active forum accounts went silent.

The total loss was estimated at ~42,000 BTC (~$12M at March 2015 prices). Neither operator was publicly identified at the time of the incident, though subsequent community investigation linked the Evolution infrastructure to the Russian-language darknet ecosystem.

The Evolution exit scam is the darknet-market structural analogue to the fake-exchange exit scam (T11.005.001): a centralized platform where the operator controls customer funds in escrow, with no independent verification of escrow integrity, and the operator can freeze-and-sweep at any time. The lesson — centralized escrow is a standing extraction surface — was publicly available after Evolution but did not prevent subsequent darknet-market exit scams (Wall Street Market 2019, Empire Market 2020, and others), because the alternative (decentralized on-chain escrow contracts) imposed a UX cost that buyers and vendors were unwilling to pay.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2014-01 | Evolution darknet market launches; centralized escrow model; operators "Verto" and "Kimble" control escrow wallets | **Centralized escrow surface creation** |
| 2014–2015-03 | Evolution grows to second-largest darknet marketplace by volume, behind only Silk Road 3.0 / Agora | (platform growth) |
| 2015-03 (mid-month) | Operators disable withdrawals across all user accounts; begin sweeping escrow-held BTC to operator-controlled wallets over ~48 hours | **T5.005 escrow extraction** |
| 2015-03 | Evolution servers taken offline; operators cease all communication; ~42,000 BTC swept | **Exit scam completion** |
| 2015-03 onward | Reddit and forum community document the exit-scam on-chain trail; operators not publicly identified | (community forensic response) |
| 2019–2020 | Wall Street Market (2019) and Empire Market (2020) exit scams — the same centralized-escrow extraction pattern | **Class recurrence** |

## Realised extraction

~42,000 BTC (~$12M at March 2015 prices). No public recovery. Operators not publicly identified at the time of incident; the case remains unsolved.

## Public references

- Reddit r/DarkNetMarkets contemporaneous community documentation of the exit scam (March 2015) — primary community-source forensic record.
- BitcoinTalk and darknet-forum threads on Evolution exit scam (March-April 2015).
- DeepDotWeb contemporaneous coverage of Evolution exit scam (2015; domain later seized by FBI in 2019).
- Cross-reference: T5.005 (Treasury Management Exit) at `techniques/T5.005-treasury-management-exit.md`.
- Cross-reference: T8.005 (Operational-Security Procedural Failure) at `techniques/T8.005-operational-security-procedural-failure.md`.
- [`examples/2011-2013-silk-road.md`](../examples/2011-2013-silk-road.md) — Silk Road, 2011–2013 (the darknet-market model that Evolution replicated; FBI seizure rather than exit scam).
- [`examples/2013-11-sheep-marketplace.md`](../examples/2013-11-sheep-marketplace.md) — Sheep Marketplace exit scam, 2013 (the predecessor bitcoin-darknet-market exit scam).
