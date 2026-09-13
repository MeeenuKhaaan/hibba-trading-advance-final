import { useEffect, useReducer } from "react";
import wallet from "@/assets/product-wallet.jpg";
import knife from "@/assets/product-knife.jpg";
import belt from "@/assets/product-belt.jpg";
import pocketknife from "@/assets/product-pocketknife.jpg";
import bag from "@/assets/product-bag.jpg";
import knifeset from "@/assets/product-knifeset.jpg";

export const formatPKR = (n) => `Rs.${n.toLocaleString("en-PK")}`;

const baseReviews = [
  { name: "Ahmed K.", rating: 5, text: "Quality is outstanding. Worth every rupee.", date: "2 weeks ago" },
  { name: "Sara M.", rating: 5, text: "Beautiful craftsmanship, very happy with my purchase.", date: "1 month ago" },
  { name: "Bilal R.", rating: 4, text: "Great product, delivery was fast.", date: "3 weeks ago" },
];

const baseProducts = [
  {
    slug: "heritage-bifold-wallet",
    name: "Heritage Bifold Wallet — Tan",
    sku: "MW0813A-003",
    price: 5530,
    oldPrice: 6500,
    category: "Leather",
    gender: "Men",
    img: wallet,
    tagline: "Slim, full-grain, made to patina.",
    description:
      "Hand-cut from a single panel of vegetable-tanned full-grain leather, the Heritage Bifold ages into a deep, personal patina with daily use. Six card slots, two hidden pockets, and a full-length bill compartment.",
    details: [
      "Full-grain vegetable-tanned leather",
      "Hand-stitched with waxed Tiger thread",
      "6 card slots + 2 hidden pockets",
      "Dimensions: 11 × 9 cm",
    ],
    rating: 4.8,
    reviews: baseReviews,
    isNew: true,
    inStock: true,
  },
  {
    slug: "damascus-chef-knife",
    name: "Damascus Chef Knife",
    sku: "KC0220-001",
    price: 18500,
    category: "Knives",
    gender: "Unisex",
    img: knife,
    tagline: "67-layer folded steel, walnut handle.",
    description:
      "A balanced 8-inch chef knife forged from 67 layers of damascus steel with a VG-10 core. The walnut handle is shaped by hand for a neutral grip through hours of prep.",
    details: [
      "VG-10 core, 67-layer damascus",
      "HRC 60-62 hardness",
      "Stabilised walnut handle",
      '8" / 20 cm blade',
    ],
    rating: 4.9,
    reviews: baseReviews,
    inStock: true,
  },
  {
    slug: "hand-stitched-belt",
    name: "Hand-Stitched Belt — Dark Brown",
    sku: "MB0090-002",
    price: 5500,
    category: "Leather",
    gender: "Men",
    img: belt,
    tagline: "One piece of leather. Solid brass.",
    description:
      "Cut from a single strip of bridle leather and finished with a solid brass buckle. Edges are burnished by hand and the keepers are stitched, never glued.",
    details: ["Bridle leather, 4mm thick", "Solid brass buckle", "Hand-burnished edges"],
    sizes: ["30", "32", "34", "36", "38"],
    rating: 4.7,
    reviews: baseReviews,
    isNew: true,
    inStock: true,
  },
  {
    slug: "brass-pocket-knife",
    name: "Brass Pocket Knife",
    sku: "KP0440-002",
    price: 9800,
    category: "Knives",
    gender: "Unisex",
    img: pocketknife,
    tagline: "Everyday carry, brass bolsters.",
    description:
      "A slim folding knife with brass bolsters and a cocobolo wood scale. The drop-point blade locks with a satisfying click and rides comfortably in any pocket.",
    details: [
      "D2 tool steel blade",
      "Cocobolo wood + brass bolsters",
      "Lock-back mechanism",
      "Closed length: 9.5 cm",
    ],
    rating: 4.6,
    reviews: baseReviews,
    inStock: true,
  },
  {
    slug: "cognac-messenger-bag",
    name: "Cognac Messenger Bag",
    sku: "WB0150-004",
    price: 24900,
    category: "Leather",
    gender: "Women",
    img: bag,
    tagline: "A daily bag, built for decades.",
    description:
      'Roomy enough for a 14" laptop and a notebook, the Cognac Messenger is built around a hand-cut leather body, antique brass hardware, and a cotton-canvas lining you can actually clean.',
    details: [
      "Full-grain cognac leather",
      "Antique solid brass hardware",
      'Fits 14" laptop',
      "Adjustable shoulder strap",
    ],
    rating: 4.9,
    reviews: baseReviews,
    isNew: true,
    inStock: true,
  },
  {
    slug: "kitchen-knife-duo",
    name: "Kitchen Knife Duo",
    sku: "KC0330-001",
    price: 22500,
    category: "Knives",
    gender: "Unisex",
    img: knifeset,
    tagline: "Chef + paring. The everyday pair.",
    description:
      "The two knives most kitchens actually use: an 8-inch chef and a 3.5-inch paring, both with high-carbon stainless blades and matched rosewood handles.",
    details: ["High-carbon stainless steel", "Matched rosewood handles", '8" chef + 3.5" paring', "Includes cotton roll"],
    rating: 4.8,
    reviews: baseReviews,
    inStock: true,
  },
  // Extended catalog
  {
    slug: "classic-card-holder",
    name: "Classic Card Holder — Black",
    sku: "MW0820-004",
    price: 3200,
    category: "Leather",
    gender: "Men",
    img: wallet,
    tagline: "Minimal, 4 cards, full-grain.",
    description:
      "A pocket-friendly card holder cut from full-grain black leather, with four card slots and a centre pocket for folded notes.",
    details: ["Full-grain black leather", "4 card slots", "Slim profile"],
    rating: 4.5,
    reviews: baseReviews,
    inStock: true,
  },
  {
    slug: "tan-tote-bag",
    name: "Tan Leather Tote",
    sku: "WB0160-005",
    price: 19500,
    category: "Leather",
    gender: "Women",
    img: bag,
    tagline: "Everyday tote, hand-finished.",
    description: "Spacious tan tote with reinforced handles and a soft suede lining. Designed for daily use and built to last.",
    details: ["Full-grain tan leather", "Suede lining", "Magnetic closure"],
    rating: 4.7,
    reviews: baseReviews,
    isNew: true,
    inStock: true,
  },
  {
    slug: "executive-briefcase",
    name: "Executive Briefcase",
    sku: "MB0210-006",
    price: 32500,
    category: "Leather",
    gender: "Men",
    img: bag,
    tagline: "Boardroom-ready leather case.",
    description: "Structured briefcase in saddle-tanned leather with antique brass hardware and twin internal compartments.",
    details: ["Saddle-tanned leather", "Antique brass lock", 'Fits 15" laptop'],
    rating: 4.8,
    reviews: baseReviews,
    inStock: true,
  },
  {
    slug: "ladies-clutch",
    name: "Evening Clutch — Cognac",
    sku: "WC0050-001",
    price: 8900,
    category: "Leather",
    gender: "Women",
    img: bag,
    tagline: "Hand-stitched evening clutch.",
    description: "A compact clutch with a soft suede interior and detachable wrist strap. Carries phone, cards and essentials.",
    details: ["Soft cognac leather", "Detachable strap", "Suede lined"],
    rating: 4.6,
    reviews: baseReviews,
    inStock: true,
  },
  {
    slug: "tactical-folder",
    name: "Tactical Folder Knife",
    sku: "KP0460-003",
    price: 12500,
    category: "Knives",
    gender: "Unisex",
    img: pocketknife,
    tagline: "G10 grip, liner-lock.",
    description: "A robust tactical folder with G10 scales, a stonewashed D2 blade, and reversible pocket clip.",
    details: ["D2 stonewashed blade", "G10 scales", "Liner lock + clip"],
    rating: 4.7,
    reviews: baseReviews,
    inStock: true,
  },
  {
    slug: "hunting-knife",
    name: "Hunting Knife — Stag Handle",
    sku: "KH0110-001",
    price: 15800,
    category: "Knives",
    gender: "Unisex",
    img: knife,
    tagline: "Stag horn handle, leather sheath.",
    description: "Fixed-blade hunting knife with a hand-shaped stag horn handle and a hand-stitched leather sheath included.",
    details: ["High-carbon steel", "Stag horn handle", "Leather sheath included"],
    rating: 4.9,
    reviews: baseReviews,
    isNew: true,
    inStock: true,
  },
  {
    slug: "santoku-knife",
    name: 'Santoku Knife — 7"',
    sku: "KC0240-002",
    price: 14500,
    category: "Knives",
    gender: "Unisex",
    img: knife,
    tagline: "Granton edge, wenge handle.",
    description: "A 7-inch santoku with a granton edge that releases food cleanly, mounted to a stabilised wenge handle.",
    details: ["VG-10 core steel", "Granton edge", "Wenge wood handle"],
    rating: 4.7,
    reviews: baseReviews,
    inStock: true,
  },
  {
    slug: "ladies-wallet",
    name: "Long Zip Wallet — Burgundy",
    sku: "WW0080-002",
    price: 6800,
    category: "Leather",
    gender: "Women",
    img: wallet,
    tagline: "12 card slots, zip closure.",
    description: "A long-format zip wallet in deep burgundy with 12 card slots, three note compartments and a zipped coin pocket.",
    details: ["Full-grain burgundy leather", "12 card slots", "Zip coin pocket"],
    rating: 4.6,
    reviews: baseReviews,
    inStock: true,
  },
  {
    slug: "double-belt",
    name: "Reversible Belt — Black/Brown",
    sku: "MB0095-003",
    price: 4900,
    category: "Leather",
    gender: "Men",
    img: belt,
    tagline: "Two colours, one belt.",
    description: "Reversible bridle belt with a rotating brass buckle. Black on one side, brown on the other.",
    details: ["Reversible bridle leather", "Rotating brass buckle"],
    sizes: ["30", "32", "34", "36", "38", "40"],
    rating: 4.5,
    reviews: baseReviews,
    inStock: true,
  },
  {
    slug: "kitchen-block-set",
    name: "5-Piece Kitchen Set",
    sku: "KC0350-002",
    price: 38500,
    oldPrice: 45000,
    category: "Knives",
    gender: "Unisex",
    img: knifeset,
    tagline: "Chef, santoku, utility, paring, shears.",
    description: "A complete five-piece set covering every kitchen task, presented in a hand-rolled canvas wrap.",
    details: ["5 matched knives + shears", "High-carbon stainless", "Canvas roll"],
    rating: 4.9,
    reviews: baseReviews,
    isNew: true,
    inStock: true,
  },
  {
    slug: "passport-cover",
    name: "Passport Cover — Tan",
    sku: "MA0020-001",
    price: 2800,
    category: "Leather",
    gender: "Unisex",
    img: wallet,
    tagline: "Travel-ready, hand-stitched.",
    description: "A clean passport cover with a card slot and pen loop. Fits all standard passports.",
    details: ["Vegetable-tanned leather", "Card slot + pen loop"],
    rating: 4.4,
    reviews: baseReviews,
    inStock: true,
  },
];

/**
 * Admin-editable product store.
 * `baseProducts` above is the original catalog. Anything the admin panel
 * adds / edits / deletes is stored as a small "diff" in localStorage so the
 * original catalog file never has to be touched. `products` is exported as a
 * live, mutated-in-place array so every existing `import { products }` call
 * site keeps working — call `useProducts()` inside a component if you want
 * the component to re-render automatically when the admin changes something.
 */
const OVERRIDES_KEY = "hibba.products.overrides.v1";

function readOverrides() {
  try {
    const raw = JSON.parse(localStorage.getItem(OVERRIDES_KEY));
    return { added: raw?.added ?? [], edited: raw?.edited ?? {}, deleted: raw?.deleted ?? [] };
  } catch {
    return { added: [], edited: {}, deleted: [] };
  }
}

function writeOverrides(o) {
  try {
    localStorage.setItem(OVERRIDES_KEY, JSON.stringify(o));
  } catch {
    /* ignore (e.g. storage full) */
  }
}

function buildProducts() {
  const { added, edited, deleted } = readOverrides();
  const base = baseProducts
    .filter((p) => !deleted.includes(p.slug))
    .map((p) => (edited[p.slug] ? { ...p, ...edited[p.slug] } : p));
  return [...added, ...base];
}

export const products = buildProducts();

const listeners = new Set();
function notify() {
  listeners.forEach((l) => l());
}
export function subscribeProducts(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function refresh() {
  products.splice(0, products.length, ...buildProducts());
  notify();
}

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function nextSlug(name, excludeSlug) {
  const base = slugify(name) || "product";
  let slug = base;
  let n = 2;
  while (products.some((p) => p.slug === slug && p.slug !== excludeSlug)) {
    slug = `${base}-${n++}`;
  }
  return slug;
}

export function addProduct(product) {
  const o = readOverrides();
  o.added = [{ reviews: [], rating: 5, inStock: true, ...product }, ...o.added.filter((p) => p.slug !== product.slug)];
  writeOverrides(o);
  refresh();
}

export function updateProduct(slug, patch) {
  const o = readOverrides();
  if (o.added.some((p) => p.slug === slug)) {
    o.added = o.added.map((p) => (p.slug === slug ? { ...p, ...patch } : p));
  } else {
    o.edited[slug] = { ...(o.edited[slug] || {}), ...patch };
  }
  writeOverrides(o);
  refresh();
}

export function deleteProduct(slug) {
  const o = readOverrides();
  if (o.added.some((p) => p.slug === slug)) {
    o.added = o.added.filter((p) => p.slug !== slug);
  } else if (!o.deleted.includes(slug)) {
    o.deleted = [...o.deleted, slug];
  }
  writeOverrides(o);
  refresh();
}

export function resetProducts() {
  writeOverrides({ added: [], edited: {}, deleted: [] });
  refresh();
}

export function isCustomProduct(slug) {
  return readOverrides().added.some((p) => p.slug === slug);
}

/** Hook version — use inside components that should re-render live when the
 * admin panel adds/edits/deletes a product (storefront listing pages). */
export function useProducts() {
  const [, tick] = useReducer((c) => c + 1, 0);
  useEffect(() => subscribeProducts(tick), []);
  return products;
}

export const getProduct = (slug) => products.find((p) => p.slug === slug);
