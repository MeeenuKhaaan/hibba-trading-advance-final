import { useEffect, useState } from "react";
import { Header, PromoBar } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { CONTACT_EMAIL, INSTAGRAM_URL, STORE_ADDRESS, WHATSAPP_NUMBER_DISPLAY, waLink } from "@/data/siteConfig";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    document.title = "Contact — HIBBA TRADING";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PromoBar />
      <Header />

      <Reveal as="section" className="mx-auto max-w-3xl px-6 pt-20 pb-10 text-center">
        <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">We're here to help</p>
        <h1 className="mt-2 font-script text-5xl md:text-6xl">Contact</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Questions about an order, sizing, or a custom piece — drop us a line.
        </p>
      </Reveal>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal className="space-y-8">
            {[
              { t: "WhatsApp", d: WHATSAPP_NUMBER_DISPLAY, href: waLink() },
              { t: "Email", d: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
              { t: "Instagram", d: "@hibbatradingcompany", href: INSTAGRAM_URL },
              { t: "Address", d: STORE_ADDRESS },
              { t: "Hours", d: "Mon–Sat · 11am – 8pm PKT" },
            ].map((c) => (
              <div key={c.t}>
                <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">{c.t}</p>
                {c.href ? (
                  <a href={c.href} target="_blank" rel="noreferrer" className="mt-1 block text-base hover:underline">
                    {c.d}
                  </a>
                ) : (
                  <p className="mt-1 text-base">{c.d}</p>
                )}
              </div>
            ))}
          </Reveal>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setForm({ name: "", email: "", message: "" });
            }}
            className="space-y-5 border border-border p-8"
          >
            {sent && (
              <p className="border border-foreground bg-secondary px-4 py-3 text-[11px] uppercase tracking-luxury">
                Thanks — we'll be in touch shortly.
              </p>
            )}
            <div>
              <label className="text-[11px] uppercase tracking-luxury text-muted-foreground">Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-2 w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-foreground"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-luxury text-muted-foreground">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-2 w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-foreground"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-luxury text-muted-foreground">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-2 w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-foreground"
              />
            </div>
            <button
              type="submit"
              className="w-full border border-foreground bg-foreground px-8 py-3 text-[11px] uppercase tracking-luxury text-background transition hover:bg-transparent hover:text-foreground"
            >
              Send message
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
