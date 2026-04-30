# OAK Data Sources

OAK's fourth top-level axis, alongside Tactics (`tactics/`), Techniques (`techniques/`), and Threat Actors (`actors/`). A **Data Source** is a stable identifier for a class of telemetry that detection and forensic methodologies depend on — analogous to MITRE ATT&CK's Data Sources axis (Process: Process Creation, Network Traffic: Network Connection Creation, etc.).

OAK introduces this axis at v0.1 because the per-Technique "Detection signals" sections answer *what to look for* but do not aggregate *what telemetry a defender needs* across the framework. With Data Sources as a separate axis, a risk team or detector vendor can answer "do we have the telemetry to detect OAK-T9.001?" by checking the Data Sources the Technique references (rather than re-deriving it from the Detection signals prose).

## Identifier scheme

- Data Source IDs use the format `OAK-DS-NN` (two-digit), parallel to `OAK-Tn` for Tactics and `OAK-Gnn` for Groups.
- IDs are stable for v0.x; deprecated entries remain in the directory with pointers to superseding entries.
- IDs are never reused.

## Per-Data-Source page structure

Each Data Source page follows this template:

```markdown
# OAK-DS-NN — <Data Source Name>

**Layer:** on-chain | mempool | off-chain (CTI / hosting / DNS / etc.)
**Chains:** EVM | Solana | Bitcoin | cross-chain
**Typical access path:** RPC node | block explorer | indexer | private mempool | CTI feed | exchange compliance API

## Description
1–2 paragraphs.

## What data
Bullet list of the specific events / fields / records included.

## Where defenders access it
RPC method, indexer query, vendor API, etc.

## Techniques that depend on this Data Source
- OAK-Tn.NNN — short note on how this DS supports the Technique's detection
- ...

## Maintainer notes
Operational considerations: latency, completeness, cost, vendor dependencies.
```

## Relationship to per-Technique "Detection signals"

The per-Technique Detection signals sections describe *what pattern to look for* and *how to interpret it*. The Data Sources axis describes *what telemetry the pattern requires* and *how to obtain it*. The two are complementary — Detection signals are the *how* and Data Sources are the *what (telemetry)*. Per-Technique pages will progressively add explicit `Data Sources:` references in their headers across v0.x updates; v0.1 introduces the axis without backfilling every Technique.

## v0.1 Data Sources in this directory

On-chain telemetry:
- [`OAK-DS-01-token-deployment.md`](./OAK-DS-01-token-deployment.md) — token deployment events and bytecode metadata.
- [`OAK-DS-02-lp-pool-events.md`](./OAK-DS-02-lp-pool-events.md) — DEX pool creation, liquidity-add, liquidity-remove events.
- [`OAK-DS-03-erc20-approvals.md`](./OAK-DS-03-erc20-approvals.md) — `Approval` events on ERC-20 token contracts.
- [`OAK-DS-04-permit-signatures.md`](./OAK-DS-04-permit-signatures.md) — EIP-2612 / Permit2 off-chain signed payloads consumed in on-chain transactions.
- [`OAK-DS-05-oracle-price-feeds.md`](./OAK-DS-05-oracle-price-feeds.md) — oracle price-update events and oracle-input venue trades.
- [`OAK-DS-06-mint-burn-events.md`](./OAK-DS-06-mint-burn-events.md) — token mint and burn events.
- [`OAK-DS-07-trade-swap-events.md`](./OAK-DS-07-trade-swap-events.md) — DEX swap events and aggregator routing flows.
- [`OAK-DS-08-bridge-validator-messages.md`](./OAK-DS-08-bridge-validator-messages.md) — bridge validator messages, VAAs, threshold-signing events.
- [`OAK-DS-09-funder-graph.md`](./OAK-DS-09-funder-graph.md) — derived data: per-address funding-source graph computed from raw transfer events.
- [`OAK-DS-10-cross-chain-bridge-flows.md`](./OAK-DS-10-cross-chain-bridge-flows.md) — cross-chain swap and bridge inflows/outflows.

Mempool / pre-block telemetry:
- [`OAK-DS-11-mempool-orderflow.md`](./OAK-DS-11-mempool-orderflow.md) — pending transactions and pre-block order flow.

Off-chain telemetry:
- [`OAK-DS-12-off-chain-cti.md`](./OAK-DS-12-off-chain-cti.md) — off-chain CTI feeds (phishing campaigns, DNS / hosting changes, social-engineering campaigns).

## Roadmap

Additional Data Sources in v0.x: Governance events as a standalone DS (currently partially under DS-07); per-protocol invariant state snapshots; CEX deposit-address attribution feeds; sanctions-list designations as a standalone DS. Targeted in v0.x updates as the ecosystem of stable telemetry feeds matures.

## License and use

Data Source entries are CC-BY-SA 4.0 like the rest of OAK content. Vendor-specific access methods named in per-DS pages are not endorsements; they are listed because they are the canonical access paths at v0.1.
