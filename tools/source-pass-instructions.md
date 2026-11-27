# Source pass on one OAK example: find the sources, compare, rewrite (agent brief)

OAK is a sourced knowledge base of crypto attacks; each incident is a file in
`examples/`. The file you are given cites little or nothing a reader can open:
its citations are `citations.bib` keys whose URL is a home page, a profile, a
placeholder, or a general report that is not about this incident. A previous
pass over 31 such files found a material error in every one (arrests no source
reports, returns of funds that did not happen, wrong mechanisms). Assume
nothing in the file is true until a page says it.

Read first: `.claude/skills/oak-write-example/SKILL.md` and its `template.md`,
and the section "Quotes and citations on worked examples" in `CONTRIBUTING.md`.

For each file, in this order:

1. **Find the sources.** Read the file. Search for the incident's own pages:
   the operator's statement or post-mortem first, then forensic firms, then
   news. Open each one. An X post is read through
   `https://api.fxtwitter.com/<user>/status/<id>`. A page that returns 403 or
   404, or that you saw only as a search snippet, is not a source. Never build
   a URL from a pattern. Aim for two to four opened pages.
2. **Compare.** Check the file's date, loss, chain, mechanism, attribution,
   recovery and every named party against the opened pages.
3. **Decide.**
   - If no opened page shows the incident happened as a real event, do not
     rewrite: leave the file untouched and report `no_record`.
   - If another file in `examples/` covers the same incident
     (`ls examples | grep -i <name>`), still rewrite yours, and report the
     sibling under open_questions with any claim in it the sources contradict.
   - Otherwise rewrite the file in place, keeping its filename.
4. **Rewrite** in the template's shape: title, Loss, OAK Techniques observed,
   Attribution, Key teaching point, Summary, `## Timeline (UTC)` with a
   Technique per row, Key addresses, `## Root-cause evidence`,
   `## Public references`.
   - Every factual sentence sits next to an inline link to the opened page
     that carries it. No `citations.bib` keys.
   - Where sources disagree, give both values with their sources.
   - Not public means "undisclosed". No times, function names, percentages,
     amounts, comparisons or cohort statistics that are not on an opened page.
   - Quotation marks only around words copied verbatim from an opened page.
   - Techniques: keep an ID only if the sourced mechanism matches its page in
     `techniques/` (read the page). If none fits, write
     `none — <one-line reason>`.
   - Attribution no stronger than the source. Do not name private individuals
     who are not charged, even if a source does.
   - Addresses and transaction hashes in full, linked to the explorer, and
     only those printed in full on an opened page.
   - `- **Source type:**` in Root-cause evidence takes exactly one of:
     government, independent-researcher, news, operator, security-firm.
   - A same-day third-party analysis is never Confidence `confirmed`.
5. Run `python3 tools/check_quotes.py examples/<file>`,
   `python3 tools/check_root_cause.py`, `python3 tools/check_tags.py` and
   `npx markdownlint-cli2 examples/<file>`; fix what they report for your file.
6. Edit only your files. No other file, no commit.

Final message, per file, as short plain text:
- `file`; `verdict` (rewritten | no_record); Technique IDs before → after;
- `changed`: the material claims changed or removed, old → new, with source;
- `could_not_open`: URLs that failed;
- `open_questions`: sibling files, wrong filename date, anything to decide.

Do not send anything about this repository or its owner to outside services
beyond the search queries needed.
