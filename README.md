<p align="center">
  <img src="./public/oak-banner.svg" alt="OAK — OnChain Attack Knowledge" width="100%"/>
</p>

# OAK — OnChain Attack Knowledge

> *A common language for on-chain adversary behavior.*

OAK is an open, vendor-neutral knowledge base of adversary **Tactics** and **Techniques** observed against on-chain assets — tokens, liquidity, custody, and the wallets and protocols that interact with them. The threat surface is fundamentally different from traditional IT infosec: public-ledger finality, anonymous adversaries, money-and-laundering as the primary objective, smart-contract code as the attack surface, no patchable endpoints. OAK exists because crypto needs vocabulary built for crypto's threat model, not borrowed from elsewhere.

**Current state:** see [`STATS.md`](./STATS.md) for live counts (auto-generated on every build). **Schema versioning + content-snapshot model:** see [`VERSIONING.md`](./VERSIONING.md). **Coverage gaps and contributor backlog:** see [`BACKLOG.md`](./BACKLOG.md). **Open structural questions:** see [`TAXONOMY-AUDIT.md`](./TAXONOMY-AUDIT.md).

## Why OAK exists

On-chain attackers reuse a small, finite set of Tactics — but the security, research, and on-chain-monitoring communities lack a shared vocabulary to describe them. Investigators, vendors, and risk teams each use their own terminology; coverage claims are not comparable across products; and academic findings rarely transfer cleanly to operational defense.

OAK provides a stable identifier system (`OAK-Tn` for Tactics, `OAK-Tn.NNN` for Techniques) so that:

- Investigators can attribute findings unambiguously.
- Vendors can map their detectors to specific Techniques and publish honest coverage matrices.
- Risk teams can specify procurement requirements (e.g. "must cover OAK-T5.001 and OAK-T11.001").
- Researchers can cite a stable reference instead of redefining terms in every paper.
- AI agents and LLMs (via [`oak-mcp`](https://github.com/onchainattack/oak-mcp)) can ground crypto-attack reasoning in a stable taxonomy.

## Scope

OAK covers the operator-behaviour kill chain plus the on-chain realisation surface:

| Tactic | Phase |
|---|---|
| **T1 — Token Genesis** | Pre-launch / launch |
| **T2 — Liquidity Establishment** | Launch |
| **T3 — Holder Capture** | Launch / growth |
| **T4 — Access Acquisition** | Targeted compromise |
| **T5 — Value Extraction** | Realization |
| **T6 — Defense Evasion** | Cross-cutting |
| **T7 — Laundering** | Post-extraction |
| **T8 — Operator Continuity / Attribution** | Post-extraction |
| **T9 — Smart-Contract Exploit** | Realization |
| **T10 — Bridge / Cross-Chain** | Targeted compromise |
| **T11 — Custody / Signing Infrastructure** | Targeted compromise |
| **T12 — NFT-Specific Patterns** | Realization |
| **T13 — Account Abstraction** | Targeted compromise |
| **T14 — Validator / Staking / Restaking** | Targeted compromise |
| **T15 — Off-chain Entry-Vector / Pre-Positioning** | Pre-positioning |
| **T16 — Governance / Voting Manipulation** | Realization |
| **T17 — Market Manipulation** | Realization (cross-asset / market-mechanism) |

Seven populated axes:

- **[Tactics](./tactics/) × [Techniques](./techniques/)** — the matrix.
- **[Mitigations](./mitigations/)** — reusable defences (`OAK-MNN`), many-to-many with Techniques, classed as detection / architecture / operational / venue / wallet-UX / financial-recovery.
- **[Software](./software/)** — named tools, drainer kits, and malware families (`OAK-SNN`).
- **[Threat Actors](./actors/)** — operator clusters (`OAK-Gnn`) with explicit attribution-strength language.
- **[Data Sources](./data-sources/)** — telemetry inputs (`OAK-DS-NN`) — what defenders need to ingest.
- **[Worked examples](./examples/)** — per-incident write-ups spanning 2014–present, each anchored to ≥ 1 Technique with attribution-strength labels (`confirmed` / `inferred-strong` / `inferred-weak` / `pseudonymous` / `unattributed`).
- **[Detection Specs](./specs/)** — vendor-neutral, language-agnostic YAML specs (one per Technique) carrying detection logic as orthogonal `PATH A / PATH B / ...` pseudocode plus `data_sources`, `parameters`, `test_fixtures`, `false_positive_modes`, `mitigations` cross-refs, and `reference_implementations`. **100% coverage at v0.1: 98 specs / 98 Techniques / 17 Tactics.** Sigma+ATT&CK-shape, not Atomic Red Team — the specs are the primary detection artefact and are language-/runtime-portable; named reference implementations are secondary demos.

Plus a machine-readable relationship graph in [`tools/oak.json`](./tools/oak.json) and a [STIX 2.1 export](./tools/oak-stix.json).

## Maintenance and CI

OAK ships with a maintenance kit so contributors can validate locally and CI can catch drift. See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the full local-checks block. Headline tools:

| Tool | Purpose |
|---|---|
| `tools/check_citations.py` | Every cite-key reference inside backticks resolves to a `citations.bib` entry. |
| `tools/check_linkage.py` | Forward references + worked-example structural completeness. |
| `tools/check_backlinks.py` | Reverse anchors + bidirectional consistency between actors / techniques and their referencing examples. |
| `tools/check_known.py` | Pre-flight duplicate check before researching a candidate incident. |
| `tools/check_targets.py` | Per-Tactic minimum-coverage floor enforcement. |
| `tools/build_stats.py` | Single-page corpus snapshot (regenerates [`STATS.md`](./STATS.md)). |
| `tools/build_backlog.py` | Prioritized contributor backlog (regenerates [`BACKLOG.md`](./BACKLOG.md)). |
| `tools/build_coverage_matrix.py` | Year × Tactic × attribution heat-map. |
| `tools/suggest_backlinks.py` | Paste-ready bullets for actor / technique anchor-section population. |
| `tools/source_diversity.py` | Citation-publisher distribution audit. |
| `tools/export_json.py` / `export_stix.py` | Machine-readable exports. |

CI runs `citation-format`, `markdown-lint`, `link-check`, `validate-export`, and `structure-validate` on every PR. See [`.github/workflows/`](./.github/workflows/).

## Website

OAK ships a Vite + React static website (the Markdown corpus stays the source of truth):

```bash
npm install
npm run dev    # http://localhost:5173
npm run build  # writes dist/ for GitHub Pages
```

`npm run site:data` regenerates `tools/oak.json`, `tools/oak-stix.json`, `tools/stats.json`, `STATS.md`, `BACKLOG.md`, `src/data/generated.ts`, `public/sitemap.xml`, and the `<meta og:description>` count line in `index.html` from the Markdown sources.

The [`deploy-pages`](./.github/workflows/deploy-pages.yml) workflow publishes `dist/` to `onchainattack.org` on every push to `main`. Direct URLs work via the GitHub-Pages 404.html SPA-redirect trick.

## License

OAK is dual-licensed:

- **Knowledge content** in `tactics/`, `techniques/`, `examples/`, `actors/`, `mitigations/`, `software/`, `data-sources/`, and `citations.bib` is licensed under [Creative Commons Attribution-ShareAlike 4.0 International (CC-BY-SA 4.0)](./LICENSE-content). You may reuse, adapt, and redistribute, including commercially, provided you attribute and share derivatives under the same license.
- **Tooling code** in `tools/`, `scripts/`, `.github/`, `src/`, and any build / validator scripts is licensed under the [MIT License](./LICENSE-code).

The OAK word mark and logo are trademarks of the OAK project maintainers; trademark filings are in progress.

## Contribute

OAK accepts new Techniques, Tactic refinements, real-world examples, and Reference-implementation mappings via pull request. See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the submission process and the local-validators block. Before researching a candidate incident, run `python3 tools/check_known.py "<description>"` to avoid duplicating existing coverage.

Three strategy documents shape the contribution rhythm:

- [`COVERAGE-TARGETS.md`](./COVERAGE-TARGETS.md) — per-Tactic minimum-coverage floors enforced by `tools/check_targets.py`.
- [`RESEARCH-CADENCE.md`](./RESEARCH-CADENCE.md) — monthly / quarterly / annual research rhythm.
- [`BACKLOG.md`](./BACKLOG.md) — auto-regenerated prioritized contributor backlog.

## Reference implementations

| Implementation | Coverage | Status |
|---|---|---|
| [`mg-detectors-rs`](https://github.com/MeatGrinder-MG/mg-detectors-rs) | First reference implementation in Rust; open-core, Apache 2.0 | Tracking current schema |

Other vendors (GoPlus, RugCheck, Chainalysis, TRM Labs, MetaSleuth, Beosin, Cyvers, Match Systems, BlockSec, SlowMist, PeckShield, Halborn, Trail of Bits, OpenZeppelin Defender, etc.) are openly invited to publish their own OAK coverage maps and submit Reference-implementation entries via PR. Per-Technique coverage status is tracked in [`COVERAGE.md`](./COVERAGE.md).

## AI integration — `oak-mcp`

[`oak-mcp`](https://github.com/onchainattack/oak-mcp) is a Model Context Protocol server that exposes the OAK corpus as queryable tools for AI coding agents (Claude Desktop, Cursor, Cline, Zed, and any other MCP-aware environment). One-line install via `npx`; embedded snapshot ships with each release for offline use.

```json
{
  "mcpServers": {
    "oak": { "command": "npx", "args": ["-y", "@onchainattack/oak-mcp"] }
  }
}
```

Tool surface: `oak_search`, per-axis getters (`oak_get_technique` / `oak_get_tactic` / `oak_get_mitigation` / `oak_get_software` / `oak_get_group`), relationship queries (`oak_find_mitigations_for_technique`, `oak_find_software_for_technique`, `oak_find_relationships`), and corpus introspection (`oak_list_techniques`, `oak_dataset_info`). See `oak-mcp` README for client-specific config snippets.

## Honest scope and prior art

Crypto's threat surface is not a subset of traditional IT infosec. Public-ledger finality means lost funds are unrecoverable without operator-side action; adversaries are pseudonymous-by-default with money-and-laundering as the primary objective; smart contracts are the attack surface and there is no patchable endpoint; the laundering rails (mixers, bridges, privacy chains, CEX deposit-address layering, NFT wash-trading) are themselves part of the attack chain. Existing IT-security frameworks describe corporate-network adversary behaviour and adapt poorly. OAK is purpose-built for this segment.

The closest existing framework adjacent to OAK is **OWASP Smart Contract Top 10** — which occupies the contract-vulnerability layer and is **complementary**, not overlapping. OAK overlaps with it directly only at T9 (Smart-Contract Exploit); the cross-walk lives at [`CROSSWALK.md`](./CROSSWALK.md). See [`PRIOR-ART.md`](./PRIOR-ART.md) for the broader landscape (academic SoK literature, industry intelligence sources from Chainalysis / TRM Labs / SlowMist / EigenPhi / Elliptic / Halborn / Trail of Bits).

## Maintainer

Initial author and curator: **Dmytro Chystiakov** ([@iZonex](https://github.com/iZonex)).

Co-maintainers will be invited from the contributor community as the framework matures.

## Status

Live framework. Content evolves daily; schema and per-item maturity advance per [`VERSIONING.md`](./VERSIONING.md). Current snapshot counts: [`STATS.md`](./STATS.md). Recent changes: [`CHANGELOG.md`](./CHANGELOG.md).
