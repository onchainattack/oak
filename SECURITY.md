# Security Policy

OAK documents adversarial behaviour against on-chain assets. This file covers two distinct concerns:

1. **Vulnerabilities in OAK itself** (the repository, the validator scripts in `tools/`, the build pipeline) — handled like any open-source project.
2. **Sensitive disclosures** about specific live incidents, threat-actor infrastructure, or non-public examples that you would like to share with maintainers off-list.

## Vulnerabilities in OAK itself

If you find a security issue in:

- the validator code in `tools/`,
- the GitHub Actions workflows,
- the build / lint configuration,

…please report it by emailing **`security@onchainattack.org`** (subject prefix: `[OAK-SEC]`). Do not open a public issue.

We commit to:

- Acknowledge receipt within **3 calendar days**.
- First substantive response within **7 calendar days**.
- Credit reporters in the fix's release notes if they wish.

For low-severity issues (lint mis-config, broken link, CI failure), a regular issue or PR is fine.

## Sensitive disclosures about specific incidents

OAK is a public knowledge base. Real-world examples in `examples/` reference **public, verifiable** incidents only — public forensic write-ups, public on-chain transactions, public post-mortem reports, public OFAC / law-enforcement actions.

If you would like to share with maintainers:

- An incident that has not yet been publicly disclosed,
- An attribution that contains non-public information (e.g., from a private investigation),
- Evidence of an active campaign you do not want to publicise yet,

…please contact **`security@onchainattack.org`** (subject prefix: `[OAK-INTEL]`). The maintainers will not publish anything from such reports without explicit coordination with you and any relevant affected parties.

OAK does **not** accept reports that link to live attacker infrastructure (active drainer kits, live mixer front-ends, recoverable C2). When citing examples, link forensic write-ups, post-mortems, or OFAC notices instead.

## What is out of scope

- Vulnerabilities in third-party tools mentioned in OAK (`mg-onchain-analysis`, `mg-detectors-rs`, GoPlus, RugCheck, etc.) — report to the respective maintainers.
- Vulnerabilities in specific tokens or protocols described in OAK examples — report to the respective project teams.
- Vulnerabilities in your own deployments of detectors that cite OAK Techniques — report to the relevant detector vendor.

## Updates

This policy is versioned with the repository. Material changes (e.g., a maintainer-team contact replacing the single-maintainer email) will be reflected in the CHANGELOG and the v0.x bump notes.
