# Q1–Q2 2026 Key Compromise Cohort — Step Finance, IoTeX, Grinex, Gravity Bridge, Polymarket UMA — Aggregate ~$68.7M

**OAK Techniques observed:** OAK-T11.001, OAK-T10.001, OAK-T9.004

**Attribution:** **unattributed** (aggregate cohort).
**Loss:** Step Finance ~$40M (261,854 SOL unstaked from executive laptop compromise); IoTeX ~$8M ($4.4M in bridged assets drained from TokenSafe + 410M unbacked CIOTX minted on top); Grinex ~$15M (hot wallet drained across Tron and Ethereum); Gravity Bridge ~$5.4M (Cosmos bridge drained via suspected signer-key compromise — ~$4.3M USDC, 274 ETH ~$553K, $434K USDT, 14.164 PAYG ~$64K); Polymarket UMA CTF Adapter ~$660K (outdated administrative private key drained an internal reward/top-up wallet on Polygon — flagged by ZachXBT; user funds, market settlement, and core contracts unaffected). Aggregate ~$68.7M across five incidents, January–May 2026. Step Finance token (STEP) down 93% post-incident.

**Key teaching point:** Q1–Q2 2026 key-compromise incidents demonstrate that the private-key security model is only as strong as the human-and-device perimeter that protects the key material. Step Finance had audited contracts, bug bounties, and public security reviews — none of which mattered when an executive's laptop was compromised via social engineering. IoTeX's ioTube bridge concentrated administrative control in a single owner key; the bridge handed over every asset it protected when that key leaked. Grinex's hot wallet architecture placed signing keys on internet-connected infrastructure. The structural pattern across all three is identical: **the cryptographic primitive (private key) is correct; the access-control perimeter around the key material is not.**

## Summary

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2026-01-31 | Step Finance: executive laptop compromised via social engineering; attacker unstakes and drains 261,854 SOL (~$40M) in ~90 minutes; CertiK flags the bleeding; STEP token collapses 93% | **T11.001** (admin key compromise via social engineering) |
| 2026-01-31 (+1d) | Step Finance confirms: "most likely a social engineering attack" on executive devices; funds "have been transferred" to attacker wallet | (operator response) |
| 2026-02-21 | IoTeX: attacker obtains owner private key to ioTube bridge validator contract; drains $4.4M in real bridged assets from TokenSafe; mints 410M unbacked CIOTX tokens | **T11.001** (bridge validator key compromise), **T9.004** (single-key admin model) |
| 2026-02-21 (+90min) | Onchain investigator Specter reports $4.3M drained; PeckShield escalates to $8M; attacker swaps stolen funds to ETH and begins bridging to BTC via Thorchain | (third-party detection) |
| 2026-02-25 | IoTeX co-founder Raullen Chai tells The Block losses "around $2M" — three different figures circulate | (operator response — disputed) |
| 2026-04-16 | Grinex: hot wallet compromise across Tron and Ethereum; ~$15M extracted; attacker gains access to wallet signing infrastructure | **T11.001** (hot wallet key compromise) |
| 2026-05-22 | Polymarket UMA CTF Adapter (Polygon): an outdated administrative private key drains ~$660K from an internal reward/top-up wallet across two addresses; ZachXBT flags the outflows; the breach hits the proposer-incentive wallet, not contracts — user USDC, open positions, and market settlement are unaffected | **T11.001** (legacy admin-key compromise of an ops wallet) |
| 2026-05-30 | Gravity Bridge (Cosmos): ~$5.4M drained in a suspected signer-key compromise — ~$4.3M USDC, 274 ETH (~$553K), $434K USDT, 14.164 PAYG (~$64K); stolen funds routed through Binance and ChangeNOW | **T10.001** (bridge signer-key compromise), **T11.001** (signing-key compromise), **T7.002** (CEX deposit-address layering) |

## Step Finance — Executive Laptop Social Engineering

On January 31, 2026, an attacker compromised an executive's laptop at Step Finance — a Solana-focused DeFi protocol with audited contracts, bug bounties, and public security reviews. The attacker used the compromised device to unstake and drain 261,854 SOL (~$40M) in approximately 90 minutes. The smart contracts functioned correctly throughout; the attack required no exploit, no zero-day, and no protocol vulnerability. The attacker simply had the keys.

Step Finance's postmortem described the entry vector as "a well known attack vector" — the kind of phrasing consistent with a phishing email or credential-theft malware. The team's security posture (audits, bounties, public reviews) covered the smart-contract layer comprehensively but left the human-and-device perimeter unprotected. The STEP token fell 93% following the disclosure.

**OAK mapping:** Pure T11.001 — the signing key was obtained via social engineering on the device layer, not via a protocol or smart-contract vulnerability.

## IoTeX — Bridge Validator Single-Key Compromise

On February 21, 2026, an attacker obtained the owner private key to IoTeX's ioTube bridge validator contract. With that single key, the attacker held administrative control over every asset the bridge was holding. The execution was a four-step drain: (1) drain $4.4M in real bridged assets from the TokenSafe, (2) mint 410 million unbacked CIOTX tokens on top of the real-asset drain, (3) swap stolen funds to ETH, (4) begin bridging to BTC via Thorchain.

The structural vulnerability was the **single-key admin model**: the ioTube bridge concentrated all administrative authority (asset custody, token minting, validator set management) in one EOA private key. When that key leaked, the attacker inherited the full authority surface.

Onchain investigator Specter was first to flag the bleeding at $4.3M. PeckShield escalated to $8M within 90 minutes by counting both the bridged-asset drain and the unbacked CIOTX mint. IoTeX co-founder Raullen Chai told The Block losses were "around $2M" — three different figures circulated, illustrating the accounting complexity when both real assets and unbacked minted tokens are involved.

**OAK mapping:** T11.001 (private key compromise) + T9.004 (single-key admin anti-pattern — the bridge concentrated all authority in one EOA rather than a multisig or governance-timelock structure).

## Grinex — Hot Wallet Infrastructure Compromise

On April 16, 2026, Grinex suffered a hot wallet compromise across Tron and Ethereum, with ~$15M extracted. The attacker gained access to the wallet signing infrastructure — keys stored on internet-connected systems rather than cold-storage or hardware-security-module (HSM) architectures. The multi-chain surface (Tron + Ethereum) suggests the compromise was at the wallet-infrastructure layer rather than a chain-specific vulnerability.

Limited public postmortem detail is available; the incident is classified as T11.001 based on the DeFiLlama "Hot wallet hack" classification and the multi-chain extraction pattern consistent with signing-key compromise rather than smart-contract exploit.

**OAK mapping:** T11.001 (hot wallet signing-key compromise).

## Gravity Bridge — Cosmos Bridge Signer-Key Compromise

On May 30, 2026, the Cosmos-based **Gravity Bridge** was drained of ~$5.4M in what researchers characterised as a suspected key compromise. The stolen assets were a mixed basket: roughly $4.3M in USDC, 274 ETH (~$553K), $434K in USDT, and 14.164 PAYG tokens (~$64K). The attacker routed the proceeds through **Binance** and **ChangeNOW**, the standard CEX/instant-swap layering off-ramp.

Gravity Bridge is a Cosmos↔Ethereum bridge whose cross-chain transfers are authorised by a validator/signer set. A compromise of signer-key material — rather than a smart-contract logic flaw or a message-verification bypass — lets the attacker authorise withdrawals as if they were legitimate validator-approved transfers. The multi-asset, single-event drain is consistent with signer-key compromise (the attacker can move whatever the bridge holds) rather than a value-binding or encoding flaw (which typically targets a specific mint/payout path).

This makes Gravity the cohort's bridge-side analogue of IoTeX: both are bridge key-compromise events where the cryptography functioned correctly and the attacker simply held authorised signing capability. The distinction from the May-2026 message-verification bridge failures is important — Verus (economic-value-binding), Butter (hash-encoding-ambiguity), and Alephium (forged off-chain backend messages) all defeated or bypassed *verification* without holding keys; Gravity, by contrast, *held the keys*. The two families share a downstream effect (unauthorised bridge outflow) but diverge entirely in root cause and mitigation: Gravity's lesson is signer-key custody (HSM/threshold-signing, key-rotation, anomaly monitoring on validator signatures), not verification-predicate completeness.

**OAK mapping:** T10.001 (bridge validator/signer key compromise) + T11.001 (signing-key compromise at the infrastructure layer) + T7.002 (CEX deposit-address layering via Binance / ChangeNOW).

## Polymarket UMA CTF Adapter — Legacy Admin-Key Compromise of an Ops Wallet

On May 22, 2026, on-chain investigator ZachXBT flagged suspicious outflows tied to **Polymarket's UMA CTF (Conditional Token Framework) Adapter** infrastructure on Polygon — the layer that connects Polymarket's prediction markets to UMA's optimistic oracle for resolution. Roughly **$660K** was drained from two addresses via a related contract.

Crucially, the root cause was **not a smart-contract vulnerability** but a **compromised outdated administrative private key** used for internal operations — specifically a reward/top-up wallet that funds the proposer network keeping the oracle system running. Draining that wallet did **not** affect whether markets resolve correctly, whether user USDC deposits are safe, or whether open positions settle at the correct price; Polymarket stressed that customer wallets, active positions, and settlement systems were uncompromised. What it affected was Polymarket's ability to *incentivise* the proposer network.

The incident is the cohort's **legacy-admin-key** variant: an old operational key, retained and still privileged long after its active use, became the single point of failure. It rhymes with the broader 2026 theme that *deprecated-but-still-authorised* credentials and contracts are a recurring attack surface (cf. DxSale's legacy lockers in `examples/2026-05-dxsale-legacy-locker-backdoor.md`, and the Polymarket-adjacent observation that "outdated administrative key" — not core infrastructure — was the breach point). It also lands on a DAO/oracle-governance surface: the UMA-Polymarket resolution stack is governance-critical infrastructure, and the compromise degraded the economic incentives that keep its proposer network honest, even though settlement math was untouched.

**OAK mapping:** T11.001 (compromise of an outdated administrative private key controlling an operational/reward wallet; not a contract exploit).

## Public references

- [Step Finance — Rekt](https://rekt.news/step-finance-rekt/) — primary forensic narrative: executive laptop social engineering, 261,854 SOL drained
- [IoTeX — Rekt](https://rekt.news/iotex-rekt/) — primary forensic narrative: ioTube bridge validator key leak, 410M unbacked CIOTX minted
- CertiK Alert — Step Finance first responder
- PeckShield Alert — IoTeX escalation from $4.3M to $8M
- Onchain investigator Specter — IoTeX first detection
- Grinex incident: DeFiLlama classification as "Hot wallet hack"
- [Gravity Bridge — The Block](https://www.theblock.co/post/403108/cosmos-based-gravity-bridge-drained-of-5-4-million-in-suspected-key-compromise-researchers-say) — "Cosmos-based Gravity Bridge drained of $5.4 million in suspected key compromise, researchers say"
- [Gravity Bridge — Bitcoin.com News](https://news.bitcoin.com/gravity-bridge-exploit-5-4-million-binance-changenow-2026/) — "Gravity Bridge Drained of $5.4 Million as Hacker Routes Stolen Funds Through Binance" (asset breakdown; Binance / ChangeNOW laundering path)
- [Polymarket UMA — The Block](https://www.theblock.co/post/402327/zachxbt-flags-suspected-exploit-involving-polymarkets-uma-adapter-contract-on-polygon) — "Polymarket probes suspected private key compromise of internal top-up wallet on Polygon" (ZachXBT flag; ~$660K; outdated admin key, not contract vuln)
- [Polymarket UMA — Crypto Times](https://www.cryptotimes.io/2026/05/22/polymarket-ops-wallet-drained-700k-user-funds-unaffected/) — "Polymarket Ops Wallet Drained $700K — User Funds Unaffected"
- Cross-reference: T11.001 at `techniques/T11.001-third-party-signing-vendor-compromise.md`; T10.001 at `techniques/T10.001-validator-signer-key-compromise.md`; T7.002 at `techniques/T7.002-cex-deposit-layering.md`; T9.004 at `techniques/T9.004-access-control-misconfiguration.md`

## Discussion

The Q1–Q2 2026 key-compromise cohort reinforces the pattern that dominated 2025: **private key compromise is the highest-frequency, highest-loss attack vector in on-chain crime, and the loss magnitude is not correlated with protocol security sophistication.** Step Finance had the full security checklist (audits, bounties, reviews) and lost $40M because an executive's laptop was compromised. IoTeX's bridge had a single-key admin model that turned a key leak into a total asset drain. Grinex's hot wallet architecture placed signing keys where an infrastructure compromise could reach them.

The defender lesson is that **key-management architecture is a load-bearing security property independent of smart-contract security.** A protocol with perfect smart-contract code and a single-signer admin key is less secure than a protocol with average smart-contract code and a 4-of-7 multisig with hardware-signer distribution. The Step Finance case is canonical: the audits and bug bounties were genuine, but they secured the wrong layer.

The three incidents also illustrate the **detection-to-disclosure latency problem**: Step Finance's drain was detected by CertiK within minutes but the team took ~24 hours to confirm. IoTeX's loss figure ranged from $2M to $8M depending on the accounting methodology. Grinex has minimal public postmortem detail. The variance in disclosure quality is itself a security signal — protocols with clear, prompt, numerically-precise postmortems demonstrate the operational maturity to manage key-material risk; protocols without it may not know the full extent of their own key-material exposure.
