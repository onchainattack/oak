# Venus Protocol Supply-Cap Donation-Attack Exploit — BNB Chain — 2026-03-15

**Tags:** OAK-T9.011, OAK-T17.001

**Loss:** $3.7M in extracted borrowed assets; $2.15M in unrecoverable bad debt (1.18M CAKE + 1.84M THE that no liquidation proceeds could cover); $5.07M gross extracted against ~$16.29M in attacker-funded accumulation capital (7,447 ETH via Tornado Cash + $9.92M borrowed from Aave). The attacker's on-chain P&L appears negative or break-even; the working hypothesis (per Venus's risk manager Allez Labs) is that the on-chain loss was offset by a short perpetual position on THE at a CEX.

**Key teaching point:** The Venus Protocol Rekt IV case is the canonical **dismissed-audit-finding exploitation** worked example for OAK. Code4rena flagged the donation-attack supply-cap bypass in May 2023 with a working proof of concept; Venus assessed it as "supported behavior with no negative side effects" and did not remediate. The same vector was exploited on Venus's ZKSync deployment in February 2025 ($717K net bad debt). Venus still did not patch the BNB Chain Core Pool. On March 15, 2026, an attacker who spent nine months accumulating 84% of the THE supply cap executed the exact attack described in the 2023 audit finding. The sequence — auditors flag, team dismisses, attacker exploits, team absorbs loss, attacker exploits again — is the definitive reference case for why audit-finding dismissal is itself a standing security surface.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2023-05 | Code4rena audit contest of Venus Isolated Pools documents the donation-attack supply-cap bypass in detail (finding M-10), with a working proof of concept; Venus assesses it as "supported behavior with no negative side effects" | (audit-finding dismissal — standing T9.011 surface) |
| 2025-02 | Donation attack hits Venus's ZKSync deployment using nearly identical mechanics (wUSDM exchange rate manipulated via direct ERC-4626 donation); Venus absorbs $717K net bad debt; BNB Chain Core Pool shares the same vulnerability; Venus does not patch it | (prior exploit — same vector, different chain) |
| 2025-06 | Attacker wallet receives 7,447 ETH (~$16.29M) across 77 Tornado Cash transactions; ETH deposited as collateral on Aave; ~$9.92M in stablecoins borrowed and used to quietly accumulate THE on open market over 9 months | (accumulation phase — T17.001 pre-positioning) |
| 2026-03-15 (pre-attack) | Community members flag the accumulation address as suspicious; Venus allegedly takes no action because each individual deposit is technically within the rules | (missed detection window) |
| 2026-03-15 11:55 UTC | Attacker executes coordinated direct transfers of ~36M THE to the vTHE contract via six wallets, bypassing the mint()-enforced supply cap; vTHE exchange rate inflates 3.81×; collateral value jumps from ~$3.3M to >$12M | **T9.011** (donation attack — supply-cap bypass via direct ERC-20 transfer to vault contract) |
| 2026-03-15 (continuing) | Recursive borrow loop: deposit THE → borrow CAKE/BNB/BTCB/USDC → buy more THE on thin DEX liquidity → transfer to vTHE (bypassing cap again) → borrow more; THE spot price pushed from ~$0.26 to nearly $4 | **T17.001** (cross-venue price distortion — DEX spot manipulated while TWAP oracle converges) |
| 2026-03-15 (~37 min window) | Venus's BoundValidator rejects the spiking Binance feed for ~37 minutes as divergence exceeds acceptable range; only when attacker sustains buy pressure across multiple venues to force feed convergence does the BoundValidator accept the new rate (~$0.51, vs $4 spot peak) | (oracle resistance — TWAP eventually converges) |
| 2026-03-15 (peak) | Position peaks at 53.2M THE collateral against 6.67M CAKE, 2,801 BNB, 1.97K WBNB, 1.58M USDC, 20 BTCB borrowed | (peak extraction) |
| 2026-03-15 (liquidation) | Health factor deteriorates as sell pressure mounts; 53.2M THE liquidated into an order book with near-zero depth; THE collapses to $0.22 (below pre-attack $0.26); $30M nominal collateral value evaporates; $2.15M bad debt left in protocol | (liquidation — T17.001 unwind) |
| 2026-03-15 (real-time) | William Li identifies the attack pattern in real time (modeled this exact attack class in a 2023 academic paper), flags the attacker's address, and shorts THE for ~$15K profit; Blockaid issues community alert ("delegated borrowing abuse") | (community detection — 2 hours before Venus's first public statement) |
| 2026-03-15 (response) | Venus pauses THE borrows and withdrawals; sets Collateral Factor to zero across six additional markets (BCH, LTC, UNI, AAVE, FIL, TWT) where a single wallet holds >60% of supplied collateral | (containment) |
| 2026-03-17 | Venus / Allez Labs publish official post-mortem confirming: the vector "was identified in a prior Code4rena audit but was assessed as having 'no negative side effects' and was not remediated" | (root-cause confirmation) |

## Realised extraction

$5.07M gross extracted (2,172 BNB, 1.516M CAKE, 20 BTCB) against ~$16.29M accumulation capital; on-chain P&L appears negative or break-even. The extracted funds remain parked in the attacker's wallet with no mixer activity as of publication. Venus absorbed $2.15M in unrecoverable bad debt. CEX perp hypothesis (short THE on a CEX, collect on the collapse to $0.22) is the active investigative thread per Allez Labs and EmberCN.

## Public references

- [rekt.news — Venus Protocol — Rekt IV](https://rekt.news/venus-protocol-rekt4) — primary forensic narrative.
- [Venus Protocol official post-mortem (Allez Labs) — March 17, 2026](https://community.venus.io/) — confirms Code4rena finding dismissal as root cause.
- [Code4rena Venus Isolated Pools audit contest — May 2023, finding M-10](https://code4rena.com/) — donation-attack supply-cap bypass documented with working PoC.
- [Hacken post-incident advisory](https://x.com/HackenProof) — flags the Compound V2 fork supply-cap enforcement gap.
- [EmberCN on-chain analysis](https://x.com/EmberCN) — attacker P&L analysis: "onchain alone, it doesn't look profitable."
- [William Li real-time identification](https://x.com/WilliamLi) — modeled the attack class in a 2023 academic paper on role-play attack strategies in DeFi.
- [Blockaid community alert](https://x.com/blockaid_) — "delegated borrowing abuse" classification.
- Cross-reference: T9.011 at `techniques/T9.011-precision-loss-rounding-attack.md`.

## Discussion

Venus Protocol Rekt IV is the fourth major incident since 2021 for the same protocol on the same chain ($95M XVS price manipulation 2021, $14.2M LUNA crash 2022, $717K ZKSync donation attack 2025). The root cause — donation-attack supply-cap bypass via direct ERC-20 transfer to the vault contract — is the canonical T9.011 (Precision-Loss / Donation Attack) worked example for Compound V2 forks.

The case is structurally instructive for three reasons:

1. **Audit-finding dismissal as a standing security surface.** The 2023 Code4rena finding documented the exact mechanism with a working PoC. Venus assessed it as "no negative side effects." The ZKSync exploit in February 2025 proved otherwise with real money. Venus still did not patch the BNB Chain Core Pool. The 2026 exploit is the predictable third event in the chain. OAK contributors should treat audit-finding dismissal with a subsequent exploit as a strong signal for coverage priority.

2. **The supply-cap enforcement gap is a cross-fork systemic vulnerability.** Hacken explicitly flagged this in the aftermath: "Attention Compound V2 forks: Verify whether direct token transfers to your cToken contracts bypass supply-cap logic." The mint()-only enforcement pattern is inherited by every Compound V2 fork; any fork that has not independently verified the transfer() path is exposed.

3. **CEX-derivatives P&L asymmetry.** The attacker's on-chain operations appear unprofitable (borrowed $9.92M, extracted $5.07M). The working hypothesis — that the attacker shorted THE on a CEX and collected on the collapse — means the protocol loss ($2.15M bad debt) is independent of whether the attacker's strategy was profitable. The protocol absorbs the damage; the attacker's P&L is decoupled from on-chain forensics. This is a structural property of T9.011 + T17.001 composed attacks that OAK's detection guidance should address.
