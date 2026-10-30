---
name: oak-sweep
description: Collect every crypto hack, exploit or scam in a date range that OAK does not have yet and add sourced examples for them — the periodic or month-end sweep ("собрать всё что ломали", "что взломали за месяц", "обнови базу"). Use when asked to sweep, catch up on recent incidents, or update OAK with the latest attacks.
argument-hint: "[from YYYY-MM-DD] [to YYYY-MM-DD]  (default: since the last sweep in ROADMAP.md)"
disable-model-invocation: false
---

# OAK incident sweep

Range: $ARGUMENTS. If no range is given, start from the date of the last sweep entry in the `ROADMAP.md` Log and end today.

## 1. Build the candidate list (sources, in this order)

1. **SlowMist Hacked** (`https://hacked.slowmist.io/`): page 1, then `?page=2`… until you are past the start date. List date, project, loss, the stated method and the source link for each row. Starting anywhere else missed five incidents on 2026-10-17.
2. **RektRadar daily briefs** (`https://www.rektradar.xyz/`): the month index, then each brief in range. They catch small exploits and early-month items that SlowMist's first page no longer shows.
3. **Gaps.** Look for big-ticket items in the news, and for vendor alerts from Defimon, Blockaid, PeckShield, ExVul and Phalcon, if they are not already covered above.

## 2. Remove what OAK already has

For each candidate, run `python3 tools/check_known.py "<project>"` and also grep `examples/` for the project name. A STRONG_MATCH often fires on name tokens alone, so open the matched file and compare the year and mechanism before you skip it.

## 3. Read the primary sources

For X links, fetch `https://api.fxtwitter.com/<user>/status/<id>`. The text is in `.tweet.text`, and long posts are in `.tweet.article`. Prefer the operator's statement, then forensic firms, then news. The `oak-source-reader` agent can do this in parallel and return structured claims.

Sort each candidate into one of two groups:

- **Mechanism known:** add it in step 4.
- **Mechanism not published yet**, or only a loss figure: do not write an example. List it under ROADMAP Next ("Waiting on post-mortems") with its source and date.

## 4. Write the examples

Use the `oak-write-example` skill for each one. Fan out to `oak-example-writer` agents for large batches (Sonnet; one file per agent), then review every file yourself. Check the numbers they write against the sources, because agents do introduce unsourced figures.

- Big incidents, and any with on-chain addresses: run `oak-trace-funds`, or the `oak-fund-tracer` agent, to fill `## Fund flow`.
- Every example needs a full timeline and full addresses. Lean means less ceremony, not less content.

## 5. Land it

1. Add each example to its Technique page (`### Additional incidents`), and to its actor page if attributed.
2. `npm run site:data`, then `npm run check`. The check must print "All checks passed."
3. Update the `ROADMAP.md` Log: range covered, count, headline incidents, what was held and why.
4. Commit to `main` with the per-incident reasoning in the message, then push.
5. Tell the user in plain language what was added, what was held back, and anything surprising.
