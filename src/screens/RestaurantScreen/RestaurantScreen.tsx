import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';

import { getRestaurantById } from '@/data/mockData';
import { useCart } from '@/hooks/useCart';
import type { RootStackScreenProps } from '@/types/navigation.types';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

import { RestaurantScreenView } from './RestaurantScreenView';

export const RestaurantScreen = () => {
  const route = useRoute<RootStackScreenProps<'Restaurant'>['route']>();
  const navigation = useNavigation<RootStackScreenProps<'Restaurant'>['navigation']>();
  const restaurant = getRestaurantById(route.params.restaurantId);
  const [activeCategoryId, setActiveCategoryId] = useState(restaurant?.menu[0]?.id ?? '');
  const { items, updateQty, getQuantityForMenuItem, itemCount, total } = useCart();

  const getItemQuantity = useCallback(
    (menuItemId: string) => getQuantityForMenuItem(menuItemId),
    [getQuantityForMenuItem]
  );

  const openFoodItem = useCallback(
    (menuItemId: string) => {
      if (!restaurant) return;
      navigation.navigate('FoodItem', {
        restaurantId: restaurant.id,
        menuItemId,
      });
    },
    [navigation, restaurant]
  );

  const findFirstCartLine = useCallback(
    (menuItemId: string) => items.find((i) => i.menuItemId === menuItemId),
    [items]
  );

  const handleIncrement = useCallback(
    (menuItemId: string) => {
      const line = findFirstCartLine(menuItemId);
      if (line) {
        updateQty(line.id, line.quantity + 1);
        return;
      }
      openFoodItem(menuItemId);
    },
    [findFirstCartLine, openFoodItem, updateQty]
  );

  const handleDecrement = useCallback(
    (menuItemId: string) => {
      const line = findFirstCartLine(menuItemId);
      if (line) {
        updateQty(line.id, line.quantity - 1);
      }
    },
    [findFirstCartLine, updateQty]
  );

  const handleViewCart = useCallback(() => {
    navigation.navigate('BottomTabs', { screen: 'Cart' });
  }, [navigation]);

  if (!restaurant) {
    return (
      <View className="flex-1 items-center justify-center bg-surface p-6">
        <Typography variant="h2">Restaurant not found</Typography>
        <Button className="mt-4" onPress={() => navigation.goBack()}>
          Go back
        </Button>
      </View>
    );
  }

  return (
    <RestaurantScreenView
      restaurant={restaurant}
      activeCategoryId={activeCategoryId}
      cartCount={itemCount}
      cartTotal={total}
      getItemQuantity={getItemQuantity}
      onBack={() => navigation.goBack()}
      onCategoryPress={setActiveCategoryId}
      onItemPress={openFoodItem}
      onAddItem={openFoodItem}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
      onViewCart={handleViewCart}
    />
  );
};

export default RestaurantScreen;
