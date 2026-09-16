# Chainflip — the swap instruction lived in a memo, and the attacker appended their own to a transaction the validators had already signed — Chainflip / Tron settlement path — 2026-09-12

**Loss:** **736,442.17 USDT** on **Tron**, paid out across **six** unauthorised refunds. The attacker made **eight attempts in roughly ninety minutes**, starting small and approximately **doubling the value each round**; the later attempts failed and tripped Chainflip's internal monitoring, which is how the incident surfaced. A pending user swap of **115,654.41 USDT** could not be processed during the incident and **remained in the vault**, recoverable. Chainflip **paused every network route** and committed to making affected users whole; **the funding source for that compensation — treasury, protocol revenue or insurance buffer — was not specified at disclosure**, and the full technical report was still outstanding. This is the protocol's first significant security event.

**OAK Techniques observed:** **OAK-T10.002.001** (Off-chain Observer Source-Event Forgery — *primary*. Chainflip's **Tron settlement path reads swap parameters from a transaction memo** rather than from contract calldata as on its other chains. The observer validated that a memo was **well-formed** and never validated the **fact the memo asserted** — that it described a distinct deposit which had genuinely failed and was therefore owed a refund. See [`techniques/T10.002.001-off-chain-observer-source-event-forgery.md`](../techniques/T10.002.001-off-chain-observer-source-event-forgery.md)). **OAK-T10.002** (Message-Verification Bypass — the parent primitive holds exactly: value released against a message that should have been rejected, with no validator key compromised and no cryptography broken).

**Explicitly not OAK-T10.001** (Validator Signer-Key Compromise). The validators' keys were never compromised and every signature in the path was genuine — that is precisely the problem. And **explicitly not OAK-T10.003** (Cross-Chain Replay): nothing was replayed onto a second chain or a second bridge instance. The same deposit was paid twice **inside one settlement path**, because the path counted refunds against memos rather than against deposits.

**Attribution:** **pseudonymous.** On-chain identifiers only; no actor named, no attribution claimed by Chainflip or by any third-party forensics firm at time of writing.

**Key teaching point:** **A message is not trustworthy because you signed the transaction carrying it.** Chainflip's provenance heuristic answered the question *"did we author this transaction?"* — and the answer was legitimately yes, because the validators had signed it. The attacker changed the question by appending a memo after the fact, so the payload was attacker-authored while the carrier remained self-authored. Every credibility signal the observer had available pointed the right way. The control is to **bind the instruction to the signature**, not to the transaction: whatever field carries swap parameters must be **covered by the authorisation it travels with**, and a refund must be keyed to **a deposit the protocol can re-derive from custody state**, not to an instruction it can re-read from a mutable field. The narrower operational lesson is that **a settlement path built per-chain inherits that chain's metadata semantics**, and the chain whose code path looks least like the others is where this class lands.

## Summary

**Chainflip** is a cross-chain swap protocol whose validator set observes deposits on supported chains and settles the corresponding output. On most chains, swap parameters arrive through **contract functions**. On **Tron**, the settlement path is different: it **reads the parameters out of a transaction memo**.

In the early hours of **2026-09-12**, an attacker **attached their own memo to a transaction that Chainflip validators had already signed**. The protocol read that memo as a **separate swap instruction**, determined that this second swap had failed, and issued a **refund** — so a single underlying deposit produced **two payouts**.

The attacker repeated the pattern **eight times over about ninety minutes**, beginning with small amounts and roughly doubling each round. **Six** rounds produced unauthorised payouts totalling **736,442.17 USDT**. The remaining attempts failed and **triggered internal monitoring**, which is what ended the incident rather than any external report.

Chainflip disclosed on **2026-09-13**, **paused all network routes**, flagged the funds for recovery, and said impacted users would be made whole. Operations remained paused into the following week pending a protocol update and a technical restart plan. The **vulnerability was confined to the Tron-specific code path**; other settlement paths were not implicated.

## Timeline (2026-09-12 unless noted)

| When | Event | OAK ref |
|---|---|---|
| (standing) | Chainflip's **Tron settlement path reads swap parameters from a transaction memo**, unlike the contract-call path used on other chains | (latent substrate divergence) |
| early hours | Attacker **appends a memo to a transaction Chainflip validators had already signed** | **T10.002.001 — forged source event** |
| same | Protocol parses the appended memo as a **separate swap**, marks it **failed**, and issues a **refund** — the same deposit pays out twice | **T10.002.001 exploitation** |
| over ~90 min | Pattern repeated **eight times**, values roughly **doubling each round**; **six** succeed for **736,442.17 USDT** | (escalation ladder) |
| end of window | Later payout attempts **fail and trigger internal monitoring** | (detection — internal, not external) |
| 2026-09-13 | Chainflip discloses, **pauses all routes**, flags funds for recovery, commits to making users whole | (operator response) |
| 2026-09-13 | **115,654.41 USDT** of pending user swap confirmed still in the vault and recoverable | (contained exposure) |
| through 2026-09-14 | Network remains paused pending protocol update and restart plan; **full technical report outstanding** | (open item) |

## What defenders observed

- **The escalation ladder is the detection signal, and it was available from round two.** The attacker opened small and doubled. That shape — the same operation repeated against one path with monotonically increasing value — is what probing looks like, and it ran for ninety minutes before anything stopped it. Chainflip's monitoring did fire, but it fired on **failed** payouts, meaning the alarm was wired to the attacker's mistakes rather than to the pattern of their successes.
- **Refunds are a payout path and are routinely reviewed as if they were not.** The money left through the **failure-handling branch**, which is the part of a settlement system that gets the least adversarial attention: it is defensive code, written to return value to users, and its invariant — *refund only what was actually received and not yet settled* — is rarely stated as an invariant at all. A refund that cannot name the deposit it reverses is not a refund.
- **Per-chain settlement code concentrates risk in the least-exercised path.** Chainflip's other chains use contract calls; only Tron used memos. The path with the fewest users, the least traffic and the fewest eyes was structurally the most different from the reviewed norm. **Where a multi-chain protocol's code diverges per substrate, the divergence itself is the audit target.**
- **A custody reconciliation would have caught this at payment one.** The generic control for this class applies unchanged: before releasing X, confirm the custody account holds at least X more than at the last reconciliation point. Six duplicate payouts against one deposit means the locked-versus-issued invariant was drifting from the first success, and nothing was reading it.
- **Disclosure was fast; the compensation mechanism was not specified.** Chainflip acknowledged within a day, named the affected path, and confirmed what remained recoverable. What it did not say is **where the make-whole funds come from**, which is the part users cannot verify for themselves and the part that determines whether a commitment is a plan or an intention.

## Public references

- `[cryptotimeschainflip2026]` — The Crypto Times, "Chainflip Halts Network After \$736K Tron USDT Exploit; Users to Be Made Whole" (2026-09-13; 736,442.17 USDT; eight attempts over ~90 minutes with values roughly doubling, six successful; 115,654.41 USDT pending swap recoverable; all routes paused): <https://www.cryptotimes.io/2026/09/13/chainflip-halts-network-after-736k-tron-usdt-exploit-users-to-be-made-whole/>
- `[cryptonewschainflip2026]` — crypto.news, "Chainflip loses 736,442 USDT in TRON exploit" (memo appended to already-signed transactions read as a separate failed swap, producing duplicate refunds; Tron-specific code path): <https://crypto.news/chainflip-loses-736442-usdt-in-tron-exploit/>
- `[blockfencechainflip2026]` — Blockfence, "Chainflip Loses \$736K in TRON USDT Memo Exploit, Pauses Network-Wide Swaps" (memo fields in signed transactions triggering duplicate payouts; network-wide pause): <https://blockfence.io/chainflip-loses-736k-in-tron-usdt-memo-exploit-pauses-network-wide-swaps/>

## Discussion

This is the **third anchor** for **OAK-T10.002.001**, after **Across / Risk Labs on Solana** (2026-07-17, parse-level) and the **Coreum–XRPL bridge** (2026-08-09, semantic / custody-level). It sits with Coreum in sub-shape **(b)** — the fields of a well-formed message were validated, the fact the message asserted was not — and the two are close enough to read as a pair: both bridges accepted a **memo** as a statement about a deposit, and neither reconciled that statement against custody.

What Chainflip adds is a **provenance twist the first two anchors do not have**. In the Coreum case the attacker authored the whole carrier: they moved their own tokens and attached their own memo, and the relayer's mistake was trusting a stranger's message. Here the carrier was **Chainflip's own signed transaction**, and the memo rode in on it. Any observer heuristic of the form *"is this transaction one of ours?"* returns **true**, correctly, and still lets the payload through. That makes the case worth keeping distinct in the anchor set: it demonstrates that **signature provenance on the carrier is not authorisation of the contents**, and that an observer can be defeated without ever being lied to about who it is talking to.

`VERSIONING.md` puts the `emerging` → `stable` bar at **three anchored worked examples plus multi-source forensic attestation**. When this file was first written the anchor count was met and the attestation leg was not — Chainflip's account rests on its own disclosure, with the full technical report outstanding — so promotion was deferred.

**That determination was superseded the same day.** Re-examining the class turned up two further anchors in a sub-shape the Technique had not named: **KelpDAO / LayerZero** (2026-04-18, ~\$292M), which OAK had been carrying under the wrong Technique entirely, and **Long** (2026-09-14, ~\$118K). KelpDAO supplies the attestation the set was missing — LayerZero Labs' own two-part incident report, Chainalysis, Blockaid, and attribution by Mandiant, CrowdStrike and zeroShadow — and **T10.002.001 was promoted to `stable` on 2026-09-16** with five anchors across three sub-shapes.

Chainflip's contribution to that set is the **provenance twist**, and it survives the promotion intact: it is the anchor that shows an observer can be defeated **without being lied to about who it is talking to**. Counted as an anchor, not as attestation.
