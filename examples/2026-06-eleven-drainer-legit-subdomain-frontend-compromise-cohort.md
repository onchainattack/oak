# "Eleven drainer" injected into legitimate project subdomains — Gitcoin and Yield Yak — Ethereum / Avalanche — 2026-06 (June 21 and 24)

> **Status: detection-stage cohort (as of 2026-06).** Both incidents were surfaced by Blockaid as front-end compromise alerts, not post-mortems. Neither project nor Blockaid published a confirmed theft total, and the initial-access vector for either subdomain was not disclosed. This entry documents the confirmed mechanism (a legitimate project subdomain serving a wallet-drainer script) and marks losses and access vector as open.

**Loss:** **Undisclosed for both incidents.** On **2026-06-21** Blockaid flagged the **`files.gitcoin.co`** subdomain (Gitcoin, Ethereum) as serving injected "Eleven drainer" code, and on **2026-06-24** it flagged **`vote.yieldyak.com`** (Yield Yak, Avalanche) with the same kit. In both cases a secondary subdomain of the real project was compromised while the main application was not implicated, and the alerts warned users off before any confirmed theft total was published. Because these were detection-stage warnings rather than settled post-mortems, no dollar figure is attached to either; the impact recorded here is user exposure for anyone who connected a wallet to the poisoned page during the window.

**OAK Techniques observed:** **OAK-T6.008** (Verified-but-Malicious Frontend Routing — *primary, confirmed mechanism*. A legitimate, project-owned subdomain served an injected wallet-drainer script, so the malicious code ran behind a trusted domain rather than a look-alike clone. See [`techniques/T6.008-verified-but-malicious-frontend-routing.md`](../techniques/T6.008-verified-but-malicious-frontend-routing.md)). **OAK-T4.004** (Allowance / Approve-Pattern Drainer — the "Eleven drainer" script pushes a connecting wallet to approve or sign hostile transactions, granting the operator permission to move assets; this is the drainer's extraction primitive. See [`techniques/T4.004-allowance-approve-drainer.md`](../techniques/T4.004-allowance-approve-drainer.md)). The **initial-access vector that let the attacker inject code into each subdomain was not disclosed** (candidates in this class include registrar / DNS, hosting or object-storage, and CI or package-registry credential compromise, which is OAK-T15.004); OAK does not assert a specific vector here because none was published.

**Attribution:** **unattributed.** The only attribution is toolkit-level: both incidents used the **"Eleven drainer"** kit, a drainer-as-a-service offering that first surfaced publicly around November 2025 (flagged by SlowMist's Yu Xian) alongside established kits such as Inferno Drainer and Angel Drainer. Because the kit is rented, its presence does not identify the operator behind these specific deployments, and no operator, affiliate roster or wallet cluster was published for either the Gitcoin or Yield Yak instance.

**Key teaching point:** **A wallet-drainer served from a project's own subdomain defeats the defenses built for fake clones, because the domain is genuinely the project's.** Users and allowlist tooling that check for look-alike domains (the fake-clone pattern in [`examples/2023-2026-fake-dex-clone-frontend-cohort.md`](2023-2026-fake-dex-clone-frontend-cohort.md)) do not flag `files.gitcoin.co` or `vote.yieldyak.com`, which really do belong to Gitcoin and Yield Yak. The compromise is at the web-delivery and access-control layer of the real project: a secondary subdomain that is easy to overlook in asset inventories, injected with a drainer that solicits approvals on wallet connect. The controls that apply are hardening every project-owned subdomain and its hosting to the same standard as the main app, subresource integrity and a content-security policy that constrains injected scripts, monitoring project domains for unexpected script changes, and client-side approval-warning tooling that flags a hostile approval regardless of which domain raised it. The recurrence of the same kit against a second legitimate project three days later is the signal that this is a repeatable playbook, not a one-off.

## Summary

In June 2026, the security detection firm **Blockaid** flagged two legitimate DeFi projects whose secondary subdomains had been injected with the **"Eleven drainer"** wallet-draining script. On **2026-06-21** the affected host was **`files.gitcoin.co`** (Gitcoin, on Ethereum); on **2026-06-24** it was **`vote.yieldyak.com`** (Yield Yak, an Avalanche auto-compounding yield-vault and aggregator). In both cases the main application interface was not implicated, and the compromise was scoped to a secondary subdomain.

The injected script is a client-side drainer: when a user connects a wallet to the poisoned page, it pushes them to approve or sign hostile transactions, granting the operator standing permission to move assets. This is a website-layer compromise, not a smart-contract exploit. Neither project nor Blockaid published a confirmed loss figure at the time of the alerts, which were framed as warnings to keep users off the affected subdomains. The way each subdomain was initially compromised was not disclosed.

The two incidents share a detector (Blockaid), a kit (Eleven drainer), and a target pattern (a secondary subdomain of a real project rather than the main app), three days apart. "Eleven drainer" is a rentable drainer-as-a-service; its operators take a cut of stolen funds, and the model relies on rushed user approvals rather than a novel on-chain exploit.

| Incident | Date | Chain | Compromised host | Kit | Confirmed loss |
|---|---|---|---|---|---|
| Gitcoin | 2026-06-21 | Ethereum | `files.gitcoin.co` (secondary subdomain) | Eleven drainer | Undisclosed |
| Yield Yak | 2026-06-24 | Avalanche | `vote.yieldyak.com` (secondary subdomain) | Eleven drainer | Undisclosed |

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-2026-06-21 | Attacker gains the ability to inject code into `files.gitcoin.co` (vector not disclosed) | **T15.004** (candidate, undisclosed) |
| 2026-06-21 | Blockaid flags Eleven drainer code on `files.gitcoin.co`; main Gitcoin app not implicated; users warned off | **T6.008 + T4.004** |
| Pre-2026-06-24 | Attacker gains the ability to inject code into `vote.yieldyak.com` (vector not disclosed) | **T15.004** (candidate, undisclosed) |
| 2026-06-24 | Blockaid flags the same Eleven drainer kit on `vote.yieldyak.com`; framed as the same playbook three days after Gitcoin | **T6.008 + T4.004** |

## What defenders observed

- **Pre-event (subdomain and hosting hardening).** Both targets were secondary subdomains, the kind that fall out of asset inventories and change-control. Applying the same hosting, DNS, registrar and CI hardening to every project-owned subdomain as to the main app is the pre-event control. The specific access vector was not published, so the candidate set (DNS/registrar, hosting/object-storage, CI/package-registry credential compromise) is where hardening should concentrate.
- **At-event (trusted domain defeats clone defenses).** The malicious code ran on a real project subdomain, so look-alike-domain checks and clone allowlists did not apply. Subresource integrity, a content-security policy, and monitoring for unexpected script changes on project domains are the delivery-layer controls that do apply.
- **At-event (approval prompt on connect).** The drainer solicits approvals when a wallet connects. Client-side approval-warning and transaction-simulation tooling that flags a hostile approval independent of the originating domain is the user-facing control.
- **Cohort signal (repeatable playbook).** The same kit hit a second legitimate project three days later. Treat a confirmed drainer-on-legitimate-subdomain as a pattern to sweep for across peer projects, not a single-project cleanup.

## Public references

- `[blockaidgitcoin2026]` — Blockaid, detection alert naming "Eleven drainer" code on `files.gitcoin.co` (Gitcoin, 2026-06-21; user warning): <https://x.com/blockaid_/status/2068534795684946308>
- `[cryptoeconomyyieldyak2026]` — Crypto Economy, "Yield Yak Suffers Front-End Breach in Latest Wave of Wallet-Drainer Hacks" (Yield Yak / `vote.yieldyak.com`; losses unconfirmed; same-playbook framing): <https://crypto-economy.com/yield-yak-suffers-front-end-breach/>
- `[cryptorankyieldyak2026]` — CryptoRank, "Yield Yak follows Gitcoin in latest wallet-drainer attack" (links the two incidents three days apart as the same pattern): <https://cryptorank.io/news/feed/4aa0a-yield-yak-gitcoin-in-wallet-drainer-attack>
- `[cryipjune2026]` — cryip, "June 2026 Crypto Hack Report" (both logged as front-end attacks with undisclosed losses; confirms chains: Gitcoin/Ethereum, Yield Yak/Avalanche): <https://cryip.co/june-2026-crypto-hack-report-45-blockchain-security-incidents/>
- `[spaziocryptoeleven2026]` — spaziocrypto, background on "Eleven drainer" as a drainer-as-a-service kit (SlowMist / Yu Xian identification ~2025-11; comparison to Inferno / Angel): <https://en.spaziocrypto.com/hack/new-eleven-drainer-attack-threat-to-crypto-wallets/>

## Discussion

This cohort anchors the case where a wallet drainer is served from a project's own subdomain rather than a look-alike clone. It sits next to OAK's drainer-service coverage (the Inferno Drainer handover and the encrypted-config "Reloaded" cases) on the kit side, and next to the fake-DEX clone-frontend cohort on the delivery side, but it is neither: the domain is authentic, and the compromise is of the real project's web-delivery and access-control surface. That is what makes T6.008 the primary mapping, with T4.004 as the drainer's approval-based extraction.

Two properties give the pair its teaching value. First, trusted-domain delivery defeats the defenses built for clones, so the control set shifts to subdomain and hosting hardening, subresource integrity, content-security policy, and domain script-change monitoring rather than user education about fake URLs. Second, the same rented kit reappearing against a second legitimate project within three days marks a repeatable playbook, which argues for treating one confirmed instance as a prompt to sweep peer projects' subdomains. The entry is deliberately detection-stage: losses and initial-access vectors were not disclosed, so OAK records the confirmed subdomain-plus-drainer mechanism and leaves the theft totals and access vectors open, to be revised if either project publishes a post-mortem.
