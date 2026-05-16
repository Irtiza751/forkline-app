import React from 'react';
import { Animated, View } from 'react-native';

import { cn } from '@/lib/cn';
import { useSkeletonAnimation } from '@/hooks/useSkeletonAnimation';

export interface SkeletonProps {
  className?: string;
  height?: number;
  width?: number | `${number}%`;
}

export const Skeleton = ({ className, height = 16, width = '100%' }: SkeletonProps) => {
  const { opacity } = useSkeletonAnimation();

  return (
    <Animated.View style={{ opacity, width, height }} className={cn('rounded-xl bg-surface-alt', className)} />
  );
};

export default Skeleton;
