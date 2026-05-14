# JPEX Hong Kong unlicensed-exchange fraud — Hong Kong — 2023-09-13 onward

**Loss:** ~$200M (HKD ~1.6B) across ~2,600+ formally filed victims; the largest securities-fraud enforcement action in Hong Kong history at the time of the SFC referral to the Hong Kong Police Force.

**OAK Techniques observed:** **OAK-T11.005.001** (Fake-CEX / Pig-Butchering Platform — primary; JPEX presented as a legitimate centralised exchange but held no Hong Kong VASP licence and had no verifiable exchange backend). **OAK-T11.005** (Operator-side Fake-Platform Fraud — parent class). **OAK-T11** (Custody and Signing Infrastructure — the victim deposit surface; users deposited real crypto to operator-controlled wallets believing they were trading on a licensed exchange). **OAK-T15** (Off-chain Entry-Vector / Pre-Positioning — secondary; the platform's brand-building surface included celebrity endorsements, MTR station advertising, and media sponsorships that created apparent legitimacy before operational collapse).

**Attribution:** **pseudonymous-cohort** (the JPEX operating entity was incorporated as a Seychelles-registered entity with no verifiable beneficial owners; Hong Kong Police Force arrested ~70+ individuals including social-media influencers and over-the-counter exchange operators who promoted the platform, but the primary operator cohort behind the platform remained pseudonymous-unattributed at the federal-action level through v0.1). The arrest cohort included Hong Kong-based KOLs (key opinion leaders) and OTC shop operators who received commissions for directing retail depositors to the JPEX platform.

**Key teaching point:** **An unlicensed exchange whose regulatory-registry check fails, whose proof-of-reserves is absent, and whose withdrawal gate activates on a per-user basis without published criteria is a fake-exchange fraud until proven otherwise.** The JPEX case demonstrates the full lifecycle of a fake-CEX laundering surface: celebrity-endorsed brand building → deposit aggregation into operator-controlled wallets → escalating withdrawal gates framed as "risk management" → coordinated operational shutdown.

## Summary

JPEX (Japan Exchange Wallet) operated from at least 2020 as a cryptocurrency exchange platform targeting Hong Kong, Taiwan, Macau, and mainland China retail investors. The platform claimed to be licensed as a virtual-asset service provider (VASP) under Hong Kong law and marketed itself aggressively through:

1. **Celebrity endorsement campaign** — Hong Kong-based celebrities, social-media influencers (KOLs), and over-the-counter (OTC) crypto exchange operators promoted JPEX as a licensed, regulated exchange in exchange for commission on referred deposits.
2. **Public-transit advertising** — JPEX purchased advertising on Hong Kong's MTR (Mass Transit Railway) stations, producing a surface of apparent institutional legitimacy.
3. **Media sponsorship** — JPEX sponsored Hong Kong-based media properties and events to build brand recognition as a "legitimate" regulated exchange.

The Hong Kong Securities and Futures Commission (SFC) added JPEX to its "Suspicious Virtual Asset Trading Platforms" alert list on **September 13, 2023**, stating that JPEX had never applied for a Hong Kong VASP licence and was not licensed by the SFC, and that the platform's claimed licensing was false.

Within hours of the SFC warning, JPEX:

- Blocked withdrawals from the platform or gated them behind escalating fees — first raising the withdrawal fee to 999 USDT per transaction, then requiring "risk-management verification" deposits before processing withdrawals, then halting withdrawals entirely.
- Delisted assets and suspended trading pairs.
- Took the platform website and app offline.

Victims who had deposited BTC, ETH, USDT, and other assets found that their displayed balances were unrecoverable — the deposit addresses pointed to operator-controlled wallets with no observable exchange-side matching-engine flow. The funds were funnelled through a mixer-and-OTC-off-ramp laundering infrastructure spanning multiple Hong Kong OTC shops.

The Hong Kong Police Force (HKPF) Commercial Crime Bureau arrested approximately 70+ individuals through September–October 2023, including KOLs and OTC shop operators who had promoted JPEX and received deposit commissions. At least HK$100M in assets (cash, luxury watches, property) were frozen or restrained. The SFC and HKPF established a joint task force for crypto-fraud investigation in response to the case; the Hong Kong Monetary Authority (HKMA) and SFC subsequently strengthened VASP licensing enforcement through 2024–2025.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2020–2023 | JPEX operates as an unlicensed platform, accumulating depositors through KOL/celebrity promotion and public-transit advertising | **T11.005.001 surface created** |
| 2023-09-13 | SFC adds JPEX to Suspicious Virtual Asset Trading Platforms alert list; states JPEX has never applied for a VASP licence | (regulator warning) |
| 2023-09-13 to 09-17 | JPEX raises withdrawal fees to 999 USDT, then imposes escalating "risk-management" gates, then halts withdrawals entirely | **T11.005.001 execution** |
| 2023-09-18 to 10-31 | HKPF arrests 70+ individuals including KOLs and OTC-shop operators; HK$100M+ in assets frozen/restrained | (enforcement response) |
| 2023-09 onward | SFC publishes licensed VASP register; JPEX task-force model extended to broader crypto-fraud coordination between SFC and HKPF | (regulatory hardening) |
| 2023-10 to 2024 | Additional victim reports accumulate; total claimed loss ~$200M; international victims in Taiwan, Macau, Singapore, and mainland China file parallel complaints | (victim-cohort expansion) |

## What defenders observed

- **Licensing-registry cross-reference is the highest-leverage pre-deposit check.** JPEX claimed to hold licences it had never applied for. Cross-referencing the platform's claimed-jurisdiction registry (the SFC's published licensed-VASP register in the JPEX case) against the platform's own licensing claims would have surfaced the discrepancy immediately.
- **Withdrawal-gate escalation is the defining T11.005.001 signal at the victim-facing layer.** JPEX's withdrawal-gate escalation (raise fees → impose "verification" deposits → halt withdrawals entirely) is the canonical pattern for fake-CEX operational exit. The small-test-withdrawal-before-deposit invariant would have detected the surface at the pre-deposit stage.
- **Celebrity/KOL endorsement does not substitute for licensing-registry verification.** The JPEX case is the canonical T15 (pre-positioning) adjacency for T11.005.001: the off-chain brand-building surface (MTR advertising, celebrity and KOL endorsement) was the load-bearing acquisition channel that produced victim trust. Defenders should treat celebrity/KOL endorsement as a T11.005.001 risk factor, not a legitimacy signal.
- **The Hong Kong regulatory response model is the canonical T11.005.001 regulatory-hardening pattern.** The SFC's alert-list publication, the joint HKPF–SFC task force, and the post-JPEX VASP licensing enforcement strengthening through 2024–2025 constitute the most complete regulator-side response to a T11.005.001 event in the public record.

## What this example tells contributors writing future Technique pages

- **T11.005.001 is the primary classification.** JPEX is the largest public-record T11.005.001 fake-CEX anchor at v0.1 — a platform with no verifiable exchange backend, no regulatory licence in its claimed jurisdiction, and withdrawal gates that activate on a per-user basis without published criteria. The victim-deposit surface (T11) is the custody-side classification; the off-chain brand-building surface (T15) is the pre-positioning adjacency.
- **The JPEX case anchors the regulatory-response dimension for T11.005.001.** The SFC alert list, HKPF arrests, and post-event licensing-registry hardening are the canonical regulator-side defender actions against this sub-Technique. Future contributors should map the regulator-response dimension as a first-class observable in T11.005.001 worked examples.
- **The celebrity/KOL-as-acquisition-channel surface is structurally important for T11.005 coverage.** The JPEX acquisition model (KOL commission-for-deposit-referral) is structurally distinct from the romance-scam feeder narrative of the pig-butchering model and from the cold-call boiler-room model of earlier fake-exchange frauds. The sub-pattern deserves its own framing in a future v0.x update of T11.005.

## Public references

- Hong Kong Securities and Futures Commission. *"SFC warns of suspicious virtual asset trading platform — JPEX."* 13 September 2023. SFC Alert List entry.
- Hong Kong Police Force. *"Joint SFC-HKPF press conference on virtual asset trading platform JPEX."* September 2023.
- South China Morning Post. *"JPEX scandal: Hong Kong's largest securities fraud."* September–October 2023.
- Cross-reference: T11.005.001 (Fake-CEX / Pig-Butchering Platform) at `techniques/T11.005.001-fake-cex-pig-butchering-platform.md`.
- Cross-reference: T11.005 (Operator-side Fake-Platform Fraud) at `techniques/T11.005-operator-side-fake-platform-fraud.md`.

### Proposed new BibTeX entries

```bibtex
@misc{sfcjpex2023,
  author = {{Hong Kong Securities and Futures Commission}},
  title = {SFC warns of suspicious virtual asset trading platform — JPEX},
  year = {2023},
  month = sep,
  day = {13},
  note = {SFC Alert List; first public disclosure that JPEX had never applied for a Hong Kong VASP licence}
}

@misc{hkpfjpex2023,
  author = {{Hong Kong Police Force}},
  title = {Joint SFC-HKPF operation against unlicensed virtual asset trading platform JPEX},
  year = {2023},
  month = sep,
  note = {70+ arrests; HK$100M+ assets restrained}
}
```
