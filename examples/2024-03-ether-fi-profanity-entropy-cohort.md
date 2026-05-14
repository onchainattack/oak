# Profanity vanity-address entropy cohort tail — Ethereum — 2023–2024 (cohort-extended case)

**Loss:** unquantified in aggregate for the 2023–2024 tail window. The Profanity entropy-collapse vulnerability (publicly disclosed by 1inch on 2022-09-15) continued to generate sporadic extractions from un-rotated Profanity-affected addresses through 2023 and into 2024, including addresses associated with DeFi protocol deployers, institutional custody operations that had not completed authority-graph audits, and a long tail of individual users who had not rotated keys. No single aggregated dollar figure is available in the public record for the 2023–2024 tail; the cohort's significance is in demonstrating that the half-life of known cryptographic vulnerabilities after disclosure is materially longer than defender intuition suggests.

**OAK Techniques observed:** **OAK-T11.004** (Insufficient-Entropy Key Generation) — primary; the Profanity 32-bit-seed CPRNG flaw is the canonical entropy-collapse class. The 2023–2024 tail extractions represent the same T11.004 surface as the 2022-09 cohort — same vulnerability, same tool, same recovery primitive — simply occurring later in the post-disclosure timeline. **OAK-T11 broadly construed** — cross-cutting custody-surface vulnerability framing.

**Attribution:** **pseudonymous / multiple-actor.** The 2023–2024 tail extractions are consistent with a mix of opportunistic exploitation by independent actors (small-value extractions from discovered but un-rotated addresses) and targeted exploitation by more sophisticated operators (higher-value extractions where the attacker identified un-rotated Profanity addresses with material balances or downstream contract authority). No specific actor attribution for the 2023–2024 tail was confirmed by any authoritative source at v0.1.

**Cohort framing:** this is a **cohort-tail case** — the long-tail continuation of the Profanity cohort beyond the initial 2022-09 exploitation window. The cohort-tail case captures the extended operational pattern that the Wintermute canonical incident (`examples/2022-09-wintermute.md`) and the 2022-09 cohort case (`examples/2022-09-wintermute-profanity-cohort.md`) do not cover: the persistence of T11.004 exploitation long after the disclosure and the initial wave, driven by un-rotated addresses that remained in the exploitable set.

**Key teaching point:** **The Profanity cohort tail is the v0.1 evidence that the half-life of known cryptographic vulnerabilities after public disclosure is measured in years, not weeks — un-rotated Profanity addresses continued to be drained in 2023 and 2024, long after the disclosure, the Wintermute incident, and the initial cohort wave.** The defender lesson is that post-disclosure rotation is not a one-time event but a standing operational requirement whose compliance decays over time; the cohort-tail extractions represent the compliance-decay cost.

## Summary

On September 15, 2022, the 1inch Network published a public disclosure of a cryptographic vulnerability in Profanity, an open-source Ethereum vanity-address generator. Profanity seeded its CPRNG with a 32-bit unsigned integer, reducing the effective key-generation entropy to roughly 2^32 (~4.3 billion) values — a search space GPU-feasible for private-key recovery. The disclosure included proof-of-concept key recovery and explicit rotation guidance. The initial exploitation wave (September 15–20, 2022) extracted approximately $3.3M from non-Wintermute Profanity-affected wallets, followed by the Wintermute DeFi vault drain of approximately $160M on September 20, 2022.

The public-record assumption at the time was that the Wintermute incident would trigger ecosystem-wide rotation: every Profanity-affected address holder would see the headline, recognise the risk, and rotate their keys within days. This assumption was incorrect. Through 2023 and into 2024, additional extractions from un-rotated Profanity addresses continued to be observed in on-chain forensic data:

- **DeFi protocol deployer addresses.** Several smaller DeFi protocols had used Profanity-generated vanity addresses as deployer/admin addresses for their protocol contracts. These addresses held admin authority over deployed contracts (treasury, token mint, parameter-update functions) but held near-zero ETH balances — making them invisible to balance-based monitoring. When Profanity-affected, the attacker could reach contract-layer assets through the admin authority even though the EOA balance itself was negligible.

- **Institutional custody operations with incomplete authority-graph audits.** A small number of institutional custody operations had used Profanity-generated addresses for specific operational purposes (gas-saving leading-zeros patterns for hot-wallet operations) and had rotated the direct balances but not the downstream admin/signer authorities that the same addresses held over multi-signature wallets, DeFi vaults, and protocol contracts. The incomplete authority-graph audit produced a standing T11.004 surface: the key was rotated for the visible balance but not for the invisible authority.

- **Individual users with dormant or low-balance Profanity addresses.** A long tail of individual users had generated Profanity vanity addresses for aesthetic or gas-saving reasons and had either: (a) not seen the disclosure (limited industry reach), (b) deferred rotation because the address balance was negligible, or (c) forgotten the address existed. When these addresses later received deposits (airdrops, forgotten refunds, staking-reward distributions), the attacker — who had pre-computed the private keys for the entire Profanity address space during the 2022 window — could sweep the balance.

The 2023–2024 tail extractions were individually small (typically four-to-six figure USD values per extraction) and sporadically distributed across the post-disclosure timeline. No single extraction approached the Wintermute $160M scale, and the aggregate tail is not aggregated to a single public dollar figure. The tail's significance is in its duration: the Profanity vulnerability remained exploitable for un-rotated addresses more than two years after disclosure, demonstrating that the operational rotation-discipline half-life for cryptographic vulnerabilities is materially longer than defender intuition assumes.

For OAK's purposes, the 2023–2024 Profanity cohort tail is the worked example for the **half-life-of-known-vulnerability-after-disclosure** operational metric. The metric captures the duration over which un-rotated addresses remain in the exploitable set after disclosure. The Profanity tail evidence suggests the half-life is on the order of years for a vulnerability that affects a broad, heterogeneous address population (institutional + individual + protocol-deployer) — and that the tail extractions continue for as long as any un-rotated address in the exploitable set holds value or authority.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-09-15 | 1inch publishes public disclosure of Profanity 32-bit-seed CPRNG vulnerability; explicit rotation guidance issued | (public disclosure) |
| 2022-09-15 to 2022-09-20 | ~$3.3M extracted from non-Wintermute Profanity-affected wallets (initial cohort wave) | **T11.004 cohort extraction phase 1** |
| 2022-09-20 | Wintermute DeFi vault drain (~$160M) — canonical large-institutional anchor | **T11.004 large-institutional anchor** |
| 2022-Q4 to 2023-Q1 | Sporadic smaller extractions from un-rotated Profanity addresses continue; rotation activity plateaus after the initial post-disclosure spike | **T11.004 cohort extraction tail onset** |
| 2023 | Additional Profanity-affected addresses with downstream contract authority identified and exploited; DeFi protocol deployer addresses drained via admin-authority path | **T11.004 authority-graph exploitation** |
| 2023–2024 | Long-tail extractions continue from dormant/forgotten Profanity addresses that received airdrops, staking rewards, or other unexpected deposits | **T11.004 cohort extraction tail** |
| Continuing at v0.1 | Addresses in the Profanity exploitable set that remain un-rotated are permanently exploitable; the half-life of the vulnerability is bounded only by the decay of un-rotated addresses in the exploitable set | **T11.004 permanent vulnerability** |

## Realised extraction

Unquantified in aggregate for the 2023–2024 tail window. Individual extractions were typically in the four-to-six figure USD range. No single aggregated public figure is available; the tail's significance is in its duration and the persistence of un-rotated addresses in the exploitable set, not in the aggregate extraction sum.

## Public references

- `[1inchprofanity2022]` — 1inch Network primary disclosure of the Profanity 32-bit-seed CPRNG vulnerability (2022-09-15).
- `[halbornwintermute2022]` — Halborn technical post-mortem of the Wintermute incident and the un-rotated-admin-authority failure mode.
- `[halbornprofanitytool2022]` — Halborn companion post-mortem on the Profanity tool itself.
- Cross-reference: T11.004 at `techniques/T11.004-insufficient-entropy-key-generation.md`.
- Cross-reference: [`examples/2022-09-wintermute.md`](2022-09-wintermute.md) — Wintermute canonical T11.004 incident (~$160M, 2022-09-20).
- Cross-reference: [`examples/2022-09-wintermute-profanity-cohort.md`](2022-09-wintermute-profanity-cohort.md) — Profanity vanity-address cohort (~$3.3M+, 2022-09 to 2022-12).

## Discussion

The Profanity cohort tail is OAK's canonical evidence that the operational half-life of publicly-disclosed cryptographic vulnerabilities is measured in years, not weeks. The tail's structural driver is the heterogeneity of the affected address population:

- **Institutional addresses** have dedicated security teams, rotation runbooks, and authority-graph audit procedures — they rotate within days of disclosure (or, as Wintermute demonstrated, they sometimes do not).
- **Protocol-deployer addresses** may have no dedicated security function and may not track address-generation provenance — they remain un-rotated until the exploit is discovered.
- **Individual-user addresses** may never see the disclosure, may not understand the risk, or may not consider the address worth rotating if the balance is negligible — they remain in the exploitable set indefinitely.

This heterogeneity means the post-disclosure exploitation curve has two phases: a sharp initial spike (days 1–5, representing the institutional-and-high-balance response window) followed by a long, flat tail (months-to-years, representing the residual un-rotated population). The tail persists until every address in the exploitable set has been either rotated or drained. For a vulnerability like Profanity, where the exploitable set was pre-computable by any attacker who ran the GPU recovery (the 2^32 key space is finite and enumerable), the tail extraction rate is bounded by the attacker's ability to monitor the exploitable set for value-inflow, not by the difficulty of key recovery.

The defender lesson for future T11.004-class disclosures: post-disclosure rotation is not complete when the initial wave passes. It is complete when every address in the exploitable set has been rotated or explicitly confirmed as holding zero value and zero authority. The authority-graph audit — enumerating every contract, multisig, and protocol for which a given address holds admin/signer/authority privilege — is the load-bearing operational artefact for institutional and protocol-deployer victims; the balance check alone is insufficient.
