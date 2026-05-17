import { useCallback, useMemo } from 'react';

import { useCartContext } from '@/context/CartContext';
import type { CartItem } from '@/types/restaurant.types';

export const useCart = () => {
  const { items, restaurantId, setItems, setRestaurantId } = useCartContext();

  const addItem = useCallback(
    (item: CartItem) => {
      if (restaurantId && restaurantId !== item.restaurantId) {
        setItems([item]);
        setRestaurantId(item.restaurantId);
        return;
      }
      setRestaurantId(item.restaurantId);
      setItems((prev) => {
        const existing = prev.find(
          (i) =>
            i.menuItemId === item.menuItemId &&
            i.specialNotes === item.specialNotes &&
            JSON.stringify(i.selectedExtras) === JSON.stringify(item.selectedExtras)
        );
        if (existing) {
          return prev.map((i) =>
            i.id === existing.id ? { ...i, quantity: i.quantity + item.quantity } : i
          );
        }
        return [...prev, item];
      });
    },
    [restaurantId, setItems, setRestaurantId]
  );

  const removeItem = useCallback(
    (cartLineId: string) => {
      setItems((prev) => {
        const next = prev.filter((i) => i.id !== cartLineId);
        if (next.length === 0) {
          setRestaurantId(null);
        }
        return next;
      });
    },
    [setItems, setRestaurantId]
  );

  const updateQty = useCallback(
    (cartLineId: string, qty: number) => {
      if (qty <= 0) {
        removeItem(cartLineId);
        return;
      }
      setItems((prev) => prev.map((i) => (i.id === cartLineId ? { ...i, quantity: qty } : i)));
    },
    [removeItem, setItems]
  );

  const getQuantityForMenuItem = useCallback(
    (menuItemId: string) =>
      items.filter((i) => i.menuItemId === menuItemId).reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setRestaurantId(null);
  }, [setItems, setRestaurantId]);

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const deliveryFee = useMemo(() => {
    if (items.length === 0) return 0;
    return 99;
  }, [items.length]);

  const gst = useMemo(() => Math.round(total * 0.05), [total]);

  const grandTotal = useMemo(() => total + deliveryFee + gst, [total, deliveryFee, gst]);

  return {
    items,
    restaurantId,
    addItem,
    removeItem,
    updateQty,
    getQuantityForMenuItem,
    clearCart,
    total,
    itemCount,
    deliveryFee,
    gst,
    grandTotal,
  };
};
