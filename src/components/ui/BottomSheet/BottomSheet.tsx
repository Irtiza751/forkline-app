import React from 'react';
import { Modal, Pressable, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { cn } from '@/lib/cn';

import type {
  BottomSheetBodyProps,
  BottomSheetFooterProps,
  BottomSheetHeaderProps,
  BottomSheetProps,
} from './BottomSheet.types';

const BottomSheetRoot = ({ visible, onClose, children }: BottomSheetProps) => (
  <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
    <Pressable className="flex-1 justify-end bg-black/40" onPress={onClose}>
      <Pressable className="rounded-t-4xl bg-surface px-6 pb-10 pt-4" onPress={(e) => e.stopPropagation()}>
        <View className="mb-4 h-1 w-12 self-center rounded-full bg-border" />
        {children}
      </Pressable>
    </Pressable>
  </Modal>
);

const BottomSheetHeader = ({ children }: BottomSheetHeaderProps) => (
  <View className="mb-4 items-center">{children}</View>
);

const BottomSheetTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="h2" className="text-center">
    {children}
  </Typography>
);

const BottomSheetBody = ({ children }: BottomSheetBodyProps) => (
  <View className="mb-6">{children}</View>
);

const BottomSheetFooter = ({ children }: BottomSheetFooterProps) => (
  <View className={cn('gap-3')}>{children}</View>
);

export const BottomSheet = Object.assign(BottomSheetRoot, {
  Header: BottomSheetHeader,
  Title: BottomSheetTitle,
  Body: BottomSheetBody,
  Footer: BottomSheetFooter,
});

export default BottomSheet;
