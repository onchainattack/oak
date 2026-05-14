# TrustedVolumes RFQ Authorization-Boundary Failure — Ethereum — 2026-05-07

**Tags:** OAK-T9.004

**Loss:** ~$5.87M in a single transaction across four assets: 1,291 WETH, 206,282 USDT, 16.939 WBTC, and 1,268,771 USDC. Funds drained from TrustedVolumes' own inventory via pre-existing unlimited ERC-20 approvals to the vulnerable RFQ proxy contract.

**Key teaching point:** TrustedVolumes is the canonical 2026 case for **authorisation-without-authentication in a DeFi RFQ/solver infrastructure** — the contract verified *who signed* an order but never checked whether the signer had any right to spend the funds being moved. Three bugs chained together in a custom RFQ swap proxy the team built and controlled: (1) a permissionless `registerAllowedOrderSigner()` function that let anyone register as a valid signer, (2) a `fillOrder()` path that checked the signer against the attacker-controlled receiver rather than the inventory owner, and (3) a broken replay guard that read and wrote different storage slots. The contract was unverified on Etherscan, the team had not posted publicly in over a year, and no audit had ever been disclosed. banteg reproduced the full exploit in Foundry within hours — the barrier to entry was 4 wei USDC and fifteen minutes.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| Pre-2026-05-07 | TrustedVolumes deploys custom RFQ swap proxy inside 1inch Fusion ecosystem; inventory grants the proxy unlimited ERC-20 approvals; contract remains unverified on Etherscan; no audit disclosed; team goes silent for >1 year | (standing T9.004 surface — permissionless signer registration + missing maker-authorisation check) |
| 2026-05-07 | Attacker deploys exploit contract; calls `registerAllowedOrderSigner()` — a permissionless public function with no owner check — to register their EOA as an authorised signer for their own contract as maker | **T9.004** (access-control misconfiguration — permissionless role registration) |
| 2026-05-07 (same tx) | Attacker calls `fillOrder()` four times in a single transaction; the contract checks `allowedOrderSigner[order.receiver][signer]` — confirming the signer is authorised for the attacker-controlled receiver, NOT for the inventory owner; sets `taker = victim` (TrustedVolumes' inventory) as the `from` address in the token transfer | **T9.004** (misvalidated authorisation — wrong subject in access-control check) |
| 2026-05-07 (same tx) | Replay protection (`saltStatus`) writes to a different storage key than it reads — all four drain calls pass the replay check without friction; 1,291 WETH + 206,282 USDT + 16.939 WBTC + 1,268,771 USDC transferred to attacker | **T9.004** (broken invariant — replay guard with non-matching storage slots) |
| 2026-05-07 (post-drain) | Attacker unwraps WETH, forwards all tokens to attacker EOA, converts to ETH; stolen funds consolidated before TrustedVolumes confirms the exploit | (exit) |
| 2026-05-07 | CertiK first to post: "The attacker registers as an AllowedOrderSigner through a public function, then executes the order to transfer from the victim." Blockaid follows within 60 seconds. SlowMist posts root cause breakdown. | (third-party detection — ~2.5 hours before TrustedVolumes' first public statement) |
| 2026-05-07 (+2.5h) | TrustedVolumes confirms the exploit — first public post in over a year; offers bug bounty email (tvbugbounty@proton.me) and "constructive communication" | (operator response — delayed, measured) |
| 2026-05-08 | banteg publishes full Foundry reproduction (reconstructed Solidity, D2 flow diagram) confirming every step against a fork of block 25039669 | (independent verification — exploit barrier: 4 wei USDC + 15 min) |

## Realised extraction

~$5.87M across four assets in a single transaction (0xc5c61b3ac39d854773b9dc34bd0cdbc8b5bbf75f18551802a0b5881fcb990513). TrustedVolumes' own accounting placed the figure at ~$6.7M. Stolen funds consolidated to ETH and sitting in attacker-controlled wallets as of publication. No recovery announced.

## Public references

- [rekt.news — TrustedVolumes — Rekt](https://rekt.news/trustedvolumes-rekt) — primary forensic narrative.
- [CertiK Alert](https://x.com/CertiK) — first responder: permissionless signer registration + victim transfer.
- [Blockaid Alert](https://x.com/blockaid_) — victim contract, exploiter address, attack transaction, running damage tally.
- [SlowMist root cause breakdown](https://x.com/SlowMist_Team) — "Signature validation checks _allowedSigners[msg.sender][signer] using caller (taker) instead of order's maker as key."
- [banteg Foundry reproduction](https://x.com/bantg) — full exploit reproduced against a fork of block 25039669; reconstructed Solidity + D2 flow diagram.
- Cross-reference: T9.004 at `techniques/T9.004-access-control-misconfiguration.md`.

## Discussion

The TrustedVolumes case is the 2026 canonical example of a **three-bug chain in a single custom RFQ implementation** — each bug individually represents a standard T9.004 sub-pattern (missing modifier, misvalidated subject, broken invariant), but the chain is what made the exploit possible with near-zero setup cost.

Three structural features distinguish this case:

1. **The contract was unverified and un-audited.** The RFQ proxy's source code was never submitted to Etherscan. Both bugs were visible only from bytecode. No audit has ever been publicly disclosed. For a contract holding unlimited approvals over millions in assets, the absence of public verification is itself a standing T9.004 signal — code that has not been open-sourced has not been reviewed by the security community.

2. **The team was operationally absent.** TrustedVolumes had not posted publicly in over a year before the exploit confession. No security updates, no community posts, no architecture documentation beyond an empty docs page. The operational silence meant there was no community scrutiny of the RFQ proxy's design — the contract was effectively invisible until it was drained.

3. **The exploit barrier was trivially low.** banteg's Foundry reproduction demonstrated that any address with 4 wei USDC and fifteen minutes could have executed the exploit. The three bugs were not zero-days requiring sophisticated discovery — one required little more than reading the function name (`registerAllowedOrderSigner`). The incident is a case study in the security cost of deploying unaudited custom solver infrastructure without community review.
