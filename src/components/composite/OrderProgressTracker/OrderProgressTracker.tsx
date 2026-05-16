import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { cn } from '@/lib/cn';
import type { OrderStatus } from '@/types/restaurant.types';

const STEPS: { key: OrderStatus; label: string }[] = [
  { key: 'PLACED', label: 'Placed' },
  { key: 'CONFIRMED', label: 'Confirmed' },
  { key: 'OUT_FOR_DELIVERY', label: 'Out for delivery' },
  { key: 'DELIVERED', label: 'Delivered' },
];

const STATUS_ORDER: OrderStatus[] = ['PLACED', 'CONFIRMED', 'OUT_FOR_DELIVERY', 'DELIVERED'];

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
        Animated.timing(scale, { toValue: 1.4, duration: 600, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [scale]);

  return (
    <Animated.View
      style={{ transform: [{ scale }] }}
      className="h-3 w-3 rounded-full bg-brand"
    />
  );
};

const OrderProgressTrackerRoot = ({ status }: OrderProgressTrackerProps) => {
  const currentIndex = getStepIndex(status);

  return (
    <OrderProgressTracker.Steps>
      {STEPS.map((step, index) => {
        const isComplete = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isUpcoming = index > currentIndex;
        const isLast = index === STEPS.length - 1;

        return (
          <OrderProgressTracker.Step key={step.key} isLast={isLast}>
            <View className="items-center">
              {isCurrent ? (
                <PulsingDot />
              ) : (
                <View
                  className={cn(
                    'h-3 w-3 rounded-full',
                    isComplete ? 'bg-brand' : 'bg-border',
                    isUpcoming && 'bg-surface-alt'
                  )}
                />
              )}
              <Typography
                variant="caption"
                className={cn('mt-2 text-center', isCurrent && 'font-sans-bd text-brand')}>
                {step.label}
              </Typography>
            </View>
            {!isLast && (
              <View
                className={cn('mx-2 h-0.5 flex-1', isComplete ? 'bg-brand' : 'bg-border')}
              />
            )}
          </OrderProgressTracker.Step>
        );
      })}
    </OrderProgressTracker.Steps>
  );
};

const OrderProgressTrackerSteps = ({ children }: { children: React.ReactNode }) => (
  <View className="flex-row items-start px-2 py-4">{children}</View>
);

const OrderProgressTrackerStep = ({
  children,
  isLast,
}: {
  children: React.ReactNode;
  isLast: boolean;
}) => <View className={cn('flex-1 flex-row items-center', isLast && 'flex-none')}>{children}</View>;

export const OrderProgressTracker = Object.assign(OrderProgressTrackerRoot, {
  Steps: OrderProgressTrackerSteps,
  Step: OrderProgressTrackerStep,
});

export default OrderProgressTracker;
