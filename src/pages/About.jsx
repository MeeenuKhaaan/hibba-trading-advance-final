import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header, PromoBar } from "@/components/Header";
import { Footer } from "@/components/Footer";
import hero from "@/assets/hero.jpg";

export default function About() {
  useEffect(() => {
    document.title = "Our Story — HIBBA TRADING";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PromoBar />
      <Header />

      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden bg-secondary">
        <img src={hero} alt="HIBBA TRADING craft" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
        <div className="relative z-10 mx-auto flex h-full max-w-4xl items-center justify-center px-6 text-center text-background">
          <div>
            <p className="text-[11px] uppercase tracking-luxury text-background/80">Since 2014</p>
            <h1 className="mt-4 font-script text-6xl md:text-7xl">Our Story</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm uppercase tracking-[0.25em]">
              From a Lahore tannery to your daily carry
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">The HIBBA TRADING promise</p>
        <h2 className="mt-4 font-script text-4xl md:text-5xl">Made by hand. Kept for years.</h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          HIBBA TRADING began with a simple belief — that everyday objects deserve to be made well. We work with
          third-generation tanners in Lahore and bladesmiths who still forge by coal, turning honest materials into
          pieces meant to outlive trends.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Every wallet is cut from a single panel of full-grain leather. Every knife is hammered, ground, and
          balanced by a single maker. Each piece carries the mark of the hand that made it — and a lifetime repair
          promise from us.
        </p>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
          {[
            { t: "Honest materials", d: "Full-grain leather, high-carbon and damascus steel — sourced, never substituted." },
            { t: "Made by people", d: "Small workshops, named makers, fair wages. No shortcuts on the bench." },
            { t: "Built to be repaired", d: "Every HIBBA TRADING piece comes with a lifetime repair promise. Bring it back, we'll fix it." },
          ].map((b) => (
            <div key={b.t} className="text-center">
              <h3 className="text-sm font-medium uppercase tracking-wider">{b.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="font-script text-4xl">Come say hello</h2>
        <p className="mt-3 text-sm text-muted-foreground">We answer every email within 24 hours.</p>
        <Link
          to="/contact"
          className="mt-8 inline-block border border-foreground px-8 py-3 text-[11px] uppercase tracking-luxury hover:bg-foreground hover:text-background"
        >
          Contact us
        </Link>
      </section>

      <Footer />
    </div>
  );
}
