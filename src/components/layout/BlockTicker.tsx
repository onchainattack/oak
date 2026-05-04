import { useEffect, useState } from "react";

export default function BlockTicker() {
  const [block, setBlock] = useState<number>(() => {
    // Approximate: Ethereum block height as of Apr 2026 ~ 21.4M, +1 every 12s
    const ETH_GENESIS = new Date("2015-07-30T15:26:13Z").getTime();
    const elapsed = Date.now() - ETH_GENESIS;
    return Math.floor(elapsed / 12000);
  });

  useEffect(() => {
    const id = setInterval(() => setBlock((b) => b + 1), 12000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="block-ticker" title="Approximate Ethereum block height (illustrative)">
      <span className="bt-dot" />
      <span className="bt-label">BLOCK</span>
      <span className="bt-num">{block.toLocaleString("en-US").replace(/,/g, " ")}</span>
    </div>
  );
}
