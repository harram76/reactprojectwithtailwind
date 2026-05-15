import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import About     from './pages/About/page';
import Contact   from './pages/Contact/page';
import Dashboard from './pages/Dashboard/page';
import Login     from './pages/Login/page';
import Products  from './pages/Products/page';
import Signup    from './pages/Signup/page';
import Cart      from './pages/Cart/page';
import Reviews   from './pages/Reviews/page';
import Profile   from './pages/Profile/page';

/* ─────────────────────────────────────────────
   Header
───────────────────────────────────────────── */
function Header() {
  const { user, logout } = useAuth();
  const { totalCount }   = useCart();
  const { dark, toggleTheme } = useTheme();
  const [search, setSearch]   = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-[18px] py-3 text-sm transition-colors duration-200 border-b-[3px] whitespace-nowrap ${
      isActive
        ? 'text-yellow-400 border-yellow-400'
        : 'text-gray-300 border-transparent hover:text-yellow-400 hover:bg-yellow-400/5'
    }`;

  const navItems = [
    { to: '/',          label: 'Home'      },
    { to: '/products',  label: 'Products'  },
    { to: '/cart',      label: 'Cart'      },
    { to: '/reviews',   label: 'Reviews'   },
    { to: '/about',     label: 'About'     },
    { to: '/contact',   label: 'Contact'   },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <header className="w-full bg-[#111] dark:bg-gray-950 text-white sticky top-0 z-[1000] shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-5 sm:px-7 py-3 border-b border-white/[0.08] gap-3 flex-wrap">
        {/* Brand */}
        <Link to="/" className="flex flex-col leading-tight no-underline shrink-0">
          <span className="text-2xl font-bold text-yellow-400 tracking-wide">AromaHub</span>
          <span className="text-[11px] text-gray-400 tracking-[1.5px] uppercase hidden sm:block">Premium Fragrances</span>
        </Link>

        {/* Search */}
        <div className="flex items-center bg-white/10 border border-white/15 rounded-full overflow-hidden flex-1 max-w-xs sm:max-w-sm focus-within:border-yellow-400 transition-colors">
          <input
            type="text"
            placeholder="Search fragrances..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-white text-sm placeholder-gray-500 font-[inherit] min-w-0"
          />
          <button className="bg-transparent border-none text-gray-400 px-3 py-2 flex items-center cursor-pointer hover:text-yellow-400 transition-colors shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Dark / Light toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-gray-300 hover:border-yellow-400 hover:text-yellow-400 transition-colors text-base"
          >
            {dark ? '☀️' : '🌙'}
          </button>

          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 no-underline group"
              >
                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-black text-xs font-bold shrink-0 group-hover:ring-2 group-hover:ring-yellow-400 group-hover:ring-offset-1 group-hover:ring-offset-[#111] transition-all">
                  {user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)}
                </div>
                <span className="text-sm text-yellow-400 font-medium hidden sm:block">{user.name.split(' ')[0]}</span>
              </Link>
              <button
                onClick={logout}
                className="px-3 py-1.5 rounded-full text-xs font-medium border border-white/35 text-white bg-transparent cursor-pointer hover:border-yellow-400 hover:text-yellow-400 transition-colors font-[inherit] hidden sm:block"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login"  className="px-3 py-1.5 rounded-full text-xs font-medium border border-white/35 text-white no-underline hover:border-yellow-400 hover:text-yellow-400 transition-colors hidden sm:block">
                Login
              </Link>
              <Link to="/signup" className="px-3 py-1.5 rounded-full text-xs font-semibold bg-yellow-400 text-[#111] border border-yellow-400 no-underline hover:bg-yellow-500 hover:border-yellow-500 transition-colors">
                Sign Up
              </Link>
            </>
          )}

          {/* Cart icon */}
          <Link
            to="/cart"
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

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="sm:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/20 text-gray-300 hover:border-yellow-400 hover:text-yellow-400 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* ── Desktop nav bar ── */}
      <nav className="bg-[#1a1a1a] dark:bg-gray-900 px-5 sm:px-7 hidden sm:block overflow-x-auto">
        <ul className="list-none flex gap-0 m-0 p-0">
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'} className={navLinkClass}>
                {label}
              </NavLink>
            </li>
          ))}
          <li className="ml-auto">
            <NavLink to="/profile" end className={navLinkClass}>
              👤 Profile
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* ── Mobile nav drawer ── */}
      {mobileOpen && (
        <nav className="sm:hidden bg-[#1a1a1a] dark:bg-gray-900 border-t border-white/10">
          <ul className="list-none m-0 p-0">
            {[...navItems, { to: '/profile', label: '👤 Profile' }].map(({ to, label }) => (
              <li key={to} className="border-b border-white/5">
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-6 py-3.5 text-sm transition-colors ${
                      isActive ? 'text-yellow-400 bg-yellow-400/5' : 'text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/5'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

/* ─────────────────────────────────────────────
   Footer
───────────────────────────────────────────── */
function Footer() {
  const [email, setEmail]   = useState('');
  const [subDone, setSubDone] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubDone(true);
    setEmail('');
    setTimeout(() => setSubDone(false), 3000);
  };

  return (
    <footer className="bg-[#111] dark:bg-gray-950 text-gray-400 mt-16">
      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1.4fr] gap-10 max-w-[1200px] mx-auto px-7 pt-12 pb-9">

        {/* Brand */}
        <div>
          <p className="text-[22px] font-bold text-yellow-400 mb-3">AromaHub</p>
          <p className="text-sm leading-relaxed text-gray-500 mb-4">
            Premium fragrances sourced from the finest makers worldwide. Elegance meets affordability.
          </p>
          <div className="flex gap-2.5">
            {[
              { label: 'f',  href: '#', title: 'Facebook'  },
              { label: 'in', href: '#', title: 'LinkedIn'  },
              { label: '𝕏',  href: '#', title: 'X / Twitter'},
              { label: '📸', href: '#', title: 'Instagram' },
            ].map(({ label, href, title }) => (
              <a
                key={title}
                href={href}
                title={title}
                className="w-[34px] h-[34px] rounded-full bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-gray-400 no-underline text-xs hover:bg-yellow-400 hover:text-[#111] hover:border-yellow-400 transition-all"
              >
                {label}
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
              { to: '/',        label: 'Home'     },
              { to: '/products',label: 'Products' },
              { to: '/reviews', label: 'Reviews'  },
              { to: '/about',   label: 'About Us' },
              { to: '/contact', label: 'Contact'  },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="text-gray-500 no-underline text-sm inline-block transition-all hover:text-yellow-400 hover:pl-1">
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
              { to: '/profile',   label: 'My Profile'},
              { to: '/cart',      label: 'My Cart'   },
              { to: '/dashboard', label: 'Dashboard' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="text-gray-500 no-underline text-sm inline-block transition-all hover:text-yellow-400 hover:pl-1">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <p className="text-sm font-semibold text-white uppercase tracking-[1px] mb-4 pb-2 border-b-2 border-yellow-400 inline-block">
            Support
          </p>
          <ul className="list-none flex flex-col gap-2.5">
            {[
              { to: '/contact', label: 'Help Center'    },
              { to: '/contact', label: 'Returns Policy' },
              { to: '/contact', label: 'Track Order'    },
              { to: '/about',   label: 'Our Story'      },
            ].map(({ to, label }) => (
              <li key={label}>
                <Link to={to} className="text-gray-500 no-underline text-sm inline-block transition-all hover:text-yellow-400 hover:pl-1">
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
              { icon: '📞', text: '+92 300 1234567'            },
              { icon: '📧', text: 'support@aromahub.com'       },
              { icon: '🕐', text: 'Mon–Sat, 9am – 7pm'        },
            ].map(({ icon, text }) => (
              <li key={text} className="flex items-start gap-2.5 text-sm text-gray-500 leading-relaxed">
                <span className="text-[15px] shrink-0 mt-px">{icon}</span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Newsletter ── */}
      <div className="bg-[#1a1a1a] dark:bg-gray-900 border-t border-white/[0.07] border-b border-b-white/[0.07] py-6 px-7 flex items-center justify-center gap-6 flex-wrap">
        <div>
          <p className="text-sm text-white font-semibold">📬 Stay in the loop</p>
          <p className="text-xs text-gray-500 mt-0.5">Get exclusive deals and new arrivals in your inbox.</p>
        </div>
        {subDone ? (
          <p className="text-sm text-green-400 font-medium">✅ You're subscribed!</p>
        ) : (
          <form onSubmit={handleSubscribe} className="flex rounded-full overflow-hidden border border-white/15">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/[0.07] border-none outline-none px-4 py-2.5 text-white text-sm font-[inherit] w-56 placeholder-gray-600"
            />
            <button type="submit" className="bg-yellow-400 text-[#111] border-none px-5 py-2.5 text-sm font-semibold cursor-pointer font-[inherit] hover:bg-yellow-500 transition-colors">
              Subscribe
            </button>
          </form>
        )}
      </div>

      {/* ── Bottom bar ── */}
      <div className="max-w-[1200px] mx-auto px-7 py-4 flex items-center justify-between flex-wrap gap-2.5 text-xs text-gray-600">
        <p>© 2025 AromaHub. All rights reserved.</p>
        <div className="flex gap-5 flex-wrap">
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap'].map((t) => (
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
          <p className="text-yellow-400 font-semibold tracking-widest uppercase text-sm mb-3">New Collection 2025</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">Discover Your Signature Scent</h1>
          <p className="text-base mb-6 text-gray-200 max-w-lg mx-auto">
            Premium Arabic & French perfumes, crafted for lasting impressions.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/products" className="px-6 py-3 rounded-xl font-semibold no-underline bg-yellow-400 text-black hover:bg-yellow-500 transition-colors">
              Shop Now
            </Link>
            <Link to="/about" className="px-6 py-3 rounded-xl font-semibold no-underline bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-colors">
              Our Story
            </Link>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-[#111] dark:bg-gray-900 text-white py-6 px-6">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { num: '100+',  label: 'Fragrances'     },
            { num: '50K+',  label: 'Happy Customers' },
            { num: '100%',  label: 'Authentic'       },
            { num: '24hr',  label: 'Fast Dispatch'   },
          ].map(({ num, label }) => (
            <div key={label}>
              <p className="text-2xl font-bold text-yellow-400">{num}</p>
              <p className="text-xs text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured */}
      <div className="max-w-[1100px] mx-auto px-5 py-12">
        <h2 className="text-center text-3xl font-semibold mb-2 dark:text-white">Featured Fragrances</h2>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">Handpicked bestsellers loved by thousands</p>
        <div className="flex flex-wrap gap-5 justify-center">
          {[
            { name: 'Royal Oud',  desc: 'Luxurious Arabic fragrance',      img: '/images/Royal Oud.jpg',  price: '$120' },
            { name: 'Dauntless',  desc: 'Warm & spicy long-lasting scent', img: '/images/Dauntless.jpg',  price: '$85'  },
            { name: 'Moonlight',  desc: 'Soft & dreamy night fragrance',   img: '/images/Moonlight.jpg',  price: '$80'  },
            { name: 'Nashwa',     desc: 'Elegant oriental blend',          img: '/images/Nashwa.jpg',     price: '$130' },
          ].map((p) => (
            <div key={p.name} className="w-[220px] bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm border border-gray-100 dark:border-gray-700 hover:-translate-y-1 hover:shadow-md transition-all duration-200">
              <img src={p.img} alt={p.name} className="w-full h-[180px] object-contain bg-gray-50 dark:bg-gray-700 p-2 rounded-lg mb-3" />
              <h3 className="text-base font-semibold dark:text-white">{p.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 my-1.5">{p.desc}</p>
              <p className="text-yellow-500 dark:text-yellow-400 font-bold text-sm mb-3">{p.price}</p>
              <Link to="/products" className="inline-block px-4 py-2 bg-[#111] dark:bg-yellow-400 text-white dark:text-black rounded-lg text-xs font-semibold no-underline hover:bg-yellow-400 hover:text-black dark:hover:bg-yellow-500 transition-colors">
                View All
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews teaser */}
      <div className="bg-gray-50 dark:bg-gray-800/50 py-12 px-6">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-2 dark:text-white">What Our Customers Say</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Trusted by thousands of fragrance lovers</p>
          <div className="flex flex-wrap gap-5 justify-center mb-6">
            {[
              { name: 'Ahmed K.',  text: 'Royal Oud is absolutely stunning. 12 hours of longevity!',    stars: 5 },
              { name: 'Sara M.',   text: 'Rose Vanilla is my new signature scent. I get compliments daily.', stars: 5 },
              { name: 'Zara S.',   text: 'Nashwa is the most elegant oriental blend I have ever tried.',  stars: 5 },
            ].map(({ name, text, stars }) => (
              <div key={name} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 max-w-[260px] text-left">
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: stars }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">"{text}"</p>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">— {name}</p>
              </div>
            ))}
          </div>
          <Link to="/reviews" className="inline-block px-6 py-3 bg-[#111] dark:bg-yellow-400 text-white dark:text-black rounded-xl font-semibold no-underline hover:bg-yellow-400 hover:text-black dark:hover:bg-yellow-500 transition-colors">
            Read All Reviews
          </Link>
        </div>
      </div>

      {/* About preview */}
      <div className="text-center bg-white dark:bg-gray-800 px-10 py-12 mx-6 sm:mx-8 rounded-2xl shadow-sm my-10 border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-3 dark:text-white">About AromaHub</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto text-sm leading-relaxed">
          We bring you a premium collection of perfumes sourced from the finest fragrance makers. Long-lasting, authentic, and elegant.
        </p>
        <Link to="/about" className="inline-block mt-5 px-6 py-3 bg-[#111] dark:bg-yellow-400 text-white dark:text-black rounded-xl font-semibold no-underline hover:bg-yellow-400 hover:text-black dark:hover:bg-yellow-500 transition-colors">
          Meet the Team
        </Link>
      </div>

      {/* Contact bar */}
      <div className="text-center bg-[#111] dark:bg-gray-900 text-white px-9 py-12">
        <h2 className="text-2xl font-semibold mb-2">Get in Touch</h2>
        <p className="text-gray-400 mb-5 text-sm">Have questions? We'd love to hear from you.</p>
        <Link to="/contact" className="inline-block px-6 py-3 bg-yellow-400 text-black rounded-xl font-semibold no-underline hover:bg-yellow-500 transition-colors">
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
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-[Poppins,sans-serif] transition-colors duration-300">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/"          element={<Home />}      />
          <Route path="/products"  element={<Products />}  />
          <Route path="/cart"      element={<Cart />}      />
          <Route path="/reviews"   element={<Reviews />}   />
          <Route path="/about"     element={<About />}     />
          <Route path="/contact"   element={<Contact />}   />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login"     element={<Login />}     />
          <Route path="/signup"    element={<Signup />}    />
          <Route path="/profile"   element={<Profile />}   />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <AppShell />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
