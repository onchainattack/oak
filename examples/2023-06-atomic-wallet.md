# Atomic Wallet — multi-chain — 2023-06-03

**Loss:** \~\$35M initial / \~\$100M+ total across approximately 5,500 compromised end-user wallets.
**OAK Techniques observed:** OAK-T11.002 (Wallet-Software Distribution Compromise) — primary; multi-rail downstream laundering including OAK-T7.001 (Mixer-Routed Hop, including Sinbad-class services), OAK-T7.002 (CEX Deposit-Address Layering — Garantex / OAK-G03 as one of several rails), and chain-hopping. The Garantex rail is *one* documented downstream surface, not the dominant or exclusive one.
**OAK-Gnn:** [OAK-G01 Lazarus Group / DPRK-attributed](../actors/OAK-G01-lazarus.md) (primary, **confirmed** at the FBI-press-release-by-name level: Elliptic published wallet-cluster attribution on June 6 2023; the FBI press release of August 22, 2023 (`[fbidprkfunds2023]` — *FBI Identifies Cryptocurrency Funds Stolen by DPRK*) names "Atomic Wallet" by name and attributes the \~\$100M theft to DPRK TraderTraitor-affiliated actors (Lazarus Group / APT38)) + [OAK-G03 Russian-laundering-infrastructure cluster](../actors/OAK-G03-russian-laundering-infrastructure.md) (downstream-laundering surface — Garantex was one of several documented rails per `[ellipticatomic2023]`). Industry forensic providers (Elliptic, Chainalysis) historically classified Atomic Wallet attribution as `inferred-strong` on the wallet-cluster basis alone; the August 2023 FBI press release is the public-record event that takes the case to `confirmed` under OAK convention. Contributors citing this case should anchor on the FBI document by URL rather than on the industry-forensic write-up.

## Summary

On June 3, 2023, a coordinated burst of extraction events targeted users of Atomic Wallet, a self-custodial multi-chain wallet. Initial reporting cited approximately \$35M in stolen assets; subsequent forensic accounting raised the total to over \$100M across approximately 5,500 compromised end-user wallets. Per Elliptic's primary forensic write-up (June 6, 2023, three days after the event), wallet-cluster analysis pointed to the OAK-G01 Lazarus Group as the operator; the FBI subsequently confirmed the DPRK / "TraderTraitor" attribution.

The technical cause was not fully publicly disclosed by Atomic Wallet, but per public reporting and the litigation record, the wallet software itself was the vector — affected users had not interacted with phishing dApps, signed unauthorised payloads, or otherwise consented to extraction. The on-chain pattern (coordinated burst across thousands of distinct end-user addresses traceable back to a small set of attacker-controlled destination addresses) is the canonical T11.002 signature.

A class-action lawsuit was filed against Atomic Wallet and its proprietor following the incident. Stolen funds were laundered downstream through *multiple rails* — Elliptic's analysis identified Garantex (a Russian exchange sanctioned by the U.S. Treasury in April 2022 for laundering proceeds of ransomware and darknet markets) as one observable downstream surface, alongside mixer flows (Sinbad and adjacent services) and chain-hopping. The Garantex route is one of several laundering rails for the Atomic Wallet incident, not its sole downstream path.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-event | Wallet-software distribution compromise (technical cause not fully publicly disclosed) | (off-chain entry vector — T11.002 substrate) |
| 2023-06-03 | Coordinated burst of extractions across \~5,500 end-user Atomic Wallet addresses | **T11.002 extraction** |
| 2023-06-03 onward | Initial forensic disclosure cites \~\$35M; subsequent accounting raises total to \~\$100M+ | (assessment) |
| 2023-06-06 | Elliptic publishes wallet-cluster attribution to Lazarus Group | **G01 attribution (initial; industry-forensic, inferred-strong)** |
| 2023-08-22 | FBI press release *FBI Identifies Cryptocurrency Funds Stolen by DPRK* names "Atomic Wallet" and attributes the \~\$100M theft to DPRK TraderTraitor-affiliated actors (Lazarus Group / APT38) | **G01 confirmed attribution (FBI by name)** |
| Post-event | Funds laundered through multiple rails — Garantex (sanctioned Russian exchange) is one documented surface, alongside mixers (Sinbad-class) and chain-hopping per `[ellipticatomic2023]` | T7 (multi-rail) / off-chain CTI |
| Post-event | Class-action lawsuit filed against Atomic Wallet / Konstantin Gladych | (legal status) |

## What defenders observed

- **Pre-event (vendor-side):** the technical cause inside Atomic Wallet's build pipeline / distribution infrastructure was not publicly disclosed in detail. Per industry analysis, candidate vectors include build-pipeline compromise, malicious update-channel injection, or compromise of an upstream dependency. The lack of full disclosure is itself a defender-side observation: T11.002 incidents frequently lack detailed post-mortems, partly because the affected vendor faces litigation pressure.
- **At-event (on-chain):** the coordinated burst pattern across thousands of distinct end-user addresses is the unambiguous T11.002 signature. Wallet-cluster forensic providers (Elliptic in this case) reached attribution within three days because the destination-address cluster was small enough to attribute via standard wallet-cluster methodology.
- **Post-event (laundering):** the Atomic Wallet stolen funds moved through *several* laundering rails per `[ellipticatomic2023]` — Garantex (sanctioned Russian exchange / OAK-G03) is one observable downstream surface and reinforces OAK-G01 attribution where it appears, but mixer flows (Sinbad and adjacent services) and chain-hopping are documented in parallel. Defenders should not over-anchor on the Garantex rail alone; the multi-rail signature is itself part of the OAK-G01 fingerprint for this incident. Post-Bybit, the dominant Lazarus laundering rail shifted to THORChain (T7.003); pre-Bybit the multi-rail (mixer + sanctioned-CEX + chain-hop) pattern was more common.

## What this example tells contributors writing future Technique pages

- **T11.002's "self-custodial does not equal self-secured" lesson is the structural takeaway.** End users of self-custodial wallets typically reason that they hold their own keys and therefore are not exposed to centralised-custody breach risk; T11.002 demonstrates that the wallet software that holds those keys is itself a single point of failure if compromised. Contributors writing future T11.002 examples should make this explicit.
- **Hardware-wallet integration is the canonical user-side mitigation.** A hardware wallet that requires per-transaction display confirmation cannot be drained by host-software compromise alone (provided the hardware-wallet display shows the actual destination). Post-Atomic-Wallet, hardware-wallet adoption among self-custodial users with non-trivial balances has accelerated.
- **Litigation lag is a defender-side observation.** Class-action lawsuits against wallet vendors typically conclude years after the incident; the on-chain forensic record is essentially complete within days, but the vendor-side technical disclosure is often constrained by litigation strategy. Contributors documenting future T11.002 cases should expect this pattern.

## Public references

- `[ellipticatomic2023]` — Elliptic primary forensic write-up. Wallet-cluster attribution to OAK-G01 Lazarus Group; classified as `inferred-strong` at the industry-forensic layer.
- `[fbidprkfunds2023]` — FBI press release *FBI Identifies Cryptocurrency Funds Stolen by DPRK* (August 22, 2023). Names "Atomic Wallet" by name in the \~\$100M-theft attribution to DPRK TraderTraitor-affiliated actors (Lazarus Group / APT38). The public-record document that takes Atomic Wallet attribution from `inferred-strong` to `confirmed`. URL: <https://www.fbi.gov/news/press-releases/fbi-identifies-cryptocurrency-funds-stolen-by-dprk>
- [Class Action filed over 2023 Atomic Wallet Data Breach](https://www.classaction.org/news/class-action-filed-over-2023-atomic-wallet-data-breach-in-which-100m-in-crypto-assets-was-stolen) — litigation record.

## Discussion

Atomic Wallet is OAK's modern canonical T11.002 example because the on-chain forensic record is complete (Elliptic published within three days; FBI confirmed subsequently), the dollar loss is documented across \~5,500 distinct end-user addresses, the attribution to OAK-G01 is confirmed at the FBI / industry-corroboration level, and the structural lesson (self-custodial wallet software as a single point of failure) is broadly applicable. Contributors writing other T11.002 examples should preserve the **vendor-side disclosure constraint** observation — the technical cause inside the affected vendor is often not fully public, and OAK content should not speculate beyond what is publicly attested.

The Atomic Wallet case also illustrates the pre-Bybit *multi-rail* laundering pattern: Garantex appears as one off-ramp surface, alongside mixer flows (Sinbad-class) and chain-hopping per `[ellipticatomic2023]`. Post-Bybit, the dominant OAK-G01 laundering rail consolidated toward THORChain (T7.003); contributors writing post-2024 OAK-G01-attributed examples should expect the cross-chain bridge laundering pattern as the dominant downstream rather than the multi-rail-with-sanctioned-CEX-off-ramp pattern characteristic of Atomic Wallet and similar 2022–2023 incidents.
