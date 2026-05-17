import React from 'react';
import { Pressable, View } from 'react-native';

import Logo from '@/components/brand/Logo';
import { AuthDivider } from '@/components/auth/AuthDivider';
import { EmailSignInForm } from '@/components/auth/EmailSignInForm';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { Screen } from '@/components/layout/Screen';
import { Typography } from '@/components/ui/Typography';

export interface WelcomeScreenViewProps {
  isSigningIn: boolean;
  onGooglePress: () => void;
  onEmailSubmit: (email: string) => void;
  onLoginPress: () => void;
  onRegisterPress: () => void;
}

export const WelcomeScreenView = ({
  isSigningIn,
  onGooglePress,
  onEmailSubmit,
  onLoginPress,
  onRegisterPress,
}: WelcomeScreenViewProps) => (
  <Screen className="bg-mist" scrollable contentClassName="px-6 pb-10 pt-16">
    <View className="items-center">
      <Logo width={160} />
      <Typography variant="h1" className="mt-8 text-center">
        Order food you love
      </Typography>
      <Typography variant="body" className="mt-3 text-center text-ink-muted">
        Discover restaurants, build your cart, and track delivery — all in one place.
      </Typography>
    </View>

    <View className="mt-10 gap-4">
      <GoogleSignInButton loading={isSigningIn} onPress={onGooglePress} />
      <AuthDivider />
      <EmailSignInForm loading={isSigningIn} onSubmit={onEmailSubmit} />
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
