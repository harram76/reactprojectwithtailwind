import { useState } from 'react';

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

function StockBarChart({ data }: { data: StockItem[] }) {
  const max = Math.max(...data.map((d) => d.stock), 1);
  const W = 540, H = 180, barW = 34, gap = 18;
  const colors = ['#3498db','#2ecc71','#e67e22','#9b59b6','#e74c3c','#1abc9c','#f39c12','#2980b9','#e91e63'];
  return (
    <div className="flex-1 min-w-[260px] bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">📊 Stock Levels</h3>
      <div className="overflow-x-auto">
        <svg width={W} height={H + 50} style={{ display: 'block', margin: '0 auto' }}>
          {[0, 25, 50, 75, 100].map((pct) => {
            const y = H - (pct / 100) * H;
            return (
              <g key={pct}>
                <line x1={30} y1={y} x2={W - 10} y2={y} stroke="#e5e7eb" strokeWidth={1} />
                <text x={24} y={y + 4} fontSize={10} fill="#9ca3af" textAnchor="end">{Math.round((pct / 100) * max)}</text>
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
                <text x={x + barW / 2} y={y - 5} fontSize={10} fill="#6b7280" textAnchor="middle">{item.stock}</text>
                <text x={x + barW / 2} y={H + 18} fontSize={9} fill="#6b7280" textAnchor="middle"
                  transform={`rotate(-30, ${x + barW / 2}, ${H + 18})`}>
                  {item.name.length > 8 ? item.name.slice(0, 8) + '…' : item.name}
                </text>
              </g>
            );
          })}
          <line x1={30} y1={H} x2={W - 10} y2={H} stroke="#d1d5db" strokeWidth={1} />
        </svg>
      </div>
    </div>
  );
}

function CategoryDonut({ data }: { data: StockItem[] }) {
  const cats = ['Arabic', 'Western', 'Floral'];
  const colors = ['#3498db', '#e67e22', '#e91e63'];
  const totals = cats.map((c) => data.filter((d) => d.category === c).reduce((s, d) => s + d.stock, 0));
  const grand = totals.reduce((a, b) => a + b, 0) || 1;
  const R = 55, cx = 80, cy = 70, stroke = 28;
  const circumference = 2 * Math.PI * R;
  let offset = 0;
  return (
    <div className="flex-1 min-w-[260px] bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">🍩 Stock by Category</h3>
      <div className="flex items-center gap-5 flex-wrap">
        <svg width={160} height={140}>
          {totals.map((val, i) => {
            const dash = (val / grand) * circumference;
            const gap2 = circumference - dash;
            const el = (
              <circle key={i} cx={cx} cy={cy} r={R} fill="none" stroke={colors[i]} strokeWidth={stroke}
                strokeDasharray={`${dash} ${gap2}`} strokeDashoffset={-offset}
                style={{ transform: 'rotate(-90deg)', transformOrigin: `${cx}px ${cy}px` }} />
            );
            offset += dash;
            return el;
          })}
          <text x={cx} y={cy + 5} textAnchor="middle" fontSize={13} fontWeight="600" fill="#374151">{grand}</text>
          <text x={cx} y={cy + 18} textAnchor="middle" fontSize={9} fill="#9ca3af">total</text>
        </svg>
        <ul className="list-none flex flex-col gap-2">
          {cats.map((c, i) => (
            <li key={c} className="flex items-center gap-2 text-sm dark:text-gray-300">
              <span className="w-3 h-3 rounded-full inline-block shrink-0" style={{ background: colors[i] }} />
              {c}: <strong>{totals[i]}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [stock, setStock]           = useState<StockItem[]>(initialStock);
  const [activeView, setActiveView] = useState<ActiveView>('overview');
  const [form, setForm]             = useState(EMPTY_FORM);
  const [editItem, setEditItem]     = useState<StockItem | null>(null);
  const [deleteId, setDeleteId]     = useState<number | null>(null);
  const [toast, setToast]           = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const totalProducts = stock.length;
  const totalUnits    = stock.reduce((s, i) => s + i.stock, 0);
  const lowStockCount = stock.filter((i) => i.status === 'Low Stock').length;
  const outOfStock    = stock.filter((i) => i.status === 'Out of Stock').length;

  const handleInsert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock) return;
    const qty = parseInt(form.stock);
    const newItem: StockItem = { id: Date.now(), name: form.name, category: form.category as StockItem['category'], price: parseFloat(form.price), stock: qty, status: deriveStatus(qty) };
    setStock((prev) => [...prev, newItem]);
    setForm(EMPTY_FORM);
    showToast(`✅ "${newItem.name}" added to stock.`);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem) return;
    setStock((prev) => prev.map((item) => item.id === editItem.id ? { ...editItem, status: deriveStatus(editItem.stock) } : item));
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

  const go = (v: ActiveView) => { setActiveView(v); setEditItem(null); setDeleteId(null); };

  const inputCls = 'px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-[inherit] outline-none focus:border-yellow-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors';
  const panelCls = 'bg-white dark:bg-gray-800 rounded-2xl p-7 shadow-sm border border-gray-100 dark:border-gray-700 mb-7';
  const thCls    = 'px-3.5 py-2.5 text-left font-semibold text-xs text-white';
  const tdCls    = 'px-3.5 py-2.5 border-b border-gray-100 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200';
  const backBtn  = 'bg-gray-100 dark:bg-gray-700 border-none rounded-lg px-3.5 py-1.5 text-sm font-medium cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-200';

  return (
    <div className="max-w-[1200px] mx-auto px-6 pb-16">

      {toast && (
        <div className="fixed bottom-7 right-7 bg-[#111] dark:bg-gray-700 text-white px-5 py-3 rounded-xl text-sm font-medium shadow-lg z-[9999]">
          {toast}
        </div>
      )}

      <h1 className="text-center text-3xl font-semibold my-6 dark:text-white">Admin Dashboard</h1>

      {/* Stat cards */}
      <div className="flex gap-4 flex-wrap mb-7">
        {[
          { icon: '📦', num: totalProducts, label: 'Total Products', border: 'border-t-blue-500'   },
          { icon: '🏷️', num: totalUnits,    label: 'Total Units',    border: 'border-t-green-600'  },
          { icon: '⚠️', num: lowStockCount, label: 'Low Stock',      border: 'border-t-yellow-500' },
          { icon: '❌', num: outOfStock,    label: 'Out of Stock',   border: 'border-t-red-500'    },
        ].map(({ icon, num, label, border }) => (
          <div key={label} className={`flex-1 min-w-[150px] bg-white dark:bg-gray-800 rounded-xl px-5 py-5 flex items-center gap-4 shadow-sm border border-gray-100 dark:border-gray-700 border-t-4 ${border}`}>
            <span className="text-3xl leading-none">{icon}</span>
            <div>
              <p className="text-3xl font-bold leading-none text-gray-800 dark:text-white">{num}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Action cards */}
      <div className="flex gap-4 flex-wrap mb-7">
        {[
          { view: 'view'   as ActiveView, icon: '👁️', title: 'View All Stock',  sub: 'Browse inventory',   grad: 'from-blue-500 to-blue-700'    },
          { view: 'insert' as ActiveView, icon: '➕', title: 'Insert New Stock', sub: 'Add a product',      grad: 'from-green-500 to-green-700'  },
          { view: 'update' as ActiveView, icon: '✏️', title: 'Update Stock',     sub: 'Edit records',       grad: 'from-orange-400 to-orange-600'},
          { view: 'delete' as ActiveView, icon: '🗑️', title: 'Delete Stock',     sub: 'Remove a product',   grad: 'from-red-500 to-red-700'      },
        ].map(({ view, icon, title, sub, grad }) => (
          <button key={view} onClick={() => go(view)}
            className={`flex-1 min-w-[150px] border-none rounded-xl px-4 py-5 cursor-pointer flex flex-col items-center gap-1.5 transition-all duration-150 shadow-sm text-white text-center bg-gradient-to-br ${grad} hover:-translate-y-1 hover:shadow-md ${activeView === view ? 'outline outline-[3px] outline-yellow-400 outline-offset-2' : ''}`}>
            <span className="text-3xl">{icon}</span>
            <span className="text-sm font-semibold">{title}</span>
            <span className="text-[11px] opacity-85">{sub}</span>
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {activeView === 'overview' && (
        <div className={panelCls}>
          <div className="flex gap-6 flex-wrap">
            <StockBarChart data={stock} />
            <CategoryDonut data={stock} />
          </div>
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mt-7 mb-3">🕒 Recent Activity</h3>
          <div className="flex flex-col gap-2.5">
            {stock.slice(-5).reverse().map((item) => (
              <div key={item.id} className="flex items-center gap-3 px-3.5 py-2.5 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700 text-sm">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${statusBg(item.status)}`} />
                <span className="flex-1 text-gray-700 dark:text-gray-200">
                  <strong>{item.name}</strong> — {item.stock} units &nbsp;
                  <span className={`inline-block text-white text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusBg(item.status)}`}>{item.status}</span>
                </span>
              </div>
            ))}
          </div>
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mt-7 mb-3">🔗 Quick Links</h3>
          <div className="flex gap-3 flex-wrap">
            {[
              { href: '/products', label: '🛍️ Products', cls: 'bg-blue-500'   },
              { href: '/cart',     label: '🛒 Cart',      cls: 'bg-green-600'  },
              { href: '/reviews',  label: '⭐ Reviews',   cls: 'bg-purple-600' },
              { href: '/contact',  label: '📧 Contact',   cls: 'bg-orange-500' },
              { href: '/about',    label: 'ℹ️ About',     cls: 'bg-[#111]'     },
            ].map(({ href, label, cls }) => (
              <a key={href} href={href} className={`px-4 py-2.5 rounded-xl no-underline text-sm font-medium text-white transition-all hover:opacity-85 hover:-translate-y-0.5 ${cls}`}>{label}</a>
            ))}
          </div>
        </div>
      )}

      {/* VIEW ALL */}
      {activeView === 'view' && (
        <div className={panelCls}>
          <div className="flex justify-between items-center mb-5 flex-wrap gap-2.5">
            <h2 className="text-xl font-semibold dark:text-white">📋 All Stock Records</h2>
            <button onClick={() => go('overview')} className={backBtn}>← Back</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead><tr className="bg-[#111] dark:bg-gray-900">
                {['#','Name','Category','Price','Stock','Status'].map((h) => <th key={h} className={thCls}>{h}</th>)}
              </tr></thead>
              <tbody>
                {stock.map((item, i) => (
                  <tr key={item.id} className="even:bg-gray-50 dark:even:bg-gray-700/30 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    <td className={tdCls}>{i + 1}</td>
                    <td className={tdCls}><strong>{item.name}</strong></td>
                    <td className={tdCls}>{item.category}</td>
                    <td className={tdCls}>${item.price}</td>
                    <td className={tdCls}>{item.stock}</td>
                    <td className={tdCls}><span className={`inline-block text-white text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusBg(item.status)}`}>{item.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* INSERT */}
      {activeView === 'insert' && (
        <div className={panelCls}>
          <div className="flex justify-between items-center mb-5 flex-wrap gap-2.5">
            <h2 className="text-xl font-semibold dark:text-white">➕ Insert New Stock</h2>
            <button onClick={() => go('overview')} className={backBtn}>← Back</button>
          </div>
          <form onSubmit={handleInsert} className="flex flex-col gap-5">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
              {[
                { label: 'Product Name', type: 'text',   placeholder: 'e.g. Oud Royale', val: form.name,  key: 'name'  },
                { label: 'Price ($)',    type: 'number', placeholder: 'e.g. 99',          val: form.price, key: 'price' },
                { label: 'Stock Qty',   type: 'number', placeholder: 'e.g. 50',          val: form.stock, key: 'stock' },
              ].map(({ label, type, placeholder, val, key }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</label>
                  <input type={type} placeholder={placeholder} value={val} min={type === 'number' ? '0' : undefined}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className={inputCls} required />
                </div>
              ))}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls}>
                  <option>Arabic</option><option>Western</option><option>Floral</option>
                </select>
              </div>
            </div>
            <button type="submit" className="self-start px-6 py-2.5 border-none rounded-xl text-sm font-semibold cursor-pointer text-white bg-green-600 hover:opacity-85 hover:-translate-y-px transition-all">
              ➕ Add to Stock
            </button>
          </form>
        </div>
      )}

      {/* UPDATE */}
      {activeView === 'update' && (
        <div className={panelCls}>
          <div className="flex justify-between items-center mb-5 flex-wrap gap-2.5">
            <h2 className="text-xl font-semibold dark:text-white">✏️ Update Stock</h2>
            <button onClick={() => go('overview')} className={backBtn}>← Back</button>
          </div>
          {!editItem ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead><tr className="bg-[#111] dark:bg-gray-900">
                  {['#','Name','Category','Price','Stock','Action'].map((h) => <th key={h} className={thCls}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {stock.map((item, i) => (
                    <tr key={item.id} className="even:bg-gray-50 dark:even:bg-gray-700/30 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                      <td className={tdCls}>{i + 1}</td>
                      <td className={tdCls}><strong>{item.name}</strong></td>
                      <td className={tdCls}>{item.category}</td>
                      <td className={tdCls}>${item.price}</td>
                      <td className={tdCls}>{item.stock}</td>
                      <td className={tdCls}>
                        <button onClick={() => setEditItem({ ...item })} className="px-3.5 py-1 border-none rounded-lg text-xs font-semibold cursor-pointer text-white bg-yellow-500 hover:opacity-80 transition-opacity">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="flex flex-col gap-5">
              <p className="text-sm text-gray-500 dark:text-gray-400">Editing: <strong className="text-gray-800 dark:text-white">{editItem.name}</strong></p>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Product Name</label>
                  <input type="text" value={editItem.name} onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} className={inputCls} required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Category</label>
                  <select value={editItem.category} onChange={(e) => setEditItem({ ...editItem, category: e.target.value as StockItem['category'] })} className={inputCls}>
                    <option>Arabic</option><option>Western</option><option>Floral</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Price ($)</label>
                  <input type="number" min="1" value={editItem.price} onChange={(e) => setEditItem({ ...editItem, price: parseFloat(e.target.value) })} className={inputCls} required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Stock Qty</label>
                  <input type="number" min="0" value={editItem.stock} onChange={(e) => setEditItem({ ...editItem, stock: parseInt(e.target.value) })} className={inputCls} required />
                </div>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="px-6 py-2.5 border-none rounded-xl text-sm font-semibold cursor-pointer text-white bg-orange-500 hover:opacity-85 transition-opacity">💾 Save Changes</button>
                <button type="button" onClick={() => setEditItem(null)} className="px-6 py-2.5 border-none rounded-xl text-sm font-semibold cursor-pointer text-white bg-gray-500 hover:opacity-85 transition-opacity">Cancel</button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* DELETE */}
      {activeView === 'delete' && (
        <div className={panelCls}>
          <div className="flex justify-between items-center mb-5 flex-wrap gap-2.5">
            <h2 className="text-xl font-semibold dark:text-white">🗑️ Delete Stock</h2>
            <button onClick={() => go('overview')} className={backBtn}>← Back</button>
          </div>
          {deleteId !== null && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-5 py-4 mb-5 text-sm text-gray-700 dark:text-gray-200">
              <p>Are you sure you want to delete <strong>{stock.find((i) => i.id === deleteId)?.name}</strong>?</p>
              <div className="flex gap-3 mt-3">
                <button onClick={confirmDelete} className="px-6 py-2.5 border-none rounded-xl text-sm font-semibold cursor-pointer text-white bg-red-500 hover:opacity-85 transition-opacity">Yes, Delete</button>
                <button onClick={() => setDeleteId(null)} className="px-6 py-2.5 border-none rounded-xl text-sm font-semibold cursor-pointer text-white bg-gray-500 hover:opacity-85 transition-opacity">Cancel</button>
              </div>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead><tr className="bg-[#111] dark:bg-gray-900">
                {['#','Name','Category','Stock','Status','Action'].map((h) => <th key={h} className={thCls}>{h}</th>)}
              </tr></thead>
              <tbody>
                {stock.map((item, i) => (
                  <tr key={item.id} className={`even:bg-gray-50 dark:even:bg-gray-700/30 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors ${deleteId === item.id ? 'opacity-40' : ''}`}>
                    <td className={tdCls}>{i + 1}</td>
                    <td className={tdCls}><strong>{item.name}</strong></td>
                    <td className={tdCls}>{item.category}</td>
                    <td className={tdCls}>{item.stock}</td>
                    <td className={tdCls}><span className={`inline-block text-white text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusBg(item.status)}`}>{item.status}</span></td>
                    <td className={tdCls}>
                      <button onClick={() => setDeleteId(item.id)} className="px-3.5 py-1 border-none rounded-lg text-xs font-semibold cursor-pointer text-white bg-red-500 hover:opacity-80 transition-opacity">Delete</button>
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
