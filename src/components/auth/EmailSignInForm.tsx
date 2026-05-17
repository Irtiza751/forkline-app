import React, { useState } from 'react';
import { View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Typography } from '@/components/ui/Typography';

export interface EmailSignInFormProps {
  loading?: boolean;
  submitLabel?: string;
  onSubmit: (email: string) => void;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export const EmailSignInForm = ({
  loading,
  submitLabel = 'Continue with email',
  onSubmit,
}: EmailSignInFormProps) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      setError('Enter a valid email address');
      return;
    }
    setError(null);
    onSubmit(trimmed);
  };

  return (
    <View className="gap-3">
      <Input
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (error) setError(null);
        }}
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />
      {error && (
        <Typography variant="caption" className="text-red-500">
          {error}
        </Typography>
      )}
      <Button fullWidth size="lg" loading={loading} onPress={handleSubmit}>
        {submitLabel}
      </Button>
    </View>
  );
};

export default EmailSignInForm;
