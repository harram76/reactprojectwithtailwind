import { useState } from 'react';

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface StockItem {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const initialStock: StockItem[] = [
  { id: 1, name: 'Royal Oud',    category: 'Arabic',  price: 120, stock: 45, status: 'In Stock'     },
  { id: 2, name: 'Dauntless',    category: 'Western', price: 85,  stock: 8,  status: 'Low Stock'    },
  { id: 3, name: 'Dapper',       category: 'Western', price: 95,  stock: 30, status: 'In Stock'     },
  { id: 4, name: 'Floral Test',  category: 'Floral',  price: 75,  stock: 0,  status: 'Out of Stock' },
  { id: 5, name: 'Prime',        category: 'Arabic',  price: 110, stock: 22, status: 'In Stock'     },
  { id: 6, name: 'Belliza',      category: 'Floral',  price: 90,  stock: 5,  status: 'Low Stock'    },
  { id: 7, name: 'Moonlight',    category: 'Western', price: 80,  stock: 18, status: 'In Stock'     },
  { id: 8, name: 'Nashwa',       category: 'Arabic',  price: 130, stock: 12, status: 'In Stock'     },
  { id: 9, name: 'Rose Vanilla', category: 'Floral',  price: 70,  stock: 3,  status: 'Low Stock'    },
];

const EMPTY_FORM = { name: '', category: 'Arabic', price: '', stock: '' };

type ActiveView = 'overview' | 'view' | 'insert' | 'update' | 'delete';

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function statusBg(s: string) {
  if (s === 'In Stock')  return 'bg-green-600';
  if (s === 'Low Stock') return 'bg-yellow-500';
  return 'bg-red-500';
}

function deriveStatus(qty: number): StockItem['status'] {
  if (qty <= 0)  return 'Out of Stock';
  if (qty <= 10) return 'Low Stock';
  return 'In Stock';
}

/* ─────────────────────────────────────────────
   Mini bar-chart (pure SVG)
───────────────────────────────────────────── */
function StockBarChart({ data }: { data: StockItem[] }) {
  const max = Math.max(...data.map((d) => d.stock), 1);
  const W = 560, H = 180, barW = 36, gap = 20;
  const colors = ['#3498db','#2ecc71','#e67e22','#9b59b6','#e74c3c','#1abc9c','#f39c12','#2980b9','#e91e63'];

  return (
    <div className="flex-1 min-w-[260px] bg-gray-50 border border-gray-100 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-gray-600 mb-3">📊 Stock Levels — Bar Chart</h3>
      <div className="overflow-x-auto">
        <svg width={W} height={H + 50} style={{ display: 'block', margin: '0 auto' }}>
          {[0, 25, 50, 75, 100].map((pct) => {
            const y = H - (pct / 100) * H;
            return (
              <g key={pct}>
                <line x1={30} y1={y} x2={W - 10} y2={y} stroke="#eee" strokeWidth={1} />
                <text x={24} y={y + 4} fontSize={10} fill="#aaa" textAnchor="end">
                  {Math.round((pct / 100) * max)}
                </text>
              </g>
            );
          })}
          {data.map((item, i) => {
            const barH = Math.max((item.stock / max) * H, 2);
            const x = 40 + i * (barW + gap);
            const y = H - barH;
            return (
              <g key={item.id}>
                <rect x={x} y={y} width={barW} height={barH} fill={colors[i % colors.length]} rx={4} />
                <text x={x + barW / 2} y={y - 5} fontSize={10} fill="#555" textAnchor="middle">{item.stock}</text>
                <text
                  x={x + barW / 2} y={H + 18} fontSize={9} fill="#555" textAnchor="middle"
                  transform={`rotate(-30, ${x + barW / 2}, ${H + 18})`}
                >
                  {item.name.length > 8 ? item.name.slice(0, 8) + '…' : item.name}
                </text>
              </g>
            );
          })}
          <line x1={30} y1={H} x2={W - 10} y2={H} stroke="#ccc" strokeWidth={1} />
        </svg>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Mini donut chart (SVG)
───────────────────────────────────────────── */
function CategoryDonut({ data }: { data: StockItem[] }) {
  const cats = ['Arabic', 'Western', 'Floral'];
  const colors = ['#3498db', '#e67e22', '#e91e63'];
  const totals = cats.map((c) => data.filter((d) => d.category === c).reduce((s, d) => s + d.stock, 0));
  const grand = totals.reduce((a, b) => a + b, 0) || 1;
  const R = 55, cx = 80, cy = 70, stroke = 28;
  const circumference = 2 * Math.PI * R;
  let offset = 0;

  return (
    <div className="flex-1 min-w-[260px] bg-gray-50 border border-gray-100 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-gray-600 mb-3">🍩 Stock by Category</h3>
      <div className="flex items-center gap-5 flex-wrap">
        <svg width={160} height={140}>
          {totals.map((val, i) => {
            const dash = (val / grand) * circumference;
            const gap2 = circumference - dash;
            const el = (
              <circle
                key={i} cx={cx} cy={cy} r={R}
                fill="none" stroke={colors[i]} strokeWidth={stroke}
                strokeDasharray={`${dash} ${gap2}`}
                strokeDashoffset={-offset}
                style={{ transform: 'rotate(-90deg)', transformOrigin: `${cx}px ${cy}px` }}
              />
            );
            offset += dash;
            return el;
          })}
          <text x={cx} y={cy + 5} textAnchor="middle" fontSize={13} fontWeight="600" fill="#333">{grand}</text>
          <text x={cx} y={cy + 18} textAnchor="middle" fontSize={9} fill="#888">total</text>
        </svg>
        <ul className="list-none flex flex-col gap-2">
          {cats.map((c, i) => (
            <li key={c} className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full inline-block" style={{ background: colors[i] }} />
              {c}: <strong>{totals[i]}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Dashboard Component
───────────────────────────────────────────── */
export default function Dashboard() {
  const [stock, setStock]           = useState<StockItem[]>(initialStock);
  const [activeView, setActiveView] = useState<ActiveView>('overview');
  const [form, setForm]             = useState(EMPTY_FORM);
  const [editItem, setEditItem]     = useState<StockItem | null>(null);
  const [deleteId, setDeleteId]     = useState<number | null>(null);
  const [toast, setToast]           = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const totalProducts = stock.length;
  const totalUnits    = stock.reduce((s, i) => s + i.stock, 0);
  const lowStockCount = stock.filter((i) => i.status === 'Low Stock').length;
  const outOfStock    = stock.filter((i) => i.status === 'Out of Stock').length;

  const handleInsert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock) return;
    const qty = parseInt(form.stock);
    const newItem: StockItem = {
      id: Date.now(),
      name: form.name,
      category: form.category as StockItem['category'],
      price: parseFloat(form.price),
      stock: qty,
      status: deriveStatus(qty),
    };
    setStock((prev) => [...prev, newItem]);
    setForm(EMPTY_FORM);
    showToast(`✅ "${newItem.name}" added to stock.`);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem) return;
    const qty = editItem.stock;
    setStock((prev) =>
      prev.map((item) =>
        item.id === editItem.id ? { ...editItem, status: deriveStatus(qty) } : item
      )
    );
    setEditItem(null);
    showToast(`✅ "${editItem.name}" updated successfully.`);
  };

  const confirmDelete = () => {
    if (deleteId === null) return;
    const name = stock.find((i) => i.id === deleteId)?.name;
    setStock((prev) => prev.filter((i) => i.id !== deleteId));
    setDeleteId(null);
    showToast(`🗑️ "${name}" removed from stock.`);
  };

  const go = (v: ActiveView) => {
    setActiveView(v);
    setEditItem(null);
    setDeleteId(null);
  };

  /* shared input classes */
  const inputCls = 'px-3 py-2 border border-gray-300 rounded-md text-sm font-[inherit] outline-none focus:border-blue-400 transition-colors';
  const selectCls = inputCls;

  return (
    <div className="max-w-[1200px] mx-auto px-6 pb-16">

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-7 right-7 bg-[#111] text-white px-5 py-3 rounded-lg text-sm font-medium shadow-[0_4px_16px_rgba(0,0,0,0.25)] z-[9999] animate-[slideUp_0.3s_ease]">
          {toast}
        </div>
      )}

      <h1 className="text-center text-3xl font-semibold my-6">Admin Dashboard</h1>

      {/* Stat cards */}
      <div className="flex gap-4 flex-wrap mb-7">
        {[
          { icon: '📦', num: totalProducts, label: 'Total Products', border: 'border-t-blue-500'   },
          { icon: '🏷️', num: totalUnits,    label: 'Total Units',    border: 'border-t-green-600'  },
          { icon: '⚠️', num: lowStockCount, label: 'Low Stock',      border: 'border-t-yellow-500' },
          { icon: '❌', num: outOfStock,    label: 'Out of Stock',   border: 'border-t-red-500'    },
        ].map(({ icon, num, label, border }) => (
          <div key={label} className={`flex-1 min-w-[160px] bg-white rounded-xl px-5 py-5 flex items-center gap-4 shadow-[0_3px_10px_rgba(0,0,0,0.08)] border-t-4 ${border}`}>
            <span className="text-3xl leading-none">{icon}</span>
            <div>
              <p className="text-3xl font-bold leading-none text-[#111]">{num}</p>
              <p className="text-xs text-gray-400 mt-1">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Action cards */}
      <div className="flex gap-4 flex-wrap mb-7">
        {[
          { view: 'view'   as ActiveView, icon: '👁️', title: 'View All Stock',   sub: 'Browse full inventory',  grad: 'from-blue-500 to-blue-700'   },
          { view: 'insert' as ActiveView, icon: '➕', title: 'Insert New Stock',  sub: 'Add a new product',      grad: 'from-green-500 to-green-700'  },
          { view: 'update' as ActiveView, icon: '✏️', title: 'Update Stock',      sub: 'Edit existing records',  grad: 'from-orange-400 to-orange-600'},
          { view: 'delete' as ActiveView, icon: '🗑️', title: 'Delete Stock',      sub: 'Remove a product',       grad: 'from-red-500 to-red-700'      },
        ].map(({ view, icon, title, sub, grad }) => (
          <button
            key={view}
            onClick={() => go(view)}
            className={`flex-1 min-w-[160px] border-none rounded-xl px-4 py-5 cursor-pointer flex flex-col items-center gap-1.5 transition-all duration-150 shadow-[0_3px_10px_rgba(0,0,0,0.1)] text-white text-center bg-gradient-to-br ${grad} hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] ${activeView === view ? 'outline outline-[3px] outline-yellow-400 outline-offset-2' : ''}`}
          >
            <span className="text-3xl">{icon}</span>
            <span className="text-sm font-semibold">{title}</span>
            <span className="text-[11px] opacity-85">{sub}</span>
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {activeView === 'overview' && (
        <div className="bg-white rounded-xl p-7 shadow-[0_3px_12px_rgba(0,0,0,0.08)] mb-7">
          <div className="flex gap-6 flex-wrap">
            <StockBarChart data={stock} />
            <CategoryDonut data={stock} />
          </div>

          <h3 className="text-sm font-semibold text-gray-600 mt-7 mb-3">🕒 Recent Stock Activity</h3>
          <div className="flex flex-col gap-2.5">
            {stock.slice(-5).reverse().map((item) => (
              <div key={item.id} className="flex items-center gap-3 px-3.5 py-2.5 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${statusBg(item.status)}`} />
                <span className="flex-1">
                  <strong>{item.name}</strong> — {item.stock} units &nbsp;
                  <span className={`inline-block text-white text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusBg(item.status)}`}>
                    {item.status}
                  </span>
                </span>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-gray-600 mt-7 mb-3">🔗 Quick Links</h3>
          <div className="flex gap-3 flex-wrap">
            {[
              { href: '/products', label: '🛍️ Products Page', cls: 'bg-blue-500'   },
              { href: '/contact',  label: '📧 Contact',        cls: 'bg-green-600'  },
              { href: '/about',    label: 'ℹ️ About Us',       cls: 'bg-purple-600' },
              { href: '/login',    label: '🔐 Login',          cls: 'bg-[#111]'     },
            ].map(({ href, label, cls }) => (
              <a
                key={href}
                href={href}
                className={`px-4 py-2.5 rounded-lg no-underline text-sm font-medium text-white transition-all hover:opacity-85 hover:-translate-y-0.5 ${cls}`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ── VIEW ALL STOCK ── */}
      {activeView === 'view' && (
        <div className="bg-white rounded-xl p-7 shadow-[0_3px_12px_rgba(0,0,0,0.08)] mb-7">
          <div className="flex justify-between items-center mb-5 flex-wrap gap-2.5">
            <h2 className="text-xl font-semibold">📋 All Stock Records</h2>
            <button onClick={() => go('overview')} className="bg-gray-100 border-none rounded-md px-3.5 py-1.5 text-sm font-medium cursor-pointer hover:bg-gray-200 transition-colors">← Back</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#111] text-white">
                  {['#','Name','Category','Price','Stock','Status'].map((h) => (
                    <th key={h} className="px-3.5 py-2.5 text-left font-semibold text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stock.map((item, i) => (
                  <tr key={item.id} className="even:bg-gray-50 hover:bg-blue-50 transition-colors">
                    <td className="px-3.5 py-2.5 border-b border-gray-100">{i + 1}</td>
                    <td className="px-3.5 py-2.5 border-b border-gray-100"><strong>{item.name}</strong></td>
                    <td className="px-3.5 py-2.5 border-b border-gray-100">{item.category}</td>
                    <td className="px-3.5 py-2.5 border-b border-gray-100">${item.price}</td>
                    <td className="px-3.5 py-2.5 border-b border-gray-100">{item.stock}</td>
                    <td className="px-3.5 py-2.5 border-b border-gray-100">
                      <span className={`inline-block text-white text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusBg(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── INSERT NEW STOCK ── */}
      {activeView === 'insert' && (
        <div className="bg-white rounded-xl p-7 shadow-[0_3px_12px_rgba(0,0,0,0.08)] mb-7">
          <div className="flex justify-between items-center mb-5 flex-wrap gap-2.5">
            <h2 className="text-xl font-semibold">➕ Insert New Stock</h2>
            <button onClick={() => go('overview')} className="bg-gray-100 border-none rounded-md px-3.5 py-1.5 text-sm font-medium cursor-pointer hover:bg-gray-200 transition-colors">← Back</button>
          </div>
          <form onSubmit={handleInsert} className="flex flex-col gap-5">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">Product Name</label>
                <input type="text" placeholder="e.g. Oud Royale" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputCls} required />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={selectCls}>
                  <option>Arabic</option><option>Western</option><option>Floral</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">Price ($)</label>
                <input type="number" placeholder="e.g. 99" min="1" value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className={inputCls} required />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">Stock Quantity</label>
                <input type="number" placeholder="e.g. 50" min="0" value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  className={inputCls} required />
              </div>
            </div>
            <button type="submit" className="self-start px-6 py-2.5 border-none rounded-lg text-sm font-semibold cursor-pointer text-white bg-green-600 hover:opacity-85 hover:-translate-y-px transition-all">
              ➕ Add to Stock
            </button>
          </form>
        </div>
      )}

      {/* ── UPDATE STOCK ── */}
      {activeView === 'update' && (
        <div className="bg-white rounded-xl p-7 shadow-[0_3px_12px_rgba(0,0,0,0.08)] mb-7">
          <div className="flex justify-between items-center mb-5 flex-wrap gap-2.5">
            <h2 className="text-xl font-semibold">✏️ Update Stock</h2>
            <button onClick={() => go('overview')} className="bg-gray-100 border-none rounded-md px-3.5 py-1.5 text-sm font-medium cursor-pointer hover:bg-gray-200 transition-colors">← Back</button>
          </div>

          {!editItem ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#111] text-white">
                    {['#','Name','Category','Price','Stock','Action'].map((h) => (
                      <th key={h} className="px-3.5 py-2.5 text-left font-semibold text-xs">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stock.map((item, i) => (
                    <tr key={item.id} className="even:bg-gray-50 hover:bg-blue-50 transition-colors">
                      <td className="px-3.5 py-2.5 border-b border-gray-100">{i + 1}</td>
                      <td className="px-3.5 py-2.5 border-b border-gray-100"><strong>{item.name}</strong></td>
                      <td className="px-3.5 py-2.5 border-b border-gray-100">{item.category}</td>
                      <td className="px-3.5 py-2.5 border-b border-gray-100">${item.price}</td>
                      <td className="px-3.5 py-2.5 border-b border-gray-100">{item.stock}</td>
                      <td className="px-3.5 py-2.5 border-b border-gray-100">
                        <button onClick={() => setEditItem({ ...item })}
                          className="px-3.5 py-1 border-none rounded-md text-xs font-semibold cursor-pointer text-white bg-yellow-500 hover:opacity-80 transition-opacity">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="flex flex-col gap-5">
              <h3 className="text-sm text-gray-500 -mb-1">Editing: <strong>{editItem.name}</strong></h3>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600">Product Name</label>
                  <input type="text" value={editItem.name}
                    onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                    className={inputCls} required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600">Category</label>
                  <select value={editItem.category}
                    onChange={(e) => setEditItem({ ...editItem, category: e.target.value as StockItem['category'] })}
                    className={selectCls}>
                    <option>Arabic</option><option>Western</option><option>Floral</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600">Price ($)</label>
                  <input type="number" min="1" value={editItem.price}
                    onChange={(e) => setEditItem({ ...editItem, price: parseFloat(e.target.value) })}
                    className={inputCls} required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600">Stock Quantity</label>
                  <input type="number" min="0" value={editItem.stock}
                    onChange={(e) => setEditItem({ ...editItem, stock: parseInt(e.target.value) })}
                    className={inputCls} required />
                </div>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="px-6 py-2.5 border-none rounded-lg text-sm font-semibold cursor-pointer text-white bg-orange-500 hover:opacity-85 hover:-translate-y-px transition-all">
                  💾 Save Changes
                </button>
                <button type="button" onClick={() => setEditItem(null)}
                  className="px-6 py-2.5 border-none rounded-lg text-sm font-semibold cursor-pointer text-white bg-gray-500 hover:opacity-85 transition-opacity">
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* ── DELETE STOCK ── */}
      {activeView === 'delete' && (
        <div className="bg-white rounded-xl p-7 shadow-[0_3px_12px_rgba(0,0,0,0.08)] mb-7">
          <div className="flex justify-between items-center mb-5 flex-wrap gap-2.5">
            <h2 className="text-xl font-semibold">🗑️ Delete Stock</h2>
            <button onClick={() => go('overview')} className="bg-gray-100 border-none rounded-md px-3.5 py-1.5 text-sm font-medium cursor-pointer hover:bg-gray-200 transition-colors">← Back</button>
          </div>

          {deleteId !== null && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-5 py-4 mb-5 text-sm">
              <p>Are you sure you want to delete <strong>{stock.find((i) => i.id === deleteId)?.name}</strong>?</p>
              <div className="flex gap-3 mt-3">
                <button onClick={confirmDelete}
                  className="px-6 py-2.5 border-none rounded-lg text-sm font-semibold cursor-pointer text-white bg-red-500 hover:opacity-85 transition-opacity">
                  Yes, Delete
                </button>
                <button onClick={() => setDeleteId(null)}
                  className="px-6 py-2.5 border-none rounded-lg text-sm font-semibold cursor-pointer text-white bg-gray-500 hover:opacity-85 transition-opacity">
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#111] text-white">
                  {['#','Name','Category','Stock','Status','Action'].map((h) => (
                    <th key={h} className="px-3.5 py-2.5 text-left font-semibold text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stock.map((item, i) => (
                  <tr key={item.id} className={`even:bg-gray-50 hover:bg-blue-50 transition-colors ${deleteId === item.id ? 'opacity-40' : ''}`}>
                    <td className="px-3.5 py-2.5 border-b border-gray-100">{i + 1}</td>
                    <td className="px-3.5 py-2.5 border-b border-gray-100"><strong>{item.name}</strong></td>
                    <td className="px-3.5 py-2.5 border-b border-gray-100">{item.category}</td>
                    <td className="px-3.5 py-2.5 border-b border-gray-100">{item.stock}</td>
                    <td className="px-3.5 py-2.5 border-b border-gray-100">
                      <span className={`inline-block text-white text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusBg(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-3.5 py-2.5 border-b border-gray-100">
                      <button onClick={() => setDeleteId(item.id)}
                        className="px-3.5 py-1 border-none rounded-md text-xs font-semibold cursor-pointer text-white bg-red-500 hover:opacity-80 transition-opacity">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
