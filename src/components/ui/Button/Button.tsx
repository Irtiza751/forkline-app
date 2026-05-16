import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

import { colors } from '@/constants/colors';
import { cn } from '@/lib/cn';

import type { ButtonProps, ButtonSize, ButtonVariant } from './Button.types';

const variantStyles: Record<ButtonVariant, string> = {
  solid: 'bg-brand active:bg-brand-dark',
  outline: 'border border-brand bg-transparent',
  ghost: 'bg-transparent',
  destructive: 'bg-red-500 active:bg-red-600',
};

const variantTextStyles: Record<ButtonVariant, string> = {
  solid: 'text-white',
  outline: 'text-brand',
  ghost: 'text-brand',
  destructive: 'text-white',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 rounded-lg',
  md: 'h-11 px-5 rounded-xl',
  lg: 'h-14 px-6 rounded-2xl',
  icon: 'h-10 w-10 rounded-full',
};

const textSizeStyles: Record<ButtonSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  icon: 'text-base',
};

export const Button = React.forwardRef<React.ElementRef<typeof TouchableOpacity>, ButtonProps>(
  (
    {
      variant = 'solid',
      size = 'md',
      loading,
      disabled,
      leftIcon,
      rightIcon,
      fullWidth,
      className,
      children,
      onPress,
    },
    ref
  ) => (
    <TouchableOpacity
      ref={ref}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
      className={cn(
        'flex-row items-center justify-center gap-2',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        (disabled || loading) && 'opacity-50',
        className
      )}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'solid' || variant === 'destructive' ? colors.white : colors.brand}
        />
      ) : (
        <>
          {leftIcon}
          {size !== 'icon' ? (
            <Text className={cn('font-sans-bd', variantTextStyles[variant], textSizeStyles[size])}>
              {children}
            </Text>
          ) : (
            children
          )}
          {rightIcon}
        </>
      )}
    </TouchableOpacity>
  )
);

Button.displayName = 'Button';

export default Button;
