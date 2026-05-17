import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import { getMenuItemById } from '@/data/mockData';
import { useCart } from '@/hooks/useCart';
import { useHaptics } from '@/hooks/useHaptics';
import {
  getCustomizationGroups,
  getDefaultSelections,
} from '@/lib/menuItemCustomizations';
import type { CartItemExtra } from '@/types/menuCustomization.types';
import type { RootStackScreenProps } from '@/types/navigation.types';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

import { FoodItemScreenView } from './FoodItemScreenView';

function buildExtras(
  groups: ReturnType<typeof getCustomizationGroups>,
  selections: Record<string, string[]>
): CartItemExtra[] {
  const extras: CartItemExtra[] = [];
  for (const group of groups) {
    const selected = selections[group.id] ?? [];
    for (const optionId of selected) {
      const option = group.options.find((o) => o.id === optionId);
      if (option) {
        extras.push({
          id: option.id,
          label: option.label,
          price: option.price,
          groupId: group.id,
          groupLabel: group.label,
        });
      }
    }
  }
  return extras;
}

export const FoodItemScreen = () => {
  const route = useRoute<RootStackScreenProps<'FoodItem'>['route']>();
  const navigation = useNavigation<RootStackScreenProps<'FoodItem'>['navigation']>();
  const { addItem } = useCart();
  const haptics = useHaptics();

  const data = getMenuItemById(route.params.restaurantId, route.params.menuItemId);
  const groups = useMemo(
    () => (data ? getCustomizationGroups(data.menuItem, data.restaurant) : []),
    [data]
  );

  const [selections, setSelections] = useState<Record<string, string[]>>(() =>
    getDefaultSelections(groups)
  );
  const [specialNotes, setSpecialNotes] = useState('');
  const [quantity, setQuantity] = useState(1);

  const selectedExtras = useMemo(
    () => buildExtras(groups, selections),
    [groups, selections]
  );

  const extrasTotal = useMemo(
    () => selectedExtras.reduce((sum, e) => sum + e.price, 0),
    [selectedExtras]
  );

  const unitPrice = (data?.menuItem.price ?? 0) + extrasTotal;
  const lineTotal = unitPrice * quantity;

  const handleSelectSingle = useCallback((groupId: string, optionId: string) => {
    setSelections((prev) => ({ ...prev, [groupId]: [optionId] }));
  }, []);

  const handleToggleMultiple = useCallback((groupId: string, optionId: string) => {
    setSelections((prev) => {
      const current = prev[groupId] ?? [];
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      return { ...prev, [groupId]: next };
    });
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!data) return;
    const { menuItem, restaurant } = data;
  const notes = specialNotes.trim() || undefined;

    addItem({
      id: `cart-${menuItem.id}-${Date.now()}`,
      menuItemId: menuItem.id,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      name: menuItem.name,
      basePrice: menuItem.price,
      price: unitPrice,
      quantity,
      imageUrl: menuItem.imageUrl,
      selectedExtras,
      specialNotes: notes,
    });
    haptics.success();
    navigation.goBack();
  }, [addItem, data, haptics, navigation, quantity, selectedExtras, specialNotes, unitPrice]);

  if (!data) {
    return (
      <View className="flex-1 items-center justify-center bg-mist p-6">
        <Typography variant="h2">Item not found</Typography>
        <Button className="mt-4" onPress={() => navigation.goBack()}>
          Go back
        </Button>
      </View>
    );
  }

  return (
    <FoodItemScreenView
      menuItem={data.menuItem}
      restaurantName={data.restaurant.name}
      groups={groups}
      selections={selections}
      specialNotes={specialNotes}
      quantity={quantity}
      unitPrice={unitPrice}
      lineTotal={lineTotal}
      onBack={() => navigation.goBack()}
      onSelectSingle={handleSelectSingle}
      onToggleMultiple={handleToggleMultiple}
      onNotesChange={setSpecialNotes}
      onIncrement={() => setQuantity((q) => q + 1)}
      onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
      onAddToCart={handleAddToCart}
    />
  );
};

export default FoodItemScreen;
