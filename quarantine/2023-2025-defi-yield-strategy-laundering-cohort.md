> **QUARANTINED 2026-11-27 — not part of the OAK corpus.** The 2026-11 source pass rewrote this file from the pages it could open and found no attack to record: no opened page documents stolen funds laundered through yield protocols; the Chainalysis page it rests on says mixer inflows fell, bridge inflows rose, and DeFi's transparency makes it a poor choice for obfuscation. It is kept here, outside `examples/`, and can return if a source documents an incident.

# Illicit flows to DeFi, bridges and mixers in 2023 — Chainalysis aggregate, no yield-strategy incident — multi-chain — 2023

**Loss:** none attributable. This file is aggregate laundering context, not a loss event. An earlier version described DeFi yield strategies and receipt tokens as the dominant post-Tornado-Cash laundering rail; the one opened source does not say that, so those claims are removed.

**OAK Techniques observed:** none — the source reports aggregate illicit inflows to DeFi protocols, bridges and mixers and describes no yield-strategy or receipt-token mechanism, so no laundering Technique page is matched.

**Attribution:** **unattributed** (aggregate figures from a blockchain-analytics firm, no named actor for DeFi).

**Key teaching point:** **Do not treat DeFi yield deposits as the main laundering exit on the strength of this source.** The Chainalysis report attributes the growth of illicit funds sent to DeFi mainly to DeFi's overall growth, and says DeFi's transparency generally makes it a poor choice for obfuscating fund movement ([Chainalysis](https://www.chainalysis.com/blog/2024-crypto-money-laundering/)). Per-position tracing of DeFi deposits is therefore still worth doing.

## Summary

The [Chainalysis 2024 crypto money laundering report](https://www.chainalysis.com/blog/2024-crypto-money-laundering/) gives these figures for 2023:

- Illicit inflows to mixers fell from \$1.0 billion in 2022 to \$504.3 million in 2023. It links much of the fall to law enforcement and regulatory action, including the sanctioning and shutdown of Sinbad in November 2023.
- Bridge protocols received \$743.8 million from illicit addresses in 2023, up from \$312.2 million in 2022.
- The share of illicit funds going to DeFi protocols grew, which the report attributes mainly to DeFi's overall growth. It gives no dollar figure for DeFi.
- The Lazarus Group moved to YoMix, a Bitcoin-based mixer whose inflows grew more than five-fold during 2023.

No page opened names a yield-strategy laundering incident, a protocol, a chain or a depositor. Two other files cover the pattern with their own claims, which this source does not support: [`examples/2024-01-post-tornado-defi-yield-laundering.md`](2024-01-post-tornado-defi-yield-laundering.md) and [`examples/2024-01-defi-bluechip-yield-laundering.md`](2024-01-defi-bluechip-yield-laundering.md).

## Timeline (UTC)

| When | What happened | OAK |
|---|---|---|
| 2022 | Illicit mixer inflows total \$1.0 billion; bridge inflows \$312.2 million ([Chainalysis](https://www.chainalysis.com/blog/2024-crypto-money-laundering/)) | — |
| 2023 | Illicit mixer inflows fall to \$504.3 million; bridge inflows rise to \$743.8 million ([Chainalysis](https://www.chainalysis.com/blog/2024-crypto-money-laundering/)) | — |
| 2023-11 | Sinbad mixer sanctioned and shut down, per the same report | response |
| 2023 (undisclosed) | Any individual yield-strategy laundering flow: entry, preparation, execution and fund movement undisclosed | — |
| 2024-02-15 | Chainalysis publishes the report (date as given in OAK's earlier citation, not shown on the opened page) | — |

## Root-cause evidence

- **Technique:** none
- **Source:** <https://www.chainalysis.com/blog/2024-crypto-money-laundering/>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** One analytics firm's aggregate figures. They show where illicit funds went by venue type. They do not establish a yield-strategy mechanism.

## Public references

- Chainalysis, "2024 Crypto Money Laundering": <https://www.chainalysis.com/blog/2024-crypto-money-laundering/>
