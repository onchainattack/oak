# Symbiosis — a bridge accepted a message it should have rejected and minted 2^62 raw units of synthetic Bitcoin, of which the market let the attacker keep a third of a million — Symbiosis / BNB Chain + Ethereum — 2026-09-11

**Loss:** **~\$336,000 realised** — roughly **4.39 WBTC** sold on **Uniswap V4** on Ethereum. The **mint** was of a different order entirely: approximately **2^62 raw syBTC units** were issued to a freshly created externally-owned account, which at eight decimals reads as about **46.1 billion syBTC**; some monitors reported figures up to **368.9 billion** by counting repeated transfers across both chains, and roughly **184.5 billion syBTC** was reported still sitting unspent on BNB Chain. OAK records the raw-unit figure as the primitive and the display-unit figures as derived, because they disagree. **Bitcoin itself was unaffected**, non-BTC routes stayed live, and DeFiLlama showed the BTC-bridge TVL at zero after the halt. Classified **DCI-2026-304** by the Delta Incident Archive.

**OAK Techniques observed:** **OAK-T10.002** (Message-Verification Bypass — *primary*. The **BridgeV2** contract **processed a faulty message** and minted synthetic BTC for which **no BTC was ever locked**. Symbiosis's own characterisation is *"inaccurate message validation"*; the specific defect — which field was unchecked, and whether the signature path or the payload path was at fault — **has not been published**, and reporting that describes "signed BridgeV2 transactions" does not settle it. OAK records the class as operator-stated and the mechanism as **undisclosed**. See [`techniques/T10.002-message-verification-bypass.md`](../techniques/T10.002-message-verification-bypass.md)).

**Attribution:** **pseudonymous.** A newly created externally-owned account; no named individual, group, or link to a tracked OAK actor.

**Key teaching point:** **The size of an unbacked mint is chosen by the bug; the size of the loss is chosen by the exit liquidity — and the defender controls neither.** An attacker holding 2^62 units of a synthetic asset walked away with \$336K because there was nowhere to sell the rest. That reads like containment. It was not: the protocol's exposure was **its entire BTC backing**, and the only thing standing between the attacker and it was **AMM depth**, which is a market condition, not a control. Two operational consequences follow. First, **do not triage this class by minted quantity** — "billions of tokens minted" headlines measure the bug's arithmetic, not the money at risk; measure reachable liquidity instead. Second, the control that would actually have caught it is a **supply invariant checked independently of the bridge's own message pipeline**: circulating syBTC must equal BTC held in custody, verified on a timer by something that does not learn about mints from the same code that performs them. That invariant was violated in the block the mint landed, and it is computable by anyone with a node and a custody address.

## Summary

**Symbiosis** is a cross-chain liquidity protocol. Its Bitcoin bridge locks BTC and issues **syBTC**, a synthetic representation, on other networks — here **BNB Smart Chain** and **Ethereum**. Mints are driven by messages processed through the **BridgeV2** contract.

On **2026-09-11 at about 04:28 UTC**, Symbiosis identified evidence of an attack on the Bitcoin bridge and **halted all BTC routing**. BridgeV2 had processed a message it should have rejected, minting syBTC with no corresponding BTC locked. The recipient was a newly created EOA; the quantity, in raw units, was approximately **2^62**.

The attacker converted only a sliver of that balance: about **4.39 WBTC** on Ethereum's Uniswap V4, worth roughly **\$336,000**. The overwhelming majority of the minted supply remained unspent — there was no venue deep enough to absorb it, and an attempt to sell more would have moved the price against itself immediately.

Symbiosis stated the incident resulted from **inaccurate message validation**. Non-BTC routes were unaffected and funds in ETH and stablecoin pools were reported safe. As of **2026-09-12** the protocol has not published the specific validation defect, and the BTC bridge remains stopped.

## Timeline (UTC, 2026-09-11)

| When | Event | OAK ref |
|---|---|---|
| (standing) | Symbiosis BTC bridge locks BTC and issues **syBTC** on BNB Chain and Ethereum via **BridgeV2** messages | (standing T10.002 surface) |
| before 04:28 | BridgeV2 **processes a faulty message**; approximately **2^62 raw syBTC units** minted to a newly created EOA across BNB Chain and Ethereum | **T10.002 exploitation** |
| — | Attacker sells about **4.39 WBTC** worth of syBTC on **Uniswap V4** (~**\$336K**) | (extraction, liquidity-bounded) |
| ~04:28 | Symbiosis identifies the attack and **halts all BTC routing**; non-BTC routes remain operational | (operator response) |
| after | ~**184.5 billion syBTC** reported unspent on BNB Chain; BTC-bridge TVL reads **zero** on DeFiLlama | (residual unbacked supply) |
| 2026-09-12 | Root-cause detail still unpublished; incident classified **DCI-2026-304** | (open disclosure) |

## What defenders observed

- **The monitors disagreed about how much was minted, and all of them were reporting honestly.** 46.1 billion, 262-something, 368.9 billion — the spread comes from decimals handling and from counting repeated transfers as separate mints. The number that does not move is **2^62 raw units**, which is also the number that tells you something: a clean power of two is the signature of an arithmetic or type boundary, not of a quantity someone chose. **Record raw units and decimals; treat display figures as derived**, especially in the first 24 hours when the token count is the headline.
- **Containment came from market depth, and market depth is not a security property.** Had syBTC been paired into deeper venues, or bridged onward to somewhere with an unwitting buyer, the same bug would have produced a nine-figure loss with no change to the attack. Any post-incident writeup that credits the small realised loss to the protocol's controls is misreading it.
- **The halt was fast and correctly scoped.** BTC routing stopped within the same window the evidence surfaced, and nothing else was taken down. Route-level rather than protocol-level kill switches are what made that possible, and they are cheap to build before they are needed.
- **The unbacked supply did not disappear when the bridge stopped.** Billions of syBTC units remain outstanding on BNB Chain, and every downstream venue that ever accepts syBTC as collateral or as a swap input inherits that overhang. **Stopping the mint does not un-mint**, and a bridge's recovery plan needs an explicit answer for the tokens already in the wild.
- **The absence of a published mechanism is a fact about the incident, not a gap in this record.** OAK maps the case to T10.002 on the operator's own description. Contributors should resist promoting "inaccurate message validation" into a specific defect — the difference between an unchecked payload field and a signature-scope error changes which mitigation applies.

## Public references

- `[cryptotimessymbiosis2026]` — The Crypto Times, "Symbiosis Bridge Exploit: Hacker Mints 368.9 Billion Synthetic Bitcoin but Cashes Out Only 4.39 WBTC" (2026-09-11; ~2^62 raw syBTC units to a newly created EOA; ~46.1 billion at eight decimals; ~184.5 billion unspent on BNB Chain; DCI-2026-304): <https://www.cryptotimes.io/2026/09/11/symbiosis-bridge-exploit-hacker-mints-368-9-billion-synthetic-bitcoin/>
- `[cointurksymbiosis2026]` — Coin-Turk, "Symbiosis halts Bitcoin bridge after \$336,000 exploit, highlights cross-chain risks" (halt at ~04:28 UTC; faulty message in BridgeV2; BTC-bridge TVL to zero): <https://en.coin-turk.com/symbiosis-halts-bitcoin-bridge-after-336000-exploit-highlights-cross-chain-risks/>
- `[panewssymbiosis2026]` — PANews, "Cross-Chain Protocol Symbiosis on BSC Attacked, Attacker Cashed Out Approximately \$336,000": <https://panews.io/articles/01a08f10-b400-7221-8662-1187f7117ce5>
- `[cryptopolitansymbiosis2026]` — Cryptopolitan, "Symbiosis halts BTC bridge after exploit, spotlighting cross-chain risk" (non-BTC routes unaffected; ETH and stablecoin pools reported safe): <https://www.cryptopolitan.com/symbiosis-halts-btc-bridge-after-exploit-spotlighting-cross-chain-risk/>

## Discussion

T10.002's 2026 cohort has become the most repetitive class in the corpus. **Syscoin** (2026-06) accepted a proof its parser misread as valid. **Allbridge** (2026-08) accepted an attested message without checking that the asset had actually been minted. **Coreum** (2026-08) accepted a deposit memo without checking that the XRP had actually arrived. Symbiosis accepted a message without checking — per its own statement — something it has not named. Four bridges, four different codebases, one shape: **the bridge verified a property of the message and inferred from it a fact about the world.**

What Symbiosis adds is the other half of the arithmetic, and it pairs directly with **Liquid Network** five days earlier in this same sweep window. Liquid produced unbacked BTC-denominated supply through a **consensus-layer** defect and lost \$320M, because the peg-out path converted it into real BTC on demand. Symbiosis produced unbacked BTC-denominated supply through a **bridge-messaging** defect and lost \$336K, because the only conversion path was an AMM. **Same invariant broken, same asset class, three orders of magnitude apart — and the difference is entirely in what the unbacked units could be exchanged for.** That is the argument for treating *redemption-path depth* as a first-class field when scoring bridge and peg risk, alongside the usual verification-architecture questions.

For contributors documenting the next one: record the mint in raw units, record what the synthetic could be redeemed or sold into, and record whether anything outside the minting pipeline was checking total supply against custody. In all four 2026 cases, the answer to the last question was no.
