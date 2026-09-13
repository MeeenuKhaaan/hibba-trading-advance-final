import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header, PromoBar } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/ProductGrid";

export default function Wishlist() {
  const { items } = useWishlist();
  const list = products.filter((p) => items.includes(p.slug));

  useEffect(() => {
    document.title = "Wishlist — HIBBA TRADING";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PromoBar />
      <Header />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">Saved</p>
          <h1 className="mt-2 font-script text-5xl md:text-6xl">Your Wishlist</h1>
          <div className="mx-auto mt-3 h-px w-12 bg-foreground" />
        </div>
        <div className="mt-12">
          {list.length === 0 ? (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">No saved pieces yet.</p>
              <Link
                to="/shop"
                className="mt-6 inline-block border border-foreground px-8 py-3 text-[11px] uppercase tracking-luxury hover:bg-foreground hover:text-background"
              >
                Browse the collection
              </Link>
            </div>
          ) : (
            <ProductGrid items={list} />
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
