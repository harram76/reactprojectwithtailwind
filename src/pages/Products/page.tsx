import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const products = [
  { id: 1, name: 'Royal Oud',    desc: 'Luxurious Arabic fragrance',      img: '/images/Royal Oud.jpg',    price: 120, category: 'Arabic'  },
  { id: 2, name: 'Dauntless',    desc: 'Warm & spicy long-lasting scent', img: '/images/Dauntless.jpg',    price: 85,  category: 'Western' },
  { id: 3, name: 'Dapper',       desc: 'Deep musk with sweet notes',      img: '/images/Dapper.jpg',       price: 95,  category: 'Western' },
  { id: 4, name: 'Floral Test',  desc: 'Fresh floral with golden touch',  img: '/images/Floral Test.jpg',  price: 75,  category: 'Floral'  },
  { id: 5, name: 'Prime',        desc: 'Rich amber with sweet base',      img: '/images/Prime.jpg',        price: 110, category: 'Arabic'  },
  { id: 6, name: 'Belliza',      desc: 'Cool, refreshing, long-lasting',  img: '/images/Belliza.jpg',      price: 90,  category: 'Floral'  },
  { id: 7, name: 'Moonlight',    desc: 'Soft & dreamy night fragrance',   img: '/images/Moonlight.jpg',    price: 80,  category: 'Western' },
  { id: 8, name: 'Nashwa',       desc: 'Elegant oriental blend',          img: '/images/Nashwa.jpg',       price: 130, category: 'Arabic'  },
  { id: 9, name: 'Rose Vanilla', desc: 'Sweet rose with vanilla warmth',  img: '/images/Rose Vanilla.jpg', price: 70,  category: 'Floral'  },
];

const CATEGORIES = ['All', 'Arabic', 'Western', 'Floral'];

export default function Products() {
  const { addToCart, totalCount } = useCart();
  const [filter, setFilter]       = useState('All');
  const [added, setAdded]         = useState<number | null>(null);

  const visible = filter === 'All' ? products : products.filter((p) => p.category === filter);

  const handleAdd = (p: typeof products[0]) => {
    addToCart({ id: p.id, name: p.name, desc: p.desc, img: p.img });
    setAdded(p.id);
    setTimeout(() => setAdded(null), 1200);
  };

  return (
    <>
      {/* ── Page header ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 pt-7 pb-3 max-w-[1100px] mx-auto">
        <div>
          <h1 className="text-3xl font-semibold dark:text-white">Our Premium Perfumes</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{visible.length} fragrances available</p>
        </div>
        <Link
          to="/cart"
          className="relative flex items-center gap-2 px-4 py-2.5 bg-[#111] dark:bg-yellow-400 text-white dark:text-black rounded-xl font-semibold no-underline hover:bg-yellow-400 hover:text-black dark:hover:bg-yellow-500 transition-colors text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8M7 13H5.4M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
          View Cart
          {totalCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
              {totalCount}
            </span>
          )}
        </Link>
      </div>

      {/* ── Category filter ── */}
      <div className="flex gap-2 px-6 pb-6 max-w-[1100px] mx-auto flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
              filter === cat
                ? 'bg-[#111] dark:bg-yellow-400 text-white dark:text-black border-[#111] dark:border-yellow-400'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-yellow-400 hover:text-yellow-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Products grid ── */}
      <div className="flex flex-wrap gap-5 justify-center max-w-[1100px] mx-auto px-5 pb-16">
        {visible.map((p) => (
          <div
            key={p.id}
            className="w-[220px] bg-white dark:bg-gray-800 rounded-2xl p-4 text-center shadow-sm border border-gray-100 dark:border-gray-700 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
          >
            <div className="relative">
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-[180px] object-contain bg-gray-50 dark:bg-gray-700 p-2 rounded-xl mb-3"
              />
              <span className="absolute top-2 left-2 text-[10px] font-semibold bg-yellow-400/90 text-black px-2 py-0.5 rounded-full">
                {p.category}
              </span>
            </div>
            <h3 className="text-base font-semibold dark:text-white">{p.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 my-1.5 leading-relaxed">{p.desc}</p>
            <p className="text-yellow-500 dark:text-yellow-400 font-bold text-sm mb-3">${p.price}</p>
            <button
              onClick={() => handleAdd(p)}
              className={`w-full py-2 rounded-xl border-none text-sm font-semibold cursor-pointer transition-all ${
                added === p.id
                  ? 'bg-green-500 text-white'
                  : 'bg-[#111] dark:bg-yellow-400 text-white dark:text-black hover:bg-yellow-400 hover:text-black dark:hover:bg-yellow-500'
              }`}
            >
              {added === p.id ? '✓ Added!' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
