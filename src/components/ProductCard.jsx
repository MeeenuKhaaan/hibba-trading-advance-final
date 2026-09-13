import { Link, useNavigate, useLocation } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { formatPKR } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

export function ProductCard({ product }) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const wished = has(product.slug);

  const handleAdd = () => {
    if (!user) {
      navigate(`/auth?redirect=${encodeURIComponent(location.pathname + location.search)}`);
      return;
    }
    add(product.slug, 1);
  };

  return (
    <article className="group">
      <div className="relative overflow-hidden bg-secondary">
        <Link to={`/products/${product.slug}`} className="block">
          {product.isNew && (
            <span className="absolute left-3 top-3 z-10 bg-background px-2 py-1 text-[10px] uppercase tracking-luxury">
              New
            </span>
          )}
          {product.oldPrice && (
            <span className="absolute left-3 top-10 z-10 bg-destructive px-2 py-1 text-[10px] uppercase tracking-luxury text-destructive-foreground">
              Sale
            </span>
          )}
          <img
            src={product.img}
            alt={product.name}
            width={900}
            height={900}
            loading="lazy"
            className="aspect-square w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        </Link>
        <button
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggle(product.slug)}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/90 transition hover:scale-110"
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-destructive text-destructive" : ""}`} />
        </button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">{product.sku}</p>
        <Link to={`/products/${product.slug}`} className="mt-1 block text-sm font-medium uppercase tracking-wider hover:underline">
          {product.name}
        </Link>
        <div className="mt-1 flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-foreground text-foreground" />
          <span>{product.rating.toFixed(1)}</span>
          <span>· {product.reviews.length} reviews</span>
        </div>
        <div className="mt-2 flex items-center justify-center gap-2 text-sm">
          <span>{formatPKR(product.price)}</span>
          {product.oldPrice && <span className="text-xs text-muted-foreground line-through">{formatPKR(product.oldPrice)}</span>}
        </div>
        <div className="mt-4 flex justify-center gap-2">
          <Link
            to={`/products/${product.slug}`}
            className="hover-lift border border-foreground px-5 py-2 text-[11px] uppercase tracking-luxury transition-colors hover:bg-foreground hover:text-background"
          >
            View
          </Link>
          <button
            onClick={handleAdd}
            className="hover-lift border border-foreground bg-foreground px-5 py-2 text-[11px] uppercase tracking-luxury text-background transition-colors hover:bg-transparent hover:text-foreground"
          >
            Add to bag
          </button>
        </div>
      </div>
    </article>
  );
}
