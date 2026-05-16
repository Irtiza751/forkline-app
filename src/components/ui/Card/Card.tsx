import { Image } from 'expo-image';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { cn } from '@/lib/cn';

import type { CardBodyProps, CardFooterProps, CardImageProps, CardProps } from './Card.types';

const CardRoot = ({ className, children, onPress }: CardProps) => {
  const content = (
    <View
      className={cn(
        'overflow-hidden rounded-xl border border-border bg-surface',
        className
      )}>
      {children}
    </View>
  );
  if (onPress) {
    return (
      <Pressable onPress={onPress} className="active:opacity-90">
        {content}
      </Pressable>
    );
  }
  return content;
};

const CardImage = ({ source, className, height = 160 }: CardImageProps) => {
  const uri = typeof source === 'string' ? source : undefined;
  const resolvedSource = typeof source === 'string' ? { uri: source } : source;
  return (
    <Image
      source={resolvedSource}
      style={{ height }}
      contentFit="cover"
      className={cn('w-full', className)}
      alt={uri ?? 'card image'}
    />
  );
};

const CardBody = ({ children, className }: CardBodyProps) => (
  <View className={cn('p-4', className)}>{children}</View>
);

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="h3">{children}</Typography>
);

const CardDescription = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="caption" className="mt-1 text-ink-muted">
    {children}
  </Typography>
);

const CardFooter = ({ children, className }: CardFooterProps) => (
  <View className={cn('px-4 pb-4', className)}>{children}</View>
);

export const Card = Object.assign(CardRoot, {
  Image: CardImage,
  Body: CardBody,
  Title: CardTitle,
  Description: CardDescription,
  Footer: CardFooter,
});

export default Card;
