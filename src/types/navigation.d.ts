import type { BottomTabParamList } from './navigation.types';
import type { RootStackParamList } from './navigation.types';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type { BottomTabParamList, RootStackParamList };
