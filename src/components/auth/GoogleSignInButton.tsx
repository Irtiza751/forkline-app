import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/colors';

export interface GoogleSignInButtonProps {
  label?: string;
  loading?: boolean;
  onPress: () => void;
}

export const GoogleSignInButton = ({
  label = 'Continue with Google',
  loading,
  onPress,
}: GoogleSignInButtonProps) => (
  <Button
    variant="outline"
    size="lg"
    fullWidth
    loading={loading}
    onPress={onPress}
    className="border-border bg-surface"
    leftIcon={
      <View className="mr-1">
        <AntDesign name="google" size={20} color={colors.brand} />
      </View>
    }>
    {label}
  </Button>
);

export default GoogleSignInButton;
