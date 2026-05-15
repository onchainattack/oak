# OAK-G01 — Lazarus Group / DPRK-attributed crypto theft

**Aliases:** APT38, BlueNoroff, Hidden Cobra, Andariel, "TraderTraitor" (FBI naming for DPRK crypto-theft cluster).
**First observed in crypto:** approximately 2017 (Sony Pictures intrusions and SWIFT-targeting predate; crypto pivot consolidated 2017–2018).
**Attribution status:** **confirmed** by FBI public statements, U.S. Treasury OFAC designations, U.S. Department of Justice indictments, and multiple national CERT bodies (KISA, NCSC, BSI). Attribution to the Reconnaissance General Bureau of the DPRK is the standing public position of the U.S. government.
**Active:** yes (as of v0.1).

## Description

Lazarus Group is the public umbrella label for state-aligned cyber-theft activity attributed to the Democratic People's Republic of Korea, with crypto-asset theft now its dominant revenue-generating activity. Per `[chainalysis2024dprk]`, North Korean actors stole approximately \$1.34B across 47 incidents in 2024 (61% of all attacker-stolen value globally that year), with the 2025 figure reported at approximately \$2.02B (a 51% year-on-year increase) and all-time totals exceeding \$6.75B. The single largest attributed event to date is the Bybit exchange theft of February 21, 2025 (\~\$1.46–\$1.5B in ETH equivalent).

Operationally, Lazarus's modern crypto-theft playbook combines social engineering (notably LinkedIn-delivered fake-job-offer phishing payloads against engineering staff at exchanges, bridge operators, and infrastructure vendors), software-supply-chain compromise of third-party tooling (the Bybit case implicated a multisig-platform vendor's developer workstation), private-key extraction from validator and signing infrastructure, and laundering through mixers and cross-chain bridges (`[ofac2022tornado]` is part of this story; post-2022 laundering routes have shifted across services as enforcement landed). FBI's "TraderTraitor" naming captures the social-engineering-led intrusion vector that connects most modern incidents.

## Targeting profile

- **Centralised exchanges:** Bybit (Feb 2025), WazirX (Jul 2024), Atomic Wallet (Jun 2023), Stake.com (Sep 2023), KuCoin (2020), and many others.
- **Cross-chain bridges:** Ronin (Mar 2022), Harmony Horizon (Jun 2022).
- **Individual high-balance wallets:** small-N but high-value, typically follow-on after broader infrastructure compromise.
- **Infrastructure vendors and DeFi tooling:** supply-chain compromise as a force multiplier (e.g., Safe{Wallet} workstation compromise per the Bybit case).

## Observed Techniques

- **OAK-T7.001 (Mixer-Routed Hop)** — extensive Tornado Cash usage through 2022; post-2022 shift to alternate mixers as a partial / earlier-stage component of the broader laundering chain.
- **OAK-T7.003 (Cross-Chain Bridge Laundering)** — the dominant post-2022 Lazarus laundering rail. Per `[chainalysisbybitthorchain]` (Chainalysis's primary attribution for the operator-fee figure, wrapped by `[coindeskthorchainlazarus2025]` for narrative reporting) and `[chainalysis2024laundering]`, the OAK-G01 Lazarus Group laundered the full \~\$1.4B of Bybit-extracted ETH through THORChain in approximately 10 days post-extraction (THORChain node operators collectively earned at least \~\$12M in fees from the operation; figure is `verified-with-caveat` at v0.1 — single primary source for the precise dollar amount).
- **OAK-T7.006 (DeFi Yield-Strategy Laundering)** — post-Tornado-Cash-sanctions shift from mixer services to DeFi yield protocols (Aave, Compound, Lido, Yearn, Convex) as "yield user" cover for laundering; documented by Chainalysis `[chainalysis2024laundering]` as the structural laundering-infrastructure shift across 2023–2025; G01 is the highest-volume documented cluster using this technique at scale.
- **OAK-T7.002 (CEX Deposit-Address Layering)** — downstream off-ramp Technique; per-cluster aggregate inflow tracking against OAK-G01 watchlists is the canonical compliance-side detection.
- **OAK-T8.001 (Common-Funder Cluster Reuse)** — sustained operator continuity is a defining feature; Lazarus wallet clusters are tracked across incidents by major industry forensics providers.
- **OAK-T10.001 (Validator / Signer Key Compromise)** — the canonical Lazarus bridge-targeting Technique. Ronin (March 2022) and Harmony Horizon (June 2022) are both T10.001 + G01 cases.
- **OAK-T11.001 (Third-Party Signing/Custody Vendor Compromise)** — the canonical Lazarus exchange/custody-targeting Technique post-2023. Bybit (Feb 2025), WazirX (July 2024). Atomic Wallet (June 2023) is the related T11.002 case.
- **OAK-T11.002 (Wallet-Software Distribution Compromise)** — Atomic Wallet (June 2023) canonical case targeting end-user self-custodial wallets at scale.
- **OAK-T11.003 (In-Use Multisig Smart-Contract Manipulation)** — WazirX (July 2024) canonical case (chained from T11.001 entry vector).
- **OAK-T9.004 (Access-Control Misconfiguration)** — the Wormhole bridge incident is *not* Lazarus-attributed and is a separate operator's activity, but the bridge-class targeting profile overlaps with cases that *are* Lazarus-attributed.
- **Pre-incident vectors not yet in OAK:** social-engineering as an off-chain entry vector (LinkedIn fake-job-offer payload delivery; supply-chain compromise of vendor developer workstations). These are out of scope for OAK's on-chain Tactic taxonomy but are documented here because they are the dominant Lazarus entry vector in 2022-2025.

## Observed Examples

- [`examples/2022-03-ronin-bridge.md`](../examples/2022-03-ronin-bridge.md) — \~\$625M Ronin Bridge validator-key compromise via LinkedIn-delivered social-engineering payload; FBI public attribution April 2022; \>\$468M of proceeds laundered through Tornado Cash. Canonical OAK-T10.001 + G01 case.
- Harmony Horizon Bridge (June 2022) — \~\$100M, 2-of-5 multisig compromise; FBI Lazarus attribution; \~\$96M laundered through Tornado Cash. Worked example pending v0.x; referenced under OAK-T10.001 inline.
- [`examples/2023-06-atomic-wallet.md`](../examples/2023-06-atomic-wallet.md) — \~\$100M+ across \~5,500 end-user wallets via wallet-software distribution compromise. Canonical OAK-T11.002 case. Multi-rail downstream laundering — Garantex (OAK-G03) was one observable downstream surface, alongside mixers (Sinbad and adjacent), and chain-hopping rails per `[ellipticatomic2023]`.
- [`examples/2024-07-wazirx.md`](../examples/2024-07-wazirx.md) — \~\$234.9M via third-party custody (Liminal) compromise + multisig contract manipulation. Canonical OAK-T11.001 + T11.003 case. \~85% returned to users via 2025-10 restructuring scheme.
- [`examples/2025-02-bybit.md`](../examples/2025-02-bybit.md) — \~\$1.46B Safe{Wallet} third-party-vendor supply-chain compromise leading to cold-wallet transfer redirection. Canonical OAK-T11.001 case. The single largest crypto-theft event on the public record.
- [`examples/2025-02-bybit-thorchain-laundering.md`](../examples/2025-02-bybit-thorchain-laundering.md) — the post-extraction T7.003 laundering chain (\~\$1.4B routed through THORChain in \~10 days; \$12M to THORChain node operators in fees).
- [`examples/2017-06-bithumb.md`](../examples/2017-06-bithumb.md) — Bithumb employee-laptop compromise + downstream phishing wave
- [`examples/2017-12-nicehash.md`](../examples/2017-12-nicehash.md) — NiceHash mining-marketplace wallet compromise
- [`examples/2018-01-coincheck.md`](../examples/2018-01-coincheck.md) — Coincheck exchange hot-wallet theft
- [`examples/2018-06-coinrail.md`](../examples/2018-06-coinrail.md) — Coinrail exchange compromise
- [`examples/2019-03-dragonex.md`](../examples/2019-03-dragonex.md) — DragonEx exchange compromise
- [`examples/2019-11-upbit.md`](../examples/2019-11-upbit.md) — Upbit exchange hot-wallet drain
- [`examples/2020-09-kucoin.md`](../examples/2020-09-kucoin.md) — KuCoin exchange hot-wallet theft
- [`examples/2021-08-liquid-global.md`](../examples/2021-08-liquid-global.md) — Liquid Global warm-wallet compromise (~\$91M); inferred-strong G01 attribution with G08 (BlueNoroff) macOS-tooling fingerprint overlap.
- [`examples/2021-12-ascendex.md`](../examples/2021-12-ascendex.md) — AscendEX hot-wallet compromise (~\$77.7M) across ETH/BSC/Polygon; inferred-strong G01 attribution.
- [`examples/2022-06-harmony-horizon.md`](../examples/2022-06-harmony-horizon.md) — Harmony Horizon Bridge
- [`examples/2023-09-coinex.md`](../examples/2023-09-coinex.md) — CoinEx hot-wallet theft
- [`examples/2023-09-stake-com.md`](../examples/2023-09-stake-com.md) — Stake.com hot-wallet theft
- [`examples/2023-11-htx-heco-bridge.md`](../examples/2023-11-htx-heco-bridge.md) — HTX hot wallet + HECO Bridge
- [`examples/2023-11-poloniex.md`](../examples/2023-11-poloniex.md) — Poloniex hot-wallet drain
- [`examples/2024-01-concentric.md`](../examples/2024-01-concentric.md) — Concentric Finance multisig signing-key social-engineering compromise
- [`examples/2024-01-orbit-bridge.md`](../examples/2024-01-orbit-bridge.md) — Orbit Bridge
- [`examples/2024-02-fixedfloat.md`](../examples/2024-02-fixedfloat.md) — FixedFloat instant-swap hot-wallet drain
- [`examples/2024-05-dmm-bitcoin.md`](../examples/2024-05-dmm-bitcoin.md) — DMM Bitcoin hot-wallet theft
- [`examples/2024-09-bingx.md`](../examples/2024-09-bingx.md) — BingX hot-wallet drain
- [`examples/2024-09-indodax.md`](../examples/2024-09-indodax.md) — Indodax hot-wallet drain
- [`examples/2024-10-radiant-capital.md`](../examples/2024-10-radiant-capital.md) — Radiant Capital cross-chain lending compromise
- [`examples/2025-01-phemex.md`](../examples/2025-01-phemex.md) — Phemex hot-wallet theft
- [`examples/2025-04-exch-shutdown.md`](../examples/2025-04-exch-shutdown.md) — eXch instant-exchange shutdown (laundering-rail substrate; G01 customer-cohort attribution)
- [`examples/2025-07-coindcx.md`](../examples/2025-07-coindcx.md) — CoinDCX operational-wallet drain
- [`examples/2025-09-sbi-crypto.md`](../examples/2025-09-sbi-crypto.md) — SBI Crypto mining-pool drain
- [`examples/2023-07-multichain.md`](../examples/2023-07-multichain.md) — Multichain cross-chain protocol compromise
- [`examples/2025-02-infini.md`](../examples/2025-02-infini.md) — Infini neobank treasury drain
- [`examples/2024-01-post-tornado-defi-yield-laundering.md`](../examples/2024-01-post-tornado-defi-yield-laundering.md) — Post-Tornado-Cash DeFi yield-protocol laundering shift (T7.006 pattern case); G01 is the principal documented cluster using DeFi yield protocols as laundering cover at scale.
- [`examples/2017-04-yapizon.md`](../examples/2017-04-yapizon.md) — Yapizon (Youbit) exchange hack; DPRK Lazarus Group first-strike against a South Korean exchange (~$5.6M)
- [`examples/2018-06-bithumb.md`](../examples/2018-06-bithumb.md) — Bithumb exchange hot-wallet compromise; largest DPRK-attributed exchange theft of 2017-2018 wave (~$31M)
- [`examples/2018-2025-dprk-it-worker-exchange-account-farming.md`](../examples/2018-2025-dprk-it-worker-exchange-account-farming.md) — DPRK IT worker exchange account farming scheme; canonical T8.004 anchor
- [`examples/2019-05-binance-hot-wallet.md`](../examples/2019-05-binance-hot-wallet.md) — Binance hot-wallet compromise; canonical pre-Bybit DPRK exchange-vendor compromise (~$40M)
- [`examples/2020-2023-lazarus-group-200m-laundering.md`](../examples/2020-2023-lazarus-group-200m-laundering.md) — Lazarus Group $200M fiat cash-out from 25+ hacks over 2020-2023
- [`examples/2022-06-harmony-horizon-bridge.md`](../examples/2022-06-harmony-horizon-bridge.md) — Harmony Horizon Bridge light-client verification bypass; Lazarus-attributed (~$100M)
- [`examples/2022-06-harmony-horizon-economic-incentive-gap.md`](../examples/2022-06-harmony-horizon-economic-incentive-gap.md) — Harmony Horizon Bridge validator economic-incentive gap; Lazarus-attributed (~$100M)
- [`examples/2023-07-alphapo.md`](../examples/2023-07-alphapo.md) — Alphapo payment-processor hot-wallet compromise (~$60M+)
- [`examples/2023-2025-dprk-post-tornado-cash-aggregator-laundering.md`](../examples/2023-2025-dprk-post-tornado-cash-aggregator-laundering.md) — DPRK post-Tornado-Cash aggregator laundering (2023-2025)
- [`examples/2024-01-coinspaid-lazarus-endpoint-compromise.md`](../examples/2024-01-coinspaid-lazarus-endpoint-compromise.md) — CoinsPaid Lazarus endpoint compromise (January 2024)
- [`examples/2024-01-dprk-chain-hop-laundering.md`](../examples/2024-01-dprk-chain-hop-laundering.md) — DPRK chain-hop laundering pattern (January 2024)
- [`examples/2024-08-dprk-it-worker-infiltration.md`](../examples/2024-08-dprk-it-worker-infiltration.md) — DPRK IT worker infiltration into crypto companies (August 2024)
- [`examples/2024-2026-solana-npm-trader-key-exfiltration.md`](../examples/2024-2026-solana-npm-trader-key-exfiltration.md) — Solana npm trader-tooling supply-chain key exfiltration cohort
- [`examples/2024-post-tornado-defi-yield-laundering.md`](../examples/2024-post-tornado-defi-yield-laundering.md) — Post-Tornado-Cash DeFi yield-protocol laundering shift (T7.006 pattern case)
- [`examples/2026-04-drift-protocol-durable-nonces-dprk.md`](../examples/2026-04-drift-protocol-durable-nonces-dprk.md) — Drift Protocol durable nonces DPRK exploitation

## Citations

- `[chainalysis2024dprk]` — DPRK-attributed scale (2024 \$1.34B / 47 incidents; 2025 \$2.02B; cumulative \>\$6.75B per Chainalysis).
- `[ellipticronin2022]` — Ronin Bridge forensic write-up, FBI / Treasury attribution.
- `[ofac2022tornado]` — Tornado Cash designation cites Lazarus-attributed laundering volume as part of the legal basis.
- (Bybit-specific citations live in the Bybit worked example.)

## Discussion

Lazarus's attribution evolution over 2017–2025 is a case study in itself. Early activity (2017–2019) was attributed primarily through malware-fingerprint and infrastructure-reuse analysis; the wallet-cluster forensics layer became a major attribution surface from 2020 onward as Chainalysis, Elliptic, and TRM Labs published cluster analyses with FBI-corroborated attribution. The 2025 Bybit case combined off-chain (social-engineering, supply-chain compromise) and on-chain (wallet-cluster, bridge-and-mix laundering pattern) attribution surfaces to produce one of the fastest public attributions in industry history (FBI IC3 PSA published within five days of the event).

For OAK contributors writing future Lazarus-attributed examples: preserve the distinction between *confirmed* attribution (FBI / Treasury / DOJ public statements) and *inferred-strong* attribution (industry-forensic-only). The Bybit and Ronin cases are confirmed; many smaller incidents in the cohort are inferred-strong only and should be marked as such in the example header.
