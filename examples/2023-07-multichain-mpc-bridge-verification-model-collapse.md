# Multichain MPC bridge verification-model collapse — multi-chain — 2023-07-06/07

**Loss:** approximately $125M moved to "unknown addresses" per Multichain's own statement as reported by DL News `[dlnewsmultichain]` (Blockworks' headline figure is $130M `[blockworksmultichain]`). The outflows came from Multichain's bridge wallets around 2023-07-6/7, and the bridge effectively ceased operating. The chain-by-chain breakdown in earlier drafts of this file is unverified and has been removed.

**Corrected 2026-10-11:** loss restated to ~$125M (sourced) instead of "$126M+"; the claimed ~$60M+ Circle/Tether stablecoin freeze is removed as unsupported by any cited source; the CEO's sister's role (moving remaining funds, detained 2023-07-13) added from DL News.

**OAK Techniques observed:** **OAK-T10.005** (Light-Client / Merkle-Proof Verification Bypass — sub-case (c), Consensus-Rule Modelling Mismatch) — primary; the Multichain bridge's security model was marketed as a distributed SMPC (Secure Multi-Party Computation) verification network where no single party controlled the signing keys, but the operational reality was that the CEO had ultimate control over the bridge's assets (the finding Fantom argued and the Singapore High Court accepted as contravening the user agreement `[dlnewsmultichain]`), and the verification model encoded "MPC threshold signatures are sufficient" without encoding the operational requirement that the MPC nodes must be operated by independent, geographically-distributed, adversarially-uncoordinated parties. **OAK-T10.001** (Validator-Signer Key Compromise) — structurally co-occurring; the proximate mechanism was that the party controlling the MPC nodes moved funds using legitimate-looking MPC-signed transactions. **OAK-T10.007** (Bridge Validator Economic-Incentive Misalignment) — structural condition; the validators had no at-risk economic stake bonding them to the bridge's security, making the operator-as-attacker self-dealing sub-case viable.

**Attribution:** **unattributed** Multichain's statement said founder and CEO Zhaojun He was arrested in Kunming in May 2023 `[dlnewsmultichain]`. Who moved the funds is unresolved: DL News reports the CEO's sister moved much of the remaining crypto into wallets she controlled and was detained on 2023-07-13, Fantom's CEO cannot rule out that someone affiliated with Multichain took the funds, and he doubts police did it `[dlnewsmultichain]`; Blockworks reports Chainalysis suggesting an inside job `[blockworksmultichain]`. Whether the movements were authorised by Chinese authorities, executed by insiders, or something else is unresolved. No regulator or law-enforcement agency has publicly attributed the incident to a named individual or group. OAK records the attribution as `unresolved`.

**Key teaching point:** **A bridge whose verification model is specified as "distributed MPC threshold signing" but whose operational deployment concentrates MPC node control in a single entity is structurally a T10.005 sub-case (c) surface — the verification model encoded the cryptographic correctness of the MPC protocol but failed to encode the operational requirement that the signing nodes be operated by independent, adversarially-uncoordinated parties.** The Multichain case is the canonical illustration that MPC bridges carry the same centralisation risk as multisig bridges when node operation is not independently distributed.

## Summary

Multichain (formerly Anyswap) was one of the largest cross-chain bridge protocols by TVL and transaction volume, supporting asset transfers across ~100+ EVM and non-EVM chains. The bridge's security model was built on SMPC (Secure Multi-Party Computation): asset-movement authorisation required threshold signatures from a set of MPC nodes that jointly computed signing shares without any single node holding a complete private key. The architecture was marketed as cryptographically superior to multisig bridges because no single key existed to be stolen — the MPC computation itself was supposed to be the security guarantee.

The structural vulnerability was at the operational-deployment layer, not at the cryptographic-primitive layer. The deployment details of the MPC nodes are not established in the cited sources beyond the CEO (Zhaojun He) holding ultimate control over the bridge's assets `[dlnewsmultichain]`. The verification model encoded "MPC threshold signatures authorise asset transfers" but did not encode "the MPC nodes must be operated by independent, adversarially-uncoordinated entities whose compromise requires coordinating across multiple organisations." The operational reality was that a single entity could cause the MPC nodes to produce valid threshold signatures — the MPC protocol was cryptographically sound, but the verification model failed to model the centralisation of node operation.

On or around July 6–7, 2023, about $125M left Multichain's bridge to unknown addresses `[dlnewsmultichain]`. Multichain's statement said its CEO had been arrested in May 2023 `[dlnewsmultichain]`. Earlier drafts also described MPC key shards on China-based cloud servers and team advice to revoke approvals; those details are not confirmed by the cited sources and should be treated as unverified. Two days after the hack the CEO's sister moved much of the remaining crypto to wallets she controlled and was detained on 2023-07-13 `[dlnewsmultichain]`.

The incident effectively terminated Multichain's operations. About $125M was moved to unknown addresses `[dlnewsmultichain]`; Multichain later stopped operations `[ctmultichain]`. The incident crystallised the structural lesson that MPC bridges whose node operation is centralised under a single administrative domain carry the same verification-model-mismatch surface as multisig bridges whose threshold is controlled by a single entity — the cryptographic primitive (MPC vs. multisig) is different, but the verification-model gap (distributed assumption vs. centralised reality) is structurally identical.

For OAK's purposes, Multichain is the canonical worked example for T10.005 sub-case (c) — Consensus-Rule Modelling Mismatch — in the MPC-bridge context. The MPC protocol correctly produced threshold signatures for the outflows, just as the Harmony Horizon Bridge's multisig correctly verified 2-of-5 signatures for its extraction transactions. In both cases, the verification primitive functioned as specified, but the specification failed to encode the operational-security requirement that the signing parties be independent, adversarially-uncoordinated entities. The T10.005 surface is the gap between the cryptographic specification and the operational reality.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-2023 | Multichain bridge operates across many chains with MPC signing; CEO has ultimate control of bridge assets `[dlnewsmultichain]` | T10.005 surface present |
| 2023-05 | CEO Zhaojun He arrested in Kunming per Multichain's statement `[dlnewsmultichain]` | (operator-side key-custody loss) |
| 2023-07-07 | About $125M moved to unknown addresses `[dlnewsmultichain]` | **T10.005 + T10.001 extraction event** |
| 2023-07-09 | CEO's sister moves much of the remaining crypto into wallets she controls (two days after the hack) `[dlnewsmultichain]` | (insider-adjacent fund movement) |
| 2023-07-13 | CEO's sister detained `[dlnewsmultichain]` | (law-enforcement action) |
| Continuing | Attribution unresolved; remaining extracted assets not recovered | (attribution and recovery status) |

## Realised extraction

About $125M moved to unknown addresses `[dlnewsmultichain]`. No recovery is reported in the cited sources. (An earlier claim of ~$60M+ in USDC/USDT frozen by Circle and Tether is removed as unsupported.)

## Public references

- `[dlnewsmultichain]` — DL News, "Singapore court fuels view Multichain hack was inside job" (2024-07-17): <https://www.dlnews.com/articles/defi/singapore-court-fuels-view-multichain-hack-was-inside-job/>
- `[blockworksmultichain]` — Blockworks, "Multichain's \$130M exploit potentially an inside job: Chainalysis": <https://blockworks.co/news/multichains-exploit-inside-job>
- `[ctmultichain]` — Cointelegraph, "Multichain stops operations over lack of funds": <https://cointelegraph.com/news/multichain-stops-operations-over-lack-of-funds>
- Cross-reference: T10.005 at `techniques/T10.005-light-client-verification-bypass.md`.
- Cross-reference: [`examples/2022-10-binance-bsc-bridge.md`](2022-10-binance-bsc-bridge.md) — BSC Token Hub (BNB Bridge) proof-soundness bypass (T10.005 sub-case (d)).
- Cross-reference: [`examples/2022-06-harmony-horizon-bridge.md`](2022-06-harmony-horizon-bridge.md) — Harmony Horizon Bridge verification-threshold economic-security gap (T10.005 sub-case (c)).

## Discussion

The Multichain incident is the most commercially significant illustration of the T10.005 sub-case (c) surface — Consensus-Rule Modelling Mismatch — in the bridge ecosystem. The MPC protocol was cryptographically sound: the threshold signatures that authorised the outflows were valid MPC computations. The verification model failed because it assumed the MPC nodes were operated by independent parties, while the operational reality was that a single entity (the CEO) controlled the entire node infrastructure. The T10.005 surface is the gap between the specification and the deployment.

Two structural observations:

- **MPC is not a substitute for operational distribution.** The marketing claim "MPC eliminates single-key risk because no single node holds the full key" is true at the cryptographic layer but false at the operational layer if all MPC nodes are operated by the same entity. The defender heuristic should be: an MPC bridge whose nodes are all operated by a single administrative domain carries the same centralisation risk as a multisig bridge controlled by a single entity — the verification model assumes distribution that does not exist in practice.

- **Cross-Technique mapping (T10.005 + T10.001 + T10.007) captures the structural layering of the incident.** The proximate mechanism was T10.001 (the party controlling the MPC nodes moved funds using valid MPC signatures). The structural precondition was T10.005 (the verification model assumed distributed node operation but the deployment was centralised). The economic condition was T10.007 (the MPC nodes had no at-risk economic stake bonding them to the bridge's security). The three-Technique mapping is appropriate because the incident demonstrates the interdependence of the verification-model, key-custody, and economic-incentive layers of bridge security.
