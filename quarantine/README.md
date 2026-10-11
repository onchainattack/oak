# Quarantine

_Also holds duplicate entries merged into a surviving example; those carry a `**Merged into:**` line and are exported with `status: merged`._

Files in this directory were worked examples that a source-verification pass on 2026-10-11 could not substantiate. They are **not part of the OAK corpus**: no tool reads this directory, nothing here counts toward statistics, coverage, specs or the published site, and no Technique page links here.

## Why they are here

`tools/check_sourcing.py` reported 93 examples dated 2024–2026 that cited nothing — no URL and no resolvable bibliography key. Each was checked against public sources (project post-mortems, security-firm reports, government documents, established outlets). For the 39 files here, **no credible record of the incident as described could be found**. Most carried confident specifics — victim counts, dollar figures, package names, typosquat domains, named reports from real security firms — and the reports they cited could not be located either.

33 of the 39 were created in the v0.1 bulk release (`f32645a`, 2026-05-14), the same commit that produced the KelpDAO misclassification; the remainder came from the 2026-05-15 fixture commits (`c28e744`, `e2f1912`, `60059d6`) and one 2026-05-02 cohort commit (`518866c`).

## What it would take to restore one

A primary or credible secondary source that matches the incident's core claims (date, victim, mechanism, magnitude). Restore by moving the file back to `examples/`, removing the banner, correcting anything the source contradicts, adding a `## Public references` section, and re-adding backlinks on the Technique pages it maps to. Record the restoration in `CORRECTIONS.md`.

## Why not deleted

Some may describe real patterns badly, or real incidents under wrong names (e.g. the EigenLayer anticipation-phishing files predate the documented 2024-10-18 X-account hijack). Keeping them makes that recoverable; keeping them out of `examples/` makes sure nothing cites them meanwhile.

## Files

The full list, with the verification finding for each, is in the 2026-10-11 entry of [`CORRECTIONS.md`](../CORRECTIONS.md).
