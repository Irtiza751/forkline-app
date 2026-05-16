import React from 'react';
import { Text, View } from 'react-native';

import { cn } from '@/lib/cn';

import type { BadgeProps, BadgeVariant } from './Badge.types';

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-brand-light',
  success: 'bg-brand-light',
  warning: 'bg-amber-100',
  muted: 'bg-surface-alt',
};

const textStyles: Record<BadgeVariant, string> = {
  default: 'text-brand-dark',
  success: 'text-brand-dark',
  warning: 'text-amber-700',
  muted: 'text-muted',
};

export const Badge = ({ variant = 'default', className, children }: BadgeProps) => (
  <View className={cn('self-start rounded-full px-2.5 py-0.5', variantStyles[variant], className)}>
    <Text className={cn('font-sans-md text-xs', textStyles[variant])}>{children}</Text>
  </View>
);

export default Badge;
