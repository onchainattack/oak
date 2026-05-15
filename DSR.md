# OAK Data Source Schema Registry (DSR) v0.1.0

**Status:** draft  
**Maintainer:** @iZonex  
**Target audience:** detection-engine implementors, data-platform engineers  

This document defines the concrete schema, provider binding, and ingestion pattern for
every logical data source referenced in OAK detection specs' `data_sources` field.
It is the normative bridge between pseudocode and reality — without it, a developer
cannot ingest the data that pseudocode iterates over.

---

## 1. Schema format

Each data source entry follows this template:

```yaml
name: <logical name matching data_sources field>
description: <1-2 sentences>
usage_count: <# of specs referencing it>
schema:
  # Field-level JSON Schema (simplified)
ingestion:
  pattern: <polling | subscription | on_demand | one_shot>
  cadence: <per-block | per-slot | per-hour | on-upgrade | on-event>
  latency: <real-time | seconds | minutes | hours | days>
providers:
  - name: <real-world provider>
    access: <RPC method | GraphQL endpoint | REST API | SDK | file>
    chain: <evm | solana | cross-chain>
    cost_tier: <free | rate-limited | paid>
    coverage_note: <what is and isn't covered>
```

## 2. Core data sources (top 25 by spec usage)

---

### 2.1 `funder_graph`

**51 specs** — the single most-used data source across OAK. Every T1-T5, T7-T8,
and T15 spec depends on it.

```
Cross-address funding-relationship graph. Maps every address to its funding sources
(CEX withdrawal, mixer withdrawal, peer transfer, smart-contract disbursement)
and recipients, with attributed entity clustering.
```

Schema (per address):
```json
{
  "address": "0x...",
  "entity_cluster": "OAK-G01" | "cluster_0xabc" | null,
  "funding_sources": [
    {
      "source_address": "0x...",
      "source_entity": "Binance" | "Kraken" | null,
      "source_type": "cex_withdrawal" | "mixer_withdrawal" | "peer_transfer"
                      | "contract_disbursement" | "bridge_deposit" | "unknown",
      "first_value_usd": 12345.67,
      "first_timestamp": "2024-01-15T10:30:00Z",
      "hop_distance": 1
    }
  ],
  "funding_recipients": [
    {
      "recipient_address": "0x...",
      "recipient_entity": "entity_label" | null,
      "total_value_usd": 12345.67,
      "last_timestamp": "2024-06-20T14:00:00Z"
    }
  ],
  "total_received_usd": 100000.00,
  "total_sent_usd": 95000.00,
  "first_activity_timestamp": "2023-01-01T00:00:00Z",
  "last_activity_timestamp": "2026-05-15T12:00:00Z",
  "active_chains": ["ethereum", "bsc", "polygon"]
}
```

Ingestion:
- **pattern:** subscription (incremental updates) + on_demand (cluster expansion)
- **cadence:** per-block for new addresses; daily re-clustering
- **latency:** near-real-time (seconds) for funding links; hours for entity attribution
- **providers:**
  - `mg-detectors-rs` — EVM + Solana funder graph, Apache 2.0, self-hosted
  - `chainalysis-reactor` — cross-chain attribution, paid, API
  - `trm-forensics` — cross-chain attribution, paid, API
  - `elliptic-navigator` — cross-chain attribution, paid, API

---

### 2.2 `tx_call_trace`

**34 specs.** Internal transaction call traces. The primary data source for T9 (smart-contract
exploit) and T10 (bridge) detection.

Schema (per transaction):
```json
{
  "tx_hash": "0x...",
  "block_number": 18500000,
  "block_timestamp": "2024-01-15T10:30:00Z",
  "from": "0x...",
  "to": "0x..." | null,
  "value_wei": "0",
  "status": true,
  "gas_used": 150000,
  "call_trace": {
    "type": "CALL" | "DELEGATECALL" | "STATICCALL" | "CREATE" | "CREATE2" | "SELFDESTRUCT",
    "from": "0x...",
    "to": "0x...",
    "input": "0x...",
    "output": "0x...",
    "value_wei": "0",
    "gas_used": 50000,
    "error": null | "revert" | "out_of_gas",
    "calls": [ /* recursive call_trace[] */ ]
  },
  "balance_diff": {
    "0x...": { "before": "1000000000000000000", "after": "500000000000000000" }
  },
  "state_diff": {
    "0x...": {
      "storage": {
        "0x...": { "before": "0x...", "after": "0x..." }
      }
    }
  }
}
```

Ingestion:
- **pattern:** subscription (per-block streaming)
- **cadence:** per-block
- **latency:** real-time (seconds after block finalization)
- **providers:**
  - `erigon-archive` — `trace_block` / `debug_traceTransaction`, self-hosted
  - `quicknode-trace-api` — rate-limited, paid tiers
  - `alchemy-trace-api` — rate-limited, paid tiers
  - `chainstack-trace` — rate-limited, paid tiers

The EVM trace format is chain-agnostic (works for Ethereum, Polygon, BSC, Avalanche,
Arbitrum, Optimism, Base). Solana traces use `solana_tx_call_trace` (see §3.4).

---

### 2.3 `contract_bytecode`

**32 specs.** Deployed contract bytecode. Used by static-analysis PATHs across
T1, T6, T9, T10, T13.

Schema (per contract):
```json
{
  "address": "0x...",
  "chain": "ethereum",
  "deployment_block": 18000000,
  "deployment_tx": "0x...",
  "deployer": "0x...",
  "bytecode": "0x60806040...",
  "bytecode_hash": "0x...",
  "has_verified_source": true,
  "source_verification_platform": "etherscan" | "sourcify" | null,
  "compiler_version": "v0.8.23+commit.f704f362",
  "compiler_settings": {
    "optimizer": true,
    "runs": 200,
    "evm_version": "paris"
  },
  "opcode_stats": {
    "CALL": 12,
    "DELEGATECALL": 2,
    "STATICCALL": 8,
    "SELFDESTRUCT": 0,
    "SSTORE": 45,
    "SLOAD": 120
  },
  "selector_to_function": {
    "0xa9059cbb": "transfer(address,uint256)",
    "0x095ea7b3": "approve(address,uint256)"
  },
  "proxy_pattern": "eip1967" | "uups" | "transparent" | "diamond" | "none" | null,
  "erc_standards": ["ERC20", "ERC721"]
}
```

Ingestion:
- **pattern:** on_demand (lazy fetch) + subscription (new deployments)
- **cadence:** per-deployment for new contracts; cached with revalidation on upgrade
- **latency:** seconds (RPC eth_getCode)
- **providers:**
  - `etherscan-api` — eth_getCode + verified source metadata, rate-limited
  - `sourcify` — verified source + recompilable metadata, free
  - `blockscout-api` — multi-chain, free
  - `dune-community` — bytecode tables via Dune SQL, free with rate limits

---

### 2.4 `dex_trades`

**29 specs.** Decentralized exchange swap events. Primary data source for T5 (sandwich/MEV),
T9 (oracle/price manipulation), T14 (LRT pricing), T17 (market manipulation).

Schema (per trade):
```json
{
  "tx_hash": "0x...",
  "block_number": 18500000,
  "log_index": 42,
  "timestamp": "2024-01-15T10:30:00Z",
  "dex": "uniswap_v3" | "pancakeswap_v2" | "raydium" | "orca" | ...,
  "pool_address": "0x...",
  "token_in": {
    "address": "0x...",
    "symbol": "WETH",
    "decimals": 18,
    "amount": "1000000000000000000",
    "amount_ui": 1.0
  },
  "token_out": {
    "address": "0x...",
    "symbol": "USDC",
    "decimals": 6,
    "amount": "3500000000",
    "amount_ui": 3500.0
  },
  "price_in_quote": 3500.0,
  "price_usd": 3500.0,
  "trader": "0x...",
  "is_aggregator_route": false,
  "route_path": ["0x...", "0x..."] | null,
  "is_multi_hop": false
}
```

Ingestion:
- **pattern:** subscription (per-block), batch (historical backfill)
- **cadence:** per-block
- **latency:** near-real-time (seconds)
- **providers:**
  - `dune` — `dex.trades` table via Dune SQL, free with rate limits
  - `the-graph` — per-DEX subgraphs (Uniswap, SushiSwap, Curve, Balancer...), free
  - `defillama` — aggregated DEX volume, free API
  - `dex-aggregator-api` — 1inch/0x/Paraswap quote APIs, rate-limited
  - `geckoterminal` — DEX trades REST API, free tier available

---

### 2.5 `contract_events`

**22 specs.** Raw contract event logs (eth_getLogs equivalent). Used for event-driven
detection across all Tactic families.

Schema (per event log):
```json
{
  "address": "0x...",
  "block_number": 18500000,
  "tx_hash": "0x...",
  "tx_index": 5,
  "log_index": 42,
  "block_timestamp": "2024-01-15T10:30:00Z",
  "topics": ["0x...", "0x...", "0x..."],
  "data": "0x...",
  "removed": false,
  "decoded": {
    "signature": "Transfer(address indexed from, address indexed to, uint256 value)",
    "name": "Transfer",
    "params": {
      "from": "0x...",
      "to": "0x...",
      "value": "1000000000000000000"
    }
  }
}
```

Ingestion:
- **pattern:** subscription (eth_getLogs polling or WebSocket)
- **cadence:** per-block polling; WebSocket subscription for low-latency
- **latency:** real-time (WebSocket), seconds (polling)
- **providers:**
  - `ethereum-json-rpc` — `eth_getLogs`, `eth_subscribe`, any node provider
  - `the-graph` — decoded events via GraphQL subgraphs, free
  - `alchemy-webhooks` — push-based event notifications, paid
  - `quicknode-streams` — push-based, paid

---

### 2.6 `contract_storage`

**20 specs.** Per-slot storage values. Used for state-invariant verification
(bridge TVL, vault NAV, proxy admin slots, validator stakes).

Schema (per storage read):
```json
{
  "contract_address": "0x...",
  "slot": "0x...",
  "slot_label": "owner" | "implementation" | "totalSupply" | "validator_stake_42" | null,
  "value": "0x...",
  "value_decoded": "0x...",
  "block_number": 18500000,
  "block_timestamp": "2024-01-15T10:30:00Z"
}
```

Ingestion:
- **pattern:** on_demand (eth_getStorageAt) + batch (eth_getProof for Merkle-verified reads)
- **cadence:** per-detection-cycle (driven by PATH schedule)
- **latency:** real-time (RPC call)
- **providers:**
  - `ethereum-json-rpc` — `eth_getStorageAt`, any node provider
  - `chainstack` — archive node storage reads, paid
  - `dune` — decoded storage via contract ABIs in Dune SQL, free

---

### 2.7 `governance_events`

**10 specs.** Governance proposal lifecycle events (created, queued, executed, cancelled).
Used by T9.003, T10.006, T16.

Schema (per governance event):
```json
{
  "governance_contract": "0x...",
  "chain": "ethereum",
  "event_type": "ProposalCreated" | "ProposalQueued" | "ProposalExecuted"
              | "ProposalCanceled" | "VoteCast" | "TimelockChange",
  "proposal_id": "42",
  "proposer": "0x...",
  "tx_hash": "0x...",
  "block_number": 18500000,
  "timestamp": "2024-01-15T10:30:00Z",
  "decoded_params": {
    "targets": ["0x..."],
    "values": ["0"],
    "signatures": ["transfer(address,uint256)"],
    "calldatas": ["0x..."],
    "description": "Proposal #42: Upgrade bridge validator set"
  },
  "vote_counts": {
    "for": "100000000000000000000",
    "against": "5000000000000000000",
    "abstain": "1000000000000000000"
  },
  "quorum_reached": true,
  "execution_eta": "2024-01-17T10:30:00Z",
  "executed_at": "2024-01-17T10:30:05Z",
  "timelock_delay_seconds": 172800
}
```

Ingestion:
- **pattern:** subscription (per-block event polling)
- **cadence:** per-block
- **latency:** near-real-time (seconds)
- **providers:**
  - `tally-api` — multi-DAO governance events, REST API, free for public DAOs
  - `boardroom-api` — governance aggregation, paid
  - `the-graph-governor` — OpenZeppelin Governor subgraph, free
  - `contract-events` — raw Governance contract events via eth_getLogs

---

### 2.8 `contract_source`

**8 specs.** Verified Solidity/Vyper source code and metadata. Used by T6 (defense evasion)
and T9 (pre-deployment audit) specs.

Schema (per verified contract):
```json
{
  "address": "0x...",
  "chain": "ethereum",
  "source_code": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n...",
  "compiler": {
    "name": "solc",
    "version": "v0.8.23+commit.f704f362",
    "optimizer": true,
    "runs": 200,
    "evm_version": "paris"
  },
  "metadata": {
    "contract_name": "TokenVault",
    "source_hash": "0x...",
    "metadata_hash": "0x...",
    "license": "MIT",
    "imports": [
      "@openzeppelin/contracts/token/ERC20/ERC20.sol",
      "@openzeppelin/contracts/access/Ownable.sol"
    ]
  },
  "verification": {
    "platform": "etherscan",
    "status": "verified",
    "match_type": "full" | "partial",
    "verified_at": "2024-01-15T10:30:00Z"
  },
  "abi": [ /* standard Ethereum ABI JSON */ ]
}
```

Ingestion:
- **pattern:** on_demand (contract address → verified source)
- **cadence:** at detection cycle; cached
- **latency:** seconds (API fetch)
- **providers:**
  - `etherscan-api` — multi-chain (Etherscan, BscScan, PolygonScan...), rate-limited
  - `sourcify` — decentralized, IPFS-backed, free, full metadata
  - `blockscout-api` — multi-chain, free

---

### 2.9 `certificate_transparency_log`

**8 specs.** Certificate Transparency log entries for TLS certificates. Used by T4, T11
(phishing domain detection, typosquat surveillance).

Schema (per CT entry):
```json
{
  "log": "google-argon2024" | "cloudflare-nimbus2024" | ...,
  "index": 1234567890,
  "timestamp": "2024-01-15T10:30:00Z",
  "certificate": {
    "serial_number": "0x...",
    "issuer": "C=US, O=Let's Encrypt, CN=R11",
    "subject": "CN=ledger-live.com",
    "not_before": "2024-01-14T00:00:00Z",
    "not_after": "2024-04-13T00:00:00Z",
    "san_domains": ["ledger-live.com", "www.ledger-live.com"],
    "is_wildcard": false,
    "is_ev": false
  }
}
```

Ingestion:
- **pattern:** subscription (CT log streaming)
- **cadence:** continuous (near-real-time as logs are published)
- **latency:** minutes to hours (CT log inclusion delay)
- **providers:**
  - `certspotter-api` — SSLMate CertSpotter, free REST API
  - `crt-sh` — certificate transparency search, free web/REST
  - `google-ct-logs` — direct CT log monitoring, self-hosted

---

### 2.10 `simulation_environment`

**7 specs.** Forked-chain simulation for "what-if" detection. Used by PATH_B patterns
that test worst-case scenarios (setFee(MAX), process invalid message).

Schema (execution result):
```json
{
  "fork_block": 18500000,
  "fork_chain_id": 1,
  "simulations": [
    {
      "label": "setFee(MAX)_from_owner",
      "tx": {
        "from": "0x...",
        "to": "0x...",
        "input": "0x...",
        "value": "0"
      },
      "state_overrides": {
        "0x...": { "balance": "0x..." }
      },
      "result": {
        "succeeded": true,
        "return_data": "0x...",
        "gas_used": 85000,
        "logs": [ /* decoded event logs */ ],
        "state_diff": { /* storage changes */ }
      }
    }
  ]
}
```

Ingestion:
- **pattern:** on_demand (one simulation per detection cycle)
- **cadence:** per-detection-cycle
- **latency:** seconds (RPC fork + execution)
- **providers:**
  - `tenderly-virtualnet` — API for forked simulations, paid
  - `anvil` — local forked node (Foundry), free, self-hosted
  - `ganache` — local forked node (Hardhat), free, self-hosted

---

### 2.11 `domain_registration`

**7 specs.** New domain registration feed. Used by T4 (phishing domain detection)
and T11 (typosquat surveillance).

Schema (per registration):
```json
{
  "domain": "ledger-live.com",
  "tld": ".com",
  "registered_at": "2024-01-15T00:00:00Z",
  "expires_at": "2025-01-15T00:00:00Z",
  "registrar": "Namecheap" | "GoDaddy" | "Porkbun" | ...,
  "registrant": {
    "organization": "Privacy Service Provider" | "Acme Corp" | "REDACTED FOR PRIVACY",
    "country": "US" | "RU" | "CN" | "PA" | null
  },
  "nameservers": ["ns1.example.com", "ns2.example.com"],
  "hosting": {
    "ip_addresses": ["1.2.3.4"],
    "asn": 12345,
    "asn_org": "Cloudflare" | "AWS" | "DDoS-Guard" | ...,
    "country": "US"
  },
  "has_mx_record": true,
  "has_spf": false
}
```

Ingestion:
- **pattern:** subscription (zone file access or commercial feed)
- **cadence:** daily for full zone; near-real-time for commercial
- **latency:** minutes to hours
- **providers:**
  - `whoisxml-api` — WHOIS + DNS data, paid, REST API
  - `zonefiles-api` — gTLD/ccTLD zone file access, paid
  - `dnstwister` — typosquat generation + monitoring, free
  - `certspotter` — CT-log-based new-domain discovery (partial coverage)

---

### 2.12 `breach_disclosure_feed`

**4 specs.** Third-party service breach disclosures. Used by T11 (custody/phishing).
This is the least-mature structured data source in OAK — no provider offers this
as a machine-readable feed today.

Schema (per disclosure):
```json
{
  "service": "LastPass" | "Ledger" | "Trezor" | "1Password" | ...,
  "service_type": "password_manager" | "hardware_wallet_vendor"
                | "cloud_storage" | "exchange" | "wallet_app",
  "breach_date": "2022-12-22",
  "disclosure_date": "2022-12-22",
  "data_types_exfiltrated": ["encrypted_vault", "email_addresses", "customer_names",
                              "billing_addresses", "phone_numbers"],
  "affected_user_count": 25000000,
  "password_hash_scheme": "PBKDF2-SHA256",
  "hash_iterations": 100100,
  "has_2fa_data": false,
  "crypto_user_estimated_fraction": 0.002,
  "source_urls": ["https://blog.lastpass.com/...", "https://techcrunch.com/..."],
  "vendor_advisory_url": "https://support.lastpass.com/..."
}
```

Ingestion:
- **pattern:** on_demand (manual curation + automated scraping)
- **cadence:** on-disclosure (ad-hoc)
- **latency:** hours to days (manual)
- **providers:**
  - `have-i-been-pwned-api` — breach notification service, free for domain owners
  - `vendor-security-bulletins` — RSS/Atom aggregation, self-hosted scraper
  - `breach-notification-laws` — US state AG / GDPR notification tracking, manual

**Note:** This data source is the #1 gap for T11 spec implementation.
See `T11-DATA-GAP.md` (to be created) for the proposed structured feed design.

---

### 2.13 `token_transfer_events`

**5 specs.** ERC-20/ERC-721/ERC-1155 Transfer events. Used by T4 (drainers),
T5 (value extraction), T7 (laundering).

Schema (per transfer):
```json
{
  "tx_hash": "0x...",
  "block_number": 18500000,
  "log_index": 42,
  "timestamp": "2024-01-15T10:30:00Z",
  "token": {
    "address": "0x...",
    "symbol": "USDC",
    "decimals": 6,
    "standard": "ERC20"
  },
  "from": "0x...",
  "to": "0x...",
  "amount": "1000000",
  "amount_ui": 1.0,
  "value_usd": 1.0,
  "is_suspicious_pattern": {
    "zero_value": false,
    "dust": false,
    "to_self": false,
    "batch_transfer": false
  }
}
```

Ingestion:
- **pattern:** subscription (eth_getLogs per-block)
- **cadence:** per-block
- **latency:** real-time (WebSocket), seconds (polling)
- **providers:**
  - `ethereum-json-rpc` — `eth_getLogs` on Transfer event topics, any node provider
  - `dune` — `erc20_ethereum.evt_Transfer`, `nft.transfers` tables, free
  - `the-graph` — per-token subgraphs, free

---

### 2.14 `reference_price_feed`

**3 specs.** Reference (CEX mid-market or multi-venue TWAP) prices. Used by T9.001
(oracle deviation), T9.011 (vault share price baseline), T14 (LRT NAV benchmark).

Schema (per price point):
```json
{
  "asset": "ETH",
  "pair": "ETH/USD",
  "timestamp": "2024-01-15T10:30:00Z",
  "price_usd": 3500.00,
  "price_sources": [
    {
      "venue": "binance",
      "price": 3500.50,
      "volume_24h_usd": 1200000000,
      "type": "cex_mid"
    },
    {
      "venue": "coinbase",
      "price": 3499.50,
      "volume_24h_usd": 800000000,
      "type": "cex_mid"
    },
    {
      "venue": "uniswap_v3_eth_usdc_0.05pct",
      "price": 3500.25,
      "volume_24h_usd": 500000000,
      "type": "dex_twap"
    }
  ],
  "aggregated": {
    "median": 3500.25,
    "twap_30m": 3500.10,
    "twap_1h": 3499.80,
    "vwap_24h": 3495.00
  }
}
```

Ingestion:
- **pattern:** polling (REST API)
- **cadence:** per-minute for CEX; per-block for DEX TWAP
- **latency:** seconds
- **providers:**
  - `coingecko-api` — free tier with rate limits, REST
  - `binance-api` — free, WebSocket real-time, CEX only
  - `chainlink-data-feeds` — on-chain price oracles, per-heartbeat cadence
  - `pyth-network` — on-chain price oracles, per-slot (Solana) / per-block (EVM)

---

### 2.15 `token_prices`

**2 specs (but critical).** Per-token USD/ETH price series. Distinct from `reference_price_feed`
which is per-asset reference pricing — `token_prices` is the broader per-token time series
for any token.

Schema (per price point):
```json
{
  "token_address": "0x...",
  "chain": "ethereum",
  "symbol": "LDO",
  "timestamp": "2024-01-15T10:30:00Z",
  "price_usd": 3.45,
  "price_eth": 0.000985,
  "market_cap_usd": 345000000,
  "volume_24h_usd": 45000000,
  "liquidity_usd": 120000000,
  "source": "coingecko" | "defillama" | "dex_pool"
}
```

Ingestion:
- **pattern:** polling (REST API)
- **cadence:** per-minute to per-5-minutes
- **latency:** seconds to minutes
- **providers:**
  - `coingecko-api` — free tier, REST
  - `defillama-api` — free, REST
  - `dex-pool-twap` — on-chain derived, per-block via Dune/The Graph

---

### 2.16 `mev_relay_feed`

**Used by T5.004 (sandwich), T9.013 (slippage-manipulation sandwich).**

Schema (per relayed block/bundle):
```json
{
  "block_number": 18500000,
  "slot": 9000000,
  "builder_address": "0x...",
  "builder_label": "beaverbuild" | "titan" | "rsync-builder" | ...,
  "relay": "flashbots" | "bloxroute-max-profit" | "edennet" | "ultrasound",
  "proposer_fee_recipient": "0x...",
  "bid_value_eth": 0.15,
  "bundles": [
    {
      "bundle_index": 0,
      "bundle_hash": "0x...",
      "transactions": [
        {
          "tx_hash": "0x...",
          "from": "0x...",
          "to": "0x...",
          "position_in_bundle": 0,
          "is_private_orderflow": true
        }
      ],
      "mev_type": "sandwich" | "arbitrage" | "liquidation" | "nft_snipe" | "other",
      "extracted_value_eth": 0.005
    }
  ]
}
```

Ingestion:
- **pattern:** subscription (relay data API)
- **cadence:** per-slot (12 seconds on Ethereum)
- **latency:** seconds after block proposal
- **providers:**
  - `mevboost-pics` — public relay data dashboard + API, free
  - `eigenphi` — MEV detection + classification, free tier
  - `libmev` — public MEV data, free
  - `flashbots-mev-inspect` — open-source MEV inspector, self-hosted

---

### 2.17 `mempool_transaction`

**Used by T5.004, T9.012, T9.013 (MEV/sandwich detection).**

Schema (per pending transaction):
```json
{
  "tx_hash": "0x...",
  "from": "0x...",
  "to": "0x..." | null,
  "nonce": 42,
  "gas_price_wei": "50000000000",
  "max_fee_per_gas_wei": "100000000000",
  "max_priority_fee_per_gas_wei": "2000000000",
  "gas_limit": 250000,
  "value_wei": "0",
  "input": "0x...",
  "decoded": {
    "selector": "0x7ff36ab5",
    "signature": "swapExactETHForTokens(uint256,address[],address,uint256)",
    "params": {
      "amountOutMin": "950000000000000000",
      "path": ["0xC02aa...", "0xA0b86..."],
      "to": "0x...",
      "deadline": "9999999999"
    }
  },
  "first_seen_timestamp": "2024-01-15T10:30:00.100Z",
  "propagation_nodes": 15,
  "bundle_affiliation": "flashbots" | "bloxroute" | "edennet" | null,
  "is_private": false
}
```

Ingestion:
- **pattern:** subscription (txpool WebSocket)
- **cadence:** continuous (each pending transaction)
- **latency:** real-time (milliseconds before inclusion)
- **providers:**
  - `geth-txpool` — `txpool_content` RPC, self-hosted
  - `bloxroute-stream` — low-latency mempool streaming, paid
  - `flashbots-protect` — private transaction submission API (for PATH_A suppression)

---

### 2.18 `bundle_data`

**Used by T9.012, T9.013 (MEV bundle analysis).** Same providers as `mev_relay_feed`.
Often consumed together.

Schema: Same as `mev_relay_feed.bundles[]`, but accessed at the bundle level
rather than the relayed-block level.

---

### 2.19 `oracle_feed`

**5 specs.** Oracle-reported values. Used by T9.001 (oracle price manipulation).
Distinct from `reference_price_feed` — this is the oracle's own reported price,
not the "true" reference price.

Schema (per oracle update):
```json
{
  "oracle_address": "0x...",
  "oracle_type": "chainlink" | "tellor" | "uma" | "pyth" | "chronicle" | "custom",
  "asset": "ETH/USD",
  "price": 3500.00,
  "block_number": 18500000,
  "timestamp": "2024-01-15T10:30:00Z",
  "reporter": "0x..." | null,
  "round_id": 12345,
  "dispute_window_blocks": 1800,
  "dispute_window_end_block": 18501800,
  "is_in_dispute_window": false
}
```

Ingestion:
- **pattern:** subscription (Oracle contract events)
- **cadence:** per-oracle-update (heartbeat-based)
- **latency:** real-time (contract event emission)
- **providers:**
  - `chainlink-data-feeds` — on-chain aggregator contracts, free to read
  - `pyth-net` — on-chain oracle, per-slot updates
  - `tellor-events` — Tellor oracle events via eth_getLogs

---

### 2.20 `governance_events` (see §2.7)

Already covered.

---

### 2.21 `bridge_message_logs`

**Used by T10.002, T10.006, T10.007.** Cross-chain message sent/received events.

Schema (per message):
```json
{
  "protocol": "layerzero" | "wormhole" | "chainlink-ccip" | "hyperlane" | "axelar",
  "source_chain": "ethereum",
  "target_chain": "polygon",
  "message_id": "0x..." | "12345",
  "tx_hash_source": "0x...",
  "tx_hash_target": "0x..." | null,
  "timestamp_source": "2024-01-15T10:30:00Z",
  "timestamp_target": "2024-01-15T10:35:00Z" | null,
  "sender": "0x...",
  "receiver": "0x...",
  "payload": "0x...",
  "payload_hash": "0x...",
  "nonce": 42,
  "status": "sent" | "delivered" | "executed" | "failed" | "expired",
  "relayer": "0x..." | null,
  "fee_paid_usd": 0.50
}
```

Ingestion:
- **pattern:** subscription (bridge contract events)
- **cadence:** per-message
- **latency:** near-real-time (seconds)
- **providers:**
  - `layerzero-scan-api` — LayerZero message explorer, free REST API
  - `wormhole-explorer-api` — Wormhole message explorer, free REST API
  - `chainlink-ccip-explorer` — CCIP message tracking, free
  - `bridge-contract-events` — raw eth_getLogs on bridge contracts

---

### 2.22 `contract_deployment`

**Used by T6 (defense evasion), T9 (post-audit facet detection).**

Schema (per deployment):
```json
{
  "address": "0x...",
  "deployer": "0x...",
  "deployment_tx": "0x...",
  "block_number": 18000000,
  "timestamp": "2024-01-15T10:30:00Z",
  "bytecode_hash": "0x...",
  "factory": "0x..." | null,
  "factory_usage": "create" | "create2" | "direct_deploy",
  "chain": "ethereum"
}
```

Ingestion:
- **pattern:** subscription (new contract creation)
- **cadence:** per-block for CREATE/CREATE2 operations
- **latency:** near-real-time
- **providers:**
  - `etherscan-api` — contract creation list, rate-limited
  - `dune` — `ethereum.creation_traces` table, free
  - `ethereum-json-rpc` — trace-based contract creation detection, self-hosted

---

### 2.23 `audit_report_feed`

**Used by T6.002, T6.003, T6.004, T9.008 (audit verification).**

Schema (per audit report):
```json
{
  "audit_firm": "trail-of-bits" | "openzeppelin" | "halborn" | "solidity-finance" | ...,
  "report_id": "2024-01-acme-protocol-v2",
  "report_url": "https://github.com/trailofbits/publications/...",
  "publication_date": "2024-01-15",
  "client": "Acme Protocol",
  "scope": {
    "contracts": ["0x...", "0x..."],
    "commit_hashes": ["abc123..."],
    "files": ["contracts/Vault.sol", "contracts/Router.sol"],
    "bytecode_hashes": ["0x...", "0x..."],
    "deployment_addresses": ["0x..."]
  },
  "findings": [
    {
      "severity": "critical" | "high" | "medium" | "low" | "informational",
      "title": "Reentrancy in withdraw() function",
      "contract": "Vault.sol",
      "status": "fixed" | "acknowledged" | "open"
    }
  ],
  "is_published": true,
  "has_supplemental": false
}
```

Ingestion:
- **pattern:** on_demand (firm website scraping + API)
- **cadence:** per-publication
- **latency:** hours to days (post-publication)
- **providers:**
  - `audit-firm-github-repos` — Trail of Bits, OpenZeppelin, etc. public repos
  - `solidity-finance` — public audit registry
  - `defillama-audits` — aggregated audit links
  - `code4rena` — audit contest results, free

**Note:** No structured machine-readable audit feed exists. This is a manual curation
surface. An OAK audit-attestation registry is proposed for v0.3.

---

### 2.24 `authority_graph`

**3 specs.** On-chain authority/ownership relationship graph. Subset of `funder_graph`
focused on contract-level authority (proxy admins, multisig signers, governance contracts).

Schema (per authority edge):
```json
{
  "subject_contract": "0x...",
  "authority_type": "proxy_admin" | "owner" | "multisig_signer" | "governance_executor"
                  | "timelock_admin" | "diamond_owner" | "access_control_admin",
  "authority_address": "0x...",
  "is_multisig": false,
  "multisig_signers": ["0x...", "0x..."],
  "multisig_threshold": 3,
  "timelock_seconds": 172800,
  "is_eoa": true,
  "is_contract": false,
  "entity_label": "Acme Protocol Deployer" | null
}
```

Ingestion:
- **pattern:** on_demand (storage slot analysis)
- **cadence:** per-contract (cached)
- **latency:** real-time (RPC calls)
- **providers:**
  - `mg-detectors-rs` — authority graph extraction, self-hosted
  - `etherscan-api` — contract creator + proxy metadata
  - `custom-storage-reader` — EIP-1967 slot reads via RPC

---

### 2.25 `liquidation_events`

**Used by T9.010 (read-only reentrancy), T14 (LRT pricing).**

Schema (per liquidation):
```json
{
  "protocol": "aave" | "compound" | "euler" | "maker" | ...,
  "tx_hash": "0x...",
  "block_number": 18500000,
  "timestamp": "2024-01-15T10:30:00Z",
  "liquidator": "0x...",
  "borrower": "0x...",
  "debt_asset": "USDC",
  "debt_amount": "50000.00",
  "collateral_asset": "WETH",
  "collateral_amount": "15.0",
  "collateral_value_usd": 52500.00,
  "liquidation_discount_pct": 5.0,
  "health_factor_before": 0.95,
  "health_factor_after": 1.15,
  "is_profitable": true
}
```

Ingestion:
- **pattern:** subscription (protocol contract events)
- **cadence:** per-event
- **latency:** real-time
- **providers:**
  - `the-graph` — Aave/Compound/Euler subgraphs, free
  - `dune` — lending protocol liquidation tables, free
  - `defillama` — aggregated lending data, free API

---

## 3. Remaining data sources (grouped by category)

The remaining ~193 data sources fall into these categories. Each follows the
same schema patterns as the closest core data source above.

### 3.1 Event-log variants (inherit `contract_events` schema)

| Data source | Base schema | Distinguishing filter |
|-------------|-------------|----------------------|
| `mint_event_log` | `contract_events` | Mint/Burn events |
| `pool_creation_log` | `contract_events` | PairCreated/PoolCreated |
| `token_deployment_events` | `contract_events` | CREATE/CREATE2 + ERC-20 detection |
| `token_deployment_log` | `contract_events` | Same as above |
| `erc20_approval_events` | `contract_events` | Approval(address,address,uint256) |
| `erc20_transferfrom_events` | `contract_events` | TransferFrom events |
| `erc721_approvalforall_events` | `contract_events` | ApprovalForAll |
| `erc1155_approvalforall_events` | `contract_events` | ApprovalForAll |
| `erc2612_permit_log` | `contract_events` | Permit events |
| `permit2_event_log` | `contract_events` | Permit2 events |
| `nft_transfer_events` | `contract_events` | ERC-721/1155 Transfer |
| `nft_token_transfer_events` | `contract_events` | Same, token-ID focused |
| `proxy_implementation_change_log` | `contract_events` | Upgraded/ImplementationChanged |
| `proxy_admin_state` | `contract_storage` | EIP-1967 admin slot |
| `proxy_implementation_state` | `contract_storage` | EIP-1967 implementation slot |
| `eip1967_storage_log` | `contract_storage` | Same |
| `admin_authority_change_log` | `contract_events` | OwnershipTransferred |
| `governance_event_log` | `contract_events` | Subset of `governance_events` |
| `snapshot_vote_log` | `contract_events` | VoteCast events |
| `multisig_signer_set_change_log` | `contract_events` | AddedOwner/RemovedOwner |
| `multisig_threshold_change_log` | `contract_events` | ChangedThreshold |
| `multisig_outflow_log` | `token_transfer_events` | Transfers from multisig |
| `slashing_event_log` | `contract_events` | Slashing/SlashValidator events |

### 3.2 Trace variants (inherit `tx_call_trace` schema)

| Data source | Base schema | Distinguishing filter |
|-------------|-------------|----------------------|
| `solana_tx_call_trace` | `tx_call_trace` | Solana instruction traces (different format) |
| `paymaster_call_trace_log` | `tx_call_trace` | UserOp validation traces |
| `handleops_call_log` | `tx_call_trace` | EntryPoint handleOps traces |
| `userop_bundle_log` | `tx_call_trace` | Bundled UserOperations |
| `userop_bundle_decoded_log` | `tx_call_trace` | Decoded UserOp calldata |

### 3.3 Off-chain intelligence (manual curation, no structured feed exists)

These are the **hardest to automate** data sources. Most T11, T15, and some T4/T6
specs depend on them. Each requires a bespoke ingestion pipeline.

| Data source | Data type | Automation feasibility |
|-------------|-----------|----------------------|
| `off_chain_cti` | News articles, threat reports | NLP + RSS scraping, partial |
| `off_chain_news_corpus` | News articles | NLP + RSS, partial |
| `social_media_threat_signals` | Twitter, Telegram, Discord | API scraping, rate-limited |
| `discord_compromise_feed` | Compromise reports | Manual, no feed exists |
| `telegram_x_handle_log` | Telegram channel monitoring | Telegram API, partial |
| `vendor_phishing_campaign_advisory_feed` | Vendor phishing advisories | RSS + email parsing, partial |
| `breach_disclosure_feed` | Breach notifications | HaveIBeenPwned + manual |
| `vendor_disclosure_feed` | Vendor security bulletins | RSS aggregation, partial |
| `dapp_breach_disclosure_feed` | DApp compromise disclosures | Manual + Twitter scraping |
| `off_chain_phishing_domain_feed` | Phishing domain reports | PhishTank, OpenPhish, partial |
| `typosquat_domain_feed` | Typosquat domain detection | dnstwister + CertSpotter, automatable |
| `brand_monitoring_feed` | Brand impersonation detection | Commercial brand protection APIs |
| `regulator_enforcement_feed` | SEC/CFTC/DOJ enforcement actions | RSS + court docket scraping |
| `regulator_warning_feed` | Regulatory warnings | RSS + agency website scraping |

### 3.4 Chain-specific variants

| Data source | Schema | Chain |
|-------------|--------|-------|
| `solana_program_bytecode` | `contract_bytecode` (adapted) | Solana |
| `solana_program_account` | `contract_storage` (adapted) | Solana |
| `solana_mint_config` | `contract_storage` | Solana SPL tokens |
| `polkadot_offences` | `slashing_event_log` | Polkadot |
| `cosmos_slashing_events` | `slashing_event_log` | Cosmos SDK chains |
| `beacon_proposer_assignments` | `validator_set_attestation` | Ethereum Beacon Chain |
| `beacon_attester_slashings` | `slashing_event_log` | Ethereum Beacon Chain |
| `beacon_proposer_slashings` | `slashing_event_log` | Ethereum Beacon Chain |

---

## 4. Composite views

Several common data-access patterns in pseudocode are JOINs across multiple
data sources. Implementations SHOULD provide these as materialized views.

### 4.1 `pool_state` (composite)

```sql
-- pool reserves + recent trades + token metadata
SELECT p.address, p.token0, p.token1, p.reserve0, p.reserve1,
       t.symbol0, t.symbol1, t.decimals0, t.decimals1,
       recent.price_twap_1h, recent.volume_24h
FROM dex_pool_reserves p
JOIN token_metadata t ON p.token0 = t.address
LEFT JOIN recent_pool_stats recent ON p.address = recent.pool_address
```

### 4.2 `lending_protocol_state` (composite)

```sql
-- lending pool state = reserves + oracles + liquidation thresholds
SELECT p.protocol, p.pool_address, a.asset,
       p.total_liquidity, p.total_debt,
       o.price_usd, p.liquidation_threshold, p.ltv,
       recent.borrow_volume_24h, recent.repay_volume_24h
FROM lending_pool_state p
JOIN asset_oracles o ON p.asset = o.asset
LEFT JOIN recent_lending_activity recent ON p.pool_address = recent.pool_address
```

### 4.3 `cross_chain_attribution_graph` (composite)

```sql
-- addresses appearing on multiple chains with same funding source
SELECT a.address, a.chains, f.entity_cluster, f.funding_sources
FROM address_inventory a
JOIN funder_graph f ON a.address = f.address
WHERE array_length(a.chains) > 1
```

---

## 5. Provider binding specification

Each implementation MUST declare which provider it uses for each data source.
The canonical binding format:

```yaml
bindings:
  tx_call_trace:
    provider: erigon-archive
    access: trace_block RPC
    chain: ethereum
  dex_trades:
    provider: dune
    access: Dune SQL (dataset: dex.trades)
    chain: cross-chain
```

A missing binding for a data source referenced by a spec = the spec is not
implemented (coverage gap).

---

## 6. Ingestion patterns

### 6.1 Per-block polling (the dominant pattern)

```
for each finalized block:
    batch_fetch: eth_getLogs + trace_block + eth_getStorageAt
    for each spec with subscription cadence:
        execute PATHs that consume this block's data
```

### 6.2 WebSocket subscription (low-latency)

```
subscribe: eth_subscribe("newHeads") → per-block trigger
subscribe: eth_subscribe("logs", {topics: [...]}) → per-event trigger
```

### 6.3 On-demand (ad-hoc PATH execution)

```
trigger: user request | scheduled audit | post-upgrade hook
execute: spec PATHs against the current or historical state
```

### 6.4 Off-chain polling (CTI, news, vendor feeds)

```
schedule: hourly | daily crawl
fetch: RSS/Atom feeds, API endpoints, HTML scraping
normalize: into structured event format
execute: T11/T15 PATHs against normalized feed
```

---

## 7. Data source maturity tiers

| Tier | Description | Count |
|------|-------------|-------|
| **T1 — Structured, real-time** | Well-defined schema, production providers, real-time ingestion | ~15 |
| **T2 — Structured, delayed** | Well-defined schema, providers exist, but latency is hours/days | ~10 |
| **T3 — Semi-structured** | Schema defined in OAK, providers partial or rate-limited | ~30 |
| **T4 — Manual curation** | No structured feed exists; requires bespoke scraping/curation | ~20 |
| **T5 — Aspirational** | Referenced in specs but no known provider or schema | ~143 |

The long tail of T5 data sources is the #1 structural gap in OAK's implementability.
Most T5 sources are spec-specific variants (`vendor_communication_quality_anomaly_log`,
`qr_code_origin_log`) that need existence proofs before schema design.

---

## 8. Schema versioning

DSR versions track the OAK spec corpus. A data source schema change is BREAKING
if it would invalidate existing spec pseudocode that consumes it.

| DSR version | OAK version | Changes |
|-------------|-------------|---------|
| 0.1.0 | v0.2.0 | Initial: 25 core schemas defined, ~193 data sources catalogued by category |
