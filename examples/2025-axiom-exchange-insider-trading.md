# Axiom Exchange — Employee Insider Trading via Internal Data Access — 2025

**Loss:** ~$390M in platform revenue; employees abused internal tool access to track private wallet activity for front-running and insider trading. Over $100M in illicit profits.
**OAK Techniques observed:** OAK-T3 (Market Manipulation — Insider Trading) — primary.
**Attribution:** **Identified** — Broox Bauer ("@WheresBroox") and multiple other Axiom Exchange employees. Investigation published Feb 2026.

**Key teaching point:** Axiom Exchange demonstrates the **centralized platform insider trading via internal tools** pattern: employees of a crypto trading platform used the lack of access controls on internal tools to look up sensitive user details (wallet addresses, trading activity) and insider-trade by tracking private wallet activity since early 2025. The detection approach: audit internal tool access logs for employees querying user wallet activity not associated with their job function, correlated against that employee's personal trading activity.

## Summary

Axiom Exchange, a crypto trading platform founded by Mist & Cal in 2024, went through Y-Combinator's Winter 2025 batch and became one of the most profitable companies in crypto, generating ~$390M in revenue. In February 2026, ZachXBT published an investigation revealing that multiple Axiom employees — including Broox Bauer — had been abusing the lack of access controls on internal tools to look up sensitive user wallet activity and insider-trade on that information since early 2025.

The pattern was: employee queries internal tool for user X's wallet activity → sees that user X is accumulating token Y → employee buys token Y before user X's large buy hits the market → profits when price moves.

This is a T3 attack operating at the platform infrastructure layer, not the blockchain layer. The on-chain trading is visible; the insider data access that enabled it is not.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2024 | Axiom Exchange founded. Goes through Y-Combinator W25 batch. Rapid growth to $390M in revenue | (background) |
| Early 2025 | Employees begin abusing internal tool access to track private wallet activity. Insider trading begins | **T3 insider trading** |
| 2025 | Multiple employees participate. Trading profits estimated >$100M | **T3 systematic insider trading** |
| 2026-02-23 | ZachXBT announces upcoming investigation | (teaser) |
| 2026-02-26 | Full investigation published. Broox Bauer identified as primary subject | (public disclosure) |

## What defenders observed

- **Internal tool access without audit trail:** Employees could query user wallet activity through internal tools designed for customer support or compliance, but the tools lacked access controls and audit logging.
- **Correlation between query timing and personal trading:** The detection signal is the correlation: employee queries user X's wallet → employee buys token Y → user X's large buy of token Y hits market → employee profits. This requires either internal access log analysis (by the platform) or on-chain trading pattern analysis by external observers.
- **Platform growth masked the theft:** Axiom's legitimate revenue ($390M) was so large that insider trading profits were a small percentage of total activity, making them difficult to detect in aggregate metrics.
- **Multiple employees = systemic failure:** This was not a single rogue employee — it was multiple employees over a prolonged period, indicating a systemic lack of internal access controls.

## What this example tells contributors

- **Platform insider trading is T3 at the infrastructure layer.** Unlike on-chain insider trading (wash trading, pump-and-dump), this attack uses the platform's internal systems as the information asymmetry source. T3 should distinguish between "protocol-layer insider trading" (visible on-chain) and "platform-layer insider trading" (visible only in internal access logs).
- **Internal access logs are a detection data source.** For OAK spec writers: internal tool access logs from exchanges and trading platforms are a data source for T3 detection, though typically proprietary. The schema: `{employee_id, query_time, queried_user_id, queried_wallet_address, query_type}`.
- **Platform growth is not a security indicator.** Axiom was one of Y-Combinator's most successful crypto companies — and had systemic insider trading. Revenue size and growth rate do not correlate with internal control maturity.

## Public references

- [ZachXBT — Axiom Exchange Insider Trading Investigation (X/Twitter)](https://twitter.com/zachxbt/status/2027016082536714503)
- Broox Bauer: identified as primary subject in investigation.
- Axiom Exchange: Y-Combinator W25 batch, ~$390M revenue.
