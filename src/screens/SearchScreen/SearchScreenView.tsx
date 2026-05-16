import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Pressable, ScrollView, View } from 'react-native';

import { RestaurantCard } from '@/components/composite/RestaurantCard';
import { Screen } from '@/components/layout/Screen';
import { Input } from '@/components/ui/Input';
import { Typography } from '@/components/ui/Typography';
import { colors } from '@/constants/colors';
import { CATEGORIES, POPULAR_SEARCHES } from '@/data/mockData';
import { cn } from '@/lib/cn';
import type { Category, Restaurant } from '@/types/restaurant.types';

export interface SearchScreenViewProps {
  query: string;
  categoryId: string | null;
  results: Restaurant[];
  recentSearches: string[];
  inputRef: React.RefObject<import('react-native').TextInput | null>;
  onQueryChange: (text: string) => void;
  onCategoryPress: (id: string | null) => void;
  onPopularPress: (term: string) => void;
  onRecentPress: (term: string) => void;
  onRestaurantPress: (id: string) => void;
  onSubmit: () => void;
}

export const SearchScreenView = ({
  query,
  categoryId,
  results,
  recentSearches,
  inputRef,
  onQueryChange,
  onCategoryPress,
  onPopularPress,
  onRecentPress,
  onRestaurantPress,
  onSubmit,
}: SearchScreenViewProps) => (
  <Screen className="bg-surface-alt">
    <View className="border-b border-border bg-surface px-4 pb-4 pt-2">
      <Typography variant="h2" className="mb-3">
        Search
      </Typography>
      <Input
        ref={inputRef}
        value={query}
        onChangeText={onQueryChange}
        onSubmitEditing={onSubmit}
        placeholder="Search restaurants, dishes..."
        autoFocus
        returnKeyType="search"
        leftIcon={<Ionicons name="search" size={20} color={colors.muted} style={{ marginRight: 8 }} />}
      />
    </View>

    {recentSearches.length > 0 && (
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

    {!query.trim() && (
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
      contentContainerClassName="px-4 gap-2 py-3">
      <Pressable
        onPress={() => onCategoryPress(null)}
        className={cn(
          'rounded-full border px-4 py-2',
          !categoryId ? 'border-brand bg-brand' : 'border-border bg-surface'
        )}>
        <Typography variant="caption" className={cn('font-sans-md', !categoryId ? 'text-white' : 'text-ink-muted')}>
          All
        </Typography>
      </Pressable>
      {CATEGORIES.map((cat: Category) => {
        const active = categoryId === cat.id;
        return (
          <Pressable
            key={cat.id}
            onPress={() => onCategoryPress(cat.id)}
            className={cn(
              'rounded-full border px-4 py-2',
              active ? 'border-brand bg-brand' : 'border-border bg-surface'
            )}>
            <Typography variant="caption" className={cn('font-sans-md', active ? 'text-white' : 'text-ink-muted')}>
              {cat.label}
            </Typography>
          </Pressable>
        );
      })}
    </ScrollView>

    <FlatList
      data={results}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RestaurantCard restaurant={item} onPress={onRestaurantPress} />
      )}
      ListEmptyComponent={
        <Typography variant="caption" className="px-4 py-12 text-center">
          No restaurants match your search.
        </Typography>
      }
      contentContainerClassName="pb-8 pt-1"
    />
  </Screen>
);

export default SearchScreenView;
