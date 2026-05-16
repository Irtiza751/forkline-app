import { Image } from 'expo-image';
import React from 'react';
import { Pressable, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

import { Typography } from '@/components/ui/Typography';
import { formatCurrency } from '@/lib/format';
import type { CartItem as CartItemType } from '@/types/restaurant.types';

export interface CartItemProps {
  item: CartItemType;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

export const CartItem = React.memo(({ item, onIncrement, onDecrement, onRemove }: CartItemProps) => {
  const renderRightActions = () => (
    <Pressable
      onPress={onRemove}
      className="mb-3 ml-2 w-20 items-center justify-center rounded-xl bg-red-500">
      <Typography variant="caption" className="text-white">
        Delete
      </Typography>
    </Pressable>
  );

  return (
    <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
      <View className="mb-3 flex-row items-center gap-3 rounded-xl border border-border bg-surface p-3">
        <Image source={{ uri: item.imageUrl }} style={{ width: 64, height: 64, borderRadius: 10 }} />
        <View className="flex-1">
          <Typography variant="h3" className="text-base leading-snug">
            {item.name}
          </Typography>
          <Typography variant="caption" className="text-ink-muted">
            {item.restaurantName}
          </Typography>
          <Typography variant="body" className="mt-1 font-sans-bd">
            {formatCurrency(item.price * item.quantity)}
          </Typography>
        </View>
        <View className="flex-row items-center gap-2 rounded-full border border-border px-1.5 py-1">
          <Pressable onPress={onDecrement} className="h-7 w-7 items-center justify-center">
            <Typography variant="body" className="font-sans-bd text-brand">
              −
            </Typography>
          </Pressable>
          <Typography variant="body" className="min-w-[20px] text-center font-sans-bd">
            {item.quantity}
          </Typography>
          <Pressable onPress={onIncrement} className="h-7 w-7 items-center justify-center">
            <Typography variant="body" className="font-sans-bd text-brand">
              +
            </Typography>
          </Pressable>
        </View>
      </View>
    </Swipeable>
  );
});

CartItem.displayName = 'CartItem';

export default CartItem;
