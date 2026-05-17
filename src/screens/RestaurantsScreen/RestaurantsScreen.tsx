import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import type { TextInput } from 'react-native';

import { useDebounce } from '@/hooks/useDebounce';
import { useRestaurantSearch } from '@/hooks/useSearch';
import { useRestaurants } from '@/hooks/useRestaurants';
import type { BottomTabScreenPropsFor } from '@/types/navigation.types';

import { RestaurantsScreenView } from './RestaurantsScreenView';

export const RestaurantsScreen = () => {
  const navigation = useNavigation<BottomTabScreenPropsFor<'Restaurants'>['navigation']>();
  const parentNavigation = navigation.getParent();
  const inputRef = useRef<TextInput>(null);
  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const debouncedQuery = useDebounce(query, 300);

  const { categories, isLoading, isRefreshing, refetch } = useRestaurants();
  const restaurants = useRestaurantSearch(debouncedQuery, categoryId);

  const saveRecent = useCallback((term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setRecentSearches((prev) => [trimmed, ...prev.filter((t) => t !== trimmed)].slice(0, 5));
  }, []);

  const handleSubmit = useCallback(() => {
    saveRecent(query);
  }, [query, saveRecent]);

  const handlePopularPress = useCallback(
    (term: string) => {
      setQuery(term);
      saveRecent(term);
    },
    [saveRecent]
  );

  const handleRecentPress = useCallback((term: string) => {
    setQuery(term);
  }, []);

  const handleRestaurantPress = useCallback(
    (id: string) => {
      parentNavigation?.navigate('Restaurant', { restaurantId: id });
    },
    [parentNavigation]
  );

  const handleCategoryPress = useCallback((id: string | null) => {
    setCategoryId(id);
  }, []);

  return (
    <RestaurantsScreenView
      query={query}
      categoryId={categoryId}
      restaurants={restaurants}
      categories={categories}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      recentSearches={recentSearches}
      inputRef={inputRef}
      onQueryChange={setQuery}
      onCategoryPress={handleCategoryPress}
      onPopularPress={handlePopularPress}
      onRecentPress={handleRecentPress}
      onRestaurantPress={handleRestaurantPress}
      onRefresh={refetch}
      onSubmit={handleSubmit}
    />
  );
};

export default RestaurantsScreen;
