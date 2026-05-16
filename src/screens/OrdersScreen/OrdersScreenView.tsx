import React from 'react';
import { FlatList, Pressable, View } from 'react-native';

import { OrderProgressTracker } from '@/components/composite/OrderProgressTracker';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { cn } from '@/lib/cn';
import { formatCurrency } from '@/lib/format';
import type { Order } from '@/types/restaurant.types';

export interface OrdersScreenViewProps {
  tab: 'active' | 'past';
  activeOrders: Order[];
  pastOrders: Order[];
  onTabChange: (tab: 'active' | 'past') => void;
  onReorder: (orderId: string) => void;
}

export const OrdersScreenView = ({
  tab,
  activeOrders,
  pastOrders,
  onTabChange,
  onReorder,
}: OrdersScreenViewProps) => {
  const data = tab === 'active' ? activeOrders : pastOrders;

  return (
    <Screen className="bg-surface-alt">
      <View className="border-b border-border bg-surface px-4 py-4">
        <Typography variant="h2">Orders</Typography>
      </View>

      <View className="mx-4 mb-2 mt-4 flex-row gap-2 rounded-xl border border-border bg-surface p-1">
        <Pressable
          onPress={() => onTabChange('active')}
          className={cn('flex-1 rounded-lg py-2.5', tab === 'active' && 'bg-brand')}>
          <Typography
            variant="caption"
            className={cn('text-center font-sans-md', tab === 'active' ? 'text-white' : 'text-muted')}>
            Active
          </Typography>
        </Pressable>
        <Pressable
          onPress={() => onTabChange('past')}
          className={cn('flex-1 rounded-lg py-2.5', tab === 'past' && 'bg-brand')}>
          <Typography
            variant="caption"
            className={cn('text-center font-sans-md', tab === 'past' ? 'text-white' : 'text-muted')}>
            Past
          </Typography>
        </Pressable>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-4 pb-8"
        ListEmptyComponent={
          <Typography variant="caption" className="py-12 text-center text-ink-muted">
            {tab === 'active' ? 'No active orders.' : 'No past orders yet.'}
          </Typography>
        }
        renderItem={({ item }) => (
          <View className="mb-3 rounded-xl border border-border bg-surface p-4">
            <View className="mb-1 flex-row items-center justify-between">
              <Typography variant="h3" className="text-base">
                {item.restaurantName}
              </Typography>
              <Typography variant="body" className="font-sans-bd">
                {formatCurrency(item.total)}
              </Typography>
            </View>
            <Typography variant="caption" className="mb-3 text-ink-muted">
              {new Date(item.placedAt).toLocaleString('en-PK')} · {item.items.length} items
            </Typography>
            {tab === 'active' ? (
              <OrderProgressTracker status={item.status} />
            ) : (
              <Button variant="outline" size="sm" onPress={() => onReorder(item.id)}>
                Reorder
              </Button>
            )}
          </View>
        )}
      />
    </Screen>
  );
};

export default OrdersScreenView;
