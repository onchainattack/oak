# OAK quality review, 2026-11-27

What this is: a measurement of how well OAK's examples hold up against their own cited sources, and a ranked list of what to fix. It was prompted by the 2026-11-26 sweep, where a check found about twenty paraphrases standing inside quotation marks in fourteen new files that had passed `npm run check`.

**The short version.** Files written since September 2026 are in reasonable shape: they have timelines with a Technique per step, addresses, fund flows and root-cause evidence, and seven of the eight sampled had no material error. Everything older is weaker than the green checks suggest. In a sample of 45 files checked against their sources, 16 had a wrong or unsupported headline fact or mechanism and 8 could not be checked at all because their sources do not resolve to a real page. The cause is mostly one thing: a citation counts as "sourced" when its key exists in `citations.bib`, and 431 of those keys point to a site's home page or to a placeholder.

## How it was measured

1. **Whole corpus, mechanical.** `python3 tools/quality_report.py --links` over all 723 examples: sections present, source URLs, shortened addresses, root-cause confidence, fund-flow edges, and an HTTP probe of every inline source URL.
2. **Sample, against sources.** `python3 tools/quality_report.py --sample 45 --seed 20261127` drew 45 files by stratum (era, single incident or cohort, five of the ten largest losses), half of each older stratum from files with no inline URL. Fifteen read-only auditor agents (three files each) compared each file's headline facts, mechanism, attribution strength and sourcing with the cited sources, to a fixed form ([`tools/quality-audit-instructions.md`](tools/quality-audit-instructions.md)). They read 2 to 6 sources per file.
3. **Quotes.** `python3 tools/check_quotes.py` on the same 45 files.
4. **Cross-check.** Twelve of the auditors' findings were re-checked by hand against the file, `citations.bib` and the fetched source text. Eleven held as stated. The twelfth (Akira's "~\$42M") is a source that changed after the file was written: CISA updated the advisory in 2025 and the page now gives a later, larger figure.

Limits. Forty-five files is a small sample: read the percentages below as "about a third", not as precise rates. The auditors read most pages through a summarising fetch, so "not in sources read" can mean the detail sits in a part of the page they did not get; "contradicted" findings were the ones re-checked by hand. Many sources returned 403 or 429 to an automated fetch and may be fine in a browser.

## Results

### Sample of 45, against sources

| Stratum | Files | Clean | Minor | Material | Unverifiable |
|---|---|---|---|---|---|
| 2026-09 and later | 8 | 1 | 6 | 1 | 0 |
| 2026-01 … 08 | 6 | 0 | 2 | 3 | 1 |
| 2024–2025, single | 8 | 0 | 3 | 3 | 2 |
| 2021–2023, single | 8 | 0 | 3 | 2 | 3 |
| 2020 and earlier | 4 | 0 | 2 | 1 | 1 |
| Cohort and year-only | 6 | 0 | 0 | 5 | 1 |
| Five of the ten largest losses | 5 | 0 | 4 | 1 | 0 |
| **All** | **45** | **1** | **20** | **16** | **8** |

*Minor*: wording, a missing detail, an unsupported side fact. *Material*: a headline fact or the mechanism is wrong or has no support in the cited sources. *Unverifiable*: the cited sources could not be read or do not point at a page about the incident.

Split the other way: of the 14 sampled files with **no inline URL** (citation keys only), none was clean or minor: 10 material, 4 unverifiable. Of the 31 with inline URLs: 1 clean, 20 minor, 6 material, 4 unverifiable. There are 193 files of the first kind in the corpus.

### Whole corpus

| Measure | Value |
|---|---|
| Examples | 723 (593 single incidents, 98 cohorts, 32 year-only) |
| No inline source URL | 193 (27%); 49% of 2021–2023 single incidents, 41% of 2024–2025 |
| No specific source URL at all, inline or through `citations.bib` | 21 (12 of them dated 2024) |
| Exactly one specific source | 113 |
| `citations.bib` entries | 1,557: 1,114 point at a specific page, 401 at a site root or blog index, 30 at a placeholder (`example.invalid`), 12 have no URL |
| Entries whose note says "verified" | 1,444, including site roots ("URL audit confirmed HTTP 200") |
| Entries with the generic title "Cited source for …" | 417 |
| Examples citing at least one site-root key | 103; at least one placeholder key: 12 |
| Inline links probed | 1,803 (x.com skipped); 58 fail in 52 files (404: 24, DNS or connection: 16, 410: 6, timeout: 5, other: 7) |
| `## Root-cause evidence` | 88 files (84 of them 2026-09 or later); confirmed 23, corroborated 25, reported 40 |
| `## Fund flow` | 60 files; 575 edges traced by OAK, 67 relayed from a source |
| Key addresses listed | 85 files (81 of them 2026-09 or later) |
| Timeline with a Technique column | 88 files; 83 of 110 (75%) since 2026-09, 5 of 613 before |
| Shortened addresses or hashes | 11 files |
| URLs that look invented | 7 files with a stray `}` in the URL; 3 files with a round-number post ID such as `status/1889700000000000000` |

### Quotes

On the 45 files the checker found 104 quoted strings and could not find 81 of them in the sources it read. That number mostly measures unreadable sources (90 of 228 returned 403, 429 or 404 to the fetch), not paraphrase, so it is not a paraphrase rate. Where every source was readable, as in the fourteen files of the 2026-11-26 sweep, the rate of quotes that were really paraphrases was about one in ten.

## Problem areas, worst first

### 1. "Sourced" does not mean a source that can be opened

`check_sourcing.py` passes a file if it cites a key that exists in `citations.bib`. But 401 keys resolve to a home page (`https://www.coindesk.com`, `https://twitter.com/peckshield`, `https://rekt.news`) and 30 to a placeholder, and the bibliography marks most of them "verified" because the home page answered HTTP 200. A reader, or an auditor, cannot get from the claim to the evidence.

Examples: [`examples/2015-02-bter.md`](examples/2015-02-bter.md) (five keys: three placeholders, two home pages; nothing in the file can be checked), [`examples/2023-12-galxe-dns.md`](examples/2023-12-galxe-dns.md), [`examples/2022-10-binance-bsc-bridge.md`](examples/2022-10-binance-bsc-bridge.md) (the operator post-mortem is "proposed" and points at a blog index), [`examples/2024-02-blur-wash-trading-ring.md`](examples/2024-02-blur-wash-trading-ring.md) (four of five keys have no URL).

Update, same day: the check now exists (`python3 tools/check_sourcing.py`, tier `refs-unpinned`, and `--bib`). With account-profile URLs counted as well it finds 466 unpinned bibliography entries, 31 examples with no specific source and 126 with one; 377 notes were relabelled from "verified" to `url-not-pinned`.

Fix. Rule: a citation must point at the page that carries the claim. Check: extend `check_sourcing.py` with a third tier, `refs-unpinned`, for files whose every source is a site root, a placeholder or URL-less; report it first, then gate it. Stop writing "verified" in `citations.bib` for a URL that is only reachable. Work: 21 files have nothing specific at all and 113 have one source; do those first.

### 2. Specifics that no cited source contains

The most common material finding. Times to the minute, function names, percentages, tool names, tidy step sequences and round aggregate figures that appear in the file and in none of the sources read. Some are OAK's own reasoning written as fact; some look generated.

Examples: [`examples/2023-sim-swap-crypto-wave.md`](examples/2023-sim-swap-crypto-wave.md) (a "T+5min / T+10min / T+30min" timeline with no source, resting on one X post that no longer exists), [`examples/2021-05-spartan-protocol.md`](examples/2021-05-spartan-protocol.md) (timestamps unsupported; "~\$60M+" flash loan where the source says 10,000 WBNB), [`examples/2024-05-eigenlayer-restaking-airdrop.md`](examples/2024-05-eigenlayer-restaking-airdrop.md) (a "~\$1B+" headline and a 60% concentration figure with no source; no incident is documented), [`examples/2025-02-zklend.md`](examples/2025-02-zklend.md) (five source URLs that do not exist, one with a round-number post ID).

This is the same pattern as the fixture-provenance sweep of 2026-10 (88 files quarantined). It did not catch everything.

Fix. Rule: a number, time or name in a file needs a source that states it; OAK's inference is allowed but must be labelled as such. Check: the fabricated-URL signals above are cheap to gate (stray `}`, round-number post IDs, `example.invalid`). The rest needs the auditor pass used here; run it over the 193 no-inline-URL files, about 65 agent runs at three files each.

### 3. Cohort and year-only files

Five of six sampled cohort files were material and the sixth unverifiable. They list several named cases with amounts and dates and cite one or two general sources that cover none of them: [`examples/2022-2025-dao-governance-exploitation-cohort.md`](examples/2022-2025-dao-governance-exploitation-cohort.md) cites a single 2022 paper for five incidents dated 2022 to 2025. They are also the files the gates skip: the timeline, fund-flow and shortened-address checks only run on `YYYY-MM-…` names.

Fix. Rule: every named case in a cohort file carries its own citation or links to the single-incident file that has one. Check: for cohort files, each table row or bullet that names an incident and an amount must contain a link or a key. Work: 130 files; start with the 35 that have no inline URL.

### 4. Attribution and confidence stronger than the sources

About a dozen sampled files overstate. "Confirmed" operators where the source says "illicit actors" ([`examples/2026-05-dsj-exchange-ponzi-collapse.md`](examples/2026-05-dsj-exchange-ponzi-collapse.md)); "inferred-strong" TraderTraitor where the sources say the pattern resembles DPRK activity and name no group ([`examples/2025-09-sbi-crypto.md`](examples/2025-09-sbi-crypto.md)); "confirmed mechanism" from one news article; an indictment recorded as confirmed without saying it is an allegation. In the sample no private individual was named who is not charged or officially named, which is good.

Fix. The `## Root-cause evidence` rules already handle this for files that have the section, and only 88 do. Backfill the section into older single-incident files, largest losses first; `check_root_cause.py --list` gives the list.

### 5. Nothing to act on in older files

Outside the recent files, almost no example gives an address or a transaction hash (85 of 723 list key addresses), even when a cited source does: the Exactly, Uranium and Spartan sources all publish contract or attacker addresses that the OAK file leaves out. Without them a defender cannot check exposure or follow the money, which is the point of the project.

Fix. No new rule needed (it exists for 2026-11 and later). Work: for the largest losses first, lift addresses and hashes from the sources already cited, then trace with `tools/explorer.py`. Roadmap item 0 covers this.

### 6. Files that disagree with themselves or with each other

- Two files for one incident with conflicting facts: [`examples/2023-09-caesars-entertainment.md`](examples/2023-09-caesars-entertainment.md) (~\$15M paid, "not publicly traced", confirmed attribution) and [`examples/2023-09-caesars-ransomware-12m-seizure.md`](examples/2023-09-caesars-ransomware-12m-seizure.md) (\$12M seized, unattributed, one source that no longer resolves).
- [`examples/2022-06-harmony-horizon-bridge.md`](examples/2022-06-harmony-horizon-bridge.md) names T10.001 in its header and argues T10.005 in its teaching point; [`examples/2025-04-mango-markets-solana-governance.md`](examples/2025-04-mango-markets-solana-governance.md) still calls a vote "regulator-mandated" below a correction note that withdrew the claim.
- 179 files carry a correction note. In two of three sampled, text the note says was removed is still there.
- Filenames that no longer match the content: `2019-08-wallet-fail-trezor-keepkey-35c3-disclosure.md` describes a December 2018 talk and, since its correction, no KeepKey finding.

Fix. Roadmap items 2 and 3 (old mechanisms on Technique pages; suspected duplicates) already point here. Add: when a correction note says text was removed, grep for it.

### 7. Sources that have gone or changed

Fifty-eight inline links fail in 52 files, and X posts are not probed at all; two sampled files rest on a single X post that returns "not found". CISA's Akira advisory now states a different total from the one OAK cites, correctly, from the original.

Fix. Rule: cite the date a figure was read when the source is a living page ("as of the 2024-04-18 advisory"). Check: run `quality_report.py --links` on a schedule and treat 404 and 410 as failures; the CI job currently accepts 410. Add an archive link for any source that is the only one for a headline fact.

## What is in good shape

- **Files since 2026-09.** Seven of eight sampled had no material error. Their on-chain detail is OAK's own and was not contradicted anywhere it was checked. The rules added in September to November (timeline with a Technique per step, root-cause evidence, fund flow, key addresses) are visibly working.
- **Fund flows.** 575 of 642 edges are OAK's own traces with transaction hashes.
- **Private individuals.** No sampled file named an uncharged private person.
- **Honesty about gaps in recent files.** They say "undisclosed" and "not read by OAK" where that is the case; the auditors repeatedly noted it.

## Corrected during this review

Five facts, each confirmed against the cited source, logged in `CORRECTIONS.md`: Nostra (1.3M DAI bridged, not 1M), Hemi (Upbit cancelled 18 minutes before the listing on 2026-09-08, not days before), the Polymarket insider case (withdrawal on the day of the operation, not from the next day), Taiko (flagged by Blockaid, not traced by SlowMist; the root cause is press-reported, not confirmed), Caesars (CISA advisory AA23-320A of 2023-11-16, not "AA23-352A" of 2023-12-14).

Not yet corrected, sources read by the auditors: Mt. Gox (the 2014-02-28 filing was for civil rehabilitation; the exact wallet-theft date and hour are unsupported), RaveDAO (rally size, the \$19M and 95% figures), Spartan (flash-loan size and sequence), DSJ Exchange and SBI Crypto (attribution strength), HyperVerse (the liquidation date), Akira, the Pump.fun cohort (ruling date; defendants since dropped), the ransomware landmark cohort, APT43, and the three cohort files above.

## The sample

`2023-08-exactly-protocol` (minor), `2014-02-mt-gox` (material), `2026-07-across-solana-relayer-anchor-event-discriminator-forgery` (minor), `2022-05-terra-luna-collapse` (minor), `2026-05-ill-bloom-mobile-wallet-weak-prng-recovery-phrase-sweep` (minor), `2026-09-notional-finance-v1-escrow-uint128-downcast-liability-truncation` (minor), `2026-10-base-anonymous-vault-safe-rewhitelist-aave-borrow-drain` (minor), `2026-10-initia-movevm-script-cache-unbacked-credit-bridge-exit` (clean), `2026-10-79th-vault-operator-key-79au-pool-dump` (minor), `2026-10-avalanche-safe-unlimited-approval-undeployed-createcall-address` (minor), `2026-09-hemi-genesis-drop-merklebox-reentrancy-unclaimed-drain` (material), `2026-11-pool-party-snapshot-position-record-manipulation-15-pools-arbitrum-base` (minor), `2026-09-nostra-starknet-nstr-thin-pool-oracle-collateral-inflation` (minor), `2026-06-taiko-bridge-leaked-sgx-prover-key-forged-proof-withdrawal` (material), `2026-01-polymarket-venezuela-maduro-soldier-insider` (minor), `2026-04-ravedao-otc-pump-dump` (material), `2026-08-tac-cosmos-evm-vesting-delegation-underflow-patch-lag` (unverifiable), `2026-05-dsj-exchange-ponzi-collapse` (material), `2026-02-120-hours-pumpfun-livestream-sympathy-pretext-lp-drain` (minor), `2025-09-sbi-crypto` (material), `2024-05-eigenlayer-restaking-airdrop` (material), `2024-01-hyperverse-hyperfund` (material), `2024-02-blur-wash-trading-ring` (unverifiable), `2025-01-mango-markets-shutdown` (minor), `2025-02-zklend` (unverifiable), `2025-04-mango-markets-solana-governance` (minor), `2025-12-uspd-cpimp-clandestine-proxy` (minor), `2023-12-galxe-dns` (unverifiable), `2022-10-binance-bsc-bridge` (unverifiable), `2023-09-caesars-entertainment` (material), `2021-05-spartan-protocol` (material), `2023-12-ledger-connect-kit-library-supply-chain-compromise` (minor), `2021-04-uranium-finance` (minor), `2023-09-caesars-ransomware-12m-seizure` (unverifiable), `2022-06-harmony-horizon-bridge` (minor), `2018-2025-apt43-kimsuky-crypto-funded-espionage` (material), `2015-02-bter` (unverifiable), `2019-08-wallet-fail-trezor-keepkey-35c3-disclosure` (minor), `2016-11-coinbase-irs-john-doe-summons` (minor), `2021-2026-fake-audit-claims-and-audit-pending-marketing-cohort` (material), `2022-2025-dao-governance-exploitation-cohort` (material), `2023-2025-akira-raas` (material), `2024-2025-pump-fun-bonding-curve-rug-cohort` (material), `2020-2024-ransomware-extortion-landmark-cohort` (material), `2023-sim-swap-crypto-wave` (unverifiable).

## Re-running it

```sh
python3 tools/quality_report.py              # corpus tables
python3 tools/quality_report.py --links      # plus a link probe (network, cached)
python3 tools/quality_report.py --sample 45  # a stratified sample; change --seed for a new one
python3 tools/check_quotes.py examples/<file>.md   # quotes against cited sources (network)
```
