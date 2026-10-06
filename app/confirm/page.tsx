'use client';

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useAuth } from '../auth/AuthContext';

export default function ConfirmPage() {
  const { confirmSignUp } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      await confirmSignUp(email, code);
      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Verify your email</Typography>
        <Typography variant="body2">Enter the code we emailed you.</Typography>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <TextField fullWidth margin="normal" label="Email" type="email" value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
        <TextField fullWidth margin="normal" label="Verification code" value={code}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)} />
        <Button fullWidth variant="contained" sx={{ mt: 2 }} disabled={loading} onClick={handleSubmit}>
          {loading ? 'Verifying...' : 'Verify'}
        </Button>
      </Paper>
    </Container>
  );
}