import { Feather } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/constants/colors';
import { useCart } from '@/hooks/useCart';
import { CartScreen } from '@/screens/CartScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { OrdersScreen } from '@/screens/OrdersScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { RestaurantsScreen } from '@/screens/RestaurantsScreen';
import type { BottomTabParamList } from '@/types/navigation.types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const VISIBLE_TABS: (keyof BottomTabParamList)[] = ['Home', 'Restaurants', 'Cart', 'Profile'];

const TAB_ICONS: Record<keyof BottomTabParamList, keyof typeof Feather.glyphMap> = {
  Home: 'home',
  Restaurants: 'grid',
  Cart: 'shopping-bag',
  Orders: 'package',
  Profile: 'user',
};

const TAB_LABELS: Record<keyof BottomTabParamList, string> = {
  Home: 'Home',
  Restaurants: 'Restaurants',
  Cart: 'Cart',
  Orders: 'Orders',
  Profile: 'Profile',
};

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { itemCount } = useCart();

  const visibleRoutes = state.routes.filter((route) =>
    VISIBLE_TABS.includes(route.name as keyof BottomTabParamList)
  );

  return (
    <View
      className="flex-row items-center border-t border-border bg-surface px-1 pt-2"
      style={{ paddingBottom: Math.max(insets.bottom, 8) }}>
      {visibleRoutes.map((route) => {
        const index = state.routes.findIndex((r) => r.key === route.key);
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const isCart = route.name === 'Cart';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const iconColor = isFocused ? colors.brand : colors.muted;
        const labelColor = isFocused ? colors.brand : colors.muted;
        const iconName = TAB_ICONS[route.name as keyof BottomTabParamList];

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            className="flex-1 items-center justify-center py-2">
            <View className="relative">
              <Feather name={iconName} size={22} color={iconColor} />
              {isCart && itemCount > 0 && (
                <View className="absolute -right-2 -top-1.5 min-h-[16px] min-w-[16px] items-center justify-center rounded-full bg-brand px-1">
                  <Text className="text-[9px] text-white">{itemCount > 9 ? '9+' : itemCount}</Text>
                </View>
              )}
            </View>
            <Text className="mt-1 text-xs font-sans" style={{ color: labelColor }}>
              {TAB_LABELS[route.name as keyof BottomTabParamList]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{ tabBarButton: () => null }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
