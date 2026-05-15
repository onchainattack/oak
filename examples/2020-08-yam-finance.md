# Yam Finance rebase-bug governance-capture — Ethereum — 2020-08-12 to 2020-08-13

**Loss:** approximately \$750K in Curve/yCRV LP tokens permanently locked in the YAM treasury due to a rebase-logic bug; no direct extraction by an external attacker — the loss was protocol-internal (LP funds became irretrievable). The incident's structural significance is as a **governance-speed-vs-exploit-window** case: the protocol attracted ~\$600M in TVL within ~36 hours, a critical bug was discovered, and the governance process was too slow to execute a rescue before the bug became terminal.

**OAK Techniques observed:** **OAK-T9.001** (Smart-Contract Logic Error — primary; an integer-arithmetic bug in the rebase function multiplied the total supply on every rebase, making governance-proposal quorum unattainable after the first post-bug rebase). **OAK-T3.001** (Sybil-Bundled Launch — structurally adjacent; the YAM farming-launch dynamics concentrated YAM governance tokens in a small number of yield-farmer addresses within ~36 hours, producing a governance-coordination surface shared by the entire "DeFi food-coin" cohort). **OAK-T16.001** (Flash-Loan / Rapid-Deployment Vote Takeover — structurally adjacent, though no hostile takeover occurred; the governance quorum became unattainable due to the rebase bug rather than due to an attacker action).

**Attribution:** **unattributed** The bug was introduced by the Yam Finance development team (a pseudonymous collective) during the rapid-deployment launch cycle. No hostile external actor exploited the bug for extraction. The bug was reported by community auditors and by DeFi-security researchers within ~24 hours of launch.

**Key teaching point:** **A governance mechanism whose quorum is denominated in a token whose total supply is bugged is structurally inoperable — the governance surface and the token-contract surface are a single failure domain.** The YAM rebase bug multiplied totalSupply by 10^18 on every rebase; after the first rebase, the governance quorum (expressed as a fraction of totalSupply) required more tokens than existed, making any governance action inoperable. The structural OAK lesson is that governance-quorum math and token-supply math must be validated as a coupled system at deploy time — a bug in the token contract that corrupts totalSupply makes the governance contract inoperable even if the governance contract's code is correct.

## Summary

Yam Finance was a DeFi yield-farming protocol launched on Ethereum on August 11, 2020 as part of the "DeFi Summer" food-coin yield-farming wave. The protocol offered YAM governance tokens as farming rewards for staking yCRV (Curve's LP token for the yPool stablecoin pool) in the YAM staking contract. YAM tokens governed the protocol's treasury — the staked yCRV accumulated in the YAM treasury and would be controlled by YAM governance votes.

The launch was structured as a fair-launch yield farm with no pre-mine and no team allocation — a design choice that attracted rapid TVL growth. Within ~36 hours of launch, ~$600M in yCRV was staked in the YAM staking contract.

The YAM token implemented an elastic-supply (rebase) mechanism: each rebase adjusted totalSupply to target a YAM/yUSD exchange rate. The rebase function contained a critical integer-arithmetic bug: it divided by `BASE` (10^18) before the multiplication step, rather than after, producing a totalSupply inflation factor of ~10^18 on *every* rebase execution rather than the intended modest supply adjustment.

The first rebase (scheduled at ~12 hours after launch) executed correctly because totalSupply was small enough that the bug did not manifest. The second rebase, which would execute when totalSupply exceeded a threshold, would multiply totalSupply by ~10^18 — making the governance quorum (which was a fraction of totalSupply) require a number of tokens larger than the post-bug totalSupply, inoperable by construction.

The bug was discovered by community auditors and DeFi-security researchers within ~24 hours of launch. The YAM team proposed an emergency governance vote to migrate the treasury to a corrected V2 contract before the second rebase executed. The governance vote required a quorum of 1% of totalSupply (approximately 175,000 YAM at the pre-bug supply). The vote did not achieve quorum before the second rebase executed, at which point totalSupply inflated by ~10^18 and the quorum became mathematically unattainable. The ~$750K in yCRV LP tokens in the YAM treasury became permanently locked — no governance action could authorise their transfer.

The YAM community subsequently launched a V2 migration using a snapshot of pre-bug YAM balances, with the locked treasury funds accepted as a permanent loss. The YAM V2 and V3 iterations continued through 2021–2022 as a community-governed DeFi treasury.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2020-08-11 15:00 UTC | YAM fair-launch farming begins; yCRV staking opens | (launch) |
| 2020-08-12 morning UTC | ~\$600M TVL accumulated; YAM token trading begins on Uniswap | (T3.001 — rapid concentration of governance tokens) |
| 2020-08-12 afternoon UTC | Community auditors discover rebase-function integer-arithmetic bug; YAM team proposes emergency governance vote to migrate to V2 before second rebase | **T9.001 discovery** |
| 2020-08-13 morning UTC | Emergency governance vote fails to achieve quorum (~13% of required quorum); second rebase executes; totalSupply inflates by ~10^18; governance permanently inoperable | **T9.001 terminal** |
| 2020-08-13 onward | ~\$750K yCRV permanently locked; YAM V2 migration launched via snapshot of pre-bug balances | (post-incident) |

## What defenders observed

- **Governance quorum tied to token totalSupply creates a single failure domain with the token contract.** If the token's totalSupply is corrupted by a bug, governance quorum becomes inoperable as a direct mathematical consequence. The YAM case established that governance contracts should use a quorum mechanism that does not consume totalSupply from the same token contract whose totalSupply is governed — or should include a circuit-breaker that freezes rebase execution during active governance votes.
- **Fair-launch yield farming concentrates governance tokens in yield-farmer hands at extreme speed.** The YAM launch attracted ~$600M in TVL in ~36 hours, and the governance-token distribution concentrated in a small number of DeFi-native yield-farmer addresses. The governance-coordination problem — assemble quorum among a small set of highly-active DeFi farmers within a ~12-hour rebase window — was the operational constraint that proved fatal. A timelock between proposal-submission and rebase-execution would have given the governance process time to assemble quorum.
- **The DeFi food-coin cohort of August–September 2020 shared the rapid-launch governance-concentration pattern.** YAM, SushiSwap, Hotdog, Pizza, Kimchi, and the broader food-coin wave deployed near-identical fair-launch farming templates that produced the same governance-concentration dynamic. The YAM case was the most structurally pure expression of the governance-speed-vs-bug-window tension.

## What this example tells contributors writing future Technique pages

- **T9.001 (Smart-Contract Logic Error) is the load-bearing classification for protocol-self-destruction-by-integer-arithmetic-bug.** The YAM rebase bug was not an external-attacker exploitation — it was a protocol-internal logic error whose consequence was the permanent inoperability of the governance mechanism. The T9.001 framing (logic-implementation error, not oracle-manipulation or governance-by-attacker) is the correct classification.
- **T3.001 (Sybil-Bundled Launch) applies to the fair-launch farming governance-concentration dynamic.** The YAM launch concentrated governance tokens in a small set of addresses within ~36 hours — a structurally identical dynamic to the Sybil-bundled launch pattern even though the addresses were genuine yield farmers rather than Sybil identities. The governance-coordination surface of a rapidly-concentrated token-holder set is the T3.001 detection signal.

## Public references

- Yam Finance. *"YAM Post-Mortem."* August 13, 2020 — the canonical project-side post-mortem — `[yamfinancepostmortem2020]`.
- DeFi-security community. *"YAM Rebase Bug Analysis."* August 2020 — community-auditor and security-researcher analysis of the rebase-function integer-arithmetic bug — `[defisecurityyam2020]`.
- Cross-reference: T9.001 (Oracle Price Manipulation) at `techniques/T9.001-oracle-price-manipulation.md` — the YAM case is T9.001 by integer-arithmetic-logic-error, not by oracle-input-manipulation.
- Cross-reference: T16.001 (Flash-Loan / Rapid-Deployment Vote Takeover) at `techniques/T16.001-flash-loan-vote-takeover.md` — governance-quorum-unattainability-by-token-supply-corruption is structurally distinct from hostile-vote-by-loan.

### Proposed new BibTeX entries

```bibtex
@misc{yamfinancepostmortem2020,
  author = {{Yam Finance}},
  title = {YAM Post-Mortem — Rebase Bug and Governance Failure},
  year = {2020},
  month = aug,
  note = {Canonical project-side post-mortem of the YAM rebase-function integer-arithmetic bug that permanently locked ~\$750K in treasury yCRV.},
}
```
