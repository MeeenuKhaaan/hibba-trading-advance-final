import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Heart, LayoutDashboard, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { isAdminUser } from "@/data/siteConfig";
import logo from "@/assets/logo.png";

export function PromoBar() {
  return (
    <div className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-2 text-center text-[11px] tracking-luxury uppercase">
        Free delivery on orders Rs.1,990+ · ships 3–7 days
      </div>
    </div>
  );
}

const NAV = [
  { label: "New", to: "/shop" },
  { label: "Men", to: "/men" },
  { label: "Women", to: "/women" },
  { label: "Knives", to: "/knives" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const { count } = useCart();
  const { count: wishCount } = useWishlist();
  const { user } = useAuth();
  const admin = isAdminUser(user);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    setSearchOpen(false);
    setOpen(false);
    navigate(`/shop?q=${encodeURIComponent(q)}`);
  };

  const isActive = (to) => location.pathname === to;

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6 md:py-5">
        <button onClick={() => setOpen(true)} aria-label="Open menu" className="md:hidden">
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/" className="flex items-center gap-2 leading-none">
          <img src={logo} alt="Hibba Trading" className="h-9 w-9 object-contain md:h-10 md:w-10" />
          <span className="font-script text-3xl tracking-tight md:text-4xl">Hibba Trading</span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 gap-8 text-[11px] uppercase tracking-luxury md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={
                isActive(n.to)
                  ? "link-hover text-foreground underline underline-offset-4"
                  : "link-hover text-foreground/80 transition-colors hover:text-foreground"
              }
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-[11px] uppercase tracking-luxury">
          <button onClick={() => setSearchOpen((s) => !s)} aria-label="Search" className="transition-transform hover:scale-110">
            <Search className="h-5 w-5" />
          </button>
          {admin && (
            <Link to="/admin" aria-label="Admin panel" className="hidden transition-transform hover:scale-110 sm:block">
              <LayoutDashboard className="h-5 w-5" />
            </Link>
          )}
          <Link to={user ? "/account" : "/auth"} aria-label="Account" className="hidden transition-transform hover:scale-110 sm:block">
            <User className="h-5 w-5" />
          </Link>
          <Link to="/wishlist" aria-label="Wishlist" className="relative">
            <Heart className="h-5 w-5" />
            {wishCount > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-foreground px-1 text-[9px] text-background">
                {wishCount}
              </span>
            )}
          </Link>
          <Link to="/cart" aria-label="Bag" className="relative">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-foreground px-1 text-[9px] text-background">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {searchOpen && (
        <form onSubmit={submitSearch} className="border-t border-border bg-background">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:px-6">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search wallets, belts, knives…"
              className="flex-1 bg-transparent text-sm outline-none"
            />
            <button className="text-[11px] uppercase tracking-luxury text-muted-foreground hover:text-foreground">
              Search
            </button>
          </div>
        </form>
      )}

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 animate-fade-in bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 animate-slide-in-right bg-background p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={logo} alt="Hibba Trading" className="h-8 w-8 object-contain" />
                <p className="font-script text-3xl">Hibba Trading</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="transition-transform hover:rotate-90">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-10 flex flex-col gap-5 text-sm uppercase tracking-luxury">
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="hover:underline">
                  {n.label}
                </Link>
              ))}
              {admin && (
                <Link to="/admin" onClick={() => setOpen(false)} className="hover:underline">
                  Admin panel
                </Link>
              )}
              <Link to={user ? "/account" : "/auth"} onClick={() => setOpen(false)} className="hover:underline">
                {user ? "My account" : "Sign in"}
              </Link>
              <Link to="/wishlist" onClick={() => setOpen(false)} className="hover:underline">
                Wishlist ({wishCount})
              </Link>
              <Link to="/cart" onClick={() => setOpen(false)} className="hover:underline">
                Bag ({count})
              </Link>
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
}
