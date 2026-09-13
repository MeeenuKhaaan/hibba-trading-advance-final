import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT_EMAIL, INSTAGRAM_URL, STORE_ADDRESS, WHATSAPP_NUMBER_DISPLAY, waLink } from "@/data/siteConfig";
import logo from "@/assets/logo.png";

export function Footer() {
  const cols = [
    {
      title: "Shop",
      items: [
        { label: "Men", to: "/men" },
        { label: "Women", to: "/women" },
        { label: "Knives", to: "/knives" },
        { label: "All Products", to: "/shop" },
      ],
    },
    {
      title: "Help",
      items: [
        { label: "Contact", to: "/contact" },
        { label: "Shipping & Returns", to: "/contact" },
        { label: "Lifetime Repair", to: "/about" },
      ],
    },
    {
      title: "Hibba Trading",
      items: [
        { label: "Our Story", to: "/about" },
        { label: `WhatsApp ${WHATSAPP_NUMBER_DISPLAY}`, href: waLink() },
        { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
        { label: "Instagram", href: INSTAGRAM_URL },
      ],
    },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Hibba Trading" className="h-11 w-11 rounded bg-background object-contain p-1" />
            <p className="font-script text-4xl">Hibba Trading</p>
          </div>
          <p className="mt-3 max-w-sm text-sm text-background/70">
            Heirloom leather goods and hand-forged knives, shipped across Pakistan and worldwide.
          </p>

          <div className="mt-6 space-y-3 text-sm text-background/70">
            <a href={waLink()} target="_blank" rel="noreferrer" className="flex items-start gap-3 transition hover:text-background">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{WHATSAPP_NUMBER_DISPLAY}</span>
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-start gap-3 transition hover:text-background">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" />
              <span className="break-all">{CONTACT_EMAIL}</span>
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 transition hover:text-background"
            >
              <Instagram className="mt-0.5 h-4 w-4 shrink-0" />
              <span>@hibbatradingcompany</span>
            </a>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{STORE_ADDRESS}</span>
            </div>
          </div>

          <form className="mt-6 flex max-w-sm gap-0 border border-background/30" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-background/50"
            />
            <button className="bg-background px-5 text-[11px] uppercase tracking-luxury text-foreground transition hover:opacity-80">
              Join
            </button>
          </form>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-[11px] uppercase tracking-luxury">{col.title}</h4>
            <ul className="mt-4 space-y-2 text-sm text-background/70">
              {col.items.map((i) =>
                i.to ? (
                  <li key={i.label}>
                    <Link to={i.to} className="link-hover inline-block hover:text-background">
                      {i.label}
                    </Link>
                  </li>
                ) : (
                  <li key={i.label}>
                    <a href={i.href} target="_blank" rel="noreferrer" className="link-hover inline-block hover:text-background">
                      {i.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-background/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-[11px] uppercase tracking-luxury text-background/60 md:flex-row">
          <p>© {new Date().getFullYear()} HIBBA TRADING. All rights reserved.</p>
          <p>Designed in Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
