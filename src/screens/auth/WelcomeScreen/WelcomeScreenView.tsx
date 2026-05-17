import React from 'react';
import { Pressable, View } from 'react-native';

import Logo from '@/components/brand/Logo';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { Screen } from '@/components/layout/Screen';
import { Typography } from '@/components/ui/Typography';

export interface WelcomeScreenViewProps {
  isSigningIn: boolean;
  onGooglePress: () => void;
  onLoginPress: () => void;
  onRegisterPress: () => void;
}

export const WelcomeScreenView = ({
  isSigningIn,
  onGooglePress,
  onLoginPress,
  onRegisterPress,
}: WelcomeScreenViewProps) => (
  <Screen className="bg-mist" contentClassName="flex-1 justify-between px-6 pb-10 pt-16">
    <View className="items-center">
      <Logo width={160} />
      <Typography variant="h1" className="mt-8 text-center">
        Order food you love
      </Typography>
      <Typography variant="body" className="mt-3 text-center text-ink-muted">
        Discover restaurants, build your cart, and track delivery — all in one place.
      </Typography>
    </View>

    <View className="gap-4">
      <GoogleSignInButton loading={isSigningIn} onPress={onGooglePress} />
      <View className="flex-row items-center justify-center gap-1">
        <Typography variant="caption" className="text-ink-muted">
          Already have an account?
        </Typography>
        <Pressable onPress={onLoginPress}>
          <Typography variant="caption" className="font-sans-md text-brand">
            Sign in
          </Typography>
        </Pressable>
      </View>
      <View className="flex-row items-center justify-center gap-1">
        <Typography variant="caption" className="text-ink-muted">
          New here?
        </Typography>
        <Pressable onPress={onRegisterPress}>
          <Typography variant="caption" className="font-sans-md text-brand">
            Create account
          </Typography>
        </Pressable>
      </View>
    </View>
  </Screen>
);

export default WelcomeScreenView;
