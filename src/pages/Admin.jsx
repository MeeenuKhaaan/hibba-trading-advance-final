import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, Pencil, Plus, ShoppingBag, Trash2, Users, X } from "lucide-react";
import { Header, PromoBar } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth, listUsers } from "@/context/AuthContext";
import { isAdminUser } from "@/data/siteConfig";
import { formatPKR, useProducts, addProduct, updateProduct, deleteProduct, nextSlug } from "@/data/products";
import { useOrders, ORDER_STATUSES, updateOrderStatus, deleteOrder } from "@/data/orders";

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "products", label: "Products", icon: Package },
  { id: "customers", label: "Customers", icon: Users },
];

const CATEGORIES = ["Leather", "Knives", "Bags", "Belts", "Accessories"];
const GENDERS = ["Men", "Women", "Unisex"];

const emptyForm = {
  slug: "",
  name: "",
  sku: "",
  price: "",
  oldPrice: "",
  category: "Leather",
  gender: "Unisex",
  img: "",
  tagline: "",
  description: "",
  details: "",
  inStock: true,
};

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Admin() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("dashboard");

  useEffect(() => {
    document.title = "Admin — HIBBA TRADING";
  }, []);

  useEffect(() => {
    if (!loading && !isAdminUser(user)) navigate(user ? "/" : "/auth?redirect=/admin");
  }, [loading, user, navigate]);

  if (loading || !isAdminUser(user)) {
    return (
      <div className="min-h-screen bg-background">
        <PromoBar />
        <Header />
        <p className="py-24 text-center text-sm text-muted-foreground">Checking access…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PromoBar />
      <Header />
      <section className="mx-auto max-w-7xl animate-fade-in-up px-6 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">Store owner</p>
            <h1 className="mt-2 font-script text-5xl">Admin Panel</h1>
            <p className="text-xs text-muted-foreground">Signed in as {user.email}</p>
          </div>
          <Link to="/" className="border border-foreground px-5 py-2 text-[11px] uppercase tracking-luxury transition hover:bg-foreground hover:text-background">
            Back to store
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-b border-border text-[11px] uppercase tracking-luxury">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`-mb-px flex items-center gap-2 border-b-2 px-2 py-3 transition-colors ${
                  tab === t.id ? "border-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>

        <div key={tab} className="mt-8 animate-fade-in">
          {tab === "dashboard" && <DashboardTab />}
          {tab === "orders" && <OrdersTab />}
          {tab === "products" && <ProductsTab />}
          {tab === "customers" && <CustomersTab />}
        </div>
      </section>
      <Footer />
    </div>
  );
}

function StatCard({ label, value, delay = 0 }) {
  return (
    <div
      className="animate-fade-in-up border border-border p-6 transition-shadow hover:shadow-soft"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-medium">{value}</p>
    </div>
  );
}

function DashboardTab() {
  const orders = useOrders();
  const products = useProducts();
  const [customerCount, setCustomerCount] = useState(0);

  useEffect(() => setCustomerCount(listUsers().length), []);

  const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pending = orders.filter((o) => o.status === "Pending").length;
  const outOfStock = products.filter((p) => !p.inStock).length;

  const byStatus = ORDER_STATUSES.map((s) => ({
    status: s,
    count: orders.filter((o) => o.status === s).length,
  }));
  const maxCount = Math.max(1, ...byStatus.map((b) => b.count));

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total revenue" value={formatPKR(revenue)} delay={0} />
        <StatCard label="Orders" value={orders.length} delay={80} />
        <StatCard label="Products listed" value={products.length} delay={160} />
        <StatCard label="Customers" value={customerCount} delay={240} />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="border border-border p-6">
          <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">Orders by status</p>
          <div className="mt-5 space-y-3">
            {byStatus.map((b) => (
              <div key={b.status} className="flex items-center gap-3 text-sm">
                <span className="w-24 shrink-0 text-muted-foreground">{b.status}</span>
                <div className="h-2 flex-1 overflow-hidden bg-secondary">
                  <div
                    className="h-full origin-left animate-scale-in bg-foreground transition-all"
                    style={{ width: `${(b.count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="w-6 text-right">{b.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-border p-6">
          <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">Needs attention</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center justify-between">
              <span>Pending orders</span>
              <span className="font-medium">{pending}</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Out-of-stock products</span>
              <span className="font-medium">{outOfStock}</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Total customers</span>
              <span className="font-medium">{customerCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function OrdersTab() {
  const orders = useOrders();
  const [openId, setOpenId] = useState(null);

  if (orders.length === 0) {
    return <p className="py-16 text-center text-sm text-muted-foreground">No orders yet — they'll show up here as customers checkout.</p>;
  }

  return (
    <div className="space-y-3">
      {orders.map((o) => (
        <div key={o.id} className="animate-fade-in-up border border-border">
          <button
            onClick={() => setOpenId(openId === o.id ? null : o.id)}
            className="flex w-full flex-wrap items-center justify-between gap-3 p-4 text-left text-sm"
          >
            <div>
              <p className="font-medium">{o.id}</p>
              <p className="text-xs text-muted-foreground">
                {o.customer?.name} · {new Date(o.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground">{o.items?.length} item(s)</span>
              <span className="font-medium">{formatPKR(o.total)}</span>
              <select
                value={o.status}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                className="border border-border bg-transparent px-2 py-1 text-[11px] uppercase tracking-luxury"
              >
                {ORDER_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm("Delete this order?")) deleteOrder(o.id);
                }}
                className="text-muted-foreground transition hover:text-destructive"
                aria-label="Delete order"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </button>
          {openId === o.id && (
            <div className="animate-fade-in border-t border-border bg-secondary/40 p-4 text-sm">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">Customer</p>
                  <p className="mt-1">{o.customer?.name}</p>
                  <p className="text-muted-foreground">{o.customer?.phone}</p>
                  <p className="text-muted-foreground">{o.customer?.email || "-"}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-luxury text-muted-foreground">Ship to</p>
                  <p className="mt-1">
                    {o.address}, {o.city}
                  </p>
                  {o.notes && <p className="mt-1 text-muted-foreground">Note: {o.notes}</p>}
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">Items</p>
                  <ul className="mt-1 space-y-1">
                    {o.items?.map((it) => (
                      <li key={it.slug} className="flex justify-between">
                        <span>
                          {it.name} × {it.qty}
                        </span>
                        <span>{formatPKR(it.price * it.qty)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 flex justify-between border-t border-border pt-2 font-medium">
                    <span>Total</span>
                    <span>{formatPKR(o.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ProductsTab() {
  const products = useProducts();
  const [formOpen, setFormOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const fileRef = useRef(null);

  const openNew = () => {
    setEditingSlug(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (p) => {
    setEditingSlug(p.slug);
    setForm({
      slug: p.slug,
      name: p.name,
      sku: p.sku || "",
      price: p.price,
      oldPrice: p.oldPrice || "",
      category: p.category,
      gender: p.gender || "Unisex",
      img: p.img,
      tagline: p.tagline || "",
      description: p.description || "",
      details: (p.details || []).join("\n"),
      inStock: p.inStock !== false,
    });
    setFormOpen(true);
  };

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setForm((f) => ({ ...f, img: dataUrl }));
  };

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      name: form.name.trim(),
      sku: form.sku.trim() || "HT-" + Date.now().toString().slice(-5),
      price: Number(form.price) || 0,
      oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
      category: form.category,
      gender: form.gender,
      img: form.img || "https://placehold.co/900x900?text=Hibba+Trading",
      tagline: form.tagline.trim(),
      description: form.description.trim(),
      details: form.details.split("\n").map((d) => d.trim()).filter(Boolean),
      inStock: form.inStock,
    };

    if (editingSlug) {
      updateProduct(editingSlug, payload);
    } else {
      const slug = nextSlug(payload.name);
      addProduct({ slug, ...payload });
    }
    setFormOpen(false);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{products.length} product(s) in the catalog</p>
        <button
          onClick={openNew}
          className="flex items-center gap-2 border border-foreground bg-foreground px-4 py-2 text-[11px] uppercase tracking-luxury text-background transition hover:scale-[1.02]"
        >
          <Plus className="h-3.5 w-3.5" /> Add product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="text-left text-[11px] uppercase tracking-luxury text-muted-foreground">
            <tr>
              <th className="pb-3">Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p.slug} className="animate-fade-in-up border-t border-border" style={{ animationDelay: `${i * 30}ms` }}>
                <td className="flex items-center gap-3 py-3">
                  <img src={p.img} alt={p.name} className="h-12 w-12 rounded object-cover" />
                  <span className="font-medium">{p.name}</span>
                </td>
                <td>{p.category}</td>
                <td>{formatPKR(p.price)}</td>
                <td>
                  <button
                    onClick={() => updateProduct(p.slug, { inStock: !p.inStock })}
                    className={`px-2 py-1 text-[11px] uppercase tracking-luxury ${
                      p.inStock ? "bg-secondary" : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {p.inStock ? "In stock" : "Out of stock"}
                  </button>
                </td>
                <td>
                  <div className="flex justify-end gap-3">
                    <button onClick={() => openEdit(p)} aria-label="Edit" className="text-muted-foreground transition hover:text-foreground">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => confirm(`Delete "${p.name}"?`) && deleteProduct(p.slug)}
                      aria-label="Delete"
                      className="text-muted-foreground transition hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 animate-fade-in bg-black/40" onClick={() => setFormOpen(false)} />
          <form
            onSubmit={submit}
            className="relative flex h-full w-full max-w-md animate-slide-in-right flex-col overflow-y-auto bg-background p-6 shadow-soft"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-script text-3xl">{editingSlug ? "Edit product" : "Add product"}</h3>
              <button type="button" onClick={() => setFormOpen(false)} aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <div>
                <label className="text-[11px] uppercase tracking-luxury text-muted-foreground">Photo</label>
                <div className="mt-2 flex items-center gap-4">
                  {form.img && <img src={form.img} alt="" className="h-16 w-16 rounded object-cover" />}
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="border border-foreground px-3 py-1.5 text-[11px] uppercase tracking-luxury"
                  >
                    Upload
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
                </div>
                <input
                  placeholder="or paste image URL"
                  value={form.img?.startsWith("data:") ? "" : form.img}
                  onChange={(e) => setForm({ ...form, img: e.target.value })}
                  className="mt-2 w-full border border-border bg-transparent p-2 text-sm"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-luxury text-muted-foreground">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-2 w-full border border-border bg-transparent p-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] uppercase tracking-luxury text-muted-foreground">Price (PKR)</label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="mt-2 w-full border border-border bg-transparent p-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-luxury text-muted-foreground">Old price (optional)</label>
                  <input
                    type="number"
                    min="0"
                    value={form.oldPrice}
                    onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
                    className="mt-2 w-full border border-border bg-transparent p-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] uppercase tracking-luxury text-muted-foreground">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="mt-2 w-full border border-border bg-transparent p-2 text-sm"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-luxury text-muted-foreground">Gender</label>
                  <select
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    className="mt-2 w-full border border-border bg-transparent p-2 text-sm"
                  >
                    {GENDERS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-luxury text-muted-foreground">Tagline</label>
                <input
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  className="mt-2 w-full border border-border bg-transparent p-2 text-sm"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-luxury text-muted-foreground">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="mt-2 w-full border border-border bg-transparent p-2 text-sm"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-luxury text-muted-foreground">Details (one per line)</label>
                <textarea
                  rows={3}
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                  className="mt-2 w-full border border-border bg-transparent p-2 text-sm"
                />
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.inStock}
                  onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                />
                In stock
              </label>
            </div>

            <button className="mt-8 border border-foreground bg-foreground py-3 text-[11px] uppercase tracking-luxury text-background transition hover:opacity-90">
              {editingSlug ? "Save changes" : "Add product"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function CustomersTab() {
  const [users, setUsers] = useState([]);

  useEffect(() => setUsers(listUsers()), []);

  if (users.length === 0) {
    return <p className="py-16 text-center text-sm text-muted-foreground">No registered customers yet.</p>;
  }

  return (
    <table className="w-full text-sm">
      <thead className="text-left text-[11px] uppercase tracking-luxury text-muted-foreground">
        <tr>
          <th className="pb-3">Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u, i) => (
          <tr key={u.id} className="animate-fade-in-up border-t border-border" style={{ animationDelay: `${i * 30}ms` }}>
            <td className="py-3">{u.name}</td>
            <td>{u.email}</td>
            <td>{u.phone || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
