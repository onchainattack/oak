# Evil Corp WastedLocker ransomware — Garmin incident — 2020-07

**Loss:** **~$10M** ransom payment (reported; exact amount and cryptocurrency denomination not publicly confirmed). Garmin, the multinational GPS and wearable-technology company, was hit by a WastedLocker ransomware attack on 2020-07-23 attributed to Evil Corp (OAK-G06). The attack encrypted Garmin's production systems and customer-facing services (Garmin Connect, flyGarmin, inReach, aviation navigation databases), causing a multi-day global outage across all product lines.
**OAK Techniques observed:** **OAK-T5.008** (Ransomware Extortion Payment) — Garmin paid a ransom in cryptocurrency to Evil Corp facilitators to receive a decryptor. **OAK-T7.002** (CEX Deposit-Address Layering) — the ransom payment was routed through downstream laundering infrastructure consistent with the Evil Corp laundering profile documented across OFAC designations and industry forensic reports.
**OAK-Gnn:** [OAK-G06 Evil Corp](../actors/OAK-G06-evil-corp.md) at the cluster level — Evil Corp is the Yakubets-centred Russia-resident operator network designated by OFAC (December 2019) and charged by DOJ with conspiracy, computer hacking, wire fraud, and bank fraud. The WastedLocker encryptor is one of the cluster's post-Dridex ransomware strains deployed from approximately 2019–2020 onward.
**Attribution:** **confirmed** — the WastedLocker attack against Garmin was publicly attributed to Evil Corp by Reuters and Sky News citing sources close to the incident-response investigation. The broader Evil Corp cluster is confirmed-grade at the operator-and-named-defendant level per OFAC SDN designation (December 2019, `[ofac2019evilcorp]`) and DOJ indictment of Maksim Yakubets and Igor Turashev. Attribution that *the specific Garmin ransom payment flow* traces to Evil Corp-controlled addresses is **inferred-strong** from industry forensic providerChainalysis and TRM Labs reporting.

**Key teaching point:** The Garmin WastedLocker incident is the canonical OAK-G06 entry point for OAK: it demonstrates the ransomware-extortion-payment pattern (T5.008) applied against a Fortune 500 consumer-technology company by the largest OFAC-designated Russia-resident cybercriminal operator network, with confirmed-grade attribution at the cluster level and a publicly-documented multi-day operational-technology and consumer-service outage.

## Summary

On 2020-07-23, Garmin's global IT infrastructure was encrypted by WastedLocker ransomware, a strain attributed to Evil Corp (OAK-G06). The attack affected Garmin's production systems, customer-facing services (Garmin Connect, flyGarmin, inReach), call centres, and aviation navigation-database update infrastructure. The outage lasted approximately 4 days, during which Garmin reportedly paid a multi-million-dollar ransom — widely reported as ~$10M — to obtain a decryptor.

The payment was processed through a ransomware-negotiation vendor (Arete IR, per reporting) and routed through cryptocurrency addresses controlled by Evil Corp facilitators. The downstream laundering path has not been publicly detailed but is consistent with the Russian-language commercial-criminal off-ramp profile shared across Evil Corp, Black Basta, Akira, and other Conti-successor clusters.

Evil Corp was designated by OFAC on December 5, 2019 — approximately seven months before the Garmin attack — meaning that U.S. persons were already prohibited from transacting with Evil Corp at the time of the Garmin ransom payment. The OFAC designation included seventeen named individuals and the entity itself, with Maksim Yakubets as the principal.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2020-07-23 | Garmin IT infrastructure encrypted by WastedLocker; global outage begins | (incident) |
| 2020-07-24–25 | Garmin negotiates ransom payment via Arete IR; ransom paid in cryptocurrency | T5.008 (ransomware extortion payment) |
| 2020-07-27 | Garmin services begin to recover; decryptor deployed | (recovery) |
| 2020-07-28–29 | Garmin confirms full service restoration | (recovery) |

## Public references

- Reuters: "Garmin paid multimillion-dollar ransom to cybercriminals" (2020-07-25).
- Sky News: "Garmin paid ransom to hackers" (2020-07-25).
- OFAC: Evil Corp SDN designation, December 5, 2019 (`[ofac2019evilcorp]`).
- DOJ: indictment of Maksim Yakubets and Igor Turashev, December 5, 2019 (`[doj2019yakubets]`).
