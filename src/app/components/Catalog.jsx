'use client';

import { useEffect, useState, useMemo } from 'react';
import ProductList from './ProductList';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import CartSummary from './CartSummary';
import StatusMessage from './StatusMessage';

export default function Catalog() {
  // State 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({ category: '', price: '' });
  const [cart, setCart] = useState({}); // { [id]: qty }

  // Fetch Data
  useEffect(() => {
    let alive = true;
    setLoading(true);

    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (alive) setProducts(data);
      } catch (err) {
        if (alive) setError(err.message || 'Failed to load products.');
      } finally {
        if (alive) setLoading(false);
      }
    }

    fetchProducts();
    return () => {
      alive = false;
    };
  }, []);

  // Simulate Stock Updates
  useEffect(() => {
    if (products.length === 0) return;
    const id = setInterval(() => {
      setProducts(prev =>
        prev.map(p =>
          Math.random() < 0.25
            ? { ...p, stock: Math.max(0, p.stock - 1) }
            : p
        )
      );
    }, 5000);
    return () => clearInterval(id);
  }, [products.length]);

  // Derived Data
  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category));
    return Array.from(set).sort();
  }, [products]);

  const filtered = useMemo(() => {
    const max = filters.price ? Number(filters.price) : Infinity;
    const cat = filters.category;
    return products.filter(
      p => (cat ? p.category === cat : true) && p.price <= max
    );
  }, [products, filters]);

  // Cart Actions
  const addToCart = (product) => {
    if (product.stock <= 0) return;
    setCart(c => ({ ...c, [product.id]: (c[product.id] || 0) + 1 }));
  };

  const decrementFromCart = (productId) => {
    setCart(c => {
      const qty = (c[productId] || 0) - 1;
      const next = { ...c };
      if (qty <= 0) delete next[productId];
      else next[productId] = qty;
      return next;
    });
  };

  const resetCart = () => setCart({});

  // Cart Summary Data
  const { itemCount, total } = useMemo(() => {
    let count = 0;
    let sum = 0;
    for (const [pid, qty] of Object.entries(cart)) {
      const p = products.find(x => x.id === pid);
      if (!p) continue;
      count += qty;
      sum += p.price * qty;
    }
    return { itemCount: count, total: sum };
  }, [cart, products]);

  // Conditional UI
  if (loading) return <StatusMessage state="loading" />;
  if (error) return <StatusMessage state="error" message={error} />;

  // Render
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Product Catalog
      </h2>

      <div className="grid gap-4 md:grid-cols-3 items-end">
        <CategoryFilter
          categories={categories}
          value={filters.category}
          onChange={v => setFilters(f => ({ ...f, category: v }))}
        />
        <PriceFilter
          value={filters.price}
          onChange={v => setFilters(f => ({ ...f, price: v }))}
        />
        <CartSummary
          itemCount={itemCount}
          total={total}
          onDecrement={decrementFromCart}
          onReset={resetCart}
          cart={cart}
        />
      </div>

      {filtered.length === 0 ? (
        <StatusMessage state="empty" />
      ) : (
        <ProductList products={filtered} onAddToCart={addToCart} />
      )}
    </section>
  );
}