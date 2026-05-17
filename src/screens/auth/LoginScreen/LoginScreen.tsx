import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';

import { useAuth } from '@/hooks/useAuth';
import type { AuthStackParamList } from '@/types/navigation.types';

import { LoginScreenView } from './LoginScreenView';

export const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList, 'Login'>>();
  const { signInWithGoogle, isSigningIn } = useAuth();

  const handleGooglePress = useCallback(async () => {
    try {
      await signInWithGoogle();
    } catch {
      // cancelled
    }
  }, [signInWithGoogle]);

  return (
    <LoginScreenView
      isSigningIn={isSigningIn}
      onBackPress={() => navigation.goBack()}
      onGooglePress={handleGooglePress}
      onRegisterPress={() => navigation.navigate('Register')}
    />
  );
};

export default LoginScreen;
