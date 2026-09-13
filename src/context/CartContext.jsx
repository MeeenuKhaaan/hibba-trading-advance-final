import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProduct } from "@/data/products";

const CartCtx = createContext(null);
const KEY = "hibba.cart.v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const value = useMemo(() => {
    const detailed = items
      .map((i) => {
        const product = getProduct(i.slug);
        return product ? { ...i, product } : null;
      })
      .filter(Boolean);

    return {
      items,
      add: (slug, qty = 1) =>
        setItems((prev) => {
          const existing = prev.find((p) => p.slug === slug);
          if (existing) {
            return prev.map((p) => (p.slug === slug ? { ...p, qty: p.qty + qty } : p));
          }
          return [...prev, { slug, qty }];
        }),
      remove: (slug) => setItems((prev) => prev.filter((p) => p.slug !== slug)),
      setQty: (slug, qty) =>
        setItems((prev) =>
          qty <= 0 ? prev.filter((p) => p.slug !== slug) : prev.map((p) => (p.slug === slug ? { ...p, qty } : p)),
        ),
      clear: () => setItems([]),
      count: detailed.reduce((n, i) => n + i.qty, 0),
      subtotal: detailed.reduce((n, i) => n + i.qty * i.product.price, 0),
      detailed,
    };
  }, [items]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
