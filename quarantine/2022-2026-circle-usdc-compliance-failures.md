> **QUARANTINED 2026-11-27 — not part of the OAK corpus.** The 2026-11 source pass rewrote this file from the pages it could open and found no attack to record: it records an investigator's allegations about how fast a stablecoin issuer froze funds from other incidents; it is not an incident itself. It is kept here, outside `examples/`, and can return if a source documents an incident.

# Circle USDC — ZachXBT alleges slow or missing freezes of illicit USDC in 15 cases — USDC issuer response — 2022–2026

**Loss:** no loss to Circle or its users is claimed. ZachXBT alleges about \$420M of illicit fund flows since 2022 that Circle did not freeze or blacklist in time, across 15 cases ([Cointelegraph](https://cointelegraph.com/news/zachxbt-accuses-circle-420m-compliance-failures-since-2022), [post](https://x.com/zachxbt/status/2040055757211885953)). The figure is his allegation. One outlet found by search reported \$440M; OAK did not open it.

**OAK Techniques observed:** none — allegation about issuer response to other incidents, not an attack on a crypto user or system. The stablecoin-issuer coordination laundering Technique is related but not declared: the opened pages do not describe laundering routed through USDC because of a freeze policy, and that Technique's page and this file have not been reconciled.

**Attribution:** **unattributed** — no attacker. The claims are ZachXBT's; Cointelegraph had no reply from Circle at publication ([Cointelegraph](https://cointelegraph.com/news/zachxbt-accuses-circle-420m-compliance-failures-since-2022)).

**Key teaching point:** **The ability to freeze is not the same as a freeze happening in the hours when funds are moving, so a defender should send the issuer a freeze request with addresses and evidence the minute an exploit starts, and should not plan on the freeze arriving in time.** In the Drift case ZachXBT alleges attackers made over 100 USDC-to-ETH conversions in about six hours, which is the window a freeze would have had to land in ([Cointelegraph](https://cointelegraph.com/news/zachxbt-accuses-circle-420m-compliance-failures-since-2022)).

## Summary

On 2026-04-03 ZachXBT posted "Welcome to the Circle \$USDC files", alleging \$420M+ in compliance failures since 2022, including fifteen cases of Circle taking minimal action against illicit funds ([post](https://x.com/zachxbt/status/2040055757211885953)). Cointelegraph reports that he said Circle had several hours or days to freeze in many of the 15 cases and did not, that the \$420M covers only major public cases, and that he holds USDC and does not want Circle to fail. Cases it names: \$9M of USDC from the July 2025 GMX hack, wallets tied to the May 2025 Cetus hack blacklisted only after the USDC had become ETH, and \$232M from the Drift Protocol hack. CryptoSlate adds a counter-allegation: Circle froze 16 operating business wallets in a sealed US civil matter and later unfroze at least one ([CryptoSlate](https://cryptoslate.com/circle-usdc-freeze-power-scrutiny-wallets-stolen-funds/)).

The earlier version of this file said Tether freezes aggressively and that attackers choose USDC for that reason. Neither opened page says that; the Tether comparison is removed. The full list of the 15 cases was not found in the pages OAK opened, so only the named ones are listed.

## Timeline (UTC)

Stages: the allegation and Circle's stated policy. The underlying thefts have their own stages in their own incident files.

| When | What happened | OAK |
|---|---|---|
| 2022 | Circle freezes USDC held by Tornado Cash addresses sanctioned by OFAC. [Cointelegraph](https://cointelegraph.com/news/zachxbt-accuses-circle-420m-compliance-failures-since-2022) | response |
| 2025-05 | Cetus hack: wallets tied to it are allegedly blacklisted only after the USDC was converted to ETH. [Cointelegraph](https://cointelegraph.com/news/zachxbt-accuses-circle-420m-compliance-failures-since-2022) | — |
| 2025-07 | GMX hack: about \$9M of USDC allegedly not frozen. [Cointelegraph](https://cointelegraph.com/news/zachxbt-accuses-circle-420m-compliance-failures-since-2022) | — |
| 2025-09 | Circle's president says Circle is exploring reversible USDC transactions for hacks, theft or fraud; the article does not tie this to the allegations. [Cointelegraph](https://cointelegraph.com/news/zachxbt-accuses-circle-420m-compliance-failures-since-2022) | response |
| 2026-04-03 | ZachXBT publishes the thread; Cointelegraph publishes the same day. Drift: \$232M of illicit flows allegedly not frozen despite over 100 USDC-to-ETH conversions in about six hours (CryptoSlate says more than \$280M). [Cointelegraph](https://cointelegraph.com/news/zachxbt-accuses-circle-420m-compliance-failures-since-2022), [CryptoSlate](https://cryptoslate.com/circle-usdc-freeze-power-scrutiny-wallets-stolen-funds/) | — |

## Root-cause evidence

- **Technique:** none — allegation about issuer response
- **Source:** <https://x.com/zachxbt/status/2040055757211885953>; <https://cointelegraph.com/news/zachxbt-accuses-circle-420m-compliance-failures-since-2022>; <https://cryptoslate.com/circle-usdc-freeze-power-scrutiny-wallets-stolen-funds/>
- **Source type:** independent-researcher
- **Confidence:** reported
- **Evidence:** The allegations are one researcher's, relayed by two news outlets; the opened post carries only the headline claim and the thread's other posts were not opened. CryptoSlate describes Circle's Access Denial Policy: freezes on a security or integrity threat at Circle's sole discretion, or on a valid legal order from a US or French authority. Circle's reply to the allegations was not found; the 15-case list was not opened.

## Public references

- ZachXBT on X (2026-04-03): <https://x.com/zachxbt/status/2040055757211885953>
- Cointelegraph, ZachXBT accuses Circle of \$420M in compliance failures (2026-04-03): <https://cointelegraph.com/news/zachxbt-accuses-circle-420m-compliance-failures-since-2022>
- CryptoSlate, Circle's USDC freeze powers face fresh scrutiny: <https://cryptoslate.com/circle-usdc-freeze-power-scrutiny-wallets-stolen-funds/>
