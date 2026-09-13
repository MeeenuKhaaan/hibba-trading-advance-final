import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Header, PromoBar } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { isAdminUser } from "@/data/siteConfig";

export default function Auth() {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get("redirect");

  useEffect(() => {
    document.title = "Sign in — HIBBA TRADING";
  }, []);

  useEffect(() => {
    if (user) navigate(redirect || (isAdminUser(user) ? "/admin" : "/account"));
  }, [user, navigate, redirect]);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      if (mode === "signup") {
        await signUp({ name, email, password });
      } else {
        await signIn({ email, password });
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PromoBar />
      <Header />
      <section className="mx-auto max-w-md animate-fade-in-up px-6 py-16">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">Account</p>
          <h1 className="mt-2 font-script text-5xl">{mode === "signin" ? "Welcome back" : "Create account"}</h1>
          {redirect && (
            <p className="mt-3 text-xs text-muted-foreground">Please sign in to add items to your bag and checkout.</p>
          )}
        </div>

        <form onSubmit={submit} className="mt-10 space-y-5">
          {mode === "signup" && <Field label="Full name" value={name} onChange={setName} required />}
          <Field label="Email" type="email" value={email} onChange={setEmail} required />
          <Field label="Password" type="password" value={password} onChange={setPassword} required />

          {err && <p className="border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">{err}</p>}

          <button
            disabled={busy}
            className="w-full border border-foreground bg-foreground px-6 py-3 text-[11px] uppercase tracking-luxury text-background transition hover:bg-transparent hover:text-foreground disabled:opacity-40"
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
          <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="underline">
            {mode === "signin" ? "Create an account" : "Sign in"}
          </button>
        </p>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          <Link to="/" className="underline">
            Back to shop
          </Link>
        </p>
      </section>
      <Footer />
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-luxury text-muted-foreground">
        {label}
        {required && " *"}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-border bg-transparent p-3 text-sm outline-none focus:border-foreground"
      />
    </div>
  );
}
