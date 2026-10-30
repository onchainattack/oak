---
name: oak-write-example
description: Write a new OAK incident file in examples/, or complete an existing one, from cited sources only, following OAK's example template (title, Loss, Techniques observed, Attribution, teaching point, Summary, Timeline with key addresses, Fund flow, Root-cause evidence, Public references). Use when adding an incident, filling a missing timeline or section, or rewriting an example after a correction.
argument-hint: "<incident name or examples/file.md> [source URLs ...]"
allowed-tools: Read Write Edit Grep Glob WebFetch Bash(curl -s https://api.fxtwitter.com/*) Bash(python3 tools/*)
---

# Write or complete one OAK example

Target: $ARGUMENTS

Read `template.md` in this skill's folder for the exact skeleton. The format rules live in `CONTRIBUTING.md`; the reference file is `examples/2026-10-binance-devops-laptop-service-container-hot-wallet-drain.md`.

## Before writing

1. **Is it already in OAK?** Run `python3 tools/check_known.py "<name>"`. A STRONG_MATCH often fires on name overlap alone, so open the matched file before you decide it is a duplicate.
2. **Read every source yourself.** For X posts, fetch `https://api.fxtwitter.com/<user>/status/<id>`; long posts are in `.tweet.article`. Prefer the operator's statement or post-mortem, then forensic firms such as SlowMist, Defimon, ExVul, Blockaid, PeckShield, Phalcon and CertiK, then news.
3. **Pick the Technique(s).** Search `techniques/` for the mechanism, not the incident name. The primary Technique is the one whose control would have stopped it. If nothing fits, say so and propose an entry in `TAXONOMY-GAPS.md`. Never force a fit.

## Writing rules

- **Facts come only from cited sources** or from your own on-chain check (`tools/explorer.py`, marked "traced by OAK"). If a stage is not public, write "undisclosed".
- **Write addresses and tx hashes in full**, linked to the explorer for their chain (see `tools/chains.json` for URL templates). Never shorten them. If a source gives only a short form, keep it and add "(full address not published)".
- **Timeline (UTC):** cover entry → preparation → execution → where the funds went → response. Each row carries a Technique, `response` or `—`. Put Key addresses after the table, one per role.
- **Root-cause evidence:** use the operator or a government source for `confirmed`, two independent sources for `corroborated`, one non-operator source for `reported`. A same-day third-party analysis is never `confirmed`.
- **Attribution** carries a strength label: confirmed, inferred-strong, inferred-weak, pseudonymous or unattributed. Analytics firms' attributions are reported as theirs.
- **Keep it neutral.** Write about mechanism and prevention. Do not name private individuals who are not charged. Fund disposition (returned, laundered) is a fact, not a verdict.
- Escape dollar signs as `\$`. Use plain, concrete English with no hype.
- **Fund flow:** required for examples dated 2026-11 or later. Use the `oak-trace-funds` skill to fill it.

## After writing

Run each of these:

1. `python3 tools/check_timeline.py --file <file>`
2. `python3 tools/check_root_cause.py --file <file>`
3. `python3 tools/check_flow.py --file <file>`
4. `npx markdownlint-cli2 <file>`

Then add the example to its primary Technique page under `### Additional incidents`. Also add it to the actor page's `## Observed Examples` if it is attributed to an OAK-Gnn actor. `npm run check` enforces both backlinks.

**Mitigation, required from 2026-11:** on the primary Technique page, make sure `## Mitigations` has a bullet under `### What would have stopped the <year> cases`. The bullet says what control, how it is enforced (where it sits so the compromised component cannot switch it off) and why, meaning which step of *this* incident it breaks, with a link to the example. If no existing OAK-Mnn fits, propose a new mitigation file in the same what/how/why form (see `mitigations/OAK-M49-*`). Generic advice does not count. See CONTRIBUTING, "Mitigations: what, how, why". `python3 tools/check_mitigations.py` checks it.
