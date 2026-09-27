# Neutron proposal 9 — \$20K of tokens bought eleven minutes before the tally made the attacker admin of ten contracts — Neutron (Cosmos consumer chain) / Astroport, Drop — 2026-09-22

**Loss:** **~\$9.4M** in assets held by **ten contracts** (eight Astroport, two Drop) per GoPlus, drained within roughly **24 minutes** of the proposal executing. About **\$1.8–1.96M** was bridged to Ethereum before pauses took effect. On the **Cosmos Hub**, validators halted the chain for **~24h48m** and on restart on **2026-09-23** the first block moved **~1.23M ATOM (~\$2.2M)** from an attacker-linked wallet to a community-controlled recovery address — recorded as response and disposition, not as mitigation of the mechanism.

**OAK Techniques observed:** **OAK-T16.002** (Hostile-Vote Treasury Drain — *primary, confirmed mechanism*. Voting power was **bought on the open market** — one account spent **20,199 USDC on ~31.6M NTRN** and staked it **less than 12 minutes before voting closed** — and used to pass a proposal whose payload benefited the proposer. The payload did not move treasury funds directly; it contained **`MsgUpdateAdmin` messages naming the proposer's own key as admin** of the target contracts, and the attacker then used **`MsgMigrateContract`** to point them at malicious code with a `withdraw_all` function. See [`techniques/T16.002-hostile-vote-treasury-drain.md`](../techniques/T16.002-hostile-vote-treasury-drain.md)). **OAK-T9.003** (Governance Attack — generic parent, preserved on every T16.002 example). **OAK-T6.005** (Proxy-Upgrade Malicious Switching — the extraction step: admin rights were converted into value by migrating the contracts to attacker code).

**Proposal-text-vs-payload divergence** is load-bearing: proposal 9 was titled **"AIATO: AI Agent Takeover. Phase 1: Agent Admin Registration"** and described research into letting AI agents run a test network. The on-chain messages reassigned contract admin. That is T16.002's documented at-event indicator in its clearest form.

**Attribution:** **pseudonymous.** On-chain identifiers only.

**Key teaching point:** **On a CosmWasm chain, governance is the root admin of every contract, so the cost of owning every contract is the cost of passing one proposal — and here that cost was \$20,199.** `MsgUpdateAdmin` is a design feature: chain governance can rewrite any contract's admin. That makes the chain's quorum and vote-weight price a security parameter for every application deployed on it, whether or not those applications have governance of their own. Three controls follow: **admin-changing messages must not be eligible for an expedited track**; **stake that arrives after a proposal enters voting must not count toward it**; and **applications holding user funds should set their admin to an address the chain's governance cannot overwrite** or accept that their security is NTRN's market cap at the tally hour.

## Summary

Proposal 9 was filed on **2026-09-19** on Neutron's **expedited three-day track**. Its text described an AI-agent research initiative; its messages were **`MsgUpdateAdmin` calls** handing admin of Astroport and Drop contracts to the proposer. Near the close, an account bought **~31.6M NTRN for 20,199 USDC** and staked it in the final minutes. The tally at **02:24 UTC on 2026-09-22** recorded **81.88% yes**.

With admin in hand, the attacker migrated the contracts to code carrying a `withdraw_all` function and emptied them in about 24 minutes. Roughly \$1.8–1.96M left for Ethereum. Astroport warned users to withdraw liquidity; the Cosmos Hub halted, restarted a day later, and in its first block moved ~1.23M ATOM from an attacker-linked wallet to a recovery address — a state intervention recorded here as neutral response metadata.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2026-09-19 | Proposal 9 filed, expedited track; text: AI-agent research; payload: `MsgUpdateAdmin` × contracts | **T16.002 — text/payload divergence** |
| 2026-09-22, final minutes of voting | ~31.6M NTRN bought for 20,199 USDC and staked | **T16.002 — vote-weight acquisition** |
| 2026-09-22 02:24 | Tally: 81.88% yes; admin of ten contracts passes to proposer | **T9.003** |
| +0 to +24 min | `MsgMigrateContract` to malicious code; contracts drained (~\$9.4M) | **T6.005 — extraction** |
| 2026-09-22 | ~\$1.8–1.96M bridged to Ethereum; Astroport warns users; pauses | (response) |
| 2026-09-22 → 23 | Cosmos Hub halted ~24h48m; on restart, ~1.23M ATOM moved to recovery address | (disposition — neutral metadata) |

## What defenders observed

- **The vote was cheap because the token was cheap, and the contracts were valuable because other people's funds were in them.** \$20K of NTRN controlled \$9.4M of third-party assets. The mismatch between the price of governance weight and the value it governs is measurable in advance, per chain, every day.
- **Late stake is the signal.** Voting weight that did not exist when the proposal entered voting and arrived minutes before the tally is observable in real time and has no benign reading on an admin-changing proposal.
- **The payload was machine-readable and the text was not checked against it.** Admin reassignments of ten fund-holding contracts to the proposer's own key is trivial to flag by decoding messages; a reader of the description would see an AI research proposal.

## Public references

- `[cryptoslateneutron2026]` — CryptoSlate, "Neutron DAO passes a new proposal, and \$9.3M in crypto disappears": <https://cryptoslate.com/neutron-dao-passes-a-new-proposal-and-9-3m-in-crypto-disappears/>
- `[cryptonomistneutron2026]` — The Cryptonomist, "Neutron Governance Attack Exposes \$9.4M Blockchain Exploit" (2026-09-23): <https://en.cryptonomist.ch/2026/09/23/neutron-governance-attack-exploit/>
- `[currencyanalyticsneutron2026]` — The Currency Analytics, "Cosmos Hub Goes Dark for 24 Hours After \$9.5 Million Neutron Governance Breach": <https://thecurrencyanalytics.com/altcoins/cosmos-hub-goes-dark-for-24-hours-after-9-5-million-neutron-governance-breach-296455>
- `[w3iggneutron2026]` — web3-is-going-great issue #1306, "Neutron governance takeover drains ~\$9.4M from Astroport and Drop": <https://github.com/molly/web3-is-going-great/issues/1306>
- `[panewsastroport2026]` — PANews, "Neutron Chain Suspected of Security Incident, Astroport Urgently Calls for Withdrawals": <https://panews.io/articles/01a0c906-3cfd-76b7-9593-c2292e152c18>

## Discussion

This is the second T16.002 anchor of the summer after **BonkDAO** (2026-07, [`2026-07-bonkdao-low-quorum-governance-treasury-drain.md`](2026-07-bonkdao-low-quorum-governance-treasury-drain.md)), and it differs in one structural respect: BonkDAO's governance controlled BonkDAO's own treasury, while Neutron's governance controlled **applications that had no governance relationship with NTRN holders at all**. Astroport and Drop users were exposed to a vote they had no stake in. That is a chain-level property of CosmWasm's admin model, and it is worth recording as the sharper lesson: the attack surface is not "a DAO with a thin token" but "every contract on a chain whose governance can reassign admins."
