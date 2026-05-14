# KelpDao rsETH Bridge Hack via LayerZero Infrastructure Compromise — Apr 2026 — $290M

**Loss:** approximately $290M in rsETH (Kelp DAO's liquid restaking token, approximately 116,500 rsETH) drained from the KelpDao bridge contract via a forged cross-chain bridge message. The attacker exploited a compromise of LayerZero's cross-chain messaging infrastructure to authorise a withdrawal of locked rsETH collateral on the destination chain without a corresponding deposit on the source chain. The result was "possibly unbacked rsETH" circulating on destination chains — tokens that had been bridged without the required locked collateral, creating a solvency gap between circulating rsETH supply and the locked ETH/stETH backing. Contagion propagated to Aave, which held approximately $200M in rsETH-collateralised debt that became undercollateralised when rsETH's market price fell on the news. The incident is the largest bridge-specific exploit since the BNB Bridge hack (October 2022) and the third-largest crypto incident of 2026 (behind Bybit and Drift).

**OAK Techniques observed:** **OAK-T10.001** (Validator/Signer Key Compromise — the attacker compromised LayerZero's cross-chain messaging infrastructure, which functionally serves as the "signer" that the KelpDao bridge contract trusted to authorise cross-chain transfers. The compromise of the messaging provider's key/signer infrastructure is the T10.001 surface at the infrastructure-provider layer rather than at the bridge's own consensus layer.) **OAK-T10** (Bridge / Cross-Chain parent — the canonical T10 anchor for the "cross-chain messaging-infrastructure compromise" sub-class: the attacker did not exploit the bridge contract's own logic but instead compromised the messaging layer that the bridge trusted to authorise cross-chain transfers.) **OAK-T14.003** (Restaking Cascading Risk — the rsETH depeg propagated through Aave's rsETH-collateralised lending markets, triggering a T14.003 cascade.)

**Attribution:** **pseudonymous** attacker; on-chain address identified but not linked to a named individual. The attack exploited LayerZero infrastructure; whether the compromise was a key-theft (LayerZero operator key), an insider action, or a protocol-level vulnerability in LayerZero's messaging verification was under active investigation at the time of writing.

**Key teaching point:** **The KelpDao bridge hack is the canonical T10 "infrastructure-provider compromise" anchor: the bridge contract's own logic was sound, but the cross-chain messaging infrastructure it trusted — LayerZero — was compromised, allowing the attacker to forge a valid bridge message.** This is the T10 analogue of the T14.002 relay-trust surface: the bridge "relies" on the messaging provider to deliver valid messages, and if the messaging provider is compromised, the bridge's security inherits the compromise. The structural lesson is that **cross-chain bridges have a transitive-trust surface: the bridge's security is the minimum of its own contract security and the security of every infrastructure provider it depends on for cross-chain message delivery.** The attack is not a bridge-smart-contract exploit — it is a supply-chain exploit at the cross-chain-infrastructure layer, structurally analogous to a wallet-supply-chain compromise (T15) at the bridge-infrastructure level.

## Summary

Kelp DAO is a liquid restaking protocol on Ethereum that issues rsETH, an LRT representing restaked ETH positions in EigenLayer (and later Symbiotic and Karak). rsETH is deployed across multiple chains via LayerZero's Omnichain Fungible Token (OFT) standard, which uses LayerZero's cross-chain messaging infrastructure to lock rsETH on Ethereum and mint equivalent rsETH on destination chains (Arbitrum, Optimism, Base, and others).

The KelpDao bridge contract on Ethereum held approximately $290M in locked rsETH — the canonical backing for all bridged rsETH on destination chains. When a user bridged rsETH from Ethereum to Arbitrum, the bridge contract locked the rsETH on Ethereum, LayerZero delivered a cross-chain message attesting to the lock event, and the destination contract minted equivalent rsETH on Arbitrum. The locked rsETH on Ethereum was the "proof of collateral" for all circulating bridged rsETH.

On April 18, 2026, an attacker exploited a compromise of LayerZero's cross-chain messaging infrastructure to forge a bridge message. The forged message instructed the bridge contract to release the locked rsETH collateral to the attacker's address — without a corresponding lock event on any source chain. The bridge contract, trusting LayerZero's message as authentic, executed the release. The attacker walked away with approximately 116,500 rsETH (~$290M at the time).

The attack exploited the bridge's transitive-trust architecture:

1. **The bridge contract trusted LayerZero** to deliver authentic cross-chain messages. The bridge's own smart-contract logic verified that the message came from LayerZero's endpoint but did not independently verify that a corresponding lock event had occurred on a source chain — that verification was delegated to LayerZero's infrastructure.

2. **LayerZero's infrastructure was compromised** — the attacker gained the ability to forge messages that appeared to originate from LayerZero's endpoint. Whether this was achieved via key compromise (theft of LayerZero's oracle/relayer private keys), insider access, or exploitation of a protocol-level vulnerability in LayerZero's message verification was under investigation.

3. **The bridge executed the forged message** — releasing the locked rsETH collateral to the attacker's address. The attacker now held 116,500 rsETH that were "backed" by nothing — the tokens on destination chains that had been minted against those locked rsETH were now unbacked.

The exploit had immediate cascade effects:

- **rsETH depeg.** rsETH's market price fell sharply from its ~1:1 ETH backing toward a discount reflecting the unbacked-supply percentage. rsETH/ETH pools on Curve, Uniswap V3, and Balancer experienced severe imbalance as holders rushed to exit.

- **Aave bad debt.** Aave had accepted rsETH as collateral, with approximately $200M in rsETH-collateralised loans outstanding at the time of the exploit. When rsETH's price fell, these loans became undercollateralised. Aave's liquidation mechanism could not absorb the rsETH price decline fast enough, leaving Aave with material bad debt.

- **LRT ecosystem contagion.** The exploit raised questions about the security of all LayerZero-based bridge deployments, affecting other LRTs (ezETH, weETH, pufETH) that used the same OFT standard and cross-chain infrastructure. While only KelpDao's bridge was directly exploited, the transitive-trust surface was shared by all OFT-based LRT bridges.

Kelp DAO committed to a recovery plan including protocol treasury funds and a potential reissuance of rsETH, but the $290M loss exceeded the protocol's treasury capacity by a wide margin, making full recovery uncertain at the time of writing.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024–2025 | Kelp DAO deploys rsETH as LayerZero OFT across Ethereum, Arbitrum, Optimism, Base; bridge contract holds locked rsETH as backing for bridged supply | T10 (standing bridge surface) |
| 2026-04-18 | Attacker exploits LayerZero infrastructure compromise; forges cross-chain bridge message; drains ~116,500 rsETH (~$290M) from KelpDao bridge contract | T10 + T14.003 |
| 2026-04-18 | rsETH depegs from ETH parity; rsETH/ETH pools experience severe sell pressure; rsETH discount widens | T14.003 (exploit-driven LRT depeg) |
| 2026-04-18 to 2026-04-19 | Aave rsETH-collateralised positions become undercollateralised; ~$200M in rsETH-collateralised debt at risk; Aave incurs material bad debt | T14.003 (lending-market cascade) |
| 2026-04-19 onward | Kelp DAO announces recovery plan; investigation into LayerZero compromise vector ongoing; broader OFT-based LRT bridge security reviewed | T10 (post-incident remediation) |
| Continuing | LayerZero infrastructure-compromise surface remains structurally open; every OFT-based bridge shares the same transitive-trust surface | T10 (ongoing) |

## Public references

- Kelp DAO official incident announcement and post-mortem (April 2026)
- LayerZero infrastructure-compromise investigation (ongoing at time of writing)
- On-chain forensic analysis of the forged bridge message and rsETH drain transaction
- Aave rsETH-collateralised position data and bad-debt assessment (April 2026)
- rsETH/ETH DEX pool analytics showing depeg depth and recovery trajectory
- See `techniques/T10` bridge techniques and `techniques/T14.003-restaking-cascading-risk.md` for Technique definitions

## Discussion

The KelpDao bridge hack is the canonical T10 "infrastructure-provider compromise" anchor, extending the bridge-attack taxonomy beyond the two existing sub-classes (T10.001 Validator/Signer Key Compromise, T10.002 Message Verification Bypass) to include a third: **cross-chain messaging-infrastructure compromise.** The attacker did not steal the bridge's own validator keys (T10.001) and did not find a flaw in the bridge contract's message-verification logic (T10.002) — they compromised the trusted third party (LayerZero) whose infrastructure the bridge relied on for message authenticity. The bridge's security was transitive: it was only as secure as LayerZero's endpoint, and LayerZero's endpoint was compromised.

The transitive-trust lesson applies to every cross-chain bridge that depends on an external messaging provider (LayerZero, Wormhole, Chainlink CCIP, Axelar, Hyperlane). The bridge's security model is: "the bridge contract is secure assuming the messaging provider's messages are authentic." If the messaging provider's messages can be forged — through key compromise, insider action, or protocol exploit — the bridge contract's own security is irrelevant. The attacker forges a message, and the bridge executes it.

The rsETH depeg cascade (T14.003) adds the exploit-driven depeg sub-class to the existing LRT depeg taxonomy: governance-driven (Renzo ezETH April 2024), withdrawal-cap-driven (Ether.fi weETH May 2024, Kelp rsETH June 2024, Puffer pufETH July 2024), and now **exploit-driven** (KelpDao rsETH April 2026). The exploit-driven depeg is structurally the most severe because the depeg trigger (the exploit) is simultaneous with the depeg onset — there is no pre-depeg window for holders to exit — and because the uncertainty about the exploit's scope (which chains are affected? was the messaging provider or the bridge contract exploited?) amplifies the sell pressure beyond the mechanical unbacked-supply effect.

The Aave bad-debt cascade demonstrates that LRT-collateralised lending markets are structurally exposed to exploit-driven LRT depegs. When the depeg trigger is a protocol announcement (governance, airdrop, withdrawal cap), the market has time to absorb the information and the depeg onset is gradual (hours to days). When the depeg trigger is an exploit, the depeg onset is instantaneous (the attacker dumps or the market reacts in minutes), and lending-market liquidations cannot keep pace with the price decline. The defender lesson: LRT collateral parameters in lending markets should be stress-tested against exploit-driven instantaneous depegs, not just against the gradual governance-driven depegs observed in 2024.

The KelpDao incident also anchors the T10 × 2026 matrix cell (previously empty) and provides the first exploit-driven LRT depeg for T14.003 × 2026. Future v0.x expansions should incorporate the LayerZero investigation findings — specifically, whether the compromise was key-theft, insider, or protocol-level — as this determines whether the mitigation is operational-security (key management), access-control (insider threat), or protocol-design (message-verification architecture).
