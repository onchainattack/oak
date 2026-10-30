# Unnamed trading Safe — unlimited approvals to an address that held the team's pool on other chains but was empty on Avalanche, so anyone could deploy there — Safe multisig / Avalanche — 2026-10-26

**Loss:** **~\$7.45M** (3.09M USDC, 350.4K WAVAX, 182 WETH.e, 10.79 BTC.b) taken from a 2-of-7 Safe holding trading inventory. An MEV bot front-ran the original attacker in the same block, took the funds, called itself a whitehat and offered to return them for a 5–10% bounty. The operator evacuated its Safes on five other chains (~\$38.7M) to a fresh address.

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary*. On 2026-03-07 the Safe approved **unlimited** WAVAX, USDC, WETH.e and BTC.b to `0x3725…155d`. On Base, Arbitrum and Ethereum the team's pool lives there; on Avalanche the address was **empty**, and it is simply what Safe's public CreateCall contract produces on its 13th deployment. An attacker deployed CreateCall via the Safe singleton factory, ran 12 throwaway deployments, then put a sweeper at that address. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). No signer key was compromised.

**Attribution:** **pseudonymous;** the operator is not publicly named.

**Key teaching point:** **The same address is not the same contract on another chain.** Approving a counterfactual address on a chain where nothing is deployed hands the allowance to whoever deploys there first. Check code at the spender before approving, per chain, and revoke allowances that nothing uses.

## Summary

Defimon detected the attack on 2026-10-26 at 13:00 UTC. The approvals had been live for seven months.

## Root-cause evidence

- **Technique:** OAK-T9.004
- **Source:** <https://x.com/DefimonAlerts/status/2115005055619260758>; <https://www.rektradar.xyz/web3-daily-exploits-27-oct-2026-avax-safe-7-45m-mev-frontrun/>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** Defimon links the 2026-03-07 approval batch, the CreateCall deployment sequence, the reverted attack and the MEV front-run; RektRadar's brief agrees.

## Public references

- `[defimonavaxsafe2026]` — Defimon on X (2026-10-27): <https://x.com/DefimonAlerts/status/2115005055619260758>
- `[snowtraceapprovals2026]` — vulnerable approvals: <https://snowtrace.io/tx/0x6952f80bbbcad4368b020bcda600965cf0a520a8694db431b6b1521842d3829e>
- `[rektradaravax2026]` — RektRadar daily brief, 2026-10-27: <https://www.rektradar.xyz/web3-daily-exploits-27-oct-2026-avax-safe-7-45m-mev-frontrun/>
