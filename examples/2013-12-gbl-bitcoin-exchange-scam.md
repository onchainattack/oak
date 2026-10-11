# GBL Bitcoin Exchange fraud / exit — 2013-10 to 2013-12

**Loss:** about \$4.1 million (roughly 25 million yuan) in customer funds per press reports, with over 500 to 1,000+ affected users, mostly in mainland China; estimates vary widely (`[slashdotgbl]`, `[hnsgbl]`). The earlier 9,640 BTC / ~\$5M figure is unsourced. Global Bond Limited (GBL) was a Chinese Bitcoin exchange launched in May 2013; its site went offline on 2013-10-26 and its Hong Kong approval claim and offices proved bogus (`[hnsgbl]`, `[slashdotgbl]`).
**OAK Techniques observed:** **OAK-T11.005.001** (Fake-CEX / Pig-Butchering Platform — the GBL platform was a fake exchange with no real trading backend; balance displays were operator-controlled fictions). **OAK-T6.001** (Source-Verification Mismatch — GBL's claimed corporate registration in Hong Kong was either fabricated or unverifiable). **OAK-T5.001** (Hard LP Drain — the operator swept deposited BTC in a single-event exit when the scheme collapsed). **OAK-T8.005** (Operational-Security Procedural Failure — the operator's registration / hosting / identity trail was insufficiently verified by depositors).
**Attribution:** **pseudonymous** in OAK's sense, but Chinese police detained three men in connection with GBL (surnamed Liu, Jin and Huang, aged 29, 24 and 33, per Xinhua as relayed by press); they reportedly denied wrongdoing, and the outcome is not established here (`[hnsarrest]`). The earlier statement that no arrest resulted was wrong.
**Corrected 2026-10-11:** Collapse was late October 2013 (not December), loss ~\$4.1M (not 9,640 BTC / \$5M), Chinese police did detain three suspects, and no cited source calls it a Ponzi scheme with 1-2% daily returns; those details are removed as unsourced.
**Key teaching point:** **GBL is an early fake-approval Bitcoin exchange case: a mainland-China service claiming Hong Kong approval and offices that did not exist, which went dark in October 2013. The comparison to the T11.005.001 pig-butchering class and to JPEX is OAK's own analogy, not sourced here.**

## Summary

Global Bond Limited (GBL) was a Chinese Bitcoin exchange launched in May 2013. It claimed Hong Kong government approval, but press reported the approval claim and contact information were bogus, its Hong Kong offices did not exist, and its servers were in Beijing (`[slashdotgbl]`, `[hnsgbl]`). Users first noticed a problem on 2013-10-26 when the site went offline; November 2013 reporting put losses around \$4.1 million (about 25 million yuan) (`[hnsgbl]`, `[slashdotgbl]`).

Chinese police later detained three men in connection with GBL, identified by surname as Liu (29, said to have launched operations in May), Jin (24, daily operations) and Huang (33, finances); they reportedly denied committing a crime (`[hnsarrest]`).

The earlier version of this file described guaranteed 1-2% daily returns, a multi-level referral programme, a fictitious dashboard, and a December 2013 sweep of ~9,640 BTC. None of those details appears in the cited sources and they are removed. The comparison to the 2023 JPEX case is OAK's own analogy.

## Timeline (UTC)

| When | Event | OAK ref |
|------|-------|---------|
| 2013-05 | GBL launches as a Chinese Bitcoin exchange (`[slashdotgbl]`) | T11.005.001 platform creation |
| 2013-10-26 | Site goes offline; users cannot withdraw (`[hnsgbl]`) | T5.001 exit extraction |
| 2013-11 | Press reports ~\$4.1M missing; Hong Kong approval claim found bogus (`[slashdotgbl]`) | |
| 2013-12 | Chinese police detain three suspects (`[hnsarrest]`) | |

## Realised extraction

About \$4.1M (~25 million yuan) per press reports; estimates vary. Recovery not established.

## Public references

- `[slashdotgbl]` — Slashdot, "Chinese Bitcoin Exchange Vanishes, Taking \$2.5M of Coins With It" (2013-11-12): <https://yro.slashdot.org/story/13/11/12/1553216/chinese-bitcoin-exchange-vanishes-taking-25m-of-coins-with-it>
- `[hnsgbl]` — Help Net Security, "Chinese bitcoin exchange vanishes along with \$4.1m in bitcoins": <https://www.helpnetsecurity.com/?p=36273>
- `[hnsarrest]` — Help Net Security, "Police arrests Chinese Bitcoin exchange owners suspected of fraud": <https://www.helpnetsecurity.com/?p=36386>
- Cross-reference: T11.005.001 (Fake-CEX / Pig-Butchering Platform) at `techniques/T11.005.001-fake-cex-pig-butchering-platform.md`.
- [`examples/2023-09-jpex-hong-kong.md`](../examples/2023-09-jpex-hong-kong.md) — JPEX Hong Kong, 2023.
- [`examples/2024-2025-doj-sec-pig-butchering-enforcement-cohort.md`](../examples/2024-2025-doj-sec-pig-butchering-enforcement-cohort.md) — DOJ/SEC enforcement cohort, 2024–2025.
