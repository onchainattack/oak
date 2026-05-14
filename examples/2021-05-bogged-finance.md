# Bogged Finance flash-loan governance attack — BNB Chain — 2021-05-22

**Loss:** approximately $3.6M extracted from Bogged Finance's BOG token liquidity pools via a flash-loan-funded governance vote takeover on BNB Chain on 2021-05-22. The attacker borrowed sufficient BOG tokens via flash loan to acquire majority voting power in a single block, passed a malicious governance proposal, and drained the protocol's liquidity pools.
**OAK Techniques observed:** **OAK-T9.002** (Flash-Loan-Enabled Exploit — the attacker flash-borrowed sufficient BOG tokens to acquire majority voting power) + **OAK-T16.001** (Vote Takeover via Flash-Loan — the attacker used a flash-loaned majority of BOG voting tokens to pass a malicious proposal that granted the attacker authority to drain protocol liquidity pools; the canonical 2021 BNB Chain case of T16.001, a structural precursor to the larger Beanstalk April 2022 case on Ethereum). **OAK-T5.001** (Hard LP Drain — the attacker drained the protocol's liquidity pools in a single transaction post-governance-takeover). **OAK-T7.001** (Mixer-Routed Hop — proceeds were partially routed through Tornado Cash on BNB Chain).
**Attribution:** **pseudonymous-unattributed** — no public named-individual attribution at OAK v0.1 cutoff. The on-chain forensic record (PeckShield, SlowMist) documents the flash-loan-to-vote-to-drain chain but does not identify the operator.
**Key teaching point:** **Flash-loan governance attacks were operationally demonstrated on BNB Chain in May 2021, eleven months before the Beanstalk governance attack on Ethereum (April 2022).** Bogged Finance is the canonical 2021 BNB Chain precursor case for T16.001; the structural pattern (flash-loan voting-power acquisition, single-block proposal passage, pool drain) is identical to Beanstalk's, and the Bogged Finance case demonstrates that the vulnerability class was publicly instantiated at scale nearly a year before Beanstalk.

## Summary

Bogged Finance was a BNB Chain DeFi protocol offering limit-order and stop-loss functionality with a BOG governance token. On May 22, 2021, an attacker exploited the protocol's governance mechanism by flash-loaning a majority of BOG tokens, acquiring sufficient voting power within a single transaction to pass a malicious proposal. The proposal granted the attacker authority to drain the protocol's liquidity pools, extracting approximately $3.6M.

The Bogged Finance team paused the protocol and subsequently relaunched under a revised governance architecture with flash-loan-resistant voting-power computation (snapshot-based rather than same-block balance). The case is the canonical 2021 T16.001 worked example on BNB Chain and the structural precursor to Beanstalk April 2022 on Ethereum.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-2021-05-22 | Bogged Finance operates on BNB Chain with governance voting-power computed from same-block BOG balances | T16.001 surface (latent) |
| 2021-05-22 | Attacker flash-loans majority of BOG tokens; acquires >50% voting power in a single transaction | **T16.001** (setup) |
| 2021-05-22 (same tx) | Attacker passes malicious governance proposal granting drain authority | **T16.001** (execution) |
| 2021-05-22 (same tx) | Attacker drains ~$3.6M from protocol liquidity pools | **T5.001** (extraction) |
| 2021-05-22 onward | Proceeds partially routed through Tornado Cash on BNB Chain | T7.001 |
| Post-incident | Bogged Finance relaunches with snapshot-based voting-power computation | (remediation) |

## What defenders observed

- **Same-block voting-power computation is the load-bearing vulnerability.** Bogged Finance's governance computed voting power from same-block BOG balances, making flash-loan voting-power acquisition trivially executable in a single atomic transaction. The mitigation — snapshot-based voting-power computation — was deployed post-incident.
- **The flash-loan-to-governance chain was publicly demonstrated in May 2021.** The Beanstalk April 2022 incident ($182M) repeated the identical structural pattern at larger scale nearly a year later. The Bogged Finance case is evidence that the vulnerability class was known and publicly instantiated well before the canonical Beanstalk case.

## Public references

- `[peckshieldbogged2021]` — PeckShield on-chain trace of the Bogged Finance flash-loan governance attack.
- `[slowmistbogged2021]` — SlowMist incident analysis.
- `[cointelegraphbogged2021]` — Cointelegraph coverage of the $3.6M Bogged Finance exploit.

## Discussion

Bogged Finance May 2021 is the canonical BNB Chain T16.001 worked example and the structural precursor to Beanstalk April 2022. The two cases together demonstrate that flash-loan governance attacks were a known vulnerability class across chains (BNB Chain in 2021, Ethereum in 2022) and that the mitigation surface (snapshot-based voting-power computation) was available but not universally deployed. The case closes the T16×2021 near-threshold gap at v0.1 and provides the 2021 anchor for the T16.001 technique chain.
