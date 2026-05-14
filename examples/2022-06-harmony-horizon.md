# Harmony Horizon Bridge — Ethereum ↔ Harmony — 2022-06-23/24

**Loss:** \~\$100M (\~\$99.6M tracked by Elliptic at time of event; ETH, BNB, USDT, USDC, DAI extracted across 14 transactions on Ethereum and Binance Smart Chain).
**Attribution:** **inferred-strong** — see OAK-Gnn line below for attribution detail.
**OAK Techniques observed:** OAK-T10.001 (Validator / Signer Key Compromise) — primary; OAK-T7.001 (Mixer-Routed Hop) — downstream laundering (\~\$96M routed through Tornado Cash).
**OAK-Gnn:** [OAK-G01 Lazarus Group / DPRK-attributed](../actors/OAK-G01-lazarus.md). **Confirmed** attribution: FBI public statement (January 23, 2023), naming Lazarus Group / APT38 and the broader "TraderTraitor" DPRK crypto-theft cluster. Elliptic published an inferred-strong attribution within days of the event (June 2022); the FBI statement upgraded that to a confirmed attribution roughly seven months later.

**Key teaching point:** Harmony Horizon is OAK's secondary T10.001 + G01 example because it makes the *systemic* nature of the pattern visible in a way the Ronin case alone cannot. Ronin in isolation could be read as a single sophisticated incident. Harmony three months later, with the same Technique class, the same threat actor, and the same laundering methodology, established T10.001 + G01 as a recurring chain rather than a one-off — and is the reason the OAK-G01 attribution profile treats subsequent bridge-class incidents as *expected* rather than *exceptional*.

## Summary

On June 23–24, 2022, attackers compromised two of the five signing addresses controlling the Harmony Horizon bridge between Ethereum and the Harmony chain (with a Binance Smart Chain leg). The bridge enforced a 2-of-5 multisig threshold on outbound asset movements; with two keys in attacker control, the threshold was met and the attackers signed 14 extraction transactions across Ethereum and BSC, draining a basket of ETH, BNB, USDT, USDC, and DAI worth approximately \$100M at the time of the event.

The compromise mechanism was off-chain. Per published analysis, the multisig signer keys were held in hot-wallet servers and were accessible in plaintext for the purpose of signing legitimate bridge transfers; the attackers obtained server access and, with it, the keys. The bridge contracts themselves were not exploited — the on-chain authorisation was, from the contracts' perspective, valid.

Elliptic's forensic analysis attributed the hack to Lazarus Group / APT38 within days of the event, on the basis of the laundering methodology (which closely mirrored the post-Ronin laundering pattern from three months earlier) and wallet-cluster overlap. Approximately \$96M of the \~\$99.6M tracked proceeds was routed through Tornado Cash. The FBI publicly confirmed Lazarus / APT38 attribution on January 23, 2023, and tied the case to the "TraderTraitor" DPRK campaign label; the same FBI release flagged a January 13, 2023 \>\$60M ETH movement through the RAILGUN privacy protocol as a continuation of the laundering activity.

Harmony Horizon and the [Ronin Bridge incident](2022-03-ronin-bridge.md) (March 2022) together form what defenders now recognise as the **2022 Lazarus bridge wave**: two large-loss bridge incidents, three months apart, both turning on validator/signer key compromise rather than smart-contract bugs, both extensively laundered through Tornado Cash, both eventually FBI-attributed to the same threat actor. The pair is the primary reason OAK treats T10.001 + G01 as a canonical chain rather than as two independent observations.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-event (off-chain) | Compromise of Harmony infrastructure giving access to plaintext signer keys held on hot-wallet servers (mechanism documented at the operational level; specific intrusion vector not publicly detailed at confirmed-attribution level) | (off-chain entry vector — out of OAK on-chain Tactic scope; documented under OAK-G01) |
| 2022-06-23 \~12:30 | First extraction transactions on Ethereum side of the bridge using two compromised signing addresses against the 2-of-5 threshold | **T10.001 extraction** |
| 2022-06-23 / 06-24 | 14 transactions total across Ethereum and Binance Smart Chain extract ETH, BNB, USDT, USDC, DAI; aggregate \~\$100M | **T10.001 extraction** |
| 2022-06-24 | Harmony team publicly discloses the Horizon Bridge incident | — |
| 2022-06-27 onward | Stolen non-ETH assets swapped to ETH on DEXes; ETH structured into 100-ETH tranches and sent through Tornado Cash; \~\$96M routed in total | **T7.001** |
| 2022-06 (within days) | Elliptic publicly attributes the hack to Lazarus Group / APT38 on the basis of laundering-pattern overlap with the Ronin case and wallet-cluster analysis | (inferred-strong attribution) |
| 2023-01-13 | DPRK actors begin layering \>\$60M of the Horizon-derived ETH through the RAILGUN privacy protocol | **T7.001** (alternate-mixer continuation) |
| 2023-01-23 | FBI publicly confirms Lazarus Group / APT38 attribution; ties Harmony to the "TraderTraitor" DPRK campaign | **G01 confirmed attribution** |
| 2023-06 onward | Harmony reconfigures the Ethereum-side bridge multisig from 2-of-5 to 4-of-5 | (operator-side mitigation) |

## What defenders observed

- **Pre-event (off-chain):** the compromise mechanism — plaintext private keys on hot-wallet servers used for live signing — was the kind of operational-security failure that does not produce on-chain warning. The pre-event signal was entirely off-chain (server-access compromise) and would have required visibility into Harmony's signer infrastructure, not into the Horizon Bridge contracts.
- **Pre-event (on-chain, structural):** the 2-of-5 multisig threshold was the structural risk multiplier. Two compromised keys was a sufficient quorum. Public observers had access to the multisig configuration; treating low-threshold-on-small-N (2/5, 3/7, etc.) bridges as elevated risk was an inference available to defenders before the event.
- **At-event:** the 14 extraction transactions across Ethereum and BSC executed within hours and were on-chain-finalised by the time Harmony team became aware. As with Ronin three months earlier, the on-chain manifestation of the threshold-signing event was indistinguishable from an authorised transfer at the contract-validation layer.
- **Post-event laundering:** the laundering route — DEX-swap of non-ETH assets into ETH, followed by structured 100-ETH-tranche deposits into Tornado Cash — was a near-exact replay of the post-Ronin laundering pattern from three months earlier. Pattern-overlap with the Ronin laundering, plus wallet-cluster overlap, was the basis for Elliptic's same-week attribution.
- **Detection latency:** Harmony's team-side detection of the incident was on the order of hours-to-a-day, materially better than Ronin's six-day visibility gap. The bridge-monitoring posture lessons from Ronin (March 2022) had partially propagated to the next bridge target three months later.
- **Operator-side mitigation:** the post-incident move to a 4-of-5 threshold on the Ethereum-side bridge is the canonical illustration of "what should have been the threshold pre-event"; the structural lesson is published in operator documentation but the asset value at risk during the 2-of-5 period is the actionable historical metric.

## What this example tells contributors writing future Technique pages

- **T10.001 + G01 is a chain, not a coincidence.** Ronin (March 2022) and Harmony Horizon (June 2022) are the same Technique against the same threat actor's playbook three months apart. The 2022 bridge wave is the foundational evidence that T10.001 should be treated as a *Lazarus-default* Technique rather than as a generic class — most large T10.001-class incidents on the public record cluster under G01 attribution.
- **Threshold-as-structural-risk is publicly observable.** Unlike the Ronin off-chain vector (which required intelligence on the LinkedIn fake-job-offer campaign), the 2-of-5 Harmony Horizon threshold was *publicly documented before the event*. Future T10.001 examples should include the threshold geometry in the header — it is one of the few pre-event signals that a third-party defender can read directly from on-chain configuration.
- **Laundering-pattern reuse is an attribution accelerator.** Elliptic's same-week Lazarus attribution turned on the laundering methodology mirroring Ronin (DEX-swap to ETH, 100-ETH-tranche Tornado Cash deposits). Once a threat actor's laundering playbook is documented, the next incident's attribution latency drops from months to days. This is the operational payoff of maintaining stable G-pages.
- **Mixer-route continuation survives sanctions.** The August 2022 OFAC designation of Tornado Cash (`[ofac2022tornado]`) did not end Lazarus's use of mixer-class laundering for the Harmony proceeds; it shifted the route to RAILGUN by January 2023. T7.001 examples should treat "mixer of choice" as a substitutable variable across enforcement actions, not a fixed identifier.

## Public references

- `[ellipticharmony2022]` — Elliptic primary forensic write-up (loss size, multisig-compromise vector, Tornado Cash laundering route, same-week Lazarus attribution).
- `[fbiharmony2023]` — FBI press release (January 23, 2023) confirming Lazarus Group / APT38 attribution and tying Harmony to the "TraderTraitor" DPRK campaign.
- `[halbornharmony2022]` — Halborn technical post-mortem (2-of-5 multisig configuration, plaintext-key hot-wallet hypothesis, post-incident move to 4-of-5).
- `[ellipticronin2022]` — companion analysis of the Ronin case, used cross-referentially in the Lazarus-attribution chain for Harmony.
- `[chainalysis2024dprk]` — DPRK-attributed scale and Lazarus operational continuity through 2024–2025.
- `[ofac2022tornado]` — Tornado Cash designation (August 8, 2022); the laundering-route enforcement that pushed Lazarus toward RAILGUN for the Harmony proceeds.

## Discussion

Harmony Horizon is OAK's secondary T10.001 + G01 example because it makes the *systemic* nature of the pattern visible in a way the Ronin case alone cannot. Ronin in isolation could be read as a single sophisticated incident. Harmony three months later, with the same Technique class, the same threat actor, and the same laundering methodology, established T10.001 + G01 as a recurring chain rather than a one-off — and is the reason the OAK-G01 attribution profile treats subsequent bridge-class incidents as *expected* rather than *exceptional*.

The case is also the cleanest illustration of two attribution surfaces operating at different latencies. Elliptic's same-week inferred-strong attribution turned on on-chain forensic signal (laundering-pattern overlap, wallet-cluster overlap) and was actionable for compliance and for industry CTI within days. The FBI's confirmed attribution arrived seven months later in January 2023, and provided the regulatory-grade attribution surface (sanctions-list integration, formal campaign labelling under "TraderTraitor"). Defenders need both surfaces; OAK example pages should preserve the gap between them rather than collapse the inferred-strong attribution into the confirmed one.

Contributors writing future T10.001 + G01 cases should:

- State the multisig threshold and signer-set size in the header. The structural-risk-multiplier signal is publicly observable and is the single piece of pre-event information a third-party defender can act on.
- Distinguish *inferred-strong* (industry-forensic-only) attribution from *confirmed* (FBI / Treasury / DOJ public statement) attribution and date-stamp both. The latency gap between them is itself a dataset.
- Cross-reference the Ronin example explicitly — the pair is the canonical training set for the Lazarus bridge playbook and should be read together by anyone modelling future bridge-class risk.
- Track the laundering-route shift across enforcement actions (Tornado Cash → RAILGUN here; Tornado Cash → THORChain in the post-Bybit chain). Mixer-of-record changes; mixer-as-Technique persists.
