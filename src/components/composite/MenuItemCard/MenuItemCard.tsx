import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { colors } from '@/constants/colors';
import { formatCurrency } from '@/lib/format';
import type { MenuItem } from '@/types/restaurant.types';

export interface MenuItemCardProps {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

const MenuItemCardRoot = ({ item, quantity, onAdd, onIncrement, onDecrement }: MenuItemCardProps) => (
  <View className="mb-1 flex-row gap-3 border-b border-border py-4">
    <MenuItemCard.Body>
      <View className="flex-row items-start gap-2 pr-24">
        {item.isVeg && <View className="mt-1.5 h-2 w-2 rounded-full bg-brand" />}
        <View className="flex-1">
          <MenuItemCard.Title>{item.name}</MenuItemCard.Title>
          <MenuItemCard.Description>{item.description}</MenuItemCard.Description>
          <MenuItemCard.Price price={item.price} />
        </View>
      </View>
    </MenuItemCard.Body>
    <View className="items-end">
      <MenuItemCard.Image source={item.imageUrl} />
      <MenuItemCard.Actions
        quantity={quantity}
        onAdd={onAdd}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
    </View>
  </View>
);

const MenuItemCardBody = ({ children }: { children: React.ReactNode }) => (
  <View className="flex-1">{children}</View>
);

const MenuItemCardTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="h3" className="text-base leading-snug">
    {children}
  </Typography>
);

const MenuItemCardDescription = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="caption" className="mt-1 text-ink-muted" numberOfLines={2}>
    {children}
  </Typography>
);

const MenuItemCardPrice = ({ price }: { price: number }) => (
  <Typography variant="body" className="mt-2 font-sans-bd text-ink">
    {formatCurrency(price)}
  </Typography>
);

const MenuItemCardImage = ({ source }: { source: string }) => (
  <Image source={{ uri: source }} style={{ width: 88, height: 88, borderRadius: 12 }} contentFit="cover" />
);

const MenuItemCardActions = ({
  quantity,
  onAdd,
  onIncrement,
  onDecrement,
}: {
  quantity: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}) => (
  <View className="mt-2">
    {quantity === 0 ? (
      <Pressable
        onPress={onAdd}
        className="h-9 w-9 items-center justify-center rounded-full bg-brand active:bg-brand-dark">
        <Ionicons name="add" size={20} color={colors.white} />
      </Pressable>
    ) : (
      <View className="flex-row items-center gap-2 rounded-full border border-brand bg-brand-light px-1.5 py-1">
        <Pressable onPress={onDecrement} className="h-7 w-7 items-center justify-center">
          <Ionicons name="remove" size={18} color={colors.brandDark} />
        </Pressable>
        <Typography variant="body" className="min-w-[20px] text-center font-sans-bd text-brand-dark">
          {quantity}
        </Typography>
        <Pressable onPress={onIncrement} className="h-7 w-7 items-center justify-center">
          <Ionicons name="add" size={18} color={colors.brandDark} />
        </Pressable>
      </View>
    )}
  </View>
);

export const MenuItemCard = Object.assign(React.memo(MenuItemCardRoot), {
  Body: MenuItemCardBody,
  Title: MenuItemCardTitle,
  Description: MenuItemCardDescription,
  Price: MenuItemCardPrice,
  Image: MenuItemCardImage,
  Actions: MenuItemCardActions,
});

export default MenuItemCard;
