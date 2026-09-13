import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

export function ProductGrid({ items }) {
  if (items.length === 0) {
    return <p className="py-16 text-center text-sm text-muted-foreground">No products match your search.</p>;
  }
  return (
    <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p, i) => (
        <Reveal key={p.slug} delay={(i % 6) * 90}>
          <ProductCard product={p} />
        </Reveal>
      ))}
    </div>
  );
}
