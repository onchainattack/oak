# Rewriting an OAK example from its real sources (agent brief)

A source pass found that the example you are given cites no page a reader can
open, and that several of its claims contradict the sources that do exist. Your
job is to rewrite that one file so that every statement in it is carried by a
page you opened yourself.

Read first: `.claude/skills/oak-write-example/SKILL.md` and its `template.md`,
and the section "Quotes and citations on worked examples" in `CONTRIBUTING.md`.

For each file:

1. Read the file, then its entry in the findings file you are pointed to. The
   entry lists source URLs (`src:`) and the claims already known to be wrong.
   Treat the entry as a lead, not as a source: open every URL yourself. X posts
   are read through `https://api.fxtwitter.com/<user>/status/<id>`. A page that
   returns 403 or 404 is not a source; do not cite it for a claim. You may
   search for further specific sources (operator statement first, then forensic
   firms, then news).
2. Rewrite the file in place, keeping its filename, in the template's shape:
   title, Loss, OAK Techniques observed, Attribution, Key teaching point,
   Summary, `## Timeline (UTC)` with a Technique per row, Key addresses (only
   those printed in full on a page you opened, each linked to its explorer),
   `## Root-cause evidence` with an honest Confidence, `## Public references`.
   - Every factual sentence ends with, or sits next to, an inline link to the
     page that carries it. No `citations.bib` keys; use inline URLs only.
   - Where sources disagree (loss figures, dates), give both with their source.
   - If a step is not public, write "undisclosed". Do not fill gaps. No times,
     function names, percentages or amounts that are not on an opened page.
   - Quotation marks only around words copied verbatim from an opened page.
   - Technique IDs: keep the ones that match the sourced mechanism; drop the
     ones that rested on the wrong mechanism; pick replacements only from
     `techniques/` (grep the directory; read the page before using an ID).
   - Attribution: no stronger than the source. Do not name private individuals
     who are not charged, even if a source or the project does.
   - Write addresses and transaction hashes in full, never shortened.
   - If a comparison, teaching point or cohort statistic in the old text has no
     source, remove it.
3. Run `python3 tools/check_quotes.py examples/<file>` and
   `npx markdownlint-cli2 examples/<file>`; fix what they report.
4. Do not edit any other file (no technique pages, no citations.bib, no
   ROADMAP, no CORRECTIONS). Do not commit.

Final message, per file, as plain text:
- `file`, the Technique IDs before and after,
- `changed`: each claim you changed or removed, old → new, with the source URL,
- `could_not_open`: URLs that failed,
- `open_questions`: anything a maintainer must decide (for example a sibling
  file that covers the same incident, or a filename whose date is wrong).
