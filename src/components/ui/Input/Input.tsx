import React from 'react';
import { TextInput, View } from 'react-native';

import { cn } from '@/lib/cn';

import type { InputProps } from './Input.types';

export const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, containerClassName, leftIcon, rightIcon, ...props }, ref) => (
    <View
      className={cn(
        'h-12 flex-row items-center rounded-xl border border-border bg-surface px-4',
        containerClassName
      )}>
      {leftIcon}
      <TextInput
        ref={ref}
        placeholderTextColor="#9CA3AF"
        className={cn('flex-1 font-sans text-base text-ink', className)}
        {...props}
      />
      {rightIcon}
    </View>
  )
);

Input.displayName = 'Input';

export default Input;
