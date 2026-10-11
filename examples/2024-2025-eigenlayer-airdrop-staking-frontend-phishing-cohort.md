# EigenLayer restaking-frontend phishing cohort — Ethereum — 2024–2025

**Loss:** no aggregate figure is sourced. The one quantified case is the October 2024 hijack of EigenLayer's X account, in which at least \$800K was lost by a single victim per Scam Sniffer (Decrypt, 2024-10-18). The earlier "mid-seven-figures" aggregate and the victim-loss range were unsupported and have been removed.
**OAK Techniques observed:** **OAK-T3.005** (Fake-Validator Staking-Frontend Phishing — primary; the EigenLayer restaking interface is a staking-frontend phishing surface structurally similar to the Lido stETH staking-interface campaigns); **OAK-T4.002** (Spoofed Token Approval — Blockaid documented Angel Drainer abusing `queueWithdrawal`-style approvals against EigenLayer users in February 2024); **OAK-T4.009** (Pre-Token Brand-Anticipation Phishing — structurally adjacent; the October 2024 X-account hijack promoted a fake EigenLayer airdrop).
**Attribution:** **unattributed** — multiple pseudonymous phishing operators. The earlier claim of DPRK infrastructure overlap has no supporting source and was removed.

**Corrected 2026-10-11:** Removed the unsourced "mid-seven-figures" aggregate, named typosquat domains, DPRK-overlap attribution and fabricated campaign waves; anchored the file on the sourced October 2024 EigenLayer X-account hijack (≥\$800K from one victim) and Blockaid's February 2024 Angel Drainer queueWithdrawal finding; fixed the EigenLayer launch framing.

**Key teaching point:** **Any protocol with a large "stake now" flow amplified by a points or pre-token incentive program is a phishing surface.** The primitive is the same across protocols: the user intends to deposit into a known contract, and a spoofed frontend, hijacked official account, or malicious approval request routes assets to an attacker. Official-account compromise (the October 2024 hijack) lets attackers skip the typosquat step and borrow the protocol's own trust.

## Summary

EigenLayer ran a restaking points programme before its token, which created a large population of users hurrying to deposit LSTs and ETH, and a token airdrop narrative that phishers could exploit. Two sourced events anchor this cohort.

In February 2024 Blockaid reported that the Angel Drainer kit had adapted to target restaking platforms, using a `queueWithdrawal` approval-farming flow against EigenLayer users (crypto.news, 2024-02-01). In October 2024, around EigenLayer's token launch, the project's X account was hijacked to promote a fake airdrop; Scam Sniffer reported at least \$800K lost by one victim (Decrypt, 2024-10-18).

The LRT protocols built on EigenLayer (Renzo, Ether.fi, Puffer, Kelp) share the same deposit-flow shape and therefore the same class of exposure, but this file does not claim specific campaigns against them: no sources were found for named typosquat domains, search-ad campaigns, or Symbiotic/Karak-targeted waves, and those earlier claims were removed.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-02-01 | Blockaid reports Angel Drainer targeting restaking platforms via `queueWithdrawal` approval-farming | T4.002 / T3.005 |
| 2024-10-18 | Decrypt reports the EigenLayer X account hijacked to promote a fake airdrop; at least \$800K lost by one victim (Scam Sniffer) | T4.009 / T3.005 |

## Realised extraction

At least \$800K from one victim in the October 2024 incident. No source-backed aggregate for the cohort; victim self-reporting is incomplete.

## Public references

- `[decrypteigenx2024]` — Decrypt, "EigenLayer Twitter Account Hacked to Share Ethereum Airdrop Scam" (2024-10-18): <https://decrypt.co/287159/eigenlayer-twitter-hack-airdrop-scam> (EigenLayer-branded phishing; at least \$800K from one victim per Scam Sniffer)
- `[blockaidangel2024]` — crypto.news, "Angel Drainer targets restaking platforms with new attack vector, Blockaid warns" (2024-02-01): <https://crypto.news/angel-drainer-targets-restaking-platforms-with-new-attack-vector-blokcaid-warns/> (queueWithdrawal approval-farming against EigenLayer users)
