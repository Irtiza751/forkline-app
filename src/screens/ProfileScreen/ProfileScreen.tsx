import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { Alert } from 'react-native';

import { useAuth } from '@/hooks/useAuth';
import type { BottomTabScreenPropsFor } from '@/types/navigation.types';

import { ProfileScreenView, type ProfileSettingRow } from './ProfileScreenView';

export const ProfileScreen = () => {
  const navigation = useNavigation<BottomTabScreenPropsFor<'Profile'>['navigation']>();
  const { user, signOut } = useAuth();

  const settings: ProfileSettingRow[] = useMemo(
    () => [
      {
        icon: 'receipt-outline',
        label: 'My orders',
        onPress: () => navigation.navigate('Orders'),
      },
      {
        icon: 'person-outline',
        label: 'Edit profile',
        onPress: () => Alert.alert('Edit profile', 'Coming soon'),
      },
      {
        icon: 'location-outline',
        label: 'Saved addresses',
        onPress: () => Alert.alert('Addresses', 'Coming soon'),
      },
      {
        icon: 'card-outline',
        label: 'Payment methods',
        onPress: () => Alert.alert('Payments', 'Cash on delivery only for MVP'),
      },
      {
        icon: 'notifications-outline',
        label: 'Notifications',
        onPress: () => Alert.alert('Notifications', 'Coming soon'),
      },
      {
        icon: 'help-circle-outline',
        label: 'Help & support',
        onPress: () => Alert.alert('Support', 'support@forkline.app'),
      },
    ],
    [navigation]
  );

  const handleLogout = useCallback(() => {
    Alert.alert('Log out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: () => {
          void signOut();
        },
      },
    ]);
  }, [signOut]);

  if (!user) {
    return null;
  }

  return (
    <ProfileScreenView
      name={user.name}
      email={user.email}
      photoUrl={user.photoUrl}
      settings={settings}
      onLogout={handleLogout}
    />
  );
};

export default ProfileScreen;
