import React, { useCallback, useMemo, useState } from 'react';

import { useOrdersContext } from '@/context/OrdersContext';
import type { Order } from '@/types/restaurant.types';

import { OrdersScreenView } from './OrdersScreenView';

const isActive = (order: Order) =>
  order.status !== 'DELIVERED' && order.status !== 'CANCELLED';

export const OrdersScreen = () => {
  const { orders, reorder } = useOrdersContext();
  const [tab, setTab] = useState<'active' | 'past'>('active');

  const activeOrders = useMemo(() => orders.filter(isActive), [orders]);
  const pastOrders = useMemo(() => orders.filter((o) => !isActive(o)), [orders]);

  const handleReorder = useCallback(
    (orderId: string) => {
      reorder(orderId);
      setTab('active');
    },
    [reorder]
  );

  return (
    <OrdersScreenView
      tab={tab}
      activeOrders={activeOrders}
      pastOrders={pastOrders}
      onTabChange={setTab}
      onReorder={handleReorder}
    />
  );
};

export default OrdersScreen;
