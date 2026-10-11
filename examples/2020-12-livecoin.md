# Livecoin exchange infrastructure seizure and rate manipulation — multi-asset (CEX) — 2020-12-23

**Loss:** Not reliably established. Livecoin said users lost \$3.3M at the time of the attack (`[hackread]`); the earlier "\$16M+" figure in this file had no source and has been removed. Livecoin announced it would close and pay remaining funds to clients.
**OAK Techniques observed:** **OAK-T15.003** (Operator-Endpoint Compromise — the attacker gained control of Livecoin's servers, backend and nodes). **OAK-T15.004** (Operator-Credential Compromise — the initial access vector is not publicly documented; credential or infrastructure-account compromise is an inference, not a sourced finding).
**Attribution:** **pseudonymous**. No named individual or group was publicly identified. Livecoin said it notified local law enforcement and that the investigation was "in active phase" (`[secaffairs]`); no findings were published. Some users alleged an inside job; this is unconfirmed.
**Corrected 2026-10-11:** Removed the unsourced "\$16M+" loss, the 10/100 BTC ransom demand, the verified-Twitter quote and the Russian-registration/investigation claims; sources show a rate-manipulation takeover with a taunting homepage message, \$3.3M stated user loss, and a closure announced 2021-01-16.
**Key teaching point:** **Livecoin is a worked example of full infrastructure takeover of a centralised exchange: the attacker controlled servers, backend and nodes, rewrote the exchange's own displayed rates (BTC above \$450,000) and then cashed out accounts at those rates.** An attacker with admin access to a trading engine can mint apparent balances rather than just drain wallets, a risk that exchange threat models often skip.

## Summary

Livecoin was a cryptocurrency exchange offering spot trading in Bitcoin, Ethereum and altcoins. In the night of 2020-12-23 to 2020-12-24 attackers took over its infrastructure. Livecoin said it "lost control of all of our servers, backend and nodes" (`[secaffairs]`). The attackers raised exchange rates to roughly fifteen times normal, with BTC above \$450,000 and ETH from about \$600 to \$15,000, and then cashed out accounts (`[secaffairs]`). Livecoin's news channels were also compromised, and the old .net domain showed a message reading "Oops! Time is over Livecoin…" (`[hackread]`). Livecoin told clients to stop depositing, trading and using the API.

On 2021-01-16 Livecoin announced it would end operations, saying the service was "damaged hard technically and financially", and would pay remaining funds to clients; claims were accepted until 2021-03-17 (`[secaffairs]`, `[hackread]`). Some users speculated the closure was an exit scam; that is speculation in the sources, not a finding.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2020-12-23/24 (overnight) | Attackers take control of servers, backend and nodes; rates altered; accounts cashed out | T15.003 |
| 2020-12-24 onward | Livecoin tells clients to stop using the service; website domain lost to attackers | (operator crisis communication) |
| 2021-01-16 | Livecoin announces closure and payout of remaining funds | (operator failure) |
| 2021-03-17 | Last day to file client claims | (aftermath) |

## T15.003 classification

The distinguishing feature versus signing-host compromises (Bitstamp 2015, Coincheck 2018, Zaif 2018, DMM 2024) is that the attacker controlled the exchange's whole operational surface and used the trading engine's own rate display as the extraction mechanism. Defender takeaway: monitoring and circuit-breakers on rates and withdrawal volume must sit outside the infrastructure an attacker could take over.

## T15.004 classification

How the attacker first got in is not publicly documented. The breadth of control suggests privileged access, but no source states the entry vector, so T15.004 should be read as a working inference.

## Public references

- `[secaffairs]` — Security Affairs, "Livecoin halted operations after the December attack" (2021-01-20): <https://securityaffairs.com/113650/digital-id/livecoin-halted-operations.html>
- `[hackread]` — Hackread, "Livecoin crypto exchange shuts down after losing domain to hackers": <https://www.hackread.com/livecoin-crypto-exchange-shutdown-domain-hackers/>
