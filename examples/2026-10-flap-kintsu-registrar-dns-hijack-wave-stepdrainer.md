# Flap and Kintsu — registrar-level DNS hijack redirected official domains to StepDrainer clone sites — Flap (BNB Chain) / Kintsu (Monad) / BNB Chain — 2026-10-31

**Loss:** **undisclosed.** No loss total, victim count or drained amount has been published by the operators or by GoPlus ("No loss amount, victim count, or drained total has been published as of cutoff", per RektRadar). Flap "has said it will repay users whose funds were stolen" (same RektRadar page; Flap's own repayment statement was not among the posts read).

**OAK Techniques observed:** **OAK-T15.004** (Operator-Side Credential Compromise, registrar / DNS sub-shape — *primary*; GoPlus: "The attacker likely compromised a domain registrar"; Flap: "further investigating whether the recent DNS attack was related to our domain service provider"). The control that would have stopped it sits at the registrar and DNS layer. See [`techniques/T15.004-operator-credential-compromise.md`](../techniques/T15.004-operator-credential-compromise.md). **OAK-T4.002** (Compromised Front-End Permit Solicitation — the hijacked official domains served clone sites that asked connecting wallets for a native-token transfer or an ERC-20 approval). See [`techniques/T4.002-compromised-frontend-permit-solicitation.md`](../techniques/T4.002-compromised-frontend-permit-solicitation.md).

**Attribution:** **unattributed.** GoPlus says the "attack characteristics" point "to the #StepDrainer group", a drainer-kit family and not a named actor. Receiving Safe: [`0x24497068cA4166ca32a04ae530ce00Cf79755bD5`](https://bscscan.com/address/0x24497068cA4166ca32a04ae530ce00Cf79755bD5).

**Key teaching point:** **Put registrar-level change control (registry or registrar lock, hardware-key MFA, out-of-band approval for nameserver and record changes) on every domain that serves a wallet-connecting dApp, and alert on any NS or A record change.** More than 10 unrelated DeFi domains fell in one wave, which GoPlus reads as a shared registrar-side compromise, so a single protocol cannot fix it inside its own stack. The user-facing signal is a sign request that differs from the site's usual flow.

## Summary

On 2026-10-31 the official sites of Flap (`flap.sh`, a BNB Chain token launch platform) and Kintsu (`kintsu.xyz`, a Monad liquid-staking protocol) were redirected to malicious clone sites. Flap posted a warning at 02:13:28 UTC that `flap.sh` "is currently affected by a DNS hijacking incident and is redirecting to an unauthorized website". At 05:21:59 UTC Flap said it was investigating whether the attack was tied to its domain service provider, and moved to `flap.cool`. GoPlus (08:13:49 UTC) wrote that more than 10 other domains were hijacked alongside Flap and Kintsu, and described two theft forms: users signing a transaction that sends BNB to an attacker-controlled Safe, or approving the Safe to spend ERC-20 tokens that it then pulls with `transferFrom`. RektRadar lists the other domains as stonkfun.xyz, pickle.finance, echelon.market, origami.finance and fluxbeam.xyz. By GoPlus's post both Flap and Kintsu were back online. How the registrar or DNS control was obtained is undisclosed.

## Timeline (UTC)

Stages: **Entry** (registrar or DNS control, path undisclosed), **Execution** (clone sites and drainer prompts), **Money** (recipient Safe), **Response**. Times are the post timestamps returned by the fxtwitter API; the attack start time is not published.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-31 (undisclosed) | The attacker gets control of DNS for `flap.sh`, `kintsu.xyz` and, per GoPlus, more than 10 other domains. GoPlus: "The attacker likely compromised a domain registrar." Flap: root cause "remains under investigation". SlowMist's tracker entry says the domain was redirected to a malicious clone site; registrar-level control and a Dutch server were not stated in the text OAK read. | **T15.004** |
| 2026-10-31, early (exact time undisclosed) | DNS for the official domains is pointed at clone sites. Visitors who click "Connect Wallet" are sent to a malicious wallet-connection or drainer page (GoPlus). RektRadar: Kintsu's advisory covers users who connected or signed after 00:00 UTC on 2026-10-31. | **T4.002** |
| 2026-10-31, same window | Signature requests take two forms, attributed by GoPlus to StepDrainer: a native-token (BNB) transfer to the attacker Safe, or an ERC-20 approval to the Safe followed by `transferFrom`. Victim transactions and amounts were not enumerated by OAK. | **T4.002** |
| 2026-10-31 02:13:28 | [Flap](https://x.com/flapdotsh/status/2116352828734050339): `flap.sh` is hijacked and redirects to an unauthorized site; do not visit, connect or sign. | response |
| 2026-10-31 05:21:59 | [Flap](https://x.com/flapdotsh/status/2116400269445509360): investigating whether the attack relates to its domain service provider; migrated to `flap.cool`; `flap.sh` visitors redirected there. | response |
| 2026-10-31 08:13:49 | [GoPlus](https://x.com/GoPlusSecurity/status/2116443510412865653) publishes the recipient Safe, its owner, and states Kintsu and Flap are back online, with `flap.cool` remaining as an alternative. Advice: revoke suspicious approvals, move remaining assets to a fresh wallet. | response |
| After 2026-10-31 (undisclosed) | Onward movement of stolen assets from the Safe was not traced by OAK. As of 2026-11-03 the Safe held 2.2685 BNB at the latest block (read by OAK via a public BSC RPC `eth_getBalance`). | — |

Key addresses:

- Attacker-controlled Safe (recipient) — [`0x24497068cA4166ca32a04ae530ce00Cf79755bD5`](https://bscscan.com/address/0x24497068cA4166ca32a04ae530ce00Cf79755bD5). OAK check via BSC public RPC on 2026-11-03: the address holds proxy bytecode, `getOwners()` returns only the owner below and `getThreshold()` returns 1.
- Safe sole owner / execution address — [`0x33dfc810365193bff54326812d7df34b3e438da3`](https://bscscan.com/address/0x33dfc810365193bff54326812d7df34b3e438da3). No contract code at the address (an EOA).

## Fund tracing

`tools/explorer.py` has no keyless provider for BSC (`no keyless EVM provider configured for 'bsc'`), and its public-RPC log scan returned no ERC-20 transfers for the Safe in the 2026-10-30T22:00Z to 2026-10-31T10:00Z window. OAK has therefore no verified edges and omits the oak-flow block; victim-to-Safe transfers are not traced.

## What is not known

- How registrar or DNS control was obtained (credential theft, social engineering, registrar-side breach). Flap and GoPlus both say it is under investigation.
- Which registrar or DNS provider was involved, and whether all 10+ domains shared it. GoPlus says only that a registrar was "likely" compromised.
- Total loss, victim count, assets taken, and the actual repayment amounts.
- Kintsu's own statement. The Kintsu X account could not be reached through the fxtwitter API (handles `kintsu_xyz` and variants returned "User not found"); its advisory is known only secondhand via RektRadar.
- The start and end time of the hijack for each domain.

## Root-cause evidence

- **Technique:** OAK-T15.004
- **Source:** <https://x.com/flapdotsh/status/2116352828734050339>; <https://x.com/flapdotsh/status/2116400269445509360>; <https://x.com/GoPlusSecurity/status/2116443510412865653>; <https://hacked.slowmist.io/>; <https://www.rektradar.xyz/web3-daily-exploits-31-oct-2026-flap-kintsu-dns-stepdrainer/>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** Confidence applies to the DNS hijack itself (operator, GoPlus and SlowMist agree). The registrar-compromise path is only reported by GoPlus as "likely" and is not confirmed; Flap says the root cause "remains under investigation". Flap states its domain "is currently affected by a DNS hijacking incident". GoPlus describes the clone sites, the two signature forms, the Safe and the StepDrainer attribution. The SlowMist tracker lists Flap on 2026-10-31 with method "DNS Hijacking" and no loss amount. No source read establishes the entry path into the registrar.

## Public references

- `[flap1xpost2026]` — Flap (@flapdotsh), initial warning (2026-10-31): <https://x.com/flapdotsh/status/2116352828734050339>
- `[flap2xpost2026]` — Flap (@flapdotsh), "Progress Update" (2026-10-31): <https://x.com/flapdotsh/status/2116400269445509360>
- `[goplusxpost2026]` — GoPlus Security, "GoPlus Security Alert" (2026-10-31): <https://x.com/GoPlusSecurity/status/2116443510412865653>
- `[slowmisthacked2026]` — SlowMist Hacked, Flap entry (2026-10-31): <https://hacked.slowmist.io/>
- `[rektradar20261031]` — RektRadar (secondary), "Web3 daily exploits 31 Oct 2026: Flap, Kintsu DNS StepDrainer": <https://www.rektradar.xyz/web3-daily-exploits-31-oct-2026-flap-kintsu-dns-stepdrainer/>
- Structural parallels: [`examples/2022-08-curve-dns-hijack.md`](2022-08-curve-dns-hijack.md), [`examples/2023-12-galxe-dns.md`](2023-12-galxe-dns.md).
