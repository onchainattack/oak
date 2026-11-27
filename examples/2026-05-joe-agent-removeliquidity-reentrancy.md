# Joe Agent ($JOE) — `_removeLiquidityViaContract` single-function reentrancy — BNB Chain — 2026-05-27

**Loss:** **1,195,918.923198279 JOE and 62.5 BNB gross (40 BNB net)** per [DARKNAVY](https://www.darknavy.org/web3/exploits/joe-agent-liquidity-removal-reentrancy/). A US-dollar figure is not given on the page OAK opened. An earlier version of this file said about \$45K from a news mirror that could not be opened; that figure is dropped.

**OAK Techniques observed:** **OAK-T9.005** (Reentrancy — single-function sub-shape. The liquidity-removal function sent BNB to the caller with a low-level call before it reduced the caller's recorded LP credit, so the attacker contract's fallback re-entered it against the stale credit. See [`techniques/T9.005-reentrancy.md`](../techniques/T9.005-reentrancy.md)).

**Attribution:** **pseudonymous**; no named individual or group in the opened source.

**Key teaching point:** Update the user's recorded balance before any external call, and put a reentrancy guard across every add, remove and zap entry point. Here a `lockTheSwap` modifier existed, but [DARKNAVY](https://www.darknavy.org/web3/exploits/joe-agent-liquidity-removal-reentrancy/) says it only toggles `inSwap` and so does not block re-entry into the removal function.

## Summary

Joe Agent is a token project on BNB Chain whose proxy contract lets a contract caller remove protocol-custodied liquidity. [DARKNAVY](https://www.darknavy.org/web3/exploits/joe-agent-liquidity-removal-reentrancy/) reports that `_removeLiquidityViaContract` sends BNB to the caller with a low-level `user.call` before it decrements `lpInfo[user].lpAmount`. On 2026-05-27 an attacker contract holding an internal credit of 437.368895272310313834 LP units called the removal function; the proxy removed liquidity from the JOE-WBNB PancakeSwap V2 pair, paid out JOE and BNB, and the attacker's fallback re-entered the function while the credit still stood. The trace shows 25 BNB callbacks of 2.5 BNB each and 26 calls into the removal function, and the outer frame finally set the credit to zero ([DARKNAVY](https://www.darknavy.org/web3/exploits/joe-agent-liquidity-removal-reentrancy/)).

## Timeline (UTC)

Facts are from [DARKNAVY](https://www.darknavy.org/web3/exploits/joe-agent-liquidity-removal-reentrancy/). Joe Agent's response is undisclosed in the opened source.

| When | What happened | OAK |
|---|---|---|
| Before 2026-05-27 (undisclosed) | The Joe Agent proxy ([`0xef0f12d08d66e76e1866e60f30a0daa578e00c04`](https://bscscan.com/address/0xef0f12d08d66e76e1866e60f30a0daa578e00c04), implementation [`0xb12ce0a21f67a9fc3c8ad1c7dbc4b017b7e67319`](https://bscscan.com/address/0xb12ce0a21f67a9fc3c8ad1c7dbc4b017b7e67319)) carries the removal function that pays BNB before reducing `lpInfo[user].lpAmount`. How the attacker contract came to hold its LP credit is not stated. | **T9.005** (standing surface) |
| 2026-05-27 22:41:03 (block 100812531) | The attacker EOA ([`0xaa761779945dcc5f26064fc6dcb36ffab6ac7610`](https://bscscan.com/address/0xaa761779945dcc5f26064fc6dcb36ffab6ac7610)) calls the attacker contract ([`0x31f81fcd91025728f24bd6f0e4efb156e345a4cf`](https://bscscan.com/address/0x31f81fcd91025728f24bd6f0e4efb156e345a4cf)), which calls `removeLiquidityViaContract` with its LP credit and zero minimum outputs. The proxy approves the protocol-held JOE-WBNB LP ([`0x7e5396a6b56372d1ee42ab6b199bc2d5a8540f9c`](https://bscscan.com/address/0x7e5396a6b56372d1ee42ab6b199bc2d5a8540f9c)) and calls the PancakeSwap V2 router ([`0x10ed43c718714eb63d5aa57b78b54704e256024e`](https://bscscan.com/address/0x10ed43c718714eb63d5aa57b78b54704e256024e)). The attacker contract's fallback re-enters the function 25 times in one transaction ([`0xd16a1c3dcd84427b2c7dcccbe1854c1c5bf65900460e1a44a95c1aaaf140c3a5`](https://bscscan.com/tx/0xd16a1c3dcd84427b2c7dcccbe1854c1c5bf65900460e1a44a95c1aaaf140c3a5)). | **T9.005** |
| 2026-05-27 22:41:03 | In the same transaction 1,195,918.923198279 JOE and 25 sends of 2.5 BNB (62.5 BNB) move from the proxy to the attacker contract; the contract's BNB balance rises by 40 BNB net. The source attributes the gap to BNB moved through PancakeSwap liquidity operations and does not itemise it. | T9.005 outflow |
| After the exploit (times undisclosed) | The attacker sells the accumulated JOE and sweeps BNB to the attacker EOA in separate transactions; hashes and amounts are not given. | undisclosed |

Key addresses:

- Attacker EOA — [`0xaa761779945dcc5f26064fc6dcb36ffab6ac7610`](https://bscscan.com/address/0xaa761779945dcc5f26064fc6dcb36ffab6ac7610)
- Attacker contract — [`0x31f81fcd91025728f24bd6f0e4efb156e345a4cf`](https://bscscan.com/address/0x31f81fcd91025728f24bd6f0e4efb156e345a4cf)
- Vulnerable proxy — [`0xef0f12d08d66e76e1866e60f30a0daa578e00c04`](https://bscscan.com/address/0xef0f12d08d66e76e1866e60f30a0daa578e00c04)
- Implementation (`JoeAgentToken`) — [`0xb12ce0a21f67a9fc3c8ad1c7dbc4b017b7e67319`](https://bscscan.com/address/0xb12ce0a21f67a9fc3c8ad1c7dbc4b017b7e67319)
- JOE-WBNB Pancake LP (protocol-held) — [`0x7e5396a6b56372d1ee42ab6b199bc2d5a8540f9c`](https://bscscan.com/address/0x7e5396a6b56372d1ee42ab6b199bc2d5a8540f9c)
- PancakeSwap V2 router — [`0x10ed43c718714eb63d5aa57b78b54704e256024e`](https://bscscan.com/address/0x10ed43c718714eb63d5aa57b78b54704e256024e)

## What defenders can check

[DARKNAVY](https://www.darknavy.org/web3/exploits/joe-agent-liquidity-removal-reentrancy/) recommends: decrement `lpInfo[user].lpAmount` and `lpPrincipalValue[user]` before the router call and any user callback; add a non-reentrant guard (for example OpenZeppelin `ReentrancyGuardUpgradeable`) across the LP add, remove and zap entry points; use pull payments instead of raw native-token callbacks to arbitrary users; and add invariant tests with a malicious receiver that re-enters the removal function. The on-chain signal is a single transaction whose trace calls the same selector (`0xacff149d`) repeatedly on the proxy.

## Root-cause evidence

- **Technique:** OAK-T9.005
- **Source:** <https://www.darknavy.org/web3/exploits/joe-agent-liquidity-removal-reentrancy/>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** DARKNAVY's trace analysis of the exploit transaction: step-by-step mechanism, the 25 BNB callbacks and the code ordering of the call before the state write. Not independently confirmed by Joe Agent or a second firm in the pages OAK opened.

## Public references

- DARKNAVY, "Joe Agent Liquidity Removal Reentrancy Drain" (dated 2026-05-27): <https://www.darknavy.org/web3/exploits/joe-agent-liquidity-removal-reentrancy/>
- Exploit transaction on BscScan: <https://bscscan.com/tx/0xd16a1c3dcd84427b2c7dcccbe1854c1c5bf65900460e1a44a95c1aaaf140c3a5>
- DARKNAVY analysis artifacts (file listing only was readable): <https://github.com/DarkNavySecurity/web3-exploit-analysis/tree/main/artifacts/analysis_0xd16a1c3dcd84427b2c7dcccbe1854c1c5bf65900460e1a44a95c1aaaf140c3a5>
