'use client';

import { useState, ChangeEvent } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { Alert, Button, Container, Link, Paper, TextField, Typography } from '@mui/material';
import { useAuth } from '../auth/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Log in</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField fullWidth margin="normal" label="Email" name="email" type="email"
          value={form.email} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Password" name="password" type="password"
          value={form.password} onChange={handleChange} />
        <Button fullWidth variant="contained" sx={{ mt: 2 }} disabled={loading} onClick={handleSubmit}>
          {loading ? 'Logging in...' : 'Log in'}
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          No account? <Link component={NextLink} href="/signup">Sign up</Link>
        </Typography>
      </Paper>
    </Container>
  );
}