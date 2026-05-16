import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { TextInput } from 'react-native';

import { useDebounce } from '@/hooks/useDebounce';
import { useSearch } from '@/hooks/useSearch';
import type { BottomTabScreenPropsFor } from '@/types/navigation.types';

import { SearchScreenView } from './SearchScreenView';

export const SearchScreen = () => {
  const navigation = useNavigation<BottomTabScreenPropsFor<'Search'>['navigation']>();
  const parentNavigation = navigation.getParent();
  const inputRef = useRef<TextInput>(null);
  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const debouncedQuery = useDebounce(query, 300);
  const results = useSearch(debouncedQuery, categoryId);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

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

  return (
    <SearchScreenView
      query={query}
      categoryId={categoryId}
      results={results}
      recentSearches={recentSearches}
      inputRef={inputRef}
      onQueryChange={setQuery}
      onCategoryPress={setCategoryId}
      onPopularPress={handlePopularPress}
      onRecentPress={handleRecentPress}
      onRestaurantPress={handleRestaurantPress}
      onSubmit={handleSubmit}
    />
  );
};

export default SearchScreen;
