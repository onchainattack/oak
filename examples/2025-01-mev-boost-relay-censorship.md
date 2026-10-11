# MEV-Boost relay censorship and OFAC-compliance validator concentration — Ethereum — 2025

**Loss:** structural — ongoing censorship of Ethereum transactions by OFAC-compliant MEV-Boost relays and validators, with the OFAC-censoring relay share of MEV-Boost blocks having peaked at roughly 79–80% of blocks around 2022-11-21 (MEV Watch data, per The Block and Cointelegraph) and fell to about 27% by May 2023 as non-censoring relays (Ultra Sound, Agnostic) gained over 60% of validators; later shares are not verified here; the exact 2024-2025 share is not verified in this file. The loss is measured in delayed or excluded transactions (including Tornado Cash-linked transactions and OFAC-sanctioned addresses) rather than in direct dollar extraction.
**OAK Techniques observed:** **OAK-T14.002** (MEV-Boost Relay Attack — broadly construed as relay-level transaction censorship; the MEV-Boost relay's ability to selectively include or exclude transactions based on regulatory compliance status constitutes a relay-level censorship attack on the validator set's transaction-inclusion guarantees). The case is the structural/cohort anchor for the *relay-censorship* sub-pattern of T14.002, distinct from the *relay-equivocation* sub-pattern (`examples/2023-mev-boost-equivocation.md`) and the *validator-sandwich-MEV* sub-pattern (`examples/2024-06-solana-validator-sandwich-mev-cohort.md`) + **OAK-T14.005** (Builder-Censorship MEV Extraction).
**Attribution:** **unattributed** (structural / infrastructure-level — not attributable to a specific operator; the censorship is a systemic property of the MEV-Boost relay market where OFAC-compliant relays are the dominant relay operators).
**Key teaching point:** **MEV-Boost relay concentration creates a validator-level censorship surface.** When a large share of validators connect to OFAC-compliant MEV-Boost relays, the relay operators' regulatory compliance requirements propagate into transaction-level censorship at the Ethereum block-production layer, even though no individual validator is deliberately censoring transactions. The case is the canonical 2025 T14.002 structural example.

**Corrected 2026-10-11:** The unverified "30-40% of blocks" figure was replaced with a hedged statement (peak ~79–80% in November 2022, ~27% by May 2023; a first correction pass wrote "above 90%", also unsourced, re-corrected the same day), and the Tornado Cash OFAC sanction date was corrected to 2022-08-08 (not 2022-11); an unfound inclusion-list link remains unreferenced.

## Summary

Since Ethereum's transition to proof-of-stake (September 2022) and the subsequent adoption of MEV-Boost for validator block production, the MEV-Boost relay market has concentrated around a small number of OFAC-compliant relay operators. Through 2024-2025, a still-material but declining share of MEV-Boost blocks continued to be delivered by OFAC-compliant relays that exclude transactions involving Tornado Cash and other OFAC-sanctioned addresses. The censorship is structural — validators connecting to OFAC-compliant relays receive blocks that have been pre-filtered, and the validator set's distributed architecture does not provide a mechanism for individual validators to override relay-level censorship decisions.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-09 | Ethereum transitions to PoS; MEV-Boost relay market emerges | (substrate) |
| 2022-08-08 | OFAC sanctions Tornado Cash; major relays begin filtering OFAC-sanctioned addresses around the Merge | T14.002 (trigger) |
| 2023-2024 | Relay market diversifies; OFAC-compliant relay share falls from its 2022 peak (exact values unverified) | T14.002 (persistence) |
| 2025 | Censorship-resistance research (inclusion lists, ePBS) continues; OFAC-compliant relay share persists at a reduced level | **T14.002** (ongoing) |

## Public references

- `[theblockofac2023]` — The Block, "Ethereum's OFAC-compliant blocks fall to 27%, marking a drop in potential for protocol-level censorship" (2023-05-10): <https://www.theblock.co/news/ecosystems/2023-05-10-ethereums-ofac-compliant-blocks-fall-to-27-marking-a-drop-in-protocol-level-censorship-230179>
- `[cointelegraphofac2023]` — Cointelegraph, "OFAC-compliant blocks on Ethereum hits three-month low of 47%": <https://cointelegraph.com/news/ofac-compliant-blocks-on-ethereum-hits-three-month-low-of-47>
- `[mevwatch2026]` — MEV Watch (Labrys), "Methodology" (2026-10-11): <https://www.mevwatch.info/methodology> (live dashboard of OFAC-censoring relay share; methodology caveat: per-relay delivery share, not exact block count)

## Discussion

The 2025 MEV-Boost relay censorship case is included as the structural T14.002 anchor for 2025, documenting the ongoing relay-censorship sub-pattern. The case complements the relay-equivocation case (`examples/2023-mev-boost-equivocation.md`, T14.002 equivocation sub-pattern) and the SSV Network mass-slashing case (`examples/2025-09-ssv-network-mass-slashing.md`, T14.001 slashing sub-pattern) to span the T14 validator/staking attack surface across sub-techniques. The case closes the T14×2025 near-threshold gap at v0.1.
