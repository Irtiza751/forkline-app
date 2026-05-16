import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Badge } from '@/components/ui/Badge';
import { Typography } from '@/components/ui/Typography';
import { colors } from '@/constants/colors';
import { formatCurrency } from '@/lib/format';
import type { Restaurant } from '@/types/restaurant.types';

export interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: (id: string) => void;
}

export const RestaurantCard = React.memo(({ restaurant, onPress }: RestaurantCardProps) => (
  <Pressable
    onPress={() => onPress(restaurant.id)}
    className="mx-4 mb-3 flex-row overflow-hidden rounded-xl border border-border bg-surface active:opacity-90">
    <Image
      source={{ uri: restaurant.imageUrl }}
      style={{ width: 96, height: 96 }}
      contentFit="cover"
    />
    <View className="flex-1 justify-center px-3 py-2.5">
      <Typography variant="h3" className="text-base leading-snug" numberOfLines={1}>
        {restaurant.name}
      </Typography>
      <Typography variant="caption" className="mt-0.5 text-ink-muted" numberOfLines={1}>
        {restaurant.cuisine}
      </Typography>
      <View className="mt-2 flex-row flex-wrap items-center gap-x-2 gap-y-1">
        <View className="flex-row items-center gap-0.5">
          <Ionicons name="star" size={12} color={colors.star} />
          <Typography variant="caption" className="font-sans-md text-ink">
            {restaurant.rating}
          </Typography>
        </View>
        <Typography variant="caption" className="text-muted-light">
          ·
        </Typography>
        <Typography variant="caption">{restaurant.deliveryTime} min</Typography>
        <Typography variant="caption" className="text-muted-light">
          ·
        </Typography>
        <Typography variant="caption">{formatCurrency(restaurant.deliveryFee)}</Typography>
      </View>
      <View className="mt-2 flex-row items-center justify-between">
        <Badge variant={restaurant.isOpen ? 'success' : 'muted'}>
          {restaurant.isOpen ? 'Open' : 'Closed'}
        </Badge>
      </View>
    </View>
  </Pressable>
));

RestaurantCard.displayName = 'RestaurantCard';

export const RestaurantCardSkeleton = () => (
  <View className="mx-4 mb-3 h-24 rounded-xl bg-surface-alt" />
);

export default RestaurantCard;
