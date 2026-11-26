# LUKSO — a backend flaw in the email-based recovery system let an attacker add controller keys to about 300 Universal Profiles and take ~1.4M LYX — LUKSO / Ethereum — 2026-11-17

**Loss:** **~1.4M LYX** from about 300 Universal Profiles (LUKSO: "taking around 1.4M" LYX). RektRadar puts the realised value at **~\$95,000**, after the LYX was bridged to Ethereum and swapped for **~50 ETH**, and notes the LYX was worth more when it was taken. The \$ figure is RektRadar's and is not in the LUKSO post I could read. LUKSO has not published a per-profile breakdown, a USD total or a compensation amount.

**OAK Techniques observed:** **OAK-T11.008** (Embedded-Wallet Identity-Provider Compromise, *nearest existing fit, partial: primary*). The control that failed is an email-authenticated account-recovery path whose backend could be made to install a new controller key on a user's account. T11.008 describes email/OAuth identity layers that gate account authority, but it is written for third-party providers; here the recovery system is LUKSO's own, and LUKSO has not said whether a signing key, a database, an API or a permission was the flaw. **OAK-T11.014** (Operator Privileged-Key Compromise) is the other candidate and is not chosen because no source says an operator key was stolen. **OAK-T7.003** (cross-chain bridge laundering) for the LYX moved to Ethereum. See [`techniques/T11.008-embedded-wallet-identity-provider-compromise.md`](../techniques/T11.008-embedded-wallet-identity-provider-compromise.md). **OAK-T7.007** (DEX Aggregator Routing; the bridged LYX was sold through a Uniswap V3 pool and Velora, traced by OAK) and **OAK-T7.001** (the 52.42 ETH of proceeds was forwarded through two fresh addresses, traced by OAK).

**Attribution:** **unattributed.** The only attacker identifier is the controller key address RektRadar names, [`0xa2f8Fd85366d1B4A3B13C33A48CD959F6D1Ba3a7`](https://etherscan.io/address/0xa2f8Fd85366d1B4A3B13C33A48CD959F6D1Ba3a7), as read from RektRadar's page; OAK found no activity on Ethereum for it, so it is a LUKSO-side key.

**Key teaching point:** **A recovery service that can add a controller to a user's account holds the same power as the user's own key, so it has to be bounded like one.** Here one backend flaw reached about 300 accounts at once. A delay, notification or second approval enforced by the account itself, not by the recovery backend, would have given each holder a window to cancel a new controller before it could move funds. The attacker's keys stay on the profiles until holders remove them, so affected users must check their own controller list.

## Summary

LUKSO says that "overnight from November 17 to 18" an attacker exploited "a security hole in the backend" of the email-based recovery system, affecting "about 300 Universal Profiles" and taking "around 1.4M" LYX. LUKSO says the LUKSO blockchain and Universal Profile protocols "were never affected", that the attack is stopped, and that the stolen LYX was "already sold". RektRadar, summarising LUKSO's post-mortem, says the attacker took control of the recovery configurations, added a controller key to about 300 profiles, extracted ~1.4M LYX, bridged it to Ethereum and swapped it for ~50 ETH (~\$95,000), and that the email recovery system was disabled. Which backend component failed, how the attacker got control, the extraction transactions and the destination addresses on LUKSO are not in the sources I could read.

OAK could not read LUKSO's Medium post-mortem (HTTP 403). What is not in LUKSO's X post comes from three places, each named where it is used: RektRadar's and The Industry Spread's summaries of the post-mortem; the read-only incident-check page at `incident-check.lukso.tools`, which lists the attacker key and the ten recovery profiles used and gives the removal steps; and OAK's own trace of the Ethereum side. The trace found something no source OAK read reports: the wallet that sold the bridged LYX on Ethereum is the same address Moats App names as the receiver of its 2026-11-19 drain (see [`examples/2026-11-moats-app-hosting-account-brute-force-automated-rewards-admin-keys-emergency-withdraw.md`](2026-11-moats-app-hosting-account-brute-force-automated-rewards-admin-keys-emergency-withdraw.md)).

## Timeline (UTC)

**Flaw** (backend of the email recovery system) → **Take** (attacker key added to ~300 profiles, LYX extracted) → **Money** (sold, bridged to Ethereum, swapped to ETH) → **Response** (system disabled, user guidance, compensation work). Times: LUKSO dates the attack only as the night of 17 → 18 November; its X post was published 2026-11-18 12:29:30 UTC (post metadata via api.fxtwitter.com).

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-18 (undisclosed) | A security flaw exists in the backend of LUKSO's email-based recovery system. Which component, since when and how it was found is undisclosed | **T11.008** |
| 2026-11-17 night → 2026-11-18 (exact times undisclosed) | Attacker uses the flaw to take control of recovery configurations and add a controller key (RektRadar names [`0xa2f8Fd85366d1B4A3B13C33A48CD959F6D1Ba3a7`](https://etherscan.io/address/0xa2f8Fd85366d1B4A3B13C33A48CD959F6D1Ba3a7)) to about 300 Universal Profiles | **T11.008** |
| 2026-11-17 night → 2026-11-18 (exact times undisclosed) | About 1.4M LYX is taken from the affected profiles. Transaction hashes undisclosed | **T11.008** |
| 2026-11-18 00:50:23 → 08:13:23 | **Bridged LYX arrives on Ethereum and is sold** (traced by OAK). [`0x8addbea8d2a404a1c21f53d3fc4835d2f81b6ee4`](https://etherscan.io/address/0x8addbea8d2a404a1c21f53d3fc4835d2f81b6ee4) receives 1,498,110.68 LYX in mints from the zero address (first 12,458.04 in [`0x17f818e733fdb0aac8157c2b48864068fd13111846232016f085d14c7fabbe50`](https://etherscan.io/tx/0x17f818e733fdb0aac8157c2b48864068fd13111846232016f085d14c7fabbe50); largest 428,552.60 in [`0x81d6a37bc742819c5443cace226e4a5c3a5b83a7aa63c4b517e32ad2a3f4fa2a`](https://etherscan.io/tx/0x81d6a37bc742819c5443cace226e4a5c3a5b83a7aa63c4b517e32ad2a3f4fa2a)) and sells each batch within minutes into the Uniswap V3 pool [`0x6771dc01d5796db631e7743daf359f2412d308df`](https://etherscan.io/address/0x6771dc01d5796db631e7743daf359f2412d308df) and through Velora. The amount is above LUKSO's "around 1.4M". Which bridge minted the LYX is not identified by OAK | T7.003 |
| 2026-11-18 02:05:23 → 08:52:11 | **Proceeds forwarded** (traced by OAK). The same wallet sends 52.4225 ETH in six transfers (first [`0x6a8456db6ce7c5a47a1ebaefa0b2c40665b66956a79543145ca56f361327d889`](https://etherscan.io/tx/0x6a8456db6ce7c5a47a1ebaefa0b2c40665b66956a79543145ca56f361327d889), largest 33.85 ETH in [`0x687ab7c95c0c0818bbe32e2d42aef41eac3d79f2e28c7853f64cc66644aa3b75`](https://etherscan.io/tx/0x687ab7c95c0c0818bbe32e2d42aef41eac3d79f2e28c7853f64cc66644aa3b75)) to [`0x4d2BFb7Ca38Cb3Ea136845a9dd0FBEACe2Cd365C`](https://etherscan.io/address/0x4d2BFb7Ca38Cb3Ea136845a9dd0FBEACe2Cd365C), the address The Industry Spread reports from LUKSO's post-mortem as holding the swap proceeds. RektRadar's "~50 ETH (~\$95,000)" matches | T7.001 |
| 2026-11-22 03:03:59 | **Proceeds move again** (traced by OAK): 52.42249298 ETH to [`0x4702cc3648b581af6c77767246106bccf7a3a151`](https://etherscan.io/address/0x4702cc3648b581af6c77767246106bccf7a3a151) in [`0xe309b128a91dce9c93bbfb37fab3832707fe607c723038b18f2b3d73f432cae9`](https://etherscan.io/tx/0xe309b128a91dce9c93bbfb37fab3832707fe607c723038b18f2b3d73f432cae9); unmoved there on 2026-11-26 (nonce 0). Address-poisoning lookalikes of this address appear within seconds | T7.001 |
| By 2026-11-18 12:29 | LUKSO: the attack is stopped; per RektRadar the email recovery system is disabled | response |
| 2026-11-18 12:29:30 | LUKSO posts its post-mortem: affected users who used email recovery should remove the attacker's key now; a solution for affected users will be posted "in the coming weeks" | response |

Key addresses:

- Attacker controller key on LUKSO (RektRadar, The Industry Spread and the incident-check page all give it): `0xa2f8Fd85366d1B4A3B13C33A48CD959F6D1Ba3a7`
- The ten recovery profiles used in the attack, on LUKSO, as listed by the incident-check page: `0xD6ebB3C5C1836f5377d134c303f4EBb053562f6f`, `0x2e90C2ff7E9bbD9381c8e4eA030666f9c6090727`, `0x9F44982B472431bEdeFC1DC92149Ca2ea09820aa`, `0x348EA31074263385a87e2B83f5aB58a7678205F7`, `0x22e4F54586676158B7D5251e457383E499903617`, `0x5827b91d84050d3a8e159c27e16b0d7426f66aeb`, `0x4a252e46a640fb2c45f0e74bac9448f68fe66d63`, `0xeB7A7B91B5B7188c098Cb64DD01F59C9D876566d`, `0xBE8EA52CA32c51024E8B11C2719d9Edb94B21D16`, `0x242387F645a327af3f1E34F3A9A9032BeEe69fb0`
- Ethereum wallet that received and sold the bridged LYX (traced by OAK): [`0x8addbea8d2a404a1c21f53d3fc4835d2f81b6ee4`](https://etherscan.io/address/0x8addbea8d2a404a1c21f53d3fc4835d2f81b6ee4). The same address on Avalanche is the receiver Moats App names for its 2026-11-19 incident.
- Proceeds address (The Industry Spread, from the post-mortem; inflows traced by OAK): [`0x4d2BFb7Ca38Cb3Ea136845a9dd0FBEACe2Cd365C`](https://etherscan.io/address/0x4d2BFb7Ca38Cb3Ea136845a9dd0FBEACe2Cd365C)
- Where the 52.42 ETH sits on 2026-11-26 (traced by OAK): [`0x4702cc3648b581af6c77767246106bccf7a3a151`](https://etherscan.io/address/0x4702cc3648b581af6c77767246106bccf7a3a151)
- Affected Universal Profile addresses (~300) and LUKSO-side transaction hashes: undisclosed in the sources read.

## What a holder should check

The steps below are from the read-only incident-check page [`luksocheck2026`]. That page says LUKSO's official channels are the authority if their instructions differ, and that it covers only the eleven addresses above.

- **Check the permission value, not the controller list.** For each of the eleven addresses, read the data key `AddressPermissions:Permissions:<address>` on your profile. "Empty or all zeros means no permissions; any other value means action is needed." The page warns that "A recovery controller has been seen missing from the list while its permission was still set."
- **Remove, do not reduce.** "The permission value for the address must end up empty ( 0x ) . Lowering permissions is not enough." Unticking permissions in a UI can leave `0x1500`, which the page describes as "SUPER_TRANSFERVALUE + SUPER_CALL + SUPER_STATICCALL, which still lets the address move LYX and tokens. Several profiles were left like this." Use remove-controller, or call `setData` with that data key and value `0x`.
- **Remove the attacker key first, then the recovery profiles.** Removing the recovery controller turns off email recovery for the profile, so keep another backup of a controller key. "Importing a profile or adding a new device can register the recovery controller again. Check again afterwards."
- **Check what the profile controls.** "If an affected profile is itself a controller on other profiles or contracts, those are at risk too."

## Fund flow

LUKSO-side transfers are not traced: `tools/explorer.py` does not support LUKSO and no LUKSO transaction hash is public in the sources read. The Ethereum side was traced by OAK on 2026-11-26 (Blockscout transfers; balances over a node). Counterfeit "ETH" tokens sent to lookalikes of the last address were ignored.

```oak-flow
as_of: 2026-11-26T13:00Z
nodes:
  - {id: ups, chain: lukso, role: victim, label: "~300 affected Universal Profiles"}
  - {id: atk, chain: lukso, address: 0xa2f8Fd85366d1B4A3B13C33A48CD959F6D1Ba3a7, role: attacker-eoa, label: "Attacker controller key"}
  - {id: sell, chain: ethereum, address: 0x8addbea8d2a404a1c21f53d3fc4835d2f81b6ee4, role: attacker-eoa, label: "Sells bridged LYX (also the Moats App receiver)"}
  - {id: pool, chain: ethereum, address: 0x6771dc01d5796db631e7743daf359f2412d308df, role: dex, label: "Uniswap V3 LYX pool (and Velora)"}
  - {id: p1, chain: ethereum, address: 0x4d2BFb7Ca38Cb3Ea136845a9dd0FBEACe2Cd365C, role: attacker-holding, label: "Proceeds address"}
  - {id: p2, chain: ethereum, address: 0x4702cc3648b581af6c77767246106bccf7a3a151, role: attacker-holding, label: "Holds 52.42 ETH on 11-26"}
edges:
  - {from: ups, to: atk, asset: LYX, amount: 1400000, time: 2026-11-18T00:00Z, technique: T11.008, verified: source, source: luksopost2026}
  - {from: atk, to: sell, asset: LYX, amount: 1498110.68, tx: 0x17f818e733fdb0aac8157c2b48864068fd13111846232016f085d14c7fabbe50, time: 2026-11-18T00:50:23Z, time_last: 2026-11-18T08:13:23Z, technique: T7.003, verified: oak}
  - {from: sell, to: pool, asset: LYX, amount: 1498110.68, tx: 0x1f26dc4610b3f61647e3d482a85e2da365871e7ca4fe9b2b683fb17fce350725, time: 2026-11-18T00:51:35Z, time_last: 2026-11-18T08:13:47Z, technique: T7.007, verified: oak}
  - {from: sell, to: p1, asset: ETH, amount: 52.4225, tx: 0x6a8456db6ce7c5a47a1ebaefa0b2c40665b66956a79543145ca56f361327d889, time: 2026-11-18T02:05:23Z, tx_count: 6, time_last: 2026-11-18T08:52:11Z, technique: T7.001, verified: oak}
  - {from: p1, to: p2, asset: ETH, amount: 52.42249298, tx: 0xe309b128a91dce9c93bbfb37fab3832707fe607c723038b18f2b3d73f432cae9, time: 2026-11-22T03:03:59Z, technique: T7.001, verified: oak}
```

The first edge's time is a placeholder for the night of 17 to 18 November and its amount is LUKSO's "around 1.4M". The second edge is the arrival on Ethereum as mints of bridged LYX; OAK did not identify the bridge or match the mints to LUKSO-side sends. The LYX figure is OAK's sum of every LYX transfer into the selling wallet.

## Root-cause evidence

- **Technique:** OAK-T11.008 (nearest fit; see Techniques above)
- **Source:** <https://x.com/LUKSO_io/status/2123030837608186321>; <https://www.rektradar.xyz/web3-daily-exploits-19-nov-2026-k3-3-4m-sbold-share-accounting/>
- **Source type:** operator
- **Confidence:** reported
- **Evidence:** LUKSO's post says "an attacker exploited a security hole in the backend of our email-based recovery system", affecting "about 300 Universal Profiles" and taking "around 1.4M" LYX, and that the LUKSO blockchain and Universal Profile protocols "were never affected". That establishes the entry point (the recovery backend) and the scope at operator level, but not the flaw itself. The link from that flaw to "add a controller key to each profile" is RektRadar's reading of LUKSO's post-mortem, which OAK could not open, so the classification below the level of "recovery backend" is not confirmed. Confidence is held at reported, not confirmed, until the post-mortem is read. Not stated in any source read: the type of flaw, how the attacker got control of the recovery configurations, whether a key or a database was involved, and the transactions.

## Mitigations

- **Account-enforced delay and notification on adding a controller** (enforced in the profile's own permission rules, not in the recovery backend, so a backend flaw cannot switch it off): a recovery-installed controller would not be able to move funds until a holder-visible waiting period passes, which breaks the step that turned control of the recovery system into extraction in this incident. LUKSO has not said it is doing this; this is the control OAK sees as fitting the mechanism.
- **Disabling the recovery path on anomaly**: LUKSO stopped the attack and, per RektRadar, disabled email recovery. Enforced by the operator; the date and time it was disabled are undisclosed.
- **Holder-side controller review**: set the permission value of the attacker key and the ten recovery profiles to empty, as described under "What a holder should check". Enforced by the profile holder, who must act because the attacker's key persists.

No OAK-Mnn is proposed here because the root cause is not confirmed to the level that would justify one.

## Open questions

- What was the backend flaw, and which component or credential did it expose? Undisclosed in the sources read; the Medium post-mortem was not readable by OAK.
- How many of the ~300 profiles still carry the attacker's key, and what is the final loss in LYX and USD? Undisclosed.
- Which bridge carried the LYX to Ethereum, and the LUKSO-side transaction hashes. The Ethereum side is traced above.
- Is the party behind this incident the one behind the Moats App drain two days later? On-chain, one Ethereum/Avalanche address sold LUKSO's LYX and is named by Moats App as its receiver. That shows one wallet handled both sets of proceeds; it does not show who controls it, and neither operator has said so. Both incidents started from a backend server.
- The Industry Spread reports, from the post-mortem, that the attacker "took the service's own" recovery Universal Profiles and used them to add the controller key, and that LUKSO is retiring the recovery backend. OAK has not read that in LUKSO's own words.
- The brief this file was written from also cites SlowMist for the ~\$95,000 figure; OAK did not read a SlowMist page, so that attribution is unchecked.
- Is a Technique needed for "operator recovery service gains authority to add controllers to many accounts"? If LUKSO's post-mortem shows a permission or API flaw rather than a key or identity-provider compromise, propose one in `TAXONOMY-GAPS.md`.

## Public references

- `[luksopost2026]` — LUKSO (@LUKSO_io), "Post Mortem: Security incident in the email-based recovery system" (X post, 2026-11-18): <https://x.com/LUKSO_io/status/2123030837608186321>
- `[luksomedium2026]` — LUKSO, "Post Mortem: Security incident in the email-based recovery system" (Medium, 2026-11-18; not read by OAK, HTTP 403): <https://medium.com/@lukso/post-mortem-security-incident-in-the-email-based-recovery-system-029f6f241e2b>
- `[luksocheck2026]` — "UP Incident Check", read-only checker for the 17–18 Nov 2026 incident, with the eleven incident addresses and removal steps (read directly, 2026-11-26; the page does not name its operator and defers to LUKSO's official channels): <https://incident-check.lukso.tools>
- `[industryspread2026]` — The Industry Spread, "LUKSO email recovery added an attacker controller key" (third-party summary of the post-mortem; read directly): <https://theindustryspread.com/lukso-email-recovery-added-attacker-controller-key/>
- `[rektradar2026]` — RektRadar, "Web3 Daily Exploits 19 Nov 2026" (LUKSO section, read as a tool-generated summary): <https://www.rektradar.xyz/web3-daily-exploits-19-nov-2026-k3-3-4m-sbold-share-accounting/>
