import { createContext, useContext, useEffect, useMemo, useState } from "react";

const WishlistCtx = createContext(null);
const KEY = "hibba.wishlist.v1";

export function WishlistProvider({ children }) {
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

  const value = useMemo(
    () => ({
      items,
      has: (slug) => items.includes(slug),
      toggle: (slug) => setItems((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug])),
      remove: (slug) => setItems((prev) => prev.filter((s) => s !== slug)),
      count: items.length,
    }),
    [items],
  );

  return <WishlistCtx.Provider value={value}>{children}</WishlistCtx.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistCtx);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
