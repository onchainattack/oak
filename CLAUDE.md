# OAK — working rules for Claude

OAK (onchainattack.org) is a sourced knowledge base of crypto attacks. Each real incident lives in `examples/*.md` and is mapped to attack Techniques (`techniques/`), actors (`actors/`) and mitigations. The goal is that a defender can replay any incident from OAK alone: every step is a known Technique, and the money can be followed hop by hop.

## The principle

Every entry must be usable by a defender **in minutes, not after a day of research**. From any incident or Technique page a reader gets what happened and at which step, which control would have stopped it and how to check their own system for it, and which addresses to watch. OAK grows by **rules first, volume second**: each rule goes into CONTRIBUTING, this file, the skills, and an `npm run check` gate, with a legacy report for older entries.

## Non-negotiables

- **Sourced facts only.** Every claim traces to a cited source, or to OAK's own on-chain trace (`verified: oak`). If a step is not public, write "undisclosed"; never fill it in.
- **Never shorten an address or tx hash.** Write it in full and link it to the explorer. Lookalike addresses are a live attack: around the Binance theft, poisoning bots used `0x8537…0543d4` to imitate `0x8532…0543d4`.
- **End to end.** Every single-incident example has a `## Timeline (UTC)` that covers entry → preparation → execution → where the funds went → response, with a Technique per step. Examples dated 2026-11 or later also have a `## Fund flow` oak-flow block.
- **Root cause is evidenced.** `## Root-cause evidence` says which source established the mechanism and how settled it is. A same-day third-party analysis is never `confirmed`.
- **Neutral framing.** Document mechanism and prevention. Attacker identity and fund disposition (returned, laundered, burned) are metadata; they do not make an incident more or less of an attack. Don't name private individuals who are not charged.
- **Mitigations say what, how and why.** Each one names a concrete control, where it is enforced, and the real incident (linked) it would have stopped. No generic advice.
- **Lean means less ceremony, not less content.** Don't drop timelines, addresses or fund flow to save time.

## How work lands

- Commit straight to `main`; no PRs. Put the reasoning in the commit message.
- Update `ROADMAP.md` in the same commit: Log entry (what, commit, why); Next if priorities change.
- Before committing: `npm run site:data`, then `npm run check` (must print "All checks passed."). The `link-check` CI job is pre-existing red and not blocking.
- Corrections to existing entries are logged in `CORRECTIONS.md`.

## Which tool for which job

| Job | Use |
|---|---|
| Collect new incidents for a period | skill `oak-sweep` |
| Write or complete one incident file | skill `oak-write-example` (agent: `oak-example-writer`) |
| Follow the money on-chain, fill `## Fund flow` | skill `oak-trace-funds` (agent: `oak-fund-tracer`), CLI `tools/explorer.py` |
| Read a source and extract claims | agent `oak-source-reader` |
| Find out why a check fails | skill `oak-validate` |

Fan-out work goes to Sonnet or Haiku agents. Judgment, review and the commit stay in the main session. Read X posts via `https://api.fxtwitter.com/<user>/status/<id>`.

## Reference files

- `CONTRIBUTING.md`: every format rule (root-cause evidence, timeline, fund flow, templates).
- `examples/2026-10-binance-devops-laptop-service-container-hot-wallet-drain.md`: the reference example, with a full timeline, key addresses, a dated funds snapshot, open questions, and a fund flow traced by OAK.
- `ROADMAP.md`: what is next and why.
