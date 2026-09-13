export function QuantitySelector({ qty, onChange, min = 1 }) {
  return (
    <div className="flex items-center border border-border">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, qty - 1))}
        className="px-3 py-1 text-base hover:bg-secondary"
      >
        −
      </button>
      <span className="w-8 text-center text-sm">{qty}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(qty + 1)}
        className="px-3 py-1 text-base hover:bg-secondary"
      >
        +
      </button>
    </div>
  );
}
