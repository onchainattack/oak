# Corrections, Takedowns, and Right-to-Reply

OAK is an open knowledge base that references thousands of public sources — academic papers, federal-court records, regulatory designations, incident post-mortems, audit-firm advisories, industry-forensic write-ups, and on-chain artefacts. We aim to cite only **publicly available** information and to reproduce only what is necessary to support a defender's understanding of the underlying technique. Even with that discipline, at this scale errors and friction are inevitable. This page is the canonical channel for fixing them.

We don't gatekeep this. If you are the source, the subject, or the rights-holder of content referenced in OAK and want it corrected, removed, or contextualised — write to us.

## Who this page is for

You can use this channel if you are:

- **A vendor, audit firm, or research team** whose published work is cited in OAK, and you believe the citation is incorrect (wrong URL, wrong author, wrong date, misattributed claim, wrong scope).
- **An individual or organisation named** in a worked example, threat-actor profile, or technique page, and you believe the naming is inaccurate, the framing is misleading, or you want a correction reflected.
- **A subject of a referenced incident** (a victim organisation, a current employee of one, a legal representative) who wants context added, scope tightened, or sensitive operational detail removed.
- **A copyright holder** of source material we have cited or paraphrased beyond fair use.
- **A researcher or contributor** who has subsequently corrected, retracted, or updated work that OAK cites.
- **Anyone** who finds factual error in OAK content — names, dollar amounts, dates, attributions, technical descriptions.

## What we will do

OAK is committed to:

- **Acknowledge receipt within 3 calendar days.**
- **Substantive response within 7 calendar days** — either with the correction landed, a counter-proposal (if we disagree on what the source actually supports), or a request for additional information.
- **Credit the correction in the relevant page's revision history** unless you ask not to be credited.
- **Document any disagreement transparently** in the relevant page's `Discussion` section, so the disagreement is itself part of the public record. We won't quietly delete a flagged claim and pretend it was never there; we either correct it, qualify it, or document why we kept it.
- **Treat takedown requests in good faith.** If your concern is that the citation reproduces too much of your work, that the framing damages a victim organisation, or that something published in haste should not have been published — we will act on it. The bar for "remove" is lower than the bar for "correct" because OAK's value depends on being a place that respects the people whose material it is built on.

## What we will not do

- **We will not remove citations to public regulatory action** (CISA advisories, OFAC designations, DOJ indictments, court records) at the request of the named party. Public-record references stay.
- **We will not remove a worked example of an incident at the request of the affected party** — but we will tighten scope, add context, correct technical details, and ensure the framing is accurate to what the public record shows.
- **We will not publish information that is not already public** in response to a correction request. If you want context added that requires sourcing non-public information, see `SECURITY.md` for the off-list disclosure channel.
- **We will not act on anonymous takedown demands** that do not identify either the requester or the specific claim being challenged. This is a transparency requirement, not a verification requirement — pseudonymous handles with a verifiable claim of authorship are fine.

## What we ask of you

- **Identify the specific page and claim.** A link to the OAK page (e.g., `techniques/T1.001-modifiable-tax-function.md` or `examples/2025-02-bybit.md`) plus a quote of the disputed text. The more specific, the faster we can act.
- **State what you would like changed**, in plain terms. "Remove this claim", "replace with this corrected text", "add this context", "update this URL".
- **Provide your basis** if you are challenging a factual claim. A correction reference, a public statement, a court filing, an updated audit report, or your own first-hand account if you are the subject.
- **Tell us how to credit the correction** — by name, by handle, anonymously, or with a reference to your published clarification.

## How to reach us

For most cases, **public correction is the fastest path**:

- **GitHub issue** — open one with a `correction:` label prefix in the title. Suitable for citation fixes, naming disputes, scope tightening, and most factual corrections. Public-record artefact, fast turnaround.
- **Pull request** — for corrections you'd like to write yourself. Same process as any other contribution per `CONTRIBUTING.md`. The maintainer will review and merge or comment on scope.

For cases that should not be discussed in public — sensitive incident detail, employer-related concerns, ongoing legal matters — write to:

- **`corrections@onchainattack.org`** (subject prefix: `[OAK-CORRECTION]`).

For information you do **not** want made public at all — non-public attribution, privately-shared incident detail you've subsequently realised should not be in OAK — see `SECURITY.md` for the off-list disclosure channel (`security@onchainattack.org`).

## Public record discipline

Even when a correction is private and the resolution is on-list, OAK maintains a public record that **a correction was applied**. The relevant page's git history and CHANGELOG entry will reflect that a change was made and (where the requester consents) by whom. We do not silently rewrite history. If you require silent removal — e.g., for personal-safety reasons — say so explicitly and we will discuss whether the underlying claim can be removed entirely (rather than corrected) so the page no longer carries the disputed reference at all.

## Why this page exists

OAK aims to be a defender's reference. It is built on the work of investigators, auditors, journalists, court-records, and incident-response teams who don't always get to see their citations land where they expect, or framed the way they would frame it. A standing correction channel — clearly documented, fast, and acted on in good faith — is part of what an open knowledge base owes the people whose work it is built on.

If something on OAK is wrong about you or your work, write to us. We'll fix it.

## Correction log

### 2026-11-27 — Technique pages built on corrected incidents: one deprecated, two re-anchored; six more examples rewritten, four removed

The two source passes below corrected example files; the Technique pages that had been written around the old versions still carried them. Each page was checked against the corrected examples and, where needed, against the sources.

| Page or file | Was | Now | Source |
|---|---|---|---|
| `OAK-T16.003` Delegation-Cluster Vote Takeover | emerging; canonical anchor Compound Proposal 289 as a delegation-cluster takeover "prevented in the timelock window" | **deprecated** (tombstone; ID kept). No documented incident of the shape: Compound's bloc bought COMP on the open market and the vote passed, then was cancelled by agreement; "Humpy" at Balancer locked BAL for veBAL; at Sushi the only delegation is a disputed allegation of one holder delegating out | The Block, Rekt, Cointelegraph, Decrypt, Cointelegraph Magazine |
| `OAK-T4.011` Push-Notification Infrastructure Compromise | built on a CoinStats "malicious MetaMask Snap" pushed by notification | rewritten as takeover of a vendor's own notification channel; lead example Ngrave (2026-10-17, operator report); CoinStats kept as a partial fit (a scam notification by push and in-app message led to a drainer site; the \$2.2M came from stolen keys). No source mentions a Snap | Ngrave report, CryptoSlate, The Block |
| `OAK-T11.013` Legacy-Version Maintenance Attack Surface | canonical anchor GMX V1 as "the operator knew and chose not to fix"; Yearn V1 "February 2023" as antecedent | re-anchored on the MakerDAO legacy auction keeper (2026-10); GMX and Yearn removed (neither example declares it); the "known and left unpatched" framing removed | the example files |
| `OAK-T16.001`, `OAK-T16.005`, `OAK-T9.007`, T16 tactic page | Curio as a flash-loan, storage-collision, already-patched-upstream case with "~\$1M realised" and a bounty return | Curio removed from all four (it is `OAK-T9.003` per Halborn and Rekt); the unsourced "~\$300M+" total removed | `examples/2024-03-curio.md` |
| `OAK-T15.004`, `OAK-T4.002`, `OAK-T4.004`, `OAK-M40`, T15 tactic page | CoinStats "Snap" | corrected or removed | `examples/2024-06-coinstats-wallet-infrastructure-breach.md` |
| `OAK-T16.002`, `OAK-T9.003`, `OAK-T16.006` and five examples | Compound Proposal 289 "prevented", "delegation pull" | passed, cancelled by negotiated agreement, disputed whether an attack | `examples/2024-07-compound-vote-takeover.md` |
| Nine examples and `OAK-T11.011` | Coinrail and Indodax listed as Lazarus / OAK-G01 cases | removed from those lists; both are unattributed in the sources opened | the two example files |
| `examples/2022-09-wintermute.md` | T11.004 + T7.001, Lazarus speculation | T11.004 only; no opened page reports mixer use or names an actor; three loss figures given with their sources | Halborn, The Block, ITPro |
| `examples/2024-05-cypher-contributor-redemption-contract-theft.md` (renamed; the old name carried a person's handle) | ~\$317K, proceeds to a Solana gambling platform, no prosecution pursued | ~\$260K to ~\$315K depending on the outlet, 36 withdrawals from December 2023 to May 2024, funds sent to Binance; no arrest or charge reported; no individual named | The Block, CoinDesk, Decrypt |
| `examples/2025-10-bittensor-theft-proceeds-traced-railgun-nft-trades.md` (renamed from `2024-bittensor-insider-hack-nft-forensics`) | attribution "confirmed", named person, T8.001 | an investigator's 2025-10-15 tracing through Railgun and NFT trades; attribution inferred-weak; the person is not named (not charged or sued on any opened page); the \$28M figure conflicts with the ~32,000 TAO of the 2024 file and is not reconciled | Protos, Coinpaper |
| `examples/2025-11-balancer-v2.md` | reentrancy (T9.005), DPRK association, \$8M reimbursement, "73.5%" recovered | rounding in the stable-pool upscale step (T9.011); unattributed; unsourced recovery figures removed | Check Point, OpenZeppelin, BlockSec |
| `examples/2022-2025-dao-governance-exploitation-cohort.md` | T16.003 + T16.005, "\$30M+ attempted" | an index of five incidents linking to their own files; T16.005 for Tornado Cash only | per-member sources in the file |
| `examples/2022-04-beanstalk.md` | no T16.006 | T16.006 added: Rekt reports a one-day governance delay that the emergency commit path skipped | Rekt |

Removed from `examples/` to `quarantine/`: `2022-02-pixelmon-reveal` (a failed NFT delivery; no theft or exploit on any opened page), `2024-09-ens-dao-delegation-concentration` and `2024-05-uniswap-dao-delegation-governance-concentration` (concentrated voting power with no hostile proposal and no loss), and `2021-2025-governance-timelock-design-anti-pattern-cohort` (merged into Beanstalk: of its three members only Beanstalk fits; it also said Beanstalk had no timelock, and Rekt reports a one-day delay). Added: `examples/2026-10-ngrave-liquid-push-notification-channel-seed-phrase-phishing.md`.

### 2026-11-27 — 29 examples whose only pinned source was a general report: 28 rewritten, 1 quarantined, 2 duplicates merged

These files cited one specific URL, but it was a general paper or annual report, not a page about the incident (one arXiv paper stood as the source for BonqDAO, KyberSwap, GMX V1, Yearn, Platypus, Curio and the Compound vote). Each was checked against pages found and opened for the incident, and rewritten from those pages with inline links. Of 259 addresses and transaction hashes in the two batches' files, 254 were found in the raw text of a cited page; the other five sit beside sources that refuse automated fetches and exist on-chain.

| File | Main claims corrected |
|---|---|
| `2025-02-infini` | No arrest by Hong Kong police: the sources show a civil suit and injunction served on-chain. No recovery is reported. Removed from OAK-G01. |
| `2023-02-platypus` | "Brothers arrested 2023-02-23 and charged" → French police announced two arrests on 2023-02-24, with no names and no charges reported. About \$2.4M was recovered by BlockSec and about \$1.5M frozen. |
| `2023-08-cypher` | The "Hailey" persona, a January 2025 arrest and a DOJ indictment are on no page opened; removed. |
| `2021-07-thorchain` | Two exploits (about \$4.9M found 2021-07-16, about \$8M on 2021-07-22) and one white-hat find; the third "ChefDAO" incident and returned funds were not real. OAK-T10.001 → OAK-T10.002.001. |
| `2023-10-galxe-dns-registrar-account-hijack` (was `2023-12-galxe-dns`) | One incident on 2023-10-06, about \$148K–\$160K stolen. The "December 2023, \$246K" second incident does not exist; \$396K was the refund total. |
| `2023-04-yearn-yusdt-misconfigured-fulcrum-token` (was `2023-02-yearn-v2`) | 2023-04-13, not 2023-02-02; yUSDT pointed at the wrong Fulcrum token. No flash loan; no negotiated recovery. |
| `2024-06-coinstats-wallet-infrastructure-breach` (was `…coinstats-snap`) | No source mentions a MetaMask Snap. CoinStats reports intrusions into several services and 1,590 wallets' keys stolen, about \$2.2M, not \$1M; no reimbursement figure. |
| `2024-07-compound-vote-takeover` | Proposal 289 passed 682,191 to 633,636 and was cancelled on 2024-07-29 by agreement, not defeated in a timelock window. No delegation cluster or Governor flaw is sourced. OAK-T16.003 and OAK-T9.003 dropped. |
| `2024-07-bittensor-pypi-package-coldkey-theft` (was `2024-08-bittensor-coldkey-cohort`) | "32 cold keys" was a misreading of about 32,000 TAO (about \$8M). One incident on 2024-07-02 through a malicious PyPI release, not a cohort. Tornado Cash removed. |
| `2024-11-dexx-custody-key-leak-user-wallets-drained` (was `2024-09-dexx-cohort`) | 2024-11-16, not September. Loss unsettled, above \$16M–\$20M, not \$2.5M. A leaked custody key per CertiK and SlowMist; the "database intrusion" story removed. |
| `2025-03-1inch-resolver` | The bug was in 1inch's own Fusion v1 settlement contract (a calldata length underflow), not an outdated third-party resolver. Technique now `none`. |
| `2024-01-concentric` | A single deployer wallet, not a multisig. The OAK-G01 attribution has no source; removed from OAK-G01. Tornado Cash removed. |
| `2024-09-indodax` | Mechanism is disputed between SlowMist and Cyvers; the Lazarus link is one firm's suspicion. Removed from OAK-G01. The laundering chain removed. |
| `2018-06-coinrail` | No opened page attributes the theft; removed from OAK-G01. Loss now given per token from TechCrunch. |
| `2021-04-easyfi` | Token is EASY, not "EZ"; the founder's name was wrong; tokens were taken from pools, not minted. |
| `2023-11-kyberswap` | \$55.2M in total (\$48.67M to the main exploiter, \$6.56M to front-run bots); about \$5.17M returned by bot operators. Not reentrancy. |
| `2023-08-balancer-v2` | A rounding error in Linear Pools exploited on 2023-08-27, not reentrancy on 08-22; more than \$2.12M per BlockSec. OAK-T9.005 → OAK-T9.011. |
| `2023-04-allbridge` | A payout miscalculation under liquidity skew; 1,500 BNB returned; a second attacker took about \$160K. |
| `2023-02-bonqdao` | No flash loan; two oracle reports by a 10-TRB staker. About \$1M realised of \$120M nominal. |
| `2024-03-curio` | The flash loan, storage collision, three-hour pause and bounty return are unsourced; removed. About \$16M nominal against about \$178K realised. |
| `2025-07-gmx-v1` | Reentrancy through the order-execution payout, per GMX. Returned amounts differ by source; the "LPs made whole" claim removed. OAK-T11.013 dropped. |
| `2025-04-zksync-airdrop` | First mint 2025-04-13, by a 1-of-1 Safe calling `sweepUnclaimed()`; 90% returned on 2025-04-23 after a safe-harbor offer, not within 24 hours. |
| `2025-04-loopscale` | All funds returned (5,726,725 USDC and 1,211 SOL); \$2.9M was an interim figure. |
| `2025-04-kiloex` | A permissionless forwarder `execute`, per the post-mortem as relayed; the flash loan and Pyth details removed. |
| `2022-09-wintermute-profanity-cohort` | \$3.3M on 2022-09-16 and 732 ETH on 2022-09-25; the OAK-G01 speculation and the "tail into 2023" removed. |
| `2022-07-nirvana-finance` | How the price was moved is not agreed between sources; the wind-down claim removed. |
| `2022-02-pixelmon-reveal` (was `2022-05-…`) | Mint 2022-02-07, reveal 2022-02-26. No theft or exploit is sourced, so all four Techniques are dropped. Whether it belongs in OAK is an open question. |
| `2026-06-openmonero-hosting-server-root-access-hot-wallet-drain` (was `…server-misconfig-wallet-rpc…`) | The firewall and wallet-RPC story is on no page. The operator blames the hosting provider's dashboard; the account is disputed. About 200 XMR. |

**Quarantined:** `2024-03-ether-fi-profanity-entropy-cohort`. No record of a 2023–2024 Profanity cohort, and nothing about ether.fi.

**Merged as duplicates:** `2024-curio-makerdao-fork-chain` → `2024-03-curio`; `2024-06-uwu-bittensor` → `2024-07-bittensor-pypi-package-coldkey-theft`.

**Not yet aligned:** technique pages that still describe the old versions. See ROADMAP Next 2.

### 2026-11-27 — 31 examples with no openable source: 30 rewritten from the sources, 1 quarantined, 4 duplicates merged

`python3 tools/check_sourcing.py --tier refs-unpinned` listed 31 examples whose every citation was a site's home page, an account profile or a placeholder. Each was checked against pages found and opened for the incident. All 31 contradicted those pages on at least one material point, so each was rewritten from the opened pages only, with inline links; details the pages do not carry were removed. Two files were renamed because their names stated the wrong date or mechanism.

| File | Main claims corrected |
|---|---|
| `2024-11-thala` | No arrest by Hong Kong police and no Aptos validator freeze appear in any source: Thala froze \$11.5M of its own assets and the funds came back for a \$300K bounty. The flaw was a missing check that an unstake did not exceed the stake, not a reward-claim authority check. Attribution `confirmed-by-arrest` → unattributed. |
| `2026-05-echo-protocol-ebtc-admin-key-compromise-unbacked-mint` (was `…ebtc-bridge-message-forgery`) | A compromised admin key minted 1,000 eBTC; no forged bridge message or committee signature. Echo burned the 955 eBTC the attacker still held. OAK-T10.002 → OAK-T11.014. |
| `2022-03-li-fi-cbridge-facet-unchecked-external-call-approved-wallets-drained` (was `2022-07-li-fi-v1-diamond-facet-exploit`) | The incident was 2022-03-20, not July 2022. An unchecked external call spent 29 users' token approvals; it was not a post-audit diamond facet. 25 wallets were reimbursed. OAK-T9.008 dropped. |
| `2024-10-tapioca` | The attacker did not return 94% for a bounty. The team took back about 996–1,000 ETH with a counter-exploit and revoked the bounty. Mechanism: ownership of the TAP vesting and USDO contracts, not a "DSO contract". |
| `2024-09-deltaprime` | Arbitrum only; DeltaPrime said its Avalanche deployment was not vulnerable. Tornado Cash and a treasury reimbursement plan are not in the sources. |
| `2024-04-pike-finance` | Exploits on 2024-04-26 (forged CCTP message, about \$299K) and 2024-04-30 (a pause upgrade reset the initialization flag), not 04-30 and 05-05 through Wormhole NTT. |
| `2024-02-playdapp-private-key-compromise` | Two mints (200M PLA on 02-09, 1.59B PLA on 02-12), not one 200M mint worth \$290M. No exchange is named in the sources; the price fell from \$0.18 to \$0.14, not 90%. |
| `2024-03-prisma-finance` | Missing input validation in `onFlashloan()` of `MigrateTroveZap`, not an unconstrained `delegatecall`; flash loans were used; three exploiters; a return of funds is not confirmed. |
| `2024-06-velocore` | `velocore__execute()` had no caller check, so `feeMultiplier` could be changed; an underflow then minted excess LP tokens. Not a negative swap fee. |
| `2024-06-uwu-lend` | The fallback oracle was priced from Curve pool states, not a Sushiswap pair; Tornado Cash funded the attacker and is not shown as the exit. |
| `2024-06-holograph` | A former contractor used retained admin access; not an outside key theft. Tornado Cash removed. A Paris court convicted the person in November 2026 (not named here). |
| `2024-05-gala-games` | A third-party contractor's access to a minter-role key, not a former employee. 5,912 ETH was returned and used to buy and burn GALA. |
| `2024-08-nexera` | Proxy ownership taken and a withdraw function used; no mint-and-dump. Entry was a fake consulting offer with a malware test. About \$449K kept; the rest zeroed. |
| `2024-09-banana-gun` | Banana Gun named a possible flaw in its Telegram message oracle, not an on-chain messenger contract. Ethereum and Solana bots; 11 users refunded. Technique now `none`. |
| `2024-05-sonne-finance` | The \$6.5M was a further loss prevented, not funds recovered. The attacker executed a queued, permissionless timelock proposal. Tornado Cash and a wind-down removed. |
| `2024-04-hedgey` | `cancelCampaign()` left an approval in place; the \$44.7M figure is split by chain (Arbitrum, illiquid BONUS tokens) and disputed by CertiK, not "contagion". |
| `2024-03-woofi` | Paused 13 minutes after the attack; other chains were not paused; Tornado Cash removed. |
| `2024-01-gamma-strategies-flash-loan-exploit` | No partial return; deposits were closed and withdrawals left open; cause was a price-change threshold set too wide. "40K ARB" removed. |
| `2023-12-orbit-chain-bridge-exploit` | Ethereum vault only, not Klaytn and ICON; assets were 30M USDT, 10M DAI, 10M USDC, about 231 WBTC and about 9,500 ETH; key compromise is believed, not confirmed by a post-mortem. KNPA, KISA, a bounty and Chainalysis/TRM removed. |
| `2023-08-steadefi` | Ownership transfer and owner-only functions, not a malicious upgrade; funds sat unmoved on Ethereum, not in Tornado Cash. |
| `2023-04-sentiment` | 10% bounty and about 90% returned by 2023-04-06, not 5% and 95% within 24 hours. |
| `2023-02-hopefinance` | 2023-02-20, \$1.86M; the multisig pointed the swap helper at a fake router. The "renounced" framing removed. |
| `2022-08-optifi` | OptiFi said it would return all deposits; about 95% of the locked funds were a team member's. |
| `2022-07-crema-finance` | Attribution was `confirmed` on the claim that the attacker gave their identity; no source says so. Returned 6,064 ETH and 23,967.9 SOL; kept 45,455 SOL. |
| `2022-02-meter-bridge` | The ERC-20 deposit path for the wrapped native token skipped the lock; no `bridgeData` or `wrapDeposit`. Hundred Finance's \$3.3M loss added. |
| `2022-01-qubit-bridge` | "206,809 qXETH" matches no source (77,162 per Rekt, 216,960.20 per Merkle Science); Tornado Cash was the funding, not the exit; no \$2M bounty. |
| `2018-02-bitgrail` | The "re-push replay exploit" and multi-month drain are unsourced; the court found no safeguard against repeated withdrawals. Technique now `none`. |
| `2015-02-bter` | The 7,170 BTC left a cold wallet and the cause was never disclosed. The 555 BTC "returned" removed. Technique now `none`. |

**Quarantined:** `2025-03-sushiswap-delegation-governance-takeover`. No public record of the incident exists; its only citation was a Compound vote from July 2024.

**Merged as duplicates** (moved to `quarantine/` with a `Merged into` line):

- `2014-01-cryptsy` → `2016-01-cryptsy-exchange-collapse`. The 2017-07-27 default judgment (\$8.2M, 11,325.0961 BTC) was carried over; the merged file had dated it 2016-08-08.
- `2014-09-mintpal` → `2014-10-moolah-alex-green-fraud`. The merged file claimed a Crown Court fraud conviction that no source reports.
- `2024-01-orbit-bridge` → `2023-12-orbit-chain-bridge-exploit`. The merged file had no URL, a "7-of-10" signer threshold and a Lazarus attribution through Korean agencies, none of it sourced; its link on OAK-G01 was removed.
- `2024-sonne-finance-14-month-exposure` → `2024-05-sonne-finance`.

**Sibling text aligned:** OAK-T9.008 (the Li.Fi 2022 anchor), OAK-M35 (Tapioca), and five examples that listed Thala as a validator freeze, Tapioca as a bounty return or UwU Lend as a Sushiswap-pair case.

### 2026-11-27 — Five facts corrected during the quality review

Found by the source-fidelity sample in [`QUALITY-REVIEW.md`](QUALITY-REVIEW.md); each was confirmed against the cited source's text before the change.

- **Nostra (2026-09):** the amount bridged to Ethereum included 1.3M DAI, not 1M (AMBCrypto and the dev.to write-up both say 1.3 million).
- **Hemi (2026-09):** Upbit cancelled the HEMI listing on 2026-09-08, 18 minutes before the planned opening, not "days before launch" on 09-09 to 09-10 (crypto.news).
- **Polymarket insider case (2026-01):** the timeline said the proceeds were withdrawn "2026-01-04 onward"; the DOJ says the same day as the operation, 2026-01-03, as the file's own summary already did.
- **Taiko (2026-06):** the file credited SlowMist with tracing the attacker addresses; no cited source mentions SlowMist, and they credit Blockaid. The root cause was described as "confirmed by multiple independent write-ups"; it is press-reported, one source called it unconfirmed at the time, and no Taiko post-mortem was read.
- **Caesars (2023-09):** the CISA advisory on Scattered Spider is AA23-320A, published 2023-11-16, as the cited URL shows. The file called it "AA23-352A" and dated it 2023-12-14 in four places.

The review lists further files with material findings that are not corrected yet.

### 2026-11-26 — Sweep of 2026-11-17 → 11-26: paraphrases that stood inside quotation marks

Fourteen examples were committed on 2026-11-26 (`2f77fdd`). A check the same day fetched every cited source and searched for each quoted string. About twenty were paraphrases, not the source's words. They were changed to the exact wording, or the quotation marks were removed and the text labelled as relayed. Files: the Stratum V1 / BGP hijack (four Braiins quotes), Wagyu / XMR1 (two Bitquery quotes), K3 Capital, Reental RNT Lend, Aramid Bridge (one bracketed insertion; the thread's posts are now cited individually), Fusionist and Cyber (text from The Block, which OAK could not open directly, is no longer quoted), Fluidkey (two quotes, fixed before the first commit). No figure, date or address changed. In the LUKSO file the sentence saying the removal steps were not available was replaced with the steps themselves.

### 2026-11-10 — Binance (2026-10-29): Bitcoin exits

On 10-31 `examples/2026-10-binance-devops-laptop-service-container-hot-wallet-drain.md` called the 10 BTC transfer at 10-31 06:20:20 UTC the "first BTC exit" from the stolen-BTC cluster. A re-trace on 11-10 found eight exits from `bc1qqjvps2qe8tva6zjev0un4qrwhv62pxghgnj9we` between 10-30 20:23 and 11-01 03:00; that one was the fifth. The 10-31 trace had read only the most recent transactions. The timeline row and the 10-31 snapshot now say so, and all eight exits are in the fund flow. The 10-31 statements that the XRP and Tron TRX holdings were untouched were true when written. Both moved later (Tron 10-31 14:50 and 18:44, XRP 11-02 03:52), and this is now in the timeline.

### 2026-10-31 — Binance (2026-10-29): "additional points of breach" restored to Binance's own words

In commit `beafc99` OAK relabelled "additional points of breach" in `examples/2026-10-binance-devops-laptop-service-container-hot-wallet-drain.md` as a press paraphrase. That was wrong. The phrase is in Binance's own post of 2026-10-30 08:47 UTC: "our initial investigation suggested that the security incident may have involved a compromised laptop, however our subsequent investigation has uncovered additional points of breach. This was a complex attack." The quote, its timeline row and the open-questions line now cite that post (`[binancebreachpoints2026]`, <https://x.com/binance/status/2116089661408108712>).

### 2026-10-30 — CoinDCX (2025-07): entry vector corrected

`examples/2025-07-coindcx.md` recorded the entry as a "server breach". On that basis it presented back-end infrastructure as a new, third axis of the custody-compromise family. Public reporting since 2025-07-31 says otherwise. Bengaluru police (via The Indian Express, relayed by Cointelegraph and Coinspeaker) say attackers posing as recruiters offered an engineer part-time work and got malware onto his company laptop. Neblio Technologies' complaint says his credentials were compromised through that laptop. The CEO called it "a sophisticated social engineering attack". The example is rewritten at T15.001 → T15.003, the "third axis" teaching point is withdrawn, and the detained engineer is not named because he denies involvement. Found through Ondology Labs' write-up.

### 2026-10-11 — 39 unsourced worked examples quarantined

A source pass over the 93 examples dated 2024–2026 that cited nothing (`tools/check_sourcing.py`) found no credible public record for 39 of them. They were moved to the repository's `quarantine/` directory (see its `README.md`), out of the corpus, statistics and site; backlinks, spec fixtures and prose that relied on them were removed or marked. 33 trace to the v0.1 bulk release (`f32645a`). 43 further files described real incidents with wrong facts and were corrected in place (each carries a `**Corrected 2026-10-11:**` line); 11 were confirmed as written.

| Quarantined file | Finding |
|---|---|
| `2024-01-1password-encrypted-note-seed-storage-cohort` | No crypto-theft cohort tied to 1Password; "~45 victims / ~\$8.2M" unsupported (the real cohort is LastPass). |
| `2024-01-astaria-reinitialization` | No reinitialization finding in any public Astaria audit; the "2024 audit" has no record. |
| `2024-01-fake-metamask-extension-chrome-store` | No "MetaMask Labs" extension, 30k installs, \$3.2M or June 2024 takedown; cited reports not found. |
| `2024-01-fake-trezor-suite-download` | No 2024 fake-Trezor-Suite campaign or "~80 victims / \$3.2M". |
| `2024-01-ios-whatsapp-icloud-wallet-backup-cohort` | No WhatsApp-iCloud seed cohort found. |
| `2024-02-dydx-vesting-unlock-dump` | The 150M DYDX unlock was 2023-12-01, not 2024-02; price path does not match. |
| `2024-02-eigenlayer-token-anticipation-phishing` | No early-2024 cohort; the documented EIGEN phishing is the 2024-10-18 X-account hijack. |
| `2024-03-cygnus-finance-read-only-reentrancy` | No record of any Cygnus Finance exploit. |
| `2024-05-eigenlayer-withdrawal-sandwich` | No report; mechanism implausible (withdrawals are an escrow queue, not a swap). |
| `2024-06-bera-chain-fake-airdrop-token-metadata-spoofing` | Berachain airdrop was Feb 2025; no 2024 wave or loss figure. |
| `2024-06-uplift-dao-proxy-upgrade` | No Uplift DAO incident; cited PeckShield report not found. |
| `2024-06-walletconnect-multisig-drain` | No "MEV Shield" campaign, \$480K or 12 multisigs; cited ScamSniffer report not found. |
| `2024-07-gmx-brand-impersonation-fork` | No "GMX Algo Trader", ~\$180K loss or 2024-09-22 exit; cited advisory not found. |
| `2024-08-discord-bookmark-drainer` | No 2024 Discord server-boost campaign or \$2.1M loss; real cases are Pink Drainer 2023 / Inferno 2025. |
| `2024-08-rocket-pool-validator-downtime-outage` | No Aug 2024 correlated-outage incident. |
| `2024-10-ethereum-block-proposer-griefing` | No documented Oct 2024 proposer-griefing campaign. |
| `2024-12-pimlico-erc20-paymaster-permit-cross-chain-replay` | No disclosure or patch found; Pimlico docs and audits silent. |
| `2024-2025-jupiter-dca-solana-twap-oracle-manipulation` | No report; Jupiter DCA has no TWAP oracle to manipulate. |
| `2024-2025-rocket-pool-rpl-staking-phishing-cohort` | No 2024–25 minipool phishing cohort. |
| `2024-2025-swapkit-router-impersonator-phishing` | No SwapKit impersonation cohort. |
| `2024-2026-cross-chain-bridge-observer-signature-scope-audit` | THORChain's own exploit report attributes the 2026-05 loss to a GG20/TSS attack by a node operator, contradicting the file; audit methodology unsourced. |
| `2024-2026-solana-npm-trader-key-exfiltration` | Named packages, C2 overlap and DPRK attribution not found; real Socket reporting names different packages. |
| `2024-chainalysis-laundering-report-aggregator-cohort` | No Chainalysis finding on DEX-aggregator routing or 1inch/0x as top sanctioned routers. |
| `2024-chainalysis-laundering-report-issuer-selection` | No Chainalysis finding on USDT-vs-USDC preference or per-issuer freeze data. |
| `2024-post-tornado-defi-yield-laundering` | No source for Lazarus laundering via Aave/Compound/Lido yield. |
| `2024-Q4-honeypot-token-cohort-cross-chain` | Figures traceable only to one secondary article with inconsistent numbers. |
| `2025-01-bullx-solana-launch-sandwich-cohort` | BullX is a trading terminal; no source for it sandwiching launches. |
| `2025-01-huione-guarantee-fake-cex` | Huione Guarantee is a Telegram marketplace (Elliptic), not a fake CEX; \$1.2B and OFAC claims unsupported. |
| `2025-01-hyperliquid-dex-brand-impersonation-custodial-soft-rug-cohort` | No Hyperliquid-branded copy-trade-bot exit cohort. |
| `2025-01-hyperliquid-trading-bot-malware-campaign` | Named extensions/packages not found; premise conflicts with Hyperliquid API-wallet design. |
| `2025-01-polymarket-us-election-insider-trading-cohort` | Chainalysis found no insider trading in the election whale; win-rate figures unsupported. |
| `2025-01-solana-nft-x-account-drainer-cohort` | 2025 Solana X hijacks pushed tokens, not NFT fake-mints. |
| `2025-03-uniswap-routing-manipulation-phishing` | No Universal-Router calldata routing phishing cohort found. |
| `2025-08-erc4337-paymaster-exploit-cohort` | No Aug 2025 paymaster exploits; paymasters unnamed, \$1.8M unsourced. |
| `2025-10-cyb3rhawk-polymarket-filter-bypass` | No trace of "Cyb3rHawk" or the described bypass. |
| `2026-04-erc4337-paymaster-griefing-mass-bundler-dos` | No April 2026 campaign; appears derived from the Technique description. |
| `2026-04-polymarket-uma-us-iran-ceasefire-vote-capture` | No such market; the real April–July 2026 Iran disputes are different markets with different figures. |
| `2026-bybit-hack-laundering-continuation-thorchain-dprk` | No source for the 2026 laundering-balance estimates; contemporaneous sources show most funds moved within weeks of Feb 2025. |
| `2026-q1-nft-marketplace-wash-trade-fake-mint-cohort` | Generic pattern; no 2026-Q1 incident found. |

### 2026-10-11 — duplicate entries merged

| Retired file | Surviving entry | Note |
|---|---|---|
| `2024-01-socket-bungee-bridge` | `2024-01-socket-bungee` | Same incident filed twice (T9.005 vs T10.002); both mappings were wrong. Surviving entry re-mapped to T9.004 — unvalidated calldata spending users' approvals to SocketGateway. |
| `2024-06-loopring` | `2024-06-loopring-smart-wallet` | Same incident filed twice; the retired copy cited nothing and repeated the ~200-wallet and third-party-2FA errors corrected in the survivor (58 wallets; Loopring's own 2FA servers). |
| `2024-08-ronin-bridge-rescue` | `2024-08-ronin-bridge-upgrade` | Same incident filed twice; the retired copy cited nothing, kept the superseded ungated-upgradeTo / ~80-minute account corrected earlier today, and tagged the MEV bot's front-run as sandwiching (T5.004) and issuer-coordinated laundering (T7.008). |

### 2026-10-11 — second source pass (2022–2023): 28 more examples quarantined

The same check run over the 76 unsourced examples dated 2022–2023. About 40 were corrected or confirmed in place (marked `**Corrected 2026-10-11:**`); 28 had no credible record as described. Nine of those describe a real incident under a wrong mechanism — they are noted below as candidates for a new, sourced entry rather than rewritten to fit.

| Quarantined file | Finding |
|---|---|
| `2023-09-stargate-layerzero-governance-relay-multisig` | No Stargate-specific audit or governance-relay finding; mitigation claims unsupported. |
| `2023-11-pulsechain-fake-audit` | No CertiK or Hacken statement on PulseChain tokens; project counts and \$4–7M total unsourced. |
| `2023-2024-argent-smart-wallet-escape-guardian-vulnerability` | No public "escape guardian" vulnerability; only a 2023 Consensys audit noting escape grace periods. |
| `2023-2024-dao-proposal-snowballing-cohort` | No documented proposal-flood case; cited Tornado Cash and Audius cases were different mechanisms. |
| `2023-2024-layerzero-governance-relay-misconfiguration-audit-cohort` | No Trail of Bits / OpenZeppelin / Spearbit advisories on LayerZero OFT governance relay misconfiguration. |
| `2023-2025-cloud-doc-email-seed-storage-compromise-cohort` | Class is real (LastPass), but the cohort's figures and cited MetaMask/TRM/ZachXBT material are not. |
| `2022-03-nft-proxy-upgrade-rug-cohort` | No named incident; no NFT-collection proxy-upgrade rug found; figures unsourced. |
| `2023-2025-dprk-it-worker-exchange-account-farming` | DPRK IT-worker program is real; the exchange-account-farming specifics and the "Crypto Defenders Alliance" are not. |
| `2023-2025-dprk-post-tornado-cash-aggregator-laundering` | No source that DPRK shifted to DEX aggregators; documented routes are Sinbad/YoMix, bridges, THORChain, eXch, OTC. |
| `2023-05-sudoswap-wash-pools` | The Chainalysis and Elliptic reports it cites could not be found. |
| `2023-09-gitcoin-dao-snapshot-governance-attack` | No record of a Sept 2023 Gitcoin Snapshot Sybil attack. |
| `2022-2024-android-google-drive-wallet-backup-cohort` | Contradicted by Android docs (Drive backups are app-private and E2E-encrypted on Android 9+); no cohort found. |
| `2022-2025-cross-chain-lock-spoof-named-cases` | Titled "named cases" but names none; no source for the pattern or the "low hundreds of millions". |
| `2022-2025-ethereum-validator-ddos-extortion-campaigns` | No reports of DDoS extortion against Ethereum validators; demands, groups, botnets and case unsourced. |
| `2022-09-snapshot-sybil-governance-cohort` | Essay with no named incident; disputes and hardening timeline unverified. |
| `2022-2025-optimism-cross-chain-governance-relay-gap` | Premise contradicted (Optimism governance via Agora; Security Council dates wrong). |
| `2023-01-ledger-donjon-side-channel` | No 2023 Donjon Nano S PIN-extraction research; Donjon's side-channel work was on Trezor. |
| `2023-04-cross-chain-bridge-signature-replay-cohort` | Architecture essay with no named incident; aggregate unsupported. |
| `2023-11-snowdog-dao-avalanche-cross-chain-lock-spoof` | The real SnowdogDAO incident was a ~\$30M Avalanche rug in Nov 2021 with no lock spoof; candidate for a new, sourced entry. |
| `2023-2024-balancer-vebal-delegation-takeover` | No 2023–24 takeover; the documented case is the 2022 "Humpy" veBAL gauge capture — candidate for a new entry. |
| `2022-02-akutar-nft-influencer-rug` | Real incident is different: April 2022 AkuDreams contract bug locked ~11,539 ETH (~\$34M); not an influencer rug — candidate for a new entry. |
| `2022-04-elephant-money-flash-loan-governance-attack` | Real incident (2022-04-12, BNB Chain, ~\$11M) was price manipulation, not a governance attack — candidate for a new entry. |
| `2022-04-rari-fuse-twap-oracle-window-manipulation` | Real incident (Fei Rari Fuse, 2022-04-30, ~\$80M) was reentrancy, not TWAP manipulation — candidate for a new entry. |
| `2022-09-ethereum-pow-fork-replay-cohort` | ETHW used chain ID 10001 from launch; the real replay was the Omni bridge on ETHW — candidate for a new entry. |
| `2023-06-atlantis-loans` | Real incident was a malicious governance proposal on an abandoned protocol spending lingering approvals, not router reentrancy — candidate for a new entry. |
| `2023-04-paribus-diamond-facet-exploit` | Only source describes ~\$100K reentrancy in a forked Compound V2, not an unaudited diamond facet. |
| `2023-2025-fake-crypto-wallet-google-play-app-store-phishing` | Specifics unsourced; documented cases differ (Kaspersky's App Store "FakeWallet", fake Ledger Live for macOS) — candidate for a new entry. |
| `2023-2025-fake-revoke-cash-wallet-security-extension-phishing` | Premise false (Revoke.cash has an official extension); campaigns and \$3.5M+ unsourced; Okta's "ShieldGuard" is a real candidate. |

### 2026-10-11 — further duplicates merged (found in the 2022–2023 pass)

| Retired file | Surviving entry |
|---|---|
| `2022-06-harmony-horizon` | `2022-06-harmony-horizon-bridge` |
| `2022-06-harmony-horizon-economic-incentive-gap` | `2022-06-harmony-horizon-bridge` |
| `2022-12-ankr-abnbc-liquid-staking-exploit` | `2022-12-ankr` |
| `2023-04-hundred-finance` | `2023-hundred-finance-compound-v2-fork-cascade` |
| `2023-04-mev-boost-equivocation` | `2023-mev-boost-equivocation` |
| `2023-12-ledger-connect-kit` | `2023-12-ledger-connect-kit-library-supply-chain-compromise` |

Surviving entries re-mapped where the merge exposed a wrong primary: Harmony T10.005 → T10.001 (two of five multisig keys held by the attacker; FBI attribution to Lazarus); Ledger Connect Kit T11.006 → T15.004 (phished former employee's npm publishing access); Hundred Finance 2023 T9.004 → T9.011 (empty-market donation).

### 2026-10-11 — third source pass (2010–2021): 10 more examples quarantined

The same check over the 84 unsourced examples dated 2010–2021. About 70 were corrected or confirmed in place; 10 had no credible record as described. Pickle Finance 2020 was not checked (search budget) and remains unsourced.

| Quarantined file | Finding |
|---|---|
| `2020-2020-uniswap-honeypot-wave` | The six reports it cites (PeckShield, SlowMist, Mudit Gupta, Token Sniffer, Uniswap, CertiK) could not be found; aggregate and UI-warning dates unsupported. Honeypot tokens themselves are real. |
| `2020-2021-uniswap-fake-token-impersonation-wave` | No source for the \$15–50M aggregate; attribution "confirmed" contradicted its own text. |
| `2020-2025-initial-liquidity-sandwich-cohort` | Mechanism as described is not possible (no buy before liquidity exists); per-launch figures and history unsourced. |
| `2020-2025-mev-sandwich-attack-cohort` | Aggregate and per-class claims unsourced; repeats the doubtful initial-liquidity mechanism. |
| `2021-2025-pancakeswap-token-launch-mev-bsc` | BSC sandwiching is real, but no source for the per-launch ranges, launch counts or start date. |
| `2021-bsc-pancakeswap-token-impersonation-wave` | No source for a 2021 token-impersonation wave, its losses or a June 2021 PancakeSwap UI warning; only phishing-domain waves found. |
| `2021-12-visor-finance` | Real incident is different: 2021-12-21, a deposit() validation flaw in the vVISR rewards contract minted shares (~\$8.2M); not a Uniswap V3 TWAP manipulation — candidate for a new entry. |
| `2011-07-bitcoinica-first-hack` | Impossible as dated: Bitcoinica launched 2011-09-08; the 43,000 BTC figure belongs to the March 2012 Linode loss. |
| `2013-04-atlas-dns-bitcoin-hijack-phishing` | No record of an "Atlas DNS" hijack of blockchain.info or BTC Guild in April 2013 (the known blockchain.info DNS hijack was October 2016). |
| `2015-01-localbitcoins` | No January 2015 LocalBitcoins help-desk incident; known events are a May 2014 server breach and a January 2019 forum phishing. |
| `2023-04-optimism-goerli-cross-chain-replay-incident` | No record of an April 2023 Optimism Goerli transaction replayed on mainnet; OP Mainnet and Goerli used different chain IDs, contradicting the file's premise. |
