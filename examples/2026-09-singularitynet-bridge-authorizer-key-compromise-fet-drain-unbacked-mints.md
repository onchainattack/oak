# SingularityNET bridge — one stolen authorizer key, a signature that did not name the recipient, and no cap on the inbound path — SingularityNET Ethereum–Cardano bridge / Fetch.ai, NuNet, SingularityNET, World Mobile / Ethereum — 2026-09-19

**Loss:** **8,721,530 FET (~\$1.53–1.55M)** drained from **`TokenConversionManagerV3`** (`0xab424A430CC09864fA1277A38193111705ADF3A3`) in a single `conversionIn` call — the contract's entire FET balance. Within the same window the attacker minted **408.53M NTX** (NuNet; ~42% of supply; ~\$463K at mint, ~\$1.44M realised in dumps), **260M AGIX** and **~53.8M WMTx** on Ethereum. Attacker-controlled holdings were reported at **~\$16.77M**, most of it newly minted tokens whose realisable value is far lower.

**OAK Techniques observed:** **OAK-T10.001** (Validator / Signer Key Compromise — *primary, operator-stated*. Fetch.ai states the attack used **"a stolen SingularityNET bridge authorizer key used to produce a valid signature for the converter call, alongside a separately compromised NuNet mint key used within the same window."** The authorizer was reported as an **offline, nonce-zero key existing solely to sign backend approvals**. See [`techniques/T10.001-validator-signer-key-compromise.md`](../techniques/T10.001-validator-signer-key-compromise.md)). **OAK-T5.003** (Hidden-Mint Dilution — *effect-side*, for the unbacked NTX / AGIX / WMTx mints dumped into liquidity).

**Two design amplifiers, reported by on-chain analysts and not disputed by the teams:** the authorizer's signature **did not bind the recipient address**, so a valid signature could pay any wallet; and **`conversionIn` had no per-conversion limit**, unlike `conversionOut`. The anomalous conversion ID also differed in format from the ~100 legitimate UUID-style IDs before it — a signal that was on-chain before the drain completed.

**Attribution:** **pseudonymous.** One wallet links the FET drain and the NTX mint.

**Key teaching point:** **A single-signer bridge whose signature authorises "a conversion" rather than "this amount to this address" is a blank cheque, and the only question is who holds the pen.** Key custody failed here, but key custody failing is the case bridge design exists for. What converted one stolen key into a full drain was that the signed message was under-specified and the inbound path was uncapped. Bind recipient and amount into the signed payload; rate-limit the inbound direction at least as tightly as the outbound; and rotate on suspicion — as of 2026-09-21, on-chain monitoring reported **neither the authorizer nor the NuNet minter role had been rotated or revoked**.

## Summary

On the evening of **2026-09-19** a single call to `conversionIn` on the Ethereum side of the SingularityNET Ethereum–Cardano bridge paid out the contract's entire **8,721,530 FET** to an attacker wallet, authorised by a valid signature from the bridge's conversion authorizer. **About 29 minutes later** the same wallet minted **408.53M NTX** using a compromised NuNet minter key. Further unbacked mints of **260M AGIX** and **~53.8M WMTx** followed. Teams paused conversions and deactivated affected contracts.

## Timeline (UTC, 2026-09-19 unless noted)

| When | Event | OAK ref |
|---|---|---|
| undisclosed | Bridge authorizer key and NuNet minter key compromised | **T10.001** (vector undisclosed) |
| evening | `conversionIn` with valid signature and anomalous conversion ID drains 8,721,530 FET | **T10.001 — exploitation** |
| +29 min | 408.53M NTX minted to same wallet | **T5.003** |
| 09-19 → 09-20 | 260M AGIX and ~53.8M WMTx minted on Ethereum | **T5.003** |
| 09-20 → 21 | Conversions paused; contracts deactivated; keys reported not yet rotated | (response) |

## What defenders observed

- **The ID format was the tripwire.** A conversion ID that did not match the format of every prior legitimate conversion is a cheap, exact anomaly. It fires on the first malicious call.
- **Two keys, one wallet, one half-hour.** Separately held keys for separate projects compromised in the same window points to a shared custody environment upstream — the kind of co-location T11.011 describes — though no team has said so.
- **Minted value is not realised value.** The \$16.77M headline counts tokens at a price their dumping destroys; the realised figure is the FET drain plus what the mints sold for.

## Public references

- `[mpostsnet2026]` — Metaverse Post, "Key Compromise Behind Fetch.ai-Linked Bridge Attack Drives Losses To \$16.77M" (nonce-zero authorizer; recipient not bound; no `conversionIn` limit; anomalous conversion ID): <https://mpost.io/key-compromise-behind-fetch-ai-linked-bridge-attack-drives-losses-to-16-77m/>
- `[cryptotimessnet2026]` — The Crypto Times, "SingularityNET Bridge Hack Widens: 260M AGIX, 53.8M WMTx Minted, \$16.77M Held by Attacker" (2026-09-21): <https://www.cryptotimes.io/2026/09/21/singularitynet-bridge-hack-widens-260m-agix-53-8m-wmtx-minted-16-77m-held-by-attacker/>
- `[cryptoslatefetch2026]` — CryptoSlate, "One wallet links \$1.55 million FetchAI theft to massive 408.5 million NTX mint": <https://cryptoslate.com/one-wallet-links-1-55-million-fetchai-theft-to-massive-408-5-million-ntx-mint/>
- `[cryptopolitanfetch2026]` — Cryptopolitan, "Fetch.ai and NuNet hit in attacks linked to a compromised private key": <https://www.cryptopolitan.com/fetch-ai-and-nunet-hit-in-attacks-linked-to-a-compromised-private-key/>
