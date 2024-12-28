import { getAuth } from '@clerk/clerk-react';

export interface AuthenticatedRequest {
  userId?: string | null;
  sessionId?: string | null;
  getToken: () => Promise<string | null>;
}

export async function withAuth(): Promise<AuthenticatedRequest> {
  const { userId, sessionId, getToken } = getAuth();
  return { userId, sessionId, getToken };
}