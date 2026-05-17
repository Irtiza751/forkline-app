import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Divider } from '@/components/layout/Divider';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { colors } from '@/constants/colors';

export interface ProfileSettingRow {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}

export interface ProfileScreenViewProps {
  name: string;
  email: string;
  photoUrl?: string;
  settings: ProfileSettingRow[];
  onLogout: () => void;
}

export const ProfileScreenView = ({
  name,
  email,
  photoUrl,
  settings,
  onLogout,
}: ProfileScreenViewProps) => (
  <Screen className="bg-mist" scrollable>
    <View className="items-center border-b border-border bg-surface px-4 py-8">
      <Avatar name={name} imageUrl={photoUrl} size="lg" />
      <Typography variant="h2" className="mt-4">
        {name}
      </Typography>
      <Typography variant="caption" className="text-ink-muted">
        {email}
      </Typography>
    </View>

    <View className="mx-4 mt-4 overflow-hidden rounded-xl border border-border bg-surface">
      {settings.map((row, index) => (
        <React.Fragment key={row.label}>
          <Pressable
            onPress={row.onPress}
            className="flex-row items-center gap-4 px-4 py-4 active:bg-brand-subtle">
            <Ionicons name={row.icon} size={22} color={colors.muted} />
            <Typography variant="body" className="flex-1">
              {row.label}
            </Typography>
            <Ionicons name="chevron-forward" size={18} color={colors.mutedLight} />
          </Pressable>
          {index < settings.length - 1 && <Divider className="mx-4 my-0" />}
        </React.Fragment>
      ))}
    </View>

    <View className="px-4 py-8">
      <Button variant="destructive" fullWidth onPress={onLogout}>
        Log out
      </Button>
    </View>
  </Screen>
);

export default ProfileScreenView;
