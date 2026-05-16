import type { ReactNode } from 'react';
import type { ImageSourcePropType } from 'react-native';

export interface CardProps {
  className?: string;
  children: ReactNode;
  onPress?: () => void;
}

export interface CardImageProps {
  source: ImageSourcePropType | string;
  className?: string;
  height?: number;
}

export interface CardBodyProps {
  className?: string;
  children: ReactNode;
}

export interface CardFooterProps {
  className?: string;
  children: ReactNode;
}
