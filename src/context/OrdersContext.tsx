import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { Order } from '@/types/restaurant.types';

interface OrdersContextValue {
  orders: Order[];
  addOrder: (order: Order) => void;
  reorder: (orderId: string) => void;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-demo-active',
    restaurantId: 'r2',
    restaurantName: 'Burger District',
    items: [
      {
        menuItemId: 'r2-i1',
        restaurantId: 'r2',
        restaurantName: 'Burger District',
        name: 'Classic Smash',
        price: 999,
        quantity: 1,
        imageUrl: 'https://picsum.photos/seed/smash-burger/400/250',
      },
    ],
    total: 1148,
    status: 'OUT_FOR_DELIVERY',
    placedAt: new Date().toISOString(),
    estimatedTime: 28,
  },
  {
    id: 'ord-demo-1',
    restaurantId: 'r4',
    restaurantName: 'Lahori Spice Kitchen',
    items: [
      {
        menuItemId: 'r4-i1',
        restaurantId: 'r4',
        restaurantName: 'Lahori Spice Kitchen',
        name: 'Chicken Biryani',
        price: 899,
        quantity: 2,
        imageUrl: 'https://picsum.photos/seed/chicken-biryani/400/250',
      },
    ],
    total: 1888,
    status: 'DELIVERED',
    placedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    estimatedTime: 45,
  },
];

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  const addOrder = useCallback((order: Order) => {
    setOrders((prev) => [order, ...prev]);
  }, []);

  const reorder = useCallback((orderId: string) => {
    const existing = orders.find((o) => o.id === orderId);
    if (!existing) return;
    const duplicate: Order = {
      ...existing,
      id: `ord-${Date.now()}`,
      status: 'PLACED',
      placedAt: new Date().toISOString(),
    };
    setOrders((prev) => [duplicate, ...prev]);
  }, [orders]);

  const value = useMemo(() => ({ orders, addOrder, reorder }), [orders, addOrder, reorder]);

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrdersContext() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrdersContext must be used within OrdersProvider');
  }
  return context;
}
