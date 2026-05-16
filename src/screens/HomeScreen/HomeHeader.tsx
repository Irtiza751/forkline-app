import React from 'react';
import { View } from 'react-native';

import { Logo } from '@/components/brand/Logo';
import { SearchBar } from '@/components/composite/SearchBar';
import { colors } from '@/constants/colors';
import { cn } from '@/lib/cn';

export interface HomeHeaderProps {
  location?: string;
  onLocationPress?: () => void;
  onSearchPress: () => void;
  isScrolled?: boolean;
}

export const HomeHeader = ({
  location = 'Islamabad, PK',
  onLocationPress,
  onSearchPress,
  isScrolled = false,
}: HomeHeaderProps) => (
  <View
    className={cn('bg-brand px-4 pb-4 pt-3', !isScrolled && 'border-b border-border')}
    style={
      isScrolled
        ? {
            zIndex: 10,
            shadowColor: colors.ink,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 8,
          }
        : { zIndex: 10 }
    }>
    <View className="flex-row items-center justify-center gap-3 mb-2">
      <Logo width={120} />
      {/* <Pressable
        onPress={onLocationPress}
        className="max-w-[48%] flex-row items-center gap-1 rounded-full border border-border bg-mist px-3 py-2 active:opacity-80">
        <Ionicons name="location" size={16} color={colors.brand} />
        <Typography variant="caption" className="flex-shrink font-sans-md text-ink" numberOfLines={1}>
          {location}
        </Typography>
        <Ionicons name="chevron-down" size={12} color={colors.muted} />
      </Pressable> */}
    </View>
    <SearchBar onPress={onSearchPress} className="mx-0 mt-3" />
  </View>
);

export default HomeHeader;
