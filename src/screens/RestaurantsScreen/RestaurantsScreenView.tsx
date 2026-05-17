import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  TextInput,
  View,
} from 'react-native';

import { RestaurantCard, RestaurantCardSkeleton } from '@/components/composite/RestaurantCard';
import { Screen } from '@/components/layout/Screen';
import { Typography } from '@/components/ui/Typography';
import { colors } from '@/constants/colors';
import { POPULAR_SEARCHES } from '@/data/mockData';
import { cn } from '@/lib/cn';
import type { Category, Restaurant } from '@/types/restaurant.types';

export interface RestaurantsScreenViewProps {
  query: string;
  categoryId: string | null;
  restaurants: Restaurant[];
  categories: Category[];
  isLoading: boolean;
  isRefreshing: boolean;
  recentSearches: string[];
  inputRef: React.RefObject<TextInput | null>;
  onQueryChange: (text: string) => void;
  onCategoryPress: (id: string | null) => void;
  onPopularPress: (term: string) => void;
  onRecentPress: (term: string) => void;
  onRestaurantPress: (id: string) => void;
  onRefresh: () => void;
  onSubmit: () => void;
}

export const RestaurantsScreenView = ({
  query,
  categoryId,
  restaurants,
  categories,
  isLoading,
  isRefreshing,
  recentSearches,
  inputRef,
  onQueryChange,
  onCategoryPress,
  onPopularPress,
  onRecentPress,
  onRestaurantPress,
  onRefresh,
  onSubmit,
}: RestaurantsScreenViewProps) => {
  const showDiscovery = !query.trim();

  const listHeader = (
    <View>
      <View className="bg-surface px-4 pb-4 pt-2">
        <Typography variant="h2" className="mb-1">
          Restaurants
        </Typography>
        <Typography variant="caption" className="mb-4 text-ink-muted">
          Browse and search near you
        </Typography>
        <View className="h-12 flex-row items-center rounded-xl border border-border bg-mist px-4">
          <Feather name="search" size={20} color={colors.muted} style={{ marginRight: 10 }} />
          <TextInput
            ref={inputRef}
            value={query}
            onChangeText={onQueryChange}
            onSubmitEditing={onSubmit}
            placeholder="Search by name or cuisine..."
            placeholderTextColor={colors.mutedLight}
            returnKeyType="search"
            className="flex-1 font-sans text-base text-ink"
          />
          {query.length > 0 && (
            <Pressable onPress={() => onQueryChange('')} hitSlop={8}>
              <Feather name="x-circle" size={18} color={colors.mutedLight} />
            </Pressable>
          )}
        </View>
      </View>

      {showDiscovery && recentSearches.length > 0 && (
        <View className="px-4 py-4">
          <Typography variant="label" className="mb-2">
            Recent
          </Typography>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
            {recentSearches.map((term) => (
              <Pressable
                key={term}
                onPress={() => onRecentPress(term)}
                className="rounded-full border border-border bg-surface px-4 py-2">
                <Typography variant="caption">{term}</Typography>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}

      {showDiscovery && (
        <View className="px-4 pb-2">
          <Typography variant="label" className="mb-2">
            Popular searches
          </Typography>
          <View className="flex-row flex-wrap gap-2">
            {POPULAR_SEARCHES.map((term) => (
              <Pressable
                key={term}
                onPress={() => onPopularPress(term)}
                className="rounded-full bg-brand-light px-4 py-2">
                <Typography variant="caption" className="font-sans-md text-brand-dark">
                  {term}
                </Typography>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-2 px-4 py-3">
        <Pressable
          onPress={() => onCategoryPress(null)}
          className={cn(
            'rounded-full border px-4 py-2',
            !categoryId ? 'border-brand bg-brand' : 'border-border bg-mist'
          )}>
          <Typography
            variant="caption"
            className={cn('font-sans-md', !categoryId ? 'text-white' : 'text-ink-muted')}>
            All
          </Typography>
        </Pressable>
        {categories.map((cat) => {
          const active = categoryId === cat.id;
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
    </View>
  );

  return (
    <Screen className="bg-mist" edges={['top']}>
      {isLoading ? (
        <View className="flex-1">
          {listHeader}
          <RestaurantCardSkeleton />
          <RestaurantCardSkeleton />
          <RestaurantCardSkeleton />
        </View>
      ) : (
        <FlatList
          data={restaurants}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={listHeader}
          renderItem={({ item }) => (
            <RestaurantCard restaurant={item} onPress={onRestaurantPress} />
          )}
          ListEmptyComponent={
            <Typography variant="caption" className="px-4 py-12 text-center text-ink-muted">
              No restaurants match your search.
            </Typography>
          }
          contentContainerClassName="pb-8"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor={colors.brand} />
          }
        />
      )}
    </Screen>
  );
};

export default RestaurantsScreenView;
