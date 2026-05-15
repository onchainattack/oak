# Uniswap verified-but-malicious frontend routing manipulation — 2025

**Loss:** **Per-victim loss, not a single-incident total.** A phishing UI bound to Uniswap's legitimate, audited, verified V3 router contract at the wallet confirmation screen — so the user's wallet displayed a transaction to the canonical `0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45` (Uniswap Universal Router) — but the swap routing path constructed by the attacker's frontend included an intermediate attacker-controlled contract that extracted value via an unfavourable routing hop. The transaction's on-chain outcome was a swap at a materially worse rate than the canonical Uniswap API would have returned for the same input, despite the transaction's `to` address being the legitimate Uniswap router.
**OAK Techniques observed:** **OAK-T6.008** (Verified-but-Malicious Frontend Routing) — canonical anchor. The attacker's frontend constructed a swap path that included the legitimate Uniswap router as the entry point but routed through an attacker-controlled intermediate pool or helper contract not in Uniswap's canonical pool registry. The wallet confirmation screen displayed the verified Uniswap router address — which was accurate — but the routing path's intermediate contracts were not surfaced.
**Attribution:** **unattributed** — no public attribution at v0.1 cutoff.

**Key teaching point:** The Uniswap verified-router frontend-swap manipulation is the canonical T6.008 anchor: the transaction's `to` address is a legitimate, audited, verified contract — the wallet's security indicator shows "verified" — but the swap path constructed by the frontend includes an attacker-controlled intermediate contract that extracts value via routing logic invisible to the user at sign time. The wallet confirms the caller, not the callee's callees.

## Summary

In 2025, security researchers identified phishing UIs that bound to Uniswap's legitimate Universal Router contract at the wallet confirmation screen. The phishing flow: (1) user visits a typosquat domain impersonating the Uniswap interface; (2) the fake UI displays standard swap functionality with competitive quoted rates; (3) when the user submits the swap, the frontend constructs a routing path through the legitimate Uniswap Universal Router that includes an attacker-controlled intermediate contract as a routing hop; (4) the wallet confirmation screen displays the transaction to the verified Uniswap router address — which is correct — but does not decode or surface the intermediate hop contract addresses in the routing path calldata.

The intermediate contract extracts value via one of three mechanisms: (a) an unfavourable pool that the attacker has pre-seeded with imbalanced liquidity; (b) a fee-skimming contract that diverts a percentage of the swap output to an attacker address; (c) a MEV-extraction contract that front-runs the user's swap for the attacker's benefit before routing the remainder through the canonical path.

The structural detection gap: wallets verify the `to` address but do not parse the calldata's routing path to verify that all intermediate contracts are in the protocol's canonical registry — the T6.008 PATH C detection signal.

## Public references

- Uniswap security advisories: phishing UI impersonation warnings (2025).
- Web3 security researchers: verified-router frontend-swap attack analysis (2025).
- Uniswap canonical pool/hop registry documentation.
