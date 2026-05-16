import React, { useCallback, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  RefreshControl,
  ScrollView,
} from 'react-native';

import { FeaturedRestaurantCard } from '@/components/composite/FeaturedRestaurantCard';
import { RestaurantCard, RestaurantCardSkeleton } from '@/components/composite/RestaurantCard';
import { Screen } from '@/components/layout/Screen';
import { Section } from '@/components/layout/Section';
import { Typography } from '@/components/ui/Typography';
import { colors } from '@/constants/colors';
import { cn } from '@/lib/cn';
import type { Category, Restaurant } from '@/types/restaurant.types';

import { HomeHeader } from './HomeHeader';

const SCROLL_THRESHOLD = 8;

export interface HomeScreenViewProps {
  restaurants: Restaurant[];
  featuredRestaurants: Restaurant[];
  isLoading: boolean;
  categories: Category[];
  activeCategory: string;
  onRefresh: () => void;
  onRestaurantPress: (id: string) => void;
  onCategoryPress: (id: string) => void;
  onSearchPress: () => void;
}

export const HomeScreenView = ({
  restaurants,
  featuredRestaurants,
  isLoading,
  categories,
  activeCategory,
  onRefresh,
  onRestaurantPress,
  onCategoryPress,
  onSearchPress,
}: HomeScreenViewProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const scrolled = offsetY > SCROLL_THRESHOLD;
    setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
  }, []);

  return (
    <Screen className="bg-mist" edges={['top']}>
      <HomeHeader onSearchPress={onSearchPress} isScrolled={isScrolled} />
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} tintColor={colors.brand} />
        }
        showsVerticalScrollIndicator={false}
        className="flex-1">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-2 bg-surface px-4 pb-4 pt-3">
          {categories.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <Pressable
                key={cat.id}
                onPress={() => onCategoryPress(cat.id)}
                className={cn(
                  'rounded-full border px-4 py-2',
                  active ? 'border-brand bg-brand' : 'border-border bg-mist'
                )}>
                <Typography
                  variant="caption"
                  className={cn('font-sans-md', active ? 'text-white' : 'text-ink-muted')}>
                  {cat.label}
                </Typography>
              </Pressable>
            );
          })}
        </ScrollView>

        <Section title="Featured" className="mt-2">
          <FlatList
            horizontal
            data={featuredRestaurants}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <FeaturedRestaurantCard restaurant={item} onPress={onRestaurantPress} />
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="px-4"
          />
        </Section>

        <Section title="All restaurants">
          {isLoading ? (
            <>
              <RestaurantCardSkeleton />
              <RestaurantCardSkeleton />
              <RestaurantCardSkeleton />
            </>
          ) : (
            <>
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onPress={onRestaurantPress}
                />
              ))}
              {restaurants.length === 0 && (
                <Typography variant="caption" className="px-4 py-8 text-center">
                  No restaurants found in this category.
                </Typography>
              )}
            </>
          )}
        </Section>
      </ScrollView>
    </Screen>
  );
};

export default HomeScreenView;
