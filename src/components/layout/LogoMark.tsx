

export default function LogoMark() {
  const shards = [
    { x: 38, y: 30, s: 3, op: 1 },
    { x: 33, y: 30, s: 3, op: 0.85 },
    { x: 28, y: 30, s: 2.5, op: 0.7 },
    { x: 22, y: 30, s: 2.5, op: 0.55 },
    { x: 17, y: 30, s: 2, op: 0.45 },
    { x: 12, y: 31, s: 2, op: 0.35 },
    { x: 7, y: 31, s: 1.5, op: 0.28 },
    { x: 35, y: 25, s: 2, op: 0.6 },
    { x: 30, y: 35, s: 2, op: 0.5 },
  ];
  return (
    <a className="logo-lockup" href="/" aria-label="OAK home">
      <span className="oak-logo-mark" aria-hidden="true">
        <svg viewBox="0 0 64 64" focusable="false" xmlns="http://www.w3.org/2000/svg">
          <polygon
            className="mark-hex"
            points="42,4 60,18 60,46 42,60 24,46 24,18"
          />
          <rect className="mark-row" x="29" y="18" width="22" height="3" />
          <rect className="mark-row mark-row-breach" x="41" y="30" width="10" height="3" />
          <rect className="mark-row" x="29" y="42" width="22" height="3" />
          {shards.map((shard, i) => (
            <rect
              key={i}
              className="mark-shard"
              x={shard.x}
              y={shard.y}
              width={shard.s}
              height={shard.s}
              opacity={shard.op ?? 1}
            />
          ))}
        </svg>
      </span>
      <span className="brand-text">
        <strong>OAK</strong>
        <small>OnChain Attack Knowledge</small>
      </span>
    </a>
  );
}
