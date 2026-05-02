# DMM Bitcoin hot-wallet theft — Bitcoin — 2024-05-31

**Loss:** approximately \$305M (4,502.9 BTC at the time of the event). At publication of the FBI / DC3 / NPA joint statement in December 2024 the figure was widely cited as \$308M; OAK uses the at-event figure for consistency with other entries.
**OAK Techniques observed:** OAK-T11.001 (Third-Party Signing / Custody Vendor Compromise) — primary, via the Ginco wallet-software supply chain; downstream OAK-T7.001 (mixer-routed laundering — Bitcoin CoinJoin) and pending cross-chain laundering Techniques as the attacker cluster rotated proceeds throughout 2024-2025.
**Attribution:** **confirmed** by FBI, Department of Defense Cyber Crime Center (DC3), and Japanese National Police Agency (NPA) in a joint public statement on 2024-12-23, attributing the theft to "TraderTraitor" — the DPRK / Lazarus cluster also tracked as Jade Sleet, UNC4899, and Slow Pisces. Chainalysis and Elliptic independently corroborated the wallet-cluster attribution.
**OAK-Gnn:** [OAK-G01 Lazarus Group / DPRK-attributed](../actors/OAK-G01-lazarus.md). Concurrent industry write-ups note [OAK-G08 BlueNoroff](../actors/OAK-G08-bluenoroff.md) operator-fingerprint overlap on the macOS / supply-chain-tradecraft side; OAK records this case under G01 because the primary FBI / DC3 / NPA attribution document names TraderTraitor specifically, with G08 overlap noted on the OAK-G08 actor page.

## Summary

On May 31, 2024, DMM Bitcoin — a Japanese-licensed cryptocurrency exchange — disclosed an "unauthorized leak" of 4,502.9 BTC (\~\$305M at the time) from its operational hot wallet. Per the joint FBI / DC3 / NPA statement published in December 2024 and corroborating industry forensics, the entry vector was **not** a direct compromise of DMM Bitcoin's own infrastructure. The attackers compromised **Ginco**, a Japan-based enterprise wallet-software vendor whose product DMM Bitcoin used in its signing pipeline.

The intrusion chain reconstructed by the FBI / DC3 / NPA is: in late March 2024 a TraderTraitor operator posed as a recruiter on LinkedIn and sent a Ginco employee a URL to a Python script hosted on GitHub, framed as a pre-employment coding test. The Ginco employee, who had access to Ginco's wallet-management system, copied the malicious Python code to their personal GitHub. After mid-May 2024 the attackers used session-cookie material to impersonate that employee and reach Ginco's unencrypted internal communications. In late May 2024 the attackers used that access to manipulate a legitimate transaction request initiated by a DMM Bitcoin employee, redirecting the resulting outflow to TraderTraitor-controlled addresses. The transaction settled on-chain on 2024-05-31.

For OAK's purposes the entry vector is **off-chain**: a software-supply-chain compromise of a third-party signing-pipeline vendor, structurally identical to the Bybit / Safe{Wallet} pattern that surfaced eight months later. OAK v0.1 does not have an on-chain Tactic that captures this entry vector; the case is documented here in the worked-example layer because the attribution and the on-chain manifestation are both on the public record.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Late March 2024 | TraderTraitor operator contacts a Ginco employee via LinkedIn posing as a recruiter; delivers a malicious Python "pre-employment test" hosted on GitHub | (off-chain entry vector — out of OAK on-chain scope) |
| Late March 2024 | Ginco employee copies the malicious Python to their personal GitHub; RN Loader / RN Stealer harvests SSH keys, saved credentials, cloud configs | (off-chain) |
| Mid-May 2024 | Attackers use stolen session-cookie material to impersonate the compromised Ginco employee; gain access to Ginco's unencrypted internal communications | (off-chain) |
| Late May 2024 | Attackers manipulate a legitimate transaction request initiated by a DMM Bitcoin employee; redirect destination to attacker-controlled addresses | T11.001-equivalent (vendor-mediated signing redirection) |
| 2024-05-31 | On-chain transaction settles: 4,502.9 BTC (\~\$305M) directed to attacker-controlled addresses | T5-equivalent (extraction event) |
| 2024-05-31 | DMM Bitcoin discloses "unauthorized leak"; suspends withdrawals and new spot-buy orders | — |
| 2024-06 onward | Proceeds split across \~10 intermediary wallets in roughly equal \~\$34M tranches; routed through a Bitcoin CoinJoin mixer | **T7.001** (mixer-routed laundering) |
| 2024-12-02 | DMM Bitcoin announces wind-down; customer accounts and assets to be transferred to SBI VC Trade by March 2025 | — |
| 2024-12-23 | FBI / DC3 / NPA joint statement attributing the theft to DPRK / TraderTraitor, naming the Ginco supply-chain vector | **G01 attribution** |

## What defenders observed

- **Pre-event:** DMM Bitcoin's signing pipeline depended on a third-party vendor (Ginco) whose developer-workstation security posture DMM did not directly control. This is the same shape of dependency that later surfaces at Bybit / Safe{Wallet} — defenders evaluating exchange custody risk in 2024 generally did not enumerate "wallet-software vendor's developer machines" in their threat model.
- **At-event (off-chain):** the intrusion sat dormant for roughly eight weeks between the March payload-delivery and the mid-May session-cookie pivot. The compromise of an *employee's personal GitHub* — outside the vendor's perimeter and outside DMM's perimeter — is the load-bearing step. Out-of-band verification on the DMM side (independent confirmation of destination address against an approved list, before signing) would have caught the manipulated transaction request even though the DMM environment itself was not breached.
- **At-event (on-chain):** the extraction was a single large outflow from DMM's hot wallet, on-chain monitoring showed the anomaly within minutes; by then the transaction was final.
- **Post-extraction:** the attacker fan-out pattern (split into \~10 wallets in equal \~\$34M tranches, then CoinJoin) is consistent with the TraderTraitor / Lazarus 2024 BTC-laundering playbook documented by Elliptic and Chainalysis. Direct recovery was minimal; DMM Bitcoin raised external funding to make customers whole rather than pursuing on-chain clawback.
- **Attribution timeline:** unlike Bybit (five days from event to FBI attribution), DMM Bitcoin took roughly seven months. The slower timeline reflects the multi-jurisdictional reconstruction needed to tie the on-chain wallet cluster back to the off-chain Ginco-side intrusion — Japanese NPA had to develop the off-chain side before a joint attribution was authoritative.

## What this example tells contributors writing future Technique pages

- **DMM Bitcoin is the first public OAK-G01 case with a confirmed third-party-wallet-software-vendor entry vector.** WazirX (2024-07) and Bybit (2025-02) are the two later cases in the same shape; DMM is the precedent. Contributors mapping T11.001 to historical incidents should treat May 2024 as the start of the visible 2024-2025 supply-chain wave, not Bybit.
- **The vendor-side compromise was through an employee's personal GitHub.** This is operationally critical for defenders: the perimeter that mattered was neither DMM's nor Ginco's — it was a Ginco employee's personal developer footprint. This matches the pattern at the JumpCloud (2023) and Safe{Wallet} (2025) vendor compromises and is the canonical TraderTraitor entry shape per the FBI joint statement.
- **Attribution can lag by months and still meet OAK's `confirmed` standard.** Contributors writing examples for 2024-2026 incidents should not downgrade attribution status simply because authoritative attribution arrived late; the standard is the source, not the latency.
- **The on-chain manifestation alone undersells the case.** A T5 / T7.001 mapping captures the extraction and laundering but not the Group-level pattern. The G01 attribution surface is what makes DMM operationally legible alongside Ronin, WazirX, and Bybit.

## Public references

- [FBI / DC3 / NPA joint statement — TraderTraitor responsible for theft of \$308M from Bitcoin.DMM.com](https://www.fbi.gov/news/press-releases/fbi-dc3-and-npa-identification-of-north-korean-cyber-actors-tracked-as-tradertraitor-responsible-for-theft-of-308-million-from-bitcoindmmcom) — primary authoritative attribution; describes the Ginco supply-chain vector in detail. `[fbidmm2024]`
- [Elliptic — DMM Bitcoin loses \$308 million in "unauthorized leak"](https://www.elliptic.co/blog/dmm-bitcoin-loses-308-million-in-unauthorized-leak) — initial wallet-cluster forensic analysis, splitting / CoinJoin fan-out pattern. `[ellipticdmm2024]`
- [Chainalysis — 2024 Crypto Crime Report (DPRK section)](https://www.chainalysis.com/) — DMM Bitcoin attribution and 2024 DPRK-cluster context. `[chainalysisdmm2024]` / `[chainalysis2024dprk]`
- [CoinDesk — DMM Bitcoin to Shut Down After \$305M Hack; Will Transfer Accounts to SBI VC](https://www.coindesk.com/business/2024/12/02/japanese-crypto-exchange-dmm-bitcoin-to-shut-down-after-305-m-hack) — post-mortem and wind-down to SBI VC Trade. `[dmmpostmortem2024]`
- [TRM Labs — DPRK 2024 crypto-theft activity](https://www.trmlabs.com/) — TraderTraitor cluster activity context across 2024. `[trmdmm2024]`
- [The Record — FBI attributes largest crypto hack of 2024 to North Korea's TraderTraitor](https://therecord.media/fbi-largest-crypto-hack-2024-tradertraitor) — secondary press confirmation of the joint statement.

## Discussion

DMM Bitcoin is the leading edge of a sequence of multi-hundred-million-dollar OAK-G01 supply-chain attacks that runs through 2024 and culminates in the \$1.46B Bybit hack in February 2025. The shape repeats:

1. **Vendor-side software supply chain.** Ginco (DMM, May 2024) → Liminal (WazirX, July 2024) → Safe{Wallet} (Bybit, February 2025). In each case the breached perimeter belonged neither to the exchange nor, in the strict sense, to the vendor: it was a developer / operator workstation or personal GitHub at the vendor edge.
2. **Social-engineering delivery via the recruiting / coding-test pretext.** The "fake recruiter on LinkedIn → malicious Python pre-employment test on GitHub" pattern at DMM is the same family as the Ronin (2022) fake-job-offer payload and is documented as TraderTraitor's signature delivery shape across 2022-2025.
3. **Single-transaction extraction once vendor access is in hand.** The on-chain event is brief (one transaction, minutes) and is final by the time exchange-side monitoring fires. The defensive surface is entirely upstream of the on-chain event.
4. **Laundering rails differ by chain but the cluster persists.** DMM's BTC was CoinJoined; Bybit's ETH was THORChain-routed; WazirX's mixed-asset proceeds went through a different mix. The Group is constant, the laundering rail is selected per-chain.

For OAK's broader credibility, including DMM Bitcoin in v0.1 closes the gap between Ronin (2022, the canonical T10.001 + G01 case) and Bybit (2025, the canonical T11.001 + G01 case) — without it, the 2024 supply-chain wave is invisible in the worked-example corpus and the framework reads as if Bybit were a discontinuity rather than the culmination of a documented pattern.
