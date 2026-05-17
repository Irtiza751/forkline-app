import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Badge } from '@/components/ui/Badge';
import { Typography } from '@/components/ui/Typography';
import { colors } from '@/constants/colors';
import { formatCurrency } from '@/lib/format';
import type { FeedFoodItem } from '@/types/restaurant.types';

export interface FoodItemCardProps {
  item: FeedFoodItem;
  onPress: (restaurantId: string) => void;
}

export const FoodItemCard = React.memo(({ item, onPress }: FoodItemCardProps) => (
  <Pressable
    onPress={() => onPress(item.restaurantId)}
    className="mx-4 mb-4 overflow-hidden rounded-2xl border border-border bg-surface active:opacity-90">
    <Image
      source={{ uri: item.menuItem.imageUrl }}
      style={{ width: '100%', height: 180 }}
      contentFit="cover"
    />
    <View className="p-4">
      <View className="flex-row items-start justify-between gap-2">
        <View className="flex-1">
          <Typography variant="h3" className="text-base leading-snug" numberOfLines={1}>
            {item.menuItem.name}
          </Typography>
          <Typography variant="caption" className="mt-1 text-ink-muted" numberOfLines={2}>
            {item.menuItem.description}
          </Typography>
        </View>
        {item.menuItem.isPopular && <Badge variant="default">Popular</Badge>}
      </View>

      <View className="mt-3 flex-row items-center justify-between">
        <View className="flex-1">
          <Typography variant="caption" className="font-sans-md text-ink" numberOfLines={1}>
            {item.restaurantName}
          </Typography>
          <View className="mt-1 flex-row items-center gap-2">
            <View className="flex-row items-center gap-0.5">
              <Ionicons name="star" size={12} color={colors.star} />
              <Typography variant="caption">{item.restaurantRating}</Typography>
            </View>
            <Typography variant="caption" className="text-muted-light">
              ·
            </Typography>
            <Typography variant="caption">{item.deliveryTime} min</Typography>
            {item.menuItem.isVeg && (
              <>
                <Typography variant="caption" className="text-muted-light">
                  ·
                </Typography>
                <View className="h-2 w-2 rounded-full bg-brand" />
              </>
            )}
          </View>
        </View>
        <Typography variant="h3" className="font-sans-bd text-brand">
          {formatCurrency(item.menuItem.price)}
        </Typography>
      </View>
    </View>
  </Pressable>
));

FoodItemCard.displayName = 'FoodItemCard';

export const FoodItemCardSkeleton = () => (
  <View className="mx-4 mb-4 overflow-hidden rounded-2xl border border-border bg-surface">
    <View className="h-[180px] w-full bg-mist" />
    <View className="gap-2 p-4">
      <View className="h-4 w-3/4 rounded bg-mist" />
      <View className="h-3 w-full rounded bg-mist" />
      <View className="h-3 w-1/2 rounded bg-mist" />
    </View>
  </View>
);

export default FoodItemCard;
