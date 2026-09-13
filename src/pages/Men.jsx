import { useEffect, useMemo, useState } from "react";
import { useProducts } from "@/data/products";
import { Header, PromoBar } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryFilterBar } from "@/components/CategoryFilterBar";

export default function Men() {
  const products = useProducts();
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(50000);

  useEffect(() => {
    document.title = "Men — HIBBA TRADING";
  }, []);

  const items = useMemo(() => {
    let list = products.filter((p) => p.gender === "Men" && p.price <= maxPrice);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(s) || p.tagline.toLowerCase().includes(s));
    }
    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "new") list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    return list;
  }, [q, sort, maxPrice]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PromoBar />
      <Header />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">For Him</p>
          <h1 className="mt-2 font-script text-5xl md:text-6xl">Men</h1>
          <div className="mx-auto mt-3 h-px w-12 bg-foreground" />
        </div>
        <CategoryFilterBar q={q} setQ={setQ} sort={sort} setSort={setSort} maxPrice={maxPrice} setMaxPrice={setMaxPrice} count={items.length} />
        <div className="mt-12">
          <ProductGrid items={items} />
        </div>
      </section>
      <Footer />
    </div>
  );
}
