> **MERGED 2026-10-11 into `examples/2022-06-harmony-horizon-bridge.md`** — a duplicate entry for the same incident. Not part of the OAK corpus; kept for the record.

**Merged into:** 2022-06-harmony-horizon-bridge

# Harmony Horizon Bridge validator economic-incentive gap — Ethereum / BSC / Harmony — 2022-06-23/24

**Loss:** approximately \$100M (ETH, BNB, USDT, USDC, DAI) [tbharmony]. The bridge's 2-of-5 multisig threshold was reportedly met by controlling two of the five keys [tbharmony].

**OAK Techniques observed:** **OAK-T10.007** (Bridge Validator Economic-Incentive Misalignment) — primary; the Harmony Horizon Bridge's validators had no at-risk economic stake bonding them to the bridge's security. The bridge's security model relied on a 2-of-5 multisig where the incident's validator-incentive reading (no slashing, no bonded stake) is OAK analysis and was not established by the cited sources. Sub-case (c) "validator-as-attacker self-dealing" limit case — the validators faced no on-chain financial consequence for misbehaviour. **OAK-T10.001** (Validator-Signer Key Compromise) — structurally co-occurring; the proximate entry vector was compromise of two of the five multisig keys (method not established in cited sources). **OAK-T10.005** (Light-Client Verification Bypass — sub-case (c)) — cross-mapped; the 2-of-5 threshold was a verification-model mismatch at the economic-security layer.

**OAK-Gnn:** [OAK-G01 Lazarus Group / DPRK-attributed](../actors/OAK-G01-lazarus.md).
**Attribution:** **confirmed** The FBI confirmed Lazarus Group / APT38 attribution on January 23, 2023 [tbfbi], associating the theft with the "TraderTraitor" campaign [recordfbi].

**Key teaching point:** **A bridge whose validator set carries no at-risk economic stake — no slashing mechanism, no bonded capital, no on-chain financial penalty for compromise — is a bridge whose validators are economically indifferent to key security, and a bridge whose security model reduces to "the validators' operational security practices" rather than to cryptoeconomic incentives.** The Harmony Horizon Bridge's 2-of-5 multisig was met by controlling two keys — a cost of entry that was plausibly a small fraction of the \$100M bridge TVL. The validator economic-incentive gap made key compromise economically rational for an attacker with server-compromise capability.

**Corrected 2026-10-11:** Removed unsourced claims (hot-wallet plaintext keys, no-HSM details, 14 transactions, a post-incident move to 4-of-5, a ~\$96M Tornado Cash figure); the 'no slashing / no bonded stake' reading is OAK analysis, not a sourced finding, and the FBI said ~\$60M of ETH went through RAILGUN.

## Summary

The Harmony Horizon Bridge connected Ethereum and Binance Smart Chain to the Harmony chain. Asset transfers out of the bridge required signatures from at least 2 of 5 designated validator addresses — a 2-of-5 multisig threshold. How the keys were stored is not established in the sources cited here.

The T10.007 surface is the economic-incentive gap: the validators had no at-risk economic stake bonding them to the bridge's security. Specifically:

1. **No slashing mechanism.** The bridge's on-chain contracts did not enforce any slashing condition on validators. A validator whose key was compromised faced no on-chain financial penalty — the loss was borne by the bridge's users, not by the validator operator.

2. **No bonded stake.** The validators had not posted a bond (in ETH, ONE, or any other asset) that would be forfeited in the event of a bridge-draining transaction. The security model relied on the validators' off-chain reputation and operational security practices, not on cryptoeconomic incentives.

3. **Hot-wallet key storage with server-side concentration.** Key-storage practices are not established in the cited sources; the claim that keys sat in plaintext on hot-wallet servers was unsourced and has been removed.

4. **Threshold too low for the bridge's TVL.** The 2-of-5 threshold meant that compromising two validators (40% of the set) was sufficient to drain the bridge. With a $100M TVL and a threshold of 2, the cost of compromise was bounded by the attacker's operational cost to breach two hot-wallet servers — a cost that was a tiny fraction of the bridge's TVL.

On June 23–24, 2022, the attacker (DPRK-affiliated Lazarus Group, per FBI attribution) reportedly gained control of two of the five multisig keys [tbharmony] and drained approximately \$100M. Harmony had published no official post-mortem at the time; a reported later move to a higher threshold is unverified.

The T10.007 framing captures the structural economic condition that made the key compromise economically rational: the validators had no skin in the game. The attacker's cost of compromise (two server breaches) was a small fraction of the bridge's TVL ($100M), and the validators bore no financial consequence for the key compromise. The bridge's security reduced to "the validators' server security is good enough" rather than to "the validators have more to lose from a bridge drain than an attacker can gain."

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-2022-06 | Horizon Bridge deployed with 2-of-5 multisig verification; no slashing mechanism; no bonded validator stake | T10.007 surface present (stake/TVL ratio effectively 0; no economic incentive for validator key security) |
| Pre-2022-06 | Attacker obtains control of two signer keys (method not established in cited sources) | (off-chain entry vector) |
| 2022-06-23 ~12:30 UTC | First extraction transactions on Ethereum; two compromised signing keys meet the 2-of-5 threshold | **T10.001 key compromise** + **T10.007 economic-incentive gap** (the threshold was met because validators had no economic incentive to protect keys at a level commensurate with the bridge's TVL) |
| 2022-06-23/24 | ~\$100M extracted [tbharmony] | T10.001 extraction |
| 2022-06-24 | Harmony team publicly discloses the incident | (incident response) |
| 2023-01 | ~\$60M of ETH routed through RAILGUN per the FBI [tbfbi] | T7.001 laundering |
| 2023-01-23 | [tbfbi] FBI confirms Lazarus Group / APT38 attribution under "TraderTraitor" DPRK campaign label | confirmed attribution |

## Realised extraction

\$100M in ETH, BNB, USDT, USDC, DAI [tbharmony]. The FBI said some of the funds routed through RAILGUN were frozen [tbfbi].

## Public references

- (Previously listed without URLs and unverified: Elliptic forensic analysis, Harmony post-mortem and multisig reconfiguration announcement.)
- Cross-reference: T10.007 at `techniques/T10.007-bridge-validator-economic-incentive-misalignment.md`.
- Cross-reference: [`examples/2022-03-ronin-bridge.md`](2022-03-ronin-bridge.md) — Ronin Bridge validator-concentration economic-incentive gap.
- Cross-reference: [`examples/2022-02-wormhole.md`](2022-02-wormhole.md) — Wormhole Bridge Guardian set absent economic bonding.
- Cross-reference: [`examples/2022-06-harmony-horizon-bridge.md`](2022-06-harmony-horizon-bridge.md) — Harmony Horizon Bridge T10.005 verification-model-mismatch framing.
- `[tbharmony]` — The Block, "Harmony's \$100 million hacker took control of its multi-signature wallet, analysts say" (2022-06-24): <https://www.theblock.co/post/154029/harmonys-100-million-hacker-took-control-of-its-multi-signature-wallet-analysts-say>
- `[tbfbi]` — The Block, "FBI confirms Lazarus Group and APT38 were responsible for \$100 million bridge hack" (2023-01-23): <https://www.theblock.co/post/204928/fbi-confirms-lazarus-group-and-apt38-were-responsible-for-100-million-bridge-hack>
- `[recordfbi]` — The Record, "FBI: North Korean hacking group Lazarus behind \$100 million crypto heist" (2023-01-25): <https://therecord.media/fbi-north-korean-hacking-group-lazarus-behind-100-million-crypto-heist/>

## Discussion

The Harmony Horizon Bridge is the cleanest illustration of T10.007 sub-case (c) — validator-as-attacker self-dealing limit case — in the public record. The validators had zero at-risk economic stake: no slashing mechanism, no bonded capital, no on-chain financial penalty for key compromise. The bridge's security reduced entirely to the validators' operational security practices — and those practices were demonstrably inadequate for a $100M TVL bridge whose signing keys lived on hot-wallet servers.

The incident demonstrates three structural points:

- **The stake/TVL ratio is a first-class bridge-security metric.** The Horizon Bridge's stake/TVL ratio was effectively 0 — no validator stake existed to be slashed. The attack was ex ante profitable because the cost of compromise (two server breaches) was a tiny fraction of the bridge's TVL ($100M). The attacker's calculus was: cost of compromise is far less than bridge TVL, validators bear no cost from compromise, making attack rational. The T10.007 defender heuristic: treat any bridge with stake/TVL less than 0.1 as carrying a standing T10.007 surface, and treat any bridge with stake/TVL effectively 0 as critically exposed regardless of the validators' off-chain reputation.

- **Key-storage practice is unverified.** An earlier draft asserted plaintext hot-wallet keys; no cited source establishes this, so the claim was removed.

- **Raising the threshold would not by itself create validator stake.** A higher threshold raises the number of keys an attacker must obtain, but does not give validators at-risk capital. (A reported move to 4-of-5 is unverified.)
