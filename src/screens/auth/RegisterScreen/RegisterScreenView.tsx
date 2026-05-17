import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';

import Logo from '@/components/brand/Logo';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { Screen } from '@/components/layout/Screen';
import { Typography } from '@/components/ui/Typography';

export interface RegisterScreenViewProps {
  isSigningIn: boolean;
  onBackPress: () => void;
  onGooglePress: () => void;
  onLoginPress: () => void;
}

export const RegisterScreenView = ({
  isSigningIn,
  onBackPress,
  onGooglePress,
  onLoginPress,
}: RegisterScreenViewProps) => (
  <Screen className="bg-mist" contentClassName="flex-1 justify-between px-6 pb-10 pt-12">
    <Pressable onPress={onBackPress} className="mb-4 self-start p-1 active:opacity-70">
      <Feather name="arrow-left" size={24} color="#02140b" />
    </Pressable>
    <View>
      <Logo width={120} />
      <Typography variant="h2" className="mt-8">
        Create your account
      </Typography>
      <Typography variant="body" className="mt-2 text-ink-muted">
        Sign up with Google to save orders and manage your profile.
      </Typography>
    </View>

    <View className="gap-4">
      <GoogleSignInButton label="Sign up with Google" loading={isSigningIn} onPress={onGooglePress} />
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
    </View>
  </Screen>
);

export default RegisterScreenView;
