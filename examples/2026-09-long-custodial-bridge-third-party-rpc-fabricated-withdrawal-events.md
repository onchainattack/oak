# Long — the keeper believed a withdrawal had happened on Arc because the RPC it asked said so, and the RPC was not telling the truth — Long / custodial bridge / Arc → Robinhood Chain — 2026-09-14

**Loss:** **46.7928 WETH (~\$118,000)**, released from Long's **Robinhood Chain vault**. **No user lost funds:** Long **halted the keeper**, **rebuilt its verification procedures**, and **replenished the vault out of platform revenue the same day**. **No on-chain contract was exploited and no cryptographic key was compromised.** The operator's loss is the realised figure; the class's reach is not bounded by it.

**OAK Techniques observed:** **OAK-T10.002.001** (Off-chain Observer Source-Event Forgery — *primary*, sub-shape **(c) infrastructure-level source forgery**. Long's **keeper** — the off-chain observer that decides a source-chain event occurred and releases from the destination vault on the strength of it — was fed **fabricated Arc withdrawal events by a third-party RPC**. The keeper parsed correctly and acted correctly on what it was told; **the events it was told about did not exist**. See [`techniques/T10.002.001-off-chain-observer-source-event-forgery.md`](../techniques/T10.002.001-off-chain-observer-source-event-forgery.md)).

**Explicitly not OAK-T10.001** (Validator / Signer-Key Compromise) and **explicitly not OAK-T10.002** in its contract-side form: the operator states no keys were compromised and no on-chain contract was exploited. The custodial vault did exactly what its keeper instructed, and the keeper did exactly what its data source described.

**Attribution:** **unattributed.** No actor named, no on-chain identifiers published, and no statement on whether the third-party RPC was **compromised, malicious, or simply wrong**. That distinction is unresolved in the public record and is material — it separates an intrusion from a vendor-integrity failure — so OAK records it as open rather than assuming an attacker.

**Key teaching point:** **A keeper that reads one RPC has outsourced the definition of reality to a vendor, and vendors are not part of most people's threat models.** Everything in this design was sound by conventional review: contracts uncompromised, keys uncompromised, the keeper's logic correct. The failure was entirely in the **premise** — that the source chain had been observed rather than merely described by one provider. The controls are cheap at this scale and are the same ones the class's largest anchor needed: **query two or more independently operated RPC providers and require agreement before release**; **fail closed when the source set shrinks** rather than proceeding on whatever answers; and **reconcile custody before paying** — a withdrawal asserted on Arc that never moved value there cannot survive a locked-versus-issued check. The operational grade note is that the team **halted, rebuilt verification, and made the vault whole the same day**, which is the right sequence and the reason a mechanism worth studying cost users nothing.

## Summary

**Long** runs a **custodial bridge** with a **keeper** — an off-chain process that watches a source chain for withdrawal events and, when it sees one, releases the corresponding assets from a destination-side vault.

On **2026-09-14**, a **third-party RPC provider supplied that keeper with fabricated withdrawal events on Arc**. The keeper accepted them and released **46.7928 WETH (about \$118,000)** from Long's **Robinhood Chain vault**. Nothing on-chain was exploited: the contracts behaved correctly, and no key was compromised.

Long **halted the keeper**, **rebuilt its verification procedures**, and **replenished the vault from platform revenue the same day**, so **users sustained no losses**.

## Timeline (2026-09-14)

| When | Event | OAK ref |
|---|---|---|
| (standing) | Long's **keeper** releases from the **Robinhood Chain vault** on the strength of **Arc withdrawal events**, as reported by a **third-party RPC** | (latent single-source dependency) |
| 2026-09-14 | RPC supplies the keeper **fabricated Arc withdrawal events** | **T10.002.001 — infrastructure-level source forgery** |
| 2026-09-14 | Keeper releases **46.7928 WETH (~\$118,000)** against withdrawals that never occurred | **T10.002.001 exploitation** |
| 2026-09-14 | **Keeper halted**; verification procedures rebuilt | (containment) |
| 2026-09-14 | Vault **replenished from platform revenue**; **no user losses** | (operator remediation) |

## What defenders observed

- **The whole trust model reduced to one vendor relationship, and nothing in a contract audit would show it.** Long's contracts were fine. Its keys were fine. The security of the vault rested on a **question an audit does not ask** — where does the keeper get its view of the source chain, and how many independent parties have to agree before it acts? Reviewing the on-chain surface of a custodial bridge and declaring it sound is a **category error** when the release decision lives off-chain.
- **"Compromised, malicious, or wrong" are three very different incidents with one symptom.** A third-party RPC serving false events could be an intrusion (as at the class's largest anchor), a hostile provider, or an infrastructure defect returning garbage. The public record does not say which. **The control is identical in all three cases** — require agreement across independently operated sources — which is a rare instance where you can fix the problem without first attributing it.
- **Same-day make-whole from platform revenue is the part worth copying.** Halt, rebuild verification, replenish, disclose — in that order, inside a day, at a size the operator could absorb. The reason this incident has a small public footprint is that it was handled before it became a user-facing event, which is also why it very nearly did not enter the record at all.
- **The public footprint is thin and that is a finding about the corpus, not about the incident.** This case appears in **SlowMist's incident database and in the operator's own disclosure**, and essentially nowhere else — no press coverage, no third-party forensic write-up. An incident feed filtered by dollar value or by news volume drops it entirely, and with it the second anchor for the sub-shape behind a **\$292M** loss five months earlier.

## Public references

- `[slowmistzonelong2026]` — SlowMist Hacked database, Long entry (2026-09-14; *"Long's custodial bridge released 46.7928 WETH (about \$118,000) from its Robinhood Chain vault after a third-party RPC fed the keeper fabricated Arc withdrawal events"*; recorded as a supply-chain attack; no on-chain contract or key compromise; keeper halted, verification rebuilt, vault replenished from platform revenue the same day, no user losses): <https://hacked.slowmist.io/>
- `[longdisclosure2026]` — Long (@Longdotsupply), operator incident disclosure on X, cited as the source for the database entry above: <https://x.com/Longdotsupply/status/2099743494994899052>

## Discussion

This is the **second anchor for sub-shape (c)** of `OAK-T10.002.001` — **infrastructure-level source forgery**, where the observer's *data source* is subverted so that it parses correctly and reasons correctly over events that never occurred — after **KelpDAO / LayerZero** (2026-04-18, 116,500 rsETH / ~\$292M), where poisoned RPC nodes reported a burn on Unichain that never happened and a single DVN attested to it honestly.

The pairing is the reason this \$118K incident earns a file. The KelpDAO case is easy to file under *state-actor capability* and set aside: six weeks of pre-positioning, a socially-engineered developer, memory-patched nodes, a DoS to strip redundancy, DPRK attribution. Long demonstrates that **none of that is required**. Strip out the tradecraft and the class reduces to a single architectural fact — **a keeper that trusts one RPC provider** — which is a default configuration, not an exotic one. The two anchors bracket the range: **\$292M with UNC4899 at one end, \$118K with an unattributed vendor failure at the other, one mechanism.**

The unresolved question here is also the more interesting one. At KelpDAO the source was subverted by an intruder. At Long, **nobody has said whether the RPC was compromised, hostile, or merely broken** — and because the keeper had no second opinion, all three produce the same outcome. That is the strongest available argument for stating the mitigation in terms of **source agreement rather than source trustworthiness**: a bridge that requires two independently operated providers to agree does not need to know which of the three happened, and a bridge that requires one has no way to find out.
