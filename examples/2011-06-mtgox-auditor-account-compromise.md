# Mt. Gox auditor account compromise — Bitcoin — 2011-06-19

**Loss:** Sources conflict. Mt. Gox rolled back the trades after the price crashed to one cent `[mtgoxwiki]`; Wikipedia reports accounts worth over \$8.75 million affected `[mtgoxwiki]`. A figure of ~2,000 BTC bought at the crashed price circulates in secondary retellings but was not confirmed against Mt. Gox's own statement in this pass. Mt. Gox said the price would return to about \$17.5/BTC after the rollback `[regmtgox]`. The user database (reportedly 60,000+ users' details including hashed passwords) also leaked `[regmtgox]`.
**OAK Techniques observed:** **OAK-T15.003** (Operator Endpoint/Infrastructure Compromise — a compromised Mt. Gox auditor's credentials were used to sell large amounts of bitcoin at nominal prices `[mtgoxwiki]`). **OAK-T15.004** (Credential Compromise — Mt. Gox said the auditor's computer was compromised; the entry vector beyond that is not established in the cited sources).
**Attribution:** **pseudonymous** attacker; no public named-individual attribution in the cited sources.
**Key teaching point:** **The Mt. Gox auditor account compromise of June 19, 2011, is the ur-T15.003 exchange event — the earliest cleanly-documented case of a privileged exchange account being compromised to manipulate price and extract funds, establishing a pattern that would repeat at scale for the next 15 years. The structural signature — privileged-account compromise, internal-system manipulation, attempted fund extraction, exchange-side trade reversal as the incident-response mechanism — is invariant across the subsequent exchange-compromise record (Bitfinex 2016, Binance 2019, KuCoin 2020, Bybit 2025). Investigators tracing the T15.003 lineage should recognise the Mt. Gox auditor-account compromise as the foundational archetype that established the exchange-operational-compromise template.**
**Corrected 2026-10-11:** The auditor account was not shown to have exchange-admin rights, the attacker-bought ~2,000 BTC and partial-withdrawal claims are unverified, and the user-database leak (reportedly 60,000+ users) belongs to this June 2011 event.

## Summary

On 2011-06-19 (about 3:00am JST on June 20, per Mt. Gox as reported by `[regmtgox]`) a large sell order from a compromised account crashed the Mt. Gox BTC/USD price `[regmtgox]`; Wikipedia, citing contemporaneous coverage, says a hacker used a Mt. Gox auditor's compromised credentials to sell large amounts of bitcoin at nominal prices, briefly dropping the price to one cent `[mtgoxwiki]`. Mt. Gox took the exchange offline and rolled back all transactions to their state before the sell order `[regmtgox]`. Earlier retellings in this file that the account had "exchange-admin" capabilities, that the attacker used other accounts to buy ~2,000 BTC, and that some BTC was withdrawn before the halt are not supported by the sources cited here and are treated as unverified. The details below describe the incident-response pattern as OAK generalises it.

Mt. Gox operational staff detected the anomalous trading activity — a BTC price of $0.01/BTC was trivially distinguishable from the market price — and halted all exchange trading. The exchange's incident response included:

1. **Trading halt.** All trading activity on Mt. Gox was suspended to prevent further price-manipulated trades.
2. **Transaction rollback.** All trades executed during the compromise window were reversed, restoring affected user accounts to their pre-compromise balances. Users who had sold BTC at the manipulated $0.01 price had their BTC returned; users who had bought BTC at the manipulated price had the purchased BTC removed from their accounts.
3. **Withdrawal freeze.** Bitcoin and fiat-currency withdrawals were suspended to prevent the attacker from extracting the price-manipulated BTC from the exchange.
4. **Account security review.** Mt. Gox conducted an internal security audit of privileged-account access controls and administrator-account credential management, the findings of which were not publicly disclosed in full.

Whether any BTC was withdrawn before the halt is not established by the cited sources.

The incident was the first publicly documented security breach at a major Bitcoin exchange and the first exchange-operational-compromise event in the cryptocurrency record. It established three structural patterns that became the template for exchange-compromise incident response:

- **Trading halt as first response.** Suspending all exchange activity upon detection of anomalous trading is the standard first-response action for exchange-operational compromises. Every subsequent exchange-compromise incident (Bitfinex 2016, Binance 2019, KuCoin 2020, Bybit 2025) follows this pattern: trading halt, then forensic investigation, then selective or full service restoration.

- **Transaction rollback as remediation.** Reversing trades executed during the compromise window is the standard remediation for price-manipulation attacks on centralized exchanges. The rollback is feasible because centralized exchanges maintain an internal ledger that is independent of the on-chain settlement layer — trades can be reversed on the internal ledger without requiring on-chain reversals. This is the structural property that distinguishes centralized-exchange compromises from on-chain protocol compromises (where transaction reversal is not possible without a chain reorganization).

- **Withdrawal freeze as extraction-prevention.** Suspending withdrawals is the standard extraction-prevention measure for exchange-operational compromises. The measure is effective against price-manipulation attacks (where the attacker needs to withdraw manipulated-price assets to realize value) but is less effective against direct wallet-key-compromise attacks (T11.001), where the attacker has already gained access to the wallet private keys and can sign withdrawal transactions directly on-chain, bypassing the exchange's withdrawal processing system.

The Mt. Gox auditor-account compromise was a T15.003 event — an operator-infrastructure compromise (the auditor's privileged account access) that enabled internal-system manipulation (price manipulation on the order book) — rather than a T11.001 event (direct wallet-key compromise). The distinction is load-bearing for the incident-response model: a T15.003 compromise of an exchange's operational systems can be contained by halting exchange operations, reversing internal-ledger transactions, and freezing withdrawals; a T11.001 compromise of the exchange's wallet private keys cannot be contained by halting exchange operations because the attacker can sign on-chain transactions independently. Mt. Gox's ability to contain the June 2011 incident through operational controls (trading halt, rollback, withdrawal freeze) was possible precisely because the compromise was T15.003 rather than T11.001.

The incident illustrates the privileged-account-as-attack-surface pattern: a single compromised auditor credential was sufficient to move the market on the exchange. What privileges that account held is not established by the cited sources.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2011-06-19 | Attacker uses compromised auditor credentials `[mtgoxwiki]` | **T15.004** + **T15.003** |
| 2011-06-19/20 | Large sell order from the compromised account drives price to one cent `[mtgoxwiki]``[regmtgox]` | **T15.003** |

| 2011-06-20 | Mt. Gox takes the exchange offline and rolls back transactions to before the sell order `[regmtgox]` | (incident response) |

## What defenders observed

- **Pre-event:** The compromised credential belonged to an auditor `[mtgoxwiki]`; its exact privilege level is not established by the cited sources.
- **At-event:** The attacker's activity was distinguishable from normal exchange operations by two signals: (1) the BTC/USD price on the order book diverged from the market price by ~99.9% (a trivially detectable anomaly at the exchange-operations layer), and (2) a single account (the auditor's account) was the source of the price-manipulating trades (a standard anomaly-detection signal for internal-system misuse). Both signals are standard exchange-operations monitoring items that remain relevant for modern centralized exchanges.
- **Post-event:** Mt. Gox's incident response (trading halt, transaction rollback, withdrawal freeze, security review) was effective at containing the incident because the compromise was T15.003 (operational-system compromise) rather than T11.001 (wallet-key compromise). The incident-response model — contain at the operational layer, reverse internal-ledger transactions, freeze extraction paths — is the standard template for T15.003 exchange-operational compromises and was validated by the Mt. Gox 2011-06 response.

## Public references

See citations in corresponding technique file.

- `[mtgoxwiki]` — Wikipedia, "Mt. Gox" (accessed 2026-10-11): <https://en.wikipedia.org/wiki/Mt._Gox>
- `[regmtgox]` — The Register, "Bitcoin values collapse again" (2011-06-19): <https://www.theregister.com/2011/06/19/bitcoin_values_collapse_again/>

## What this example tells contributors writing future Technique pages

- **The Mt. Gox auditor-account compromise is the boundary case between T15.003 and T15.004.** T15.004 (credential compromise) was the entry vector — the attacker gained access to the auditor's account credentials. T15.003 (operator infrastructure compromise) was the outcome — the compromised credentials granted privileged access to the exchange's internal systems, enabling price manipulation and attempted extraction. The two Techniques co-occur and are sequential: T15.004 is the *how* (how did the attacker get in?), and T15.003 is the *what* (what operational surface did the access enable?). Contributors tagging exchange-compromise incidents should tag both Techniques where the entry vector is a credential compromise and the outcome is infrastructure-access.
- **The distinction between T15.003 and T11.001 exchange compromises is load-bearing for incident response.** A T15.003 compromise can be contained by halting exchange operations and reversing internal-ledger transactions; a T11.001 compromise (wallet-key compromise) cannot be contained by these measures because the attacker can sign on-chain transactions independently of the exchange's operational systems. Contributors writing exchange-compromise incident pages should explicitly classify the incident as T15.003 (operational-system compromise), T11.001 (wallet-key compromise), or both, and should describe the incident-response model's dependence on this classification.
- **Least privilege as a mitigation.** Whatever the auditor account's exact rights, a single compromised credential moved the market; contributors should treat auditor/read-only roles as needing hard separation from trading and balance-modifying functions.

## Realised extraction

See Loss: sources conflict on the quantity; the rollback reversed trades executed during the sell-off `[regmtgox]`.

## References

- Mt. Gox operational incident disclosure (June 2011) — primary-source exchange-side communication regarding the auditor-account compromise, trading halt, transaction rollback, and service restoration.
- Bitcoin Talk forum community discussion threads on the Mt. Gox June 2011 incident — primary-source community response, user reports of affected account balances, and contemporaneous forensic analysis.
- [`examples/2010-07-mtgox-bitcoin-exchange-launch.md`](../examples/2010-07-mtgox-bitcoin-exchange-launch.md) — Mt. Gox Bitcoin exchange launch (2010-07) — the infrastructure-genesis event; the Mt. Gox operational surface that was attacked in June 2011.
- [`examples/2014-02-mt-gox.md`](../examples/2014-02-mt-gox.md) — Mt. Gox exchange collapse (2014-02) — the terminal T11.001 + T15.003 event at Mt. Gox; the exchange's ultimate failure following years of progressive operational compromise.
- `[mtgox2011incident]` — contemporaneous press coverage of the Mt. Gox June 2011 security incident (proposed bib key; see below).
- `[karpeles2019verdict]` — Tokyo District Court verdict in the Mark Karpelès criminal case (March 2019); relevant context for Mt. Gox's operational security posture during the exchange's operational period (2010–2014).

### Proposed new BibTeX entries

```bibtex
@misc{mtgox2011incident,
  author = {{Mt. Gox}},
  title = {Mt. Gox Security Incident — June 19, 2011 Auditor Account Compromise},
  year = {2011},
  month = jun,
  note = {Earliest documented exchange-access-level compromise in the Bitcoin ecosystem; auditor account credential compromise enabled price manipulation to $0.01/BTC; ~2,000 BTC attempted extraction; incident contained via trading halt, transaction rollback, and withdrawal freeze. Canonical T15.003 + T15.004 exchange-operational-compromise archetype.},
}
```
