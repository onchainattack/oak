# OAK-M50 — Withdrawal Approval Independent of the Service That Submits It

**Class:** custody-operational
**Audience:** custodian, exchange, venue

**Maps to Techniques:** OAK-T15.003, OAK-T15.004, OAK-T11.001, OAK-T11.011

## Description

In 2026, exchange hot wallets were emptied without anyone stealing a key. An attacker who controls the internal service that **submits** withdrawals can get the signing system to sign them, because the signing system trusts what that service tells it.

The control: a withdrawal is signed only after a component **outside the submitting service's reach** independently confirms three things.

1. **It is owed.** The request matches a real customer withdrawal in the ledger, checked against a ledger copy the submitter cannot write to. A request with no matching ledger entry is refused.
2. **It is within limits the submitter cannot change.** There are per-asset and per-hour caps, and a cap on the share of a hot wallet's balance that can leave in a window. Exceeding a cap needs a human approval on a separate path.
3. **The destination is not new and large at once.** A first-time destination receiving more than a threshold is held for review.

In short, the service that asks for a signature never decides alone whether the signature is deserved.

## How it applies

- **OAK-T15.003 (Operator-Endpoint Compromise):**
  - [Binance, 2026-10-29](../examples/2026-10-binance-devops-laptop-service-container-hot-wallet-drain.md): a DevOps laptop led to "a service container" that could "submit unauthorized withdrawal transactions". Binance found "no evidence of any wallet private key leak". On XRP, Solana, Optimism, Bitcoin, Tron, Arbitrum and Avalanche the hot wallets were drained by ordinary signed transfers within about 30 minutes. With part 2's balance-share cap, that drain would have needed out-of-band human approval within minutes.
  - [Gamdom, 2026-10-13](../examples/2026-10-gamdom-automation-server-intrusion-multi-chain-hot-wallet-drain.md) and [Bloom, 2026-10-26](../examples/2026-10-bloom-trading-third-party-module-rce-bot-wallet-drain.md) follow the same shape: an automation server or bot backend that could move funds.
- **OAK-T11.001 (Third-party signing / custody vendor compromise):** [Bitget, 2026-09-24](../examples/2026-09-bitget-wallet-backend-spoofed-transfer-data-hot-warm-drain.md). The attacker "spoofed transaction data" into Bitget's own approval path, and the signers "operated normally on falsified inputs". Part 1's ledger check, run against data the compromised backend cannot write, is the check that fails closed here.
- **OAK-T15.004 (Operator credential compromise):** as for Bitget's internal accounts. Stolen credentials let an attacker submit requests; they should not also let the attacker approve them.
- **OAK-T11.011 (Multi-chain key-store co-location):** caps applied per chain and per wallet limit a single intrusion to one window's worth on each chain, instead of everything on every chain at once.

## Limitations

- If the attacker reaches the approval component as well (Teng's "more complex attack process"), the control is as strong as the separation between the two. Separate infrastructure, separate credentials and separate operators are the point; a second process on the same host is not.
- Caps cost operational speed during genuine large withdrawals. Exchanges loosen them under customer pressure, and the 2026 drains show what that buys.
- The control does nothing against a stolen signing key used directly (T11.014). That is the HSM/MPC custody question ([OAK-M37](OAK-M37-hsm-mpc-custody.md)).

## Reference implementations

- Independent ledger reconciliation before signing; custody platforms with policy engines whose rules are set by a separate quorum.
- Rate limits and per-window caps: see [OAK-M38 (Time-windowed withdrawal limits)](OAK-M38-time-windowed-withdrawal-limits.md). M50 adds the requirement that the limit lives outside the submitter.

## Citations

- [`examples/2026-10-binance-devops-laptop-service-container-hot-wallet-drain.md`](../examples/2026-10-binance-devops-laptop-service-container-hot-wallet-drain.md): Binance's preliminary finding (service container submits withdrawals; no key leak) and the multi-chain timeline.
- [`examples/2026-09-bitget-wallet-backend-spoofed-transfer-data-hot-warm-drain.md`](../examples/2026-09-bitget-wallet-backend-spoofed-transfer-data-hot-warm-drain.md): "spoofed transaction data … triggered our authorization process" (CEO statement); "no private keys were stolen".
- [`examples/2026-10-gamdom-automation-server-intrusion-multi-chain-hot-wallet-drain.md`](../examples/2026-10-gamdom-automation-server-intrusion-multi-chain-hot-wallet-drain.md)
