# Nouns DAO rage-quit fork arbitrage — Ethereum — 2023-09-15

**Loss:** no extraction loss in the conventional sense — the fork mechanism was a governance-design primitive functioning as designed. 472 of 846 Nouns NFTs (about 56% of the supply) were forked, taking about **\$27.3M in ETH** (~16,757 ETH, about 35.5 ETH per forked NFT) out of the original Nouns DAO treasury; the original DAO kept 13,310 ETH `[decryptnouns]`.

**Corrected 2026-10-11:** forked Nouns restated from ~422 (~47%) to 472 of 846 (~56%) per Decrypt; the fork mechanism was added by a 2023 protocol upgrade, not present from DAO inception; forked original NFTs returned to the treasury rather than going to a burn address; the claim that the fork was economic arbitrage independent of governance disagreement is the file's analytic framing, not stated in the cited sources. The structural significance is as a **governance-arbitrage** case: the fork mechanism, designed as a minority-protection device, was exercised by a majority of Nouns (by count) as an economic-arbitrage primitive — converting their governance share into direct treasury extraction at a premium to the secondary-market NFT floor price.

**OAK Techniques observed:** **OAK-T16.002** (Hostile Vote / Treasury Drain — primary; the fork mechanism was the governance-primitive that enabled the treasury extraction, exercised via a governance vote by the rage-quit cohort). **OAK-T5.005** (Treasury-Management Exit — structurally adjacent; the fork extraction was a governance-exit rather than a rug-pull exit). **OAK-T9.003** (Governance Attack — structurally adjacent; the fork mechanism's governance-arbitrage surface was the load-bearing primitive).

**Attribution:** **unattributed** The fork was executed by a collective of Nouns DAO NFT holders exercising a governance mechanism that was deliberately designed into the DAO's governance contracts. The participants operated through their Nouns NFT holdings and voted with their tokens — structurally indistinguishable from legitimate governance participation.

**Key teaching point:** **A rage-quit / fork mechanism that distributes pro-rata treasury value is structurally a governance-arbitrage primitive — any tokenholder can at any moment convert their governance share into their pro-rata treasury claim, and when the treasury-per-token ratio exceeds the secondary-market token price, the fork mechanism becomes an economically-rational exit path independent of governance-disagreement motivation.** The Nouns DAO fork was the canonical exercise of this primitive at scale: the fork mechanism was intended to protect a minority from governance capture, but the same mechanism can be exercised by a plurality for pure economic arbitrage.

## Summary

Nouns DAO is a generative-art NFT-governed DAO on Ethereum. One Noun NFT is auctioned daily; the auction proceeds flow to the Nouns DAO treasury. Noun holders govern the treasury's deployment — funding public-goods projects, charitable donations, and community initiatives. A 2023 protocol upgrade added a **rage-quit / fork mechanism** `[decryptnouns]`, designed as a minority-protection device: if a proposal passed that a minority of Noun holders opposed, the dissenting minority could rage-quit the DAO, taking their pro-rata share of the treasury and deploying a forked Nouns DAO (a separate governance instance with its own treasury and its own Noun NFTs).

The fork mechanism's economics worked as follows:

- Any Noun holder could signal their intent to fork.
- Execution required a quorum of at least 20% of tokens, followed by a waiting period `[decryptnouns]`.
- Forked holders' original NFTs returned to the treasury, and they received replacement NFTs for the new DAO and a pro-rata share of the treasury `[decryptnouns]`.
- Non-forking Noun holders would retain their original Nouns and the remaining treasury in the original DAO.

On September 15, 2023, the fork completed (Decrypt: "late Friday, September 15"; other outlets give 8 September as an earlier date, unresolved), with holders of 472 Nouns (about 56% of the 846 supply), taking approximately 16,757 ETH (~$27.3M at the time) `[decryptnouns]` from the original Nouns DAO treasury. The forked holders received a new DAO with its own treasury; Blockworks later reported the fork DAO lost about half its treasury within three days as its holders ragequit `[blockworksnouns]`.

The fork was structurally a governance-arbitrage: the per-Noun treasury claim at the time of the fork exceeded the secondary-market NFT floor price. Forking converted each Noun from a governance-token-plus-NFT-artwork at the secondary-market floor price into a pro-rata treasury claim at a premium. The economic incentive to fork was independent of any governance disagreement — it was pure arbitrage.

The structural lesson is that a DAO whose governance contract includes a rage-quit / fork mechanism with pro-rata treasury distribution will experience a fork event whenever the treasury-per-token ratio exceeds the token's secondary-market value by more than the gas-and-coordination cost of executing the fork. The fork's occurrence is a governance-design property, not a governance-capture event.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2023 (earlier) | Protocol upgrade lets Noun holders propose a fork `[decryptnouns]` | (standing T16.002 surface) |
| 2023-09-15 | Fork completed: 472 of 846 Nouns forked; ~16,757 ETH (~$27.3M) left the treasury `[decryptnouns]` | **T16.002 execution** |
| 2023-09 onward | Original Nouns DAO continues with reduced treasury and reduced Noun-holder count; fork DAO operates independently | (dual-DAO coexistence) |

## What defenders observed

- **A rage-quit / fork mechanism with pro-rata treasury distribution is a governance-arbitrage primitive, not merely a minority-protection device.** The mechanism's intended purpose (protecting a minority from governance capture) and its exercised effect (allowing a plurality to extract treasury value at a premium to secondary-market pricing) are structurally identical in mechanism, differing only in motivation. Any DAO that deploys a pro-rata rage-quit mechanism accepts the standing-arbitrage surface as a governance-design trade-off.
- **The fork's economic-trigger condition — treasury-per-token > secondary-market token price — is independently observable.** Defenders auditing DAO governance can compute the fork-arbitrage premium continuously and can predict fork events before they occur. The trigger condition's continuous observability makes the fork-arbitrage surface a first-class governance-risk metric for any DAO with a rage-quit mechanism.
- **The fork mechanism is a governance-designed treasury-extraction surface, not a governance-attack surface.** No vulnerability was exploited, no governance process was corrupted, no Sybil or vote-buying occurred. The mechanism functioned as designed — the fork was an economic-arbitrage exercise of a governance-primitive that the DAO's designers deliberately included. The T16.002 framing (governance-primitive-exercise for treasury extraction) is structurally distinct from T16.001 (hostile vote takeover via flash-loan or vote-buying).

## What this example tells contributors writing future Technique pages

- **T16.002 (Hostile Vote / Treasury Drain) is the load-bearing classification for governance-primitive treasury extraction where the primitives are governance-designed rather than governance-exploited.** The Nouns fork was a governance-mechanism exercise, not a governance-exploit — the fork was designed, deployed, and documented as a governance feature. The T16.002 classification (treasury extraction via governance mechanism) is correct, but the "hostile" label is misleading in this case — the fork was economically rational for the participating tokenholders and the mechanism was intended to be exercised.
- **The T16.002 / T5.005 boundary is at the governance-mechanism layer.** T5.005 (Treasury-Management Exit) covers operator-side treasury extraction outside of governance processes (rug pulls by deployers). T16.002 covers treasury extraction *through* governance processes — the extraction is a governance action, not an operator action. The Nouns fork was a governance action by tokenholders exercising a governance primitive to extract treasury value. The boundary case is clean: the fork was a T16.002 governance-primitive exercise, not a T5.005 operator-exit.

## Public references

- `[decryptnouns]` — Decrypt, "Nouns Fork: Disgruntled NFT Holders Exit \$27 Million From Treasury" (2023-09-15): <https://decrypt.co/197400/nouns-fork-disgruntled-nft-holders-exit-27-million-from-treasury>
- `[blockworksnouns]` — Blockworks, "Nouns DAO fork loses half its treasury in 3 days": <https://blockworks.co/news/nouns-dao-treasury-fork-governance>
- Cross-reference: T16.002 (Hostile Vote / Treasury Drain) at `techniques/T16.002-hostile-vote-treasury-drain.md`.
- Cross-reference: T5.005 (Treasury-Management Exit) at `techniques/T5.005-treasury-management-exit.md` — operator-side treasury exit vs. governance-primitive treasury extraction.
