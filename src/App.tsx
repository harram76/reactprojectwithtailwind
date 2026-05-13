import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
// App.css is intentionally empty — all styles use Tailwind CSS
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import About from './pages/About/page';
import Contact from './pages/Contact/page';
import Dashboard from './pages/Dashboard/page';
import Login from './pages/Login/page';
import Products from './pages/Products/page';
import Signup from './pages/Signup/page';

/* ─────────────────────────────────────────────
   Header
───────────────────────────────────────────── */
function Header() {
  const { user, logout } = useAuth();
  const { totalCount } = useCart();
  const [search, setSearch] = useState('');

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-[18px] py-3 text-sm transition-colors duration-200 border-b-[3px] ${
      isActive
        ? 'text-yellow-400 border-yellow-400'
        : 'text-gray-300 border-transparent hover:text-yellow-400 hover:bg-yellow-400/5'
    }`;

  return (
    <header className="w-full bg-[#111] text-white sticky top-0 z-[1000] shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-7 py-3 border-b border-white/[0.08] gap-4 flex-wrap">
        {/* Brand */}
        <Link to="/" className="flex flex-col leading-tight no-underline">
          <span className="text-2xl font-bold text-yellow-400 tracking-wide">AromaHub</span>
          <span className="text-[11px] text-gray-400 tracking-[1.5px] uppercase">Premium Fragrances</span>
        </Link>

        {/* Search */}
        <div className="flex items-center bg-white/10 border border-white/15 rounded-full overflow-hidden flex-1 max-w-sm focus-within:border-yellow-400 transition-colors">
          <input
            type="text"
            placeholder="Search fragrances..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-white text-sm placeholder-gray-500 font-[inherit]"
          />
          <button className="bg-transparent border-none text-gray-400 px-3 py-2 flex items-center cursor-pointer hover:text-yellow-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {user ? (
            <>
              <span className="text-sm text-yellow-400 font-medium">{user.name}</span>
              <button
                onClick={logout}
                className="px-4 py-1.5 rounded-full text-sm font-medium border border-white/35 text-white bg-transparent cursor-pointer hover:border-yellow-400 hover:text-yellow-400 transition-colors font-[inherit]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-1.5 rounded-full text-sm font-medium border border-white/35 text-white no-underline hover:border-yellow-400 hover:text-yellow-400 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1.5 rounded-full text-sm font-semibold bg-yellow-400 text-[#111] border border-yellow-400 no-underline hover:bg-yellow-500 hover:border-yellow-500 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* Cart icon */}
          <Link
            to="/products"
            className="relative text-white flex items-center px-2 py-1.5 rounded-lg hover:text-yellow-400 transition-colors no-underline"
            aria-label="Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8M7 13H5.4M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-[17px] h-[17px] rounded-full flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Nav bar */}
      <nav className="bg-[#1a1a1a] px-7">
        <ul className="list-none flex gap-0 m-0 p-0">
          {[
            { to: '/',          label: 'Home'      },
            { to: '/products',  label: 'Products'  },
            { to: '/about',     label: 'About'     },
            { to: '/contact',   label: 'Contact'   },
            { to: '/dashboard', label: 'Dashboard' },
          ].map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'} className={navLinkClass}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

/* ─────────────────────────────────────────────
   Footer
───────────────────────────────────────────── */
function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-[#111] text-gray-400 mt-16">
      {/* Main grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.4fr] gap-10 max-w-[1200px] mx-auto px-7 pt-12 pb-9">
        {/* Brand */}
        <div>
          <p className="text-[22px] font-bold text-yellow-400 mb-3">AromaHub</p>
          <p className="text-sm leading-relaxed text-gray-500 mb-4">
            Premium fragrances sourced from the finest makers worldwide. Elegance meets affordability.
          </p>
          <div className="flex gap-2.5">
            {['f', 'in', 'tw', 'ig'].map((s) => (
              <a
                key={s}
                href="#"
                className="w-[34px] h-[34px] rounded-full bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-gray-400 no-underline text-xs hover:bg-yellow-400 hover:text-[#111] hover:border-yellow-400 transition-all"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <p className="text-sm font-semibold text-white uppercase tracking-[1px] mb-4 pb-2 border-b-2 border-yellow-400 inline-block">
            Quick Links
          </p>
          <ul className="list-none flex flex-col gap-2.5">
            {[
              { to: '/',         label: 'Home'      },
              { to: '/products', label: 'Products'  },
              { to: '/about',    label: 'About Us'  },
              { to: '/contact',  label: 'Contact'   },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-gray-500 no-underline text-sm inline-block transition-all hover:text-yellow-400 hover:pl-1"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div>
          <p className="text-sm font-semibold text-white uppercase tracking-[1px] mb-4 pb-2 border-b-2 border-yellow-400 inline-block">
            Account
          </p>
          <ul className="list-none flex flex-col gap-2.5">
            {[
              { to: '/login',     label: 'Login'     },
              { to: '/signup',    label: 'Sign Up'   },
              { to: '/dashboard', label: 'Dashboard' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-gray-500 no-underline text-sm inline-block transition-all hover:text-yellow-400 hover:pl-1"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <p className="text-sm font-semibold text-white uppercase tracking-[1px] mb-4 pb-2 border-b-2 border-yellow-400 inline-block">
            Contact
          </p>
          <ul className="list-none flex flex-col gap-3">
            {[
              { icon: '📍', text: 'AromaHub, Lahore, Pakistan' },
              { icon: '📞', text: '+92 300 1234567' },
              { icon: '📧', text: 'support@aromahub.com' },
            ].map(({ icon, text }) => (
              <li key={text} className="flex items-start gap-2.5 text-sm text-gray-500 leading-relaxed">
                <span className="text-[15px] shrink-0 mt-px">{icon}</span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-[#1a1a1a] border-t border-white/[0.07] border-b border-b-white/[0.07] py-5 px-7 flex items-center justify-center gap-6 flex-wrap">
        <p className="text-sm text-gray-300 font-medium">Subscribe to our newsletter</p>
        <div className="flex rounded-full overflow-hidden border border-white/15">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/[0.07] border-none outline-none px-4 py-2 text-white text-sm font-[inherit] w-60 placeholder-gray-600"
          />
          <button className="bg-yellow-400 text-[#111] border-none px-5 py-2 text-sm font-semibold cursor-pointer font-[inherit] hover:bg-yellow-500 transition-colors">
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1200px] mx-auto px-7 py-4 flex items-center justify-between flex-wrap gap-2.5 text-xs text-gray-600">
        <p>© 2025 AromaHub. All rights reserved.</p>
        <div className="flex gap-5">
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((t) => (
            <a key={t} href="#" className="text-gray-600 no-underline hover:text-yellow-400 transition-colors">
              {t}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   Home Page
───────────────────────────────────────────── */
function Home() {
  return (
    <>
      {/* Hero */}
      <div className="w-full h-[80vh] bg-[url('/images/Royal%20Oud.jpg')] bg-center bg-cover relative flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative text-center text-white px-5 py-8 rounded-xl">
          <h1 className="text-5xl font-bold mb-3">Discover Your Signature Scent</h1>
          <p className="text-base mb-6 text-gray-200">Premium Arabic & French perfumes, crafted for lasting impressions.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              to="/products"
              className="px-5 py-2.5 rounded-md font-medium no-underline bg-yellow-400 text-black hover:bg-yellow-500 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              to="/about"
              className="px-5 py-2.5 rounded-md font-medium no-underline bg-white text-black hover:bg-gray-100 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Featured */}
      <div className="max-w-[1100px] mx-auto px-5 py-10">
        <h2 className="text-center text-3xl font-semibold mb-6">Featured Fragrances</h2>
        <div className="flex flex-wrap gap-5 justify-center">
          {[
            { name: 'Royal Oud',  desc: 'Luxurious Arabic fragrance',      img: '/images/Royal Oud.jpg'  },
            { name: 'Dauntless',  desc: 'Warm & spicy long-lasting scent', img: '/images/Dauntless.jpg'  },
            { name: 'Moonlight',  desc: 'Soft & dreamy night fragrance',   img: '/images/Moonlight.jpg'  },
          ].map((p) => (
            <div key={p.name} className="w-[220px] bg-white rounded-lg p-4 text-center shadow-[0_3px_7px_rgba(0,0,0,0.1)]">
              <img src={p.img} alt={p.name} className="w-full h-[180px] object-contain bg-white p-2 rounded-md mb-3" />
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-500 my-2">{p.desc}</p>
              <Link
                to="/products"
                className="inline-block mt-2 px-3 py-2 bg-[#111] text-white rounded-md text-sm no-underline hover:bg-yellow-400 hover:text-black transition-colors"
              >
                View All
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* About preview */}
      <div className="text-center bg-white px-10 py-10 mx-8 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-3">About AromaHub</h2>
        <p className="text-gray-600 max-w-xl mx-auto text-sm leading-relaxed">
          We bring you a premium collection of perfumes sourced from the finest fragrance makers. Long-lasting, authentic, and elegant.
        </p>
        <Link
          to="/about"
          className="inline-block mt-4 px-5 py-2.5 bg-[#111] text-white rounded-md no-underline hover:bg-yellow-400 hover:text-black transition-colors"
        >
          Learn More
        </Link>
      </div>

      {/* Contact bar */}
      <div className="text-center bg-[#111] text-white px-9 py-9 mt-8">
        <h2 className="text-2xl font-semibold mb-2">Get in Touch</h2>
        <p className="text-gray-400 mb-4 text-sm">Have questions? We'd love to hear from you.</p>
        <Link
          to="/contact"
          className="inline-block px-5 py-2.5 bg-yellow-400 text-black rounded-md font-medium no-underline hover:bg-yellow-500 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   App Shell
───────────────────────────────────────────── */
function AppShell() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800 font-[Poppins,sans-serif]">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/"          element={<Home />}      />
          <Route path="/products"  element={<Products />}  />
          <Route path="/about"     element={<About />}     />
          <Route path="/contact"   element={<Contact />}   />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login"     element={<Login />}     />
          <Route path="/signup"    element={<Signup />}    />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppShell />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
