import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const PRICES: Record<number, number> = {
  1: 120, 2: 85, 3: 95, 4: 75, 5: 110,
  6: 90,  7: 80, 8: 130, 9: 70,
};

export default function Cart() {
  const { cartItems, removeFromCart, clearCart, totalCount } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (PRICES[item.id] ?? 0) * item.qty,
    0
  );
  const shipping = subtotal > 0 ? (subtotal >= 200 ? 0 : 15) : 0;
  const total    = subtotal + shipping;

  return (
    <>
      <h1 className="text-center text-3xl font-semibold my-6 dark:text-white">
        Your Cart
      </h1>

      <div className="max-w-[1100px] mx-auto px-6 pb-16">
        {cartItems.length === 0 ? (
          /* ── Empty state ── */
          <div className="flex flex-col items-center justify-center py-24 gap-5">
            <span className="text-7xl">🛒</span>
            <p className="text-xl font-semibold text-gray-500 dark:text-gray-400">
              Your cart is empty
            </p>
            <Link
              to="/products"
              className="px-6 py-3 bg-[#111] dark:bg-yellow-400 text-white dark:text-black rounded-lg font-medium no-underline hover:bg-yellow-400 hover:text-black dark:hover:bg-yellow-500 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="flex gap-8 flex-wrap lg:flex-nowrap">
            {/* ── Cart items list ── */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">
              {/* Header row */}
              <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                <span>Product</span>
                <span className="text-center">Price</span>
                <span className="text-center">Qty</span>
                <span className="text-right">Total</span>
              </div>

              {cartItems.map((item) => {
                const price = PRICES[item.id] ?? 0;
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"
                  >
                    {/* Image */}
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-20 h-20 object-contain rounded-lg bg-gray-50 dark:bg-gray-700 p-1 shrink-0"
                    />
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 dark:text-white truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                        {item.desc}
                      </p>
                      <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400 mt-1">
                        ${price} each
                      </p>
                    </div>
                    {/* Qty badge */}
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 font-bold text-sm shrink-0">
                      {item.qty}
                    </div>
                    {/* Line total */}
                    <p className="w-16 text-right font-semibold text-gray-800 dark:text-white shrink-0">
                      ${price * item.qty}
                    </p>
                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-600 text-gray-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors text-sm"
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}

              {/* Clear cart */}
              <div className="flex justify-end mt-2">
                <button
                  onClick={clearCart}
                  className="text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400 underline cursor-pointer bg-transparent border-none transition-colors"
                >
                  Clear entire cart
                </button>
              </div>
            </div>

            {/* ── Order summary ── */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
                <h2 className="text-lg font-semibold mb-5 text-gray-800 dark:text-white">
                  Order Summary
                </h2>

                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal ({totalCount} item{totalCount !== 1 ? 's' : ''})</span>
                    <span className="font-medium text-gray-800 dark:text-white">${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Shipping</span>
                    <span className={`font-medium ${shipping === 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-white'}`}>
                      {shipping === 0 ? 'FREE' : `$${shipping}`}
                    </span>
                  </div>
                  {subtotal > 0 && subtotal < 200 && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2">
                      Add ${200 - subtotal} more for free shipping
                    </p>
                  )}
                  <div className="border-t border-gray-100 dark:border-gray-700 pt-3 flex justify-between font-bold text-base text-gray-800 dark:text-white">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>

                <button className="w-full mt-6 py-3 bg-[#111] dark:bg-yellow-400 text-white dark:text-black rounded-lg font-semibold hover:bg-yellow-400 hover:text-black dark:hover:bg-yellow-500 transition-colors">
                  Proceed to Checkout
                </button>
                <Link
                  to="/products"
                  className="block text-center mt-3 text-sm text-gray-500 dark:text-gray-400 hover:text-yellow-500 no-underline transition-colors"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
