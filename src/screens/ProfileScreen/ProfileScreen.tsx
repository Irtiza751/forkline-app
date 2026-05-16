import React, { useCallback, useMemo } from 'react';
import { Alert } from 'react-native';

import { ProfileScreenView, type ProfileSettingRow } from './ProfileScreenView';

const MOCK_USER = {
  name: 'Irtiza Khan',
  email: 'irtiza@forkline.app',
};

export const ProfileScreen = () => {
  const settings: ProfileSettingRow[] = useMemo(
    () => [
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
    []
  );

  const handleLogout = useCallback(() => {
    Alert.alert('Logged out', 'You have been logged out (mock).');
  }, []);

  return (
    <ProfileScreenView
      name={MOCK_USER.name}
      email={MOCK_USER.email}
      settings={settings}
      onLogout={handleLogout}
    />
  );
};

export default ProfileScreen;
