import { useState } from 'react';
import { useCart } from '../../context/CartContext';

const products = [
  { id: 1, name: 'Royal Oud',    desc: 'Luxurious Arabic fragrance',      img: '/images/Royal Oud.jpg'    },
  { id: 2, name: 'Dauntless',    desc: 'Warm & spicy long-lasting scent', img: '/images/Dauntless.jpg'    },
  { id: 3, name: 'Dapper',       desc: 'Deep musk with sweet notes',      img: '/images/Dapper.jpg'       },
  { id: 4, name: 'Floral Test',  desc: 'Fresh floral with golden touch',  img: '/images/Floral Test.jpg'  },
  { id: 5, name: 'Prime',        desc: 'Rich amber with sweet base',      img: '/images/Prime.jpg'        },
  { id: 6, name: 'Belliza',      desc: 'Cool, refreshing, long-lasting',  img: '/images/Belliza.jpg'      },
  { id: 7, name: 'Moonlight',    desc: 'Soft & dreamy night fragrance',   img: '/images/Moonlight.jpg'    },
  { id: 8, name: 'Nashwa',       desc: 'Elegant oriental blend',          img: '/images/Nashwa.jpg'       },
  { id: 9, name: 'Rose Vanilla', desc: 'Sweet rose with vanilla warmth',  img: '/images/Rose Vanilla.jpg' },
];

export default function Products() {
  const { cartItems, addToCart, removeFromCart, clearCart, totalCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      {/* Page header row */}
      <div className="flex items-center justify-center gap-4 px-8 pt-6 pb-2 relative">
        <h1 className="text-3xl font-semibold m-0">Our Premium Perfumes</h1>

        {/* Cart icon button */}
        <button
          className="relative bg-[#111] text-white border-none rounded-lg px-3 py-2 flex items-center cursor-pointer hover:bg-yellow-400 hover:text-black transition-colors"
          onClick={() => setCartOpen((o) => !o)}
          aria-label="Open cart"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8M7 13H5.4M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
          {totalCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {totalCount}
            </span>
          )}
        </button>
      </div>

      {/* Cart dropdown panel */}
      {cartOpen && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-[0_6px_20px_rgba(0,0,0,0.15)] w-[360px] max-w-[95vw] mx-auto mb-5 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[17px] font-semibold">
              Your Cart ({totalCount} item{totalCount !== 1 ? 's' : ''})
            </h3>
            <button
              onClick={() => setCartOpen(false)}
              className="bg-transparent border-none text-lg cursor-pointer text-gray-500 leading-none hover:text-red-500 transition-colors"
            >
              ✕
            </button>
          </div>

          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 text-sm py-2">Your cart is empty.</p>
          ) : (
            <>
              <ul className="list-none flex flex-col gap-3 mb-3 max-h-[300px] overflow-y-auto">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex items-center gap-3 pb-2.5 border-b border-gray-100">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-[52px] h-[52px] object-cover rounded-md shrink-0"
                    />
                    <div className="flex-1 flex flex-col gap-0.5">
                      <span className="text-sm font-semibold">{item.name}</span>
                      <span className="text-xs text-gray-500">Qty: {item.qty}</span>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="border border-gray-300 rounded px-2 py-1 text-xs text-gray-600 cursor-pointer shrink-0 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={clearCart}
                className="w-full text-center px-4 py-2 border-none text-sm font-medium bg-[#111] text-white rounded-md cursor-pointer hover:bg-yellow-400 hover:text-black transition-colors"
              >
                Clear Cart
              </button>
            </>
          )}
        </div>
      )}

      {/* Products grid */}
      <div className="flex flex-wrap gap-5 justify-center max-w-[1100px] mx-auto px-5 py-5">
        {products.map((p) => (
          <div
            key={p.id}
            className="w-[220px] bg-white rounded-lg p-4 text-center shadow-[0_3px_7px_rgba(0,0,0,0.1)]"
          >
            <img
              src={p.img}
              alt={p.name}
              className="w-full h-[180px] object-contain bg-white p-2 rounded-md mb-3"
            />
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="my-2 text-sm text-gray-500">{p.desc}</p>
            <button
              onClick={() => addToCart({ id: p.id, name: p.name, desc: p.desc, img: p.img })}
              className="mt-2 px-3 py-2 bg-[#111] text-white rounded-md border-none text-sm cursor-pointer hover:bg-yellow-400 hover:text-black transition-colors"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
