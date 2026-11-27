> **MERGED 2026-11-27 into `examples/2023-09-caesars-entertainment.md`** — the recovery of part of the ransom is one fact about the same incident and is recorded there. Not part of the OAK corpus; kept for the record.

**Merged into:** 2023-09-caesars-entertainment

# Caesars Entertainment — ransom paid to Scattered Spider, about \$12M of it recovered by investigators — 2023-09

**Loss:** Caesars paid a \$15M ransom, per [Andy Greenberg of WIRED](https://x.com/a_greenberg/status/1849831809841799617). The same post says ZachXBT and other investigators recovered \$12M of it, which Greenberg calls very likely the biggest-ever clawback of a ransom payment. The recovery is relayed from the WIRED reporting and no court, agency or operator record of it was opened; who held the \$12M and under what legal step (freeze, seizure, return) is undisclosed.

**OAK Techniques observed:** **OAK-T5.008** (Ransomware Extortion Payment, *primary*): a crypto payment sent by the victim to the extortionists under duress. See [`techniques/T5.008-ransomware-extortion-payment.md`](../techniques/T5.008-ransomware-extortion-payment.md). The tracing and the freeze are defender actions, not an attacker Technique, and no laundering Technique is declared because no opened page describes the laundering path.

**Attribution:** **inferred-weak** for the recipient. [Greenberg](https://x.com/a_greenberg/status/1849831809841799617) and [vx-underground](https://x.com/vxunderground/status/1968990248857219357) both say the payee was the Scattered Spider group. Both are third-party posts; no government document was opened for this file.

**Key teaching point:** **When a ransom is paid, send the payment addresses to exchanges and trackers at once.** In this case the recovery is reported to have come from on-chain tracing and freezes, per the two posts below. The ransom still left the victim; the part that came back is the part investigators could follow to a service that could act on it.

## Summary

Caesars Entertainment paid a \$15M ransom to the Scattered Spider group, per [Greenberg's post of 2024-10-25](https://x.com/a_greenberg/status/1849831809841799617), written from his WIRED reporting on ZachXBT. The post says ZachXBT and other investigators recovered \$12M of that amount. [vx-underground](https://x.com/vxunderground/status/1968990248857219357) wrote in September 2025 that ZachXBT helped freeze the funds in January 2024.

No opened page names the ransomware family, the payment addresses, the transaction hashes, the exchanges involved, or the agencies. The earlier version of this file said law enforcement seized the funds in a multi-agency operation and gave 2024-05-02 as the announcement date. No opened page says either, and its linked ZachXBT post returns 404, so both are removed. The intrusion and the payment are covered in [`2023-09-caesars-entertainment.md`](2023-09-caesars-entertainment.md).

## Timeline (UTC)

Stages: entry and payment (off-chain details not on the opened pages), funds movement, response. Dates are as the posts give them.

| When | What happened | OAK |
|---|---|---|
| 2023 (month and date undisclosed on opened pages) | Caesars pays a \$15M ransom to Scattered Spider, per [Greenberg](https://x.com/a_greenberg/status/1849831809841799617). The file's title dates the intrusion to September 2023; no opened page confirms the month | **T5.008** |
| Undisclosed | Where the paid funds moved, which services received them and through which addresses: undisclosed | — |
| 2024-01 | ZachXBT helps freeze the funds, per [vx-underground](https://x.com/vxunderground/status/1968990248857219357) (posted 2025-09-19). Which services froze them is not on the post's text | response |
| 2024-10-25 | Greenberg writes that ZachXBT and other investigators recovered \$12M of the \$15M | response |

Key addresses:

- Ransom payment addresses, transaction hashes, and freeze addresses: undisclosed on every opened page.

## Root-cause evidence

- **Technique:** OAK-T5.008
- **Source:** <https://x.com/a_greenberg/status/1849831809841799617>; <https://x.com/vxunderground/status/1968990248857219357>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** One journalist's post and one researcher-community post agree that Caesars paid \$15M and that about \$12M was recovered or frozen. Neither gives addresses, hashes, the legal mechanism or the agencies. The WIRED article behind Greenberg's post could not be opened in this pass.

## Public references

- [Andy Greenberg (WIRED), X post](https://x.com/a_greenberg/status/1849831809841799617) (2024-10-25).
- [vx-underground, X post](https://x.com/vxunderground/status/1968990248857219357) (2025-09-19).
- Sibling file for the intrusion and payment: [`2023-09-caesars-entertainment.md`](2023-09-caesars-entertainment.md).
