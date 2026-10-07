'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Container, Typography } from '@mui/material';
import { useAuth } from './auth/AuthContext';

export default function HomePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4">
        Welcome {user.name || user.email}
      </Typography>
      <Button
        sx={{ mt: 2, mr: 2 }}
        variant="contained"
        onClick={() => router.push('/dashboard')}
      >
        Go to Dashboard
      </Button>

      <Button
        sx={{ mt: 2 }}
        variant="outlined"
        onClick={logout}
      >
        Log out
      </Button>
    </Container>
  );
}