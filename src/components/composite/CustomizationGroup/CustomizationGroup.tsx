import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { colors } from '@/constants/colors';
import { cn } from '@/lib/cn';
import { formatCurrency } from '@/lib/format';
import type { CustomizationGroup as CustomizationGroupType } from '@/types/menuCustomization.types';

export interface CustomizationGroupProps {
  group: CustomizationGroupType;
  selectedIds: string[];
  onSelectSingle: (optionId: string) => void;
  onToggleMultiple: (optionId: string) => void;
}

export const CustomizationGroup = ({
  group,
  selectedIds,
  onSelectSingle,
  onToggleMultiple,
}: CustomizationGroupProps) => (
  <View className="mb-5">
    <Typography variant="label" className="mb-3 normal-case tracking-normal text-ink">
      {group.label}
    </Typography>
    <View className="gap-2">
      {group.options.map((option) => {
        const selected = selectedIds.includes(option.id);
        return (
          <Pressable
            key={option.id}
            onPress={() =>
              group.type === 'single' ? onSelectSingle(option.id) : onToggleMultiple(option.id)
            }
            className={cn(
              'flex-row items-center justify-between rounded-xl border px-4 py-3',
              selected ? 'border-brand bg-brand-subtle' : 'border-border bg-surface'
            )}>
            <View className="mr-3 flex-1 flex-row items-center gap-3">
              {group.type === 'single' ? (
                <View
                  className={cn(
                    'h-5 w-5 items-center justify-center rounded-full border-2',
                    selected ? 'border-brand' : 'border-muted-light'
                  )}>
                  {selected && <View className="h-2.5 w-2.5 rounded-full bg-brand" />}
                </View>
              ) : (
                <View
                  className={cn(
                    'h-5 w-5 items-center justify-center rounded-md border-2',
                    selected ? 'border-brand bg-brand' : 'border-muted-light bg-surface'
                  )}>
                  {selected && <Feather name="check" size={12} color={colors.white} />}
                </View>
              )}
              <Typography variant="body" className="flex-1 text-sm">
                {option.label}
              </Typography>
            </View>
            {option.price > 0 && (
              <Typography variant="caption" className="font-sans-md text-brand">
                +{formatCurrency(option.price)}
              </Typography>
            )}
          </Pressable>
        );
      })}
    </View>
  </View>
);

export default CustomizationGroup;
