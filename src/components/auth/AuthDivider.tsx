import React from 'react';
import { View } from 'react-native';

import { Typography } from '@/components/ui/Typography';

export const AuthDivider = () => (
  <View className="flex-row items-center gap-3 py-1">
    <View className="h-px flex-1 bg-border" />
    <Typography variant="caption" className="text-ink-muted">
      or
    </Typography>
    <View className="h-px flex-1 bg-border" />
  </View>
);

export default AuthDivider;
