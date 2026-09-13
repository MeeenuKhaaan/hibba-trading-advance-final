import { createContext, useContext, useEffect, useMemo, useState } from "react";

/**
 * Frontend-only auth for now (local state + localStorage).
 * Kept intentionally simple and isolated behind this context so a real
 * backend (e.g. Supabase Auth) can be dropped in later without touching
 * the rest of the app — every page only ever talks to useAuth().
 */

const AuthCtx = createContext(null);
const USERS_KEY = "hibba.auth.users.v1";
const SESSION_KEY = "hibba.auth.session.v1";

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    /* ignore */
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  const persistSession = (u) => {
    setUser(u);
    try {
      if (u) localStorage.setItem(SESSION_KEY, JSON.stringify(u));
      else localStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      signUp: async ({ name, email, password }) => {
        const users = readUsers();
        if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
          throw new Error("An account with this email already exists.");
        }
        const newUser = { id: crypto.randomUUID(), name, email, password };
        writeUsers([...users, newUser]);
        const session = { id: newUser.id, name: newUser.name, email: newUser.email };
        persistSession(session);
        return session;
      },
      signIn: async ({ email, password }) => {
        const users = readUsers();
        const found = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
        );
        if (!found) throw new Error("Invalid email or password.");
        const session = { id: found.id, name: found.name, email: found.email };
        persistSession(session);
        return session;
      },
      updateProfile: (patch) => {
        const users = readUsers();
        const updated = users.map((u) => (u.id === user?.id ? { ...u, ...patch } : u));
        writeUsers(updated);
        const session = { ...user, ...patch };
        persistSession(session);
      },
      signOut: async () => {
        persistSession(null);
      },
    }),
    [user, loading],
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

/** Used by the admin panel's Customers tab — never exposes passwords. */
export function listUsers() {
  return readUsers().map(({ password, ...safe }) => safe);
}
