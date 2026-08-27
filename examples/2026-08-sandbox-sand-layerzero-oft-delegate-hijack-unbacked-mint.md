# The Sandbox — hijacked LayerZero OFT delegate permissions minted \$49B of face-value SAND across 400+ transactions, and the pools could only pay out \$675K of it — The Sandbox / Base + BNB Smart Chain — 2026-08-22

**Loss:** **~\$675K realised** — roughly **14.75M SAND** plus about **79.74 ETH** actually extracted on-chain. The *minted* figure was vastly larger and is reported differently by different trackers: **Blockaid** flagged nearly **\$49B in face-value SAND across 400+ transactions**, while **PeckShield** counted **14.9 billion unbacked SAND** across two addresses, about **\$718M** at face value. The Sandbox halted bridging to and from **Base** and **BNB Smart Chain**, said it would snapshot and compensate eligible liquidity providers, and estimated impact at **under 0.01% of the 3B SAND supply**. SAND fell nearly **10% intraday**.

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary, confirmed mechanism*. Attackers hijacked **LayerZero delegate permissions** through the token's **`approveAndCall`** function, acquiring the authority that governs the cross-chain token's configuration. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). **OAK-T5.003** (Hidden-Mint Dilution — the captured authority was used to mint SAND with no backing on Base and BSC. See [`techniques/T5.003-hidden-mint-dilution.md`](../techniques/T5.003-hidden-mint-dilution.md)). **OAK-T10.009** (Cross-Chain Token Configuration-Role Capture — the authority captured was the OFT **delegate** role in LayerZero's messaging configuration, the same control surface as the Stake DAO vsdCRV OFT peer-redirect case three months earlier. This case is the second independent anchor on which that Technique was promoted. Note that it is **not** OAK-T10.006: no governance action was approved on one chain and relayed to another, and no proposal existed — the role was taken directly on the deployment that held it. See [`techniques/T10.009-cross-chain-token-configuration-role-capture.md`](../techniques/T10.009-cross-chain-token-configuration-role-capture.md)).

**Attribution:** **pseudonymous.** On-chain identifiers only — PeckShield tracked the unbacked issuance across **two wallet addresses**. No named individual, group, or link to a tracked OAK actor.

**Key teaching point:** **Mint capacity is not extraction capacity, and conflating them makes an incident unreadable.** This case produced headline figures spanning five orders of magnitude — \$49B, \$718M, \$675K — all of them defensible, all measuring different things. Unlimited minting authority over a token is bounded on the way out by whatever the destination pools will actually absorb: 14.9 billion unbacked SAND met liquidity that could pay for roughly 14.75 million of it. **OAK records realised extraction as the loss and the minted figure as the authority's scope, because the second number describes what the attacker controlled and the first describes what the market let them keep.** The gap between them is not good news — it is a measure of how much damage the same authority would do against a deeper pool, and the next protocol with this misconfiguration may not be shallow.

## Summary

**SAND** is The Sandbox's token. Its cross-chain deployments on **Base** and **BNB Smart Chain** use **LayerZero's OFT** (Omnichain Fungible Token) standard, in which a **delegate** role controls the token's cross-chain messaging configuration.

On **2026-08-22**, attackers exploited the token's **`approveAndCall`** function to **hijack the LayerZero delegate permissions**. With that authority they minted SAND on Base and BSC with no backing on the canonical chain, issuing what Blockaid measured as nearly **\$49B in face value across more than 400 transactions**, and what PeckShield counted as **14.9 billion unbacked SAND** across two addresses.

The realised take was far smaller. Actual on-chain extraction was approximately **14.75M SAND (~\$675,000)** and about **79.74 ETH** — the limit being what liquidity on those chains would absorb, not what the attackers could mint.

The Sandbox **halted bridging** on Base and BNB Smart Chain the same day, stated the issue was contained, and committed to snapshotting and compensating eligible liquidity providers. It put total impact at **less than 0.01% of the 3B SAND supply**. SAND dropped nearly **10% intraday** before partially recovering.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| (standing) | SAND deployed on Base and BSC as a LayerZero **OFT**; a **delegate** role governs cross-chain messaging configuration | (standing T10.006 surface) |
| 2026-08-22 | Attackers exploit **`approveAndCall`** to hijack **LayerZero delegate permissions** | **T9.004 authority capture** |
| 2026-08-22 | Unbacked SAND minted on Base and BSC across **400+ transactions** — ~**14.9B SAND**, ~**\$49B face value** | **T5.003 issuance** |
| 2026-08-22 | Realised extraction bounded by available liquidity: ~**14.75M SAND** (~\$675K) and ~**79.74 ETH** | (extraction ceiling) |
| 2026-08-22 | The Sandbox **halts bridging** to and from Base and BNB Smart Chain; SAND falls ~10% intraday | (containment) |
| post-event | Containment confirmed; LP snapshot and compensation announced; impact stated at **<0.01% of the 3B supply** | (operator response) |

## What defenders observed

- **The compromised object was a role, not a key.** No signing material was stolen. `approveAndCall` — a convenience function for combining approval with a callback — was reachable in a way that let an attacker take the delegate authority. Token contracts that carry both ERC-20 convenience callbacks and cross-chain configuration authority need those surfaces explicitly separated, because the callback pattern hands an attacker-chosen target a call from the token's own context.
- **This is the second LayerZero OFT authority compromise in the 2026 corpus, and the one that promoted the class.** The Stake DAO vsdCRV case in May turned on OFT **peer** configuration; this one turns on the OFT **delegate** role. Two incidents, two different configuration roles, one standard, no shared code or chain pair — which is what separated [`OAK-T10.009`](../techniques/T10.009-cross-chain-token-configuration-role-capture.md) from the generic access-control reading and from the governance-relay Technique it had initially been filed against.
- **Bridging halt was the effective control and it was fast.** With mint authority captured, nothing downstream could distinguish unbacked SAND from real SAND. Cutting the bridge on the same day is what bounded this, and it worked because the *canonical* supply was never at risk — only the wrapped deployments were.
- **The three published loss figures measure three different things, and reporting picked whichever was largest.** Face value of minted supply, unbacked token count, and realised extraction are all legitimate metrics; presenting them interchangeably makes cross-incident comparison meaningless. Contributors should state which is which.
- **Shallow liquidity acted as an accidental circuit breaker.** Nothing in the protocol capped the damage — the market did, by not having \$49B to give. That is not a control and should not be recorded as one.

## Public references

- `[cryptoranksandbox2026]` — CryptoRank, "The Sandbox SAND Exploit: \$49B in New Tokens Flood Base" (2026-08-22; the Blockaid \$49B face-value figure across 400+ transactions, the `approveAndCall` delegate hijack on Base and BSC): <https://cryptorank.io/news/feed/49fcb-the-sandbox-sand-exploit-49b-in-new-tokens-flood-base>
- `[edgexsandbox2026]` — edgeX, "Sandbox Exploit Created \$49B in Unbacked SAND Nobody Could Cash Out" (the mint-versus-extraction gap: ~14.75M SAND / ~\$675K and ~79.74 ETH realised against the \$49B face value): <https://pro.edgex.exchange/en-US/news/article/sandbox-bridge-exploit-49b-vs-675k-drain>
- `[ambcryptosandbox2026]` — AMBCrypto, "14.9 billion SAND tokens minted after Sandbox exploit: Report" (the PeckShield count of 14.9B unbacked SAND across two wallet addresses, ~\$718M face value): <https://ambcrypto.com/14-9-billion-sand-tokens-minted-after-sandbox-exploit-report/>
- `[beincryptosandbox2026]` — BeInCrypto, "The Sandbox Contains Bridge Exploit After Unbacked SAND Minted on Base and BSC" (containment, bridging halt on Base and BNB Smart Chain, LP snapshot and compensation, impact stated at <0.01% of the 3B supply): <https://beincrypto.com/sandbox-sand-bridge-exploit-base-bsc/>
- `[coinpapersandbox2026]` — Coinpaper, "SAND Bridge Exploit: The Sandbox Isolates Base and BNB Chain After Unbacked Token Mint" (isolation of the affected chains, ~10% intraday SAND decline): <https://coinpaper.com/34597/sand-bridge-exploit-the-sandbox-isolates-base-and-bnb-chain-after-unbacked-token-mint>

## Discussion

The number to argue about is the loss, and the argument is worth having once so the corpus can be consistent. A \$49B headline against a \$675K realised take is a 72,000× spread, and every figure in that range appeared in coverage. OAK's convention — realised extraction is the loss, minted supply is the scope of captured authority — is not merely conservative bookkeeping. The two numbers answer different questions, and the second one is arguably the more important for a defender: **what the attacker could do** generalises to the next deployment, while **what they got** is a fact about this token's liquidity on this day.

Read that way, the case is worse than \$675K suggests. The same delegate hijack against a token with deep multi-chain liquidity would have converted a far larger share of the minted supply, and nothing in the mechanism scales with the defence — only with the pools. The Sandbox's real protections were that the canonical supply was untouched, that the wrapped deployments were shallow, and that the team cut bridging within the day.

For the taxonomy, the more durable point is the accumulating LayerZero OFT pattern. Two 2026 incidents now turn on OFT configuration authority — peer redirection in May, delegate hijack in August — with different application code, different chains, and different entry paths. The common element is that OFT deployments carry powerful cross-chain roles which are frequently set once at deployment, rarely re-reviewed, and not obviously part of the token's own security model in the way an owner or minter role would be. Contributors documenting future OFT incidents should record **which configuration role was captured and how it was reachable**, because that pair is what makes these cases comparable and it is the part current write-ups most often omit.
