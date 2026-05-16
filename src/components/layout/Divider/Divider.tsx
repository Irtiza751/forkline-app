import React from 'react';
import { View } from 'react-native';

import { cn } from '@/lib/cn';

export interface DividerProps {
  className?: string;
}

export const Divider = ({ className }: DividerProps) => (
  <View className={cn('my-3 h-px bg-border', className)} />
);

export default Divider;
