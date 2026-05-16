import React from 'react';
import { ScrollView, View } from 'react-native';

import { CartItem } from '@/components/composite/CartItem';
import { Screen } from '@/components/layout/Screen';
import { Divider } from '@/components/layout/Divider';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { formatCurrency } from '@/lib/format';
import type { CartItem as CartItemType } from '@/types/restaurant.types';

export interface CartScreenViewProps {
  items: CartItemType[];
  subtotal: number;
  deliveryFee: number;
  gst: number;
  grandTotal: number;
  placing: boolean;
  onIncrement: (menuItemId: string) => void;
  onDecrement: (menuItemId: string) => void;
  onRemove: (menuItemId: string) => void;
  onPlaceOrder: () => void;
}

export const CartScreenView = ({
  items,
  subtotal,
  deliveryFee,
  gst,
  grandTotal,
  placing,
  onIncrement,
  onDecrement,
  onRemove,
  onPlaceOrder,
}: CartScreenViewProps) => (
  <Screen className="bg-surface-alt">
    <View className="border-b border-border bg-surface px-4 py-4">
      <Typography variant="h2">Your cart</Typography>
    </View>
    {items.length === 0 ? (
      <View className="flex-1 items-center justify-center px-6">
        <Typography variant="h3" className="text-center">
          Your cart is empty
        </Typography>
        <Typography variant="caption" className="mt-2 text-center text-ink-muted">
          Browse restaurants and add items to get started.
        </Typography>
      </View>
    ) : (
      <>
        <ScrollView className="flex-1 px-4 pt-3" showsVerticalScrollIndicator={false}>
          {items.map((item) => (
            <CartItem
              key={item.menuItemId}
              item={item}
              onIncrement={() => onIncrement(item.menuItemId)}
              onDecrement={() => onDecrement(item.menuItemId)}
              onRemove={() => onRemove(item.menuItemId)}
            />
          ))}
          <View className="mt-2 rounded-xl border border-border bg-surface p-4">
            <View className="flex-row justify-between py-2">
              <Typography variant="body" className="text-ink-muted">
                Subtotal
              </Typography>
              <Typography variant="body">{formatCurrency(subtotal)}</Typography>
            </View>
            <View className="flex-row justify-between py-2">
              <Typography variant="body" className="text-ink-muted">
                Delivery fee
              </Typography>
              <Typography variant="body">{formatCurrency(deliveryFee)}</Typography>
            </View>
            <View className="flex-row justify-between py-2">
              <Typography variant="body" className="text-ink-muted">
                GST (5%)
              </Typography>
              <Typography variant="body">{formatCurrency(gst)}</Typography>
            </View>
            <Divider />
            <View className="flex-row justify-between py-2">
              <Typography variant="h3">Total</Typography>
              <Typography variant="h3" className="text-brand">
                {formatCurrency(grandTotal)}
              </Typography>
            </View>
          </View>
        </ScrollView>
        <View className="border-t border-border bg-surface px-4 pb-6 pt-3">
          <Button fullWidth size="lg" loading={placing} onPress={onPlaceOrder}>
            Place order · {formatCurrency(grandTotal)}
          </Button>
          <Typography variant="caption" className="mt-2 text-center text-ink-muted">
            Cash on delivery
          </Typography>
        </View>
      </>
    )}
  </Screen>
);

export default CartScreenView;
