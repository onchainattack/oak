# Arbitrum Foundation governance bypass and treasury transfer — Ethereum — 2023-03/04

**Loss:** no hack and no theft. Under AIP-1 the Arbitrum Foundation sought control of 750 million ARB (about \$1 billion at the time) from the DAO treasury; reporting says the tokens appear to have been sent to the Foundation before token holders approved, and token holders were voting heavily against AIP-1. The Foundation also sold 50 million ARB from that allocation before the vote (40 million to an "experienced market participant", the rest for fiat to cover costs). The Foundation split AIP-1 into separately voted proposals (announced 2023-04-05) and pledged not to move the remaining 700 million ARB until the DAO approved a budget and vesting schedule. A later proposal to return 700 million ARB to the DAO treasury (AIP-1.05) failed on 2023-04-15 (84.01% against).

**OAK Techniques observed:** **OAK-T16.002** (Hostile Vote Treasury Drain) — broadly construed; the Arbitrum Foundation exercised *de facto* governance authority over the DAO Treasury by taking control of 750M ARB tokens ahead of, and despite, a token-holder vote that was going heavily against it. The structural shape — treasury assets moved by a controlling entity without token-holder governance approval — is the defining T16 pattern, even though the entity exercising control was the protocol's own Foundation rather than an external adversary. The case is **not a clean adversarial-technique anchor** — the Foundation was not an attacker in the conventional sense — but is included in the OAK corpus as the cleanest documented example of the **legal-wrapper-governance-bypass** risk surface, which is a standing structural risk for every DAO whose treasury is held by a legal entity that can exercise control outside the on-chain governance process. **Flagged for `TAXONOMY-GAPS.md`** as evidence that the T16 surface includes both adversarial exploitation of governance mechanisms AND legal-wrapper governance bypass by protocol-affiliated entities.

**Attribution:** **confirmed** (protocol's own Foundation). The Foundation's decisions are on the public record via its own communications, the Arbitrum DAO governance forum and contemporaneous press coverage. No adversarial attribution is necessary; the entity exercising control was the protocol's own steward.

**Corrected 2026-10-11:** the earlier text said the Foundation returned the 750M ARB to the DAO treasury and that the loss was effectively zero; sources show the return proposal failed, 50M ARB was sold before the vote, and the transfer was not "discovered" on a specific 2023-04-01 date. Unsourced dates, a "Cayman Islands" detail and the 625K-address airdrop figure were removed.

**Key teaching point:** **A legal-wrapper entity that can move DAO Treasury tokens without on-chain token-holder approval is a single point of governance failure, regardless of that entity's intent.** The structural risk exists for every protocol whose treasury is held by a legal entity that exercises practical control over treasury multisigs; here the community's social pressure won concessions (a split proposal, a vesting contract, lower proposal thresholds) but did not reverse the transfer.

## Summary

The ARB token distribution began on 2023-03-23. AIP-1, the Foundation's governance package, asked the community to approve transferring control of 750 million ARB to the Foundation to fund ecosystem grants. Token holders voted heavily against it (more than 78% opposed at one point, per CoinDesk), while reporting indicated the tokens had seemingly already been sent to the Foundation, and users observed that 50 million ARB had been sold before the vote.

On 2023-04-03 The Block reported the Foundation would break AIP-1 into parts, with the 750M allocation voted separately. On 2023-04-05 the Foundation proposed AIP-1.1 (four-year vesting, budgeting principles, transparency reports) and AIP-1.2 (lowering the threshold for submitting a proposal from 5M to 1M ARB), and pledged not to move the remaining 700M ARB until the DAO approved a budget and vesting schedule. On 2023-04-15 AIP-1.05, which would have returned 700M ARB to the DAO treasury, failed: 118M ARB (84.01%) against, 21M (14.57%) for.

The OAK significance is the structural risk surface: the Foundation could move treasury-designated tokens ahead of a vote, and the later return vote failed, so the outcome was decided by token-holder politics rather than by a cryptographic control.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-03-23 | ARB token distribution begins | (DAO launch) |
| Before AIP-1 vote ended | 750M ARB appears to have been sent to the Foundation; 50M ARB sold (40M to a market participant) | **T16 governance bypass (treasury movement without vote)** |
| 2023-04-03 | The Block reports the Foundation will split AIP-1 after backlash | (community response) |
| 2023-04-05 | Foundation proposes AIP-1.1 and AIP-1.2; pledges not to move remaining 700M ARB pending DAO-approved budget and vesting | (Foundation concession) |
| 2023-04-15 | AIP-1.05 (return 700M ARB to DAO treasury) fails, 84.01% against | (vote outcome) |

## What defenders observed

- **The bypass surface exists whenever a legal entity holds the multisig keys for tokens the community regards as DAO-controlled.** A treasury held by a legal entity is cryptographically entity-controlled with a social commitment to honour token-holder votes.
- **Community pressure produced procedural concessions, not a return of funds.** Defenders modelling governance risk should not treat social pressure as a reliable reversal mechanism.
- **Ratification-versus-authorisation framing matters.** Whether a vote precedes or follows the movement of assets determines whether governance controls the action.

## Public references

- `[arbblockbreak]` — The Block, "Arbitrum to break up \$1 billion proposal after backlash" (2023-04-03): <https://www.theblock.co/post/224459/ajames@theblock.co>
- `[arbforklog]` — Forklog, "Arbitrum Foundation proposes new AIPs after community pushback" (2023-04-06): <https://forklog.com/en/arbitrum-foundation-proposes-new-aips-after-community-pushback/>
- `[arbblockfail]` — The Block, "Arbitrum proposal to return 700 million ARB fails by overwhelming majority" (2023-04-15): <https://www.theblock.co/amp/post/226561/arbitrum-proposal-return-funds-failed>
- `[arbcoindesk]` — CoinDesk, "Arbitrum Foundation Offers Crypto Governance Concessions After ARB Holder Uproar" (2023-04-05): <https://coindesk-coindesk-prod.cdn.arcpublishing.com/business/2023/04/05/arbitrum-foundation-offers-crypto-governance-concessions-after-arb-holder-uproar/>
