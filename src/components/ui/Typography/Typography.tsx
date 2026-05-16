import React from 'react';
import { Text } from 'react-native';

import { cn } from '@/lib/cn';

import type { TypographyProps, TypographyVariant } from './Typography.types';

const variantStyles: Record<TypographyVariant, string> = {
  h1: 'text-3xl font-sans-bd text-ink',
  h2: 'text-2xl font-sans-bd text-ink',
  h3: 'text-lg font-sans-bd text-ink',
  body: 'text-base font-sans text-ink',
  caption: 'text-sm font-sans text-muted',
  label: 'text-xs font-sans-md uppercase tracking-wide text-muted',
};

export const Typography = React.forwardRef<Text, TypographyProps>(
  ({ variant = 'body', className, children, ...props }, ref) => (
    <Text ref={ref} className={cn(variantStyles[variant], className)} {...props}>
      {children}
    </Text>
  )
);

Typography.displayName = 'Typography';

export default Typography;
