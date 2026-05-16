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
  const { items, addItem, updateQty, itemCount, total } = useCart();

  const getItemQuantity = useCallback(
    (menuItemId: string) => items.find((i) => i.menuItemId === menuItemId)?.quantity ?? 0,
    [items]
  );

  const findMenuItem = useCallback(
    (menuItemId: string) => {
      if (!restaurant) return null;
      for (const category of restaurant.menu) {
        const found = category.items.find((i) => i.id === menuItemId);
        if (found) return found;
      }
      return null;
    },
    [restaurant]
  );

  const handleAddItem = useCallback(
    (menuItemId: string) => {
      const menuItem = findMenuItem(menuItemId);
      if (!menuItem || !restaurant) return;
      addItem({
        menuItemId: menuItem.id,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        name: menuItem.name,
        price: menuItem.price,
        quantity: 1,
        imageUrl: menuItem.imageUrl,
      });
    },
    [addItem, findMenuItem, restaurant]
  );

  const handleIncrement = useCallback(
    (menuItemId: string) => {
      const qty = getItemQuantity(menuItemId);
      if (qty === 0) {
        handleAddItem(menuItemId);
        return;
      }
      updateQty(menuItemId, qty + 1);
    },
    [getItemQuantity, handleAddItem, updateQty]
  );

  const handleDecrement = useCallback(
    (menuItemId: string) => {
      const qty = getItemQuantity(menuItemId);
      updateQty(menuItemId, qty - 1);
    },
    [getItemQuantity, updateQty]
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
      onAddItem={handleAddItem}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
      onViewCart={handleViewCart}
    />
  );
};

export default RestaurantScreen;
