# BadgerDAO frontend compromise via Cloudflare Workers — Ethereum — 2021-12

**Loss reported:** \~\$120M drained from BadgerDAO vault users who interacted with the protocol UI during the active injection window (per public reporting and the post-mortem co-authored with Mandiant; \~2,076 BTC equivalent across multiple ERC-20 vault tokens). A portion (\~\$9M) was recoverable because the attacker had transferred but not yet withdrawn it from Badger's own vaults at the time of incident response.
**OAK Techniques observed:** OAK-T4.002 (Compromised Front-End Permit Solicitation) — primary, via a Cloudflare-Workers injection sub-vector rather than a DNS / nameserver compromise.
**Attribution:** **pseudonymous**; not publicly attributed to a named operator cluster at time of writing.
**Status:** post-incident; partial recovery via a multi-tranche governance compensation plan funded by the BadgerDAO treasury (the BIP-79 series of proposals), one of the larger DAO-treasury restitution programs of the era.

## Summary

In late November and early December 2021, an attacker injected JavaScript into the BadgerDAO front-end via a Cloudflare Workers route. Users who interacted with the BadgerDAO UI during the injection window were prompted by their wallet to sign ERC-20 `approve` transactions that granted the attacker-controlled spender authority over vault token balances; the attacker subsequently used those approvals to drain the granted assets. The injection was selective: the malicious script ran for only a subset of sessions (per the post-mortem, the attacker periodically toggled the script to evade detection), which extended the dwell time before defenders correlated user reports into a single incident.

The compromise did **not** touch BadgerDAO's smart contracts. The compromise occurred at the hosting / edge-compute layer between the user's browser and the protocol's intended UI — specifically, an unauthorized Cloudflare API key was used to deploy a Cloudflare Worker route that mutated the served front-end. Per the joint post-mortem with Mandiant, the API key originated from a Cloudflare account-creation issue: accounts could be created and have API keys issued before the email-verification step had been completed by the legitimate owner, which gave the attacker persistent API access against the BadgerDAO Cloudflare tenant once the legitimate owner unknowingly completed verification on a precreated account.

## Timeline (per the public post-mortem)

- **Aug–Sep 2021:** unauthorized accounts were registered against the BadgerDAO Cloudflare tenant and issued API keys before email verification was finalised; the legitimate verification step later activated those keys without the BadgerDAO team's knowledge.
- **2021-11-10:** earliest observed use of the unauthorized API key to push a malicious Cloudflare Worker route that injected JavaScript into the BadgerDAO front-end. The script intercepted web3 interactions and substituted attacker-controlled spender addresses into the ERC-20 `approve` flow.
- **Late Nov 2021:** sporadic user reports of unexpected approval prompts; attribution was not yet consolidated because the script ran only for a subset of sessions.
- **2021-12-02:** correlated user reports surfaced the active drain; BadgerDAO paused vaults, revoked the rogue Worker, and rotated the Cloudflare configuration.
- **2021-12-10:** BadgerDAO published the technical post-mortem co-authored with Mandiant identifying the Cloudflare-API-key origin, and engaged Chainalysis for the on-chain trace.
- **Dec 2021 → 2022:** governance opened the BIP-79 series of compensation proposals; the restitution plan was structured across multiple tranches because the loss exceeded the treasury balance at the time of the incident, making a single immediate full reimbursement infeasible.

## OAK-T4.002 mapping

This is a textbook OAK-T4.002 case because the compromise sits between the user's browser and the protocol's intended UI:

- **What was *not* compromised:** BadgerDAO's smart contracts, deployed bytecode, governance keys, or vault logic.
- **What *was* compromised:** the served front-end, via an unauthorized Cloudflare Worker route deployed using a Cloudflare API key that had been pre-issued against an unverified account and later silently activated.
- **What the user signed:** an ERC-20 `approve` transaction whose actual spender did not match the protocol's canonical interaction set — the canonical OAK-T4.002 indicator listed in the Technique page.

This case differs from the Curve Finance DNS hijack of August 2022 (`[rektcurve2022]`) in the entry vector but is the same Technique. Curve was compromised at the registrar's nameserver layer; BadgerDAO was compromised at the edge-compute / hosting layer one hop closer to the user. Both produce the same on-chain signature — a spike in `approve` events from a known-protocol's user base going to a non-protocol spender.

## What defenders observed and learned

- **Pre-event (the durable lesson):** the relevant control surface was outside the on-chain telemetry boundary. The exposure was an SaaS-vendor account-lifecycle weakness (API keys issuable before email verification was complete) combined with the absence of an internal check that the BadgerDAO Cloudflare tenant had no API keys it had not itself issued. Periodic enumeration of issued API keys, scoped permissions on those keys, and an alert on Cloudflare Worker route changes against critical hostnames were the controls that would have shortened dwell time.
- **At-event:** the on-chain anomaly visible to outside defenders was a divergence in the spender distribution of `approve` events from BadgerDAO vault users — many users granting allowance to the same non-canonical spender within a narrow time window. This is the same detection signal as in the Curve case and is the canonical T4.002 indicator.
- **Post-event:** the on-chain trace mapped a downstream that public reporting consistent with the broader DPRK-era laundering pattern (`[chainalysis2024laundering]`), though attribution to a known cluster has not been publicly confirmed for this incident at time of writing. The post-incident defensive work was concentrated on hosting-layer hardening (canonical-hostname pinning, Worker change alerts, API-key inventory) rather than on contract-layer hardening.

## What this tells contributors writing future Technique pages

The BadgerDAO and Curve incidents together argue that **OAK-T4.002 should be sub-classified by entry vector**, because the defensive controls differ even though the on-chain signature is the same:

- **T4.002 sub-vector A — DNS / registrar-level compromise** (canonical example: Curve Finance, 2022-08, `[rektcurve2022]`). Mitigations live with the registrar and DNS provider: registry-lock, change-control on nameserver settings, 2FA at the registrar, monitoring of public DNS-change feeds for protocol domains.
- **T4.002 sub-vector B — Edge-compute / hosting / CDN compromise** (canonical example: BadgerDAO, 2021-12, this case). Mitigations live with the CDN / hosting provider: API-key inventory and rotation, scoped permissions, alerting on CDN-Worker / route / page-rule changes, and account-lifecycle hygiene (which in this case was the upstream weakness in Cloudflare's signup flow).

Both sub-vectors emit the same on-chain signal — a spike in permit / approve grants to a non-canonical spender from a known protocol's user base — so the **on-chain detection methodology is shared** while the **mitigation methodology splits**. Contributors writing future T4.002 examples should explicitly state which sub-vector applies. A worked example that says only "frontend was compromised" without stating the layer (DNS, CDN, edge compute, hosting bucket, supply-chain dependency, browser-extension, etc.) is under-specified for the Mitigations section to be actionable.

A third sub-vector exists in principle (T4.002-C — JavaScript supply-chain compromise via a transitive npm or CDN-hosted dependency), but is not yet covered by a worked example in this corpus; if and when one is added, the same sub-classification logic applies.

## Public references

- `[halbornbadger2021]` — Halborn explainer of the BadgerDAO Cloudflare-Worker injection chain.
- `[badgerpostmortem2021]` — joint BadgerDAO / Mandiant technical post-mortem (CoinDesk coverage as canonical secondary source where the original is no longer reliably hosted).
- `[mandiantbadger2022]` — Mandiant investigation summary of the Cloudflare-API-key origin.
- `[chainalysisbadger2021]` — Chainalysis on-chain trace and supporting narrative.
- `[rektcurve2022]` — companion T4.002 case with a different sub-vector (DNS / nameserver).
- `[chainalysis2024laundering]` — context on the laundering route patterns relevant to the downstream trace.

## Discussion

The BadgerDAO incident is significant for the OAK-T4.002 page for two reasons. First, it is **earlier than Curve in real-time** but was previously not the canonical T4.002 case in this corpus, because the Curve incident had a more compact post-mortem and a cleaner entry vector to write up. Including BadgerDAO alongside Curve makes T4.002 visibly a multi-sub-vector Technique rather than a single-pattern one, which is what the on-chain evidence has consistently suggested.

Second, the BadgerDAO case is one of the cleanest public examples of a **SaaS-vendor account-lifecycle weakness producing a multi-million-dollar on-chain loss**. The upstream weakness (API keys issuable before email verification was complete) was a Cloudflare control-plane behaviour, not a BadgerDAO failure in the conventional sense. This is a recurring pattern worth separate treatment in the corpus once two or more comparable incidents are documented: the protocol carries the loss but the defective control is at an SaaS vendor whose security posture the protocol does not itself govern. The OAK-T4.002 page should reference this sub-vector explicitly, and the Mitigations section should call out **vendor-side account-lifecycle controls** as a defensive expectation distinct from the protocol's own controls.
