import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';

import { useOrdersContext } from '@/context/OrdersContext';
import { getRestaurantById } from '@/data/mockData';
import { useCart } from '@/hooks/useCart';
import { useHaptics } from '@/hooks/useHaptics';
import type { Order } from '@/types/restaurant.types';
import type { BottomTabScreenPropsFor } from '@/types/navigation.types';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';

import { CartScreenView } from './CartScreenView';

export const CartScreen = () => {
  const navigation = useNavigation<BottomTabScreenPropsFor<'Cart'>['navigation']>();
  const { items, total, deliveryFee, gst, grandTotal, updateQty, removeItem, clearCart, restaurantId } =
    useCart();
  const { addOrder } = useOrdersContext();
  const haptics = useHaptics();
  const [placing, setPlacing] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');
  const [eta, setEta] = useState(30);

  const handlePlaceOrder = useCallback(async () => {
    if (items.length === 0 || !restaurantId) return;
    setPlacing(true);
    const restaurant = getRestaurantById(restaurantId);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const orderId = `ord-${Date.now()}`;
    const order: Order = {
      id: orderId,
      restaurantId,
      restaurantName: restaurant?.name ?? items[0].restaurantName,
      items: [...items],
      total: grandTotal,
      status: 'PLACED',
      placedAt: new Date().toISOString(),
      estimatedTime: restaurant?.deliveryTime ?? 35,
    };
    addOrder(order);
    haptics.success();
    setPlacedOrderId(orderId);
    setEta(order.estimatedTime);
    clearCart();
    setPlacing(false);
    setSuccessVisible(true);
  }, [addOrder, clearCart, grandTotal, haptics, items, restaurantId]);

  const handleCloseSuccess = useCallback(() => {
    setSuccessVisible(false);
    navigation.navigate('Orders');
  }, [navigation]);

  return (
    <>
      <CartScreenView
        items={items}
        subtotal={total}
        deliveryFee={deliveryFee}
        gst={gst}
        grandTotal={grandTotal}
        placing={placing}
        onIncrement={(cartLineId) => {
          const item = items.find((i) => i.id === cartLineId);
          if (item) updateQty(cartLineId, item.quantity + 1);
        }}
        onDecrement={(cartLineId) => {
          const item = items.find((i) => i.id === cartLineId);
          if (item) updateQty(cartLineId, item.quantity - 1);
        }}
        onRemove={removeItem}
        onPlaceOrder={handlePlaceOrder}
      />
      <BottomSheet visible={successVisible} onClose={handleCloseSuccess}>
        <BottomSheet.Header>
          <Typography variant="h2" className="text-4xl">
            🎉
          </Typography>
          <BottomSheet.Title>Order placed!</BottomSheet.Title>
        </BottomSheet.Header>
        <BottomSheet.Body>
          <Typography variant="body" className="text-center text-muted">
            Order ID: {placedOrderId}
          </Typography>
          <Typography variant="body" className="mt-2 text-center">
            Estimated delivery: {eta} minutes
          </Typography>
        </BottomSheet.Body>
        <BottomSheet.Footer>
          <Button fullWidth onPress={handleCloseSuccess}>
            View Orders
          </Button>
        </BottomSheet.Footer>
      </BottomSheet>
    </>
  );
};

export default CartScreen;
