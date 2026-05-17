import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { cn } from '@/lib/cn';
import type { OrderStatus } from '@/types/restaurant.types';

const STEPS: { key: OrderStatus; label: string }[] = [
  { key: 'PLACED', label: 'Placed' },
  { key: 'CONFIRMED', label: 'Confirmed' },
  { key: 'OUT_FOR_DELIVERY', label: 'On the way' },
  { key: 'DELIVERED', label: 'Delivered' },
];

const STATUS_ORDER: OrderStatus[] = ['PLACED', 'CONFIRMED', 'OUT_FOR_DELIVERY', 'DELIVERED'];

const DOT_SIZE = 10;

function getStepIndex(status: OrderStatus): number {
  if (status === 'CANCELLED') return -1;
  return STATUS_ORDER.indexOf(status);
}

export interface OrderProgressTrackerProps {
  status: OrderStatus;
}

const PulsingDot = () => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.35, duration: 600, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [scale]);

  return (
    <Animated.View
      style={{ width: DOT_SIZE, height: DOT_SIZE, transform: [{ scale }] }}
      className="rounded-full bg-brand"
    />
  );
};

const StaticDot = ({ complete, upcoming }: { complete: boolean; upcoming: boolean }) => (
  <View
    style={{ width: DOT_SIZE, height: DOT_SIZE }}
    className={cn(
      'rounded-full',
      complete && 'bg-brand',
      upcoming && 'border border-border bg-surface',
      !complete && !upcoming && 'bg-border'
    )}
  />
);

export const OrderProgressTracker = ({ status }: OrderProgressTrackerProps) => {
  const currentIndex = getStepIndex(status);

  return (
    <View className="pt-1">
      <View className="flex-row items-center">
        {STEPS.map((step, index) => {
          const isComplete = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isUpcoming = index > currentIndex;
          const isLast = index === STEPS.length - 1;
          const lineComplete = currentIndex > index;

          return (
            <React.Fragment key={step.key}>
              <View
                className="items-center justify-center"
                style={{ width: DOT_SIZE, height: DOT_SIZE }}>
                {isCurrent ? (
                  <PulsingDot />
                ) : (
                  <StaticDot complete={isComplete} upcoming={isUpcoming} />
                )}
              </View>
              {!isLast && (
                <View
                  className={cn('mx-1 h-px flex-1', lineComplete ? 'bg-brand' : 'bg-border')}
                  style={{ marginTop: 0 }}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>

      <View className="mt-2 flex-row">
        {STEPS.map((step, index) => {
          const isComplete = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <View key={step.key} className="min-w-0 flex-1 items-center px-0.5">
              <Typography
                variant="caption"
                numberOfLines={2}
                className={cn(
                  'text-center text-[10px] leading-[13px]',
                  isCurrent && 'font-sans-md text-brand',
                  isComplete && !isCurrent && 'text-ink-muted',
                  !isCurrent && !isComplete && 'text-muted-light'
                )}>
                {step.label}
              </Typography>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default OrderProgressTracker;
