"""Offline tests for tools/check_flow.py: python3 -m unittest discover tools/tests"""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from check_flow import check_text, parse_flow  # noqa: E402

GOOD = """# X

**OAK Techniques observed:** **OAK-T13.004** (x).

## Fund flow

```oak-flow
as_of: 2026-10-30T06:25Z
nodes:
  - {id: b14, chain: ethereum, address: 0x28c6c06298d514db089934071355e5743bf21d60, role: victim-hot-wallet}
  - {id: rcv, chain: ethereum, address: 0x5227f603c1ee34ce3c06efe6477003bdfccb2f8c, role: attacker-receiver}
  - {id: tc, chain: ethereum, role: mixer, label: Tornado Cash}
edges:
  - {from: b14, to: rcv, asset: ETH, amount: 167464, tx: 0x53bd38b816c23e74134786c29a8c18d792777998a3b9326047b583100e88e2f3, technique: T13.004, verified: oak}
  - {from: rcv, to: tc, asset: ETH, verified: source, source: ondology2026}
```

## Public references

- `[ondology2026]` — Ondology: <https://example.org>
"""


class CheckFlowTest(unittest.TestCase):
    def test_good(self):
        self.assertEqual(check_text("2026-10-x.md", GOOD), [])
        flow = parse_flow(GOOD)
        self.assertEqual(len(flow["nodes"]), 3)
        self.assertIsInstance(flow["edges"][0]["tx"], str)

    def test_truncated_address(self):
        bad = GOOD.replace("0x28c6c06298d514db089934071355e5743bf21d60", "0x28c6…1d60")
        self.assertTrue(any("not a full ethereum address" in e for e in check_text("x.md", bad)))

    def test_unknown_role_and_dangling_edge(self):
        bad = GOOD.replace("role: mixer", "role: wizard").replace("to: tc", "to: nowhere")
        errs = check_text("x.md", bad)
        self.assertTrue(any("role 'wizard'" in e for e in errs))
        self.assertTrue(any("'nowhere' is not a node id" in e for e in errs))

    def test_oak_needs_tx_and_source_needs_citekey(self):
        bad = GOOD.replace("tx: 0x53bd38b816c23e74134786c29a8c18d792777998a3b9326047b583100e88e2f3, ", "")
        bad = bad.replace("source: ondology2026", "source: nope")
        errs = check_text("x.md", bad)
        self.assertTrue(any("requires the tx" in e for e in errs))
        self.assertTrue(any("'nope' is not a citekey" in e for e in errs))

    def test_undeclared_technique(self):
        bad = GOOD.replace("technique: T13.004", "technique: T9.016")
        self.assertTrue(any("T9.016 not declared" in e for e in check_text("x.md", bad)))

    def test_required_from_cutoff(self):
        self.assertTrue(check_text("2026-11-x.md", "# no flow"))
        self.assertEqual(check_text("2026-10-x.md", "# no flow"), [])


if __name__ == "__main__":
    unittest.main()
