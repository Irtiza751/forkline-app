import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';

import { useFoodFeed } from '@/hooks/useFoodFeed';
import type { BottomTabScreenPropsFor } from '@/types/navigation.types';

import { HomeScreenView } from './HomeScreenView';

export const HomeScreen = () => {
  const navigation = useNavigation<BottomTabScreenPropsFor<'Home'>['navigation']>();
  const parentNavigation = navigation.getParent();

  const {
    foodItems,
    featuredRestaurants,
    isLoading,
    categories,
    activeCategory,
    setActiveCategory,
    refetch,
  } = useFoodFeed();

  const handleRestaurantPress = useCallback(
    (id: string) => {
      parentNavigation?.navigate('Restaurant', { restaurantId: id });
    },
    [parentNavigation]
  );

  const handleFoodItemPress = useCallback(
    (item: { restaurantId: string; menuItem: { id: string } }) => {
      parentNavigation?.navigate('FoodItem', {
        restaurantId: item.restaurantId,
        menuItemId: item.menuItem.id,
      });
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
    navigation.navigate('Restaurants');
  }, [navigation]);

  return (
    <HomeScreenView
      isLoading={isLoading}
      foodItems={foodItems}
      featuredRestaurants={featuredRestaurants}
      categories={categories}
      activeCategory={activeCategory}
      onRefresh={refetch}
      onRestaurantPress={handleRestaurantPress}
      onFoodItemPress={handleFoodItemPress}
      onCategoryPress={handleCategoryPress}
      onSearchPress={handleSearchPress}
    />
  );
};

export default HomeScreen;
