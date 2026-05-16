import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { cn } from '@/lib/cn';

export interface ScreenProps {
  children: React.ReactNode;
  scrollable?: boolean;
  className?: string;
  contentClassName?: string;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

export const Screen = ({
  children,
  scrollable = false,
  className,
  contentClassName,
  edges = ['top'],
}: ScreenProps) => {
  const content = scrollable ? (
    <ScrollView
      className={cn('flex-1', contentClassName)}
      contentContainerClassName="pb-8"
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <View className={cn('flex-1', contentClassName)}>{children}</View>
  );

  return (
    <SafeAreaView edges={edges} className={cn('flex-1 bg-surface', className)}>
      {content}
    </SafeAreaView>
  );
};

export default Screen;
