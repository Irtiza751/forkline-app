import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';

import Logo from '@/components/brand/Logo';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { Screen } from '@/components/layout/Screen';
import { Typography } from '@/components/ui/Typography';

export interface LoginScreenViewProps {
  isSigningIn: boolean;
  onBackPress: () => void;
  onGooglePress: () => void;
  onRegisterPress: () => void;
}

export const LoginScreenView = ({
  isSigningIn,
  onBackPress,
  onGooglePress,
  onRegisterPress,
}: LoginScreenViewProps) => (
  <Screen className="bg-mist" contentClassName="flex-1 justify-between px-6 pb-10 pt-12">
    <Pressable onPress={onBackPress} className="mb-4 self-start p-1 active:opacity-70">
      <Feather name="arrow-left" size={24} color="#02140b" />
    </Pressable>
    <View>
      <Logo width={120} />
      <Typography variant="h2" className="mt-8">
        Welcome back
      </Typography>
      <Typography variant="body" className="mt-2 text-ink-muted">
        Sign in with your Google account to continue.
      </Typography>
    </View>

    <View className="gap-4">
      <GoogleSignInButton label="Sign in with Google" loading={isSigningIn} onPress={onGooglePress} />
      <View className="flex-row items-center justify-center gap-1">
        <Typography variant="caption" className="text-ink-muted">
          Don&apos;t have an account?
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

export default LoginScreenView;
