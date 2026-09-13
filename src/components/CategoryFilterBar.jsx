import { Search } from "lucide-react";

export function CategoryFilterBar({ q, setQ, sort, setSort, maxPrice, setMaxPrice, count }) {
  return (
    <div className="mt-10 grid gap-4 border-y border-border py-5 md:grid-cols-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search this category..."
          className="w-full border border-border bg-transparent py-2 pl-10 pr-3 text-sm outline-none"
        />
      </div>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border border-border bg-transparent px-3 py-2 text-sm"
      >
        <option value="featured">Featured</option>
        <option value="new">Newest</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
      <label className="flex items-center gap-3 text-xs uppercase tracking-luxury">
        Max Rs.{maxPrice.toLocaleString("en-PK")}
        <input
          type="range"
          min={1000}
          max={50000}
          step={500}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="flex-1 accent-foreground"
        />
        <span className="text-muted-foreground">{count}</span>
      </label>
    </div>
  );
}
