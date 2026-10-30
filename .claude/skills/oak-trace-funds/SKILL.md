---
name: oak-trace-funds
description: Trace where stolen funds went on-chain for an OAK incident and write or extend its `## Fund flow` oak-flow block, using the keyless tools/explorer.py (Blockscout for EVM, mempool.space for Bitcoin). Use when asked to trace funds, follow the money, fill or check a fund flow, find where the funds went, or replace "undisclosed" fund-flow rows with on-chain facts.
argument-hint: "<examples/file.md> [seed address or tx ...]"
allowed-tools: Read Edit Bash(python3 tools/explorer.py *) Bash(python3 tools/check_flow.py *) Bash(python3 tools/check_timeline.py *) Bash(python3 tools/build_address_index.py *)
---

# Trace the funds for one OAK incident

Target: $ARGUMENTS

Goal: a `## Fund flow` block a defender can trust. Every hop is either checked on-chain by you (`verified: oak`, with its tx) or relayed from a cited source (`verified: source`, with its citekey). The format is in CONTRIBUTING.md under "Fund flow on worked examples". The reference file is `examples/2026-10-binance-devops-laptop-service-container-hot-wallet-drain.md`.

## Steps

1. **Read the example.** Collect the seeds: every full address and tx in Key addresses, the timeline, and the Summary. Note the chain of each. If an address is only published shortened, look at the cited tx first. Its sender and receiver are full on-chain (`python3 tools/explorer.py tx <chain> <hash>`).
2. **Confirm the exploit tx(s).** `python3 tools/explorer.py tx <chain> <hash>` gives the sender, receiver, native and internal value, and token transfers. Token transfers carry `trusted`; ignore `trusted: false` (counterfeit tokens).
3. **Trace outgoing.** Use `python3 tools/explorer.py trace <chain> <attacker/receiver address> --hops 1 --before <ISO a few days after>`. Raise `--hops` only for intermediaries that look like the attacker's own wallets (fresh, gas-funded, forward everything). The tool stops at labelled endpoints: DEX pools, bridges, mixers, exchanges, burn.
4. **Review every candidate edge before keeping it:**
   - Is the receiver plausibly the attacker's? Fresh wallets funded with gas and then one asset are hop wallets. A large DEX pool is a sale, not a hop.
   - **Lookalikes.** If two addresses share a prefix and suffix, open both. Poisoning bots imitate attacker wallets. Only follow transfers the attacker actually signed or that real contracts moved.
   - Zero-value and counterfeit-token transfers are already skipped. If the tool reports many `skipped_unverified_token_transfers`, say so in the prose.
   - Do the amounts add up against the source's figures? If they differ, say how, and keep both with their basis.
5. **Write the block.** `--yaml` output is the starting point. Then:
   - Give nodes readable `label`s and the right `role`.
   - Collapse long DEX-sale lists into one `dex` node, with the asset list, `tx_count` and the time range.
   - Add `verified: source` edges for hops you could not check yourself: other chains not yet supported, issuer freezes, figures only the source has.
   - Set `as_of` to the trace time (UTC).
6. **Write the prose under the block: "What the trace adds beyond the sources".** List each new fact, each contradiction resolved or found, and each limit, such as "chain X not traced: provider not implemented".
7. **Update the timeline's fund-flow rows and Key addresses** with the full addresses you confirmed. Mark them "traced by OAK".
8. **Validate.** Run `python3 tools/check_flow.py --file <file>`, then `python3 tools/check_timeline.py --file <file>`, then `python3 tools/build_address_index.py --shared`. If the index shows an address shared with another incident, report it as a possible link (T8.001 candidate). Never treat it as proof by itself.

## Limits (say them, don't hide them)

- Supported: Ethereum, Base, Arbitrum, Optimism, Polygon and Gnosis via Blockscout; Bitcoin via mempool.space. Not yet supported: BSC, Avalanche, Solana, Tron, XRP. Those hops stay `verified: source`, or go undisclosed.
- Explorer labels are hints, not attribution. A "Binance" tag on a deposit address means the funds entered Binance. It does not mean Binance is involved.
- Do not invent USD values. Use the asset amounts, and cite the source for any dollar figures.
