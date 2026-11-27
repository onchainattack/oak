# Long — the keeper read Arc through one RPC endpoint while its backup was over quota, and that endpoint served fabricated withdrawal events — Long / custodial bridge / Arc → Robinhood Chain — 2026-09-14

**Loss:** **46.7928 WETH (about \$118,000)**, released from Long's **Robinhood Chain WETH vault** in a single payout ([Long post-mortem](https://x.com/Longdotsupply/status/2099743494994899052)). Long says no user lost funds, the vault was refilled from platform revenue the same day, and nothing on-chain was breached: the fabricated events entered through the RPC channel, "not through our contracts, our keys or our vaults".

**OAK Techniques observed:** **OAK-T10.002.001** (Off-chain Observer Source-Event Forgery, *primary*, sub-shape **(c) infrastructure-level source forgery**. Long's keeper, the off-chain process that watches Arc burns and releases the matching asset from the vault, was served fabricated withdrawal events by its primary RPC endpoint. See [`techniques/T10.002.001-off-chain-observer-source-event-forgery.md`](../techniques/T10.002.001-off-chain-observer-source-event-forgery.md)).

**Attribution:** **unattributed.** Long does not name the RPC provider and says it is "still under investigation" whether the provider's infrastructure was compromised or the data was altered in transit ([post-mortem](https://x.com/Longdotsupply/status/2099743494994899052)). Long publishes an Ethereum address that holds the proceeds (below); no actor is named.

**Key teaching point:** **A payout path that accepts one data source as proof has outsourced the definition of reality to that source.** Long's own account is that the keeper's safeguards "were built to stop replays and duplicate payouts" and "were not built to question the data source itself"; a second endpoint existed but was over its daily quota, so for a short window the primary was the only reader ([post-mortem](https://x.com/Longdotsupply/status/2099743494994899052)). Controls: verify every order against chain state from several independent sources before funds move and again after, fail closed when the second source is missing, and cap order size and hourly volume. Long adopted these after the incident.

## Summary

Long runs a custodial bridge: users burn tokens on Arc to redeem, and a keeper watches for those burns and releases the matching asset from a vault on Robinhood Chain ([post-mortem](https://x.com/Longdotsupply/status/2099743494994899052)). The keeper read Arc through RPC endpoints, because Arc's official public mainnet endpoints were not yet live; it used the standard public RPC the ecosystem relied on, with a second endpoint as backup.

On the morning of 2026-09-14 the backup was over its daily quota, and for a short window the keeper read Arc through the primary endpoint alone. In that window the primary served fabricated withdrawal events that used Long's contract addresses, event format and vault balances. No tokens were burned on Arc and the supply never dropped. The keeper checked that the withdrawal had not been paid before and released 46.7928 WETH. Three more fabricated withdrawals in other assets were attempted in the same minutes; all three reverted on-chain ([post-mortem](https://x.com/Longdotsupply/status/2099743494994899052)).

## Timeline (UTC)

Read it as three stages. **Get in**: the keeper depends on one live RPC for Arc. **Take**: fabricated events, one successful payout. **Aftermath**: keeper stopped, rebuilt and the vault refilled the same day. Times are from Long's post-mortem; the attacker's preparation is undisclosed.

| When | What happened | OAK |
|---|---|---|
| Before 2026-09-14 (standing) | The keeper reads Arc through RPC endpoints (a primary and a backup), with only replay and duplicate-payout checks on top. | latent single-source dependency |
| 2026-09-14, morning (undisclosed) | The backup endpoint is over its daily quota; for a short window the keeper reads Arc through the primary alone ([post-mortem](https://x.com/Longdotsupply/status/2099743494994899052)). | none — configuration state, not an attacker step |
| 2026-09-14, in that window (undisclosed) | The primary endpoint serves fabricated withdrawal events. How the provider came to serve them is under investigation. | **T10.002.001** |
| 2026-09-14 07:07 | The keeper releases 46.7928 WETH from the vault to the attacker's address; fraudulent payout tx [`0x865d75c01046b5d17b107132f5e1257806f2e31e976e3dc8a9d937b9e7522995`](https://robinhoodchain.blockscout.com/tx/0x865d75c01046b5d17b107132f5e1257806f2e31e976e3dc8a9d937b9e7522995). Three further fabricated withdrawals in other assets revert. | **T10.002.001** |
| 2026-09-14 07:10 | Monitoring flags the WETH vault as under-collateralised. | response |
| 2026-09-14 07:13 | Keeper stopped; no further payouts possible. | response |
| 2026-09-14 07:30 to 11:00 | Forensics, keeper rebuilt with a new verification pipeline. | response |
| 2026-09-14 11:31 | Hardened keeper live; about 1,000 queued orders audited (0 invalid) and settled. | response |
| 2026-09-14 15:29 and 15:47 | Vault refilled from platform revenue: 12 WETH ([`0xaa71a4ee225a999a640033b61286624329ab8c85a14aee332da05fa1c1364840`](https://robinhoodchain.blockscout.com/tx/0xaa71a4ee225a999a640033b61286624329ab8c85a14aee332da05fa1c1364840)), then 30.9828 WETH ([`0x6740b08e4d2e950b2d07ce75152dbac05c447478f49cbc5195109f53f1ea23c3`](https://robinhoodchain.blockscout.com/tx/0x6740b08e4d2e950b2d07ce75152dbac05c447478f49cbc5195109f53f1ea23c3)); a third refill of 3.82 WETH ([`0xbc7d44e1b18535bf6038d9d42454c51b79c22f115a585d135792a3ec6b1b30df`](https://robinhoodchain.blockscout.com/tx/0xbc7d44e1b18535bf6038d9d42454c51b79c22f115a585d135792a3ec6b1b30df)) is also listed. | response |
| 2026-09-14 16:31 and 18:12 | Bridge fully reopened with new limits; on-chain caps tightened across all assets. | response |
| By 2026-09-15 (time undisclosed) | The attacker has bridged the WETH to Ethereum through Jumper/LI.FI and Relay, per Long; about 44.96 ETH still sits at the Ethereum address. | none — exit route, not a catalogued step |
| 2026-09-15 06:13 | Long publishes the post-mortem and offers whitehat terms: return 42.11 ETH (90 percent) by 2026-09-18 12:00 UTC and keep the rest as a bounty. Whether anything was returned is not on an opened page. | response |

Key addresses:

- WETH vault (Robinhood Chain): [`0xf24b3e387b545874763298122d6bd57a26ddde50`](https://robinhoodchain.blockscout.com/address/0xf24b3e387b545874763298122d6bd57a26ddde50)
- Attacker address (Ethereum, as published by Long): [`0xbc3333665007e4b4c830937c0cd85e47eb54dccf`](https://etherscan.io/address/0xbc3333665007e4b4c830937c0cd85e47eb54dccf)
- Long's return address (Ethereum): [`0xd66447a19e7bcfe56fbd22354ef9bf30f48eafdc`](https://etherscan.io/address/0xd66447a19e7bcfe56fbd22354ef9bf30f48eafdc)

Funds snapshot: per Long, about 44.96 ETH remained at the attacker's Ethereum address when the post-mortem was written. OAK has not traced this independently; the Robinhood Chain explorer was not readable from OAK's tooling.

## Root-cause evidence

- **Technique:** OAK-T10.002.001
- **Source:** <https://x.com/Longdotsupply/status/2099743494994899052>
- **Source type:** operator
- **Confidence:** reported
- **Evidence:** Long's own post-mortem, published the day after the incident. It states the mechanism (fabricated events through the primary RPC, no burn, no supply change) and that the provider's compromise is unresolved. No independent forensic write-up was opened.

## Discussion

This is the second anchor for sub-shape (c) of T10.002.001, after [KelpDAO / LayerZero](2026-04-kelpdai-rseth-bridge-layerzero-compromise.md), where the data source an observer relied on was likewise subverted. Here the keeper's logic worked on what it was told; the open question is whether the provider was compromised, the data altered in transit, or something else, and the control is the same in each case: require agreement across independently operated sources.

## Public references

- Long (@Longdotsupply), post-mortem of the 2026-09-14 WETH incident, with vault, payout, refill and attacker addresses: <https://x.com/Longdotsupply/status/2099743494994899052>
