

export default function Breadcrumb({
  items,
  onBack,
}: {
  items: Array<{ label: string; onClick?: () => void }>;
  onBack: () => void;
}) {
  return (
    <div className="breadcrumb">
      <button type="button" className="breadcrumb-back" onClick={onBack} aria-label="Back">
        ←
      </button>
      <ol className="breadcrumb-trail">
        {items.map((item, idx) => (
          <li key={idx}>
            {item.onClick ? (
              <button type="button" onClick={item.onClick}>{item.label}</button>
            ) : (
              <span>{item.label}</span>
            )}
            {idx < items.length - 1 && <span className="breadcrumb-sep" aria-hidden>›</span>}
          </li>
        ))}
      </ol>
    </div>
  );
}
