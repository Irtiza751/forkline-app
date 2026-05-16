import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { colors } from '@/constants/colors';
import { cn } from '@/lib/cn';

export interface SearchBarProps {
  onPress: () => void;
  className?: string;
}

export const SearchBar = ({ onPress, className }: SearchBarProps) => (
  <Pressable
    onPress={onPress}
    className={cn(
      'mx-4 flex-row items-center gap-3 rounded-2xl border border-border bg-mist px-4 py-3 active:opacity-80',
      className
    )}
    style={{
      shadowColor: colors.ink,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
    }}>
    <Ionicons name="search" size={20} color={colors.muted} />
    <Typography variant="body" className="text-muted-light">
      Search restaurants, cuisines...
    </Typography>
  </Pressable>
);

export default SearchBar;
