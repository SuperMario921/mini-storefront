'use client';

export default function CartSummary({ items = [], total = 0, onDecrement, onReset }) {
  // Check if cart has any items
  const hasItems = items.length > 0;

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="font-semibold mb-2">Cart</h3>

      {!hasItems ? (
        <p className="text-sm text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="space-y-2 mb-3">
          {items.map(({ id, name, price, qty }) => (
            <li key={id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{name}</div>
                <div className="text-xs text-gray-500">${price.toFixed(2)} x {qty}</div>
              </div>
              <button
                type="button"
                className="text-sm border rounded px-2 py-1 hover:bg-gray-50"
                onClick={() => onDecrement(id)}
                aria-label={`Remove one ${name}`}
              >
                -1
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center justify-between border-t pt-2">
        <span className="font-semibold">Total</span>
        <span className="font-semibold">${total.toFixed(2)}</span>
      </div>

      <button
        type="button"
        className="mt-3 w-full border rounded px-3 py-2 hover:bg-gray-50 disabled:opacity-50"
        onClick={onReset}
        disabled={!hasItems}
      >
        Reset Cart
      </button>
    </div>
  );
}
