---
name: Coverage update
about: Update Reference-implementation coverage for an existing Technique
title: "[Coverage] <implementation> covers <OAK-Tn.NNN>"
labels: ["coverage"]
assignees: []
---

<!--
Use this template to propose a Reference-implementation row for an existing
Technique, or to update an existing row's coverage status. Vendors are
encouraged to self-attest using this template; the v0.1 matrix is
single-implementation and will expand with each accepted PR.
-->

## Reference implementation

<!-- Name of the tool / dataset / vendor. Include link. -->

## Technique

<!-- OAK-Tn.NNN identifier. -->

## Coverage status (proposed)

- [ ] **full** — calibrated thresholds + tests against known-positive incidents
- [ ] **partial** — covers under restricted conditions; gaps documented below
- [ ] **gap** — Technique named but production-grade detection not yet implemented

## How the implementation covers it

<!-- 1–2 paragraphs: data sources, methodology, calibration approach. -->

## Public verifiability

<!-- Link to docs, source, or a write-up that lets reviewers independently verify the claim. Self-attestation without verifiability is downgraded to "self-attested" in the matrix. -->

## Affects COVERAGE.md?

- [ ] Yes — `COVERAGE.md` will be updated in the corresponding PR.
- [ ] No — this is a new sub-row; no aggregate change.

## Conflict-of-interest disclosure

<!-- If you are a maintainer or employee of the implementing vendor, say so here. Doesn't disqualify the submission; we just record it. -->
