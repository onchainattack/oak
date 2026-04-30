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
