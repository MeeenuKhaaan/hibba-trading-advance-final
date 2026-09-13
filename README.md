# Hibba Trading — React.js + Vite

A complete React.js + Vite rebuild of the Hibba Trading e-commerce website
(handcrafted leather goods & forged knives), recreated from the original
TanStack Start / Lovable / Supabase project to look and behave the same way,
using a standard React stack.

## Stack

- React 18 + Vite
- React Router DOM (client-side routing)
- Tailwind CSS (design tokens matched to the original brand palette)
- Lucide React (icons)
- React Context + `localStorage` for cart, wishlist, and auth state

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (defaults to `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
├── assets/            product & hero images
├── components/        Header, Footer, ProductCard, ProductGrid,
│                       CategoryFilterBar, QuantitySelector,
│                       WhatsAppButton, NewsletterPopup
├── pages/              Home, Shop, Men, Women, Knives, ProductDetail,
│                       Cart, Checkout, Wishlist, Auth, Account,
│                       About, Contact, NotFound
├── context/            CartContext, WishlistContext, AuthContext
├── data/               products.js (full product catalog)
├── App.jsx             route definitions
├── main.jsx            app entry point
└── index.css           Tailwind + design tokens
```

## Notes on functionality

- **Cart & Wishlist** are backed by React Context and persisted to
  `localStorage`, so they survive refreshes and navigation.
- **Auth** is frontend-only for now (local state + `localStorage`), matching
  the same sign in / sign up UI as the original. It's isolated behind
  `AuthContext`, so it can be swapped for a real backend (e.g. Supabase Auth)
  later without touching any page.
- **Checkout** is a frontend-only flow: it collects order details and opens
  WhatsApp with a formatted order summary so the order can be confirmed
  manually — no payment gateway is connected. `submitOrder()` in
  `Checkout.jsx` is the single place to wire up a real backend later.
- **Account** stores orders/addresses per signed-in user in `localStorage`,
  ready to be swapped for real API calls.

## Brand & content

All copy, product data, prices, categories, and images were carried over
from the original Hibba Trading site — nothing was redesigned or replaced
with placeholder content.
