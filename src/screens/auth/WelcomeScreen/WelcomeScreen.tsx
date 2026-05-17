import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';

import { useAuth } from '@/hooks/useAuth';
import type { AuthStackParamList } from '@/types/navigation.types';

import { WelcomeScreenView } from './WelcomeScreenView';

export const WelcomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList, 'Welcome'>>();
  const { signInWithGoogle, signInWithEmail, isSigningIn } = useAuth();

  const handleGooglePress = useCallback(async () => {
    try {
      await signInWithGoogle();
    } catch {
      // cancelled
    }
  }, [signInWithGoogle]);

  const handleEmailSubmit = useCallback(
    async (email: string) => {
      try {
        await signInWithEmail(email);
      } catch {
        // noop
      }
    },
    [signInWithEmail]
  );

  return (
    <WelcomeScreenView
      isSigningIn={isSigningIn}
      onGooglePress={handleGooglePress}
      onEmailSubmit={handleEmailSubmit}
      onLoginPress={() => navigation.navigate('Login')}
      onRegisterPress={() => navigation.navigate('Register')}
    />
  );
};

export default WelcomeScreen;
