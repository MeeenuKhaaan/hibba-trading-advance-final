import { useEffect, useState } from "react";
import { X } from "lucide-react";

const KEY = "hibba.newsletter.dismissed.v1";

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(KEY)) return;
    const t = setTimeout(() => setOpen(true), 8000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid animate-fade-in place-items-center bg-black/50 p-4">
      <div className="relative w-full max-w-md animate-scale-in bg-background p-8 text-center shadow-soft">
        <button onClick={close} aria-label="Close" className="absolute right-3 top-3">
          <X className="h-5 w-5" />
        </button>
        {done ? (
          <>
            <h2 className="font-script text-4xl">Thank you</h2>
            <p className="mt-3 text-sm text-muted-foreground">You're on the list. Watch your inbox.</p>
            <button
              onClick={close}
              className="mt-6 border border-foreground px-6 py-2 text-[11px] uppercase tracking-luxury hover:bg-foreground hover:text-background"
            >
              Continue shopping
            </button>
          </>
        ) : (
          <>
            <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">First-order offer</p>
            <h2 className="mt-2 font-script text-4xl">Save 10%</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Join our list and receive a 10% discount code for your first order.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setDone(true);
              }}
              className="mt-6 flex border border-border"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-4 py-3 text-sm outline-none"
              />
              <button className="bg-foreground px-5 text-[11px] uppercase tracking-luxury text-background">Subscribe</button>
            </form>
            <button onClick={close} className="mt-4 text-[11px] uppercase tracking-luxury text-muted-foreground hover:text-foreground">
              No thanks
            </button>
          </>
        )}
      </div>
    </div>
  );
}
