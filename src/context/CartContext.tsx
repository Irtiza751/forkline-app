import React, { createContext, useCallback, useMemo, useState } from 'react';

import type { CartItem } from '@/types/restaurant.types';

interface CartContextValue {
  items: CartItem[];
  restaurantId: string | null;
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setRestaurantId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);

  const value = useMemo(
    () => ({ items, restaurantId, setItems, setRestaurantId }),
    [items, restaurantId]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
