<!-- Skeleton for examples/YYYY-MM-<project>-<mechanism-slug>.md
     File name: date prefix of the incident (not of the disclosure), then the project, then the mechanism in plain words.
     Delete these comments. Every [...] is to be filled from sources; anything not public is "undisclosed". -->

# [Project] — [one-line mechanism in plain words: what was broken and what it let the attacker do] — [Project / product] / [Chain(s)] — YYYY-MM-DD

**Loss:** **~\$[amount]** ([assets and amounts], per [source]). [Recovered / frozen / returned, with figures and who did it.] [Operator's reimbursement statement, if any.]

**OAK Techniques observed:** **OAK-T[n.nnn]** ([Technique name] — *primary*[, operator-stated / per <firm>]. [Mechanism in 2–4 sentences, with function names and the exact flaw.] See [`techniques/T[n.nnn]-[slug].md`](../techniques/T[n.nnn]-[slug].md)). **OAK-T[...]** ([secondary: funding, flash loan, laundering T7.00x… — only what a source states]).

**Attribution:** **[confirmed | inferred-strong | inferred-weak | pseudonymous | unattributed]** ([attacker address in full, linked], or who attributes it and on what basis).

**Key teaching point:** **[The one control that would have stopped it, as a sentence a defender can act on.]** [One or two sentences of why.]

## Summary

[What happened, in order, in a short paragraph. Who reported it first and when.]

## Timeline (UTC)

[One sentence naming the stages, e.g. **Flaw** … **Take** … **Money** … **Response**. Say where times come from.]

| When | What happened | OAK |
|---|---|---|
| [Before YYYY-MM-DD (undisclosed) / date] | [The flaw or the entry: what existed and since when] | **T[n.nnn]** |
| [date time] | [Preparation: funding (Tornado?), deployments, approvals] | T7.001 / — |
| [date time, linked tx in full] | [Execution: what the exploit transaction did] | **T[n.nnn]** |
| [date time] | [Where the funds went: swaps, bridges, mixers, CEX, holding address in full, or "not moved as of …" / frozen / returned / undisclosed] | T7.00x / — |
| [date time] | [Response: pause, statement, fix, bounty, refunds] | response |

Key addresses:

- [Attacker EOA] — [`0x…full`](https://<explorer>/address/0x…full)
- [Attack contract] — [`0x…full`](…)
- [Vulnerable / victim contract] — [`0x…full`](…)
- [Receiving / holding wallet] — [`0x…full`](…)

## Fund flow

<!-- Required from 2026-11. Fill with the oak-trace-funds skill. -->

```oak-flow
as_of: YYYY-MM-DDTHH:MMZ
nodes:
  - {id: atk, chain: ethereum, address: 0x…full, role: attacker-eoa, label: "Attacker"}
  - {id: vic, chain: ethereum, address: 0x…full, role: vulnerable-contract, label: "[Contract]"}
edges:
  - {from: vic, to: atk, asset: USDC, amount: 0, tx: 0x…full, time: YYYY-MM-DDTHH:MM:SSZ, technique: T[n.nnn], verified: oak}
```

## Root-cause evidence

- **Technique:** OAK-T[n.nnn]
- **Source:** <https://…>; <https://…>
- **Source type:** operator | government | security-firm | independent-researcher | news
- **Confidence:** confirmed | corroborated | reported | disputed
- **Evidence:** [What the source says that establishes the mechanism; what is still unknown.]

## Public references

- `[citekeyYYYY]` — [Publisher, "Title"] (YYYY-MM-DD): <https://…>
