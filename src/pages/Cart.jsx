import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header, PromoBar } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuantitySelector } from "@/components/QuantitySelector";
import { useCart } from "@/context/CartContext";
import { formatPKR } from "@/data/products";

const FREE_SHIP = 1990;

export default function Cart() {
  const { detailed, setQty, remove, subtotal, clear, count } = useCart();
  const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIP ? 0 : 250;
  const total = subtotal + shipping;

  useEffect(() => {
    document.title = "Your Bag — HIBBA TRADING";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PromoBar />
      <Header />

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">Checkout</p>
          <h1 className="mt-2 font-script text-5xl md:text-6xl">Your Bag</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {count} item{count === 1 ? "" : "s"}
          </p>
        </div>

        {detailed.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground">Your bag is empty.</p>
            <Link
              to="/shop"
              className="mt-6 inline-block border border-foreground px-8 py-3 text-[11px] uppercase tracking-luxury hover:bg-foreground hover:text-background"
            >
              Shop the collection
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-12 lg:grid-cols-3">
            <ul className="divide-y divide-border lg:col-span-2">
              {detailed.map((it) => (
                <li key={it.slug} className="flex gap-5 py-6">
                  <Link to={`/products/${it.slug}`} className="block h-28 w-28 shrink-0 overflow-hidden bg-secondary">
                    <img src={it.product.img} alt={it.product.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">{it.product.sku}</p>
                        <Link to={`/products/${it.slug}`} className="mt-1 block text-sm font-medium uppercase tracking-wider hover:underline">
                          {it.product.name}
                        </Link>
                      </div>
                      <p className="text-sm">{formatPKR(it.product.price * it.qty)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <QuantitySelector qty={it.qty} onChange={(v) => setQty(it.slug, v)} />
                      <button
                        onClick={() => remove(it.slug)}
                        className="text-[11px] uppercase tracking-luxury text-muted-foreground hover:text-foreground"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit border border-border p-6">
              <h2 className="text-[11px] uppercase tracking-luxury">Order summary</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd>{formatPKR(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd>{shipping === 0 ? "Free" : formatPKR(shipping)}</dd>
                </div>
                {subtotal < FREE_SHIP && (
                  <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">
                    Add {formatPKR(FREE_SHIP - subtotal)} more for free delivery
                  </p>
                )}
                <div className="flex justify-between border-t border-border pt-3 text-base font-medium">
                  <dt>Total</dt>
                  <dd>{formatPKR(total)}</dd>
                </div>
              </dl>
              <Link
                to="/checkout"
                className="mt-6 block w-full border border-foreground bg-foreground px-6 py-3 text-center text-[11px] uppercase tracking-luxury text-background transition hover:bg-transparent hover:text-foreground"
              >
                Checkout
              </Link>
              <button onClick={clear} className="mt-3 w-full text-[11px] uppercase tracking-luxury text-muted-foreground hover:text-foreground">
                Clear bag
              </button>
            </aside>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
