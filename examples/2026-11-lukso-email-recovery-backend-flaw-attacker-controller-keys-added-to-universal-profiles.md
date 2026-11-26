# LUKSO — a backend flaw in the email-based recovery system let an attacker add controller keys to about 300 Universal Profiles and take ~1.4M LYX — LUKSO / Ethereum — 2026-11-17

**Loss:** **~1.4M LYX** from about 300 Universal Profiles (LUKSO: "taking around 1.4M" LYX). RektRadar puts the realised value at **~\$95,000**, after the LYX was bridged to Ethereum and swapped for **~50 ETH**, and notes the LYX was worth more when it was taken. The \$ figure is RektRadar's and is not in the LUKSO post I could read. LUKSO has not published a per-profile breakdown, a USD total or a compensation amount.

**OAK Techniques observed:** **OAK-T11.008** (Embedded-Wallet Identity-Provider Compromise, *nearest existing fit, partial: primary*). The control that failed is an email-authenticated account-recovery path whose backend could be made to install a new controller key on a user's account. T11.008 describes email/OAuth identity layers that gate account authority, but it is written for third-party providers; here the recovery system is LUKSO's own, and LUKSO has not said whether a signing key, a database, an API or a permission was the flaw. **OAK-T11.014** (Operator Privileged-Key Compromise) is the other candidate and is not chosen because no source says an operator key was stolen. **OAK-T7.003** (cross-chain bridge laundering) for the LYX moved to Ethereum. See [`techniques/T11.008-embedded-wallet-identity-provider-compromise.md`](../techniques/T11.008-embedded-wallet-identity-provider-compromise.md).

**Attribution:** **unattributed.** The only attacker identifier is the controller key address RektRadar names, [`0xa2f8Fd85366d1B4A3B13C33A48CD959F6D1Ba3a7`](https://etherscan.io/address/0xa2f8Fd85366d1B4A3B13C33A48CD959F6D1Ba3a7), as read from RektRadar's page; OAK found no activity on Ethereum for it, so it is a LUKSO-side key.

**Key teaching point:** **A recovery service that can add a controller to a user's account holds the same power as the user's own key, so it has to be bounded like one.** Here one backend flaw reached about 300 accounts at once. A delay, notification or second approval enforced by the account itself, not by the recovery backend, would have given each holder a window to cancel a new controller before it could move funds. The attacker's keys stay on the profiles until holders remove them, so affected users must check their own controller list.

## Summary

LUKSO says that "overnight from November 17 to 18" an attacker exploited "a security hole in the backend" of the email-based recovery system, affecting "about 300 Universal Profiles" and taking "around 1.4M" LYX. LUKSO says the LUKSO blockchain and Universal Profile protocols "were never affected", that the attack is stopped, and that the stolen LYX was "already sold". RektRadar, summarising LUKSO's post-mortem, says the attacker took control of the recovery configurations, added a controller key to about 300 profiles, extracted ~1.4M LYX, bridged it to Ethereum and swapped it for ~50 ETH (~\$95,000), and that the email recovery system was disabled. Which backend component failed, how the attacker got control, the extraction transactions and the destination addresses on LUKSO are not in the sources I could read.

I could not read LUKSO's Medium post-mortem (the page returned HTTP 403 to the fetch tool), so everything below that is not in LUKSO's X post comes through RektRadar's summary of it, and the steps LUKSO gives for removing the attacker's key are not reproduced here.

## Timeline (UTC)

**Flaw** (backend of the email recovery system) → **Take** (attacker key added to ~300 profiles, LYX extracted) → **Money** (sold, bridged to Ethereum, swapped to ETH) → **Response** (system disabled, user guidance, compensation work). Times: LUKSO dates the attack only as the night of 17 → 18 November; its X post was published 2026-11-18 12:29:30 UTC (post metadata via api.fxtwitter.com).

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-18 (undisclosed) | A security flaw exists in the backend of LUKSO's email-based recovery system. Which component, since when and how it was found is undisclosed | **T11.008** |
| 2026-11-17 night → 2026-11-18 (exact times undisclosed) | Attacker uses the flaw to take control of recovery configurations and add a controller key (RektRadar names [`0xa2f8Fd85366d1B4A3B13C33A48CD959F6D1Ba3a7`](https://etherscan.io/address/0xa2f8Fd85366d1B4A3B13C33A48CD959F6D1Ba3a7)) to about 300 Universal Profiles | **T11.008** |
| 2026-11-17 night → 2026-11-18 (exact times undisclosed) | About 1.4M LYX is taken from the affected profiles. Transaction hashes undisclosed | **T11.008** |
| Before 2026-11-18 12:29 (exact times undisclosed) | LYX bridged to Ethereum and swapped for ~50 ETH (~\$95,000) per RektRadar; LUKSO says the stolen LYX is "already sold". Bridge, venue, addresses and tx hashes undisclosed | T7.003 |
| By 2026-11-18 12:29 | LUKSO: the attack is stopped; per RektRadar the email recovery system is disabled | response |
| 2026-11-18 12:29:30 | LUKSO posts its post-mortem: affected users who used email recovery should remove the attacker's key now; a solution for affected users will be posted "in the coming weeks" | response |

Key addresses:

- Controller key RektRadar names as the attacker's (a LUKSO-side key; no activity on Ethereum found by OAK) — [`0xa2f8Fd85366d1B4A3B13C33A48CD959F6D1Ba3a7`](https://etherscan.io/address/0xa2f8Fd85366d1B4A3B13C33A48CD959F6D1Ba3a7)
- Affected Universal Profile addresses (~300): undisclosed in the sources read.
- Bridge, swap venue, Ethereum receiving address and transaction hashes: undisclosed.

## What a holder should check

- LUKSO's instruction is to remove the attacker's key if you used email recovery. The removal steps are in LUKSO's post-mortem, which OAK could not read; follow them from the original page.
- List the controllers on your Universal Profile and look for [`0xa2f8Fd85366d1B4A3B13C33A48CD959F6D1Ba3a7`](https://etherscan.io/address/0xa2f8Fd85366d1B4A3B13C33A48CD959F6D1Ba3a7) (written in full, as on RektRadar) and for any other controller you did not add. The attacker's key is described as remaining on a profile until its holder removes it.
- LUKSO does not say whether a profile with no funds left is still at risk; treat any profile that used email recovery as exposed until its controller list is checked.

## Fund flow

Not traced by OAK: `tools/explorer.py` does not support LUKSO, and no transaction hash, bridge name or Ethereum address is public in the sources read. The only on-chain check done was that the controller key address has no activity and a zero balance on Ethereum (`explorer.py info ethereum`, 2026-11-26). The edges are relayed from LUKSO's X post and RektRadar and drawn dashed.

```oak-flow
as_of: 2026-11-18T12:30Z
nodes:
  - {id: ups, chain: lukso, role: victim, label: "~300 affected Universal Profiles"}
  - {id: atk, chain: lukso, address: 0xa2f8Fd85366d1B4A3B13C33A48CD959F6D1Ba3a7, role: attacker-eoa, label: "Controller key named by RektRadar"}
  - {id: br, chain: lukso, role: bridge, label: "Bridge to Ethereum (not named)"}
  - {id: eth, chain: ethereum, role: unknown, label: "Ethereum swap destination (not named)"}
edges:
  - {from: ups, to: atk, asset: LYX, amount: 1400000, time: 2026-11-18T00:00Z, technique: T11.008, verified: source, source: luksopost2026}
  - {from: atk, to: br, asset: LYX, verified: source, source: rektradar2026, technique: T7.003}
  - {from: br, to: eth, asset: ETH, amount: 50, verified: source, source: rektradar2026, technique: T7.003}
```

The 2026-11-18T00:00Z edge time is a placeholder for "overnight 17 → 18"; the true time is undisclosed. The 1,400,000 and 50 figures are LUKSO's and RektRadar's approximations ("around 1.4M", "roughly 50 ETH").

## Root-cause evidence

- **Technique:** OAK-T11.008 (nearest fit; see Techniques above)
- **Source:** <https://x.com/LUKSO_io/status/2123030837608186321>; <https://www.rektradar.xyz/web3-daily-exploits-19-nov-2026-k3-3-4m-sbold-share-accounting/>
- **Source type:** operator
- **Confidence:** reported
- **Evidence:** LUKSO's post says "an attacker exploited a security hole in the backend of our email-based recovery system", affecting "about 300 Universal Profiles" and taking "around 1.4M" LYX, and that the LUKSO blockchain and Universal Profile protocols "were never affected". That establishes the entry point (the recovery backend) and the scope at operator level, but not the flaw itself. The link from that flaw to "add a controller key to each profile" is RektRadar's reading of LUKSO's post-mortem, which OAK could not open, so the classification below the level of "recovery backend" is not confirmed. Confidence is held at reported, not confirmed, until the post-mortem is read. Not stated in any source read: the type of flaw, how the attacker got control of the recovery configurations, whether a key or a database was involved, and the transactions.

## Mitigations

- **Account-enforced delay and notification on adding a controller** (enforced in the profile's own permission rules, not in the recovery backend, so a backend flaw cannot switch it off): a recovery-installed controller would not be able to move funds until a holder-visible waiting period passes, which breaks the step that turned control of the recovery system into extraction in this incident. LUKSO has not said it is doing this; this is the control OAK sees as fitting the mechanism.
- **Disabling the recovery path on anomaly**: LUKSO stopped the attack and, per RektRadar, disabled email recovery. Enforced by the operator; the date and time it was disabled are undisclosed.
- **Holder-side controller review**: remove unknown controllers using LUKSO's steps (not read by OAK). Enforced by the profile holder, who must act because the attacker's key persists.

No OAK-Mnn is proposed here because the root cause is not confirmed to the level that would justify one.

## Open questions

- What was the backend flaw, and which component or credential did it expose? Undisclosed in the sources read; the Medium post-mortem was not readable by OAK.
- How many of the ~300 profiles still carry the attacker's key, and what is the final loss in LYX and USD? Undisclosed.
- Which bridge and swap venue were used, and what are the Ethereum address and transaction hashes? Undisclosed; the ~\$95,000 and ~50 ETH figures are RektRadar's.
- The brief this file was written from also cites SlowMist for the ~\$95,000 figure; OAK did not read a SlowMist page, so that attribution is unchecked.
- Is a Technique needed for "operator recovery service gains authority to add controllers to many accounts"? If LUKSO's post-mortem shows a permission or API flaw rather than a key or identity-provider compromise, propose one in `TAXONOMY-GAPS.md`.

## Public references

- `[luksopost2026]` — LUKSO (@LUKSO_io), "Post Mortem: Security incident in the email-based recovery system" (X post, 2026-11-18): <https://x.com/LUKSO_io/status/2123030837608186321>
- `[luksomedium2026]` — LUKSO, "Post Mortem: Security incident in the email-based recovery system" (Medium, 2026-11-18; not read by OAK, HTTP 403): <https://medium.com/@lukso/post-mortem-security-incident-in-the-email-based-recovery-system-029f6f241e2b>
- `[rektradar2026]` — RektRadar, "Web3 Daily Exploits 19 Nov 2026" (LUKSO section, read as a tool-generated summary): <https://www.rektradar.xyz/web3-daily-exploits-19-nov-2026-k3-3-4m-sbold-share-accounting/>
