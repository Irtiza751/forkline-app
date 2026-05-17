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
    className="mx-4 mb-4 overflow-hidden rounded-2xl border border-border bg-surface active:opacity-90">
    <Image
      source={{ uri: restaurant.imageUrl }}
      style={{ width: '100%', height: 160 }}
      contentFit="cover"
    />
    <View className="p-4">
      <Typography variant="h3" className="text-base leading-snug" numberOfLines={1}>
        {restaurant.name}
      </Typography>
      <Typography variant="caption" className="mt-1 text-ink-muted" numberOfLines={1}>
        {restaurant.cuisine}
      </Typography>
      <View className="mt-3 flex-row flex-wrap items-center gap-x-2 gap-y-1">
        <View className="flex-row items-center gap-0.5">
          <Ionicons name="star" size={12} color={colors.star} />
          <Typography variant="caption" className="font-sans-md text-ink">
            {restaurant.rating}
          </Typography>
          <Typography variant="caption" className="text-muted-light">
            {' '}
            ({restaurant.reviewCount})
          </Typography>
        </View>
        <Typography variant="caption" className="text-muted-light">
          ·
        </Typography>
        <Typography variant="caption">{restaurant.deliveryTime} min</Typography>
        <Typography variant="caption" className="text-muted-light">
          ·
        </Typography>
        <Typography variant="caption">{formatCurrency(restaurant.deliveryFee)} fee</Typography>
      </View>
      <View className="mt-3 flex-row items-center justify-between">
        <Badge variant={restaurant.isOpen ? 'success' : 'muted'}>
          {restaurant.isOpen ? 'Open' : 'Closed'}
        </Badge>
        <Typography variant="caption" className="text-ink-muted">
          Min {formatCurrency(restaurant.minOrder)}
        </Typography>
      </View>
    </View>
  </Pressable>
));

RestaurantCard.displayName = 'RestaurantCard';

export const RestaurantCardSkeleton = () => (
  <View className="mx-4 mb-4 overflow-hidden rounded-2xl border border-border bg-surface">
    <View className="h-40 w-full bg-mist" />
    <View className="gap-2 p-4">
      <View className="h-4 w-2/3 rounded bg-mist" />
      <View className="h-3 w-1/2 rounded bg-mist" />
    </View>
  </View>
);

export default RestaurantCard;
