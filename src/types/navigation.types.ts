import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  BottomTabs: NavigatorScreenParams<BottomTabParamList> | undefined;
  Restaurant: { restaurantId: string };
  FoodItem: { restaurantId: string; menuItemId: string };
};

export type BottomTabParamList = {
  Home: undefined;
  Restaurants: undefined;
  Cart: undefined;
  Orders: undefined;
  Profile: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type BottomTabScreenPropsFor<T extends keyof BottomTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;
