# Addendum to `source-pass-instructions.md` (batches from 2026-11-27 on)

Read `tools/source-pass-instructions.md` first and follow it. These points add to it.

- **These files have one real source.** It may be the true primary (an X thread,
  a press release) or a general report that is not about the incident. Open it
  first, then find one to three more pages. Read an X post through
  `https://api.fxtwitter.com/<user>/status/<id>`; cite each post of a thread by
  its own URL.
- **Is it an attack at all?** OAK records attacks on crypto users and systems.
  If the opened pages describe no theft, fraud, exploit, laundering or market
  manipulation involving crypto (a product launch, a design risk, a policy
  debate, a non-crypto case), still rewrite the file to what the pages say, set
  Techniques to `none — <reason>`, and report verdict `no_attack`.
- **Cohort and year-only files.** Check every named member against an opened
  page. If the member has its own file (`ls examples | grep -i <name>`), link to
  it and do not retell it. Drop members with no record. Remove totals, counts,
  percentages and comparisons that no opened page carries. If fewer than two
  sourced members remain, report `no_cohort` (and which sibling the remainder
  belongs in).
- **People.** Investigator threads often name individuals. Name a person only
  if an opened page shows they are charged, sued, sanctioned or convicted, or
  it is the public name of a company officer acting in that role. Otherwise
  describe the role. A pseudonymous handle the person uses publicly may stay
  when the incident cannot be described without it.
- **Techniques.** OAK-T16.003 is deprecated; do not declare it. A Technique ID
  written anywhere in the `**OAK Techniques observed:**` line counts as
  declared by OAK's tools, so when you reject a Technique, name it in words
  without its ID.
- **Blocked pages.** Do not spoof a browser user agent or otherwise work
  around a 403/429. `check_quotes.py` cannot read The Block, CoinDesk or
  Medium; if a quote rests only on such a page, drop the quotation marks and
  relay it.
- Final message: the per-file report from the brief, with verdict one of
  rewritten | no_record | no_attack | no_cohort.
