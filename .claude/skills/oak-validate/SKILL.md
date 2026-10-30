---
name: oak-validate
description: Run OAK's validators and explain and fix what fails — npm run check, check_timeline, check_root_cause, check_flow, check_sourcing, check_backlinks, markdownlint. Use when a check fails, CI is red, or before committing changes to examples, techniques or actors.
argument-hint: "[examples/file.md]"
allowed-tools: Read Edit Bash(npm run check) Bash(npm run site:data) Bash(python3 tools/*) Bash(npx markdownlint-cli2 *)
---

# Validate OAK changes

Target: $ARGUMENTS (a single file, or the whole repo if empty).

- **One file:** run `python3 tools/check_timeline.py --file <f>`, `python3 tools/check_root_cause.py --file <f>`, `python3 tools/check_flow.py --file <f>`, then `npx markdownlint-cli2 <f>`.
- **Whole repo:** run `npm run site:data`, then `npm run check`. `site:data` rebuilds `oak.json`, `STATS.md`, `SPECS.md` and the site data, and some checks read those.

## Common failures and their fixes

| Message | Fix |
|---|---|
| `shortened address/hash 0x…` | Write the full value with an explorer link. If no cited source has it, `tools/explorer.py tx <chain> <hash>` often shows it on-chain. If it truly isn't published, add "(full address not published)" on that line. |
| `missing ## Timeline` / `<3 rows` | Add the end-to-end table: entry, preparation, execution, funds, response. Write "undisclosed" for stages that aren't public. |
| `Technique … not declared in **OAK Techniques observed:**` | Add the Technique to the Techniques line with a one-clause reason a source supports, or remove it from the table. |
| `root-cause Technique … does not appear in the ## Timeline` | Put that Technique on the row where the mechanism happens. |
| `confidence 'confirmed' requires source type operator or government` | Downgrade to `corroborated` (two sources) or `reported`. |
| `oak-flow …` errors | Check the role enum, full-length address or tx, that every edge's `from`/`to` matches a node `id`, that `verified: oak` has a `tx`, and that `verified: source` uses a citekey from Public references. |
| `ACTOR BACKLINK ISSUES` | Add the example under `## Observed Examples` on the actor page. |
| unsourced example (`check_sourcing`) | Add a cited URL in Public references. Never commit an unsourced example. |
| MD049 emphasis style | Use `_x_` instead of `*x*` in ROADMAP and docs. |

`link-check` in CI is pre-existing red and does not block deployment.

Never weaken a checker to make a file pass. Fix the file, or if the rule is wrong, change the rule deliberately and record why in ROADMAP.
