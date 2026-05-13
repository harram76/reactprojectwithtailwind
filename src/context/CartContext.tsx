import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface CartProduct {
  id: number;
  name: string;
  desc: string;
  img: string;
}

export interface CartItem extends CartProduct {
  qty: number;
}

interface CartContextType {
  cartItems: CartItem[];
  totalCount: number;
  addToCart: (product: CartProduct) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const totalCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const addToCart = (product: CartProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) =>
    setCartItems((prev) => prev.filter((i) => i.id !== id));

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, totalCount, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
