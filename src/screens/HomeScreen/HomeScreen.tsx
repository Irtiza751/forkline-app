import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';

import { useRestaurants } from '@/hooks/useRestaurants';
import type { BottomTabScreenPropsFor } from '@/types/navigation.types';

import { HomeScreenView } from './HomeScreenView';

export const HomeScreen = () => {
  const navigation = useNavigation<BottomTabScreenPropsFor<'Home'>['navigation']>();
  const parentNavigation = navigation.getParent();

  const {
    restaurants,
    featuredRestaurants,
    isLoading,
    categories,
    activeCategory,
    setActiveCategory,
    refetch,
  } = useRestaurants();

  const handleRestaurantPress = useCallback(
    (id: string) => {
      parentNavigation?.navigate('Restaurant', { restaurantId: id });
    },
    [parentNavigation]
  );

  const handleCategoryPress = useCallback(
    (id: string) => {
      setActiveCategory(id);
    },
    [setActiveCategory]
  );

  const handleSearchPress = useCallback(() => {
    navigation.navigate('Search');
  }, [navigation]);

  return (
    <HomeScreenView
      isLoading={isLoading}
      restaurants={restaurants}
      featuredRestaurants={featuredRestaurants}
      categories={categories}
      activeCategory={activeCategory}
      onRefresh={refetch}
      onRestaurantPress={handleRestaurantPress}
      onCategoryPress={handleCategoryPress}
      onSearchPress={handleSearchPress}
    />
  );
};

export default HomeScreen;
