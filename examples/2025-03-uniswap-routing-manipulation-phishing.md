# Uniswap routing-manipulation frontend phishing cohort — EVM — 2025

**Loss:** cohort-level phishing losses across users of attacker-operated "Uniswap interface" frontends that constructed swap paths through attacker-deployed intermediate liquidity pools. Per-victim losses ranging from low four-figures to mid five-figures USD equivalent; aggregate across the cohort not consolidated in a single public loss figure at v0.1.
**OAK Techniques observed:** **OAK-T6.008** (Verified-but-Malicious Frontend Routing — primary; the attacker-operated frontends presented a Uniswap-alike swap interface that constructed transactions addressed to the legitimate Uniswap Universal Router — a verified, audited contract — but the swap path embedded in the calldata routed through attacker-deployed intermediate liquidity pools that extracted fees or spreads before forwarding the swap to legitimate Uniswap V3 pools). **OAK-T4.008** (Fake-DEX Clone-Frontend Phishing — secondary; the frontend UIs were typosquat-domain-hosted clones of the legitimate Uniswap interface, and the user-acquisition surface followed the same distribution-channel pattern as the broader T4.008 fake-DEX-frontend cohort).
**Attribution:** **pseudonymous** — no individual operator attribution at v0.1. The routing-path extraction pattern was observed across multiple independently-operated frontends, suggesting a shared playbook rather than a single operator cluster.
**Key teaching point:** **The Uniswap routing-manipulation frontend cohort is the operational demonstration that wallet confirmation screens that display only the `to` address (the verified Uniswap Universal Router) are insufficient for router/aggregator transactions — the user's security model of "verify the contract address" is defeated because the contract address is correct; the extraction occurs in the routing path embedded in calldata that wallet UIs do not surface.** The incident is the practical validation of the T6.008 detection surface at the wallet-side routing-path-transparency layer.

## Summary

In 2025, multiple attacker-operated frontends surfaced claiming to be "Uniswap interface," "Uniswap aggregator," or "Uniswap swap portal." These frontends were hosted on typosquat or near-miss domains and presented a swap UI that was visually indistinguishable from the legitimate Uniswap interface. The transaction-construction layer was the novel extraction primitive: the frontend constructed a swap transaction addressed to the legitimate, verified, and audited Uniswap Universal Router contract.

The user's wallet confirmation screen displayed the correct `to` address — the genuine Uniswap Universal Router. The user, trained to "verify the contract address before signing," saw the correct address and confirmed the transaction. The wallet confirmation screen satisfied the user's mental model: "I am swapping via Uniswap, the contract address is correct, the swap is safe."

However, the swap path embedded in the calldata routed the user's trade through one or more attacker-deployed intermediate liquidity pools before reaching the legitimate Uniswap V3 pools. The intermediate pool extracted a spread or fee — the user received fewer output tokens than the legitimate Uniswap interface's quote for the same input/output pair at the same block. The legitimate Uniswap Universal Router executed the swap path as constructed — the router itself was not malicious; the path was. The extraction was invisible at the wallet confirmation step because the routing path was embedded in the calldata, which standard wallet UIs truncate or do not decode into human-readable form.

The structural vulnerability is the gap between the wallet's confirmation-surface fidelity and the transaction's execution-surface complexity. The wallet shows the user a simple "you are interacting with Uniswap" confirmation; the transaction executes a multi-hop swap path through attacker-owned intermediate contracts. The user's mental model and the transaction's execution model are structurally disjoint — the routing path is the gap.

This cohort is structurally parallel to the SwapKit router impersonator cohort (2024–2025) — the canonical T6.008 calibration anchor — but with a different impersonated brand (Uniswap vs. SwapKit). The unifying structural feature is the extraction-via-routing-path primitive: the user signs a transaction to a verified protocol contract, but the calldata embeds an attacker-owned intermediate hop that extracts value before the swap reaches the legitimate liquidity pools.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-2025 | Uniswap Universal Router deployed and verified on-chain; standard wallet UIs display `to` address but do not decode full routing path from calldata | T6.008 surface (latent — routing-path-transparency gap is structural) |
| 2025 | Attacker-operated typosquat domains registered; frontend dApps deployed presenting Uniswap-alike swap interface | T4.008 (fake-frontend distribution surface) |
| 2025 | Users access attacker frontend (via search-engine results, social-media links, or phishing messages); construct swap transactions | T4.008 (user acquisition) |
| 2025 | Transaction constructed: `to` address = legitimate Uniswap Universal Router; calldata embeds routing path through attacker-deployed intermediate pool(s) | **T6.008** (routing-path extraction — malicious intermediate hop inserted in swap path) |
| 2025 | User signs transaction after verifying the `to` address (Universal Router) on wallet confirmation screen; extraction occurs at intermediate pool in routing path | **T6.008** (extraction-via-routing-path — invisible at wallet confirmation) |
| 2025 | ScamSniffer / SEAL Threat Intel flag domains; industry-press and community-forensic channels (ZachXBT) report the routing-manipulation pattern | (detection and disclosure) |

## Realised extraction

Cohort-level phishing losses distributed across users of multiple independently-operated Uniswap-routing-manipulation frontends. Per-victim losses from low four-figures to mid five-figures USD equivalent. The extraction per victim was typically the spread between the legitimate Uniswap quote and the received output — a few percent per swap — making individual transactions unlikely to trigger user-side alerting at the time of execution.

## OAK technique classification rationale

T6.008 (Verified-but-Malicious Frontend Routing) is the primary classification because the load-bearing extraction primitive was the routing-path manipulation — the intermediate attacker-owned pool inserted in the swap path that the verified Uniswap Universal Router executed as constructed. The contract the user inspected was real, verified, and audited; the extraction occurred in the calldata the wallet UI did not surface. This is the canonical T6.008 shape: the deception locus is the routing path, not the contract address.

T4.008 (Fake-DEX Clone-Frontend Phishing) is the secondary classification because the frontend UIs were typosquat-domain-hosted clones of the legitimate Uniswap interface, and the user-acquisition surface followed the same distribution-channel pattern as the broader T4.008 fake-DEX-frontend cohort. The T4.008→T6.008 chain (fake-frontend distribution → routing-path extraction) is a canonical composition pattern for this class.

## Public references

- Uniswap Universal Router on-chain transaction analysis (swap-path reconstruction from calldata, intermediate-hop-address identification)
- ScamSniffer routing-path phishing reports (Uniswap-branded routing-manipulation domains)
- ZachXBT per-victim incident threads
- SEAL Threat Intel phishing-domain feeds
- MetaMask / Rabby transaction-decoding documentation (routing-path display capabilities — partial at v0.1)
- See `examples/2024-2025-swapkit-router-impersonator-phishing.md` for the canonical T6.008 calibration anchor (SwapKit router impersonator cohort)
