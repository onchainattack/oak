# SafeMoon (SFM) — BNB Chain — federal action 2023-11-01

**Attribution:** **pseudonymous** — no public actor attribution at OAK v0.1 cutoff.

**Loss alleged in the federal complaint:** \~\$200M misappropriated from purportedly-locked liquidity (per U.S. SEC press release 2023-229 and related DOJ filings).
**OAK Techniques observed:** OAK-T2.002 (Locked-Liquidity Spoof) — primary; partial OAK-T1.001 framing (transfer tax) and OAK-T5 framing (cumulative misappropriation), but the canonical OAK mapping is T2.002 because the misrepresentation about locked liquidity is what the federal complaint specifically characterises.
**Status:** SEC civil action filed November 2023; DOJ criminal charges in parallel; matter in litigation at the time of OAK v0.1.

## Summary

SafeMoon was a BNB Chain token launched in 2021 with a 10% transfer tax split between holder reflections and contributions to "locked" liquidity pools. The U.S. Securities and Exchange Commission's 2023 complaint specifically alleges that the team's representations about locked liquidity ("locked SFM liquidity pool prevented the defendants from being able to 'rug pull' SFM investors by removing liquidity") were materially false: large portions of the pool were never locked, and the executives are alleged to have misappropriated approximately \$200M from purportedly-locked liquidity for personal expenditures.

For OAK's purposes, SafeMoon is the canonical OAK-T2.002 (Locked-Liquidity Spoof) case study because the misrepresentation is documented in a federal complaint — a far stronger source than any industry forensic write-up.

## What defenders observed

- **Off-chain claim:** "locked liquidity" represented as a structural protection against operator-side LP removal.
- **On-chain reality:** large fractions of LP supply that were *not* covered by any locker contract; locker arrangements that did exist had administrative-override paths inconsistent with the off-chain claim.
- **At-event:** the misappropriation was cumulative rather than a single event, which is why OAK does not classify this primarily as T5.001 (Hard LP Drain) — the canonical OAK-T2.002 framing fits better.

## What this example tells contributors writing future Technique pages

- **OAK-T2.002 is about *mismatch*, not about *removal*.** A T2.002 case can exist without a T5.001 event ever firing (the operator never had to perform a single large-event drain to extract value). The on-chain artefact is the lock structure itself; the misrepresentation is the off-chain claim. Detection therefore lives at the verify-locker-against-canonical-list layer, not at the watch-for-LP-outflows layer.
- **Federal-court documents are the strongest references available.** When such a document exists for an incident, OAK examples should cite it preferentially over secondary commentary. The SEC press release links to the underlying complaint PDF for readers who want the full record.
- **Distinguish allegation from finding.** The complaint contains allegations that, at the time of OAK v0.1, are subject to ongoing civil and criminal proceedings. Examples should preserve that distinction; OAK does not characterise allegations as findings.

## Public references

- `[secsafemoon2023]` — U.S. SEC press release 2023-229 announcing the SafeMoon civil enforcement action; press release links the underlying complaint document.

## Discussion

SafeMoon also illustrates a subtler point about OAK-T1.001 framing: the SafeMoon transfer tax was 10% from inception and not subsequently raised, so this incident does *not* exemplify the modifiable-tax pattern that OAK-T1.001 names. This is intentional — examples should be parsimonious about which Techniques they claim, and reserve a Technique attribution for cases whose facts cleanly match. The temptation to attribute T1.001 to "any token with a tax" is a recurring writing failure for contributors and is called out explicitly in CONTRIBUTING.md's writing-style rules.
