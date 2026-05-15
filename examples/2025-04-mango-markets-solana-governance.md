# Mango Markets MNGO governance-token expiry and protocol wind-down — Solana — 2025-01 to 2025-04

**Loss:** approximately \$0 realised for token-holders via the governance-approved wind-down; the MNGO token was rendered valueless by SEC settlement requiring token destruction and protocol wind-down, following the SEC/CFTC/DOJ enforcement actions against the October 2022 oracle-manipulation incident (see `examples/2022-10-mango-markets.md`).
**OAK Techniques observed:** **OAK-T16.002** (Hostile-Vote Treasury Drain — broadly construed at the regulator-enforced level; the SEC settlement mandated the MNGO DAO vote to destroy tokens and wind down the protocol, creating a governance-outcome-is-the-attack surface distinct from the original 2022 oracle-manipulation extraction). **OAK-T5.005** (Treasury-Management Exit — regulator-mandated wind-down as operator-coordinated value-destruction event). **OAK-T9.001** (Oracle Price Manipulation — original 2022 incident technique, for the anchor incident context).
**Attribution:** **confirmed**. Avraham Eisenberg was convicted on commodities fraud and manipulation charges (later vacated on venue/materiality grounds in 2025); the SEC settlement with Mango DAO, Mango Labs, and Blockworks Foundation imposed token-destruction and protocol-wind-down requirements.
**Key teaching point:** **The Mango Markets wind-down is the 2025 canonical worked example of regulator-mandated governance outcome as protocol-termination surface — a new class of governance-attack frame where the "attacker" is a regulatory agency and the governance vote is the compliance mechanism.** The case demonstrates that governance-attack surfaces at T16 extend beyond adversarial governance takeovers to include regulator-mandated protocol termination via the DAO's own governance machinery.

## Summary

In October 2022, Avraham Eisenberg manipulated Mango Markets' oracle to extract approximately \$110M (see `examples/2022-10-mango-markets.md`). The SEC, CFTC, and DOJ pursued parallel enforcement actions against Eisenberg and, separately, against Mango DAO, Mango Labs LLC, and Blockworks Foundation (the entities associated with the protocol's governance and development).

In September 2024, the SEC announced a settlement with Mango DAO, Mango Labs, and Blockworks Foundation. The settlement terms required:

1. The destruction of all MNGO governance tokens
2. The removal of MNGO from all trading platforms
3. The wind-down of the Mango Markets protocol
4. The cessation of Mango DAO governance operations

The settlement was approved by a formal MNGO DAO governance vote in January 2025, where MNGO holders voted to destroy their own tokens and wind down the protocol — a governance outcome that was itself mandated by the regulatory settlement. The MNGO token was subsequently removed from exchanges and the Mango Markets protocol ceased operations by April 2025.

This case establishes a new governance-attack surface: the protocol's own DAO governance machinery can be the mechanism for protocol termination when the "hostile vote" is regulator-mandated rather than attacker-purchased. The structural lesson for DAO governance design is that governance-minimization (removing the ability for a governance vote to destroy the protocol) may be a necessary design constraint — but one that conflicts with regulatory compliance requirements that depend on the DAO being able to comply with enforcement-mandated termination.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-10-11 | Eisenberg executes Mango Markets oracle-manipulation extraction (~$110M) | T9.001 (original incident) |
| 2022-12 | Eisenberg arrested in Puerto Rico; DOJ files criminal charges; CFTC files civil enforcement | (enforcement — criminal + civil) |
| 2023-01 | SEC files civil charges against Eisenberg | (SEC enforcement — individual) |
| 2024-09 | SEC announces settlement with Mango DAO, Mango Labs, Blockworks Foundation; requires MNGO destruction, exchange removal, protocol wind-down | (regulator-mandated protocol termination) |
| 2025-01 | MNGO DAO governance vote approves token destruction and protocol wind-down per SEC settlement terms | **T16.002** (hostile-vote treasury destruction — regulator-mandated) |
| 2025-04 | Mango Markets protocol ceases operations; MNGO token removed from exchanges; protocol wind-down complete | T5.005 (protocol termination) |

## Public references

- SEC v. Mango DAO, Mango Labs LLC, and Blockworks Foundation, Settlement Order (September 2024)
- SEC Press Release 2024-123, "SEC Charges Mango DAO, Mango Labs, and Blockworks Foundation" (September 2024)
- Mango Markets DAO governance vote — MNGO token destruction and protocol wind-down (January 2025)
- See `examples/2022-10-mango-markets.md` for the original October 2022 oracle-manipulation incident
