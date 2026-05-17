import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomizationGroup } from '@/components/composite/CustomizationGroup';
import { Screen } from '@/components/layout/Screen';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { colors } from '@/constants/colors';
import { formatCurrency } from '@/lib/format';
import type { CustomizationGroup as CustomizationGroupType } from '@/types/menuCustomization.types';
import type { MenuItem } from '@/types/restaurant.types';

export interface FoodItemScreenViewProps {
  menuItem: MenuItem;
  restaurantName: string;
  groups: CustomizationGroupType[];
  selections: Record<string, string[]>;
  specialNotes: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  onBack: () => void;
  onSelectSingle: (groupId: string, optionId: string) => void;
  onToggleMultiple: (groupId: string, optionId: string) => void;
  onNotesChange: (text: string) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  onAddToCart: () => void;
}

export const FoodItemScreenView = ({
  menuItem,
  restaurantName,
  groups,
  selections,
  specialNotes,
  quantity,
  unitPrice,
  lineTotal,
  onBack,
  onSelectSingle,
  onToggleMultiple,
  onNotesChange,
  onIncrement,
  onDecrement,
  onAddToCart,
}: FoodItemScreenViewProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Screen className="bg-mist" edges={[]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-36"
        className="flex-1">
        <View className="relative">
          <Image
            source={{ uri: menuItem.imageUrl }}
            style={{ width: '100%', height: 260 }}
            contentFit="cover"
          />
          <Pressable
            onPress={onBack}
            style={{ top: insets.top + 8 }}
            className="absolute left-4 h-10 w-10 items-center justify-center rounded-full bg-surface/95 active:opacity-80">
            <Ionicons name="arrow-back" size={22} color={colors.ink} />
          </Pressable>
        </View>

        <View className="px-4 pt-4">
          <View className="flex-row items-start justify-between gap-2">
            <View className="flex-1">
              <Typography variant="h2" className="text-xl leading-snug">
                {menuItem.name}
              </Typography>
              <Typography variant="caption" className="mt-1 text-ink-muted">
                {restaurantName}
              </Typography>
            </View>
            {menuItem.isPopular && <Badge variant="default">Popular</Badge>}
          </View>

          <Typography variant="body" className="mt-3 text-ink-muted">
            {menuItem.description}
          </Typography>
          <Typography variant="h3" className="mt-3 font-sans-bd text-brand">
            {formatCurrency(menuItem.price)}
          </Typography>

          <View className="mt-6 rounded-2xl border border-border bg-surface p-4">
            <Typography variant="label" className="mb-4 normal-case tracking-normal text-ink">
              Customize your order
            </Typography>
            {groups.map((group) => (
              <CustomizationGroup
                key={group.id}
                group={group}
                selectedIds={selections[group.id] ?? []}
                onSelectSingle={(optionId) => onSelectSingle(group.id, optionId)}
                onToggleMultiple={(optionId) => onToggleMultiple(group.id, optionId)}
              />
            ))}

            <Typography variant="label" className="mb-2 normal-case tracking-normal text-ink">
              Special instructions
            </Typography>
            <TextInput
              value={specialNotes}
              onChangeText={onNotesChange}
              placeholder="e.g. no onions, extra spicy, leave at door..."
              placeholderTextColor={colors.mutedLight}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              className="min-h-[88px] rounded-xl border border-border bg-mist px-4 py-3 font-sans text-sm text-ink"
            />
          </View>
        </View>
      </ScrollView>

      <View
        className="absolute bottom-0 left-0 right-0 border-t border-border bg-surface px-4 pt-3"
        style={{ paddingBottom: Math.max(insets.bottom, 12) }}>
        <View className="mb-3 flex-row items-center justify-between">
          <Typography variant="caption" className="text-ink-muted">
            {formatCurrency(unitPrice)} each
          </Typography>
          <View className="flex-row items-center gap-3 rounded-full border border-border px-2 py-1">
            <Pressable onPress={onDecrement} className="h-8 w-8 items-center justify-center">
              <Ionicons name="remove" size={20} color={colors.brand} />
            </Pressable>
            <Typography variant="body" className="min-w-[24px] text-center font-sans-bd">
              {quantity}
            </Typography>
            <Pressable onPress={onIncrement} className="h-8 w-8 items-center justify-center">
              <Ionicons name="add" size={20} color={colors.brand} />
            </Pressable>
          </View>
        </View>
        <Button fullWidth size="lg" onPress={onAddToCart}>
          Add to cart · {formatCurrency(lineTotal)}
        </Button>
      </View>
    </Screen>
  );
};

export default FoodItemScreenView;
