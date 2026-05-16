import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MenuItemCard } from '@/components/composite/MenuItemCard';
import { Screen } from '@/components/layout/Screen';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { cn } from '@/lib/cn';
import { formatCurrency } from '@/lib/format';
import type { MenuCategory, Restaurant } from '@/types/restaurant.types';

export interface RestaurantScreenViewProps {
  restaurant: Restaurant;
  activeCategoryId: string;
  cartCount: number;
  cartTotal: number;
  getItemQuantity: (menuItemId: string) => number;
  onBack: () => void;
  onCategoryPress: (categoryId: string) => void;
  onAddItem: (menuItemId: string) => void;
  onIncrement: (menuItemId: string) => void;
  onDecrement: (menuItemId: string) => void;
  onViewCart: () => void;
}

export const RestaurantScreenView = ({
  restaurant,
  activeCategoryId,
  cartCount,
  cartTotal,
  getItemQuantity,
  onBack,
  onCategoryPress,
  onAddItem,
  onIncrement,
  onDecrement,
  onViewCart,
}: RestaurantScreenViewProps) => {
  const insets = useSafeAreaInsets();
  const sectionRefs = useRef<Record<string, number>>({});
  const scrollRef = useRef<ScrollView>(null);
  const slideAnim = useRef(new Animated.Value(cartCount > 0 ? 0 : 100)).current;

  React.useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: cartCount > 0 ? 0 : 100,
      useNativeDriver: true,
    }).start();
  }, [cartCount, slideAnim]);

  const handleCategoryPress = (categoryId: string) => {
    onCategoryPress(categoryId);
    const y = sectionRefs.current[categoryId];
    if (y !== undefined) {
      scrollRef.current?.scrollTo({ y, animated: true });
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    let activeId = restaurant.menu[0]?.id ?? '';
    for (const category of restaurant.menu) {
      const sectionY = sectionRefs.current[category.id];
      if (sectionY !== undefined && offsetY >= sectionY - 120) {
        activeId = category.id;
      }
    }
    if (activeId !== activeCategoryId) {
      onCategoryPress(activeId);
    }
  };

  return (
    <Screen edges={[]} className="bg-surface">
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <View className="relative">
          <Image
            source={{ uri: restaurant.imageUrl }}
            style={{ width: '100%', height: 220 }}
            contentFit="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(2, 20, 11, 0.55)']}
            style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 80 }}
          />
          <Pressable
            onPress={onBack}
            style={{ top: insets.top + 8 }}
            className="absolute left-4 rounded-full bg-black/40 p-2">
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </Pressable>
          <Pressable
            style={{ top: insets.top + 8 }}
            className="absolute right-4 rounded-full bg-black/40 p-2">
            <Ionicons name="heart-outline" size={22} color="#fff" />
          </Pressable>
        </View>

        <View className="px-4 py-4">
          <Typography variant="h1" className="text-2xl">
            {restaurant.name}
          </Typography>
          <Typography variant="caption" className="mt-1 text-ink-muted">
            {restaurant.cuisine} · ★ {restaurant.rating} · {restaurant.deliveryTime} min · Fee{' '}
            {formatCurrency(restaurant.deliveryFee)}
          </Typography>
          <View className="mt-2 flex-row flex-wrap gap-2">
            <Badge variant="muted">Min order {formatCurrency(restaurant.minOrder)}</Badge>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="px-4 gap-2 pb-4">
          {restaurant.menu.map((cat: MenuCategory) => {
            const active = activeCategoryId === cat.id;
            return (
              <Pressable
                key={cat.id}
                onPress={() => handleCategoryPress(cat.id)}
                className={cn(
                  'rounded-full border px-4 py-2',
                  active ? 'border-brand bg-brand' : 'border-border bg-surface-alt'
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

        <View className="px-4 pb-32">
          {restaurant.menu.map((category) => (
            <View
              key={category.id}
              onLayout={(e) => {
                sectionRefs.current[category.id] = e.nativeEvent.layout.y;
              }}>
              <Typography variant="h2" className="mb-4 mt-2 text-xl">
                {category.label}
              </Typography>
              {category.items.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  quantity={getItemQuantity(item.id)}
                  onAdd={() => onAddItem(item.id)}
                  onIncrement={() => onIncrement(item.id)}
                  onDecrement={() => onDecrement(item.id)}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      <Animated.View
        style={{ transform: [{ translateY: slideAnim }], paddingBottom: insets.bottom + 8 }}
        className="absolute bottom-0 left-0 right-0 px-4">
        {cartCount > 0 && (
          <Button fullWidth size="lg" onPress={onViewCart}>
            View Cart · {cartCount} items · {formatCurrency(cartTotal)}
          </Button>
        )}
      </Animated.View>
    </Screen>
  );
};

export default RestaurantScreenView;
