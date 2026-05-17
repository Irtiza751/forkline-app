import type { User } from '@/types/user.types';

interface GoogleUserInfoResponse {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export async function fetchGoogleUser(accessToken: string): Promise<User> {
  const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Google profile');
  }

  const data = (await response.json()) as GoogleUserInfoResponse;

  return {
    id: data.id,
    email: data.email,
    name: data.name,
    photoUrl: data.picture,
  };
}
