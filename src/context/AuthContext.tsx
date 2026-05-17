import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { clearStoredUser, loadStoredUser, saveStoredUser } from '@/services/auth/sessionStorage';
import type { User } from '@/types/user.types';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isSigningIn: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/** Placeholder user until real Google OAuth is wired up. */
const MOCK_GOOGLE_USER: User = {
  id: 'mock-google-user',
  email: 'user@forkline.app',
  name: 'ForkLine User',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    loadStoredUser().then((stored) => {
      setUser(stored);
      setIsLoading(false);
    });
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setIsSigningIn(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      await saveStoredUser(MOCK_GOOGLE_USER);
      setUser(MOCK_GOOGLE_USER);
    } finally {
      setIsSigningIn(false);
    }
  }, []);

  const signInWithEmail = useCallback(async (email: string) => {
    const trimmed = email.trim().toLowerCase();
    setIsSigningIn(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 350));
      const emailUser: User = {
        id: `email-${trimmed}`,
        email: trimmed,
        name: trimmed.split('@')[0].replace(/[._]/g, ' ') || 'ForkLine User',
      };
      await saveStoredUser(emailUser);
      setUser(emailUser);
    } finally {
      setIsSigningIn(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    await clearStoredUser();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isSigningIn,
      signInWithGoogle,
      signInWithEmail,
      signOut,
    }),
    [user, isLoading, isSigningIn, signInWithGoogle, signInWithEmail, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return ctx;
}
