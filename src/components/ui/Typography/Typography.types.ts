import type { TextProps } from 'react-native';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';

export interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  className?: string;
  children: React.ReactNode;
}
