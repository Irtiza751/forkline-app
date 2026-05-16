import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { colors } from '@/constants/colors';
import type { Restaurant } from '@/types/restaurant.types';

export interface FeaturedRestaurantCardProps {
  restaurant: Restaurant;
  onPress: (id: string) => void;
}

export const FeaturedRestaurantCard = React.memo(
  ({ restaurant, onPress }: FeaturedRestaurantCardProps) => (
    <Pressable
      onPress={() => onPress(restaurant.id)}
      className="mr-3 w-[280px] overflow-hidden rounded-2xl border border-border active:opacity-90">
      <Image
        source={{ uri: restaurant.imageUrl }}
        style={{ width: 280, height: 168 }}
        contentFit="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(2, 20, 11, 0.75)']}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 88, justifyContent: 'flex-end', padding: 16 }}>
        <Typography variant="h3" className="text-white">
          {restaurant.name}
        </Typography>
        <View className="mt-1 flex-row items-center gap-1">
          <Ionicons name="star" size={14} color={colors.star} />
          <Typography variant="caption" className="text-white">
            {restaurant.rating} · {restaurant.deliveryTime} min
          </Typography>
        </View>
      </LinearGradient>
    </Pressable>
  )
);

FeaturedRestaurantCard.displayName = 'FeaturedRestaurantCard';

export default FeaturedRestaurantCard;
