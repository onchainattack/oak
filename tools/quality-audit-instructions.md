<!-- Brief for a read-only auditor agent (oak-source-reader). Used for QUALITY-REVIEW.md, 2026-11-27. Give it three files per agent. -->

# Source-fidelity review of OAK example files (read-only)

OAK is a knowledge base of crypto attacks. Each file in `examples/` describes one incident (or a cohort) and cites sources. Your job: for each file you are given, check what the file CLAIMS against what its CITED SOURCES actually SAY. You are an auditor. Do not edit or create any file. Do not fix anything.

## Inputs
- The example file itself (Read it in full).
- Its sources: the URLs written in the file, plus the URL of each citation key it uses (look the key up in `citations.bib`). A key with no URL, a site home page or a placeholder (`example.invalid`) is a finding: record it.
- Read the sources: X posts with `curl -s https://api.fxtwitter.com/<user>/status/<id>` (text in .tweet.text, long posts in .tweet.article); everything else with WebFetch. WebFetch returns a summary, not the page: when you rely on it, say so, and never report a quote as "verbatim" from a summary. Read at most 6 sources per file, choosing the ones that carry the file's main claims (operator statement or official document first, then forensic firm, then news). If a source fails (403, 404, timeout, paywall), record it and move on; do not try to get around a block.
- Use only the cited sources. Do not search for other sources and do not judge the file by your own memory of the incident; if your memory disagrees with the file, note it under "auditor doubts" as unverified.

## What to check, per file
1. HEADLINE FACTS: the loss figure, the date(s), the victim/protocol, the chain, and up to five other specific numbers or dated events the file states. For each: SUPPORTED (give the source and the supporting words) / CONTRADICTED (give what the source says instead) / NOT IN SOURCES READ / SOURCE UNREADABLE.
2. MECHANISM: does the file's description of how the attack worked match the sources? MATCHES / PARTLY (say what differs or is added) / NOT SUPPORTED / CANNOT TELL. Pay attention to specifics the file adds that no source you read contains (function names, percentages, sequence of steps, named tools).
3. CONFIDENCE AND ATTRIBUTION: is the file's attribution label (confirmed / inferred-strong / pseudonymous / unattributed ...) and, if present, its Root-cause "Confidence" no stronger than the sources allow? Does it name any private individual who is not charged or officially named in the sources?
4. SOURCES: how many cited sources exist and say what the file uses them for; how many are dead or unreadable; whether any citation key has no URL; whether the main claims rest on a primary source (operator, court, regulator, on-chain) or only on secondary reporting.
5. USEFULNESS to a defender (judge the file alone, in one line each): does it say at which step what happened; which control would have stopped it; are full addresses / tx hashes present (never shortened); is there anything a defender could act on in minutes?

## Output, per file (keep each file under 300 words)
FILE: <name>
SOURCES READ: <n read> of <n cited>; unreadable: <list with status>; summary-only: <list>
FACTS: one line per fact with its verdict
MECHANISM: verdict + one or two sentences
CONFIDENCE/ATTRIBUTION: OK / TOO STRONG (why) ; private individuals named: none / <who, and whether sources name them officially>
SOURCING: primary / secondary-only / unverifiable ; notes
USEFULNESS: 4 short lines
SEVERITY: one of CLEAN / MINOR (wording, missing detail) / MATERIAL (a wrong or unsupported headline fact or mechanism) / UNVERIFIABLE (sources could not be read)
AUDITOR DOUBTS: anything you suspect but could not verify, clearly marked unverified

Be exact and unsparing; "could not verify" is a valid and useful answer. Do not soften a contradiction and do not invent one.
