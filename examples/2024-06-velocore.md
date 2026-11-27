# Velocore — pool function with no caller check let an attacker inflate the fee multiplier, then an underflow minted LP tokens — Velocore / Linea and zkSync Era — 2024-06-02

**Loss:** **over \$6.8M**, in ETH, drained from Velocore pools on Linea and zkSync ([Rekt](https://rekt.news/velocore-rekt)). Velocore opened negotiations with the attacker, offering a 10% white-hat bounty; the attacker had not responded as of Rekt's report ([Rekt](https://rekt.news/velocore-rekt)). No recovery is reported.

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary*). Beosin says the LP pool lacked permission verification and that the attacker invoked `velocore__execute` (selector `0xec378808`) on the LP contract directly, with crafted parameters, to manipulate `feeMultiplier` ([Beosin](https://x.com/BeosinAlert/status/1797247874528645333)). Verichains confirms that `velocore__execute()` has no caller validation and that anyone can call it ([Verichains](https://blog.verichains.io/p/velocores-incident-analysis)). See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md). **OAK-T9.002** (Flash-Loan-Enabled Exploit — the attacker used a flash loan to take most of the pool's tokens and contract the pool, per [Rekt](https://rekt.news/velocore-rekt)). See [`techniques/T9.002-flash-loan-enabled-exploit.md`](../techniques/T9.002-flash-loan-enabled-exploit.md). **OAK-T7.001** (Mixer-Routed Hop) appears at both ends: per Velocore's post-mortem as relayed by Rekt, the attacker sourced funds from Tornado Cash and, after the exploit, deposited proceeds back into it ([Rekt](https://rekt.news/velocore-rekt)).

**Attribution:** **pseudonymous** — attacker address [`0x8cdc37ed79c5ef116b9dc2a53cb86acaca3716bf`](https://lineascan.build/address/0x8cdc37ed79c5ef116b9dc2a53cb86acaca3716bf) ([Rekt](https://rekt.news/velocore-rekt)); no named attribution in the sources opened.

**Key teaching point:** **Every state-changing entry point of a pool must check that the caller is the vault (or other trusted contract), and arithmetic on fee values must be checked.** Velocore's `velocore__execute()` could be called by anyone, each call raised `feeMultiplier` (which resets only when the block timestamp changes and has no upper bound), and once the fee passed 100% an `unchecked` subtraction wrapped around instead of reverting ([Verichains](https://blog.verichains.io/p/velocores-incident-analysis)). Velocore's documents say three audit rounds by Zokyo, Hacken and Scalebit were completed in August 2023, and the exploit happened despite them ([Rekt](https://rekt.news/velocore-rekt)).

## Summary

On 2024-06-02 the attacker called `velocore__execute()` on the pool contract directly with crafted parameters to simulate large withdrawals and inflate `feeMultiplier`, pushing `effectiveFee1e9` above 100% ([Rekt](https://rekt.news/velocore-rekt)). Because these calls move no tokens, they change only the multiplier, not the pool's balances ([Verichains](https://blog.verichains.io/p/velocores-incident-analysis)). The attacker then used a flash loan to take most of the pool's tokens and contract the pool; a final single-token withdrawal hit the underflow and made the pool credit the attacker an abnormally large amount of LP tokens instead of processing a normal withdrawal, which paid back the flash loan, and the attacker kept the rest ([Rekt](https://rekt.news/velocore-rekt), [Verichains](https://blog.verichains.io/p/velocores-incident-analysis)). The earlier text of this file described a negative swap fee; the sources describe a fee multiplier above 100% and an underflow in the withdrawal path.

Officer CIA first flagged suspicious activity in Velocore's liquidity pools ([Rekt](https://rekt.news/velocore-rekt)). Linea halted block production on its sequencer to prevent more funds from bridging out, because it could not reach Velocore; Linea called it a last resort and the halt drew centralisation criticism ([Rekt](https://rekt.news/velocore-rekt)).

## Timeline (UTC)

Stages: **Flaw** (missing caller check), **Preparation** (Tornado Cash funding, bridging), **Execution** (fee inflation, flash loan, underflow), **Money** (back to Tornado Cash), **Response** (Linea halt, bounty, post-mortem). The sources give dates, not clock times.

| When | What happened | OAK |
|---|---|---|
| Before 2024-06-02 (undisclosed); audits August 2023 | `velocore__execute()` on the pool lacks a caller check; three audits (Zokyo, Hacken, Scalebit) completed in August 2023 ([Rekt](https://rekt.news/velocore-rekt)). | **T9.004** |
| Before 2024-06-02 (undisclosed) | Attacker obtains funds from Tornado Cash and bridges them over ([Rekt](https://rekt.news/velocore-rekt), citing Velocore's post-mortem). | T7.001 |
| 2024-06-02 | Direct calls to `velocore__execute()` inflate `feeMultiplier` ([Beosin](https://x.com/BeosinAlert/status/1797247874528645333), [Rekt](https://rekt.news/velocore-rekt)). | **T9.004** |
| 2024-06-02, Linea | Attack transactions [`0xed11d5b013bf3296b1507da38b7bcb97845dd037d33d3d1b0c5e763889cdbed1`](https://lineascan.build/tx/0xed11d5b013bf3296b1507da38b7bcb97845dd037d33d3d1b0c5e763889cdbed1) and [`0x37434e674efc4e7cfeed7746095301ace5636028906fe548b786ead286e35eb0`](https://lineascan.build/tx/0x37434e674efc4e7cfeed7746095301ace5636028906fe548b786ead286e35eb0): flash loan, pool contraction, underflow mint, drain through the router's `execute` ([Rekt](https://rekt.news/velocore-rekt)). | **T9.002**, **T9.004** |
| 2024-06-02, zkSync | Attack transaction [`0x4156d73cadc18419220f5bcf10deb4d97a3d3f7533d63ba90daeabc5fd11ba17`](https://explorer.zksync.io/tx/0x4156d73cadc18419220f5bcf10deb4d97a3d3f7533d63ba90daeabc5fd11ba17) ([Rekt](https://rekt.news/velocore-rekt)). | **T9.002**, **T9.004** |
| After the exploit (undisclosed) | Proceeds go to [`0xe4062fcade7ac0ed47ad794028967a2314ee02b3`](https://lineascan.build/address/0xe4062fcade7ac0ed47ad794028967a2314ee02b3) (chain not stated; zkSync link: [explorer](https://explorer.zksync.io/address/0xe4062fcade7ac0ed47ad794028967a2314ee02b3)) and are then deposited into Tornado Cash ([Rekt](https://rekt.news/velocore-rekt)). | T7.001 |
| 2024-06-02 to 06-03 | Linea halts the sequencer to stop bridging; Velocore offers a 10% bounty and publishes a post-mortem ([Rekt](https://rekt.news/velocore-rekt)); the halt was later lifted. | response |

Key addresses:

- Attacker EOA — [`0x8cdc37ed79c5ef116b9dc2a53cb86acaca3716bf`](https://lineascan.build/address/0x8cdc37ed79c5ef116b9dc2a53cb86acaca3716bf) ([zkSync link](https://explorer.zksync.io/address/0x8cdc37ed79c5ef116b9dc2a53cb86acaca3716bf)); chain per address not separated by Rekt
- Exploited contracts per [Rekt](https://rekt.news/velocore-rekt), chain not stated except the last: [`0xed4e130f6f9e68918996f7e1e46a3306b3e12cec`](https://lineascan.build/address/0xed4e130f6f9e68918996f7e1e46a3306b3e12cec), [`0xb7f6354b2cfd3018b3261fbc63248a56a24ae91a`](https://lineascan.build/address/0xb7f6354b2cfd3018b3261fbc63248a56a24ae91a), [`0xc030fba4b741b770f03e715c3a27d02c41fc9dae`](https://lineascan.build/address/0xc030fba4b741b770f03e715c3a27d02c41fc9dae); on zkSync [`0xf7f76b30a301524fe76508546B1e3762eF2B9267`](https://explorer.zksync.io/address/0xf7f76b30a301524fe76508546B1e3762eF2B9267)
- Pre-Tornado destination — [`0xe4062fcade7ac0ed47ad794028967a2314ee02b3`](https://lineascan.build/address/0xe4062fcade7ac0ed47ad794028967a2314ee02b3) (Rekt)

## Root-cause evidence

- **Technique:** OAK-T9.004 (primary), OAK-T9.002
- **Source:** <https://rekt.news/velocore-rekt>; <https://blog.verichains.io/p/velocores-incident-analysis>; <https://x.com/BeosinAlert/status/1797247874528645333>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** Beosin and Verichains independently state that `velocore__execute()` lacks caller validation and that calling it inflates `feeMultiplier`; Verichains and Rekt agree on the fee above 100%, the flash loan and the underflow that mints LP tokens. Velocore's post-mortem (Medium) returned HTTP 403 and was not opened; its Tornado Cash statement is relayed by Rekt. Open: which chain each exploited contract and the destination address are on.

## Public references

- Rekt, "Velocore - Rekt" (2024-06-03): <https://rekt.news/velocore-rekt>
- Verichains, "Velocore's Incident Analysis": <https://blog.verichains.io/p/velocores-incident-analysis>
- Beosin Alert on X (2024-06-02): <https://x.com/BeosinAlert/status/1797247874528645333>
