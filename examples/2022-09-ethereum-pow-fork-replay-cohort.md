# Ethereum PoW fork cross-chain replay — Ethereum / ETHPoW — September 2022

**Loss:** cohort-scale — Ethereum's transition to proof-of-stake (The Merge, 2022-09-15) and the concurrent emergence of ETHPoW (later ETHW), a proof-of-work fork retaining the original chain ID (1), created a cross-chain replay surface between two chains sharing identical address spaces, nonce states, and transaction formats. Individual user losses from replay attacks across the immediate post-Merge window are estimated in the low millions of dollars; the structural cost is the replay-amplification surface that any transaction on one chain is inherently valid on the other until chain-ID binding is enforced at the user or protocol level. The replay surface was largely closed when ETHPoW adopted chain ID 10001, but the window between The Merge and chain-ID migration exposed all Ethereum mainnet users to cross-chain replay risk.

**OAK Techniques observed:** **OAK-T10.003** (Cross-Chain Replay — primary; transactions signed for Ethereum mainnet are structurally valid on the ETHPoW fork because both chains share the same chain ID, address derivation, and nonce state, making every post-Merge Ethereum transaction a candidate for replay on the PoW fork). **OAK-T10** (Bridge and Cross-Chain — parent Tactic; the replay surface is a chain-fork replay rather than a bridge-instance replay, but the underlying primitive is identical: an authorisation artefact whose scope is not chain-bound).

**Attribution:** **unattributed** (the replay surface is a structural artefact of the fork, not an operator-attribution class). Individual replay incidents were opportunistic — any actor monitoring Ethereum mainnet transactions could replay them on the ETHPoW chain, and vice versa.

**Key teaching point:** **A chain fork without chain-ID migration creates a cross-chain replay surface by construction — every transaction on one chain is a valid transaction on the other, and the replay risk persists until the chain ID diverges.** The Ethereum PoW fork replay window is the canonical case study for why chain-ID binding is load-bearing not only for bridge messages but for the chain-transaction primitive itself in a fork context.

## Summary

Ethereum's transition from proof-of-work to proof-of-stake ("The Merge") occurred on 2022-09-15 at block 15537393. A subset of miners and community members rejected the PoS transition and continued operating a proof-of-work fork under the original consensus rules, initially retaining the mainnet chain ID (1) and the ETH ticker (later rebranded to ETHW with chain ID 10001).

The two chains shared:

- **Identical address space:** every Ethereum mainnet address had a corresponding address on the PoW fork with the same private-key derivation, same balance at the fork block, and same nonce state at the fork block.
- **Identical transaction format:** the EVM transaction format, signature scheme (EIP-1559, legacy), and encoding are byte-for-byte identical on both chains.
- **Identical chain ID (initially):** the PoW fork retained chain ID 1 for a window after the fork, meaning an EIP-155-signed transaction with chain ID 1 was valid on both chains.

The replay surface:

1. **User signs a transaction on Ethereum mainnet** (e.g., a USDC transfer, an ETH transfer, a Uniswap swap, an NFT purchase). The transaction is signed with chain ID 1 and broadcast to the Ethereum mainnet mempool.

2. **An observer replays the transaction on the PoW fork.** The signed transaction — identical in every byte — is broadcast to the PoW fork's mempool. The PoW fork's nodes accept it because the chain ID matches, the nonce is valid (at the fork block, nonce states were identical), and the signature verifies against the sender's address (same key derivation).

3. **The replayed transaction executes on the PoW fork.** The sender's PoW-fork balance is debited, and the recipient receives PoW-fork ETH or tokens. The sender may not have intended to transact on the PoW fork at all — they signed a transaction for Ethereum mainnet, and the replay forced an unintended PoW-fork transaction.

4. **The reverse replay is equally possible:** a user transacting on the PoW fork can have their transaction replayed on Ethereum mainnet, potentially draining mainnet assets the user intended to preserve.

The replay surface was partially mitigated by:
- **ETHPoW's chain-ID migration to 10001** — once the PoW fork adopted a distinct chain ID, EIP-155 signature verification rejected mainnet-signed transactions (chain ID 1) on the PoW fork (chain ID 10001), and vice versa.
- **User-side replay protection** — some users sent zero-value "replay-protection" transactions on one chain to increment their nonce beyond the nonce of any pending transaction on the other chain, creating a nonce-mismatch barrier.
- **Protocol-level replay protection** — protocols (stablecoin issuers, bridges, DEXes) deployed chain-ID-aware contracts on the PoW fork that rejected transactions with the wrong chain ID.

However, the window between The Merge (2022-09-15) and widespread chain-ID migration / user-side replay protection was non-zero, and opportunistic replay attacks were documented against unprotected users and protocols during that window.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2022-09-15 | Ethereum transitions to proof-of-stake (The Merge); ETHPoW fork emerges retaining chain ID 1 | **T10.003 surface deployment** |
| 2022-09 to 2022-10 | Opportunistic replay attacks documented; users and protocols deploy replay-protection measures | **T10.003 cohort window** |
| 2022-10 onward | ETHPoW migrates to chain ID 10001; cross-chain replay surface largely closed | **T10.003 mitigation** |

## What defenders observed

- **A chain fork without chain-ID migration is a cross-chain replay surface.** The fork inherits the source chain's address space, nonce state, and chain ID — every transaction on one chain is structurally valid on the other.
- **EIP-155 chain-ID binding is the canonical mitigation, but it requires the fork to adopt a distinct chain ID.** Until the fork does so, the replay surface is open by construction.
- **Nonce-based replay protection is a user-side partial mitigation** — sending a transaction on one chain to advance the nonce beyond the replay target's nonce — but it requires user awareness and action.

## What this example tells contributors writing future Technique pages

- **T10.003 is not restricted to bridge-message replay.** Chain-fork replay is a structurally identical primitive: an authorisation artefact (signed transaction or message) whose scope is not chain-bound. The Ethereum PoW fork replay window is the canonical chain-fork case study for T10.003.
- **Chain-ID binding (EIP-155) is load-bearing at the chain-transaction layer, not only at the bridge-message layer.** The ETHPoW replay window demonstrates that chain-ID binding is necessary whenever two chains share an address space — whether they are bridges, sidechains, or forks.

## Public references

- Ethereum Foundation. *"The Merge."* 2022-09-15.
- ETHPoW / ETHW documentation — chain-ID migration to 10001.
- Cross-reference: T10.003 (Cross-Chain Replay) at `techniques/T10.003-cross-chain-replay.md`.
