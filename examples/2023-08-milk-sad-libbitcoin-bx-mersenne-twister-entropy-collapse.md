# Milk Sad — `bx seed` documents 128–256 bits of entropy and delivers 32, because Mersenne Twister is seeded on the system clock: same second, same "random" wallet — Libbitcoin Explorer (CVE-2023-39910) — theft 2023-07-12, disclosed 2023-08-08

**Loss:** **\$900,000+** across multiple chains, from **2,600+ distinct Bitcoin wallets** confirmed affected. The principal theft event on **2023-07-12** targeted approximately **29.65 BTC (~\$850,000** at August 2023 rates**)**. Affected assets span **Bitcoin, Ethereum, XRP, Dogecoin, Solana, Litecoin, Bitcoin Cash, Zcash** and probably others, since any chain deriving keys from an affected mnemonic inherits the defect. The name comes from **the first two words of the first seed phrase** the broken generator produces.

**OAK Techniques observed:** **OAK-T11.004** (Insufficient-Entropy Key Generation — *primary, confirmed mechanism*, and the canonical **32-bit-clock-seed** shape of the class. The `bx seed` command in **Libbitcoin Explorer** used the **Mersenne Twister (MT19937)** pseudorandom generator **seeded with only 32 bits of system clock time**, while the command's own documentation advertised **128–256 bits of entropy**. The practical consequence is captured by the researchers' own demonstration — running the tool under a fixed clock with `libfaketime` produced **identical mnemonics**: *"Same time — same 'random' wallet."* The keyspace collapses from `2^256` to `2^32`, roughly 4.3 billion candidates, exhaustively enumerable in days on consumer hardware. See [`techniques/T11.004-insufficient-entropy-key-generation.md`](../techniques/T11.004-insufficient-entropy-key-generation.md)). **OAK-T5.001** (Hard Drain — the on-chain manifestation: a coordinated sweep of precomputed keys).

**Attribution:** **pseudonymous** for the theft. No named individual or group. The **2023-07-12** event was a **coordinated sweep** in which `bx`-derived wallets were drained alongside **other weak-wallet cohorts**, indicating an operator working a portfolio of known-weak key classes rather than a Libbitcoin-specific campaign. The **research and disclosure** are firmly attributed: a team led by **Distrust LLC** — **Anton Livaja, Lance Vick, Ryan Heywood, Shane Engelman** — with independent security researchers, who found the defect **during incident response** to the theft rather than through proactive review.

**Key teaching point:** **The tool documented 128–256 bits and delivered 32, and nothing in the user's workflow could have revealed the difference.** A `bx seed` mnemonic looks exactly like a strong one: correct BIP-39 word count, valid checksum, addresses and signatures indistinguishable from any other wallet at the consensus layer. The gap between documented and actual entropy was invisible from every position a user occupies. Two lessons generalise. First, **entropy is a claim, and claims about entropy should be tested rather than read** — the researchers' `libfaketime` demonstration is the whole methodology, and it is cheap: pin the clock, generate twice, compare. Any generator that produces the same output under a fixed clock is seeded on the clock, and that test would have caught this at any point in six years. Second, **a general-purpose PRNG in a key-generation path is a defect regardless of how it is seeded** — Mersenne Twister is a statistical-simulation generator, not a CSPRNG, and its presence anywhere near seed derivation is a finding in itself. The related **CVE-2023-31290 in Trust Wallet** involved *identical* Mersenne Twister misuse, discovered earlier and affecting a different user base only because the two consumed PRNG output differently. The same wrong primitive, reached independently, twice.

## Summary

**Libbitcoin Explorer** (`bx`) is a widely used Bitcoin command-line tool. Its **`bx seed`** command generates wallet seeds and documented itself as producing **128 to 256 bits of entropy**.

It did not. `bx seed` used the **Mersenne Twister (MT19937)** PRNG **seeded with 32 bits of system clock time**. Effective entropy was therefore **2^32** — about **4.3 billion** possible seeds — rather than the advertised `2^128`–`2^256`. An attacker can enumerate that entire keyspace **in days on consumer hardware**, deriving every wallet the tool ever produced.

The researchers demonstrated the defect directly: running `bx seed` under a fixed clock using **`libfaketime`** produced **identical mnemonics**. Same second, same wallet.

The vulnerability affects **`bx` versions 3.0.0 through 3.6.0**, with potential exposure in earlier 2.x versions, covering seeds generated from roughly **2017 to August 2023**. Because the output is a standard BIP-39 mnemonic, the weakness propagates to **every chain derived from it** — Bitcoin, Ethereum, XRP, Dogecoin, Solana, Litecoin, Bitcoin Cash, Zcash and others.

Exploitation ran through **June and July 2023**, probably beginning at small scale in **May 2023**. The **principal theft on 2023-07-12** took approximately **29.65 BTC (~\$850,000)**, and `bx` users were drained **alongside other weak-wallet cohorts** in the same coordinated action. Confirmed impact reached **2,600+ distinct Bitcoin wallets** and **\$900,000+** across chains.

The defect was found **on 2023-07-21, during incident response to the theft**, by a team led by **Distrust LLC**. Coordinated disclosure with the Libbitcoin maintainers ran **2023-07-22 to 2023-08-05**; **CVE-2023-39910** was assigned on **2023-08-07**; public disclosure followed on **2023-08-08**.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| ~2017 | `bx` 3.0.0 line in circulation; `bx seed` uses Mersenne Twister seeded on 32 bits of system clock time while documenting 128–256 bits of entropy | **T11.004 defect standing** |
| 2017 → 2023-08 | Six years of seed generation at 2^32 effective keyspace across every chain derivable from the mnemonic | **(standing exposure)** |
| ~2023-05 | Exploitation likely begins at small scale | **T5.001** |
| 2023-06 → 2023-07 | Ongoing exploitation in the wild | **T5.001** |
| 2023-07-12 | Principal coordinated theft: ~29.65 BTC (~\$850,000); `bx` wallets drained alongside other weak-wallet cohorts | **T11.004 → T5.001** |
| 2023-07-21 | Distrust LLC team discovers the root cause **during incident response** | (discovery) |
| 2023-07-22 → 2023-08-05 | Coordinated disclosure with the Libbitcoin team | (disclosure process) |
| 2023-08-07 | **CVE-2023-39910** assigned | (CVE) |
| 2023-08-08 | Public disclosure published; 2,600+ affected wallets and \$900,000+ losses documented | (public disclosure) |

## What defenders observed

- **Pre-event (a documented entropy claim nobody tested).** The command advertised 128–256 bits and delivered 32 for approximately six years. Documentation is not a control. **Generators should be tested for the property they claim**, and the test here is trivial: fix the clock, generate twice, compare outputs (M23).
- **Pre-event (Mersenne Twister anywhere near key derivation is the finding).** MT19937 is a simulation-grade PRNG with no cryptographic guarantees, and is trivially predictable from observed output. Its presence in a seed path is a defect independent of the seeding question, and a grep-level review item for any wallet codebase.
- **Pre-event (the same mistake, independently, twice).** **CVE-2023-31290** (Trust Wallet) is the identical Mersenne Twister misuse in a different product, discovered earlier, with a different affected population purely because the two consumed PRNG output differently. That two unrelated teams reached the same wrong primitive suggests the failure is one of **default library ergonomics** — the convenient generator is the wrong one — rather than of any single team's competence.
- **At-event (multi-chain blast radius from one mnemonic).** A weak BIP-39 mnemonic compromises **every** chain derived from it. Users who generated with `bx` for Bitcoin and reused the mnemonic for Ethereum or Solana lost across all of them. Incident scoping for this class must enumerate derivation paths, not addresses on one chain.
- **At-event (portfolio sweeping across weak-wallet cohorts).** `bx` wallets were drained in the same coordinated action as other weak-key classes, which indicates an operator maintaining a **standing inventory of known-weak key populations** and sweeping them together. That behaviour makes disclosure timing genuinely dangerous — publication adds a new cohort to an existing pipeline.
- **Response (found during incident response, not by review).** The defect surfaced only because someone investigated a theft already in progress. Six years of code review, packaging, and use by security-literate operators did not surface it, which is the recurring property of this class.

## Public references

- `[milksaddisclosure2023]` — Milk Sad research team, "Milk Sad — full disclosure write-up" (the primary technical source: CVE-2023-39910, `bx` 3.0.0–3.6.0, Mersenne Twister MT19937 seeded with 32 bits of system clock time against a documented 128–256 bits, the `libfaketime` "same time — same 'random' wallet" demonstration, 2,600+ affected wallets, \$900,000+ losses, the 2023-07-12 ~29.65 BTC theft, the full 07-21 discovery → 08-07 CVE → 08-08 disclosure timeline, the multi-chain scope, the CVE-2023-31290 Trust Wallet parallel, and attribution of the research to Distrust LLC — Anton Livaja, Lance Vick, Ryan Heywood, Shane Engelman): <https://milksad.info/disclosure.html>
- `[milksadsummary2023]` — Milk Sad research team, "`bx` summary" (condensed CVE-2023-39910 summary and affected-version matrix): <https://milksad.info/cve_2023_39910_summary.html>
- `[ghsamilksad2023]` — GitHub Security Advisory GHSA-prgj-h7jq-7p9h (the advisory record for the Libbitcoin Explorer weak-entropy vulnerability): <https://github.com/advisories/GHSA-prgj-h7jq-7p9h>
- `[nobsbitcoinmilksad2023]` — NOBSBitcoin, "Milk Sad: Wallet Theft Enabled By Weak Entropy" (independent coverage of the disclosure and its practical implications for users): <https://www.nobsbitcoin.com/milk-sad-vulnerability-disclosure/>
- `[invdmilksad2023]` — invd blog, "Milk Sad — How Weak Entropy can Ruin Your Savings (CVE-2023-39910)" (researcher-side write-up of the defect and its exploitation): <https://blog.inhq.net/posts/milk-sad-vuln1/>

## Discussion

Milk Sad enters OAK as a backfill prompted by the **Coldcard** incident of 2026-07/08, which public analysis identified as **the third major failure of this class** after Milk Sad and **Ill Bloom**. The corpus held none of the three; it now holds all of them, and the value is in reading them together at [`examples/2026-07-coldcard-firmware-rng-fallback-entropy-collapse-sweep.md`](2026-07-coldcard-firmware-rng-fallback-entropy-collapse-sweep.md) and [`examples/2026-05-ill-bloom-mobile-wallet-weak-prng-recovery-phrase-sweep.md`](2026-05-ill-bloom-mobile-wallet-weak-prng-recovery-phrase-sweep.md).

The three share a structure that is now specific enough to state as a prediction rather than an observation. **The defect is introduced quietly**, in a migration, a library default, or a convenience call. **It persists for years** — Milk Sad roughly 2017 to 2023, Coldcard 2021 to 2026 — because nothing in normal operation distinguishes a weak seed from a strong one. **It is found by an outsider, usually during incident response**, not by the vendor and not by review. And **it is unfixable in place**: patched software generates good keys going forward and does nothing whatsoever for keys already produced, so remediation is always a migration and the affected population always includes people who will never hear about it.

Milk Sad's distinct contribution to the cohort is the **documentation gap**. Coldcard's flaw was a silent regression from a correct design; `bx seed`'s was a generator that **advertised a specific entropy figure it never provided**, in its own manual, for six years. That makes it the cleanest argument in the corpus for treating stated cryptographic properties as **testable assertions rather than specifications**, and the `libfaketime` method is the cheapest verification technique OAK documents anywhere — pin the clock, generate twice, compare. It would have taken minutes and saved 2,600 wallets.

The **CVE-2023-31290** parallel deserves to stay attached to this entry. Trust Wallet reached the identical Mersenne Twister misuse independently, and the two cases differ in affected population only because of how each consumed the generator's output. When the same wrong primitive appears in unrelated codebases, the useful conclusion is about the ecosystem's defaults rather than about either team — and it suggests that a survey of seed-generation paths across wallet software for general-purpose PRNGs would still be worth running today.
