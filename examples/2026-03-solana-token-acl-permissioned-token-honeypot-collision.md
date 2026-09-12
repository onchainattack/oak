# Solana permissioned tokens — since March 2026 a regulated fund and a honeypot have the same on-chain shape, and only the freeze authority's owner separates them — Token ACL (sRFC-37) / Solana — 2026-03-06 onward

**Loss:** **none recorded — this is a detection-surface entry, not an incident.** OAK files it for the same reason it files the 2026-06 Zcash Orchard disclosure: a documented condition changed what a defender can conclude from on-chain evidence. What changed here is that **"the mint is default-frozen with a live freeze authority" stopped being sufficient evidence of a honeypot**, because a regulated tokenised fund now presents exactly that shape by design.

**OAK Techniques observed:** **OAK-T1.006** (Honeypot-by-Design — the class whose canonical Solana detection signal this development degrades: a mint configured so buyers can acquire and cannot move, historically identifiable from **`DefaultAccountState = Frozen`** plus a live freeze authority. See [`techniques/T1.006-honeypot-by-design.md`](../techniques/T1.006-honeypot-by-design.md)). **OAK-T1.004** (Blacklist / Pausable Weaponization — the same primitive read from the other side: freeze authority is a legitimate compliance control and a trap mechanism, and until now the presence of the control was treated as the tell).

**Attribution:** **unattributed** — and specifically **no adversary**. The subject is a Solana Foundation standard and its deployment, not an attack. The entry records an **ambiguity that scammers can occupy**, and the public reporting notes the obvious occupation route — the metadata field declaring `token_acl` conformance is free text and **forgeable by anyone** — without naming a case that has done so.

**Key teaching point:** **When a compliance feature ships with the same on-chain footprint as a scam, the detection signal moves from the shape to the provenance of the authority.** The check that still works is not "is this mint frozen by default?" but **"who owns the freeze authority account?"** — fetched from chain, not matched against a claimed address. In a conformant Token ACL mint the freeze authority is a **MintConfig PDA owned by the Token ACL program itself**, which means control sits in **executable code with a published rulebook** rather than in an issuer's wallet, and the MintConfig names a **gate program** that answers `can_thaw_permissionless(wallet)` in the same transaction as the holder's thaw. A honeypot can copy the frozen default and paste the metadata claim; it cannot make its freeze authority be owned by a program it does not control. **Structure without the claim is still verifiably permissioned; a claim without the structure is a scam wearing the standard's clothes.**

## Summary

**Token ACL (sRFC-37)** is the Solana Foundation's mechanism for **permissioned tokens** — assets whose issuer must restrict who may hold them, for regulatory reasons. It was proposed in **October 2025**, documented on **2026-01-12**, and recorded its **first mainnet transaction on 2026-03-06**. It is genuinely early: roughly **514 transactions total as of late August 2026**, against real institutional capital.

A conformant mint has three verifiable parts. **`DefaultAccountState` is set to Frozen**, so every new holder's token account starts locked. The mint's **freeze authority is delegated to a MintConfig PDA owned by the Token ACL program** (`TACLkU6…52TP`) rather than to the issuer's wallet. And the MintConfig names a **gate program** that decides eligibility — the reference Allow/Block-List gate (`GATEzz…iULz`) offers Allow (KYC allowlist), Block (sanctions list), AllowAllEoas, and Composite modes. Holders call a permissionless thaw; the gate rules on it inline. **Spiko Digital Assets' euro cash-and-carry fund (eurSPKCC)**, a regulated French tokenised fund, runs the textbook configuration.

The collision is structural. A **freeze-authority honeypot** — a token you can buy and cannot sell — is built the same way: default-frozen accounts, live freeze authority. On-chain, **a European money-market fund following its regulator's rules and a trap are the same shape.** The metadata field asserting Token ACL conformance is not enforced by anything and can be copied into a malicious mint.

What survives as a discriminator is **ownership of the freeze authority account**: conformant mints delegate it to a PDA owned by the Token ACL program, verifiable by fetching the authority's `owner` field. A scam that wants the shape has to give up the control.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2025-10 | **sRFC-37 (Token ACL)** proposed as the Solana Foundation's permissioned-token standard | (standard proposed) |
| 2026-01-12 | Official documentation published | (standard documented) |
| **2026-03-06** | **First mainnet transaction** — permissioned tokens with default-frozen accounts enter production | **T1.006 detection signal becomes ambiguous** |
| 2026-08 (late) | Roughly **514 transactions** on the program; small usage, real institutional capital (e.g. **eurSPKCC**) | (early-stage adoption) |
| standing | Metadata claiming `token_acl` conformance is **unenforced and forgeable**; only the freeze authority's **owning program** is structural | **T1.004 / T1.006 discriminator** |

## What defenders observed

- **A safety heuristic can be retired by something entirely legitimate.** Nobody attacked the signal. A standards body shipped a compliance mechanism whose correct implementation happens to look like the thing the signal was built to catch. **Detection rules have an expiry date set by protocol evolution, not by attackers**, and freeze-authority-equals-honeypot expired on 2026-03-06.
- **The replacement check is structural and cheap, which is the good news.** Fetch the freeze authority account, read its `owner`, compare to the Token ACL program id, and read the MintConfig for the declared gate. Three reads, no heuristics, no metadata trust. A wallet or aggregator can run it pre-trade.
- **Metadata is the soft spot and it is soft by design.** The conformance claim is a string. Any honeypot can carry it. **Every check in this area must resolve against account ownership rather than declarations**, which is the same lesson as the StableMagnet verified-source case (2021-06) one layer down: the badge is scoped, and the scope is where the deception lives.
- **Token ACL verifies the freeze mechanism and nothing else.** A legitimately permissioned mint can still carry a **permanent delegate**, burn permissions or pause controls — the authorities that OAK's 2026 Q1 PermanentDelegate continuation entry describes being weaponised while the checker-visible authorities are revoked. **Conformance to this standard is not a safety rating**, and treating it as one recreates the problem one level up.
- **514 transactions is the window.** The population of conformant mints is currently small enough to enumerate exactly. That will not stay true, and the moment to build the ownership check into wallets and aggregators is while the legitimate set is still countable.

## Public references

- `[srfc37discussion]` — Solana Foundation SRFCs, "sRFC 37: Token ACL Standard" — the proposal and design discussion: <https://github.com/solana-foundation/SRFCs/discussions/2>
- `[solanatokenaclrepo]` — Solana Foundation, `token-acl` program repository — the MintConfig PDA, gate-program interface and reference Allow/Block-List gate: <https://github.com/solana-foundation/token-acl>
- `[devtotokenaclhoneypot2026]` — "Permissioned Tokens on Solana: How Token ACL Works — and How to Tell It From a Honeypot", DEV Community (2026-08; first mainnet transaction 2026-03-06, ~514 transactions by late August, the program and gate addresses, the eurSPKCC example, the forgeable-metadata point and the freeze-authority-owner check): <https://dev.to/sulimanmukhtar/permissioned-tokens-on-solana-how-token-acl-works-and-how-to-tell-it-from-a-honeypot-4k73>
- Companion entry: [`examples/2026-q1-solana-permanent-delegate-renouncement-theatre-continuation.md`](./2026-q1-solana-permanent-delegate-renouncement-theatre-continuation.md) — the other 2026 Token-2022 authority surface, where operators revoke the authorities checkers read and keep the one they do not.

## Discussion

OAK's T1 coverage is built on the premise that **token-genesis defects are statically detectable**: the authority is present or it is not, the tax is modifiable or it is not, the sell path reverts or it does not. That premise is what makes T1 the corpus's most automatable Tactic. This entry records the first case where **a legitimate protocol development took a T1 detection signal away**, and it is worth separating from the ordinary arms race: the corpus's 2026 Q1 PermanentDelegate continuation describes operators *evading* checkers, which is adversarial and expected. Here nothing adversarial happened at all, and the signal degraded anyway.

The pattern will recur, because the underlying cause is durable: **compliance controls and extraction controls are the same primitives.** Freezing an account is sanctions enforcement or a honeypot. Clawing back tokens is a regulator's requirement or theft. Pausing transfers is incident response or an exit. Every standard that gives issuers a legitimate version of one of these hands scammers a camouflage layer, and each time the discriminator has to move one level deeper — from *does the authority exist* to *who holds it* to, eventually, *what does the code holding it actually permit*.

For contributors: when a Technique's detection signal depends on the presence of an on-chain authority, record **what legitimate use of that authority looks like** in the Technique page, not only the malicious one. The corpus's T1 pages largely do not, which is why this development is easy to miss — and the next contributor auditing a frozen-by-default Solana mint against T1.006 will otherwise flag a regulated fund.
