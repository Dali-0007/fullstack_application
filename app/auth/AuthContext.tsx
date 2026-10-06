'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  signUp as cognitoSignUp,
  confirmSignUp as cognitoConfirmSignUp,
  signIn as cognitoSignIn,
  signOut as cognitoSignOut,
  getCurrentUser,
  fetchUserAttributes,
} from 'aws-amplify/auth';

type User = { name?: string; email: string };

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  confirmSignUp: (email: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

// Plain helper: reads the current Cognito session and returns the user (or null).
// It does not touch React state.
async function fetchCurrentUser(): Promise<User | null> {
  try {
    await getCurrentUser();
    const attrs = await fetchUserAttributes();
    return { email: attrs.email ?? '', name: attrs.name };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore the session when the app loads
  useEffect(() => {
    let active = true;
    fetchCurrentUser().then((u) => {
      if (active) {
        setUser(u);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { isSignedIn, nextStep } = await cognitoSignIn({ username: email, password });
    if (!isSignedIn) {
      throw new Error(
        nextStep.signInStep === 'CONFIRM_SIGN_UP'
          ? 'Please verify your email first'
          : 'Additional sign-in step required'
      );
    }
    setUser(await fetchCurrentUser());
  };

  const signUp = async (name: string, email: string, password: string) => {
    await cognitoSignUp({
      username: email,
      password,
      options: { userAttributes: { email, name } },
    });
  };

  const confirmSignUp = async (email: string, code: string) => {
    await cognitoConfirmSignUp({ username: email, confirmationCode: code });
  };

  const logout = async () => {
    await cognitoSignOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signUp, confirmSignUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}