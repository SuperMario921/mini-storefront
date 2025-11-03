'use client';

export default function ProductCard({ product, onAdd }) {
    // Check to see if the product is out of stock
    const outOfStock = product.stock <= 0;

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
      <span className="text-xs text-gray-500 mb-1">{product.category}</span>
      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
      <div className="text-green-600 font-bold text-xl mb-2">${product.price.toFixed(2)}</div>
      <div className="text-sm mb-4">
        {outOfStock ? (
          <span className="text-red-600 font-medium">Out of stock</span>
        ) : (
          <span className="text-gray-600">Stock: {product.stock}</span>
        )}
      </div>
      <button
        onClick={() => onAdd(product)}
        disabled={outOfStock}
        className={`mt-auto w-full py-2 rounded-md font-medium transition-colors duration-200 ${
          outOfStock
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {outOfStock ? 'Unavailable' : 'Add to Cart'}
      </button>
    </div>
  );
}
