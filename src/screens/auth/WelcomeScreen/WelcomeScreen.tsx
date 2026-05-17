import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';

import { useAuth } from '@/hooks/useAuth';
import type { AuthStackParamList } from '@/types/navigation.types';

import { WelcomeScreenView } from './WelcomeScreenView';

export const WelcomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList, 'Welcome'>>();
  const { signInWithGoogle, isSigningIn } = useAuth();

  const handleGooglePress = useCallback(async () => {
    try {
      await signInWithGoogle();
    } catch {
      // User cancelled or provider error — no alert for cancel
    }
  }, [signInWithGoogle]);

  return (
    <WelcomeScreenView
      isSigningIn={isSigningIn}
      onGooglePress={handleGooglePress}
      onLoginPress={() => navigation.navigate('Login')}
      onRegisterPress={() => navigation.navigate('Register')}
    />
  );
};

export default WelcomeScreen;
