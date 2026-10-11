# FlashLoopAdapter — the Safe module asked the caller whether it was a Safe with the module enabled, and a fake Safe said yes — FlashLoopAdapter (Aave V3 loop Safe module) / Ethereum — 2026-10-01

**Loss:** **~114 ETH (~\$305K)** from **two Safe wallets** with leveraged Aave V3 positions. Aave V3 itself was unaffected (Stani Kulechov: "zero effect").

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary, confirmed*. `open()` and `close()` authorised callers by calling **`isModuleEnabled` on `msg.sender`** — a check the caller answers about itself. A **fake Safe contract returning `true`** passed it. Using a **Morpho flash loan**, the attacker repaid ~1,335 WETH of a victim Safe's Aave debt and withdrew ~1,306 weETH of collateral, keeping the difference. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). **OAK-T9.002** (Flash-Loan-Enabled Exploit — capital source). Same class as [SquidRouterModule](2026-05-squidroutermodule-safe-module-constant-string-authorization.md): a Safe module whose authorisation is satisfiable by anyone.

**Attribution:** **pseudonymous.**

**Key teaching point:** **Never ask the caller to vouch for itself.** Identity checks must be against state the module controls — a registry of Safes that enabled it, or a Safe factory/proxy code-hash check — not a view function on `msg.sender`.

## Summary

On 2026-10-01 an attacker deployed a contract that impersonated a Safe, called FlashLoopAdapter's `open()`/`close()` paths, and unwound two real Safes' leveraged Aave V3 positions with a Morpho flash loan, netting ~114 ETH. SlowMist flagged it.

## Public references

- `[cryptonewsflashloop2026]` — crypto.news, "FlashLoopAdapter exploit drains \$305K from Aave linked Safe wallets" (2026-10-02): <https://crypto.news/flashloopadapter-exploit-drains-305k-from-aave-linked-safe-wallets/>
- `[cryptotimesflashloop2026]` — The Crypto Times, "FlashLoopAdapter Exploit Drains \$305K From Two Aave-Linked Safes" (2026-10-02): <https://www.cryptotimes.io/2026/10/02/flashloopadapter-exploit-drains-305k-from-two-aave-linked-safes/>
- `[slowmistflashloop2026]` — SlowMist on X, FlashLoopAdapter alert: <https://x.com/SlowMist_Team/status/2105855276536725599>
