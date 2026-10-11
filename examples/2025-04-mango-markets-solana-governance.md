# Mango Markets MNGO governance-token expiry and protocol wind-down — Solana — 2025-01

**Loss:** approximately \$0 realised for token-holders via the governance-approved wind-down; the 2024-09-27 SEC settlement required the DAO and development entities to destroy their MNGO tokens and delist them (it did not itself order the wind-down; the contributors chose to wind down Mango v4 in January 2025), following the SEC/CFTC/DOJ enforcement actions against the October 2022 oracle-manipulation incident (see `examples/2022-10-mango-markets.md`).
**OAK Techniques observed:** **OAK-T16.002** (Hostile-Vote Treasury Drain — broadly construed at the regulator-enforced level; the SEC settlement required token destruction and delisting, and the wind-down followed contributor decisions and unanimous DAO proposals that discouraged borrowing and lending, a governance-outcome surface distinct from the original 2022 oracle-manipulation extraction; the regulator-mandated framing is overstated and the mapping is weak). **OAK-T5.005** (Treasury-Management Exit — contributor-initiated wind-down following the settlement and internal disputes). **OAK-T9.001** (Oracle Price Manipulation — original 2022 incident technique, for the anchor incident context).
**Attribution:** **confirmed**. Avraham Eisenberg was convicted on commodities fraud and manipulation charges (later vacated on venue/materiality grounds in 2025); the SEC settlement with Mango DAO, Mango Labs, and Blockworks Foundation imposed token-destruction and delisting requirements.
**Key teaching point:** **The Mango Markets wind-down is a worked example of a protocol ending through its own governance machinery after an enforcement settlement and contributor withdrawal.** The SEC settlement required token destruction and delisting; the shutdown itself followed the co-founder's call and DAO proposals, so it is not cleanly a regulator-mandated termination.

**Corrected 2026-10-11:** Wind-down re-dated to 2025-01-13 and attributed to the co-founder's 2025-01-03 call plus DAO proposals (not an SEC-mandated vote ceasing operations in April); settlement terms restricted to token destruction and delisting; both penalty figures given.

## Summary

In October 2022, Avraham Eisenberg manipulated Mango Markets' oracle to extract approximately \$110M (see `examples/2022-10-mango-markets.md`). The SEC, CFTC, and DOJ pursued parallel enforcement actions against Eisenberg and, separately, against Mango DAO, Mango Labs LLC, and Blockworks Foundation (the entities associated with the protocol's governance and development).

On 2024-09-27 the SEC announced settled charges against Mango DAO, Mango Labs, and Blockworks Foundation. The settlement required the DAO and development organisation to destroy their MNGO tokens and petition exchanges to delist them, plus civil penalties. Reported penalty figures differ: the DAO voted in August 2024 to settle for \$223,228, while Cointelegraph cites \$700,000 in total civil penalties (a separate \$500,000 CFTC settlement was proposed in September 2024).

The wind-down was not ordered by the settlement. On 2025-01-03 co-founder Maximilian Schneider told the Discord that active contributors no longer wanted to work on Mango and proposed a graceful shutdown. Two DAO proposals raising interest rates and collateral requirements to discourage borrowing and lending passed unanimously and became executable on 2025-01-13; Mango announced on 2025-01-11 that Mango v4 and Boost were winding down.

This case establishes a new governance-attack surface: the protocol's own DAO governance machinery can be the mechanism for protocol termination when the "hostile vote" is regulator-mandated rather than attacker-purchased. The structural lesson for DAO governance design is that governance-minimization (removing the ability for a governance vote to destroy the protocol) may be a necessary design constraint — but one that conflicts with regulatory compliance requirements that depend on the DAO being able to comply with enforcement-mandated termination.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-10-11 | Eisenberg executes Mango Markets oracle-manipulation extraction (~$110M) | T9.001 (original incident) |
| 2022-12 | Eisenberg arrested in Puerto Rico; DOJ files criminal charges; CFTC files civil enforcement | (enforcement — criminal + civil) |
| 2023-01 | SEC files civil charges against Eisenberg | (SEC enforcement — individual) |
| 2024-09-27 | SEC announces settled charges with Mango DAO, Mango Labs, Blockworks Foundation; requires MNGO destruction and delisting plus civil penalties | (enforcement) |
| 2025-01-03 to 2025-01-13 | Co-founder proposes graceful shutdown (01-03); two unanimous DAO proposals discourage borrowing/lending, executable 01-13; wind-down announced 01-11 | **T16.002** (hostile-vote treasury destruction — regulator-mandated) |
| 2025-01-13 | Mango v4 winds down | T5.005 (protocol termination) |

## Public references

- `[theblockmango2025]` — The Block, "Mango Markets to wind down in wake of SEC settlement, DAO battle" (2025-01-12): <https://www.theblock.co/post/334172/mango-markets-to-wind-down-in-wake-of-sec-settlement-dao-battle>
- `[cointelegraphmango2025]` — Cointelegraph, "Mango Markets shuts down following SEC settlement" (2025-01-12): <https://cointelegraph.com/news/mango-markets-shuts-down-following-sec-settlement>
