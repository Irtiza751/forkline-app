import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';

import { useAuth } from '@/hooks/useAuth';
import type { AuthStackParamList } from '@/types/navigation.types';

import { LoginScreenView } from './LoginScreenView';

export const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList, 'Login'>>();
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
    <LoginScreenView
      isSigningIn={isSigningIn}
      onBackPress={() => navigation.goBack()}
      onGooglePress={handleGooglePress}
      onEmailSubmit={handleEmailSubmit}
      onRegisterPress={() => navigation.navigate('Register')}
    />
  );
};

export default LoginScreen;
