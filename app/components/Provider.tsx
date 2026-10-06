'use client';

import { ReactNode } from 'react';
import { Amplify } from 'aws-amplify';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from '../auth/AuthContext';

Amplify.configure(
  {
    Auth: {
      Cognito: {
        userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
        userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
      },
    },
  },
  { ssr: true }
);

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <CssBaseline />
      <AuthProvider>{children}</AuthProvider>
    </AppRouterCacheProvider>
  );
}