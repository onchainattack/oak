# Fake GIWA chain — a cloned L2 with Upbit's real chain ID, a working bridge, and a leaked-mainnet-RPC rumour collected 766 ETH before the real team said mainnet was not live — GIWA (Upbit L2) impersonation / Ethereum — 2026-09-26 → 27

**Loss:** **766.25 ETH (~\$2.08M)** left the fake bridge in one transaction. Bitquery counts **1,333 addresses** and **2,226 deposits** (median 0.072 ETH; 14 addresses sent 10 ETH or more) ([Bitquery](https://bitquery.io/investigations/fake-giwa-chain-bridge-drain)); DYORSWAP's own reconstruction counts about 767.65 ETH from 1,335 addresses ([Cointelegraph](https://cointelegraph.com/news/fake-giwa-blockchain-scam-drains-2m-eth)). By 10:00 UTC on 2026-09-28, 584.9 ETH had gone into Tornado Cash and 199.3 ETH had been paid to 1,018 depositors from DYORSWAP's own funds (26% of the drain), which says it refunds 40% to addresses that bridged under 5 ETH ([Bitquery](https://bitquery.io/investigations/fake-giwa-chain-bridge-drain)).

**OAK Techniques observed:** **OAK-T4.009** (Pre-token Brand-Anticipation Phishing — *primary, with a fit caveat*). The lure was the anticipated mainnet of a real, not-yet-launched L2: people believed the mainnet RPC had leaked and that being first onto the chain would pay ([Bitquery](https://bitquery.io/investigations/fake-giwa-chain-bridge-drain)). T4.009's page describes lookalike domains and claim portals for a token; here the lookalike was a whole network, so the fit is by mechanism (exploiting anticipation of an unlaunched brand), not by surface. See [`techniques/T4.009-pre-token-brand-anticipation-phishing.md`](../techniques/T4.009-pre-token-brand-anticipation-phishing.md). **OAK-T7.001** (Mixer-Routed Hop — Bitquery traces 584.9 ETH into Tornado Cash in pools of 100, 10, 1 and 0.1 ETH; see [`techniques/T7.001-mixer-routed-hop.md`](../techniques/T7.001-mixer-routed-hop.md)). The fake-chain clone is not mapped to the clone-frontend phishing Technique: that one is about counterfeit DEX user interfaces distributed through ads.

**Attribution:** **unattributed.** Bitquery names addresses only and states that naming one is not an accusation; it does not know who built the copy ([Bitquery](https://bitquery.io/investigations/fake-giwa-chain-bridge-drain)). Deployer [`0x119e68B59C44291F76324c76377B776D0b4Dd38c`](https://etherscan.io/address/0x119e68B59C44291F76324c76377B776D0b4Dd38c); first receiver of the drain [`0x04a9c8D8FEe491411Bda28b68aD80F0122Fc4134`](https://etherscan.io/address/0x04a9c8D8FEe491411Bda28b68aD80F0122Fc4134).

**Key teaching point:** **A matching chain ID authenticates nothing; for a chain that has not launched, the only authority is the operator's own channel.** Bitquery: "A chain ID is a number a wallet uses to tell networks apart. Anyone can set one, so it proves nothing about who runs the network." DYORSWAP said the matching chain ID made the fake look right during its own checks ([Cointelegraph](https://cointelegraph.com/news/fake-giwa-blockchain-scam-drains-2m-eth)).

## Summary

GIWA is an Ethereum L2 tied to Upbit with a testnet and no mainnet ([Bitquery](https://bitquery.io/investigations/fake-giwa-chain-bridge-drain)). On 2026-09-26 one wallet deployed a bridge contract and its supporting contracts on Ethereum, and a second wallet began posting data batches to Ethereum roughly every four minutes, the way a rollup does; the copy answered with GIWA's chain ID, 9134. A rumour that the mainnet RPC had leaked drove a rush from 03:00 UTC on 09-27 (750 deposits in the first hour). GIWA said at 06:09 UTC that its mainnet had not launched; at 07:29 UTC the bridge was emptied in one transaction; DYORSWAP, which had treated the network as GIWA mainnet, confirmed at 08:06 UTC that it was fake ([Bitquery](https://bitquery.io/investigations/fake-giwa-chain-bridge-drain)). GIWA's statement was "We do not have our mainnet running currently" ([Cointelegraph](https://cointelegraph.com/news/fake-giwa-blockchain-scam-drains-2m-eth)). Bitquery cannot see inside the copy, and its statements about the chain ID and the activity inside come from GIWA and DYORSWAP posts; that the batches belonged to the copy is its inference from timing and format.

## Timeline (UTC)

**Flaw** (a convincing copy), **Take** (deposits), **Money** (drain and mixer), **Response**. Times are from [Bitquery](https://bitquery.io/investigations/fake-giwa-chain-bridge-drain); transaction hashes are not printed in full on the opened pages, so none is given here.

| When | What happened | OAK |
|---|---|---|
| 2026-09-26 07:36 and 09:47 | Two fresh wallets get their first ETH from the same source, which Bitquery's labels mark as a ChangeHero hot wallet (some posts on X named a different swap service). | none — funding through a swap service |
| 2026-09-26 18:07–18:10 | Bridge and supporting contracts deployed on Ethereum. | none — staging |
| 2026-09-26 18:17–18:18 | First data batch posted to Ethereum; first deposit reaches the bridge. | none — staging |
| 2026-09-27 03:00 | The rush begins on the leaked-RPC rumour: 750 deposits in one hour. | **T4.009** |
| 2026-09-27 06:09 | GIWA says its mainnet has not launched. 211 more deposits (59.5 ETH) arrive before the drain. | response |
| 2026-09-27 07:29 | 766.25 ETH leaves the bridge in one transaction, through a contract that posts on X describe as a two-key multisig (Bitquery did not check its settings), to one fresh address. | none — operator-controlled bridge emptied |
| 2026-09-27 07:34 | Last (203rd) data batch posted. | none |
| 2026-09-27 08:06 | DYORSWAP confirms the chain was fake. | response |
| 2026-09-27 → 28 10:00 | The receiver splits the ETH three ways; 584.9 ETH enters Tornado Cash in fixed sizes; about 161 ETH still sits in a chain of fresh wallets at the cut. | **T7.001** |
| 2026-09-27 (afternoon) → 28 | DYORSWAP pays 199.3 ETH to 1,018 depositors from its own funds. | response |

Key addresses (all from Bitquery's address list):

- Fake bridge on Ethereum — [`0xbA9938C0b96A70E6479661B915e7E481fE435ab2`](https://etherscan.io/address/0xbA9938C0b96A70E6479661B915e7E481fE435ab2)
- Deployer, signed the drain — [`0x119e68B59C44291F76324c76377B776D0b4Dd38c`](https://etherscan.io/address/0x119e68B59C44291F76324c76377B776D0b4Dd38c)
- Batch poster — [`0x0f3498258819bECE3F47661B3E331BD36c1CF857`](https://etherscan.io/address/0x0f3498258819bECE3F47661B3E331BD36c1CF857)
- Received all 766.25 ETH — [`0x04a9c8D8FEe491411Bda28b68aD80F0122Fc4134`](https://etherscan.io/address/0x04a9c8D8FEe491411Bda28b68aD80F0122Fc4134)
- Took 288 ETH, sent 287.8 to Tornado Cash — [`0xEC160acd00D95EbbBE0394161101eb577CA96b60`](https://etherscan.io/address/0xEC160acd00D95EbbBE0394161101eb577CA96b60)
- Took 251 ETH, passed it on — [`0x8c563fc543f6ecC2C8c09eB09D82798f7a7F3dA4`](https://etherscan.io/address/0x8c563fc543f6ecC2C8c09eB09D82798f7a7F3dA4)
- First wallet fed by the third, about 161 ETH at the cut — [`0xd5af44dd7c5f0e8c95d88713bfabcc351e06a8ee`](https://etherscan.io/address/0xd5af44dd7c5f0e8c95d88713bfabcc351e06a8ee)
- DYORSWAP refund address — [`0xdf25f88aa6cde9937fdcfcf10fa349528c79dbf9`](https://etherscan.io/address/0xdf25f88aa6cde9937fdcfcf10fa349528c79dbf9)

## Root-cause evidence

- **Technique:** OAK-T4.009
- **Source:** <https://bitquery.io/investigations/fake-giwa-chain-bridge-drain>; <https://cointelegraph.com/news/fake-giwa-blockchain-scam-drains-2m-eth>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** Bitquery (on-chain figures verified 2026-09-28) traces the bridge, the deposits, the single drain and the Tornado Cash exit on Ethereum, where every transfer is public. The private copy is not in any public index, so the chain ID and the activity inside come from GIWA and DYORSWAP posts, and linking the batches to the copy is Bitquery's inference. Cointelegraph relays GIWA's denial and DYORSWAP's reconstruction. Unknown: who built the copy.

## Public references

- Bitquery, "The fake GIWA chain: 766 ETH bridged into a lookalike" (2026-09-28): <https://bitquery.io/investigations/fake-giwa-chain-bridge-drain>
- Cointelegraph, "Scammers steal $2M in ETH as fake GIWA network fools DYORSWAP" (2026-09-28): <https://cointelegraph.com/news/fake-giwa-blockchain-scam-drains-2m-eth>
