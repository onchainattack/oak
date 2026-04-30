<!--
Thanks for contributing to OAK. Fill in the sections below; delete any that don't apply.
See CONTRIBUTING.md for the full process and CODE_OF_CONDUCT.md for the contribution norms.
-->

## What this PR does

<!-- One or two sentences. -->

## Type

- [ ] New Technique (`techniques/Tn.NNN-*.md`)
- [ ] Tactic refinement (`tactics/Tn-*.md`)
- [ ] Technique improvement (description, detection signals, mitigations, citations)
- [ ] Reference-implementation mapping (added or updated row in a Technique's "Reference implementations" section)
- [ ] Real-world example (`examples/*.md`)
- [ ] Citation (`citations.bib`)
- [ ] Tooling (`tools/`, `.github/`)
- [ ] Documentation (README, CONTRIBUTING, COVERAGE, etc.)

## Linked issue

<!-- If this is a new Technique or non-trivial change, link the proposal issue (per CONTRIBUTING §"Submission flow"). -->

Closes #

## Checklist

- [ ] `npx markdownlint-cli2 "**/*.md"` passes locally.
- [ ] `python tools/check_citations.py` passes locally (every cited `[key]` resolves to a `citations.bib` entry).
- [ ] All citations in the changed pages point to public, verifiable sources.
- [ ] No links to live attacker infrastructure (forensic write-ups and post-mortems only).
- [ ] If this changes coverage status (full / partial / gap), `COVERAGE.md` is updated accordingly.
- [ ] Commits are signed-off (`git commit -s`) per the DCO.

## Coverage impact (if applicable)

<!--
If this PR moves a Technique between full / partial / gap, summarise:
- Which Technique
- From → to
- Why (calibration, new detector, retired detector)
- Whether COVERAGE.md is updated in this PR
-->

## Notes for reviewers

<!-- Anything reviewers should pay particular attention to — non-obvious calibration, contested example, edge cases. -->
