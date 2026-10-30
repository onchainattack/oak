# Hifi Finance — four last-minute votes passed a proposal that minted governance tokens and swept user collateral — Hifi Finance / Ethereum — 2026-10-28

**Loss:** **~\$1M** in user collateral, most of it an RWA token (spreekaway).

**OAK Techniques observed:** **OAK-T16.002** (Hostile Vote / Treasury Drain — *primary*. Per researcher spreekaway, the DAO "has been taken over by 4 last minute votes funded by tornado cash"; the attacker then **minted 25M new governance tokens** and swept user collateral. See [`techniques/T16.002-hostile-vote-treasury-drain.md`](../techniques/T16.002-hostile-vote-treasury-drain.md)). The proposal and contract path are not yet published. **OAK-T7.001** (Mixer-Routed Hop — the voting wallets were funded through Tornado Cash, per spreekaway; see [`techniques/T7.001-mixer-routed-hop.md`](../techniques/T7.001-mixer-routed-hop.md)).

**Attribution:** **pseudonymous;** voting wallets funded through Tornado Cash.

**Key teaching point:** **A low-turnout DAO is for sale at the price of its quorum.** The [TOP](2026-06-token-of-power-top-low-float-governance-takeover-mint.md) takeover in June had the same shape; late-vote monitoring and a timelock long enough for depositors to exit are the controls.

## Summary

Reported on 2026-10-28 as "another small DAO governance takeover". No Hifi statement yet.

## Timeline (UTC)

The only public source is spreekaway's post; it gives no transaction hashes or times for the votes.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-28 (undisclosed) | Hifi governance is exposed to a low-turnout takeover; the proposal and contract path are not published. Funding of the voting wallets goes through Tornado Cash (spreekaway). | **T7.001** (funding) |
| 2026-10-28 (time undisclosed) | Four last-minute votes, from wallets funded via Tornado Cash, pass a proposal and take over the DAO. | **T16.002** |
| 2026-10-28 (time undisclosed) | The attacker mints 25M new governance tokens and sweeps user collateral, about \$1M, most of it in an RWA token. | **T16.002** |
| after the sweep | Where the swept collateral went is not stated (undisclosed). No addresses or transaction hashes are given in the cited post. | — |
| 2026-10-28 22:25 | spreekaway posts the first public report. No Hifi statement, pause or refund exists as of the file date. | response |

Key addresses:

- Addresses — none published in the cited sources (full addresses not published)

## Root-cause evidence

- **Technique:** OAK-T16.002
- **Source:** <https://x.com/spreekaway/status/2115570707463868782>
- **Source type:** independent-researcher
- **Confidence:** reported
- **Evidence:** spreekaway's thread describes the late votes, Tornado funding, the 25M mint and the collateral sweep; SlowMist lists it as a governance attack.

## Public references

- `[spreekawayhifi2026]` — spreekaway on X (2026-10-28): <https://x.com/spreekaway/status/2115570707463868782>
- `[slowmisthacked]` — SlowMist Hacked tracker: <https://hacked.slowmist.io/>
