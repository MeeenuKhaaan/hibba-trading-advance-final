import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { getProduct, products, formatPKR } from "@/data/products";
import { Header, PromoBar } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuantitySelector } from "@/components/QuantitySelector";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { Reveal } from "@/components/Reveal";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProduct(slug);

  if (!product) {
    return <ProductNotFound />;
  }

  return <ProductView product={product} />;
}

function ProductNotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PromoBar />
      <Header />
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">404</p>
        <h1 className="mt-3 font-script text-5xl">Product not found</h1>
        <Link
          to="/shop"
          className="mt-8 inline-block border border-foreground px-8 py-3 text-[11px] uppercase tracking-luxury hover:bg-foreground hover:text-background"
        >
          Back to shop
        </Link>
      </div>
      <Footer />
    </div>
  );
}

function ProductView({ product }) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(product.sizes?.[0] ?? null);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const wished = has(product.slug);

  useEffect(() => {
    document.title = `${product.name} — HIBBA TRADING`;
    setQty(1);
    setSize(product.sizes?.[0] ?? null);
    setActiveImg(0);
  }, [product.slug]);

  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.img];

  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);

  const requireLogin = () => {
    navigate(`/auth?redirect=${encodeURIComponent(`/products/${product.slug}`)}`);
  };

  const onAdd = () => {
    if (product.sizes && !size) return;
    if (!user) return requireLogin();
    add(product.slug, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const onBuyNow = () => {
    if (product.sizes && !size) return;
    if (!user) return requireLogin();
    add(product.slug, qty);
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PromoBar />
      <Header />

      <nav className="mx-auto max-w-7xl px-6 pt-6 text-[11px] uppercase tracking-luxury text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to={product.category === "Knives" ? "/knives" : "/shop"} className="hover:text-foreground">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-10 md:grid-cols-2 md:py-16">
        <div>
          <div className="relative bg-secondary">
            {product.isNew && (
              <span className="absolute left-4 top-4 z-10 bg-background px-2 py-1 text-[10px] uppercase tracking-luxury">
                New
              </span>
            )}
            <img src={gallery[activeImg]} alt={product.name} width={900} height={900} className="aspect-square w-full object-cover" />
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`overflow-hidden border ${i === activeImg ? "border-foreground" : "border-border"}`}
                >
                  <img src={src} alt="" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">{product.sku}</p>
          <h1 className="mt-3 text-2xl font-medium uppercase tracking-wider md:text-3xl">{product.name}</h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-foreground text-foreground" : "text-border"}`} />
              ))}
            </div>
            <span>
              {product.rating.toFixed(1)} · {product.reviews.length} reviews
            </span>
          </div>
          <p className="mt-3 text-base text-muted-foreground">{product.tagline}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-2xl font-medium">{formatPKR(product.price)}</span>
            {product.oldPrice && <span className="text-base text-muted-foreground line-through">{formatPKR(product.oldPrice)}</span>}
            <span className="text-[11px] uppercase tracking-luxury text-muted-foreground">Inc. all taxes</span>
          </div>

          <div className="mt-8 border-t border-border pt-6 text-sm leading-relaxed text-foreground/90">{product.description}</div>

          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">Details</p>
            <ul className="mt-3 space-y-2 text-sm">
              {product.details.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <span className="mt-2 h-px w-3 shrink-0 bg-foreground" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {product.sizes && (
            <div className="mt-6">
              <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">Size</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`min-w-12 border px-4 py-2 text-sm ${
                      size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-4">
            <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">Quantity</p>
            <QuantitySelector qty={qty} onChange={setQty} />
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={onAdd}
              className="w-full border border-foreground bg-foreground px-8 py-4 text-[11px] uppercase tracking-luxury text-background transition hover:bg-transparent hover:text-foreground"
            >
              {added ? "Added to bag ✓" : `Add to bag · ${formatPKR(product.price * qty)}`}
            </button>
            {!user && (
              <p className="text-center text-[11px] text-muted-foreground">
                Sign in required to add items to your bag —{" "}
                <button type="button" onClick={requireLogin} className="underline hover:text-foreground">
                  sign in
                </button>
              </p>
            )}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onBuyNow}
                className="border border-foreground px-6 py-3 text-[11px] uppercase tracking-luxury transition hover:bg-foreground hover:text-background"
              >
                Buy it now
              </button>
              <button
                onClick={() => toggle(product.slug)}
                className="flex items-center justify-center gap-2 border border-foreground px-6 py-3 text-[11px] uppercase tracking-luxury transition hover:bg-foreground hover:text-background"
              >
                <Heart className={`h-4 w-4 ${wished ? "fill-destructive text-destructive" : ""}`} />
                {wished ? "Saved" : "Save"}
              </button>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6 text-[11px] uppercase tracking-luxury text-muted-foreground">
            <div>
              <p className="text-foreground">Lifetime repair</p>
              <p className="mt-1 normal-case tracking-normal">On every piece</p>
            </div>
            <div>
              <p className="text-foreground">Ships 3–7 days</p>
              <p className="mt-1 normal-case tracking-normal">Across Pakistan</p>
            </div>
            <div>
              <p className="text-foreground">Gift wrapped</p>
              <p className="mt-1 normal-case tracking-normal">Complimentary</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">Customer reviews</p>
            <h2 className="mt-2 font-script text-4xl">What people are saying</h2>
          </div>
          <div className="mt-10 space-y-6">
            {product.reviews.map((r, i) => (
              <article key={i} className="border-b border-border pb-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium uppercase tracking-wider">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
                <div className="mt-1 flex">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={`h-3 w-3 ${j < r.rating ? "fill-foreground text-foreground" : "text-border"}`} />
                  ))}
                </div>
                <p className="mt-3 text-sm text-foreground/90">{r.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-secondary/40">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">You may also like</p>
              <h2 className="mt-2 font-script text-4xl">More {product.category}</h2>
            </div>
            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} to={`/products/${p.slug}`} className="group block text-center">
                  <div className="overflow-hidden bg-background">
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      className="aspect-square w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-4 text-sm font-medium uppercase tracking-wider">{p.name}</p>
                  <p className="mt-1 text-sm">{formatPKR(p.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
