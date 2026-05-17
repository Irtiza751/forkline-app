import { Image } from 'expo-image';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';

import { cn } from '@/lib/cn';

import type { AvatarProps } from './Avatar.types';

const sizeStyles = {
  sm: 'h-10 w-10',
  md: 'h-16 w-16',
  lg: 'h-24 w-24',
} as const;

const textSizes = {
  sm: 'text-sm',
  md: 'text-xl',
  lg: 'text-3xl',
} as const;

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export const Avatar = ({ name, imageUrl, size = 'md', className }: AvatarProps) => {
  const initials = useMemo(() => getInitials(name), [name]);

  if (imageUrl) {
    return (
      <Image
        source={{ uri: imageUrl }}
        className={cn('rounded-full bg-mist', sizeStyles[size], className)}
        contentFit="cover"
      />
    );
  }

  return (
    <View
      className={cn(
        'items-center justify-center rounded-full bg-brand',
        sizeStyles[size],
        className
      )}>
      <Text className={cn('font-sans-bd text-white', textSizes[size])}>{initials}</Text>
    </View>
  );
};

export default Avatar;
