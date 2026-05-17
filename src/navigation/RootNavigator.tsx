import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '@/hooks/useAuth';
import { RestaurantScreen } from '@/screens/RestaurantScreen';
import { colors } from '@/constants/colors';
import type { RootStackParamList } from '@/types/navigation.types';

import { AuthNavigator } from './AuthNavigator';
import { BottomTabNavigator } from './BottomTabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F1F3F3',
    primary: '#007A55',
    card: '#FFFFFF',
    text: '#02140b',
    border: '#E5E7EB',
  },
};

export function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-mist">
        <ActivityIndicator size="large" color={colors.brand} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
            <Stack.Screen
              name="Restaurant"
              component={RestaurantScreen}
              options={{ animation: 'slide_from_right' }}
            />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
