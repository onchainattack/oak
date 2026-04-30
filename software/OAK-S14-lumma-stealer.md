# OAK-S14 — Lumma Stealer

**Type:** infostealer
**Aliases:** LummaC2, Lumma, Lumma C2 Stealer
**Active:** yes (2022-present; significant disruption May 2025; partial reconstitution observed thereafter)
**First observed:** 2022-08 (early forum advertisements under the LummaC2 brand)
**Used by Groups:** ecosystem-wide / not Group-specific (commodity MaaS; consumed by a long tail of affiliates and drainer crews)
**Host platforms:** Windows (primary)
**Observed Techniques:** OAK-T11.002, OAK-T4.004, OAK-T4.005

## Description

Lumma Stealer (frequently branded as **LummaC2** in panel and forum material) is a commodity Russian-origin information-stealing malware family distributed under a MaaS subscription model. It emerged in mid-to-late 2022 and is widely read in vendor reporting as occupying the post-2022 successor-style position to RedLine (OAK-S13) within the Russian-origin commodity-stealer ecosystem — sharing target classes, output-drop shape, and distribution channels, while differentiating on panel UX, evasion engineering, and active development cadence.

Lumma's target classes substantially overlap RedLine's: browser-stored credentials and cookies (Chromium- and Gecko-family), autofill and form data, locally-stored crypto-wallet files (Electrum, Exodus, Atomic, Bitcoin Core, Coinomi, Jaxx, others), and browser-extension state for crypto-wallet extensions including MetaMask, Phantom, Trust, TronLink, Binance Chain Wallet, and a maintained list of long-tail extension IDs. Output drops feed the same stealer-log marketplaces as RedLine and are consumed by the same downstream drainer chains (OAK-G02 and unaffiliated operators).

In **May 2025**, a coordinated FBI / Europol / Microsoft DCU action seized a substantial fraction of Lumma's panel and C2 infrastructure, with public reporting describing the seizure as one of the largest commodity-stealer disruptions on record. The operation degraded but did not fully eliminate the family; partial reconstitution and brand-fork activity were reported in the months following. As of 2026-04, Lumma is recorded as `active` with the May 2025 disruption noted in lifecycle history.

## Observed examples

- Continuous presence in stealer-log marketplaces (Russian Market and successors) from 2023 onward, increasingly displacing RedLine in market-share rankings reported by stealer-log analytics vendors during 2023–2024.
- Distribution via fake-CAPTCHA / "ClickFix" social-engineering pages (instructing victims to paste a clipboard-loaded PowerShell command) became a dominant Lumma infection chain in 2024, distinguishing it from RedLine's earlier cracked-software-bundle-heavy distribution.
- Use of legitimate file-hosting platforms and short-lived dropper sites for payload delivery, with rotating SaaS abuse patterns documented across multiple vendor reports.
- May 2025 disruption: U.S. DOJ unsealed seizure warrants and Microsoft DCU obtained civil court orders against Lumma C2 infrastructure; thousands of panel domains were seized or sinkholed in a coordinated multi-jurisdictional action.

## Detection / attribution signals

- Endpoint: ClickFix-style infection chains leave a distinctive `Run`-dialog-spawned PowerShell command in shell history / EDR telemetry, often with base64-encoded payloads and references to clipboard contents.
- Network: post-2024 builds use rotating C2 infrastructure with short-lived domains; TLS-with-pinned-SNI patterns differ from RedLine's older C2 styles. Public IOC feeds catalogue Lumma C2 domain shapes continuously.
- Output drop format: similar `Wallets/` and per-extension subdirectory layout to RedLine, with build-version strings and panel-ID footers that distinguish Lumma logs in marketplace listings.
- Provenance: the ClickFix lure (fake CAPTCHA "verify you are human" pages instructing the user to press Win+R and paste a command) is the highest-precision Lumma-period indicator from 2024 onward.

## Citations

- `[lummasekoia2023]` — Sekoia technical analysis of LummaC2 panel architecture and target-class enumeration. *(NEW citation — see summary.)*
- `[lummatakedown2025]` — May 2025 coordinated FBI / Europol / Microsoft DCU disruption of Lumma C2 infrastructure. *(NEW citation — see summary.)*
- `[clickfixproofpoint2024]` — Proofpoint reporting on the ClickFix social-engineering chain heavily used to deliver Lumma. *(NEW citation — see summary.)*

## Discussion

Lumma's role in the OAK ecosystem is structurally identical to RedLine's: a commodity-stealer feeder into stealer-log marketplaces, consumed by a long tail of downstream operators including OAK-G02 drainer crews. Treating Lumma as Group-attributed would be the same category error as for RedLine; OAK records it as ecosystem-wide.

Lineage and attribution caveats: Lumma is widely read as a successor-positioned brand in the Russian-origin commodity-stealer family tree (RedLine → Vidar → Raccoon → Meta → Lumma), but direct code-lineage claims between specific families in this tree are contested across vendor reports and OAK does not assert them. The May 2025 disruption is significant but historically commodity-stealer takedowns in this ecosystem have produced reconstituted brands within months — see Genesis Market (sunset), Raid Forums (sunset → Breached → reconstituted), Hydra (sunset → fragmented successors). OAK lifecycle status will be revisited as 2026 reporting matures.

The defender's load-bearing observation parallels RedLine: per-incident attribution to Lumma versus RedLine versus Vidar versus Meta is rarely the actionable variable; the actionable layer is the supply chain (commodity stealer → log marketplace → drainer) and the operational discipline (cred and wallet rotation on suspected-compromised devices). The ClickFix lure is the one Lumma-specific defender signal worth promoting to a named operational pattern, because it is high-precision and the user-side intervention point (refusing to paste clipboard-loaded commands into Run / Terminal) is concrete.
