# Curve Finance Exploit Freeze Coordination — Multi-Exchange Compliance Response — 2023-07

**Loss:** $61M+ (including ~$41M from Curve CRV/ETH pool, ~$20M from other pools). ~$52M recovered through coordinated exchange freeze and MEV-whitehat frontrunning.
**OAK Techniques observed:** OAK-T9.001 (Oracle Price Manipulation) — Vyper compiler reentrancy-lock bypass exploited via price-oracle manipulation; OAK-T7.002 (CEX Deposit-Address Layering) — attacker attempted CEX off-ramp; **freeze coordination via OAK-M27 (Travel Rule and KYC at CEX boundary)** — compliance teams at Binance, OKX, Coinbase, FixedFloat, and Huobi coordinated freeze within hours.
**Attribution:** **pseudonymous** — attacker address `0xb0b0...` identified on-chain; identity unknown. MEV searchers (c0ffeebabe.eth and others) whitehat-frontran the attacker to recover ~$5M in a notable counter-exploit.

**Key teaching point:** The July 2023 Curve Finance exploit demonstrates the **multi-VASP freeze coordination pattern**: within hours of the exploit, compliance teams at 5+ exchanges coordinated to freeze attacker deposit addresses, recovering ~$52M (85%+ of stolen funds). The coordination was ad-hoc — driven by on-chain analysts flagging attacker deposit addresses in real time via Twitter/X and Telegram — rather than through a formal Travel Rule data-sharing framework. The case illustrates both the potential (rapid freeze = high recovery) and the fragility (ad-hoc coordination depends on individual compliance officers monitoring crypto Twitter, not on systematic VASP-to-VASP Travel Rule infrastructure) of current compliance freeze workflows. Detection approach: VASP-side compliance monitoring must include real-time on-chain intelligence feeds (not just static OFAC SDN lists) to achieve the sub-hour freeze response times that made the Curve recovery possible.

## Summary

On July 30, 2023, Curve Finance pools were exploited via a Vyper compiler vulnerability (CVE-2023-XXXX — reentrancy lock bypass in Vyper versions 0.2.15, 0.2.16, and 0.3.0). The attacker drained approximately $61M across multiple Curve pools (alETH/ETH, msETH/ETH, pETH/ETH, CRV/ETH).

Within hours, on-chain analysts (ZachXBT, Lookonchain, PeckShield, BlockSec) identified attacker deposit addresses at multiple centralized exchanges. Compliance teams were alerted via public posts and direct outreach.

The freeze response unfolded in three phases:

1. **Detection (hour 0-1):** On-chain analysts identified the exploit and published attacker addresses. MEV searchers front-ran attacker transactions to recover ~$5M.
2. **Freeze coordination (hour 1-6):** Compliance teams at Binance, OKX, Coinbase, FixedFloat, and Huobi froze attacker deposit addresses. The coordination was ad-hoc: analysts posted addresses on Twitter; compliance officers monitoring those feeds initiated freezes.
3. **Recovery (hour 6-48):** ~$52M in frozen funds were confirmed across exchanges. Curve team negotiated return of remaining funds.

The ad-hoc nature of the coordination is the key operational insight: every exchange compliance team acted independently based on public intelligence. There was no formal VASP-to-VASP Travel Rule alert mechanism for "active exploit in progress."

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2023-07-30 ~13:00 UTC | Vyper compiler reentrancy lock bypass exploited against Curve pools. ~$61M drained | **T9.001** |
| 2023-07-30 ~13:30 UTC | MEV searchers whitehat-frontrun attacker, recover ~$5M | (counter-exploit) |
| 2023-07-30 ~14:00–19:00 UTC | ZachXBT, PeckShield, BlockSec publish attacker addresses. Exchange compliance teams alerted | (public alert) |
| 2023-07-30 ~15:00–20:00 UTC | Binance, OKX, Coinbase, FixedFloat, Huobi freeze attacker deposit addresses | **M27 freeze coordination** |
| 2023-07-31 | ~$52M confirmed frozen across exchanges | (recovery) |
| 2023-08-03 | Curve team announces ~$49M returned, negotiations ongoing for remainder | (resolution) |

## What defenders observed

- **Ad-hoc coordination worked — this time.** The fact that compliance officers monitored crypto Twitter was the single point of success. If the exploit had occurred during off-hours for any single exchange's compliance team, the freeze window would have widened.
- **No formal VASP-to-VASP alert for active exploits.** Unlike Travel Rule data exchange (which covers transaction-level originator/beneficiary information), there is no standardised protocol for "attacker address just deposited to your exchange — freeze immediately." The gap is between real-time threat intelligence and compliance action.
- **MEV-whitehat intervention as a second recovery path.** The c0ffeebabe.eth frontrun was possible because the attacker's transactions were visible in the mempool. MEV infrastructure became an unplanned recovery mechanism — not a compliance tool, but structurally similar in effect (intercepting attacker transactions before they land).
- **Frozen funds vs. recovered funds.** Frozen funds are not the same as recovered funds. Frozen funds sit in an exchange's custody pending law enforcement determination; recovered funds are returned to victims. The gap between freeze and recovery requires legal process (subpoena, law enforcement referral, victim verification) that can take months.

## What this example tells contributors

- **Real-time on-chain intelligence feeds are a compliance data source.** Exchange compliance teams that relied solely on periodic OFAC SDN list updates would have missed the Curve attacker addresses. Integration with real-time on-chain intelligence (Chainalysis, TRM, Elliptic, and public analyst feeds) is the operational requirement for sub-hour freeze response.
- **VASP-to-VASP alert protocol for active exploits is a compliance infrastructure gap.** The Travel Rule (FATF Rec.16) mandates information exchange for individual transactions but does not define a protocol for "active threat actor deposit alert." A standardised VASP-to-VASP alert format for active-incident attacker addresses would close the ad-hoc-coordination gap that the Curve case exposed.
- **Freeze response time is the primary determinant of recovery rate.** The Curve case achieved 85%+ recovery because freezes occurred within hours. For comparison, the DMM Bitcoin case (May 2024, $305M) had a slower freeze response, and recovery was substantially lower. Freeze-response SLA should be treated as a compliance-team performance metric.

## Public references

- [Curve Finance Post-Mortem (August 2023)](https://github.com/curvefi/curve-docs/blob/main/post-mortem/2023-07-30-vyper-reentrancy.md)
- [ZachXBT — Curve Exploit Alert Thread (X/Twitter)](https://x.com/zachxbt/status/1685684462798893056)
- [BlockSec — Vyper Reentrancy Analysis](https://blocksecteam.medium.com/curve-finance-incident-analysis-2023-07-30-2e5c6b1e3a2b)
- Attacker address: identified across multiple EVM addresses; exchanges involved: Binance, OKX, Coinbase, FixedFloat, Huobi.
- MEV whitehat frontrun: c0ffeebabe.eth and other searchers recovered ~$5M.

## Discussion

The Curve Finance freeze coordination case is OAK's canonical compliance freeze workflow example at the multi-VASP scale for 2023. It demonstrates the load-bearing role of ad-hoc compliance coordination and the gap that a formal VASP-to-VASP active-threat alert protocol would fill. The case is documented as a T7.010-adjacent worked example because the freeze coordination was the recovery mechanism, not the laundering method; the laundering attempt (T7.002 CEX off-ramp) was intercepted before completion.
