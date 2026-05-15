# SwapKit router impersonator phishing cohort — EVM — 2024–2025

**Loss:** aggregate losses forming across the cohort at v0.1; individual victims typically lost mid-four-to-five-figure USD-equivalent per incident. The attacker's frontend constructed transactions addressed to the legitimate Uniswap Universal Router — the user's wallet confirmation screen showed a verified, audited contract address — while the swap path embedded in the calldata routed through attacker-owned intermediate contracts that extracted fees or redirected output tokens.
**OAK Techniques observed:** **OAK-T6.008** (Verified-but-Malicious Frontend Routing) — primary; the canonical T6.008 anchor. The evasion surface is in the routing path, not in the contract address the user inspects: the transaction `to` address is the legitimate Uniswap router, but the calldata embeds a swap path through attacker-owned intermediate contracts. **OAK-T4.008** (Fake-DEX Clone-Frontend Phishing) — secondary; the frontend was presented as a Uniswap-alike swap interface, sometimes branded as "powered by SwapKit" to explain the intermediate routing path.
**Attribution:** **pseudonymous**. Per-victim reporting via ZachXBT, ScamSniffer, and SEAL Threat Intel. Operator-cluster attribution partial at v0.1.
**Key teaching point:** **The SwapKit router impersonator cohort is the canonical T6.008 worked example — wallet confirmation screens that display only the `to` address and value are structurally inadequate for router/aggregator transactions.** The user verified the contract address and saw "Uniswap Universal Router" — the extraction occurred in the calldata the wallet UI did not surface.

## Summary

Between 2024 and 2025, multiple attacker-operated frontends presented a Uniswap-alike swap interface that constructed transactions addressed to the legitimate, verified, audited Uniswap Universal Router contract. The user's wallet confirmation screen — MetaMask, Rabby, or equivalent — displayed the correct Uniswap router address. The user, having been trained to "check the contract address," approved the transaction.

The extraction occurred in the **swap path** embedded in the transaction's calldata. The attacker constructed a route that passed through an attacker-owned intermediate contract — a recently deployed, unverified, or low-activity pool address — inserted between the user's input token and the output token. The intermediate contract extracted a fee or redirected a portion of the output tokens to an attacker-controlled address before forwarding the remainder to the user.

The key structural features:

1. **The `to` address was correct.** The transaction was addressed to the Uniswap Universal Router — a verified, audited, canonical contract. Standard wallet UIs display the `to` address prominently; the user's security model was satisfied.
2. **The routing path was malicious.** The calldata of the router transaction defined a multi-hop swap path. One of the intermediate hops was an attacker-owned contract that performed the extraction.
3. **The wallet UI did not surface the routing path.** MetaMask and most standard wallet UIs show the `to` address and the ETH value, but do not decode or display the full routing path of a router/aggregator transaction. The user could not see the intermediate contracts.
4. **The SwapKit brand was impersonated** to provide a credible explanation for the intermediate routing path — the attacker claimed the frontend was "powered by SwapKit" (a legitimate DEX aggregator API), making the presence of intermediate hops seem expected rather than suspicious.

The attacker's frontend was typically reached via typosquat domains, search-engine ads, or social-media links — the same distribution surface as T4.008 (Fake-DEX Clone-Frontend Phishing). The structural distinction from T4.008 is that T4.008 uses a drainer contract as the transaction destination, while T6.008 uses the legitimate protocol's router contract and extracts value through the routing path.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024 | SwapKit router impersonator frontends begin appearing; victims report swap transactions to Uniswap router that resulted in unexpected output-token shortfalls | T6.008 (routing-path extraction) |
| 2024–2025 | ScamSniffer / ZachXBT / SEAL Threat Intel document routing-path manipulation cohort; SwapKit brand impersonation identified as the credibility anchor | T6.008 + T4.008 (frontend clone + routing extraction) |
| 2025 | Wallet-side routing-path decoding remains partial; most wallet UIs do not surface full routing paths for router/aggregator transactions | (mitigation gap) |

## Realised extraction

Aggregate losses forming at v0.1; per-incident anchors typically in the mid-four-to-five-figure USD-equivalent range. The structural significance is the evasion technique (routing-path extraction) rather than the per-incident dollar total.

## Public references

- ScamSniffer routing-path phishing reports (2024–2025)
- ZachXBT per-victim incident threads
- SEAL Threat Intel phishing-domain feeds
- Uniswap Universal Router contract (verified, audited, canonical deployment)
- See `techniques/T6.008-verified-but-malicious-frontend-routing.md` for full technique characterisation
