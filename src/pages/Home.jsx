import { Link } from "react-router-dom";
import { useEffect } from "react";
import hero from "@/assets/hero.jpg";
import belt from "@/assets/product-belt.jpg";
import bag from "@/assets/product-bag.jpg";
import knife from "@/assets/product-knife.jpg";
import { useProducts } from "@/data/products";
import { Header, PromoBar } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/ProductGrid";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  const products = useProducts();

  useEffect(() => {
    document.title = "HIBBA TRADING — Where Sophistication Begins";
  }, []);

  const featured = products.slice(0, 6);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PromoBar />
      <Header />
      <Hero />
      <ServiceRow />
      <Categories />
      <section id="shop" className="mx-auto max-w-7xl px-6 py-16">
        <Reveal className="text-center">
          <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">Just in</p>
          <h2 className="mt-2 font-script text-5xl md:text-6xl">New Arrivals</h2>
          <div className="mx-auto mt-3 h-px w-12 bg-foreground" />
        </Reveal>
        <div className="mt-12">
          <ProductGrid items={featured} />
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-block border border-foreground px-8 py-3 text-[11px] uppercase tracking-luxury hover:bg-foreground hover:text-background"
          >
            View all products
          </Link>
        </div>
      </section>
      <SplitBanner />
      <Story />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative">
      <div className="relative h-[78vh] min-h-[520px] w-full overflow-hidden bg-secondary">
        <img src={hero} alt="Handcrafted leather and damascus steel knife" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
          <div className="max-w-xl text-background">
            <p className="text-[11px] uppercase tracking-luxury text-background/80">The new collection · 2026</p>
            <h1 className="mt-6 font-script text-7xl leading-[0.9] md:text-8xl">Leather,</h1>
            <p className="mt-4 text-2xl font-light uppercase tracking-[0.3em] md:text-3xl">
              Where Sophistication
              <br />
              Begins
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="border border-background bg-background px-8 py-3 text-[11px] uppercase tracking-luxury text-foreground transition hover:bg-transparent hover:text-background"
              >
                Shop the collection
              </Link>
              <Link
                to="/about"
                className="border border-background px-8 py-3 text-[11px] uppercase tracking-luxury text-background transition hover:bg-background hover:text-foreground"
              >
                Discover the craft
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceRow() {
  const items = [
    { title: "30,000+ Loyal Customers", note: "Trusted across Pakistan" },
    { title: "Fast Shipping", note: "Delivered in 3–7 days" },
    { title: "Complimentary Gift Packing", note: "On every order" },
  ];
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 100} className="px-6 py-8 text-center">
            <p className="text-sm font-medium uppercase tracking-wider">{it.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{it.note}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Categories() {
  const cats = [
    { title: "Men", note: "Wallets · Belts · Briefcases", img: belt, to: "/men" },
    { title: "Women", note: "Bags · Wallets · Accessories", img: bag, to: "/women" },
    { title: "Knives & Blades", note: "Kitchen · Pocket · Damascus", img: knife, to: "/knives" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-6 md:grid-cols-3">
        {cats.map((c, i) => (
          <Reveal key={c.title} delay={i * 120} as={Link} className="group block" >
            <Link key={c.title} to={c.to} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-background">
                  <p className="text-[11px] uppercase tracking-luxury text-background/80">Shop</p>
                  <h3 className="mt-1 font-script text-4xl">{c.title}</h3>
                  <p className="text-xs uppercase tracking-wider">{c.note}</p>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SplitBanner() {
  return (
    <section className="grid gap-0 md:grid-cols-2">
      <div className="relative h-[60vh] min-h-[420px] bg-secondary">
        <img src={bag} alt="Women's leather" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-10 text-background">
          <div>
            <p className="font-script text-5xl">For Her</p>
            <Link
              to="/women"
              className="mt-4 inline-block border border-background px-6 py-2 text-[11px] uppercase tracking-luxury hover:bg-background hover:text-foreground"
            >
              Discover
            </Link>
          </div>
        </div>
      </div>
      <div className="relative h-[60vh] min-h-[420px] bg-secondary">
        <img src={belt} alt="Men's leather" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-10 text-background">
          <div>
            <p className="font-script text-5xl">For Him</p>
            <Link
              to="/men"
              className="mt-4 inline-block border border-background px-6 py-2 text-[11px] uppercase tracking-luxury hover:bg-background hover:text-foreground"
            >
              Discover
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="bg-secondary/60">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">The HIBBA TRADING promise</p>
        <h2 className="mt-4 font-script text-5xl md:text-6xl">Made by hand. Kept for years.</h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          From third-generation tanners in Lahore to bladesmiths who still forge by coal, every HIBBA TRADING piece is
          inspected, signed, and backed by our lifetime repair promise. Designed in Pakistan. Loved across the world.
        </p>
        <Link
          to="/about"
          className="mt-10 inline-block border border-foreground px-8 py-3 text-[11px] uppercase tracking-luxury transition hover:bg-foreground hover:text-background"
        >
          Read our story
        </Link>
      </div>
    </section>
  );
}
