import React from 'react';
import { View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { cn } from '@/lib/cn';

export interface SectionProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export const Section = ({ title, className, children, action }: SectionProps) => (
  <View className={cn('mb-6', className)}>
    {(title || action) && (
      <View className="mb-3 flex-row items-center justify-between px-4">
        {title ? <Typography variant="h3">{title}</Typography> : <View />}
        {action}
      </View>
    )}
    {children}
  </View>
);

export default Section;
