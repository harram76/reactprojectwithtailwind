import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const ORDER_HISTORY = [
  { id: '#ORD-1042', date: 'May 10, 2025', items: ['Royal Oud', 'Moonlight'],   total: 200, status: 'Delivered' },
  { id: '#ORD-0987', date: 'Apr 22, 2025', items: ['Nashwa'],                   total: 130, status: 'Delivered' },
  { id: '#ORD-0854', date: 'Mar 15, 2025', items: ['Dapper', 'Rose Vanilla'],   total: 165, status: 'Delivered' },
];

const statusColor: Record<string, string> = {
  Delivered:  'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
  Processing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  Shipped:    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400',
  Cancelled:  'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
};

export default function Profile() {
  const { user, logout } = useAuth();
  const { cartItems, totalCount } = useCart();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'settings'>('overview');
  const [editMode, setEditMode]   = useState(false);
  const [displayName, setDisplayName] = useState(user?.name ?? '');
  const [phone, setPhone]         = useState('+92 300 0000000');
  const [address, setAddress]     = useState('Lahore, Pakistan');
  const [saved, setSaved]         = useState(false);

  /* Not logged in */
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-28 gap-5 px-6">
        <span className="text-7xl">🔐</span>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">You're not logged in</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Please log in to view your profile.</p>
        <div className="flex gap-3">
          <Link to="/login"  className="px-6 py-2.5 bg-[#111] dark:bg-yellow-400 text-white dark:text-black rounded-lg font-medium no-underline hover:bg-yellow-400 hover:text-black dark:hover:bg-yellow-500 transition-colors">Login</Link>
          <Link to="/signup" className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-medium no-underline hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Sign Up</Link>
        </div>
      </div>
    );
  }

  const initials = user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs: { key: typeof activeTab; label: string; icon: string }[] = [
    { key: 'overview', label: 'Overview',  icon: '👤' },
    { key: 'orders',   label: 'Orders',    icon: '📦' },
    { key: 'settings', label: 'Settings',  icon: '⚙️' },
  ];

  return (
    <>
      <h1 className="text-center text-3xl font-semibold my-6 dark:text-white">My Profile</h1>

      <div className="max-w-[1000px] mx-auto px-6 pb-16">

        {/* ── Profile hero card ── */}
        <div className="bg-gradient-to-r from-[#111] to-gray-800 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 mb-6 flex flex-wrap items-center gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center text-3xl font-bold text-black shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            <p className="text-gray-400 text-sm mt-0.5">{user.email}</p>
            <div className="flex gap-4 mt-3 flex-wrap">
              <span className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full">
                🛒 {totalCount} item{totalCount !== 1 ? 's' : ''} in cart
              </span>
              <span className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full">
                📦 {ORDER_HISTORY.length} orders
              </span>
              <span className="text-xs bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full font-medium">
                ⭐ Premium Member
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 border border-white/30 text-white rounded-lg text-sm font-medium hover:bg-white/10 transition-colors shrink-0"
          >
            Logout
          </button>
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-6">
          {tabs.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === key
                  ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <span>{icon}</span> {label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Stats */}
            {[
              { icon: '📦', label: 'Total Orders',    value: ORDER_HISTORY.length, color: 'text-blue-500'   },
              { icon: '💰', label: 'Total Spent',      value: `$${ORDER_HISTORY.reduce((s, o) => s + o.total, 0)}`, color: 'text-green-600' },
              { icon: '🛒', label: 'Cart Items',       value: totalCount,           color: 'text-yellow-500' },
              { icon: '⭐', label: 'Loyalty Points',   value: '480 pts',            color: 'text-purple-500' },
            ].map(({ icon, label, value, color }) => (
              <div key={label} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
                <span className="text-3xl">{icon}</span>
                <div>
                  <p className={`text-2xl font-bold ${color}`}>{value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
                </div>
              </div>
            ))}

            {/* Recent order */}
            <div className="sm:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Latest Order</h3>
              {ORDER_HISTORY[0] && (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-200">{ORDER_HISTORY[0].id}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{ORDER_HISTORY[0].items.join(', ')}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{ORDER_HISTORY[0].date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-800 dark:text-white">${ORDER_HISTORY[0].total}</span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor[ORDER_HISTORY[0].status]}`}>
                      {ORDER_HISTORY[0].status}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Cart preview */}
            {cartItems.length > 0 && (
              <div className="sm:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-800 dark:text-white">Cart Preview</h3>
                  <Link to="/cart" className="text-xs text-yellow-500 hover:text-yellow-600 no-underline font-medium">View Cart →</Link>
                </div>
                <div className="flex flex-wrap gap-3">
                  {cartItems.slice(0, 4).map((item) => (
                    <div key={item.id} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2">
                      <img src={item.img} alt={item.name} className="w-8 h-8 object-contain rounded" />
                      <span className="text-sm text-gray-700 dark:text-gray-200">{item.name}</span>
                      <span className="text-xs text-gray-400">×{item.qty}</span>
                    </div>
                  ))}
                  {cartItems.length > 4 && (
                    <span className="text-sm text-gray-400 dark:text-gray-500 self-center">+{cartItems.length - 4} more</span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── ORDERS TAB ── */}
        {activeTab === 'orders' && (
          <div className="flex flex-col gap-4">
            {ORDER_HISTORY.map((order) => (
              <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{order.id}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{order.items.join(' · ')}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{order.date}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-bold text-gray-800 dark:text-white">${order.total}</span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── SETTINGS TAB ── */}
        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Account Settings</h2>
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  ✏️ Edit
                </button>
              )}
            </div>

            {saved && (
              <div className="mb-4 flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium bg-green-50 dark:bg-green-900/30 px-4 py-2.5 rounded-lg">
                ✅ Changes saved successfully!
              </div>
            )}

            <form onSubmit={handleSave} className="flex flex-col gap-4">
              {[
                { label: 'Full Name',      value: displayName, setter: setDisplayName, type: 'text'  },
                { label: 'Email Address',  value: user.email,  setter: () => {},       type: 'email', disabled: true },
                { label: 'Phone Number',   value: phone,       setter: setPhone,       type: 'tel'   },
                { label: 'Address',        value: address,     setter: setAddress,     type: 'text'  },
              ].map(({ label, value, setter, type, disabled }) => (
                <div key={label} className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</label>
                  <input
                    type={type}
                    value={value}
                    onChange={(e) => !disabled && setter(e.target.value)}
                    disabled={!editMode || disabled}
                    className={`px-3 py-2.5 border rounded-lg text-sm outline-none transition-colors ${
                      editMode && !disabled
                        ? 'border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-yellow-400'
                        : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 cursor-default'
                    }`}
                  />
                </div>
              ))}

              {editMode && (
                <div className="flex gap-3 mt-2">
                  <button type="submit" className="px-6 py-2.5 bg-[#111] dark:bg-yellow-400 text-white dark:text-black rounded-lg font-semibold hover:bg-yellow-400 hover:text-black dark:hover:bg-yellow-500 transition-colors">
                    Save Changes
                  </button>
                  <button type="button" onClick={() => setEditMode(false)} className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </>
  );
}
