import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/constants/colors';
import { useCart } from '@/hooks/useCart';
import { CartScreen } from '@/screens/CartScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { OrdersScreen } from '@/screens/OrdersScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { SearchScreen } from '@/screens/SearchScreen';
import type { BottomTabParamList } from '@/types/navigation.types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const TAB_ICONS: Record<keyof BottomTabParamList, keyof typeof Ionicons.glyphMap> = {
  Home: 'home',
  Search: 'search',
  Cart: 'cart',
  Orders: 'receipt',
  Profile: 'person',
};

const TAB_LABELS: Record<keyof BottomTabParamList, string> = {
  Home: 'Home',
  Search: 'Search',
  Cart: 'Cart',
  Orders: 'Orders',
  Profile: 'Profile',
};

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { itemCount } = useCart();

  return (
    <View
      className="flex-row items-end border-t border-border bg-surface px-1 pt-2"
      style={{ paddingBottom: Math.max(insets.bottom, 8) }}>
      {state.routes.map((route, index) => {
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
        const labelClass = isFocused ? 'text-brand font-sans-bd' : 'text-muted';

        if (isCart) {
          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              className="flex-1 items-center justify-center pb-1">
              <View
                className="relative -mt-7 h-[52px] w-[52px] items-center justify-center rounded-full bg-brand"
                style={{
                  shadowColor: colors.ink,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 8,
                  elevation: 6,
                }}>
                <Ionicons name="cart" size={24} color={colors.white} />
                {itemCount > 0 && (
                  <View className="absolute -right-0.5 -top-0.5 min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-ink px-1">
                    <Text className="text-[10px] font-bold text-white">
                      {itemCount > 9 ? '9+' : itemCount}
                    </Text>
                  </View>
                )}
              </View>
              <Text className={`mt-1 text-xs ${labelClass}`}>{TAB_LABELS.Cart}</Text>
            </Pressable>
          );
        }

        const iconName = TAB_ICONS[route.name as keyof BottomTabParamList];

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            className="flex-1 items-center justify-center py-2">
            <Ionicons name={iconName} size={22} color={iconColor} />
            <Text className={`mt-1 text-xs ${labelClass}`}>
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
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
