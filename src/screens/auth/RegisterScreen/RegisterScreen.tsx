import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';

import { useAuth } from '@/hooks/useAuth';
import type { AuthStackParamList } from '@/types/navigation.types';

import { RegisterScreenView } from './RegisterScreenView';

export const RegisterScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList, 'Register'>>();
  const { signInWithGoogle, isSigningIn } = useAuth();

  const handleGooglePress = useCallback(async () => {
    try {
      await signInWithGoogle();
    } catch {
      // cancelled
    }
  }, [signInWithGoogle]);

  return (
    <RegisterScreenView
      isSigningIn={isSigningIn}
      onBackPress={() => navigation.goBack()}
      onGooglePress={handleGooglePress}
      onLoginPress={() => navigation.navigate('Login')}
    />
  );
};

export default RegisterScreen;
