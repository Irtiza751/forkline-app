import type { ReactNode } from 'react';

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

export interface BottomSheetHeaderProps {
  children: ReactNode;
}

export interface BottomSheetBodyProps {
  children: ReactNode;
}

export interface BottomSheetFooterProps {
  children: ReactNode;
}
