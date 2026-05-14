# Nouns DAO rage-quit fork arbitrage — Ethereum — 2023-09-15

**Loss:** no extraction loss in the conventional sense — the fork mechanism was a governance-design primitive functioning as designed. Approximately 422 Nouns NFTs (~47% of the Nouns supply) were rage-quitted into the fork DAO, extracting approximately **\$27.3M in ETH** (~16,757 ETH) from the original Nouns DAO treasury via the fork mechanism's pro-rata treasury-distribution primitive. The structural significance is as a **governance-arbitrage** case: the fork mechanism, designed as a minority-protection device, was exercised by a plurality of tokenholders as an economic-arbitrage primitive — converting their governance share into direct treasury extraction at a premium to the secondary-market NFT floor price.

**OAK Techniques observed:** **OAK-T16.002** (Hostile Vote / Treasury Drain — primary; the fork mechanism was the governance-primitive that enabled the treasury extraction, exercised via a governance vote by the rage-quit cohort). **OAK-T5.005** (Treasury-Management Exit — structurally adjacent; the fork extraction was a governance-exit rather than a rug-pull exit). **OAK-T9.003** (Governance Attack — structurally adjacent; the fork mechanism's governance-arbitrage surface was the load-bearing primitive).

**Attribution:** **unattributed (governance-design class — no threat-actor cluster applies).** The fork was executed by a collective of Nouns DAO NFT holders exercising a governance mechanism that was deliberately designed into the DAO's governance contracts. The participants operated through their Nouns NFT holdings and voted with their tokens — structurally indistinguishable from legitimate governance participation.

**Key teaching point:** **A rage-quit / fork mechanism that distributes pro-rata treasury value is structurally a governance-arbitrage primitive — any tokenholder can at any moment convert their governance share into their pro-rata treasury claim, and when the treasury-per-token ratio exceeds the secondary-market token price, the fork mechanism becomes an economically-rational exit path independent of governance-disagreement motivation.** The Nouns DAO fork was the canonical exercise of this primitive at scale: the fork mechanism was intended to protect a minority from governance capture, but the same mechanism can be exercised by a plurality for pure economic arbitrage.

## Summary

Nouns DAO is a generative-art NFT-governed DAO on Ethereum. One Noun NFT is auctioned daily; the auction proceeds flow to the Nouns DAO treasury. Noun holders govern the treasury's deployment — funding public-goods projects, charitable donations, and community initiatives. The DAO's governance contract included a **rage-quit / fork mechanism** from inception, designed as a minority-protection device: if a proposal passed that a minority of Noun holders opposed, the dissenting minority could rage-quit the DAO, taking their pro-rata share of the treasury and deploying a forked Nouns DAO (a separate governance instance with its own treasury and its own Noun NFTs).

The fork mechanism's economics worked as follows:
- Any Noun holder could signal their intent to fork.
- If holders of >= 20% of Nouns signalled, a fork could be executed.
- Forking Noun holders would send their original Nouns to a burn address and receive pro-rata treasury ETH plus new "forked Nouns" NFTs in the fork DAO.
- Non-forking Noun holders would retain their original Nouns and the remaining treasury in the original DAO.

On September 15, 2023, a fork was executed by a cohort holding approximately 422 Nouns (~47% of the supply), extracting approximately 16,757 ETH (~$27.3M at the time) from the original Nouns DAO treasury. The fork DAO was named "Nouns DAO Fork" and deployed with its own governance contracts and its own treasury.

The fork was structurally a governance-arbitrage: the per-Noun treasury claim at the time of the fork exceeded the secondary-market NFT floor price. Forking converted each Noun from a governance-token-plus-NFT-artwork at the secondary-market floor price into a pro-rata treasury claim at a premium. The economic incentive to fork was independent of any governance disagreement — it was pure arbitrage.

The structural lesson is that a DAO whose governance contract includes a rage-quit / fork mechanism with pro-rata treasury distribution will experience a fork event whenever the treasury-per-token ratio exceeds the token's secondary-market value by more than the gas-and-coordination cost of executing the fork. The fork's occurrence is a governance-design property, not a governance-capture event.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2021-08-08 | Nouns DAO deploys; daily Noun auction begins; rage-quit / fork mechanism included in governance contracts from inception | (standing T16.002 surface) |
| 2021-08 to 2023-09 | Nouns DAO treasury accumulates ETH from daily auctions; treasury-per-Noun value grows | (treasury appreciation) |
| 2023-09-15 | Fork executed: ~422 Nouns (~47% supply) rage-quit; ~16,757 ETH (~$27.3M) extracted to fork DAO | **T16.002 execution** |
| 2023-09 onward | Original Nouns DAO continues with reduced treasury and reduced Noun-holder count; fork DAO operates independently | (dual-DAO coexistence) |

## What defenders observed

- **A rage-quit / fork mechanism with pro-rata treasury distribution is a governance-arbitrage primitive, not merely a minority-protection device.** The mechanism's intended purpose (protecting a minority from governance capture) and its exercised effect (allowing a plurality to extract treasury value at a premium to secondary-market pricing) are structurally identical in mechanism, differing only in motivation. Any DAO that deploys a pro-rata rage-quit mechanism accepts the standing-arbitrage surface as a governance-design trade-off.
- **The fork's economic-trigger condition — treasury-per-token > secondary-market token price — is independently observable.** Defenders auditing DAO governance can compute the fork-arbitrage premium continuously and can predict fork events before they occur. The trigger condition's continuous observability makes the fork-arbitrage surface a first-class governance-risk metric for any DAO with a rage-quit mechanism.
- **The fork mechanism is a governance-designed treasury-extraction surface, not a governance-attack surface.** No vulnerability was exploited, no governance process was corrupted, no Sybil or vote-buying occurred. The mechanism functioned as designed — the fork was an economic-arbitrage exercise of a governance-primitive that the DAO's designers deliberately included. The T16.002 framing (governance-primitive-exercise for treasury extraction) is structurally distinct from T16.001 (hostile vote takeover via flash-loan or vote-buying).

## What this example tells contributors writing future Technique pages

- **T16.002 (Hostile Vote / Treasury Drain) is the load-bearing classification for governance-primitive treasury extraction where the primitives are governance-designed rather than governance-exploited.** The Nouns fork was a governance-mechanism exercise, not a governance-exploit — the fork was designed, deployed, and documented as a governance feature. The T16.002 classification (treasury extraction via governance mechanism) is correct, but the "hostile" label is misleading in this case — the fork was economically rational for the participating tokenholders and the mechanism was intended to be exercised.
- **The T16.002 / T5.005 boundary is at the governance-mechanism layer.** T5.005 (Treasury-Management Exit) covers operator-side treasury extraction outside of governance processes (rug pulls by deployers). T16.002 covers treasury extraction *through* governance processes — the extraction is a governance action, not an operator action. The Nouns fork was a governance action by tokenholders exercising a governance primitive to extract treasury value. The boundary case is clean: the fork was a T16.002 governance-primitive exercise, not a T5.005 operator-exit.

## Public references

- Nouns DAO. *"Nouns DAO Fork — Documentation and Mechanism Specification."* 2021–2023 — the canonical governance-contract documentation specifying the rage-quit / fork mechanism — `[nounsdaofork2023]`.
- Nouns DAO community. *"Fork Execution Post-Mortem."* September 2023 — community-side analysis of the fork-arbitrage economics and the ~16,757 ETH treasury extraction.
- Cross-reference: T16.002 (Hostile Vote / Treasury Drain) at `techniques/T16.002-hostile-vote-treasury-drain.md`.
- Cross-reference: T5.005 (Treasury-Management Exit) at `techniques/T5.005-treasury-management-exit.md` — operator-side treasury exit vs. governance-primitive treasury extraction.

### Proposed new BibTeX entries

```bibtex
@misc{nounsdaofork2023,
  author = {{Nouns DAO}},
  title = {Nouns DAO Fork — Governance Mechanism and September 2023 Fork Execution},
  year = {2023},
  month = sep,
  note = {Canonical governance-arbitrage case: ~422 Nouns (~47% supply) rage-quit, ~16,757 ETH (~\$27.3M) extracted via the fork mechanism's pro-rata treasury distribution.},
}
```
