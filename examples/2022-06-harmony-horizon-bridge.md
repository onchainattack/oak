# Harmony Horizon Bridge light-client verification economic-security gap — Ethereum / Harmony — 2022-06-23/24

**Loss:** approximately \$100M (ETH, BNB, USDT, USDC, DAI [tbharmony]).
**OAK Techniques observed:** **OAK-T10.001** (Validator / Signer Key Compromise — *primary*. The Horizon bridge's Ethereum side was a 2-of-5 multisig; the attacker controlled two of the five owner keys, meeting the threshold [tbharmony]. How the keys were obtained is not established in the cited sources. The FBI attributed the theft to Lazarus / APT38 (TraderTraitor) on 2023-01-23 [tbfbi] [recordfbi]. See [`techniques/T10.001-validator-signer-key-compromise.md`](../techniques/T10.001-validator-signer-key-compromise.md)). **OAK-T10.007** (Bridge Validator Economic-Incentive Misalignment — two signatures guarded ~\$100M; OAK's analysis, not a sourced finding, that the threshold was unbonded and unslashable relative to the value it secured).

**Re-mapped 2026-10-11:** primary Technique moved from T10.005 (no light-client or verification-logic flaw — the threshold check worked; two keys were held by the attacker) to [`T10.001-validator-signer-key-compromise`](../techniques/T10.001-validator-signer-key-compromise.md); merged with duplicates `2022-06-harmony-horizon-bridge` and `2022-06-harmony-horizon-bridge`.
**OAK-Gnn:** [OAK-G01 Lazarus Group / DPRK-attributed](../actors/OAK-G01-lazarus.md).
**Attribution:** **confirmed**. Elliptic attributed the incident to Lazarus Group / APT38 within days of the event (June 2022; Elliptic's own write-up was not retrievable for this pass). The FBI confirmed Lazarus Group / APT38 attribution on January 23, 2023 [tbfbi], associating the theft with the "TraderTraitor" campaign [recordfbi].
**Key teaching point:** **A bridge whose security reduces to a threshold-signature verification where the threshold is economically inadequate is a T10.005 surface — the verification primitive (multisig check) functions correctly as specified, but the specification itself failed to encode the economic-security requirement that the threshold should be infeasible to compromise given the bridge's TVL.** The Horizon Bridge's 2-of-5 threshold was the load-bearing architectural decision: two compromised keys out of five was a sufficient quorum, and the \$100M TVL made that quorum an economically rational target. The incident demonstrates that T10.005 is not confined to zk-proof-bridge circuit-soundness failures — the "consensus-rule modelling mismatch" sub-case (c) applies whenever the verification model fails to encode the real-world security requirements.

**Corrected 2026-10-11:** Removed unsourced claims (plaintext keys on hot-wallet servers, 14 transactions, a post-incident move to 4-of-5, a ~\$96M Tornado Cash figure); the FBI said ~\$60M of ETH went through RAILGUN, and Harmony published no official post-mortem at the time.

## Summary

The Harmony Horizon Bridge connected Ethereum (and Binance Smart Chain) to the Harmony chain. The bridge's security model reduced to a multisig threshold verification: outbound asset transfers required signatures from at least 2 of 5 designated validator addresses. The verification primitive — a plain 2-of-5 multisig check — was cryptographically correct: it accepted exactly those transactions that carried two valid signatures from the designated set, and rejected all others.

The structural vulnerability was at the economic-security layer, not at the cryptographic layer. A 2-of-5 threshold means that an attacker who compromises any two of the five signing keys controls the bridge. With approximately \$100M in TVL, the bridge was a rational target: the attacker needed to obtain two keys, not five. The verification model encoded "two signatures pass the check" but did not encode "two signatures should not be sufficient to authorise \$100M in outbound transfers."

On June 23–24, 2022, the attacker, who analysts said had compromised two of the five multisig keys [tbharmony], drained the bridge. Harmony had published no official post-mortem at the time; reports of a later move to a higher threshold are unverified in this file.

This framing — verification-primitive correct but economically insufficient — is the T10.005 sub-case (c) surface. The bridge's verification model was too weak for the asset value it protected, structurally parallel to a light-client that verifies headers but not validator-set transitions, or a proof system whose circuit encodes a consensus rule that is technically correct but too permissive. The Harmony Horizon case is the cleanest illustration that T10.005's verification-model-mismatch surface applies even when the verification primitive is a simple multisig rather than a zk-SNARK circuit — the gap between what the verification checks and what the defender needed it to check is the T10.005 attack surface.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-event (bridge design) | Horizon Bridge deployed with 2-of-5 multisig verification; threshold too low for ~$100M TVL | T10.005 (consensus-rule modelling mismatch — the verification model's economic insufficiency was the structural surface) |
| Pre-event (off-chain) | Attacker obtains control of two signer keys (method not established in cited sources) | (off-chain entry vector) |
| 2022-06-23 ~12:30 | First extraction transactions on Ethereum side; two compromised signing keys meet the 2-of-5 verification threshold | **T10.001** (key compromise) + **T10.005** (verification-model-bypass — the verification primitive accepted the signatures because it was specified to accept any two) |
| 2022-06-23/24 | ~\$100M extracted [tbharmony] | T10.001 extraction |
| 2022-06-24 | Harmony team publicly discloses | — |
| 2022-06-27 onward | Non-ETH assets swapped to ETH and laundered (Tornado Cash routing per Elliptic, unverified here) | T7.001 |
| 2022-06 (within days) | Elliptic attributes to Lazarus Group / APT38 | inferred-strong attribution |
| 2023-01 | ~\$60M of ETH routed through RAILGUN per the FBI [tbfbi] | T7.001 (alternate-mixer continuation) |
| 2023-01-23 | [tbfbi] FBI confirms Lazarus Group / APT38 attribution | confirmed attribution |
| (unverified) | Reported threshold increase after the incident; no source found | — |

## Realised extraction

Approximately \$100M in ETH, BNB, USDT, USDC, and DAI.

## OAK technique classification rationale

The classification as T10.005 (sub-case (c), Consensus-Rule Modelling Mismatch) alongside T10.001 (Validator-Signer Key Compromise) captures both layers of the incident. T10.001 captures the proximate entry vector — the attacker compromised two signing keys. T10.005 captures the structural precondition — the bridge's verification model was specified around a 2-of-5 threshold without encoding the economic-security requirement that the threshold should be infeasible to compromise given the bridge's TVL. a threshold increase would be the T10.005 response, but no source for one was found. The two-Technique classification captures both the "how they got in" (T10.001) and the "why the threshold was too low" (T10.005).

## Public references

- Elliptic forensic write-up and Halborn post-mortem: previously listed here without URLs; their specifics (plaintext keys, 4-of-5 move) could not be verified and have been removed.
- See companion example at `examples/2022-06-harmony-horizon-bridge.md` for the T10.001-only framing and Lazarus-attribution timeline detail
- `[tbharmony]` — The Block, "Harmony's \$100 million hacker took control of its multi-signature wallet, analysts say" (2022-06-24): <https://www.theblock.co/post/154029/harmonys-100-million-hacker-took-control-of-its-multi-signature-wallet-analysts-say>
- `[tbfbi]` — The Block, "FBI confirms Lazarus Group and APT38 were responsible for \$100 million bridge hack" (2023-01-23): <https://www.theblock.co/post/204928/fbi-confirms-lazarus-group-and-apt38-were-responsible-for-100-million-bridge-hack>
- `[recordfbi]` — The Record, "FBI: North Korean hacking group Lazarus behind \$100 million crypto heist" (2023-01-25): <https://therecord.media/fbi-north-korean-hacking-group-lazarus-behind-100-million-crypto-heist/>
